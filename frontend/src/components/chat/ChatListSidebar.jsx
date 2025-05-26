import { useState, useEffect } from "react";
import { Search, MessageCircle, Users, Plus, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const ChatListSidebar = ({ onSelectChat }) => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all users on component mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        // First try to get all users - adjust endpoint as needed
        let usersData = [];
        
        try {
          const response = await axios.get(`${BASE_URL}/profile/all-users`);
          usersData = response.data;
        } catch (error) {
          // Fallback: try to get users through search with common letters
          console.log("Trying fallback method to get users...");
          const searchPromises = ['a', 'b', 'c', 'd', 'e'].map(letter =>
            axios.get(`${BASE_URL}/profile/search?name=${letter}`).catch(() => ({ data: [] }))
          );
          const searchResults = await Promise.all(searchPromises);
          const allUsers = searchResults.flatMap(res => res.data);
          // Remove duplicates based on id
          const uniqueUsers = allUsers.filter((user, index, self) => 
            index === self.findIndex(u => u.id === user.id)
          );
          usersData = uniqueUsers;
        }

        // Process users with profile pictures
        const processedUsers = await Promise.all(
          usersData.map(async (user) => {
            try {
              const profileResponse = await axios.get(`${BASE_URL}/profile/${user.id}`);
              return {
                ...user,
                type: "user",
                profilePictureUrl: profileResponse.data.profilePictureUrl,
                lastSeen: "Recently active",
                isOnline: Math.random() > 0.5, // Simulated online status
              };
            } catch {
              return {
                ...user,
                type: "user",
                profilePictureUrl: "/default-avatar.jpg",
                lastSeen: "Recently active",
                isOnline: false,
              };
            }
          })
        );

        setContacts(processedUsers);
        setFilteredContacts(processedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setContacts([]);
        setFilteredContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [search, contacts]);

  const handleContactClick = (contact) => {
    onSelectChat(contact);
    navigate("/chat");
    console.log("Selected contact:", contact);
  };

  return (
  <div className="w-1/3 h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden mt-20">
    {/* Background decoration */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float"></div>
      <div className="absolute top-60 right-8 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-delayed"></div>
      <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce-slow"></div>
    </div>

    <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Contacts
                </h2>
                <p className="text-xs text-gray-500">
                  {loading ? "Loading..." : `${filteredContacts.length} contacts`}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate("/create-group")}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
              title="Create Group"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-gradient-to-r from-white/30 to-white/20">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <div className="w-5 h-5 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-white text-xs">×</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto px-2">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
                <p className="text-gray-500 text-sm">Loading contacts...</p>
              </div>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {search ? "No contacts found" : "No contacts yet"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {search 
                    ? `No contacts match "${search}"`
                    : "Your contact list will appear here"
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-1 py-2">
              {filteredContacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="flex items-center p-3 rounded-xl hover:bg-white/60 cursor-pointer transition-all duration-300 hover:shadow-md group"
                  onClick={() => handleContactClick(contact)}
                >
                  {/* Profile Picture */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={contact.profilePictureUrl || "/default-avatar.jpg"}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-white/50"
                      onError={(e) => {
                        e.target.src = "/default-avatar.jpg";
                      }}
                    />
                    
                    {/* Online Status */}
                    {contact.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg">
                        <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300">
                        {contact.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-1">
                      {contact.isOnline ? (
                        <>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <p className="text-xs text-green-600 font-medium">Online</p>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{contact.lastSeen}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Message Icon */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-180deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ChatListSidebar;