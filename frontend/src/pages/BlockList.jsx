import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, User } from "lucide-react";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const BlockList = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      const loggedInUserId = sessionStorage.getItem("loggedInUserId");
      if (!loggedInUserId) return;

      try {
        const res = await axios.get(`${BASE_URL}/api/blocks/${loggedInUserId}`);
        console.log(`Blocked list for ${loggedInUserId}:`, res.data);

        const blockedList = res.data.map((entry) => entry.blocked); 

        const usersWithProfiles = await Promise.all(
          blockedList.map(async (user) => {
            try {
              const profileRes = await axios.get(`${BASE_URL}/profile/${user.id}`);
              return { ...user, profilePictureUrl: profileRes.data.profilePictureUrl };
            } catch (err) {
              console.error(`Error fetching profile for user ${user.id}`, err);
              return { ...user, profilePictureUrl: "/default-avatar.jpg" };
            }
          })
        );

        setBlockedUsers(usersWithProfiles);
      } catch (err) {
        console.error("Failed to fetch blocked users:", err);
      }
    };

    fetchBlockedUsers();
  }, []);

  const handleUnblock = async (userId, e) => {
    e.stopPropagation();
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");
    if (!loggedInUserId) return;

    try {
      await axios.delete(`${BASE_URL}/api/blocks/${loggedInUserId}/${userId}`);
      // Refresh the list
      setBlockedUsers(blockedUsers.filter(user => user.id !== userId));
    } catch (err) {
      console.error(`Failed to unblock user ${userId}:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-16 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float"></div>
        <div className="absolute top-64 right-24 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce-slow"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="flex items-center gap-4 p-4 max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blocked Users
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Manage blocked users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto py-10 px-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 animate-slide-up">
          {blockedUsers.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Blocked Users</h3>
              <p className="text-gray-500">You haven't blocked anyone yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {blockedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center bg-white/90 p-4 rounded-2xl hover:bg-white transition-all duration-300 cursor-pointer border border-gray-100 shadow-sm hover:shadow-md"
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden flex items-center justify-center">
                    {user.profilePictureUrl ? (
                      <img
                        src={user.profilePictureUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "/default-avatar.jpg")}
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button 
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm text-gray-700 transition-colors"
                    onClick={(e) => handleUnblock(user.id, e)}
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BlockList;
