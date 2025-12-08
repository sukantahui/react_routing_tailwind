import React, { Component } from "react";

function EmbeddedVsSheetSvg() {
  return (
    <svg
      viewBox="0 0 320 160"
      className="w-full max-w-xl mx-auto mt-2"
      role="img"
      aria-label="Embedded chart inside sheet vs chart sheet"
    >
      <rect x="0" y="0" width="320" height="160" rx="12" fill="#020617" />

      {/* Sheet with embedded chart */}
      <rect x="16" y="20" width="140" height="110" rx="8" fill="#020617" stroke="#4b5563" />
      <text x="86" y="34" fill="#e5e7eb" fontSize="10" textAnchor="middle">
        Sheet1 (Embedded)
      </text>

      {/* cells grid hint */}
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={22 + c * 20}
            y={40 + r * 14}
            width="18"
            height="12"
            fill="#020617"
            stroke="#1f2937"
            strokeWidth="0.6"
          />
        ))
      )}

      {/* embedded chart area */}
      <rect x="80" y="60" width="60" height="50" rx="6" fill="#020617" stroke="#38bdf8" />
      <rect x="86" y="90" width="10" height="18" fill="#38bdf8" />
      <rect x="100" y="82" width="10" height="26" fill="#22c55e" />
      <rect x="114" y="74" width="10" height="34" fill="#f97316" />

      {/* Chart sheet */}
      <rect x="176" y="20" width="128" height="110" rx="8" fill="#020617" stroke="#4b5563" />
      <text x="240" y="34" fill="#e5e7eb" fontSize="10" textAnchor="middle">
        Chart1 (Chart Sheet)
      </text>

      {/* large chart only */}
      <line x1="190" y1="110" x2="290" y2="110" stroke="#4b5563" strokeWidth="1" />
      <line x1="190" y1="50" x2="190" y2="110" stroke="#4b5563" strokeWidth="1" />
      <polyline
        points="195,100 215,90 235,80 255,70 285,60"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[195, 215, 235, 255, 285].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy={[100, 90, 80, 70, 60][i]}
          r="2.5"
          fill="#f9fafb"
        />
      ))}

      {/* labels bottom */}
      <text x="86" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        Embedded chart inside worksheet
      </text>
      <text x="240" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        Full-page chart sheet
      </text>
    </svg>
  );
}

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">
        <h1 className="text-2xl font-bold text-sky-300">
          Moving & Resizing Charts — Embedded vs Chart Sheet
        </h1>

        <p>
          Excel charts can either live inside the worksheet where your data is
          stored (embedded), or on a separate sheet (chart sheet) that focuses
          only on the visual.
        </p>

        <h2 className="text-xl font-semibold text-sky-400">🧩 Embedded Charts</h2>
        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>Sit directly on top of your worksheet grid.</li>
          <li>Good for dashboards and reports with data + chart together.</li>
          <li>You can resize and move them like images.</li>
        </ul>

        <h2 className="text-xl font-semibold text-sky-400">📄 Chart Sheets</h2>
        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>A dedicated sheet only for the chart.</li>
          <li>Perfect for printing or projecting in a classroom.</li>
          <li>The same data remains in the original worksheet.</li>
        </ul>

        <EmbeddedVsSheetSvg />

        <div className="p-4 rounded-xl bg-blue-900/30 border border-blue-500/40 text-sm">
          <h3 className="font-semibold text-blue-300 mb-1">Teacher’s Tip</h3>
          <p>
            For day-to-day work, use embedded charts. For final presentation or
            print, move the most important chart to a chart sheet.
          </p>
        </div>
      </div>
    );
  }
}
