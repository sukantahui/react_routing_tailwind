import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic39_files/topic39_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic39_files/topic39_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic39 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [showAllLines, setShowAllLines] = useState(false);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showSteps, setShowSteps] = useState(true);
    const [objectiveValue, setObjectiveValue] = useState(120);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Worked Example 12: Cost Minimization with Resource Requirements
    const problem = {
        title: "Cost Minimization with Resource Requirements",
        description: "A company minimizes production costs with multiple resource requirements.",
        problemStatement: "A manufacturing company produces two components: Component X and Component Y. Component X requires 2 hours of machining and 3 hours of assembly. Component Y requires 3 hours of machining and 2 hours of assembly. The company must produce at least 100 units of Component X and at least 80 units of Component Y due to customer orders. The company has 600 machining hours and 600 assembly hours available. The cost of producing Component X is ₹5 per unit and Component Y is ₹4 per unit. How many units of each component should be produced to minimize cost?",
        constraints: [
            { label: "x ≥ 100", a: 1, b: 0, c: 100, sign: "≥", color: "#8b5cf6" },
            { label: "y ≥ 80", a: 0, b: 1, c: 80, sign: "≥", color: "#f59e0b" },
            { label: "2x + 3y ≤ 600", a: 2, b: 3, c: 600, sign: "≤", color: "#ef4444" },
            { label: "3x + 2y ≤ 600", a: 3, b: 2, c: 600, sign: "≤", color: "#10b981" },
            { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
            { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
        ],
        objective: "C = 5x + 4y",
        cornerPoints: [
            { x: 100, y: 80, label: "A (100,80)", C: 820 },
            { x: 100, y: 133.33, label: "B (100,133.33)", C: 1033.33 },
            { x: 120, y: 120, label: "C (120,120)", C: 1080 },
            { x: 146.67, y: 100, label: "D (146.67,100)", C: 1133.33 },
            { x: 200, y: 0, label: "E (200,0)", C: 1000 },
        ],
        optimal: { x: 100, y: 80, C: 820 },
        steps: [
            "Step 1: Define variables:",
            "  x = units of Component X",
            "  y = units of Component Y",
            "Step 2: Formulate the problem:",
            "  Minimize C = 5x + 4y",
            "  Subject to:",
            "    x ≥ 100         (minimum Component X)",
            "    y ≥ 80          (minimum Component Y)",
            "    2x + 3y ≤ 600   (machining constraint)",
            "    3x + 2y ≤ 600   (assembly constraint)",
            "    x ≥ 0, y ≥ 0    (non-negativity)",
            "Step 3: Graph the constraints and find the feasible region.",
            "Step 4: Identify corner points: A(100,80), B(100,133.33), C(120,120), D(146.67,100), E(200,0).",
            "Step 5: Evaluate C at each corner:",
            "  A (100,80): C = 5(100) + 4(80) = 500 + 320 = 820",
            "  B (100,133.33): C = 5(100) + 4(133.33) = 500 + 533.33 = 1033.33",
            "  C (120,120): C = 5(120) + 4(120) = 600 + 480 = 1080",
            "  D (146.67,100): C = 5(146.67) + 4(100) = 733.33 + 400 = 1133.33",
            "  E (200,0): C = 5(200) + 4(0) = 1000",
            "Step 6: The minimum cost is ₹820 at (100, 80).",
            "Conclusion: Produce 100 units of X and 80 units of Y.",
            "Check: Machining: 2(100)+3(80)=200+240=440 ≤ 600 ✓, Assembly: 3(100)+2(80)=300+160=460 ≤ 600 ✓, x≥100 ✓, y≥80 ✓.",
            "Note: Both machining and assembly constraints are non-binding (slack of 160 and 140 hours respectively). The minimum requirements for X and Y are the binding constraints."
        ],
        interpretation: "The optimal solution is to produce exactly the minimum required quantities: 100 units of Component X and 80 units of Component Y. This uses 440 machining hours (2×100 + 3×80 = 200 + 240 = 440) and 460 assembly hours (3×100 + 2×80 = 300 + 160 = 460), leaving slack in both resources. The minimum cost is ₹820. The customer order requirements for both components are the binding constraints at the optimum."
    };

    // Helper: convert coordinates to SVG pixels (scale: 1 unit = 2.5px for 200 scale)
    const toPixel = (x, y) => {
        return {
            px: 60 + x * 2.5,
            py: 380 - y * 2.5
        };
    };

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const range = 220;
        if (b !== 0 && a !== 0) {
            for (let x = -10; x &le; range + 10; x += 1) {
                const y = (c - a * x) / b;
                if (y >= -10 && y <= range + 10) {
                    const p = toPixel(x, y);
                    if (p.px >= 40 && p.px &le; 560 && p.py >= 20 && p.py <= 390) {
                        points.push(p);
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -10 && xVal &le; range + 10) {
                const px = toPixel(xVal, 0).px;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -10 && yVal <= range + 10) {
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
        const range = 220;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight &ge; -10 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -10 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                } else {
                    pts.push(toPixel(0, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= -10 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -10 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                }
            } else {
                if (b > 0) {
                    pts.push(toPixel(0, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight &ge; -10 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -10 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                } else {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight >= -10 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -10 && yLeft <= range) {
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
            if (sign === "≥" || sign === "&gt;") {
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
        return pts.filter(p => p.px &ge; 40 && p.px &le; 560 && p.py >= 20 && p.py <= 390);
    };

    // Get feasible region shading
    const getFeasibleRegionShading = () => {
        const pts = problem.cornerPoints.map(p => toPixel(p.x, p.y));
        return pts;
    };

    // Get objective line at a specific C value
    const getObjectiveLineAtC = (C) => {
        const points = [];
        const range = 220;
        for (let x = -10; x &le; range + 10; x += 1) {
            const y = (C - 5 * x) / 4;
            if (y >= -10 && y <= range + 10) {
                const p = toPixel(x, y);
                if (p.px >= 40 && p.px &le; 560 && p.py >= 20 && p.py <= 390) {
                    points.push(p);
                }
            }
        }
        return points;
    };

    // Generate multiple objective lines
    const generateMultipleLines = () => {
        const lines = [];
        const values = [400, 600, 800, 820, 1000, 1200];
        values.forEach(value => {
            lines.push({
                value,
                points: getObjectiveLineAtC(value),
                isOptimal: value === 820,
            });
        });
        return lines;
    };

    const multipleLines = generateMultipleLines();
    const currentLinePoints = getObjectiveLineAtC(objectiveValue);

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        Topic 39 — Worked Example 12
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Worked Example 12: <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-rose-600 to-red-600 dark:from-rose-400 dark:to-red-400 bg-clip-text text-transparent">
                            Cost Minimization with Resource Requirements
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to minimize production costs while meeting minimum order requirements and
                        resource constraints.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span> 15 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span> Intermediate
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/5 dark:hover:shadow-rose-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Problem Statement
                    </h2>
                    <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                        <p className="text-sm text-rose-800 dark:text-rose-300">
                            {problem.problemStatement}
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Given Information</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Component X: 2 machining, 3 assembly, ₹5 cost</li>
                                <li>• Component Y: 3 machining, 2 assembly, ₹4 cost</li>
                                <li>• Minimum X: 100 units</li>
                                <li>• Minimum Y: 80 units</li>
                                <li>• Machining: 600 hours, Assembly: 600 hours</li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">What Makes This Special</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Minimum order requirements</li>
                                <li>• Multiple resources with slack</li>
                                <li>• Binding minimum constraints</li>
                                <li>• Resources are not fully used</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Formulation ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5 dark:hover:shadow-red-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        Step 1: Formulate the LP Problem
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            <strong>Decision Variables:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            x = units of Component X<br/>
                            y = units of Component Y
                        </div>
                        <p>
                            <strong>Objective Function:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            Minimize C = 5x + 4y
                        </div>
                        <p>
                            <strong>Constraints:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            x ≥ 100         (minimum Component X)<br/>
                            y ≥ 80          (minimum Component Y)<br/>
                            2x + 3y ≤ 600   (machining)<br/>
                            3x + 2y ≤ 600   (assembly)<br/>
                            x ≥ 0, y ≥ 0    (non-negativity)
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Graphical Solution ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        Step 2: Graphical Solution
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Use the interactive graph below to explore the cost minimization problem.
                            Notice that the minimum requirements for X and Y are the binding constraints.
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
                            &gt;
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
                            &gt;
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
                            &gt;
                                {showSteps ? "Hide Steps" : "Show Steps"}
                            </button>
                        </div>

                        {/* C value slider */}
                        <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-200 dark:border-rose-800">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-rose-700 dark:text-rose-300">C =</span>
                                <input
                                    type="range"
                                    min={300}
                                    max={1400}
                                    step={10}
                                    value={objectiveValue}
                                    onChange={(e) => setObjectiveValue(parseFloat(e.target.value))}
                                    className="flex-1 accent-rose-500"
                                /&gt;
                                <span className="text-sm font-mono font-bold text-rose-700 dark:text-rose-300 min-w-[50px]">
                                    {objectiveValue.toFixed(0)}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span>C = 300</span>
                                <span>Optimal C = 820</span>
                                <span>C = 1400</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph - Larger 600x400 */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Cost minimization with resources graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t39" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t39)" />

                                    {/* Shading for all constraints */}
                                    {problem.constraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            return (
                                                <polygon
                                                    key={`shade-${con.label}`}
                                                    points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill={con.color}
                                                    fillOpacity="0.08"
                                                    stroke="none"
                                                /&gt;
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
                                                /&gt;
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
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Current objective line */}
                                    {currentLinePoints.length > 1 && (
                                        <polyline
                                            points={currentLinePoints.map(p => `${p.px},${p.py}`).join(' ')}
                                            fill="none"
                                            stroke="#f43f5e"
                                            strokeWidth="3"
                                            strokeDasharray="8,4"
                                        /&gt;
                                    )}

                                    {/* Current line label */}
                                    {currentLinePoints.length > 1 && (
                                        <text
                                            x="20"
                                            y="50"
                                            fontSize="13"
                                            fill="#f43f5e"
                                            className="font-mono font-bold"
                                        >
                                            C = {objectiveValue.toFixed(0)}
                                        </text>
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
                                    {[105, 130, 155, 180, 205, 230, 255, 280, 305, 330, 355, 380, 405, 430, 455, 480, 505, 530, 555].map((v) => {
                                        const val = Math.round((v - 80) / 2.5);
                                        if (val &ge; 0 && val &le; 200 && val % 20 === 0) {
                                            return (
                                                <g key={`t39-tick-${v}`}>
                                                    <line x1={v} y1="373" x2={v} y2="387" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <line x1="73" y1={v} x2="87" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    {val &gt; 0 && (
                                                        <>
                                                            <text x={v - 10} y="400" fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                            <text x="50" y={v + 4} fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
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
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Corner points */}
                                    {showCornerPoints && problem.cornerPoints.map((cp, idx) => {
                                        const { px, py } = toPixel(cp.x, cp.y);
                                        const isOptimal = cp.x === problem.optimal.x && cp.y === problem.optimal.y;
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
                                                    x={px + 12}
                                                    y={py - 14}
                                                    fontSize={isOptimal ? 13 : 11}
                                                    fill={color}
                                                    className="font-mono font-bold"
                                                >
                                                    {cp.label}
                                                </text>
                                                <text
                                                    x={px + 12}
                                                    y={py + 4}
                                                    fontSize={isOptimal ? 11 : 9}
                                                    fill={color}
                                                    className="font-mono"
                                                >
                                                    C={cp.C.toFixed(0)}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Optimal label */}
                                    <g>
                                        <rect x="20" y="70" width="240" height="55" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
                                        <text x="30" y="90" fontSize="13" fill="#ef4444" className="font-bold">
                                            Optimal Solution
                                        </text>
                                        <text x="30" y="108" fontSize="11" fill="#ef4444">
                                            (100, 80) with Cost = 820
                                        </text>
                                    </g>

                                    {/* Labels for constraints */}
                                    <text x="380" y="80" fontSize="11" fill="#8b5cf6" className="font-mono font-bold">x = 100</text>
                                    <text x="380" y="100" fontSize="11" fill="#f59e0b" className="font-mono font-bold">y = 80</text>
                                    <text x="380" y="120" fontSize="11" fill="#ef4444" className="font-mono font-bold">2x+3y=600</text>
                                    <text x="380" y="140" fontSize="11" fill="#10b981" className="font-mono font-bold">3x+2y=600</text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {problem.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Steps panel */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                    <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-3">
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
                                            ✓ Minimum Cost: {problem.optimal.C}
                                        </p>
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                            at ({problem.optimal.x}, {problem.optimal.y})
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full mr-2">
                                {problem.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                Optimal C = 820
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full ml-2">
                                {problem.constraints.length} constraints
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
                &gt;
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
                                    <li>• Minimum order requirements are the binding constraints</li>
                                    <li>• Both machining and assembly have slack</li>
                                    <li>• Producing minimum quantities minimizes cost</li>
                                    <li>• Resources are not fully utilized at the optimum</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Business Insight</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Customer orders drive production decisions</li>
                                    <li>• The company has spare capacity</li>
                                    <li>• Component Y is cheaper but requires more machining</li>
                                    <li>• The optimal solution meets all requirements at minimum cost</li>
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
                &gt;
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
                                <li>Minimum order requirements often bind in minimization.</li>
                                <li>Check if resources have slack at the optimum.</li>
                                <li>Component Y is cheaper but uses more machining.</li>
                                <li>The cheapest solution is often the minimum required quantities.</li>
                                <li>Identify which constraints are binding.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming resources are always binding.</li>
                                <li>Not checking if minimum requirements are met.</li>
                                <li>Forgetting to check all constraints.</li>
                                <li>Misreading the objective (min vs max).</li>
                                <li>Not identifying which constraints are binding.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Check all constraints at the optimal point.</li>
                                <li>Identify which constraints are binding.</li>
                                <li>Verify minimum requirements are met.</li>
                                <li>Check if resources have slack.</li>
                                <li>Use the graphical method to visualize the solution.</li>
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
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Mini Checklist
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can formulate a problem with minimum order requirements.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify binding constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the optimal production mix.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify all constraints are satisfied.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can interpret the solution in business terms.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can explain slack in resource constraints.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Worked Example 12 – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Worked Example 12 – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic39_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "This example shows that resources don't always bind at the optimum. I tell my students: 'In minimization problems, minimum requirements often drive the solution, not resource constraints.' The key insight is that the company produces exactly what customers ordered and nothing more, leaving slack in both machining and assembly. This is a great lesson in identifying which constraints actually limit the solution."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 39 — Worked Example 12 &bull; Cost minimization with resource requirements
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Worked Example 13: Diet and Nutrition Minimization (Topic 40)
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

export default Topic39;