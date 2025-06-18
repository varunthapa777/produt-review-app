import { motion } from "framer-motion";
import {
  Star,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import DarkLogo from "../assets/darkLogo.svg";
import LightLogo from "../assets/lightLogo.svg";

const LandingPage: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const scaleOnHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo placeholder - replace with your actual logo */}
            <Link to="/" className="flex items-center">
              <img
                src={LightLogo}
                alt="Logo"
                className="h-8 md:h-12 dark:hidden"
              />
              <img
                src={DarkLogo}
                alt="Logo"
                className="h-8 md:h-12 hidden dark:block"
              />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative px-6 py-20 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Review
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Everything
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover, share, and explore authentic product reviews in a
            beautiful, intuitive platform designed for the modern consumer.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="/home"
              whileHover={scaleOnHover}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-2xl"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>

            <motion.button
              whileHover={scaleOnHover}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-600 hover:border-purple-500 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"
        />
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="px-6 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose Review Sphere?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of product reviews with our cutting-edge
              features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8" />,
                title: "Smart Reviews",
                description:
                  "AI-powered review analysis and authentic rating systems",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Driven",
                description:
                  "Connect with like-minded reviewers and build your reputation",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Trending Products",
                description: "Discover what's hot and trending in real-time",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Verified Reviews",
                description:
                  "Advanced verification system ensures authentic feedback",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Quality Control",
                description:
                  "Sophisticated algorithms filter spam and fake reviews",
              },
              {
                icon: <ArrowRight className="w-8 h-8" />,
                title: "Easy Navigation",
                description:
                  "Intuitive interface designed for seamless user experience",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="px-6 py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Trusted by Thousands
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "1M+", label: "Reviews Written" },
              { number: "100K+", label: "Products Reviewed" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-xl text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-6 py-20 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Start Reviewing?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join our growing community and make your voice heard in the world of
            product reviews.
          </p>
          <motion.a
            href="/home"
            whileHover={scaleOnHover}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-10 py-5 rounded-full text-xl font-semibold transition-all duration-300 shadow-2xl"
          >
            <span>Launch Review Sphere</span>
            <ArrowRight className="w-6 h-6" />
          </motion.a>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-6 py-12 border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Link to="/" className="flex items-center">
              <img
                src={LightLogo}
                alt="Logo"
                className="h-8 md:h-12 dark:hidden"
              />
              <img
                src={DarkLogo}
                alt="Logo"
                className="h-8 md:h-12 hidden dark:block"
              />
            </Link>
          </div>
          <p className="text-gray-400">
            © 2025 Review Sphere. All rights reserved. Built with passion for
            authentic reviews.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
