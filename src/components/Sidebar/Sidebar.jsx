import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaUserFriends,
  FaNewspaper,
  FaUsers,
  FaComments,
  FaCog,
  FaSearch,
  FaPlusSquare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import styles from "./Sidebar.module.css";

const menuItems = [
  { path: "/dashboard", icon: FaUser, label: "Profile" },
  { path: "/search-users", icon: FaSearch, label: "Find Friends" },
  { path: "/friends", icon: FaUserFriends, label: "My Friends" },
  { path: "/group-requests", icon: FiUser, label: "Group Requests" },
  { path: "/newpost", icon: FaPlusSquare, label: "New Post" },
  { path: "/feed", icon: FaNewspaper, label: "Feed" },
  { path: "/groups", icon: FaUsers, label: "Groups" },
  { path: "/messages", icon: FaComments, label: "Messages" },
];

function Sidebar({ isMinimized, onToggle }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className={`${styles.sidebar} ${isMinimized ? styles.collapsed : ""}`}>
      <div className={styles.sidebarContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          {!isMinimized ? (
            <h2 className={styles.logoText}>🐼 Panda Chat</h2>
          ) : (
            <div className={styles.logoIcon}>🐼</div>
          )}
        </div>

        {/* Menu Items */}
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.path} className={styles.menuItem}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Tooltip
                  title={isMinimized ? item.label : ""}
                  placement="right"
                  arrow
                >
                  <span className={styles.icon}>
                    <item.icon />
                  </span>
                </Tooltip>
                {!isMinimized && <span className={styles.label}>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Settings at bottom */}
        <div className={styles.settingsContainer}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""} ${styles.settingsLink}`
            }
          >
            <Tooltip title={isMinimized ? "Settings" : ""} placement="right" arrow>
              <span className={styles.icon}>
                <FaCog />
              </span>
            </Tooltip>
            {!isMinimized && <span className={styles.label}>Settings</span>}
          </NavLink>
        </div>

        {/* Toggle Button */}
        <button
          className={styles.toggleButton}
          onClick={onToggle}
          aria-label={isMinimized ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isMinimized ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;