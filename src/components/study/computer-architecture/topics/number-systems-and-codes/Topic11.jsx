import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic11 extends Component {
    render() {
        return (
            <div className="space-y-10">

                {/* ===================== INTRO ===================== */}
                <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-4">
                    <h1 className="text-3xl font-bold text-sky-300">
                        Topic 11 – Binary Arithmetic: Addition & Subtraction
                    </h1>

                    <p>
                        Binary arithmetic is the foundation of all digital systems.
                        Computers perform all calculations using
                        <span className="text-emerald-300 font-semibold"> binary addition</span>,
                        and subtraction is implemented using
                        <span className="text-emerald-300 font-semibold"> 2’s complement</span>.
                    </p>
                </section>

                {/* ===================== BINARY ADDITION RULES ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Binary Addition Rules
                    </h2>

                    <ul className="list-disc list-inside space-y-1">
                        <li>0 + 0 = 0</li>
                        <li>0 + 1 = 1</li>
                        <li>1 + 0 = 1</li>
                        <li>1 + 1 = 10 (Sum = 0, Carry = 1)</li>
                        <li>1 + 1 + 1 = 11 (Sum = 1, Carry = 1)</li>
                    </ul>
                </section>

                {/* ===================== ADDITION EXAMPLE ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Example: Binary Addition
                    </h2>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
   1011   (11)
 + 0110   (6)
 -------
 10001   (17)
`}
                    </pre>

                    <p className="text-yellow-300">
                        Carry is propagated from right to left, exactly like decimal addition.
                    </p>
                </section>

                {/* ===================== UNSIGNED ADDITION ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Unsigned Binary Addition
                    </h2>

                    <p>
                        In unsigned arithmetic, all bits represent magnitude.
                        Any extra carry beyond MSB is
                        <span className="text-yellow-300 font-semibold"> discarded</span>.
                    </p>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example (4-bit unsigned):

  1110 (14)
+ 0101 (5)
-------
1 0011 → discard carry
  0011 = 3
`}
                    </pre>
                </section>

                {/* ===================== SIGNED ADDITION ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Signed Binary Addition (2’s Complement)
                    </h2>

                    <p>
                        Signed numbers use the
                        <span className="text-emerald-300 font-semibold"> MSB as sign bit</span>.
                        Overflow must be checked using sign rules or carry comparison.
                    </p>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example: +5 + (-3)

+5  = 0101
-3  = 1101

  0101
+ 1101
-------
1 0010 → discard carry
  0010 = +2
`}
                    </pre>
                </section>

                {/* ===================== SUBTRACTION INTRO ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Binary Subtraction Using 2’s Complement
                    </h2>

                    <p>
                        Computers do not perform direct subtraction.
                        Instead, subtraction is converted into addition using
                        the <span className="text-emerald-300 font-semibold">2’s complement</span>.
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <p className="font-semibold text-emerald-300 mb-2">
                            Rule
                        </p>
                        <p className="font-mono text-sky-300">
                            A − B = A + (2’s complement of B)
                        </p>
                    </div>
                </section>

                {/* ===================== SUBTRACTION EXAMPLE ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Example: Binary Subtraction
                    </h2>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
{`
Example: 9 − 5

 9 = 1001
 5 = 0101

2’s complement of 5:
 1’s comp = 1010
 +1       = 1011

  1001
+ 1011
-------
1 0100 → discard carry
  0100 = 4
`}
                    </pre>
                </section>

                {/* ===================== COMMON EXAM CASES ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Common Exam Cases
                    </h2>

                    <ul className="list-disc list-inside space-y-1">
                        <li>Unsigned addition → check final carry</li>
                        <li>Signed addition → check sign bits / overflow</li>
                        <li>Subtraction → always use 2’s complement</li>
                        <li>Ignore final carry in signed arithmetic</li>
                    </ul>
                </section>

                {/* ===================== PRACTICE ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Practice Area – Binary Arithmetic
                    </h2>

                    <p>
                        Practice binary addition and subtraction.
                        Verify carry, sign, and overflow conditions.
                    </p>

                    <div className="border border-slate-700 rounded-xl overflow-hidden h-[450px] bg-slate-800">
                        <Whiteboard />
                    </div>
                </section>

            </div>
        );
    }
}
