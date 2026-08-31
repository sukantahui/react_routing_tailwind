import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import defaultPkgDemoCode from "./topic6_files/DefaultPackageRisksDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
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
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_009 · Topic 6
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Production Best Practices
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Default Package &amp; Why Production Code Must NEVER Use It
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn why omitting the package statement creates unimportable legacy code, breaks Spring Boot component scanning, and violates Java 9 Module System standards.
        </p>
      </header>

      {/* Section 1: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={defaultPkgDemoCode}
          title="DefaultPackageRisksDemo.java"
          highlightLines={[7, 14, 18, 19, 20]}
        />
      </section>

      {/* Section 2: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Default Package FAQs"
          questions={questions}
        />
      </section>

      {/* Section 3: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_009 Topic 6: Default Package Risks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_009_topic6_default_package_note.txt"
        />
      </section>

      {/* Section 4: Teacher's Note */}
      <Teacher
        note="Never omit the package statement in real projects! If a class is in the default package, no other package can ever import it, making it completely useless for enterprise apps. — Sukanta Hui"
      />
    </div>
  );
}