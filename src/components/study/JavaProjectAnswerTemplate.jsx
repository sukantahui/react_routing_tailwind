// src/components/study/common/JavaProjectAnswerTemplate.jsx

import React, { useState } from "react";
import {
  GraduationCap,
  Code,
  Terminal,
  Lightbulb,
  BookOpen,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

import JavaCodeBlock from "../../common/JavaCodeBlock";

export default function JavaProjectAnswerTemplate({ data }) {
  if (!data || !data.projects) return null;

  const {
    projectCategory,
    subject,
    board,
    class: className,
    tools,
    institute,
    projects,
  } = data;

  // Track which project IDs have their answers revealed
  const [revealedIds, setRevealedIds] = useState({});

  const isCode = (answer = "") =>
    answer.includes("\n") ||
    answer.includes("for(") ||
    answer.includes("int ") ||
    answer.includes("boolean ") ||
    answer.includes("while(");

  const toggleAnswer = (id) => {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const revealedCount = Object.values(revealedIds).filter(Boolean).length;
  const allRevealed = projects.length > 0 && revealedCount === projects.length;

  const toggleAll = () => {
    if (allRevealed) {
      setRevealedIds({});
    } else {
      const allTrue = {};
      projects.forEach((p) => {
        allTrue[p.projectId] = true;
      });
      setRevealedIds(allTrue);
    }
  };

  return (
    <div className="mt-8 space-y-10">
      {/* ================= HEADER & TOOLBAR ================= */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-300">
              <GraduationCap size={24} className="text-indigo-400" />
              {projectCategory}
            </h2>

            <p className="text-slate-400 text-sm mt-1 max-w-5xl">
              <b>Subject:</b> {subject} &nbsp;|&nbsp;
              <b>Board:</b> {board} &nbsp;|&nbsp;
              <b>Class:</b> {className} &nbsp;|&nbsp;
              <b>Tools:</b> {tools.join(", ")}
            </p>

            <p className="text-slate-500 text-xs mt-1">
              Prepared by <b>{institute.author}</b>, {institute.name} ({institute.location})
            </p>
          </div>

          {/* Quick Stats & Global Toggle Action */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/60 text-xs text-slate-300 font-mono">
              <Sparkles size={14} className="text-amber-400" />
              <span>{revealedCount}/{projects.length} Revealed</span>
            </div>

            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 border border-indigo-500/40 bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-200 hover:text-white cursor-pointer shadow-sm"
              title={allRevealed ? "Hide all solutions" : "Reveal all solutions"}
            >
              {allRevealed ? (
                <>
                  <EyeOff size={15} className="text-indigo-400" />
                  Hide All Solutions
                </>
              ) : (
                <>
                  <Eye size={15} className="text-indigo-400" />
                  Reveal All Solutions
                </>
              )}
            </button>
          </div>
        </div>

        {/* Self-Assessment Instruction Banner */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300">
          <Lightbulb size={16} className="text-yellow-400 shrink-0" />
          <span>
            <b>Interactive Practice Mode:</b> Attempt the logic on your own or in BlueJ first, then click <b>"View Solution"</b> to check the verified answer.
          </span>
        </div>
      </header>

      {/* ================= PROJECT ANSWERS ================= */}
      <div className="space-y-6">
        {projects.map((project) => {
          const isRevealed = !!revealedIds[project.projectId];

          return (
            <div
              key={project.projectId}
              className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-lg hover:border-slate-600 transition-colors duration-200"
            >
              {/* ---------- PROJECT HEADER ---------- */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-300 font-semibold text-sm border border-indigo-500/30">
                    {project.projectId}
                  </span>

                  <h3 className="text-lg font-semibold text-sky-300 flex items-center gap-2">
                    <Code size={18} className="text-sky-400 shrink-0" />
                    {project.title}
                  </h3>
                </div>

                <span
                  className={`self-start md:self-auto rounded-full px-3 py-1 text-xs font-medium border ${
                    project.difficulty === "Beginner"
                      ? "bg-emerald-900/30 text-emerald-300 border-emerald-500/30"
                      : project.difficulty === "Intermediate"
                      ? "bg-amber-900/30 text-amber-300 border-amber-500/30"
                      : "bg-rose-900/30 text-rose-300 border-rose-500/30"
                  }`}
                >
                  {project.difficulty}
                </span>
              </div>

              {/* ---------- CONCEPTS TAGS ---------- */}
              {project.concepts && project.concepts.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {project.concepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[11px] text-slate-400"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              )}

              {/* ---------- DESCRIPTION ---------- */}
              <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-5xl">
                {project.description}
              </p>

              {/* ---------- EXAMPLE TEXT ---------- */}
              {project.exampleText && (
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                  <BookOpen size={16} className="text-indigo-300 shrink-0" />
                  <span>
                    <b>Example:</b> {project.exampleText}
                  </span>
                </div>
              )}

              {/* ---------- EXAMPLE OUTPUT (PATTERN SAFE) ---------- */}
              {project.exampleOutput && (
                <div className="mt-3 rounded-xl border border-slate-700/70 bg-slate-800/40 p-4">
                  <div className="text-xs text-slate-400 mb-2 font-medium">Example Output</div>
                  <pre className="text-slate-200 text-sm font-mono leading-snug whitespace-pre overflow-x-auto">
{project.exampleOutput}
                  </pre>
                </div>
              )}

              {/* ---------- ON-DEMAND ANSWER TOGGLE BUTTON ---------- */}
              <div className="mt-5">
                {!isRevealed ? (
                  <button
                    type="button"
                    onClick={() => toggleAnswer(project.projectId)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 hover:bg-indigo-900/30 text-indigo-300 hover:text-indigo-200 text-sm font-medium transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <Eye size={17} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span>View Java Solution & Logic</span>
                    </div>

                    <span className="text-xs bg-indigo-500/20 group-hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono transition">
                      Click to Reveal
                      <ChevronDown size={14} />
                    </span>
                  </button>
                ) : (
                  <div className="border border-indigo-500/30 rounded-xl bg-[#0f172a] overflow-hidden shadow-md animate-fadeIn">
                    {/* Header bar of revealed answer with Hide button */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/90 text-slate-300 text-sm">
                      <div className="flex items-center gap-2 font-medium">
                        {isCode(project.answer) ? (
                          <>
                            <Terminal size={16} className="text-indigo-400" />
                            <span className="text-indigo-300">Java Logic (BlueJ / IDE)</span>
                          </>
                        ) : (
                          <>
                            <Lightbulb size={16} className="text-yellow-400" />
                            <span className="text-yellow-300">Verified Answer</span>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleAnswer(project.projectId)}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-300 px-2.5 py-1 rounded-md hover:bg-slate-800 transition cursor-pointer"
                        title="Hide this solution"
                      >
                        <EyeOff size={14} />
                        <span>Hide Solution</span>
                        <ChevronUp size={14} />
                      </button>
                    </div>

                    <div className="p-4">
                      {isCode(project.answer) ? (
                        <JavaCodeBlock code={project.answer} />
                      ) : (
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {project.answer}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ---------- LEARNING OUTCOME ---------- */}
              {project.learningOutcome && (
                <div className="flex gap-2 mt-4 text-sm text-slate-400">
                  <Lightbulb size={16} className="text-yellow-300 mt-0.5 shrink-0" />
                  <span>{project.learningOutcome}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-emerald-300">
        👩‍🏫 <b>Teacher Note:</b><br />
        Students should convert logic answers into full BlueJ programs by adding
        class name, <code>main()</code> method, input handling, and output statements.
      </div>
    </div>
  );
}
