import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";

// Python example files (place in topic7_files/)
import kwargsBasic from "./topic7_files/kwargs_basic.py?raw";
import kwargsWithArgs from "./topic7_files/kwargs_with_args.py?raw";
import kwargsUnpacking from "./topic7_files/kwargs_unpacking.py?raw";
import kwargsRealWorld from "./topic7_files/kwargs_realworld.py?raw";

/**
 * Topic 7: Variable-Length Keyword Arguments – **kwargs
 * 
 * This component explains:
 * - What are variable-length keyword arguments? (functions that accept any number of keyword arguments)
 * - Syntax: `def func(**kwargs)` – `kwargs` becomes a dictionary
 * - Naming convention: `**kwargs` (double asterisk)
 * - How to use `**kwargs` inside the function (iterate, access by key)
 * - Rules: `**kwargs` must come after all other parameters, including `*args`
 * - Use cases: configuration options, passing through arguments, decorators
 */
export default function Topic7() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🔑 Variable-Length Keyword Arguments: `**kwargs`
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            While <code className="bg-gray-700 px-1 rounded">*args</code> handles extra <strong className="text-blue-300">positional</strong> arguments,
            <code className="bg-gray-700 px-1 rounded">**kwargs</code> (double asterisk) handles extra <strong className="text-green-300">keyword</strong> arguments.
            It collects them into a <strong className="text-yellow-300">dictionary</strong> where keys are parameter names and values are argument values.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">def display_info(**info):</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">for key, value in info.items():</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`print(f"{key}: {value}")`}<br /><br />
              <span className="text-green-300">display_info(name="Swadeep", age=17, city="Barrackpore")</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 Function Signature with `**kwargs`
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`def function_name(required, default="value", *args, **kwargs):
    """**kwargs collects all extra keyword arguments as a dict"""
    for key, value in kwargs.items():
        print(f"{key} = {value}")`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Return type:</strong> Any type (function decides). `**kwargs` is a dict input.</li>
            <li><strong>Purpose:</strong> Accept any number of keyword arguments, making functions highly flexible.</li>
            <li><strong>When & why:</strong> Configuration dictionaries, argument forwarding, decorators, APIs.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 3: KEY BEHAVIOR ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          ⚙️ How `**kwargs` Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">1️⃣ Collects as dict</div>
            <p className="text-gray-300">All extra keyword arguments are packed into a dictionary named `kwargs`.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def show(**kwargs): print(type(kwargs), kwargs)<br/>show(a=1, b=2) → &lt;class 'dict'&gt; {`{'a':1, 'b':2}`}</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="text-purple-300 text-xl mb-2">2️⃣ Can be empty</div>
            <p className="text-gray-300">If no keyword arguments are passed, `kwargs` is an empty dictionary.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def show(**kwargs): print(len(kwargs))<br/>show() → 0</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="text-green-300 text-xl mb-2">3️⃣ Dictionary methods</div>
            <p className="text-gray-300">You can use `.items()`, `.keys()`, `.values()`, `.get()`, etc.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def greet(**kwargs):<br/>    if 'name' in kwargs: print(kwargs['name'])</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="text-red-300 text-xl mb-2">4️⃣ Position matters</div>
            <p className="text-gray-300">`**kwargs` must be the <strong>last</strong> parameter in the function definition.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def f(a, b=2, *args, **kwargs): pass</pre>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Basic `**kwargs` Usage (kwargs_basic.py)</h3>
          <PythonFileLoader fileModule={kwargsBasic} title="kwargs_basic.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Shows how to collect and iterate over keyword arguments.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ `**kwargs` with `*args` and Normal Parameters (kwargs_with_args.py)</h3>
          <PythonFileLoader fileModule={kwargsWithArgs} title="kwargs_with_args.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Combines positional, `*args`, and `**kwargs` in correct order.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Unpacking Dictionaries with `**` (kwargs_unpacking.py)</h3>
          <PythonFileLoader fileModule={kwargsUnpacking} title="kwargs_unpacking.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Demonstrates how to use `**` to unpack a dict into keyword arguments when calling a function.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World: Settings, API Wrappers, and Class Constructors (kwargs_realworld.py)</h3>
          <PythonFileLoader fileModule={kwargsRealWorld} title="kwargs_realworld.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Practical uses: configuration overrides, flexible HTML builders, argument forwarding.</p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Name can be anything</strong> – `**config`, `**options`, `**extra`. Convention is `**kwargs`.</li>
          <li><strong className="text-purple-300">Use `kwargs.get()` for safe access</strong> – `timeout = kwargs.get('timeout', 5)` provides default.</li>
          <li><strong className="text-purple-300">Forward arguments with `**kwargs`</strong> – `def wrapper(*args, **kwargs): return func(*args, **kwargs)` is the decorator pattern.</li>
          <li><strong className="text-purple-300">Type hints with `**kwargs`</strong> – `def f(**kwargs: int)` indicates all values are ints (keys are str).</li>
          <li><strong className="text-purple-300">Combine with explicit keyword parameters</strong> – explicit parameters take precedence and are removed from `kwargs`.</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Placing `**kwargs` before `*args` or normal parameters</p>
            <p className="text-gray-300">`**kwargs` must be the last parameter. Otherwise, SyntaxError.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Accessing missing keys without checking</p>
            <p className="text-gray-300">Use `kwargs.get('key')` or `if 'key' in kwargs` to avoid KeyError.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Expecting `**kwargs` to preserve order</p>
            <p className="text-gray-300">Dictionaries preserve insertion order as of Python 3.7+, but don't rely on it for logic.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Overwriting explicit parameters with `**kwargs`</p>
            <p className="text-gray-300">If you define `def f(a, **kwargs):`, passing `a=5` in kwargs is impossible – `a` is taken.</p>
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
            <li>Use `**kwargs` when you need to accept arbitrary keyword arguments, e.g., configuration overrides.</li>
            <li>Document what keys are expected in the docstring, especially if some are required.</li>
            <li>Use `kwargs.get()` with defaults instead of direct indexing to be safe.</li>
            <li>If a key is required, pop it: `value = kwargs.pop('required_key')`.</li>
            <li>For subclass constructors, `**kwargs` allows passing unknown arguments to parent classes.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 8: MINI CHECKLIST ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📋 <span>Mini Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `**kwargs` collects extra keyword args into a dict</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Must be the last parameter</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Can be empty (empty dict)</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Use `.get()` for safe access</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Great for configuration, forwarding, decorators</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Combine with `*args` for full flexibility</div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> In `kwargs_with_args.py`, what happens if you pass a keyword argument that matches a normal parameter name?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Modify `create_profile` to have explicit parameters `name` and `age`, and collect the rest into `**extra`. How do you access `city`?</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why is `**kwargs` essential for decorators? How does it help preserve the original function's signature?</p>
        </div>
      </section>

      {/* ========== SECTION 10: FAQ ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.85s" }}>
        <FAQTemplate title="Variable-Length Keyword Arguments (**kwargs) FAQs" questions={questions} />
      </section>

      {/* ========== SECTION 11: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher note={
          "`**kwargs` is a powerful tool for writing flexible APIs. 🧑‍🏫 " +
          "Show students that `print()` doesn't take `**kwargs`, but many libraries (like `requests.get`) do. " +
          "I like to demonstrate a configuration function: `def configure(**settings):` and then show how to set defaults. " +
          "Emphasise the difference between `*args` (tuple) and `**kwargs` (dict). " +
          "A common exercise: write a function that builds an HTML tag with arbitrary attributes using `**kwargs`."
        } />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="560" height="220" viewBox="0 0 560 220" className="max-w-full h-auto">
            <rect x="20" y="20" width="200" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="120" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def profile(**data):</text>
            <text x="120" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">for k,v in data.items():</text>
            <text x="120" y="85" fill="#94a3b8" fontSize="12" textAnchor="middle">    {`print(f"{k}: {v}")`}</text>

            <line x1="220" y1="60" x2="270" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />
            <text x="245" y="50" fill="#c4b5fd" fontSize="11">call</text>

            <rect x="280" y="20" width="260" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="410" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">profile(name="Swadeep",</text>
            <text x="410" y="65" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">age=17, city="Barrackpore")</text>
            <text x="410" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">→ data ={` {'name':..., 'age':..., 'city':...}`}</text>

            <rect x="20" y="130" width="520" height="60" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="280" y="155" fill="#fcd34d" fontSize="12" textAnchor="middle">💡 `**kwargs` collects keyword arguments into a dictionary</text>
            <text x="280" y="175" fill="#9ca3af" fontSize="11" textAnchor="middle">Useful for: configuration, attribute bags, argument forwarding</text>

            <defs><marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" /></marker></defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">`**kwargs` packs keyword arguments into a dict, enabling highly flexible function calls.</p>
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