import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const Post = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const postId = 5;
  const { postId } = useParams();
  console.log(postId);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${postId}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error", response.status);
        }
        return response.json();
      })
      .then((response) => setPost(response.post))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  console.log(post);

  return (
    <>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <Comments postId={postId} />
    </>
  );
};

export default Post;
