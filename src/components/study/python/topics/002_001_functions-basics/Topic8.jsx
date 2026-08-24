import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";

// Python example files (place in topic8_files/)
import unpackList from "./topic8_files/unpack_list.py?raw";
import unpackDict from "./topic8_files/unpack_dict.py?raw";
import mixedUnpack from "./topic8_files/mixed_unpack.py?raw";
import unpackRealWorld from "./topic8_files/unpack_realworld.py?raw";

/**
 * Topic 8: Unpacking arguments in function calls
 * 
 * This component explains:
 * - What is argument unpacking? (using * and ** in function calls)
 * - Unpacking iterables (lists, tuples) with * to pass as positional arguments
 * - Unpacking dictionaries with ** to pass as keyword arguments
 * - Combining unpacking with regular arguments
 * - Using * and ** multiple times (Python 3.5+)
 * - Common use cases: merging, forwarding, flexible APIs
 */
export default function Topic8() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          📦 Unpacking Arguments in Function Calls
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            Unpacking allows you to take elements from an iterable (list, tuple) or a dictionary and pass them 
            as <strong className="text-blue-300">individual arguments</strong> to a function. 
            The <code className="bg-gray-700 px-1 rounded">*</code> operator unpacks sequences; 
            <code className="bg-gray-700 px-1 rounded">**</code> unpacks dictionaries.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">def greet(name, age, city):</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;{`print(f"{name}, {age}, from {city}")`}<br /><br />
              <span className="text-green-300"># Unpack list as positional arguments</span><br />
              <span className="text-green-300">data = ["Swadeep", 17, "Barrackpore"]</span><br />
              <span className="text-green-300">greet(*data)</span><br /><br />
              <span className="text-green-300"># Unpack dict as keyword arguments</span><br />
              <span className="text-green-300">info = {"{"}"name": "Tuhina", "age": 16, "city": "Shyamnagar"{"}"}</span><br />
              <span className="text-green-300">greet(**info)</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 Unpacking Syntax in Calls
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`# Unpack sequence (list, tuple, any iterable) -> positional arguments
func(*iterable)

# Unpack dictionary -> keyword arguments
func(**dictionary)

# Mix regular arguments with unpacking
func(regular, *iterable, keyword=value, **dictionary)`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Purpose:</strong> Convert a collection into separate arguments, making code cleaner and more dynamic.</li>
            <li><strong>When & why:</strong> When you have data already in a list/dict and need to pass it to a function that expects individual parameters.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 3: KEY BEHAVIOR ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          ⚙️ How Unpacking Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">1️⃣ `*` unpacks sequences</div>
            <p className="text-gray-300">List, tuple, string, or any iterable → each element becomes a positional argument.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def add(a,b): return a+b<br/>nums = [5,3]; add(*nums) → 8</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="text-purple-300 text-xl mb-2">2️⃣ `**` unpacks dictionaries</div>
            <p className="text-gray-300">Dictionary key-value pairs become keyword arguments (keys must be valid identifiers).</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">{`def greet(name, msg): print(f"{msg}, {name}")`}<br/>d ={` {"name":"Swadeep", "msg":"Hi"}`}<br/>greet(**d) → "Hi, Swadeep"</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="text-green-300 text-xl mb-2">3️⃣ Can be used multiple times (Python 3.5+)</div>
            <p className="text-gray-300">You can unpack several iterables/dicts in one call.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def f(a,b,c): pass<br/>f(*[1,2], *[3])  # a=1,b=2,c=3<br/>f(**d1, **d2)   # merges dicts</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="text-red-300 text-xl mb-2">4️⃣ Mix with regular arguments</div>
            <p className="text-gray-300">Regular positional arguments must come before `*` unpacking; keyword arguments before `**`.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">{`func(1, *[2,3], x=4, **{"y":5})`}</pre>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Unpacking Lists/Tuples with `*` (unpack_list.py)</h3>
          <PythonFileLoader fileModule={unpackList} title="unpack_list.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Shows how to unpack sequences into positional arguments.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Unpacking Dictionaries with `**` (unpack_dict.py)</h3>
          <PythonFileLoader fileModule={unpackDict} title="unpack_dict.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Demonstrates converting a dict into keyword arguments.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Mixed Unpacking and Multiple Unpacks (mixed_unpack.py)</h3>
          <PythonFileLoader fileModule={mixedUnpack} title="mixed_unpack.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Combines regular arguments with multiple `*` and `**` unpackings.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World: Data Processing and API Calls (unpack_realworld.py)</h3>
          <PythonFileLoader fileModule={unpackRealWorld} title="unpack_realworld.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Practical examples: reading CSV rows, merging configs, calling functions dynamically.</p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Unpack to avoid indexing</strong> – Instead of `args[0], args[1]`, do `func(*args)`.</li>
          <li><strong className="text-purple-300">{`Merge dictionaries with \`{**d1, **d2}`}</strong> – Python 3.5+ allows dictionary unpacking in dict literals.</li>
          <li><strong className="text-purple-300">Use `*` to flatten nested structures</strong> – `func(*[1,2], *[3,4])` passes four arguments.</li>
          <li><strong className="text-purple-300">Combine with `*args` in definition</strong> – `def f(*args):` then `f(*some_list)` forwards the list.</li>
          <li><strong className="text-purple-300">Be careful with order</strong> – Later unpacked items can override earlier ones for `**` (dict merging).</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Unpacking too many or too few elements</p>
            <p className="text-gray-300">If the number of elements in the iterable doesn't match the function's parameters, you get TypeError.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Using `**` on a dict with non‑string keys</p>
            <p className="text-gray-300">Dictionary keys must be strings; otherwise, TypeError: `keywords must be strings`.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Unpacking a dict with keys that are not valid Python identifiers</p>
            <p className="text-gray-300">Keys like `"my-key"` or `"123"` are not allowed as keyword argument names. Use `**` only on dicts with identifier‑compliant keys.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting that unpacking creates a copy</p>
            <p className="text-gray-300">The function receives the values, not references to the original container. Modifying the container after unpacking has no effect.</p>
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
            <li>Use unpacking to make code more declarative: `max(*numbers)` instead of `max(numbers[0], numbers[1], ...)`.</li>
            <li>{`When merging dictionaries, prefer \`{**defaults, **overrides}\` for clear precedence (overrides win).`}</li>
            <li>Validate the length of the iterable before unpacking if the function expects a fixed number of arguments.</li>
            <li>Use unpacking in wrapper functions to transparently pass arguments: `def wrapper(*args, **kwargs): return func(*args, **kwargs)`.</li>
            <li>Document that a function expects unpacked data when designing APIs that rely on this pattern.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 8: MINI CHECKLIST ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📋 <span>Mini Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `*` unpacks sequences → positional args</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `**` unpacks dicts → keyword args</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Number of elements must match function parameters</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Dict keys must be valid identifiers</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Can unpack multiple times (Python 3.5+)</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Great for forwarding arguments in decorators</div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> In `unpack_list.py`, what happens if the list has 4 elements but the function expects 3?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Write a function `print_all(*args)` that prints each argument. Then call it with `print_all(*[1,2,3])`. What does `*` do now?</p>
          <p className="mt-2">🔍 <strong>Think about:</strong>{`Why might you want to merge two dictionaries with {**a, **b} instead of 'a.update(b)'?`}</p>
        </div>
      </section>

      {/* ========== SECTION 10: FAQ ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.85s" }}>
        <FAQTemplate title="Unpacking Arguments FAQs" questions={questions} />
      </section>

      {/* ========== SECTION 11: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher note={
          "Unpacking is one of those features that makes Python code elegant. 🧑‍🏫 " +
          "I tell students: 'If you find yourself writing `a = data[0]; b = data[1]`, you probably want unpacking.' " +
          "Show the difference between `*` in definition (packing) and `*` in call (unpacking). " +
          "A great exercise: read a CSV row as a list and unpack it into variables. " +
          "Also demonstrate merging configurations with `**` – it's a pattern used in many frameworks like Django settings."
        } />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="580" height="220" viewBox="0 0 580 220" className="max-w-full h-auto">
            <rect x="20" y="20" width="240" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="140" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def show(a, b, c):</text>
            <text x="140" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">print(a, b, c)</text>
            <text x="140" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">3 parameters</text>

            <line x1="260" y1="60" x2="300" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />

            <rect x="310" y="20" width="250" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="435" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">data = [1, 2, 3]</text>
            <text x="435" y="65" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">show(*data)</text>
            <text x="435" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">← unpacks list → 3 args</text>

            <rect x="20" y="130" width="540" height="60" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="290" y="155" fill="#fcd34d" fontSize="12" textAnchor="middle">💡 `*` unpacks iterables into positional arguments; `**` unpacks dicts into keyword arguments</text>
            <text x="290" y="175" fill="#9ca3af" fontSize="11" textAnchor="middle">Useful for dynamic calls, config merging, and argument forwarding</text>

            <defs><marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" /></marker></defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Unpacking turns a collection into separate arguments, making function calls cleaner and more dynamic.</p>
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