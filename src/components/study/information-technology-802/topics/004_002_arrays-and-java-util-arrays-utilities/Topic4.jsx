import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Code, Zap, Layers, Cpu, Box
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const ArraysMethodsOverview = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Cpu className="w-3.5 h-3.5" /> Java Utility Framework
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Key Static Methods of <code className="text-emerald-400 font-mono">java.util.Arrays</code>
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `import java.util.Arrays;`
        </div>
      </div>

      {/* Grid of Methods */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            name: "Arrays.sort(arr)",
            desc: "Sorts numeric or string array into ascending order in-place using Dual-Pivot Quicksort / TimSort.",
            syntax: "Arrays.sort(Marks);"
          },
          {
            name: "Arrays.binarySearch(arr, key)",
            desc: "Searches sorted array in O(log N) time and returns the index of key or negative insertion point.",
            syntax: "int idx = Arrays.binarySearch(a, 35);"
          },
          {
            name: "Arrays.toString(arr)",
            desc: "Converts array into a clean string representation: '[93.0, 87.5, 97.5]'.",
            syntax: "System.out.println(Arrays.toString(a));"
          },
          {
            name: "Arrays.fill(arr, val)",
            desc: "Fills all elements with a uniform default value (e.g. setting all elements to -1).",
            syntax: "Arrays.fill(cache, -1);"
          },
          {
            name: "Arrays.equals(a1, a2)",
            desc: "Checks whether two arrays have identical length and identical elements in identical positions.",
            syntax: "boolean same = Arrays.equals(a, b);"
          },
          {
            name: "Arrays.copyOf(arr, len)",
            desc: "Truncates or pads a copy of the specified array to a new length.",
            syntax: "int[] copy = Arrays.copyOf(a, 10);"
          }
        ].map((m, idx) => (
          <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-sky-400 block">{m.name}</span>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300">
              {m.syntax}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The <code className="text-emerald-400 font-mono">java.util.Arrays</code> Utility Class
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Discover the essential static algorithms provided by the Java utility package for array operations including sorting, searching, equality checks, and string formatting.
          </p>
        </div>

        {/* Overview */}
        <ArraysMethodsOverview />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • java.util.Arrays Class"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Arrays Utilities Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note (.txt)"
          downloadFileName="004_002_topic4_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember: All methods in `java.util.Arrays` are static, so you must call them using `Arrays.sort(arr)` and NOT `arr.sort()`. And never forget `import java.util.Arrays;` at the top of your program! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic4;
