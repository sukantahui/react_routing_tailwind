import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tblDemoCode from "./topic4_files/HashMapNodeTableBucketsDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Bucket Array Internals
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Node&lt;K,V&gt;[] table</code> Array: Hash Buckets &amp; Linked Nodes
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace internal storage structures: inspecting the private <code className="text-emerald-300 font-mono">table</code> array and dissecting the 4 internal fields of <code className="text-purple-300 font-mono">Node&lt;K,V&gt;</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tblDemoCode}
          title="HashMapNodeTableBucketsDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 21, 27, 28, 33, 34, 35, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bucket Table FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 4: HashMap Node Table Buckets"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic4_hashmap_node_table_note.txt"
        />
      </section>

      <Teacher
        note="When you create a HashMap, the 'table' array is actually null initially! It is created lazily on your very first 'put()' call to save memory! That table array holds all the bucket heads! — Sukanta Hui"
      />
    </div>
  );
}