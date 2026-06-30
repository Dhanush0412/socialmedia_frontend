import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import styles from "./Layout.module.css";

function Layout({ children }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMinimized(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={styles.layout}>
      <Sidebar isMinimized={isMinimized} onToggle={toggleSidebar} />
      <main
        className={`${styles.mainContent} ${
          isMinimized ? styles.contentExpanded : ""
        } ${isMobile ? styles.mobileContent : ""}`}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;