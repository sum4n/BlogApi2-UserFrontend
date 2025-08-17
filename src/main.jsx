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
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import Posts from "./components/Posts.jsx";
import EditComment from "./components/EditComment/EditComment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/posts" replace /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/:postId", element: <Post /> },
      { path: "user/signup", element: <Signup /> },
      { path: "user/login", element: <Login /> },
      {
        path: "posts/:postId/comments/:commentId/edit",
        element: <EditComment />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
