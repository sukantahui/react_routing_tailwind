import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";

// Python example files (place in topic9_files/)
import returnSingle from "./topic9_files/return_single.py?raw";
import returnMultiple from "./topic9_files/return_multiple.py?raw";
import returnNone from "./topic9_files/return_none.py?raw";
import returnRealWorld from "./topic9_files/return_realworld.py?raw";

/**
 * Topic 9: Return Statement – Returning Single and Multiple Values
 * 
 * This component explains:
 * - What is the `return` statement? (exits function and sends value back)
 * - Returning a single value (any type)
 * - Returning multiple values (using tuples, lists, dicts)
 * - Implicit `return None` when no return statement
 * - The difference between `print` (display) and `return` (value)
 * - Using returned values in expressions and assignments
 */
export default function Topic9() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          ↩️ Return Statement: Returning Single and Multiple Values
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            The <code className="bg-gray-700 px-1 rounded">return</code> statement is how a function <strong className="text-blue-300">sends a value back</strong> to the caller. 
            It immediately exits the function and optionally provides a result that can be stored, printed, or used in further calculations.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">def add(a, b):</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">return a + b</span><br /><br />
              <span className="text-green-300">result = add(5, 3)</span><br />
              <span className="text-green-300">print(result)  # 8</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 Return Statement Syntax
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`def function_name(parameters):
    # function body
    return expression   # optional, can be any type

# Or return multiple values (as tuple)
def function_name(parameters):
    return value1, value2, value3   # actually returns a tuple`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Return type:</strong> Any Python object (int, str, list, tuple, None, etc.)</li>
            <li><strong>Purpose:</strong> To produce a result that can be used elsewhere in the program.</li>
            <li><strong>When & why:</strong> When you need to compute a value and use it later (e.g., calculations, data processing).</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 3: KEY BEHAVIOR ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          ⚙️ How `return` Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">1️⃣ Exits function immediately</div>
            <p className="text-gray-300">No code after `return` is executed.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def test():<br/>    return 5<br/>    print("This never runs")</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="text-purple-300 text-xl mb-2">2️⃣ Can return any type</div>
            <p className="text-gray-300">Number, string, list, dict, object, even another function.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">{`def get_list(): return [1,2,3]<br/>def get_dict(): return {"a":1}`}</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="text-green-300 text-xl mb-2">3️⃣ Multiple values = tuple</div>
            <p className="text-gray-300">`return a, b, c` is syntactic sugar for `return (a, b, c)`.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def stats(lst):<br/>    return min(lst), max(lst), sum(lst)/len(lst)</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="text-red-300 text-xl mb-2">4️⃣ No return = None</div>
            <p className="text-gray-300">If a function doesn't have `return`, it returns `None` implicitly.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def say_hello():<br/>    print("Hello")<br/>result = say_hello()  # None</pre>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: PRINT vs RETURN ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.25s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-red-500 pl-4">
          🖨️ `print` vs `return` – Crucial Distinction
        </h2>
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-red-300">`print()`</p>
              <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                <li>Displays output to the console</li>
                <li>Does NOT produce a usable value</li>
                <li>Cannot be assigned to a variable</li>
                <li>For user‑facing messages</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-green-300">`return`</p>
              <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                <li>Sends a value back to the caller</li>
                <li>Can be assigned to variables</li>
                <li>Can be used in expressions</li>
                <li>For computation results</li>
              </ul>
            </div>
          </div>
          <pre className="mt-4 text-sm font-mono bg-gray-900 p-3 rounded overflow-x-auto">
{`def square(x):
    return x * x   # returns value

def show_square(x):
    print(x * x)   # prints but returns None

result = square(5)   # result = 25, can use later
show_square(5)       # prints 25, but returns None`}
          </pre>
        </div>
      </section>

      {/* ========== SECTION 5: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Returning a Single Value (return_single.py)</h3>
          <PythonFileLoader fileModule={returnSingle} title="return_single.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Demonstrates functions that return integers, strings, and booleans.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Returning Multiple Values (return_multiple.py)</h3>
          <PythonFileLoader fileModule={returnMultiple} title="return_multiple.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Shows how to return multiple values using tuples and unpacking.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Implicit `return None` (return_none.py)</h3>
          <PythonFileLoader fileModule={returnNone} title="return_none.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Explains what happens when a function has no `return` or uses `return` without a value.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World: Data Validation and Processing (return_realworld.py)</h3>
          <PythonFileLoader fileModule={returnRealWorld} title="return_realworld.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Practical examples: calculating GPA, parsing user input, returning structured data.</p>
        </div>
      </section>

      {/* ========== SECTION 6: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Early return pattern</strong> – Use `return` to exit early and avoid deep nesting: `if error: return None`.</li>
          <li><strong className="text-purple-300">Return meaningful values</strong> – For validation functions, return `True`/`False`; for lookups, return the found item or `None`.</li>
          <li><strong className="text-purple-300">Unpack multiple returns</strong> – `min_val, max_val, avg = calculate_stats(data)` is clean and readable.</li>
          <li><strong className="text-purple-300">Returning `None` explicitly</strong> – `return None` is clearer than just `return` when the absence of a value is intentional.</li>
          <li><strong className="text-purple-300">Type hints</strong> – Use `->` to indicate return type: `def add(a: int, b: int) -> int:`.</li>
        </ul>
      </section>

      {/* ========== SECTION 7: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting to assign the return value</p>
            <p className="text-gray-300">`square(5)` without assignment does nothing with the result. Use `result = square(5)`.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Confusing `print` with `return`</p>
            <p className="text-gray-300">A function that prints but doesn't return cannot be used in calculations.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Unreachable code after `return`</p>
            <p className="text-gray-300">Statements placed after `return` are never executed – often a logical error.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Returning too many values without unpacking</p>
            <p className="text-gray-300">`result = func()` where `func` returns multiple values gives a tuple; you need to index or unpack.</p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: BEST PRACTICES ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.6s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ✅ <span>Best Practices</span>
        </h2>
        <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-5">
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Always document what a function returns in the docstring.</li>
            <li>Use early returns to simplify conditional logic (guard clauses).</li>
            <li>Return `None` explicitly when a function fails or finds nothing (instead of returning magic values like -1).</li>
            <li>For multiple related values, consider returning a named tuple or a small class for clarity.</li>
            <li>Keep return types consistent – avoid returning different types under different conditions (e.g., int or None).</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 9: MINI CHECKLIST ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📋 <span>Mini Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `return` exits the function immediately</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Can return any data type</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Multiple values = tuple (can be unpacked)</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> No `return` → `None`</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `return` is different from `print`</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Use returned values in expressions</div>
        </div>
      </section>

      {/* ========== SECTION 10: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> In `return_multiple.py`, what happens if you assign the result to a single variable? What type is it?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Modify `divide` to return a tuple `(quotient, remainder)`. Then call it and unpack both values.</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why would a function ever return `None` intentionally? When might that be useful?</p>
        </div>
      </section>

      {/* ========== SECTION 11: FAQ ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.85s" }}>
        <FAQTemplate title="Return Statement FAQs" questions={questions} />
      </section>

      {/* ========== SECTION 12: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher note={
          "The `return` vs `print` confusion is one of the biggest hurdles for beginners. 🧑‍🏫 " +
          "I use the analogy: `print` is like shouting into the void; `return` is like handing a note to the caller. " +
          "Demonstrate by writing `def add(a,b): print(a+b)` and then trying `result = add(2,3)`. Show that `result` is `None`. " +
          "Then change to `return a+b` and show how `result` now holds the value. " +
          "Also teach early returns: it's a great way to avoid deeply nested `if` statements."
        } />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="560" height="220" viewBox="0 0 560 220" className="max-w-full h-auto">
            <rect x="20" y="20" width="180" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="110" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def square(x):</text>
            <text x="110" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">return x * x</text>
            <text x="110" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">returns value</text>

            <line x1="200" y1="60" x2="240" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />
            <text x="220" y="50" fill="#c4b5fd" fontSize="11">call</text>

            <rect x="250" y="20" width="290" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="395" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">result = square(5)</text>
            <text x="395" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">result → 25</text>
            <text x="395" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">value can be used later</text>

            <rect x="20" y="130" width="520" height="60" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="280" y="155" fill="#fcd34d" fontSize="12" textAnchor="middle">💡 `return` sends a value back; `print` only displays. Use `return` for computation.</text>
            <text x="280" y="175" fill="#9ca3af" fontSize="11" textAnchor="middle">Multiple values: `return a, b, c` → tuple → unpack with `x, y, z = func()`</text>

            <defs><marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" /></marker></defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">`return` sends a value from the function back to the caller, enabling reuse of computed results.</p>
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