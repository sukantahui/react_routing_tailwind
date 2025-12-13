import React from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-12">

      {/* ================= HEADER ================= */}
      <header className="space-y-3">
        <h2 className="text-2xl font-bold text-sky-300">
          Menu-Driven Programs Using switch
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Menu-driven programs allow users to choose an action from a list.
          This pattern is extremely common in console applications,
          lab exams, and beginner-level real-world software.
        </p>
      </header>

      {/* ================= SVG CONCEPT ================= */}
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

        {/* Menu */}
        <rect x="350" y="20" width="200" height="60" rx="12" fill="#38bdf8" />
        <text x="450" y="58" textAnchor="middle" fontSize="20" fill="#020617">
          Menu Choice
        </text>

        {/* Arrows */}
        <line x1="450" y1="80" x2="200" y2="160" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1="450" y1="80" x2="450" y2="160" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1="450" y1="80" x2="700" y2="160" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />

        {/* Actions */}
        <rect x="140" y="160" width="120" height="60" rx="10" fill="#22c55e" />
        <rect x="390" y="160" width="120" height="60" rx="10" fill="#22c55e" />
        <rect x="640" y="160" width="120" height="60" rx="10" fill="#f87171" />

        <text x="200" y="198" textAnchor="middle" fontSize="16" fill="#020617">
          Action 1
        </text>
        <text x="450" y="198" textAnchor="middle" fontSize="16" fill="#020617">
          Action 2
        </text>
        <text x="700" y="198" textAnchor="middle" fontSize="16" fill="#020617">
          Invalid
        </text>
      </svg>

      {/* ================= EXAMPLES ================= */}

      <EditableCCodeBlock
        title="Example 1: Simple Calculator Menu"
        initialCode={`int choice;
int a = 10, b = 5;

printf("1. Add\\n2. Subtract\\n");
scanf("%d", &choice);

switch (choice) {
    case 1:
        printf("Sum = %d", a + b);
        break;
    case 2:
        printf("Difference = %d", a - b);
        break;
    default:
        printf("Invalid choice");
}`}
      />

      <EditableCCodeBlock
        title="Example 2: Bank Account Menu"
        initialCode={`int option;
int balance = 5000;

printf("1. Check Balance\\n2. Withdraw\\n");
scanf("%d", &option);

switch (option) {
    case 1:
        printf("Balance = %d", balance);
        break;
    case 2:
        printf("Withdraw selected");
        break;
    default:
        printf("Invalid option");
}`}
      />

      <EditableCCodeBlock
        title="Example 3: Student Result Menu"
        initialCode={`int choice;
int marks = 78;

printf("1. Show Marks\\n2. Show Result\\n");
scanf("%d", &choice);

switch (choice) {
    case 1:
        printf("Marks = %d", marks);
        break;
    case 2:
        if (marks >= 40)
            printf("Pass");
        else
            printf("Fail");
        break;
    default:
        printf("Invalid choice");
}`}
      />

      <EditableCCodeBlock
        title="Example 4: Exit-Based Menu"
        initialCode={`int menu;

printf("1. Start Program\\n2. Exit\\n");
scanf("%d", &menu);

switch (menu) {
    case 1:
        printf("Program Started");
        break;
    case 2:
        printf("Program Exited");
        break;
    default:
        printf("Invalid option");
}`}
      />

      {/* ================= NOTES ================= */}
      <div className="space-y-2">
        <p className="text-slate-500 text-xs">
          📝 <strong>Note:</strong> Menu-driven programs almost always use
          <code> switch</code> because it is clearer than long
          <code> if-else</code> chains.
        </p>

        <p className="text-slate-500 text-xs">
          🎯 <strong>Exam Tip:</strong> Always include a <code>default</code> case
          to handle invalid user input.
        </p>
      </div>

    </div>
  );
}
