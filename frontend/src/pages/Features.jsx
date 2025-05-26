import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Zap, Shield, Globe, ArrowLeft, Menu, X, Star, Heart, CheckCircle, Lock, Share2, Bell, Smartphone } from "lucide-react";

const Features = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const featuresList = [
    {
      icon: <Shield className="w-10 h-10 text-emerald-600" />,
      title: "End-to-End Encryption",
      description: "All messages are encrypted from the moment they leave your device until they reach the recipient, ensuring complete privacy.",
      color: "from-emerald-50 to-teal-50",
      iconBg: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      title: "Instant Messaging",
      description: "Our optimized infrastructure ensures your messages are delivered in milliseconds, no matter where you are in the world.",
      color: "from-blue-50 to-indigo-50",
      iconBg: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Users className="w-10 h-10 text-purple-600" />,
      title: "Smart Group Chats",
      description: "Create and manage group conversations with advanced features like polls, shared calendars, and file organization.",
      color: "from-purple-50 to-pink-50",
      iconBg: "from-purple-500 to-pink-500"
    },
    {
      icon: <Lock className="w-10 h-10 text-red-600" />,
      title: "Message Security",
      description: "Set messages to auto-delete, prevent screenshots, and use two-factor authentication for enhanced security.",
      color: "from-red-50 to-orange-50",
      iconBg: "from-red-500 to-orange-500"
    },
    {
      icon: <Share2 className="w-10 h-10 text-amber-600" />,
      title: "Seamless File Sharing",
      description: "Share files of any type with blazing speed and without compromising quality or security.",
      color: "from-amber-50 to-yellow-50",
      iconBg: "from-amber-500 to-yellow-500"
    },
    {
      icon: <Bell className="w-10 h-10 text-cyan-600" />,
      title: "Smart Notifications",
      description: "AI-powered notification system that prioritizes messages based on your communication patterns.",
      color: "from-cyan-50 to-sky-50",
      iconBg: "from-cyan-500 to-sky-500"
    },
    {
      icon: <Smartphone className="w-10 h-10 text-violet-600" />,
      title: "Cross-Platform Sync",
      description: "Access your messages seamlessly across all your devices with real-time synchronization.",
      color: "from-violet-50 to-purple-50",
      iconBg: "from-violet-500 to-purple-500"
    },
    {
      icon: <Globe className="w-10 h-10 text-teal-600" />,
      title: "Global Accessibility",
      description: "Communicate with anyone, anywhere, with automatic translation and regional adaptability.",
      color: "from-teal-50 to-emerald-50",
      iconBg: "from-teal-500 to-emerald-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background decorative elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl"></div>
      <div className="hidden sm:block absolute bottom-40 left-10 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl"></div>
      
      {/* Navigation */}
      <nav className="relative z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">            
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => handleNavigation("/")}>
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  BlinkMe
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Secure & Fast</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => handleNavigation("/")}
                className="text-gray-600 hover:text-gray-900 font-medium hover:scale-105 transform transition-all"
              >
                Home
              </button>
              <button
                className="text-blue-600 font-semibold hover:scale-105 transform transition-all"
              >
                Features
              </button>
              <button
                onClick={() => handleNavigation("/contact")}
                className="text-gray-600 hover:text-gray-900 font-medium hover:scale-105 transform transition-all"
              >
                Contact
              </button>
              <button
                onClick={() => handleNavigation("/about-us")}
                className="text-gray-600 hover:text-gray-900 font-medium hover:scale-105 transform transition-all"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("/login")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white/90 backdrop-blur-sm rounded-2xl">
              <div className="flex flex-col gap-4 px-4">
                <button
                  onClick={() => {
                    handleNavigation("/");
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 font-medium text-left py-3 border-b border-gray-100"
                >
                  Home
                </button>
                <button
                  className="text-blue-600 font-semibold text-left py-3 border-b border-gray-100"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    handleNavigation("/contact");
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 font-medium text-left py-3 border-b border-gray-100"
                >
                  Contact
                </button>
                <button
                  onClick={() => {
                    handleNavigation("/about-us");
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 font-medium text-left py-3 border-b border-gray-100"
                >
                  About Us
                </button>
                <button
                  onClick={() => {
                    handleNavigation("/register");
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 mt-2 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 text-center"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 animate-slide-up">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-blue-800">Cutting-Edge Technology</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Powerful
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Discover the advanced features that make BlinkMe the most secure, fast, and intuitive 
            messaging platform available today.
          </p>
          
          <button
            onClick={() => handleNavigation("/")}
            className="inline-flex items-center gap-3 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 hover:scale-105 transition-all duration-300 animate-slide-up"
            style={{animationDelay: '0.3s'}}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.color} border border-white/60 rounded-3xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-3 transition-all duration-500 group animate-slide-up backdrop-blur-sm`}
              style={{animationDelay: `${0.4 + index * 0.1}s`}}
            >
              <div className={`bg-gradient-to-r ${feature.iconBg} w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-3 sm:mb-4">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden animate-slide-up" style={{animationDelay: '1.2s'}}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Experience These Features?
            </h3>
            <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join millions of users who trust BlinkMe for their daily communication needs.
              Experience all these incredible features first-hand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigation("/register")}
                className="bg-white text-blue-600 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Get Started Free
              </button>
              <button
                onClick={() => handleNavigation("/contact")}
                className="border-2 border-white/30 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <button
          onClick={() => handleNavigation("/register")}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center hover:shadow-blue-500/25 hover:scale-110 transition-all duration-300 animate-bounce-gentle relative"
        >
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </button>
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
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .animate-slide-up {
            animation-duration: 0.5s;
          }
        }
      `}</style>
    </div>
  );
};

export default Features;