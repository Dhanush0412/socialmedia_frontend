import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorCard}>
        <h1>500</h1>

        <h2>Oops! Something went wrong</h2>

        <p>
          An unexpected error occurred while loading this page.
        </p>

        {import.meta.env.DEV && (
          <pre>{error?.message}</pre>
        )}

        <div className={styles.buttons}>
          <button onClick={resetErrorBoundary}>
            Try Again
          </button>

          <Link to="/">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;