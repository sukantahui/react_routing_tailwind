import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python example files (place these in topic0_files/ folder)
import helloFunctionDef from "./topic0_files/hello_function.py?raw";
import callHelloFunction from "./topic0_files/call_function.py?raw";
import reusableGreeting from "./topic0_files/reusable_greeting.py?raw";

/**
 * Topic 0: Introduction to Functions – Definition, Syntax, and Purpose
 * 
 * This component explains:
 * - What is a function? (Reusable block of code)
 * - Why do we need functions? (DRY, modularity, readability)
 * - Python function syntax: `def function_name():` followed by indented body
 * - How to call a function: `function_name()`
 * 
 * No prior knowledge of parameters, return values, or advanced scoping is assumed.
 * Only the most fundamental concepts are covered.
 */
export default function Topic0() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          📘 Introduction to Functions
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            In programming, a <strong className="text-blue-300">function</strong> is like a mini‑program inside your main program.
            It’s a reusable block of code that performs a specific task. Think of it as a <em>recipe</em> – you write it once,
            and then you can “use” it (call it) as many times as you need.
          </p>
          <p className="leading-relaxed">
            Functions help you avoid repeating the same code over and over. They make your code <strong>cleaner</strong>,
            <strong>easier to read</strong>, and <strong>simpler to debug</strong>. Almost every real‑world Python program uses functions.
          </p>
        </div>
      </section>

      {/* ========== SECTION 2: SYNTAX (PROTOTYPE / SIGNATURE) ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-blue-500 pl-4">
          🔧 Function Syntax (Definition)
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`def function_name():
    # body of the function
    # (indented code block)
    print("Hello from function!")`}
          </pre>
          <p className="mt-4 text-gray-300">
            <strong className="text-yellow-300">def</strong> → keyword that tells Python “I am defining a function”.<br />
            <strong className="text-yellow-300">function_name</strong> → follows the same naming rules as variables (letters, numbers, underscore, cannot start with number).<br />
            <strong className="text-yellow-300">()</strong> → parentheses (we will put parameters here later).<br />
            <strong className="text-yellow-300">:</strong> → colon marks the start of the function body.<br />
            <strong className="text-yellow-300">Indentation</strong> → all code inside the function must be indented (usually 4 spaces).
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-5 mt-4">
          <h3 className="text-xl font-medium text-purple-300">Calling a Function</h3>
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto mt-2">
{`function_name()   # this executes the function`}
          </pre>
          <p className="mt-2 text-gray-300">
            When you call a function, Python jumps into the function body, runs every indented line,
            and then returns to the point where you called it.
          </p>
        </div>
      </section>

      {/* ========== SECTION 3: PURPOSE & REAL-WORLD USE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          🎯 Why Use Functions? (Purpose)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/70 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-3xl mb-2">♻️</div>
            <h3 className="text-xl font-semibold text-green-300">Reusability (DRY)</h3>
            <p className="text-gray-300">Write once, use many times. Avoid copy‑paste errors.</p>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-xl font-semibold text-green-300">Modularity</h3>
            <p className="text-gray-300">Break large programs into small, manageable pieces.</p>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-3xl mb-2">🐛</div>
            <h3 className="text-xl font-semibold text-green-300">Easier Debugging</h3>
            <p className="text-gray-300">Fix a bug in one place; it’s fixed everywhere the function is used.</p>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-green-300">Team Collaboration</h3>
            <p className="text-gray-300">Different people can work on different functions simultaneously.</p>
          </div>
        </div>
        <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-5">
          <p className="italic text-gray-200">
            <span className="font-bold text-blue-300">Real‑world analogy:</span> A school canteen has a “make_burger” function.
            Every time a student orders, the cook follows the same recipe (function body).
            If the recipe improves, all future burgers improve automatically.
          </p>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES (WITH PYTHON FILE LOADER) ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          💻 Live Python Examples
        </h2>

        {/* Example 1: Defining a simple function */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Defining a function (hello_function.py)</h3>
          <PythonFileLoader
            fileModule={helloFunctionDef}
            title="hello_function.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            This file <strong>defines</strong> a function named <code className="bg-gray-700 px-1 rounded">greet()</code>.
            Nothing is printed until the function is <strong>called</strong>.
          </p>
        </div>

        {/* Example 2: Calling the function */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Calling the function (call_function.py)</h3>
          <PythonFileLoader
            fileModule={callHelloFunction}
            title="call_function.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Here we <strong>call</strong> <code className="bg-gray-700 px-1 rounded">greet()</code> three times.
            Each call executes the same code block.
          </p>
        </div>

        {/* Example 3: Reusability in action */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Reusing a function (reusable_greeting.py)</h3>
          <PythonFileLoader
            fileModule={reusableGreeting}
            title="reusable_greeting.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Functions can be called from anywhere in your program. This example greets different students
            (Swadeep, Tuhina, Abhronila) using the same function.
          </p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS (PROFESSIONAL) ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Naming convention:</strong> Use lowercase with underscores (snake_case) for function names, e.g., <code>calculate_average</code>.</li>
          <li><strong className="text-purple-300">Verb first:</strong> Start function names with an action verb: <code>get_data()</code>, <code>print_report()</code>, <code>validate_input()</code>.</li>
          <li><strong className="text-purple-300">Single responsibility:</strong> A function should do one thing and do it well. If you find yourself writing “and” in the name, split it.</li>
          <li><strong className="text-purple-300">Docstrings:</strong> Always write a short description inside triple quotes right after the definition – it helps others (and your future self).</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS (BEGINNER MISTAKES) ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting the colon (:) after function definition</p>
            <p className="text-gray-300">Python will throw a <code>SyntaxError</code>. Always add <code>:</code> at the end of <code>def ...()</code>.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Incorrect indentation</p>
            <p className="text-gray-300">Mixing tabs and spaces or forgetting to indent the function body causes <code>IndentationError</code>.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Defining a function but never calling it</p>
            <p className="text-gray-300">The code inside will never run. Many beginners forget the actual function call.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Using reserved keywords as function names</p>
            <p className="text-gray-300">Names like <code>def</code>, <code>if</code>, <code>else</code> are illegal. Stick to descriptive names.</p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: BEST PRACTICES ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.6s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ✅ <span>Best Practices</span>
        </h2>
        <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-5">
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Keep functions short – ideally less than 20 lines.</li>
            <li>Use meaningful names that describe what the function does.</li>
            <li>Add a docstring immediately after the function definition.</li>
            <li>Don’t use global variables inside functions (we’ll cover this later).</li>
            <li>Test each function separately before integrating into the whole program.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 8: MINI CHECKLIST ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📋 <span>Mini Checklist (What Students Must Remember)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Functions are defined with <code>def</code>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Followed by name, parentheses, colon
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Body must be indented
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Call function by its name plus parentheses
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Functions promote code reuse
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> A function must be defined before it is called
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> What happens if you call a function <strong>before</strong> its definition? Try swapping the order in <code>call_function.py</code>.</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Modify <code>greet()</code> to print a different message. How many places do you need to change if you want to update the greeting?</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why is it better to write a function once and call it many times instead of copying the same print statement everywhere?</p>
        </div>
      </section>

      {/* ========== SECTION 10: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher
          note={
            "Functions are the building blocks of modular programming. 🧱 " +
            "Emphasise to students that indentation is not just for style – it’s the syntax! " +
            "Use the analogy of a 'recipe book' – each recipe is a function. " +
            "Point out that even `print()` and `input()` are functions (built-in). " +
            "Encourage them to write tiny functions early, even for trivial tasks, to build muscle memory."
          }
        />
      </section>

      {/* ========== SVG ILLUSTRATION (FUNCTION MACHINE) ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="400" height="200" viewBox="0 0 400 200" className="max-w-full h-auto">
            <rect x="50" y="50" width="100" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="100" y="95" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">def</text>
            <text x="100" y="115" fill="#94a3b8" fontSize="12" textAnchor="middle">function</text>

            {/* Arrow left (input) */}
            <line x1="30" y1="90" x2="48" y2="90" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowYellow)" />
            <text x="15" y="80" fill="#fbbf24" fontSize="12">Input</text>

            {/* Arrow right (output) */}
            <line x1="152" y1="90" x2="170" y2="90" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowGreen)" />
            <text x="178" y="80" fill="#34d399" fontSize="12">Output</text>

            {/* Dashed box around "process" */}
            <rect x="190" y="30" width="180" height="120" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="5,5" />
            <text x="280" y="55" fill="#c4b5fd" fontSize="12" textAnchor="middle">Processing (reusable)</text>

            <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />

            <defs>
              <marker id="arrowYellow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#fbbf24" />
              </marker>
              <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#34d399" />
              </marker>
            </defs>

            <text x="280" y="100" fill="#9ca3af" fontSize="11" textAnchor="middle">• No repetition</text>
            <text x="280" y="120" fill="#9ca3af" fontSize="11" textAnchor="middle">• Easy to update</text>
            <text x="280" y="140" fill="#9ca3af" fontSize="11" textAnchor="middle">• Reuse anywhere</text>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          A function takes <span className="text-yellow-300">input</span> (later with parameters), performs a task, and optionally returns <span className="text-emerald-300">output</span>.
        </p>
      </section>

      {/* ========== INLINE KEYFRAMES FOR REVEAL ANIMATIONS ========== */}
      <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .reveal-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
          opacity: 0; /* start invisible, becomes visible at end */
          animation-fill-mode: forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-fade-up {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}