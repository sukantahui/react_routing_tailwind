import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic62_files/topic62_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic62_files/topic62_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic62 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showBindingHighlight, setShowBindingHighlight] = useState(true);
    const [showSlackValues, setShowSlackValues] = useState(true);
    const [showSteps, setShowSteps] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples for binding and non-binding constraints
    const examples = [
        {
            id: 0,
            name: "Production Problem",
            description: "Identify binding and non-binding constraints at optimal point (4,3)",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6", isBinding: true, slack: 0 },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b", isBinding: true, slack: 0 },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isBinding: false, slack: 4 },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isBinding: false, slack: 3 },
            ],
            objective: "Z = 3x + 4y",
            optimalPoint: { x: 4, y: 3, Z: 24 },
            bindingConstraints: ["x + y ≤ 10", "2x + y ≤ 14"],
            nonBindingConstraints: ["x ≥ 0", "y ≥ 0"],
            explanation: "At (4,3), x+y=10 and 2x+y=14 are binding (equality holds). Non-negativity constraints have slack (x=4>0, y=3>0)."
        },
        {
            id: 1,
            name: "Diet Problem",
            description: "Identify binding and non-binding constraints at optimal point (3,4)",
            constraints: [
                { label: "20x + 10y ≥ 100", a: 20, b: 10, c: 100, sign: "≥", color: "#8b5cf6", isBinding: true, slack: 0 },
                { label: "10x + 30y ≥ 120", a: 10, b: 30, c: 120, sign: "≥", color: "#f59e0b", isBinding: false, slack: 30 },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isBinding: false, slack: 3 },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isBinding: false, slack: 4 },
            ],
            objective: "C = 4x + 3y",
            optimalPoint: { x: 3, y: 4, C: 24 },
            bindingConstraints: ["20x + 10y ≥ 100"],
            nonBindingConstraints: ["10x + 30y ≥ 120", "x ≥ 0", "y ≥ 0"],
            explanation: "At (3,4), protein constraint is binding (20(3)+10(4)=100). Carbs has slack (10(3)+30(4)=150>120)."
        },
        {
            id: 2,
            name: "Resource Allocation",
            description: "Identify binding and non-binding constraints at optimal point (5,7.5)",
            constraints: [
                { label: "2x + 4y ≤ 40", a: 2, b: 4, c: 40, sign: "≤", color: "#8b5cf6", isBinding: true, slack: 0 },
                { label: "3x + 2y ≤ 30", a: 3, b: 2, c: 30, sign: "≤", color: "#f59e0b", isBinding: true, slack: 0 },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isBinding: false, slack: 5 },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isBinding: false, slack: 7.5 },
            ],
            objective: "Z = 6x + 8y",
            optimalPoint: { x: 5, y: 7.5, Z: 90 },
            bindingConstraints: ["2x + 4y ≤ 40", "3x + 2y ≤ 30"],
            nonBindingConstraints: ["x ≥ 0", "y ≥ 0"],
            explanation: "At (5,7.5), both resource constraints are binding. Non-negativity has slack."
        },
    ];

    const currentExample = examples[selectedExample];

    // Helper: convert coordinates to SVG pixels
    const toPixel = (x, y) => {
        const maxVal = 12;
        const scale = 460 / maxVal;
        return {
            px: 80 + x * scale,
            py: 380 - y * scale
        };
    };

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const range = 12;
        const minRange = -1;
        if (b !== 0 && a !== 0) {
            for (let x = minRange; x <= range + 1; x += 0.1) {
                const y = (c - a * x) / b;
                if (y >= minRange && y <= range + 1) {
                    const p = toPixel(x, y);
                    if (p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390) {
                        points.push(p);
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= minRange && xVal <= range + 1) {
                const px = toPixel(xVal, 0).px;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= minRange && yVal <= range + 1) {
                const py = toPixel(0, yVal).py;
                points.push({ px: 40, py });
                points.push({ px: 560, py });
            }
        }
        return points;
    };

    // Determine if a constraint is solid
    const isSolid = (sign) => sign === "≥" || sign === "≤";

    // Get shading polygon for a specific constraint
    const getConstraintShading = (a, b, c, sign) => {
        const pts = [];
        const range = 12;
        const minRange = -1;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push(toPixel(minRange, minRange));
                    pts.push(toPixel(range, minRange));
                    const yRight = yAtX(range);
                    if (yRight >= minRange && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(minRange);
                    if (yLeft >= minRange && yLeft <= range) {
                        pts.push(toPixel(minRange, yLeft));
                    }
                } else {
                    pts.push(toPixel(minRange, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= minRange && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(minRange);
                    if (yLeft >= minRange && yLeft <= range) {
                        pts.push(toPixel(minRange, yLeft));
                    }
                }
            } else {
                if (b > 0) {
                    pts.push(toPixel(minRange, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= minRange && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(minRange);
                    if (yLeft >= minRange && yLeft <= range) {
                        pts.push(toPixel(minRange, yLeft));
                    }
                } else {
                    pts.push(toPixel(minRange, minRange));
                    pts.push(toPixel(range, minRange));
                    const yRight = yAtX(range);
                    if (yRight >= minRange && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(minRange);
                    if (yLeft >= minRange && yLeft <= range) {
                        pts.push(toPixel(minRange, yLeft));
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            const px = toPixel(xVal, 0).px;
            if (sign === "≥" || sign === ">") {
                pts.push(toPixel(xVal, minRange));
                pts.push(toPixel(range, minRange));
                pts.push(toPixel(range, range));
                pts.push(toPixel(xVal, range));
            } else {
                pts.push(toPixel(minRange, minRange));
                pts.push(toPixel(xVal, minRange));
                pts.push(toPixel(xVal, range));
                pts.push(toPixel(minRange, range));
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            const py = toPixel(0, yVal).py;
            if (sign === "≥" || sign === ">") {
                pts.push(toPixel(minRange, yVal));
                pts.push(toPixel(range, yVal));
                pts.push(toPixel(range, range));
                pts.push(toPixel(minRange, range));
            } else {
                pts.push(toPixel(minRange, minRange));
                pts.push(toPixel(range, minRange));
                pts.push(toPixel(range, yVal));
                pts.push(toPixel(minRange, yVal));
            }
        }
        return pts.filter(p => p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390);
    };

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

    // Calculate slack for display
    const getSlackDisplay = (con) => {
        const { optimalPoint } = currentExample;
        const lhs = con.a * optimalPoint.x + con.b * optimalPoint.y;
        if (con.sign === "≤") {
            return con.c - lhs;
        } else if (con.sign === "≥") {
            return lhs - con.c;
        }
        return 0;
    };

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
                        Topic 62 — Binding Constraints
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Binding and <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            Non-Binding Constraints
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn to distinguish between constraints that are active at the optimal solution and
                        those that have slack — a critical skill for LP analysis.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What are Binding and Non-Binding Constraints? ===== */}
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
                        <span className="text-3xl">🔗</span>
                        What are Binding and Non-Binding Constraints?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            At the optimal solution, some constraints are <strong className="text-blue-600 dark:text-blue-400">binding</strong>{" "}
                            (active) while others are <strong className="text-indigo-600 dark:text-indigo-400">non-binding</strong>{" "}
                            (have slack).
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Binding Constraint</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The constraint holds as an <strong>equality</strong> at the optimal point.
                                    Slack = 0.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Non-Binding Constraint</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The constraint has <strong>slack</strong> (for ≤) or <strong>surplus</strong>{" "}
                                    (for ≥) at the optimal point.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> Binding constraints are
                                the ones that <strong>limit</strong> the optimal solution. Non-binding constraints
                                have unused capacity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Identify Binding vs Non-Binding ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        How to Identify Binding vs Non-Binding Constraints
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">1. Substitute</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plug the optimal point into each constraint.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">2. Check Equality</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If LHS = RHS → binding. If LHS &lt; RHS (≤) or LHS &gt; RHS (≥) → non-binding.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Calculate Slack</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Slack = RHS - LHS (for ≤) or LHS - RHS (for ≥). If slack &gt; 0 → non-binding.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                            <p className="text-sm text-purple-800 dark:text-purple-300">
                                <span className="font-semibold">💡 Pro tip:</span> Binding constraints are the
                                ones that are "tight" at the optimal point. They're the reason you can't improve
                                the objective further.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Binding Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Binding Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see which constraints are binding and which have slack at the
                            optimal point. Binding constraints are highlighted in red.
                        </p>

                        {/* Example selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {examples.map((ex) => (
                                <button
                                    key={ex.id}
                                    onClick={() => setSelectedExample(ex.id)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                        selectedExample === ex.id
                                            ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowBindingHighlight(!showBindingHighlight)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showBindingHighlight
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showBindingHighlight ? "Hide Highlight" : "Show Highlight"}
                            </button>
                            <button
                                onClick={() => setShowSlackValues(!showSlackValues)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showSlackValues
                                        ? "bg-emerald-600 text-white border-emerald-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showSlackValues ? "Hide Slack" : "Show Slack"}
                            </button>
                            <button
                                onClick={() => setShowSteps(!showSteps)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showSteps
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showSteps ? "Hide Steps" : "Show Steps"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Binding constraints graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t62" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t62)" />

                                    {/* Shading for all constraints */}
                                    {currentExample.constraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            const opacity = con.isBinding ? 0.08 : 0.15;
                                            return (
                                                <polygon
                                                    key={`shade-${con.label}`}
                                                    points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill={con.color}
                                                    fillOpacity={opacity}
                                                    stroke="none"
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Binding highlight */}
                                    {showBindingHighlight && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#ef4444" className="font-bold">
                                                🔗 BINDING CONSTRAINTS
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                {currentExample.bindingConstraints.join(", ")}
                                            </text>
                                            <text x="30" y="126" fontSize="10" fill="#ef4444">
                                                Slack = 0
                                            </text>
                                        </g>
                                    )}

                                    {/* Optimal point */}
                                    {(() => {
                                        const { px, py } = toPixel(currentExample.optimalPoint.x, currentExample.optimalPoint.y);
                                        return (
                                            <g>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r="10"
                                                    fill="#f59e0b"
                                                    stroke="#fff"
                                                    strokeWidth="3"
                                                />
                                                <text
                                                    x={px + 14}
                                                    y={py - 14}
                                                    fontSize="13"
                                                    fill="#f59e0b"
                                                    className="font-mono font-bold"
                                                >
                                                    Optimal ({currentExample.optimalPoint.x}, {currentExample.optimalPoint.y})
                                                </text>
                                                <text
                                                    x={px + 14}
                                                    y={py + 6}
                                                    fontSize="11"
                                                    fill="#f59e0b"
                                                    className="font-mono"
                                                >
                                                    {currentExample.objective.split("=")[0].trim()} = {currentExample.optimalPoint.Z || currentExample.optimalPoint.C}
                                                </text>
                                            </g>
                                        );
                                    })()}

                                    {/* Axes */}
                                    <line x1="80" y1="380" x2="560" y2="380" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                    <line x1="80" y1="380" x2="80" y2="20" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                    <polygon points="560,373 575,380 560,387" fill="#1e293b" className="dark:fill-slate-300" />
                                    <polygon points="73,20 80,5 87,20" fill="#1e293b" className="dark:fill-slate-300" />
                                    <text x="565" y="400" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">x</text>
                                    <text x="25" y="22" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">y</text>

                                    {/* Origin */}
                                    <circle cx="80" cy="380" r="5" fill="#ef4444" />
                                    <text x="85" y="400" fontSize="14" fill="#1e293b" className="dark:fill-slate-300 font-medium">O</text>

                                    {/* Tick marks */}
                                    {[100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540].map((v) => {
                                        const val = Math.round((v - 80) / 40);
                                        if (val >= -1 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t62-tick-${v}`}>
                                                    <line x1={v} y1="373" x2={v} y2="387" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <text x={v - 6} y="400" fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                </g>
                                            );
                                        }
                                        return null;
                                    })}
                                    {[100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360].map((v) => {
                                        const val = Math.round((380 - v) / 40);
                                        if (val >= -1 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t62-ytick-${v}`}>
                                                    <line x1="73" y1={v} x2="87" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <text x="50" y={v + 4} fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                </g>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Draw all constraint lines */}
                                    {currentExample.constraints.map((con) => {
                                        const points = getLinePoints(con.a, con.b, con.c);
                                        const solid = isSolid(con.sign);
                                        if (points.length > 1) {
                                            return (
                                                <polyline
                                                    key={`line-${con.label}`}
                                                    points={points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={con.color}
                                                    strokeWidth={con.isBinding ? 4 : 2.5}
                                                    strokeDasharray={con.isBinding ? "none" : "4,4"}
                                                    opacity={con.isBinding ? 1 : 0.6}
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Slack labels */}
                                    {showSlackValues && currentExample.constraints.map((con, idx) => {
                                        const slack = getSlackDisplay(con);
                                        const points = getLinePoints(con.a, con.b, con.c);
                                        if (points.length > 1 && !con.isBinding) {
                                            const midIdx = Math.floor(points.length / 2);
                                            const p = points[midIdx] || points[0];
                                            return (
                                                <text
                                                    key={`slack-${idx}`}
                                                    x={p.px + 10}
                                                    y={p.py - 10}
                                                    fontSize="10"
                                                    fill="#94a3b8"
                                                    className="font-mono"
                                                >
                                                    Slack: {slack.toFixed(1)}
                                                </text>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Objective label */}
                                    <text x="20" y="50" fontSize="13" fill="#3b82f6" className="font-mono font-bold">
                                        {currentExample.objective}
                                    </text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {currentExample.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Steps panel */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                    <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">
                                        📋 Binding Analysis
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                🎯 Optimal Point
                                            </p>
                                            <p className="text-sm font-mono text-blue-800 dark:text-blue-300">
                                                ({currentExample.optimalPoint.x}, {currentExample.optimalPoint.y})
                                            </p>
                                            <p className="text-sm font-mono text-blue-800 dark:text-blue-300">
                                                {currentExample.objective} = {currentExample.optimalPoint.Z || currentExample.optimalPoint.C}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                                            <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                                🔗 Binding Constraints (Slack = 0)
                                            </p>
                                            <div className="mt-2 space-y-1 text-sm">
                                                {currentExample.constraints.filter(c => c.isBinding).map((con, idx) => (
                                                    <div key={idx} className="font-mono text-rose-800 dark:text-rose-300">
                                                        {con.label}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                                📊 Non-Binding Constraints (Slack &gt; 0)
                                            </p>
                                            <div className="mt-2 space-y-1 text-sm">
                                                {currentExample.constraints.filter(c => !c.isBinding).map((con, idx) => (
                                                    <div key={idx} className="font-mono text-emerald-800 dark:text-emerald-300">
                                                        {con.label} (Slack: {getSlackDisplay(con).toFixed(1)})
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                                💡 Explanation
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.explanation}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                📝 All Constraints
                                            </p>
                                            <div className="mt-2 space-y-1 text-sm">
                                                {currentExample.constraints.map((con, idx) => (
                                                    <div key={idx} className={clsx(
                                                        "font-mono",
                                                        con.isBinding ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
                                                    )}>
                                                        {con.label} {con.isBinding ? "← BINDING" : `← Slack: ${getSlackDisplay(con).toFixed(1)}`}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full mr-2">
                                {currentExample.constraints.filter(c => c.isBinding).length} binding constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full">
                                {currentExample.constraints.filter(c => !c.isBinding).length} non-binding
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full ml-2">
                                {currentExample.objective}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        Tips, Mistakes & Best Practices
                    </h2>
                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                                <span>💡</span> Pro Tips
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Binding constraints have zero slack at the optimum.</li>
                                <li>Non-binding constraints have slack or surplus.</li>
                                <li>Binding constraints limit the optimal solution.</li>
                                <li>Non-binding constraints could be relaxed without affecting the solution.</li>
                                <li>Calculate slack to identify which resources are fully used.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming a constraint is binding without checking.</li>
                                <li>Not calculating slack at the optimal point.</li>
                                <li>Confusing slack with surplus for ≥ constraints.</li>
                                <li>Forgetting that non-negativity can be binding.</li>
                                <li>Not identifying which constraints limit the solution.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always substitute the optimal point into all constraints.</li>
                                <li>Calculate slack or surplus for each constraint.</li>
                                <li>Identify which constraints are binding.</li>
                                <li>Document the slack values for analysis.</li>
                                <li>Use binding constraints for sensitivity analysis.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: Mini Checklist ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[4]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Mini Checklist
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify binding constraints at the optimal point.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify non-binding constraints at the optimal point.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can calculate slack for ≤ constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can calculate surplus for ≥ constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that binding constraints have zero slack.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can explain why binding constraints limit the optimal solution.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Binding and Non-Binding Constraints – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Binding and Non-Binding Constraints – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic62_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Binding constraints are the ones that truly matter at the optimum. I tell my students: 'If a constraint has slack, it's not limiting you — you could relax it without changing the solution.' This is the foundation of sensitivity analysis. A great exercise: have students identify binding constraints and then discuss what would happen if each constraint were relaxed."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 62 — Binding and Non-Binding Constraints &bull; Identifying active constraints
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Identifying Binding Constraints at the Optimal Solution (Topic 63)
                    </p>
                </footer>

            </div>

            {/* ===== GLOBAL KEYFRAMES ===== */}
            <style>{`
                @keyframes fadeUp {
                    0% { opacity: 0; transform: translateY(24px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animation-delay-\\[0ms\\] { animation-delay: 0ms; }
                .animation-delay-\\[100ms\\] { animation-delay: 100ms; }
                .animation-delay-\\[200ms\\] { animation-delay: 200ms; }
                .animation-delay-\\[300ms\\] { animation-delay: 300ms; }
                .animation-delay-\\[400ms\\] { animation-delay: 400ms; }
                .animation-delay-\\[500ms\\] { animation-delay: 500ms; }
                .animation-delay-\\[600ms\\] { animation-delay: 600ms; }
                @media (prefers-reduced-motion: reduce) {
                    .motion-safe\\:animate-\\[fadeUp_0\\.8s_ease-out_forwards\\],
                    .motion-safe\\:animate-\\[fadeUp_0\\.7s_ease-out_forwards\\] {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic62;