import React from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic15_files/topic15_questions";

import lifetime from "./topic15_files/lifetime.py?raw";
import namespace from "./topic15_files/namespace.py?raw";
import garbageCollection from "./topic15_files/garbage_collection.py?raw";
import lifetimeReal from "./topic15_files/lifetime_real.py?raw";

export default function Topic15() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          ⏳ Lifetime of Variables and Namespace Concept
        </h1>
        <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
          <pre className="text-sm font-mono text-emerald-300">
{`def create():
    x = 10      # x is created when function is called
    return x
# x is destroyed after function exits (unless returned)

y = create()   # y lives in global namespace`}
          </pre>
        </div>
      </section>

      <section className="space-y-8 reveal-fade-up">
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">💻 Live Examples</h2>
        <div><PythonFileLoader fileModule={lifetime} title="lifetime.py" /></div>
        <div><PythonFileLoader fileModule={namespace} title="namespace.py" /></div>
        <div><PythonFileLoader fileModule={garbageCollection} title="garbage_collection.py" /></div>
        <div><PythonFileLoader fileModule={lifetimeReal} title="lifetime_real.py" /></div>
      </section>

      <section className="reveal-fade-up"><FAQTemplate title="Namespace & Lifetime FAQs" questions={questions} /></section>
      <section className="reveal-fade-up"><Teacher note={"Namespaces are like directories for variable names. Lifetime of local variables is the function call. Use `del` to manually delete, but Python's garbage collector handles most cases."} /></section>
    </div>
  );
}