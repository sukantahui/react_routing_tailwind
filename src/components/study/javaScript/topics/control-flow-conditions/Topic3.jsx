import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-10">

      {/* ============================================================
          SECTION 1 — INTRODUCTION
      ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">
          The <span className="text-sky-400">switch</span> Statement
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          A <code className="text-sky-300">switch</code> statement lets you compare a value
          against multiple possible cases.  
          It is cleaner than writing a long chain of 
          <code className="text-sky-300"> if / else if </code>, especially when checking the
          same variable repeatedly.
        </p>
      </section>

      {/* ============================================================
          SECTION 2 — BASIC EXAMPLE
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">Basic Example</h3>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let day = 3;
let result = "";

switch (day) {
  case 1:
    result = "Monday";
    break;
  case 2:
    result = "Tuesday";
    break;
  case 3:
    result = "Wednesday";
    break;
  default:
    result = "Unknown day";
}

console.log(result);`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Here, the value of <code className="text-sky-300">day</code> determines which case block executes.
          The <code className="text-sky-300">default</code> case runs only when no other case matches.
        </p>
      </section>

      {/* ============================================================
          SECTION 3 — WHY BREAK IS IMPORTANT
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-rose-300">Understanding <code>break</code></h3>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Each <code className="text-sky-300">case</code> must end with a 
          <code className="text-sky-300"> break </code> statement to prevent **fall-through**,  
          which means execution continues into the next case.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let color = "red";

switch (color) {
  case "red":
    console.log("Stop");
  case "yellow":
    console.log("Caution");
  case "green":
    console.log("Go");
} 

// All 3 messages will print — NO break statements!`}
        />

        <p className="text-slate-300 text-sm md:text-base">
          Fall-through can be helpful sometimes, but often it is accidental and should be avoided.
        </p>
      </section>

      {/* ============================================================
          SECTION 4 — INTENTIONAL FALL-THROUGH
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-sky-300">Intentional Fall-Through</h3>

        <p className="text-slate-300">
          Sometimes fall-through is used purposely when multiple cases share the same output.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let fruit = "banana";

switch (fruit) {
  case "apple":
  case "banana":
  case "mango":
    console.log("This is a tropical fruit");
    break;
  default:
    console.log("Not a tropical fruit");
}`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          All 3 cases produce the same message. This is a clean and efficient pattern.
        </p>
      </section>

      {/* ============================================================
          SECTION 5 — SWITCH WITH EXPRESSIONS
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">Using <code>switch</code> with Expressions</h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Although <code>switch</code> typically checks static values, you can also use expressions.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let age = 25;

switch (true) {
  case age < 13:
    console.log("Child");
    break;
  case age < 20:
    console.log("Teenager");
    break;
  case age < 60:
    console.log("Adult");
    break;
  default:
    console.log("Senior");
}`}
        />
      </section>

      {/* ============================================================
          SECTION 6 — SWITCH VS IF/ELSE
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-emerald-400">
          When to Use <code>switch</code> Instead of <code>if / else</code>?
        </h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm md:text-base leading-relaxed">
          <li>When checking **multiple exact values** of the same variable.</li>
          <li>When you want a cleaner alternative to long <code>else if</code> chains.</li>
          <li>When different cases share the same result (fall-through grouping).</li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Long if/else version
if (role === "admin") {
  message = "Full Access";
} else if (role === "editor") {
  message = "Edit Access";
} else if (role === "viewer") {
  message = "Read Only";
} else {
  message = "No Access";
}

// Cleaner switch version
switch (role) {
  case "admin":
    message = "Full Access";
    break;
  case "editor":
    message = "Edit Access";
    break;
  case "viewer":
    message = "Read Only";
    break;
  default:
    message = "No Access";
}`}
        />
      </section>

      {/* ============================================================
          SECTION 7 — PRACTICE TASK
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">Try It Yourself</h3>

        <p className="text-slate-300 text-sm md:text-base">
          Write a <code>switch</code> statement that prints the season based on a month number:
        </p>

        <ul className="list-disc pl-5 text-slate-400 space-y-1">
          <li>3–5 → “Spring”</li>
          <li>6–8 → “Summer”</li>
          <li>9–11 → “Autumn”</li>
          <li>12, 1, 2 → “Winter”</li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let month = 4;

// Write your switch logic here 👇`}
        />
      </section>

    </div>
  );
}
