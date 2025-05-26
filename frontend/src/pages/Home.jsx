import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Zap, Shield, Globe, ArrowRight, Menu, X, Star, Heart, CheckCircle } from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Actual navigation function using react-router
  const handleNavigation = (path) => {
    navigate(path);
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Lightning Fast",
      description: "Messages delivered instantly with our optimized infrastructure",
      color: "from-blue-50 to-indigo-50",
      iconBg: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Bank-Level Security", 
      description: "End-to-end encryption protects every conversation",
      color: "from-emerald-50 to-teal-50",
      iconBg: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Smart Groups",
      description: "Organize conversations with intelligent group management",
      color: "from-purple-50 to-pink-50",
      iconBg: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "100+", label: "Happy Users", icon: <Heart className="w-5 h-5" /> },
    { number: "500+", label: "Messages Sent", icon: <MessageCircle className="w-5 h-5" /> },
    { number: "100+", label: "Support Multiples Countries", icon: <Globe className="w-5 h-5" /> },
    { number: "24/7", label: "Real time Deployed", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const testimonials = [
    {
      text: "BlinkMe has revolutionized how our team communicates. The speed is incredible!",
      author: "Rohan Pawar",
      role: "Student at MediCaps University"
    },
    {
      text: "Finally, a messaging app that puts privacy first without compromising on features.",
      author: "Yashwardhan Nigam",
      role: "Student at SVVV"
    },
    {
      text: "The most intuitive messaging platform I've ever used. Absolutely love it!",  
      author: "Prince Jaiswal",
      role: "Student at IPS Academy"
    }
  ];
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl animate-float"></div>
      <div className="hidden sm:block absolute bottom-40 left-10 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl animate-float-delayed"></div>

      {/* Navigation */}
      <nav className="relative z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:scale-105 transition-transform">
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
            <div className="hidden md:flex items-center gap-8">              <button 
                onClick={() => handleNavigation("/features")}
                className="text-gray-600 hover:text-gray-900 font-medium hover:scale-105 transform transition-all"
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
              <div className="flex flex-col gap-4 px-4">                <button 
                  onClick={() => {
                    handleNavigation("/features");
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 font-medium text-left py-3 border-b border-gray-100"
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
        <div className="text-center">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 animate-slide-up">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium text-blue-800">Trusted by millions worldwide</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Messaging
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              Experience the future of communication with <strong>BlinkMe</strong> – where security meets speed. 
              Connect instantly, share securely, and communicate effortlessly with anyone, anywhere.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-20 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <button
              onClick={() => handleNavigation("/register")}
              className="w-full sm:w-auto group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden"
            >
              <span className="relative z-10">Start Messaging</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.color} border border-white/60 rounded-3xl p-6 sm:p-8 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-3 transition-all duration-500 group animate-slide-up backdrop-blur-sm`}
              style={{animationDelay: `${0.4 + index * 0.1}s`}}
            >
              <div className={`bg-gradient-to-r ${feature.iconBg} w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-24 p-4 sm:p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center hover:scale-110 transition-transform duration-300 cursor-default animate-slide-up group"
              style={{animationDelay: `${0.8 + index * 0.1}s`}}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-blue-500 group-hover:scale-125 transition-transform">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 md:mt-24 animate-slide-up" style={{animationDelay: '1.2s'}}>
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">
            Loved by Users Worldwide
          </h3>
          <p className="text-gray-600 text-center mb-8 sm:mb-12 text-base sm:text-lg">
            See what people are saying about BlinkMe
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-white/80 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden animate-slide-up" style={{animationDelay: '1.4s'}}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Experience BlinkMe?
            </h3>
            <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join millions who trust BlinkMe for secure, lightning-fast messaging. 
              Your conversations deserve the best protection and performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigation("/register")}
                className="bg-white text-blue-600 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Start Free Today
              </button>
              <button
                onClick={() => handleNavigation("/about-us")}
                className="border-2 border-white/30 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Learn More
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
      </div>      <style jsx>{`
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
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(45deg); }
          100% { transform: rotate(405deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
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

export default Home;