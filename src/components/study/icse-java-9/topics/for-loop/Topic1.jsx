import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic1 extends Component {
    render() {
        return (
            <div className="space-y-16">

                {/* ================= HEADER ================= */}
                <h2 className="text-xl font-semibold text-sky-300 tracking-wide">
                    Flow of Execution of for Loop
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed">
                    ICSE Class IX students must clearly understand the
                    <b> order of execution</b> of a <code>for</code> loop.
                    The animated diagram below shows how control flows inside the loop.
                </p>


                {/* ================= IMPROVED ANIMATED SVG ================= */}
                <div className="flex justify-center">
                    <svg
                        width="600"
                        height="360"
                        viewBox="0 0 600 360"
                        className="group"
                    >
                        {/* START */}
                        <rect x="240" y="10" width="120" height="35" rx="18" fill="#22c55e" />
                        <text x="275" y="33" fill="#fff" fontSize="14">Start</text>

                        {/* INIT */}
                        <rect
                            x="200"
                            y="60"
                            width="200"
                            height="40"
                            rx="10"
                            fill="#0ea5e9"
                            className="opacity-40 group-hover:opacity-100 transition duration-500"
                        />
                        <text x="235" y="86" fill="#fff">1. Initialization</text>

                        {/* CONDITION (Diamond) */}
                        <polygon
                            points="300,120 380,160 300,200 220,160"
                            fill="#22c55e"
                            className="opacity-40 group-hover:opacity-100 transition duration-500 delay-300"
                        />
                        <text x="255" y="165" fill="#fff">2. Condition?</text>

                        {/* BODY */}
                        <rect
                            x="200"
                            y="220"
                            width="200"
                            height="40"
                            rx="10"
                            fill="#a855f7"
                            className="opacity-40 group-hover:opacity-100 transition duration-500 delay-600"
                        />
                        <text x="245" y="246" fill="#fff">3. Loop Body</text>

                        {/* UPDATE */}
                        <rect
                            x="200"
                            y="280"
                            width="200"
                            height="40"
                            rx="10"
                            fill="#f97316"
                            className="opacity-40 group-hover:opacity-100 transition duration-500 delay-900"
                        />
                        <text x="240" y="306" fill="#fff">4. Update</text>

                        {/* ARROWS */}
                        <defs>
                            <marker
                                id="arrow"
                                markerWidth="10"
                                markerHeight="10"
                                refX="6"
                                refY="3"
                                orient="auto"
                            >
                                <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
                            </marker>
                        </defs>

                        {/* Down arrows */}
                        <line x1="300" y1="45" x2="300" y2="60" stroke="#94a3b8" markerEnd="url(#arrow)" />
                        <line x1="300" y1="100" x2="300" y2="120" stroke="#94a3b8" markerEnd="url(#arrow)" />
                        <line x1="300" y1="200" x2="300" y2="220" stroke="#94a3b8" markerEnd="url(#arrow)" />
                        <line x1="300" y1="260" x2="300" y2="280" stroke="#94a3b8" markerEnd="url(#arrow)" />

                        {/* Loop-back arrow */}
                        <path
                            d="M400 300 C500 300 500 160 380 160"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="2"
                            markerEnd="url(#arrow)"
                        />

                        {/* Labels */}
                        <text x="410" y="150" fill="#94a3b8" fontSize="12">Yes</text>
                        <text x="385" y="175" fill="#94a3b8" fontSize="12">No → Exit</text>
                    </svg>
                </div>


                {/* ================= EXECUTION ORDER (TEXT) ================= */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                    <h3 className="text-slate-200 font-medium mb-2">
                        Order of Execution (ICSE Exam Language)
                    </h3>
                    <ol className="list-decimal list-inside text-slate-300 text-sm space-y-1">
                        <li>Initialization is executed once</li>
                        <li>Condition is checked</li>
                        <li>Body of the loop executes if condition is true</li>
                        <li>Update statement modifies loop variable</li>
                        <li>Condition is checked again</li>
                    </ol>
                </div>

                {/* ================= JAVA CODE ================= */}
                <JavaCodeBlock
                    title="For Loop Execution Example (ICSE)"
                    highlightLines={[1, 2, 4]}
                    code={`for(int i = 1; i <= 3; i++)
{
    System.out.println(i);
}`}
                />

                {/* ================= EXPLANATION ================= */}
                <div className="text-slate-300 text-sm space-y-2">
                    <p>• Initialization sets <code>i = 1</code></p>
                    <p>• Condition <code>i &lt;= 3</code> is checked before each run</p>
                    <p>• Loop body prints the value of <code>i</code></p>
                    <p>• Update increases <code>i</code> by 1</p>
                </div>

                {/* ================= TEACHER NOTE ================= */}
                <p className="text-emerald-300 text-sm">
                    👩‍🏫 <b>Teacher Note:</b>
                    ICSE Board frequently asks students to trace loop execution
                    step-by-step. This diagram should be mentally visualised
                    during exams.
                </p>

                {/* ================= TIPS ================= */}
                <p className="text-yellow-300 text-sm">
                    💡 <b>Tip & Trick:</b>
                    If the condition becomes <b>false</b>, the loop stops immediately —
                    the body does not execute again.
                </p>

            </div>
        );
    }
}
