import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get outlet context function to set token
  const { getToken } = useOutletContext();

  const navigate = useNavigate();

  // If user is logged in, redirect to "/posts"
  const { user } = useOutletContext();
  useEffect(() => {
    if (user) {
      navigate("/posts", { replace: true });
    }
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(password, email);

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.message === "Login successful") {
          localStorage.setItem("jwt-token", response.token);
          getToken(response.token);
          setEmail("");
          setPassword("");
          // alert("User logged in successfully");
          // console.log(response);
          navigate("/posts");
        } else {
          alert(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <h2>Login:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="user@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
