import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic11 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showFeasibleRegion, setShowFeasibleRegion] = useState(true);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showTestPoint, setShowTestPoint] = useState(false);
    const [testPoint, setTestPoint] = useState({ x: 2, y: 2 });

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Example problems with feasible regions
    const examples = [
        {
            id: 0,
            name: "Bounded Feasible Region",
            description: "A classic production problem with 3 constraints forming a bounded region.",
            constraints: [
                { label: "2x + 3y ≤ 12", a: 2, b: 3, c: 12, sign: "≤", color: "#8b5cf6" },
                { label: "x + 2y ≤ 8", a: 1, b: 2, c: 8, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            feasibleRegion: "Quadrilateral with vertices (0,0), (4,0), (2,2), (0,4)",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)" },
                { x: 4, y: 0, label: "A (4,0)" },
                { x: 2, y: 2, label: "B (2,2)" },
                { x: 0, y: 4, label: "C (0,4)" },
            ],
            isBounded: true,
            testPoints: [
                { x: 2, y: 2, feasible: true },
                { x: 5, y: 1, feasible: false },
                { x: 1, y: 3, feasible: true },
                { x: 3, y: 3, feasible: false },
            ]
        },
        {
            id: 1,
            name: "Unbounded Feasible Region",
            description: "Constraints that don't close the region in one direction.",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            feasibleRegion: "Unbounded region extending to infinity (x≥0, y≥0, x+y≥4)",
            cornerPoints: [
                { x: 0, y: 4, label: "A (0,4)" },
                { x: 4, y: 0, label: "B (4,0)" },
            ],
            isBounded: false,
            testPoints: [
                { x: 2, y: 2, feasible: true },
                { x: 5, y: 1, feasible: true },
                { x: 1, y: 1, feasible: false },
                { x: 0, y: 5, feasible: true },
            ]
        },
        {
            id: 2,
            name: "Triangle Feasible Region",
            description: "Three constraints forming a simple triangle.",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            feasibleRegion: "Triangle with vertices (0,0), (10,0), (0,10)",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)" },
                { x: 10, y: 0, label: "A (10,0)" },
                { x: 0, y: 10, label: "B (0,10)" },
            ],
            isBounded: true,
            testPoints: [
                { x: 3, y: 4, feasible: true },
                { x: 11, y: 0, feasible: false },
                { x: 0, y: 5, feasible: true },
                { x: 5, y: 6, feasible: true },
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
        const range = currentExample.isBounded ? 12 : 14;
        if (b !== 0 && a !== 0) {
            for (let x = -0.5; x <= range; x += 0.05) {
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

    // Determine if a constraint is solid (≥ or ≤)
    const isSolid = (sign) => sign === "≥" || sign === "≤";

    // Get shading polygon for a specific constraint
    const getConstraintShading = (a, b, c, sign) => {
        const pts = [];
        const range = currentExample.isBounded ? 12 : 14;
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
        const pts = currentExample.cornerPoints.map(p => toPixel(p.x, p.y));
        return pts;
    };

    // Check if a test point is feasible
    const isPointFeasible = (x, y) => {
        for (const con of currentExample.constraints) {
            const lhs = con.a * x + con.b * y;
            let result = false;
            switch (con.sign) {
                case "≤": result = lhs <= con.c; break;
                case "≥": result = lhs >= con.c; break;
                case "<": result = lhs < con.c; break;
                case ">": result = lhs > con.c; break;
                default: return false;
            }
            if (!result) return false;
        }
        return true;
    };

    const isTestPointFeasible = isPointFeasible(testPoint.x, testPoint.y);

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        Topic 11 — Feasible Region
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        The <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            Feasible Region
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Understand the fundamental concept of the feasible region — the heart of every linear
                        programming problem where all solutions live.
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

                {/* ===== SECTION 1: What is the Feasible Region? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        What is the Feasible Region?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-blue-600 dark:text-blue-400">feasible region</strong> is
                            the set of all points <span className="font-mono">(x, y)</span> that satisfy
                            <strong>every constraint</strong> in a linear programming problem simultaneously.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The intersection of all constraint half-planes.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Visual</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The overlapping shaded area on the graph.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Purpose</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Contains ALL possible solutions to the LP problem.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> The feasible region is
                                always a <strong>convex set</strong> — a line segment between any two points in
                                the region stays entirely within the region. This property is what makes linear
                                programming so powerful!
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Properties of the Feasible Region ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        Key Properties of the Feasible Region
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">✓ Convex</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The region is convex. Any line segment between two points in the region stays
                                    within the region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">✓ Polygonal</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The region is a polygon (bounded or unbounded) with straight edges.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">✓ Empty possible</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If constraints conflict, the feasible region is empty (infeasible).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">✓ Corner points</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The vertices (corners) are where constraint lines intersect. Optimal solutions
                                    occur at these points.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Think about:</span> Why must the feasible
                                region be convex? Because linear constraints create straight boundaries, and the
                                intersection of half-planes always produces a convex set. This is why we can find
                                optimal solutions by checking only the corner points!
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Feasible Region Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Explore the Feasible Region
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select different problems to see how constraints form different feasible regions.
                            Test points to see if they're feasible, and observe the convex nature of the region.
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
                                onClick={() => setShowFeasibleRegion(!showFeasibleRegion)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showFeasibleRegion
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showFeasibleRegion ? "Hide Region" : "Show Region"}
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
                                onClick={() => setShowTestPoint(!showTestPoint)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showTestPoint
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showTestPoint ? "Hide Test Point" : "Test a Point"}
                            </button>
                        </div>

                        {/* Test point controls */}
                        {showTestPoint && (
                            <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                <span className="text-sm text-purple-700 dark:text-purple-300">Test point:</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">x =</span>
                                    <input
                                        type="number"
                                        value={testPoint.x}
                                        onChange={(e) => setTestPoint({ ...testPoint, x: parseFloat(e.target.value) || 0 })}
                                        className="w-16 px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">y =</span>
                                    <input
                                        type="number"
                                        value={testPoint.y}
                                        onChange={(e) => setTestPoint({ ...testPoint, y: parseFloat(e.target.value) || 0 })}
                                        className="w-16 px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                                    />
                                </div>
                                <span className={clsx(
                                    "text-sm font-medium px-3 py-1 rounded-full",
                                    isTestPointFeasible
                                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                        : "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                                )}>
                                    {isTestPointFeasible ? "✓ Feasible" : "✗ Infeasible"}
                                </span>
                            </div>
                        )}

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Feasible region explorer">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t11" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t11)" />

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

                                {/* Feasible region (highlighted overlap) */}
                                {showFeasibleRegion && (
                                    (() => {
                                        const pts = getFeasibleRegionShading();
                                        if (pts.length > 2) {
                                            return (
                                                <polygon
                                                    points={pts.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="#3b82f6"
                                                    fillOpacity="0.25"
                                                    stroke="#3b82f6"
                                                    strokeWidth="2.5"
                                                    strokeDasharray="4,4"
                                                />
                                            );
                                        }
                                        return null;
                                    })()
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
                                    if (val >= 0 && val <= 12) {
                                        return (
                                            <g key={`t11-tick-${v}`}>
                                                <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                {v >= 40 && v <= 360 && val !== 0 && val <= 10 && (
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
                                                opacity="0.8"
                                            />
                                        );
                                    }
                                    return null;
                                })}

                                {/* Corner points */}
                                {showCornerPoints && currentExample.cornerPoints.map((cp, idx) => {
                                    const { px, py } = toPixel(cp.x, cp.y);
                                    return (
                                        <g key={`cp-${idx}`}>
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r="7"
                                                fill="#f59e0b"
                                                stroke="#fff"
                                                strokeWidth="2"
                                                className="animate-[pulse_1.5s_ease-in-out_infinite]"
                                            />
                                            <text
                                                x={px + 10}
                                                y={py - 10}
                                                fontSize="11"
                                                fill="#f59e0b"
                                                className="font-mono font-bold"
                                            >
                                                {cp.label}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Test point */}
                                {showTestPoint && (() => {
                                    const { px, py } = toPixel(testPoint.x, testPoint.y);
                                    const color = isTestPointFeasible ? "#10b981" : "#ef4444";
                                    return (
                                        <g>
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r="8"
                                                fill={color}
                                                stroke="#fff"
                                                strokeWidth="2"
                                                className="animate-[pulse_1.5s_ease-in-out_infinite]"
                                            />
                                            <text
                                                x={px + 12}
                                                y={py - 10}
                                                fontSize="12"
                                                fill={color}
                                                className="font-mono font-bold"
                                            >
                                                ({testPoint.x}, {testPoint.y}) {isTestPointFeasible ? "✓" : "✗"}
                                            </text>
                                        </g>
                                    );
                                })()}

                                {/* Legend */}
                                <rect x="20" y="20" width="180" height="90" rx="4" fill="white" fillOpacity="0.92" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                <text x="28" y="38" fontSize="11" fill="#475569" className="dark:fill-slate-400 font-medium">
                                    {currentExample.name}
                                </text>
                                <text x="28" y="54" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.description}
                                </text>
                                <text x="28" y="70" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.isBounded ? "✓ Bounded" : "∞ Unbounded"}
                                </text>
                                <text x="28" y="86" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.cornerPoints.length} corner points
                                </text>
                                {showFeasibleRegion && (
                                    <rect x="160" y="22" width="12" height="12" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1" />
                                )}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className={clsx(
                                "inline-block px-3 py-1 rounded-full mr-2",
                                currentExample.isBounded
                                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                    : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                            )}>
                                {currentExample.isBounded ? "✓ Bounded Region" : "∞ Unbounded Region"}
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {currentExample.constraints.length} constraints
                            </span>
                            {showTestPoint && (
                                <span className={clsx(
                                    "inline-block px-3 py-1 rounded-full ml-2",
                                    isTestPointFeasible
                                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                        : "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                                )}>
                                    Test point: {isTestPointFeasible ? "✓ Feasible" : "✗ Infeasible"}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Feasible vs Infeasible Points ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📍</span>
                        Feasible vs Infeasible Points
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            A point is <strong className="text-emerald-600 dark:text-emerald-400">feasible</strong>{" "}
                            if it lies inside the feasible region (satisfies all constraints). A point is
                            <strong className="text-rose-600 dark:text-rose-400">infeasible</strong> if it violates
                            at least one constraint.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">✓ Feasible Points</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Lie inside the feasible region</li>
                                    <li>• Satisfy ALL constraints</li>
                                    <li>• Are valid solutions</li>
                                    <li>• Can be evaluated in the objective function</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">✗ Infeasible Points</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Lie outside the feasible region</li>
                                    <li>• Violate at least one constraint</li>
                                    <li>• Are NOT valid solutions</li>
                                    <li>• Cannot be considered for optimization</li>
                                </ul>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Try changing this:</span> Use the interactive
                                tool above to test different points. Notice how points just outside the region
                                violate one or more constraints. This helps build intuition about the feasibility
                                of solutions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: Real-World Examples ===== */}
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
                        <span className="text-3xl">🌍</span>
                        Real-World Examples
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-blue-600 dark:text-blue-400">Manufacturing</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-blue-600 dark:text-blue-400">Ichapur</span>{" "}
                                produces two products. The feasible region shows all production combinations that
                                meet machine, labor, and material constraints. Points inside are possible; points
                                outside are impossible.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-indigo-600 dark:text-indigo-400">Investment</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-indigo-600 dark:text-indigo-400">Kolkata</span>{" "}
                                allocates money between stocks and bonds. The feasible region shows all portfolios
                                meeting risk, return, and liquidity requirements.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Mamata</span>{" "}
                                plans her meals with constraints on calories, protein, and carbs. The feasible
                                region shows all meal combinations meeting her nutritional goals.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Time Management</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A student in <span className="font-medium text-amber-600 dark:text-amber-400">Jadavpur</span>{" "}
                                allocates time between study, sleep, and social activities. The feasible region
                                shows all weekly schedules that work.
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
                                <li>The feasible region is always convex — use this to verify your graph.</li>
                                <li>Optimal solutions always occur at corner points.</li>
                                <li>Use light shading to see overlaps clearly.</li>
                                <li>Always include non-negativity constraints.</li>
                                <li>Check if the region is bounded or unbounded.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Forgetting to include all constraints.</li>
                                <li>Misidentifying the feasible region (wrong overlap).</li>
                                <li>Not checking if a point is feasible.</li>
                                <li>Ignoring corner points on the axes.</li>
                                <li>Assuming the region is always bounded.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>List all constraints before graphing.</li>
                                <li>Use different colors for each constraint.</li>
                                <li>Label the feasible region clearly.</li>
                                <li>Verify if corner points are feasible.</li>
                                <li>Test points to confirm the region is correct.</li>
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
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Mini Checklist
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify the feasible region on a graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that the feasible region is convex.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between bounded and unbounded regions.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can test if a point is feasible.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that optimal solutions occur at corner points.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can explain the feasible region in real-world terms.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="The Feasible Region – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="The Feasible Region – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic11_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "The feasible region is the most important concept in LP — it's where all solutions live. I tell my students: 'The feasible region is your playing field. Every valid solution is inside it. Your job is to find the BEST point inside.' I recommend having students draw the feasible region from constraints and then try to find the 'best' point intuitively before learning the corner-point method. This builds intuition about why we only need to check corners."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 11 — The Feasible Region &bull; The solution space of linear programming
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Bounded and Unbounded Feasible Regions (Topic 12)
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

export default Topic11;