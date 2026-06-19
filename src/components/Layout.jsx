import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-page">
        {children}
      </div>
    </div>
  );
}

export default Layout;