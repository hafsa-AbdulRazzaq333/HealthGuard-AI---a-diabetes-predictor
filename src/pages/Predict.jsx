import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Droplets,
  Heart,
  Scale,
  Calendar,
  Zap,
  ChevronLeft,
  User,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

// const API_URL = "http://127.0.0.1:5000/predict";
const API_URL = "http://127.0.0.1:5000/predict";
const DOWNLOAD_URL = "http://127.0.0.1:5000/download-report";

const inputFields = [
  {
    name: "insulin",
    label: "Insulin",
    placeholder: "e.g. 85",
    icon: Droplets,
    unit: "mu U/ml",
  },
  {
    name: "glucose",
    label: "Glucose",
    placeholder: "e.g. 120",
    icon: Activity,
    unit: "mg/dL",
  },
  {
    name: "blood_pressure",
    label: "Blood Pressure",
    placeholder: "e.g. 80",
    icon: Heart,
    unit: "mmHg",
  },
  {
    name: "bmi",
    label: "BMI",
    placeholder: "e.g. 26.5",
    icon: Scale,
    unit: "kg/m²",
  },
  {
    name: "age",
    label: "Age",
    placeholder: "e.g. 33",
    icon: Calendar,
    unit: "years",
  },
];

function Predict() {
  const [formData, setFormData] = useState({
    patient_name: "",
    insulin: "",
    glucose: "",
    blood_pressure: "",
    bmi: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "patient_name" ||
      value === "" ||
      /^[0-9]*\.?[0-9]*$/.test(value)
    ) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataArray = [
      parseFloat(formData.insulin) || 0,
      parseFloat(formData.glucose) || 0,
      parseFloat(formData.blood_pressure) || 0,
      parseFloat(formData.bmi) || 0,
      parseFloat(formData.age) || 0,
    ];

    const payload = {
      data: dataArray,
      patient_name: formData.patient_name || "Anonymous Patient",
    };

    console.log("Sending payload:", payload);

    try {
      const response = await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPrediction(response.data.prediction);
      setResultData(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Connection Error: Please ensure the AI Backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!resultData) return;

    setDownloading(true);
    try {
      const reportData = {
        patient_data: {
          patient_name: formData.patient_name,
          age: formData.age,
          glucose: formData.glucose,
          insulin: formData.insulin,
          bmi: formData.bmi,
          blood_pressure: formData.blood_pressure,
          prediction_result: resultData.prediction,
          suggestion: resultData.suggestion,
        },
      };

      const response = await axios.post(DOWNLOAD_URL, reportData, {
        responseType: "blob",
      });

      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Medical_Report_${formData.patient_name || "Patient"}.pdf`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download Error:", err);
      setError("Failed to download report. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col light-theme">
      {/* Header */}
      <header className="w-full py-8 px-6 lg:px-12 flex items-center justify-between max-w-400 mx-auto">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-medical-blue" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-medical-blue rounded-2xl shadow-lg shadow-medical-blue/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-dark-gray tracking-tight">
                HealthGuard AI
              </h1>
              <p className="text-xs font-bold text-medical-blue uppercase tracking-widest">
                Diabetes Risk Prediction
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="grow grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 lg:px-12 pb-12 max-w-400 mx-auto w-full">
        {/* Left Column: Input Form */}
        <section className="lg:col-span-5 xl:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 h-full flex flex-col"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Risk Assessment
              </h2>
              <p className="text-gray-500 font-medium mt-1">
                Enter patient health metrics below
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 grow">
              {/* Patient Name Field */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4 text-medical-blue" />
                    Patient Name
                  </label>
                </div>
                <input
                  type="text"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="input-field"
                  required
                />
              </div>

              {inputFields.map((field) => (
                <div key={field.name} className="space-y-2 group">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                      <field.icon className="w-4 h-4 text-medical-blue" />
                      {field.label}
                    </label>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      {field.unit}
                    </span>
                  </div>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="input-field"
                    required
                  />
                </div>
              ))}

              <div className="pt-4 mt-auto">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Predict Risk
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </section>

        {/* Right Column: Live Result & Advice */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-6 flex flex-col">
          {/* Live Result Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card overflow-hidden shrink-0"
          >
            <AnimatePresence mode="wait">
              {prediction === null ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Activity className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-400">
                      Awaiting Data
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Complete the form to see AI analysis
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-10 flex flex-col md:flex-row items-center gap-8 ${
                    prediction === 1 ? "bg-red-50/30" : "bg-green-50/30"
                  }`}
                >
                  <div
                    className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 ${
                      prediction === 1
                        ? "bg-warning-red text-white"
                        : "bg-success-green text-white"
                    }`}
                  >
                    {prediction === 1 ? (
                      <AlertCircle className="w-12 h-12" />
                    ) : (
                      <CheckCircle2 className="w-12 h-12" />
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-black uppercase tracking-[0.2em] mb-1 ${
                          prediction === 1
                            ? "text-warning-red"
                            : "text-success-green"
                        }`}
                      >
                        AI Analysis Complete
                      </span>
                      <h3 className="text-4xl font-black text-dark-gray">
                        {prediction === 1
                          ? "High Risk of Diabetes"
                          : "Low Risk of Diabetes"}
                      </h3>
                      <p className="text-gray-500 font-medium mt-2 max-w-md">
                        {prediction === 1
                          ? "Our AI model has detected patterns associated with higher health risk. Please consult a medical professional."
                          : "Your current health metrics are within the optimal range according to our AI analysis."}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-4">
                        <button
                          onClick={handleDownloadReport}
                          disabled={downloading}
                          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-medical-blue text-medical-blue font-bold rounded-2xl hover:bg-medical-blue hover:text-white transition-all active:scale-95 disabled:opacity-50"
                        >
                          {downloading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Download className="w-5 h-5" />
                          )}
                          Download PDF Report
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Health Chat / Advice Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card grow p-8 flex flex-col min-h-100"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
              <div className="w-12 h-12 bg-medical-blue/10 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-medical-blue" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">
                  Smart Health Guidance
                </h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  AI Assistant
                </p>
              </div>
            </div>

            <div className="grow space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-medical-blue flex items-center justify-center shrink-0 shadow-lg shadow-medical-blue/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-5 rounded-3xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%]">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {prediction === null
                      ? "Hello! I'm your AI Health Assistant. Please fill in the metrics on the left, and I'll provide a detailed risk analysis and personalized guidance for you."
                      : prediction === 1
                        ? "I've analyzed your results. Please don't be alarmed—this is a screening tool, not a diagnosis. However, your metrics suggest we should take some proactive steps for your health."
                        : "Excellent news! Your metrics look very healthy. I have a few tips to help you maintain this great state."}
                  </p>
                </div>
              </div>

              {prediction !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex gap-4 justify-end"
                >
                  <div className="bg-medical-blue/5 p-6 rounded-4xl rounded-tr-none border border-medical-blue/10 max-w-[80%] shadow-inner">
                    <h5 className="font-black text-medical-blue text-xs uppercase tracking-widest mb-4">
                      Recommended Actions
                    </h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(prediction === 1
                        ? [
                            "Reduce sugar intake",
                            "Walk 20-30 min daily",
                            "Drink more water",
                            "Eat balanced diet",
                            "Consult doctor",
                          ]
                        : [
                            "Maintain current diet",
                            "Stay active daily",
                            "Regular health checkups",
                            "Keep hydrated",
                          ]
                      ).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm font-bold text-gray-600 bg-white/50 p-3 rounded-xl border border-white"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${prediction === 1 ? "bg-warning-red" : "bg-success-green"}`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {prediction !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-2xl bg-medical-blue flex items-center justify-center shrink-0 shadow-lg shadow-medical-blue/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white p-5 rounded-3xl rounded-tl-none shadow-sm border border-gray-100">
                    <p
                      className={`font-black ${prediction === 1 ? "text-medical-blue" : "text-success-green"}`}
                    >
                      {prediction === 1
                        ? "Small steps can improve your health significantly 💙"
                        : "Keep up the fantastic work! Consistency is key 💚"}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center gap-3 mt-auto"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-bold">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="py-6 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        © 2026 HealthGuard AI • Clinical Decision Support System Concept
      </footer>
    </div>
  );
}

export default Predict;
