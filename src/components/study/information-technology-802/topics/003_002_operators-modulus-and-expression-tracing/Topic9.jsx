import React, { useState, useEffect } from 'react';
import { 
  Trophy, Clock, CheckCircle2, XCircle, 
  RotateCcw, Sparkles, BookOpen, ArrowRight, 
  ShieldCheck, HelpCircle, Layers, Award, 
  Check, FileText, ChevronRight, AlertTriangle, Send
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

const ExamSimulator = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || examSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, examSubmitted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (examSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleRestart = () => {
    setUserAnswers({});
    setExamSubmitted(false);
    setTimeLeft(1800);
    setTimerActive(true);
    setCurrentIdx(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 75;
  const currentQ = questions[currentIdx];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 mb-12">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Trophy className="w-4 h-4" />
            <span>CBSE Class 12 IT (Code 802) Exam Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Timed Assessment: Operators, Modulus & Expression Tracing
          </h3>
        </div>

        {/* Timer & Submit Controls */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold border ${
            timeLeft < 300 
              ? "bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse" 
              : "bg-slate-950 border-slate-800 text-amber-300"
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {!examSubmitted && (
            <button
              onClick={() => setExamSubmitted(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Exam</span>
            </button>
          )}
        </div>
      </div>

      {!examSubmitted ? (
        /* Active Exam View */
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Palette Sidebar */}
          <div className="lg:col-span-1 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Question Palette
              </span>
              <span className="text-xs font-mono text-slate-400">
                {Object.keys(userAnswers).length} / {questions.length} Answered
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-8 rounded-lg text-xs font-mono font-bold transition cursor-pointer border ${
                      isCurrent
                        ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-950"
                        : isAnswered
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500" />
                <span>Current Question</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" />
                <span>Attempted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-900 border border-slate-800" />
                <span>Unattempted</span>
              </div>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="lg:col-span-3 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                <span className="text-amber-400 font-bold">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  1 Mark • Single Choice
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed whitespace-pre-line font-mono">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition cursor-pointer border flex items-center justify-between ${
                        isSelected 
                          ? "bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-950/20" 
                          : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono border ${
                          isSelected 
                            ? "bg-amber-500 text-slate-950 border-amber-400" 
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={currentIdx === questions.length - 1}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Scorecard & Review Report */
        <div className="space-y-6">
          <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 ${
            passed 
              ? "bg-gradient-to-b from-emerald-950/40 to-slate-950 border-emerald-500/40" 
              : "bg-gradient-to-b from-rose-950/40 to-slate-950 border-rose-500/40"
          }`}>
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto ${
              passed ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
            }`}>
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl sm:text-3xl font-black text-white">
                {passed ? "Congratulations! Skill Verified" : "Needs Revision"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                {passed 
                  ? "You have demonstrated outstanding mastery of Java arithmetic, modulus mechanics, increment/decrement tracing, and operator precedence." 
                  : "Review the detailed explanations below and retake the assessment to reach the 75% CBSE benchmark."}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 py-2">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 min-w-[120px]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Total Score</div>
                <div className="text-2xl font-black text-white">{score} / {questions.length}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 min-w-[120px]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Percentage</div>
                <div className={`text-2xl font-black ${passed ? "text-emerald-400" : "text-rose-400"}`}>
                  {percentage}%
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 min-w-[120px]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Status</div>
                <div className={`text-2xl font-black ${passed ? "text-emerald-400" : "text-amber-400"}`}>
                  {passed ? "PASS" : "RETRY"}
                </div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Timed Assessment</span>
            </button>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Comprehensive Answer Key & Bilingual Explanations:
            </h4>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div 
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 ${
                      isCorrect 
                        ? "bg-slate-900/60 border-emerald-500/30" 
                        : "bg-slate-900/60 border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-white font-mono">
                        #{idx + 1}. {q.question}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                        isCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                      }`}>
                        {isCorrect ? "CORRECT" : userAns === undefined ? "SKIPPED" : "INCORRECT"}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="text-slate-400">
                        Your Choice: <span className={isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                          {userAns !== undefined ? q.options[userAns] : "(None)"}
                        </span>
                      </div>
                      <div className="text-slate-400">
                        Correct Answer: <span className="text-emerald-400 font-bold">
                          {q.options[q.correctAnswer]}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
                      <div className="text-slate-300">
                        <strong className="text-amber-400">English Explanation:</strong> {q.explanation}
                      </div>
                      <div className="text-slate-400">
                        <strong className="text-sky-400">বাংলা ব্যাখ্যা:</strong> {q.explanationBn}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topic9() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Trophy className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Practice your Skill: Timed Assessment & Solved Answers
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Test your mastery under real exam conditions with our 30-minute timed simulator (30 CBSE MCQs), and study solved model answers with marking schemes for subjective 2-mark and 3-mark board questions.
        </p>
      </div>

      {/* Interactive 30-Minute Exam Simulator */}
      <div className="max-w-6xl mx-auto">
        <ExamSimulator />
      </div>

      {/* Solved CBSE Model Subjective Answers */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Solved Model Subjective Answers & Marking Schemes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 Exam Simulator Question Bank (All 30 Items)" 
          description="Browse the complete question bank with detailed bilingual English and Bengali explanations and hints for all 30 assessment items." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Heartiest congratulations on completing Module 003_002! With this, you have mastered Java arithmetic operators, integer truncation, modulus remainder formulas, prefix/postfix increment mechanics, complex expression tracing, compound casting, short-circuit logic, and operator precedence. Practice the 30-minute assessment until you consistently achieve 90%+!" 
        />
      </div>
    </div>
  );
}
