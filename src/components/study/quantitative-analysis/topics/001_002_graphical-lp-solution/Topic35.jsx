import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic35_files/topic35_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic35_files/topic35_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic35 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [showAllLines, setShowAllLines] = useState(false);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showSteps, setShowSteps] = useState(true);
    const [objectiveValue, setObjectiveValue] = useState(20);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Worked Example 8: Advertising Budget Allocation Problem
    const problem = {
        title: "Advertising Budget Allocation",
        description: "A company allocates advertising budget between two media channels.",
        problemStatement: "A company advertises on TV and Radio. Each TV ad reaches 10,000 people and costs ₹2000. Each Radio ad reaches 5,000 people and costs ₹1000. The company has a budget of ₹40,000 and wants to reach at least 150,000 people. Additionally, they must run at least 5 TV ads due to a contract. How many TV and Radio ads should be run to maximize reach?",
        constraints: [
            { label: "2000x + 1000y ≤ 40000", a: 2000, b: 1000, c: 40000, sign: "≤", color: "#8b5cf6" },
            { label: "10000x + 5000y ≥ 150000", a: 10000, b: 5000, c: 150000, sign: "≥", color: "#f59e0b" },
            { label: "x ≥ 5", a: 1, b: 0, c: 5, sign: "≥", color: "#ef4444" },
            { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
            { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
        ],
        objective: "Z = 10000x + 5000y",
        cornerPoints: [
            { x: 5, y: 20, label: "A (5,20)", Z: 150000 },
            { x: 5, y: 30, label: "B (5,30)", Z: 200000 },
            { x: 15, y: 10, label: "C (15,10)", Z: 200000 },
            { x: 20, y: 0, label: "D (20,0)", Z: 200000 },
        ],
        optimal: { x: "Multiple", y: "Multiple", Z: 200000 },
        steps: [
            "Step 1: Define variables:",
            "  x = number of TV ads",
            "  y = number of Radio ads",
            "Step 2: Formulate the problem:",
            "  Maximize Z = 10000x + 5000y",
            "  Subject to:",
            "    2000x + 1000y ≤ 40000  (budget constraint)",
            "    10000x + 5000y ≥ 150000 (reach constraint)",
            "    x ≥ 5                   (minimum TV ads)",
            "    x ≥ 0, y ≥ 0            (non-negativity)",
            "Step 3: Simplify constraints:",
            "    2x + y ≤ 40   (budget, divide by 1000)",
            "    2x + y ≥ 30   (reach, divide by 5000)",
            "    x ≥ 5",
            "Step 4: Graph the constraints and find the feasible region.",
            "Step 5: Identify corner points: A(5,20), B(5,30), C(15,10), D(20,0).",
            "Step 6: Evaluate Z at each corner:",
            "  A (5,20): Z = 10000(5) + 5000(20) = 50000 + 100000 = 150000",
            "  B (5,30): Z = 10000(5) + 5000(30) = 50000 + 150000 = 200000",
            "  C (15,10): Z = 10000(15) + 5000(10) = 150000 + 50000 = 200000",
            "  D (20,0): Z = 10000(20) + 5000(0) = 200000",
            "Step 7: Multiple optimal solutions!",
            "  B(5,30), C(15,10), and D(20,0) all give Z = 200000.",
            "Conclusion: The company has multiple optimal advertising strategies."
        ],
        interpretation: "The company has multiple optimal solutions. They can run 5 TV and 30 Radio ads, 15 TV and 10 Radio ads, or 20 TV and 0 Radio ads — all give a reach of 200,000 people. The budget is fully used in all cases (2x+y=40). The reach requirement (2x+y≥30) is also met. This demonstrates the case of multiple optimal solutions in LP."
    };

    // Helper: convert coordinates to SVG pixels (scale: 1 unit = 40px)
    const toPixel = (x, y) => ({
        px: 200 + x * 40,
        py: 200 - y * 40,
    });

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const range = 45;
        const minRange = -5;
        // Simplified constraints for display
        const constraints = [
            { a: 2, b: 1, c: 40 }, // budget: 2x + y = 40
            { a: 2, b: 1, c: 30 }, // reach: 2x + y = 30
            { a: 1, b: 0, c: 5 },  // minimum TV: x = 5
            { a: 0, b: 1, c: 0 },  // y = 0
            { a: 1, b: 0, c: 0 },  // x = 0
        ];
        if (b !== 0 && a !== 0) {
            for (let x = -0.5; x <= range; x += 0.1) {
                const y = (c - a * x) / b;
                if (y >= -0.5 && y <= range) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -0.5 && xVal <= range) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -0.5 && yVal <= range) {
                const py = 200 - yVal * 40;
                points.push({ px: 20, py });
                points.push({ px: 380, py });
            }
        }
        return points;
    };

    // Determine if a constraint is solid
    const isSolid = (sign) => sign === "≥" || sign === "≤";

    // Get shading polygon for a specific constraint
    const getConstraintShading = (a, b, c, sign) => {
        const pts = [];
        const range = 45;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(range);
                    if (yRight >= -0.5 && yRight <= range) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= range) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                } else {
                    pts.push({ px: 200, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(range);
                    if (yRight >= -0.5 && yRight <= range) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= range) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                }
            } else {
                if (b > 0) {
                    pts.push({ px: 200, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(range);
                    if (yRight >= -0.5 && yRight <= range) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= range) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                } else {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(range);
                    if (yRight >= -0.5 && yRight <= range) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= range) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            const px = 200 + xVal * 40;
            if (sign === "≥" || sign === ">") {
                pts.push({ px: px, py: 20 });
                pts.push({ px: 380, py: 20 });
                pts.push({ px: 380, py: 380 });
                pts.push({ px: px, py: 380 });
            } else {
                pts.push({ px: 200, py: 20 });
                pts.push({ px: px, py: 20 });
                pts.push({ px: px, py: 380 });
                pts.push({ px: 200, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            const py = 200 - yVal * 40;
            if (sign === "≥" || sign === ">") {
                pts.push({ px: 200, py: 20 });
                pts.push({ px: 380, py: 20 });
                pts.push({ px: 380, py: py });
                pts.push({ px: 200, py: py });
            } else {
                pts.push({ px: 200, py: py });
                pts.push({ px: 380, py: py });
                pts.push({ px: 380, py: 380 });
                pts.push({ px: 200, py: 380 });
            }
        }
        return pts.filter(p => p.px >= 200 && p.px <= 380 && p.py >= 20 && p.py <= 380);
    };

    // Get feasible region shading
    const getFeasibleRegionShading = () => {
        const pts = problem.cornerPoints.map(p => toPixel(p.x, p.y));
        return pts;
    };

    // Get objective line at a specific Z value
    const getObjectiveLineAtZ = (Z) => {
        // Z = 10000x + 5000y → divide by 5000: Z/5000 = 2x + y
        const points = [];
        const range = 45;
        const target = Z / 5000;
        for (let x = -0.5; x <= range; x += 0.1) {
            const y = target - 2 * x;
            if (y >= -0.5 && y <= range) {
                points.push(toPixel(x, y));
            }
        }
        return points;
    };

    // Generate multiple objective lines
    const generateMultipleLines = () => {
        const lines = [];
        const values = [100000, 150000, 200000, 250000];
        values.forEach(value => {
            lines.push({
                value,
                points: getObjectiveLineAtZ(value),
                isOptimal: value === 200000,
            });
        });
        return lines;
    };

    const multipleLines = generateMultipleLines();
    const currentLinePoints = getObjectiveLineAtZ(objectiveValue);

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        Topic 35 — Worked Example 8
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Worked Example 8: <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            Advertising Budget Allocation
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to allocate advertising budget between TV and Radio to maximize reach —
                        a classic media planning problem.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-sky-500"></span> 15 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Problem Statement ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Problem Statement
                    </h2>
                    <div className="mt-4 p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50">
                        <p className="text-sm text-sky-800 dark:text-sky-300">
                            {problem.problemStatement}
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Given Information</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• TV ad: 10,000 reach, ₹2000 cost</li>
                                <li>• Radio ad: 5,000 reach, ₹1000 cost</li>
                                <li>• Budget: ₹40,000</li>
                                <li>• Minimum reach: 150,000</li>
                                <li>• Contract: At least 5 TV ads</li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">What Makes This Special</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Multiple optimal solutions</li>
                                <li>• Budget and reach constraints</li>
                                <li>• Real-world media planning</li>
                                <li>• Shows the power of LP</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Formulation ===== */}
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
                        <span className="text-3xl">✏️</span>
                        Step 1: Formulate the LP Problem
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            <strong>Decision Variables:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            x = number of TV ads<br/>
                            y = number of Radio ads
                        </div>
                        <p>
                            <strong>Objective Function:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            Maximize Z = 10000x + 5000y
                        </div>
                        <p>
                            <strong>Constraints:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            2000x + 1000y ≤ 40000  (budget)<br/>
                            10000x + 5000y ≥ 150000 (reach)<br/>
                            x ≥ 5                   (minimum TV ads)<br/>
                            x ≥ 0, y ≥ 0            (non-negativity)
                        </div>
                        <p>
                            <strong>Simplified:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            2x + y ≤ 40  (budget)<br/>
                            2x + y ≥ 30  (reach)<br/>
                            x ≥ 5<br/>
                            y ≥ 0
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Graphical Solution ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        Step 2: Graphical Solution
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Use the interactive graph below to explore the advertising budget allocation problem.
                            Notice the multiple optimal solutions along the edge.
                        </p>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowAllLines(!showAllLines)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showAllLines
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showAllLines ? "Hide All" : "Show All Lines"}
                            </button>
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

                        {/* Z value slider */}
                        <div className="mb-4 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-sky-700 dark:text-sky-300">Z =</span>
                                <input
                                    type="range"
                                    min={100000}
                                    max={250000}
                                    step={5000}
                                    value={objectiveValue}
                                    onChange={(e) => setObjectiveValue(parseFloat(e.target.value))}
                                    className="flex-1 accent-sky-500"
                                />
                                <span className="text-sm font-mono font-bold text-sky-700 dark:text-sky-300 min-w-[60px]">
                                    {objectiveValue.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span>Z = 100,000</span>
                                <span>Optimal Z = 200,000</span>
                                <span>Z = 250,000</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph - Larger and clearer */}
                            <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 500 500" className="w-full h-full" role="img" aria-label="Advertising budget allocation graph">
                                    {/* Grid - finer and clearer */}
                                    <defs>
                                        <pattern id="grid_t35" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="500" height="500" fill="url(#grid_t35)" />

                                    {/* Shading for all constraints */}
                                    {problem.constraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            return (
                                                <polygon
                                                    key={`shade-${con.label}`}
                                                    points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill={con.color}
                                                    fillOpacity="0.1"
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
                                                    fill="#38bdf8"
                                                    fillOpacity="0.15"
                                                    stroke="none"
                                                />
                                            );
                                        }
                                        return null;
                                    })()}

                                    {/* All objective lines */}
                                    {showAllLines && multipleLines.map((line, idx) => {
                                        if (line.points.length > 1) {
                                            const isOptimal = line.isOptimal;
                                            return (
                                                <polyline
                                                    key={idx}
                                                    points={line.points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={isOptimal ? "#ef4444" : "#94a3b8"}
                                                    strokeWidth={isOptimal ? 3 : 1.5}
                                                    strokeDasharray={isOptimal ? "none" : "6,4"}
                                                    opacity={isOptimal ? 1 : 0.4}
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Current objective line */}
                                    {currentLinePoints.length > 1 && (
                                        <polyline
                                            points={currentLinePoints.map(p => `${p.px},${p.py}`).join(' ')}
                                            fill="none"
                                            stroke="#0ea5e9"
                                            strokeWidth="3"
                                            strokeDasharray="8,4"
                                        />
                                    )}

                                    {/* Current line label */}
                                    {currentLinePoints.length > 1 && (
                                        <text
                                            x="20"
                                            y="60"
                                            fontSize="13"
                                            fill="#0ea5e9"
                                            className="font-mono font-bold"
                                        >
                                            Z = {objectiveValue.toLocaleString()}
                                        </text>
                                    )}

                                    {/* Axes */}
                                    <line x1="50" y1="450" x2="480" y2="450" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                    <line x1="50" y1="450" x2="50" y2="20" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                    <polygon points="480,443 495,450 480,457" fill="#1e293b" className="dark:fill-slate-300" />
                                    <polygon points="43,20 50,5 57,20" fill="#1e293b" className="dark:fill-slate-300" />
                                    <text x="485" y="470" fontSize="18" fill="#1e293b" className="dark:fill-slate-300 font-medium">x</text>
                                    <text x="30" y="22" fontSize="18" fill="#1e293b" className="dark:fill-slate-300 font-medium">y</text>

                                    {/* Origin */}
                                    <circle cx="50" cy="450" r="6" fill="#ef4444" />
                                    <text x="60" y="470" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">O</text>

                                    {/* Tick marks - scaled for clarity */}
                                    {[90, 130, 170, 210, 250, 290, 330, 370, 410, 450].map((v) => {
                                        const val = Math.round((v - 50) / 40);
                                        if (val >= 0 && val <= 10) {
                                            return (
                                                <g key={`t35-tick-${v}`}>
                                                    <line x1={v} y1="443" x2={v} y2="457" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <line x1="43" y1={v} x2="57" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    {val > 0 && (
                                                        <>
                                                            <text x={v - 6} y="475" fontSize="12" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                            <text x="25" y={v + 5} fontSize="12" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                        </>
                                                    )}
                                                </g>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Draw all constraint lines */}
                                    {problem.constraints.map((con) => {
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
                                    {showCornerPoints && problem.cornerPoints.map((cp, idx) => {
                                        const { px, py } = toPixel(cp.x, cp.y);
                                        const isOptimal = cp.Z === 200000;
                                        const color = isOptimal ? "#ef4444" : "#94a3b8";
                                        return (
                                            <g key={`cp-${idx}`}>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r={isOptimal ? 10 : 7}
                                                    fill={color}
                                                    stroke="#fff"
                                                    strokeWidth="2.5"
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
                                                    y={py + 4}
                                                    fontSize={isOptimal ? 12 : 10}
                                                    fill={color}
                                                    className="font-mono"
                                                >
                                                    Z={cp.Z.toLocaleString()}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Optimal label */}
                                    <g>
                                        <rect x="20" y="80" width="240" height="70" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
                                        <text x="30" y="100" fontSize="13" fill="#ef4444" className="font-bold">
                                            Multiple Optimal Solutions!
                                        </text>
                                        <text x="30" y="118" fontSize="11" fill="#ef4444">
                                            B(5,30), C(15,10), D(20,0)
                                        </text>
                                        <text x="30" y="136" fontSize="11" fill="#ef4444">
                                            All give Z = 200,000 reach
                                        </text>
                                    </g>

                                    {/* Labels for constraints */}
                                    <text x="300" y="100" fontSize="11" fill="#8b5cf6" className="font-mono font-bold">2x + y = 40</text>
                                    <text x="300" y="120" fontSize="11" fill="#f59e0b" className="font-mono font-bold">2x + y = 30</text>
                                    <text x="300" y="140" fontSize="11" fill="#ef4444" className="font-mono font-bold">x = 5</text>

                                    {/* Problem title */}
                                    <text x="20" y="480" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {problem.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Steps panel */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                    <h3 className="font-semibold text-sky-600 dark:text-sky-400 mb-3">
                                        📋 Solution Steps
                                    </h3>
                                    <div className="space-y-1.5">
                                        {problem.steps.map((step, idx) => (
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
                                    <div className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                                            ✓ Maximum Reach: 200,000 people
                                        </p>
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                            Multiple optimal solutions exist!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 rounded-full mr-2">
                                {problem.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                Optimal Z = 200,000
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full ml-2">
                                {problem.constraints.length} constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full ml-2">
                                Multiple optima
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Interpretation ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">💡</span>
                        Interpretation of the Solution
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                {problem.interpretation}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">What We Learned</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Multiple optimal solutions exist</li>
                                    <li>• Budget is fully used in all cases (2x+y=40)</li>
                                    <li>• Reach requirement is met (2x+y≥30)</li>
                                    <li>• The company has flexibility in ad placement</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Business Insight</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Any combination on the edge 2x+y=40 is optimal</li>
                                    <li>• The company can choose based on other factors</li>
                                    <li>• TV ads reach more people but cost more</li>
                                    <li>• Flexibility in media planning is valuable</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[4]
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
                                <li>Multiple optimal solutions give flexibility.</li>
                                <li>Check if the objective line is parallel to a constraint.</li>
                                <li>Any point on the optimal edge is equally good.</li>
                                <li>Consider other factors (like brand preference).</li>
                                <li>This is a classic media planning problem.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Not recognizing multiple optimal solutions.</li>
                                <li>Assuming only one optimal solution exists.</li>
                                <li>Forgetting to check all corner points.</li>
                                <li>Misreading the objective function.</li>
                                <li>Not simplifying constraints.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Simplify constraints before graphing.</li>
                                <li>Check if the objective line is parallel to any constraint.</li>
                                <li>Identify all optimal solutions.</li>
                                <li>Consider business context for choosing among optima.</li>
                                <li>Document the range of optimal solutions.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: Mini Checklist ===== */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
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
                            <span>I can formulate an advertising budget allocation problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify multiple optimal solutions.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can simplify constraints before graphing.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can recognize when the objective is parallel to a constraint.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can interpret multiple optimal solutions in business terms.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can explain the flexibility of multiple optima.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Worked Example 8 – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Worked Example 8 – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic35_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "This example beautifully demonstrates multiple optimal solutions. I tell my students: 'Multiple optima give you flexibility — you can choose based on other business factors.' The key insight is that the objective line is parallel to the budget constraint (both have slope -2). I recommend having students discuss which optimal solution they would choose and why — this builds business intuition."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 35 — Worked Example 8 &bull; Advertising budget allocation
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Worked Example 9: Investment Allocation Problem (Topic 36)
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

export default Topic35;