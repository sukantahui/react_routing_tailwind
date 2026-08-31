import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic47_files/topic47_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic47_files/topic47_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic47 = () => {
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

    // Examples for determining minimum cost
    const examples = [
        {
            id: 0,
            name: "Diet Cost Minimization",
            description: "Find minimum cost for C = 2x + 3y",
            constraints: [
                { label: "2x + y ≥ 6", a: 2, b: 1, c: 6, sign: "≥", color: "#8b5cf6" },
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = 2x + 3y",
            cornerPoints: [
                { x: 0, y: 4, label: "A (0,4)", C: 12, isOptimal: false },
                { x: 2, y: 2, label: "B (2,2)", C: 10, isOptimal: false },
                { x: 3, y: 0, label: "C (3,0)", C: 6, isOptimal: true },
            ],
            optimal: { x: 3, y: 0, C: 6 },
            costExplanation: "Minimum cost of ₹6 is achieved at (3,0). This is the lowest cost among all feasible meal plans.",
            costContext: "The dietitian should use 3 servings of Food A and 0 servings of Food B to achieve the minimum cost of ₹6.",
            costComparison: "₹6 < ₹10 < ₹12"
        },
        {
            id: 1,
            name: "Production Cost Minimization",
            description: "Find minimum cost for C = 4x + 3y",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "2x + y ≥ 8", a: 2, b: 1, c: 8, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = 4x + 3y",
            cornerPoints: [
                { x: 0, y: 5, label: "A (0,5)", C: 15, isOptimal: true },
                { x: 3, y: 2, label: "B (3,2)", C: 18, isOptimal: false },
                { x: 4, y: 0, label: "C (4,0)", C: 16, isOptimal: false },
            ],
            optimal: { x: 0, y: 5, C: 15 },
            costExplanation: "Minimum cost of ₹15 is achieved at (0,5). Producing only Product Y gives the minimum cost.",
            costContext: "The factory should produce 0 units of Product X and 5 units of Product Y to achieve the minimum cost of ₹15.",
            costComparison: "₹15 < ₹16 < ₹18"
        },
        {
            id: 2,
            name: "Multiple Optima Cost",
            description: "Find minimum cost for C = x + y",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "2x + y ≥ 6", a: 2, b: 1, c: 6, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = x + y",
            cornerPoints: [
                { x: 0, y: 4, label: "A (0,4)", C: 4, isOptimal: false },
                { x: 2, y: 2, label: "B (2,2)", C: 4, isOptimal: true },
                { x: 3, y: 0, label: "C (3,0)", C: 3, isOptimal: false },
            ],
            optimal: { x: 2, y: 2, C: 4 },
            costExplanation: "Minimum cost of ₹4 is achieved at (2,2). This is the lowest cost among all feasible production plans.",
            costContext: "The factory should produce 2 units of X and 2 units of Y to achieve the minimum cost of ₹4.",
            costComparison: "₹4 < ₹4 < ₹3? Actually C(2,2)=4, C(0,4)=4, C(3,0)=3. Wait, the minimum is at (3,0) with C=3. Let me recheck.",
            // Fixed: The minimum is at (3,0) with C=3
            costComparisonFixed: "₹3 < ₹4 = ₹4"
        },
    ];

    // Use the fixed version for example 2
    const fixedExamples = examples.map((ex, idx) => {
        if (idx === 2) {
            return {
                ...ex,
                optimal: { x: 3, y: 0, C: 3 },
                cornerPoints: [
                    { x: 0, y: 4, label: "A (0,4)", C: 4, isOptimal: false },
                    { x: 2, y: 2, label: "B (2,2)", C: 4, isOptimal: false },
                    { x: 3, y: 0, label: "C (3,0)", C: 3, isOptimal: true },
                ],
                costExplanation: "Minimum cost of ₹3 is achieved at (3,0). This is the lowest cost among all feasible production plans.",
                costContext: "The factory should produce 3 units of X and 0 units of Y to achieve the minimum cost of ₹3.",
                costComparison: "₹3 < ₹4 = ₹4"
            };
        }
        return ex;
    });

    const currentExample = fixedExamples[selectedExample];

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

    const optimalC = currentExample.optimal.C !== undefined ? currentExample.optimal.C : 0;

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                        Topic 47 — Minimum Cost
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Determining the <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                            Minimum Cost
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to determine the minimum cost from the optimal corner point — the ultimate
                        goal of any cost minimization LP problem.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span> 10 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is Minimum Cost? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 dark:hover:shadow-orange-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">💰</span>
                        What is Minimum Cost?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-orange-600 dark:text-orange-400">minimum cost</strong> is
                            the lowest value of the cost function (C) that can be achieved within the feasible
                            region. It is found by evaluating the cost function at all corner points and
                            selecting the lowest value.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                                <h3 className="font-semibold text-orange-700 dark:text-orange-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The lowest C value among all feasible corner points.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Interpretation</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The minimum cost the business can achieve given its constraints.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> The minimum cost is the
                                "answer" to the cost minimization problem — it tells you the cheapest possible
                                way to meet your requirements.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Find Minimum Cost ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        How to Find Minimum Cost
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                                <h3 className="font-semibold text-orange-700 dark:text-orange-300">Step 1: Evaluate</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Compute C at every corner point.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Step 2: Compare</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Compare all C values to find the lowest.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50">
                                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Step 3: State</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    State the minimum cost with context.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Pro tip:</span> Always include the currency
                                symbol (₹) and context when stating minimum cost.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Cost Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5 dark:hover:shadow-yellow-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Cost Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see the minimum cost highlighted. The optimal corner shows the
                            production mix that minimizes cost.
                        </p>

                        {/* Example selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {fixedExamples.map((ex) => (
                                <button
                                    key={ex.id}
                                    onClick={() => setSelectedExample(ex.id)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                        selectedExample === ex.id
                                            ? "bg-orange-600 dark:bg-orange-500 text-white border-orange-600 dark:border-orange-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500"
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
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Minimum cost graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t47" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t47)" />

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
                                                    fill="#f97316"
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

                                    {/* Tick marks */}
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
                                            <g key={`t47-tick-${tick.val}`}>
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
                                            <g key={`t47-ytick-${tick.val}`}>
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
                                                    Cost = ₹{cp.C}
                                                    {isOptimal && showOptimalHighlight ? " ★ MIN" : ""}
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

                                    {/* Minimum cost label */}
                                    {currentExample.optimal && showOptimalHighlight && (
                                        <g>
                                            <rect x="20" y="70" width="280" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
                                            <text x="30" y="90" fontSize="13" fill="#ef4444" className="font-bold">
                                                ★ Minimum Cost: ₹{optimalC}
                                            </text>
                                            <text x="30" y="110" fontSize="12" fill="#ef4444">
                                                At ({currentExample.optimal.x}, {currentExample.optimal.y})
                                            </text>
                                            <text x="30" y="128" fontSize="11" fill="#ef4444">
                                                {currentExample.costContext}
                                            </text>
                                            <text x="30" y="142" fontSize="10" fill="#ef4444" opacity="0.8">
                                                {currentExample.costComparison}
                                            </text>
                                        </g>
                                    )}

                                    {/* Objective function label */}
                                    <text x="20" y="50" fontSize="13" fill="#f97316" className="font-mono font-bold">
                                        {currentExample.objective}
                                    </text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {currentExample.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Cost Panel */}
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">
                                    📊 Minimum Cost Analysis
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                                        <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                            🎯 Minimum Cost
                                        </p>
                                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                            ₹{optimalC}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                            📍 Optimal Production Mix
                                        </p>
                                        <p className="text-sm font-mono text-amber-800 dark:text-amber-300">
                                            x = {currentExample.optimal.x}, y = {currentExample.optimal.y}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                                        <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                                            💡 Explanation
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {currentExample.costExplanation}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Cost Comparison
                                        </p>
                                        <div className="mt-2 space-y-1 text-sm">
                                            {currentExample.cornerPoints.map((cp, idx) => {
                                                const isOptimal = cp.isOptimal;
                                                return (
                                                    <div key={idx} className={clsx(
                                                        "flex justify-between font-mono",
                                                        isOptimal ? "text-rose-600 dark:text-rose-400 font-bold" : "text-slate-500 dark:text-slate-400"
                                                    )}>
                                                        <span>{cp.label}: ({cp.x}, {cp.y})</span>
                                                        <span>₹{cp.C} {isOptimal ? "★ MIN" : ""}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                            💰 Business Impact
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {currentExample.costContext}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full mr-2">
                                {currentExample.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                Min Cost = ₹{optimalC}
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full ml-2">
                                Unique optimum
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
                                <li>Always include the currency symbol (₹).</li>
                                <li>State the minimum cost in context.</li>
                                <li>Verify the cost by substitution.</li>
                                <li>Check that the production mix is feasible.</li>
                                <li>For minimization, look for the lowest value.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Forgetting the currency symbol.</li>
                                <li>Not stating the cost in context.</li>
                                <li>Confusing min with max.</li>
                                <li>Not verifying feasibility.</li>
                                <li>Forgetting to check all corners.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Include ₹ in your answer.</li>
                                <li>State the minimum cost with context.</li>
                                <li>Verify by substitution.</li>
                                <li>Check feasibility of the production mix.</li>
                                <li>Compare all corner values.</li>
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
                            <span>I can evaluate C at all corner points.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can compare C values to find the lowest.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify the minimum cost.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can state the minimum cost with context.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify the cost by substitution.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between max and min.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Determining Minimum Cost – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Determining Minimum Cost – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic47_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "This is the counterpart to maximum profit. I tell my students: 'If profit maximization is about making money, cost minimization is about saving money.' Emphasize that the direction is opposite — we're looking for the lowest value, not the highest. A great exercise: give students the same feasible region and ask them to find both the maximum profit and minimum cost."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 47 — Determining Minimum Cost &bull; The cheapest possible outcome
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Multiple Optimal Solutions (Topic 48)
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

export default Topic47;