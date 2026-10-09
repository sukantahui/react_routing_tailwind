import React, { useState } from 'react';
import { 
  AlertOctagon, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, ArrowUpDown, Search
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

const UnsortedSearchPitfall = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <AlertOctagon className="w-3.5 h-3.5" /> Algorithmic Invariant Visualizer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Why Binary Search Fails on Unsorted Arrays
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          The Two-Step Pattern
        </div>
      </div>

      {/* Dual Scenario Graphic */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" /> 1. Flawed Workflow (Unsorted Array)
          </div>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 leading-relaxed">
{`int[] a = { 80, 10, 45, 90, 20 };
// ❌ WRONG: Forgot to sort first!
int idx = Arrays.binarySearch(a, 10);
// Result: UNDEFINED / WRONG INDEX!`}
          </pre>
          <p className="text-xs text-rose-300/90 leading-relaxed">
            Binary search checks middle element (45). Since 10 &lt; 45, it discards the right half. But in unsorted data, elements can be anywhere, causing false negative search results!
          </p>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" /> 2. Standard Pattern (Sort then Search)
          </div>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 leading-relaxed">
{`int[] a = { 80, 10, 45, 90, 20 };

// Step 1: Mandatory Sort
Arrays.sort(a); // [10, 20, 45, 80, 90]

// Step 2: Reliable Binary Search
int idx = Arrays.binarySearch(a, 10);
// Result: Index 0 (Accurate & Fast!)`}
          </pre>
          <p className="text-xs text-emerald-300/90 leading-relaxed">
            Sorting restores the monotonic invariant. Binary search now accurately eliminates halves, guaranteeing $O(\log N)$ logarithmic speed.
          </p>
        </div>
      </div>
    </div>
  );
};

const Topic7 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 7
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Prerequisite for Binary Search: Why Sorting is Mandatory
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand why <code className="text-rose-400 font-mono">Arrays.binarySearch()</code> strictly requires an ascending sorted array, and master the two-step Sort-then-Search pattern.
          </p>
        </div>

        {/* Studio */}
        <UnsortedSearchPitfall />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Binary Search Prerequisites"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Binary Search Prerequisite Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 7 Note (.txt)"
          downloadFileName="004_002_topic7_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Whenever a CBSE board question asks you to write code for Binary Search using `java.util.Arrays`, ALWAYS write `Arrays.sort(array);` right before `Arrays.binarySearch(array, key);`. Leaving out `Arrays.sort()` is a guaranteed deduction of 1 mark! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic7;
