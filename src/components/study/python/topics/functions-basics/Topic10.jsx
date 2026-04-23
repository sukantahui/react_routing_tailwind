import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";

// Python example files (place in topic10_files/)
import noReturn from "./topic10_files/no_return.py?raw";
import emptyReturn from "./topic10_files/empty_return.py?raw";
import explicitNone from "./topic10_files/explicit_none.py?raw";
import noneRealWorld from "./topic10_files/none_realworld.py?raw";

/**
 * Topic 10: Functions without return (None type behavior)
 * 
 * This component explains:
 * - What is `None`? (Python's null object)
 * - Functions that don't use `return` implicitly return `None`
 * - Functions that use `return` without a value also return `None`
 * - How to check for `None` (is operator vs ==)
 * - Common pitfalls: forgetting to return, misusing None
 * - Real-world scenarios where returning None is intentional
 */
export default function Topic10() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🚫 Functions Without `return` (None Type Behavior)
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            In Python, <strong className="text-blue-300">every function returns something</strong>. 
            If you don‘t explicitly use a `return` statement, the function returns a special object called 
            <code className="bg-gray-700 px-1 rounded">None</code>. `None` represents the <strong>absence of a value</strong> – 
            it’s Python's version of "nothing" or "null".
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300">def greet(name):</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;print(f"Hello, {name}")<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300"># no return</span><br /><br />
              <span className="text-green-300">result = greet("Swadeep")</span><br />
              <span className="text-green-300">print(result)  # None</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 `None` – The Implicit Return Value
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`def function_without_return():
    # does something but doesn't return
    pass

def function_with_empty_return():
    return   # same as return None

def function_with_explicit_none():
    return None

# All three return None`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Return type:</strong> `NoneType` (singleton object `None`).</li>
            <li><strong>Purpose:</strong> Indicates that a function performs an action (side effect) but does not produce a meaningful result.</li>
            <li><strong>When & why:</strong> For procedures that modify state, print output, or validate input without needing to return a value.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 3: KEY BEHAVIOR ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          ⚙️ How `None` Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">1️⃣ `None` is a singleton</div>
            <p className="text-gray-300">There is only one `None` object in memory. All variables referencing `None` point to the same object.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">a = None; b = None; a is b  # True</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="text-purple-300 text-xl mb-2">2️⃣ Falsy value</div>
            <p className="text-gray-300">`None` evaluates to `False` in boolean contexts, like `if` statements.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">if None: print("won't run")<br/>else: print("runs")</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="text-green-300 text-xl mb-2">3️⃣ Check with `is`, not `==`</div>
            <p className="text-gray-300">Use `if x is None` rather than `if x == None` – it's faster and more idiomatic.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">if result is None:<br/>    print("No result")</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="text-red-300 text-xl mb-2">4️⃣ Common for side‑effect functions</div>
            <p className="text-gray-300">`print()`, `list.append()`, `set.add()` all return `None` intentionally.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">result = print("Hi")  # result is None</pre>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ No Return Statement (no_return.py)</h3>
          <PythonFileLoader fileModule={noReturn} title="no_return.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Functions that omit `return` implicitly return `None`.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Empty `return` (empty_return.py)</h3>
          <PythonFileLoader fileModule={emptyReturn} title="empty_return.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Using `return` without a value also returns `None`; often used for early exits.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Explicit `return None` (explicit_none.py)</h3>
          <PythonFileLoader fileModule={explicitNone} title="explicit_none.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Sometimes it's clearer to write `return None` explicitly.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World: Using `None` as a Sentinel (none_realworld.py)</h3>
          <PythonFileLoader fileModule={noneRealWorld} title="none_realworld.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Practical examples: database lookups, optional configuration, caching.</p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Use `is None` for checking</strong> – It's faster and avoids accidental truthiness issues.</li>
          <li><strong className="text-purple-300">`None` as a default for mutable parameters</strong> – `def f(lst=None): lst = lst or []` avoids the mutable default trap.</li>
          <li><strong className="text-purple-300">Return `None` to indicate 'not found'</strong> – In lookup functions, `None` is clearer than magic numbers like -1.</li>
          <li><strong className="text-purple-300">Be aware that `None` prints as empty string</strong> – When debugging, `print(None)` shows nothing, which can be confusing.</li>
          <li><strong className="text-purple-300">Document `None` returns</strong> – In docstrings, note when a function may return `None`.</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting that a function returns `None`</p>
            <p className="text-gray-300">Assigning the result of `list.append()` to a variable gives `None`, losing the list.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Using `== None` instead of `is None`</p>
            <p className="text-gray-300">While it works, `is None` is preferred and faster. Custom classes could override `==`.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Expecting a function that prints to return a string</p>
            <p className="text-gray-300">`def get_greeting(): print("Hello")` returns `None`, not the string. Use `return` instead.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Chaining methods that return `None`</p>
            <p className="text-gray-300">`my_list.append(5).sort()` fails because `append` returns `None`.</p>
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
            <li>For functions that only perform actions (e.g., logging, printing, updating state), don't return anything – they implicitly return `None`.</li>
            <li>Use `return None` at the end of a function that has no other return to be explicit, especially in long functions.</li>
            <li>Always check for `None` before using a value that might be `None` to avoid `AttributeError`.</li>
            <li>When designing APIs, consider using `None` as a sentinel for optional or missing data.</li>
            <li>Document when a function returns `None` and what that signifies.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 8: MINI CHECKLIST ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📋 <span>Mini Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> No `return` → `None`</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `return` alone → `None`</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `None` is a singleton</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Check with `is None` (not `==`)</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> `None` is falsy in conditions</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Built‑ins like `print()` return `None`</div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> What happens if you chain `my_list.append(5).append(6)`? Why?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Write a function that modifies a list in place (adds an item) and returns `None`. Compare with a function that returns the new list.</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why do many Python methods (like `list.sort()`) return `None` instead of the sorted list?</p>
        </div>
      </section>

      {/* ========== SECTION 10: FAQ ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.85s" }}>
        <FAQTemplate title="Functions Without Return (None) FAQs" questions={questions} />
      </section>

      {/* ========== SECTION 11: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher note={
          "The `None` concept is subtle but crucial. 🧑‍🏫 " +
          "I show students that `print()` returns `None` by having them assign `x = print('hi')` and then `print(x)`. " +
          "Explain that `None` is not the same as `0`, `''`, or `False` – it's a separate 'nothing' value. " +
          "Emphasise that checking with `is None` is idiomatic. " +
          "Also point out that returning `None` is useful for lookup functions (e.g., `dict.get()` returns `None` if key missing). " +
          "A great exercise: implement a function that safely divides and returns `None` for division by zero."
        } />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="560" height="220" viewBox="0 0 560 220" className="max-w-full h-auto">
            <rect x="20" y="20" width="200" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="120" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">def show(msg):</text>
            <text x="120" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">print(msg)</text>
            <text x="120" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">no return</text>

            <line x1="220" y1="60" x2="260" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />

            <rect x="270" y="20" width="270" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="405" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">result = show("Hi")</text>
            <text x="405" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">print(result)</text>
            <text x="405" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">→ None</text>

            <rect x="20" y="130" width="520" height="60" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="280" y="155" fill="#fcd34d" fontSize="12" textAnchor="middle">💡 `None` represents 'no value' – returned when no explicit `return`</text>
            <text x="280" y="175" fill="#9ca3af" fontSize="11" textAnchor="middle">Check with `is None`; avoid chaining methods that return `None`</text>

            <defs><marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" /></marker></defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Functions without a `return` statement (or with an empty `return`) implicitly return `None`.</p>
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