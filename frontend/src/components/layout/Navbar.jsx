import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Menu, X, User, Shield, LogOut, Settings, Bell } from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) {
      console.log("Logout cancelled by user.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      console.log(token);
      if (!token) {
        console.log("No token found, user already logged out.");
        navigate("/login");
        return;
      }

      console.log("Logging out...");

      // backend logout API
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.text();
      console.log("Logout response:", data);

      // Clear session storage & redirect to login
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      console.log("User logged out successfully. Redirecting to login...");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors mr-2 hover:scale-105 transform"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    BlinkMe
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Secure & Fast</p>
                </div>
              </div>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center gap-4">              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(prev => !prev)} 
                  className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors hover:scale-105 transform"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
                </button>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 py-3 z-20 animate-slide-in">
                    <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                      <h3 className="font-bold text-gray-800">Notifications</h3>
                      <button className="text-xs text-blue-600">Mark all read</button>
                    </div>
                    <div className="p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
                        <Bell className="w-8 h-8 text-blue-500" />
                      </div>
                      <h4 className="font-semibold text-gray-700 mb-1">No new notifications</h4>
                      <p className="text-sm text-gray-500">You're all caught up!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl transition-transform duration-500 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Menu
                </h2>
                <p className="text-sm text-gray-500">Navigation</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-white/50 rounded-xl transition-colors hover:scale-105 transform"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="p-6">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => {
                  console.log("Navigating to profile...");
                  navigate("/profile");
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                  <User className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800 group-hover:text-gray-900">My Profile</div>
                  <div className="text-sm text-gray-500">View and edit profile</div>
                </div>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  navigate("/blocklist");
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:from-red-500 group-hover:to-pink-500 transition-all duration-300">
                  <Shield className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800 group-hover:text-gray-900">Block List</div>
                  <div className="text-sm text-gray-500">Manage blocked users</div>
                </div>
              </button>
            </li>

            {/* <li>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl flex items-center justify-center group-hover:from-gray-500 group-hover:to-slate-500 transition-all duration-300">
                  <Settings className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800 group-hover:text-gray-900">Settings</div>
                  <div className="text-sm text-gray-500">App preferences</div>
                </div>
              </button>
            </li> */}
          </ul>

          {/* Sidebar Logout Button */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <button
              onClick={logout}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-red-200/50"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-red-600 group-hover:text-white">Logout</div>
                <div className="text-sm text-red-400 group-hover:text-red-100">Sign out of your account</div>
              </div>
            </button>
          </div>

          {/* User Info Section */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                U
              </div>
              <div>
                <div className="font-semibold text-gray-800">Welcome back!</div>
                <div className="text-sm text-gray-500">Stay connected securely</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500"
          onClick={() => setSidebarOpen(false)}
        />
      )}      <style jsx>{`
        @keyframes slide-in {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;