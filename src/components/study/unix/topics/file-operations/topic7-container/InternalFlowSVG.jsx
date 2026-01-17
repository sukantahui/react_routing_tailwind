import React, { Component } from "react";

export default class InternalFlowSVG extends Component {
  render() {
    return (
      <section className="bg-slate-100 dark:bg-slate-800 p-6 rounded-3xl">
        <h2 className="text-xl font-semibold text-sky-400 mb-4">
          How tail -f Works Internally
        </h2>

        <svg viewBox="0 0 600 200" className="w-full">
          <rect x="20" y="60" width="200" height="80" rx="10" fill="#e5e7eb" />
          <text x="120" y="105" textAnchor="middle">Log File</text>

          <rect x="350" y="60" width="200" height="80" rx="10" fill="#bfdbfe" />
          <text x="450" y="105" textAnchor="middle">tail -f</text>

          <line x1="220" y1="100" x2="350" y2="100" stroke="black" strokeWidth="2" />
        </svg>
      </section>
    );
  }
}
