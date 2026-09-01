import React, { useState } from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic5_files/ComprehensiveConstructorPractice.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

/**
 * Interactive ICSE Class Design Simulator
 */
const ICSEProgramSimulator = () => {
  const [balance, setBalance] = useState(5000);
  const [transactionLog, setTransactionLog] = useState([
    "Account created with initial balance Rs. 5000.0"
  ]);

  const handleDeposit = () => {
    setBalance((prev) => prev + 1000);
    setTransactionLog((prev) => [...prev, "Deposited +Rs. 1000 | New Balance: Rs. " + (balance + 1000)]);
  };

  const handleWithdraw = () => {
    if (balance >= 500) {
      setBalance((prev) => prev - 500);
      setTransactionLog((prev) => [...prev, "Withdrew -Rs. 500 | New Balance: Rs. " + (balance - 500)]);
    }
  };

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            🎮 Interactive ICSE Class Design Bank Simulator
          </h3>
          <p className="text-xs text-slate-400">
            Simulate object instantiation via parameterized constructor and execute member method transactions.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDeposit}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-lg shadow transition-all"
          >
            + Deposit Rs. 1000
          </button>
          <button
            onClick={handleWithdraw}
            className="px-3 py-1.5 bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold rounded-lg shadow transition-all"
          >
            - Withdraw Rs. 500
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
          <div className="text-sky-400 font-bold">BankAccount acc1 = new BankAccount("Amitav", 98765L, {balance});</div>
          <div className="text-slate-400 text-[11px]">Current Balance State: <span className="text-amber-300 font-bold">Rs. {balance}</span></div>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-[11px] max-h-36 overflow-y-auto">
          <div className="text-slate-400 font-bold font-sans text-xs mb-1">Execution Audit Trail:</div>
          {transactionLog.map((log, idx) => (
            <div key={idx} className="text-emerald-400">
              ➜ {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Topic5 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Comprehensive ICSE Programs
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Comprehensive ICSE Board Program & Class Design
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Full 15-mark ICSE Section B practice program: Class variables, Parameterized Constructors, member calculation methods, and main() driver execution.
        </p>
      </header>

      {/* Simulator */}
      <section>
        <ICSEProgramSimulator />
      </section>

      {/* Program Structure Guide */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white">📋 ICSE Section B 15-Mark Class Marking Blueprint</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
            <div className="text-sky-400 font-bold text-sm">1. Instance Fields</div>
            <div className="text-slate-400">Declare data members with appropriate data types (2 Marks).</div>
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
            <div className="text-amber-400 font-bold text-sm">2. Constructor</div>
            <div className="text-slate-400">Initialize fields using parameterized constructor (3 Marks).</div>
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-bold text-sm">3. Methods</div>
            <div className="text-slate-400">Implement calculation, processing & display logic (7 Marks).</div>
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
            <div className="text-indigo-400 font-bold text-sm">4. Main Driver</div>
            <div className="text-slate-400">Instantiate object via 'new' and execute methods (3 Marks).</div>
          </div>
        </div>
      </section>

      {/* Code Demo */}
      <section>
        <JavaFileLoader
          fileName="ComprehensiveConstructorPractice.java"
          code={demoCode}
          title="Complete Executable Board Program: BankAccount Class Design"
        />
      </section>

      {/* Quiz */}
      <section>
        <FAQTemplate questions={questions} title="ICSE Quiz: Board Program Design" />
      </section>

      {/* Teacher Note & Cheat Sheet */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Teacher note="ICSE Board Secret: Always test your class by creating an object in main() using new BankAccount('Name', 101, 5000.0) and calling its display method. Examiners test your code by running your main method!" />
        <PlainTextPrint content={noteText} title="Printable Cheat Sheet: Topic 5 Notes" />
      </section>
    </div>
  );
};

export default Topic5;
