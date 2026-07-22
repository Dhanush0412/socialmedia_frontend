import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.card}>
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className={styles.homeButton}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;