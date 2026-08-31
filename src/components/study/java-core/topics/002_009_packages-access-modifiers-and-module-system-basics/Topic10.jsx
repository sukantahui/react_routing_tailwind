import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cliDemoCode from "./topic10_files/CommandLinePackagingCompilationDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_009 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            CLI Tooling
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Compiling &amp; Running Packaged Java Files: <code className="text-emerald-400 font-mono">javac -d</code> &amp; <code className="text-emerald-400 font-mono">java -cp</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master terminal build workflows: using <code className="text-emerald-300 font-mono">javac -d</code> for automatic package directory creation and running fully qualified class names via classpath flags.
        </p>
      </header>

      {/* Section 1: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cliDemoCode}
          title="CommandLinePackagingCompilationDemo.java"
          highlightLines={[7, 14, 15, 19, 20]}
        />
      </section>

      {/* Section 2: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="CLI Packaging FAQs"
          questions={questions}
        />
      </section>

      {/* Section 3: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_009 Topic 10: CLI Packaging Compilation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_009_topic10_cli_packaging_note.txt"
        />
      </section>

      {/* Section 4: Teacher's Note */}
      <Teacher
        note="Never cd into the package folder and type 'java Main'! Always stay in the root folder, set -cp bin, and run 'com.coderaccotax.Main'. That is how real JVM servers execute code! — Sukanta Hui"
      />
    </div>
  );
}