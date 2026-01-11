import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic5 extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 200);
    }

    render() {
        const reveal = this.state.show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8";

        return (
            <div className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-800 dark:text-slate-200">

                <style>{`
          @keyframes fadeUp {
            from {opacity:0; transform:translateY(20px);}
            to {opacity:1; transform:translateY(0);}
          }
        `}</style>

                <h1 className="text-3xl font-semibold text-sky-600 dark:text-sky-400 mb-10">
                    Topic 6 – Sign-Magnitude Representation
                </h1>

                {/* WHITEBOARD */}
                <div className="mb-12 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300">
                    <Whiteboard />
                </div>

                {/* PURPOSE */}
                <section className={`motion-safe:animate-[fadeUp_0.6s_ease-out] ${reveal}`}>
                    <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-semibold mb-4">🎯 Why Sign-Magnitude Exists</h2>
                        <p>
                            Sign-Magnitude was the earliest technique used to store negative numbers.
                            It simply separates the <strong>sign</strong> from the <strong>magnitude</strong>.
                        </p>
                        <p className="mt-3">
                            Example: Abhronila from Naihati writes <code>-25</code>.
                            The CPU stores:
                            <code> 1 0011001 </code> — where the leftmost bit stores the sign.
                        </p>
                    </div>
                </section>

                {/* MODEL SIGNATURE */}
                <section className="mt-12">
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">🔧 Representation Model</h2>
                        <p><strong>Prototype:</strong> signMagnitude(n, bits)</p>
                        <p><strong>Return Type:</strong> Binary Pattern</p>
                        <p><strong>Purpose:</strong> Encodes signed numbers using separate sign & magnitude.</p>
                        <p><strong>When & Why Used:</strong> Used historically, conceptually important for understanding 1’s & 2’s complement.</p>
                    </div>
                </section>

                {/* THEORY */}
                <section className="mt-12">
                    <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">📘 How Sign-Magnitude Works</h2>
                        <p>
                            The leftmost bit is the <strong>sign bit</strong>:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>0 → Positive</li>
                            <li>1 → Negative</li>
                        </ul>
                        <p className="mt-3">
                            Remaining bits store the magnitude.
                            Example in 8-bit:
                        </p>
                        <p className="mt-2">
                            +25 → <code>0 0011001</code><br />
                            −25 → <code>1 0011001</code>
                        </p>
                    </div>
                </section>

                {/* VISUAL SVG */}
                <section className="mt-12">
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-4">🧠 Visual Breakdown (8-bit)</h2>

                        <svg viewBox="0 0 760 200" className="w-full">
                            <rect x="40" y="70" width="300" height="60" rx="12" className="fill-sky-100 dark:fill-sky-900" />
                            <text x="60" y="105" className="font-semibold">0 0011001 → +25</text>

                            <rect x="420" y="70" width="300" height="60" rx="12" className="fill-rose-100 dark:fill-rose-900" />
                            <text x="440" y="105" className="font-semibold">1 0011001 → −25</text>
                        </svg>
                    </div>
                </section>

                {/* LIMITATION */}
                <section className="mt-12">
                    <div className="bg-amber-50 dark:bg-amber-900/30 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">❌ Limitations of Sign-Magnitude</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Two representations of zero: +0 and −0.</li>
                            <li>Complex arithmetic circuits.</li>
                            <li>Wastes one possible binary pattern.</li>
                        </ul>
                    </div>
                </section>

                {/* HINT */}
                <section className="mt-12">
                    <div className="bg-sky-50 dark:bg-sky-900/30 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">💡 Think About…</h2>
                        <p>
                            If both <code>00000000</code> and <code>10000000</code> mean zero,
                            what problem might arise during subtraction?
                        </p>
                    </div>
                </section>

                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-6">

                    <h2 className="text-2xl font-bold text-sky-300">
                        Sign–Magnitude (SM) Representation
                    </h2>

                    <p>
                        In <span className="text-emerald-300 font-semibold">Sign–Magnitude representation</span>, the
                        <span className="text-yellow-300 font-semibold"> leftmost bit (MSB)</span> represents the sign
                        of the number, while the remaining bits represent the magnitude (absolute value).
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center border border-slate-700">
                            <thead className="bg-slate-800 text-sky-300">
                                <tr>
                                    <th className="p-2 border border-slate-700">MSB</th>
                                    <th className="p-2 border border-slate-700">Meaning</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border border-slate-700">0</td>
                                    <td className="p-2 border border-slate-700">Positive (+)</td>
                                </tr>
                                <tr className="bg-slate-800">
                                    <td className="p-2 border border-slate-700">1</td>
                                    <td className="p-2 border border-slate-700">Negative (–)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-xl font-semibold text-emerald-300 mb-2">
                            Word Size Assumption (4-bit)
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>1 bit → Sign</li>
                            <li>3 bits → Magnitude</li>
                            <li>Maximum magnitude = <code className="text-sky-300">111₂ = 7₁₀</code></li>
                        </ul>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center border border-slate-700">
                            <thead className="bg-slate-800 text-sky-300">
                                <tr>
                                    <th className="p-2 border border-slate-700">Signed Decimal</th>
                                    <th className="p-2 border border-slate-700">Sign–Magnitude</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border border-slate-700">+6</td>
                                    <td className="p-2 border border-slate-700 font-mono">0110</td>
                                </tr>
                                <tr className="bg-slate-800">
                                    <td className="p-2 border border-slate-700">-6</td>
                                    <td className="p-2 border border-slate-700 font-mono">1110</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border border-slate-700">+0</td>
                                    <td className="p-2 border border-slate-700 font-mono">0000</td>
                                </tr>
                                <tr className="bg-slate-800">
                                    <td className="p-2 border border-slate-700">-0</td>
                                    <td className="p-2 border border-slate-700 font-mono">1000</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border border-slate-700">+7</td>
                                    <td className="p-2 border border-slate-700 font-mono">0111</td>
                                </tr>
                                <tr className="bg-slate-800">
                                    <td className="p-2 border border-slate-700">-7</td>
                                    <td className="p-2 border border-slate-700 font-mono">1111</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-red-900/30 p-4 rounded-xl border border-red-700">
                        <h3 className="text-lg font-semibold text-red-400 mb-2">
                            Important Observation
                        </h3>
                        <p>
                            In Sign–Magnitude representation, zero has
                            <span className="text-red-300 font-semibold"> two representations</span>:
                        </p>
                        <p className="mt-2 font-mono text-sky-300">
                            +0 = 0000 &nbsp;&nbsp; and &nbsp;&nbsp; -0 = 1000
                        </p>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                            Disadvantages
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Two representations of zero.</li>
                            <li>Arithmetic operations are complicated.</li>
                            <li>Not efficient for hardware implementation.</li>
                        </ul>
                    </div>

                </section>

                {/* Addition */}
                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">

                    <h2 className="text-2xl font-bold text-sky-300">
                        Addition in Sign–Magnitude Representation
                    </h2>

                    <p>
                        A number is represented inside a computer mainly to perform calculations.
                        The most basic arithmetic operation in a computer is <span className="text-emerald-300 font-semibold">addition</span>.
                        That is why a computer is often called an <span className="text-yellow-300 font-semibold">adder</span>.
                    </p>

                    <p>
                        When adding two numbers having the <span className="text-emerald-300 font-semibold">same sign</span>,
                        add their magnitudes and keep the <span className="text-yellow-300 font-semibold">common sign</span>.
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                            Example 1: Add (+5) and (+3) using 4-bit SM notation
                        </h3>

                        <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
                            {`
   111   <- Carry generated during addition
   0101  <- (+5) First Number
 + 0011  <- (+3) Second Number
 --------
   1000  <- (+8) Sum
`}
                        </pre>

                        <p className="mt-2">
                            Both numbers are positive, so the magnitudes are added and the sign bit remains <span className="font-mono">0</span>.
                            The result is <span className="text-sky-300 font-mono">+8 (1000)</span>.
                        </p>
                    </div>

                </section>

                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">

                    <h2 className="text-2xl font-bold text-sky-300">
                        Addition with Different Signs – Problem in Sign–Magnitude
                    </h2>

                    <p>
                        When two numbers have <span className="text-red-300 font-semibold">different signs</span>,
                        Sign–Magnitude representation does not perform subtraction correctly using simple binary addition.
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                            Example 2: Add (−4) and (+2) using 4-bit SM notation
                        </h3>

                        <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
                            {`
   000   <- Carry generated during addition

   1100  <- (-4) First Number
 + 0010  <- (+2) Second Number
 --------
   1110  <- (-6) Wrong Sum
`}
                        </pre>

                        <p className="mt-2">
                            The correct result should be <span className="text-emerald-300 font-mono">-2 = 1010</span>,
                            but the computer produces <span className="text-red-300 font-mono">1110 = -6</span>.
                        </p>

                        <p className="mt-2 text-yellow-300 font-semibold">
                            This shows a major drawback of Sign–Magnitude representation:
                            simple binary addition fails when numbers have different signs.
                        </p>
                    </div>

                </section>


                <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">

                    <h2 className="text-2xl font-bold text-sky-300">
                        Disadvantages of Sign–Magnitude Representation
                    </h2>

                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            There are <span className="text-red-300 font-semibold">two representations of zero</span>:
                            <span className="font-mono text-sky-300"> 0000</span> and
                            <span className="font-mono text-sky-300"> 1000</span>.
                            This makes it difficult for the computer to test whether a result is zero.
                        </li>

                        <li>
                            It is <span className="text-yellow-300 font-semibold">not convenient for performing arithmetic operations</span>,
                            especially when numbers have different signs.
                        </li>
                    </ul>

                    <div className="bg-red-900/30 p-4 rounded-xl border border-red-700">
                        <p className="text-red-300 font-semibold">
                            Hence, due to the above ambiguities, Sign–Magnitude notation is generally not used
                            to represent signed numbers inside a computer.
                        </p>
                    </div>

                </section>






                {/* TEACHER NOTE */}
                <section className="mt-12">
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">👨‍🏫 Teacher’s Note</h2>
                        <p>
                            Teach this only as a conceptual stepping stone.
                            Emphasize that real CPUs do NOT use Sign-Magnitude today.
                        </p>
                    </div>
                </section>

                {/* CHECKLIST */}
                <section className="mt-12">
                    <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">✅ Mini Checklist</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>I know how sign-magnitude stores negatives.</li>
                            <li>I can explain why it has two zeros.</li>
                            <li>I understand its historical importance.</li>
                        </ul>
                    </div>
                </section>

            </div>
        );
    }
}
