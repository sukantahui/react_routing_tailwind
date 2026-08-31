import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import randomDemoCode from "./topic3_files/PseudoRandomNumberGenerationDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            RNG Foundations
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Generating Pseudo-Random Numbers with <code className="text-emerald-400 font-mono">Math.random()</code> &amp; <code className="text-emerald-400 font-mono">java.util.Random</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to generate bounded random integers, coin flips, and Gaussian normal distributions using <code className="text-emerald-300 font-mono">Math.random()</code> and <code className="text-emerald-300 font-mono">java.util.Random</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={randomDemoCode}
          title="PseudoRandomNumberGenerationDemo.java"
          highlightLines={[7, 16, 20, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="RNG FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 3: Random Number Generation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic3_random_numbers_note.txt"
        />
      </section>

      <Teacher
        note="Math.random() is great for simple games or dice rolls, but NEVER use it for generating banking OTPs or passwords because it is predictable! — Sukanta Hui"
      />
    </div>
  );
}