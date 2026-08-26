import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic41_files/topic41_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic41_files/topic41_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic41 = () => {
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

    // Worked Example 14: Minimum-Cost Production Problem
    const problem = {
        title: "Minimum-Cost Production Problem",
        description: "A company minimizes production cost with multiple constraints.",
        problemStatement: "A factory produces two products: Product X and Product Y. Product X requires 2 hours of labor and 3 units of material. Product Y requires 4 hours of labor and 2 units of material. The factory has 120 labor hours and 90 units of material available. The cost of producing Product X is ₹6 per unit and Product Y is ₹8 per unit. Due to market demand, the factory must produce at least 20 units of Product X and at least 15 units of Product Y. How many units of each product should be produced to minimize cost?",
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
            { x: 20, y: 15, label: "A (20,15)", C: 240 },
            { x: 20, y: 20, label: "B (20,20)", C: 280 },
            { x: 24, y: 18, label: "C (24,18)", C: 288 },
            { x: 30, y: 0, label: "D (30,0)", C: 180 },
            { x: 0, y: 30, label: "E (0,30)", C: 240 },
        ],
        optimal: { x: 20, y: 15, C: 240 },
        steps: [
            "Step 1: Define variables:",
            "  x = units of Product X",
            "  y = units of Product Y",
            "Step 2: Formulate the problem:",
            "  Minimize C = 6x + 8y",
            "  Subject to:",
            "    2x + 4y ≤ 120  (labor constraint)",
            "    3x + 2y ≤ 90   (material constraint)",
            "    x ≥ 20         (minimum Product X)",
            "    y ≥ 15         (minimum Product Y)",
            "    x ≥ 0, y ≥ 0   (non-negativity)",
            "Step 3: Simplify labor constraint: x + 2y ≤ 60",
            "Step 4: Graph the constraints and find the feasible region.",
            "Step 5: Identify corner points: A(20,15), B(20,20), C(24,18), D(30,0), E(0,30).",
            "Step 6: Evaluate C at each corner:",
            "  A (20,15): C = 6(20) + 8(15) = 120 + 120 = 240",
            "  B (20,20): C = 6(20) + 8(20) = 120 + 160 = 280",
            "  C (24,18): C = 6(24) + 8(18) = 144 + 144 = 288",
            "  D (30,0): C = 6(30) + 8(0) = 180",
            "  E (0,30): C = 6(0) + 8(30) = 240",
            "Step 7: Check feasibility of each corner:",
            "  A (20,15): Labor: 2(20)+4(15)=40+60=100≤120 ✓, Material: 3(20)+2(15)=60+30=90≤90 ✓, x≥20 ✓, y≥15 ✓ — feasible!",
            "  B (20,20): Labor: 2(20)+4(20)=40+80=120≤120 ✓, Material: 3(20)+2(20)=60+40=100&gt;90 ✗ — infeasible!",
            "  C (24,18): Labor: 2(24)+4(18)=48+72=120≤120 ✓, Material: 3(24)+2(18)=72+36=108>90 ✗ — infeasible!",
            "  D (30,0): Labor: 2(30)+4(0)=60≤120 ✓, Material: 3(30)+2(0)=90≤90 ✓, x≥20 ✓, y≥15 ✗ — infeasible!",
            "  E (0,30): Labor: 2(0)+4(30)=120≤120 ✓, Material: 3(0)+2(30)=60≤90 ✓, x≥20 ✗ — infeasible!",
            "Step 8: The only feasible corner point is A(20,15) with C=240.",
            "Conclusion: Produce 20 units of X and 15 units of Y.",
            "Check: Labor: 2(20)+4(15)=40+60=100 ≤ 120 ✓, Material: 3(20)+2(15)=60+30=90 ≤ 90 ✓, x≥20 ✓, y≥15 ✓.",
            "The minimum cost is ₹240."
        ],
        interpretation: "The optimal solution is to produce exactly the minimum required quantities: 20 units of Product X and 15 units of Product Y. This uses 100 labor hours (2×20 + 4×15 = 40 + 60 = 100) and all available material (3×20 + 2×15 = 60 + 30 = 90). The minimum cost is ₹240. The material constraint and both minimum requirements are binding at the optimum, while the labor constraint has slack."
    };

    // Helper: convert coordinates to SVG pixels (scale: 1 unit = 40px for 40 range)
    const toPixel = (x, y) => {
        return {
            px: 80 + x * 12,
            py: 380 - y * 12
        };
    };

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const range = 45;
        if (b !== 0 && a !== 0) {
            for (let x = -2; x &le; range + 2; x += 0.2) {
                const y = (c - a * x) / b;
                if (y >= -2 && y <= range + 2) {
                    const p = toPixel(x, y);
                    if (p.px >= 40 && p.px &le; 560 && p.py >= 20 && p.py <= 390) {
                        points.push(p);
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -2 && xVal &le; range + 2) {
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
        const range = 45;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight &ge; -2 && yRight &le; range) {
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
                    if (yRight >= -2 && yRight &le; range) {
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
                    if (yRight &ge; -2 && yRight &le; range) {
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
                    if (yRight >= -2 && yRight &le; range) {
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
        const range = 45;
        for (let x = -2; x &le; range + 2; x += 0.2) {
            const y = (C - 6 * x) / 8;
            if (y >= -2 && y <= range + 2) {
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
        const values = [100, 180, 240, 300, 360];
        values.forEach(value => {
            lines.push({
                value,
                points: getObjectiveLineAtC(value),
                isOptimal: value === 240,
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800">
                        Topic 41 — Worked Example 14
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Worked Example 14: <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-fuchsia-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Minimum-Cost Production Problem
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to minimize production costs with labor, material, and minimum order
                        constraints — a comprehensive production planning problem.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span> 15 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Advanced
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/5 dark:hover:shadow-fuchsia-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Problem Statement
                    </h2>
                    <div className="mt-4 p-4 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800/50">
                        <p className="text-sm text-fuchsia-800 dark:text-fuchsia-300">
                            {problem.problemStatement}
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Given Information</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Product X: 2 labor, 3 material, ₹6 cost</li>
                                <li>• Product Y: 4 labor, 2 material, ₹8 cost</li>
                                <li>• Labor: 120 hours, Material: 90 units</li>
                                <li>• Minimum X: 20 units, Minimum Y: 15 units</li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">What Makes This Special</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Multiple binding constraints</li>
                                <li>• Minimum order requirements</li>
                                <li>• One resource has slack</li>
                                <li>• Only one feasible corner point</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Formulation ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-400/5",
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
                            x = units of Product X<br/>
                            y = units of Product Y
                        </div>
                        <p>
                            <strong>Objective Function:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            Minimize C = 6x + 8y
                        </div>
                        <p>
                            <strong>Constraints:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            2x + 4y ≤ 120  (labor constraint)<br/>
                            3x + 2y ≤ 90   (material constraint)<br/>
                            x ≥ 20         (minimum Product X)<br/>
                            y ≥ 15         (minimum Product Y)<br/>
                            x ≥ 0, y ≥ 0   (non-negativity)
                        </div>
                        <p>
                            <strong>Simplified:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            x + 2y ≤ 60  (labor, divided by 2)<br/>
                            3x + 2y ≤ 90 (material)<br/>
                            x ≥ 20, y ≥ 15
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Graphical Solution ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
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
                            Use the interactive graph below to explore the minimum-cost production problem.
                            Notice that only one corner point is feasible.
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
                        <div className="mb-4 p-3 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg border border-fuchsia-200 dark:border-fuchsia-800">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-fuchsia-700 dark:text-fuchsia-300">C =</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={400}
                                    step={5}
                                    value={objectiveValue}
                                    onChange={(e) => setObjectiveValue(parseFloat(e.target.value))}
                                    className="flex-1 accent-fuchsia-500"
                                /&gt;
                                <span className="text-sm font-mono font-bold text-fuchsia-700 dark:text-fuchsia-300 min-w-[40px]">
                                    {objectiveValue.toFixed(0)}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span>C = 0</span>
                                <span>Optimal C = 240</span>
                                <span>C = 400</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph - Larger 600x400 */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Minimum-cost production graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t41" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t41)" />

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
                                                    fill="#d946ef"
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
                                            stroke="#d946ef"
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
                                            fill="#d946ef"
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
                                    {[104, 128, 152, 176, 200, 224, 248, 272, 296, 320, 344, 368, 392, 416, 440, 464, 488, 512, 536].map((v) => {
                                        const val = Math.round((v - 80) / 12);
                                        if (val &ge; 0 && val &le; 40 && val % 5 === 0) {
                                            return (
                                                <g key={`t41-tick-${v}`}>
                                                    <line x1={v} y1="373" x2={v} y2="387" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <line x1="73" y1={v} x2="87" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    {val &gt; 0 && (
                                                        <>
                                                            <text x={v - 8} y="400" fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
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
                                        const isFeasible = cp.x &ge; 20 && cp.y >= 15 && 
                                                          2*cp.x + 4*cp.y &le; 120 && 
                                                          3*cp.x + 2*cp.y <= 90;
                                        const color = isOptimal ? "#ef4444" : (isFeasible ? "#84cc16" : "#94a3b8");
                                        const opacity = isFeasible ? 1 : 0.5;
                                        return (
                                            <g key={`cp-${idx}`} opacity={opacity}>
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
                                                    C={cp.C}
                                                    {!isFeasible && " ✗"}
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
                                            (20, 15) with Cost = 240
                                        </text>
                                    </g>

                                    {/* Labels for constraints */}
                                    <text x="380" y="80" fontSize="11" fill="#8b5cf6" className="font-mono font-bold">x + 2y = 60</text>
                                    <text x="380" y="100" fontSize="11" fill="#f59e0b" className="font-mono font-bold">3x+2y=90</text>
                                    <text x="380" y="120" fontSize="11" fill="#ef4444" className="font-mono font-bold">x = 20</text>
                                    <text x="380" y="140" fontSize="11" fill="#10b981" className="font-mono font-bold">y = 15</text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {problem.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Steps panel */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                    <h3 className="font-semibold text-fuchsia-600 dark:text-fuchsia-400 mb-3">
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
                            <span className="inline-block px-3 py-1 bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-300 rounded-full mr-2">
                                {problem.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                Optimal C = 240
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
                                    <li>• Material constraint is binding</li>
                                    <li>• Both minimum requirements are binding</li>
                                    <li>• Labor constraint has slack (20 hours)</li>
                                    <li>• Only one corner point is feasible</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Business Insight</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Producing minimum quantities is optimal</li>
                                    <li>• Material is the limiting resource</li>
                                    <li>• Labor has spare capacity</li>
                                    <li>• The company should not produce more than required</li>
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
                                <li>Check all corner points for feasibility.</li>
                                <li>Only feasible corner points can be optimal.</li>
                                <li>Product Y has higher cost but uses more labor.</li>
                                <li>Material is the limiting resource.</li>
                                <li>Minimum requirements can be the driving constraints.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming all corner points are feasible.</li>
                                <li>Not checking minimum requirements.</li>
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
                                <li>Check all corner points for feasibility.</li>
                                <li>Verify minimum requirements are met.</li>
                                <li>Identify which constraints are binding.</li>
                                <li>Check which resources have slack.</li>
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
                            <span>I can formulate a minimum-cost production problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can check corner points for feasibility.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the optimal production plan.</span>
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
                            <span>I can identify which constraints are binding.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Worked Example 14 – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Worked Example 14 – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic41_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "This example shows the importance of checking feasibility. I tell my students: 'A corner point is only a candidate if it satisfies ALL constraints.' The key insight is that only one corner point is feasible, making the solution straightforward. This is a great lesson in how constraints work together to limit the feasible region."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 41 — Worked Example 14 &bull; Minimum-cost production problem
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Evaluating the Objective Function at Corner Points (Topic 42)
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

export default Topic41;