import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic55_files/topic55_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic55_files/topic55_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic55 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showUnboundedHighlight, setShowUnboundedHighlight] = useState(true);
    const [showObjectiveDirection, setShowObjectiveDirection] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples for unbounded LP problems
    const examples = [
        {
            id: 0,
            name: "Unbounded Maximization",
            description: "Z = x + y with x ≥ 0, y ≥ 0 (no upper bounds)",
            problemStatement: "A company wants to maximize profit Z = x + y subject to x ≥ 0, y ≥ 0. Is this problem bounded?",
            constraints: [
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = x + y",
            isUnbounded: true,
            unboundedReason: "With only non-negativity constraints, x and y can grow infinitely. The objective Z = x + y can go to infinity.",
            direction: "Increasing both x and y (northeast direction)",
            visualClue: "The feasible region extends infinitely in the first quadrant. The objective line moves outward without bound.",
            keyInsight: "In maximization, if the feasible region is unbounded in the direction of improvement, the objective is unbounded."
        },
        {
            id: 1,
            name: "Unbounded with One Constraint",
            description: "Z = x + y with x ≥ 0, y ≥ 0, x + y ≥ 5",
            problemStatement: "A company wants to maximize profit Z = x + y subject to x ≥ 0, y ≥ 0, x + y ≥ 5. Is this problem bounded?",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = x + y",
            isUnbounded: true,
            unboundedReason: "The constraint x+y≥5 only provides a lower bound. x and y can still grow infinitely, making Z unbounded.",
            direction: "Increasing both x and y (northeast direction)",
            visualClue: "The feasible region extends infinitely in the first quadrant above x+y=5. The objective continues to increase.",
            keyInsight: "Lower bound constraints (≥) create unbounded regions in maximization problems."
        },
        {
            id: 2,
            name: "Unbounded Minimization?",
            description: "C = x + y with x ≥ 0, y ≥ 0, x + y ≥ 5",
            problemStatement: "A company wants to minimize cost C = x + y subject to x ≥ 0, y ≥ 0, x + y ≥ 5. Is this problem bounded?",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = x + y",
            isUnbounded: false,
            unboundedReason: "Even though the region is unbounded, the objective C = x + y has a minimum at the boundary x+y=5. Minimization works.",
            direction: "Moving toward the origin (southwest direction) until hitting the constraint",
            visualClue: "The objective decreases until it hits the boundary x+y=5. Minimum is at (5,0) or (0,5) with C=5.",
            keyInsight: "Unbounded regions can still have optimal solutions for minimization problems if the objective decreases toward the region."
        },
        {
            id: 3,
            name: "Unbounded with Multiple Constraints",
            description: "Z = 2x + y with x ≥ 0, y ≥ 0, x + y ≥ 5",
            problemStatement: "A company wants to maximize profit Z = 2x + y subject to x ≥ 0, y ≥ 0, x + y ≥ 5. Is this problem bounded?",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 2x + y",
            isUnbounded: true,
            unboundedReason: "With only non-negativity and a lower bound constraint, x and y can grow infinitely. Z can go to infinity.",
            direction: "Increasing x (moving right) gives the fastest growth since x has coefficient 2.",
            visualClue: "The feasible region extends infinitely in the first quadrant. Increasing x increases Z faster.",
            keyInsight: "Different objective coefficients affect the direction of unboundedness."
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

    // Get objective line at a specific Z value
    const getObjectiveLineAtZ = (Z) => {
        const { objective } = currentExample;
        const parts = objective.replace("Z = ", "").replace("C = ", "").split(" + ");
        let a = 0, b = 0;
        parts.forEach(part => {
            if (part.includes("x")) {
                a = parseFloat(part.replace("x", "")) || 1;
            }
            if (part.includes("y")) {
                b = parseFloat(part.replace("y", "")) || 1;
            }
        });
        const points = [];
        const range = 12;
        if (b !== 0) {
            for (let x = -1; x <= range + 1; x += 0.1) {
                const y = (Z - a * x) / b;
                if (y >= -1 && y <= range + 1) {
                    const p = toPixel(x, y);
                    if (p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390) {
                        points.push(p);
                    }
                }
            }
        }
        return points;
    };

    // Generate multiple objective lines to show unboundedness
    const generateMultipleLines = () => {
        const lines = [];
        const objective = currentExample.objective;
        const isMin = objective.includes("C");
        let values;
        if (isMin) {
            values = [2, 3, 4, 5, 6, 7];
        } else {
            values = [2, 4, 6, 8, 10, 12];
        }
        values.forEach(value => {
            lines.push({
                value,
                points: getObjectiveLineAtZ(value),
            });
        });
        return lines;
    };

    const multipleLines = generateMultipleLines();

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
                        Topic 55 — Unbounded LP Problems
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">
                            Unbounded LP Problems
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn to recognize when an LP problem has no finite optimal solution because the
                        objective can increase (or decrease) without bound.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is an Unbounded LP Problem? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5 dark:hover:shadow-yellow-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">∞</span>
                        What is an Unbounded LP Problem?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            An LP problem is <strong className="text-yellow-600 dark:text-yellow-400">unbounded</strong>{" "}
                            when the objective function can increase (for maximization) or decrease (for minimization)
                            without bound — meaning there is <strong>no finite optimal solution</strong>.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50">
                                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The objective can go to infinity (or negative infinity). No finite optimum exists.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Cause</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The feasible region is unbounded in the direction that improves the objective.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> An unbounded problem means
                                you can keep improving the objective forever — there is no "best" solution. This
                                usually indicates a missing constraint or unrealistic assumptions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Recognize Unbounded Problems ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        How to Recognize Unbounded Problems
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50">
                                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">1. Unbounded Region</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The feasible region extends to infinity in some direction.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">2. Direction of Improvement</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Moving in that direction improves the objective indefinitely.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. No Upper Bounds</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    There are no constraints that limit the variables in that direction.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Pro tip:</span> If you can move the objective
                                line indefinitely in the direction of improvement without leaving the feasible
                                region, the problem is unbounded.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Unbounded Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 dark:hover:shadow-orange-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Unbounded Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see unbounded behavior. Notice how the objective line keeps
                            moving outward without bound.
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
                                            ? "bg-yellow-600 dark:bg-yellow-500 text-white border-yellow-600 dark:border-yellow-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-yellow-400 dark:hover:border-yellow-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowUnboundedHighlight(!showUnboundedHighlight)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showUnboundedHighlight
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showUnboundedHighlight ? "Hide Highlight" : "Show Highlight"}
                            </button>
                            <button
                                onClick={() => setShowObjectiveDirection(!showObjectiveDirection)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showObjectiveDirection
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showObjectiveDirection ? "Hide Direction" : "Show Direction"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Unbounded problem graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t55" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t55)" />

                                    {/* Shading for all constraints */}
                                    {currentExample.constraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            return (
                                                <polygon
                                                    key={`shade-${con.label}`}
                                                    points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill={con.color}
                                                    fillOpacity="0.15"
                                                    stroke="none"
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Multiple objective lines showing unboundedness */}
                                    {multipleLines.map((line, idx) => {
                                        const colors = ["#94a3b8", "#a8b5c8", "#bcc8d8", "#d0dae8", "#e4ecf8", "#f0f5ff"];
                                        const color = colors[idx % colors.length];
                                        if (line.points.length > 1) {
                                            return (
                                                <polyline
                                                    key={idx}
                                                    points={line.points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={color}
                                                    strokeWidth="1.5"
                                                    strokeDasharray="4,4"
                                                    opacity="0.6"
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Unbounded highlight */}
                                    {showUnboundedHighlight && currentExample.isUnbounded && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#ef4444" className="font-bold">
                                                ∞ UNBOUNDED PROBLEM
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                {currentExample.objective} can go to infinity
                                            </text>
                                            <text x="30" y="126" fontSize="10" fill="#ef4444">
                                                Direction: {currentExample.direction}
                                            </text>
                                        </g>
                                    )}

                                    {/* Bounded highlight for minimization */}
                                    {showUnboundedHighlight && !currentExample.isUnbounded && (
                                        <g>
                                            <rect x="20" y="70" width="280" height="65" rx="6" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#10b981" className="font-bold">
                                                ✓ Bounded Minimization
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#10b981">
                                                Optimal exists at the boundary
                                            </text>
                                        </g>
                                    )}

                                    {/* Direction arrows */}
                                    {showObjectiveDirection && currentExample.isUnbounded && (
                                        <g>
                                            <polyline
                                                points="480,320 500,300 500,320"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="2"
                                            />
                                            <polygon points="500,295 505,305 495,305" fill="#ef4444" />
                                            <text x="505" y="290" fontSize="10" fill="#ef4444" className="font-bold">
                                                ∞
                                            </text>
                                            <text x="490" y="335" fontSize="9" fill="#ef4444">
                                                Objective increases
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
                                                <g key={`t55-tick-${v}`}>
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
                                                <g key={`t55-ytick-${v}`}>
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
                                                    strokeWidth="3"
                                                    strokeDasharray={solid ? "none" : "8,6"}
                                                    opacity="0.9"
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Objective label */}
                                    <text x="20" y="50" fontSize="13" fill="#f59e0b" className="font-mono font-bold">
                                        {currentExample.objective}
                                    </text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {currentExample.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Explanation Panel */}
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
                                    📋 Unbounded Analysis
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className={clsx(
                                        "p-3 rounded-lg border",
                                        currentExample.isUnbounded 
                                            ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                                            : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                                    )}>
                                        <p className="text-sm font-medium">
                                            {currentExample.isUnbounded ? "∞ Unbounded" : "✓ Bounded"}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {currentExample.isUnbounded 
                                                ? currentExample.unboundedReason 
                                                : currentExample.unboundedReason}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                            📌 Key Insight
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {currentExample.keyInsight}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                            👁️ Visual Clue
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {currentExample.visualClue}
                                        </p>
                                    </div>

                                    {currentExample.isUnbounded && (
                                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                                            <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                                📍 Direction of Unboundedness
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {currentExample.direction}
                                            </p>
                                        </div>
                                    )}

                                    {!currentExample.isUnbounded && (
                                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                                ✅ Optimal Exists
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                Even though the region is unbounded, the minimization objective
                                                has a finite optimal value at the boundary.
                                            </p>
                                        </div>
                                    )}

                                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                            📝 Constraints
                                        </p>
                                        <div className="mt-2 space-y-1 text-sm">
                                            {currentExample.constraints.map((con, idx) => (
                                                <div key={idx} className="font-mono text-slate-600 dark:text-slate-400">
                                                    {con.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className={clsx(
                                "inline-block px-3 py-1 rounded-full mr-2",
                                currentExample.isUnbounded 
                                    ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                                    : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                            )}>
                                {currentExample.isUnbounded ? "∞ Unbounded" : "✓ Bounded"}
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {currentExample.constraints.length} constraints
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
                                <li>Check if the feasible region extends to infinity.</li>
                                <li>See if the objective improves in that direction.</li>
                                <li>For maximization, look for missing upper bounds.</li>
                                <li>For minimization, unbounded regions can still have optima.</li>
                                <li>Add constraints if a finite solution is needed.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming all unbounded regions are problems (minimization works).</li>
                                <li>Not checking if the objective is bounded in the unbounded direction.</li>
                                <li>Confusing unbounded with infeasible.</li>
                                <li>Not adding upper bounds when needed.</li>
                                <li>Forgetting that maximization and minimization behave differently.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Check if the feasible region is bounded.</li>
                                <li>Determine if the objective is bounded in the unbounded direction.</li>
                                <li>For maximization, ensure there are upper bounds on variables.</li>
                                <li>For minimization, unbounded regions may still have optimal solutions.</li>
                                <li>Add constraints to make the problem bounded if needed.</li>
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
                            <span>I can identify an unbounded LP problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand why unboundedness occurs.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between unbounded maximization and minimization.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that unbounded regions can still have optimal solutions for minimization.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can suggest ways to make an unbounded problem bounded.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between unbounded and infeasible problems.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Unbounded LP Problems – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Unbounded LP Problems – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic55_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Unbounded problems are a common source of confusion. I tell my students: 'Unbounded doesn't always mean bad — for minimization, it can work perfectly. The key is the direction of the objective.' I recommend having students practice identifying whether a problem is unbounded and, if so, whether the objective is bounded in that direction."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 55 — Unbounded LP Problems &bull; When the objective has no finite limit
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Identifying an Unbounded Feasible Region (Topic 56)
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

export default Topic55;