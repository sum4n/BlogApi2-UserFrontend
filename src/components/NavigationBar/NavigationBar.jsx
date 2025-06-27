import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, handleLogout }) => {
  // console.log(user);

  return (
    <div className={styles.flexnav}>
      <h1>
        <Link to="/posts">My Blog</Link>
      </h1>
      {user && (
        <div className={styles.flexauth}>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!user && (
        <div className={styles.flexauth}>
          <Link to="/user/signup">Signup</Link>
          <Link to="/user/login">Login</Link>
        </div>
      )}
      {/* <hr /> */}
    </div>
  );
};

export default NavigationBar;
