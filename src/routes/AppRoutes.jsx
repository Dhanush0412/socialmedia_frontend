import {

  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import ForgotPassword from "../pages/ForgotPassword"
import Home from "../pages/Home"

import MyPosts from "../pages/MyPosts/MyPosts";
import NewPost from "../pages/NewPost/NewPost";
import Feed from "../pages/Feed/Feed";
import Groups from "../pages/Groups";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings/Settings";
import GroupRequests from "../pages/GroupRequests";
import Friends from "../pages/Friends";

import GroupChat from "../pages/GroupChat";
import Group from "../pages/Group";


import SearchUsers from "../pages/SearchUsers";
import PendingRequests from "../pages/PendingRequests";
import MyConnections from "../pages/MyConnections";

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
      <Route path="/group-requests" element={<GroupRequests />} />
      <Route path="/newpost" element={<NewPost />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/friends" element={<Friends />} />

      {/*Group chat */}
      <Route path="/group" element={<Group />} />
      <Route path="/chat/:groupid" element={<GroupChat />} />

      {/*Connection*/}
      <Route path="/search-users" element={<SearchUsers />} />
      <Route path="/pending-requests" element={<PendingRequests />} />
      <Route path="/connections" element={<MyConnections />} />


    </Routes>



  );
}

export default AppRoutes;