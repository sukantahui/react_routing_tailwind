import React, { useState } from 'react';
import { 
  FileCheck2, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Trophy
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

const FourPartExamStudio = () => {
  const sample = "Information Technology";
  const [activePart, setActivePart] = useState(0);

  const parts = [
    {
      id: 0,
      task: "(i) Find the position of 's' in `str`",
      stmt: "int pos = str.indexOf('s');",
      output: "-1 (Character 's' does not exist in 'Information Technology')",
      badge: "Method: indexOf()"
    },
    {
      id: 1,
      task: "(ii) Find the length of `str`",
      stmt: "int len = str.length();",
      output: "22 (11 chars + 1 space + 10 chars)",
      badge: "Method: length()"
    },
    {
      id: 2,
      task: "(iii) Replace 'Technology' with 'Science' in `str`",
      stmt: 'str = str.replace("Technology", "Science");',
      output: '"Information Science"',
      badge: "Method: replace()"
    },
    {
      id: 3,
      task: "(iv) Concatenate ' for me' at the end of `str`",
      stmt: 'str = str.concat(" for me");',
      output: '"Information Technology for me"',
      badge: "Method: concat()"
    }
  ];

  const curr = parts[activePart];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Trophy className="w-3.5 h-3.5" /> CBSE Board Standard 4-Mark Problem
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Solving the 4-Part String Operation Problem with Precision
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `str = "Information Technology"`
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {parts.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActivePart(idx)}
            className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-left ${
              activePart === idx
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/30'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <div className="text-[10px] text-slate-500 mb-0.5">Part {idx + 1}</div>
            <div className="truncate">{p.task.split(' ')[1]} {p.task.split(' ')[2]}</div>
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">{curr.task}</h3>
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            {curr.badge}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Exact Required Java Statement:
          </span>
          <pre className="text-sm font-mono text-emerald-400 bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto font-bold">
{curr.stmt}
          </pre>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
          <span className="text-slate-400 font-bold block">Evaluation Output & Explanation:</span>
          <div className="text-sky-300 font-mono text-sm">{curr.output}</div>
        </div>
      </div>
    </div>
  );
};

const Topic8 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 8
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Solving Board Exam String Operation Questions with Precision
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the classic 4-part Section B board question covering indexOf(), length(), replace(), and concat() on the string "Information Technology".
          </p>
        </div>

        {/* Studio */}
        <FourPartExamStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • 4-Part String Questions"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – 4-Part String Solutions Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 8 Note (.txt)"
          downloadFileName="004_003_topic8_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="This 4-part question (position of 's', length, replace, concat) appeared in Army Public School Barrackpore and CBSE sample papers. Writing `str.indexOf('s')`, `str.length()`, `str.replace(...)`, and `str.concat(...)` guarantees an easy 4/4 marks! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic8;
