import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic9 extends Component {
  render() {
    return (
      <div className="space-y-10">

        {/* ===================== INTRO ===================== */}
        <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-4">
          <h1 className="text-3xl font-bold text-sky-300">
            Topic 9 – Binary Arithmetic with Signed Numbers
          </h1>

          <p>
            In computers, signed binary numbers are mainly represented using
            <span className="text-emerald-300 font-semibold"> 2’s Complement</span>.
            This allows both positive and negative numbers to be processed using
            the same addition circuit.
          </p>
        </section>

        {/* ===================== ADDITION ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
          <h2 className="text-2xl font-bold text-emerald-300">
            Addition of Signed Binary Numbers (2’s Complement)
          </h2>

          <p>
            To add signed binary numbers in 2’s complement form, simply add them
            as unsigned binary numbers and discard any extra carry.
          </p>

          <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 font-mono text-sm leading-6">
{`
Example: Add +5 and -3 (4-bit)

+5 = 0101
-3 = 1101

  0101
+ 1101
------
 10010   → discard extra carry
 0010 = +2 (Answer)
`}
          </pre>
        </section>

        {/* ===================== SUBTRACTION ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
          <h2 className="text-2xl font-bold text-emerald-300">
            Subtraction of Signed Binary Numbers
          </h2>

          <p>
            To subtract a number, take the 2’s complement of the subtrahend
            and add it to the minuend.
          </p>

          <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 font-mono text-sm leading-6">
{`
Example: 6 − 4 (4-bit)

+6 = 0110
+4 = 0100 → 2’s complement = 1100

  0110
+ 1100
------
 10010 → discard carry
 0010 = 2 (Answer)
`}
          </pre>
        </section>

        {/* ===================== OVERFLOW ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
          <h2 className="text-2xl font-bold text-emerald-300">
            Overflow in Signed Binary Addition
          </h2>

          <p>
            Overflow occurs when the carry into the sign bit is not equal to
            the carry out of the sign bit.
          </p>

          <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 font-mono text-sm leading-6">
{`
Example: Add +7 and +4 (4-bit)

+7 = 0111
+4 = 0100

  0111
+ 0100
------
  1011  (MSB changed unexpectedly → Overflow)
`}
          </pre>
        </section>

        {/* ===================== PRACTICE WHITEBOARD ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-2xl font-bold text-sky-300">
            Practice Area – Try Binary Arithmetic Yourself
          </h2>

          <p>
            Practice addition and subtraction of signed binary numbers using
            2’s complement.
          </p>

          <div className="border border-slate-700 rounded-xl overflow-hidden h-[450px] bg-slate-800">
            <Whiteboard />
          </div>
        </section>

      </div>
    );
  }
}
