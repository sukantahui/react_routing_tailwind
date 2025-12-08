import React, { Component } from "react";

function ChartTypesSvg() {
  return (
    <svg
      viewBox="0 0 320 120"
      className="w-full max-w-xl mx-auto mt-2"
      role="img"
      aria-label="Different chart types: column, bar, line and pie"
    >
      {/* Background */}
      <rect x="0" y="0" width="320" height="120" rx="12" fill="#020617" />

      {/* Column chart */}
      <text x="35" y="20" fill="#e5e7eb" fontSize="10" textAnchor="middle">
        Column
      </text>
      <line
        x1="20"
        y1="100"
        x2="80"
        y2="100"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <line
        x1="20"
        y1="60"
        x2="20"
        y2="100"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <rect x="25" y="80" width="10" height="20" fill="#38bdf8" />
      <rect x="40" y="70" width="10" height="30" fill="#22c55e" />
      <rect x="55" y="60" width="10" height="40" fill="#a855f7" />

      {/* Bar chart */}
      <text x="135" y="20" fill="#e5e7eb" fontSize="10" textAnchor="middle">
        Bar
      </text>
      <line
        x1="100"
        y1="100"
        x2="160"
        y2="100"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <line
        x1="100"
        y1="60"
        x2="100"
        y2="100"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <rect x="105" y="90" width="35" height="7" fill="#f97316" />
      <rect x="105" y="80" width="25" height="7" fill="#22c55e" />
      <rect x="105" y="70" width="45" height="7" fill="#38bdf8" />

      {/* Line chart */}
      <text x="235" y="20" fill="#e5e7eb" fontSize="10" textAnchor="middle">
        Line
      </text>
      <line
        x1="200"
        y1="100"
        x2="260"
        y2="100"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <line
        x1="200"
        y1="60"
        x2="200"
        y2="100"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <polyline
        points="205,90 220,80 235,70 250,75 260,65"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[205, 220, 235, 250, 260].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy={[90, 80, 70, 75, 65][i]}
          r="2.5"
          fill="#f9fafb"
        />
      ))}

      {/* Pie chart */}
      <g transform="translate(275, 55)">
        <text
          x="0"
          y="-38"
          fill="#e5e7eb"
          fontSize="10"
          textAnchor="middle"
        >
          Pie
        </text>
        <circle r="16" fill="#0f172a" stroke="#4b5563" strokeWidth="1" />
        {/* slices */}
        <path d="M 0 0 L 16 0 A 16 16 0 0 1 0 16 Z" fill="#38bdf8" />
        <path d="M 0 0 L 0 16 A 16 16 0 0 1 -11 -11 Z" fill="#22c55e" />
        <path d="M 0 0 L -11 -11 A 16 16 0 0 1 16 0 Z" fill="#f97316" />
      </g>
    </svg>
  );
}

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">
        <h1 className="text-2xl font-bold text-sky-300">
          Changing Chart Types, Layouts & Styles
        </h1>

        <p>
          Excel allows you to modify a chart at any time using the{" "}
          <strong>Chart Design</strong> and <strong>Format</strong> tabs. This
          helps you refine the look, readability, and purpose of the chart.
        </p>

        <h2 className="text-xl font-semibold text-sky-400">
          🟦 Common Chart Types
        </h2>
        <p>Different chart types highlight data in different ways:</p>

        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li>Column – compare values across categories</li>
          <li>Bar – compare with long text labels</li>
          <li>Line – show trends over time</li>
          <li>Pie – show parts of a whole (percentages)</li>
        </ul>

        <ChartTypesSvg />

        <h2 className="text-xl font-semibold text-sky-400">
          🎨 Layouts & Styles
        </h2>
        <p>
          Styles control the overall look; layouts control which elements are
          visible (title, legend, labels, gridlines, etc.).
        </p>

        <div className="p-4 rounded-xl bg-blue-900/25 border border-blue-500/40 text-sm">
          <h3 className="font-semibold text-blue-300 mb-1">Teacher&apos;s Tip</h3>
          <p>
            Start with a simple chart type and only add elements (legend, labels
            etc.) if they make the story clearer, not more crowded.
          </p>
        </div>
      </div>
    );
  }
}
