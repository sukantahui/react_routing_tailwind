import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-12">

      {/* ============================================================
          HEADING
      ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">
          Practice Questions — <span className="text-sky-400">Decision Making</span>
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Test your understanding of <code>if</code>, <code>else</code>,
          <code>else if</code>, <code>switch</code>, and the ternary operator
          by solving the questions below.  
          Each question includes an editable code editor for writing your solution.
        </p>
      </section>

      {/* ============================================================
          QUESTION 1
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">🔹 Question 1 — Even or Odd</h3>
        <p className="text-slate-300">Write a program that checks if a number is even or odd.</p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let num = 17;

// Write your code below 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 2
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">🔹 Question 2 — Voting Eligibility</h3>
        <p className="text-slate-300">Check whether a person is eligible to vote (age ≥ 18).</p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let age = 15;

// Write your code below 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 3
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">🔹 Question 3 — Maximum of Two Numbers</h3>
        <p className="text-slate-300">
          Write a program to print the larger number between <code>a</code> and <code>b</code>.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let a = 42;
let b = 67;

// Write your code below 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 4
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">
          🔹 Question 4 — Grade Calculator
        </h3>
        <p className="text-slate-300">Print A, B, C, or D based on marks.</p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let marks = 81;

// Conditions:
// A: 90+
// B: 75–89
// C: 50–74
// D: below 50

// Write your logic below 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 5
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">
          🔹 Question 5 — Login Verification
        </h3>
        <p className="text-slate-300">
          Check if <code>username</code> and <code>password</code> match.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let username = "guest";
let password = "abcd";

// Write your code below 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 6
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">
          🔹 Question 6 — Day of Week (switch)
        </h3>
        <p className="text-slate-300">Print day name based on number 1–7.</p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let day = 4;

// Use switch statement 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 7
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">
          🔹 Question 7 — Discount using Ternary
        </h3>
        <p className="text-slate-300">
          If price ≥ 1000 → 10% discount, else 5%.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let price = 750;

// Write ternary expression below 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 8
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">
          🔹 Question 8 — Temperature Status
        </h3>
        <p className="text-slate-300">
          If temperature &lt; 20 → "Cold", 20–30 → "Warm", &gt 30 → "Hot".
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let temp = 28;

// Write your code below 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 9
      ============================================================ */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">
          🔹 Question 9 — User Role Access
        </h3>
        <p className="text-slate-300">Use <code>switch</code> to show access level: admin, editor, viewer.</p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let role = "editor";

// Write switch-case below 👇`}
        />
      </section>

      {/* ============================================================
          QUESTION 10
      ============================================================ */}
      <section className="space-y-3 pb-6">
        <h3 className="text-lg text-slate-200 font-semibold">
          🔹 Question 10 — Free Shipping
        </h3>
        <p className="text-slate-300">
          If cart value ≥ 500 → "Free Shipping", else "Shipping Charges Apply".
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let cartValue = 320;

// Write your logic below 👇`}
        />
      </section>

    </div>
  );
}
