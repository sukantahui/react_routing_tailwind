import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import chainDemoCode from "./topic6_files/MethodChainingFluentPipelineDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Fluent Builder Pattern
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Chaining <code className="text-emerald-400 font-mono">StringBuilder</code> Methods Fluently (Fluent Interface Pattern)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how the <code className="text-emerald-300 font-mono">return this;</code> design pattern enables expressive, cascaded string assembly pipelines for SQL queries and enterprise JSON builders.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Design Patterns &amp; Clean Code</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              The Secret Behind Method Chaining: How 'return this' Works
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Have you ever wondered why you can link ten methods together on one object like this:<br />
          <code className="text-emerald-300 font-mono">sb.append("SELECT ").append("* ").append("FROM users");</code>?<br />
          This is called a <strong>Fluent Interface</strong>. The secret is ridiculously simple: every mutating method finishes by returning <code className="text-sky-300 font-mono">return this;</code>, handing back the exact same object reference so the next dot (<code className="text-amber-300 font-mono">.</code>) call can immediately execute!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertCircle size={16} />
              <span>Without Chaining</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Writing <code className="text-slate-200">sb.append("A"); sb.append("B"); sb.append("C");</code> requires repeating the variable name on every single line, cluttering your code.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Lightbulb size={16} />
              <span>The Conveyor Belt</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Picture a factory conveyor belt: the item passes from Station 1 (append) &rarr; Station 2 (insert) &rarr; Station 3 (reverse) without ever leaving the track!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 size={16} />
              <span>Assistant Rule of Thumb</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Format your chained calls vertically! Put each <code className="text-emerald-300 font-mono">.append(...)</code> on its own indented line to make complex text assembly read like a narrative.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-sky-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Chaining Best Practices:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><strong>Single Object Identity:</strong> All chained operations mutate the exact same buffer in heap memory—no intermediate garbage objects are allocated.</li>
            <li><strong>Finish with .toString():</strong> Conclude the builder pipeline with <code className="text-sky-300 font-mono">.toString()</code> to materialize the final immutable <code className="text-sky-300">String</code>.</li>
            <li><strong>Universal Enterprise Pattern:</strong> This exact pattern powers modern Java APIs: Java Streams (<code className="text-slate-300">.filter().map().collect()</code>), HTTP Clients, and Lombok builders.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={chainDemoCode}
          title="MethodChainingFluentPipelineDemo.java"
          highlightLines={[7, 15, 16, 17, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Method Chaining FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 6: Fluent Method Chaining"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic6_method_chaining_note.txt"
        />
      </section>

      <Teacher
        note="Fluent chaining is used everywhere in modern Java—from StringBuilder to Java 8 Streams and Spring Security builders! — Sukanta Hui"
      />
    </div>
  );
}