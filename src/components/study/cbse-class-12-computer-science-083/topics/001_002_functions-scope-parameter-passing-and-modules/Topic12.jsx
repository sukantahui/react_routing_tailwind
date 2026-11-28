import React, { useState } from 'react';
import {
  Award, CheckCircle2, XCircle, Clock, AlertTriangle,
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw,
  Sparkles, ChevronRight, ChevronLeft
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

export default function Topic12() {
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

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 12
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Interactive Skill Examination
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Practice your Skill: Module 2 Diagnostic Board Exam Simulator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your mastery with 25 authentic CBSE board-pattern multiple choice questions on functions, parameter passing, LEGB scope rules, global variables, and modules.
            </p>
          </div>
        </div>

        {/* 2. Interactive Diagnostic Quiz Engine */}
        <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-2xl">
          {/* Progress Bar & Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Question {currentQIndex + 1} of {questions.length}</span>
              <span>•</span>
              <span className="text-sky-400">{Object.keys(selectedAnswers).length} Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition"
              >
                <RefreshCw size={13} /> Reset Test
              </button>
              {!submitted && (
                <button
                  onClick={() => setSubmitted(true)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-950"
                >
                  Submit &amp; Grade
                </button>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-sky-500 h-1.5 transition-all duration-300"
              style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Score Banner when Submitted */}
          {submitted && (
            <div className="p-5 rounded-2xl border bg-gradient-to-r from-slate-900 to-slate-950 border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Assessment Result</span>
                <h3 className="text-xl font-extrabold text-white">
                  Score: <span className="text-emerald-400">{score}</span> / {questions.length} ({percentage}%)
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {percentage >= 90
                    ? "🌟 Exemplary Mastery! You have mastered Functions, Parameter Passing, and Scope Rules."
                    : percentage >= 75
                    ? "👍 High Proficiency! Great performance. Review any missed questions below."
                    : "⚠️ Good effort! Review the detailed explanations below to master challenging topics."}
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl font-black text-sky-400">
                {percentage}%
              </div>
            </div>
          )}

          {/* Active Question Box */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs font-bold rounded-lg shrink-0 mt-0.5">
                Q{currentQIndex + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === oIdx;
                const isCorrect = oIdx === currentQ.correctAnswer;
                let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";

                if (submitted) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-950/40 border-rose-500/60 text-rose-300";
                  }
                } else if (isSelected) {
                  btnStyle = "bg-sky-950/50 border-sky-500/70 text-sky-200 font-bold";
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(currentQ.id, oIdx)}
                    disabled={submitted}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-3 transition-all ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                    {submitted && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation when Submitted */}
            {submitted && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1 mt-4">
                <span className="font-bold text-sky-400 block uppercase tracking-wider text-[11px]">Explanation:</span>
                <p>{currentQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <ChevronLeft size={14} /> Previous
            </button>

            <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-md py-1">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-6 h-6 rounded-md text-[10px] font-mono font-bold transition ${
                      idx === currentQIndex
                        ? "bg-sky-500 text-white"
                        : isAnswered
                        ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/40"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQIndex === questions.length - 1}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* 3. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Congratulations on completing the Module 2 Diagnostic Exam! Scoring 22+ demonstrates exceptional command over Python functions, parameter passing, and scope resolution—key prerequisites for Unit I's upcoming File Handling modules! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Module 2 Diagnostic Scoring Benchmark"
            filename="topic12_functions_diagnostic_benchmark.txt"
          />
        </div>

      </div>
    </div>
  );
}
