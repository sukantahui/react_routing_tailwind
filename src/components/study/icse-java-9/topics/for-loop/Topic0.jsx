import React, { Component } from "react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-12">

        <h2 className="text-xl font-semibold text-sky-300">
          Syntax of for Loop (ICSE Class IX)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          The <b>for loop</b> is used when the number of repetitions is known.
          It combines initialization, condition checking, and updation in one line.
        </p>

        {/* ===== SVG DIAGRAM ===== */}
        <div className="flex justify-center">
          <svg
            width="420"
            height="160"
            className="transition-transform duration-300 hover:scale-105"
          >
            <rect x="10" y="40" width="120" height="50" rx="8" fill="#0ea5e9" />
            <text x="20" y="70" fill="#fff">Initialization</text>

            <rect x="150" y="40" width="120" height="50" rx="8" fill="#22c55e" />
            <text x="165" y="70" fill="#fff">Condition</text>

            <rect x="290" y="40" width="120" height="50" rx="8" fill="#f97316" />
            <text x="305" y="70" fill="#fff">Update</text>
          </svg>
        </div>

        {/* ===== SYNTAX ===== */}
        <pre className="bg-slate-900 p-4 rounded-lg text-slate-200 text-sm">
{`for(initialization; condition; update)
{
    statements;
}`}
        </pre>

        {/* ===== EXAMPLES ===== */}
        <pre className="bg-slate-900 p-4 rounded-lg text-slate-200 text-sm">
{`// Example 1: Print 1 to 5
for(int i = 1; i <= 5; i++)
{
    System.out.println(i);
}`}
        </pre>

        <pre className="bg-slate-900 p-4 rounded-lg text-slate-200 text-sm">
{`// Example 2: Print even numbers
for(int i = 2; i <= 10; i += 2)
{
    System.out.println(i);
}`}
        </pre>

        <p className="text-emerald-300 text-sm">
          👩‍🏫 Teacher Note: ICSE Class IX strictly allows <b>non-nested for loop</b>.
        </p>

        <p className="text-yellow-300 text-sm">
          💡 Tip: Initialization runs only once — many students forget this.
        </p>

      </div>
    );
  }
}
