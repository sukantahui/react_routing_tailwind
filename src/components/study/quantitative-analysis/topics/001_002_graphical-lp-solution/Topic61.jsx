import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic61_files/topic61_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic61_files/topic61_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic61 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showRedundantHighlight, setShowRedundantHighlight] = useState(true);
    const [showSteps, setShowSteps] = useState(true);
    const [showComparison, setShowComparison] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples showing effect of redundant constraints on feasible region
    const examples = [
        {
            id: 0,
            name: "With Redundant Constraint",
            description: "x ≤ 20 is redundant with x ≤ 10",
            constraintsWithRedundant: [
                { label: "x ≤ 20", a: 1, b: 0, c: 20, sign: "≤", color: "#8b5cf6", isRedundant: true },
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "y ≤ 15", a: 0, b: 1, c: 15, sign: "≤", color: "#ef4444", isRedundant: false },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            constraintsWithoutRedundant: [
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "y ≤ 15", a: 0, b: 1, c: 15, sign: "≤", color: "#ef4444", isRedundant: false },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 3x + 4y",
            redundantConstraint: "x ≤ 20",
            effect: "Removing x≤20 does not change the feasible region. The region is the same quadrilateral.",
            keyInsight: "A redundant constraint has NO effect on the feasible region. The region remains exactly the same.",
            visualClue: "The feasible region with and without the redundant constraint looks identical."
        },
        {
            id: 1,
            name: "With Redundant Combined Constraint",
            description: "x + y ≤ 20 is redundant with x ≤ 10, y ≤ 10",
            constraintsWithRedundant: [
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#8b5cf6", isRedundant: false },
                { label: "y ≤ 10", a: 0, b: 1, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "x + y ≤ 20", a: 1, b: 1, c: 20, sign: "≤", color: "#ef4444", isRedundant: true },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            constraintsWithoutRedundant: [
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#8b5cf6", isRedundant: false },
                { label: "y ≤ 10", a: 0, b: 1, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 5x + 6y",
            redundantConstraint: "x + y ≤ 20",
            effect: "Removing x+y≤20 does not change the feasible region. The region is the same square.",
            keyInsight: "Redundant constraints can be combinations of other constraints. They don't affect the region.",
            visualClue: "The feasible region with and without x+y≤20 looks identical."
        },
        {
            id: 2,
            name: "Without Redundant Constraint",
            description: "No redundant constraints - all are tight",
            constraintsWithRedundant: [
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#8b5cf6", isRedundant: false },
                { label: "y ≤ 10", a: 0, b: 1, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "x + y ≤ 15", a: 1, b: 1, c: 15, sign: "≤", color: "#ef4444", isRedundant: false },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            constraintsWithoutRedundant: [
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#8b5cf6", isRedundant: false },
                { label: "y ≤ 10", a: 0, b: 1, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "x + y ≤ 15", a: 1, b: 1, c: 15, sign: "≤", color: "#ef4444", isRedundant: false },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 3x + 4y",
            redundantConstraint: "None",
            effect: "All constraints are tight. Removing any constraint would change the feasible region.",
            keyInsight: "When there are no redundant constraints, every constraint affects the feasible region.",
            visualClue: "All lines form part of the boundary of the feasible region."
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

    // Use constraints with redundant for display
    const displayConstraints = currentExample.constraintsWithRedundant;

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                        Topic 61 — Effect of Redundancy
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Effect of Redundant Constraints <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            on the Feasible Region
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Understand how redundant constraints affect (or don't affect) the feasible region — and
                        why they can be safely removed.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is the Effect of Redundant Constraints? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        What is the Effect of Redundant Constraints?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            A <strong className="text-teal-600 dark:text-teal-400">redundant constraint</strong>{" "}
                            has <strong>no effect</strong> on the feasible region. Removing it leaves the region
                            completely unchanged.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">Key Effect</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The feasible region is <strong>identical</strong> with or without the
                                    redundant constraint.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">Why It Matters</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Redundant constraints can be safely removed to simplify the problem without
                                    changing the solution.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> A redundant constraint
                                is like a rule that's already covered by other rules — it doesn't change anything,
                                so you can ignore it.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Interactive Effect Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Effect Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see how redundant constraints affect (or don't affect) the
                            feasible region. The graph shows the region with the redundant constraint included.
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
                                            ? "bg-teal-600 dark:bg-teal-500 text-white border-teal-600 dark:border-teal-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowRedundantHighlight(!showRedundantHighlight)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showRedundantHighlight
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showRedundantHighlight ? "Hide Highlight" : "Show Highlight"}
                            </button>
                            <button
                                onClick={() => setShowComparison(!showComparison)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showComparison
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showComparison ? "Hide Comparison" : "Show Comparison"}
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
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Effect of redundant constraints">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t61" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t61)" />

                                    {/* Shading for all constraints */}
                                    {displayConstraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            const opacity = con.isRedundant ? 0.08 : 0.15;
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

                                    {/* Redundant highlight */}
                                    {showRedundantHighlight && currentExample.redundantConstraint !== "None" && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#ef4444" className="font-bold">
                                                🗑️ REDUNDANT CONSTRAINT
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                {currentExample.redundantConstraint}
                                            </text>
                                            <text x="30" y="126" fontSize="10" fill="#ef4444">
                                                {currentExample.effect}
                                            </text>
                                        </g>
                                    )}

                                    {currentExample.redundantConstraint === "None" && showRedundantHighlight && (
                                        <g>
                                            <rect x="20" y="70" width="280" height="55" rx="6" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#10b981" className="font-bold">
                                                ✓ NO REDUNDANT CONSTRAINTS
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#10b981">
                                                {currentExample.effect}
                                            </text>
                                        </g>
                                    )}

                                    {/* Comparison text */}
                                    {showComparison && (
                                        <g>
                                            <rect x="20" y="160" width="240" height="40" rx="6" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
                                            <text x="30" y="184" fontSize="11" fill="#3b82f6">
                                                {currentExample.visualClue}
                                            </text>
                                        </g>
                                    )}

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
                                                <g key={`t61-tick-${v}`}>
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
                                                <g key={`t61-ytick-${v}`}>
                                                    <line x1="73" y1={v} x2="87" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <text x="50" y={v + 4} fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                </g>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Draw all constraint lines */}
                                    {displayConstraints.map((con) => {
                                        const points = getLinePoints(con.a, con.b, con.c);
                                        const solid = isSolid(con.sign);
                                        if (points.length > 1) {
                                            return (
                                                <polyline
                                                    key={`line-${con.label}`}
                                                    points={points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={con.color}
                                                    strokeWidth={con.isRedundant ? 2 : 3}
                                                    strokeDasharray={con.isRedundant ? "8,6" : "none"}
                                                    opacity={con.isRedundant ? 0.5 : 0.9}
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Objective label */}
                                    <text x="20" y="50" fontSize="13" fill="#14b8a6" className="font-mono font-bold">
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
                                    <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-3">
                                        📋 Effect Analysis
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
                                            <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
                                                🎯 Effect on Feasible Region
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.effect}
                                            </p>
                                        </div>

                                        {currentExample.redundantConstraint !== "None" && (
                                            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                                                <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                                    🗑️ Redundant Constraint
                                                </p>
                                                <p className="text-sm font-mono text-rose-800 dark:text-rose-300">
                                                    {currentExample.redundantConstraint}
                                                </p>
                                            </div>
                                        )}

                                        {currentExample.redundantConstraint === "None" && (
                                            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                                    ✅ No Redundant Constraints
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                    All constraints are tight and affect the feasible region.
                                                </p>
                                            </div>
                                        )}

                                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                                💡 Key Insight
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.keyInsight}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                👁️ Visual Comparison
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.visualClue}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                📝 Constraints
                                            </p>
                                            <div className="mt-2 space-y-1 text-sm">
                                                {displayConstraints.map((con, idx) => (
                                                    <div key={idx} className={clsx(
                                                        "font-mono",
                                                        con.isRedundant ? "text-rose-600 dark:text-rose-400 line-through" : "text-emerald-600 dark:text-emerald-400"
                                                    )}>
                                                        {con.label} {con.isRedundant ? "← REDUNDANT" : "✓ Tight"}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full mr-2">
                                {currentExample.redundantConstraint !== "None" ? "Has redundant constraint" : "No redundant constraints"}
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {displayConstraints.length} constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full ml-2">
                                {currentExample.objective}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
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
                                <li>Redundant constraints have NO effect on the feasible region.</li>
                                <li>They can be safely removed without changing the solution.</li>
                                <li>The feasible region looks identical with or without them.</li>
                                <li>Removing them simplifies the problem.</li>
                                <li>Always verify that the constraint is truly redundant.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming a constraint is redundant without verifying.</li>
                                <li>Removing a constraint that actually affects the region.</li>
                                <li>Not checking if the region changes after removal.</li>
                                <li>Missing partially redundant constraints.</li>
                                <li>Not documenting which constraints were removed.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Verify that removing the constraint doesn't change the region.</li>
                                <li>Document which constraints were removed and why.</li>
                                <li>Use graphical methods to identify redundancy.</li>
                                <li>Test the region with and without the constraint.</li>
                                <li>Remove redundant constraints to simplify the problem.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Mini Checklist ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Mini Checklist
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that redundant constraints have no effect on the feasible region.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify when a constraint is redundant.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that redundant constraints can be safely removed.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify that removing a constraint doesn't change the region.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand the difference between redundant and tight constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can simplify LP problems by removing redundant constraints.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Effect of Redundant Constraints – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Effect of Redundant Constraints – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic61_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "The key insight about redundant constraints is that they have absolutely no effect. I tell my students: 'If you remove a redundant constraint, the feasible region doesn't even blink — it stays exactly the same.' This is why we can safely remove them. A great exercise: have students graph a problem with and without a redundant constraint to see that the region is identical."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 61 — Effect of Redundant Constraints on the Feasible Region &bull; Understanding their impact
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Binding and Non-Binding Constraints (Topic 62)
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

export default Topic61;