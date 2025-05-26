import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import SendMessage from "./SendMessage";
import Navbar from "../layout/Navbar";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useNavigate } from "react-router-dom";
import { MessageCircle, User, Shield, ArrowLeft } from "lucide-react";

const ChatRoom = ({ selectedChat }) => {
  const navigate = useNavigate();

  const [chatMessages, setChatMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [youBlocked, setYouBlocked] = useState(false);
  const [isGroupMember, setIsGroupMember] = useState(true);
  const isGroup = selectedChat?.type === "group";

  const senderId = Number(sessionStorage.getItem("loggedInUserId"));
  const recipientId = Number(selectedChat?.id);

  useEffect(() => {
    if (!selectedChat || !senderId || !recipientId) {
      console.log("Missing sender or recipient ID!");
      return;
    }

    console.log("Sender ID:", senderId);
    console.log("Recipient ID:", recipientId);
    console.log("Selected Chat:", selectedChat);

    fetch(
      `http://localhost:8080/api/messages/chat-history?userId1=${senderId}&userId2=${recipientId}`
    )
      .then((response) => response.json())
      .then((data) =>
        setChatMessages((prev) => ({ ...prev, [recipientId]: data }))
      )
      .catch((error) => console.error("Error fetching chat history:", error));

    console.log("Sender ID is", senderId);
    console.log("Recipient ID is", recipientId);

    if (stompClient) {
      console.log("Disconnecting previous WebSocket...");
      stompClient.deactivate();
    }

    // WebSocket setup
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log("Connected to WebSocket", frame);

        // Subscribe to private messages for recipientId
        client.subscribe(`/topic/messages/${senderId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          const chatId =
            newMessage.sender.id === senderId
              ? newMessage.recipient.id
              : newMessage.sender.id;
          console.log(`Subscribed to /topic/messages/${senderId}`);

          console.log("Received message:", JSON.parse(message.body));
          console.log("Received message is", newMessage);

          setChatMessages((prev) => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), newMessage],
          }));
        });
      },
      onDisconnect: () => console.log("Disconnected from WebSocket"),
    });

    client.activate();
    setStompClient(client);
    console.log("Attempting to connect to WebSocket...");

    const checkIfBlocked = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/blocks/${senderId}`);
        const blockedList = await res.json();
        const ids = blockedList.map((entry) => entry.blocked.id);
        setYouBlocked(ids.includes(recipientId));
      } catch (err) {
        console.error("Error checking block status:", err);
      }
    };

    checkIfBlocked();

    return () => {
      if (client) {
        console.log("Cleaning up WebSocket...");
        client.deactivate();
      }
    };
  }, [selectedChat]);

  // **upload file**
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8080/api/messages/upload-media",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload file");

      return await response.text();
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const sendMessage = async (text, file) => {
    if (!senderId || !recipientId) {
      console.error("Sender or recipient ID is missing!");
      return;
    }
    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      setSelectedFile(file);
      mediaUrl = await uploadFile(file);
      if (!mediaUrl) {
        console.error("Failed to upload file");
        return;
      }
      mediaType = file.type.split("/")[0];
    }

    console.log("Before sending message:");
    console.log("Content:", text);
    console.log("Media URL:", mediaUrl ? mediaUrl : "No media attached");
    console.log("Media Type:", mediaType ? mediaType : "No media type");

    const chatMessage = {
      senderId,
      recipientId,
      content: text || "",
      mediaUrl,
      mediaType,
    };

    const destination = mediaUrl
      ? "/app/send-media-message"
      : "/app/send-message";

    // **Optimistically update UI before sending message**
    const newMessage = {
      id: Date.now(),
      sender: { id: senderId },
      recipient: { id: recipientId },
      content: text,
      mediaUrl,
      mediaType,
      timestamp: new Date().toISOString(),
    };

    console.log("File URL before sending:", newMessage.mediaUrl);
    console.log("Message Payload:", newMessage);
    console.log("Destination:", destination);

    setChatMessages((prev) => ({
      ...prev,
      [recipientId]: [...(prev[recipientId] || []), newMessage],
    }));

    // Send message via WebSocket
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: destination,
        body: JSON.stringify(chatMessage),
      });
      console.log("Message sent via WebSocket", chatMessage);
    } else {
      console.error("WebSocket is not connected!");
    }
  };

  if (!selectedChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <Navbar />
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float"></div>
          <div className="absolute top-60 right-32 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce-slow"></div>
        </div>

        <div className="flex items-center justify-center h-screen">
          <div className="text-center animate-slide-up">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MessageCircle className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome to BlinkMe</h2>
            <p className="text-gray-500 text-lg">Select a chat to start messaging</p>
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <Navbar />
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-16 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float"></div>
        <div className="absolute top-64 right-24 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce-slow"></div>
      </div>

      {/* Chat header with BlinkMe styling */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="flex items-center gap-4 p-4 max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div 
            className="flex items-center gap-3 flex-1 cursor-pointer p-3 rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-md"
            onClick={() => navigate(`/profile/${selectedChat.id}`)}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {selectedChat?.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Secure • End-to-end encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main chat content */}
      <div className="relative z-10">
        {youBlocked ? (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">User Blocked</h3>
              <p className="text-gray-500">Unblock to send or view messages</p>
            </div>
          </div>
        ) : (
          <div className="animate-slide-up">
            <ChatBox 
              messages={chatMessages[recipientId] || []} 
              selectedChat={selectedChat}
              currentUserId={senderId}
            />
            <div className="relative z-10">
              <SendMessage addMessage={sendMessage} />
            </div>
          </div>
        )}
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

export default ChatRoom;