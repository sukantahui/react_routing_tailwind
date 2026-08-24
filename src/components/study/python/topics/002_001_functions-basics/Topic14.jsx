import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";

import globalBasic from "./topic14_files/global_basic.py?raw";
import globalMultiple from "./topic14_files/global_multiple.py?raw";
import globalVsNonlocal from "./topic14_files/global_vs_nonlocal.py?raw";
import globalRealWorld from "./topic14_files/global_realworld.py?raw";

export default function Topic14() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌐 Global Keyword and Modifying Global Variables
        </h1>
        <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
          <pre className="text-sm font-mono text-emerald-300">
{`counter = 0

def increment():
    global counter   # declare that we want to modify the global counter
    counter += 1

increment()
print(counter)  # 1`}
          </pre>
        </div>
      </section>

      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">📝 `global` Statement Rules</h2>
        <ul className="list-disc list-inside text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li>Must be used inside a function to modify a global variable.</li>
          <li>Can declare multiple variables: `global a, b, c`.</li>
          <li>Cannot use `global` outside a function.</li>
          <li>Reading a global does not need `global`.</li>
        </ul>
      </section>

      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">💻 Live Python Examples</h2>
        <div className="space-y-3"><PythonFileLoader fileModule={globalBasic} title="global_basic.py" highlightLines={[]} /></div>
        <div className="space-y-3"><PythonFileLoader fileModule={globalMultiple} title="global_multiple.py" highlightLines={[]} /></div>
        <div className="space-y-3"><PythonFileLoader fileModule={globalVsNonlocal} title="global_vs_nonlocal.py" highlightLines={[]} /></div>
        <div className="space-y-3"><PythonFileLoader fileModule={globalRealWorld} title="global_realworld.py" highlightLines={[]} /></div>
      </section>

      <section className="space-y-4 reveal-fade-up"><h2 className="text-2xl font-semibold">💡 Tips & Tricks</h2><ul className="list-disc list-inside text-gray-300 bg-gray-800/50 p-5 rounded-xl"><li>Avoid `global` when possible – pass values as arguments and return results.</li><li>For configuration, use a module‑level variable and import it.</li></ul></section>
      <section className="reveal-fade-up"><FAQTemplate title="Global Keyword FAQs" questions={questions} /></section>
      <section className="reveal-fade-up"><Teacher note={"`global` is often overused. Teach students that functions should ideally be pure (no side effects). Use `global` only for truly global state like counters or configuration."} /></section>
      <style>{`...`}</style>
    </div>
  );
}