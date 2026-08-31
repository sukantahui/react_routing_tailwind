import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import encDemoCode from "./topic5_files/CharacterCharsetsComparisonDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_002 · Topic 5
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Encoding Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Character Encodings &amp; Charsets: <code className="text-emerald-400 font-mono">UTF-8</code>, <code className="text-sky-400 font-mono">UTF-16</code>, <code className="text-amber-400 font-mono">ASCII</code> &amp; <code className="text-purple-400 font-mono">ISO-8859-1</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand international text representation: comparing variable-length UTF-8 with internal JVM UTF-16 and legacy 8-bit Latin charsets.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={encDemoCode}
          title="CharacterCharsetsComparisonDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 26, 29, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Charsets FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_002 Topic 5: Character Encodings & Charsets"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_002_topic5_character_charsets_note.txt"
        />
      </section>

      <Teacher
        note="Always use 'StandardCharsets.UTF_8' constant from java.nio.charset! Never type the string 'UTF-8' as a raw string literal to avoid UnsupportedEncodingException! — Sukanta Hui"
      />
    </div>
  );
}