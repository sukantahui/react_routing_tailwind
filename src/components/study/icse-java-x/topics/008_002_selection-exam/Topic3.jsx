import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/ExaminerTrapsPreventionDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

/**
 * Interactive Examiner Trap Detective & Centum Checklist
 */
const InteractiveTrapDetective = () => {
  const [selectedTrap, setSelectedTrap] = useState(0);

  const traps = [
    {
      title: "Integer Division in Formulas",
      category: "Arithmetic Trap",
      flawedCode: "double c = (5 / 9) * (f - 32);",
      flawExplanation:
        "5 and 9 are integer literals. 5 / 9 truncates to 0 in integer arithmetic. Then 0 * (f - 32) evaluates to 0.0 regardless of the Fahrenheit value!",
      correctedCode: "double c = (5.0 / 9) * (f - 32);",
      correctionTip: "Append .0 to integer constants to force double floating-point division."
    },
    {
      title: "String Equality via == Operator",
      category: "Object Reference Trap",
      flawedCode: "if (s1 == s2) { System.out.println(\"Matching\"); }",
      flawExplanation:
        "The == operator compares memory addresses (heap references), not character contents. For user-entered strings, s1 == s2 will almost always evaluate to false even if the text matches identically.",
      correctedCode: "if (s1.equals(s2)) { System.out.println(\"Matching\"); }",
      correctionTip: "Always use .equals() for case-sensitive equality or .equalsIgnoreCase() for case-insensitive matching."
    },
    {
      title: "Math Library Return Types",
      category: "Data Type Precision Trap",
      flawedCode: "int ans = Math.ceil(4.2); // Compilation Error!\n// Writing '5' in Section A instead of '5.0'",
      flawExplanation:
        "Math.ceil() and Math.floor() return primitive double values, not int! Writing 5 instead of 5.0 in Section A output prediction questions forfeits 1 mark.",
      correctedCode: "double ans = Math.ceil(4.2); // returns 5.0\nlong roundAns = Math.round(4.8); // returns 5",
      correctionTip: "Remember: ceil and floor return double (5.0); round returns long or int (5)."
    },
    {
      title: "Scanner Buffer Newline Leak",
      category: "Input Stream Trap",
      flawedCode: "int units = sc.nextInt();\nString name = sc.nextLine(); // Reads empty line!",
      flawExplanation:
        "sc.nextInt() only consumes numeric characters, leaving the newline '\\n' in the keyboard buffer. The subsequent sc.nextLine() immediately consumes that newline and returns an empty string!",
      correctedCode: "int units = sc.nextInt();\nsc.nextLine(); // Clear buffer!\nString name = sc.nextLine();",
      correctionTip: "Insert an extra dummy sc.nextLine(); immediately after nextInt() or nextDouble() before reading strings."
    },
    {
      title: "Array length vs String length()",
      category: "Syntax Property Trap",
      flawedCode: "int a = arr.length(); // Compile Error!\nint b = str.length;   // Compile Error!",
      flawExplanation:
        "In Java, an array's length is an immutable public field (no parentheses: arr.length). In contrast, String's length is a member method (requires parentheses: str.length()).",
      correctedCode: "int a = arr.length;   // Correct for array\nint b = str.length(); // Correct for String",
      correctionTip: "Arrays are language structures (property); Strings are class objects (method)."
    },
    {
      title: "Switch-Case Fall-Through",
      category: "Control Flow Trap",
      flawedCode: "switch(ch) {\n    case 1: x += 10; // Missing break!\n    case 2: x += 20;\n}",
      flawExplanation:
        "If ch is 1, case 1 executes and then control immediately 'falls through' and executes case 2 as well, resulting in x increasing by 30 instead of 10!",
      correctedCode: "switch(ch) {\n    case 1: x += 10; break;\n    case 2: x += 20; break;\n}",
      correctionTip: "Check for missing break; statements when tracing Section A switch snippets."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trap Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {traps.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTrap(idx)}
            className={clsx(
              "p-3 rounded-xl border text-left transition-all",
              selectedTrap === idx
                ? "bg-rose-500/10 border-rose-500/40 text-rose-300 font-semibold shadow-md shadow-rose-500/5"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            )}
          >
            <div className="text-xs font-mono text-rose-400/80 mb-1">{t.category}</div>
            <div className="text-xs line-clamp-2 leading-tight">{t.title}</div>
          </button>
        ))}
      </div>

      {/* Trap Detail View */}
      {(() => {
        const item = traps[selectedTrap];
        return (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-400/10 text-rose-400 border border-rose-400/20 mr-2">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
              </div>
            </div>

            {/* Code Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                <div className="text-xs font-bold text-rose-400">❌ Fatal Mistake (Mark Deduction)</div>
                <pre className="p-3 rounded-lg bg-slate-950/60 text-xs font-mono text-rose-300 border border-rose-500/20 overflow-x-auto">
                  {item.flawedCode}
                </pre>
                <p className="text-xs text-rose-200/90 leading-relaxed">{item.flawExplanation}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="text-xs font-bold text-emerald-400">✓ Board-Approved Solution (Centum Grade)</div>
                <pre className="p-3 rounded-lg bg-slate-950/60 text-xs font-mono text-emerald-300 border border-emerald-500/20 overflow-x-auto">
                  {item.correctedCode}
                </pre>
                <p className="text-xs text-emerald-200/90 leading-relaxed font-semibold">{item.correctionTip}</p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

const Topic3 = () => {
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
            Module 008_002 · Topic 3
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Final Board Exam Survival Guide
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Presentation & Error Prevention
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Final Board Exam Tips, Presentation Rules, and Error Prevention
        </h1>
        <p className="text-base text-slate-400 max-w-4xl leading-relaxed">
          The ultimate ICSE Computer Applications examination blueprint: CISCE answer script presentation standards,
          the top 10 lethal examiner traps, and the step-by-step strategy for achieving a perfect 100/100.
        </p>
      </div>

      {/* 2. Concept Overview Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-5 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✦</span> The Psychology of a CISCE Computer Applications Examiner
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          A board examiner evaluates hundreds of scripts every day. An examiner does not want to read messy, cramped code
          with missing question numbers and unreadable handwriting. When a student presents:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5">
            <div className="text-sm font-bold text-amber-400">1. Clean Visual Hierarchy</div>
            <p className="text-xs text-slate-400">
              Clear section headers, prominent question numbering, and starting every Section B program on a fresh page.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5">
            <div className="text-sm font-bold text-sky-400">2. Structured Indentation</div>
            <p className="text-xs text-slate-400">
              Proper 2 to 4 space indentation for method blocks and loops, with matching curly braces <code className="text-sky-300">&#123; &#125;</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5">
            <div className="text-sm font-bold text-emerald-400">3. Neat Ruler-Drawn VDT</div>
            <p className="text-xs text-slate-400">
              A bordered 3-column table listing every variable and its precise algorithmic purpose.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 italic">
          "When code looks clean, professional, and well-documented, the examiner immediately adopts a high-scoring mindset."
        </p>
      </div>

      {/* 3. Interactive Trap Detective Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-6 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-rose-400">⚠️</span> The Top 6 Lethal Examiner Traps & Prevention Guide
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click each trap to inspect how tiny syntax mistakes cause massive mark deductions, and see the exact Centum-grade corrections:
          </p>
        </div>

        <InteractiveTrapDetective />
      </div>

      {/* 4. CISCE Official Presentation Protocol */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-6 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✦</span> Official CISCE Answer Script Presentation Rules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <span>✍️</span> Ink, Margins & Layout
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
              <li><strong>Ink Color:</strong> Use exclusively <strong>BLUE</strong> or <strong>BLACK</strong> pen. Never mix blue and black inks randomly.</li>
              <li><strong>Pencil Usage:</strong> Use an HB/2B pencil and a transparent ruler for all table borders, VDT grids, and underlines.</li>
              <li><strong>No Red/Green Ink:</strong> Strictly banned. Red is reserved for the head examiner, green for the chief moderator.</li>
              <li><strong>No Whitener / Correction Fluid:</strong> Banned under board examination regulations.</li>
              <li><strong>Margins:</strong> Maintain a 1-inch left margin. Do not write code spilling off the right edge of the page.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>📋</span> Section B Program Formatting
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
              <li><strong>Fresh Page Rule:</strong> Begin every new 15-mark program at the top of a fresh new page.</li>
              <li><strong>Question Header:</strong> Write <code className="text-amber-300 font-bold">SECTION B - Question 3</code> prominently at the top.</li>
              <li><strong>Import Scanner:</strong> Write <code className="text-sky-300">import java.util.Scanner;</code> as line 1.</li>
              <li><strong>Inline Comments:</strong> Add 2-3 brief comments (e.g. <code className="text-slate-400">// Calculate slab charges</code>) to earn documentation marks.</li>
              <li><strong>VDT Placement:</strong> Draw the Variable Description Table immediately after the closing brace of the class.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Hands-on Code Example Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✦</span> Examiner Traps Demonstration Source Code
        </h2>
        <p className="text-xs text-slate-400">
          Runnable Java class demonstrating the 5 most lethal runtime and compile-time traps in action:
        </p>

        <JavaFileLoader
          fileModule={demoCode}
          title="ExaminerTrapsPreventionDemo.java"
          highlightLines={[23, 26, 38, 39, 49, 50]}
        />
      </div>

      {/* 6. Last-Minute 24-Hour Checklist */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-emerald-400">✓</span> The 24-Hour Pre-Exam & Exam Hall Checklist
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
            <h3 className="text-sm font-bold text-amber-300">The Night Before:</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Review the 8 Special Number definitions (Tech, Krishnamurthy, Automorphic, etc.).</li>
              <li>Re-read String methods: substring, indexOf, lastIndexOf, compareTo, trim.</li>
              <li>Pack your geometry pouch: 3 identical pens, 2 sharpened pencils, ruler, eraser.</li>
              <li>Get at least 7 hours of uninterrupted sleep for mental clarity.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
            <h3 className="text-sm font-bold text-emerald-300">In the Exam Hall (Last 10 Mins):</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Verify that Question 1 has all 20 MCQs answered with both part & option.</li>
              <li>Verify that Section B has exactly 4 programs attempted.</li>
              <li>Check that all 4 programs have a neat Variable Description Table.</li>
              <li>Count opening <code className="text-sky-300">&#123;</code> and closing <code className="text-sky-300">&#125;</code> braces to ensure they balance.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 7. Thinking & Hints Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
        <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
          💡 Think About This: The "Attempt 5th Question" Myth
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Students often ask: <em>"Should I attempt a 5th question in Section B just in case?"</em><br />
          <strong>Teacher's Advice:</strong> NO. Under CISCE evaluation instructions, examiners evaluate the FIRST 4 questions attempted
          and strike out any surplus questions (or mark them as 'Extra'). Spending 20 minutes writing an extra question wastes time
          that could have been used to eliminate errors, draw perfect VDTs, and review Section A snippets for a guaranteed 100/100!
        </p>
      </div>

      {/* 8. Comprehensive FAQ Section */}
      <FAQTemplate
        title="Board Exam Presentation & Trap Prevention FAQs"
        questions={questions}
      />

      {/* 9. Plain Text Printable Note Section */}
      <PlainTextPrint
        content={noteText}
        title="Module 008_002 Topic 3: Board Exam Survival Guide"
        stampEnabled={true}
        showDownload={true}
        downloadButtonText="Download Board Exam Survival Guide"
        downloadFileName="008_002_selection-exam_topic3_survival_guide.txt"
      />

      {/* 10. Teacher's Note Section */}
      <Teacher
        note="My dear students: You have worked tirelessly through your entire Class X Java curriculum — from JVM architecture to arrays, strings, constructors, and encapsulation. Walk into the examination room with heads held high and hearts calm. Read each question twice, write with pride and elegance, and conquer your paper. I have complete faith in each of you! — Sukanta Hui"
      />
    </div>
  );
};

export default Topic3;
