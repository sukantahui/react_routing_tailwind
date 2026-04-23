import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";

import localGlobal from "./topic13_files/local_global.py?raw";
import nestedScope from "./topic13_files/nested_scope.py?raw";
import scopeError from "./topic13_files/scope_error.py?raw";
import scopeRealWorld from "./topic13_files/scope_realworld.py?raw";

export default function Topic13() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌍 Scope of Variables: Local Scope and Global Scope
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            <strong className="text-blue-300">Scope</strong> determines where a variable can be accessed.
            Python has <strong className="text-yellow-300">local scope</strong> (inside a function) and
            <strong className="text-green-300"> global scope</strong> (outside any function).
            Variables defined inside a function are not visible outside it.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <pre className="text-sm font-mono text-emerald-300">
{`x = 10          # global variable

def my_func():
    y = 5       # local variable
    print(x)    # can access global (read-only)
    print(y)

my_func()
print(y)        # NameError! y is not global`}
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 Local vs Global – Key Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="text-yellow-300 text-xl mb-2">Local Scope</div>
            <p className="text-gray-300">Variables defined inside a function. They exist only while the function runs.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">def f(): a = 5  # a is local</pre>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="text-green-300 text-xl mb-2">Global Scope</div>
            <p className="text-gray-300">Variables defined at the top level of a module. Accessible everywhere, but assignment requires `global`.</p>
            <pre className="text-xs mt-2 bg-gray-900 p-2 rounded">x = 10   # global</pre>
          </div>
        </div>
      </section>

      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">💻 Live Python Examples</h2>
        <div className="space-y-3"><h3 className="text-xl font-medium text-yellow-300">1️⃣ Local vs Global (local_global.py)</h3><PythonFileLoader fileModule={localGlobal} title="local_global.py" highlightLines={[]} /></div>
        <div className="space-y-3"><h3 className="text-xl font-medium text-yellow-300">2️⃣ Nested Scopes (nested_scope.py)</h3><PythonFileLoader fileModule={nestedScope} title="nested_scope.py" highlightLines={[]} /></div>
        <div className="space-y-3"><h3 className="text-xl font-medium text-red-300">3️⃣ Scope Errors (scope_error.py)</h3><PythonFileLoader fileModule={scopeError} title="scope_error.py" highlightLines={[]} /></div>
        <div className="space-y-3"><h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World: Configuration (scope_realworld.py)</h3><PythonFileLoader fileModule={scopeRealWorld} title="scope_realworld.py" highlightLines={[]} /></div>
      </section>

      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">💡 Tips & Tricks</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li>Python looks up variables in LEGB order: Local, Enclosing, Global, Built‑in.</li>
          <li>Reading a global variable inside a function works without `global`; assigning requires `global`.</li>
          <li>Minimise global variables – they make code harder to debug.</li>
        </ul>
      </section>

      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls</h2>
        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
          <p className="font-bold text-red-300">❌ UnboundLocalError</p>
          <p className="text-gray-300">Assigning to a variable that is also read inside a function creates a local. If you intended global, use `global`.</p>
        </div>
      </section>

      <section className="reveal-fade-up" style={{ animationDelay: "0.5s" }}><FAQTemplate title="Scope FAQs" questions={questions} /></section>
      <section className="reveal-fade-up" style={{ animationDelay: "0.6s" }}><Teacher note={"Use the LEGB rule: Local → Enclosing → Global → Built‑in. Show students the `globals()` and `locals()` functions. A common exercise: write a function that tries to modify a global variable without `global` and observe the error."} /></section>

      <style>{`
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .reveal-fade-up { animation: fadeUp 0.6s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        @media (prefers-reduced-motion: reduce) { .reveal-fade-up { animation: none; opacity: 1; } }
      `}</style>
    </div>
  );
}