import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

const CommentForm = (props) => {
  const [comment, setComment] = useState("");

  const { user } = useOutletContext();

  const { postId, setComments, comments } = props;

  const navigate = useNavigate();

  function handleInput(e) {
    if (!user) {
      navigate("/user/login");
    } else {
      setComment(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const storedToken = localStorage.getItem("jwt-token");
    // console.log(comment);
    fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({ content: comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.comment);
        setComment("");
        alert(data.message);
        // add author locally
        data.comment.author = { email: user.email, name: user.name };
        // add the comment locally. as it is now in the database,
        // it will be fetched on reloads.
        setComments([...comments, data.comment]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <hr />

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="comment">Write a comment:</label>
        </p>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          cols={50}
          required
          onChange={handleInput}
          value={comment}
        ></textarea>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    </>
  );
};

export default CommentForm;
