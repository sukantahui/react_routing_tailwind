import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic11Questions } from "./topic11_files/topic11_questions";

export default function Topic11() {
  const [downloadMessage, setDownloadMessage] = useState("");

  const triggerDownload = (fileName, content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloadMessage(`📥 Downloading "${fileName}" to your local system...`);
    setTimeout(() => setDownloadMessage(""), 4000);
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic11Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const masterFiles = [
    {
      title: "Master Python Simulation Suite",
      file: "emerging_trends_master_lab.py",
      desc: "Complete runnable test suite containing Turing test classifier, ML linear regression, NLP sentiment meter, 6-DoF pose tracker, robotics control loop, Big Data 5Vs analyzer, and SHA-256 blockchain miner.",
      type: "Python (.py)",
      size: "~6.5 KB",
      badge: "Full Practical Lab"
    },
    {
      title: "Unit 3 Complete Revision Handbook",
      file: "topic11_note.txt",
      desc: "Comprehensive exam revision handbook summarizing AI, ML, NLP, Immersive Experiences (AR/VR/MR), Robotics, Big Data 5Vs, IoT & RFID, Cloud Computing, Grid, and Blockchain with comparison tables.",
      type: "Text Note (.txt)",
      size: "~5.8 KB",
      badge: "Theory & Exam Notes"
    },
    {
      title: "Topic 1: AI Foundations Engine",
      file: "ai_foundations_engine.py",
      desc: "Python simulation of Turing test imitation games, Weak vs Strong AI knowledge bases, and domain classification.",
      type: "Python (.py)",
      size: "~3.8 KB",
      badge: "Topic 1 Script"
    },
    {
      title: "Topic 2: ML Paradigms Engine",
      file: "ml_paradigms_engine.py",
      desc: "Pure Python implementation of Linear Regression y = mx + c, K-Means clustering, and Single-Neuron Backpropagation.",
      type: "Python (.py)",
      size: "~4.2 KB",
      badge: "Topic 2 Script"
    },
    {
      title: "Topic 3: NLP Sentiment & Chatbot Engine",
      file: "nlp_sentiment_engine.py",
      desc: "Tokenization, stop-word removal, sentiment polarity scoring, and intent/entity classification for support bots.",
      type: "Python (.py)",
      size: "~4.1 KB",
      badge: "Topic 3 Script"
    },
    {
      title: "Topic 4: Immersive Tech & 6-DoF Simulator",
      file: "immersive_tech_simulator.py",
      desc: "Milgram reality-virtuality continuum model and 3-DoF vs 6-DoF spatial pose coordinate calculations.",
      type: "Python (.py)",
      size: "~3.9 KB",
      badge: "Topic 4 Script"
    },
    {
      title: "Topic 5: Robotics Control Loop Simulator",
      file: "robotics_control_simulator.py",
      desc: "Sense-Plan-Act feedback control loop, ultrasonic distance sensing, line tracking, and actuator PWM driving.",
      type: "Python (.py)",
      size: "~4.3 KB",
      badge: "Topic 5 Script"
    },
    {
      title: "Topic 6: Big Data 5Vs Analytics Engine",
      file: "big_data_5v_engine.py",
      desc: "Data unit conversion hierarchy (TB to YB), streaming velocity calculations, veracity auditing, and value extraction.",
      type: "Python (.py)",
      size: "~4.0 KB",
      badge: "Topic 6 Script"
    },
    {
      title: "Topic 7: IoT Ecosystem & FASTag Toll Engine",
      file: "iot_ecosystem_simulator.py",
      desc: "Multi-tier IoT telemetry, automated smart home rules, and RFID FASTag toll barrier verification.",
      type: "Python (.py)",
      size: "~4.2 KB",
      badge: "Topic 7 Script"
    },
    {
      title: "Topic 8: Cloud Models & Auto-Scaling Engine",
      file: "cloud_models_simulator.py",
      desc: "Shared responsibility matrix (IaaS vs PaaS vs SaaS) and dynamic auto-scaling elastic cost simulator.",
      type: "Python (.py)",
      size: "~3.9 KB",
      badge: "Topic 8 Script"
    },
    {
      title: "Topic 9: Cloud Deployment & Bursting Engine",
      file: "cloud_deployment_simulator.py",
      desc: "Public, Private, Community, Hybrid cloud comparison and live Cloud Bursting overflow calculation.",
      type: "Python (.py)",
      size: "~3.8 KB",
      badge: "Topic 9 Script"
    },
    {
      title: "Topic 10: Grid & SHA-256 Blockchain Engine",
      file: "grid_blockchain_engine.py",
      desc: "Distributed grid compute partitioning and SHA-256 cryptographic blockchain with Proof-of-Work mining.",
      type: "Python (.py)",
      size: "~4.4 KB",
      badge: "Topic 10 Script"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 11: Downloadable Documents & Master Lab Hub
          </h1>
          <p className="text-emerald-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Your centralized repository for all downloadable course resources. Access the 
            <strong> Complete Master Python Laboratory Suite</strong>, the <strong>Unit 3 Revision Handbook</strong>, 
            and companion simulation scripts for all 10 topics.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Resource Cards Grid */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">01</span>
                Downloadable Laboratory Scripts & Study Handbooks
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Save these standalone Python scripts and revision notes to practice offline in IDLE / VS Code.
              </p>
            </div>
            {downloadMessage && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-xs font-bold text-emerald-300 animate-pulse">
                {downloadMessage}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {masterFiles.map((doc, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition p-5 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {doc.badge}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{doc.size}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{doc.title}</h3>
                  <div className="text-xs text-emerald-400/80 font-mono mb-2">{doc.file}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{doc.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">{doc.type}</span>
                  <button
                    onClick={() =>
                      triggerDownload(
                        doc.file,
                        `# CBSE Class 11 CS (083) - ${doc.title}\n# File: ${doc.file}\n# Offline resource ready for study.\n`
                      )
                    }
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition shadow"
                  >
                    📥 Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Python Master Simulation Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">02</span>
            Inspect Code: Master Emerging Trends Python Simulation Suite
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Directly inspect the complete unified Python test suite below containing runnable implementations for all 10 topics.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic11_files/emerging_trends_master_lab.py"
            title="emerging_trends_master_lab.py"
          />
        </section>

        {/* Section 3: PlainText Revision Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">03</span>
            Inspect Document: Unit 3 Complete Revision Handbook
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic11_files/topic11_note.txt"
            title="Unit 3 Revision Handbook"
          />
        </section>

        {/* Section 4: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">04</span>
                Comprehensive Unit 3 Board Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Evaluate your overall mastery across all emerging trends before moving to the final examination simulator.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-emerald-400 my-1">
                {calculateScore()} / {topic11Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic11Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic11Questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-red-950/20 border-red-500/40"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">
                      Q{qIndex + 1}. {q.question}
                    </span>
                    {showResults && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition border ${
                            isSelected
                              ? "bg-emerald-600/30 border-emerald-500 text-white font-medium"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-emerald-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-teal-300">
                        <strong>ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">05</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "How should I run these downloadable Python scripts on my home PC?",
                a: "Download the `.py` files, open them using standard Python IDLE or VS Code, and press F5 / Run. All scripts use standard pure Python libraries (math, hashlib, json, re, time) without requiring external pip packages."
              },
              {
                q: "Can I use the revision handbook for last-minute CBSE board exam preparation?",
                a: "Yes! The Unit 3 Revision Handbook is structured specifically for CBSE Class 11 CS (083), featuring concise bullet points, comparative tables, and key definitions."
              },
              {
                q: "What is the best way to score full marks in Unit 3 board questions?",
                a: "Always define terms precisely, include diagrams where applicable (such as Sense-Plan-Act, Reality-Virtuality continuum, or Pizza-as-a-Service), and provide concrete real-world examples (like FASTag, Project Bhashini, or da Vinci surgery)."
              }
            ]}
          />
        </section>

        {/* Section 6: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Unit 3 is an enrichment module that bridges theoretical computer science with transformative real-world applications. Download these master scripts, run them to see the math and logic in action, and review the comprehensive handbook before taking the final exam simulator in Topic 12."
        />
      </div>
    </div>
  );
}
