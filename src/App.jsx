import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./pages/Chat";

// Sidebar Pages
import NewPost from "./pages/NewPost";
import Feed from "./pages/Feed";
import Groups from "./pages/Groups";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Auth */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Sidebar Routes */}
      <Route
        path="/newpost"
        element={<NewPost />}
      />

      <Route
        path="/feed"
        element={<Feed />}
      />

      <Route
        path="/groups"
        element={<Groups />}
      />

      <Route
        path="/messages"
        element={<Messages />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* Chat
      <Route
        path="/chat"
        element={<Chat />}
      /> */}

      {/* Invalid Route */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />

    </Routes>
  );
}

export default App;