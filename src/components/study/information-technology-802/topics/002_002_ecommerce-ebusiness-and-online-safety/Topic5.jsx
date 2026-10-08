import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, Lock, Wifi, Key, 
  Smartphone, Eye, CheckCircle2, XCircle, HelpCircle, 
  FileText, Sparkles, BookOpen, Layers, ArrowRight, Zap, RefreshCw, CreditCard 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const SafeTransactionScenarioLab = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: "Airport Free Public Wi-Fi Payment",
      situation: "Susmita is waiting at Kolkata Airport and connects to 'Free_Public_Airport_WiFi'. She wants to buy a ₹2,400 book using net banking.",
      action: "Should she enter her net banking password on this open public Wi-Fi network?",
      correct: "RISKY",
      explanation: "RISKY! Open public Wi-Fi networks lack encryption and are vulnerable to packet sniffing, Man-in-the-Middle (MitM) attacks, and rogue fake hotspots. She should switch to cellular 4G/5G data."
    },
    {
      id: 2,
      title: "Caller Posing as Bank Manager Asking for OTP",
      situation: "Sachin receives a phone call from someone claiming to be an SBI Bank Officer. The caller says his debit card is blocked and demands the 6-digit OTP sent to his mobile to unblock it.",
      action: "Should Sachin share the OTP with the caller?",
      correct: "RISKY",
      explanation: "RISKY! Genuine bank employees NEVER ask for OTPs or PINs over the phone. This is a classic Voice Phishing (Vishing) social engineering attack."
    },
    {
      id: 3,
      title: "Verifying HTTPS & Padlock before Checkout",
      situation: "Mamata is about to purchase cosmetics on an e-commerce site. She looks at the address bar and confirms 'https://' with a closed green padlock icon.",
      action: "Is this a proper safety precaution before entering payment details?",
      correct: "SAFE",
      explanation: "SAFE! HTTPS and the padlock icon confirm that TLS encryption is actively scrambling data between her browser and the merchant server."
    },
    {
      id: 4,
      title: "Scanning QR Code to 'Receive' OLX Payment",
      situation: "Debangshu is selling a used computer monitor on OLX. A prospective buyer sends him a UPI QR code and says: 'Scan this QR code and enter your UPI PIN to receive ₹4,500'.",
      action: "Should Debangshu scan the QR code and enter his UPI PIN?",
      correct: "RISKY",
      explanation: "RISKY! Entering a UPI PIN always DEBITS money from your bank account. Receiving money never requires scanning QR codes or entering any PIN!"
    }
  ];

  const handleSelect = (id, choice) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [id]: choice }));
  };

  const calculateScore = () => {
    let score = 0;
    scenarios.forEach(sc => {
      if (answers[sc.id] === sc.correct) score++;
    });
    return score;
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-750 pb-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
            <ShieldCheck size={20} />
            <span>Interactive Cyber Hygiene Lab: Transaction Scenario Inspector</span>
          </div>
          {submitted && (
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-400 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={12} /> Retry Scenarios
            </button>
          )}
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((sc) => {
            const userChoice = answers[sc.id];
            const isCorrect = userChoice === sc.correct;

            return (
              <div key={sc.id} className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-300 font-mono">Case #{sc.id}: {sc.title}</span>
                    {submitted && (
                      <span className={"text-xs font-bold flex items-center gap-1 " + (isCorrect ? "text-emerald-400" : "text-rose-400")}>
                        {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{sc.situation}</p>
                  <p className="text-xs font-bold text-white pt-1">{sc.action}</p>
                </div>

                {/* Choice Buttons */}
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleSelect(sc.id, 'SAFE')}
                      className={"py-2 rounded-lg text-xs font-bold transition-all cursor-pointer " + (
                        userChoice === 'SAFE'
                          ? "bg-emerald-500 text-slate-950 font-extrabold shadow-md"
                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      Safe Action
                    </button>
                    <button
                      onClick={() => handleSelect(sc.id, 'RISKY')}
                      className={"py-2 rounded-lg text-xs font-bold transition-all cursor-pointer " + (
                        userChoice === 'RISKY'
                          ? "bg-rose-500 text-white font-extrabold shadow-md"
                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      Risky / Dangerous
                    </button>
                  </div>

                  {submitted && (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 text-[11px] text-slate-300 leading-relaxed font-sans">
                      <span className="text-sky-400 font-bold block mb-0.5">Explanation:</span>
                      {sc.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Bar */}
        {!submitted ? (
          <button
            disabled={Object.keys(answers).length < scenarios.length}
            onClick={() => setSubmitted(true)}
            className={"w-full py-3 rounded-xl text-xs font-bold transition-all " + (
              Object.keys(answers).length === scenarios.length
                ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 cursor-pointer"
                : "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed"
            )}
          >
            Submit & Evaluate My Safety Judgment ({Object.keys(answers).length}/{scenarios.length} Answered)
          </button>
        ) : (
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-300">Your Security Assessment Score:</span>
            <span className="text-base font-mono font-extrabold text-emerald-400">
              {calculateScore()} / {scenarios.length} Correct ({Math.round((calculateScore() / scenarios.length) * 100)}%)
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default function Topic5() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002_002 · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Transaction Safety Protocol
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Online Transaction Safety: Key Precautions while Performing Digital Transactions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the essential cybersecurity guidelines required for safeguarding financial credentials during online shopping, net banking, and UPI digital payments.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Safety Scenario Lab', icon: BookOpen },
            { id: 'matrix', label: '2. The 7 Golden Rules', icon: Layers },
            { id: 'pitfalls', label: '3. Board Tips & Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Plain Text Notes', icon: FileText }
          ].map((tab) => {
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

        {/* TAB 1: SAFETY SCENARIO LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <SafeTransactionScenarioLab />

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="When asked in CBSE board exams to 'List any 4 precautions to be observed while performing online financial transactions', always write complete, specific points: (1) Verify 'https://' and the padlock icon in the URL bar, (2) Avoid performing payments on unsecured public Wi-Fi, (3) Never disclose OTP, CVV, or ATM PIN to anyone, and (4) Enable 2-Factor Authentication (2FA) and real-time SMS alerts."
            />
          </div>
        )}

        {/* TAB 2: THE 7 GOLDEN RULES */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> The 7 Essential Precautions for Online Transaction Safety
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { num: "1", title: "Verify HTTPS & SSL Padlock", desc: "Never enter credit card or net banking details on plain unencrypted 'http://' sites." },
                  { num: "2", title: "Avoid Public Wi-Fi for Payments", desc: "Open hotspots in cafes/airports allow packet sniffers to steal banking credentials." },
                  { num: "3", title: "Never Share OTP, CVV, or PINs", desc: "Legitimate banks and officials NEVER ask for passwords, PINs, or OTPs over phone calls." },
                  { num: "4", title: "Enforce Two-Factor Authentication (2FA)", desc: "Requires both password + dynamic SMS/Authenticator OTP to authorize transactions." },
                  { num: "5", title: "Use Virtual On-Screen Keyboards", desc: "Defeats hardware and software keyloggers when typing on shared or cybercafe PCs." },
                  { num: "6", title: "Explicitly Log Out after Shopping", desc: "Invalidates the active session token, preventing unauthorized session reuse." },
                  { num: "7", title: "Enable Instant SMS & Email Alerts", desc: "Ensures immediate discovery of unauthorized debits; report to 1930 / cybercrime.gov.in." }
                ].map((rule, rIdx) => (
                  <div key={rIdx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[11px] font-mono font-bold flex items-center justify-center">
                        {rule.num}
                      </span>
                      <span className="text-xs font-bold text-white">{rule.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-7">{rule.desc}</p>
                  </div>
                ))}
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
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Common Traps</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 1: Confusing CVV with Card Expiry Date</p>
                  <p className="text-slate-400">CVV is the 3-digit security validation code printed on the signature strip on the back of the card. It is NOT the MM/YY expiration date printed on the front!</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 2: Believing Bank Managers can request OTPs for KYC</p>
                  <p className="text-slate-400">In case study exam questions, if a caller asks for an OTP claiming to update KYC, the correct answer is ALWAYS that this is a fraudulent Vishing attack and the OTP must NOT be shared.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 5 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic5_Online_Transaction_Safety_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
