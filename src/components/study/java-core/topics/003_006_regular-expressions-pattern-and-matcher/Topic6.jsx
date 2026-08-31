import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import charClassDemoCode from "./topic6_files/RegexCharacterClassesMasteryDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Character Sets
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Character Classes: <code className="text-emerald-400 font-mono">[abc]</code>, Negated <code className="text-rose-400 font-mono">[^abc]</code> &amp; Ranges <code className="text-sky-400 font-mono">[a-zA-Z]</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to define precise sets and ranges: validating Indian PAN cards, filtering alphanumeric passwords, and performing set intersection operations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={charClassDemoCode}
          title="RegexCharacterClassesMasteryDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 18, 22, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Character Classes FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 6: Character Classes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic6_character_classes_note.txt"
        />
      </section>

      <Teacher
        note="Character classes give you total control over accepted characters! For example, Indian PAN cards are strictly '[A-Z]{5}[0-9]{4}[A-Z]'—5 letters, 4 digits, and 1 letter! — Sukanta Hui"
      />
    </div>
  );
}