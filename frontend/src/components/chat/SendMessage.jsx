import { useState } from "react";
import { Send, Paperclip, Image, FileText, X } from "lucide-react";

const SendMessage = ({ addMessage }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!value.trim() && !file) return;

    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      mediaUrl = URL.createObjectURL(file);
      mediaType = file.type.split("/")[0];
    }

    addMessage(value, file);
    setValue(""); // Clear input
    setFile(null);
  };

  const getFileIcon = (file) => {
    if (!file) return <FileText className="w-4 h-4" />;
    
    const type = file.type.split("/")[0];
    switch (type) {
      case "image":
        return <Image className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };
  return (
    <div className="relative w-full bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl z-10">
      {/* File preview */}
      {file && (
        <div className="px-6 py-3 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
          <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3 shadow-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
              {getFileIcon(file)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 px-6 py-4">
        {/* File upload button */}
        <label className="relative cursor-pointer group">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          />
          <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-purple-100 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group">
            <Paperclip className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
          </div>
        </label>

        {/* Message input */}
        <div className="flex-1 relative">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-800 placeholder-gray-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
            type="text"
            placeholder="Type your message..."
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSendMessage}
          disabled={!value.trim() && !file}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
            value.trim() || file
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-4 left-20 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float"></div>
        <div className="absolute bottom-8 right-32 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-delayed"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SendMessage;