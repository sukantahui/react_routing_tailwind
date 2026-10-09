import React, { useState } from 'react';
import { 
  Terminal, Sparkles, CheckCircle2, AlertTriangle, 
  HelpCircle, BookOpen, ArrowRight, ShieldCheck, 
  Code, Zap, Layers, RefreshCw, Sliders, Play, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const CliFlagBuilder = () => {
  const [selectedFlag, setSelectedFlag] = useState('-ea');
  const [targetScope, setTargetScope] = useState('all'); // 'all', 'package', 'class'

  let generatedCommand = 'java ';
  if (selectedFlag === '-ea') {
    if (targetScope === 'all') generatedCommand += '-ea MainApp';
    else if (targetScope === 'package') generatedCommand += '-ea:com.school.banking... MainApp';
    else if (targetScope === 'class') generatedCommand += '-ea:com.school.AccountValidator MainApp';
  } else if (selectedFlag === '-da') {
    generatedCommand += '-da MainApp';
  } else if (selectedFlag === '-esa') {
    generatedCommand += '-esa MainApp';
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Terminal className="w-3.5 h-3.5" /> JVM CLI Flag Builder
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Configuring Assertion Execution via JVM Arguments
          </h2>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `java -ea MainApp`
        </div>
      </div>

      {/* Control selectors */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Select Assertion Action:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { flag: '-ea', label: 'Enable (-ea)' },
              { flag: '-da', label: 'Disable (-da)' },
              { flag: '-esa', label: 'System (-esa)' }
            ].map(item => (
              <button
                key={item.flag}
                onClick={() => setSelectedFlag(item.flag)}
                className={`py-2 px-2 text-xs font-bold rounded-xl transition cursor-pointer text-center ${
                  selectedFlag === item.flag
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Select Scope:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'all', label: 'All Classes' },
              { id: 'package', label: 'Package...' },
              { id: 'class', label: 'Single Class' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setTargetScope(item.id)}
                disabled={selectedFlag !== '-ea'}
                className={`py-2 px-2 text-xs font-bold rounded-xl transition cursor-pointer text-center ${
                  targetScope === item.id && selectedFlag === '-ea'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-950'
                    : selectedFlag !== '-ea'
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-600 border border-slate-800'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal View */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono">
        <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-800 pb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 text-slate-400">Command Prompt / Terminal Shell</span>
        </div>

        <div className="pt-2 text-sm text-emerald-400 font-bold flex items-center gap-2">
          <span className="text-slate-500">&gt;</span>
          <span>{generatedCommand}</span>
        </div>

        <div className="text-xs text-slate-300 pt-2 border-t border-slate-900 leading-relaxed">
          {selectedFlag === '-ea' && targetScope === 'all' && (
            <span className="text-emerald-300">
              💡 JVM initializes all user application classes with full assertion verification activated.
            </span>
          )}
          {selectedFlag === '-ea' && targetScope === 'package' && (
            <span className="text-sky-300">
              💡 JVM enables assertions only for classes under &apos;com.school.banking&apos; package and its subpackages.
            </span>
          )}
          {selectedFlag === '-ea' && targetScope === 'class' && (
            <span className="text-purple-300">
              💡 JVM enables assertions exclusively for the single &apos;com.school.AccountValidator&apos; class.
            </span>
          )}
          {selectedFlag === '-da' && (
            <span className="text-amber-300">
              💡 JVM explicitly disables all user assertions (default production behavior).
            </span>
          )}
          {selectedFlag === '-esa' && (
            <span className="text-rose-300">
              💡 JVM enables assertions inside core system Java class libraries (java.lang, java.util).
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Topic5 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Enabling Assertions using `-ea` / `-enableassertions` JVM Command-Line Flag
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Learn the exact JVM switches to enable and disable assertions globally, by package, or per class during application launch.
          </p>
        </div>

        {/* Flag Builder */}
        <CliFlagBuilder />

        {/* Quick Reference Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-400" />
            Complete JVM Assertion Flag Reference for CBSE IT 802
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-800">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 border border-slate-800">Short Flag</th>
                  <th className="p-3 border border-slate-800">Full Flag Name</th>
                  <th className="p-3 border border-slate-800">Operational Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                <tr>
                  <td className="p-3 border border-slate-800 text-emerald-400 font-bold">-ea</td>
                  <td className="p-3 border border-slate-800 text-emerald-300">-enableassertions</td>
                  <td className="p-3 border border-slate-800 font-sans">Enables assertions in all non-system classes</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-800 text-amber-400 font-bold">-da</td>
                  <td className="p-3 border border-slate-800 text-amber-300">-disableassertions</td>
                  <td className="p-3 border border-slate-800 font-sans">Disables assertions (default mode)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-800 text-sky-400 font-bold">-esa</td>
                  <td className="p-3 border border-slate-800 text-sky-300">-enablesystemassertions</td>
                  <td className="p-3 border border-slate-800 font-sans">Enables assertions in Java system runtime classes</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-800 text-rose-400 font-bold">-dsa</td>
                  <td className="p-3 border border-slate-800 text-rose-300">-disablesystemassertions</td>
                  <td className="p-3 border border-slate-800 font-sans">Disables assertions in Java system runtime classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="In objective board questions, you will frequently be asked: 'Which option enables assertions?' Always identify `-ea` or `-enableassertions`. Remember that the flag is supplied to the `java` runtime command, not the `javac` compiler command!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • JVM Command-Line Flags for Assertions"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic5;
