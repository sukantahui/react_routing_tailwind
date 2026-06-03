import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";

// Python example files (place in topic5_files/)
import defaultBasic from "./topic5_files/default_basic.py?raw";
import defaultMultiple from "./topic5_files/default_multiple.py?raw";
import defaultMutable from "./topic5_files/default_mutable.py?raw";
import defaultRealWorld from "./topic5_files/default_realworld.py?raw";

/**
 * Topic 5: Default Parameter Values and Their Usage
 * 
 * This component explains:
 * - What are default parameter values? (assigning a default in function definition)
 * - How to define them: `def func(param=default_value)`
 * - Why use default values: optional parameters, backward compatibility
 * - Rules: required parameters first, then defaults
 * - Important: Default values are evaluated once at definition time
 * - Mutable default values trap (lists, dicts)
 * - Best practices for using defaults safely
 */
export default function Topic5() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🎯 Default Parameter Values and Their Usage
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            A <strong className="text-blue-300">default parameter value</strong> is a value assigned to a parameter 
            in the function <strong>definition</strong>. If the caller does not provide an argument for that parameter, 
            the default value is used.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">def greet(name, greeting="Hello"):</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;{`print(f"{greeting}, {name}!")`}<br /><br />
              <span className="text-green-300">greet("Swadeep")</span>              → "Hello, Swadeep!"<br />
              <span className="text-green-300">greet("Tuhina", "Namaste")</span>    → "Namaste, Tuhina!"
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 Function Signature with Defaults
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`def function_name(required_param, default_param="default_value", another_default=42):
    """required_param MUST be provided; default_param is optional"""
    # function body
    pass`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Return type:</strong> Any type (depends on function). Default values do not change return type.</li>
            <li><strong>Purpose:</strong> Make functions flexible by allowing optional arguments.</li>
            <li><strong>When & why:</strong> When you want a sensible default behaviour that can be overridden (e.g., logging level, timeout, page size).</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 3: KEY RULES AND BEHAVIOR ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          ⚙️ Rules for Default Parameters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">1️⃣ Order rule</div>
            <p className="text-gray-300">All required (non‑default) parameters must come <strong>before</strong> any default parameters.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">✅ def f(a, b=1)<br/>❌ def f(a=1, b)</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="text-purple-300 text-xl mb-2">2️⃣ Evaluation time</div>
            <p className="text-gray-300">Default values are evaluated <strong>only once</strong> when the function is defined, not each call.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">import datetime<br/>def log(msg, when=datetime.now()): # fixed time!</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="text-green-300 text-xl mb-2">3️⃣ Override ability</div>
            <p className="text-gray-300">You can override a default by passing an argument (positional or keyword).</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def multiply(x, y=2): return x*y<br/>multiply(5)    → 10<br/>multiply(5, 3) → 15</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="text-red-300 text-xl mb-2">4️⃣ Mutable defaults danger</div>
            <p className="text-gray-300">Using mutable objects (list, dict) as defaults can cause unexpected sharing across calls.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def add_item(item, lst=[]): # dangerous!<br/>    lst.append(item)<br/>    return lst</pre>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Basic Default Parameters (default_basic.py)</h3>
          <PythonFileLoader fileModule={defaultBasic} title="default_basic.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Shows simple default values: greeting message, role, and discount percentage.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Multiple Defaults (default_multiple.py)</h3>
          <PythonFileLoader fileModule={defaultMultiple} title="default_multiple.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Demonstrates functions with several default parameters and how to override specific ones.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-red-300">3️⃣ Mutable Default Trap (default_mutable.py)</h3>
          <PythonFileLoader fileModule={defaultMutable} title="default_mutable.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">⚠️ Classic gotcha: default list/dict persists across calls. Includes safe pattern using <code>None</code>.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World Example (default_realworld.py)</h3>
          <PythonFileLoader fileModule={defaultRealWorld} title="default_realworld.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Simulates an API client with configurable timeout, retries, and logging.</p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Use <code>None</code> as a sentinel</strong> for mutable defaults: <code>def add_item(item, basket=None): if basket is None: basket = []</code>.</li>
          <li><strong className="text-purple-300">Default values can be any expression</strong> (function calls, attributes) but remember they evaluate at definition time.</li>
          <li><strong className="text-purple-300">Use keyword arguments when calling</strong> to skip some defaults while overriding others: <code>func(required, override2=value)</code>.</li>
          <li><strong className="text-purple-300">Leverage defaults for backward compatibility</strong> – adding a new parameter with a default won't break existing code.</li>
          <li><strong className="text-purple-300">Document default values clearly</strong> in the docstring so users know what to expect.</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Mutable default arguments (list/dict)</p>
            <p className="text-gray-300">The same list is reused across calls, leading to surprising accumulation. Use <code>None</code> and create a new mutable inside.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Defaults that depend on other parameters</p>
            <p className="text-gray-300"><code>def f(a, b=a)</code> – not allowed because <code>a</code> doesn't exist in scope yet.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting that defaults are evaluated once</p>
            <p className="text-gray-300">Using <code>datetime.now()</code> as default gives the definition time, not the call time. Use <code>None</code> and set inside.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Overriding defaults with positional arguments incorrectly</p>
            <p className="text-gray-300">If you want to skip a default, you must use keyword arguments for later parameters.</p>
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
            <li>Place required parameters first, optional (default) parameters after.</li>
            <li>Avoid mutable default values; use <code>None</code> and create the mutable inside the function.</li>
            <li>Choose default values that are sensible and safe (e.g., empty strings, 0, False, None).</li>
            <li>Document default values in the docstring: <code>"""... :param retry: number of retries (default 3)"""</code>.</li>
            <li>Use keyword arguments when calling functions with many defaults to avoid confusion.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 8: MINI CHECKLIST ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📋 <span>Mini Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Defaults go after required params</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Defaults evaluated at definition time</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Mutable defaults = 🚨 use None instead</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Override defaults with positional/keyword args</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Useful for optional parameters</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Document default values clearly</div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> In <code>default_mutable.py</code>, why does the list keep growing across calls? How does using <code>None</code> fix it?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Change a default value to <code>datetime.now()</code> and call the function multiple times. Does the timestamp change?</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> When would you want a default value that is a function call? (e.g., caching, connection pools).</p>
        </div>
      </section>

      {/* ========== SECTION 10: FAQ ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.85s" }}>
        <FAQTemplate title="Default Parameter Values FAQs" questions={questions} />
      </section>

      {/* ========== SECTION 11: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher note={
          "The mutable default trap is one of Python's most famous 'gotchas'. 🧑‍🏫 " +
          "Show students that the default value is stored in the function object's `__defaults__` attribute. " +
          "Demonstrate with `func.__defaults__` before and after calls. " +
          "Use the analogy of a shared whiteboard vs a fresh sheet of paper. " +
          "Encourage them to always use `None` for any default that might be mutated. " +
          "Also point out that this behavior is by design (performance, closure semantics) but surprising to newcomers."
        } />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="520" height="220" viewBox="0 0 520 220" className="max-w-full h-auto">
            <rect x="30" y="20" width="200" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="130" y="50" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def connect(timeout=5):</text>
            <text x="130" y="70" fill="#94a3b8" fontSize="12" textAnchor="middle">{`print(f"Timeout: {timeout}")`}</text>
            <text x="130" y="90" fill="#fbbf24" fontSize="11" textAnchor="middle">default value = 5</text>

            <line x1="230" y1="60" x2="280" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />
            <text x="255" y="50" fill="#c4b5fd" fontSize="11">call</text>

            <rect x="290" y="20" width="200" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="390" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">connect()</text>
            <text x="390" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">uses default 5</text>
            <text x="390" y="85" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">connect(10)</text>
            <text x="390" y="105" fill="#fbbf24" fontSize="11" textAnchor="middle">overrides to 10</text>

            <rect x="30" y="130" width="460" height="60" fill="#1f2937" stroke="#ef4444" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="260" y="155" fill="#fca5a5" fontSize="12" textAnchor="middle">⚠️ Mutable default: def add(item, basket=[])</text>
            <text x="260" y="175" fill="#9ca3af" fontSize="11" textAnchor="middle">→ same list reused across calls → unexpected accumulation</text>

            <defs><marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" /></marker></defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Default values (blue) are used when no argument is provided; can be overridden (green). Avoid mutable defaults (red).</p>
      </section>

      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .reveal-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-fade-up { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}