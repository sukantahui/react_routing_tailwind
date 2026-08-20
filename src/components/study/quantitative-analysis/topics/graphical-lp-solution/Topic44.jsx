import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic44_files/topic44_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic44_files/topic44_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic44 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showOptimalHighlight, setShowOptimalHighlight] = useState(true);
    const [showCornerPoints, setShowCornerPoints] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples for selecting the optimal corner point
    const examples = [
        {
            id: 0,
            name: "Profit Maximization",
            description: "Select the corner with maximum Z = 3x + 4y",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 3x + 4y",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", Z: 0, isOptimal: false },
                { x: 5, y: 0, label: "A (5,0)", Z: 15, isOptimal: false },
                { x: 4, y: 3, label: "B (4,3)", Z: 24, isOptimal: true },
                { x: 2, y: 4, label: "C (2,4)", Z: 22, isOptimal: false },
                { x: 0, y: 5, label: "D (0,5)", Z: 20, isOptimal: false },
            ],
            optimal: { x: 4, y: 3, Z: 24 },
            selectionReason: "B (4,3) gives Z = 24, which is higher than all other corners",
            selectionProcess: [
                "1. List all corner points and their Z values:",
                "   O (0,0) → Z = 0",
                "   A (5,0) → Z = 15",
                "   B (4,3) → Z = 24",
                "   C (2,4) → Z = 22",
                "   D (0,5) → Z = 20",
                "2. Compare values: 24 > 22 > 20 > 15 > 0",
                "3. The highest value is 24 at B (4,3)",
                "4. Therefore, B is the optimal corner point."
            ]
        },
        {
            id: 1,
            name: "Cost Minimization",
            description: "Select the corner with minimum C = 6x + 8y",
            constraints: [
                { label: "2x + 4y ≤ 120", a: 2, b: 4, c: 120, sign: "≤", color: "#8b5cf6" },
                { label: "3x + 2y ≤ 90", a: 3, b: 2, c: 90, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 20", a: 1, b: 0, c: 20, sign: "≥", color: "#ef4444" },
                { label: "y ≥ 15", a: 0, b: 1, c: 15, sign: "≥", color: "#10b981" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = 6x + 8y",
            cornerPoints: [
                { x: 20, y: 15, label: "A (20,15)", C: 240, isOptimal: true },
                { x: 20, y: 20, label: "B (20,20)", C: 280, isOptimal: false },
                { x: 24, y: 18, label: "C (24,18)", C: 288, isOptimal: false },
                { x: 30, y: 0, label: "D (30,0)", C: 180, isOptimal: false },
                { x: 0, y: 30, label: "E (0,30)", C: 240, isOptimal: false },
            ],
            optimal: { x: 20, y: 15, C: 240 },
            selectionReason: "A (20,15) gives C = 240, which is the lowest among feasible corners",
            selectionProcess: [
                "1. List all feasible corner points and their C values:",
                "   A (20,15) → C = 240",
                "   B (20,20) → C = 280 (infeasible)",
                "   C (24,18) → C = 288 (infeasible)",
                "   D (30,0) → C = 180 (infeasible)",
                "   E (0,30) → C = 240 (infeasible)",
                "2. Only A is feasible.",
                "3. Therefore, A (20,15) is the optimal corner point."
            ]
        },
        {
            id: 2,
            name: "Multiple Optima",
            description: "Select the corner(s) with maximum Z = x + y",
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
            optimal: { x: "Multiple", y: "Multiple", Z: 10 },
            selectionReason: "Both A (10,0) and B (0,10) give Z = 10, which is the maximum",
            selectionProcess: [
                "1. List all corner points and their Z values:",
                "   O (0,0) → Z = 0",
                "   A (10,0) → Z = 10",
                "   B (0,10) → Z = 10",
                "2. Compare values: 10 = 10 > 0",
                "3. Both A and B give the highest value of 10",
                "4. Therefore, both A and B are optimal corner points.",
                "5. This is a case of multiple optimal solutions."
            ]
        },
    ];

    const currentExample = examples[selectedExample];

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        Topic 44 — Selecting Optimum
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Selecting the <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-rose-600 to-red-600 dark:from-rose-400 dark:to-red-400 bg-clip-text text-transparent">
                            Optimal Corner Point
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to select the optimal corner point after evaluating and comparing all
                        objective function values — the final step in solving LP problems graphically.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span> 10 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: How to Select the Optimal Corner ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/5 dark:hover:shadow-rose-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        How to Select the Optimal Corner Point
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            After evaluating and comparing all objective function values, the final step is to
                            <strong className="text-rose-600 dark:text-rose-400"> select</strong> the optimal
                            corner point.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">1. For Maximization</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Select the corner point with the <strong>highest</strong> Z value.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
                                <h3 className="font-semibold text-red-700 dark:text-red-300">2. For Minimization</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Select the corner point with the <strong>lowest</strong> C value.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Multiple Optima</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If there's a tie, <strong>any</strong> of the optimal corners can be selected.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> Selecting the optimal
                                corner is straightforward — it's the one with the best value. The challenge is
                                making sure you've evaluated and compared correctly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Selection Process ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5 dark:hover:shadow-red-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        The Selection Process
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="font-semibold text-rose-700 dark:text-rose-300">Step-by-Step:</h3>
                            <ol className="mt-2 text-sm space-y-2 text-slate-600 dark:text-slate-400 list-decimal list-inside">
                                <li>List all corner points with their objective values</li>
                                <li>Compare the values</li>
                                <li>For maximization: find the highest value</li>
                                <li>For minimization: find the lowest value</li>
                                <li>Select the corresponding corner point</li>
                                <li>Check for ties (multiple optimal solutions)</li>
                            </ol>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                <span className="font-semibold">✅ Example:</span> Z values: 0, 15, 24, 22, 20
                                → Select B (4,3) with Z = 24 for maximization.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Selection Explorer ===== */}
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
                        <span className="text-3xl">🖱️</span>
                        Interactive Selection Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see the optimal corner point highlighted. The selection process
                            is explained step by step.
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
                                            ? "bg-rose-600 dark:bg-rose-500 text-white border-rose-600 dark:border-rose-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-rose-400 dark:hover:border-rose-500"
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
                                onClick={() => setShowOptimalHighlight(!showOptimalHighlight)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showOptimalHighlight
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showOptimalHighlight ? "Hide Highlight" : "Show Highlight"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Optimal selection graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t44" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t44)" />

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
                                                    fill="#f43f5e"
                                                    fillOpacity="0.1"
                                                    stroke="none"
                                                />
                                            );
                                        }
                                        return null;
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
                                            <g key={`t44-tick-${tick.val}`}>
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
                                            <g key={`t44-ytick-${tick.val}`}>
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
                                                    r={isOptimal ? 14 : 8}
                                                    fill={color}
                                                    stroke="#fff"
                                                    strokeWidth={isOptimal ? 4 : 2.5}
                                                />
                                                <text
                                                    x={px + 16}
                                                    y={py - 16}
                                                    fontSize={isOptimal ? 15 : 12}
                                                    fill={color}
                                                    className="font-mono font-bold"
                                                >
                                                    {cp.label}
                                                </text>
                                                <text
                                                    x={px + 16}
                                                    y={py + 6}
                                                    fontSize={isOptimal ? 13 : 11}
                                                    fill={color}
                                                    className="font-mono"
                                                >
                                                    {currentExample.objective.split("=")[0].trim()} = {val}
                                                    {isOptimal && showOptimalHighlight ? " ★" : ""}
                                                </text>
                                                {isOptimal && showOptimalHighlight && (
                                                    <circle
                                                        cx={px}
                                                        cy={py}
                                                        r="18"
                                                        fill="none"
                                                        stroke="#ef4444"
                                                        strokeWidth="2"
                                                        strokeDasharray="6,4"
                                                    />
                                                )}
                                            </g>
                                        );
                                    })}

                                    {/* Selection label */}
                                    {currentExample.optimal && showOptimalHighlight && (
                                        <g>
                                            <rect x="20" y="70" width="280" height="70" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
                                            <text x="30" y="90" fontSize="13" fill="#ef4444" className="font-bold">
                                                ★ Selected Optimal Corner
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                {currentExample.optimal.x === "Multiple" 
                                                    ? "Multiple optima exist" 
                                                    : `(${currentExample.optimal.x}, ${currentExample.optimal.y})`}
                                            </text>
                                            <text x="30" y="124" fontSize="11" fill="#ef4444">
                                                {currentExample.objective.split("=")[0].trim()} = {optimalZ}
                                            </text>
                                        </g>
                                    )}

                                    {/* Objective function label */}
                                    <text x="20" y="50" fontSize="13" fill="#f43f5e" className="font-mono font-bold">
                                        {currentExample.objective}
                                    </text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {currentExample.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Selection Process Panel */}
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-3">
                                    📋 Selection Process
                                </h3>
                                <div className="space-y-2">
                                    {currentExample.selectionProcess.map((step, idx) => (
                                        <div
                                            key={idx}
                                            className={clsx(
                                                "p-2 rounded-lg text-sm",
                                                idx % 2 === 0
                                                    ? "bg-slate-50 dark:bg-slate-700/50"
                                                    : "bg-white dark:bg-slate-800"
                                            )}
                                        >
                                            <code className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono text-xs">
                                                {step}
                                            </code>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                    <p className="text-sm text-rose-800 dark:text-rose-300 font-medium">
                                        ✓ Selected: {currentExample.selectionReason}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full mr-2">
                                {currentExample.cornerPoints.filter(cp => cp.isOptimal).length} optimal corner(s)
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {currentExample.cornerPoints.length} total corners
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full ml-2">
                                {currentExample.optimal.x === "Multiple" ? "Multiple optima" : "Unique optimum"}
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
                                <li>For max: select the highest value.</li>
                                <li>For min: select the lowest value.</li>
                                <li>Check for ties (multiple optima).</li>
                                <li>Verify the selected point is feasible.</li>
                                <li>Document your selection process.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Selecting the wrong direction (max vs min).</li>
                                <li>Not checking if the point is feasible.</li>
                                <li>Missing a tie (multiple optima).</li>
                                <li>Not verifying the objective value.</li>
                                <li>Forgetting to document the selection.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always verify the selected point is feasible.</li>
                                <li>Check for multiple optimal solutions.</li>
                                <li>Document the selection process.</li>
                                <li>Double-check your arithmetic.</li>
                                <li>Mark the optimal point clearly.</li>
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
                            <span>I can list all corner points with their objective values.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can compare values for maximization (highest).</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can compare values for minimization (lowest).</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can select the optimal corner point correctly.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify multiple optimal solutions.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify the selected point is feasible.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Selecting the Optimal Corner Point – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Selecting the Optimal Corner Point – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic44_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Selecting the optimal corner is the payoff of all the previous work. I tell my students: 'This is the moment — you've done all the hard work, now just pick the best one.' Emphasize that the selection is straightforward: highest for max, lowest for min. But warn them to check for ties — multiple optima are common and students should recognize them."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 44 — Selecting the Optimal Corner Point &bull; Finding the best solution
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Determining the Optimal Values of Decision Variables (Topic 45)
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

export default Topic44;