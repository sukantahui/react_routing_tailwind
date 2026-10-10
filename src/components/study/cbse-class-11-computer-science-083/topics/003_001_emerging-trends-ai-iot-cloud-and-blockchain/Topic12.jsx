import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic12Questions } from "./topic12_files/topic12_questions";

export default function Topic12() {
  // Exam Simulator State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes countdown
  const [timerActive, setTimerActive] = useState(false);

  // Timer Effect
  useEffect(() => {
    let timer = null;
    if (timerActive && timeLeft > 0 && !submitted) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && !submitted) {
      setSubmitted(true);
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft, submitted]);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (!timerActive && !submitted) {
      setTimerActive(true); // Start timer on first interaction
    }
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic12Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const totalQuestions = topic12Questions.length;
  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine Grade
  let grade = "Needs Revision";
  let gradeColor = "text-amber-400";
  let feedback = "Review the Unit 3 Revision Handbook in Topic 11 and attempt the drill again.";

  if (percentage >= 90) {
    grade = "A1 (Outstanding Master)";
    gradeColor = "text-emerald-400";
    feedback = "Exemplary conceptual clarity across all emerging trends. You are 100% prepared for CBSE Class 11 Board Exams!";
  } else if (percentage >= 75) {
    grade = "A2 / B1 (Proficient)";
    gradeColor = "text-teal-300";
    feedback = "Strong conceptual grasp. Revise subtle distinctions such as IaaS vs PaaS and 3-DoF vs 6-DoF.";
  } else if (percentage >= 50) {
    grade = "B2 / C1 (Satisfactory)";
    gradeColor = "text-yellow-300";
    feedback = "Decent foundation. Brush up on the 5 Vs of Big Data and Blockchain SHA-256 hash chaining.";
  }

  // Filter questions
  const filteredQuestions = topic12Questions.filter((q) => {
    if (currentFilter === "ALL") return true;
    if (currentFilter === "AI_ML" && q.id <= 11) return true;
    if (currentFilter === "NLP_VR" && q.id >= 12 && q.id <= 16) return true;
    if (currentFilter === "ROBOT_DATA" && q.id >= 17 && q.id <= 22) return true;
    if (currentFilter === "IOT_CLOUD_BC" && q.id >= 23) return true;
    return true;
  });

  const resetExam = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setTimeLeft(45 * 60);
    setTimerActive(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 12: Practice Your Skill Here — Final Board Exam Simulator
          </h1>
          <p className="text-emerald-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Validate your holistic mastery across the entire Emerging Trends curriculum. Take the 
            <strong> 30-MCQ Board Examination Simulator</strong> with real-time countdown timer, 
            instant CBSE grading, section filters, and review subjective 2-Mark & 3-Mark drill questions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Live Exam Status Bar & Controls */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            {/* Timer & Stats */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="text-xs text-slate-400">⏱️ Time Left:</span>
                <span className={`font-mono font-bold text-lg ${timeLeft < 300 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
                  {formatTimer(timeLeft)}
                </span>
              </div>
              <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="text-xs text-slate-400">📝 Answered:</span>
                <span className="font-mono font-bold text-white text-base">
                  {Object.keys(selectedAnswers).length} / {totalQuestions}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSubmitted(!submitted);
                  setTimerActive(false);
                }}
                className={`px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg transition ${
                  submitted
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                {submitted ? "Resume / Edit Answers" : "Submit Exam & Grade"}
              </button>
              <button
                onClick={resetExam}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Result Card when Submitted */}
          {submitted && (
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-indigo-950/60 border border-emerald-500/50 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Official CBSE Performance Grade
                  </div>
                  <div className={`text-3xl font-black ${gradeColor} mb-2`}>{grade}</div>
                  <p className="text-xs text-slate-300 max-w-xl">{feedback}</p>
                </div>
                <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 text-center min-w-[180px]">
                  <div className="text-xs text-slate-400 uppercase">Final Score</div>
                  <div className="text-4xl font-mono font-black text-emerald-400 my-1">
                    {score} / {totalQuestions}
                  </div>
                  <div className="text-xs font-semibold text-slate-300">{percentage}% Accuracy</div>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter Chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-xs text-slate-400 self-center mr-2">Filter Category:</span>
            {[
              { id: "ALL", label: "All Questions (30)" },
              { id: "AI_ML", label: "AI & Machine Learning (Q1-11)" },
              { id: "NLP_VR", label: "NLP & Immersive Tech (Q12-16)" },
              { id: "ROBOT_DATA", label: "Robotics & Big Data (Q17-22)" },
              { id: "IOT_CLOUD_BC", label: "IoT, Cloud & Blockchain (Q23-30)" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setCurrentFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentFilter === f.id
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Section 2: Question Palette & Interactive MCQs */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">02</span>
            Examination Questions ({filteredQuestions.length} Items)
          </h2>

          <div className="space-y-6">
            {filteredQuestions.map((q) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    submitted
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-red-950/20 border-red-500/40"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">
                      Q{q.id}. {q.question}
                    </span>
                    {submitted && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                        isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                      }`}>
                        {isCorrect ? "Correct (+1)" : "Incorrect (0)"}
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

                  {submitted && (
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

        {/* Section 3: Subjective 2-Mark & 3-Mark Drill Bank */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">03</span>
            Subjective Board Question Practice (2-Mark & 3-Mark Drill)
          </h2>
          <p className="text-slate-300 text-sm mb-6">
            Review these standard descriptive questions frequently asked in CBSE Class 11 annual term exams.
          </p>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white text-sm">Q1. Differentiate between Supervised and Unsupervised Learning.</span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px]">2 Marks</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Model Answer:</strong> Supervised Learning uses labeled datasets (input features <code>X</code> paired with ground-truth output labels <code>Y</code>) to learn a predictive mapping function (e.g., Spam detection, House price regression). Unsupervised Learning operates on unlabelled datasets with no pre-assigned answers to discover intrinsic clusters, associations, and geometric patterns (e.g., Customer segmentation via K-Means).
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white text-sm">Q2. Explain the 'Sense-Plan-Act' control loop in robotics with examples.</span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px]">3 Marks</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Model Answer:</strong> Autonomous robots operate continuously in a 3-step cycle:
                <br />1. <strong>Sense:</strong> Sensors (ultrasonic, LiDAR, cameras) capture environmental conditions and convert them into electrical inputs.
                <br />2. <strong>Plan:</strong> The microcontroller/CPU evaluates sensor data, checks safety thresholds, and determines the optimal trajectory decision.
                <br />3. <strong>Act:</strong> Actuators (DC motors, servo joints, mechanical grippers) convert electrical commands into physical mechanical force or displacement.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white text-sm">Q3. What is Cloud Bursting in a Hybrid Cloud deployment?</span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px]">2 Marks</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Model Answer:</strong> Cloud Bursting is an application deployment model where an enterprise runs its routine baseline workloads on a cost-effective, secure on-premise private cloud. When seasonal demand surges exceed private capacity (e.g., during festival shopping or exam result days), the excess traffic automatically "bursts" into a public cloud (AWS/Azure) to maintain 100% uptime without buying expensive permanent hardware.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white text-sm">Q4. How does SHA-256 cryptographic chaining ensure Blockchain immutability?</span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px]">3 Marks</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Model Answer:</strong> Every block in a blockchain contains the cryptographic SHA-256 hash of the previous block as part of its block header. If an adversary attempts to modify transaction records inside a historical block, that block's hash changes immediately due to the avalanche effect. This creates an irreconcilable cryptographic mismatch with the 'previous hash' stored in the subsequent block, causing the entire subsequent chain to become invalid across all distributed P2P network nodes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">04</span>
            Python Companion Simulation: Exam Score & Skill Validator Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python code evaluating test scores and assigning CBSE performance grades.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic12_files/emerging_trends_exam_validator.py"
            title="emerging_trends_exam_validator.py"
          />
        </section>

        {/* Section 5: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">05</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic12_files/topic12_note.txt"
            title="Topic 12 Revision Notes"
          />
        </section>

        {/* Section 6: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">06</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is the weightage of Emerging Trends in the CBSE Class 11 CS (083) Examination?",
                a: "Unit 3 carries significant weightage (typically 5 to 7 marks in annual theory papers) featuring MCQs, 2-mark definitions, and 3-mark comparative conceptual questions."
              },
              {
                q: "Can I retake this 30-MCQ simulator multiple times?",
                a: "Yes! Click the 'Reset' button at any time to clear selections and restart the 45-minute examination countdown timer."
              },
              {
                q: "How should I structure my answers for comparative questions (e.g., IaaS vs PaaS)?",
                a: "Always use a clean markdown or tabular layout listing 3-4 distinct comparison parameters: Management Responsibility, Consumer Control, Cost Structure, and Real-World Examples."
              }
            ]}
          />
        </section>

        {/* Section 7: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Congratulations on completing the entire Emerging Trends curriculum! You have mastered Artificial Intelligence, Machine Learning, NLP, Immersive Reality, Robotics, Big Data, IoT, Cloud Computing, Grid Computing, and Blockchain. Carry this multidisciplinary foundation forward with confidence in your CBSE Class 11 examinations and future computing pursuits."
        />
      </div>
    </div>
  );
}
