import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic22_files/topic22_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic22_files/topic22_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic22 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [costValue, setCostValue] = useState(12);
    const [showIsoCostLines, setShowIsoCostLines] = useState(true);
    const [showAllLines, setShowAllLines] = useState(false);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [animateLines, setAnimateLines] = useState(false);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples with different cost functions
    const examples = [
        {
            id: 0,
            name: "Diet Cost Minimization",
            description: "Minimize cost of two food items",
            constraints: [
                { label: "2x + y ≥ 6", a: 2, b: 1, c: 6, sign: "≥", color: "#8b5cf6" },
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            costFunction: "C = 2x + 3y",
            cornerPoints: [
                { x: 0, y: 4, label: "A (0,4)", C: 12 },
                { x: 2, y: 2, label: "B (2,2)", C: 10 },
                { x: 3, y: 0, label: "C (3,0)", C: 6 },
            ],
            optimal: { x: 3, y: 0, C: 6 },
            direction: "Decreasing cost moves toward the origin",
            optimalExplanation: "C (3,0) gives minimum cost of ₹6",
            isoCostLines: [
                { C: 4, label: "C=4 (Unattainable)" },
                { C: 6, label: "C=6 (Optimal)" },
                { C: 8, label: "C=8" },
                { C: 10, label: "C=10" },
                { C: 12, label: "C=12" },
            ]
        },
        {
            id: 1,
            name: "Production Cost Minimization",
            description: "Minimize production cost with resource constraints",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "2x + y ≥ 8", a: 2, b: 1, c: 8, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            costFunction: "C = 4x + 3y",
            cornerPoints: [
                { x: 0, y: 5, label: "A (0,5)", C: 15 },
                { x: 3, y: 2, label: "B (3,2)", C: 18 },
                { x: 4, y: 0, label: "C (4,0)", C: 16 },
            ],
            optimal: { x: 0, y: 5, C: 15 },
            direction: "Decreasing cost moves toward the origin",
            optimalExplanation: "A (0,5) gives minimum cost of ₹15",
            isoCostLines: [
                { C: 10, label: "C=10 (Unattainable)" },
                { C: 12, label: "C=12" },
                { C: 15, label: "C=15 (Optimal)" },
                { C: 18, label: "C=18" },
                { C: 20, label: "C=20" },
            ]
        },
        {
            id: 2,
            name: "Multiple Optima Cost",
            description: "Cost function parallel to a constraint",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            costFunction: "C = 2x + 2y",
            cornerPoints: [
                { x: 0, y: 5, label: "A (0,5)", C: 10 },
                { x: 5, y: 0, label: "B (5,0)", C: 10 },
            ],
            optimal: { x: "Multiple", y: "Multiple", C: 10 },
            direction: "Cost decreases along the line x+y = k",
            optimalExplanation: "Multiple optima along the edge x+y=5 (C=10)",
            isoCostLines: [
                { C: 4, label: "C=4 (Unattainable)" },
                { C: 6, label: "C=6" },
                { C: 8, label: "C=8" },
                { C: 10, label: "C=10 (Optimal)" },
                { C: 12, label: "C=12" },
            ]
        },
    ];

    const currentExample = examples[selectedExample];

    // Helper: convert coordinates to SVG pixels (scale: 1 unit = 40px)
    const toPixel = (x, y) => ({
        px: 200 + x * 40,
        py: 200 - y * 40,
    });

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const range = 12;
        if (b !== 0 && a !== 0) {
            for (let x = -0.5; x &le; range; x += 0.05) {
                const y = (c - a * x) / b;
                if (y >= -0.5 && y <= range) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -0.5 && xVal &le; range) {
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

    // Determine if a constraint is solid (≥ or ≤)
    const isSolid = (sign) => sign === "≥" || sign === "≤";

    // Get shading polygon for a specific constraint
    const getConstraintShading = (a, b, c, sign) => {
        const pts = [];
        const range = 12;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(range);
                    if (yRight &ge; -0.5 && yRight &le; range) {
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
                    if (yRight >= -0.5 && yRight &le; range) {
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
                    if (yRight &ge; -0.5 && yRight &le; range) {
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
                    if (yRight >= -0.5 && yRight &le; range) {
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
            if (sign === "≥" || sign === "&gt;") {
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
        return pts.filter(p => p.px &ge; 200 && p.px &le; 380 && p.py >= 20 && p.py <= 380);
    };

    // Get feasible region shading
    const getFeasibleRegionShading = () => {
        const pts = currentExample.cornerPoints.map(p => toPixel(p.x, p.y));
        return pts;
    };

    // Get iso-cost line points for a given cost value
    const getIsoCostLinePoints = (C) => {
        const { costFunction } = currentExample;
        // Parse cost function: "C = 2x + 3y" or "C = 2x + 2y"
        const parts = costFunction.replace("C = ", "").split(" + ");
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
            for (let x = -0.5; x &le; range; x += 0.05) {
                const y = (C - a * x) / b;
                if (y >= -0.5 && y <= range) {
                    points.push(toPixel(x, y));
                }
            }
        } else {
            // Vertical line
            const xVal = C / a;
            if (xVal >= -0.5 && xVal &le; range) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        }
        return points;
    };

    const currentLinePoints = getIsoCostLinePoints(costValue);

    // Generate all iso-cost lines
    const allLines = currentExample.isoCostLines.map(line => {
        return {
            C: line.C,
            points: getIsoCostLinePoints(line.C),
            label: line.label,
            isOptimal: line.C === currentExample.optimal.C,
            isCurrent: line.C === costValue,
            isUnattainable: line.label.includes("Unattainable"),
        };
    });

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

    // Find min and max C values for slider
    const cValues = currentExample.cornerPoints.map(cp => cp.C);
    const minC = Math.min(...cValues);
    const maxC = Math.max(...cValues);
    const rangeC = maxC - minC || 10;

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        Topic 22 — Iso-Cost Lines
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        The <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            Iso-Cost Line
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Understand iso-cost lines — the key to visually finding the minimum cost in linear
                        programming minimization problems.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is an Iso-Cost Line? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">💰</span>
                        What is an Iso-Cost Line?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            An <strong className="text-blue-600 dark:text-blue-400">iso-cost line</strong> (from
                            Greek "iso" meaning equal) is a line on which the <strong>cost</strong> is constant.
                            All points on an iso-cost line give the same cost value.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    A line where cost (C) is constant: <span className="font-mono">C = ax + by</span>
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Purpose</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Used to find the minimum cost by moving parallel lines inward.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">Key Property</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    All iso-cost lines are parallel to each other.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Real-world analogy:</span> Think of iso-cost
                                lines like budget lines. Just as a budget line shows all combinations you can
                                buy for a fixed amount of money, an iso-cost line shows all combinations that
                                cost the same amount.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Use Iso-Cost Lines ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📉</span>
                        How to Use Iso-Cost Lines
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Step 1: Choose a cost</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Pick a cost value (e.g., C = 12).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Step 2: Draw the line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plot the iso-cost line for that cost value.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">Step 3: Move inward</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Move the line parallel inward toward the origin until it just touches the
                                    feasible region. The first point of contact is the optimal solution.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> The optimal cost is the
                                <strong>lowest</strong> cost value for which the iso-cost line still intersects
                                the feasible region. Moving any further inward would leave the region.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Iso-Cost Explorer ===== */}
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
                        <span className="text-3xl">🖱️</span>
                        Interactive Iso-Cost Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem and adjust the cost slider to see different iso-cost lines.
                            Find the minimum cost where the line just touches the feasible region.
                        </p>

                        {/* Example selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {examples.map((ex) => (
                                <button
                                    key={ex.id}
                                    onClick={() => {
                                        setSelectedExample(ex.id);
                                        const midC = (ex.cornerPoints.reduce((sum, cp) => sum + cp.C, 0) / ex.cornerPoints.length);
                                        setCostValue(Math.round(midC / 2) * 2 || 8);
                                    }}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                        selectedExample === ex.id
                                            ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowIsoCostLines(!showIsoCostLines)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showIsoCostLines
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showIsoCostLines ? "Hide Line" : "Show Line"}
                            </button>
                            <button
                                onClick={() => setShowAllLines(!showAllLines)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showAllLines
                                        ? "bg-purple-600 text-white border-purple-600"
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
                                        ? "bg-green-600 text-white border-green-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showCornerPoints ? "Hide Corners" : "Show Corners"}
                            </button>
                            <button
                                onClick={() => setAnimateLines(!animateLines)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    animateLines
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {animateLines ? "Stop" : "Animate"}
                            </button>
                        </div>

                        {/* Cost slider */}
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Cost C =</span>
                                <input
                                    type="range"
                                    min={Math.max(0, minC - rangeC * 0.2)}
                                    max={maxC + rangeC * 0.4}
                                    step={1}
                                    value={costValue}
                                    onChange={(e) => setCostValue(parseFloat(e.target.value))}
                                    className="flex-1 accent-blue-500"
                                /&gt;
                                <span className="text-sm font-mono font-bold text-blue-700 dark:text-blue-300 min-w-[40px]">
                                    ₹{costValue.toFixed(0)}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span>C = ₹{minC} (min)</span>
                                <span>C = ₹{maxC} (max)</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Iso-cost explorer">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t22" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="400" height="400" fill="url(#grid_t22)" />

                                    {/* Shading for all constraints */}
                                    {currentExample.constraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            return (
                                                <polygon
                                                    key={`shade-${con.label}`}
                                                    points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill={con.color}
                                                    fillOpacity="0.06"
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
                                                    fill="#3b82f6"
                                                    fillOpacity="0.08"
                                                    stroke="none"
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })()}

                                    {/* All iso-cost lines */}
                                    {showAllLines && allLines.map((line, idx) => {
                                        if (line.points.length > 1) {
                                            const isOptimal = line.isOptimal;
                                            const isUnattainable = line.isUnattainable;
                                            return (
                                                <polyline
                                                    key={idx}
                                                    points={line.points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={isOptimal ? "#f43f5e" : isUnattainable ? "#94a3b8" : "#3b82f6"}
                                                    strokeWidth={isOptimal ? 3 : isUnattainable ? 1 : 2}
                                                    strokeDasharray={isOptimal ? "none" : isUnattainable ? "2,4" : "4,4"}
                                                    opacity={isOptimal ? 1 : isUnattainable ? 0.3 : 0.5}
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Current iso-cost line */}
                                    {showIsoCostLines && currentLinePoints.length > 1 && (
                                        <polyline
                                            points={currentLinePoints.map(p => `${p.px},${p.py}`).join(' ')}
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="3"
                                            strokeDasharray="8,4"
                                            className={animateLines ? "animate-[pulse_1.5s_ease-in-out_infinite]" : ""}
                                        /&gt;
                                    )}

                                    {/* Current line label */}
                                    {showIsoCostLines && currentLinePoints.length > 1 && (
                                        <text
                                            x="20"
                                            y="50"
                                            fontSize="12"
                                            fill="#3b82f6"
                                            className="font-mono font-bold"
                                        >
                                            C = ₹{costValue.toFixed(0)}
                                        </text>
                                    )}

                                    {/* Axes */}
                                    <line x1="200" y1="200" x2="380" y2="200" stroke="#1e293b" strokeWidth="2.5" className="dark:stroke-slate-300" />
                                    <line x1="200" y1="380" x2="200" y2="20" stroke="#1e293b" strokeWidth="2.5" className="dark:stroke-slate-300" />
                                    <polygon points="380,195 395,200 380,205" fill="#1e293b" className="dark:fill-slate-300" />
                                    <polygon points="195,20 200,5 205,20" fill="#1e293b" className="dark:fill-slate-300" />
                                    <text x="385" y="215" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">x</text>
                                    <text x="210" y="22" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">y</text>

                                    {/* Origin */}
                                    <circle cx="200" cy="200" r="5" fill="#ef4444" />
                                    <text x="205" y="215" fontSize="14" fill="#1e293b" className="dark:fill-slate-300 font-medium">O</text>

                                    {/* Tick marks */}
                                    {[40, 80, 120, 160, 240, 280, 320, 360].map((v) => {
                                        const val = (v - 200) / 40;
                                        if (val &ge; 0 && val &le; 12) {
                                            return (
                                                <g key={`t22-tick-${v}`}>
                                                    <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                    <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                    {v &ge; 40 && v &le; 360 && val !== 0 && val <= 10 && (
                                                        <>
                                                            <text x={v - 4} y="218" fontSize="11" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                            <text x="178" y={v + 5} fontSize="11" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                        </>
                                                    )}
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
                                                    strokeWidth="2.5"
                                                    strokeDasharray={solid ? "none" : "8,6"}
                                                    opacity="0.7"
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Corner points */}
                                    {showCornerPoints && currentExample.cornerPoints.map((cp, idx) => {
                                        const { px, py } = toPixel(cp.x, cp.y);
                                        const isOptimal = currentExample.optimal && 
                                            ((currentExample.optimal.x === "Multiple" && cp.C === currentExample.optimal.C) ||
                                             (cp.x === currentExample.optimal.x && cp.y === currentExample.optimal.y));
                                        const color = isOptimal ? "#f43f5e" : "#94a3b8";
                                        return (
                                            <g key={`cp-${idx}`}>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r={isOptimal ? 10 : 6}
                                                    fill={color}
                                                    stroke="#fff"
                                                    strokeWidth={isOptimal ? 3 : 2}
                                                    className={isOptimal ? "animate-[pulse_1.5s_ease-in-out_infinite]" : ""}
                                                />
                                                <text
                                                    x={px + 12}
                                                    y={py - 10}
                                                    fontSize={isOptimal ? 12 : 10}
                                                    fill={color}
                                                    className="font-mono"
                                                >
                                                    {cp.label}
                                                </text>
                                                <text
                                                    x={px + 12}
                                                    y={py + 6}
                                                    fontSize={9}
                                                    fill={color}
                                                    className="font-mono"
                                                >
                                                    C=₹{cp.C}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Optimal label */}
                                    {currentExample.optimal && (
                                        <div>
                                        <rect x="20" y="70" width="200" height="50" rx="4" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1" />
                                        <text x="28" y="86" fontSize="10" fill="#f43f5e" className="font-bold">
                                            Optimal: {currentExample.optimalExplanation}
                                        </text>
                                        <text x="28" y="100" fontSize="9" fill="#f43f5e">
                                            {currentExample.direction}
                                        </text>
                                        <text x="28" y="112" fontSize="9" fill="#f43f5e">
                                            Min Cost: ₹{currentExample.optimal.C}
                                        </text>
                                        </div>
                                    )}

                                    {/* Cost function display */}
                                    <text x="20" y="380" fontSize="11" fill="#3b82f6" className="font-mono font-bold">
                                        {currentExample.costFunction}
                                    </text>

                                    {/* Legend */}
                                    <rect x="280" y="20" width="100" height="50" rx="4" fill="white" fillOpacity="0.9" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                    <text x="288" y="36" fontSize="9" fill="#3b82f6" className="font-medium">Current C</text>
                                    <rect x="288" y="42" width="30" height="3" fill="#3b82f6" />
                                    {showAllLines && (
                                        <text x="288" y="55" fontSize="8" fill="#94a3b8">Multiple lines shown</text>
                                    )}
                                </svg>
                            </div>

                            {/* Information panel */}
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[400px]">
                                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">
                                    Iso-Cost Analysis
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                        <p className="text-sm font-mono">
                                            {currentExample.costFunction}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Current Cost = ₹{costValue.toFixed(0)}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                                        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                                            Cost at Corner Points
                                        </p>
                                        <div className="mt-2 space-y-1">
                                            {currentExample.cornerPoints.map((cp, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span className="font-mono">{cp.label}</span>
                                                    <span className="font-mono">₹{cp.C}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={clsx(
                                        "p-3 rounded-lg border",
                                        "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800"
                                    )}>
                                        <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                            🎯 Optimal Solution
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {currentExample.optimalExplanation}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            {currentExample.direction}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                            💡 How to Use
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                            • Move the slider to change cost<br/>
                                            • The iso-cost line moves inward/outward<br/>
                                            • Find the lowest cost that still touches the region<br/>
                                            • That's your minimum cost!
                                        </p>
                                    </div>

                                    {showAllLines && (
                                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                            <p className="text-xs text-purple-700 dark:text-purple-300">
                                                ✓ Showing all iso-cost lines. Red line is optimal.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full mr-2">
                                {currentExample.costFunction}
                            </span>
                            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full">
                                {currentExample.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full ml-2">
                                Min Cost = ₹{currentExample.optimal.C}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Key Properties of Iso-Cost Lines ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        Key Properties of Iso-Cost Lines
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">✓ Parallel</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    All iso-cost lines are parallel. They never intersect.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">✓ Equal Cost</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Every point on an iso-cost line gives the same cost.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">✓ Direction</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Lower costs are in the direction toward the origin.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">✓ Optimal</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The optimal cost line is the one that just touches the feasible region.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: Real-World Examples ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[4]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🌍</span>
                        Real-World Examples
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-blue-600 dark:text-blue-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-blue-600 dark:text-blue-400">Mamata</span>{" "}
                                uses iso-cost lines to minimize her food costs while meeting nutritional
                                requirements. Moving the cost line inward finds the cheapest meal plan.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-indigo-600 dark:text-indigo-400">Production</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-indigo-600 dark:text-indigo-400">Ichapur</span>{" "}
                                uses iso-cost lines to minimize production costs. Each line represents a
                                different cost level. The lowest cost line that touches the feasible region
                                gives the minimum cost.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-violet-600 dark:text-violet-400">Transportation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-violet-600 dark:text-violet-400">Kolkata</span>,
                                a logistics company uses iso-cost lines to minimize transportation costs
                                while meeting delivery requirements.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Investment</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-amber-600 dark:text-amber-400">Jadavpur</span>{" "}
                                uses iso-cost lines to minimize risk while meeting return requirements.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[5]
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
                                <li>All iso-cost lines are parallel — check the slope.</li>
                                <li>Move lines inward to find lower cost.</li>
                                <li>The optimal line just touches the feasible region.</li>
                                <li>Use intercepts to quickly draw iso-cost lines.</li>
                                <li>Check corner points to verify the minimum cost.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Moving iso-cost lines outward (should move inward for min).</li>
                                <li>Drawing lines that aren't parallel.</li>
                                <li>Forgetting that the optimal line can overlap an edge.</li>
                                <li>Not checking if the line still intersects the region.</li>
                                <li>Misreading the cost function coefficients.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Start with a convenient cost value.</li>
                                <li>Draw multiple iso-cost lines to see the pattern.</li>
                                <li>Find the line with the lowest cost that still touches the region.</li>
                                <li>Verify the optimal point is a corner point.</li>
                                <li>Use the interactive tool to build intuition.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 7: Mini Checklist ===== */}
                <section
                    ref={(el) => (sectionRefs.current[6] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[6]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Mini Checklist
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can draw an iso-cost line for a given cost value.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that all iso-cost lines are parallel.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can move iso-cost lines inward to find minimum cost.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify the optimal iso-cost line.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the minimum cost from the optimal line.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can handle cases with multiple optimal solutions.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Iso-Cost Lines – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Iso-Cost Lines – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic22_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Iso-cost lines are the mirror image of iso-profit lines. I tell my students: 'If iso-profit lines are about making money, iso-cost lines are about saving money.' The key difference is direction — for cost minimization, you move the lines inward toward the origin. A great exercise: give students the same feasible region and have them find both the maximum profit and minimum cost. This helps them understand the relationship between the two concepts."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 22 — Iso-Cost Lines &bull; Finding minimum cost graphically
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Slope of the Objective Function (Topic 23)
                    </p>
                </footer>

            </div>

            {/* ===== GLOBAL KEYFRAMES ===== */}
            <style>{`
                @keyframes fadeUp {
                    0% { opacity: 0; transform: translateY(24px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.3); opacity: 1; }
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
                    .animate-\\[pulse_1\\.5s_ease-in-out_infinite\\] {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic22;