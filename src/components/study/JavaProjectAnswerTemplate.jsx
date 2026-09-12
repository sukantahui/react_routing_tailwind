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
  FileCode,
  Copy,
  Check
} from "lucide-react";

import JavaCodeBlock from "../../common/JavaCodeBlock";

/**
 * Automatically wraps and formats a raw Java snippet into a clean, well-indented BlueJ class & main method.
 */
function formatAsFullProgram(rawCode = "", id = 1) {
  if (!rawCode) return "";

  const trimmed = rawCode.trim();

  // If already a complete class definition, return as-is
  if (trimmed.includes("class ") && (trimmed.includes("main(") || trimmed.includes("public static void main"))) {
    return trimmed;
  }

  // Indent snippet lines with 8 spaces inside main method
  const lines = trimmed.split("\n");
  const formattedBody = lines
    .map((line) => {
      const cleanLine = line.replace(/\t/g, "    ");
      return cleanLine.length > 0 ? "        " + cleanLine : "";
    })
    .join("\n");

  const className = `OutputQuestion${id}`;

  return `public class ${className} {\n    public static void main(String[] args) {\n${formattedBody}\n    }\n}`;
}

/**
 * Extracts instruction prompt and code block from project object.
 */
function extractPromptAndCode(project) {
  if (project.code && project.code.trim().length > 0) {
    return {
      prompt: project.description || "Predict the output of the following Java program:",
      code: project.code.trim()
    };
  }

  const desc = project.description || "";
  
  // Check if description has separated prompt and code block by newline
  if (desc.includes("\n\n")) {
    const parts = desc.split("\n\n");
    const prompt = parts[0];
    const code = parts.slice(1).join("\n\n");
    return { prompt, code };
  }

  // Check if description contains inline java code keywords
  const codeIndicators = ["int ", "for(", "for (", "System.out", "double ", "char ", "boolean ", "String "];
  const firstCodeIdx = codeIndicators.reduce((minIdx, ind) => {
    const idx = desc.indexOf(ind);
    if (idx !== -1 && (minIdx === -1 || idx < minIdx)) {
      return idx;
    }
    return minIdx;
  }, -1);

  if (firstCodeIdx > 0 && desc.substring(0, firstCodeIdx).includes(":")) {
    const colonIdx = desc.indexOf(":", firstCodeIdx - 30 > 0 ? firstCodeIdx - 30 : 0);
    const splitPoint = colonIdx !== -1 && colonIdx < firstCodeIdx ? colonIdx + 1 : firstCodeIdx;
    return {
      prompt: desc.substring(0, splitPoint).trim(),
      code: desc.substring(splitPoint).trim()
    };
  }

  return { prompt: desc, code: null };
}

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
  const [copiedId, setCopiedId] = useState(null);

  const isCode = (answer = "") =>
    answer.includes("\n") ||
    answer.includes("for(") ||
    answer.includes("for (") ||
    answer.includes("int ") ||
    answer.includes("boolean ") ||
    answer.includes("while(") ||
    answer.includes("System.out");

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

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
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
            <b>Interactive Practice Mode:</b> Trace the code execution on your rough sheet or BlueJ IDE first, then click <b>"View Solution & Trace"</b> to verify the console output and explanation.
          </span>
        </div>
      </header>

      {/* ================= PROJECT ANSWERS ================= */}
      <div className="space-y-8">
        {projects.map((project) => {
          const isRevealed = !!revealedIds[project.projectId];
          const { prompt, code } = extractPromptAndCode(project);
          const fullProgramCode = code ? formatAsFullProgram(code, project.projectId) : null;

          return (
            <div
              key={project.projectId}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-7 shadow-xl hover:border-slate-700 transition-all duration-200 space-y-4"
            >
              {/* ---------- PROJECT HEADER ---------- */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-300 font-bold text-sm border border-indigo-500/30 font-mono">
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
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.concepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              )}

              {/* ---------- QUESTION PROMPT / INSTRUCTION ---------- */}
              <p className="text-slate-200 text-sm leading-relaxed font-medium">
                {prompt}
              </p>

              {/* ---------- WELL-INDENTED PROGRAM CODE BLOCK ---------- */}
              {fullProgramCode && (
                <div className="rounded-xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950">
                  <JavaCodeBlock
                    code={fullProgramCode}
                    title={`OutputQuestion${project.projectId}.java (BlueJ Standard)`}
                  />
                </div>
              )}

              {/* ---------- EXAMPLE / TEST CASE SUMMARY ---------- */}
              {project.exampleText && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <BookOpen size={14} className="text-indigo-400 shrink-0" />
                  <span>
                    <b>Context / Note:</b> {project.exampleText}
                  </span>
                </div>
              )}

              {/* ---------- ON-DEMAND ANSWER TOGGLE BUTTON ---------- */}
              <div className="pt-2">
                {!isRevealed ? (
                  <button
                    type="button"
                    onClick={() => toggleAnswer(project.projectId)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 hover:bg-indigo-900/30 text-indigo-300 hover:text-indigo-200 text-sm font-medium transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <Eye size={17} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span>View Output, Solution & Trace</span>
                    </div>

                    <span className="text-xs bg-indigo-500/20 group-hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono transition">
                      Click to Reveal
                      <ChevronDown size={14} />
                    </span>
                  </button>
                ) : (
                  <div className="border border-emerald-500/30 rounded-xl bg-slate-950/90 overflow-hidden shadow-lg animate-fadeIn space-y-3 p-4 md:p-5">
                    {/* Header bar of revealed answer with Hide button */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-sm">
                      <div className="flex items-center gap-2 font-semibold text-emerald-400">
                        <Terminal size={16} />
                        <span>Verified Console Output & Trace</span>
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

                    {/* Expected Console Output */}
                    {project.exampleOutput && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                            Expected Output:
                          </span>
                          <button
                            type="button"
                            onClick={() => copyText(project.exampleOutput, `out-${project.projectId}`)}
                            className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 transition"
                          >
                            {copiedId === `out-${project.projectId}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            <span>{copiedId === `out-${project.projectId}` ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                        <pre className="p-3 bg-black/80 rounded-lg border border-emerald-500/20 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed">
                          {project.exampleOutput}
                        </pre>
                      </div>
                    )}

                    {/* Detailed Answer / Explanation */}
                    {project.answer && (
                      <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-1">
                        <strong className="text-sky-300 font-semibold flex items-center gap-1.5">
                          <Lightbulb size={13} className="text-yellow-400" /> Step-by-Step Logic & Explanation:
                        </strong>
                        <p className="pl-4 text-slate-300 whitespace-pre-line font-sans">
                          {project.answer}
                        </p>
                      </div>
                    )}

                    {/* Learning Outcome */}
                    {project.learningOutcome && (
                      <div className="text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg flex items-start gap-1.5">
                        <Sparkles size={13} className="text-amber-400 mt-0.5 shrink-0" />
                        <span><b>Key Takeaway:</b> {project.learningOutcome}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-emerald-300">
        👩‍🏫 <b>Teacher Note (Sukanta Hui):</b><br />
        Trace each output test line by line on your rough sheet by maintaining a trace table for variables (<code>i</code>, <code>j</code>, <code>mat[i][j]</code>). 
        This is the exact method tested in ICSE Class 10 Section A board examinations!
      </div>
    </div>
  );
}
