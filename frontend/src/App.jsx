import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ChatRoom from "./components/chat/ChatRoom";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./routes/PrivateRoute";
import ChatListSidebar from "./components/chat/ChatListSidebar";
import { useState, useEffect } from "react";
import AboutUs from "./pages/AboutUs";
import BlockList from "./pages/BlockList";
import CreateGroup from "./pages/CreateGroup";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Loader from "./components/Loader";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show loader on initial app load
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen">
      {/* Show Sidebar only on the /chat route */}
      {location.pathname.startsWith("/chat") && (
        <ChatListSidebar onSelectChat={setSelectedChat} />
      )}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/blocklist" element={<BlockList />} />

          <Route path="/create-group" element={<CreateGroup />} />

          <Route element={<PrivateRoute />}>
            <Route
              path="/chat"
              element={<ChatRoom selectedChat={selectedChat} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
