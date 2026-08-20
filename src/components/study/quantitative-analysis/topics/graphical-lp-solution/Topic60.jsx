import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic60_files/topic60_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic60_files/topic60_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic60 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showRedundantHighlight, setShowRedundantHighlight] = useState(true);
    const [showSteps, setShowSteps] = useState(true);
    const [showTightConstraints, setShowTightConstraints] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples for identifying redundant constraints graphically
    const examples = [
        {
            id: 0,
            name: "Obvious Redundant Constraint",
            description: "x ≤ 20 is redundant when x ≤ 10 exists",
            constraints: [
                { label: "x ≤ 20", a: 1, b: 0, c: 20, sign: "≤", color: "#8b5cf6", isRedundant: true },
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "y ≤ 15", a: 0, b: 1, c: 15, sign: "≤", color: "#ef4444", isRedundant: false },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 3x + 4y",
            redundantConstraint: "x ≤ 20",
            redundantReason: "The constraint x ≤ 20 is redundant because x ≤ 10 is tighter. The line x=20 is outside the feasible region.",
            identificationMethod: "Look for constraints whose lines do not form part of the boundary of the feasible region.",
            visualClue: "The line x=20 is completely outside the feasible region. The feasible region is bounded by x=10, not x=20.",
            keyInsight: "A redundant constraint appears as a line that does not touch the feasible region."
        },
        {
            id: 1,
            name: "Redundant with Multiple Constraints",
            description: "x + y ≤ 20 is redundant with x ≤ 10, y ≤ 10",
            constraints: [
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#8b5cf6", isRedundant: false },
                { label: "y ≤ 10", a: 0, b: 1, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "x + y ≤ 20", a: 1, b: 1, c: 20, sign: "≤", color: "#ef4444", isRedundant: true },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 5x + 6y",
            redundantConstraint: "x + y ≤ 20",
            redundantReason: "With x ≤ 10 and y ≤ 10, x+y≤20 is automatically satisfied. The line x+y=20 is outside the feasible region.",
            identificationMethod: "The line x+y=20 does not form any part of the boundary of the feasible region.",
            visualClue: "The line x+y=20 is completely outside the feasible region bounded by x=10 and y=10.",
            keyInsight: "A constraint is redundant if its line does not touch the feasible region."
        },
        {
            id: 2,
            name: "Redundant Lower Bound",
            description: "x ≥ -5 is redundant with x ≥ 0",
            constraints: [
                { label: "x ≥ -5", a: 1, b: 0, c: -5, sign: "≥", color: "#8b5cf6", isRedundant: true },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#f59e0b", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#ef4444", isRedundant: false },
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 2x + 3y",
            redundantConstraint: "x ≥ -5",
            redundantReason: "The constraint x ≥ -5 is redundant because x ≥ 0 is tighter. The line x=-5 is outside the feasible region.",
            identificationMethod: "Look for constraints whose lines are outside the feasible region.",
            visualClue: "The line x=-5 is completely outside the feasible region bounded by x=0.",
            keyInsight: "Redundant lower bounds also appear as lines outside the feasible region."
        },
        {
            id: 3,
            name: "Partially Redundant",
            description: "x + y ≤ 15 is redundant except at one point",
            constraints: [
                { label: "x + y ≤ 15", a: 1, b: 1, c: 15, sign: "≤", color: "#8b5cf6", isRedundant: false },
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#f59e0b", isRedundant: false },
                { label: "y ≤ 10", a: 0, b: 1, c: 10, sign: "≤", color: "#ef4444", isRedundant: false },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981", isRedundant: false },
            ],
            objective: "Z = 3x + 4y",
            redundantConstraint: "None (but x+y≤15 is almost redundant)",
            redundantReason: "The constraint x+y≤15 is not fully redundant because it touches the feasible region at (10,5) and (5,10). However, it is only binding at two points.",
            identificationMethod: "A constraint that barely touches the feasible region may be partially redundant.",
            visualClue: "The line x+y=15 touches the feasible region only at the corners where x=10 or y=10.",
            keyInsight: "A constraint can be partially redundant if it only touches the feasible region at a few points."
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-stone-100 dark:bg-stone-800/50 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                        Topic 60 — Graphical Redundancy
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Identifying Redundant Constraints <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-stone-700 to-neutral-600 dark:from-stone-300 dark:to-neutral-400 bg-clip-text text-transparent">
                            Graphically
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to visually identify redundant constraints on a graph — an essential skill
                        for simplifying LP problems and improving efficiency.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-stone-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-neutral-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Why Identify Redundant Constraints Graphically? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-stone-500/5 dark:hover:shadow-stone-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">👁️</span>
                        Why Identify Redundant Constraints Graphically?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Identifying redundant constraints <strong>graphically</strong> is a powerful visual
                            skill that helps you quickly see which constraints don't affect the feasible region.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                                <h3 className="font-semibold text-stone-700 dark:text-stone-300">Visual Sign</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The constraint line is <strong>outside</strong> the feasible region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                                <h3 className="font-semibold text-neutral-700 dark:text-neutral-300">Benefit</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Quickly simplify problems without complex algebra.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> If a constraint line
                                doesn't touch the feasible region, it's redundant. This is the simplest way to
                                spot redundancy.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Identify Redundant Constraints Graphically ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-neutral-500/5 dark:hover:shadow-neutral-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        How to Identify Redundant Constraints Graphically
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                                <h3 className="font-semibold text-stone-700 dark:text-stone-300">1. Plot All Constraints</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Graph every constraint on the same coordinate plane.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                                <h3 className="font-semibold text-neutral-700 dark:text-neutral-300">2. Shade the Region</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Shade the feasible region where all constraints are satisfied.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">3. Check Each Line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If a constraint line doesn't form part of the boundary, it's redundant.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Pro tip:</span> Trace the boundary of the
                                feasible region. Any constraint line that doesn't appear on the boundary is redundant.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Redundant Graphical Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-stone-500/5 dark:hover:shadow-stone-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Redundant Graphical Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see redundant constraints visually. Notice which lines do not
                            form part of the feasible region boundary.
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
                                            ? "bg-stone-700 dark:bg-stone-600 text-white border-stone-700 dark:border-stone-600 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-stone-400 dark:hover:border-stone-500"
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
                                onClick={() => setShowTightConstraints(!showTightConstraints)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showTightConstraints
                                        ? "bg-emerald-600 text-white border-emerald-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showTightConstraints ? "Hide Tight Constraints" : "Show Tight Constraints"}
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
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Graphical redundant constraints">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t60" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t60)" />

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
                                    {showRedundantHighlight && currentExample.constraints.some(c => c.isRedundant) && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#ef4444" className="font-bold">
                                                🗑️ REDUNDANT CONSTRAINT
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                {currentExample.redundantConstraint}
                                            </text>
                                            <text x="30" y="126" fontSize="10" fill="#ef4444">
                                                {currentExample.identificationMethod}
                                            </text>
                                        </g>
                                    )}

                                    {/* Partially redundant highlight */}
                                    {!currentExample.constraints.some(c => c.isRedundant) && showRedundantHighlight && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="65" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#f59e0b" className="font-bold">
                                                ⚠️ PARTIALLY REDUNDANT
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#f59e0b">
                                                {currentExample.redundantReason}
                                            </text>
                                        </g>
                                    )}

                                    {/* Tight constraint highlight */}
                                    {showTightConstraints && (
                                        <g>
                                            <rect x="20" y="160" width="200" height="40" rx="6" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1.5" />
                                            <text x="30" y="184" fontSize="11" fill="#10b981">
                                                ✓ Tight constraints form the boundary
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
                                                <g key={`t60-tick-${v}`}>
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
                                                <g key={`t60-ytick-${v}`}>
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

                                    {/* Visual clue */}
                                    <text x="20" y="50" fontSize="11" fill="#94a3b8" className="italic">
                                        {currentExample.visualClue}
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
                                    <h3 className="font-semibold text-stone-600 dark:text-stone-400 mb-3">
                                        📋 Graphical Redundancy Analysis
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                                            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                                                👁️ Visual Identification Method
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.identificationMethod}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                                📌 Visual Clue
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.visualClue}
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

                                        {currentExample.constraints.some(c => c.isRedundant) && (
                                            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                                                <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                                    🗑️ Redundant Constraint
                                                </p>
                                                <p className="text-sm font-mono text-rose-800 dark:text-rose-300">
                                                    {currentExample.redundantConstraint}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                    {currentExample.redundantReason}
                                                </p>
                                            </div>
                                        )}

                                        {!currentExample.constraints.some(c => c.isRedundant) && (
                                            <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                                                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                                                    ⚠️ No Fully Redundant Constraint
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                    {currentExample.redundantReason}
                                                </p>
                                            </div>
                                        )}

                                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                📝 All Constraints
                                            </p>
                                            <div className="mt-2 space-y-1 text-sm">
                                                {currentExample.constraints.map((con, idx) => (
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
                            <span className="inline-block px-3 py-1 bg-stone-100 dark:bg-stone-800/50 text-stone-700 dark:text-stone-300 rounded-full mr-2">
                                {currentExample.constraints.filter(c => c.isRedundant).length} redundant constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full">
                                {currentExample.constraints.filter(c => !c.isRedundant).length} tight constraints
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-stone-500/5 dark:hover:shadow-stone-400/5",
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
                                <li>Look for lines that don't touch the feasible region.</li>
                                <li>Trace the boundary to find tight constraints.</li>
                                <li>A redundant constraint's line is always outside the region.</li>
                                <li>Use different colors to distinguish redundant vs tight.</li>
                                <li>Always verify by checking if the line forms part of the boundary.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming a constraint is redundant without checking the graph.</li>
                                <li>Not tracing the entire boundary of the feasible region.</li>
                                <li>Missing partially redundant constraints.</li>
                                <li>Removing constraints that actually form part of the boundary.</li>
                                <li>Not verifying with multiple test points.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Plot all constraints clearly.</li>
                                <li>Trace the boundary to identify tight constraints.</li>
                                <li>Check if each line forms part of the boundary.</li>
                                <li>Remove redundant constraints after verification.</li>
                                <li>Document which constraints were removed and why.</li>
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
                            <span>I can identify redundant constraints graphically.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that redundant lines don't touch the feasible region.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can trace the boundary to find tight constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between redundant and tight constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify partially redundant constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify redundancy by checking if the line forms part of the boundary.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Identifying Redundant Constraints Graphically – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Identifying Redundant Constraints Graphically – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic60_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Graphical identification of redundant constraints is one of the most intuitive skills in LP. I tell my students: 'If the line doesn't touch the shaded region, it's redundant.' The key is tracing the boundary carefully. A great exercise: give students a graph with several constraints and ask them to identify which lines are redundant and explain why."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 60 — Identifying Redundant Constraints Graphically &bull; Visual simplification
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Effect of Redundant Constraints on the Feasible Region (Topic 61)
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

export default Topic60;