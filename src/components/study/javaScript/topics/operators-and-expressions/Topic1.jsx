import React from "react";

export default function Topic1() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Assignment & Compound Assignment Operators
      </h2>

      <p className="text-slate-300 text-sm">
        Assignment operators store values in variables. Compound operators combine arithmetic with assignment.
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`let x = 10;   // assignment
x += 5;        // x = x + 5 → 15
x -= 2;        // x = x - 2 → 13
x *= 3;        // x = x * 3 → 39
x /= 3;        // x = x / 3 → 13
x %= 5;        // x = x % 5 → 3`}
      </pre>

    </div>
  );
}
