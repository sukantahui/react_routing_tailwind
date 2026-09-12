import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic1_files/BoardTenYearPatternMasterDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

/**
 * Visual Interactive 10-Year Archetype Frequency Matrix
 */
const TenYearTrendMatrix = () => {
  const [activeArchetype, setActiveArchetype] = useState(0);

  const archetypes = [
    {
      title: "Class Design & Slab Calculations",
      frequency: "10 / 10 Years (100%)",
      qNumber: "Question 3",
      marks: "15 Marks",
      tags: ["Encapsulation", "Tariff Slabs", "OOP Objects"],
      description:
        "Every single year without fail, Question 3 asks for a real-world commercial entity (Electricity, Telephone, Taxi, Book Fair, Railway Ticket). Requires instance variables, accept(), calculate(), and display() methods.",
      trap: "Common trap: Applying the highest tariff rate to the entire volume rather than calculating cumulative slabs."
    },
    {
      title: "1D Array Search & Sort Algorithms",
      frequency: "10 / 10 Years (100%)",
      qNumber: "Question 4",
      marks: "15 Marks",
      tags: ["Binary Search", "Bubble Sort", "Selection Sort"],
      description:
        "Alternates between Binary Search on pre-sorted arrays and Bubble / Selection Sort in ascending or descending numerical order. Sometimes combined with parallel String arrays.",
      trap: "Common trap: Forgetting that Binary Search strictly requires a sorted array; confusing Bubble Sort inner bounds with Selection Sort."
    },
    {
      title: "String Handling & Word Parsing",
      frequency: "10 / 10 Years (100%)",
      qNumber: "Question 5",
      marks: "15 Marks",
      tags: ["Piglatin", "Title Case", "Vowels", "Palindrome"],
      description:
        "Requires looping over characters, extracting words using split() or space-detection, counting vowels, transforming words to Piglatin, or checking consecutive identical letters.",
      trap: "Common trap: Off-by-one errors with charAt() and substring(); forgetting to uppercase before checking vowels."
    },
    {
      title: "Method (Function) Overloading",
      frequency: "9 / 10 Years (90%)",
      qNumber: "Question 6",
      marks: "15 Marks",
      tags: ["Polymorphism", "Series Sum", "Geometric Shapes"],
      description:
        "Defines two or three overloaded versions of the same method name (e.g. series(int, int) and series(int)) to calculate nested mathematical series or geometrical area/volume.",
      trap: "Common trap: Integer division truncation in series terms like 1/2 returning 0.0 instead of 0.5."
    },
    {
      title: "Special Numbers & Digit Extraction",
      frequency: "8 / 10 Years (80%)",
      qNumber: "Question 7",
      marks: "15 Marks",
      tags: ["Tech", "Krishnamurthy", "Armstrong", "Automorphic"],
      description:
        "Extracts digits using modulo 10 and integer division by 10 to test unique mathematical properties: Tech Number, Krishnamurthy/Special, Disarium, Duck, Neon, or Spy.",
      trap: "Common trap: Modifying the original number during digit extraction and comparing against 0 instead of the original number."
    },
    {
      title: "2D Matrix Grid Operations",
      frequency: "7 / 10 Years (70%)",
      qNumber: "Question 8",
      marks: "15 Marks",
      tags: ["4x4 Matrix", "Diagonals", "Symmetry", "Boundary"],
      description:
        "Accepts elements into a double-dimensional array (3x3 or 4x4). Computes Left and Right diagonal sums, row/column totals, boundary elements, or tests for symmetry.",
      trap: "Common trap: Mixing row index i and column index j in condition (arr[i][j] == arr[j][i])."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Archetype Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {archetypes.map((arch, idx) => (
          <button
            key={idx}
            onClick={() => setActiveArchetype(idx)}
            className={clsx(
              "p-3 rounded-xl border text-left transition-all",
              activeArchetype === idx
                ? "bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold shadow-md shadow-amber-500/5"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            )}
          >
            <div className="text-xs font-mono text-amber-400/80 mb-1">{arch.qNumber}</div>
            <div className="text-xs line-clamp-2 leading-tight">{arch.title}</div>
          </button>
        ))}
      </div>

      {/* Detail Card */}
      {(() => {
        const item = archetypes[activeArchetype];
        return (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 mr-2">
                  {item.qNumber}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  {item.marks}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">10-Year Frequency</div>
                <div className="text-sm font-bold text-amber-400">{item.frequency}</div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>

            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              <strong className="text-rose-400">⚠️ Examiner Pitfall: </strong> {item.trap}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {item.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

const Topic1 = () => {
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
            Module 008_002 · Topic 1
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            CISCE 10-Year Solved Analysis
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Score: 100/100 Target
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Previous 10-Year CISCE Board Question Paper Solutions & Patterns
        </h1>
        <p className="text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the exact recurring question blueprints from 2014 to 2026 ICSE Computer Applications board papers.
          Learn to recognize the 6 core Section B archetypes, eliminate examiner traps, and write high-scoring answers.
        </p>
      </div>

      {/* 2. Concept Overview Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✦</span> Anatomy of the ICSE Computer Applications Examination
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          In ICSE Class X, the Computer Applications paper follows an exceptionally consistent pattern year after year.
          The 100-mark paper is split into:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Section A (Compulsory)</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-400/10 text-sky-300">40 Marks</span>
            </div>
            <h3 className="text-base font-semibold text-white">Theory, MCQs & Code Prediction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consists of Question 1 (20 MCQs x 1 Mark) and Question 2 (10 Short output/snippet/differentiate questions x 2 Marks).
              Tests fundamental concepts, Math library functions, wrapper classes, loop execution traces, and string methods.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Section B (Choice 4 of 6)</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300">60 Marks</span>
            </div>
            <h3 className="text-base font-semibold text-white">Full Java Program Implementation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consists of Questions 3 through 8 (15 Marks each). You must choose the 4 questions that best match your strengths.
              Every program requires complete class structure, Scanner input, algorithmic logic, clean output, and a Variable Description Table.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Semantic Visual Diagram Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">✦</span> CISCE 10-Year Weightage & Archetype Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click any question archetype below to inspect its recurrence rate, core concepts, and examiner traps:
            </p>
          </div>
        </div>

        {/* Interactive Archetype Trend Matrix */}
        <TenYearTrendMatrix />

        {/* Instructional SVG Diagram */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
          <svg viewBox="0 0 900 240" className="w-full max-w-4xl h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradSecA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gradSecB" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Background Frame */}
            <rect x="10" y="10" width="880" height="220" rx="14" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            {/* Section A Box */}
            <rect x="40" y="35" width="360" height="170" rx="10" fill="url(#gradSecA)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="60" y="70" fill="#ffffff" fontSize="18" fontWeight="bold">SECTION A: 40 MARKS</text>
            <text x="60" y="95" fill="#bae6fd" fontSize="13" fontWeight="bold">ALL COMPULSORY</text>

            <rect x="60" y="115" width="150" height="70" rx="6" fill="#0c4a6e" />
            <text x="75" y="140" fill="#ffffff" fontSize="13" fontWeight="bold">Question 1</text>
            <text x="75" y="160" fill="#7dd3fc" fontSize="11">20 MCQs (20 Marks)</text>
            <text x="75" y="175" fill="#94a3b8" fontSize="10">Basic types, library, OOP</text>

            <rect x="230" y="115" width="150" height="70" rx="6" fill="#0c4a6e" />
            <text x="245" y="140" fill="#ffffff" fontSize="13" fontWeight="bold">Question 2</text>
            <text x="245" y="160" fill="#7dd3fc" fontSize="11">10 Snippets (20 Marks)</text>
            <text x="245" y="175" fill="#94a3b8" fontSize="10">Dry-run outputs, traps</text>

            {/* Divider Arrow */}
            <path d="M 425 120 L 455 120" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrow)" />
            <circle cx="440" cy="120" r="14" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="434" y="125" fill="#fbbf24" fontSize="14" fontWeight="bold">+</text>

            {/* Section B Box */}
            <rect x="480" y="35" width="380" height="170" rx="10" fill="url(#gradSecB)" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="500" y="70" fill="#ffffff" fontSize="18" fontWeight="bold">SECTION B: 60 MARKS</text>
            <text x="500" y="95" fill="#fef08a" fontSize="13" fontWeight="bold">ANSWER ANY 4 OUT OF 6 (15 Marks Each)</text>

            <g transform="translate(500, 115)">
              <rect x="0" y="0" width="105" height="32" rx="4" fill="#78350f" />
              <text x="10" y="20" fill="#fef3c7" fontSize="11" fontWeight="bold">Q3: Class Design</text>

              <rect x="120" y="0" width="105" height="32" rx="4" fill="#78350f" />
              <text x="130" y="20" fill="#fef3c7" fontSize="11" fontWeight="bold">Q4: Array Sort/Find</text>

              <rect x="240" y="0" width="105" height="32" rx="4" fill="#78350f" />
              <text x="250" y="20" fill="#fef3c7" fontSize="11" fontWeight="bold">Q5: String Ops</text>

              <rect x="0" y="40" width="105" height="32" rx="4" fill="#78350f" />
              <text x="10" y="60" fill="#fef3c7" fontSize="11" fontWeight="bold">Q6: Overloading</text>

              <rect x="120" y="40" width="105" height="32" rx="4" fill="#78350f" />
              <text x="130" y="60" fill="#fef3c7" fontSize="11" fontWeight="bold">Q7: Special Num</text>

              <rect x="240" y="40" width="105" height="32" rx="4" fill="#78350f" />
              <text x="250" y="60" fill="#fef3c7" fontSize="11" fontWeight="bold">Q8: 2D Matrix</text>
            </g>
          </svg>
        </div>
      </div>

      {/* 4. Deep Technical Breakdown Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-6 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✦</span> 10-Year Special Numbers Definitive Cheatsheet
        </h2>
        <p className="text-sm text-slate-300">
          CISCE examiners frequently ask students to extract digits and verify special numeric properties.
          Keep these core definitions at your fingertips:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-slate-300 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3 border-b border-slate-800">Special Number</th>
                <th className="p-3 border-b border-slate-800">Condition / Mathematical Rule</th>
                <th className="p-3 border-b border-slate-800">Classic Examples</th>
                <th className="p-3 border-b border-slate-800">Board Occurrence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-amber-400">Krishnamurthy / Special</td>
                <td className="p-3">Sum of factorials of each digit equals the number itself.</td>
                <td className="p-3 font-mono text-emerald-400">145 (1! + 4! + 5! = 145)</td>
                <td className="p-3 text-slate-400">2016, 2020, 2024</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-amber-400">Tech Number</td>
                <td className="p-3">Even digit number; square of sum of two equal halves equals number.</td>
                <td className="p-3 font-mono text-emerald-400">3025 ((30+25)^2 = 3025), 2025, 9801</td>
                <td className="p-3 text-slate-400">2021, 2025 (Specimen)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-amber-400">Automorphic Number</td>
                <td className="p-3">A number whose square ends in the number itself.</td>
                <td className="p-3 font-mono text-emerald-400">25 (25^2=625), 76 (76^2=5776)</td>
                <td className="p-3 text-slate-400">2019, 2022</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-amber-400">Armstrong Number</td>
                <td className="p-3">Sum of digits raised to power of count of digits equals number.</td>
                <td className="p-3 font-mono text-emerald-400">153 (1^3 + 5^3 + 3^3), 370, 371</td>
                <td className="p-3 text-slate-400">2014, 2018</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-amber-400">Disarium Number</td>
                <td className="p-3">Sum of digits raised to their positional powers equals number.</td>
                <td className="p-3 font-mono text-emerald-400">135 (1^1 + 3^2 + 5^3 = 135)</td>
                <td className="p-3 text-slate-400">2020, 2023</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-amber-400">Neon Number</td>
                <td className="p-3">Sum of digits of the square of the number equals number.</td>
                <td className="p-3 font-mono text-emerald-400">9 (9^2 = 81 -&gt; 8 + 1 = 9)</td>
                <td className="p-3 text-slate-400">2017</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-amber-400">Spy Number</td>
                <td className="p-3">Sum of digits of the number equals product of its digits.</td>
                <td className="p-3 font-mono text-emerald-400">1124 (1+1+2+4 = 8, 1*1*2*4 = 8)</td>
                <td className="p-3 text-slate-400">2023 Specimen</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Hands-on Code Example Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">✦</span> Consolidated 10-Year Board Pattern Master Code
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Runnable Java class implementing Piglatin, Bubble Sort, Krishnamurthy Number, and Automorphic Number.
            </p>
          </div>
        </div>

        <JavaFileLoader
          fileModule={demoCode}
          title="BoardTenYearPatternMasterDemo.java"
          highlightLines={[22, 39, 58, 77]}
        />
      </div>

      {/* 6. Common Pitfalls & Best Practices */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-rose-400">⚠️</span> Top 5 Section B Mark-Loss Traps & How to Avoid Them
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h3 className="text-sm font-bold text-rose-300">1. Scanner Buffer Leaks with nextLine()</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When reading an integer followed by a String (e.g. consumer units then consumer address),
              calling <code className="text-amber-300">sc.nextInt()</code> leaves the newline in the buffer.
              Always insert an extra <code className="text-amber-300">sc.nextLine()</code> to consume the newline!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h3 className="text-sm font-bold text-rose-300">2. Integer Division Truncation in Series</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Writing <code className="text-amber-300">sum += Math.pow(x, i) / i</code> when <code className="text-amber-300">i</code> is an integer
              can lead to truncation if both operands evaluate to integers. Ensure floating point division by using <code className="text-amber-300">(double) i</code> or 1.0.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h3 className="text-sm font-bold text-rose-300">3. Missing Variable Description Table (VDT)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every year students lose 8 to 12 marks across Section B simply because they did not write the VDT.
              The VDT carries 3 marks per question in the official CISCE marking scheme!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h3 className="text-sm font-bold text-rose-300">4. Selection Sort Swap Placed Inside Inner Loop</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In Selection Sort, the swap MUST take place <em>outside</em> the inner comparison loop.
              Swapping inside turns it into a flawed hybrid and forfeits 3 marks on algorithmic correctness.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Thinking & Hints Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
        <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
          💡 Think About This: The 15-Minute Reading Time Strategy
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          During the mandatory 15 minutes before the exam begins, you are NOT permitted to write with your pen.
          Use this time exclusively to:
        </p>
        <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1.5">
          <li>Read all 6 Section B questions and immediately eliminate the 2 hardest ones.</li>
          <li>For the chosen 4 questions, mentally sketch the class names and method signatures.</li>
          <li>For Section A snippets, mentally trace the loop conditions to spot prefix/postfix traps.</li>
        </ul>
      </div>

      {/* 8. Comprehensive FAQ Section */}
      <FAQTemplate
        title="Previous 10-Year ICSE Board Exam Solutions & Insights FAQs"
        questions={questions}
      />

      {/* 9. Plain Text Printable Note Section */}
      <PlainTextPrint
        content={noteText}
        title="Module 008_002 Topic 1: 10-Year CISCE Board Solutions"
        stampEnabled={true}
        showDownload={true}
        downloadButtonText="Download 10-Year Board Cheatsheet"
        downloadFileName="008_002_selection-exam_topic1_10year_note.txt"
      />

      {/* 10. Teacher's Note Section */}
      <Teacher
        note="Dear students of Barrackpore, Shyamnagar, Ichapur, and Naihati: When sitting for your ICSE Computer Applications board exam, remember that precision always beats haste. Never rush Section A; 40 out of 40 in Section A creates an unstoppable psychological advantage. Draw your VDT with a ruler and pen immediately after finishing each program in Section B. You are thoroughly prepared to achieve your 100/100! — Sukanta Hui"
      />
    </div>
  );
};

export default Topic1;
