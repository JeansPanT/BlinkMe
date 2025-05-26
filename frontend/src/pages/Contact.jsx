import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Phone, Mail, MapPin, Menu, X, Star, ArrowLeft, Clock, ExternalLink, Send } from "lucide-react";

const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-emerald-600" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      color: "from-emerald-50 to-teal-50",
      iconBg: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email",
      value: "support@blinkme.com",
      color: "from-blue-50 to-indigo-50",
      iconBg: "from-blue-500 to-indigo-500"
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      title: "Address",
      value: "123 BlinkMe Street, Tech City, 12345",
      color: "from-purple-50 to-pink-50",
      iconBg: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      title: "Working Hours",
      value: "Mon-Fri: 9AM - 6PM (EST)",
      color: "from-amber-50 to-yellow-50",
      iconBg: "from-amber-500 to-yellow-500"
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
                onClick={() => handleNavigation("/features")}
                className="text-gray-600 hover:text-gray-900 font-medium hover:scale-105 transform transition-all"
              >
                Features
              </button>
              <button
                className="text-blue-600 font-semibold hover:scale-105 transform transition-all"
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
                  onClick={() => {
                    handleNavigation("/features");
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 font-medium text-left py-3 border-b border-gray-100"
                >
                  Features
                </button>
                <button
                  className="text-blue-600 font-semibold text-left py-3 border-b border-gray-100"
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
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 animate-slide-up">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-blue-800">We're Here To Help</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Get In
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Have questions or feedback? We'd love to hear from you. 
            Our team is standing by to provide support and answer your inquiries.
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/80 rounded-3xl p-6 sm:p-8 shadow-xl animate-slide-up" style={{animationDelay: '0.4s'}}>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Send us a message</h3>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h4>
                <p className="text-gray-600 text-center">
                  Your message has been sent successfully. 
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange} 
                      required
                      rows="5" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : <>Send Message <Send className="w-5 h-5" /></>}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="animate-slide-up" style={{animationDelay: '0.5s'}}>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${method.color} border border-white/60 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group`}
                >
                  <div className={`bg-gradient-to-r ${method.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300 group-hover:scale-110`}>
                    {method.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {method.title}
                  </h4>
                  <p className="text-gray-600">
                    {method.value}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Connect With Us</h3>
              <p className="text-gray-600 mb-6">
                Follow us on social media for the latest updates, features, and news.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all">
                  <span className="sr-only">Facebook</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 hover:scale-110 transition-all">
                  <span className="sr-only">Twitter</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 hover:scale-110 transition-all">
                  <span className="sr-only">Instagram</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 hover:scale-110 transition-all">
                  <span className="sr-only">LinkedIn</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-24 animate-slide-up" style={{animationDelay: '0.6s'}}>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Visit Our Office</h3>
          <div className="bg-white/80 backdrop-blur-sm border border-white/80 rounded-3xl overflow-hidden shadow-xl">
            {/* This would be a real map in a production app */}
            <div className="bg-gray-200 w-full h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Interactive map would be displayed here</p>
                <p className="text-gray-500 text-sm mt-2">123 BlinkMe Street, Tech City, 12345</p>
              </div>
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

// Missing Check icon import
const Check = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};

export default Contact;