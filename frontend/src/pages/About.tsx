import React from "react";
import { useNavigate } from "react-router-dom";
import lightLogo from "../assets/lightLogo.svg";
import darkLogo from "../assets/darkLogo.svg";
import { useColorSchemeStore } from "../stores/colorSchemeStore";
import {
  FaArrowLeft,
  FaStar,
  FaUsers,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";

const AboutPage: React.FC = () => {
  const { isDarkMode } = useColorSchemeStore();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const features = [
    {
      icon: <FaStar className="w-8 h-8 text-yellow-400" />,
      title: "Authentic Reviews",
      description: "Real experiences from verified users",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-blue-400" />,
      title: "Growing Community",
      description: "Join thousands of trusted reviewers",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-green-400" />,
      title: "Verified Reviews",
      description: "Quality-checked and spam-free content",
    },
    {
      icon: <FaHeart className="w-8 h-8 text-red-400" />,
      title: "User-Centric",
      description: "Built for consumers, by consumers",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={handleBackClick}
          className="group flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700"
        >
          <FaArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
          <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 font-medium transition-colors duration-300">
            Back
          </span>
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        {/* Logo Section */}
        <div className="mb-12 transform hover:scale-105 transition-transform duration-300">
          <img
            src={isDarkMode ? darkLogo : lightLogo}
            alt="RevieW Sphere Logo"
            className="h-32 w-64 drop-shadow-2xl"
          />
        </div>

        {/* Main Content Container */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
              About RevieW Sphere
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Main Description */}
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed">
            <p className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              Welcome to{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                RevieW Sphere
              </span>
              , your go-to platform for honest and detailed product reviews. Our
              mission is to help consumers make informed decisions by providing
              comprehensive reviews and ratings from real users.
            </p>

            <p className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              At RevieW Sphere, we believe in{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                transparency and authenticity
              </span>
              . Our community of reviewers shares their genuine experiences with
              various products, ensuring that you get the most accurate and
              reliable information before making a purchase.
            </p>

            <p className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              Join us in creating a trusted space for product reviews and become
              a part of our{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                growing community
              </span>
              . Together, we can make shopping smarter and more enjoyable.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Thank You Message */}
          <div className="mt-12 relative">
            <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-200 dark:border-purple-800 shadow-xl">
              <div className="animate-pulse">
                <p className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Thank you for visiting RevieW Sphere!
                </p>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                We hope you find our reviews helpful and informative.
              </p>

              {/* Floating Hearts */}
              <div className="absolute -top-2 -right-2 text-red-400 animate-bounce">
                <FaHeart className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-2 -left-2 text-pink-400 animate-bounce animation-delay-1000">
                <FaHeart className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { number: "10K+", label: "Happy Users" },
              { number: "50K+", label: "Reviews Written" },
              { number: "1K+", label: "Products Reviewed" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
