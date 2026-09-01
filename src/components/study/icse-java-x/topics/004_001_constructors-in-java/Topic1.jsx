import React, { useState } from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic1_files/DefaultConstructorDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

/**
 * Interactive Default Value Explorer Component
 * Demonstrates default primitive/reference zero-fill values assigned by Java compiler.
 */
const DefaultValueExplorer = () => {
  const [selectedType, setSelectedType] = useState("int");

  const types = {
    int: { label: "int / short / byte", value: "0", desc: "Integer numeric fields default to zero." },
    double: { label: "double / float", value: "0.0 / 0.0f", desc: "Floating-point numbers default to 0.0." },
    boolean: { label: "boolean", value: "false", desc: "Booleans default to false." },
    char: { label: "char", value: "'\\u0000' (Null char)", desc: "Character fields default to Unicode null character." },
    String: { label: "String / Object Ref", value: "null", desc: "All object references (Strings, Arrays, Objects) default to null." }
  };

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-sky-400">
          🔍 Compiler Default Zero-Fill Value Inspector
        </h3>
        <p className="text-xs text-slate-400">
          Select a Java data type to inspect its automatic default initialization value when no explicit value is assigned.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {Object.keys(types).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedType(key)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              selectedType === key
                ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="text-xs text-slate-400 font-mono mb-1">
            Data Type: <span className="text-sky-300 font-bold">{types[selectedType].label}</span>
          </div>
          <div className="text-sm font-semibold text-slate-200">
            {types[selectedType].desc}
          </div>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-base text-amber-300 font-bold min-w-[140px] text-center">
          Default: {types[selectedType].value}
        </div>
      </div>
    </div>
  );
};

const Topic1 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Default vs Non-Parameterized
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Default Constructor vs Non-Parameterized Constructor
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understanding compiler-supplied default constructors, default zero-fill memory states, and programmer-defined non-parameterized constructors.
        </p>
      </header>

      {/* Interactive Value Explorer */}
      <section>
        <DefaultValueExplorer />
      </section>

      {/* Theory & Comparison */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white">💡 Key Differences: Default vs User Non-Parameterized</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h3 className="font-bold text-amber-400">1. Compiler Default Constructor</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
              <li>Inserted <strong className="text-slate-200">automatically</strong> by Java compiler if NO constructors exist.</li>
              <li>Body contains no custom logic; only calls <code className="text-sky-300">super()</code>.</li>
              <li>Fills fields with standard zero/null values (e.g. <code className="text-amber-300">int -> 0</code>, <code className="text-amber-300">String -> null</code>).</li>
            </ul>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400">2. User Non-Parameterized Constructor</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
              <li>Explicitly written by the programmer in the source code.</li>
              <li>Takes 0 arguments but contains explicit custom initialization logic.</li>
              <li>Overrides and replaces compiler default constructor.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Demo */}
      <section>
        <JavaFileLoader
          fileName="DefaultConstructorDemo.java"
          code={demoCode}
          title="Executable Code: Non-Parameterized Constructor Demonstration"
        />
      </section>

      {/* FAQ & Quiz */}
      <section>
        <FAQTemplate questions={questions} title="ICSE Quiz: Default Constructor Rules" />
      </section>

      {/* Teacher Note & Print Notes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Teacher note="Beware of ICSE output questions: If a class defines 'Demo(int x)', calling 'new Demo()' causes a Compile-Time Error because Java revokes the default constructor once any constructor is explicitly declared!" />
        <PlainTextPrint content={noteText} title="Printable Cheat Sheet: Topic 1 Notes" />
      </section>
    </div>
  );
};

export default Topic1;
