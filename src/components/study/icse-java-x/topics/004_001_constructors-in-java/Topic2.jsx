import React, { useState } from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic2_files/ParameterizedConstructorDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

/**
 * Interactive 'this' Keyword & Variable Shadowing Inspector
 */
const ShadowingExplorer = () => {
  const [useThisKeyword, setUseThisKeyword] = useState(true);

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            🔍 Variable Shadowing & 'this' Keyword Simulator
          </h3>
          <p className="text-xs text-slate-400">
            Toggle between using 'this.name = name' vs 'name = name' to see how Java resolves object state initialization.
          </p>
        </div>

        <button
          onClick={() => setUseThisKeyword(!useThisKeyword)}
          className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
            useThisKeyword
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
              : "bg-amber-500/20 text-amber-400 border-amber-500/40"
          }`}
        >
          {useThisKeyword ? "✅ Using 'this' Keyword" : "⚠️ Without 'this' Keyword"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Snippet */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
          <div className="text-slate-400">// Constructor Definition</div>
          <div className="text-sky-300">public Student(String name, int roll) &#123;</div>
          <div className="pl-4 text-amber-300 font-bold">
            {useThisKeyword ? (
              <>
                <div>this.name = name;</div>
                <div>this.roll = roll;</div>
              </>
            ) : (
              <>
                <div>name = name; <span className="text-slate-500">// Assigns parameter to parameter!</span></div>
                <div>roll = roll;</div>
              </>
            )}
          </div>
          <div className="text-sky-300">&#125;</div>
        </div>

        {/* State Result */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Resulting Object State on Heap
          </div>
          <div className="font-mono text-xs space-y-2">
            <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400">instance field 'name':</span>
              <span className={useThisKeyword ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {useThisKeyword ? '"Rahul Sharma"' : "null (Unassigned!)"}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400">instance field 'roll':</span>
              <span className={useThisKeyword ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {useThisKeyword ? "101" : "0 (Unassigned!)"}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            {useThisKeyword
              ? "💡 'this.name' explicitly targets the current Heap object's field, ensuring data is saved."
              : "⚠️ Without 'this', parameter 'name' hides the instance variable (Shadowing), so instance field remains null!"}
          </p>
        </div>
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Parameterized Constructors & 'this'
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Parameterized Constructors & The 'this' Keyword
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to pass custom arguments during object creation and resolve instance variable shadowing using the Java 'this' reference.
        </p>
      </header>

      {/* Interactive Shadowing Explorer */}
      <section>
        <ShadowingExplorer />
      </section>

      {/* Theory */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white">💡 Core Principles of Parameterized Initialization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h3 className="font-bold text-sky-400">Custom State Instantiation</h3>
            <p>
              Parameterized constructors accept inputs during instantiation, enabling each object to start with unique attributes (e.g. unique account numbers, student names, or dimensions).
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400">Role of 'this' Keyword</h3>
            <p>
              The <code className="text-amber-300">this</code> keyword holds the memory reference of the current object. It cleanly separates <code className="text-sky-300">this.field</code> from method parameters.
            </p>
          </div>
        </div>
      </section>

      {/* Code Loader */}
      <section>
        <JavaFileLoader
          fileName="ParameterizedConstructorDemo.java"
          code={demoCode}
          title="Executable Code: Parameterized Constructor & 'this' Reference"
        />
      </section>

      {/* Quiz */}
      <section>
        <FAQTemplate questions={questions} title="ICSE Quiz: Parameterized Constructor & 'this'" />
      </section>

      {/* Teacher Note & Cheat Sheet */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Teacher note="ICSE Board Exam Tip: In Section B programming questions, if instance fields are named 'name' and 'roll', use 'this.name = name;' inside your parameterized constructor to score full marks for clean OOP style!" />
        <PlainTextPrint content={noteText} title="Printable Cheat Sheet: Topic 2 Notes" />
      </section>
    </div>
  );
};

export default Topic2;
