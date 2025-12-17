import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-12">

        {/* ================= HEADING ================= */}
        <h2 className="text-xl font-semibold text-sky-300">
          Syntax of <code>for</code> Loop (ICSE Class IX)
        </h2>

        {/* ================= INTRO ================= */}
        <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
          The <b>for loop</b> is used when the number of repetitions is
          <b> known in advance</b>.  
          It combines <b>initialization</b>, <b>condition checking</b>, and
          <b> updation</b> in a single line, making the loop compact and readable.
        </p>

        {/* ================= SVG FLOW DIAGRAM ================= */}
        <div className="flex justify-center">
          <svg
            width="520"
            height="180"
            viewBox="0 0 520 180"
            className="transition-transform duration-300 hover:scale-105"
          >
            {/* Initialization */}
            <rect x="20" y="60" width="140" height="55" rx="10" fill="#0ea5e9" />
            <text x="35" y="92" fill="#fff" fontSize="14" fontWeight="600">
              Initialization
            </text>

            {/* Arrow */}
            <line x1="160" y1="88" x2="200" y2="88" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="200,88 192,82 192,94" fill="#94a3b8" />

            {/* Condition */}
            <rect x="200" y="60" width="140" height="55" rx="10" fill="#22c55e" />
            <text x="230" y="92" fill="#fff" fontSize="14" fontWeight="600">
              Condition
            </text>

            {/* Arrow */}
            <line x1="340" y1="88" x2="380" y2="88" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="380,88 372,82 372,94" fill="#94a3b8" />

            {/* Update */}
            <rect x="380" y="60" width="120" height="55" rx="10" fill="#f97316" />
            <text x="400" y="92" fill="#fff" fontSize="14" fontWeight="600">
              Update
            </text>

            {/* Loop back arrow */}
            <path
              d="M440 60 C440 20, 260 20, 260 60"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrow)"
            />

            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="5"
                refY="5"
                orient="auto"
              >
                <polygon points="0,0 10,5 0,10" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* ================= SYNTAX ================= */}
        <div>
          <h3 className="text-sky-200 font-semibold mb-2">Syntax</h3>
          <JavaCodeBlock
            code={`for(initialization; condition; update)
{
    statements;
}`}
          />
        </div>

        {/* ================= EXAMPLE 1 ================= */}
        <div>
          <h3 className="text-sky-200 font-semibold mb-2">
            Example 1: Print numbers from 1 to 5
          </h3>
          <JavaCodeBlock
            code={`for(int i = 1; i <= 5; i++)
{
    System.out.println(i);
}`}
          />
        </div>

        {/* ================= EXAMPLE 2 ================= */}
        <div>
          <h3 className="text-sky-200 font-semibold mb-2">
            Example 2: Print even numbers from 2 to 10
          </h3>
          <JavaCodeBlock
            code={`for(int i = 2; i <= 10; i += 2)
{
    System.out.println(i);
}`}
          />
        </div>

        {/* ================= TEACHER NOTE ================= */}
        <div className="rounded-xl border border-emerald-700/40 bg-emerald-900/20 p-4 text-sm text-emerald-300">
          👩‍🏫 <b>Teacher Note (ICSE):</b><br />
          In Class IX, ICSE generally expects <b>simple, non-nested for loops</b>.
          Nested loops are introduced in higher classes.
        </div>

        {/* ================= TIP ================= */}
        <div className="rounded-xl border border-yellow-700/40 bg-yellow-900/20 p-4 text-sm text-yellow-300">
          💡 <b>Tip:</b>  
          Initialization executes <b>only once</b>.  
          Condition is checked <b>before every iteration</b>.
        </div>

      </div>
    );
  }
}
