import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, XCircle, RotateCcw, HelpCircle, BookOpen, 
  Sparkles, CheckSquare, ArrowRight, ChevronDown, ChevronUp, Brain, 
  ShieldCheck, Target, FileText, Layers, AlertTriangle 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

const subjectiveQuestions = [
  {
    id: 1,
    marks: 2,
    question: 'Differentiate between Front-End tools and Back-End tools used in web applications with two examples each.',
    modelAnswer: 'Front-End tools deal with the presentation layer, user interface, client-side styling, and interactivity directly rendered in the client web browser (Examples: HTML, CSS, JavaScript, React). Back-End tools operate on the web/application server handling business logic, user authentication, database operations, and data persistence (Examples: Java/JSP, Python, PHP, MySQL, Oracle).'
  },
  {
    id: 2,
    marks: 2,
    question: 'What is the SMART governance model? Expand each letter in SMART.',
    modelAnswer: 'SMART is the core model of modern electronic governance. S stands for Simple (uncomplicated rules & easy interfaces), M stands for Moral (ethical governance preventing corruption), A stands for Accountable (transparent audit trails for official actions), R stands for Responsive (fast turnaround times & quick grievance redressal), and T stands for Transparent (public access to government policies, tenders, and decisions).'
  },
  {
    id: 3,
    marks: 3,
    question: 'Explain the role of DigiLocker under the Digital India initiative. How are digital documents in DigiLocker treated legally?',
    modelAnswer: 'DigiLocker is a cloud-based document repository platform under Digital India (MeitY) that provides citizens with a secure digital locker tied to their Aadhaar. It allows issued documents (CBSE Class X/XII marksheets, Driving Licenses, Vehicle RC, PAN cards) to be fetched directly from authentic issuers. Under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016, issued documents in DigiLocker are treated at par with original physical documents.'
  },
  {
    id: 4,
    marks: 3,
    question: 'Identify the appropriate official Indian e-governance portal for each of the following civic requirements: (a) Applying for a fresh Indian Passport, (b) Registering as a new voter upon turning 18, (c) Booking a reserved railway berth.',
    modelAnswer: '(a) Applying for a fresh Indian Passport: Passport Seva Portal (passportindia.gov.in / Ministry of External Affairs).\n(b) Registering as a new voter: Voters Service Portal / NVSP (voters.eci.gov.in / Election Commission of India).\n(c) Booking a reserved railway berth: IRCTC Next Generation e-Ticketing Portal (irctc.co.in / Indian Railways).'
  },
  {
    id: 5,
    marks: 5,
    question: 'Describe five distinct Social, Economic, and Administrative benefits that e-Governance offers to Indian citizens over traditional paper-based administration.',
    modelAnswer: '1. Elimination of Middlemen & Corruption: Direct digital interaction removes unauthorized commission agents and touts.\n2. 24x7 Universal Accessibility: Citizens can submit applications and make fee payments round-the-clock from home without standing in long queues.\n3. Time and Cost Savings: Saves money spent on physical travel, photocopying, and taking leave from daily employment.\n4. Complete Transparency & File Tracking: Timestamped digital audit trails allow citizens to track application status in real-time, enforcing administrative accountability.\n5. Paperless Green Governance: Digital verification and cloud documents save reams of paper, protecting the environment.'
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
            Web Applications & E-Governance Portals • {questions.length} MCQs • 30 Minutes Timer • Bilingual Explanations
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
            <span className="text-slate-400 block mb-1">Pass Benchmark</span>
            <span className="font-bold text-emerald-400 text-sm sm:text-base">75%</span>
          </div>
        </div>

        <button
          onClick={handleStartExam}
          className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 transition-all cursor-pointer"
        >
          Start Timed Simulator Now
        </button>
      </div>
    );
  }

  if (examState === 'running') {
    const q = questions[currentIdx];
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded-md bg-sky-950 text-sky-300 border border-sky-800/60 font-semibold">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs text-slate-400">
              Answered: {Object.keys(userAnswers).length} / {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-amber-400 font-mono text-sm font-bold">
            <Clock size={16} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {q.question}
          </h3>

          <div className="space-y-2.5">
            {q.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentIdx] === opt;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(opt)}
                  className={"w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer " + (
                    isSelected
                      ? 'bg-sky-950/70 border-sky-500 text-sky-200 font-semibold shadow-lg shadow-sky-950/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                  )}
                >
                  <span className={"w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 " + (
                    isSelected ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  )}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="pt-0.5">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Question Nav */}
        <div className="pt-4 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-2 font-mono">Question Quick Navigation:</span>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isCurrent = currentIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={"w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer " + (
                    isCurrent
                      ? 'bg-sky-500 text-slate-950 ring-2 ring-sky-400'
                      : isAnswered
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  )}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Previous
          </button>

          {currentIdx < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(prev => prev + 1)}
              className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => setExamState('submitted')}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>
    );
  }

  // Submitted Review State
  return (
    <div className="space-y-6">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4">
        <div className={"w-20 h-20 rounded-full flex items-center justify-center mx-auto " + (
          percentage >= 75 
            ? 'bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400' 
            : 'bg-amber-500/10 border-2 border-amber-500 text-amber-400'
        )}>
          <Award size={40} />
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest font-mono text-slate-400">Official Exam Scorecard</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {score} / {questions.length} ({percentage}%)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {percentage >= 85 
              ? 'Outstanding Mastery! You are well-prepared to score 100% in CBSE IT 802.' 
              : percentage >= 75 
              ? 'Good Job! You passed the benchmark. Review the bilingual explanations below.' 
              : 'Needs Revision. Please review the key concepts before attempting again.'}
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={handleStartExam}
            className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw size={16} />
            <span>Retake Simulator</span>
          </button>
        </div>
      </div>

      {/* Answer Review */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Detailed Answer Review & Explanations</h3>
        {questions.map((q, idx) => {
          const userAns = userAnswers[idx];
          const isCorrect = userAns === q.answer;
          return (
            <div 
              key={idx} 
              className={"p-4 rounded-xl border space-y-3 " + (
                isCorrect ? 'bg-slate-950/80 border-emerald-800/60' : 'bg-slate-950/80 border-rose-800/60'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <span className={"w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 " + (
                    isCorrect ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-rose-950 text-rose-400 border border-rose-700'
                  )}>
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">{q.question}</span>
                </div>
                {isCorrect ? (
                  <span className="text-xs px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-semibold flex items-center gap-1 shrink-0">
                    <CheckCircle2 size={12} /> Correct
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded font-semibold flex items-center gap-1 shrink-0">
                    <XCircle size={12} /> Incorrect
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options.map((opt, optIdx) => {
                  const isThisCorrect = opt === q.answer;
                  const isThisUser = opt === userAns;
                  return (
                    <div 
                      key={optIdx}
                      className={"p-2.5 rounded-lg border " + (
                        isThisCorrect 
                          ? 'bg-emerald-950/70 border-emerald-600 text-emerald-200 font-semibold' 
                          : isThisUser 
                          ? 'bg-rose-950/70 border-rose-600 text-rose-200' 
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      )}
                    >
                      <span className="font-mono mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                      {opt}
                      {isThisCorrect && ' ✓ (Correct Answer)'}
                      {isThisUser && !isThisCorrect && ' ✗ (Your Choice)'}
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs space-y-1">
                <p className="font-semibold text-sky-300">Explanation (English):</p>
                <p className="text-slate-300">{q.explanation}</p>
                {q.explanationBn && (
                  <>
                    <p className="font-semibold text-amber-300 pt-1">বাংলা ব্যাখ্যা:</p>
                    <p className="text-slate-300">{q.explanationBn}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Topic8() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [openSubjective, setOpenSubjective] = useState(null);

  const tabs = [
    { id: 'simulator', label: 'Timed Exam Simulator', icon: Award },
    { id: 'subjective', label: 'Subjective Board Model Drills', icon: BookOpen },
    { id: 'faqs', label: 'All Practice Questions', icon: HelpCircle },
    { id: 'notes', label: 'Revision Notes', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Award size={14} />
            <span>CBSE Class XII IT (Subject Code 802) • Unit 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Practice Your Skill Here: Timed Board Simulator & Subjective Drills
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Test your complete understanding of Web Applications and E-Governance Portals under official CBSE examination conditions.
          </p>
        </div>

        {/* Navigation Tabs */}
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

        {/* TAB 1 */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <ExamSimulator />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Aim for 85%+ on this timed simulator. If you make any mistakes, review the bilingual explanation immediately and re-attempt to solidify your memory for the CBSE Board Exam!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'subjective' && (
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <BookOpen size={18} /> CBSE Class XII Subjective Model Questions & Grading Rubrics
              </h3>
              <p className="text-xs text-slate-400">Master 2-mark, 3-mark, and 5-mark theoretical answers for the final board exam</p>

              <div className="space-y-3 pt-2">
                {subjectiveQuestions.map((sq, idx) => {
                  const isOpen = openSubjective === idx;
                  return (
                    <div key={sq.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenSubjective(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-start justify-between gap-4 hover:bg-slate-800/60 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <span className="px-2.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/60 font-mono font-bold text-xs shrink-0 mt-0.5">
                            {sq.marks} Marks
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-slate-100">{sq.question}</span>
                        </div>
                        {isOpen ? <ChevronUp size={18} className="text-sky-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2 text-xs">
                          <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block">
                            CBSE Standard Model Answer
                          </span>
                          <p className="text-slate-200 leading-relaxed whitespace-pre-line text-xs font-sans">
                            {sq.modelAnswer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 8 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic8_Practice_Skill_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
