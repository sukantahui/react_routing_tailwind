import React, { useState } from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/ConstructorOverloadingDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

/**
 * Interactive Overloading Selector Visualizer
 */
const OverloadVisualizer = () => {
  const [selectedOverload, setSelectedOverload] = useState(0);

  const overloads = [
    {
      signature: "Shape()",
      params: "0 Arguments (Non-Parameterized)",
      code: "new Shape()",
      result: "Length = 0.0, Breadth = 0.0 | Area = 0.0",
      desc: "Invokes default non-parameterized constructor to initialize blank 0x0 shape."
    },
    {
      signature: "Shape(double side)",
      params: "1 Argument (double)",
      code: "new Shape(5.0)",
      result: "Length = 5.0, Breadth = 5.0 | Area = 25.0",
      desc: "Invokes 1-parameter constructor to initialize a Square object."
    },
    {
      signature: "Shape(double len, double brd)",
      params: "2 Arguments (double, double)",
      code: "new Shape(8.0, 4.0)",
      result: "Length = 8.0, Breadth = 4.0 | Area = 32.0",
      desc: "Invokes 2-parameter constructor to initialize a custom Rectangle object."
    }
  ];

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-sky-400">
          🔄 Interactive Constructor Overloading Matcher
        </h3>
        <p className="text-xs text-slate-400">
          Click a constructor signature to see how Java matches argument lists at compile time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {overloads.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOverload(idx)}
            className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
              selectedOverload === idx
                ? "bg-sky-500/20 text-sky-300 border-sky-400 ring-2 ring-sky-400/20"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            <div className="font-bold text-amber-300 mb-1">{item.signature}</div>
            <div className="text-[11px] text-slate-400 font-sans">{item.params}</div>
          </button>
        ))}
      </div>

      <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2 font-sans">
          <span className="text-slate-400">Matched Invocation:</span>
          <span className="text-emerald-400 font-bold">{overloads[selectedOverload].code}</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-amber-300">
          {overloads[selectedOverload].result}
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
          💡 {overloads[selectedOverload].desc}
        </p>
      </div>
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Constructor Overloading
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Constructor Overloading & Polymorphism
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Mastering compile-time polymorphism in Java by defining multiple constructors with distinct parameter lists within the same class.
        </p>
      </header>

      {/* Interactive Matcher */}
      <section>
        <OverloadVisualizer />
      </section>

      {/* Theory */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white">💡 Overloading Rules & Signature Matching</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h3 className="font-bold text-sky-400">Valid Overloading Criteria</h3>
            <p>Constructors must differ in one of 3 ways:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
              <li><strong>Number of Parameters:</strong> e.g. <code className="text-sky-300">()</code> vs <code className="text-sky-300">(int)</code> vs <code className="text-sky-300">(int, int)</code></li>
              <li><strong>Data Types:</strong> e.g. <code className="text-sky-300">(int)</code> vs <code className="text-sky-300">(double)</code></li>
              <li><strong>Sequence:</strong> e.g. <code className="text-sky-300">(int, String)</code> vs <code className="text-sky-300">(String, int)</code></li>
            </ul>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h3 className="font-bold text-amber-400">Invalid Overloading Traps</h3>
            <p className="text-xs text-slate-400">
              Changing variable names alone (e.g. <code className="text-amber-300">Demo(int x)</code> vs <code className="text-amber-300">Demo(int y)</code>) is NOT valid overloading and causes a duplicate constructor compile error.
            </p>
          </div>
        </div>
      </section>

      {/* Code Demo */}
      <section>
        <JavaFileLoader
          fileName="ConstructorOverloadingDemo.java"
          code={demoCode}
          title="Executable Code: Overloaded Constructor Shapes Program"
        />
      </section>

      {/* Quiz */}
      <section>
        <FAQTemplate questions={questions} title="ICSE Quiz: Constructor Overloading" />
      </section>

      {/* Teacher Note & Cheat Sheet */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Teacher note="ICSE Board Pattern: Question 4 of Section B often asks you to write a class like 'Employee' or 'Rectangle' containing two overloaded constructors. Always check that their parameter lists are distinct!" />
        <PlainTextPrint content={noteText} title="Printable Cheat Sheet: Topic 3 Notes" />
      </section>
    </div>
  );
};

export default Topic3;
