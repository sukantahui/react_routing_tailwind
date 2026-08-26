import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import radixDemoCode from "./topic11_files/CustomRadixParsingMasteryDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 11
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Radix Systems
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Parsing Strings with Custom Radices: Binary (<code className="text-emerald-400 font-mono">2</code>), Octal (<code className="text-sky-400 font-mono">8</code>) &amp; Hex (<code className="text-amber-400 font-mono">16</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master non-decimal conversions: parsing binary bitmasks, hexadecimal memory addresses, and base-36 alphanumeric strings up to <code className="text-emerald-300 font-mono">Character.MAX_RADIX</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={radixDemoCode}
          title="CustomRadixParsingMasteryDemo.java"
          highlightLines={[7, 14, 18, 22, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Radix Parsing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 11: Custom Radix Parsing"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic11_radix_parsing_note.txt"
        />
      </section>

      <Teacher
        note="If you are parsing hexadecimal color codes like '#FFFFFF', just strip the hash and call Integer.parseInt('FFFFFF', 16) to get the exact RGB integer! — Sukanta Hui"
      />
    </div>
  );
}
