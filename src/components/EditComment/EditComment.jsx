import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { API_BASE } from "../../config";
import { useState, useEffect } from "react";

function EditComment() {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId, commentId } = useParams();
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/posts/${postId}/comments/${commentId}`)
      .then(async (response) => {
        if (response.status >= 400) {
          const errorData = await response.json();
          throw new Error(errorData || `server error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setComment(data.comment))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [postId, commentId]);

  // console.log(comment);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(comment);
    const storedToken = localStorage.getItem("jwt-token");
    fetch(`${API_BASE}/api/posts/${postId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({ content: comment.content }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // redirect to previous page
        navigate(`/posts/${postId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInput(e) {
    setComment({ ...comment, content: e.target.value });
    // console.log(comment);
  }

  if (loading) {
    return <p>Loading comment...</p>;
  }

  if (!comment) {
    return <p>No comment found</p>;
  }

  if (user.id !== comment.authorId) {
    return <p>Unauthorized. You are not author.</p>;
  }

  return (
    <>
      <h1>Edit Comment</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          cols={50}
          required
          onChange={handleInput}
          value={comment.content}
        ></textarea>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
}

export default EditComment;
