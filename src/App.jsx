import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"

function App() {
  return (
    <Routes>

      {/* Initial Page */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/chat"
        element={<Chat />}
      />
      <Route
        path="/forgot-password"
        element={
          <ForgotPassword />
        }
      />

    </Routes>
  );
}

export default App;