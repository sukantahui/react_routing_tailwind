import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";

// Python example files (place in topic6_files/)
import argsBasic from "./topic6_files/args_basic.py?raw";
import argsWithOther from "./topic6_files/args_with_other.py?raw";
import argsOrder from "./topic6_files/args_order.py?raw";
import argsRealWorld from "./topic6_files/args_realworld.py?raw";

/**
 * Topic 6: Variable-Length Arguments – *args (non-keyword arguments)
 * 
 * This component explains:
 * - What are variable‑length arguments? (functions that accept any number of positional arguments)
 * - Syntax: `def func(*args)` – `args` becomes a tuple
 * - Naming convention: `*args` (though `*` followed by any name works)
 * - How to use `*args` inside the function (iterate, index, unpack)
 * - Rules: `*args` must come after normal and default parameters
 * - Use cases: math functions (sum, average), logging, decorators
 */
export default function Topic6() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌟 Variable-Length Arguments: `*args`
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            Sometimes you want a function that can accept <strong className="text-blue-300">any number of positional arguments</strong>.
            Python's <code className="bg-gray-700 px-1 rounded">*args</code> syntax makes this possible. The `*` collects extra positional arguments into a <strong className="text-yellow-300">tuple</strong>.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">def sum_all(*numbers):</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">return sum(numbers)</span><br /><br />
              <span className="text-green-300">sum_all(1, 2, 3)</span>        → 6<br />
              <span className="text-green-300">sum_all(10, 20, 30, 40, 50)</span> → 150<br />
              <span className="text-green-300">sum_all()</span>               → 0
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 Function Signature with `*args`
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`def function_name(required_param, default_param="value", *args):
    """*args captures all extra positional arguments as a tuple"""
    for arg in args:
        print(arg)`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Return type:</strong> Any type (function decides). `*args` is just a tuple input.</li>
            <li><strong>Purpose:</strong> Create flexible functions that accept a variable number of arguments.</li>
            <li><strong>When & why:</strong> When you don’t know in advance how many arguments will be passed (e.g., `sum()`, `print()`, `max()`).</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 3: KEY BEHAVIOR ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          ⚙️ How `*args` Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">1️⃣ Collects as tuple</div>
            <p className="text-gray-300">All extra positional arguments are packed into a tuple named `args`.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def show(*args): print(type(args), args)<br/>show(1,2,3) → &lt;class 'tuple'&gt; (1,2,3)</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="text-purple-300 text-xl mb-2">2️⃣ Can be empty</div>
            <p className="text-gray-300">If no extra arguments are passed, `args` is an empty tuple.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def show(*args): print(len(args))<br/>show() → 0</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="text-green-300 text-xl mb-2">3️⃣ Iterable</div>
            <p className="text-gray-300">You can loop over `args` like any tuple.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def total(*nums): return sum(nums)</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="text-red-300 text-xl mb-2">4️⃣ Position matters</div>
            <p className="text-gray-300">`*args` must come after all normal and default parameters, but before `**kwargs`.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def f(a, b=2, *args): pass</pre>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Basic `*args` Usage (args_basic.py)</h3>
          <PythonFileLoader fileModule={argsBasic} title="args_basic.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Shows how to collect any number of arguments and process them.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ `*args` with Normal Parameters (args_with_other.py)</h3>
          <PythonFileLoader fileModule={argsWithOther} title="args_with_other.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Combines required, default, and variable arguments.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Order Matters (args_order.py)</h3>
          <PythonFileLoader fileModule={argsOrder} title="args_order.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Demonstrates correct and incorrect parameter ordering.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World: Logger & Calculator (args_realworld.py)</h3>
          <PythonFileLoader fileModule={argsRealWorld} title="args_realworld.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Practical examples: logging with variable messages, flexible math operations.</p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Name can be anything</strong> – the `*` is the magic. Convention is `*args`, but `*numbers`, `*items` are fine.</li>
          <li><strong className="text-purple-300">Use `*args` to forward arguments</strong> – useful in decorators and wrapper functions: `def wrapper(*args, **kwargs): return func(*args, **kwargs)`.</li>
          <li><strong className="text-purple-300">Combine with keyword defaults</strong> – `def func(a, b=1, *args):` – `b` can still be overridden by keyword.</li>
          <li><strong className="text-purple-300">Unpacking inside function</strong> – you can use `*args` again to pass to another function that expects multiple arguments.</li>
          <li><strong className="text-purple-300">Type hints with `*args`</strong> – `def func(*args: int) -> int:` indicates all args are integers.</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Placing `*args` before required parameters</p>
            <p className="text-gray-300">`def func(*args, required)` – then `required` can only be passed by keyword, often unintended.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting that `args` is a tuple</p>
            <p className="text-gray-300">Tuples are immutable – you cannot modify `args` directly (but you can convert to list).</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Using `*args` and also expecting a list as a single argument</p>
            <p className="text-gray-300">Calling `func([1,2,3])` passes one argument (a list). To unpack the list, use `func(*[1,2,3])`.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Overusing `*args` when a list or tuple would be clearer</p>
            <p className="text-gray-300">If arguments are logically a single collection, accept an iterable explicitly.</p>
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
            <li>Use `*args` only when the number of arguments is truly variable and they are all of similar type.</li>
            <li>Give `*args` a descriptive name: `*numbers`, `*items`, `*students`.</li>
            <li>Document what kind of values are expected in `*args` in the docstring.</li>
            <li>If you need to modify the collection, convert to list: `list_args = list(args)`.</li>
            <li>Combine `*args` with `**kwargs` for maximum flexibility (next topic).</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 8: MINI CHECKLIST ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📋 <span>Mini Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `*args` collects extra positional args</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `args` is a tuple (immutable)</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Can be empty (empty tuple)</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Must appear after normal and default params</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Use descriptive names like `*numbers`</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Perfect for `sum()`, `max()`, `print()`-like functions</div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> In `args_with_other.py`, what happens if you pass keyword arguments after `*args`? Try it.</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Modify `average` to also accept a `round_digits` default parameter. Where would you place it?</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why is `print()` able to take any number of arguments? How would you implement your own `print`‑like function?</p>
        </div>
      </section>

      {/* ========== SECTION 10: FAQ ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.85s" }}>
        <FAQTemplate title="Variable-Length Arguments (*args) FAQs" questions={questions} />
      </section>

      {/* ========== SECTION 11: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher note={
          "`*args` is a gateway to advanced Python patterns. 🧑‍🏫 " +
          "Show students that `print('a', 'b', 'c')` works because `print` uses `*args`. " +
          "Let them implement a `sum_all` function from scratch. " +
          "Emphasise that the name `args` is just convention – the asterisk does the work. " +
          "Also demonstrate how `*args` can be passed down to another function (e.g., a wrapper). " +
          "A common exercise: write a function that logs a message with variable number of additional data items."
        } />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="560" height="220" viewBox="0 0 560 220" className="max-w-full h-auto">
            <rect x="20" y="20" width="200" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="120" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def sum_all(*nums):</text>
            <text x="120" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">return sum(nums)</text>
            <text x="120" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">← `nums` is a tuple</text>

            <line x1="220" y1="60" x2="270" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />
            <text x="245" y="50" fill="#c4b5fd" fontSize="11">call</text>

            <rect x="280" y="20" width="260" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="410" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">sum_all(1, 2, 3, 4)</text>
            <text x="410" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">→ nums = (1, 2, 3, 4)</text>
            <text x="410" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">any number of arguments → tuple</text>

            <rect x="20" y="130" width="520" height="60" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="280" y="155" fill="#fcd34d" fontSize="12" textAnchor="middle">💡 `*args` is a tuple – iterate with `for arg in args`</text>
            <text x="280" y="175" fill="#9ca3af" fontSize="11" textAnchor="middle">Useful for: mathematical series, logging, function wrappers</text>

            <defs><marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" /></marker></defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">`*args` collects extra positional arguments into a tuple, enabling flexible function calls.</p>
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