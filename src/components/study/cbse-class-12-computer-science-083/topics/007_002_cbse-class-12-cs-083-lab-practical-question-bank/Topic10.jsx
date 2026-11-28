import React from 'react';
import {
  FileText, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Database, Server, Key, Shield, Code, Download, PlayCircle, Wrench, Edit3, Trash2, Award, Clock
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

export default function Topic10() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <Wrench className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Segment 7: Practical Lab Bank · Topic 10
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Practical 10: Linear Stack Implementation for Numbers with Push, Pop, Peek & Display
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Data Structures · LIFO · Stack Operations · Underflow Detection. Master this essential practical laboratory topic with verified code, expected outputs, examiner viva questions, and authentic lab test rubrics.
        </p>
      </header>

      {/* 2. Teacher Note */}
      <section>
        <Teacher
          teacherName="Sukanta Hui"
          designation="Master Teacher & CBSE Computer Science Mentor"
          organization="Coder & AccoTax, Barrackpore"
          experienceYears={27}
          specialization="Python Programming, Relational DBMS & CBSE Class 12 Board Prep"
          message="The 30-mark practical examination is your greatest opportunity to secure full marks towards your 100/100 aggregate. Practice every program on a live Python IDLE and MySQL terminal. Ensure your report file is neatly bound and be confident during the 3-mark viva voce!"
        />
      </section>

      {/* 3. Core Concepts */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <span>Practical 10: Complete Number Stack ADT</span>
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          Python practical program implementing a full Linear Stack Abstract Data Type (ADT) for numeric values with Push, Pop, Peek, and Display operations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Uses a standard Python list as the underlying storage buffer.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Push: append(item) at top of stack.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Pop: underflow check (if len == 0), then pop() and return element.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Peek: returns topmost item without removal (stk[-1]); Display traverses stack from top to bottom.</span>
          </div>
        </div>
      </section>

      {/* 4. Practical Code Demonstration */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Code className="w-5 h-5 text-amber-400" />
          <span>Practical Program Listing & Expected Output</span>
        </h2>
        <p className="text-slate-300 text-sm">
          Examine the complete, production-tested practical code adhering strictly to CBSE laboratory guidelines:
        </p>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto">
          <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
{`def push(stk, val):
    stk.append(val)

def pop(stk):
    if len(stk) == 0:
        print("Stack Underflow!")
        return None
    return stk.pop()

def peek(stk):
    return stk[-1] if stk else None

def display(stk):
    if not stk:
        print("Stack is Empty")
    else:
        for i in range(len(stk) - 1, -1, -1):
            print(stk[i])`}
          </pre>
        </div>
      </section>

      {/* 5. CBSE Pitfalls & Common Mistakes */}
      <section className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-6 space-y-3">
        <div className="flex items-center space-x-3 text-amber-400">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-lg font-bold">Lab Test Pitfalls & Examiner Viva Traps</h2>
        </div>
        <p className="text-sm text-amber-200/90 leading-relaxed">
          Always test file existence, close all opened file and database handles, and handle EOFError gracefully in binary files.
        </p>
      </section>

      {/* 6. Printable Study Notes */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Download className="w-5 h-5 text-sky-400" />
            <span>Printable Practical Lab Code Sheet</span>
          </h2>
        </div>
        <PlainTextPrint
          content={noteText}
          filename="CBSE_Class12_CS_Topic10_Practical_Notes.txt"
        />
      </section>

      {/* 7. Comprehensive Assessment Question Bank */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-white">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold">Practical Lab & Viva Self-Assessment (25 Curated Questions)</h2>
        </div>
        <FAQTemplate
          questions={questions}
          title="Topic 10: Practical Lab & Viva Voce MCQ Challenge"
        />
      </section>
    </div>
  );
}
