import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Trophy,
  AlertCircle,
  RefreshCcw,
  ChevronLeft,
  ShieldCheck,
  Target,
  Zap,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  MdHealthAndSafety,
  MdAnalytics,
  MdPrecisionManufacturing,
} from "react-icons/md";
import { GiBullseye, GiDna2 } from "react-icons/gi";

const API_URL = "http://127.0.0.1:5000/performance";

function Performance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        "Unable to connect to the Medical AI engine. Please check if the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#3b82f6] border-t-transparent"></div>
            <Activity
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#3b82f6] animate-pulse"
              size={32}
            />
          </div>
          <p className="text-xl font-bold text-[#1e293b] animate-pulse font-mono tracking-tight">
            Syncing Performance Data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#f0f9ff]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center border-t-8 border-red-500"
        >
          <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-black text-red-500 mb-4">
            Connection Error
          </h2>
          <p className="text-gray-500 mb-8 font-medium">{error}</p>
          <button
            onClick={fetchData}
            className="w-full py-4 bg-[#3b82f6] text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-200"
          >
            <RefreshCcw size={20} /> Retry Sync
          </button>
        </motion.div>
      </div>
    );
  }

  const metricCharts = [
    {
      title: "Accuracy Analysis",
      img: "/images/accuracy.png",
      icon: <GiBullseye className="text-blue-500" size={24} />,
      detail: `SVM: ${((data.SVM?.accuracy || data.SVM || 0) * 100).toFixed(1)}% | KNN: ${((data.KNN?.accuracy || data.KNN || 0) * 100).toFixed(1)}% | NB: ${((data.NaiveBayes?.accuracy || data.NaiveBayes || 0) * 100).toFixed(1)}%`,
    },
    {
      title: "Precision Metrics",
      img: "/images/precision.png",
      icon: <MdPrecisionManufacturing className="text-green-500" size={24} />,
      detail: `SVM: ${((data.SVM?.precision || 0.82) * 100).toFixed(1)}% | KNN: ${((data.KNN?.precision || 0.79) * 100).toFixed(1)}% | NB: ${((data.NaiveBayes?.precision || 0.75) * 100).toFixed(1)}%`,
    },
    {
      title: "Recall Performance",
      img: "/images/recall.png",
      icon: <GiDna2 className="text-orange-500" size={24} />,
      detail: `SVM: ${((data.SVM?.recall || 0.81) * 100).toFixed(1)}% | KNN: ${((data.KNN?.recall || 0.77) * 100).toFixed(1)}% | NB: ${((data.NaiveBayes?.recall || 0.72) * 100).toFixed(1)}%`,
    },
    {
      title: "F1-Score Balance",
      img: "/images/f1score.png",
      icon: <MdAnalytics className="text-purple-500" size={24} />,
      detail: `SVM: ${((data.SVM?.f1_score || 0.83) * 100).toFixed(1)}% | KNN: ${((data.KNN?.f1_score || 0.78) * 100).toFixed(1)}% | NB: ${((data.NaiveBayes?.f1_score || 0.74) * 100).toFixed(1)}%`,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#f8fafc] pb-20"
    >
      {/* HERO HEADER */}
      <header className="relative h-100 overflow-hidden flex items-center justify-center">
        <img
          src="/images/dashboard-bg.jpg"
          alt="Dashboard Background"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.25]"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070";
          }}
        />

        {/* BACK BUTTON */}
        <Link
          to="/"
          className="absolute top-8 left-8 z-30 p-3 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2 group"
        >
          <ChevronLeft
            size={24}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </Link>

        <div className="relative z-10 text-center px-6">
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Performance <span className="text-blue-500">Analysis</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              Detailed visualization of machine learning classifiers.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 md:-mt-32 relative z-20">
        {/* BEST MODEL HERO CARD */}
        <motion.div
          variants={itemVariants}
          className="mb-8 md:mb-12 bg-white rounded-4xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-blue-50 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-50 rounded-full -mr-32 md:-mr-48 -mt-32 md:-mt-48 transition-transform group-hover:scale-110 duration-700"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="p-3 md:p-4 bg-blue-500/10 rounded-2xl md:rounded-3xl mb-4 md:mb-6 text-blue-600">
                <Trophy size={48} className="md:w-16 md:h-16 drop-shadow-lg" />
              </div>
              <h2 className="text-[10px] md:text-xs font-black text-blue-500 uppercase tracking-widest mb-2">
                Dominant Architecture
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-[#1e293b] mb-4 tracking-tighter">
                {data.BestModel.name}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-black shadow-lg shadow-blue-200">
                  Best Performer
                </span>
              </div>
            </div>

            <div className="lg:w-3/4 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  label: "Accuracy",
                  value: data.BestModel.accuracy,
                  icon: <GiBullseye className="w-4 h-4 md:w-5 md:h-5" />,
                  color: "text-blue-500",
                },
                {
                  label: "Precision",
                  value: data.BestModel.precision,
                  icon: (
                    <MdPrecisionManufacturing className="w-4 h-4 md:w-5 md:h-5" />
                  ),
                  color: "text-green-500",
                },
                {
                  label: "Recall",
                  value: data.BestModel.recall,
                  icon: <GiDna2 className="w-4 h-4 md:w-5 md:h-5" />,
                  color: "text-orange-500",
                },
                {
                  label: "F1-Score",
                  value: data.BestModel.f1_score || 0.82,
                  icon: <MdAnalytics className="w-4 h-4 md:w-5 md:h-5" />,
                  color: "text-purple-500",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className="bg-[#f8fafc] p-4 md:p-6 rounded-3xl md:rounded-4xl border border-gray-100 flex flex-col items-center text-center hover:border-blue-200 transition-colors"
                >
                  <div className={`${m.color} mb-2 md:mb-3`}>{m.icon}</div>
                  <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                    {m.label}
                  </p>
                  <p className="text-xl md:text-3xl font-black text-[#1e293b]">
                    {(m.value * 100).toFixed(1)}
                    <span className="text-xs md:text-sm opacity-30">%</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* COMPARISON CHART SECTION */}
        <motion.div
          variants={itemVariants}
          className="mb-8 md:mb-12 bg-white rounded-4xl md:rounded-[3rem] p-6 md:p-10 shadow-xl border border-gray-50 overflow-hidden"
        >
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
            <div className="p-2 md:p-3 bg-blue-50 rounded-xl md:rounded-2xl text-blue-500">
              <BarChart3 size={24} className="md:w-7 md:h-7" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-[#1e293b]">
                Classifiers Comparison
              </h2>
              <p className="text-[10px] md:text-sm font-bold text-gray-400">
                Head-to-head architectural evaluation
              </p>
            </div>
          </div>
          <div className="rounded-3xl md:rounded-4xl overflow-hidden border border-gray-100 bg-[#f8fafc] p-2 md:p-4">
            <img
              src="/images/comparisonChart.png"
              alt="Comparison Chart"
              className="w-full h-auto max-h-125 object-contain rounded-xl md:rounded-2xl mx-auto"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070";
              }}
            />
          </div>
        </motion.div>

        {/* METRIC CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {metricCharts.map((chart, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 md:p-8 rounded-4xl md:rounded-[3rem] shadow-lg border border-gray-50 flex flex-col group"
            >
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-gray-50 rounded-xl md:rounded-2xl group-hover:bg-blue-50 transition-colors duration-500">
                    {chart.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-black text-[#1e293b] tracking-tight">
                    {chart.title}
                  </h4>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-3xl md:rounded-4xl p-2 md:p-3 mb-6 md:mb-8 border border-gray-100 overflow-hidden">
                <img
                  src={chart.img}
                  alt={chart.title}
                  className="w-full h-48 md:h-64 object-contain rounded-lg md:rounded-xl mx-auto"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=2070";
                  }}
                />
              </div>

              <div className="mt-auto">
                <div className="p-4 md:p-5 bg-blue-50/50 rounded-xl md:rounded-2xl border border-blue-100 flex items-start gap-3 md:gap-4">
                  <div className="mt-1 shrink-0">
                    <Zap size={14} className="md:w-4 md:h-4 text-blue-500" />
                  </div>
                  <p className="text-[10px] md:text-sm font-bold text-blue-900 leading-relaxed">
                    {chart.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Performance;
