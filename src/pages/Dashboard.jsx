import "../css/Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { useDashboard } from "../hooks/useDashboard";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";

function Dashboard() {
    const profileid =
        localStorage.getItem("profileid");
    console.log("profileid =", profileid);
    const {
        data,
        isLoading,
        error,
    } = useDashboard(profileid);

    if (isLoading) {
        return (
            <div className="loading">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="loading">
                Failed to load dashboard
            </div>
        );
    }

    const profile =
        data?.profile ||
        data?.data ||
        data;

    return (
        <div className="dashboard-layout">

    <Sidebar />
        <div className="dashboard-page">
            <div className="dashboard-container">
                {/* Header */}

                <div className="dashboard-header">
                    <div className="dashboard-image">
                        {profile?.profilepic ? (
                            <img
                                src={`http://localhost:5000/uploads/${profile.profilepic}`}
                                alt="Profile"
                            />
                        ) : (
                            <FaUserCircle />
                        )}
                    </div>

                    <div className="dashboard-user-info">
                        <h1>
                            {profile?.username ||
                                "User"}
                        </h1>

                        {/* <p>
                            Welcome to Panda Chat 🐼
                        </p> */}
                    </div>
                </div>

                {/* Bio */}

                <div className="dashboard-card">
                    <h2>Bio</h2>

                    <p>
                        {profile?.bio ||
                            "No bio available"}
                    </p>
                </div>

                {/* Stats */}

                <div className="stats-section">

                    <div className="stat-card">
                        <h3>Groups</h3>
                        <div className="count-circle">
                            {profile?.groups || 0}
                        </div>
                    </div>

                    <div className="stat-card">
                        <h3>Connections</h3>
                        <div className="count-circle">
                            {profile?.connections || 0}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;