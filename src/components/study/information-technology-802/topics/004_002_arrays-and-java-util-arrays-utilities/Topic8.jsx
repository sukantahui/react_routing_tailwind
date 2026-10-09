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

const CodeCompletionLab = () => {
  const [stmt1, setStmt1] = useState("");
  const [stmt2, setStmt2] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isStmt1Correct = stmt1.trim().replace(/;$/, "") === "import java.util.Arrays";
  const isStmt2Correct = stmt2.trim().replace(/;$/, "").replace(/\s+/g, "") === 'Arrays.binarySearch(languages,"Python")';

  const handleVerify = () => {
    setSubmitted(true);
  };

  const handleFillSolution = () => {
    setStmt1("import java.util.Arrays;");
    setStmt2("Arrays.binarySearch(languages, \"Python\");");
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <FileCheck2 className="w-3.5 h-3.5" /> CBSE Board Exam Interactive Drill
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Code Completion: Java Language Search Problem
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Section B (4 Marks)
        </div>
      </div>

      {/* Code Editor with Gaps */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="space-y-3 font-mono text-xs text-slate-300">
          <div>
            <span className="text-slate-500 block mb-1 font-sans text-xs">
              // Statement-1: Write statement to import the required array utility class:
            </span>
            <input
              type="text"
              placeholder="e.g. import java.util.Arrays;"
              value={stmt1}
              onChange={(e) => { setStmt1(e.target.value); setSubmitted(false); }}
              className="w-full bg-slate-900 text-emerald-400 px-3 py-2 rounded-xl border border-slate-700 font-mono"
            />
          </div>

          <pre className="text-slate-400 py-1">
{`public class LanguageSearch {
    public static void main(String[] args) {
        String[] languages = {"Java", "Python", "C++", "Ruby"};
        Arrays.sort(languages);`}
          </pre>

          <div>
            <span className="text-slate-500 block mb-1 font-sans text-xs">
              // Statement-2: Search for "Python" using the Arrays utility class:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">int index =</span>
              <input
                type="text"
                placeholder='e.g. Arrays.binarySearch(languages, "Python");'
                value={stmt2}
                onChange={(e) => { setStmt2(e.target.value); setSubmitted(false); }}
                className="flex-1 bg-slate-900 text-emerald-400 px-3 py-2 rounded-xl border border-slate-700 font-mono"
              />
            </div>
          </div>

          <pre className="text-slate-400 py-1">
{`        System.out.println("Found at index: " + index);
    }
}`}
          </pre>
        </div>

        <div className="flex gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={handleVerify}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl transition cursor-pointer"
          >
            Check Answers
          </button>
          <button
            onClick={handleFillSolution}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2 px-3 rounded-xl transition cursor-pointer"
          >
            Show Solution
          </button>
        </div>

        {/* Results Banner */}
        {submitted && (
          <div className="space-y-2 pt-2">
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              isStmt1Correct ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {isStmt1Correct ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
              <span>Statement-1: {isStmt1Correct ? "Correct! (import java.util.Arrays;)" : "Incorrect. Expected: import java.util.Arrays;"}</span>
            </div>

            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              isStmt2Correct ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {isStmt2Correct ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
              <span>Statement-2: {isStmt2Correct ? 'Correct! Output is index 2.' : 'Incorrect. Expected: Arrays.binarySearch(languages, "Python");'}</span>
            </div>
          </div>
        )}
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
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 8
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Code Completion Drills for Java Array Operations
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Practice authentic CBSE Class XII IT 802 board exam code completion problems requiring import statements and binary search invocations.
          </p>
        </div>

        {/* Drill Studio */}
        <CodeCompletionLab />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Code Completion Drills"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Code Completion Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 8 Note (.txt)"
          downloadFileName="004_002_topic8_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In Section B questions requiring code completion, pay close attention to exact variable names (like `languages`) and quotes around search strings (`'Python'`). Full marks depend on syntactical precision! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic8;
