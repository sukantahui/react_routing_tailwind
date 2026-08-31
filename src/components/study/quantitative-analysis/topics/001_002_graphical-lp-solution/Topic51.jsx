import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic51_files/topic51_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic51_files/topic51_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic51 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showOptimalHighlight, setShowOptimalHighlight] = useState(true);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showInfinitePoints, setShowInfinitePoints] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples for infinite optimal solutions
    const examples = [
        {
            id: 0,
            name: "Infinite Optima on Edge",
            description: "Z = x + y with constraint x + y ≤ 10",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = x + y",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", Z: 0, isOptimal: false },
                { x: 10, y: 0, label: "A (10,0)", Z: 10, isOptimal: true },
                { x: 0, y: 10, label: "B (0,10)", Z: 10, isOptimal: true },
            ],
            optimal: { x: "Infinite", y: "Infinite", Z: 10 },
            explanation: "The objective function Z = x + y is parallel to the constraint x + y = 10. Therefore, every point on the edge between A(10,0) and B(0,10) gives the same optimal value of Z = 10. This creates infinitely many optimal solutions.",
            infiniteNature: "There are infinitely many optimal points — any point on the line segment x + y = 10 with x ≥ 0, y ≥ 0 is optimal.",
            samplePoints: [
                { x: 10, y: 0, label: "A (10,0)" },
                { x: 8, y: 2, label: "P (8,2)" },
                { x: 6, y: 4, label: "Q (6,4)" },
                { x: 5, y: 5, label: "R (5,5)" },
                { x: 4, y: 6, label: "S (4,6)" },
                { x: 2, y: 8, label: "T (2,8)" },
                { x: 0, y: 10, label: "B (0,10)" },
            ]
        },
        {
            id: 1,
            name: "Infinite Optima with 3 Constraints",
            description: "Z = 2x + y with constraint 2x + y = 10",
            constraints: [
                { label: "2x + y ≤ 10", a: 2, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "x + y ≤ 8", a: 1, b: 1, c: 8, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 2x + y",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", Z: 0, isOptimal: false },
                { x: 5, y: 0, label: "A (5,0)", Z: 10, isOptimal: true },
                { x: 2, y: 6, label: "B (2,6)", Z: 10, isOptimal: true },
                { x: 0, y: 8, label: "C (0,8)", Z: 8, isOptimal: false },
            ],
            optimal: { x: "Infinite", y: "Infinite", Z: 10 },
            explanation: "The objective function Z = 2x + y is parallel to the constraint 2x + y = 10. Every point on the edge between A(5,0) and B(2,6) gives Z = 10.",
            infiniteNature: "Infinitely many optimal points on the line segment 2x + y = 10 with x ≥ 0, y ≥ 0 and satisfying x + y ≤ 8.",
            samplePoints: [
                { x: 5, y: 0, label: "A (5,0)" },
                { x: 4, y: 2, label: "P (4,2)" },
                { x: 3, y: 4, label: "Q (3,4)" },
                { x: 2, y: 6, label: "B (2,6)" },
            ]
        },
        {
            id: 2,
            name: "Infinite Optima (Minimization)",
            description: "C = x + y with constraint x + y ≥ 5",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = x + y",
            cornerPoints: [
                { x: 0, y: 5, label: "A (0,5)", C: 5, isOptimal: true },
                { x: 5, y: 0, label: "B (5,0)", C: 5, isOptimal: true },
            ],
            optimal: { x: "Infinite", y: "Infinite", C: 5 },
            explanation: "The objective function C = x + y is parallel to the constraint x + y = 5. Every point on the edge between A(0,5) and B(5,0) gives the minimum value of C = 5.",
            infiniteNature: "Infinitely many optimal points on the line segment x + y = 5 with x ≥ 0, y ≥ 0.",
            samplePoints: [
                { x: 0, y: 5, label: "A (0,5)" },
                { x: 2.5, y: 2.5, label: "P (2.5,2.5)" },
                { x: 5, y: 0, label: "B (5,0)" },
            ]
        },
    ];

    const currentExample = examples[selectedExample];
    const isInfiniteOptima = currentExample.optimal.x === "Infinite";

    // Helper: convert coordinates to SVG pixels
    const toPixel = (x, y) => {
        const maxX = Math.max(...currentExample.cornerPoints.map(cp => cp.x)) + 2;
        const maxY = Math.max(...currentExample.cornerPoints.map(cp => cp.y)) + 2;
        const maxRange = Math.max(maxX, maxY, 12);
        const scale = 460 / maxRange;
        return {
            px: 70 + x * scale,
            py: 380 - y * scale
        };
    };

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const maxX = Math.max(...currentExample.cornerPoints.map(cp => cp.x)) + 5;
        const maxY = Math.max(...currentExample.cornerPoints.map(cp => cp.y)) + 5;
        const range = Math.max(maxX, maxY, 15);
        if (b !== 0 && a !== 0) {
            for (let x = -2; x <= range + 2; x += 0.2) {
                const y = (c - a * x) / b;
                if (y >= -2 && y <= range + 2) {
                    const p = toPixel(x, y);
                    if (p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390) {
                        points.push(p);
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -2 && xVal <= range + 2) {
                const px = toPixel(xVal, 0).px;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -2 && yVal <= range + 2) {
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
        const maxX = Math.max(...currentExample.cornerPoints.map(cp => cp.x)) + 5;
        const maxY = Math.max(...currentExample.cornerPoints.map(cp => cp.y)) + 5;
        const range = Math.max(maxX, maxY, 15);
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight >= -2 && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -2 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                } else {
                    pts.push(toPixel(0, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= -2 && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -2 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                }
            } else {
                if (b > 0) {
                    pts.push(toPixel(0, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= -2 && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -2 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                } else {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight >= -2 && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -2 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            const px = toPixel(xVal, 0).px;
            if (sign === "≥" || sign === ">") {
                pts.push(toPixel(xVal, 0));
                pts.push(toPixel(range, 0));
                pts.push(toPixel(range, range));
                pts.push(toPixel(xVal, range));
            } else {
                pts.push(toPixel(0, 0));
                pts.push(toPixel(xVal, 0));
                pts.push(toPixel(xVal, range));
                pts.push(toPixel(0, range));
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            const py = toPixel(0, yVal).py;
            if (sign === "≥" || sign === ">") {
                pts.push(toPixel(0, yVal));
                pts.push(toPixel(range, yVal));
                pts.push(toPixel(range, range));
                pts.push(toPixel(0, range));
            } else {
                pts.push(toPixel(0, 0));
                pts.push(toPixel(range, 0));
                pts.push(toPixel(range, yVal));
                pts.push(toPixel(0, yVal));
            }
        }
        return pts.filter(p => p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390);
    };

    // Get feasible region shading
    const getFeasibleRegionShading = () => {
        const pts = currentExample.cornerPoints.map(p => toPixel(p.x, p.y));
        return pts;
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

    const optimalZ = currentExample.optimal.Z !== undefined ? currentExample.optimal.Z : 
                     currentExample.optimal.C !== undefined ? currentExample.optimal.C : 0;

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        Topic 51 — Infinite Optimal Solutions
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Infinite Optimal Solutions
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Understand the concept of infinite optimal solutions — when an entire edge of the
                        feasible region gives the same optimal objective value.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span> Advanced
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What are Infinite Optimal Solutions? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">∞</span>
                        What are Infinite Optimal Solutions?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            <strong className="text-cyan-600 dark:text-cyan-400">Infinite optimal solutions</strong>{" "}
                            occur when the objective function is <strong>parallel</strong> to a constraint edge,
                            resulting in an <strong>uncountably infinite</strong> number of optimal points along
                            that entire edge.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">Key Characteristic</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Every point on the optimal edge gives the <strong>same</strong> objective
                                    value. There are infinitely many such points.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">Why It Happens</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The objective function is parallel to a constraint edge. Moving along the
                                    edge doesn't change the objective value.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> Infinite optimal solutions
                                mean there are <strong>infinitely many</strong> equally good choices for the
                                decision-maker. This provides maximum flexibility.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Why Infinite Optima Occur ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        Why Infinite Optimal Solutions Occur
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">1. Same Slope</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The objective function and constraint have identical slopes.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">2. Edge Overlap</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The objective line overlaps the constraint edge at the optimal value.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Continuum</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Every point on the edge gives the same optimal objective value.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                            <p className="text-sm text-purple-800 dark:text-purple-300">
                                <span className="font-semibold">💡 Think about:</span> Since the objective line
                                and constraint edge are parallel, moving along the edge keeps the objective value
                                constant. This creates a continuum of optimal solutions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Infinite Optima Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Infinite Optima Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see infinite optimal solutions. The entire edge is highlighted,
                            showing all the points that give the same optimal value.
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
                                            ? "bg-cyan-600 dark:bg-cyan-500 text-white border-cyan-600 dark:border-cyan-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowCornerPoints(!showCornerPoints)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showCornerPoints
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showCornerPoints ? "Hide Corners" : "Show Corners"}
                            </button>
                            <button
                                onClick={() => setShowInfinitePoints(!showInfinitePoints)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showInfinitePoints
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showInfinitePoints ? "Hide Sample Points" : "Show Sample Points"}
                            </button>
                            <button
                                onClick={() => setShowOptimalHighlight(!showOptimalHighlight)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showOptimalHighlight
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showOptimalHighlight ? "Hide Highlight" : "Show Highlight"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Infinite optima graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t51" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t51)" />

                                    {/* Shading for all constraints */}
                                    {currentExample.constraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            return (
                                                <polygon
                                                    key={`shade-${con.label}`}
                                                    points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill={con.color}
                                                    fillOpacity="0.08"
                                                    stroke="none"
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Feasible region */}
                                    {(() => {
                                        const pts = getFeasibleRegionShading();
                                        if (pts.length > 2) {
                                            return (
                                                <polygon
                                                    points={pts.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="#06b6d4"
                                                    fillOpacity="0.1"
                                                    stroke="none"
                                                />
                                            );
                                        }
                                        return null;
                                    })()}

                                    {/* Optimal edge (infinite points) */}
                                    {isInfiniteOptima && showOptimalHighlight && currentExample.samplePoints && currentExample.samplePoints.length > 1 && (
                                        <polyline
                                            points={currentExample.samplePoints.map(p => {
                                                const { px, py } = toPixel(p.x, p.y);
                                                return `${px},${py}`;
                                            }).join(' ')}
                                            fill="none"
                                            stroke="#ef4444"
                                            strokeWidth="4"
                                            strokeDasharray="none"
                                        />
                                    )}

                                    {/* Sample points on the optimal edge */}
                                    {isInfiniteOptima && showInfinitePoints && currentExample.samplePoints && currentExample.samplePoints.map((sp, idx) => {
                                        const { px, py } = toPixel(sp.x, sp.y);
                                        const isCorner = currentExample.cornerPoints.some(cp => cp.x === sp.x && cp.y === sp.y);
                                        return (
                                            <g key={`sp-${idx}`}>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r={isCorner ? 10 : 7}
                                                    fill={isCorner ? "#ef4444" : "#f59e0b"}
                                                    stroke="#fff"
                                                    strokeWidth="2.5"
                                                />
                                                <text
                                                    x={px + 12}
                                                    y={py - 10}
                                                    fontSize={isCorner ? 12 : 10}
                                                    fill={isCorner ? "#ef4444" : "#f59e0b"}
                                                    className="font-mono font-bold"
                                                >
                                                    {sp.label}
                                                </text>
                                                <text
                                                    x={px + 12}
                                                    y={py + 6}
                                                    fontSize="9"
                                                    fill="#94a3b8"
                                                    className="font-mono"
                                                >
                                                    {currentExample.objective.split("=")[0].trim()} = {optimalZ}
                                                </text>
                                            </g>
                                        );
                                    })}

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

                                    {/* Tick marks - dynamic based on range */}
                                    {(() => {
                                        const maxX = Math.max(...currentExample.cornerPoints.map(cp => cp.x)) + 2;
                                        const maxY = Math.max(...currentExample.cornerPoints.map(cp => cp.y)) + 2;
                                        const maxRange = Math.max(maxX, maxY, 12);
                                        const scale = 460 / maxRange;
                                        const tickStep = maxRange <= 10 ? 1 : (maxRange <= 20 ? 2 : 5);
                                        const ticks = [];
                                        for (let i = 0; i <= maxRange + 2; i += tickStep) {
                                            if (i > 0) {
                                                const px = 80 + i * scale;
                                                if (px < 560) {
                                                    ticks.push({ val: i, px });
                                                }
                                            }
                                        }
                                        return ticks.map((tick) => (
                                            <g key={`t51-tick-${tick.val}`}>
                                                <line x1={tick.px} y1="373" x2={tick.px} y2="387" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                <text x={tick.px - 6} y="400" fontSize="10" fill="#475569" className="dark:fill-slate-500">{tick.val}</text>
                                            </g>
                                        ));
                                    })()}
                                    {(() => {
                                        const maxX = Math.max(...currentExample.cornerPoints.map(cp => cp.x)) + 2;
                                        const maxY = Math.max(...currentExample.cornerPoints.map(cp => cp.y)) + 2;
                                        const maxRange = Math.max(maxX, maxY, 12);
                                        const scale = 460 / maxRange;
                                        const tickStep = maxRange <= 10 ? 1 : (maxRange <= 20 ? 2 : 5);
                                        const ticks = [];
                                        for (let i = 0; i <= maxRange + 2; i += tickStep) {
                                            if (i > 0) {
                                                const py = 380 - i * scale;
                                                if (py > 20) {
                                                    ticks.push({ val: i, py });
                                                }
                                            }
                                        }
                                        return ticks.map((tick) => (
                                            <g key={`t51-ytick-${tick.val}`}>
                                                <line x1="73" y1={tick.py} x2="87" y2={tick.py} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                <text x="50" y={tick.py + 4} fontSize="10" fill="#475569" className="dark:fill-slate-500">{tick.val}</text>
                                            </g>
                                        ));
                                    })()}

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

                                    {/* Corner points */}
                                    {showCornerPoints && currentExample.cornerPoints.map((cp, idx) => {
                                        const { px, py } = toPixel(cp.x, cp.y);
                                        const val = cp.Z !== undefined ? cp.Z : (cp.C !== undefined ? cp.C : 0);
                                        const isOptimal = cp.isOptimal;
                                        const color = isOptimal ? "#ef4444" : "#94a3b8";
                                        return (
                                            <g key={`cp-${idx}`}>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r={isOptimal ? 12 : 8}
                                                    fill={color}
                                                    stroke="#fff"
                                                    strokeWidth={isOptimal ? 3 : 2.5}
                                                />
                                                <text
                                                    x={px + 14}
                                                    y={py - 14}
                                                    fontSize={isOptimal ? 14 : 12}
                                                    fill={color}
                                                    className="font-mono font-bold"
                                                >
                                                    {cp.label}
                                                </text>
                                                <text
                                                    x={px + 14}
                                                    y={py + 6}
                                                    fontSize={isOptimal ? 12 : 10}
                                                    fill={color}
                                                    className="font-mono"
                                                >
                                                    {currentExample.objective.split("=")[0].trim()} = {val}
                                                    {isOptimal && showOptimalHighlight ? " ★" : ""}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Infinite optima label */}
                                    {isInfiniteOptima && showOptimalHighlight && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
                                            <text x="30" y="90" fontSize="13" fill="#ef4444" className="font-bold">
                                                ∞ Infinite Optimal Solutions
                                            </text>
                                            <text x="30" y="110" fontSize="11" fill="#ef4444">
                                                {currentExample.objective} = {optimalZ}
                                            </text>
                                            <text x="30" y="128" fontSize="10" fill="#ef4444">
                                                {currentExample.infiniteNature}
                                            </text>
                                        </g>
                                    )}

                                    {/* Objective function label */}
                                    <text x="20" y="50" fontSize="13" fill="#06b6d4" className="font-mono font-bold">
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
                                <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
                                    📋 Infinite Optima Analysis
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
                                        <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                                            🎯 Optimal Value
                                        </p>
                                        <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                                            {currentExample.objective} = {optimalZ}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                            ∞ Infinite Nature
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {currentExample.infiniteNature}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                            💡 Explanation
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {currentExample.explanation}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                                        <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                            📍 Sample Optimal Points
                                        </p>
                                        <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                            {currentExample.samplePoints && currentExample.samplePoints.map((sp, idx) => (
                                                <div key={idx} className="font-mono text-xs">
                                                    {sp.label} ({sp.x}, {sp.y})
                                                    {currentExample.cornerPoints.some(cp => cp.x === sp.x && cp.y === sp.y && cp.isOptimal) ? " ★" : ""}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                                            ... and infinitely many more points on the edge!
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                            💡 Business Impact
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            Infinite optimal solutions give the decision-maker <strong>maximum flexibility</strong>.
                                            Any point on the optimal edge is equally good. Choose based on other
                                            factors like brand preference, risk tolerance, or strategic goals.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full mr-2">
                                {currentExample.samplePoints ? currentExample.samplePoints.length : 0} sample points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                ∞ Infinite optima
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full ml-2">
                                {currentExample.cornerPoints.length} corner points
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
                                <li>Infinite optima occur when the objective is parallel to a constraint.</li>
                                <li>The entire edge between two corners is optimal.</li>
                                <li>There are uncountably infinite optimal points.</li>
                                <li>This gives maximum flexibility to decision-makers.</li>
                                <li>Any point on the optimal edge is equally good.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Not recognizing infinite optimal solutions.</li>
                                <li>Assuming infinite optima means the problem is unbounded.</li>
                                <li>Forgetting to mention the entire edge is optimal.</li>
                                <li>Only stating the corner points, missing the continuum.</li>
                                <li>Confusing infinite optima with unbounded solutions.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Identify if the objective is parallel to a constraint.</li>
                                <li>State that all points on the optimal edge are optimal.</li>
                                <li>Provide sample points to illustrate the continuum.</li>
                                <li>Explain the flexibility infinite optima provide.</li>
                                <li>Distinguish between infinite optima and unbounded solutions.</li>
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
                            <span>I can identify infinite optimal solutions.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand why infinite optima occur (parallel objective).</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify the optimal edge with infinite optima.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can explain that all points on the edge are optimal.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that infinite optima provide maximum flexibility.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between infinite optima and unbounded solutions.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Infinite Optimal Solutions – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Infinite Optimal Solutions – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic51_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Infinite optimal solutions are a fascinating case in LP. I tell my students: 'Infinite optima mean you have unlimited equally good choices — the ultimate flexibility!' The key is recognizing that the objective is parallel to a constraint. A great exercise: have students find all the optimal points on the edge and verify they all give the same objective value."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 51 — Infinite Optimal Solutions &bull; Maximum flexibility in decision-making
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Infeasible LP Problems (Topic 52)
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

export default Topic51;