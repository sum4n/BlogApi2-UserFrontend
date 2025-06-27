import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then(async (response) => {
        if (response.status >= 400) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `Server error: ${response.status}`
          );
        }
        return response.json();
      })
      .then((response) => setPosts(response.posts))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  // if posts is not null and empty
  if (posts && posts.length === 0) return <p>No posts yet...</p>;

  // console.log(posts);

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
