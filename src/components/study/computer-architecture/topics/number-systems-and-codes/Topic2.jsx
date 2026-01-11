import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";
export default class Topic2 extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 180);
    }

    render() {
        const reveal = this.state.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

        return (
            <div className="max-w-6xl mx-auto px-6 py-10 leading-relaxed text-slate-800 dark:text-slate-200">

                <style>{`
          @keyframes fadeUp {
            from{opacity:0; transform:translateY(20px);}
            to{opacity:1; transform:translateY(0);}
          }
        `}</style>

                <h1 className="text-3xl font-semibold text-sky-600 dark:text-sky-400 mb-8">
                    Topic 3 – Conversion from Decimal to Octal
                </h1>

                {/* PURPOSE */}
                <section className={`motion-safe:animate-[fadeUp_0.6s_ease-out] ${reveal}`}>
                    <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">🎯 Purpose</h2>
                        <p>
                            This topic explains how a decimal number is converted into
                            <strong> Octal (Base-8)</strong>.
                            When Abhronila from Naihati works with old UNIX file permissions,
                            octal numbers like <code>755</code> appear everywhere.
                        </p>
                    </div>
                </section>

                {/* PROTOTYPE */}
                <section className="mt-10">
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">🔧 Algorithm Signature</h2>
                        <p><strong>Prototype:</strong> decimalToOctal(n)</p>
                        <p><strong>Return Type:</strong> String</p>
                        <p><strong>Purpose:</strong> Converts a decimal integer to octal.</p>
                        <p><strong>When & Why Used:</strong> Used in low-level OS permissions, embedded systems.</p>
                    </div>
                </section>

                {/* THEORY */}
                <section className={`mt-10 motion-safe:animate-[fadeUp_0.7s_ease-out] ${reveal}`}>
                    <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">📘 Step-by-Step Theory</h2>
                        <p>
                            Divide the decimal number repeatedly by <strong>8</strong>.
                            Each remainder becomes an octal digit.
                            Read the remainders from <strong>bottom to top</strong>.
                        </p>
                    </div>
                </section>

                <section className={`mt-10 motion-safe:animate-[fadeUp_0.9s_ease-out] ${reveal}`}>
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-2xl transition-all duration-300">

                        <h2 className="text-xl font-semibold mb-4">🔢 Decimal → Octal : Visual Algorithm (125 → ?)</h2>

                        <p className="mb-6">
                            Divide repeatedly by <strong>8</strong>.
                            Write the <strong>remainder on the right</strong>.
                            Stop when quotient becomes <strong>0</strong>.
                            Read remainders from <strong>bottom to top</strong>.
                        </p>

                        <svg viewBox="0 0 820 420" className="w-full">

                            {/* COLUMN HEADERS */}
                            <text x="60" y="40" className="font-semibold">Step</text>
                            <text x="160" y="40" className="font-semibold">Division</text>
                            <text x="400" y="40" className="font-semibold">Quotient</text>
                            <text x="560" y="40" className="font-semibold">Remainder</text>

                            {/* ROW 1 */}
                            <rect x="40" y="60" width="720" height="70" rx="14"
                                className="fill-sky-100 dark:fill-sky-900" />
                            <text x="70" y="105">1</text>
                            <text x="160" y="105">125 ÷ 8</text>
                            <text x="410" y="105">15</text>
                            <text x="580" y="105" className="font-semibold">5</text>

                            {/* ROW 2 */}
                            <rect x="40" y="150" width="720" height="70" rx="14"
                                className="fill-sky-100 dark:fill-sky-900" />
                            <text x="70" y="195">2</text>
                            <text x="160" y="195">15 ÷ 8</text>
                            <text x="410" y="195">1</text>
                            <text x="580" y="195" className="font-semibold">7</text>

                            {/* ROW 3 */}
                            <rect x="40" y="240" width="720" height="70" rx="14"
                                className="fill-sky-100 dark:fill-sky-900" />
                            <text x="70" y="285">3</text>
                            <text x="160" y="285">1 ÷ 8</text>
                            <text x="410" y="285">0</text>
                            <text x="580" y="285" className="font-semibold">1</text>

                            {/* ARROW INDICATING READING ORDER */}
                            <line x1="670" y1="310" x2="670" y2="150" stroke="currentColor" strokeWidth="2"
                                strokeDasharray="6 4">
                                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="2s" repeatCount="indefinite" />
                            </line>
                            <text x="620" y="135" className="font-semibold">Read ↑</text>

                            {/* FINAL RESULT */}
                            <rect x="240" y="340" width="360" height="60" rx="18"
                                className="fill-emerald-100 dark:fill-emerald-900" />
                            <text x="300" y="380" className="font-semibold text-emerald-700 dark:text-emerald-300">
                                Final Octal Number = 175
                            </text>

                        </svg>

                        <div className="mt-6 bg-sky-50 dark:bg-sky-900/30 p-4 rounded-xl">
                            <strong>Verification:</strong><br />
                            175<sub>8</sub> = (1×8²) + (7×8¹) + (5×8⁰)
                            = 64 + 56 + 5 = <strong>125</strong>
                        </div>

                    </div>
                </section>



                <section>
                    <Whiteboard />
                </section>


                {/* COMMON PITFALLS */}
                <section className="mt-10">
                    <div className="bg-rose-50 dark:bg-rose-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">⚠ Common Pitfalls</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Using divisor 2 instead of 8.</li>
                            <li>Reading remainder top-down.</li>
                            <li>Writing digits above 7.</li>
                        </ul>
                    </div>
                </section>

                {/* BEST PRACTICES */}
                <section className="mt-10">
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">🌟 Best Practices</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Circle the divisor to avoid mistakes.</li>
                            <li>Group binary bits in 3-bits to cross-verify.</li>
                            <li>Check digits never exceed 7.</li>
                        </ul>
                    </div>
                </section>

                {/* THINK */}
                <section className="mt-10">
                    <div className="bg-sky-50 dark:bg-sky-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">💡 Think About…</h2>
                        <p>
                            Try converting <code>350</code> to octal.
                            Observe how the remainders behave when division crosses below 8.
                        </p>
                    </div>
                </section>

                {/* TEACHER NOTE */}
                <section className="mt-10">
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">👨‍🏫 Teacher’s Note</h2>
                        <p>
                            Students confuse octal with binary.
                            Always say out loud: “Divide by 8, not by 2.”
                        </p>
                    </div>
                </section>

                {/* CHECKLIST */}
                <section className="mt-10">
                    <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-3">✅ Mini Checklist</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>I divide using 8 only.</li>
                            <li>I read remainders bottom-up.</li>
                            <li>I never write digits above 7.</li>
                        </ul>
                    </div>
                </section>

            </div>
        );
    }
}
