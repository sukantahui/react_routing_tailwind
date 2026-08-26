import React, { Component } from "react";

class SalesLineChartSvg extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 320 180"
        className="w-full max-w-xl mx-auto mt-3"
        role="img"
        aria-label="Simple upward trend line chart for Jan–Mar"
      >
        {/* Background */}
        <rect width="320" height="180" rx="12" fill="#0f172a" />

        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="150" stroke="#475569" strokeWidth="1" />
        <line x1="40" y1="150" x2="290" y2="150" stroke="#475569" strokeWidth="1" />

        {/* Line path (Jan → Feb → Mar) */}
        <polyline
          points="60,130 150,90 240,50"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Data Points */}
        <circle cx="60" cy="130" r="4" fill="#38bdf8" />
        <circle cx="150" cy="90" r="4" fill="#38bdf8" />
        <circle cx="240" cy="50" r="4" fill="#38bdf8" />

        {/* Value Labels */}
        <text x="60" y="125" fill="#e5e7eb" fontSize="10" textAnchor="middle">
          12K
        </text>
        <text x="150" y="85" fill="#e5e7eb" fontSize="10" textAnchor="middle">
          18K
        </text>
        <text x="240" y="45" fill="#e5e7eb" fontSize="10" textAnchor="middle">
          24K
        </text>

        {/* X-axis Labels */}
        <text x="60" y="165" fill="#e5e7eb" fontSize="11" textAnchor="middle">
          Jan
        </text>
        <text x="150" y="165" fill="#e5e7eb" fontSize="11" textAnchor="middle">
          Feb
        </text>
        <text x="240" y="165" fill="#e5e7eb" fontSize="11" textAnchor="middle">
          Mar
        </text>

        {/* Y-axis Label (rotated) */}
        <text
          x="15"
          y="90"
          fill="#e5e7eb"
          fontSize="10"
          transform="rotate(-90 15 90)"
          textAnchor="middle"
        >
          Sales (₹)
        </text>

        {/* Chart Title */}
        <text
          x="160"
          y="18"
          fill="#e5e7eb"
          fontSize="12"
          textAnchor="middle"
        >
          Monthly Sales Trend
        </text>
      </svg>
    );
  }
}

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          Why Charts Matter: Seeing Patterns & Trends Visually
        </h1>

        <p className="leading-relaxed">
          Charts turn raw numbers into a visual story. A simple line or bar 
          chart can instantly reveal patterns that are hard to notice in a table.
        </p>

        <ul className="list-disc ml-6 space-y-1">
          <li>Growth over time</li>
          <li>Comparisons between categories</li>
          <li>Patterns and outliers</li>
          <li>Trends and performance changes</li>
        </ul>

        <h2 className="text-xl font-semibold text-sky-400">📊 Example Data</h2>

        <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`Month     Sales
Jan       12000
Feb       18000
Mar       24000`}
        </pre>

        <p>
          Visualizing this using a <strong>line chart</strong> makes 
          the upward trend immediately clear.
        </p>

        {/* SVG Diagram */}
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-sky-300 font-semibold text-center mb-2">
            Visual Representation (SVG Chart)
          </p>
          <SalesLineChartSvg />
        </div>

        <h2 className="text-xl font-semibold text-sky-400">🔍 Why Visuals Matter</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>The brain processes visuals 60,000× faster than text</li>
          <li>Charts reveal trends and errors quickly</li>
          <li>They improve presentations and decision-making</li>
        </ul>

        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40">
          <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
          <p className="text-sm">
            Choose a chart that tells the right story. Don’t use visuals 
            just for decoration—use them for clarity.
          </p>
        </div>

      </div>
    );
  }
}
