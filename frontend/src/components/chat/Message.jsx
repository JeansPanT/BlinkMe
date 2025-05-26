import { useState, useEffect } from "react";
import { 
  Check, 
  CheckCheck, 
  Clock, 
  Download, 
  Image, 
  Video, 
  File,
  Shield,
  MoreVertical,
  Reply,
  Copy,
  Edit3,
  Trash2,
  AlertCircle
} from "lucide-react";

const Message = ({ 
  message, 
  onDeleteMessage, 
  onDeleteForEveryone,
  onReplyMessage 
}) => {
  const loggedInUserId = sessionStorage.getItem("loggedInUserId");
  const loggedInUserProfilePic =
    sessionStorage.getItem("loggedInUserProfilePic") || "/default-avatar.jpg";

  const isMyMessage = message.sender.id == loggedInUserId;

  const [senderProfilePic, setSenderProfilePic] = useState("/default-avatar.jpg");
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isMyMessage) {
      // Simulated API call - replace with your actual axios call
      // axios.get(`http://localhost:8080/profile/${message.sender.id}`)
      //   .then((response) => {
      //     if (response.data.profilePictureUrl) {
      //       setSenderProfilePic(response.data.profilePictureUrl);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching sender's profile:", error);
      //   });
      
      // Mock profile picture for demo
      setSenderProfilePic("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face");
    }
  }, [message.sender.id, isMyMessage]);

  // Get message status icon
  const getStatusIcon = () => {
    if (!isMyMessage) return null;
    
    switch (message.status) {
      case 'SENT':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'DELIVERED':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'READ':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  // Check if message can be deleted for everyone (within time limit)
  const canDeleteForEveryone = () => {
    const messageTime = new Date(message.timestamp);
    const now = new Date();
    const timeDiff = (now - messageTime) / (1000 * 60); // minutes
    return isMyMessage && timeDiff <= 60; // 1 hour limit
  };

  // Handle delete options
  const handleDeleteForMe = () => {
    if (onDeleteMessage) {
      onDeleteMessage(message.id, loggedInUserId);
    }
    setShowDeleteModal(false);
    setShowOptions(false);
  };

  const handleDeleteForEveryone = () => {
    if (onDeleteForEveryone) {
      onDeleteForEveryone(message.id, loggedInUserId);
    }
    setShowDeleteModal(false);
    setShowOptions(false);
  };

  const handleReply = () => {
    if (onReplyMessage) {
      onReplyMessage(message);
    }
    setShowOptions(false);
  };

  const handleCopy = () => {
    if (message.content) {
      navigator.clipboard.writeText(message.content);
    }
    setShowOptions(false);
  };

  // Use sender's profile picture for received messages
  const profilePic = isMyMessage ? loggedInUserProfilePic : senderProfilePic;

  return (
    <div className={`group flex items-end gap-3 mb-6 ${isMyMessage ? 'flex-row-reverse' : 'flex-row'} animate-slide-up`}>
      {/* Profile Picture */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
          <img
            alt="User Profile"
            src={profilePic}
            className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
            onError={(e) => {
              e.target.src = "/default-avatar.jpg";
              setImageError(true);
            }}
          />
        </div>
        {/* Online status indicator for other users */}
        {!isMyMessage && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      {/* Message Container */}
      <div className={`relative max-w-xs lg:max-w-md ${isMyMessage ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Message Header */}
        <div className={`flex items-center gap-2 mb-1 ${isMyMessage ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-sm font-semibold text-gray-700">
            {isMyMessage ? "You" : message.sender?.name || "Unknown User"}
          </span>
          <time className="text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </time>
        </div>

        {/* Message Bubble */}
        <div className={`relative px-4 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
          isMyMessage 
            ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white ml-4' 
            : 'bg-white/90 backdrop-blur-sm border border-gray-200/50 text-gray-800 mr-4 hover:bg-white hover:border-gray-300/50'
        }`}>
          {/* Message bubble tail */}
          <div className={`absolute top-4 w-0 h-0 ${
            isMyMessage 
              ? 'right-[-8px] border-l-[8px] border-l-blue-500 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent'
              : 'left-[-8px] border-r-[8px] border-r-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent'
          }`}></div>

          {/* Encryption indicator */}
          {message.encrypted && (
            <div className={`flex items-center gap-1 text-xs mb-2 ${
              isMyMessage ? 'text-blue-100' : 'text-gray-500'
            }`}>
              <Shield className="w-3 h-3" />
              <span>End-to-end encrypted</span>
            </div>
          )}

          {/* Message Content */}
          {message?.content &&
            message.content.trim() !== "" &&
            message.content.trim() !== message.mediaUrl?.trim() && (
              <p className="text-sm leading-relaxed break-words">{message.content}</p>
          )}

          {/* Media Content */}
          {message?.mediaUrl && (
            <div className="mt-3">
              {message.mediaType === "image" ? (
                <div className="relative group cursor-pointer">
                  <img
                    src={message.mediaUrl}
                    alt="Sent Image"
                    className="max-w-xs rounded-xl shadow-lg border-2 border-white/60 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gray-200 rounded-xl animate-pulse"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg">
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5">
                    <Image className="w-3 h-3 text-white" />
                  </div>
                </div>
              ) : message.mediaType === "video" ? (
                <div className="relative group">
                  <video 
                    controls 
                    className="max-w-xs rounded-xl shadow-lg border-2 border-white/60 hover:shadow-xl transition-all duration-300"
                  >
                    <source src={message.mediaUrl} type="video/mp4" />
                  </video>
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5">
                    <Video className="w-3 h-3 text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-100/50 rounded-xl border border-gray-200/50">
                  <div className="p-2 bg-gray-200 rounded-lg">
                    <File className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {message.mediaUrl.split('/').pop() || 'File'}
                    </p>
                    <p className="text-xs text-gray-500">Click to download</p>
                  </div>
                  <a
                    href={message.mediaUrl}
                    className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    download
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Message Options Button */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={`absolute top-2 ${isMyMessage ? 'left-2' : 'right-2'} opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded-full hover:bg-black/10`}
          >
            <MoreVertical className="w-3 h-3" />
          </button>
        </div>

        {/* Message Status */}
        <div className={`flex items-center gap-1 mt-1 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">
            {message.status === 'READ' ? 'Read' : message.status === 'delivered' ? 'Delivered' : 'Sent'}
          </span>
          {getStatusIcon()}
        </div>
      </div>

      {/* Message Options Dropdown */}
      {showOptions && (
        <div className={`absolute top-0 ${isMyMessage ? 'right-full mr-2' : 'left-full ml-2'} bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 py-2 z-20 min-w-[150px] animate-slide-in`}>
          <button 
            onClick={handleReply}
            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors"
          >
            <Reply className="w-4 h-4" />
            Reply
          </button>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          {isMyMessage && (
            <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          )}
          <div className="border-t border-gray-200/50 my-1"></div>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Delete message?</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Choose how you want to delete this message.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleDeleteForMe}
                className="w-full p-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="font-medium">Delete for me</div>
                <div className="text-sm text-gray-500">This message will be deleted from your device only</div>
              </button>
              
              {canDeleteForEveryone() && (
                <button
                  onClick={handleDeleteForEveryone}
                  className="w-full p-3 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition-colors text-left"
                >
                  <div className="font-medium">Delete for everyone</div>
                  <div className="text-sm text-red-500">This message will be deleted for all participants</div>
                </button>
              )}
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setShowOptions(false);
                }}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
        
        @keyframes slide-in {
          from { 
            opacity: 0; 
            transform: translateX(20px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default Message;