import React, { useState, useEffect } from 'react';
import { 
  Trophy, Clock, CheckCircle2, XCircle, 
  RotateCcw, Sparkles, BookOpen, ArrowRight, 
  ShieldCheck, HelpCircle, Layers, Award, 
  Check, FileText, ChevronRight, AlertTriangle
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

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
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Trophy className="w-4 h-4" />
            <span>CBSE Class 12 IT (802) Exam Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Timed Assessment: Java Environment & Variables
          </h3>
        </div>

        {/* Timer & Status */}
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
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>

      {!examSubmitted ? (
        <div className="space-y-6">
          {/* Question Jump Palette */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Question Palette ({Object.keys(userAnswers).length}/{questions.length} Answered):</span>
              <span className="font-mono text-amber-300">Q #{currentIdx + 1} of {questions.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = currentIdx === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                      isCurrent
                        ? "bg-amber-400 text-slate-950 ring-2 ring-amber-300"
                        : isAnswered
                        ? "bg-emerald-500/30 border border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border border-slate-800 text-slate-500 hover:bg-slate-800"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-amber-400 font-bold uppercase tracking-wider">
                Question #{currentIdx + 1}
              </span>
              <span className="text-slate-500">1 Mark</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-500/60 text-white font-bold shadow-lg shadow-amber-500/10"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                        isSelected ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-400"
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
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
                  ? "You have demonstrated strong conceptual and practical mastery of Java environment and variables." 
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
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isCorrect 
                        ? "bg-slate-950/80 border-emerald-900/40" 
                        : "bg-slate-950/80 border-rose-900/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                        }`}>
                          {idx + 1}
                        </span>
                        <h5 className="text-sm font-bold text-white">{q.question}</h5>
                      </div>
                      {isCorrect ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 shrink-0">
                          CORRECT
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 shrink-0">
                          INCORRECT
                        </span>
                      )}
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-slate-400">
                        Your Answer: <strong className={isCorrect ? "text-emerald-300" : "text-rose-400"}>
                          {userAns !== undefined ? q.options[userAns] : "Not Answered"}
                        </strong>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-400 font-semibold">
                          Correct Answer: {q.options[q.correctAnswer]}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1 text-xs">
                      <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                      <p className="text-slate-400 text-[11px] leading-relaxed border-t border-slate-800/60 pt-1 mt-1 font-serif">
                        {q.explanationBn}
                      </p>
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

export default function Topic8() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Award className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Practice your Skill: <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">Exam Simulator & Model Solutions</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Test your exam readiness with a 30-minute timed mock test (30 MCQs) and study solved CBSE subjective model answers with official marking scheme breakdowns.
        </p>
      </div>

      {/* Interactive Exam Simulator */}
      <div className="max-w-6xl mx-auto">
        <ExamSimulator />
      </div>

      {/* Printable Revision Notes with Solved Model Answers */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Solved Subjective Model Answers (2, 3, 5 Marks)" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Final Assessment Bank" 
          description="Review all 30 mock exam questions with in-depth English and Bengali explanations to ensure 100% preparation." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Well done on completing Module 003_001! In the next module (003_002), we will explore Java Operators, Integer vs Floating division, Modulus arithmetic (% evaluation), and Prefix/Postfix expression tracing. Keep practicing daily!" 
        />
      </div>
    </div>
  );
}
