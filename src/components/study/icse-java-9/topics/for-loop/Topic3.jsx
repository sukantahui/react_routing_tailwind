import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <h2 className="text-xl font-semibold text-red-400 tracking-wide">
          Common Logical Errors in for Loop
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Logical errors do <b>not</b> produce compilation errors, but they
          generate <b>wrong output</b>. ICSE frequently tests students on
          identifying such mistakes.
        </p>

        {/* ================= SVG : WRONG vs CORRECT ================= */}
        <div className="flex justify-center gap-10 flex-wrap">

          {/* WRONG */}
          <svg
            width="260"
            height="220"
            viewBox="0 0 260 220"
            className="group"
          >
            <rect x="40" y="20" width="180" height="40" rx="10"
              fill="#ef4444"
              className="opacity-40 group-hover:opacity-100 transition"
            />
            <text x="70" y="45" fill="#fff">Wrong Condition</text>

            <rect x="40" y="90" width="180" height="40" rx="10"
              fill="#ef4444"
              className="opacity-40 group-hover:opacity-100 transition delay-200"
            />
            <text x="55" y="115" fill="#fff">Infinite Loop</text>

            <rect x="40" y="160" width="180" height="40" rx="10"
              fill="#ef4444"
              className="opacity-40 group-hover:opacity-100 transition delay-400"
            />
            <text x="45" y="185" fill="#fff">Wrong Output</text>
          </svg>

          {/* CORRECT */}
          <svg
            width="260"
            height="220"
            viewBox="0 0 260 220"
            className="group"
          >
            <rect x="40" y="20" width="180" height="40" rx="10"
              fill="#22c55e"
              className="opacity-40 group-hover:opacity-100 transition"
            />
            <text x="70" y="45" fill="#fff">Correct Logic</text>

            <rect x="40" y="90" width="180" height="40" rx="10"
              fill="#22c55e"
              className="opacity-40 group-hover:opacity-100 transition delay-200"
            />
            <text x="60" y="115" fill="#fff">Finite Loop</text>

            <rect x="40" y="160" width="180" height="40" rx="10"
              fill="#22c55e"
              className="opacity-40 group-hover:opacity-100 transition delay-400"
            />
            <text x="55" y="185" fill="#fff">Correct Output</text>
          </svg>

        </div>

        {/* ================= ERROR 1 ================= */}
        <JavaCodeBlock
          title="Logical Error 1: Extra Semicolon"
          highlightLines={[1]}
          code={`for(int i = 1; i <= 5; i++);   // ❌ Wrong
{
    System.out.println(i);
}`}
        />

        {/* ================= ERROR 2 ================= */}
        <JavaCodeBlock
          title="Logical Error 2: Wrong Update Direction"
          highlightLines={[1]}
          code={`for(int i = 1; i <= 5; i--)   // ❌ Infinite loop
{
    System.out.println(i);
}`}
        />

        {/* ================= ERROR 3 ================= */}
        <JavaCodeBlock
          title="Logical Error 3: Wrong Initial Value"
          highlightLines={[1]}
          code={`for(int i = 5; i <= 3; i++)   // ❌ Loop never executes
{
    System.out.println(i);
}`}
        />

        {/* ================= CORRECT VERSION ================= */}
        <JavaCodeBlock
          title="Correct for Loop (ICSE Expected)"
          highlightLines={[1]}
          code={`for(int i = 1; i <= 5; i++)
{
    System.out.println(i);
}`}
        />

        {/* ================= EXPLANATION ================= */}
        <div className="text-slate-300 text-sm space-y-2">
          <p>• A semicolon after <code>for()</code> separates the loop body.</p>
          <p>• Update direction must move towards the terminating condition.</p>
          <p>• Wrong initial value may cause zero execution.</p>
        </div>

        {/* ================= TEACHER NOTE ================= */}
        <p className="text-emerald-300 text-sm">
          👩‍🏫 <b>Teacher Note:</b>  
          ICSE Board often asks:  
          <i>“Identify the error and rewrite the correct statement.”</i>
        </p>

        {/* ================= TIPS & TRICKS ================= */}
        <p className="text-yellow-300 text-sm">
          💡 <b>Tips & Tricks:</b>  
          • Read the <code>for()</code> line slowly  
          • Check <b>initial value → condition → update</b>  
          • If loop runs forever, update is usually wrong
        </p>

      </div>
    );
  }
}
