import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt-token");
    if (storedToken) {
      fetch("http://localhost:3000/api/user", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Fetch fired");
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Token fetch failed", error);
          localStorage.removeItem("jwt-token"); // remove bad token
        });
    }
  }, []);

  // Get token from login, which will trigger useEffect component rerender
  // on App, and set user data on login.
  function getToken(newToken) {
    localStorage.setItem("jwt-token", newToken);
    fetch("http://localhost:3000/api/user", {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.log("Login token fetch failed", err));
  }

  // Logout from Navigation Bar
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("jwt-token");
  }

  return (
    <>
      <NavigationBar user={user} handleLogout={handleLogout} />
      <Outlet context={{ getToken, user }} />
    </>
  );
}

export default App;
