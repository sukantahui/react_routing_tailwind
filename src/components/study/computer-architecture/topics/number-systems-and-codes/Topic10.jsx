import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic10 extends Component {
    render() {
        return (
            <div className="space-y-10">

                {/* ===================== INTRO ===================== */}
                <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-4">
                    <h1 className="text-3xl font-bold text-sky-300">
                        Topic 10 – Overflow Detection in Signed Arithmetic
                    </h1>

                    <p>
                        In signed binary arithmetic using
                        <span className="text-emerald-300 font-semibold"> 2’s Complement</span>,
                        overflow occurs when the result of an operation is outside the
                        representable range of the given number of bits.
                    </p>
                </section>

                {/* ===================== CONDITION ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Condition for Overflow
                    </h2>

                    <p>
                        Overflow occurs if:
                    </p>

                    <ul className="list-disc list-inside">
                        <li>Two positive numbers are added and the result is negative.</li>
                        <li>Two negative numbers are added and the result is positive.</li>
                    </ul>

                    <p className="text-yellow-300">
                        Another equivalent rule:
                        <span className="font-mono text-sky-300">
                            {" "}Carry into MSB ≠ Carry out of MSB
                        </span>
                    </p>
                </section>

                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">

                    <h2 className="text-2xl font-bold text-sky-300">
                        Overflow Detection Rule: Carry into MSB ≠ Carry out of MSB
                    </h2>

                    <p>
                        In <span className="text-emerald-300 font-semibold">2’s Complement arithmetic</span>,
                        overflow is not detected by the final carry.
                        Instead, it is detected by comparing the
                        <span className="text-yellow-300 font-semibold"> carry into</span> and
                        <span className="text-yellow-300 font-semibold"> carry out of</span> the
                        <span className="text-sky-300 font-semibold"> Most Significant Bit (MSB)</span>.
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <p className="font-semibold text-emerald-300 mb-2">
                            Rule
                        </p>
                        <p className="font-mono text-sky-300 text-lg">
                            Overflow occurs if: Carry into MSB ≠ Carry out of MSB
                        </p>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                            Example: +7 + +4 (4-bit)
                        </h3>

                        <pre className="bg-slate-900 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
                            {`
   0 1 1 1   (+7)
 + 0 1 0 0   (+4)
 -----------
   1 0 1 1

Carry into MSB  = 1
Carry out of MSB = 0
Since they are not equal → Overflow
`}
                        </pre>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                            Example: +5 + -3 (No Overflow)
                        </h3>

                        <pre className="bg-slate-900 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
                            {`
   0 1 0 1   (+5)
 + 1 1 0 1   (-3)   Because positive 3 is 0 0 1 1
 -----------
   0 0 1 0

Carry into MSB  = 0
Carry out of MSB = 0
Since both are equal → No Overflow
`}
                        </pre>
                    </div>

                    <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-700">
                        <p className="text-yellow-300 font-semibold">
                            💡 Tip: Never judge overflow by the final carry.
                            Always compare the carry into and carry out of the sign bit.
                        </p>
                    </div>

                </section>


                {/* ===================== EXAMPLES ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Examples (4-bit System)
                    </h2>

                    <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 font-mono text-sm leading-6">
                        {`
Example 1: +7 + +4

  0111
+ 0100
------
  1011  → Negative result → Overflow


Example 2: -5 + -4

-5 = 1011
-4 = 1100

  1011
+ 1100
------
 1 0111 → Positive result → Overflow
`}
                    </pre>
                </section>

                {/* ===================== NO OVERFLOW ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        When Overflow Does NOT Occur
                    </h2>

                    <ul className="list-disc list-inside">
                        <li>Adding a positive and a negative number.</li>
                        <li>Adding numbers with different signs.</li>
                    </ul>
                </section>

                {/* ===================== PRACTICE WHITEBOARD ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Practice Area – Detect Overflow
                    </h2>

                    <p>
                        Try adding different signed binary numbers and check
                        whether overflow occurs.
                    </p>

                    <div className="border border-slate-700 rounded-xl overflow-hidden h-[450px] bg-slate-800">
                        <Whiteboard />
                    </div>
                </section>

                <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-10">

  <h2 className="text-3xl font-bold text-sky-300">
    2’s Complement Arithmetic – All Exam Cases (8-bit)
  </h2>

  <p>
    In 2’s complement system, subtraction is performed by adding the
    2’s complement of the subtrahend. All operations are reduced to
    simple binary addition.
  </p>

  {/* ========== 1) POSITIVE + POSITIVE ========== */}
  <div className="bg-slate-800 p-5 rounded-xl">
    <h3 className="text-xl font-semibold text-emerald-300">
      1) Positive + Positive
    </h3>

    <pre className="bg-slate-900 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example: +25 + +12

+25 = 00011001
+12 = 00001100

  00011001
+ 00001100
-----------
  00100101  = +37
`}
    </pre>
  </div>

  {/* ========== 2) POSITIVE + NEGATIVE ========== */}
  <div className="bg-slate-800 p-5 rounded-xl">
    <h3 className="text-xl font-semibold text-emerald-300">
      2) Positive + Negative
    </h3>

    <pre className="bg-slate-900 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example: +25 + (-12)

+25 = 00011001
-12:
  +12 = 00001100
  1’s comp = 11110011
  +1 → 11110100

  00011001
+ 11110100
-----------
1 00001101 → discard carry
  00001101 = +13
`}
    </pre>
  </div>

  {/* ========== 3) POSITIVE - POSITIVE ========== */}
  <div className="bg-slate-800 p-5 rounded-xl">
    <h3 className="text-xl font-semibold text-emerald-300">
      3) Positive − Positive
    </h3>

    <pre className="bg-slate-900 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example: +25 − +12

+25 = 00011001
-12 = 11110100

  00011001
+ 11110100
-----------
1 00001101 → discard carry
  00001101 = +13
`}
    </pre>
  </div>

  {/* ========== 4) POSITIVE - NEGATIVE ========== */}
  <div className="bg-slate-800 p-5 rounded-xl">
    <h3 className="text-xl font-semibold text-emerald-300">
      4) Positive − Negative
    </h3>

    <pre className="bg-slate-900 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example: +25 − (−12)

-12 = 11110100
2’s complement of -12 → +12 = 00001100

  00011001
+ 00001100
-----------
  00100101 = +37
`}
    </pre>
  </div>

  {/* ========== 5) NEGATIVE - NEGATIVE ========== */}
  <div className="bg-slate-800 p-5 rounded-xl">
    <h3 className="text-xl font-semibold text-emerald-300">
      5) Negative − Negative
    </h3>

    <pre className="bg-slate-900 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example: -25 − (-12)

-25:
 +25 = 00011001
 1’s comp = 11100110
 +1 → 11100111

+12 = 00001100

  11100111
+ 00001100
-----------
  11110011

11110011 → negative
1’s comp = 00001100
+1 → 00001101 = -13
`}
    </pre>
  </div>

  {/* ========== 6) NEGATIVE + NEGATIVE ========== */}
  <div className="bg-slate-800 p-5 rounded-xl">
    <h3 className="text-xl font-semibold text-emerald-300">
      6) Negative + Negative
    </h3>

    <pre className="bg-slate-900 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example: -25 + (-12)

-25 = 11100111
-12 = 11110100

  11100111
+ 11110100
-----------
1 11011011 → discard carry
  11011011 → negative

1’s comp = 00100100
+1 → 00100101 = -37
`}
    </pre>
  </div>

</section>


            </div>
        );
    }
}
