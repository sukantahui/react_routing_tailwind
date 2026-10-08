import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, RefreshCw 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const InteractiveSandbox = () => {
  const [multiplier, setMultiplier] = useState(1.25);
  const [selectedCategory, setSelectedCategory] = useState('Equity');

  const stockPortfolio = [
    { id: 101, name: 'Alpha Growth Fund', category: 'Equity', baseValue: 1000.00 },
    { id: 102, name: 'Beta Tech Securities', category: 'Equity', baseValue: 2400.00 },
    { id: 103, name: 'Govt Sovereign Bond', category: 'Debt', baseValue: 500.00 },
    { id: 104, name: 'National Infrastructure', category: 'Debt', baseValue: 800.00 },
    { id: 105, name: 'Gold Index ETF', category: 'Commodity', baseValue: 5200.00 }
  ];

  const percentageStr = multiplier >= 1 ? "+" + Math.round((multiplier - 1) * 100) + "%" : "-" + Math.round((1 - multiplier) * 100) + "%";

  const sqlQuery = "-- CBSE Benchmark: " + percentageStr + " Valuation Adjustment\nUPDATE STOCKDATA\nSET Value = Value * " + multiplier.toFixed(2) + "\nWHERE Category = '" + selectedCategory + "';";

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Sparkles size={20} />
          <span>Interactive Percentage Multiplier & Stock Valuation Calculator</span>
        </div>

        {/* Multiplier Presets */}
        <div className="space-y-3">
          <div className="text-xs text-slate-400 font-semibold">Choose CBSE Exam Scenario:</div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '+25% Appreciation (* 1.25)', val: 1.25 },
              { label: '+10% Annual Hike (* 1.10)', val: 1.10 },
              { label: '+50% Mega Surge (* 1.50)', val: 1.50 },
              { label: '-15% Market Dip (* 0.85)', val: 0.85 },
              { label: '-10% Discount (* 0.90)', val: 0.90 }
            ].map((preset) => (
              <button
                key={preset.val}
                onClick={() => setMultiplier(preset.val)}
                className={"px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer " + (multiplier === preset.val ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white')}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Selection */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-semibold">Target Category:</span>
            <div className="flex gap-2">
              {['Equity', 'Debt', 'Commodity', 'All'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={"px-3 py-1.5 rounded-lg font-bold cursor-pointer " + (selectedCategory === cat ? 'bg-sky-500 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400')}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated SQL */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-sky-400">Generated SQL Statement:</div>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto">
            <code>{sqlQuery}</code>
          </pre>
        </div>

        {/* Arithmetic Breakdown Grid */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-sky-400">
                <th className="p-2">StockId</th>
                <th className="p-2">StockName</th>
                <th className="p-2">Category</th>
                <th className="p-2">Original Value</th>
                <th className="p-2">Arithmetic Calculation</th>
                <th className="p-2">Updated Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {stockPortfolio.map((stock) => {
                const isAffected = selectedCategory === 'All' || stock.category === selectedCategory;
                const updatedVal = isAffected ? stock.baseValue * multiplier : stock.baseValue;

                return (
                  <tr key={stock.id} className={isAffected ? 'bg-emerald-500/10 text-emerald-300' : 'opacity-50'}>
                    <td className="p-2 font-bold">{stock.id}</td>
                    <td className="p-2">{stock.name}</td>
                    <td className="p-2">{stock.category}</td>
                    <td className="p-2 text-slate-400">₹{stock.baseValue.toFixed(2)}</td>
                    <td className="p-2 font-mono text-amber-300">
                      {isAffected ? (stock.baseValue.toFixed(2) + " * " + multiplier.toFixed(2)) : 'No change'}
                    </td>
                    <td className="p-2 font-bold text-emerald-400">
                      ₹{updatedVal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Why % Fails Callout */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <AlertTriangle size={16} /> Why Value = Value + 25% is an ERROR:
          </div>
          <p className="text-slate-300">
            In SQL, <code className="text-amber-300 font-mono">%</code> is the modulo operator (remainder after division), NOT a percentage symbol. Multiplying by <code className="text-emerald-300 font-mono">1.25</code> is the only valid ANSI SQL syntax for a 25% increase.
          </p>
        </div>

      </div>
    </div>
  );
};

export default function Topic2() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 003 · Topic 2
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                CBSE Board Favorite
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Arithmetic Updates: Percentage Adjustments (e.g. Value = Value * 1.25)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Execute mass and conditional arithmetic updates using percentage multipliers (* 1.25 for +25%, * 0.90 for 10% discount).
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Conceptual Rules & Sandbox', icon: BookOpen },
            { id: 'code', label: '2. SQL Script Lab', icon: Code },
            { id: 'pitfalls', label: '3. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Printable Notes', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                )}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1 */}
        {activeTab === 'concept' && <InteractiveSandbox />}

        {/* TAB 2 */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>MySQL 8.0 Workbench Master Script</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">DML Laboratory</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- 25% Increase on Stock Value\nUPDATE STOCKDATA\nSET Value = Value * 1.25\nWHERE Category = 'Equity';\n\n-- 10% Discount on Items\nUPDATE Items\nSET Price = Price * 0.90\nWHERE Category = 'Electronics';"}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm text-amber-200">
                <strong>Mentor Advice:</strong> Remember: 25% hike is Value = Value * 1.25. Never write Value + 25% because % in SQL is modulo! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 2 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Quick Revision Document"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic2_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Remember: 25% hike is Value = Value * 1.25. Never write Value + 25% because % in SQL is modulo! — Sukanta Hui" />

      </div>
    </div>
  );
}
