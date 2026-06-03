import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python example files (place these in topic3_files/ folder)
import parametersDemo from "./topic3_files/parameters_demo.py?raw";
import argumentsDemo from "./topic3_files/arguments_demo.py?raw";
import paramVsArg from "./topic3_files/param_vs_arg.py?raw";

/**
 * Topic 3: Parameters and Arguments – Meaning and Differences
 * 
 * This component explains:
 * - What are parameters? (variables in function definition)
 * - What are arguments? (actual values passed during call)
 * - Difference between parameters and arguments
 * - Why parameters make functions flexible
 * - How to define functions with parameters
 * - How to pass arguments when calling
 */
export default function Topic3() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          📦 Parameters and Arguments: Meaning and Differences
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            Functions become truly powerful when they can work with <strong className="text-blue-300">different data</strong> each time they are called. 
            This is achieved using <strong className="text-yellow-300">parameters</strong> and <strong className="text-green-300">arguments</strong>.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">Parameter (definition):</span> def greet(<span className="text-green-300">name</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;print(f"Hello, {<span className="text-green-300">name</span>}")<br /><br />
              <span className="text-green-300">Argument (call):</span> greet(<span className="text-yellow-300">"Swadeep"</span>)<br />
              <span className="text-gray-400">// "Swadeep" is the argument passed to parameter 'name'</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: DETAILED COMPARISON ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          🔍 Parameter vs Argument – Key Differences
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Aspect</th>
                <th className="p-3 border border-gray-700">Parameter</th>
                <th className="p-3 border border-gray-700">Argument</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">What is it?</td>
                <td className="p-3 border border-gray-700">Variable name in function <strong>definition</strong></td>
                <td className="p-3 border border-gray-700">Actual value passed during <strong>call</strong></td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Where does it appear?</td>
                <td className="p-3 border border-gray-700">Inside parentheses after <code>def</code></td>
                <td className="p-3 border border-gray-700">Inside parentheses when calling the function</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">When is it used?</td>
                <td className="p-3 border border-gray-700">During function definition</td>
                <td className="p-3 border border-gray-700">During function invocation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Can it change per call?</td>
                <td className="p-3 border border-gray-700">No – fixed name in definition</td>
                <td className="p-3 border border-gray-700">Yes – different value each call</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 border border-gray-700 font-semibold">Example</td>
                <td className="p-3 border border-gray-700"><code>name</code> in <code>def greet(name):</code></td>
                <td className="p-3 border border-gray-700"><code>"Swadeep"</code> in <code>greet("Swadeep")</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4">
          <p className="text-center text-gray-200">
            🧠 <strong>Simple memory trick:</strong> <span className="text-yellow-300">Parameter</span> = <strong>P</strong>laceholder (in definition)<br />
            <span className="text-green-300">Argument</span> = <strong>A</strong>ctual value (in call)
          </p>
        </div>
      </section>

      {/* ========== SECTION 3: FUNCTION PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          📝 Function Signature (Prototype)
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`def function_name(parameter1, parameter2, ...):
    """Docstring explaining parameters"""
    # function body
    return result`}
          </pre>
          <div className="mt-4 space-y-2 text-gray-300">
            <p><strong className="text-yellow-300">Return type:</strong> By default, a function returns <code>None</code> if no <code>return</code> statement. Can return any type.</p>
            <p><strong className="text-yellow-300">Purpose of parameters:</strong> To receive input data so the function can work with different values.</p>
            <p><strong className="text-yellow-300">When & why used:</strong> When you need a function to produce different outputs based on varying inputs (e.g., greeting different people, calculating with different numbers).</p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        {/* Example 1: Parameters in action */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Defining Functions with Parameters (parameters_demo.py)</h3>
          <PythonFileLoader
            fileModule={parametersDemo}
            title="parameters_demo.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            This file shows how parameters are defined inside the parentheses. Notice the parameters <code>student_name</code>, <code>math_score</code>, and <code>science_score</code>.
          </p>
        </div>

        {/* Example 2: Passing arguments */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Passing Arguments (arguments_demo.py)</h3>
          <PythonFileLoader
            fileModule={argumentsDemo}
            title="arguments_demo.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Here we call the same function multiple times with different arguments. The output changes based on the arguments passed.
          </p>
        </div>

        {/* Example 3: Parameter vs Argument comparison */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Parameter vs Argument Side‑by‑Side (param_vs_arg.py)</h3>
          <PythonFileLoader
            fileModule={paramVsArg}
            title="param_vs_arg.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            This script clearly labels parameters (in the definition) and arguments (in the calls) so you can see the difference.
          </p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Use descriptive parameter names:</strong> <code>def calculate_area(length, width):</code> is better than <code>def calc(a, b):</code>.</li>
          <li><strong className="text-purple-300">Parameter order matters:</strong> Arguments are assigned to parameters in the order you pass them (positional).</li>
          <li><strong className="text-purple-300">You can have zero parameters:</strong> <code>def say_hello():</code> is perfectly valid.</li>
          <li><strong className="text-purple-300">Default values:</strong> We’ll cover later, but you can give parameters default values like <code>def greet(name="Guest"):</code>.</li>
          <li><strong className="text-purple-300">Document parameters in docstring:</strong> Use triple quotes and describe each parameter – it helps other developers (and your future self).</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Wrong number of arguments</p>
            <p className="text-gray-300">If a function expects 2 parameters and you pass 3 arguments (or 1), Python raises <code>TypeError: missing required positional argument</code>.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Confusing parameter names with argument values</p>
            <p className="text-gray-300">Beginners sometimes think the parameter name must match a variable name outside. They are independent: <code>def show(x):</code> can be called with <code>show(student_age)</code>.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Using mutable default arguments (advanced but common mistake)</p>
            <p className="text-gray-300">We’ll cover later, but be aware: <code>def append_to_list(item, lst=[]):</code> can cause unexpected behavior.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting that parameters are local variables</p>
            <p className="text-gray-300">You cannot access a parameter outside the function. It only exists inside the function body.</p>
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
            <li>Keep the number of parameters small (3–4 is usually fine; more suggests the function does too much).</li>
            <li>Use meaningful, self‑explanatory parameter names.</li>
            <li>Add a docstring that explains what each parameter is for.</li>
            <li>Order parameters from most important to least important.</li>
            <li>If a function needs many parameters, consider passing a single dictionary or object (advanced).</li>
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
            <span className="text-green-400">✔️</span> Parameters are in function <strong>definition</strong>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Arguments are in function <strong>call</strong>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Number of arguments must match number of parameters (for now)
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Order of arguments = order of parameters
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Parameters act as local variables inside the function
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Using parameters makes functions flexible and reusable
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> In <code>parameters_demo.py</code>, what happens if you change the order of parameters in the definition? Do you also need to change the order of arguments when calling?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Modify <code>greet_student</code> to accept two parameters: <code>first_name</code> and <code>last_name</code>. Then call it with your own name.</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why is it useful to have parameters instead of hard‑coding values inside the function? Can you think of a real‑world example where a function without parameters would be useless?</p>
        </div>
      </section>

      {/* ========== SECTION 10: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher
          note={
            "This is where functions become truly dynamic! 🧑‍🏫 " +
            "I like to use an analogy: a parameter is like a 'hole' in a stamp – the shape is fixed, but you can press it onto different colors of ink (arguments). " +
            "Another analogy: a coffee machine has slots for water, coffee beans, and milk (parameters). You put in actual water, beans, milk (arguments) to get a specific coffee. " +
            "Emphasise that the parameter name is just a placeholder; the argument can be a literal, variable, or even expression. " +
            "Demonstrate the TypeError when argument count mismatches – it's a very common error students will encounter."
          }
        />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="550" height="220" viewBox="0 0 550 220" className="max-w-full h-auto">
            {/* Definition box (Parameters) */}
            <rect x="20" y="20" width="240" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="140" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def greet(<tspan fill="#fbbf24">name</tspan>):</text>
            <text x="140" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">print(f"Hello, {<tspan fill="#fbbf24">name</tspan>}")</text>
            <text x="140" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">← Parameter (placeholder)</text>

            {/* Arrow */}
            <line x1="260" y1="60" x2="300" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" strokeDasharray="4,2" />
            <text x="280" y="50" fill="#c4b5fd" fontSize="11">call with</text>

            {/* Call box (Arguments) */}
            <rect x="310" y="20" width="220" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="420" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">greet(<tspan fill="#fbbf24">"Swadeep"</tspan>)</text>
            <text x="420" y="65" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">greet(<tspan fill="#fbbf24">"Tuhina"</tspan>)</text>
            <text x="420" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">← Arguments (actual values)</text>

            {/* Multiple call indication */}
            <rect x="310" y="120" width="220" height="60" fill="#1f2937" stroke="#a78bfa" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="420" y="145" fill="#c4b5fd" fontSize="12" textAnchor="middle">Each call → different output</text>
            <text x="420" y="165" fill="#9ca3af" fontSize="11" textAnchor="middle">Same function, different arguments</text>

            <defs>
              <marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          Parameters (blue) are placeholders in the definition; arguments (green) are the actual values passed when calling.
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