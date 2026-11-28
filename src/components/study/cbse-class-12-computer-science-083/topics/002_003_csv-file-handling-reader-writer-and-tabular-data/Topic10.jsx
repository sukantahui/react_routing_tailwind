import React, { useState } from 'react';
import {
  Award, CheckCircle2, XCircle, Clock, AlertTriangle,
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw,
  Sparkles, ChevronRight, ChevronLeft
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

export default function Topic10() {
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
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 10
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Interactive Diagnostic Assessment
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Practice your Skill here: 25 Authentic CBSE Board Examination Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your mastery of Python CSV file handling. Evaluate RFC 4180 rules, csv module classes, <code className="text-emerald-300">newline=''</code> parameters, <code className="text-emerald-300">writerow()</code> vs <code className="text-emerald-300">writerows()</code>, custom delimiters, row traversal, and CRUD patterns.
            </p>
          </div>
        </div>

        {/* 2. Scoreboard & Progress Banner */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-lg">
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

          <div className="flex items-center gap-2">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-lg transition-all"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
              >
                <RefreshCw size={14} /> Retake Assessment
              </button>
            )}
          </div>
        </div>

        {/* 3. Interactive Quiz Card */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase font-mono">
                Question #{currentQ.id}
              </span>
              <span className="text-xs text-slate-400">CBSE Class 12 CS Blueprint</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              const isCorrect = idx === currentQ.correctAnswer;
              let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850";

              if (submitted) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-red-950/40 border-red-500 text-red-300";
                }
              } else if (isSelected) {
                btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={"w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between " + btnStyle}
                >
                  <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                  {submitted && isCorrect && <CheckCircle2 size={18} className="text-emerald-400 shrink-0 ml-3" />}
                  {submitted && isSelected && !isCorrect && <XCircle size={18} className="text-red-400 shrink-0 ml-3" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (when submitted) */}
          {submitted && (
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <HelpCircle size={14} /> Official CBSE Answer Key &amp; Explanation:
              </span>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-all"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <span className="text-xs text-slate-400 font-mono">
              {currentQIndex + 1} of {questions.length}
            </span>

            <button
              onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQIndex === questions.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-all"
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
                style = "bg-emerald-500 text-white font-bold border-emerald-400";
              } else if (isAnswered) {
                style = "bg-emerald-950/60 text-emerald-300 border-emerald-700";
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
          tip="Congratulations on completing Unit I CSV File Handling! If your diagnostic score is 80% or higher, you are in top shape for the board exam. Review the explanations for any question you missed, run the lab scripts on your computer, and you are ready to conquer Segment 3 (Data Structures: Stacks)!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_csv_diagnostic_test_syllabus.txt"
          title="Download Topic 10 Diagnostic Syllabus & Study Notes"
        />

      </div>
    </div>
  );
}