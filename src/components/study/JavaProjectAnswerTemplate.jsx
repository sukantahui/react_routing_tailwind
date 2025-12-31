// src/components/study/common/JavaProjectAnswerTemplate.jsx

import React from "react";
import {
  GraduationCap,
  Code,
  Terminal,
  Lightbulb,
  BookOpen,
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

  const isCode = (answer = "") =>
    answer.includes("\n") ||
    answer.includes("for(") ||
    answer.includes("int ") ||
    answer.includes("boolean ") ||
    answer.includes("while(");

  return (
    <div className="space-y-12">

      {/* ================= HEADER ================= */}
      <header className="space-y-3">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-300">
          <GraduationCap size={22} />
          {projectCategory}
        </h2>

        <p className="text-slate-400 text-sm max-w-5xl">
          <b>Subject:</b> {subject} &nbsp;|&nbsp;
          <b>Board:</b> {board} &nbsp;|&nbsp;
          <b>Class:</b> {className} &nbsp;|&nbsp;
          <b>Tools:</b> {tools.join(", ")}
        </p>

        <p className="text-slate-500 text-xs">
          Prepared by <b>{institute.author}</b>, {institute.name} ({institute.location})
        </p>
      </header>

      {/* ================= PROJECT ANSWERS ================= */}
      <div className="space-y-6">

        {projects.map((project) => (
          <div
            key={project.projectId}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-lg"
          >
            {/* ---------- PROJECT HEADER ---------- */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-300 font-semibold text-sm border border-indigo-500/30">
                  {project.projectId}
                </span>

                <h3 className="text-lg font-semibold text-sky-300 flex items-center gap-2">
                  <Code size={18} />
                  {project.title}
                </h3>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium
                  ${
                    project.difficulty === "Beginner"
                      ? "bg-emerald-900/40 text-emerald-300"
                      : project.difficulty === "Intermediate"
                      ? "bg-amber-900/40 text-amber-300"
                      : "bg-rose-900/40 text-rose-300"
                  }
                `}
              >
                {project.difficulty}
              </span>
            </div>

            {/* ---------- DESCRIPTION ---------- */}
            <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-5xl">
              {project.description}
            </p>

            {/* ---------- EXAMPLE TEXT ---------- */}
            {project.exampleText && (
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                <BookOpen size={16} className="text-indigo-300" />
                <span><b>Example:</b> {project.exampleText}</span>
              </div>
            )}

            {/* ---------- EXAMPLE OUTPUT (PATTERN SAFE) ---------- */}
            {project.exampleOutput && (
              <div className="mt-3 rounded-xl border border-slate-700 bg-slate-800/40 p-4">
                <div className="text-xs text-slate-400 mb-2">Example Output</div>
                <pre className="text-slate-200 text-sm font-mono leading-snug whitespace-pre">
{project.exampleOutput}
                </pre>
              </div>
            )}

            {/* ---------- ANSWER ---------- */}
            <div className="mt-5 border border-slate-700 rounded-xl bg-[#0f172a] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700 text-slate-300 text-sm">
                {isCode(project.answer) ? (
                  <>
                    <Terminal size={16} className="text-indigo-300" />
                    Java Logic (BlueJ)
                  </>
                ) : (
                  <>
                    <Lightbulb size={16} className="text-yellow-300" />
                    Correct Answer
                  </>
                )}
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

            {/* ---------- LEARNING OUTCOME ---------- */}
            <div className="flex gap-2 mt-4 text-sm text-slate-400">
              <Lightbulb size={16} className="text-yellow-300 mt-0.5" />
              <span>{project.learningOutcome}</span>
            </div>
          </div>
        ))}
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
