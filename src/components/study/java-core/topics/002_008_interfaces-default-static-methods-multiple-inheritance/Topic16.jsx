import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cloudStorageDemoCode from "./topic16_files/RealWorldCloudStorageProviderCapstoneDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
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
            Module 002_008 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Real-World Architecture: <code className="text-emerald-400 font-mono">CloudStorageProvider</code> Capstone
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize all interface features (abstract, default, static, private, SAM) into a multi-cloud storage driver: supporting AWS S3, Azure Blob, and GCP.
        </p>
      </header>

      {/* Section 1: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cloudStorageDemoCode}
          title="RealWorldCloudStorageProviderCapstoneDemo.java"
          highlightLines={[10, 12, 16, 22, 28, 47]}
        />
      </section>

      {/* Section 2: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Cloud Storage Capstone FAQs"
          questions={questions}
        />
      </section>

      {/* Section 3: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_008 Topic 16: Cloud Storage Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_008_topic16_cloud_storage_note.txt"
        />
      </section>

      {/* Section 4: Teacher's Note */}
      <Teacher
        note="Congratulations on completing Module 002_008! You have mastered the full evolution of Java Interfaces—from pure abstract contracts to default, static, and private methods in modern cloud systems! — Sukanta Hui"
      />
    </div>
  );
}