import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, XCircle, RotateCcw, HelpCircle, BookOpen, 
  Sparkles, CheckSquare, ArrowRight, ChevronDown, ChevronUp, Brain, 
  ShieldCheck, Target, FileText, Layers, AlertTriangle 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

const subjectiveQuestions = [
  {
    id: 1,
    marks: 2,
    question: 'Differentiate between E-Commerce and E-Business with one practical example of each.',
    modelAnswer: 'E-Commerce refers specifically to the commercial transaction of buying and selling goods and services over the Internet (e.g., purchasing a textbook on amazon.in). E-Business is the broader overarching concept encompassing all electronic business processes, including e-commerce plus Enterprise Resource Planning (ERP), Customer Relationship Management (CRM), Supply Chain Management (SCM), and internal employee intranets (e.g., a corporate enterprise using SAP ERP and Salesforce CRM to manage manufacturing, supplier procurement, and HR operations).'
  },
  {
    id: 2,
    marks: 2,
    question: 'What is a Virtual Shopping Cart? State two primary functions performed by it.',
    modelAnswer: 'A Virtual Shopping Cart is an interactive software module on an e-commerce website that temporarily stores and organizes items selected by a customer before final checkout.\nTwo primary functions:\n1. Session State Persistence: Preserves selected products and quantities across different web pages using HTTP cookies or session tokens.\n2. Dynamic Price Calculation: Computes live itemized subtotals, promotional coupon discounts, statutory GST taxes, and delivery charges before handing off to the payment gateway.'
  },
  {
    id: 3,
    marks: 3,
    question: 'Explain the three major operational risks that an E-Business enterprise faces.',
    modelAnswer: '1. Violation of Customer Privacy: Unauthorized harvesting, tracking, or selling of personal customer data (phone numbers, addresses, purchase history) without informed consent, leading to severe regulatory penalties under the DPDP Act 2023.\n2. Peak-Hour Server Downtime during Traffic Spikes: Sudden massive surges in simultaneous visitors (e.g., festive flash sales) overwhelming server CPU and memory connection pools, resulting in HTTP 503 errors and direct revenue loss.\n3. Hacker Infiltration: Malicious cyber attacks including SQL Injection (extracting database tables), DDoS botnet floods, and Ransomware locking corporate database records.'
  },
  {
    id: 4,
    marks: 3,
    question: 'State any three critical precautions that a consumer must observe while performing digital financial transactions.',
    modelAnswer: '1. Verify HTTPS & Padlock: Always confirm that the address bar begins with `https://` and displays a closed padlock icon indicating active SSL/TLS encryption.\n2. Avoid Public Wi-Fi: Never enter net banking passwords or card numbers on open, unencrypted public Wi-Fi networks in cafes or airports.\n3. Never Disclose Confidential Credentials: Never share OTPs, 3-digit CVV codes, or ATM/UPI PINs with anyone over phone calls or messages, as genuine banks NEVER ask for them.'
  },
  {
    id: 5,
    marks: 5,
    question: '(a) What is a Webinar? Explain its two hallmark characteristics.\n(b) How does Synchronous online learning differ from Asynchronous E-Learning?',
    modelAnswer: '(a) Webinar Definition & Characteristics:\nA Webinar (Web + Seminar) is an interactive, real-time multimedia presentation, lecture, or workshop conducted over the Internet using video conferencing software.\n- Characteristic 1: Two-Way Bidirectional Interactivity (audio, video, live chat, live polls, and dedicated Q&A pods for instant doubt resolution).\n- Characteristic 2: Live Screen Sharing and collaborative digital whiteboards allowing instructors to demonstrate code and diagrams in real time.\n\n(b) Synchronous vs Asynchronous E-Learning:\n- Synchronous Learning occurs live in real time at scheduled intervals with active teacher-student interaction (e.g., Zoom, Google Meet). Complex doubts are cleared instantaneously.\n- Asynchronous Learning is self-paced where learners access pre-recorded video lectures and readings at their convenience (e.g., Coursera, edX, SWAYAM). Doubt resolution is delayed via forums.'
  }
];

const ExamSimulator = () => {
  const [examState, setExamState] = useState('intro'); // 'intro', 'running', 'submitted'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins

  useEffect(() => {
    let timer;
    if (examState === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setExamState('submitted');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  const handleStartExam = () => {
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeLeft(1800);
    setExamState('running');
  };

  const handleSelectOption = (opt) => {
    if (examState !== 'running') return;
    setUserAnswers(prev => ({
      ...prev,
      [currentIdx]: opt
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return mins.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  if (examState === 'intro') {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/30 rounded-full flex items-center justify-center mx-auto text-sky-400">
          <Brain size={32} />
        </div>
        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">CBSE Class XII IT (802) Exam Simulator</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            E-Commerce, E-Business & Online Transaction Safety • {questions.length} MCQs • 30 Minutes Timer • Bilingual Explanations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left text-xs text-slate-300">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Total Marks</span>
            <span className="font-bold text-white text-sm sm:text-base">{questions.length} Marks</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Time Limit</span>
            <span className="font-bold text-sky-400 text-sm sm:text-base">30 Minutes</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Pass Score</span>
            <span className="font-bold text-emerald-400 text-sm sm:text-base">75% (23/30)</span>
          </div>
        </div>

        <button
          onClick={handleStartExam}
          className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-sky-500/25 cursor-pointer inline-flex items-center gap-2"
        >
          <span>Start Timed Exam Simulation</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  if (examState === 'submitted') {
    return (
      <div className="space-y-6">
        {/* Scorecard Banner */}
        <div className={"p-6 sm:p-8 rounded-3xl border text-center space-y-4 " + (
          percentage >= 75 
            ? "bg-emerald-950/40 border-emerald-500/40" 
            : "bg-amber-950/40 border-amber-500/40"
        )}>
          <div className={"w-16 h-16 rounded-full flex items-center justify-center mx-auto " + (
            percentage >= 75 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
          )}>
            <Award size={36} />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white">
              {percentage >= 75 ? "Exam Passed with Distinction!" : "Revision Recommended"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Module 002_002: E-Commerce, E-Business & Online Transaction Safety
            </p>
          </div>

          <div className="flex justify-center items-baseline gap-2 font-mono">
            <span className="text-4xl sm:text-5xl font-extrabold text-white">{score}</span>
            <span className="text-slate-400 text-lg">/ {questions.length} ({percentage}%)</span>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleStartExam}
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20"
            >
              <RotateCcw size={14} /> Retake Exam
            </button>
            <button
              onClick={() => setExamState('intro')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-750 font-bold rounded-xl text-xs cursor-pointer"
            >
              Back to Instructions
            </button>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Target size={20} className="text-sky-400" />
            <span>Comprehensive Question-by-Question Review</span>
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns === q.answer;

              return (
                <div key={idx} className={"p-5 rounded-2xl border space-y-3 " + (
                  isCorrect ? "bg-slate-900/90 border-emerald-500/30" : "bg-slate-900/90 border-rose-500/30"
                )}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {q.question}
                    </span>
                    <span className={"shrink-0 text-xs font-mono font-bold flex items-center gap-1 px-2.5 py-1 rounded-full " + (
                      isCorrect ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    )}>
                      {isCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {isCorrect ? "Correct (+1)" : "Incorrect (0)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Your Selection</span>
                      <span className={isCorrect ? "text-emerald-300 font-semibold" : "text-rose-300 font-semibold"}>
                        {uAns || "Unanswered"}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Correct Answer</span>
                      <span className="text-emerald-400 font-semibold">{q.answer}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-850 space-y-1 text-xs text-slate-300">
                    <p><strong>English Explanation:</strong> {q.explanation}</p>
                    <p className="text-sky-300"><strong>বাংলা ব্যাখ্যা:</strong> {q.explanationBn}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // RUNNING EXAM STATE
  const currentQ = questions[currentIdx];

  return (
    <div className="space-y-6">
      {/* Top Status Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-mono font-bold rounded-lg">
            Question {currentIdx + 1} of {questions.length}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Answered: {Object.keys(userAnswers).length} / {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-750 rounded-lg font-mono text-xs font-bold text-amber-400">
            <Clock size={14} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setExamState('submitted')}
            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-all cursor-pointer shadow-md"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* Main Question Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">
            {currentQ.topic} · {currentQ.difficulty}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = userAnswers[currentIdx] === opt;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(opt)}
                className={"w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 " + (
                  isSelected 
                    ? "bg-sky-500/15 border-sky-500 text-white font-semibold shadow-lg shadow-sky-500/10" 
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700"
                )}
              >
                <div className={"w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs font-mono " + (
                  isSelected ? "border-sky-400 bg-sky-500 text-white" : "border-slate-700 text-slate-500"
                )}>
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-semibold cursor-pointer"
          >
            ← Previous
          </button>

          <div className="flex gap-1.5">
            {questions.map((_, qIndex) => (
              <button
                key={qIndex}
                onClick={() => setCurrentIdx(qIndex)}
                className={"w-6 h-6 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer hidden md:flex items-center justify-center " + (
                  currentIdx === qIndex
                    ? "bg-sky-500 text-white"
                    : userAnswers[qIndex]
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-950 border border-slate-800 text-slate-500"
                )}
              >
                {qIndex + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentIdx === questions.length - 1}
            onClick={() => setCurrentIdx(prev => prev + 1)}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Topic9() {
  const [activeTab, setActiveTab] = useState('exam');
  const [openSubjective, setOpenSubjective] = useState({});

  const toggleSubjective = (id) => {
    setOpenSubjective(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs = [
    { id: 'exam', label: '1. Timed Exam Simulator', icon: Target },
    { id: 'subjective', label: '2. Subjective Board Q&As', icon: CheckSquare },
    { id: 'pitfalls', label: '3. Board Tips & Pitfalls', icon: AlertTriangle },
    { id: 'faqs', label: '4. FAQs (30 Qs)', icon: HelpCircle },
    { id: 'notes', label: '5. Plain Text Notes', icon: FileText }
  ];

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002_002 · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Full Assessment Suite
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Practice your Skill here: Exam Simulator & Subjective Answer Key
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your mastery of E-Commerce, E-Business, and Online Transaction Safety with a timed 30-question exam simulation and authentic solved CBSE board subjective questions.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                )}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: TIMED EXAM SIMULATOR */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            <ExamSimulator />

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Aim for a score of at least 26/30 (85%+) on this exam simulator. Pay close attention to subtle differences between E-Commerce vs E-Business, the 3 factors of MFA, CVV non-storage mandates, and why public Wi-Fi is hazardous for financial transactions."
            />
          </div>
        )}

        {/* TAB 2: SUBJECTIVE BOARD Q&AS */}
        {activeTab === 'subjective' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckSquare size={20} className="text-sky-400" />
                <span>CBSE Class XII IT (802) Subjective Questions & Model Answers</span>
              </h3>

              <div className="space-y-3">
                {subjectiveQuestions.map((sq) => {
                  const isOpen = !!openSubjective[sq.id];
                  return (
                    <div key={sq.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleSubjective(sq.id)}
                        className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 hover:bg-slate-900 transition-colors cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-mono font-bold rounded">
                              {sq.marks} MARKS
                            </span>
                            <span className="text-xs font-mono text-slate-400">Question #{sq.id}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{sq.question}</h4>
                        </div>
                        {isOpen ? <ChevronUp size={18} className="text-slate-400 shrink-0 mt-1" /> : <ChevronDown size={18} className="text-slate-400 shrink-0 mt-1" />}
                      </button>

                      {isOpen && (
                        <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                          <span className="font-bold text-emerald-400 block text-xs uppercase font-mono">
                            CBSE Model Answer & Marking Scheme:
                          </span>
                          {sq.modelAnswer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOARD PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-850/60 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Common Mistakes</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 1: Leaving answers incomplete in 3-mark questions</p>
                  <p className="text-slate-400">When asked to describe the three major e-business risks, you must explicitly mention: (1) Customer Privacy Violations, (2) Peak Server Downtime during traffic spikes, and (3) Hacker Penetration. Skipping any of the three costs you 1 mark.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 2: Confusing 2FA with 2 Passwords</p>
                  <p className="text-slate-400">Multi-factor authentication requires credentials from different factor categories (Knowledge + Possession + Inherence), not merely typing two different passwords.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 9 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic9_Exam_Simulator_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
