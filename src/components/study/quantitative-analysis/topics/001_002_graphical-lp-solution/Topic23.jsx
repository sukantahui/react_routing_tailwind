import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic23_files/topic23_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic23_files/topic23_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic23 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showSlopeLine, setShowSlopeLine] = useState(true);
    const [showAllLines, setShowAllLines] = useState(false);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [slopeValue, setSlopeValue] = useState(-0.75);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples with different objective function slopes
    const examples = [
        {
            id: 0,
            name: "Steep Slope",
            description: "Z = 4x + 3y (slope = -4/3 ≈ -1.33)",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 4x + 3y",
            slope: -4/3,
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", Z: 0 },
                { x: 5, y: 0, label: "A (5,0)", Z: 20 },
                { x: 4, y: 3, label: "B (4,3)", Z: 25 },
                { x: 2, y: 4, label: "C (2,4)", Z: 20 },
                { x: 0, y: 5, label: "D (0,5)", Z: 15 },
            ],
            optimal: { x: 4, y: 3, Z: 25 },
            slopeExplanation: "Steep negative slope favors x over y",
            slopeComparison: "Steeper than -1, so x is more valuable"
        },
        {
            id: 1,
            name: "Gentle Slope",
            description: "Z = 2x + 4y (slope = -2/4 = -0.5)",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 2x + 4y",
            slope: -0.5,
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", Z: 0 },
                { x: 5, y: 0, label: "A (5,0)", Z: 10 },
                { x: 4, y: 3, label: "B (4,3)", Z: 20 },
                { x: 2, y: 4, label: "C (2,4)", Z: 20 },
                { x: 0, y: 5, label: "D (0,5)", Z: 20 },
            ],
            optimal: { x: "Multiple", y: "Multiple", Z: 20 },
            slopeExplanation: "Gentle negative slope creates multiple optima",
            slopeComparison: "Flatter than -1, so y is more valuable"
        },
        {
            id: 2,
            name: "Unit Slope",
            description: "Z = x + y (slope = -1)",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = x + y",
            slope: -1,
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", Z: 0 },
                { x: 5, y: 0, label: "A (5,0)", Z: 5 },
                { x: 4, y: 3, label: "B (4,3)", Z: 7 },
                { x: 2, y: 4, label: "C (2,4)", Z: 6 },
                { x: 0, y: 5, label: "D (0,5)", Z: 5 },
            ],
            optimal: { x: 4, y: 3, Z: 7 },
            slopeExplanation: "Unit slope gives balanced trade-off",
            slopeComparison: "Slope of -1 means x and y are equally weighted"
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

    // Get objective line points for a given Z value with specific slope
    const getObjectiveLinePoints = (Z, slope) => {
        const { objective } = currentExample;
        // Parse objective: "Z = ax + by"
        const parts = objective.replace("Z = ", "").split(" + ");
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
                const y = (Z - a * x) / b;
                if (y >= -0.5 && y <= range) {
                    points.push(toPixel(x, y));
                }
            }
        } else {
            const xVal = Z / a;
            if (xVal >= -0.5 && xVal &le; range) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        }
        return points;
    };

    // Get objective line at a specific Z value
    const getLineAtZ = (Z) => {
        return getObjectiveLinePoints(Z, currentExample.slope);
    };

    // Generate objective lines for different Z values
    const zValues = [4, 8, 12, 16, 20, 24];
    const allLines = zValues.map(Z => {
        return {
            Z,
            points: getLineAtZ(Z),
            isOptimal: Z === currentExample.optimal.Z,
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        Topic 23 — Objective Function Slope
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Slope of the <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-slate-700 to-gray-700 dark:from-slate-300 dark:to-gray-300 bg-clip-text text-transparent">
                            Objective Function
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Understand how the slope of the objective function determines which corner point is
                        optimal — the key to solving LP problems efficiently.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-gray-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is the Slope of the Objective Function? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        What is the Slope of the Objective Function?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            For the objective function <span className="font-mono">Z = ax + by</span>, the
                            <strong className="text-slate-700 dark:text-slate-300"> slope</strong> is{" "}
                            <span className="font-mono">-a/b</span>. This slope determines the <strong>direction</strong>{" "}
                            in which the objective function increases or decreases.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    <span className="font-mono">m = -a/b</span> for <span className="font-mono">Z = ax + by</span>
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300">Interpretation</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The slope shows the trade-off between x and y in the objective.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300">Importance</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Different slopes lead to different optimal corner points.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> The slope of the objective
                                function determines <strong>which corner point</strong> will be optimal. A small
                                change in the slope can change the optimal solution entirely!
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How Slope Affects the Optimal Solution ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/5 dark:hover:shadow-gray-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        How Slope Affects the Optimal Solution
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Steep Slope (m &lt; -1)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Favors x over y. The objective line is steeper, so the optimal point moves
                                    toward the x-axis.
                                </p>
                                <p className="text-xs font-mono mt-1">Example: Z = 4x + 3y (m = -1.33)</p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Gentle Slope (m &gt; -1)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Favors y over x. The objective line is flatter, so the optimal point moves
                                    toward the y-axis.
                                </p>
                                <p className="text-xs font-mono mt-1">Example: Z = 2x + 4y (m = -0.5)</p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Unit Slope (m = -1)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Balanced trade-off between x and y. The optimal point may be at a corner
                                    or along an edge.
                                </p>
                                <p className="text-xs font-mono mt-1">Example: Z = x + y (m = -1)</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Think about:</span> If x is more valuable
                                than y (higher coefficient), the slope is steeper. If y is more valuable, the
                                slope is flatter. The slope tells us the <strong>rate of substitution</strong>{" "}
                                between x and y in the objective.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Slope Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Slope Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select different objective functions to see how the slope affects which corner point
                            is optimal. Observe how the objective lines move in different directions.
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
                                            ? "bg-slate-700 dark:bg-slate-600 text-white border-slate-700 dark:border-slate-600 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
                                    )}
                                &gt;
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowSlopeLine(!showSlopeLine)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showSlopeLine
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showSlopeLine ? "Hide Lines" : "Show Lines"}
                            </button>
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
                                        ? "bg-green-600 text-white border-green-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showCornerPoints ? "Hide Corners" : "Show Corners"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Slope explorer">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t23" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="400" height="400" fill="url(#grid_t23)" />

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
                                                    fill="#64748b"
                                                    fillOpacity="0.08"
                                                    stroke="none"
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })()}

                                    {/* All objective lines */}
                                    {showAllLines && allLines.map((line, idx) => {
                                        if (line.points.length > 1) {
                                            const isOptimal = line.isOptimal;
                                            return (
                                                <polyline
                                                    key={idx}
                                                    points={line.points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={isOptimal ? "#f43f5e" : "#94a3b8"}
                                                    strokeWidth={isOptimal ? 3 : 1.5}
                                                    strokeDasharray={isOptimal ? "none" : "4,4"}
                                                    opacity={isOptimal ? 1 : 0.4}
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Current objective lines (showing slope) */}
                                    {showSlopeLine && (() => {
                                        const line1 = getLineAtZ(4);
                                        const line2 = getLineAtZ(12);
                                        const line3 = getLineAtZ(20);
                                        const lines = [
                                            { points: line1, label: "Z=4", opacity: 0.3 },
                                            { points: line2, label: "Z=12", opacity: 0.6 },
                                            { points: line3, label: "Z=20", opacity: 0.9 },
                                        ];
                                        return lines.map((line, idx) => {
                                            if (line.points.length > 1) {
                                                const isOptimal = line.label === `Z=${currentExample.optimal.Z}`;
                                                return (
                                                    <polyline
                                                        key={idx}
                                                        points={line.points.map(p => `${p.px},${p.py}`).join(' ')}
                                                        fill="none"
                                                        stroke={isOptimal ? "#f43f5e" : "#64748b"}
                                                        strokeWidth={isOptimal ? 3 : 2}
                                                        strokeDasharray={isOptimal ? "none" : "6,4"}
                                                        opacity={isOptimal ? 1 : line.opacity}
                                                        className={isOptimal ? "animate-[pulse_1.5s_ease-in-out_infinite]" : ""}
                                                    /&gt;
                                                );
                                            }
                                            return null;
                                        });
                                    })()}

                                    {/* Slope indicator */}
                                    {showSlopeLine && (
                                        <g>
                                            <rect x="20" y="50" width="160" height="24" rx="4" fill="white" fillOpacity="0.9" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                            <text x="28" y="66" fontSize="11" fill="#475569" className="dark:fill-slate-400 font-mono">
                                                Slope = {currentExample.slope.toFixed(2)}
                                            </text>
                                        </g>
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
                                                <g key={`t23-tick-${v}`}>
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
                                            ((currentExample.optimal.x === "Multiple" && cp.Z === currentExample.optimal.Z) ||
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
                                                    Z={cp.Z}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Optimal label */}
                                    {currentExample.optimal && (
                                        <g>
                                            <rect x="20" y="80" width="200" height="50" rx="4" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1" />
                                            <text x="28" y="96" fontSize="10" fill="#f43f5e" className="font-bold">
                                                Optimal: {currentExample.optimalExplanation}
                                            </text>
                                            <text x="28" y="110" fontSize="9" fill="#f43f5e">
                                                {currentExample.slopeExplanation}
                                            </text>
                                            <text x="28" y="122" fontSize="9" fill="#f43f5e">
                                                {currentExample.slopeComparison}
                                            </text>
                                        </g>
                                    )}

                                    {/* Objective function display */}
                                    <text x="20" y="380" fontSize="11" fill="#64748b" className="font-mono font-bold">
                                        {currentExample.objective}
                                    </text>
                                </svg>
                            </div>

                            {/* Information panel */}
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[400px]">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                    Slope Analysis
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                        <p className="text-sm font-mono">
                                            {currentExample.objective}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Slope = {currentExample.slope.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                            Corner Point Z Values
                                        </p>
                                        <div className="mt-2 space-y-1">
                                            {currentExample.cornerPoints.map((cp, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span className="font-mono">{cp.label}</span>
                                                    <span className="font-mono">Z = {cp.Z}</span>
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
                                            {currentExample.slopeExplanation}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {currentExample.slopeComparison}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                            💡 How to Interpret
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                            • Slope = -a/b tells the trade-off<br/>
                                            • Steeper slope (m &lt; -1) favors x<br/>
                                            • Flatter slope (m &gt; -1) favors y<br/>
                                            • Slope = -1 gives balanced trade-off
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full mr-2">
                                {currentExample.objective}
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                Slope = {currentExample.slope.toFixed(2)}
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full ml-2">
                                Optimal Z = {currentExample.optimal.Z}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Real-World Examples ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
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
                            <div className="font-semibold text-slate-700 dark:text-slate-300">Steep Slope</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-slate-600 dark:text-slate-400">Ichapur</span>{" "}
                                has Z = 4x + 3y. The steep slope means product x is more profitable than y.
                                The optimal solution favors producing more x.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-slate-700 dark:text-slate-300">Gentle Slope</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-slate-600 dark:text-slate-400">Kolkata</span>,
                                a company has Z = 2x + 4y. The gentle slope means product y is more profitable.
                                The optimal solution favors producing more y.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-slate-700 dark:text-slate-300">Unit Slope</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-slate-600 dark:text-slate-400">Mamata</span>{" "}
                                has Z = x + y, where both variables are equally important. The optimal solution
                                depends on the constraints.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-slate-700 dark:text-slate-300">Changing Slope</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-slate-600 dark:text-slate-400">Jadavpur</span>,
                                a business changes its objective function slope by adjusting prices. This changes
                                which product is more profitable.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
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
                                <li>Slope = -a/b for Z = ax + by</li>
                                <li>Steeper slope (m &lt; -1) favors x</li>
                                <li>Flatter slope (m &gt; -1) favors y</li>
                                <li>Slope = -1 gives balanced trade-off</li>
                                <li>The slope determines which corner is optimal</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Forgetting the negative sign in the slope</li>
                                <li>Misinterpreting the slope direction</li>
                                <li>Assuming slope doesn't affect the optimal solution</li>
                                <li>Not checking how slope compares to constraint slopes</li>
                                <li>Ignoring the relationship between slope and objective coefficients</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always calculate the objective function slope</li>
                                <li>Compare slope to constraint slopes</li>
                                <li>Use slope to predict which corner is optimal</li>
                                <li>Remember that slope = -a/b</li>
                                <li>Check how changes in coefficients affect the slope</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 7: Mini Checklist ===== */}
                <section
                    ref={(el) => (sectionRefs.current[6] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
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
                            <span>I can calculate the slope of the objective function.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that slope = -a/b for Z = ax + by.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that steeper slopes favor x over y.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that flatter slopes favor y over x.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can predict which corner is optimal based on the slope.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand how changing coefficients affects the slope.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Slope of the Objective Function – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Slope of the Objective Function – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic23_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "The slope of the objective function is often overlooked but it's crucial. I tell my students: 'The slope tells you which variable is more valuable.' A simple rule: if the slope is steeper than -1 (m < -1), x is more valuable. If it's flatter than -1 (m > -1), y is more valuable. If it's exactly -1, they're equally valuable. This insight helps students understand why different objective functions lead to different optimal solutions."
                        }
                    /&gt;
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 23 — Slope of the Objective Function &bull; Understanding trade-offs
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Moving the Objective Function Line Parallel (Topic 24)
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

export default Topic23;