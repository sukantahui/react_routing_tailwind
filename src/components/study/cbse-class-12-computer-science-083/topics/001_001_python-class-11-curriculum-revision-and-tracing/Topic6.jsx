import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Type, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/string_slicing_and_methods_lab.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Text Processing
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              String Processing: Indexing, Slicing [start:stop:step] &amp; Built-in Text Methods
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master text manipulation and character sequence analytics. Explore positive and negative indexing, advanced slicing algorithms, string immutability, and built-in methods like split(), join(), find(), and count().
            </p>
          </div>
        </div>

        {/* 2. Visual Slicing Diagram */}
        <div className="bg-slate-950/90 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Type size={18} className="text-sky-400" /> String Indexing Architecture ("PYTHON")
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-slate-900 text-sky-400">
                  <th className="p-2 border border-slate-800">Positive Index</th>
                  <td className="p-2 border border-slate-800">0</td>
                  <td className="p-2 border border-slate-800">1</td>
                  <td className="p-2 border border-slate-800">2</td>
                  <td className="p-2 border border-slate-800">3</td>
                  <td className="p-2 border border-slate-800">4</td>
                  <td className="p-2 border border-slate-800">5</td>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-950 font-bold text-white text-sm">
                  <th className="p-2 border border-slate-800 bg-slate-900 text-slate-400">Character</th>
                  <td className="p-2 border border-slate-800 text-emerald-400">P</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">Y</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">T</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">H</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">O</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">N</td>
                </tr>
                <tr className="bg-slate-900 text-amber-400">
                  <th className="p-2 border border-slate-800">Negative Index</th>
                  <td className="p-2 border border-slate-800">-6</td>
                  <td className="p-2 border border-slate-800">-5</td>
                  <td className="p-2 border border-slate-800">-4</td>
                  <td className="p-2 border border-slate-800">-3</td>
                  <td className="p-2 border border-slate-800">-2</td>
                  <td className="p-2 border border-slate-800">-1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: String Slicing &amp; Text Methods</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="string_slicing_and_methods_lab.py"
            highlightLines={[12, 13, 14, 15, 27, 28, 33]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: String Processing"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Note the difference between find() and index(): str.find() returns -1 when a substring is missing, whereas str.index() crashes with a ValueError! In CBSE board Section A, this is a very common trick question. — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 6)"
            filename="topic6_string_processing_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
