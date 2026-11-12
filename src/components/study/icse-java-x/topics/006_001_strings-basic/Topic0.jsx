import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/StringIntroductionDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

/**
 * Interactive String Anatomy & Memory Inspector
 * Visualizes how reference variables on the Stack point to String objects in Heap memory,
 * detailing 0-based indices, 16-bit Unicode characters, and ASCII codes.
 */
const InteractiveStringAnatomy = () => {
  const [selectedWord, setSelectedWord] = useState("Barrackpore");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sampleWords = ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Swadeep"];

  const currentChars = selectedWord.split("").map((ch, idx) => ({
    index: idx,
    char: ch,
    ascii: ch.charCodeAt(0),
    hex: "0x" + ch.charCodeAt(0).toString(16).toUpperCase(),
    binary: ch.charCodeAt(0).toString(2).padStart(8, "0")
  }));

  const activeChar = currentChars[selectedIndex] || currentChars[0];

  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
            <span>🔬</span> Interactive String Memory & Index Anatomy
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Observe the Stack reference pointer, Heap layout, and character indexing inside Java memory.
          </p>
        </div>

        {/* Word Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono px-2">Sample Literal:</span>
          {sampleWords.map((word) => (
            <button
              key={word}
              onClick={() => {
                setSelectedWord(word);
                setSelectedIndex(0);
              }}
              className={clsx(
                "px-2.5 py-1 text-xs font-mono rounded-lg transition-all",
                selectedWord === word
                  ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              "{word}"
            </button>
          ))}
        </div>
      </div>

      {/* SVG Diagram: Stack Reference to Heap Object */}
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <defs>
            <linearGradient id="stackGrad0" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="heapGrad0" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Stack Frame Box */}
          <rect x="20" y="20" width="200" height="140" rx="12" fill="url(#stackGrad0)" stroke="#0284c7" strokeWidth="1.5" />
          <text x="120" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">STACK MEMORY</text>
          <text x="120" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle">Local Frame: main()</text>

          <rect x="35" y="80" width="170" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <text x="45" y="102" fill="#cbd5e1" fontSize="11" fontWeight="bold">String city;</text>
          <text x="45" y="124" fill="#f59e0b" fontSize="10">Address: @0x7F4D</text>

          {/* Pointer Arrow from Stack to Heap */}
          <path d="M 205 110 L 290 110" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5,4" />
          <polygon points="290,105 300,110 290,115" fill="#f59e0b" />
          <text x="250" y="98" fill="#f59e0b" fontSize="9" textAnchor="middle">references</text>

          {/* Heap Object Box */}
          <rect x="305" y="20" width="495" height="140" rx="12" fill="url(#heapGrad0)" stroke="#10b981" strokeWidth="1.5" />
          <text x="550" y="45" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
            HEAP MEMORY (String Object @0x7F4D)
          </text>
          <text x="550" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle">
            length() = {selectedWord.length} | Immutable Unicode UTF-16 Character Sequence
          </text>

          {/* Character Cells Array */}
          <g transform="translate(325, 80)">
            {currentChars.slice(0, 11).map((item, i) => {
              const isSelected = i === selectedIndex;
              return (
                <g
                  key={i}
                  transform={`translate(${i * 42}, 0)`}
                  onClick={() => setSelectedIndex(i)}
                  className="cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <rect
                    x="0"
                    y="0"
                    width="36"
                    height="38"
                    rx="6"
                    fill={isSelected ? "#0284c7" : "#0f172a"}
                    stroke={isSelected ? "#38bdf8" : "#334155"}
                    strokeWidth={isSelected ? "2" : "1"}
                  />
                  <text
                    x="18"
                    y="24"
                    fill={isSelected ? "#ffffff" : "#f8fafc"}
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {item.char}
                  </text>
                  <text x="18" y="52" fill={isSelected ? "#38bdf8" : "#94a3b8"} fontSize="9" textAnchor="middle">
                    [{i}]
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Live Selected Character Inspector Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase">Selected Index</div>
          <div className="text-sky-400 text-sm font-bold mt-1">[{activeChar.index}]</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase">Character Literal</div>
          <div className="text-emerald-400 text-sm font-bold mt-1">'{activeChar.char}'</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase">ASCII / Unicode</div>
          <div className="text-amber-400 text-sm font-bold mt-1">{activeChar.ascii} ({activeChar.hex})</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase">Binary Byte</div>
          <div className="text-indigo-400 text-sm font-bold mt-1">{activeChar.binary}</div>
        </div>
      </div>
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Strings Basic & Core Concepts
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Introduction to Strings in Java and Real-Life Applications
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understanding the nature of String as an immutable reference class in <code className="text-sky-300 font-mono">java.lang</code>,
          0-based character indexing, memory mapping between Stack and Heap, and real-world system use cases.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📖</span> What is a String in Java? (Concept & Analogy)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-sky-400 text-base">Reference Data Type vs Primitive</h3>
            <p>
              In Java, beginner students often mistake <code className="text-amber-300 font-mono">String</code> for a primitive type like
              <code className="text-sky-300 font-mono"> int</code> or <code className="text-sky-300 font-mono">char</code>.
              However, <strong className="text-white">String is a Class</strong> belonging to the <code className="text-emerald-400 font-mono">java.lang</code> package.
            </p>
            <p>
              When Swadeep creates <code className="text-amber-300 font-mono">String s = "Barrackpore";</code>, variable <code className="text-sky-300 font-mono">s</code>
              does not contain the letters themselves. Instead, it holds an <em>object memory address</em> pointing to an instance on the Heap containing the character sequence.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-base">Classroom Analogy: The Student ID Card</h3>
            <p>
              Imagine our computer lab at Naihati. Each student (like Tuhina or Abhronila) has a student badge. The badge has their photo and name printed.
              If we want to create a new name tag, we don't erase the plastic badge; we print a fresh new badge.
            </p>
            <p>
              Similarly, Strings in Java are <strong className="text-white">immutable</strong>. Once constructed in memory, the contents of a String object can never be altered.
              Any string operation (like concatenation or case change) generates an entirely new String object!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section>
        <InteractiveStringAnatomy />
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>⚙️</span> Technical Breakdown: Primitive Char vs String Object
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase bg-slate-950/50">
                <th className="p-3">Feature</th>
                <th className="p-3">Primitive <code className="text-amber-300">char</code></th>
                <th className="p-3">Reference <code className="text-sky-300">java.lang.String</code></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3 font-semibold text-slate-200">Literal Delimiter</td>
                <td className="p-3 font-mono text-amber-300">'A' (Single quotes)</td>
                <td className="p-3 font-mono text-sky-300">"A" (Double quotes)</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3 font-semibold text-slate-200">Type Category</td>
                <td className="p-3">Primitive 16-bit integer type</td>
                <td className="p-3">Non-primitive Class (Reference object)</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3 font-semibold text-slate-200">Memory Footprint</td>
                <td className="p-3">Exactly 2 bytes on the Stack</td>
                <td className="p-3">Object overhead on Heap + reference on Stack</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3 font-semibold text-slate-200">Length Property/Method</td>
                <td className="p-3 text-slate-500">None (single unit)</td>
                <td className="p-3 font-mono text-emerald-400">str.length() (Method with parentheses)</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3 font-semibold text-slate-200">Nullability</td>
                <td className="p-3">Cannot be null (has default '\u0000')</td>
                <td className="p-3 font-mono text-rose-300">Can be null (throws NullPointerException if accessed)</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3 font-semibold text-slate-200">Package</td>
                <td className="p-3 text-slate-500">Built-in keyword</td>
                <td className="p-3 font-mono text-sky-400">java.lang.String (auto-imported)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Hands-on Code Example Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>💻</span> Hands-on Executable Java Program
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review and trace this compilable BlueJ Java class simulating real-life student records and input sanitization.
          </p>
        </div>

        <JavaFileLoader
          fileModule={demoCode}
          title="StringIntroductionDemo.java"
          highlightLines={[15, 26, 36, 44]}
        />
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & ICSE Board Traps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-rose-500/20">
            <h3 className="font-bold text-rose-400">Beginner Mistakes</h3>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
              <li>
                <strong className="text-white">Using array brackets:</strong> Writing <code className="text-rose-300 font-mono">char c = s[0];</code> instead of
                <code className="text-emerald-300 font-mono"> s.charAt(0);</code>. In Java, square brackets are only for arrays!
              </li>
              <li>
                <strong className="text-white">Confusing length syntax:</strong> Writing <code className="text-rose-300 font-mono">s.length</code> (without parentheses). Remember:
                Strings require <code className="text-emerald-300 font-mono">s.length()</code>.
              </li>
              <li>
                <strong className="text-white">Off-by-one Indexing:</strong> Trying to access index <code className="text-rose-300 font-mono">s.charAt(s.length())</code>.
                Since indices run from <code className="text-amber-300 font-mono">0</code> to <code className="text-amber-300 font-mono">length() - 1</code>, this triggers
                <code className="text-rose-400 font-mono"> StringIndexOutOfBoundsException</code>.
              </li>
            </ul>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-emerald-500/20">
            <h3 className="font-bold text-emerald-400">ICSE Board Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
              <li>
                <strong className="text-white">Always check bounds:</strong> In for loops, keep the loop test condition strictly as
                <code className="text-emerald-300 font-mono"> i &lt; s.length()</code> (or <code className="text-emerald-300 font-mono">i &lt;= s.length() - 1</code>).
              </li>
              <li>
                <strong className="text-white">Null check before operations:</strong> Always ensure the String reference is not <code className="text-amber-300 font-mono">null</code>
                before calling <code className="text-sky-300 font-mono">.length()</code> or <code className="text-sky-300 font-mono">.charAt()</code>.
              </li>
              <li>
                <strong className="text-white">Clean user inputs:</strong> In ICSE Section B programs reading Scanner strings, use <code className="text-emerald-300 font-mono">in.nextLine().trim()</code>
                to remove accidental leading/trailing spaces.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-sky-950/30 p-6 md:p-8 rounded-2xl border border-sky-800/50 shadow-lg">
        <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>💡</span> Think About This (ICSE Conceptual Reasoning)
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-sky-400 mt-1">•</span>
            <span>
              <strong className="text-white">Observe carefully:</strong> What happens when you do <code className="text-amber-300 font-mono">String s = "ICSE"; s = s + 2026;</code>?
              Is the string "ICSE" modified, or is a brand new object created on the Heap?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 mt-1">•</span>
            <span>
              <strong className="text-white">Try changing this:</strong> If Debangshu types <code className="text-amber-300 font-mono">String city = "";</code>,
              what will <code className="text-emerald-300 font-mono">city.length()</code> return? What will <code className="text-emerald-300 font-mono">city.charAt(0)</code> do?
            </span>
          </li>
        </ul>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Topic 0: String Fundamentals & ICSE Board Self-Assessment"
          questions={questions}
        />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_001 Topic 0: Introduction to Strings in Java"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_001_topic0_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note="Always remember for ICSE exams: String is a CLASS, not a primitive! When writing methods, remember length() has parentheses, but array length does not. Also, characters in strings start at index 0, so the last character is at length() - 1. Never write str[i] — BlueJ will flag it with an error immediately! Keep practicing with dry-run tables. — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic0;
