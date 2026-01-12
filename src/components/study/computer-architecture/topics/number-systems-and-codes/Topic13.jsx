import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic13 extends Component {
    render() {
        return (
            <div className="space-y-10">

                {/* ===================== INTRO ===================== */}
                <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-4">
                    <h1 className="text-3xl font-bold text-sky-300">
                        Topic 13 – Why 2’s Complement is Preferred in Computer Systems
                    </h1>

                    <p>
                        Computers must represent both
                        <span className="text-emerald-300 font-semibold"> positive and negative numbers</span>
                        efficiently using binary.
                        Several methods exist, but modern computers
                        <span className="text-yellow-300 font-semibold"> universally use 2’s complement</span>.
                    </p>

                    <p className="text-slate-400 italic">
                        Let’s understand this decision like a computer architect, not a student.
                    </p>
                </section>

                {/* ===================== SIGNED METHODS ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Signed Number Representation Methods
                    </h2>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm">
{`
1) Sign-Magnitude
2) 1’s Complement
3) 2’s Complement  ✅
`}
                    </pre>
                </section>

                {/* ===================== METHOD 1 ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-xl font-bold text-red-400">
                        Method 1: Sign-Magnitude Representation
                    </h2>

                    <p>
                        MSB represents sign, remaining bits represent magnitude.
                    </p>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300">
{`
+5 = 0101
-5 = 1101
`}
                    </pre>

                    <ul className="list-disc list-inside space-y-1">
                        <li>❌ Two representations of zero (+0 and -0)</li>
                        <li>❌ Complex subtraction logic</li>
                        <li>❌ Hardware must treat sign separately</li>
                    </ul>
                </section>

                {/* ===================== METHOD 2 ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-xl font-bold text-orange-400">
                        Method 2: 1’s Complement Representation
                    </h2>

                    <p>
                        Negative number is obtained by
                        <span className="text-emerald-300"> inverting all bits</span>.
                    </p>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300">
{`
+5 = 0101
-5 = 1010
`}
                    </pre>

                    <ul className="list-disc list-inside space-y-1">
                        <li>❌ Still has +0 and -0</li>
                        <li>❌ Needs end-around carry</li>
                        <li>❌ Extra hardware steps</li>
                    </ul>
                </section>

                {/* ===================== METHOD 3 ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-xl font-bold text-emerald-300">
                        Method 3: 2’s Complement Representation
                    </h2>

                    <p>
                        Negative number =
                        <span className="text-emerald-300 font-semibold"> 1’s complement + 1</span>.
                    </p>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300">
{`
+5 = 0101
-5 = 1011
`}
                    </pre>

                    <ul className="list-disc list-inside space-y-1">
                        <li>✅ Single zero</li>
                        <li>✅ Same adder for + and −</li>
                        <li>✅ Natural overflow detection</li>
                        <li>✅ Fast hardware</li>
                    </ul>
                </section>

                {/* ===================== 10 TECH-GURU REASONS ===================== */}
                <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-6">
                    <h2 className="text-3xl font-bold text-sky-300">
                        10 Tech-Guru Reasons Why 2’s Complement Wins
                    </h2>

                    <ol className="list-decimal list-inside space-y-3">
                        <li>
                            <b className="text-emerald-300">Single Zero:</b> Only one representation of zero.
                        </li>
                        <li>
                            <b className="text-emerald-300">Same Adder:</b> Addition and subtraction use the same hardware.
                        </li>
                        <li>
                            <b className="text-emerald-300">No Special Carry:</b> Final carry is simply discarded.
                        </li>
                        <li>
                            <b className="text-emerald-300">Simple ALU Design:</b> Less gates → faster CPU.
                        </li>
                        <li>
                            <b className="text-emerald-300">Consistent Range:</b> Uses full bit range efficiently.
                        </li>
                        <li>
                            <b className="text-emerald-300">Easy Overflow Detection:</b> MSB carry comparison.
                        </li>
                        <li>
                            <b className="text-emerald-300">Natural Ordering:</b> Binary comparison works directly.
                        </li>
                        <li>
                            <b className="text-emerald-300">Left Shift = ×2:</b> Works for negative numbers also.
                        </li>
                        <li>
                            <b className="text-emerald-300">Right Shift Preserves Sign:</b> Arithmetic shift works.
                        </li>
                        <li>
                            <b className="text-emerald-300">Universal Adoption:</b> Used in all modern CPUs.
                        </li>
                    </ol>
                </section>

                {/* ===================== COMPARISON TABLE ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Final Comparison
                    </h2>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm">
{`
Feature           Sign-Mag     1’s Comp     2’s Comp
---------------------------------------------------
Zero values       Two          Two          One
Addition logic    Complex      Medium       Simple
Subtraction       Special      Extra step   Same as add
Hardware cost     High         Medium       Low
Overflow detect   Difficult    Medium       Easy
Used in CPUs      ❌            ❌            ✅
`}
                    </pre>
                </section>

                {/* ===================== FINAL VERDICT ===================== */}
                <section className="bg-emerald-900/20 border border-emerald-700 p-6 rounded-2xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        Final Verdict (Engineer’s View)
                    </h2>

                    <p className="text-emerald-200">
                        2’s complement is not chosen because it is “easy to learn”.
                        It is chosen because it
                        <b> minimizes hardware, maximizes speed, and eliminates ambiguity</b>.
                    </p>

                    <p className="text-yellow-300 font-semibold">
                        That is why every modern computer — from microcontrollers
                        to supercomputers — uses 2’s complement.
                    </p>
                </section>

                {/* ===================== PRACTICE ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Practice Area – Reason Like a CPU Designer
                    </h2>

                    <p>
                        Try representing numbers using all three methods
                        and compare hardware steps.
                    </p>

                    <div className="border border-slate-700 rounded-xl overflow-hidden h-[450px] bg-slate-800">
                        <Whiteboard />
                    </div>
                </section>

            </div>
        );
    }
}
