import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-12">

      {/* ============================================================
          SECTION 1 — INTRODUCTION
      ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">
          Real-World Examples of <span className="text-sky-400">Decision Making</span>
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Conditional logic powers almost every part of real applications —
          authentication, dashboards, billing, UI rendering, and much more.
          Below are practical scenarios that demonstrate how decisions work
          in everyday JavaScript programs.
        </p>
      </section>

      {/* ============================================================
          SECTION 2 — LOGIN SYSTEM
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
          🔹 Login System
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          A classic example of decision making — checking if username and password match expected values.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let username = "admin";
let password = "1234";

if (username === "admin" && password === "1234") {
  console.log("Login successful!");
} else {
  console.log("Invalid credentials");
}`}
        />

        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          In real applications, authentication happens on a server, but the logic remains similar.
        </p>
      </section>

      {/* ============================================================
          SECTION 3 — GRADING SYSTEM
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
          🔹 Grading System
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Educational platforms use conditional logic to determine grades based on marks.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let marks = 78;

if (marks >= 90) {
  console.log("A+");
} else if (marks >= 80) {
  console.log("A");
} else if (marks >= 70) {
  console.log("B");
} else {
  console.log("Needs improvement");
}`}
        />

        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          This example uses an <code>else if</code> ladder — great for multiple decision levels.
        </p>
      </section>

      {/* ============================================================
          SECTION 4 — DISCOUNT CALCULATOR
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
          🔹 Discount Calculator
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          E-commerce sites dynamically compute discount percentages based on product price.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let price = 500;
let discount = price > 400 ? 20 : 5;

console.log("Discount:", discount, "%");`}
        />

        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          This is a perfect use-case for the ternary operator — quick, clean, readable.
        </p>
      </section>

      {/* ============================================================
          SECTION 5 — SHIPPING ELIGIBILITY
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
          🔹 Shipping Eligibility
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Decision-making helps platforms like Amazon calculate whether an order qualifies for free shipping.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let cartValue = 320;

if (cartValue >= 500) {
  console.log("Free Shipping Available!");
} else {
  console.log("Shipping charges apply.");
}`}
        />
      </section>

      {/* ============================================================
          SECTION 6 — ACCESS CONTROL SYSTEM
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
          🔹 Access Control (Role-Based)
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Web apps often show different features depending on the user's role.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let role = "editor";

switch (role) {
  case "admin":
    console.log("Full Access to Dashboard");
    break;
  case "editor":
    console.log("Edit Content Access");
    break;
  case "viewer":
    console.log("Read Only Access");
    break;
  default:
    console.log("No Access");
}`}
        />

        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Role-based permissions are vital in content management and security systems.
        </p>
      </section>

      {/* ============================================================
          SECTION 7 — BEST PRACTICES
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-emerald-400">
          Best Practices for Decision Making
        </h3>

        <ul className="list-disc pl-5 text-slate-400 text-sm md:text-base leading-relaxed space-y-2">
          <li>Keep conditions simple and readable.</li>
          <li>Avoid deep nesting — refactor when possible.</li>
          <li>Use ternaries only for short decisions.</li>
          <li>Use <code>switch</code> for many fixed-value comparisons.</li>
          <li>Ensure every <code>if</code> block has a clear purpose.</li>
        </ul>
      </section>

    </div>
  );
}
