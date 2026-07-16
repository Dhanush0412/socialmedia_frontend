import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles["home-page"]}>

      <div className={styles["home-card"]}>

        <div className={styles["home-content"]}>

          <h1>
            Welcome to
            <span>{" "}Chat Connect 💬</span>
          </h1>

          <p>
            Connect with your friends,
            share messages and enjoy
            conversations in a simple
            and secure way.
          </p>

          <div className={styles["home-buttons"]}>

            <Link
              to="/login"
              className={styles["login-link"]}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={styles["register-link"]}
            >
              Create Account
            </Link>

          </div>

        </div>

        <div className={styles["home-image"]}>

          <div className={styles["chat-box"]}>

            <div className={`${styles["message"]} ${styles["received"]}`}>
              Hey 👋
            </div>

            <div className={`${styles["message"]} ${styles["sent"]}`}>
              Hello! How are you?
            </div>

            <div className={`${styles["message"]} ${styles["received"]}`}>
              Let's start chatting 🚀
            </div>

            <div className={`${styles["message"]} ${styles["received"]}`}>
              Welcome to Chat Connect.
            </div>

            <div className={`${styles["message"]} ${styles["sent"]}`}>
              Fast, secure and private.
            </div>

            <div className={`${styles["message"]} ${styles["received"]}`}>
              Start chatting with your friends.
            </div>

            <div className={`${styles["message"]} ${styles["sent"]}`}>
              Anytime. Anywhere.
            </div>

            <div className={`${styles["message"]} ${styles["received"]}`}>
              💬 Stay Connected.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;