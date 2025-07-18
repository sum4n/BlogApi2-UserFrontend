import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API_BASE } from "../../config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);

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
    // alert(password);
    const data = {
      email: email,
      password: password,
    };

    fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setEmail("");
        setPassword("");
        alert("User has been saved");
        navigate("/user/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h2>Create account:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="user@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Signup;
