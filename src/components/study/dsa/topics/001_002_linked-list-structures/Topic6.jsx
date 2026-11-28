import React, { useEffect, useState } from "react";
import CProjectAnswerTemplateEnhanced from "../../../CProjectAnswerTemplateEnhanced";
import projectsData from "./topic6_files/dsa-linked-list-projects.json";

export default function Topic6() {
  const [enhancedData, setEnhancedData] = useState(null);
  const [showDanglingLab, setShowDanglingLab] = useState(true);

  useEffect(() => {
    // 1. Import all .c files from topic6_files/answers/ as raw text
    const modules = import.meta.glob("./topic6_files/answers/*.c", {
      query: "?raw",
      import: "default",
      eager: true,
    });

    // 2. Build lookup map: filename → source code string
    const fileMap = {};
    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop(); // e.g. "answer1.c"
      fileMap[fileName] = modules[path];
    });

    // 3. Merge source code into each project object's "answer" property
    const enhancedProjects = projectsData.projects.map((proj) => {
      const filePath = proj.answerFile || "";
      const fileName = filePath.split("/").pop();
      const code = fileMap[fileName];

      if (!code) {
        console.warn(`⚠ Missing C answer file: ${fileName}`);
      }

      return {
        ...proj,
        answer: code || `// Source file "${fileName}" not found in answers folder`,
      };
    });

    setEnhancedData({
      ...projectsData,
      projects: enhancedProjects,
    });
  }, []);

  if (!enhancedData) {
    return (
      <div className="p-6 text-slate-400 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Linked List Practical Lab Projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100">
      {/* Friendly Classroom Warm-Up: Dangling Pointers after free(node) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-rose-950/25 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-cyan-300">
                  Barrackpore Lab Quick-Check: Dangling Pointers after <code className="font-mono text-rose-300">free(node)</code>
                </h2>
                <p className="text-xs text-slate-400">
                  Before coding the 25 Linked List lab projects below, lock in this #1 memory-safety habit!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDanglingLab((v) => !v)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 hover:border-cyan-500 transition cursor-pointer"
            >
              {showDanglingLab ? "Hide Dialogue ▲" : "Show Dialogue ▼"}
            </button>
          </div>

          {showDanglingLab && (
            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-7 space-y-2.5 text-xs sm:text-sm text-slate-300 border-l-2 border-cyan-500/40 pl-4">
                <p>
                  <strong className="text-emerald-400">Debangshu:</strong>{" "}
                  <em>"Sir, after I call <code className="font-mono text-rose-300">free(node)</code>, why does <code className="font-mono">printf("%d", node-&gt;data)</code> sometimes STILL print the old number instead of crashing?"</em>
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong>{" "}
                  <em>"<code className="font-mono">free(node)</code> returns the room key to the hotel manager (the heap allocator), but it does NOT erase your slip of paper holding the room number! Walking back into that room later is a <strong>Dangling Pointer (Use-After-Free)</strong> bug."</em>
                </p>
                <p>
                  <strong className="text-emerald-400">Tuhina:</strong>{" "}
                  <em>"So right after <code className="font-mono">free(node);</code> we immediately tear up the slip by writing <code className="font-mono text-emerald-300">node = NULL;</code>!"</em>
                </p>
              </div>

              <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-slate-800 p-3.5 font-mono text-xs space-y-2">
                <div className="text-rose-400">// ❌ Dangling Pointer Trap:</div>
                <div className="text-slate-400">free(curr); curr = curr-&gt;next; // Use-After-Free!</div>
                <div className="text-emerald-400 pt-1">// ✅ Safe 3-Step Rule:</div>
                <div className="text-emerald-200">
                  Node *next = curr-&gt;next;<br />
                  free(curr);<br />
                  curr = NULL; // Neutralize!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CProjectAnswerTemplateEnhanced data={enhancedData} />
    </div>
  );
}
