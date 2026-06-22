import Layout from "../components/Layout";
import "../css/Dashboard.css";

function Messages() {
  return (
    <Layout>

      <div className="dashboard-container">

        <div className="dashboard-card">

          <h2>Messages</h2>

          <p>
            All chats and messages will appear here.
          </p>

        </div>

      </div>

    </Layout>
  );
}

export default Messages;