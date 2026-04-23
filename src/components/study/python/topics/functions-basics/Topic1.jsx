import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python example files (place these in topic1_files/ folder)
import functionDeclaration from "./topic1_files/function_declaration.py?raw";
import functionCalling from "./topic1_files/function_calling.py?raw";
import declarationBeforeCall from "./topic1_files/declaration_before_call.py?raw";

/**
 * Topic 1: Function Declaration vs Function Calling (Invocation)
 * 
 * This component explains:
 * - What is a function declaration? (defining the function)
 * - What is a function call? (executing the function)
 * - The difference between the two (definition vs execution)
 * - Why order matters: function must be declared before it can be called
 * - Calling a function multiple times
 */
export default function Topic1() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          📞 Function Declaration vs Function Calling (Invocation)
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            In Python (and most programming languages), there is a crucial difference between 
            <strong className="text-blue-300"> declaring a function</strong> (defining it) and 
            <strong className="text-green-300"> calling a function</strong> (invoking it). 
            Think of it like writing a recipe versus actually cooking the dish.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">Declaration (definition):</span> def cook_pasta(): <br />
              &nbsp;&nbsp;&nbsp;&nbsp;print("Boiling water...")<br /><br />
              <span className="text-green-300">Call (invocation):</span> cook_pasta()   # ← parentheses are the trigger!
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: DETAILED COMPARISON ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          🔍 Declaration vs Calling – The Key Differences
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Aspect</th>
                <th className="p-3 border border-gray-700">Function Declaration</th>
                <th className="p-3 border border-gray-700">Function Call (Invocation)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">What it does</td>
                <td className="p-3 border border-gray-700">Creates the function (stores it in memory)</td>
                <td className="p-3 border border-gray-700">Executes the code inside the function</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Syntax</td>
                <td className="p-3 border border-gray-700"><code className="bg-gray-700 px-1 rounded">def name(): ...</code></td>
                <td className="p-3 border border-gray-700"><code className="bg-gray-700 px-1 rounded">name()</code></td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">When it runs</td>
                <td className="p-3 border border-gray-700">At definition time (but body is NOT executed yet)</td>
                <td className="p-3 border border-gray-700">Only when explicitly called</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Can be called?</td>
                <td className="p-3 border border-gray-700">Yes, after declaration</td>
                <td className="p-3 border border-gray-700">N/A (it is the call)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-700 font-semibold">Result</td>
                <td className="p-3 border border-gray-700">No output (unless you print inside definition)</td>
                <td className="p-3 border border-gray-700">Executes function body – may produce output</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========== SECTION 3: ORDER MATTERS ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-red-500 pl-4">
          ⚠️ Order Matters: Declare Before You Call
        </h2>
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-5">
          <p className="text-gray-200">
            Python reads your code from top to bottom. If you try to call a function <strong>before</strong> it has been defined,
            Python will raise a <code className="bg-red-800 px-1 rounded">NameError: name 'function_name' is not defined</code>.
          </p>
          <pre className="mt-3 text-sm font-mono text-red-300 bg-gray-900 p-3 rounded overflow-x-auto">
{`# ❌ WRONG – calling before declaration
say_hello()   # NameError!

def say_hello():
    print("Hello")

# ✅ CORRECT – declaration first, then call
def say_hello():
    print("Hello")

say_hello()   # Works!`}
          </pre>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES (WITH PYTHON FILE LOADER) ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          💻 Live Python Examples
        </h2>

        {/* Example 1: Declaration only (no call) */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Declaration Only (function_declaration.py)</h3>
          <PythonFileLoader
            fileModule={functionDeclaration}
            title="function_declaration.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            This file only <strong>declares</strong> the function. Nothing is printed because we never call <code className="bg-gray-700 px-1 rounded">welcome()</code>.
          </p>
        </div>

        {/* Example 2: Calling the function */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Calling a Function (function_calling.py)</h3>
          <PythonFileLoader
            fileModule={functionCalling}
            title="function_calling.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Here we <strong>call</strong> the function <code className="bg-gray-700 px-1 rounded">welcome()</code> after its declaration. The print statement runs each time we call.
          </p>
        </div>

        {/* Example 3: Declaration before call – correct order */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Correct Order (declaration_before_call.py)</h3>
          <PythonFileLoader
            fileModule={declarationBeforeCall}
            title="declaration_before_call.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            This example shows the proper order: declaration first, then multiple calls. The function is defined only once but can be invoked many times.
          </p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS (PROFESSIONAL) ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Group declarations at the top:</strong> Many Python scripts put all function definitions at the beginning, then the main logic that calls them.</li>
          <li><strong className="text-purple-300">Use <code className="bg-gray-700 px-1 rounded">if __name__ == "__main__":</code></strong> to prevent functions from being called when the file is imported.</li>
          <li><strong className="text-purple-300">Calling without parentheses:</strong> <code>greet</code> (no parentheses) refers to the function object itself, not calling it. Beginners often forget the parentheses.</li>
          <li><strong className="text-purple-300">IDE shortcuts:</strong> In VS Code, Ctrl+Click on a function call jumps to its declaration – use this to trace code flow.</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Calling a function before it is defined</p>
            <p className="text-gray-300">Leads to <code>NameError</code>. Python reads top-down; the function must exist in memory when the call is encountered.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting parentheses when calling</p>
            <p className="text-gray-300"><code>welcome</code> (without parentheses) does nothing – it’s just a reference. You need <code>welcome()</code> to execute.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Defining a function inside a loop or conditionally</p>
            <p className="text-gray-300">While possible, it’s inefficient and confusing. Define functions at the top level unless you have a specific reason.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Thinking that a function runs automatically after declaration</p>
            <p className="text-gray-300">No – declaration only stores the function. You must call it explicitly.</p>
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
            <li>Always define all functions at the beginning of your script (or in a separate module).</li>
            <li>Use clear, action-oriented names so that calling the function reads like a sentence: <code>calculate_total()</code>, <code>print_report()</code>.</li>
            <li>Add a comment or docstring to every function explaining what it does.</li>
            <li>Call functions from the main part of your script, not from inside other function definitions (unless needed).</li>
            <li>Test each function with a few calls to ensure it behaves correctly.</li>
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
            <span className="text-green-400">✔️</span> Declaration = writing <code>def ...</code>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Calling = using <code>function_name()</code>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Declaration must come before calling
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Without parentheses, the function does not run
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> You can call a function as many times as you want
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Each call executes the entire function body
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> In <code>function_calling.py</code>, what happens if you move the function call <strong>above</strong> the <code>def</code> line?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Call the same function 10 times. Does the code inside the function run 10 times?</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why might a programmer want to define a function but never call it in the same file? (Hint: importing from another file)</p>
        </div>
      </section>

      {/* ========== SECTION 10: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher
          note={
            "Students often confuse defining a function with calling it. 🧑‍🏫 " +
            "Use the analogy of a 'TV remote' – the buttons are defined, but you press them (call) to make something happen. " +
            "Another analogy: a recipe book (declaration) vs actually cooking (calling). " +
            "Demonstrate the NameError by calling before definition – it’s a common mistake they will encounter. " +
            "Encourage them to always write a small test call after each function they write."
          }
        />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="500" height="220" viewBox="0 0 500 220" className="max-w-full h-auto">
            {/* Definition box */}
            <rect x="30" y="30" width="180" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="120" y="60" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def greet():</text>
            <text x="120" y="80" fill="#94a3b8" fontSize="12" textAnchor="middle">print("Hi")</text>
            <text x="120" y="100" fill="#6b7280" fontSize="11" textAnchor="middle">← Declaration</text>

            {/* Arrow */}
            <line x1="210" y1="70" x2="250" y2="70" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowYellow)" />
            <text x="230" y="60" fill="#fbbf24" fontSize="11">Then call</text>

            {/* Call box */}
            <rect x="260" y="30" width="180" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="350" y="60" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">greet()</text>
            <text x="350" y="80" fill="#94a3b8" fontSize="12" textAnchor="middle">print("Hi")</text>
            <text x="350" y="100" fill="#6b7280" fontSize="11" textAnchor="middle">← Execution</text>

            {/* Multiple calls indication */}
            <rect x="260" y="130" width="180" height="50" fill="#1f2937" stroke="#a78bfa" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="350" y="155" fill="#c4b5fd" fontSize="12" textAnchor="middle">greet() again → runs again</text>
            <text x="350" y="172" fill="#9ca3af" fontSize="11" textAnchor="middle">Multiple invocations</text>

            <defs>
              <marker id="arrowYellow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#fbbf24" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          Declaration (blue) defines the function. Calling (green) executes it. Each call runs the function body.
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