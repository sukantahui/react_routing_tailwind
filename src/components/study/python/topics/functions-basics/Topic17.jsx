import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic17_files/topic17_questions";

// Python example files (place in topic17_files/)
import syntaxErrors from "./topic17_files/syntax_errors.py?raw";
import runtimeErrors from "./topic17_files/runtime_errors.py?raw";
import debuggingTechniques from "./topic17_files/debugging_techniques.py?raw";
import debuggingRealWorld from "./topic17_files/debugging_realworld.py?raw";

export default function Topic17() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🐛 Common Errors and Debugging in Functions
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            Even experienced programmers make mistakes. The key is knowing how to <strong className="text-blue-300">identify</strong>,
            <strong className="text-yellow-300"> understand</strong>, and <strong className="text-green-300">fix</strong> errors.
            This topic covers the most common errors in Python functions and effective debugging strategies.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <pre className="text-sm font-mono text-emerald-300">
{`# Common error: UnboundLocalError
count = 0
def increment():
    count += 1  # Error! count is local because of assignment
increment()`}
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-red-500 pl-4">
          🔍 Types of Errors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="text-red-300 text-xl mb-2">SyntaxError</div>
            <p className="text-gray-300">Code violates Python grammar (missing colon, parentheses, indentation). Detected before execution.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def f():  # missing colon? No, missing body?</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">NameError</div>
            <p className="text-gray-300">Using a variable or function that hasn't been defined.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">print(undefined_var)</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
            <div className="text-orange-300 text-xl mb-2">TypeError</div>
            <p className="text-gray-300">Wrong type of argument, missing arguments, or unsupported operation.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">len(42)  # int has no len()</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="text-purple-300 text-xl mb-2">UnboundLocalError</div>
            <p className="text-gray-300">Referencing a local variable before assignment (common with globals).</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def f(): print(x); x = 5</pre>
          </div>
        </div>
      </section>

      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Syntax Errors (syntax_errors.py)</h3>
          <PythonFileLoader fileModule={syntaxErrors} title="syntax_errors.py" highlightLines={[]} />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Runtime Errors (runtime_errors.py)</h3>
          <PythonFileLoader fileModule={runtimeErrors} title="runtime_errors.py" highlightLines={[]} />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Debugging Techniques (debugging_techniques.py)</h3>
          <PythonFileLoader fileModule={debuggingTechniques} title="debugging_techniques.py" highlightLines={[]} />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World Debugging (debugging_realworld.py)</h3>
          <PythonFileLoader fileModule={debuggingRealWorld} title="debugging_realworld.py" highlightLines={[]} />
        </div>
      </section>

      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">💡 Tips & Tricks (Debugging)</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong>Use `print()` strategically</strong> – Print variable values at different points to see where things go wrong.</li>
          <li><strong>Read the full traceback</strong> – The last line tells the error type, but earlier lines show the call stack.</li>
          <li><strong>Use `pdb` – Python Debugger</strong> – `import pdb; pdb.set_trace()` drops you into an interactive debugger.</li>
          <li><strong>Isolate the problem</strong> – Comment out code or create a minimal reproducible example.</li>
          <li><strong>Use `assert` statements</strong> – Check assumptions: `assert x > 0, "x must be positive"`.</li>
        </ul>
      </section>

      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls in Functions</h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ UnboundLocalError with globals</p>
            <p className="text-gray-300">Assigning to a variable inside a function makes it local. Use `global` if you intend to modify a global.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Mutable default arguments</p>
            <p className="text-gray-300">Defaults like `def f(lst=[])` share the same list across calls. Use `None` instead.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting to return a value</p>
            <p className="text-gray-300">If a function doesn't return, it returns `None`. This can cause `AttributeError` if you try to call methods on `None`.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Indentation errors</p>
            <p className="text-gray-300">Mixing tabs and spaces or incorrect indentation leads to `IndentationError` or unexpected logic.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">✅ Best Practices for Debugging</h2>
        <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-5">
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Write small functions and test each one individually.</li>
            <li>Use `try`/`except` to handle expected errors gracefully.</li>
            <li>Log errors with meaningful messages using the `logging` module.</li>
            <li>Use an IDE with a debugger (VS Code, PyCharm) for breakpoints and variable inspection.</li>
            <li>Add `assert` statements for invariants and preconditions.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.6s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> What does the traceback tell you? Where did the error actually occur?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Use `pdb` to step through a function that has an error. How does it help?</p>
          <p className="mt-2">🔍 <strong>Think about:</strong> Why is printing variables sometimes not enough? When would you need a full debugger?</p>
        </div>
      </section>

      <section className="reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <FAQTemplate title="Common Errors & Debugging FAQs" questions={questions} />
      </section>

      <section className="reveal-fade-up" style={{ animationDelay: "0.8s" }}>
        <Teacher note={
          "Debugging is a skill that improves with practice. 🧑‍🏫 " +
          "I tell students: 'The error message is your friend – read it carefully.' " +
          "Demonstrate using `pdb` live: set a breakpoint, print variables, step through code. " +
          "Also show common mistakes like mutable defaults and UnboundLocalError. " +
          "Exercise: give them a buggy function and ask them to fix it using print debugging, then using pdb."
        } />
      </section>

      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="560" height="180" viewBox="0 0 560 180" className="max-w-full h-auto">
            <rect x="20" y="20" width="520" height="60" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="280" y="45" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">Traceback (most recent call last):</text>
            <text x="280" y="65" fill="#94a3b8" fontSize="13" textAnchor="middle">  File "script.py", line 5, in &lt;module&gt;  →  NameError: name 'x' is not defined</text>
            <rect x="20" y="100" width="520" height="50" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="280" y="130" fill="#fbbf24" fontSize="13" textAnchor="middle">💡 Read the error type and the line number – that's where to start!</text>
          </svg>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .reveal-fade-up { animation: fadeUp 0.6s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        @media (prefers-reduced-motion: reduce) { .reveal-fade-up { animation: none; opacity: 1; } }
      `}</style>
    </div>
  );
}