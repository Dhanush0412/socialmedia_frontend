import {
  Routes,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ForgotPassword = lazy(() => import("../pages/ForgorPassword/ForgotPassword"));
const Home = lazy(() => import("../pages/Home"));

const MyPosts = lazy(() => import("../pages/MyPosts/MyPosts"));
const NewPost = lazy(() => import("../pages/NewPost/NewPost"));
const Feed = lazy(() => import("../pages/Feed/Feed"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Friends = lazy(() => import("../pages/Friends/Friends"));

const GroupChat = lazy(() => import("../pages/Groups/GroupChat"));
const Group = lazy(() => import("../pages/Group"));
const CreateGroup = lazy(() => import("../pages/Groups/CreateGroup"))
const GroupDetails = lazy(() => import("../pages/Groups/GroupDetails"))
const GroupRequests = lazy(() => import("../pages/Groups/GroupRequest"));
const GroupList=lazy(()=>import("../pages/Groups/GroupList"))

const SearchUsers = lazy(() => import("../pages/SearchUsers"));
const PendingRequests = lazy(() => import("../pages/PendingRequests"));
const MyConnections = lazy(() => import("../pages/MyConnections"));
const Chat = lazy(() => import("../pages/Chat"));
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
      
      <Route path="/settings" element={<Settings />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/friends" element={<Friends />} />

      {/*Group chat */}
      <Route path="/group" element={<Group />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/create-group" element={<CreateGroup />} />
      <Route path="/group/details/:groupid" element={<GroupDetails />} />
      <Route path="/group/chat/:groupid" element={<GroupChat />} />
      <Route path="/group/requests" element={<GroupRequests />} />
      <Route path="/groupchat" element={<GroupList />} />


      {/*Connection*/}
      <Route path="/search-users" element={<SearchUsers />} />
      <Route path="/pending-requests" element={<PendingRequests />} />
      <Route path="/connections" element={<MyConnections />} />


    </Routes>



  );
}

export default AppRoutes;