import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic20_files/topic20_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic20_files/topic20_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic20 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [objectiveValue, setObjectiveValue] = useState(12);
    const [showObjectiveLine, setShowObjectiveLine] = useState(true);
    const [showAllLines, setShowAllLines] = useState(false);
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

    // Examples with different objective functions
    const examples = [
        {
            id: 0,
            name: "Profit Maximization",
            description: "Z = 3x + 4y",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 3x + 4y",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", Z: 0 },
                { x: 5, y: 0, label: "A (5,0)", Z: 15 },
                { x: 4, y: 3, label: "B (4,3)", Z: 24 },
                { x: 2, y: 4, label: "C (2,4)", Z: 22 },
                { x: 0, y: 5, label: "D (0,5)", Z: 20 },
            ],
            optimal: { x: 4, y: 3, Z: 24 },
            direction: "Increasing Z moves to the right and up",
            optimalExplanation: "B (4,3) is optimal with Z = 24",
            intercepts: [
                { Z: 12, xInt: 4, yInt: 3 },
                { Z: 20, xInt: 6.67, yInt: 5 },
                { Z: 24, xInt: 8, yInt: 6 },
                { Z: 30, xInt: 10, yInt: 7.5 },
            ]
        },
        {
            id: 1,
            name: "Cost Minimization",
            description: "Z = 2x + 3y",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "2x + y ≥ 6", a: 2, b: 1, c: 6, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 2x + 3y",
            cornerPoints: [
                { x: 0, y: 4, label: "A (0,4)", Z: 12 },
                { x: 2, y: 2, label: "B (2,2)", Z: 10 },
                { x: 3, y: 0, label: "C (3,0)", Z: 6 },
            ],
            optimal: { x: 3, y: 0, Z: 6 },
            direction: "Decreasing Z moves to the left and down",
            optimalExplanation: "C (3,0) is optimal with Z = 6",
            intercepts: [
                { Z: 6, xInt: 3, yInt: 2 },
                { Z: 10, xInt: 5, yInt: 3.33 },
                { Z: 12, xInt: 6, yInt: 4 },
                { Z: 18, xInt: 9, yInt: 6 },
            ]
        },
        {
            id: 2,
            name: "Multiple Optima",
            description: "Z = x + y (parallel to constraint)",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = x + y",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", Z: 0 },
                { x: 10, y: 0, label: "A (10,0)", Z: 10 },
                { x: 0, y: 10, label: "B (0,10)", Z: 10 },
            ],
            optimal: { x: "Multiple", y: "Multiple", Z: 10 },
            direction: "Z increases along the line x+y = k",
            optimalExplanation: "Multiple optima along the edge x+y=10",
            intercepts: [
                { Z: 4, xInt: 4, yInt: 4 },
                { Z: 8, xInt: 8, yInt: 8 },
                { Z: 10, xInt: 10, yInt: 10 },
                { Z: 12, xInt: 12, yInt: 12 },
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

    // Get objective line points for a given Z value
    const getObjectiveLinePoints = (Z) => {
        const { objective } = currentExample;
        // Parse objective: "Z = 3x + 4y" or "Z = x + y"
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
            // Vertical line
            const xVal = Z / a;
            if (xVal >= -0.5 && xVal &le; range) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        }
        return points;
    };

    const currentLinePoints = getObjectiveLinePoints(objectiveValue);

    // Generate all objective lines
    const allLines = currentExample.intercepts.map(intercept => {
        const Z = intercept.Z;
        return {
            Z,
            points: getObjectiveLinePoints(Z),
            isOptimal: Z === currentExample.optimal.Z,
            isCurrent: Z === objectiveValue,
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

    // Find min and max Z values for slider
    const zValues = currentExample.cornerPoints.map(cp => cp.Z);
    const minZ = Math.min(...zValues);
    const maxZ = Math.max(...zValues);
    const rangeZ = maxZ - minZ || 10;

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                        Topic 20 — Objective Function Line
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        The <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Objective Function Line
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Understand the objective function line — how it's drawn, how it moves, and how to use it
                        to find the optimal solution in linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-violet-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is the Objective Function Line? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        What is the Objective Function Line?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-violet-600 dark:text-violet-400">objective function line</strong>{" "}
                            (also called <strong className="text-purple-600 dark:text-purple-400">iso-profit</strong>{" "}
                            or <strong className="text-purple-600 dark:text-purple-400">iso-cost line</strong>) is
                            the graphical representation of the objective function for a specific value of Z.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    A line where the objective function value is constant.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Purpose</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Used to find the optimal solution by moving it parallel across the feasible region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800/50">
                                <h3 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Key Property</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    All objective function lines are parallel to each other.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> The objective function
                                line represents all points with the same Z value. Moving the line parallel to
                                itself changes Z, allowing us to find the optimal value.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Draw the Objective Line ===== */}
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
                        How to Draw the Objective Function Line
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">Step 1: Pick a Z value</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Choose any convenient value for Z (e.g., Z = 12).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Step 2: Find intercepts</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Set x=0 to find y-intercept, set y=0 to find x-intercept.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800/50">
                                <h3 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Step 3: Plot and draw</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plot the intercepts and draw a straight line through them.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 4: Move parallel</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    For different Z values, draw parallel lines at different positions.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Pro tip:</span> For <span className="font-mono">Z = ax + by</span>,
                                the x-intercept is <span className="font-mono">Z/a</span> and the y-intercept is{" "}
                                <span className="font-mono">Z/b</span>. This makes it easy to draw lines for
                                different Z values.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Objective Line Explorer ===== */}
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
                        <span className="text-3xl">🖱️</span>
                        Interactive Objective Line Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem and adjust the Z value to see how the objective line moves. Toggle
                            "Show All Lines" to see multiple objective lines at once.
                        </p>

                        {/* Example selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {examples.map((ex) => (
                                <button
                                    key={ex.id}
                                    onClick={() => {
                                        setSelectedExample(ex.id);
                                        setObjectiveValue(Math.round((ex.cornerPoints.reduce((sum, cp) => sum + cp.Z, 0) / ex.cornerPoints.length) / 5) * 5 || 10);
                                    }}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                        selectedExample === ex.id
                                            ? "bg-violet-600 dark:bg-violet-500 text-white border-violet-600 dark:border-violet-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-violet-400 dark:hover:border-violet-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowObjectiveLine(!showObjectiveLine)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showObjectiveLine
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showObjectiveLine ? "Hide Line" : "Show Line"}
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
                                {showAllLines ? "Hide All Lines" : "Show All Lines"}
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

                        {/* Z value slider */}
                        <div className="mb-4 p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Z =</span>
                                <input
                                    type="range"
                                    min={Math.max(0, minZ - rangeZ * 0.3)}
                                    max={maxZ + rangeZ * 0.3}
                                    step={0.5}
                                    value={objectiveValue}
                                    onChange={(e) => setObjectiveValue(parseFloat(e.target.value))}
                                    className="flex-1 accent-violet-500"
                                /&gt;
                                <span className="text-sm font-mono font-bold text-violet-700 dark:text-violet-300 min-w-[40px]">
                                    {objectiveValue.toFixed(1)}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span>Z = {minZ.toFixed(1)} (min)</span>
                                <span>Z = {maxZ.toFixed(1)} (max)</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Objective line explorer">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t20" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="400" height="400" fill="url(#grid_t20)" />

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
                                                    fill="#8b5cf6"
                                                    fillOpacity="0.1"
                                                    stroke="none"
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })()}

                                    {/* All objective lines */}
                                    {showAllLines && allLines.map((line, idx) => {
                                        if (line.points.length > 1) {
                                            const isOptimal = line.Z === currentExample.optimal.Z;
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

                                    {/* Current objective line */}
                                    {showObjectiveLine && currentLinePoints.length > 1 && (
                                        <polyline
                                            points={currentLinePoints.map(p => `${p.px},${p.py}`).join(' ')}
                                            fill="none"
                                            stroke="#f43f5e"
                                            strokeWidth="3"
                                            strokeDasharray="8,4"
                                        /&gt;
                                    )}

                                    {/* Current objective line label */}
                                    {showObjectiveLine && currentLinePoints.length > 1 && (
                                        <text
                                            x="20"
                                            y="50"
                                            fontSize="12"
                                            fill="#f43f5e"
                                            className="font-mono font-bold"
                                        >
                                            Z = {objectiveValue.toFixed(1)}
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
                                                <g key={`t20-tick-${v}`}>
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
                                                    className=""
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
                                            <rect
                                                x="20"
                                                y="70"
                                                width="190"
                                                height="40"
                                                rx="4"
                                                fill="#f43f5e"
                                                fillOpacity="0.15"
                                                stroke="#f43f5e"
                                                strokeWidth="1"
                                            />

                                            <text
                                                x="28"
                                                y="86"
                                                fontSize="10"
                                                fill="#f43f5e"
                                                className="font-bold"
                                            >
                                                Optimal: {currentExample.optimalExplanation}
                                            </text>

                                            <text
                                                x="28"
                                                y="100"
                                                fontSize="9"
                                                fill="#f43f5e"
                                            >
                                                {currentExample.direction}
                                            </text>
                                        </g>
                                    )}

                                    {/* Objective function display */}
                                    <text x="20" y="380" fontSize="11" fill="#8b5cf6" className="font-mono font-bold">
                                        {currentExample.objective}
                                    </text>
                                </svg>
                            </div>

                            {/* Information panel */}
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[400px]">
                                <h3 className="font-semibold text-violet-600 dark:text-violet-400 mb-3">
                                    Objective Line Analysis
                                </h3>

                                <div className="space-y-3">
                                    <div className="p-3 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">
                                        <p className="text-sm font-mono">
                                            {currentExample.objective}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Current Z = {objectiveValue.toFixed(1)}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                            Intercepts for Z = {objectiveValue.toFixed(1)}
                                        </p>
                                        <div className="mt-2 space-y-1 text-sm">
                                            <p className="font-mono">
                                                x-intercept: {objectiveValue !== 0 && (() => {
                                                    const parts = currentExample.objective.replace("Z = ", "").split(" + ");
                                                    let a = 0;
                                                    parts.forEach(part => {
                                                        if (part.includes("x")) {
                                                            a = parseFloat(part.replace("x", "")) || 1;
                                                        }
                                                    });
                                                    return (objectiveValue / a).toFixed(2);
                                                })()}
                                            </p>
                                            <p className="font-mono">
                                                y-intercept: {objectiveValue !== 0 && (() => {
                                                    const parts = currentExample.objective.replace("Z = ", "").split(" + ");
                                                    let b = 0;
                                                    parts.forEach(part => {
                                                        if (part.includes("y")) {
                                                            b = parseFloat(part.replace("y", "")) || 1;
                                                        }
                                                    });
                                                    return (objectiveValue / b).toFixed(2);
                                                })()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                            💡 How to Use
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                            • Move the slider to change Z<br />
                                            • The objective line moves parallel<br />
                                            • For max: find the line farthest from origin that touches the region<br />
                                            • For min: find the line closest to origin that touches the region
                                        </p>
                                    </div>

                                    {showAllLines && (
                                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                            <p className="text-xs text-purple-700 dark:text-purple-300">
                                                ✓ Showing all objective lines. The red line is the optimal one.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 rounded-full mr-2">
                                {currentExample.objective}
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {currentExample.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full ml-2">
                                Optimal Z = {currentExample.optimal.Z}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Intercepts of the Objective Line ===== */}
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
                        Intercepts of the Objective Line
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            For the objective function <span className="font-mono">Z = ax + by</span>, the
                            intercepts are:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">x-intercept</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Set y = 0: <span className="font-mono">x = Z/a</span>
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                    The point where the objective line crosses the x-axis.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">y-intercept</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Set x = 0: <span className="font-mono">y = Z/b</span>
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                    The point where the objective line crosses the y-axis.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Pro tip:</span> The intercepts make it easy
                                to draw the objective line for any Z value. Just plot <span className="font-mono">(Z/a, 0)</span>{" "}
                                and <span className="font-mono">(0, Z/b)</span> and draw the line through them.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: Real-World Examples ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
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
                            <div className="font-semibold text-violet-600 dark:text-violet-400">Profit Maximization</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-violet-600 dark:text-violet-400">Ichapur</span>{" "}
                                uses the objective line <span className="font-mono">Z = 3x + 4y</span> to find the
                                optimal production mix. Moving the line upward from Z=12 to Z=24 finds the maximum
                                profit at B (4,3).
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-purple-600 dark:text-purple-400">Cost Minimization</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-purple-600 dark:text-purple-400">Kolkata</span>,
                                a company uses <span className="font-mono">Z = 2x + 3y</span> to minimize costs.
                                Moving the line downward from Z=12 to Z=6 finds the minimum at C (3,0).
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">Investment</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-fuchsia-600 dark:text-fuchsia-400">Jadavpur</span>{" "}
                                uses <span className="font-mono">Z = 0.05x + 0.08y</span> to maximize return.
                                The objective line shows the trade-off between two investment options.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Resource Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-amber-600 dark:text-amber-400">Mamata</span>{" "}
                                uses <span className="font-mono">Z = x + y</span> to optimize resource allocation.
                                Moving the objective line finds the optimal combination of two resources.
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
                                <li>Use intercepts to quickly draw objective lines.</li>
                                <li>All objective lines are parallel — check the slope.</li>
                                <li>For max, move the line away from the origin.</li>
                                <li>For min, move the line toward the origin.</li>
                                <li>The optimal line is the one that just touches the region.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Drawing objective lines that aren't parallel.</li>
                                <li>Moving the line in the wrong direction.</li>
                                <li>Using the wrong intercepts.</li>
                                <li>Forgetting that the objective line can overlap an edge.</li>
                                <li>Misreading the objective function coefficients.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Start with a convenient Z value (like Z=12).</li>
                                <li>Find intercepts using Z/a and Z/b.</li>
                                <li>Draw multiple parallel lines for different Z values.</li>
                                <li>Identify the optimal line by finding where it touches the region.</li>
                                <li>Verify the optimal point is a corner point.</li>
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
                            <span>I can draw the objective line for a given Z value.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the intercepts of the objective line.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can move the objective line parallel to find the optimum.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that all objective lines are parallel.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify the optimal objective line.</span>
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
                        title="Objective Function Line – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Objective Function Line – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic20_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "The objective line is where the math meets the graph. I tell my students: 'The objective line is your goal — it's what you're trying to achieve.' The key insight is that all objective lines are parallel, and finding the optimal solution is about finding where the line just touches the feasible region. I recommend having students draw objective lines for different Z values and observe how they move. A great exercise: give students the same feasible region but different objective functions, and have them find the optimal point for each."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 20 — Objective Function Line &bull; The graphical representation of the goal
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Iso-profit Line (Topic 21)
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

export default Topic20;