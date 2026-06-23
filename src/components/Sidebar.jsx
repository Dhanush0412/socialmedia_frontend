import { FaUser, FaPlusCircle, FaNewspaper, FaUsers, FaComments, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-logo">
          🐼 Panda Chat
        </h2>
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/dashboard"
              className="sidebar-link"
            >
              <FaUser />
              <span>Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/newpost"
              className="sidebar-link"
            >
              <FaPlusCircle />
              <span>New Post</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/feed"
              className="sidebar-link"
            >
              <FaNewspaper />
              <span>Feed</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/groups"
              className="sidebar-link"
            >
              <FaUsers />
              <span>Groups</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/messages"
              className="sidebar-link"
            >
              <FaComments />
              <span>Messages</span>
            </NavLink>
          </li>

        </ul>

      </div>

      <NavLink
        to="/settings"
        className="sidebar-link sidebar-settings"
      >
        <FaCog />
        <span>Settings</span>
      </NavLink>

    </div>
  );
}

export default Sidebar;