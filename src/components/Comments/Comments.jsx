import { useState, useEffect } from "react";
import CommentForm from "../CommentForm/CommentForm";
import { API_BASE } from "../../config";
import { useOutletContext } from "react-router-dom";
import { format } from "date-fns";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useOutletContext();
  // console.log(user);

  useEffect(() => {
    fetch(`${API_BASE}/api/posts/${postId}/comments`)
      .then(async (response) => {
        if (response.status >= 400) {
          const errorData = await response.json();
          throw new Error(errorData.error || `server error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setComments(data.allCommentsByPostId))
      .catch((err) => setErrors(err))
      .finally(() => setLoading(false));
  }, [postId]);

  // console.log(comments);
  if (loading) return <p>Loading...</p>;
  if (errors) return <p>{errors.message}</p>;

  return (
    <>
      <CommentForm
        postId={postId}
        comments={comments}
        setComments={setComments}
      />

      <hr />
      <p>Comments:</p>
      {comments.length === 0 && <p>No comments yet...</p>}

      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <p>
                {comment.author.email}
                {" - "}
                <small>
                  {format(new Date(comment.createdAt), "dd MMMM yyyy hh:mm a")}
                </small>
              </p>
              <p>{comment.content}</p>

              {user.id === comment.authorId && (
                <p>
                  <a href="#">Edit </a>
                  {" - "}
                  <a href="#">Delete</a>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
