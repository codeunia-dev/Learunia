import Footer from "./Footer";

import { motion } from "framer-motion";
import Link from "next/link";

 
 
 export default function Home() {
   return (
     <div>
      
       
    <main className="bg-gradient-to-b from-black via-black to-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-20">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center max-w-5xl"
      >
        <h1 className="text-4xl md:text-6xl mt-5 font-extrabold bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 bg-clip-text text-transparent animate-pulse">
          Welcome to Learunia 🚀
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Your one-stop platform to <span className="text-blue-400">learn coding</span>, explore 
          <span className="text-purple-400"> roadmaps</span>, access 
          <span className="text-blue-400"> docs</span>, and master 
          <span className="text-purple-400"> cheatsheets</span> — everything you need in one place.
        </motion.p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          <Link
            href="/signup"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-7 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all transform hover:scale-105"
          >
            🚀 Get Started
          </Link>
          <Link
            href="/docs"
            className="border border-blue-400 hover:bg-blue-800 px-7 py-3 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
          >
            📘 Explore Docs
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl"
      >
        {[
          {
            title: "Interactive Cheatsheets",
            desc: "Master coding with concise, beginner-friendly cheatsheets and syntax tips.",
            icon: "📜",
          },
          {
            title: "Structured Roadmaps",
            desc: "Step-by-step learning paths designed to guide you from beginner to pro.",
            icon: "🛣️",
          },
          {
            title: "Comprehensive Docs",
            desc: "Find in-depth documentation to quickly solve problems and build projects.",
            icon: "📘",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all p-6 rounded-2xl shadow-xl text-center border border-gray-700 hover:border-blue-500 hover:scale-105 cursor-pointer"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-blue-400">{item.title}</h3>
            <p className="text-gray-300 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call-to-Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-20 text-center max-w-3xl"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text">
          Start Your Coding Journey Today! 🚀
        </h2>
        <p className="text-lg text-gray-300 mt-4">
          Join <span className="text-blue-400 font-semibold">thousands of learners</span> already mastering 
          programming with <span className="text-purple-400 font-semibold">Learnunia</span>.
        </p>
        <Link
          href="/signup"
          className="mt-6 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-xl text-lg font-semibold shadow-xl transition-all transform hover:scale-105"
        >
          Join Now ✨
        </Link>
      </motion.div>
    </main>

  <Footer/>
        
     </div>
   )
 }
 

 