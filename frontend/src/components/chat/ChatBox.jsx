import { useRef, useEffect, useState } from "react";
import { 
  MessageCircle, 
  Image, 
  Video, 
  Download, 
  Play, 
  User, 
  MoreVertical, 
  Trash2, 
  AlertCircle,
  Edit3,
  Reply,
  Copy,
  Check,
  CheckCheck,
  Clock,
  Shield,
  Users,
  X,
  FileText
} from "lucide-react";

// Enhanced Message component with delete options and better status indicators
const Message = ({ 
  message, 
  currentUserId, 
  selectedChat, 
  onDeleteMessage,
  onDeleteForEveryone 
}) => {
  const isOwn = message.sender?.id === currentUserId || message.senderId === currentUserId;
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Get sender name - for own messages show "You", for others show their name
  const getSenderName = () => {
    if (isOwn) return "You";
    if (message.sender?.name) return message.sender.name;
    if (message.senderName) return message.senderName;
    return selectedChat?.name || "Unknown User";
  };

  // Get message status icon
  const getStatusIcon = () => {
    if (!isOwn) return null;
    
    switch(message.status) {
      case 'SENT':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'DELIVERED':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'READ':
        return <CheckCheck className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  // Handle delete options
  const handleDeleteForMe = () => {
    onDeleteMessage(message.id, currentUserId);
    setShowDeleteModal(false);
    setShowOptions(false);
  };

  const handleDeleteForEveryone = () => {
    onDeleteForEveryone(message.id, currentUserId);
    setShowDeleteModal(false);
    setShowOptions(false);
  };

  // Check if message can be deleted for everyone (within time limit)
  const canDeleteForEveryone = () => {
    const messageTime = new Date(message.timestamp);
    const now = new Date();
    const timeDiff = (now - messageTime) / (1000 * 60); // minutes
    return isOwn && timeDiff <= 60; // 1 hour limit
  };
  
  return (
    <div className={`group flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 relative`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative transition-all duration-300 hover:shadow-lg ${
        isOwn 
          ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl' 
          : 'bg-white/90 backdrop-blur-sm border border-gray-200/50 text-gray-800 shadow-md hover:shadow-lg hover:bg-white'
      }`}>
        {/* Message bubble tail with enhanced design */}
        <div className={`absolute top-4 w-0 h-0 ${
          isOwn 
            ? 'right-[-10px] border-l-[10px] border-l-blue-500 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent drop-shadow-sm'
            : 'left-[-10px] border-r-[10px] border-r-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent drop-shadow-sm'
        }`}></div>
        
        {/* Encryption indicator for encrypted messages */}
        {message.encrypted && (
          <div className={`flex items-center gap-1 text-xs mb-2 ${
            isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}>
            <Shield className="w-3 h-3" />
            <span>End-to-end encrypted</span>
          </div>
        )}
        
        {/* Sender name for received messages in group chats */}
        {!isOwn && selectedChat?.type === "group" && (
          <div className="text-xs font-semibold text-blue-600 mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {getSenderName()}
          </div>
        )}
        
        {/* Message content */}
        <div className="text-sm leading-relaxed">
          {message.content}
        </div>
        
        {/* Message timestamp and status */}
        <div className={`flex items-center justify-between mt-2 ${
          isOwn ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          <div className="flex items-center gap-1">
            {getStatusIcon()}
          </div>
        </div>

        {/* Message options button */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={`absolute top-2 ${isOwn ? 'left-2' : 'right-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-black/10`}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Message options dropdown */}
      {showOptions && (
        <div className={`absolute top-0 ${isOwn ? 'right-full mr-2' : 'left-full ml-2'} bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 py-2 z-20 min-w-[160px] animate-slide-in`}>
          <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors">
            <Reply className="w-4 h-4" />
            Reply
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors">
            <Copy className="w-4 h-4" />
            Copy
          </button>
          {isOwn && (
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

      {/* Delete confirmation modal */}
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
    </div>
  );
};

const ChatBox = ({ 
  messages = [], 
  selectedChat, 
  currentUserId, 
  onRemoveChat,
  websocketClient // WebSocket client for real-time communication
}) => {  const chatRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  
  // Close media preview
  const closePreview = () => setPreviewMedia(null);
  
  // Open media preview
  const openMediaPreview = (url, type, name = "", size = 0) => {
    setPreviewMedia({ url, type, name, size });
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  // Handle dropdown toggle
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Handle message deletion for user
  const handleDeleteMessage = (messageId, userId) => {
    if (websocketClient && websocketClient.connected) {
      websocketClient.send("/app/delete-message-user", {}, JSON.stringify({
        messageId: messageId,
        userId: userId
      }));
    }
  };

  // Handle message deletion for everyone
  const handleDeleteForEveryone = (messageId, userId) => {
    if (websocketClient && websocketClient.connected) {
      websocketClient.send("/app/delete-message-everyone", {}, JSON.stringify({
        messageId: messageId,
        userId: userId
      }));
    }
  };
  // Use actual messages, no demo messages
  const chatMessages = messages;
  return (
    <div className="relative h-[calc(100vh-220px)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 rounded-3xl border border-white/60 shadow-2xl overflow-hidden backdrop-blur-sm mt-16 mb-16">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-float-delayed blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-bounce-slow blur-xl"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse blur-lg"></div>
      </div>

      {/* Enhanced chat header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-gray-200/30 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">            <div className="relative">              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                {selectedChat?.profilePictureUrl ? (
                  <img 
                    src={selectedChat.profilePictureUrl} 
                    alt={selectedChat?.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.jpg";
                    }}
                  />
                ) : selectedChat?.type === "group" ? (
                  <Users className="w-6 h-6 text-white" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{selectedChat?.name || "Chat"}</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  {selectedChat?.type === "group" ? "Group Chat • 5 members" : "Online"}
                </p>
                {isTyping && (
                  <div className="flex items-center gap-1 text-sm text-blue-600">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span>typing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <button 
              onClick={toggleDropdown} 
              className="p-3 rounded-full hover:bg-gray-100/80 transition-all duration-200 hover:shadow-md"
              title="View profile"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
        {/* Centered user profile modal */}
      {showDropdown && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 p-6 m-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Profile</h2>
              <button 
                onClick={() => setShowDropdown(false)}
                className="p-2 rounded-full hover:bg-gray-100/80 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-6">              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg mb-4 overflow-hidden transform transition-transform hover:scale-105 duration-300">
                {selectedChat?.profilePictureUrl ? (
                  <img 
                    src={selectedChat.profilePictureUrl} 
                    alt={selectedChat?.name} 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = "/default-avatar.jpg";
                    }}
                  />
                ) : selectedChat?.type === "group" ? (
                  <Users className="w-14 h-14 text-white" />
                ) : (
                  <User className="w-14 h-14 text-white" />
                )}
              </div>
              <h3 className="font-bold text-xl text-gray-800">{selectedChat?.name || "User"}</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedChat?.email || "user@example.com"}</p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200/70 pt-4 mt-2">
              <h4 className="text-sm font-medium text-gray-600 mb-2">BIO</h4>
              <p className="text-sm text-gray-700 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                {selectedChat?.bio || "Hi there! I'm using BlinkMe for secure messaging."}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced messages container */}      <div
        ref={chatRef}
        className="flex flex-col-reverse h-full overflow-y-auto px-6 py-6 pb-16 space-y-4 scrollbar-thin scrollbar-thumb-blue-300/60 scrollbar-track-transparent"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#93c5fd40 transparent'
        }}
      >
        {chatMessages.length > 0 && chatMessages
          .slice()
          .reverse()
          .map((message) => (
            <div key={message.id} className="animate-slide-up">
              <Message 
                message={message} 
                currentUserId={currentUserId}
                selectedChat={selectedChat}
                onDeleteMessage={handleDeleteMessage}
                onDeleteForEveryone={handleDeleteForEveryone}
              />
              
              {/* Enhanced media content */}
              {message.mediaUrl && (
                <div className={`mt-3 flex ${
                  (message.sender?.id === currentUserId || message.senderId === currentUserId) 
                    ? 'justify-end' : 'justify-start'
                }`}>
                  <div className="max-w-xs lg:max-w-md">                    {message.mediaType === "image" ? (                      <div className="relative group cursor-pointer" onClick={() => openMediaPreview(message.mediaUrl, 'image/jpeg', `Image ${message.id}`, 0)}>
                        <img
                          src={message.mediaUrl}
                          alt="Sent media"
                          className="rounded-2xl shadow-xl border-2 border-white/60 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div className="flex gap-2">
                            <a 
                              href={message.mediaUrl} 
                              download={`image-${message.id}.jpg`}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
                            >
                              <Download className="w-5 h-5 text-gray-700" />
                            </a>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-2">
                          <Image className="w-4 h-4 text-white" />
                        </div>
                      </div>                    ) : message.mediaType === "video" ? (
                      <div className="relative group cursor-pointer" onClick={() => openMediaPreview(message.mediaUrl, 'video/mp4', `Video ${message.id}`, 0)}>
                        <div className="rounded-2xl shadow-xl border-2 border-white/60 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                          <video 
                            className="w-full h-full object-cover"
                          >
                            <source src={message.mediaUrl} type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent/30 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-2">
                          <Video className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <a 
                            href={message.mediaUrl} 
                            download={`video-${message.id}.mp4`}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg hover:shadow-xl"
                          >
                            <Download className="w-4 h-4 text-gray-700" />
                          </a>
                        </div>
                      </div>
                    ): message.mediaType === "file" ? (
                      <div className="relative group bg-white/80 rounded-2xl shadow-lg p-4 border border-gray-200/60 hover:bg-white hover:shadow-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">
                              {message.fileName || "Document"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.fileSize ? `${(message.fileSize / 1024).toFixed(1)} KB` : ""}
                            </div>
                          </div>
                          <a 
                            href={message.mediaUrl} 
                            download={message.fileName || `file-${message.id}`}
                            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                          >
                            <Download className="w-4 h-4 text-white" />
                          </a>
                        </div>
                      </div>
                    ): message.mediaType === "file" ? (
                      <div className="relative group bg-white/80 rounded-2xl shadow-lg p-4 border border-gray-200/60 hover:bg-white hover:shadow-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">
                              {message.fileName || "Document"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.fileSize ? `${(message.fileSize / 1024).toFixed(1)} KB` : ""}
                            </div>
                          </div>
                          <a 
                            href={message.mediaUrl} 
                            download={message.fileName || `file-${message.id}`}
                            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                          >
                            <Download className="w-4 h-4 text-white" />
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          ))}      </div>

      {/* Enhanced empty state */}
      {messages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-slide-up">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <MessageCircle className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No messages yet</h3>
            <p className="text-gray-500 leading-relaxed">
              Start a conversation with <span className="font-semibold">{selectedChat?.name || "this contact"}</span>
            </p>
          </div>
        </div>
      )}

      {/* Media preview modal */}
      {previewMedia && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full mx-4">
            <div className="absolute top-4 right-4">
              <button 
                onClick={closePreview} 
                className="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
            </div>
            
            {/* Preview for images */}
            {previewMedia.type.startsWith('image/') ? (
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <img
                  src={previewMedia.url}
                  alt="Media preview"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-xl">
                {/* Preview for videos */}
                {previewMedia.type.startsWith('video/') ? (
                  <video 
                    controls 
                    className="w-full rounded-t-2xl"
                  >
                    <source src={previewMedia.url} type={previewMedia.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                
                {/* Preview for files (e.g., PDFs) */}
                {previewMedia.type === 'application/pdf' && (
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded-t-2xl">
                    <FileText className="w-16 h-16 text-gray-400" />
                    <p className="text-gray-500 text-sm mt-2">
                      PDF preview is not available. You can download the file to view it.
                    </p>
                  </div>
                )}
                
                <div className="p-4 bg-white rounded-b-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{previewMedia.name}</h4>
                      <p className="text-sm text-gray-500">
                        {previewMedia.size ? `${(previewMedia.size / 1024).toFixed(1)} KB` : ""}
                      </p>
                    </div>
                    
                    <a 
                      href={previewMedia.url} 
                      download={previewMedia.name}
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                    >
                      <Download className="w-4 h-4 text-white" />
                    </a>
                  </div>
                  
                  {/* Additional actions for videos */}
                  {previewMedia.type.startsWith('video/') && (
                    <div className="flex gap-2">
                      <button className="flex-1 p-3 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md hover:from-green-500 hover:to-green-600 transition-all">
                        <Play className="w-5 h-5 mr-2" />
                        Watch Video
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Media preview modal */}
      {previewMedia && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full mx-4">
            <div className="absolute top-4 right-4">
              <button 
                onClick={closePreview} 
                className="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
            </div>
            
            {/* Preview for images */}
            {previewMedia.type.startsWith('image/') ? (
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <img
                  src={previewMedia.url}
                  alt="Media preview"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-xl">
                {/* Preview for videos */}
                {previewMedia.type.startsWith('video/') ? (
                  <video 
                    controls 
                    className="w-full rounded-t-2xl"
                  >
                    <source src={previewMedia.url} type={previewMedia.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                
                {/* Preview for files (e.g., PDFs) */}
                {previewMedia.type === 'application/pdf' && (
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded-t-2xl">
                    <FileText className="w-16 h-16 text-gray-400" />
                    <p className="text-gray-500 text-sm mt-2">
                      PDF preview is not available. You can download the file to view it.
                    </p>
                  </div>
                )}
                
                <div className="p-4 bg-white rounded-b-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{previewMedia.name}</h4>
                      <p className="text-sm text-gray-500">
                        {previewMedia.size ? `${(previewMedia.size / 1024).toFixed(1)} KB` : ""}
                      </p>
                    </div>
                    
                    <a 
                      href={previewMedia.url} 
                      download={previewMedia.name}
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                    >
                      <Download className="w-4 h-4 text-white" />
                    </a>
                  </div>
                  

                  {/* Additional actions for videos */}
                  {previewMedia.type.startsWith('video/') && (
                    <div className="flex gap-2">
                      <button className="flex-1 p-3 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md hover:from-green-500 hover:to-green-600 transition-all">
                        <Play className="w-5 h-5 mr-2" />
                        Watch Video
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}      <style jsx>{`
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatBox;