import React, { useState } from 'react';
import { 
  CreditCard, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Check, Layers, Laptop, Play
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const GuiBillingSimulator = () => {
  const [weightInput, setWeightInput] = useState("5");
  const [mode, setMode] = useState("switch"); // "switch" or "ifElse"
  const [calculatedPay, setCalculatedPay] = useState(100);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeFormula, setActiveFormula] = useState("w == 5 -> pay = 5 * 20 = ₹100");

  const handleCalculate = () => {
    setErrorMsg("");
    const trimmed = weightInput.trim();
    if (!trimmed) {
      setErrorMsg("NumberFormatException: For input string: \"\" (Field is empty!)");
      setCalculatedPay(0);
      return;
    }

    const w = parseInt(trimmed, 10);
    if (isNaN(w) || String(w) !== trimmed) {
      setErrorMsg(`NumberFormatException: For input string: "${trimmed}" (Must be an integer!)`);
      setCalculatedPay(0);
      return;
    }

    if (w <= 0) {
      setErrorMsg("Weight must be greater than 0 kg!");
      setCalculatedPay(0);
      return;
    }

    let pay = 0;
    let formula = "";

    if (mode === "switch") {
      switch (w) {
        case 5:
          pay = w * 20;
          formula = `case 5: pay = ${w} * 20 = ₹${pay}`;
          break;
        case 8:
          pay = w * 26;
          formula = `case 8: pay = ${w} * 26 = ₹${pay}`;
          break;
        case 10:
          pay = w * 32;
          formula = `case 10: pay = ${w} * 32 = ₹${pay}`;
          break;
        default:
          pay = w * 40;
          formula = `default: pay = ${w} * 40 = ₹${pay}`;
          break;
      }
    } else {
      if (w === 5) {
        pay = w * 20;
        formula = `if (w == 5) pay = ${w} * 20 = ₹${pay}`;
      } else if (w === 8) {
        pay = w * 26;
        formula = `else if (w == 8) pay = ${w} * 26 = ₹${pay}`;
      } else if (w === 10) {
        pay = w * 32;
        formula = `else if (w == 10) pay = ${w} * 32 = ₹${pay}`;
      } else {
        pay = w * 40;
        formula = `else pay = ${w} * 40 = ₹${pay}`;
      }
    }

    setCalculatedPay(pay);
    setActiveFormula(formula);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <CreditCard className="w-3.5 h-3.5" /> NetBeans Swing GUI Billing Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Courier Parcel Tariff Calculator: `jTextField1.getText()` to `switch`
          </h2>
        </div>
        
        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setMode('switch')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              mode === 'switch' 
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-950' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Clean Switch Mode
          </button>
          <button
            onClick={() => setMode('ifElse')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              mode === 'ifElse' 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Legacy If-Else Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NetBeans Swing GUI Frame Window */}
        <div className="bg-slate-950 rounded-2xl border-2 border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between">
          {/* Swing Window Title Bar */}
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                JFrame: ParcelBillingHub_Barrackpore
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Enter Parcel Weight (`jTextField1`):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="e.g. 5, 8, 10, 15"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 text-white font-mono text-sm px-3.5 py-2.5 rounded-xl outline-none"
                />
                <button
                  onClick={handleCalculate}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer shrink-0 shadow-lg shadow-emerald-950/40 flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>jButton1 (Calculate)</span>
                </button>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[11px] text-slate-500">Quick Test:</span>
                {[5, 8, 10, 15].map(pVal => (
                  <button
                    key={pVal}
                    onClick={() => {
                      setWeightInput(String(pVal));
                      setTimeout(handleCalculate, 50);
                    }}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    {pVal} kg
                  </button>
                ))}
                <button
                  onClick={() => {
                    setWeightInput("invalid");
                    setTimeout(handleCalculate, 50);
                  }}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800"
                >
                  "invalid" (Trap)
                </button>
              </div>
            </div>

            {/* Error Dialog Banner if any */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Swing Dialog: JOptionPane.showMessageDialog</strong>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            {/* Output Field (jTextField2) */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Calculated Payable Charge (`jTextField2` - Read-Only):
              </label>
              <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-700">
                <span className="text-slate-500 font-mono text-sm">₹</span>
                <input
                  type="text"
                  readOnly
                  value={calculatedPay}
                  className="w-full bg-transparent text-emerald-400 font-mono font-black text-xl outline-none cursor-default"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Output statement: <code className="text-sky-300 font-mono">jTextField2.setText("" + pay);</code>
              </p>
            </div>
          </div>

          {/* Active Calculation Formula */}
          <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">Triggered Branch:</span>
            <span className="text-amber-400 font-bold">{activeFormula}</span>
          </div>
        </div>

        {/* Java Event-Handling Source Code */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans flex items-center gap-1.5">
                <Code className="w-4 h-4 text-sky-400" />
                jButton1ActionPerformed Event Handler
              </span>
              <span className={`text-[11px] px-2 py-0.5 rounded border ${
                mode === 'switch' ? 'bg-sky-500/10 text-sky-300 border-sky-500/20' : 'bg-purple-500/10 text-purple-300 border-purple-500/20'
              }`}>
                {mode === 'switch' ? 'Clean Switch Implementation' : 'Legacy If-Else Implementation'}
              </span>
            </div>

            <pre className="text-slate-300 leading-relaxed overflow-x-auto p-3 bg-slate-900 rounded-xl border border-slate-800">
              {mode === 'switch' ? (
`private void jButton1ActionPerformed(ActionEvent evt) {
    // Step 1: Parse input from jTextField1
    int w = Integer.parseInt(jTextField1.getText().trim());
    double pay = 0.0; // Declared outside for scope

    // Step 2: Converted clean switch structure
    switch (w) {
        case 5:
            pay = w * 20;
            break;
        case 8:
            pay = w * 26;
            break;
        case 10:
            pay = w * 32;
            break;
        default:
            pay = w * 40;
            break;
    }

    // Step 3: Write result back to jTextField2
    jTextField2.setText("" + pay);
}`
              ) : (
`private void jButton1ActionPerformed(ActionEvent evt) {
    // Step 1: Parse input from jTextField1
    int w = Integer.parseInt(jTextField1.getText().trim());
    double pay = 0.0;

    // Step 2: Legacy if-else-if ladder
    if (w == 5) {
        pay = w * 20;
    } else if (w == 8) {
        pay = w * 26;
    } else if (w == 10) {
        pay = w * 32;
    } else {
        pay = w * 40;
    }

    // Step 3: Write result back to jTextField2
    jTextField2.setText("" + pay);
}`
              )}
            </pre>
          </div>

          {/* Diagnostic Key Points */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-sans text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>Type conversion:</strong> <code className="text-sky-300 font-mono">Integer.parseInt()</code> converts String to integer <code className="text-purple-300 font-mono">w</code>.</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>Result formatting:</strong> <code className="text-amber-300 font-mono">"" + pay</code> converts double back to String for <code className="text-sky-300 font-mono">setText()</code>.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic5() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CreditCard className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Real-World GUI Conversion: NetBeans Swing to Switch
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master the exact CBSE practical and theory board problem: parsing parcel weights from <code className="text-emerald-400 font-mono">jTextField1.getText()</code>, converting slab logic into clean <code className="text-sky-400 font-mono">switch</code> statements, and displaying results in <code className="text-amber-400 font-mono">jTextField2</code>.
        </p>
      </div>

      {/* Interactive GUI Billing Studio */}
      <div className="max-w-6xl mx-auto">
        <GuiBillingSimulator />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Real-World GUI Billing Conversion Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: GUI Billing & Switch" 
          description="Master 25 exam-style questions on Integer.parseInt, Swing textfield event handlers, variable scoping, and NumberFormatException defensive coding with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note={`In your CBSE IT-802 practical examination with NetBeans, you will frequently write button click handlers for billing slabs. Always remember two things: 1) Declare 'double pay = 0.0;' before the switch statement so it remains accessible for 'jTextField2.setText("" + pay);', and 2) Every case must end with a 'break;' statement, otherwise your bill will always be overwritten by the default slab!`} 
        />
      </div>
    </div>
  );
}
