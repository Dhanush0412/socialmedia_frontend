import { FaUser, FaPlusCircle,FaUserFriends, FaNewspaper, FaUsers, FaComments, FaCog, FaUserPlus,FaSearch, FaPlusSquare } from "react-icons/fa";
import { HiUserAdd, HiOutlineUserGroup } from "react-icons/hi";
import { IoPersonAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";
import { FiUser, FiUserCheck } from "react-icons/fi";

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
              to="/search-users"
              className="sidebar-link"
            >
              <FaSearch />
              <span>Find Friends</span>
            </NavLink>
          </li>

          

          <li>
            <NavLink
              to="/friends"
              className="sidebar-link"
            >
              <FaUserFriends />
              <span>My Friends</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/group-requests"
              className="sidebar-link"
            >
              <FiUser />
              <span>Group Requests</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/newpost"
              className="sidebar-link"
            >
              <FaPlusSquare />
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