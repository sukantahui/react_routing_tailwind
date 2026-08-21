import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic0 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);

    // Staggered animation delays for sections
    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
    ];

    // Example data for the inequality graph
    const [inequalityType, setInequalityType] = useState("≤");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionRefs.current.indexOf(entry.target);
                        if (index !== -1 && index > activeSection) {
                            setActiveSection(index);
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [activeSection]);

    // Inequality examples for the interactive SVG
    const inequalityExamples = [
        { label: "2x + 3y ≤ 12", type: "≤", color: "#3b82f6" },
        { label: "x - y ≥ 2", type: "≥", color: "#10b981" },
        { label: "y < 2x + 1", type: "<", color: "#f59e0b" },
        { label: "y > -x + 4", type: ">", color: "#ef4444" },
    ];

    const [selectedExample, setSelectedExample] = useState(0);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-200 font-sans leading-relaxed antialiased">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

                {/* ===== HEADER ===== */}
                <header
                    className={clsx(
                        "mb-12 text-center animate-[fadeUp_0.8s_ease-out_forwards]",
                        "motion-safe:animate-[fadeUp_0.8s_ease-out_forwards]",
                        "motion-reduce:animate-none"
                    )}
                >
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        Topic 0 — Foundations
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Graphical Representation of <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            Linear Inequalities
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to visualize and interpret linear inequalities on a coordinate plane — the first step toward solving optimization problems.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> 8 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is a Linear Inequality? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        What is a Linear Inequality?
                    </h2>

                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            A <strong className="text-blue-600 dark:text-blue-400">linear inequality</strong> is
                            similar to a linear equation, but instead of an equals sign (=), it uses inequality
                            symbols: <strong>&lt;</strong> (less than), <strong>&gt;</strong> (greater than),
                            <strong> ≤</strong> (less than or equal to), or <strong>≥</strong> (greater than or
                            equal to).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Linear Equation</div>
                                <div className="text-lg font-mono text-blue-600 dark:text-blue-400">y = 2x + 3</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Exactly one line</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Linear Inequality</div>
                                <div className="text-lg font-mono text-emerald-600 dark:text-emerald-400">y ≤ 2x + 3</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">A whole region (half-plane)</div>
                            </div>
                        </div>
                        <p className="mt-3">
                            The solution to a linear inequality is not just a line — it's an entire{" "}
                            <strong className="text-emerald-600 dark:text-emerald-400">half-plane</strong> on one
                            side of the line. This is the foundation of graphical linear programming.
                        </p>
                    </div>

                    {/* Real-world analogy */}
                    <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            <span className="font-semibold">💡 Real-world analogy:</span> Imagine you're
                            planning a budget. The inequality{" "}
                            <span className="font-mono">Expenses ≤ ₹10,000</span> means your spending can be
                            anywhere from ₹0 to ₹10,000 — not just exactly ₹10,000. The graphical representation
                            shows all possible combinations that satisfy your budget.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 2: The Coordinate Plane ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        The Coordinate Plane
                    </h2>

                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            To graph linear inequalities, we use the <strong>Cartesian coordinate plane</strong>{" "}
                            with an <strong>x-axis</strong> (horizontal) and a <strong>y-axis</strong> (vertical).
                            Every point on the plane is represented by an ordered pair{" "}
                            <span className="font-mono">(x, y)</span>.
                        </p>

                        {/* SVG: Coordinate Plane with Grid */}
                        <div className="mt-4 flex justify-center">
                            <div className="w-full max-w-md aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Coordinate plane with x and y axes">
                                    {/* Grid lines */}
                                    <defs>
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="400" height="400" fill="url(#grid)" />

                                    {/* Axes */}
                                    <line x1="20" y1="200" x2="380" y2="200" stroke="#1e293b" strokeWidth="2" className="dark:stroke-slate-300" />
                                    <line x1="200" y1="380" x2="200" y2="20" stroke="#1e293b" strokeWidth="2" className="dark:stroke-slate-300" />

                                    {/* Arrowheads */}
                                    <polygon points="380,195 395,200 380,205" fill="#1e293b" className="dark:fill-slate-300" />
                                    <polygon points="195,20 200,5 205,20" fill="#1e293b" className="dark:fill-slate-300" />

                                    {/* Axis labels */}
                                    <text x="385" y="215" fontSize="18" fill="#1e293b" className="dark:fill-slate-300 font-medium">x</text>
                                    <text x="210" y="22" fontSize="18" fill="#1e293b" className="dark:fill-slate-300 font-medium">y</text>

                                    {/* Origin */}
                                    <circle cx="200" cy="200" r="3" fill="#ef4444" />
                                    <text x="205" y="215" fontSize="14" fill="#1e293b" className="dark:fill-slate-300">O</text>

                                    {/* Tick marks */}
                                    {[40, 80, 120, 160, 240, 280, 320, 360].map((v) => (
                                        <g key={`tick-${v}`}>
                                            <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                            <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                            {v >= 40 && v <= 360 && (
                                                <>
                                                    <text x={v - 4} y="220" fontSize="11" fill="#475569" className="dark:fill-slate-500">{v === 200 ? 0 : (v - 200) / 40}</text>
                                                    <text x="180" y={v + 5} fontSize="11" fill="#475569" className="dark:fill-slate-500">{v === 200 ? 0 : (200 - v) / 40}</text>
                                                </>
                                            )}
                                        </g>
                                    ))}

                                    {/* Static point */}
                                    <circle cx="280" cy="120" r="6" fill="#3b82f6" />
                                    <text x="285" y="115" fontSize="12" fill="#3b82f6" className="font-mono">
                                        (2, 2)
                                    </text>

                                    {/* Static second point */}
                                    <circle cx="120" cy="280" r="6" fill="#10b981" />
                                    <text x="100" y="295" fontSize="12" fill="#10b981" className="font-mono">
                                        (-2, -2)
                                    </text>
                                </svg>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">x-axis</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Horizontal — independent variable</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">y-axis</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Vertical — dependent variable</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                                <span className="text-sm font-medium text-rose-600 dark:text-rose-400">Origin</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400">(0, 0) — starting point</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Graphing a Linear Inequality ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        Graphing a Linear Inequality — Step by Step
                    </h2>

                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            To graph a linear inequality like <span className="font-mono text-blue-600 dark:text-blue-400">2x + 3y ≤ 12</span>,
                            follow these <strong>4 steps</strong>:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-xs">1</span>
                                    Plot the boundary line
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Replace the inequality with <span className="font-mono">=</span> and graph the line.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-xs">2</span>
                                    Solid or dashed?
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    ≤ or ≥ → <span className="font-semibold">solid</span> line. &lt; or &gt; → <span className="font-semibold">dashed</span> line.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 text-xs">3</span>
                                    Test a point
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Pick a point (e.g., <span className="font-mono">(0, 0)</span>) and check if it satisfies the inequality.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/40 text-xs">4</span>
                                    Shade the half-plane
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Shade the side containing the test point if true; shade the other side if false.
                                </p>
                            </div>
                        </div>

                        {/* Interactive SVG: Inequality grapher */}
                        <div className="mt-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {inequalityExamples.map((ex, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedExample(idx)}
                                        className={clsx(
                                            "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 font-mono",
                                            selectedExample === idx
                                                ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md"
                                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm"
                                        )}
                                    >
                                        {ex.label}
                                    </button>
                                ))}
                            </div>

                            <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Interactive inequality graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="400" height="400" fill="url(#grid2)" />

                                    {/* Axes */}
                                    <line x1="20" y1="200" x2="380" y2="200" stroke="#1e293b" strokeWidth="2" className="dark:stroke-slate-300" />
                                    <line x1="200" y1="380" x2="200" y2="20" stroke="#1e293b" strokeWidth="2" className="dark:stroke-slate-300" />
                                    <polygon points="380,195 395,200 380,205" fill="#1e293b" className="dark:fill-slate-300" />
                                    <polygon points="195,20 200,5 205,20" fill="#1e293b" className="dark:fill-slate-300" />
                                    <text x="385" y="215" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">x</text>
                                    <text x="210" y="22" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">y</text>

                                    {/* Origin */}
                                    <circle cx="200" cy="200" r="3" fill="#ef4444" />
                                    <text x="205" y="215" fontSize="12" fill="#1e293b" className="dark:fill-slate-300">O</text>

                                    {/* Tick marks */}
                                    {[40, 80, 120, 160, 240, 280, 320, 360].map((v) => (
                                        <g key={`tick2-${v}`}>
                                            <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1" className="dark:stroke-slate-300" />
                                            <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1" className="dark:stroke-slate-300" />
                                            {v >= 40 && v <= 360 && (
                                                <>
                                                    <text x={v - 4} y="218" fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">{v === 200 ? 0 : (v - 200) / 40}</text>
                                                    <text x="178" y={v + 4} fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">{v === 200 ? 0 : (200 - v) / 40}</text>
                                                </>
                                            )}
                                        </g>
                                    ))}

                                    {/* ====== DYNAMIC INEQUALITY GRAPH ====== */}
                                    {selectedExample === 0 && (
                                        <g>
                                            {/* Shaded region for 2x + 3y ≤ 12 */}
                                            <polygon points="20,200 380,200 380,20 20,20" fill="#3b82f6" fillOpacity="0.15" />
                                            <polygon points="20,380 20,200 200,200" fill="none" />
                                            {/* Boundary line: 2x + 3y = 12 => y = (12 - 2x)/3 */}
                                            <line x1="20" y1="380" x2="380" y2="20" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="none" />
                                            <line x1="20" y1="360" x2="380" y2="40" stroke="#3b82f6" strokeWidth="2.5" />
                                            {/* Point (0,0) — satisfies ≤ */}
                                            <circle cx="200" cy="200" r="5" fill="#10b981" />
                                            <text x="205" y="195" fontSize="11" fill="#10b981" className="font-mono">(0,0) ✓</text>
                                        </g>
                                    )}

                                    {selectedExample === 1 && (
                                        <g>
                                            {/* Shaded region for x - y ≥ 2 => y ≤ x - 2 */}
                                            <polygon points="20,200 380,200 380,380 20,380" fill="#10b981" fillOpacity="0.15" />
                                            <line x1="20" y1="380" x2="380" y2="20" stroke="#10b981" strokeWidth="2.5" />
                                            {/* x - y = 2 => y = x - 2 */}
                                            <line x1="20" y1="380" x2="380" y2="20" stroke="#10b981" strokeWidth="2.5" />
                                            <circle cx="200" cy="200" r="5" fill="#ef4444" />
                                            <text x="205" y="195" fontSize="11" fill="#ef4444" className="font-mono">(0,0) ✗</text>
                                        </g>
                                    )}

                                    {selectedExample === 2 && (
                                        <g>
                                            {/* Shaded region for y < 2x + 1 */}
                                            <polygon points="20,380 380,380 380,20 20,20" fill="#f59e0b" fillOpacity="0.15" />
                                            {/* y = 2x + 1 (dashed) */}
                                            <line x1="20" y1="360" x2="380" y2="40" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="8,4" />
                                            <circle cx="200" cy="200" r="5" fill="#10b981" />
                                            <text x="205" y="195" fontSize="11" fill="#10b981" className="font-mono">(0,0) ✓</text>
                                        </g>
                                    )}

                                    {selectedExample === 3 && (
                                        <g>
                                            {/* Shaded region for y > -x + 4 */}
                                            <polygon points="20,20 380,20 380,380 20,380" fill="#ef4444" fillOpacity="0.15" />
                                            {/* y = -x + 4 (dashed) */}
                                            <line x1="20" y1="380" x2="380" y2="20" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
                                            <circle cx="200" cy="200" r="5" fill="#10b981" />
                                            <text x="205" y="195" fontSize="11" fill="#10b981" className="font-mono">(0,0) ✓</text>
                                        </g>
                                    )}

                                    {/* Axis labels for the current example */}
                                    <text
                                        x="20"
                                        y="30"
                                        fontSize="12"
                                        fill="#475569"
                                        className="dark:fill-slate-400 font-mono"
                                    >
                                        {inequalityExamples[selectedExample].label}
                                    </text>
                                </svg>
                            </div>
                            <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                                <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                    {inequalityExamples[selectedExample].type === "≤" && "≤ : Solid line, shade below"}
                                    {inequalityExamples[selectedExample].type === "≥" && "≥ : Solid line, shade above"}
                                    {inequalityExamples[selectedExample].type === "<" && "< : Dashed line, shade below"}
                                    {inequalityExamples[selectedExample].type === ">" && "> : Dashed line, shade above"}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Real-World Examples ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🌍</span>
                        Real-World Examples
                    </h2>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                                <span>💰</span> Budget Constraint
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-mono">Expenses ≤ ₹20,000</span> — A student like{" "}
                                <span className="font-medium text-blue-600 dark:text-blue-400">Mamata</span>{" "}
                                can spend any amount up to ₹20,000 on books, food, and transport. The
                                graphical region shows all affordable combinations.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                                <span>⏱️</span> Time Management
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-mono">Study ≥ 2 hours</span> —{" "}
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Mahima</span>{" "}
                                must study at least 2 hours daily. The graph shows all study durations from
                                2 hours upward — an unbounded region.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300">
                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                                <span>📦</span> Inventory Storage
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-mono">x + y ≤ 100</span> — A warehouse in{" "}
                                <span className="font-medium text-amber-600 dark:text-amber-400">Ichapur</span>{" "}
                                can hold at most 100 units of two product types. The half-plane shows all
                                feasible storage combinations.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-rose-300 dark:hover:border-rose-700 transition-all duration-300">
                            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                                <span>🌾</span> Farm Land Allocation
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-mono">Rice + Wheat ≥ 50 acres</span> — A farmer near{" "}
                                <span className="font-medium text-rose-600 dark:text-rose-400">Jadavpur</span>{" "}
                                must plant at least 50 acres total. The graph shows all combinations that
                                meet this minimum requirement.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                        <p className="text-sm text-indigo-800 dark:text-indigo-300">
                            <span className="font-semibold">📌 Key insight:</span> In all these cases, the
                            inequality represents a <strong>range of possibilities</strong> — not just a single
                            solution. This is why graphical representation is so powerful for decision-making.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 5: Tips, Mistakes & Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[4]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        Tips, Mistakes & Best Practices
                    </h2>

                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Tips */}
                        <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                                <span>💡</span> Pro Tips
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    <span>Always use <span className="font-mono">(0,0)</span> as the test point — it's the easiest to evaluate.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    <span>For <span className="font-mono">Ax + By = C</span>, find intercepts quickly: set <span className="font-mono">x=0</span> and <span className="font-mono">y=0</span>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    <span>Use a ruler for straight lines — precision matters in LP.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    <span>Label your axes and the inequality on the graph for clarity.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Common Mistakes */}
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500">✗</span>
                                    <span>Using a dashed line for ≤ or ≥ (should be solid).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500">✗</span>
                                    <span>Shading the wrong side after testing a point.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500">✗</span>
                                    <span>Forgetting to rearrange the inequality into slope-intercept form.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500">✗</span>
                                    <span>Misreading the inequality direction when multiplying by a negative.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Best Practices */}
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500">✓</span>
                                    <span>Always test a point <strong>not on the line</strong> to determine shading.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500">✓</span>
                                    <span>Use a scale that fits all intercepts on your graph paper.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500">✓</span>
                                    <span>Double-check your line by plugging in a second point.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500">✓</span>
                                    <span>Keep your graph neat — it helps avoid misreading intersections.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: Mini Checklist ===== */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[5]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Mini Checklist
                    </h2>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span className="text-sm text-slate-700 dark:text-slate-300">I can identify a linear inequality from its equation.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span className="text-sm text-slate-700 dark:text-slate-300">I know the difference between solid and dashed lines.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span className="text-sm text-slate-700 dark:text-slate-300">I can graph a linear inequality on a coordinate plane.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span className="text-sm text-slate-700 dark:text-slate-300">I can test a point to determine the correct half-plane.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span className="text-sm text-slate-700 dark:text-slate-300">I understand that the solution is a region, not just a line.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span className="text-sm text-slate-700 dark:text-slate-300">I can connect the graph to a real-world constraint.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ SECTION ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Graphical Representation of Linear Inequalities — FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Graphical Representation of Linear Inequalities — Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic0_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "In my years of teaching at Barrackpore, I've found that students often struggle with the conceptual leap from 'equation' to 'inequality.' The key is to emphasize that an inequality represents a range of possibilities — not a single answer. Use real examples like pocket money, study time, or storage space to make it tangible. Remind students: the test point (0,0) is their best friend, and always, always check the line type (solid vs dashed) before shading. A neat graph saves half the battle in LP problems!"
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 0 — Foundations of Graphical Linear Programming &bull; Built for classroom learning
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Ready for Topic 1: Plotting Constraints on a Coordinate Plane
                    </p>
                </footer>

            </div>

            {/* ===== GLOBAL KEYFRAMES ===== */}
            <style>{`
                @keyframes fadeUp {
                    0% {
                        opacity: 0;
                        transform: translateY(24px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    50% {
                        transform: scale(1.3);
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    0% {
                        opacity: 0;
                        transform: translateX(-12px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animation-delay-\\[0ms\\] { animation-delay: 0ms; }
                .animation-delay-\\[100ms\\] { animation-delay: 100ms; }
                .animation-delay-\\[200ms\\] { animation-delay: 200ms; }
                .animation-delay-\\[300ms\\] { animation-delay: 300ms; }
                .animation-delay-\\[400ms\\] { animation-delay: 400ms; }
                .animation-delay-\\[500ms\\] { animation-delay: 500ms; }

                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .motion-safe\\:animate-\\[fadeUp_0\\.7s_ease-out_forwards\\] {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                    .motion-safe\\:animate-\\[fadeUp_0\\.8s_ease-out_forwards\\] {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                    .animate-\\[pulse_2s_ease-in-out_infinite\\] {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic0;