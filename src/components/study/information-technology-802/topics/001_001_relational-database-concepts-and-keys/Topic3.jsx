import React, { useState } from 'react';
import { 
  Calculator, CheckCircle2, AlertTriangle, 
  Layers, BookOpen, Code, HelpCircle, FileText, ArrowRight, RefreshCw 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  const [initialDegree, setInitialDegree] = useState(8);
  const [initialCardinality, setInitialCardinality] = useState(15);
  const [colsAdded, setColsAdded] = useState(3);
  const [colsDropped, setColsDropped] = useState(0);
  const [rowsInserted, setRowsInserted] = useState(0);
  const [rowsDeleted, setRowsDeleted] = useState(4);
  const [activeTab, setActiveTab] = useState('overview');

  const finalDegree = Math.max(1, initialDegree + colsAdded - colsDropped);
  const finalCardinality = Math.max(0, initialCardinality + rowsInserted - rowsDeleted);

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                High-Yield Board Numerical
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Calculating Degree (Attributes) &amp; Cardinality (Tuples) after Table Alterations
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Step-by-step mathematical calculations for table dimension modifications in CBSE Class XII IT (802) board examinations.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Mathematical Formulas', icon: BookOpen },
            { id: 'calculator', label: '2. Live Sandbox', icon: Calculator },
            { id: 'code', label: '3. SQL Verification Lab', icon: Code },
            { id: 'pitfalls', label: '4. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '5. FAQs & Practice (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '6. Printable Document', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Degree (Number of Columns)</h3>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-sky-300">
                  New Degree = Initial Degree + Cols Added - Cols Dropped
                </div>
                <p className="text-xs text-slate-300">Modified exclusively via DDL: ALTER TABLE ADD / DROP COLUMN.</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Cardinality (Number of Rows)</h3>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300">
                  New Cardinality = Initial Cardinality + Rows Inserted - Rows Deleted
                </div>
                <p className="text-xs text-slate-300">Modified exclusively via DML: INSERT INTO / DELETE FROM.</p>
              </div>

            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20">
                Solved Board Question (APS Barrackpore Half Yearly SET-C)
              </span>
              <h4 className="text-base font-bold text-white">
                "A table 'Product' has 8 columns and 15 rows. After deleting 4 rows and adding 3 columns, what is the Degree and Cardinality?"
              </h4>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300 font-mono">
                <p>1. Initial State: Degree = 8, Cardinality = 15.</p>
                <p>2. Deleting 4 rows: Cardinality = 15 - 4 = 11.</p>
                <p>3. Adding 3 columns: Degree = 8 + 3 = 11.</p>
                <p className="text-emerald-400 font-bold pt-2">Final Answer: Degree = 11, Cardinality = 11.</p>
              </div>
            </div>

            <Teacher note="In the CBSE IT (802) board exam, this is a guaranteed 2-mark question! Always show both formula lines separately. — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-base font-bold text-white">Live Calculation Sandbox</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Initial Degree:</label>
                    <input type="number" min="1" value={initialDegree} onChange={e => setInitialDegree(parseInt(e.target.value) || 1)} className="w-full bg-slate-900 border border-slate-800 p-2 text-sky-400 rounded text-sm font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Initial Cardinality:</label>
                    <input type="number" min="0" value={initialCardinality} onChange={e => setInitialCardinality(parseInt(e.target.value) || 0)} className="w-full bg-slate-900 border border-slate-800 p-2 text-emerald-400 rounded text-sm font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-sky-400 block mb-1">+ Cols Added:</label>
                    <input type="number" min="0" value={colsAdded} onChange={e => setColsAdded(parseInt(e.target.value) || 0)} className="w-full bg-slate-900 border border-slate-800 p-2 text-sky-300 rounded text-sm font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-amber-400 block mb-1">- Rows Deleted:</label>
                    <input type="number" min="0" value={rowsDeleted} onChange={e => setRowsDeleted(parseInt(e.target.value) || 0)} className="w-full bg-slate-900 border border-slate-800 p-2 text-amber-300 rounded text-sm font-mono" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center space-y-3 font-mono text-xs">
                <div className="text-sky-300 font-bold text-base">Calculated Degree = {finalDegree}</div>
                <div className="text-emerald-300 font-bold text-base">Calculated Cardinality = {finalCardinality}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CODE */}
        {activeTab === 'code' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Live SQL Verification</h3>
            <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
              <code>{`DELETE FROM ItemMaster WHERE ItemID IN (1, 2, 3, 4);
ALTER TABLE ItemMaster ADD Barcode VARCHAR(30), ADD DiscountRate DECIMAL(4,2), ADD MinOrderQty INT;
DESCRIBE ItemMaster;
SELECT COUNT(*) FROM ItemMaster;`}</code>
            </pre>
          </div>
        )}

        {/* TAB 4: PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle size={18} />
              Board Exam Traps: Degree &amp; Cardinality
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              UPDATE commands change cell data but NEVER change Cardinality!
            </p>
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 3 · Degree &amp; Cardinality Calculations FAQs &amp; Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 6: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic3_degree_cardinality_note.txt"
              title="CBSE Class XII IT 802 – Topic 3 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
