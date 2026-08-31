import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic59_files/topic59_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic59_files/topic59_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic59 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showRedundantHighlight, setShowRedundantHighlight] = useState(true);
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

    // Examples for redundant constraints
    const examples = [
        {
            id: 0,
            name: "Obvious Redundant Constraint",
            description: "x ≤ 20 is redundant when x ≤ 10 exists",
            problemStatement: "A company wants to maximize profit Z = 3x + 4y subject to: x ≤ 20, x ≤ 10, y ≤ 15, x ≥ 0, y ≥ 0. Which constraint is redundant?",
            constraints: [
                { label: "x ≤ 20", a: 1, b: 0, c: 20, sign: "≤", color: "#8b5cf6", isRedundant: true },
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "y ≤ 15", a: 0, b: 1, c: 15, sign: "≤", color: "#ef4444", isRedundant: false },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 3x + 4y",
            redundantConstraint: "x ≤ 20",
            redundantReason: "The constraint x ≤ 20 is redundant because x ≤ 10 is tighter. Any point satisfying x ≤ 10 automatically satisfies x ≤ 20.",
            keyInsight: "A constraint is redundant if removing it does not change the feasible region.",
            steps: [
                "Step 1: Identify all constraints:",
                "  x ≤ 20, x ≤ 10, y ≤ 15, x ≥ 0, y ≥ 0",
                "Step 2: Compare the upper bounds on x:",
                "  x ≤ 20 and x ≤ 10",
                "Step 3: Since x ≤ 10 is tighter than x ≤ 20,",
                "  any point satisfying x ≤ 10 will automatically satisfy x ≤ 20.",
                "Step 4: The constraint x ≤ 20 is redundant.",
                "Step 5: Removing x ≤ 20 does not change the feasible region.",
                "Conclusion: x ≤ 20 is a redundant constraint."
            ]
        },
        {
            id: 1,
            name: "Redundant with Multiple Constraints",
            description: "x + y ≤ 20 is redundant with x ≤ 10, y ≤ 10",
            problemStatement: "A company wants to maximize profit Z = 5x + 6y subject to: x ≤ 10, y ≤ 10, x + y ≤ 20, x ≥ 0, y ≥ 0. Which constraint is redundant?",
            constraints: [
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#8b5cf6", isRedundant: false },
                { label: "y ≤ 10", a: 0, b: 1, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "x + y ≤ 20", a: 1, b: 1, c: 20, sign: "≤", color: "#ef4444", isRedundant: true },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 5x + 6y",
            redundantConstraint: "x + y ≤ 20",
            redundantReason: "With x ≤ 10 and y ≤ 10, the maximum of x+y is 10+10=20. So x+y≤20 is automatically satisfied.",
            keyInsight: "A constraint is redundant if it is implied by other constraints.",
            steps: [
                "Step 1: Identify all constraints:",
                "  x ≤ 10, y ≤ 10, x + y ≤ 20, x ≥ 0, y ≥ 0",
                "Step 2: Check if x + y ≤ 20 is implied:",
                "  From x ≤ 10 and y ≤ 10,",
                "  x + y ≤ 10 + 10 = 20",
                "Step 3: Since x+y≤20 is always true given x≤10 and y≤10,",
                "  the constraint x+y≤20 is redundant.",
                "Step 4: Removing x+y≤20 does not change the feasible region.",
                "Conclusion: x + y ≤ 20 is a redundant constraint."
            ]
        },
        {
            id: 2,
            name: "Redundant Lower Bound",
            description: "x ≥ -5 is redundant with x ≥ 0",
            problemStatement: "A company wants to maximize profit Z = 2x + 3y subject to: x ≥ -5, x ≥ 0, y ≥ 0, x + y ≤ 10. Which constraint is redundant?",
            constraints: [
                { label: "x ≥ -5", a: 1, b: 0, c: -5, sign: "≥", color: "#8b5cf6", isRedundant: true },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#f59e0b", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#ef4444", isRedundant: false },
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 2x + 3y",
            redundantConstraint: "x ≥ -5",
            redundantReason: "The constraint x ≥ -5 is redundant because x ≥ 0 is tighter. Any point satisfying x ≥ 0 automatically satisfies x ≥ -5.",
            keyInsight: "Redundant constraints can be lower bounds too.",
            steps: [
                "Step 1: Identify all constraints:",
                "  x ≥ -5, x ≥ 0, y ≥ 0, x + y ≤ 10",
                "Step 2: Compare the lower bounds on x:",
                "  x ≥ -5 and x ≥ 0",
                "Step 3: Since x ≥ 0 is tighter than x ≥ -5,",
                "  any point satisfying x ≥ 0 will automatically satisfy x ≥ -5.",
                "Step 4: The constraint x ≥ -5 is redundant.",
                "Step 5: Removing x ≥ -5 does not change the feasible region.",
                "Conclusion: x ≥ -5 is a redundant constraint."
            ]
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
        const minRange = -6;
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
        const minRange = -6;
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        Topic 59 — Redundant Constraints
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-gray-700 to-slate-600 dark:from-gray-300 dark:to-slate-400 bg-clip-text text-transparent">
                            Redundant Constraints
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to identify constraints that don't affect the feasible region — simplifying
                        LP problems and improving efficiency.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-gray-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is a Redundant Constraint? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🗑️</span>
                        What is a Redundant Constraint?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            A <strong className="text-gray-700 dark:text-gray-300">redundant constraint</strong>{" "}
                            is a constraint that <strong>does not affect</strong> the feasible region. Removing
                            it leaves the feasible region unchanged.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    A constraint that doesn't change the feasible region when removed.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300">Cause</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The constraint is implied by other constraints (it's looser than another
                                    binding constraint).
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> Redundant constraints
                                can be removed to simplify the problem. They don't affect the optimal solution,
                                so they waste computational resources.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Identify Redundant Constraints ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        How to Identify Redundant Constraints
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">1. Compare Bounds</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If one constraint is tighter than another in the same direction, the looser
                                    one is redundant.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300">2. Check Implications</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If a constraint is implied by other constraints, it's redundant.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Graph Test</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If removing the constraint doesn't change the shaded region, it's redundant.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Pro tip:</span> A constraint is redundant if
                                it is <strong>weaker</strong> than another constraint in the same direction. For
                                example, x≤20 is weaker than x≤10.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Redundant Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Redundant Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see which constraints are redundant. The redundant constraint
                            is highlighted and does not affect the feasible region.
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
                                            ? "bg-gray-700 dark:bg-gray-600 text-white border-gray-700 dark:border-gray-600 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-gray-500"
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
                                onClick={() => setShowSteps(!showSteps)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showSteps
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showSteps ? "Hide Steps" : "Show Steps"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Redundant constraints graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t59" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t59)" />

                                    {/* Shading for all constraints */}
                                    {currentExample.constraints.map((con) => {
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
                                    {showRedundantHighlight && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#ef4444" className="font-bold">
                                                🗑️ REDUNDANT CONSTRAINT
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                {currentExample.redundantConstraint}
                                            </text>
                                            <text x="30" y="126" fontSize="10" fill="#ef4444">
                                                {currentExample.redundantReason}
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
                                        if (val >= -6 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t59-tick-${v}`}>
                                                    <line x1={v} y1="373" x2={v} y2="387" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <text x={v - 6} y="400" fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                </g>
                                            );
                                        }
                                        return null;
                                    })}
                                    {[100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360].map((v) => {
                                        const val = Math.round((380 - v) / 40);
                                        if (val >= -6 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t59-ytick-${v}`}>
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
                                                    strokeWidth={con.isRedundant ? 2 : 3}
                                                    strokeDasharray={con.isRedundant ? "8,6" : "none"}
                                                    opacity={con.isRedundant ? 0.5 : 0.9}
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Objective label */}
                                    <text x="20" y="50" fontSize="13" fill="#94a3b8" className="font-mono font-bold">
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
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        📋 Redundancy Analysis
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                🗑️ Redundant Constraint
                                            </p>
                                            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                                {currentExample.redundantConstraint}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                                📌 Why It's Redundant
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.redundantReason}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                                💡 Key Insight
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.keyInsight}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                📝 All Constraints
                                            </p>
                                            <div className="mt-2 space-y-1 text-sm">
                                                {currentExample.constraints.map((con, idx) => (
                                                    <div key={idx} className={clsx(
                                                        "font-mono",
                                                        con.isRedundant ? "text-rose-600 dark:text-rose-400 line-through" : "text-slate-600 dark:text-slate-400"
                                                    )}>
                                                        {con.label} {con.isRedundant ? "← REDUNDANT" : ""}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                📋 Solution Steps
                                            </p>
                                            <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                                {currentExample.steps.map((step, idx) => (
                                                    <div key={idx} className="text-xs">
                                                        {step}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full mr-2">
                                {currentExample.constraints.filter(c => c.isRedundant).length} redundant constraint(s)
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {currentExample.constraints.length} total constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full ml-2">
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
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
                                <li>Redundant constraints don't affect the feasible region.</li>
                                <li>They can be removed to simplify the problem.</li>
                                <li>A constraint is redundant if it's implied by others.</li>
                                <li>Compare upper bounds: looser is redundant.</li>
                                <li>Compare lower bounds: looser is redundant.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming a constraint is redundant without checking.</li>
                                <li>Not recognizing that redundant constraints can be lower bounds too.</li>
                                <li>Forgetting to check if the constraint is implied by others.</li>
                                <li>Removing constraints that actually affect the feasible region.</li>
                                <li>Not documenting which constraints are redundant.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Check if the constraint is implied by other constraints.</li>
                                <li>Compare bounds to identify redundancy.</li>
                                <li>Remove redundant constraints to simplify the problem.</li>
                                <li>Document which constraints were removed and why.</li>
                                <li>Verify the feasible region remains unchanged.</li>
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
                            <span>I can identify redundant constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand why a constraint is redundant.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can compare bounds to identify redundancy.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that redundant constraints can be removed.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify that removing a redundant constraint doesn't change the feasible region.</span>
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
                        title="Redundant Constraints – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Redundant Constraints – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic59_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Redundant constraints are often overlooked but important. I tell my students: 'A redundant constraint is like a rule that's already covered by another rule — it doesn't change anything, so you can ignore it.' The key is recognizing when a constraint is implied by others. A great exercise: give students a set of constraints and ask them to identify which ones are redundant."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 59 — Redundant Constraints &bull; Simplifying LP problems
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Identifying Redundant Constraints Graphically (Topic 60)
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

export default Topic59;