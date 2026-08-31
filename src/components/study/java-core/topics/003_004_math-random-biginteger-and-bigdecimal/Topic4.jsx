import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import secureRngDemoCode from "./topic4_files/SecureRandomSecurityMasteryDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 4
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Enterprise Security
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Cryptographically Secure Random: <code className="text-emerald-400 font-mono">java.security.SecureRandom</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build bulletproof authentication pipelines: generating 6-digit banking OTPs, password hashing salts, and cryptographically unpredictable tokens via OS hardware entropy.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={secureRngDemoCode}
          title="SecureRandomSecurityMasteryDemo.java"
          highlightLines={[7, 13, 14, 21, 23, 31, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Secure Random FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 4: SecureRandom in Java"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic4_securerandom_note.txt"
        />
      </section>

      <Teacher
        note="Never use java.util.Random or Math.random() for login tokens or password reset links! Hackers can predict the next numbers and hijack accounts. Always use SecureRandom! — Sukanta Hui"
      />
    </div>
  );
}