import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import secDemoCode from "./topic12_files/DeserializationSecurityFilterCapstoneDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 12
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Security Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Deserialization Security Vulnerabilities (OWASP Top 10) &amp; <code className="text-emerald-400 font-mono">ObjectInputFilter</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Harden enterprise applications against Remote Code Execution: applying Java 9+ <code className="text-emerald-300 font-mono">ObjectInputFilter</code> allowlists to block untrusted gadget chain attacks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={secDemoCode}
          title="DeserializationSecurityFilterCapstoneDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 41, 42, 43, 44, 47]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Security FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 12: Serialization Security Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic12_serialization_security_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 005_005! You have mastered Object Serialization, Deserialization, transient modifiers, serialVersionUID versioning, Externalizable protocols, and OWASP ObjectInputFilter defense! — Sukanta Hui"
      />
    </div>
  );
}