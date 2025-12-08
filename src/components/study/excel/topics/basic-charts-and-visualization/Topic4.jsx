import React, { Component } from "react";

function AxisDiagramSvg() {
  return (
    <svg
      viewBox="0 0 320 160"
      className="w-full max-w-xl mx-auto mt-2"
      role="img"
      aria-label="Chart with title, axis labels, legend and data labels"
    >
      {/* Background */}
      <rect x="0" y="0" width="320" height="160" rx="12" fill="#020617" />

      {/* Chart title */}
      <text
        x="160"
        y="20"
        fill="#e5e7eb"
        fontSize="12"
        textAnchor="middle"
      >
        Monthly Sales
      </text>

      {/* Y-axis label */}
      <text
        x="18"
        y="90"
        fill="#e5e7eb"
        fontSize="10"
        transform="rotate(-90 18 90)"
        textAnchor="middle"
      >
        Sales (₹)
      </text>

      {/* X-axis label */}
      <text
        x="160"
        y="150"
        fill="#e5e7eb"
        fontSize="10"
        textAnchor="middle"
      >
        Months
      </text>

      {/* Axes */}
      <line
        x1="40"
        y1="40"
        x2="40"
        y2="130"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <line
        x1="40"
        y1="130"
        x2="280"
        y2="130"
        stroke="#4b5563"
        strokeWidth="1"
      />

      {/* Bars */}
      <rect x="70" y="90" width="20" height="40" fill="#38bdf8" />
      <rect x="120" y="75" width="20" height="55" fill="#22c55e" />
      <rect x="170" y="60" width="20" height="70" fill="#a855f7" />

      {/* X labels */}
      <text x="80" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        Jan
      </text>
      <text x="130" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        Feb
      </text>
      <text x="180" y="142" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        Mar
      </text>

      {/* Data labels above bars */}
      <text x="80" y="86" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        20K
      </text>
      <text x="130" y="71" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        28K
      </text>
      <text x="180" y="56" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        35K
      </text>

      {/* Legend box */}
      <rect
        x="210"
        y="50"
        width="90"
        height="52"
        rx="8"
        fill="#020617"
        stroke="#4b5563"
      />
      <text x="255" y="62" fill="#e5e7eb" fontSize="9" textAnchor="middle">
        Legend
      </text>
      <rect x="218" y="70" width="10" height="6" fill="#38bdf8" />
      <text x="235" y="75" fill="#e5e7eb" fontSize="9">
        Sales 2025
      </text>
    </svg>
  );
}

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">
        <h1 className="text-2xl font-bold text-sky-300">
          Adding Titles, Axis Labels, Legends &amp; Data Labels
        </h1>

        <p>
          These elements make your chart self-explanatory. A viewer should
          understand the story without asking extra questions.
        </p>

        <h2 className="text-xl font-semibold text-sky-400">📌 Chart Title</h2>
        <p>
          A good chart title clearly states <strong>what</strong> the chart
          shows and often includes <strong>time period</strong> and{" "}
          <strong>units</strong>.  
          Example: <em>&quot;Monthly Sales of Coder &amp; AccoTax (₹, 2025)&quot;</em>
        </p>

        <h2 className="text-xl font-semibold text-sky-400">📌 Axis Labels</h2>
        <p>
          Axis labels define what each axis represents:
        </p>
        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>
            <strong>X-axis</strong> – usually categories or time (Months, Class,
            Product, Branch etc.).
          </li>
          <li>
            <strong>Y-axis</strong> – usually numeric values (Marks, Sales in ₹,
            No. of Students etc.).
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-sky-400">
          📌 Legend &amp; Data Labels
        </h2>
        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>
            <strong>Legend</strong> explains which color or symbol represents
            which series.
          </li>
          <li>
            <strong>Data labels</strong> show actual values on bars, columns,
            points or slices.
          </li>
        </ul>

        <AxisDiagramSvg />

        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-sm">
          <h3 className="font-semibold text-emerald-300 mb-1">Teacher&apos;s Tip</h3>
          <p>
            Ask students to &quot;read the chart aloud&quot; only using the
            title, axis labels, legend and data labels. If they can describe it
            clearly, your chart is well-designed.
          </p>
        </div>
      </div>
    );
  }
}
