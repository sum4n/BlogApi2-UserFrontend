import { useState, useEffect } from "react";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${postId}/comments`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error", response.status);
        }
        return response.json();
      })
      .then((response) => setComments(response.allCommentsByPostId))
      .catch((error) => setErrors(error))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (errors) return <p>A network error was encountered.</p>;

  return (
    <>
      <hr />
      <p>Comments:</p>
      {comments.length === 0 && <p>No comments yet...</p>}
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <p>{comment.content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
