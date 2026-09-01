
import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic5.jsx
 * ----------------------------------------------------
 * Topic 6: Parameters vs Arguments – Clear Distinction
 * React 19 - Class Based Component
 * Zero-config Tailwind CSS
 * SVG-driven conceptual explanation
 * ----------------------------------------------------
 */

export default class Topic5 extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    componentDidMount() {
        this.setState({ visible: true });
    }

    render() {
        const baseSection =
            "opacity-0 translate-y-6 motion-safe:animate-[fadeUp_0.8s_ease-out_forwards]";
        const cardBase =
            "rounded-xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-1";

        return (
            <div className="space-y-16 px-4 md:px-6 py-10 text-slate-800 dark:text-slate-200 leading-relaxed">

                {/* ================= HEADER ================= */}
                <header className={`${baseSection} animation-delay-[0ms] max-w-4xl mx-auto`}>
                    <h1 className="text-2xl md:text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                        Parameters vs Arguments – Clear Distinction
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        This topic visually explains how <strong>arguments</strong> flow into
                        <strong> parameters</strong> during a function call.
                    </p>
                </header>

                {/* ================= SVG DEMONSTRATION ================= */}
                <section className={`${baseSection} animation-delay-[120ms] max-w-5xl mx-auto`}>
                    <div
                        className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-indigo-400/40`}
                    >
                        <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                            Visual Flow: Arguments → Parameters
                        </h2>

                        <svg
                            viewBox="0 0 1000 260"
                            className="w-full h-auto"
                            preserveAspectRatio="xMidYMid meet"
                            aria-label="Arguments to Parameters flow diagram"
                        >
                            {/* ARGUMENTS */}
                            <rect
                                x="60"
                                y="60"
                                width="240"
                                height="120"
                                rx="14"
                                className="fill-sky-100 dark:fill-sky-900 stroke-sky-400 dark:stroke-sky-600 transition-all duration-300 hover:fill-sky-200"
                            />
                            <text x="180" y="95" textAnchor="middle"
                                className="fill-sky-700 dark:fill-sky-300 font-semibold">
                                Arguments
                            </text>
                            <text x="180" y="130" textAnchor="middle"
                                className="fill-slate-600 dark:fill-slate-400 text-sm">
                                add(5, 10)
                            </text>

                            {/* ARROW 1 */}
                            <line x1="300" y1="120" x2="400" y2="120"
                                strokeWidth="2"
                                className="stroke-slate-500 dark:stroke-slate-400"
                            />
                            <polygon points="400,120 388,114 388,126"
                                className="fill-slate-500 dark:fill-slate-400">
                                <animate
                                    attributeName="opacity"
                                    from="0.4"
                                    to="1"
                                    dur="1s"
                                    repeatCount="indefinite"
                                />
                            </polygon>

                            {/* FUNCTION CALL */}
                            <rect
                                x="400"
                                y="60"
                                width="220"
                                height="120"
                                rx="14"
                                className="fill-indigo-100 dark:fill-indigo-900 stroke-indigo-400 dark:stroke-indigo-600 transition-all duration-300 hover:fill-indigo-200"
                            />
                            <text x="510" y="95" textAnchor="middle"
                                className="fill-indigo-700 dark:fill-indigo-300 font-semibold">
                                Function Call
                            </text>
                            <text x="510" y="130" textAnchor="middle"
                                className="fill-slate-600 dark:fill-slate-400 text-sm">
                                add(a, b)
                            </text>

                            {/* ARROW 2 */}
                            <line x1="620" y1="120" x2="720" y2="120"
                                strokeWidth="2"
                                className="stroke-slate-500 dark:stroke-slate-400"
                            />
                            <polygon points="720,120 708,114 708,126"
                                className="fill-slate-500 dark:fill-slate-400" />

                            {/* PARAMETERS */}
                            <rect
                                x="720"
                                y="60"
                                width="220"
                                height="120"
                                rx="14"
                                className="fill-emerald-100 dark:fill-emerald-900 stroke-emerald-400 dark:stroke-emerald-600 transition-all duration-300 hover:fill-emerald-200"
                            />
                            <text x="830" y="95" textAnchor="middle"
                                className="fill-emerald-700 dark:fill-emerald-300 font-semibold">
                                Parameters
                            </text>
                            <text x="830" y="130" textAnchor="middle"
                                className="fill-slate-600 dark:fill-slate-400 text-sm">
                                int x, int y
                            </text>
                        </svg>

                        <section className="mt-6 space-y-4 text-sm md:text-base">
                            <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                                Understanding the Diagram Step by Step
                            </h3>

                            <p>
                                This diagram visually represents what happens when a function is called in C.
                                Each block shows a <strong>different stage</strong> of execution, not just a naming difference.
                            </p>

                            <ul className="list-disc ml-6 space-y-2">
                                <li>
                                    <strong>Arguments (Left Box):</strong> These are the actual values
                                    (<code>5</code> and <code>10</code>) supplied at the time of the function call.
                                    They live in the <em>calling function</em> (usually <code>main()</code>).
                                </li>

                                <li>
                                    <strong>Function Call (Middle Box):</strong> This is the bridge.
                                    The call <code>add(a, b)</code> instructs the program to temporarily
                                    pause the caller and transfer control.
                                </li>

                                <li>
                                    <strong>Parameters (Right Box):</strong> These are new variables
                                    (<code>int x</code>, <code>int y</code>) created inside the called function.
                                    They receive <em>copies</em> of the argument values.
                                </li>
                            </ul>
                        </section>

                        <section className="mt-6 space-y-4 text-sm md:text-base">
                            <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                                What Happens in Memory During the Call?
                            </h3>

                            <p>
                                When <code>add(a, b)</code> is executed, C does <strong>not</strong> reuse
                                variables <code>a</code> and <code>b</code>.
                            </p>

                            <p>
                                Instead:
                            </p>

                            <ul className="list-disc ml-6 space-y-2">
                                <li>New memory locations are created for <code>x</code> and <code>y</code></li>
                                <li>Values of <code>a</code> and <code>b</code> are copied</li>
                                <li>The original variables remain unchanged</li>
                            </ul>

                            <p className="italic text-slate-600 dark:text-slate-400">
                                This is why C is called a <strong>call by value</strong> language by default.
                            </p>
                        </section>
                        <section className="mt-6 space-y-4 text-sm md:text-base">
                            <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                                Formal vs Actual Parameters
                            </h3>

                            <table className="w-full border border-slate-300 dark:border-slate-700 text-sm">
                                <thead className="bg-slate-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="p-2 border">Aspect</th>
                                        <th className="p-2 border">Actual (Arguments)</th>
                                        <th className="p-2 border">Formal (Parameters)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 border">Where they appear</td>
                                        <td className="p-2 border">Function call</td>
                                        <td className="p-2 border">Function definition</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Memory creation</td>
                                        <td className="p-2 border">Caller’s memory</td>
                                        <td className="p-2 border">Callee’s memory</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Name significance</td>
                                        <td className="p-2 border">Irrelevant to function</td>
                                        <td className="p-2 border">Local to function</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="mt-6 space-y-3 text-sm md:text-base">
                            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
                                Tips & Tricks (Professional Level)
                            </h3>

                            <ul className="list-disc ml-6 space-y-2">
                                <li>
                                    Never rely on parameter names to convey meaning — use clear function names.
                                </li>
                                <li>
                                    If changing parameters affects arguments, you are likely using pointers.
                                </li>
                                <li>
                                    Always assume parameters are <strong>independent copies</strong>
                                    unless explicitly proven otherwise.
                                </li>
                            </ul>
                        </section>




                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            ✔ Values move from <strong>arguments</strong> into
                            <strong> parameters</strong> via call-by-value.
                        </p>
                    </div>
                </section>

                {/* ================= CODE EXAMPLE ================= */}
                <section className={`${baseSection} animation-delay-[240ms] max-w-5xl mx-auto`}>
                    <EditableCCodeBlock
                        title="Parameters vs Arguments Example"
                        code={`#include <stdio.h>

int add(int x, int y) {   // parameters
    return x + y;
}

int main() {
    int a = 5;
    int b = 10;

    int result = add(a, b); // arguments
    printf("%d", result);
    return 0;
}`}
                    />
                </section>

                <section className="mt-6 space-y-3 text-sm md:text-base">
                    <h3 className="font-semibold text-rose-700 dark:text-rose-300">
                        Common Misconceptions
                    </h3>

                    <ul className="list-disc ml-6 space-y-2">
                        <li>“Changing parameter changes argument” ❌</li>
                        <li>“Parameter names must match argument names” ❌</li>
                        <li>“Arguments and parameters share memory” ❌</li>
                    </ul>

                    <p className="text-slate-600 dark:text-slate-400 italic">
                        These misconceptions cause major bugs later in pointers and recursion.
                    </p>
                </section>

                <section className="mt-6 space-y-3 text-sm md:text-base">
                    <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">
                        Exam & Interview Perspective
                    </h3>

                    <p>
                        Very common questions:
                    </p>

                    <ul className="list-disc ml-6 space-y-2">
                        <li>Differentiate between parameters and arguments</li>
                        <li>Explain call by value using an example</li>
                        <li>Why changing parameter does not affect argument?</li>
                    </ul>
                </section>



                {/* ================= HINT ================= */}
                <section className={`${baseSection} animation-delay-[360ms] max-w-5xl mx-auto`}>
                    <div className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800`}>
                        <h3 className="font-semibold text-sky-700 dark:text-sky-300 mb-2">
                            💡 Hint
                        </h3>
                        <p>
                            Change parameter names inside the function.
                            Notice how arguments stay unaffected.
                        </p>
                    </div>
                </section>

                {/* ================= TEACHER NOTE ================= */}
                <section className={`${baseSection} animation-delay-[480ms] max-w-5xl mx-auto`}>
                    <div className={`${cardBase} bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 hover:ring-yellow-400/60`}>
                        <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                            🧑‍🏫 Teacher’s Note
                        </h3>
                        <p className="text-sm">
                            Once students <strong>see</strong> arguments moving into parameters,
                            this confusion never returns. Always visualize data flow.
                        </p>
                    </div>
                </section>

                {/* ================= KEYFRAMES ================= */}
                <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
            </div>
        );
    }
}
