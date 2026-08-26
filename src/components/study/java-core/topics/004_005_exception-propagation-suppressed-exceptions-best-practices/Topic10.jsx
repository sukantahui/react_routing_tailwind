import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import archDemoCode from "./topic10_files/CleanEnterpriseMultiTierArchitectureCapstoneDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Enterprise Capstone
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Clean Enterprise Multi-Tier Error Handling Architecture (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Architect production-grade enterprise resilience: orchestrating clean 3-tier error propagation across Repositories, Services, and REST Controllers with centralized logging.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={archDemoCode}
          title="CleanEnterpriseMultiTierArchitectureCapstoneDemo.java"
          highlightLines={[7, 10, 12, 13, 20, 24, 25, 33, 37, 40, 41]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Enterprise Architecture FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 10: Multi-Tier Architecture Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic10_multi_tier_architecture_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 004_005! You have mastered exception propagation, stack unwinding, forensic stack trace reading, exception chaining, avoiding anti-patterns, and designing 3-tier enterprise error architectures! — Sukanta Hui"
      />
    </div>
  );
}