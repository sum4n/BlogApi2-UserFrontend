import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";
import { format } from "date-fns";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/posts`)
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
      <h2>Posts:</h2>
      <ul>
        <hr />
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <div>
                <h3>
                  <Link to={`/posts/${post.id}`}>
                    <p>{post.title}</p>
                  </Link>
                </h3>
                <p>{post.content}</p>
                <small>
                  Created on:{" "}
                  {format(new Date(post.createdAt), "dd-MM-yyyy hh:mm a")}
                </small>
                <hr />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Posts;
