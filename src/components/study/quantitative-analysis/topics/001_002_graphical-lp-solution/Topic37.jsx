import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic37_files/topic37_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic37_files/topic37_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic37 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [showAllLines, setShowAllLines] = useState(false);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showSteps, setShowSteps] = useState(true);
    const [objectiveValue, setObjectiveValue] = useState(400000);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Worked Example 10: Agricultural Production Problem
    const problem = {
        title: "Agricultural Production Problem",
        description: "A farmer allocates land between two crops with resource constraints.",
        problemStatement: "A farmer has 100 hectares of land to plant two crops: Wheat (x) and Corn (y). Wheat requires 2 hours of labor per hectare and 3 units of water per hectare. Corn requires 3 hours of labor per hectare and 2 units of water per hectare. The farmer has 240 hours of labor and 240 units of water available. Wheat gives a profit of ₹5,000 per hectare and Corn gives ₹6,000 per hectare. Additionally, due to market demand, the farmer must plant at least 20 hectares of corn. How many hectares of each crop should be planted to maximize profit?",
        constraints: [
            { label: "x + y ≤ 100", a: 1, b: 1, c: 100, sign: "≤", color: "#8b5cf6" },
            { label: "2x + 3y ≤ 240", a: 2, b: 3, c: 240, sign: "≤", color: "#f59e0b" },
            { label: "3x + 2y ≤ 240", a: 3, b: 2, c: 240, sign: "≤", color: "#ef4444" },
            { label: "y ≥ 20", a: 0, b: 1, c: 20, sign: "≥", color: "#10b981" },
            { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
        ],
        objective: "Z = 5000x + 6000y",
        cornerPoints: [
            { x: 40, y: 20, label: "A (40,20)", Z: 320000 },
            { x: 60, y: 20, label: "B (60,20)", Z: 420000 },
            { x: 48, y: 48, label: "C (48,48)", Z: 528000 },
            { x: 20, y: 60, label: "D (20,60)", Z: 460000 },
            { x: 0, y: 80, label: "E (0,80)", Z: 480000 },
        ],
        optimal: { x: 48, y: 48, Z: 528000 },
        steps: [
            "Step 1: Define variables:",
            "  x = hectares of Wheat",
            "  y = hectares of Corn",
            "Step 2: Formulate the problem:",
            "  Maximize Z = 5000x + 6000y",
            "  Subject to:",
            "    x + y ≤ 100       (land constraint)",
            "    2x + 3y ≤ 240     (labor constraint)",
            "    3x + 2y ≤ 240     (water constraint)",
            "    y ≥ 20            (corn requirement)",
            "    x ≥ 0, y ≥ 0      (non-negativity)",
            "Step 3: Graph the constraints and find the feasible region.",
            "Step 4: Identify corner points: A(40,20), B(60,20), C(48,48), D(20,60), E(0,80).",
            "Step 5: Evaluate Z at each corner:",
            "  A (40,20): Z = 5000(40) + 6000(20) = 200000 + 120000 = 320000",
            "  B (60,20): Z = 5000(60) + 6000(20) = 300000 + 120000 = 420000",
            "  C (48,48): Z = 5000(48) + 6000(48) = 240000 + 288000 = 528000",
            "  D (20,60): Z = 5000(20) + 6000(60) = 100000 + 360000 = 460000",
            "  E (0,80): Z = 5000(0) + 6000(80) = 480000",
            "Step 6: The maximum profit is ₹5,28,000 at (48, 48).",
            "Conclusion: Plant 48 hectares of Wheat and 48 hectares of Corn.",
            "Check: Land: 48+48=96 ≤ 100 ✓, Labor: 2(48)+3(48)=96+144=240 ✓, Water: 3(48)+2(48)=144+96=240 ✓, Corn: 48 ≥ 20 ✓."
        ],
        interpretation: "The optimal solution is to plant 48 hectares of Wheat and 48 hectares of Corn. This uses all available labor (2×48 + 3×48 = 96 + 144 = 240 hours) and all available water (3×48 + 2×48 = 144 + 96 = 240 units). The land constraint is not binding (48+48=96 < 100), so there is 4 hectares of unused land. The corn requirement (y≥20) is satisfied with 48 hectares. The maximum profit is ₹5,28,000."
    };

    // Helper: convert coordinates to SVG pixels (scale: 1 unit = 40px for 100 scale)
    const toPixel = (x, y) => {
        return {
            px: 80 + x * 4.2,
            py: 380 - y * 4.2
        };
    };

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const range = 100;
        if (b !== 0 && a !== 0) {
            for (let x = -5; x &le; range + 10; x += 0.5) {
                const y = (c - a * x) / b;
                if (y >= -5 && y <= range + 10) {
                    const p = toPixel(x, y);
                    if (p.px >= 40 && p.px &le; 560 && p.py >= 20 && p.py <= 390) {
                        points.push(p);
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -5 && xVal &le; range + 10) {
                const px = toPixel(xVal, 0).px;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -5 && yVal <= range + 10) {
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
        const range = 100;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight &ge; -5 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -5 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                } else {
                    pts.push(toPixel(0, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= -5 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -5 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                }
            } else {
                if (b > 0) {
                    pts.push(toPixel(0, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight &ge; -5 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -5 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                } else {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight >= -5 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -5 && yLeft <= range) {
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

    // Get objective line at a specific Z value
    const getObjectiveLineAtZ = (Z) => {
        // Z = 5000x + 6000y → y = (Z - 5000x) / 6000
        const points = [];
        const range = 100;
        for (let x = -5; x &le; range + 10; x += 0.5) {
            const y = (Z - 5000 * x) / 6000;
            if (y >= -5 && y <= range + 10) {
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
        const values = [200000, 300000, 400000, 500000, 528000, 600000];
        values.forEach(value => {
            lines.push({
                value,
                points: getObjectiveLineAtZ(value),
                isOptimal: value === 528000,
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                        Topic 37 — Worked Example 10
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Worked Example 10: <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Agricultural Production Problem
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to optimize crop planting decisions with land, labor, water, and market
                        constraints — a real-world agricultural planning problem.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> 15 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Intermediate
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 dark:hover:shadow-green-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Problem Statement
                    </h2>
                    <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                        <p className="text-sm text-green-800 dark:text-green-300">
                            {problem.problemStatement}
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Given Information</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Land: 100 hectares</li>
                                <li>• Wheat: 2 labor, 3 water, ₹5,000 profit</li>
                                <li>• Corn: 3 labor, 2 water, ₹6,000 profit</li>
                                <li>• Labor: 240 hours, Water: 240 units</li>
                                <li>• Minimum Corn: 20 hectares</li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">What Makes This Special</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Multiple resource constraints</li>
                                <li>• Minimum crop requirement</li>
                                <li>• Land constraint not binding at optimum</li>
                                <li>• Real-world agricultural planning</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Formulation ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
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
                            x = hectares of Wheat<br/>
                            y = hectares of Corn
                        </div>
                        <p>
                            <strong>Objective Function:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            Maximize Z = 5000x + 6000y
                        </div>
                        <p>
                            <strong>Constraints:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            x + y ≤ 100       (land constraint)<br/>
                            2x + 3y ≤ 240     (labor constraint)<br/>
                            3x + 2y ≤ 240     (water constraint)<br/>
                            y ≥ 20            (corn requirement)<br/>
                            x ≥ 0, y ≥ 0      (non-negativity)
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
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        Step 2: Graphical Solution
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Use the interactive graph below to explore the agricultural production problem.
                            The graph shows the feasible region where all constraints are satisfied.
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

                        {/* Z value slider */}
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-green-700 dark:text-green-300">Z =</span>
                                <input
                                    type="range"
                                    min={100000}
                                    max={650000}
                                    step={10000}
                                    value={objectiveValue}
                                    onChange={(e) => setObjectiveValue(parseFloat(e.target.value))}
                                    className="flex-1 accent-green-500"
                                /&gt;
                                <span className="text-sm font-mono font-bold text-green-700 dark:text-green-300 min-w-[60px]">
                                    ₹{objectiveValue.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span>Z = ₹100,000</span>
                                <span>Optimal Z = ₹528,000</span>
                                <span>Z = ₹650,000</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph - Larger 600x400 */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Agricultural production graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t37" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t37)" />

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
                                                    fill="#22c55e"
                                                    fillOpacity="0.12"
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
                                            stroke="#22c55e"
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
                                            fill="#22c55e"
                                            className="font-mono font-bold"
                                        >
                                            Z = ₹{objectiveValue.toLocaleString()}
                                        </text>
                                    )}

                                    {/* Axes */}
                                    <line x1="80" y1="380" x2="580" y2="380" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                    <line x1="80" y1="380" x2="80" y2="20" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                    <polygon points="580,373 595,380 580,387" fill="#1e293b" className="dark:fill-slate-300" />
                                    <polygon points="73,20 80,5 87,20" fill="#1e293b" className="dark:fill-slate-300" />
                                    <text x="585" y="400" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">x (hectares)</text>
                                    <text x="25" y="22" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">y (hectares)</text>

                                    {/* Origin */}
                                    <circle cx="80" cy="380" r="5" fill="#ef4444" />
                                    <text x="85" y="400" fontSize="14" fill="#1e293b" className="dark:fill-slate-300 font-medium">O</text>

                                    {/* Tick marks */}
                                    {[122, 164, 206, 248, 290, 332, 374, 416, 458, 500, 542].map((v) => {
                                        const val = Math.round((v - 80) / 4.2);
                                        if (val &ge; 0 && val &le; 110 && val % 10 === 0) {
                                            return (
                                                <g key={`t37-tick-${v}`}>
                                                    <line x1={v} y1="373" x2={v} y2="387" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <line x1="73" y1={v} x2="87" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    {val &gt; 0 && (
                                                        <>
                                                            <text x={v - 8} y="400" fontSize="11" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                            <text x="50" y={v + 4} fontSize="11" fill="#475569" className="dark:fill-slate-500">{val}</text>
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
                                                    Z={cp.Z.toLocaleString()}
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
                                            (48, 48) with Profit = ₹5,28,000
                                        </text>
                                    </g>

                                    {/* Labels for constraints */}
                                    <text x="380" y="80" fontSize="11" fill="#8b5cf6" className="font-mono font-bold">x + y = 100</text>
                                    <text x="380" y="100" fontSize="11" fill="#f59e0b" className="font-mono font-bold">2x+3y=240</text>
                                    <text x="380" y="120" fontSize="11" fill="#ef4444" className="font-mono font-bold">3x+2y=240</text>
                                    <text x="380" y="140" fontSize="11" fill="#10b981" className="font-mono font-bold">y = 20</text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {problem.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Steps panel */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                    <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">
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
                                            ✓ Maximum Profit: ₹{problem.optimal.Z.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                            at ({problem.optimal.x}, {problem.optimal.y})
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full mr-2">
                                {problem.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                Optimal Z = ₹5,28,000
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
                                    <li>• Labor and water are both binding constraints</li>
                                    <li>• Land constraint is NOT binding (4 hectares unused)</li>
                                    <li>• Corn requirement is satisfied</li>
                                    <li>• Equal planting of both crops is optimal</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Agricultural Insight</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Labor and water are the limiting resources</li>
                                    <li>• Land is abundant (96 of 100 hectares used)</li>
                                    <li>• Corn is more profitable but uses more labor</li>
                                    <li>• The optimal mix balances all constraints</li>
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
                                <li>Agricultural problems often have multiple resource constraints.</li>
                                <li>Check which constraints are binding at the optimum.</li>
                                <li>Land may not always be the limiting factor.</li>
                                <li>Corn is more profitable but uses more labor.</li>
                                <li>Minimum crop requirements are common in agriculture.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming land is always the limiting constraint.</li>
                                <li>Not checking if the minimum crop requirement is met.</li>
                                <li>Forgetting to check all constraints at the optimum.</li>
                                <li>Misreading the resource requirements.</li>
                                <li>Not identifying which constraints are binding.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Identify all resource constraints.</li>
                                <li>Check which constraints are binding at the optimum.</li>
                                <li>Verify the minimum crop requirement is met.</li>
                                <li>Consider the trade-off between crops.</li>
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
                            <span>I can formulate an agricultural production problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify binding constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the optimal crop allocation.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify all constraints are satisfied.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can interpret the solution in agricultural terms.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can explain the trade-off between crops.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Worked Example 10 – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Worked Example 10 – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic37_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "This example shows that land isn't always the limiting factor in agriculture. I tell my students: 'Sometimes labor and water are the real constraints.' The key insight is that at the optimum, labor and water are fully used, but land has slack. This is a great lesson in identifying binding constraints. I recommend having students explore what happens if the farmer gets more labor or water."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 37 — Worked Example 10 &bull; Agricultural production problem
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Worked Example 11: Simple Minimization Problem (Topic 38)
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

export default Topic37;