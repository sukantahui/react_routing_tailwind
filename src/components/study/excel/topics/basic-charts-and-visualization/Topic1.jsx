import React, { Component } from "react";

/* ===========================================================
   SVG 1 — COLUMN CHART
=========================================================== */
class ColumnChartSvg extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 260 180"
        className="w-full max-w-xl mx-auto"
        aria-label="Column chart example"
      >
        {/* Background */}
        <rect width="260" height="180" rx="12" fill="#0f172a" />

        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="150" stroke="#475569" strokeWidth="1" />
        <line x1="40" y1="150" x2="230" y2="150" stroke="#475569" strokeWidth="1" />

        {/* Bars */}
        <rect x="60" y="60" width="30" height="90" fill="#38bdf8" />
        <rect x="105" y="100" width="30" height="50" fill="#38bdf8" />
        <rect x="150" y="40" width="30" height="110" fill="#38bdf8" />
        <rect x="195" y="110" width="30" height="40" fill="#38bdf8" />

        {/* X-axis labels */}
        <text x="75" y="165" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          Laptop
        </text>
        <text x="120" y="165" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          Tablet
        </text>
        <text x="165" y="165" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          Phone
        </text>
        <text x="210" y="165" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          Desktop
        </text>

        {/* Title */}
        <text x="130" y="18" fill="#e5e7eb" fontSize="12" textAnchor="middle">
          Sales (Column Chart)
        </text>
      </svg>
    );
  }
}

/* ===========================================================
   SVG 2 — BAR CHART (Horizontal)
=========================================================== */
class BarChartSvg extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 260 180"
        className="w-full max-w-xl mx-auto"
        aria-label="Bar chart example"
      >
        <rect width="260" height="180" rx="12" fill="#0f172a" />

        {/* Bars */}
        <rect x="90" y="30" width="120" height="18" fill="#fb7185" />
        <rect x="90" y="65" width="80" height="18" fill="#fb7185" />
        <rect x="90" y="100" width="150" height="18" fill="#fb7185" />
        <rect x="90" y="135" width="60" height="18" fill="#fb7185" />

        {/* Labels */}
        <text x="70" y="44" fill="#e5e7eb" fontSize="11" textAnchor="end">
          Laptop
        </text>
        <text x="70" y="79" fill="#e5e7eb" fontSize="11" textAnchor="end">
          Tablet
        </text>
        <text x="70" y="114" fill="#e5e7eb" fontSize="11" textAnchor="end">
          Phone
        </text>
        <text x="70" y="149" fill="#e5e7eb" fontSize="11" textAnchor="end">
          Desktop
        </text>

        <text x="130" y="18" fill="#e5e7eb" fontSize="12" textAnchor="middle">
          Sales (Bar Chart)
        </text>
      </svg>
    );
  }
}

/* ===========================================================
   SVG 3 — LINE CHART
=========================================================== */
class LineChartSvg extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 260 180"
        className="w-full max-w-xl mx-auto"
        aria-label="Line chart example"
      >
        <rect width="260" height="180" rx="12" fill="#0f172a" />

        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="150" stroke="#475569" />
        <line x1="40" y1="150" x2="230" y2="150" stroke="#475569" />

        {/* Line */}
        <polyline
          points="60,120 120,80 180,40 230,90"
          fill="none"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Points */}
        <circle cx="60" cy="120" r="4" fill="#4ade80" />
        <circle cx="120" cy="80" r="4" fill="#4ade80" />
        <circle cx="180" cy="40" r="4" fill="#4ade80" />
        <circle cx="230" cy="90" r="4" fill="#4ade80" />

        {/* X-labels */}
        <text x="60" y="165" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          Laptop
        </text>
        <text x="120" y="165" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          Tablet
        </text>
        <text x="180" y="165" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          Phone
        </text>
        <text x="230" y="165" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          Desktop
        </text>

        <text x="130" y="18" fill="#e5e7eb" fontSize="12" textAnchor="middle">
          Trend (Line Chart)
        </text>
      </svg>
    );
  }
}

/* ===========================================================
   SVG 4 — PIE CHART
=========================================================== */
class PieChartSvg extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-full max-w-sm mx-auto"
        aria-label="Pie chart example"
      >
        {/* Background */}
        <rect width="200" height="200" rx="12" fill="#0f172a" />

        {/* Pie slices */}
        <circle cx="100" cy="100" r="60" fill="#38bdf8" />
        <path
          d="M100 100 L100 40 A60 60 0 0 1 180 120 Z"
          fill="#fb7185"
        />
        <path
          d="M100 100 L180 120 A60 60 0 0 1 40 130 Z"
          fill="#4ade80"
        />

        {/* Labels */}
        <text x="100" y="185" fill="#e5e7eb" fontSize="12" textAnchor="middle">
          Product Share (Pie Chart)
        </text>
      </svg>
    );
  }
}

/* ===========================================================
   MAIN TOPIC COMPONENT
=========================================================== */
export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200">
        
        <h1 className="text-2xl font-bold text-sky-300">
          Creating Column, Bar, Line & Pie Charts
        </h1>

        <p>
          Excel lets you convert selected data into meaningful visuals using simple
          one-click chart tools such as Column, Bar, Line, and Pie charts.
        </p>

        {/* Sample Data */}
        <h2 className="text-lg font-semibold text-sky-400">📘 Sample Data</h2>
        <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`Product     Sales
Laptop      85
Tablet      50
Phone       120
Desktop     40`}
        </pre>

        {/* SVG Chart Examples */}
        <h2 className="text-xl font-semibold text-sky-400">🟦 Column Chart</h2>
        <p>Used for comparing categories vertically.</p>
        <ColumnChartSvg />

        <h2 className="text-xl font-semibold text-sky-400">🟥 Bar Chart</h2>
        <p>Horizontal version of a column chart — perfect for long category names.</p>
        <BarChartSvg />

        <h2 className="text-xl font-semibold text-sky-400">📈 Line Chart</h2>
        <p>Shows changes and trends over time.</p>
        <LineChartSvg />

        <h2 className="text-xl font-semibold text-sky-400">🥧 Pie Chart</h2>
        <p>Shows percentage contribution of each category.</p>
        <PieChartSvg />

        {/* Teacher Tip */}
        <div className="p-4 rounded-xl bg-blue-900/30 border border-blue-500/40">
          <h3 className="font-semibold text-blue-300">Teacher’s Tip</h3>
          <p className="text-sm">
            Avoid using pie charts for more than 5–6 categories.  
            Too many slices make the chart confusing and unreadable.
          </p>
        </div>

      </div>
    );
  }
}
