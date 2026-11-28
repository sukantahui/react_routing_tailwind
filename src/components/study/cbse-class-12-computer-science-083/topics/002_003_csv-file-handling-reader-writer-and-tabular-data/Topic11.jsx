import React, { useState, useEffect } from "react";
import {
  Clock,
  Award,
  CheckCircle,
  HelpCircle,
  BookOpen,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Play,
  Pause
} from "lucide-react";
import FAQTemplate from "../../common/FAQTemplate";
import PlainTextPrint from "../../common/PlainTextPrint";
import { samplePaperSets } from "./topic11_files/sample_paper_sets.js";
import { questions } from "./topic11_files/topic11_questions.js";
import noteText from "./topic11_files/topic11_note.txt?raw";

export default function Topic11() {
  const [activeSetId, setActiveSetId] = useState(1);
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const activeSet = samplePaperSets.find((s) => s.setId === activeSetId) || samplePaperSets[0];

  const toggleSolution = (key) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(45 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* 1. Header & Blueprint Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="w-64 h-64 text-indigo-400" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>CBSE Class 12 Computer Science (Code 083)</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            CSV File Handling & Tabular Data: Sample Question Paper (10 Sets · 20 Marks Each)
          </h1>
          <p className="text-slate-300 max-w-3xl leading-relaxed text-sm lg:text-base">
            Master this module through 10 authentic 20-mark timed mock test papers. Each set strictly covers only previous topics of this module following the official CBSE blueprint: 4 objective 1-mark questions, 2 short-answer 2-mark questions, 2 analytical 3-mark questions, and 1 comprehensive 6-mark programming question.
          </p>

          {/* Test Parameters Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-indigo-500/20 text-xs">
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 block">Total Sets</span>
              <span className="text-lg font-bold text-indigo-400">10 Sets</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 block">Marks Per Set</span>
              <span className="text-lg font-bold text-emerald-400">20 Marks</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 block">Time Duration</span>
              <span className="text-lg font-bold text-amber-400">45 Minutes</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 block">Target Accuracy</span>
              <span className="text-lg font-bold text-sky-400">100% Correct</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Set Selector & Countdown Timer */}
      <section className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Select Question Paper Set</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Choose from 10 topic-tailored test papers designed for rigorous assessment.
            </p>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center space-x-4 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
            <div className="flex items-center space-x-2">
              <Clock className={`w-5 h-5 ${timeLeft < 300 ? "text-rose-400 animate-pulse" : "text-amber-400"}`} />
              <span className={`font-mono text-xl font-bold ${timeLeft < 300 ? "text-rose-400" : "text-amber-300"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                title={timerRunning ? "Pause Timer" : "Start Timer"}
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                title="Reset Timer (45m)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Set Tabs (1-10) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {samplePaperSets.map((s) => {
            const isActive = s.setId === activeSetId;
            return (
              <button
                key={s.setId}
                onClick={() => {
                  setActiveSetId(s.setId);
                  setExpandedSolutions({});
                }}
                className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left flex flex-col justify-between ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60"
                }`}
              >
                <span className="font-bold">Set {s.setId}</span>
                <span className="text-[10px] opacity-80 truncate">{s.title.split(":")[1] || s.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Teacher Guidance Alert Card */}
      <section className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900 p-6 rounded-xl border border-amber-600/30 space-y-3">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-base font-bold text-amber-200">
              Exam Instructions & Guidelines – Sukanta Hui (Barrackpore)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Solve each paper in 45 minutes on lined answer sheets before checking model answers. Pay careful attention to syntax nuances, boundary conditions, and file pointer positions. Marks in CBSE are awarded on step-by-step correctness according to official criteria.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Active Question Paper Display */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 lg:p-8 space-y-8">
        <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              CBSE Class 12 CS · 20-Mark Unit Test Series
            </span>
            <h2 className="text-2xl font-black text-white">{activeSet.title}</h2>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              Time: {activeSet.timeAllowed}
            </span>
            <span className="bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-700/60 text-emerald-300">
              Max Marks: {activeSet.maxMarks}
            </span>
          </div>
        </div>

        {/* Sections Iteration */}
        <div className="space-y-8">
          {activeSet.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <div className="bg-slate-800/80 px-4 py-2.5 rounded-lg border-l-4 border-indigo-500 flex justify-between items-center">
                <h3 className="text-sm font-bold text-indigo-200">{section.name}</h3>
                <span className="text-xs text-slate-400">
                  {section.questions.length} {section.questions.length === 1 ? "Question" : "Questions"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {section.questions.map((q) => {
                  const qKey = `${activeSet.setId}_${q.qNo}`;
                  const isExpanded = !!expandedSolutions[qKey];
                  return (
                    <div
                      key={q.qNo}
                      className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 space-y-3 hover:border-slate-600 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-xs font-mono text-sky-400 font-bold">
                            Question {q.qNo}
                          </span>
                          <p className="text-sm font-medium text-slate-100 whitespace-pre-line leading-relaxed font-mono">
                            {q.question}
                          </p>
                        </div>
                        <span className="bg-slate-900 px-2.5 py-1 rounded text-xs font-bold text-amber-300 border border-slate-700 shrink-0">
                          [{q.marks} {q.marks === 1 ? "Mark" : "Marks"}]
                        </span>
                      </div>

                      {/* Solution Toggle */}
                      <div className="pt-2">
                        <button
                          onClick={() => toggleSolution(qKey)}
                          className="flex items-center space-x-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <span>{isExpanded ? "Hide Model Solution" : "View Solution & Marking Scheme"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 text-xs">
                            <div>
                              <span className="text-emerald-400 font-bold block mb-1">
                                CBSE Model Solution / Answer:
                              </span>
                              <pre className="font-mono text-emerald-300 whitespace-pre-wrap bg-slate-900/60 p-2.5 rounded border border-slate-800">
                                {q.solution}
                              </pre>
                            </div>
                            <div>
                              <span className="text-sky-400 font-bold block mb-1">
                                Official Marking Scheme Breakdown:
                              </span>
                              <p className="text-slate-300 italic">
                                {q.markingScheme}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Printable Revision Note */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>Quick Revision Blueprint & Test Compilation</span>
        </h3>
        <PlainTextPrint
          title="Sample Papers 10 Sets Blueprint - Quick Reference"
          content={noteText}
        />
      </section>

      {/* 6. Assessment Questions on Blueprint & Strategy */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">25 Practice Questions on Examination Strategies & Blueprints</h3>
        </div>
        <p className="text-sm text-slate-300">
          Reinforce your test readiness, question selection, and step-marking insights:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
