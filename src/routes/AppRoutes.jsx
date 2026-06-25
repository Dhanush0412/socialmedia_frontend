import {

  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword"
import Home from "../pages/Home"

import MyPosts from "../pages/MyPosts";
import NewPost from "../pages/NewPost";
import Feed from "../pages/Feed";
import Groups from "../pages/Groups";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings";


import GroupChat from "../pages/GroupChat";
import Group from "../pages/Group";



function AppRoutes() {
  return (


    <Routes>

      {/* Auth */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Sidebar Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/newpost" element={<NewPost />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/myposts" element={<MyPosts />} />


      {/*Group chat */}
      <Route path="/group" element={<Group />} />
      <Route path="/chat/:groupid" element={<GroupChat />} />
    </Routes>
      

  
  );
}

export default AppRoutes;