import React, { useState } from 'react';
import {
  Award, CheckCircle2, XCircle, Clock, AlertTriangle,
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw,
  Sparkles, ChevronRight, ChevronLeft
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

export default function Topic13() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQIndex(0);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const currentQ = questions[currentQIndex];
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 13
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Interactive Diagnostic Assessment
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Practice your Skill here: 25 Authentic CBSE Board Examination Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your comprehensive mastery of Network Protocols (TCP/IP, HTTP/S, FTP, SMTP/POP3/IMAP, VoIP, SSH), Web Architecture (WWW, HTML, XML, DNS, URL, IP Addressing), Malware (Viruses, Worms, Trojans, Ransomware), Cyber Attacks (Phishing, DoS/DDoS), and Network Defense (Firewalls, Cookies, Ethical Hackers).
            </p>
          </div>
        </div>

        {/* 2. Scoreboard & Progress Banner */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-lg">
              {currentQIndex + 1}/{questions.length}
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Question Progress</span>
              <h4 className="text-sm font-bold text-white">Answered {Object.keys(selectedAnswers).length} of {questions.length} Questions</h4>
            </div>
          </div>

          {submitted && (
            <div className="flex items-center gap-4 px-5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl">
              <Award className={percentage >= 75 ? "text-emerald-400" : "text-amber-400"} size={26} />
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Final Board Score</span>
                <p className="text-base font-extrabold text-white">
                  {score} / {questions.length} ({percentage}%)
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <CheckCircle2 size={16} /> Submit Assessment
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <RefreshCw size={16} /> Retake Test
              </button>
            )}
          </div>
        </div>

        {/* 3. Interactive Question Card */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Question #{currentQ.id}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              1 Mark · Single Choice
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              let optionStyle = "border-slate-800 hover:border-slate-700 bg-slate-900/50 text-slate-300";

              if (submitted) {
                if (idx === currentQ.correctAnswer) {
                  optionStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-medium";
                } else if (isSelected) {
                  optionStyle = "border-red-500 bg-red-950/40 text-red-200 font-medium";
                }
              } else if (isSelected) {
                optionStyle = "border-blue-500 bg-blue-950/40 text-blue-200 font-medium";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  disabled={submitted}
                  className={"w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 " + optionStyle}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {submitted && idx === currentQ.correctAnswer && (
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  )}
                  {submitted && isSelected && idx !== currentQ.correctAnswer && (
                    <XCircle size={18} className="text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {submitted && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 mt-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={16} />
                <span>Examiner Explanation:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              {currentQ.hint && (
                <div className="text-slate-400 border-t border-slate-800 pt-2 flex items-center gap-1.5">
                  <span className="text-amber-400 font-semibold">Board Hint:</span> {currentQ.hint}
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-all"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="text-xs text-slate-400 font-mono">
              {currentQIndex + 1} of {questions.length}
            </span>
            <button
              onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQIndex === questions.length - 1}
              className="flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-all"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 4. Question Palette Grid */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question Navigator Palette</h4>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQIndex;
              let style = "bg-slate-900 text-slate-400 border-slate-800";

              if (submitted) {
                const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                style = isCorrect ? "bg-emerald-950 text-emerald-400 border-emerald-500" : "bg-red-950 text-red-400 border-red-500";
              } else if (isCurrent) {
                style = "bg-blue-500 text-white font-bold border-blue-400";
              } else if (isAnswered) {
                style = "bg-blue-950/60 text-blue-300 border-blue-700";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={"w-9 h-9 rounded-lg border text-xs font-mono transition-all flex items-center justify-center " + style}
                >
                  {q.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Phenomenal accomplishment! Completing this diagnostic assessment proves that you have mastered Network Protocols, Web Services, and Cyber Security Threats for the CBSE Class 12 Computer Science Board Examination. Module 3 of Segment 4 is 100% complete! Up next is Module 4: 4-Mark Network Case Study Masterclass!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_networks_module3_diagnostic_test_syllabus.txt"
          title="Download Topic 13 Diagnostic Syllabus & Study Notes"
        />

      </div>
    </div>
  );
}
