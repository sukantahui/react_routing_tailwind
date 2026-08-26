import React, { Component } from "react";

function MisleadingVsHonestSvg() {
  return (
    <svg
      viewBox="0 0 320 160"
      className="w-full max-w-xl mx-auto mt-2"
      role="img"
      aria-label="Misleading chart vs honest chart"
    >
      <rect x="0" y="0" width="320" height="160" rx="12" fill="#020617" />

      {/* Misleading chart */}
      <text x="80" y="18" fill="#f97316" fontSize="11" textAnchor="middle">
        Misleading Y-axis
      </text>

      {/* axes */}
      <line x1="20" y1="40" x2="20" y2="130" stroke="#4b5563" strokeWidth="1" />
      <line x1="20" y1="130" x2="140" y2="130" stroke="#4b5563" strokeWidth="1" />

      {/* y labels compressed (start at 90 instead of 0) */}
      <text x="24" y="120" fill="#9ca3af" fontSize="8">
        90
      </text>
      <text x="24" y="90" fill="#9ca3af" fontSize="8">
        100
      </text>
      <text x="24" y="60" fill="#9ca3af" fontSize="8">
        110
      </text>

      {/* Bars – small real difference, visually huge */}
      <rect x="50" y="95" width="20" height="35" fill="#38bdf8" />
      <rect x="95" y="60" width="20" height="70" fill="#ef4444" />

      <text x="60" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        A
      </text>
      <text x="105" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        B
      </text>

      {/* Honest chart */}
      <text x="240" y="18" fill="#22c55e" fontSize="11" textAnchor="middle">
        Honest Y-axis
      </text>

      <line x1="180" y1="40" x2="180" y2="130" stroke="#4b5563" strokeWidth="1" />
      <line x1="180" y1="130" x2="300" y2="130" stroke="#4b5563" strokeWidth="1" />

      {/* y labels start at 0 */}
      <text x="184" y="130" fill="#9ca3af" fontSize="8">
        0
      </text>
      <text x="184" y="105" fill="#9ca3af" fontSize="8">
        50
      </text>
      <text x="184" y="80" fill="#9ca3af" fontSize="8">
        100
      </text>
      <text x="184" y="55" fill="#9ca3af" fontSize="8">
        150
      </text>

      {/* Bars – same real difference, visually realistic */}
      <rect x="210" y="80" width="20" height="50" fill="#38bdf8" />
      <rect x="255" y="70" width="20" height="60" fill="#22c55e" />

      <text x="220" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        A
      </text>
      <text x="265" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        B
      </text>
    </svg>
  );
}

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">
        <h1 className="text-2xl font-bold text-sky-300">
          Best Practices: Avoid Misleading Charts & Keep Them Simple
        </h1>

        <p>
          Charts are powerful. If designed carelessly, they can{" "}
          <strong>mislead</strong> instead of informing. As a responsible
          analyst or teacher, you must ensure charts are honest and clear.
        </p>

        <h2 className="text-xl text-sky-400 font-semibold">
          ❌ Distorted Y-Axis = Misleading Story
        </h2>
        <p className="text-sm">
          If you start the Y-axis from a high value instead of 0, small
          differences look huge. The viewer may think a tiny increase is a big
          jump.
        </p>

        <MisleadingVsHonestSvg />

        <h2 className="text-xl text-sky-400 font-semibold">
          ✔ Simple, Honest, Readable Charts
        </h2>
        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>Start the Y-axis at zero for bar charts in most cases.</li>
          <li>Avoid unnecessary 3D effects—they distort perception.</li>
          <li>Use limited, consistent colors across your report.</li>
          <li>Don&apos;t overload charts with too many labels or series.</li>
        </ul>

        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-sm">
          <h3 className="font-semibold text-emerald-300 mb-1">Teacher’s Tip</h3>
          <p>
            Show both a misleading version and a correct version in class. Ask
            students: “Which one tells the truth better?” This builds visual
            literacy.
          </p>
        </div>
      </div>
    );
  }
}
