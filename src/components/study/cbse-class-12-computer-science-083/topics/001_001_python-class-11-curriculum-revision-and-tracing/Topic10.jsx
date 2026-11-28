import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Table, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import pythonCode from "./topic10_files/board_output_tracing_master_suite.py?raw";

export default function Topic10() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 10
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Exam Output Tracing
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Section A Board Exam Output Tracing Problems &amp; Dry-Run Tables
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the exact methodology for scoring full marks in CBSE Class 12 Section A output questions. Learn systematic dry-run table construction, ASCII character shift tracking, and loop mutation traps.
            </p>
          </div>
        </div>

        {/* 2. Dry-Run Methodology Guide */}
        <div className="bg-slate-950/90 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Table size={18} className="text-sky-400" /> Standard 4-Column Examination Dry-Run Table
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse border border-slate-800">
              <thead>
                <tr className="bg-slate-900 text-sky-400">
                  <th className="p-2.5 border border-slate-800">Step #</th>
                  <th className="p-2.5 border border-slate-800">Loop Variable</th>
                  <th className="p-2.5 border border-slate-800">Condition / Logic</th>
                  <th className="p-2.5 border border-slate-800">Variable State Mutation</th>
                  <th className="p-2.5 border border-slate-800">Output Stream</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="bg-slate-950">
                  <td className="p-2 border border-slate-800">1</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">ch = 'P'</td>
                  <td className="p-2 border border-slate-800">isupper() == True</td>
                  <td className="p-2 border border-slate-800">chr(ord('P')+1) = 'Q'</td>
                  <td className="p-2 border border-slate-800 font-bold text-white">'Q'</td>
                </tr>
                <tr className="bg-slate-900/50">
                  <td className="p-2 border border-slate-800">2</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">ch = 'y'</td>
                  <td className="p-2 border border-slate-800">islower() == True</td>
                  <td className="p-2 border border-slate-800">'y'.upper() = 'Y'</td>
                  <td className="p-2 border border-slate-800 font-bold text-white">'QY'</td>
                </tr>
                <tr className="bg-slate-950">
                  <td className="p-2 border border-slate-800">3</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">ch = '@'</td>
                  <td className="p-2 border border-slate-800">else branch</td>
                  <td className="p-2 border border-slate-800">result += '#'</td>
                  <td className="p-2 border border-slate-800 font-bold text-white">'QY#'</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Board Exam Output Tracing Suite</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="board_output_tracing_master_suite.py"
            highlightLines={[8, 10, 12, 14, 25, 27, 40]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Output Tracing"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="When solving CBSE Section A output tracing questions, write the output exactly as it prints on screen. If there is a trailing '#' from end='#', include it! Omitting the final punctuation mark results in half a mark deducted by examiners. — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 10)"
            filename="topic10_output_tracing_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
