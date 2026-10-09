import React, { useState } from 'react';
import { 
  Replace, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, FileText
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const SubstringReplaceStudio = () => {
  const [sourceText, setSourceText] = useState("Information Technology");
  const [targetWord, setTargetWord] = useState("Technology");
  const [replaceWith, setReplaceWith] = useState("Science");

  const replacedResult = sourceText.replaceAll(targetWord, replaceWith);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Replace className="w-3.5 h-3.5" /> Text Transformation Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Substring Replacement via <code className="text-sky-400 font-mono">str.replace()</code>
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `str.replace(target, replacement)`
        </div>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Original Text (`str`):
          </label>
          <input
            type="text"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Target Word (`target`):
          </label>
          <input
            type="text"
            value={targetWord}
            onChange={(e) => setTargetWord(e.target.value)}
            className="w-full bg-slate-900 text-amber-300 font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            Replacement (`newVal`):
          </label>
          <input
            type="text"
            value={replaceWith}
            onChange={(e) => setReplaceWith(e.target.value)}
            className="w-full bg-slate-900 text-emerald-300 font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          />
        </div>
      </div>

      {/* Code & Result */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Generated Java Statement:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`String str = "${sourceText}";
String updated = str.replace("${targetWord}", "${replaceWith}");

System.out.println(updated); // Prints "${replacedResult}"`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-2">
              Transformed Result:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-sky-300 font-bold">
              "{replacedResult}"
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            Note: `str.replace()` replaces ALL occurrences of the target sequence across the entire string.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            String Replacement using <code className="text-sky-400 font-mono">str.replace()</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Learn how to perform character and word substitutions across strings in Java, understand case sensitivity, and write exact board examination text transformation statements.
          </p>
        </div>

        {/* Studio */}
        <SubstringReplaceStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • String replace() Method"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – String Replacement Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note (.txt)"
          downloadFileName="004_003_topic2_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In Section B string transformation questions (e.g. 'Given String str = 'Information Technology', write a Java statement to replace Technology with Science'), writing `str = str.replace('Technology', 'Science');` or `str.replace('Technology', 'Science')` will secure your 1 mark instantly! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic2;
