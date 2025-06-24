import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error", response.status);
        }
        return response.json();
      })
      .then((response) => setPosts(response.posts))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  console.log(posts);

  return (
    <>
      <p>Posts:</p>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <p>{post.title}</p>
              </Link>
              <p>{post.content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Posts;
