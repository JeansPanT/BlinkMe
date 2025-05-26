import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Camera, Edit, Check, User, Shield } from "lucide-react";

const BASE_URL = "http://localhost:8080";

const MyProfile = () => {
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("loggedInUserId");
  const emailId = sessionStorage.getItem("loggedInUserEmail");
  const token = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("loggedInUserName");
  // console.log("User ID:", userId);
  // console.log("User Email:", emailId);
  // console.log("JWT Token:", token);
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });


        //new 
        const profilePictureUrl = response.data.profilePictureUrl || "/default-avatar.jpg";
      setProfilePic(profilePictureUrl);
      
      // Store in sessionStorage
      sessionStorage.setItem("loggedInUserProfilePic", profilePictureUrl);
      console.log("Stored Profile Picture:", sessionStorage.getItem("loggedInUserProfilePic"));        setName(userName || "John Doe");
        setBio(response.data.bio || "No bio yet...");
        setStatus(response.data.status || "Available");
        setProfilePic(response.data.profilePictureUrl || "/default-avatar.png"); // Updated fallback image
        setEmail(emailId || "Not Available");
        console.log("Email set:", emailId);




      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = async (e) => {
    const userId = sessionStorage.getItem("loggedInUserId");
    console.log("User ID:", userId);

    const file = e.target.files[0];
    console.log("Selected File:", file);

    if (file) {
      // setProfilePic(file);
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await axios.put(
          `${BASE_URL}/profile/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        console.log("Full Response:", response.data);


        //setProfilePic(response.data.profilePictureUrl);
        if (response.data.profilePictureUrl) {
          // Update sessionStorage after a successful upload
          sessionStorage.setItem("loggedInUserProfilePic", response.data.profilePictureUrl);
          setProfilePic(response.data.profilePictureUrl);
          console.log("Updated Profile Picture in sessionStorage:", sessionStorage.getItem("loggedInUserProfilePic"));
        }




        setMessage("Profile picture updated!");
      } catch (error) {
        setMessage("Failed to update profile picture.");
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const payload = new FormData();
      payload.append("status", status || "");
      payload.append("bio", bio || "");
      if (profilePic instanceof File) {
        payload.append("profilePicture", profilePic);
      }

      const response = await axios.put(
        `${BASE_URL}/profile/${userId}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response from backend:", response.data);
      setMessage("Profile updated successfully!");
      if (response.data.profilePictureUrl) {
        setProfilePic(response.data.profilePictureUrl);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUpdateProfile();
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
              My Profile
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Secure • End-to-end encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main profile content */}
      <div className="max-w-md mx-auto py-10 px-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 animate-slide-up">
          {/* Profile picture */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img
                  src={
                    profilePic
                      ? profilePic.startsWith("/")
                        ? `http://localhost:8080${profilePic}`
                        : profilePic
                      : "/default-avatar.png"
                  }
                  alt="Profile"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-110">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          
          {/* Name */}
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {name}
          </h1>
          
          {/* Status */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {isEditingStatus ? (
              <div className="flex items-center w-full max-w-xs">
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  onBlur={() => {
                    setIsEditingStatus(false);
                    handleUpdateProfile();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsEditingStatus(false);
                      handleUpdateProfile();
                    }
                  }}
                  className="bg-gray-100/60 px-4 py-2 rounded-lg text-gray-800 w-full outline-none focus:ring-2 focus:ring-blue-500/20"
                  autoFocus
                  placeholder="Set your status..."
                />
                <button 
                  onClick={() => {
                    setIsEditingStatus(false);
                    handleUpdateProfile();
                  }}
                  className="p-2 ml-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center group">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-xl">
                  <p className="text-gray-700">{status || "Set your status"}</p>
                </div>
                <button
                  onClick={() => setIsEditingStatus(true)}
                  className="ml-2 p-2 text-gray-500 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          {/* Bio */}
          <div className="bg-gray-50/80 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-700">About</h3>
              <button
                onClick={() => setIsEditingBio(true)}
                className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            {isEditingBio ? (
              <div className="w-full">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  onBlur={() => {
                    setIsEditingBio(false);
                    handleUpdateProfile();
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/80 rounded-lg p-3 text-gray-700 resize-none min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500/20"
                  autoFocus
                  placeholder="Write something about yourself..."
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => {
                      setIsEditingBio(false);
                      handleUpdateProfile();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {bio || "No bio yet..."}
              </p>
            )}
          </div>
            {/* Email */}
          <div className="bg-gray-50/80 rounded-xl p-5">
            <h3 className="font-medium text-gray-700 mb-2">Email</h3>
            <p className="text-gray-600">{email || emailId || "Not Available"}</p>
          </div>
          
          {/* Status message */}
          {message && (
            <div className="mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-green-100/70 to-emerald-100/70 text-green-700 text-center animate-slide-up">
              {message}
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

export default MyProfile;
