import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Key, Shield, Award, Sparkles, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import pythonCode from "./topic10_files/alternate_key_analyzer_sim.py?raw";

export default function Topic10() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-cyan-400 mb-2">
          <Key className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800/60">
            Relational Keys · Secondary Identifiers
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Alternate Key: Candidate Keys not chosen as the Primary Key
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Understand the role of Alternate Keys in relational tables.
          Learn the simple formula: <code className="text-cyan-300 font-mono">Alternate Keys = Candidate Keys - Primary Key</code>,
          and how alternate keys enforce real-world unique constraints using SQL <code className="text-cyan-300 font-mono">UNIQUE</code>.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="This is a guaranteed scoring question in Section A: 'Table STUDENT has Candidate Keys: AdmNo, RollNo, and Email. If AdmNo is selected as the Primary Key, identify the Alternate Keys.' The answer is simply: RollNo and Email! Remember: All candidate keys except the primary key are Alternate Keys. If there is only one candidate key, there are zero alternate keys!"
      />

      {/* 3. The Core Concept Grid */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Alternate Key Blueprint</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <Key className="w-4 h-4" />
              <span>1. Definition</span>
            </div>
            <p className="text-white font-semibold">Unselected Candidate Keys</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Any candidate key that was not chosen as the primary key.
              Also called a <span className="text-sky-300 font-bold">Secondary Key</span>.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-cyan-500/50 transition-all">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>2. Formula</span>
            </div>
            <p className="text-white font-semibold font-mono text-sm">Alt = CK - PK</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              If a table has N candidate keys, exactly 1 is the Primary Key, and the remaining (N - 1) are Alternate Keys.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>3. SQL Implementation</span>
            </div>
            <p className="text-white font-semibold">UNIQUE Constraint</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Enforced in SQL using the <code className="text-emerald-300 font-mono">UNIQUE</code> constraint, preserving data uniqueness across non-primary columns.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Solved CBSE Board Example */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <span>CBSE Model Board Example: Identifying Alternate Keys</span>
        </h3>
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-sm space-y-3 font-mono text-xs">
          <p className="text-amber-400 font-bold font-sans text-sm">
            Table: EMPLOYEE(EmpCode, PassportNo, PAN, Name, Department)
          </p>
          <div className="space-y-1 text-slate-300">
            <p>• Unique Attributes (Candidate Keys): <span className="text-sky-400 font-bold">EmpCode, PassportNo, PAN</span> (3 keys)</p>
            <p>• Designer's Chosen Primary Key: <span className="text-emerald-400 font-bold">EmpCode</span></p>
            <p>• Resulting Alternate Keys: <span className="text-cyan-400 font-bold">PassportNo, PAN</span></p>
          </div>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Alternate Key Analyzer</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to derive Alternate Keys and test UNIQUE constraint enforcement on duplicate records:
        </p>
        <PythonFileLoader
          filename="alternate_key_analyzer_sim.py"
          code={pythonCode}
        />
      </section>

      {/* 6. Quick Revision Notes */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>Quick Revision Summary Note</span>
        </h3>
        <PlainTextPrint
          title="Alternate Key - Quick Revision"
          content={noteText}
        />
      </section>

      {/* 7. Comprehensive FAQ & Exam Questions */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">25 Authentic CBSE Board Assessment Questions</h3>
        </div>
        <p className="text-sm text-slate-300">
          Master Alternate Key identification and candidate key relationships with these board questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
