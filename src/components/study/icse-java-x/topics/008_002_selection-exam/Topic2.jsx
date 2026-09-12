import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic2_files/VDTAndTraceTableDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

/**
 * Interactive Variable Role & VDT Builder Component
 */
const InteractiveVDTBuilder = () => {
  const [selectedRole, setSelectedRole] = useState(0);

  const roles = [
    {
      role: "Accumulator (Running Total)",
      variableName: "sum",
      dataType: "double",
      badDescription: "Stores the sum of numbers.",
      goodDescription:
        "Accumulator variable initialized to 0.0 to compute the running sum of student percentages for calculating class average.",
      codeSnippet: "double sum = 0.0;\nfor (double m : marks) {\n    sum += m;\n}",
      examinerTip: "Always mention what it accumulates and its initial value (0 for sum, 1 for product)."
    },
    {
      role: "Loop Counter / Index",
      variableName: "i",
      dataType: "int",
      badDescription: "Used for for loop.",
      goodDescription:
        "Loop counter variable used to iterate through array indices from 0 to TOTAL_STUDENTS - 1 during data processing.",
      codeSnippet: "for (int i = 0; i < marks.length; i++) {\n    // process marks[i]\n}",
      examinerTip: "Specify the range and what structure it indexes through (e.g. rows, columns, or characters)."
    },
    {
      role: "Boolean Flag",
      variableName: "found",
      dataType: "boolean",
      badDescription: "Stores true or false.",
      goodDescription:
        "Flag variable initialized to false, toggled to true when the target search key is matched during Binary Search.",
      codeSnippet: "boolean found = false;\nif (arr[mid] == key) {\n    found = true;\n    break;\n}",
      examinerTip: "State both its default state (false) and the exact condition that flips it to true."
    },
    {
      role: "Temporary Swap Storage",
      variableName: "temp",
      dataType: "int",
      badDescription: "Temporary variable.",
      goodDescription:
        "Temporary swap storage variable used to hold arr[j] during adjacent element interchange in Bubble Sort.",
      codeSnippet: "int temp = arr[j];\narr[j] = arr[j + 1];\narr[j + 1] = temp;",
      examinerTip: "Specify WHICH algorithm it is supporting (e.g. Bubble Sort, Selection Sort, or Digit Extraction)."
    },
    {
      role: "Input Stream Reference",
      variableName: "sc",
      dataType: "Scanner",
      badDescription: "Input object.",
      goodDescription:
        "Object reference of class java.util.Scanner used to accept user keyboard inputs from standard input stream (System.in).",
      codeSnippet: "Scanner sc = new Scanner(System.in);\nint units = sc.nextInt();",
      examinerTip: "Data type is Scanner (capital S), not 'class' or 'keyboard'."
    },
    {
      role: "Extracted Character / Token",
      variableName: "ch",
      dataType: "char",
      badDescription: "Stores a character.",
      goodDescription:
        "Stores individual character extracted from the input sentence using charAt(i) to check for vowels and case conversion.",
      codeSnippet: "for (int i = 0; i < s.length(); i++) {\n    char ch = s.charAt(i);\n    // test ch\n}",
      examinerTip: "Mention the method that extracts it (e.g. charAt(i)) and what condition is checked."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Role Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {roles.map((r, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedRole(idx)}
            className={clsx(
              "p-3 rounded-xl border text-left transition-all",
              selectedRole === idx
                ? "bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold shadow-md shadow-amber-500/5"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            )}
          >
            <div className="text-xs font-mono text-amber-400/80 mb-1">{r.variableName} ({r.dataType})</div>
            <div className="text-xs line-clamp-2 leading-tight">{r.role}</div>
          </button>
        ))}
      </div>

      {/* Role Details & Comparison */}
      {(() => {
        const item = roles[selectedRole];
        return (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 mr-2">
                  Role: {item.role}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  Type: {item.dataType}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Variable: <code className="text-amber-300">{item.variableName}</code></h3>
              </div>
            </div>

            {/* Side by side: Poor Description vs CISCE 100/100 Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-400">
                  <span>❌ Vague / Marks Deducted Description</span>
                  <span>(0 - 1 Marks)</span>
                </div>
                <p className="text-xs text-rose-200 italic font-mono bg-slate-950/40 p-2.5 rounded-lg border border-rose-500/20">
                  "{item.badDescription}"
                </p>
                <p className="text-[11px] text-rose-300">
                  Examiners penalize tautologies that merely re-state the variable name or general type.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>✓ CISCE Gold Standard Description</span>
                  <span>(Full 3 Marks)</span>
                </div>
                <p className="text-xs text-emerald-200 font-mono bg-slate-950/40 p-2.5 rounded-lg border border-emerald-500/20">
                  "{item.goodDescription}"
                </p>
                <p className="text-[11px] text-emerald-300">
                  Explains the functional algorithmic purpose, scope, and initial/terminal conditions clearly.
                </p>
              </div>
            </div>

            {/* Code Snippet & Examiner Tip */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300">Contextual Code Snippet:</div>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto">
                {item.codeSnippet}
              </pre>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <strong>💡 Examiner Advice:</strong> {item.examinerTip}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="space-y-12 text-slate-200">
      {/* Scoped CSS Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }
        `}
      </style>

      {/* 1. Header Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Module 008_002 · Topic 2
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            VDT Mastery & Time Management
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            3 Marks Guaranteed Per Program
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Time-Bound Programming & Variable Description Table (VDT) Practice
        </h1>
        <p className="text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the official CISCE Variable Description Table standard, learn to write perfect functional descriptions,
          and execute a disciplined 135-minute time management strategy for the ICSE Board Exam.
        </p>
      </div>

      {/* 2. Concept Overview Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-5 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✦</span> Why the Variable Description Table (VDT) is Decisive
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          In ICSE Computer Applications Section B, every program is marked out of <strong>15 marks</strong>.
          The official CISCE marking scheme allocates:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 text-center">
            <div className="text-xs text-slate-400 mb-1">Class & Variables</div>
            <div className="text-2xl font-black text-sky-400">3 Marks</div>
            <div className="text-[11px] text-slate-500 mt-1">Class header, imports, fields</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 text-center">
            <div className="text-xs text-slate-400 mb-1">Algorithm & Logic</div>
            <div className="text-2xl font-black text-amber-400">7 Marks</div>
            <div className="text-[11px] text-slate-500 mt-1">Core loops, conditionals, math</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 text-center">
            <div className="text-xs text-slate-400 mb-1">Input & Display</div>
            <div className="text-2xl font-black text-emerald-400">2 Marks</div>
            <div className="text-[11px] text-slate-500 mt-1">Prompts, formatted output</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 text-center ring-1 ring-amber-400/30">
            <div className="text-xs text-amber-300 font-bold mb-1">VDT & Comments</div>
            <div className="text-2xl font-black text-amber-400">3 Marks</div>
            <div className="text-[11px] text-amber-300/80 mt-1">Clean grid + clear roles</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
          <strong>The 12-Mark Math:</strong> If you write 4 flawless programs in Section B but omit the Variable Description Table,
          you automatically surrender <span className="font-bold underline text-amber-300">12 full marks</span> (3 marks × 4 questions).
          Your score collapses from 100/100 to 88/100! Spending just 2 minutes drawing a neat VDT saves those 12 marks.
        </div>
      </div>

      {/* 3. Interactive VDT Builder Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-6 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">✦</span> Interactive VDT Role Builder & Examiner Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click each common programming variable role to contrast poor descriptions with CISCE Gold Standard descriptions:
          </p>
        </div>

        <InteractiveVDTBuilder />
      </div>

      {/* 4. Time-Bound Execution Blueprint */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-6 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✦</span> The 135-Minute ICSE Exam Master Timeline
        </h2>
        <p className="text-sm text-slate-300">
          The ICSE Computer Applications examination gives you <strong>15 minutes reading time + 2 hours (120 minutes) writing time</strong>.
          Follow this proven timeline used by Centum scorers across West Bengal:
        </p>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-sky-500/30 gap-3">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold flex items-center justify-center text-sm font-mono shrink-0">
                15m
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">Reading Time: Question Selection Triage</h3>
                <p className="text-xs text-slate-400">Read all 6 Section B questions. Strike out the 2 riskiest. Lock in your best 4.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-sky-400 px-2.5 py-1 rounded bg-sky-950 border border-sky-800">
              No Pen on Paper
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-blue-500/30 gap-3">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-sm font-mono shrink-0">
                30m
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">Minutes 00 to 30: Section A Blitz (40 Marks)</h3>
                <p className="text-xs text-slate-400">Question 1 (20 MCQs x 1m) + Question 2 (10 Snippets x 2m). Draw pencil trace tables in rough.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-blue-400 px-2.5 py-1 rounded bg-blue-950 border border-blue-800">
              1.5 min / MCQ
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-amber-500/30 gap-3">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center text-sm font-mono shrink-0">
                70m
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">Minutes 30 to 100: Section B Deep Dive (60 Marks)</h3>
                <p className="text-xs text-slate-400">Write 4 programs @ 17.5 minutes each (12m code, 3m VDT, 2.5m dry run check).</p>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-950 border border-amber-800">
              17.5 min / Program
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-emerald-500/30 gap-3">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono shrink-0">
                20m
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">Minutes 100 to 120: Comprehensive Audit & Polish</h3>
                <p className="text-xs text-slate-400">Check question numbering, verify semicolons, matching braces, and ensure all 4 VDTs are complete.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800">
              Zero Marks Lost
            </span>
          </div>
        </div>
      </div>

      {/* 5. Hands-on Code Example Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✦</span> End-to-End Program with Official CISCE VDT
        </h2>
        <p className="text-xs text-slate-400">
          Inspect how every variable in this class statistics calculation program maps directly into the Variable Description Table at the bottom:
        </p>

        <JavaFileLoader
          fileModule={demoCode}
          title="VDTAndTraceTableDemo.java"
          highlightLines={[24, 25, 26, 35, 36, 37, 38, 55]}
        />
      </div>

      {/* 6. Common Pitfalls & Best Practices */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-rose-400">⚠️</span> Critical VDT Pitfalls That Lose Marks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h3 className="text-sm font-bold text-rose-300">1. Forgetting Loop Variables</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never forget to list <code className="text-amber-300">i</code> and <code className="text-amber-300">j</code>.
              Even though they are loop counters, they are variables and must appear in the VDT with data type <code className="text-amber-300">int</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h3 className="text-sm font-bold text-rose-300">2. Omitting Scanner References</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your code has <code className="text-amber-300">Scanner sc = new Scanner(System.in)</code>,
              <code className="text-amber-300">sc</code> is a reference variable. List it with data type <code className="text-amber-300">Scanner</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h3 className="text-sm font-bold text-rose-300">3. Array Brackets Omission</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For an array <code className="text-amber-300">int[] arr</code>, write the data type as <code className="text-amber-300">int[]</code> or <code className="text-amber-300">int array</code>,
              never just <code className="text-amber-300">int</code>. State its dimension and size.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Thinking & Hints Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
        <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
          💡 Think About This: The "Dry Run in Pencil" Rule
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          When solving snippet output questions in Section A (Question 2), never calculate in your head.
          Divide your rough work sheet with a line, write the variable columns <code className="text-amber-300">| i | x | condition |</code>,
          and trace each iteration on paper. 95% of output prediction errors occur when students perform prefix/postfix operations mentally!
        </p>
      </div>

      {/* 8. Comprehensive FAQ Section */}
      <FAQTemplate
        title="Variable Description Table (VDT) & Time Management FAQs"
        questions={questions}
      />

      {/* 9. Plain Text Printable Note Section */}
      <PlainTextPrint
        content={noteText}
        title="Module 008_002 Topic 2: VDT & Time Management"
        stampEnabled={true}
        showDownload={true}
        downloadButtonText="Download VDT Master Guide"
        downloadFileName="008_002_selection-exam_topic2_vdt_note.txt"
      />

      {/* 10. Teacher's Note Section */}
      <Teacher
        note="Remember my golden classroom rule: Never wait until the end of the entire exam to draw your Variable Description Tables. Draw the VDT immediately after writing each program while the variable names and their roles are fresh in your memory. A neatly bordered table drawn with a pencil and ruler instantly commands respect from the CISCE examiner! — Sukanta Hui"
      />
    </div>
  );
};

export default Topic2;
