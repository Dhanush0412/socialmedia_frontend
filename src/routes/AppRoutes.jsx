import {
 
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home"

import MyPosts from "./pages/MyPosts";
import NewPost from "../pages/NewPost";
import Feed from "../pages/Feed";
import Groups from "../pages/Groups";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
   

      <Routes>

        {/* Auth */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />}/>

        {/* Sidebar Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/messages" element={<Messages />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/myposts" element={<MyPosts />}/>

      </Routes>

  
  );
}

export default AppRoutes;