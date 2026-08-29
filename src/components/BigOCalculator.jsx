import React, { useState, useMemo } from "react";

export default function BigOCalculator() {
  const [nInput, setNInput] = useState(100);
  const [activeTab, setActiveTab] = useState("O(N)");

  const n = Math.max(1, Math.min(1000000, Number(nInput) || 1));

  // Calculates operation counts for given N
  const calculations = useMemo(() => {
    const logN = Math.log2(n);
    const nLogN = n * logN;
    const n2 = Math.pow(n, 2);
    const twoN = n <= 30 ? Math.pow(2, n) : Infinity;

    return [
      {
        name: "O(1)",
        label: "Constant Time",
        color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        steps: 1,
        desc: "Executes in same time regardless of input size (e.g. array lookup by index).",
        cCode: "int get_first(int arr[]) {\n    return arr[0]; // Always 1 step\n}",
      },
      {
        name: "O(log N)",
        label: "Logarithmic Time",
        color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
        steps: Math.ceil(logN),
        desc: "Divides input size in half at each step (e.g. Binary Search).",
        cCode: "while (low <= high) {\n    int mid = low + (high - low) / 2;\n    // halves search space\n}",
      },
      {
        name: "O(N)",
        label: "Linear Time",
        color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
        steps: n,
        desc: "Scales proportionally with input size N (e.g. Linear Search, single loop).",
        cCode: "for (int i = 0; i < N; i++) {\n    printf(\"%d\\n\", arr[i]);\n}",
      },
      {
        name: "O(N log N)",
        label: "Linearithmic Time",
        color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
        steps: Math.round(nLogN),
        desc: "Optimal sorting complexity (e.g. Merge Sort, Quick Sort).",
        cCode: "void merge_sort(int arr[], int l, int r) {\n    // Divide N by 2 (log N levels) * N work\n}",
      },
      {
        name: "O(N²)",
        label: "Quadratic Time",
        color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
        steps: n2,
        desc: "Nested loops over input N (e.g. Bubble Sort, Selection Sort).",
        cCode: "for (int i = 0; i < N; i++) {\n    for (int j = 0; j < N; j++) {\n        // N * N iterations\n    }\n}",
      },
      {
        name: "O(2ⁿ)",
        label: "Exponential Time",
        color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
        steps: twoN,
        desc: "Doubles with every addition to input (e.g. Naive Recursive Fibonacci).",
        cCode: "int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2); // 2^N calls\n}",
      },
    ];
  }, [n]);

  const activeCalc = calculations.find((c) => c.name === activeTab) || calculations[2];

  // Helper to format operation steps
  const formatSteps = (steps) => {
    if (!isFinite(steps)) return "∞ (Overflow)";
    if (steps >= 1e12) return (steps / 1e12).toFixed(2) + " Trillion";
    if (steps >= 1e9) return (steps / 1e9).toFixed(2) + " Billion";
    if (steps >= 1e6) return (steps / 1e6).toFixed(2) + " Million";
    return steps.toLocaleString();
  };

  // Helper to estimate runtime assuming 10^9 operations per second
  const formatEstTime = (steps) => {
    if (!isFinite(steps)) return "Exceeds Universe Lifetime";
    const sec = steps / 1e9;
    if (sec < 0.000001) return "< 1 microsecond";
    if (sec < 0.001) return (sec * 1000).toFixed(3) + " ms";
    if (sec < 60) return sec.toFixed(2) + " seconds";
    if (sec < 3600) return (sec / 60).toFixed(1) + " minutes";
    if (sec < 86400) return (sec / 3600).toFixed(1) + " hours";
    return (sec / 86400).toFixed(1) + " days";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30 text-xl">
              <i className="bi bi-calculator-fill"></i>
            </span>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 bg-clip-text text-transparent">
                Big-O Complexity Calculator &amp; Profiler
              </h1>
              <p className="text-xs text-slate-400">
                Theoretical operation step counter and asymptotic growth rate estimator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-2 rounded-xl">
            <label className="text-xs font-semibold text-slate-400 pl-2">Input Size N:</label>
            <input
              type="number"
              min="1"
              max="1000000"
              value={nInput}
              onChange={(e) => setNInput(e.target.value)}
              className="w-28 bg-slate-900 border border-slate-700 text-purple-300 font-mono font-bold text-center text-sm rounded-lg p-1.5 focus:border-purple-500 outline-none"
            />
            <div className="flex gap-1">
              {[10, 100, 1000, 10000].map((val) => (
                <button
                  key={val}
                  onClick={() => setNInput(val)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-mono rounded text-slate-300 transition"
                >
                  {val >= 1000 ? `${val / 1000}k` : val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Complexity Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {calculations.map((item) => {
            const isSelected = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? `${item.color} shadow-lg ring-2 ring-purple-500/40`
                    : "bg-slate-900/50 border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <div className="text-lg font-bold font-mono">{item.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{item.label}</div>
                <div className="mt-2 text-xs font-mono font-semibold text-slate-200">
                  {formatSteps(item.steps)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-sm font-bold font-mono rounded-lg border ${activeCalc.color}`}>
                  {activeCalc.name}
                </span>
                <span className="text-lg font-semibold text-slate-200">{activeCalc.label}</span>
              </div>
              <span className="text-xs text-slate-400">At N = {n.toLocaleString()}</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{activeCalc.desc}</p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl">
                <span className="text-xs text-slate-400 block">Total Operations (Steps)</span>
                <span className="text-xl font-bold font-mono text-purple-300">
                  {formatSteps(activeCalc.steps)}
                </span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl">
                <span className="text-xs text-slate-400 block">Est. Time (@ 1 GHz CPU)</span>
                <span className="text-xl font-bold font-mono text-emerald-300">
                  {formatEstTime(activeCalc.steps)}
                </span>
              </div>
            </div>

            {/* Code Snippet Example */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-2">
                <i className="bi bi-code-slash text-purple-400"></i> C Code Pattern Example
              </label>
              <pre className="bg-slate-950 border border-slate-800/90 p-4 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto">
                {activeCalc.cCode}
              </pre>
            </div>
          </div>

          {/* Comparative Summary Table */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <i className="bi bi-bar-chart-fill text-cyan-400"></i> Relative Growth Comparison
            </h3>
            <div className="space-y-3">
              {calculations.map((c) => {
                const maxSteps = calculations[4].steps; // scale relative to N^2
                const ratio = Math.min(100, Math.max(4, (c.steps / (maxSteps || 1)) * 100));

                return (
                  <div key={c.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{c.name}</span>
                      <span className="text-slate-400">{formatSteps(c.steps)}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${ratio}%` }}
                        className={`h-full transition-all duration-300 ${
                          c.name === activeTab ? "bg-purple-500" : "bg-slate-700"
                        }`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
