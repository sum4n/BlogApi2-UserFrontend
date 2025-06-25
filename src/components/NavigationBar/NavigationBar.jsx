import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const user = "";
  // const user = { id: 1, email: "user@email.com", username: "user" };
  return (
    <div className={styles.flexnav}>
      <h1>
        <Link to="/posts">My Blog</Link>
      </h1>
      {user && (
        <div className={styles.flexauth}>
          <p>{user.email}</p>
          <a href="#">Logout</a>
        </div>
      )}
      {!user && (
        <div className={styles.flexauth}>
          <Link to="/user/signup">Signup</Link>
          <a href="#">Login</a>
        </div>
      )}
      {/* <hr /> */}
    </div>
  );
};

export default NavigationBar;
