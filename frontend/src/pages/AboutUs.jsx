import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Zap, Shield, Globe, ArrowLeft, Menu, X, Star, Heart, CheckCircle, Target, Award, Clock, Lightbulb } from "lucide-react";

const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Privacy First",
      description: "Your conversations are yours alone. We believe in absolute privacy with end-to-end encryption.",
      color: "from-emerald-50 to-teal-50",
      iconBg: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Lightning Speed",
      description: "Built for performance. Every message, every feature optimized for instant delivery.",
      color: "from-blue-50 to-indigo-50",
      iconBg: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      title: "User-Centric",
      description: "Every decision we make puts our users first. Your experience is our priority.",
      color: "from-pink-50 to-rose-50",
      iconBg: "from-pink-500 to-rose-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      title: "Innovation",
      description: "Constantly pushing boundaries to bring you the most advanced messaging features.",
      color: "from-yellow-50 to-orange-50",
      iconBg: "from-yellow-500 to-orange-500"
    }
  ];


  const team = [
    {
      name: "Siddharth Kar",
      role: "Project Lead & FullStack Developer",
      bio: "IMCA Student at IPS Academy SOC"
    },
    {
      name: "Megha More",
      role: "Frontend & UI/UX Developer",
      bio: "IMCA Student at IPS Academy SOC"
    },
    {
      name: "Divyanshu Drivedi",
      role: "DevOps & Database Specialist",
      bio: "IMCA Student at IPS Academy SOC"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => handleNavigation("/")}
                className="text-gray-600 hover:text-gray-900 font-medium hover:scale-105 transform transition-all"
              >
                Home
              </button>
              <button className="text-gray-600 hover:text-gray-900 font-medium hover:scale-105 transform transition-all">
                Features
              </button>
              <button className="text-gray-600 hover:text-gray-900 font-medium hover:scale-105 transform transition-all">
                Contact
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
                  className="text-gray-600 hover:text-gray-900 font-medium text-left py-2"
                >
                  Home
                </button>
                <button className="text-gray-600 hover:text-gray-900 font-medium text-left py-2">
                  Features
                </button>
                <button className="text-gray-600 hover:text-gray-900 font-medium text-left py-2">
                  Security  
                </button>
                
                <button
                  onClick={() => {
                    handleNavigation("/register");
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 text-center"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full mb-8 animate-slide-up">
            <Star className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Our Story</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              BlinkMe
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            We're on a mission to revolutionize how people communicate. Born from a passion for privacy and speed, 
            BlinkMe combines cutting-edge technology with beautiful design to create the ultimate messaging experience.
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

        {/* Our Values */}
        <div className="mb-24">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
            Our Core Values
          </h3>
          <p className="text-gray-600 text-center mb-12 text-lg animate-slide-up" style={{animationDelay: '0.5s'}}>
            The principles that guide everything we do
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${value.color} border border-white/60 rounded-3xl p-8 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-3 transition-all duration-500 group animate-slide-up backdrop-blur-sm`}
                style={{animationDelay: `${0.6 + index * 0.1}s`}}
              >
                <div className={`bg-gradient-to-r ${value.iconBg} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-110`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-24">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-4 animate-slide-up" style={{animationDelay: '1.8s'}}>
            Meet Our Team
          </h3>
          <p className="text-gray-600 text-center mb-12 text-lg animate-slide-up" style={{animationDelay: '1.9s'}}>
            The people behind BlinkMe
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-white/80 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{animationDelay: `${2.0 + index * 0.1}s`}}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                  {member.name.charAt(0)}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                <div className="text-blue-600 font-semibold mb-4">{member.role}</div>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-white relative overflow-hidden animate-slide-up" style={{animationDelay: '2.4s'}}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-4">
              Ready to Join Our Journey?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Be part of the messaging revolution. Experience the perfect blend of security, speed, and design 
              that millions of users trust every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigation("/register")}
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Get Started Today
              </button>
              <button
                onClick={() => handleNavigation("/")}
                className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => handleNavigation("/register")}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:shadow-blue-500/25 hover:scale-110 transition-all duration-300 animate-bounce-gentle relative"
        >
          <MessageCircle className="w-8 h-8" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
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
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;