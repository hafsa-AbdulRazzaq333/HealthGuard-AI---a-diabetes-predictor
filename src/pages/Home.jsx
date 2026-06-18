import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Activity, ShieldCheck } from "lucide-react";
import { GiStethoscope } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";

const MovingText = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-3">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2,
          }}
          className={className}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center relative overflow-hidden font-sans bg-linear-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/55 z-10"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center max-w-3xl px-6"
      >
        {/* App Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8 flex justify-center"
        >
        </motion.div>

        {/* Title with Continuous Word Animation */}
        <div className="mb-6 space-y-2">
          <MovingText
            text="HealthGuard AI"
            className="text-4xl md:text-6xl font-black text-white tracking-tight"
          />
          <MovingText
            text="Diabetes Risk Prediction"
            className="text-2xl md:text-3xl font-bold text-blue-500 tracking-wide"
            delay={0.5}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed font-medium"
        >
          Advanced machine learning diagnostics providing smart healthcare
          insights and early risk detection.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {/* Predict Button */}
          <Link to="/predict" className="no-underline group">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 transition-all border-none cursor-pointer"
            >
              Predict Risk
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>

          {/* Performance Button */}
          <Link to="/performance" className="no-underline group">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-lg border border-slate-700 transition-all cursor-pointer"
            >
              Model Performance
              <BarChart3 size={20} className="text-blue-500" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
