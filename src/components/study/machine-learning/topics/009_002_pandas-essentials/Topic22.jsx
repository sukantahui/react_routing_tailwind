import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic22_files/01_ingest_and_regional_groupby.py?raw";
import pyCode2 from "./topic22_files/02_named_aggregations_and_pivot_tables.py?raw";
import pyCode3 from "./topic22_files/03_regional_growth_and_share_metrics.py?raw";
import noteText from "./topic22_files/topic22_note.txt?raw";
import questions from "./topic22_files/topic22_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_ingest_and_regional_groupby.py",
    title: "1. Ingestion & Regional Summary",
    badge: "groupby(Region)",
    code: pyCode1,
    summary: "Aggregate sales transactions by geographic territory, computing total bookings, unit volume, and average order value (AOV).",
  },
  {
    id: "part2",
    fileName: "02_named_aggregations_and_pivot_tables.py",
    title: "2. Pivot Tables (Region x Category)",
    badge: "pd.pivot_table()",
    code: pyCode2,
    summary: "Transform transaction logs into 2D executive pivot tables with cross-product categories, zero-fill defaults, and marginal grand totals.",
  },
  {
    id: "part3",
    fileName: "03_regional_growth_and_share_metrics.py",
    title: "3. Market Share & Rep Leaderboard",
    badge: "Share % & Leaderboard",
    code: pyCode3,
    summary: "Compute territory market share percentages using grand-total broadcasting and rank top sales executives across regional territories.",
  },
];

const SALES_TRANSACTIONS = [
  { id: 501, rep: "Debangshu", region: "Barrackpore", cat: "Laptops", units: 5, rev: 250000 },
  { id: 502, rep: "Susmita",   region: "Shyamnagar",  cat: "Smartphones", units: 12, rev: 180000 },
  { id: 503, rep: "Swadeep",   region: "Ichapur",      cat: "Accessories", units: 45, rev: 45000 },
  { id: 504, rep: "Tuhina",    region: "Naihati",      cat: "Laptops", units: 8, rev: 400000 },
  { id: 505, rep: "Sachin",    region: "Barrackpore", cat: "Smartphones", units: 15, rev: 225000 },
  { id: 506, rep: "Mahima",    region: "Shyamnagar",  cat: "Laptops", units: 6, rev: 310000 },
  { id: 507, rep: "Abhronila", region: "Titagarh",    cat: "Accessories", units: 38, rev: 38000 },
  { id: 508, rep: "Debangshu", region: "Barrackpore", cat: "Smartphones", units: 10, rev: 150000 },
  { id: 509, rep: "Susmita",   region: "Naihati",      cat: "Smartphones", units: 14, rev: 210000 },
  { id: 510, rep: "Tuhina",    region: "Ichapur",      cat: "Laptops", units: 4, rev: 200000 },
  { id: 511, rep: "Sachin",    region: "Titagarh",    cat: "Accessories", units: 50, rev: 52000 },
  { id: 512, rep: "Mahima",    region: "Barrackpore", cat: "Laptops", units: 7, rev: 360000 },
];

const TOTAL_REVENUE = SALES_TRANSACTIONS.reduce((acc, r) => acc + r.rev, 0);

const Topic22 = () => {
  const [activeTab, setActiveTab] = useState("sales_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [salesView, setSalesView] = useState("summary"); // 'ledger', 'summary', 'pivot', 'leaderboard'

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Calculate Regional Summary
  const regions = ["Barrackpore", "Naihati", "Shyamnagar", "Ichapur", "Titagarh"];
  const regionalStats = regions.map((reg) => {
    const orders = SALES_TRANSACTIONS.filter((r) => r.region === reg);
    const count = orders.length;
    const units = orders.reduce((acc, r) => acc + r.units, 0);
    const rev = orders.reduce((acc, r) => acc + r.rev, 0);
    const aov = Math.round(rev / count);
    const share = ((rev / TOTAL_REVENUE) * 100).toFixed(1);

    return { region: reg, count, units, rev, aov, share };
  }).sort((a, b) => b.rev - a.rev);

  // Calculate Pivot Table Matrix (Region x Category)
  const categories = ["Laptops", "Smartphones", "Accessories"];
  const pivotMatrix = regions.map((reg) => {
    const row = { region: reg, total: 0 };
    categories.forEach((cat) => {
      const match = SALES_TRANSACTIONS.filter((r) => r.region === reg && r.cat === cat);
      const val = match.reduce((acc, r) => acc + r.rev, 0);
      row[cat] = val;
      row.total += val;
    });
    return row;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-slate-900/60 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                  Worked Case Study 3
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 22</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Worked Example 3: Grouping Sales by Region
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Analyze multi-branch commercial retail operations across North 24 Parganas. Construct regional revenue summaries, reshape categories with{" "}
                <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">pd.pivot_table()</code>, and compute market share metrics.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-cyan-500/20">
                ₹ Hub
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("sales_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "sales_studio"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🏢 Regional Sales Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: SALES STUDIO */}
        {activeTab === "sales_studio" && (
          <div className="space-y-6">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Total Bookings</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                  ₹{TOTAL_REVENUE.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-1">12 Orders Closed</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Top Territory</div>
                <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">Barrackpore</div>
                <div className="text-xs text-cyan-300 mt-1">₹985,000 (40.7% Share)</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Total Units Moved</div>
                <div className="text-2xl font-bold text-purple-400 font-mono mt-1">214 Units</div>
                <div className="text-xs text-slate-500 mt-1">Laptops &amp; Accessories</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Corporate AOV</div>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                  ₹{Math.round(TOTAL_REVENUE / SALES_TRANSACTIONS.length).toLocaleString()}
                </div>
                <div className="text-xs text-amber-300 mt-1">Avg per Order</div>
              </div>
            </div>

            {/* View Lens Selector */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🎛️</span> Select Sales Analysis Perspective
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "summary", label: "1. Regional Summary", icon: "📊" },
                  { id: "pivot", label: "2. Pivot Table Matrix", icon: "🔲" },
                  { id: "ledger", label: "3. Order Ledger", icon: "📋" },
                  { id: "leaderboard", label: "4. Rep Leaderboard", icon: "🏆" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSalesView(item.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      salesView === item.id
                        ? "bg-cyan-950/60 border-cyan-500 text-white shadow-md shadow-cyan-500/20"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-base mr-2">{item.icon}</span>
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* View Content Area */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              {/* 1. REGIONAL SUMMARY */}
              {salesView === "summary" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>📊</span> Territory Performance Leaderboard (df.groupby('Region'))
                  </h3>
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-950/80">
                        <th className="p-3 text-cyan-300">Territory Region</th>
                        <th className="p-3 text-slate-400">Orders</th>
                        <th className="p-3 text-slate-400">Units Sold</th>
                        <th className="p-3 text-emerald-400 font-bold">Total Revenue (INR)</th>
                        <th className="p-3 text-amber-300">Average Order Value (AOV)</th>
                        <th className="p-3 text-purple-300 font-bold">Market Share (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {regionalStats.map((row) => (
                        <tr key={row.region} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 text-white font-sans font-bold">{row.region}</td>
                          <td className="p-3 text-slate-400">{row.count} orders</td>
                          <td className="p-3 text-slate-300">{row.units} units</td>
                          <td className="p-3 text-emerald-400 font-bold">₹{row.rev.toLocaleString()}</td>
                          <td className="p-3 text-amber-300">₹{row.aov.toLocaleString()}</td>
                          <td className="p-3 font-bold text-purple-400">{row.share}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 2. PIVOT TABLE MATRIX */}
              {salesView === "pivot" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>🔲</span> Multi-Dimensional Pivot Matrix (pd.pivot_table(margins=True))
                  </h3>
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-950/80">
                        <th className="p-3 text-cyan-300">Region (Index)</th>
                        <th className="p-3 text-cyan-400">Laptops</th>
                        <th className="p-3 text-teal-400">Smartphones</th>
                        <th className="p-3 text-amber-400">Accessories</th>
                        <th className="p-3 text-emerald-400 font-bold bg-emerald-950/20">Total Region Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {pivotMatrix.map((r) => (
                        <tr key={r.region} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 text-white font-sans font-bold">{r.region}</td>
                          <td className="p-3 text-slate-200">₹{r.Laptops.toLocaleString()}</td>
                          <td className="p-3 text-slate-200">₹{r.Smartphones.toLocaleString()}</td>
                          <td className="p-3 text-slate-200">₹{r.Accessories.toLocaleString()}</td>
                          <td className="p-3 text-emerald-400 font-bold bg-emerald-950/10">
                            ₹{r.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 3. ORDER LEDGER */}
              {salesView === "ledger" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">
                    Raw Sales Transactions (12 Orders)
                  </h3>
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-950/80">
                        <th className="p-3 text-slate-400">OrderID</th>
                        <th className="p-3 text-teal-300">Sales Rep</th>
                        <th className="p-3 text-cyan-300">Region</th>
                        <th className="p-3 text-slate-300">Category</th>
                        <th className="p-3 text-slate-400">Units</th>
                        <th className="p-3 text-emerald-400 font-bold">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {SALES_TRANSACTIONS.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 text-slate-500">{tx.id}</td>
                          <td className="p-3 text-white font-sans font-semibold">{tx.rep}</td>
                          <td className="p-3 text-cyan-300 font-sans">{tx.region}</td>
                          <td className="p-3 text-slate-300">{tx.cat}</td>
                          <td className="p-3 text-slate-400">{tx.units}</td>
                          <td className="p-3 text-emerald-400 font-bold">₹{tx.rev.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 4. LEADERBOARD */}
              {salesView === "leaderboard" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>🏆</span> Top Sales Reps (df.groupby('SalesRep').sum())
                  </h3>
                  <div className="space-y-3">
                    {[
                      { rep: "Mahima", total: 670000, orders: 2, share: "27.7%" },
                      { rep: "Tuhina", total: 600000, orders: 2, share: "24.8%" },
                      { rep: "Debangshu", total: 400000, orders: 2, share: "16.5%" },
                      { rep: "Susmita", total: 390000, orders: 2, share: "16.1%" },
                      { rep: "Sachin", total: 277000, orders: 2, share: "11.4%" },
                      { rep: "Abhronila", total: 38000, orders: 1, share: "1.6%" },
                      { rep: "Swadeep", total: 45000, orders: 1, share: "1.9%" },
                    ].sort((a, b) => b.total - a.total).map((rep, idx) => (
                      <div key={rep.rep} className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold ${idx === 0 ? "bg-amber-400 text-slate-950" : idx === 1 ? "bg-slate-300 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                            {idx + 1}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-white">{rep.rep}</div>
                            <div className="text-xs text-slate-500 font-mono">{rep.orders} deals closed</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-emerald-400 font-mono">₹{rep.total.toLocaleString()}</div>
                          <div className="text-xs text-purple-400 font-mono">{rep.share} share</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Commercial Aggregation Patterns in Business Analytics"
              text="Notice how pd.pivot_table(margins=True) instantly provides executive visibility by creating horizontal category columns and automated column/row totals. In corporate accounting and ML forecasting, this pivot formulation provides the precise structured inputs required for revenue projection models!"
            />
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "python_code" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedScriptId === script.id
                      ? "bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    {script.badge}
                  </div>
                  <div className="font-bold text-sm text-slate-100">{script.title}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">{script.summary}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <h3 className="text-md font-bold text-white font-mono">{activeScript.fileName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeScript.summary}</p>
                </div>
              </div>
              <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === "theory_notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <PlainTextPrint text={noteText} title="Topic 22 Revision Notes: Worked Example 3" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 22 Knowledge Check: Worked Example 3" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic22;
