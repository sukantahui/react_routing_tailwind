import React from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-12">

      {/* ================= HEADER ================= */}
      <header className="space-y-3">
        <h2 className="text-2xl font-bold text-sky-300">
          switch-case with break and default
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          The <code>switch</code> statement is used when a variable is compared
          against multiple fixed values.  
          It improves readability compared to long <code>else-if</code> chains.
        </p>
      </header>

      {/* ================= SVG FLOW ================= */}
      <svg
        viewBox="0 0 900 260"
        preserveAspectRatio="xMidYMid meet"
        className="w-full bg-slate-900 rounded-xl p-4"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#e5e7eb" />
          </marker>
        </defs>

        <rect x="350" y="20" width="200" height="60" rx="12" fill="#38bdf8" />
        <text x="450" y="58" textAnchor="middle" fontSize="20" fill="#020617">
          switch(value)
        </text>

        <line x1="450" y1="80" x2="150" y2="160" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1="450" y1="80" x2="450" y2="160" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1="450" y1="80" x2="750" y2="160" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />

        <rect x="80" y="160" width="140" height="60" rx="10" fill="#22c55e" />
        <rect x="380" y="160" width="140" height="60" rx="10" fill="#22c55e" />
        <rect x="680" y="160" width="140" height="60" rx="10" fill="#f87171" />

        <text x="150" y="198" textAnchor="middle" fontSize="18" fill="#020617">case</text>
        <text x="450" y="198" textAnchor="middle" fontSize="18" fill="#020617">case</text>
        <text x="750" y="198" textAnchor="middle" fontSize="18" fill="#020617">default</text>
      </svg>

      {/* ================= EXAMPLES ================= */}

      <EditableCCodeBlock
        title="Example 1: Day of the Week"
        initialCode={`int day = 3;

switch (day) {
    case 1:
        printf("Monday");
        break;
    case 2:
        printf("Tuesday");
        break;
    case 3:
        printf("Wednesday");
        break;
    default:
        printf("Invalid day");
}`}
      />

      <EditableCCodeBlock
        title="Example 2: Grade Evaluation"
        initialCode={`char grade = 'B';

switch (grade) {
    case 'A':
        printf("Excellent");
        break;
    case 'B':
        printf("Good");
        break;
    case 'C':
        printf("Average");
        break;
    default:
        printf("Fail");
}`}
      />

      <EditableCCodeBlock
        title="Example 3: Missing break (Fall-through)"
        initialCode={`int x = 1;

switch (x) {
    case 1:
        printf("One ");
    case 2:
        printf("Two ");
    default:
        printf("Done");
}`}
      />

      <p className="text-slate-400 text-sm">
        Output will be: <code>One Two Done</code>
      </p>

      <p className="text-slate-500 text-xs">
        📝 <strong>Note:</strong> Without <code>break</code>, execution continues
        into the next case. This is called <strong>fall-through</strong>.
      </p>

      <EditableCCodeBlock
        title="Example 4: Only default case"
        initialCode={`int option = 9;

switch (option) {
    default:
        printf("Invalid option");
}`}
      />

      <p className="text-slate-500 text-xs">
        📝 <strong>Exam Tip:</strong> <code>switch</code> works only with
        <code> int</code> and <code>char</code> types in C (not ranges or floats).
      </p>

    </div>
  );
}
