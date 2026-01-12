import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic12 extends Component {
    render() {
        return (
            <div className="space-y-10">

                {/* ===================== INTRO ===================== */}
                <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-4">
                    <h1 className="text-3xl font-bold text-sky-300">
                        Topic 12 – ASCII, Unicode, BCD and Gray Code
                    </h1>

                    <p>
                        Computers represent characters and numbers using
                        <span className="text-emerald-300 font-semibold"> standardized encoding systems</span>.
                        ASCII, Unicode, BCD, and Gray code are widely used for
                        character representation, numeric processing, and error reduction.
                    </p>
                </section>

                {/* ===================== ASCII ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        1) ASCII (American Standard Code for Information Interchange)
                    </h2>

                    <p>
                        ASCII is a
                        <span className="text-sky-300 font-semibold"> 7-bit character encoding</span>
                        scheme used to represent text in computers and communication equipment.
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>Total characters: <b>128 (0–127)</b></li>
                        <li>Uses 7 bits (often stored in 8 bits)</li>
                        <li>Includes letters, digits, punctuation, and control characters</li>
                    </ul>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                            ASCII Categories
                        </h3>

                        <ul className="list-disc list-inside space-y-1">
                            <li><b>0–31:</b> Control characters (NULL, LF, CR)</li>
                            <li><b>32–47:</b> Special symbols</li>
                            <li><b>48–57:</b> Digits (0–9)</li>
                            <li><b>65–90:</b> Uppercase letters (A–Z)</li>
                            <li><b>97–122:</b> Lowercase letters (a–z)</li>
                        </ul>
                    </div>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
                        {`
Character    Decimal    Binary
--------------------------------
'A'            65       1000001
'a'            97       1100001
'0'            48       0110000
`}
                    </pre>

                    <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-700">
                        <p className="text-yellow-300 font-semibold">
                            💡 Exam Tip: Difference between 'A' and 'a' in ASCII is 32.
                        </p>
                    </div>
                </section>

                {/* ===================== UNICODE ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        2) Unicode
                    </h2>

                    <p>
                        Unicode is a
                        <span className="text-sky-300 font-semibold"> universal character encoding standard</span>
                        designed to represent characters from all languages and symbols worldwide.
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>Supports over <b>1 million characters</b></li>
                        <li>Assigns a unique code point (U+XXXX) to every character</li>
                        <li>Backward compatible with ASCII</li>
                    </ul>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                            Unicode Encoding Forms
                        </h3>

                        <ul className="list-disc list-inside space-y-1">
                            <li><b>UTF-8:</b> Variable length (1–4 bytes), ASCII compatible</li>
                            <li><b>UTF-16:</b> Uses 2 or 4 bytes</li>
                            <li><b>UTF-32:</b> Fixed 4 bytes</li>
                        </ul>
                    </div>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
                        {`
Character    Unicode    UTF-8 (Hex)
----------------------------------
'A'          U+0041     41
'₹'          U+20B9     E2 82 B9
'中'         U+4E2D     E4 B8 AD
`}
                    </pre>

                    <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-700">
                        <p className="text-yellow-300 font-semibold">
                            💡 UTF-8 is the most widely used encoding on the Internet.
                        </p>
                    </div>
                </section>

                {/* ===================== BCD ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        3) BCD (Binary Coded Decimal)
                    </h2>

                    <p>
                        BCD represents
                        <span className="text-sky-300 font-semibold"> decimal digits separately</span>,
                        where each digit (0–9) is encoded using 4 bits.
                    </p>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
                        {`
Decimal Digit    BCD
--------------------
0                0000
1                0001
2                0010
...
9                1001
`}
                    </pre>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
                        {`
Example: 259 (BCD)

2    5    9
0010 0101 1001
`}
                    </pre>

                    <ul className="list-disc list-inside space-y-1">
                        <li>Used in calculators and financial systems</li>
                        <li>Easy decimal conversion</li>
                        <li>Less efficient storage than binary</li>
                    </ul>
                </section>

                {/* ===================== GRAY CODE ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-300">
                        4) Gray Code
                    </h2>

                    <p>
                        Gray code is a
                        <span className="text-sky-300 font-semibold"> unit-distance code</span>,
                        where only one bit changes between successive values.
                    </p>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
                        {`
Decimal    Binary    Gray
-------------------------
0          000       000
1          001       001
2          010       011
3          011       010
4          100       110
`}
                    </pre>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                            Binary → Gray Conversion
                        </h3>
                        <p className="font-mono text-sky-300">
                            {"Gray = Binary ⊕ (Binary >> 1)"}
                        </p>
                    </div>

                    <ul className="list-disc list-inside space-y-1">
                        <li>Used in rotary encoders</li>
                        <li>Minimizes error during transitions</li>
                        <li>Common in ADCs and position sensors</li>
                    </ul>
                </section>

                {/* ===================== COMPARISON ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Comparison Summary
                    </h2>

                    <pre className="bg-slate-800 p-4 rounded-xl font-mono text-sky-300 text-sm leading-6">
                        {`
Scheme     Purpose                  Bits Used        Application
-------------------------------------------------------------------
ASCII      Text encoding            7 / 8            English text
Unicode    Global text encoding     Variable         All languages
BCD        Decimal digits            4 per digit     Finance
Gray Code  Error reduction           Same as binary   Encoders
`}
                    </pre>
                </section>

                {/* ===================== PRACTICE ===================== */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Practice Area – Encoding Systems
                    </h2>

                    <p>
                        Convert characters and numbers between
                        ASCII, Unicode, BCD, Binary, and Gray code.
                    </p>

                    <div className="border border-slate-700 rounded-xl overflow-hidden h-[450px] bg-slate-800">
                        <Whiteboard />
                    </div>
                </section>

            </div>
        );
    }
}
