import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python example files (place these in topic4_files/ folder)
import positionalArgs from "./topic4_files/positional_args.py?raw";
import keywordArgs from "./topic4_files/keyword_args.py?raw";
import defaultArgs from "./topic4_files/default_args.py?raw";

/**
 * Topic 4: Types of Arguments – Positional, Keyword, Default, and Required
 * 
 * This component explains:
 * - Positional arguments: order matters, matched by position
 * - Keyword arguments: passed with parameter name, order doesn't matter
 * - Default arguments: parameters with predefined values
 * - Required arguments: parameters without default values (must be provided)
 * - Mixing argument types (rules: positional first, then keyword)
 */
export default function Topic4() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🔢 Types of Arguments: Positional, Keyword, Default, Required
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            Python offers <strong className="text-blue-300">four ways</strong> to pass arguments to functions. 
            Understanding these makes your code more flexible and readable.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">def student_profile(name, age=18, city="Barrackpore"):</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;{`print(f"{name}, {age}, from {city}")`}<br /><br />
              <span className="text-green-300">student_profile("Swadeep", city="Ichapur", age=17)</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: DETAILED EXPLANATION OF EACH TYPE ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          🎯 The Four Argument Types
        </h2>

        {/* Positional Arguments */}
        <div className="bg-gray-800/50 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-yellow-300">1️⃣ Positional Arguments</h3>
          <p className="text-gray-300 mt-2">Arguments are assigned to parameters <strong>in the same order</strong> they appear in the function definition.</p>
          <pre className="mt-3 text-sm font-mono text-emerald-300 bg-gray-900 p-3 rounded overflow-x-auto">
{`def introduce(name, age, city):
    print(f"{name}, {age}, from {city}")

# Order matters: "Tuhina" → name, 16 → age, "Shyamnagar" → city
introduce("Tuhina", 16, "Shyamnagar")`}
          </pre>
          <p className="text-gray-400 text-sm mt-2">✅ Most common way. Simple and straightforward.</p>
        </div>

        {/* Keyword Arguments */}
        <div className="bg-gray-800/50 rounded-xl p-5 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-purple-300">2️⃣ Keyword Arguments</h3>
          <p className="text-gray-300 mt-2">You specify the parameter name when calling. <strong>Order does not matter</strong>.</p>
          <pre className="mt-3 text-sm font-mono text-emerald-300 bg-gray-900 p-3 rounded overflow-x-auto">
{`introduce(city="Naihati", name="Debangshu", age=17)
# Same result as positional version, but clearer`}
          </pre>
          <p className="text-gray-400 text-sm mt-2">✅ Improves readability, especially for functions with many parameters.</p>
        </div>

        {/* Default Arguments */}
        <div className="bg-gray-800/50 rounded-xl p-5 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-green-300">3️⃣ Default Arguments</h3>
          <p className="text-gray-300 mt-2">Parameters that have a <strong>predefined value</strong> used if the caller doesn't provide one.</p>
          <pre className="mt-3 text-sm font-mono text-emerald-300 bg-gray-900 p-3 rounded overflow-x-auto">
{`def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Abhronila")              # Uses default "Hello"
greet("Swadeep", "Namaste")     # Overrides default`}
          </pre>
          <p className="text-gray-400 text-sm mt-2">✅ Allows optional parameters. Defaults must come after non‑default parameters.</p>
        </div>

        {/* Required Arguments */}
        <div className="bg-gray-800/50 rounded-xl p-5 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-red-300">4️⃣ Required Arguments</h3>
          <p className="text-gray-300 mt-2">Parameters <strong>without default values</strong> – you must pass an argument for them, or Python raises an error.</p>
          <pre className="mt-3 text-sm font-mono text-emerald-300 bg-gray-900 p-3 rounded overflow-x-auto">
{`def register(username, password):
    # Both are required (no defaults)
    print(f"User {username} registered")

register("swadeep_123")   # ERROR: missing password`}
          </pre>
          <p className="text-gray-400 text-sm mt-2">✅ Ensures essential data is always provided.</p>
        </div>
      </section>

      {/* ========== SECTION 3: FUNCTION PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          📝 Function Signature Rules
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`def func_name(required1, required2, default1="value", default2="value"):
    """required arguments first, then default arguments"""
    pass`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Required (positional) parameters</strong> must come <strong>before</strong> any default parameters.</li>
            <li><strong>Default parameters</strong> are optional when calling; they can be overridden.</li>
            <li>When calling, <strong>positional arguments come before keyword arguments</strong>.</li>
            <li>You cannot specify the same argument both positionally and by keyword.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        {/* Example 1: Positional arguments */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Positional Arguments (positional_args.py)</h3>
          <PythonFileLoader
            fileModule={positionalArgs}
            title="positional_args.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Demonstrates how the order of arguments determines which parameter receives which value.
          </p>
        </div>

        {/* Example 2: Keyword arguments */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Keyword Arguments (keyword_args.py)</h3>
          <PythonFileLoader
            fileModule={keywordArgs}
            title="keyword_args.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Shows how to use parameter names when calling, making the code self‑documenting and order‑independent.
          </p>
        </div>

        {/* Example 3: Default arguments */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Default Arguments (default_args.py)</h3>
          <PythonFileLoader
            fileModule={defaultArgs}
            title="default_args.py"
            highlightLines={[]}
          />
          <p className="text-gray-400 text-sm">
            Demonstrates parameters with default values, how to override them, and the required order in definition.
          </p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Use keyword arguments for clarity:</strong> When calling a function with many parameters (especially boolean flags), keyword arguments act as documentation.</li>
          <li><strong className="text-purple-300">Default arguments should be immutable:</strong> Avoid mutable defaults like <code>def f(lst=[])</code> – use <code>lst=None</code> and create a new list inside.</li>
          <li><strong className="text-purple-300">Mix positional and keyword:</strong> All positional arguments must appear before any keyword argument in the call.</li>
          <li><strong className="text-purple-300">Use defaults to evolve APIs:</strong> Adding a new parameter with a default value allows old code to keep working.</li>
          <li><strong className="text-purple-300">IDE autocomplete:</strong> Keyword arguments trigger autocomplete in modern editors – use them to avoid typos.</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Mismatched order with positional arguments</p>
            <p className="text-gray-300"><code>greet(age=16, "Tuhina")</code> – SyntaxError. Positional arguments cannot follow keyword arguments.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Default parameters after non‑default</p>
            <p className="text-gray-300"><code>def f(default=1, required)</code> – SyntaxError. All required parameters must come first.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Mutable default values (classic gotcha)</p>
            <p className="text-gray-300"><code>def add_item(item, basket=[]): basket.append(item); return basket</code> – the same list persists across calls! Use <code>None</code> instead.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting that required arguments have no default</p>
            <p className="text-gray-300">Calling a function without providing a required argument → <code>TypeError: missing 1 required positional argument</code>.</p>
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
            <li>Use positional arguments for the most important, required parameters.</li>
            <li>Use keyword arguments when calling functions with many parameters or boolean flags.</li>
            <li>Provide default values for optional parameters to make functions easier to use.</li>
            <li>Order parameters from most specific to most general (or most required to least required).</li>
            <li>Document default values clearly in the docstring.</li>
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
            <span className="text-green-400">✔️</span> Positional = order matters
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Keyword = use <code>param=value</code>, order irrelevant
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Default = parameter with <code>= value</code> in definition
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Required = no default value, must be provided
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> Defaults must come after required parameters
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
            <span className="text-green-400">✔️</span> In calls: positional first, then keyword
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> In <code>default_args.py</code>, what happens if you try to define <code>def func(a=1, b):</code>? Why does Python forbid that?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Convert a positional call to a keyword call. Does the output change? Which style is easier to read?</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> When would you deliberately use keyword arguments even though positional would work? (Hint: functions with many boolean parameters).</p>
        </div>
      </section>

      {/* ========== SECTION 10: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher
          note={
            "This topic often confuses beginners because of the terminology. 🧑‍🏫 " +
            "I recommend drawing a diagram: a function with parameters (like labeled boxes). Positional arguments fill boxes left to right. Keyword arguments label the box before filling. " +
            "Demonstrate the mutable default pitfall with a small example – students love the 'gotcha' moment. " +
            "Also show how default arguments are evaluated only once at definition time (the reason for the mutable default issue). " +
            "Encourage them to use keyword arguments for any function call with more than 3 arguments."
          }
        />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="580" height="240" viewBox="0 0 580 240" className="max-w-full h-auto">
            {/* Function box */}
            <rect x="180" y="20" width="220" height="100" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="290" y="50" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def profile(</text>
            <text x="290" y="70" fill="#fbbf24" fontSize="13" textAnchor="middle">name, age, city="Barrackpore"</text>
            <text x="290" y="90" fill="white" fontSize="13" textAnchor="middle">):</text>

            {/* Positional arguments arrow */}
            <line x1="80" y1="70" x2="175" y2="70" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowYellow)" />
            <text x="130" y="55" fill="#fbbf24" fontSize="11" textAnchor="middle">Positional</text>
            <text x="130" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">"Tuhina", 16</text>

            {/* Keyword arguments arrow */}
            <line x1="405" y1="70" x2="500" y2="70" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />
            <text x="450" y="55" fill="#c4b5fd" fontSize="11" textAnchor="middle">Keyword</text>
            <text x="450" y="85" fill="#c4b5fd" fontSize="11" textAnchor="middle">city="Ichapur"</text>

            {/* Default value indicator */}
            <rect x="180" y="140" width="220" height="60" fill="#065a46" stroke="#34d399" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="290" y="165" fill="#34d399" fontSize="12" textAnchor="middle">Default: city="Barrackpore"</text>
            <text x="290" y="185" fill="#9ca3af" fontSize="11" textAnchor="middle">Used if not provided</text>

            <defs>
              <marker id="arrowYellow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#fbbf24" />
              </marker>
              <marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          Positional arguments (yellow) match by order; keyword arguments (purple) use names; default parameters (green) are optional.
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