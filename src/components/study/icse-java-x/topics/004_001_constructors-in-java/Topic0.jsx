import React, { useState, useEffect } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/ConstructorBasicsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

/**
 * Interactive Constructor Execution Tracer
 * Visualizes the 4-step object lifecycle:
 * 1. Stack Reference -> 2. Heap Allocation -> 3. Zero-Initialization -> 4. Constructor Body Execution
 */
const ConstructorExecutionTracer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Step 1: Reference Declaration on Stack",
      code: "ConstructorBasicsDemo s1;",
      stack: "s1 = uninitialized (null reference)",
      heap: "No memory allocated on Heap yet",
      desc: "The JVM creates a reference variable 's1' on the Stack frame. It points to nothing."
    },
    {
      title: "Step 2: 'new' Memory Allocation on Heap",
      code: "new ConstructorBasicsDemo()",
      stack: "s1 = [waiting for address]",
      heap: "Allocated 48 bytes at address @0x7b92a",
      desc: "The 'new' operator calculates class memory footprint and reserves space on the Heap."
    },
    {
      title: "Step 3: Default Zero-Initialization of Fields",
      code: "JVM Default Zero Fill",
      stack: "s1 -> @0x7b92a",
      heap: "studentName: null | rollNumber: 0 | percentage: 0.0",
      desc: "Before your constructor code runs, Java automatically fills primitive fields with 0/0.0/false and references with null."
    },
    {
      title: "Step 4: Constructor Body Execution",
      code: "public ConstructorBasicsDemo() { ... }",
      stack: "s1 -> @0x7b92a",
      heap: "studentName: 'Unassigned Student' | rollNumber: 100 | percentage: 0.0",
      desc: "Your explicit constructor body executes line-by-line, populating fields with your custom initial state!"
    }
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            🔄 Interactive Constructor Execution Lifecycle
          </h3>
          <p className="text-xs text-slate-400">
            Step-by-step memory trace showing Stack reference creation, Heap allocation, and Constructor execution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-all"
          >
            ◀ Prev Step
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={clsx(
              "px-4 py-1.5 text-xs font-bold rounded-lg shadow-md transition-all",
              isPlaying
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                : "bg-emerald-500 text-white hover:bg-emerald-400"
            )}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play Lifecycle"}
          </button>
          <button
            onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-all"
          >
            Next Step ▶
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step Indicator & Code Snippet */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="text-sky-400 font-bold">{steps[currentStep].title}</span>
            <span>Step {currentStep + 1} of 4</span>
          </div>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
            <code>{steps[currentStep].code}</code>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
            💡 {steps[currentStep].desc}
          </p>
        </div>

        {/* Memory State Visualization */}
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-sky-500/30">
            <div className="text-[11px] text-sky-400 font-bold uppercase mb-1">Stack Frame (Local Reference)</div>
            <div className="text-slate-300">{steps[currentStep].stack}</div>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30">
            <div className="text-[11px] text-emerald-400 font-bold uppercase mb-1">Heap Memory (Object Memory Space)</div>
            <div className="text-slate-300">{steps[currentStep].heap}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Constructors in Java
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Need, Purpose & Lifecycle of Java Constructors
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understanding automatic object state initialization, memory allocation on Heap, and core rules of constructors for ICSE Computer Applications.
        </p>
      </header>

      {/* 2. Interactive Memory Diagram */}
      <section>
        <ConstructorExecutionTracer />
      </section>

      {/* 3. Deep Concept Explanation */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>💡 Core Theory & ICSE Examination Rules</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-sky-400">Why Do We Need Constructors?</h3>
            <p>
              When an object is created, its instance fields need default or specific starting values. Without a constructor, variables remain zero-filled or uninitialized, leading to runtime null pointer bugs.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
              <li>Ensures objects are created in a valid, safe state.</li>
              <li>Eliminates manual setter method calls after creation.</li>
              <li>Executed automatically during <code className="text-amber-300">new</code> operator execution.</li>
            </ul>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400">3 Golden Rules of Constructors</h3>
            <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-400">
              <li><strong className="text-slate-200">Exact Name Match:</strong> Must match the class name character-for-character (case-sensitive).</li>
              <li><strong className="text-slate-200">No Return Type:</strong> Must NOT specify any return type (not even <code className="text-amber-300">void</code>).</li>
              <li><strong className="text-slate-200">No Direct Call:</strong> Cannot be invoked directly using dot operator (<code className="text-slate-400">obj.Constructor()</code> is invalid).</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Java Code Loader */}
      <section>
        <JavaFileLoader
          fileName="ConstructorBasicsDemo.java"
          code={demoCode}
          title="Executable Program: Need & Purpose of Java Constructors"
        />
      </section>

      {/* 5. ICSE Exam Questions FAQ */}
      <section>
        <FAQTemplate questions={questions} title="ICSE Board Quiz: Constructor Basics" />
      </section>

      {/* 6. Teacher Note & Printable Cheat Sheet */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Teacher note="Always remember for ICSE Section B programs: Do NOT write void before constructor name! Writing 'void Student()' turns it into a regular method and ICSE examiners deduct 2 to 3 marks." />
        <PlainTextPrint content={noteText} title="Printable Cheat Sheet: Topic 0 Notes" />
      </section>
    </div>
  );
};

export default Topic0;
