import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";

// Python example files (place in topic11_files/)
import lambdaBasic from "./topic11_files/lambda_basic.py?raw";
import lambdaWithArgs from "./topic11_files/lambda_with_args.py?raw";
import lambdaVsDef from "./topic11_files/lambda_vs_def.py?raw";
import lambdaRealWorld from "./topic11_files/lambda_realworld.py?raw";

/**
 * Topic 11: Lambda (Anonymous) Functions – Syntax and Basic Usage
 * 
 * This component explains:
 * - What are lambda functions? (small, anonymous functions defined with `lambda`)
 * - Syntax: `lambda arguments: expression`
 * - Differences from regular `def` functions
 * - Use cases: short, one‑line functions, especially as arguments to higher‑order functions
 * - Limitations: only one expression, no statements, no type hints easily
 */
export default function Topic11() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      {/* ========== SECTION 1: THEORY & EXPLANATION ========== */}
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🐑 Lambda (Anonymous) Functions: Syntax and Basic Usage
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            A <strong className="text-blue-300">lambda function</strong> is a small, anonymous function that can be defined 
            <strong className="text-yellow-300"> in a single line</strong>. It's called "anonymous" because it doesn‘t have a name
            (though you can assign it to a variable). Lambdas are often used for short, throwaway operations where a full `def` would be overkill.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-yellow-300"># Regular function</span><br />
              <span className="text-green-300">def add(x, y): return x + y</span><br /><br />
              <span className="text-yellow-300"># Lambda equivalent</span><br />
              <span className="text-green-300">add = lambda x, y: x + y</span><br /><br />
              <span className="text-green-300">print(add(3, 5))  # 8</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PROTOTYPE / SIGNATURE ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 Lambda Syntax
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`lambda arguments: expression

# arguments: comma-separated parameters (like in def)
# expression: a single Python expression (no statements, no assignments)

# Returns: the result of the expression`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Return type:</strong> The type of the expression result (inferred).</li>
            <li><strong>Purpose:</strong> Create small, inline functions without naming them.</li>
            <li><strong>When & why:</strong> When you need a simple function for a short period, especially as an argument to functions like `map()`, `filter()`, `sorted()`.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 3: KEY CHARACTERISTICS ========== */}
      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-yellow-500 pl-4">
          ⚙️ Lambda Characteristics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">1️⃣ Single expression only</div>
            <p className="text-gray-300">No statements like `return`, `if`‑`else` (but conditional expressions work).</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">lambda x: x*2  # ok<br/># lambda x: if x>0: return x  # SyntaxError</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="text-purple-300 text-xl mb-2">2️⃣ Anonymous (no name)</div>
            <p className="text-gray-300">Often used directly without assigning to a variable.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">sorted(data, key=lambda x: x[1])</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="text-green-300 text-xl mb-2">3️⃣ Can be assigned to a variable</div>
            <p className="text-gray-300">But then it's no longer truly anonymous; still useful for short functions.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">square = lambda x: x**2</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="text-red-300 text-xl mb-2">4️⃣ Limited to one line</div>
            <p className="text-gray-300">For anything complex, use a regular `def`.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded"># lambda cannot contain loops or multiple statements</pre>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: CODE EXAMPLES ========== */}
      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Basic Lambda Usage (lambda_basic.py)</h3>
          <PythonFileLoader fileModule={lambdaBasic} title="lambda_basic.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Simple lambda functions for arithmetic, string operations, and conditional expressions.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Lambda with Multiple Arguments (lambda_with_args.py)</h3>
          <PythonFileLoader fileModule={lambdaWithArgs} title="lambda_with_args.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Demonstrates lambda functions that take multiple parameters and use default arguments.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Lambda vs Regular `def` (lambda_vs_def.py)</h3>
          <PythonFileLoader fileModule={lambdaVsDef} title="lambda_vs_def.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Compares lambdas with traditional functions, highlighting when each is appropriate.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World: Inline Operations (lambda_realworld.py)</h3>
          <PythonFileLoader fileModule={lambdaRealWorld} title="lambda_realworld.py" highlightLines={[]} />
          <p className="text-gray-400 text-sm">Practical examples: sorting with custom keys, filtering data, transforming sequences.</p>
        </div>
      </section>

      {/* ========== SECTION 5: TIPS & TRICKS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          💡 <span>Tips & Tricks (Professional Level)</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong className="text-purple-300">Use lambdas for simple transformations</strong> – Great for `map()`, `filter()`, `sorted()` keys.</li>
          <li><strong className="text-purple-300">Avoid complex logic in lambdas</strong> – If you need `if`‑`else` blocks or loops, write a `def`.</li>
          <li><strong className="text-purple-300">Conditional expressions work</strong> – `lambda x: "even" if x%2==0 else "odd"` is fine.</li>
          <li><strong className="text-purple-300">Lambdas capture variables from outer scope</strong> – Be careful with late binding in loops.</li>
          <li><strong className="text-purple-300">Use `functools.reduce` with lambdas</strong> – For cumulative operations, but readability suffers.</li>
        </ul>
      </section>

      {/* ========== SECTION 6: COMMON PITFALLS ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          ⚠️ <span>Common Pitfalls</span>
        </h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Trying to use statements (like `return`, `print`)</p>
            <p className="text-gray-300">Lambdas only allow expressions. `lambda x: print(x)` is technically allowed (print returns None), but not typical.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Overusing lambdas, harming readability</p>
            <p className="text-gray-300">A named function can be clearer; don't cram complex logic into a lambda.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Late binding in loops (common gotcha)</p>
            <p className="text-gray-300">Creating lambdas in a loop that reference the loop variable – they all see the final value.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ No type hints</p>
            <p className="text-gray-300">Lambdas don't support type annotations, which can make code less self‑documenting.</p>
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
            <li>Keep lambdas short (one line, simple expression). If it grows, convert to `def`.</li>
            <li>Use lambdas primarily as arguments to higher‑order functions (`map`, `filter`, `sorted`).</li>
            <li>Avoid assigning lambdas to variables; just use `def` for named functions.</li>
            <li>If a lambda needs a docstring or type hints, it's a sign you should use `def`.</li>
            <li>Be mindful of variable capture – use default arguments to bind loop variables if necessary.</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 8: MINI CHECKLIST ========== */}
      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📋 <span>Mini Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Syntax: `lambda args: expression`</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Returns the expression value</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> No statements allowed</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Often used as inline functions</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Prefer `def` for complex logic</div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg"><span className="text-green-400">✔️</span> Great for `key` in sorting</div>
        </div>
      </section>

      {/* ========== SECTION 9: HINT SECTION ========== */}
      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> What is the difference between `lambda x: x*2` and `def double(x): return x*2`? When would you choose one over the other?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Write a lambda that returns the larger of two numbers (use the conditional expression).</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why can't lambdas contain `while` loops or `if` statements? How would you work around that?</p>
        </div>
      </section>

      {/* ========== SECTION 10: FAQ ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.85s" }}>
        <FAQTemplate title="Lambda Functions FAQs" questions={questions} />
      </section>

      {/* ========== SECTION 11: TEACHER'S NOTE ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher note={
          "Lambdas are a functional programming feature that many students find intriguing. 🧑‍🏫 " +
          "I tell them: 'Lambdas are like sticky notes – great for quick reminders, but you wouldn't write a novel on one.' " +
          "Show how `sorted(students, key=lambda s: s['age'])` is more concise than defining a separate function. " +
          "Emphasise the expression‑only limitation: `lambda x: x+1` works, `lambda x: x+=1` doesn't. " +
          "The late‑binding gotcha is important: `funcs = [lambda i=i: i for i in range(3)]` to capture current value. " +
          "Exercise: convert a list of temperatures from Celsius to Fahrenheit using `map` and a lambda."
        } />
      </section>

      {/* ========== SVG ILLUSTRATION ========== */}
      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="560" height="220" viewBox="0 0 560 220" className="max-w-full h-auto">
            <rect x="20" y="20" width="220" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="130" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">lambda x, y: x + y</text>
            <text x="130" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">↑ arguments</text>
            <text x="130" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">expression</text>

            <line x1="240" y1="60" x2="280" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />

            <rect x="290" y="20" width="250" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="415" y="45" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">sorted(pairs,</text>
            <text x="415" y="65" fill="white" fontSize="13" textAnchor="middle" fontFamily="monospace">key=lambda p: p[1])</text>
            <text x="415" y="85" fill="#fbbf24" fontSize="11" textAnchor="middle">inline usage</text>

            <rect x="20" y="130" width="520" height="60" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" rx="6" strokeDasharray="4,4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="280" y="155" fill="#fcd34d" fontSize="12" textAnchor="middle">💡 Lambdas are anonymous, single‑expression functions. Great for short callbacks.</text>
            <text x="280" y="175" fill="#9ca3af" fontSize="11" textAnchor="middle">Use `def` for anything longer than a line or needing statements.</text>

            <defs><marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" /></marker></defs>
          </svg>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Lambda functions provide a compact way to define small, one‑line functions, often used as arguments to other functions.</p>
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