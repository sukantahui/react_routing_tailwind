import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <h2 className="text-xl font-semibold text-sky-300 tracking-wide">
          Number Based Programs using for Loop
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          ICSE Class IX frequently uses <b>number-based problems</b> to test
          understanding of loop execution, logic building, and dry-run skills.
        </p>

        {/* ================= ANIMATED SVG ================= */}
        <div className="flex justify-center">
          <svg
            width="620"
            height="180"
            viewBox="0 0 620 180"
            className="group"
          >
            {/* Boxes */}
            {[
              { x: 20, text: "Start", color: "#22c55e", delay: "0ms" },
              { x: 140, text: "Initialize i", color: "#0ea5e9", delay: "200ms" },
              { x: 280, text: "Check Condition", color: "#22c55e", delay: "400ms" },
              { x: 440, text: "Perform Calculation", color: "#a855f7", delay: "600ms" },
              { x: 300, text: "Update i", color: "#f97316", delay: "800ms" }
            ].map((b, i) => (
              <g key={i}>
                <rect
                  x={b.x}
                  y="60"
                  width="120"
                  height="40"
                  rx="10"
                  fill={b.color}
                  className={`opacity-40 group-hover:opacity-100 transition-all duration-500 delay-[${b.delay}]`}
                />
                <text x={b.x + 10} y="85" fill="#fff" fontSize="13">
                  {b.text}
                </text>
              </g>
            ))}

            {/* Arrows */}
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
              </marker>
            </defs>

            <line x1="140" y1="80" x2="280" y2="80" stroke="#94a3b8" markerEnd="url(#arrow)" />
            <line x1="280" y1="100" x2="440" y2="100" stroke="#94a3b8" markerEnd="url(#arrow)" />
            <line x1="440" y1="80" x2="420" y2="40" stroke="#94a3b8" markerEnd="url(#arrow)" />
            <text x="430" y="35" fill="#94a3b8" fontSize="12">
              Repeat
            </text>
          </svg>
        </div>

        {/* ================= PROGRAM 1 ================= */}
        <JavaCodeBlock
          title="ICSE Example 1: Sum of first 10 natural numbers"
          highlightLines={[1, 3, 4]}
          code={`int sum = 0;
for(int i = 1; i <= 10; i++)
{
    sum = sum + i;
}
System.out.println(sum);`}
        />

        {/* ================= PROGRAM 2 ================= */}
        <JavaCodeBlock
          title="ICSE Example 2: Count number of digits"
          highlightLines={[2, 4]}
          code={`int n = 4589;
int count = 0;
for(; n > 0; n = n / 10)
{
    count++;
}
System.out.println(count);`}
        />

        {/* ================= PROGRAM 3 ================= */}
        <JavaCodeBlock
          title="ICSE Example 3: Reverse a number"
          highlightLines={[3, 5]}
          code={`int n = 1234;
int rev = 0;
for(; n > 0; n = n / 10)
{
    rev = rev * 10 + (n % 10);
}
System.out.println(rev);`}
        />

        {/* ================= EXPLANATION ================= */}
        <div className="text-slate-300 text-sm space-y-2">
          <p>• Program 1 uses accumulation logic (sum = sum + i)</p>
          <p>• Program 2 uses loop without initialization inside for()</p>
          <p>• Program 3 uses digit extraction using modulo operator</p>
        </div>

        {/* ================= TEACHER NOTE ================= */}
        <p className="text-emerald-300 text-sm">
          👩‍🏫 <b>Teacher Note:</b>  
          Number-based programs are guaranteed in ICSE exams.
          Students must clearly identify initialization, condition, and update.
        </p>

        {/* ================= TIPS & TRICKS ================= */}
        <p className="text-yellow-300 text-sm">
          💡 <b>Tips & Tricks:</b>  
          • Always dry-run with a table  
          • Check update direction carefully  
          • Use meaningful variable names (<code>sum</code>, <code>rev</code>)
        </p>

      </div>
    );
  }
}
