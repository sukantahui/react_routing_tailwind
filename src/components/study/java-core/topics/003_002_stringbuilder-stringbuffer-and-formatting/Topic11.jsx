import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2, Database, Code2, ShieldAlert } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import templateDemoCode from "./topic11_files/RealWorldTemplateBuilderCapstoneDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Real-World Architecture: Building SQL Queries, JSON Payloads &amp; HTML Templates
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize all mutable buffers, format specifiers, and Java 15 Text Blocks into an enterprise microservice reporting layer: generating dynamic SQL statements and formatted JSON payloads.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Architecture &amp; Templating</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              Putting It All Together: Dynamic SQL, JSON &amp; HTML in Enterprise Java
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Hello, developer! In production Java microservices, you will constantly generate multi-line database queries (SQL, JPQL), configuration payloads, outgoing API responses (JSON, XML), and transactional email notifications (HTML).
          Before Java 15, engineers had to write messy string concatenations with escaped quotes <code className="text-amber-300 font-mono">\"</code> and ugly <code className="text-amber-300 font-mono">\n</code> characters, or build cumbersome loops with <code className="text-sky-300 font-mono">StringBuilder</code>.
          Now, by pairing <strong>Java 15 Text Blocks</strong> with fluent <code className="text-emerald-300 font-mono">.formatted(...)</code> and leveraging <code className="text-sky-300 font-mono">StringBuilder</code> for variable loop batches, your code stays clean, readable, and lightning-fast.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Database size={16} />
              <span>Multi-Line SQL Queries</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Text blocks let you paste SQL queries straight from MySQL Workbench or pgAdmin with complete multi-line formatting intact. No trailing spaces or string-plus concats required.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <Code2 size={16} />
              <span>Clean JSON Payloads</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Double quotes are natively allowed inside Text Blocks! You can write standard JSON keys and values <code className="text-slate-300 font-mono">"status": "%s"</code> without ugly backslash escaping.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <ShieldAlert size={16} />
              <span>Production Security Rule</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use <code className="text-emerald-300 font-mono">.formatted()</code> for static structures, reporting, and internal logs. For live database queries with user input, always use <code className="text-slate-300 font-mono">PreparedStatement</code> parameters to prevent SQL injection!
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Architecture Decision Blueprint:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><strong>Static Templates with Variables:</strong> Use Java 15 Text Blocks + <code className="text-emerald-300 font-mono">.formatted(...)</code> for fixed structural layouts (SQL views, JSON API responses, HTML emails).</li>
            <li><strong>Dynamic Loop Batching:</strong> Use <code className="text-sky-300 font-mono">StringBuilder</code> inside loops when the number of items is dynamic (e.g. generating CSV exports or multi-value batch inserts).</li>
            <li><strong>Thread-Safe Concurrency:</strong> Use <code className="text-purple-300 font-mono">StringBuffer</code> only if the buffer is a shared mutable field accessed concurrently across multiple worker threads.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={templateDemoCode}
          title="RealWorldTemplateBuilderCapstoneDemo.java"
          highlightLines={[12, 13, 23, 27, 28, 40, 48]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Template Capstone FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 11: Template Builder Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic11_template_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 003_002! You have mastered StringBuilder, StringBuffer, buffer capacity growth formulas, advanced format specifiers, and modern Java 15 Text Blocks! — Sukanta Hui"
      />
    </div>
  );
}