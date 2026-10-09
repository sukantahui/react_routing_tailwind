import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Lock, Unlock, Shield
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

const EncapsulationSecurityStudio = () => {
  const [balance, setBalance] = useState(15000);
  const [depositAmount, setDepositAmount] = useState(5000);
  const [withdrawAmount, setWithdrawAmount] = useState(20000);
  const [log, setLog] = useState([
    "Account initialized: Balance = ₹15,000.00 (Private field protected)"
  ]);

  const handleDeposit = () => {
    if (depositAmount <= 0) {
      setLog(prev => [
        `❌ Validation Error: Deposit amount ₹${depositAmount} must be positive!`,
        ...prev
      ]);
    } else {
      setBalance(prev => prev + depositAmount);
      setLog(prev => [
        `✅ Success: Deposited ₹${depositAmount}. New Balance = ₹${balance + depositAmount}`,
        ...prev
      ]);
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount <= 0) {
      setLog(prev => [
        `❌ Validation Error: Withdrawal amount must be positive!`,
        ...prev
      ]);
    } else if (withdrawAmount > balance) {
      setLog(prev => [
        `❌ Validation Error: Insufficient funds! Attempted to withdraw ₹${withdrawAmount}, but current balance is only ₹${balance}.`,
        ...prev
      ]);
    } else {
      setBalance(prev => prev - withdrawAmount);
      setLog(prev => [
        `✅ Success: Withdrew ₹${withdrawAmount}. New Balance = ₹${balance - withdrawAmount}`,
        ...prev
      ]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Lock className="w-3.5 h-3.5" /> Banking Security & Mutator Validator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Encapsulation in Action: Private Fields & Getter/Setter Rules
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `private double balance;`
        </div>
      </div>

      {/* Interactive Account Vault */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30">
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Protected Private Field (`balance`):</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">₹{balance.toLocaleString('en-IN')}.00</span>
            </div>
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-28 bg-slate-950 text-white font-mono text-xs px-2.5 py-1.5 rounded border border-slate-700"
              />
              <button
                onClick={handleDeposit}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-lg transition cursor-pointer"
              >
                Call `deposit(amt)` Setter
              </button>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-28 bg-slate-950 text-white font-mono text-xs px-2.5 py-1.5 rounded border border-slate-700"
              />
              <button
                onClick={handleWithdraw}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-lg transition cursor-pointer"
              >
                Call `withdraw(amt)` Setter
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" /> Setter Validation & Audit Log
            </span>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1.5 max-h-48 overflow-y-auto">
              {log.map((entry, idx) => (
                <div key={idx} className={entry.includes('❌') ? 'text-rose-400' : 'text-emerald-300'}>
                  {entry}
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            Encapsulation ensures balance cannot be set to a negative number directly.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic7 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 7
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Encapsulation in Action: Private Fields and Public Getters/Setters
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand how private instance variables and public accessor/mutator methods secure software systems against data corruption and enforce business logic validation.
          </p>
        </div>

        {/* Studio */}
        <EncapsulationSecurityStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Encapsulation & Getters/Setters"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Encapsulation Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 7 Note (.txt)"
          downloadFileName="004_001_topic7_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Always protect your object variables with the `private` keyword. Providing public getter and setter methods gives your class complete control over how data is viewed and modified! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic7;
