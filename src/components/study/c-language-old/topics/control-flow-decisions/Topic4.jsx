import React from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-14">

      {/* ================= HEADER ================= */}
      <header className="space-y-3">
        <h2 className="text-2xl font-bold text-sky-300">
          Real-World Examples Using Decision Making
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          In real applications, decision-making logic is used to
          process user input, apply rules, and generate meaningful output.
          Below are common real-world scenarios implemented using C
          <code> if-else</code> logic.
        </p>
      </header>

      {/* ================= SVG OVERVIEW ================= */}
      <svg
        viewBox="0 0 800 260"
        width="100%"
        height="260"
        className="bg-slate-900 rounded-xl"
      >
        {/* Input */}
        <rect x="300" y="20" width="200" height="50" rx="10" fill="#38bdf8" />
        <text x="400" y="52" textAnchor="middle" fontSize="18" fill="#020617">
          User Input
        </text>

        {/* Arrow */}
        <line x1="400" y1="70" x2="400" y2="130" stroke="#e5e7eb" strokeWidth="3" />
        <polygon points="395,125 405,125 400,135" fill="#e5e7eb" />

        {/* Condition */}
        <rect x="300" y="130" width="200" height="50" rx="10" fill="#38bdf8" />
        <text x="400" y="162" textAnchor="middle" fontSize="18" fill="#020617">
          Condition Check
        </text>

        {/* Left Arrow */}
        <line x1="400" y1="180" x2="200" y2="230" stroke="#e5e7eb" strokeWidth="3" />
        <polygon points="195,225 205,230 195,235" fill="#e5e7eb" />

        {/* Right Arrow */}
        <line x1="400" y1="180" x2="600" y2="230" stroke="#e5e7eb" strokeWidth="3" />
        <polygon points="605,225 595,230 605,235" fill="#e5e7eb" />

        {/* Output Boxes */}
        <rect x="140" y="210" width="120" height="40" rx="8" fill="#22c55e" />
        <rect x="540" y="210" width="120" height="40" rx="8" fill="#f87171" />

        <text x="200" y="236" textAnchor="middle" fontSize="14" fill="#020617">
          Valid Result
        </text>
        <text x="600" y="236" textAnchor="middle" fontSize="14" fill="#020617">
          Invalid / Fail
        </text>
      </svg>

      {/* ================= EXAMPLE 1 ================= */}
      <EditableCCodeBlock
        title="Example 1: Student Grading System"
        initialCode={`int marks = 76;

if (marks >= 90)
    printf("Grade: A");
else if (marks >= 75)
    printf("Grade: B");
else if (marks >= 60)
    printf("Grade: C");
else
    printf("Fail");`}
      />

      <p className="text-slate-500 text-xs">
        📝 <strong>Note:</strong> Grading systems are common in schools,
        colleges, and online examination platforms.
      </p>

      {/* ================= EXAMPLE 2 ================= */}
      <EditableCCodeBlock
        title="Example 2: Electricity Billing System"
        initialCode={`int units = 180;
int bill;

if (units <= 100)
    bill = units * 5;
else if (units <= 200)
    bill = (100 * 5) + (units - 100) * 7;
else
    bill = (100 * 5) + (100 * 7) + (units - 200) * 10;

printf("Total Bill = %d", bill);`}
      />

      <p className="text-slate-500 text-xs">
        📝 <strong>Note:</strong> This is called slab-based billing and is widely
        used in electricity and water billing systems.
      </p>

      {/* ================= EXAMPLE 3 ================= */}
      <EditableCCodeBlock
        title="Example 3: Simple Login Validation"
        initialCode={`int savedPin = 1234;
int enteredPin;

scanf("%d", &enteredPin);

if (enteredPin == savedPin)
    printf("Login Successful");
else
    printf("Invalid PIN");`}
      />

      <p className="text-slate-500 text-xs">
        ⚠️ <strong>Security Note:</strong> Real systems never store PINs or
        passwords directly. This example is for logic understanding only.
      </p>

      {/* ================= EXAMPLE 4 ================= */}
      <EditableCCodeBlock
        title="Example 4: Discount Calculation"
        initialCode={`int amount = 3500;

if (amount >= 5000)
    printf("Discount: 20%%");
else if (amount >= 3000)
    printf("Discount: 10%%");
else
    printf("No Discount");`}
      />

      {/* ================= FINAL NOTES ================= */}
      <div className="space-y-2">
        <p className="text-slate-500 text-xs">
          🎯 <strong>Exam Tip:</strong> Always test boundary values such as
          exactly 60 marks or exactly 100 units.
        </p>

        <p className="text-slate-500 text-xs">
          💡 <strong>Interview Insight:</strong> Interviewers often ask you to
          convert real-world rules into clean conditional logic.
        </p>
      </div>

    </div>
  );
}
