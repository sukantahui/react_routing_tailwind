import React from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-12">

      {/* ================= HEADER ================= */}
      <header className="space-y-3">
        <h2 className="text-2xl font-bold text-sky-300">
          Nested Conditions and Readability
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          A nested condition occurs when one <code>if</code> or
          <code> else</code> block contains another <code>if</code>.
          Nested logic is powerful but must be written carefully to
          maintain readability.
        </p>
      </header>

      {/* ================= SVG CONCEPT ================= */}
      <svg
        viewBox="0 0 900 300"
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

        {/* Condition 1 */}
        <rect x="350" y="20" width="200" height="60" rx="12" fill="#38bdf8" />
        <text x="450" y="58" textAnchor="middle" fontSize="20" fill="#020617">
          Condition 1
        </text>

        <line
          x1="450"
          y1="80"
          x2="450"
          y2="130"
          stroke="#e5e7eb"
          strokeWidth="3"
          markerEnd="url(#arrow)"
        />

        {/* Condition 2 */}
        <rect x="350" y="130" width="200" height="60" rx="12" fill="#38bdf8" />
        <text x="450" y="168" textAnchor="middle" fontSize="20" fill="#020617">
          Condition 2
        </text>

        <line
          x1="450"
          y1="190"
          x2="200"
          y2="260"
          stroke="#e5e7eb"
          strokeWidth="3"
          markerEnd="url(#arrow)"
        />
        <line
          x1="450"
          y1="190"
          x2="700"
          y2="260"
          stroke="#e5e7eb"
          strokeWidth="3"
          markerEnd="url(#arrow)"
        />

        {/* Outcomes */}
        <rect x="140" y="260" width="120" height="40" rx="8" fill="#22c55e" />
        <rect x="640" y="260" width="120" height="40" rx="8" fill="#f87171" />

        <text x="200" y="288" textAnchor="middle" fontSize="16" fill="#020617">
          Action A
        </text>
        <text x="700" y="288" textAnchor="middle" fontSize="16" fill="#020617">
          Action B
        </text>
      </svg>

      {/* ================= EXAMPLES ================= */}

      <EditableCCodeBlock
        title="Example 1: Driving Eligibility Check"
        initialCode={`int age = 22;
int hasLicense = 1;

if (age >= 18) {
    if (hasLicense)
        printf("Allowed to drive");
    else
        printf("License required");
} else {
    printf("Underage");
}`}
      />

      <EditableCCodeBlock
        title="Example 2: Login Validation"
        initialCode={`int usernameOK = 1;
int passwordOK = 0;

if (usernameOK) {
    if (passwordOK)
        printf("Login successful");
    else
        printf("Wrong password");
} else {
    printf("Invalid username");
}`}
      />

      <EditableCCodeBlock
        title="Example 3: Account Category"
        initialCode={`int balance = 2500;

if (balance > 0) {
    if (balance >= 3000)
        printf("Premium account");
    else
        printf("Standard account");
} else {
    printf("Inactive account");
}`}
      />

      <EditableCCodeBlock
        title="Example 4: Scholarship Eligibility"
        initialCode={`int marks = 82;
int incomeLow = 1;

if (marks >= 80) {
    if (incomeLow)
        printf("Scholarship Approved");
    else
        printf("Income too high");
} else {
    printf("Marks not sufficient");
}`}
      />

      {/* ================= NOTES ================= */}
      <div className="space-y-2">
        <p className="text-slate-500 text-xs">
          📝 <strong>Note:</strong> Nested conditions should be properly indented
          to avoid confusion and logical errors.
        </p>

        <p className="text-slate-500 text-xs">
          🎯 <strong>Exam Tip:</strong> If nesting becomes too deep,
          consider using logical operators (<code>&&</code>, <code>||</code>)
          to simplify conditions.
        </p>
      </div>

    </div>
  );
}
