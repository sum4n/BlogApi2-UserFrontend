import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Post from "./components/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/posts"} />,
  },
  {
    path: "/posts",
    element: <App />,
  },
  {
    path: "/posts/:postId",
    element: <Post />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
