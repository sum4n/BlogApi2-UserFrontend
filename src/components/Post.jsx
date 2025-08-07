import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments/Comments";
import { API_BASE } from "../config";
import { format } from "date-fns";

const Post = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { postId } = useParams();

  useEffect(() => {
    fetch(`${API_BASE}/api/posts/${postId}`)
      .then(async (response) => {
        if (response.status >= 400) {
          // this captures the detailed error messages sent from backend
          const errorData = await response.json();
          throw new Error(errorData.error || `server error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPost(data.post))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!post) return <p>No post found</p>;

  // console.log(post);

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>
        Created on: {format(new Date(post.createdAt), "dd-MM-yyyy hh:mm a")}
      </small>
      <Comments postId={postId} />
    </>
  );
};

export default Post;
