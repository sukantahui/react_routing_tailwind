import React, { useState } from 'react';
import { 
  Plus, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, Type
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const ConcatenationStudio = () => {
  const [baseStr, setBaseStr] = useState("Information Technology");
  const [appendStr, setAppendStr] = useState(" for me");
  const [methodChoice, setMethodChoice] = useState('concat'); // 'concat', 'plus'

  const concatenated = methodChoice === 'concat' ? baseStr.concat(appendStr) : baseStr + appendStr;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Plus className="w-3.5 h-3.5" /> String Joining Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            String Concatenation: `str.concat()` vs `+` Operator
          </h2>
        </div>
        
        <div className="flex gap-2">
          {['concat', 'plus'].map(m => (
            <button
              key={m}
              onClick={() => setMethodChoice(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer font-mono ${
                methodChoice === m ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {m === 'concat' ? 'str.concat(...)' : 'str + "..."'}
            </button>
          ))}
        </div>
      </div>

      {/* String Inputs */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Base String (`str`):
          </label>
          <input
            type="text"
            value={baseStr}
            onChange={(e) => setBaseStr(e.target.value)}
            className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Append String:
          </label>
          <input
            type="text"
            value={appendStr}
            onChange={(e) => setAppendStr(e.target.value)}
            className="w-full bg-slate-900 text-emerald-400 font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
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
{`String str = "${baseStr}";
String result = ${methodChoice === 'concat' ? `str.concat("${appendStr}");` : `str + "${appendStr}";`}

System.out.println(result);`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              Concatenation Output:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-emerald-300 font-bold">
              "{concatenated}"
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            Note: The original variable `str` remains "{baseStr}". Only `result` holds the new string.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            String Concatenation: Joining Strings via <code className="text-emerald-400 font-mono">concat()</code> and <code className="text-sky-400 font-mono">+</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the two mechanisms of text concatenation in Java, explore evaluation precedence with numbers, and learn how to chain text fragments seamlessly.
          </p>
        </div>

        {/* Studio */}
        <ConcatenationStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • String Concatenation"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – String Concatenation Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Note (.txt)"
          downloadFileName="004_003_topic1_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In CBSE board questions, watch out for integer addition mixed with concatenation: `10 + 20 + 'Java'` produces `'30Java'`, but `'Java' + 10 + 20` produces `'Java1020'` due to left-to-right evaluation! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic1;
