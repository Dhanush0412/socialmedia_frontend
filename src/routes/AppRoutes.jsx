import {
  Routes,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Home = lazy(() => import("../pages/Home"));

const MyPosts = lazy(() => import("../pages/MyPosts/MyPosts"));
const NewPost = lazy(() => import("../pages/NewPost/NewPost"));
const Feed = lazy(() => import("../pages/Feed/Feed"));
const Groups = lazy(() => import("../pages/Groups"));
const Messages = lazy(() => import("../pages/Messages"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const GroupRequests = lazy(() => import("../pages/GroupRequests"));
const Friends = lazy(() => import("../pages/Friends"));

const GroupChat = lazy(() => import("../pages/GroupChat"));
const Group = lazy(() => import("../pages/Group"));

const SearchUsers = lazy(() => import("../pages/SearchUsers"));
const PendingRequests = lazy(() => import("../pages/PendingRequests"));
const MyConnections = lazy(() => import("../pages/MyConnections"));
const Chat = lazy(() => import("../pages/Chat"));
function AppRoutes() {
  return (
<Suspense
    fallback={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "20px"
        }}
      >
        Loading...
      </div>
    }
    >

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
      <Route path="/chat/:id" element={<Chat />} />

      {/*Connection*/}
      <Route path="/search-users" element={<SearchUsers />} />
      <Route path="/pending-requests" element={<PendingRequests />} />
      <Route path="/connections" element={<MyConnections />} />


    </Routes>

</Suspense>

  );
}

export default AppRoutes;