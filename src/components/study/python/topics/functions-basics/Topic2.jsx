import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python example files (place these in topic2_files/ folder)
import builtinFunctions from "./topic2_files/builtin_functions.py?raw";
import userDefinedFunctions from "./topic2_files/user_defined_functions.py?raw";
import mixBuiltinUser from "./topic2_files/mix_builtin_user.py?raw";

/**
 * Topic 2: Types of Functions – Built-in vs User-defined Functions
 * 
 * This component explains:
 * - What are built-in functions? (provided by Python)
 * - What are user-defined functions? (created by programmers)
 * - Differences: availability, flexibility, naming, reusability
 * - Common built-in functions: print(), len(), type(), input(), range(), etc.
 * - When to use each type
 */
export default function Topic2() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          📚 Types of Functions: Built‑in vs User‑defined
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            In Python, functions come in two main flavors: <strong className="text-blue-300">built‑in functions</strong> 
            that are always available, and <strong className="text-green-300">user‑defined functions</strong> 
            that you write yourself to solve specific problems.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">Built‑in:</span> print(), len(), input(), type(), range(), sum(), max(), min() …<br />
              <span className="text-green-300">User‑defined:</span> def calculate_average(): ...   def greet_student(): ...
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: DETAILED COMPARISON ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          🔍 Built‑in vs User‑defined – Key Differences
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Aspect</th>
                <th className="p-3 border border-gray-700">Built‑in Functions</th>
                <th className="p-3 border border-gray-700">User‑defined Functions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Who creates them?</td>
                <td className="p-3 border border-gray-700">Python developers (Guido van Rossum & team)</td>
                <td className="p-3 border border-gray-700">You (the programmer)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Availability</td>
                <td className="p-3 border border-gray-700">Always available – no need to define</td>
                <td className="p-3 border border-gray-700">Only available after you define them</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Customization</td>
                <td className="p-3 border border-gray-700">Fixed behavior (you cannot change how print() works)</td>
                <td className="p-3 border border-gray-700">Fully customizable – you decide what it does</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Naming freedom</td>
                <td className="p-3 border border-gray-700">Fixed names (print, len, etc.) – you cannot override them easily</td>
                <td className="p-3 border border-gray-700">You choose the name (must follow naming rules)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Examples</td>
                <td className="p-3 border border-gray-700">print(), len(), type(), input(), range(), sum(), max(), min(), abs(), round()</td>
                <td className="p-3 border border-gray-700">calculate_gpa(), send_email(), validate_password(), etc.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========== SECTION 3: COMMON BUILT-IN FUNCTIONS (WITH USE CASES) ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          🛠️ Most Useful Built‑in Functions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <code className="text-yellow-300 text-lg">print()</code>
            <p className="text-gray-300 text-sm mt-1">Displays output to the console.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">print("Hello")</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <code className="text-yellow-300 text-lg">len()</code>
            <p className="text-gray-300 text-sm mt-1">Returns the number of items in a sequence.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">len("Python") → 6</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <code className="text-yellow-300 text-lg">type()</code>
            <p className="text-gray-300 text-sm mt-1">Returns the data type of an object.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">type(42) → &lt;class 'int'&gt;</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <code className="text-yellow-300 text-lg">input()</code>
            <p className="text-gray-300 text-sm mt-1">Reads a line from user input.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">name = input("Name: ")</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <code className="text-yellow-300 text-lg">range()</code>
            <p className="text-gray-300 text-sm mt-1">Generates a sequence of numbers.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">list(range(3)) → [0,1,2]</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <code className="text-yellow-300 text-lg">sum()</code>
            <p className="text-gray-300 text-sm mt-1">Adds up all items in an iterable.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">sum([1,2,3]) → 6</pre>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES (WITH PYTHON FILE LOADER) ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        {/* Example 1: Using built-in functions */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Built‑in Functions in Action (builtin_functions.py)</h3>
          <PythonFileLoader
            fileModule={builtinFunctions}
            title="builtin_functions.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            This script demonstrates common built‑in functions like <code>print()</code>, <code>len()</code>, <code>type()</code>, <code>input()</code>, and <code>range()</code>.
          </p>
        </div>

        {/* Example 2: User-defined functions */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Creating Your Own Functions (user_defined_functions.py)</h3>
          <PythonFileLoader
            fileModule={userDefinedFunctions}
            title="user_defined_functions.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Here we define three custom functions: <code>greet()</code>, <code>calculate_area()</code>, and <code>is_even()</code>. Each solves a specific task.
          </p>
        </div>

        {/* Example 3: Mixing built-in and user-defined */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Built‑in + User‑defined Together (mix_builtin_user.py)</h3>
          <PythonFileLoader
            fileModule={mixBuiltinUser}
            title="mix_builtin_user.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Real programs use both: built‑in functions handle common tasks (printing, user input), while user‑defined functions implement custom logic.
          </p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS (PROFESSIONAL) ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Explore the docs:</strong> Python has over 70 built‑in functions. Bookmark <code>docs.python.org/3/library/functions.html</code>.</li>
          <li><strong className="text-purple-300">Don’t reinvent the wheel:</strong> Before writing a function, check if a built‑in or standard library function already does it (e.g., <code>math.sqrt()</code> for square roots).</li>
          <li><strong className="text-purple-300">Shadowing danger:</strong> Avoid naming your variables/functions like built‑ins (e.g., <code>print = 5</code>). That breaks <code>print()</code>.</li>
          <li><strong className="text-purple-300">Use <code>help()</code>:</strong> In the Python interactive shell, <code>help(print)</code> shows documentation for any built‑in function.</li>
          <li><strong className="text-purple-300">Leverage built‑ins for performance:</strong> Built‑ins are implemented in C and are much faster than equivalent pure Python loops.</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Overwriting built‑in function names</p>
            <p className="text-gray-300"><code>len = 10</code> then later <code>len("hello")</code> → TypeError. Use different names.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting to define a user‑defined function before using it</p>
            <p className="text-gray-300">Calls to custom functions must come after the <code>def</code> block.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Using built‑in functions incorrectly (wrong arguments)</p>
            <p className="text-gray-300"><code>len(42)</code> → TypeError because <code>len()</code> expects a sequence.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Thinking that user‑defined functions are slower than built‑ins</p>
            <p className="text-gray-300">They are slower, but for most tasks it doesn’t matter. Clarity first.</p>
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
            <li>Prefer built‑in functions when they meet your needs – they are tested, fast, and familiar.</li>
            <li>Write user‑defined functions to encapsulate repeated logic or to make complex code readable.</li>
            <li>Never use built‑in names as variable names (e.g., avoid <code>list</code>, <code>dict</code>, <code>str</code>, <code>print</code>).</li>
            <li>Document your user‑defined functions with docstrings (triple quotes) explaining what they do.</li>
            <li>Start each function with a verb to clarify action (e.g., <code>get_average()</code>, <code>display_menu()</code>).</li>
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
            <span className="text-green-400">✔️</span> Built‑ins are ready to use (print, len, input)
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> User‑defined need <code>def</code> and a name
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Built‑ins cannot be changed; user‑defined are flexible
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Do NOT name variables like built‑in functions
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Use <code>help()</code> to learn about any built‑in
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Most programs mix both types
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> What happens if you type <code>print = "hello"</code> and then try <code>print("world")</code>? Try it.</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> In <code>mix_builtin_user.py</code>, replace <code>len()</code> with your own <code>def my_len(seq):</code> that counts manually. Compare the effort.</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why do you think Python provides so many built‑ins? What would programming be like without them?</p>
        </div>
      </section>

      {/* ========== SECTION 10: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher
          note={
            "Students often underestimate built‑ins. 🧑‍🏫 " +
            "Challenge them: 'Write a program that finds the largest of three numbers without using max().' " +
            "Then show the built‑in max(). They’ll appreciate the convenience. " +
            "Also highlight the danger of shadowing: accidentally using 'list' as a variable name breaks later code. " +
            "Encourage exploring the official docs – it's a skill that separates novices from pros."
          }
        />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="520" height="200" viewBox="0 0 520 200" className="max-w-full h-auto">
            {/* Built-in box */}
            <rect x="30" y="30" width="200" height="140" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="130" y="55" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Built‑in Functions</text>
            <text x="130" y="80" fill="#94a3b8" fontSize="12" textAnchor="middle">print()</text>
            <text x="130" y="100" fill="#94a3b8" fontSize="12" textAnchor="middle">len()</text>
            <text x="130" y="120" fill="#94a3b8" fontSize="12" textAnchor="middle">input()</text>
            <text x="130" y="140" fill="#94a3b8" fontSize="12" textAnchor="middle">range()</text>
            <text x="130" y="160" fill="#6b7280" fontSize="11" textAnchor="middle">+ many more</text>

            {/* Arrow between */}
            <line x1="230" y1="100" x2="280" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowYellow)" />
            <text x="255" y="90" fill="#fbbf24" fontSize="11">Mix</text>
            <text x="255" y="115" fill="#fbbf24" fontSize="11">together</text>

            {/* User-defined box */}
            <rect x="290" y="30" width="200" height="140" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="390" y="55" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">User‑defined</text>
            <text x="390" y="80" fill="#94a3b8" fontSize="12" textAnchor="middle">def greet():</text>
            <text x="390" y="100" fill="#94a3b8" fontSize="12" textAnchor="middle">def calc_area():</text>
            <text x="390" y="120" fill="#94a3b8" fontSize="12" textAnchor="middle">def is_even():</text>
            <text x="390" y="140" fill="#94a3b8" fontSize="12" textAnchor="middle">def validate():</text>
            <text x="390" y="160" fill="#6b7280" fontSize="11" textAnchor="middle">you create them</text>

            <defs>
              <marker id="arrowYellow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#fbbf24" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          Built‑ins are ready to use; user‑defined functions are written by you for custom tasks.
        </p>
      </section>

      {/* ========== INLINE KEYFRAMES ========== */}
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
          opacity: 0;
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