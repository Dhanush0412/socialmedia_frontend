import Layout from "../components/Layout";
import "../css/Dashboard.css";

function Feed() {
  return (
    <Layout>

      <div className="dashboard-container">

        <div className="dashboard-card">

          <h2>Feed</h2>

          <p>
            All user posts will appear here.
          </p>

        </div>

      </div>

    </Layout>
  );
}

export default Feed;