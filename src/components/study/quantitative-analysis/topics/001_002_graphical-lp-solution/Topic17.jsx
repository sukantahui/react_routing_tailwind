import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic17_files/topic17_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic17_files/topic17_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic17 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showFeasibleRegion, setShowFeasibleRegion] = useState(true);
    const [testPoint, setTestPoint] = useState({ x: 2, y: 2 });
    const [showTestResult, setShowTestResult] = useState(false);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples with constraints and test points
    const examples = [
        {
            id: 0,
            name: "Production Constraints",
            description: "Test if a production mix is feasible",
            constraints: [
                { label: "2x + 3y ≤ 12", a: 2, b: 3, c: 12, sign: "≤", color: "#8b5cf6" },
                { label: "x + 2y ≤ 8", a: 1, b: 2, c: 8, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            testPoints: [
                { x: 2, y: 2, feasible: true, label: "✓ (2,2) - Feasible" },
                { x: 5, y: 1, feasible: false, label: "✗ (5,1) - Infeasible" },
                { x: 1, y: 3, feasible: true, label: "✓ (1,3) - Feasible" },
                { x: 3, y: 3, feasible: false, label: "✗ (3,3) - Infeasible" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)" },
                { x: 4, y: 0, label: "A (4,0)" },
                { x: 2, y: 2, label: "B (2,2)" },
                { x: 0, y: 4, label: "C (0,4)" },
            ]
        },
        {
            id: 1,
            name: "Resource Allocation",
            description: "Check if resource usage is within limits",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x + 2y ≤ 12", a: 1, b: 2, c: 12, sign: "≤", color: "#ef4444" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            testPoints: [
                { x: 3, y: 4, feasible: true, label: "✓ (3,4) - Feasible" },
                { x: 6, y: 2, feasible: false, label: "✗ (6,2) - Infeasible" },
                { x: 4, y: 3, feasible: true, label: "✓ (4,3) - Feasible (corner)" },
                { x: 8, y: 1, feasible: false, label: "✗ (8,1) - Infeasible" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)" },
                { x: 5, y: 0, label: "A (5,0)" },
                { x: 4, y: 3, label: "B (4,3)" },
                { x: 2, y: 4, label: "C (2,4)" },
                { x: 0, y: 5, label: "D (0,5)" },
            ]
        },
        {
            id: 2,
            name: "Minimum Requirements",
            description: "Check if minimum requirements are met",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "2x + y ≥ 6", a: 2, b: 1, c: 6, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            testPoints: [
                { x: 2, y: 2, feasible: true, label: "✓ (2,2) - Feasible" },
                { x: 1, y: 1, feasible: false, label: "✗ (1,1) - Infeasible" },
                { x: 3, y: 1, feasible: true, label: "✓ (3,1) - Feasible" },
                { x: 0, y: 3, feasible: false, label: "✗ (0,3) - Infeasible" },
            ],
            cornerPoints: [
                { x: 2, y: 2, label: "A (2,2)" },
                { x: 3, y: 0, label: "B (3,0)" },
                { x: 0, y: 3, label: "C (0,3)" },
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
        const range = 12;
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

    // Check if a point is feasible
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

    // Predefined test points
    const presetPoints = currentExample.testPoints;

    const handlePresetPoint = (x, y) => {
        setTestPoint({ x, y });
        setShowTestResult(true);
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
                        Topic 17 — Feasibility Testing
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Determining Whether a Point <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                            Satisfies All Constraints
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to verify if a potential solution is feasible — a critical skill for
                        validating corner points and finding optimal solutions.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span> 10 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-lime-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Why Test Feasibility? ===== */}
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
                        <span className="text-3xl">🔍</span>
                        Why Test Feasibility?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Not every intersection point is a valid corner point. A point is <strong>feasible</strong>{" "}
                            only if it satisfies <strong>all</strong> constraints simultaneously. Testing feasibility
                            is essential for:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                                <h3 className="font-semibold text-orange-700 dark:text-orange-300">1. Verification</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Confirm that a point is a valid solution candidate.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">2. Elimination</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Remove infeasible intersections from consideration.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Confidence</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Build confidence that your optimal solution is valid.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Key insight:</span> A point might be the
                                intersection of two constraints, but if it violates a third constraint, it's
                                <strong>infeasible</strong> and cannot be a solution!
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Test Feasibility ===== */}
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
                        How to Test Feasibility
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                                <h3 className="font-semibold text-orange-700 dark:text-orange-300">Step 1: Take the Point</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Start with the (x, y) coordinates of the point to test.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Step 2: Substitute</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plug x and y into <strong>every</strong> constraint.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 3: Check</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Verify if each inequality holds true.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">Step 4: Decide</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If ALL are true → feasible. If ANY fails → infeasible.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                            <p className="text-sm text-purple-800 dark:text-purple-300">
                                <span className="font-semibold">💡 Pro tip:</span> Be systematic! Check each
                                constraint one by one and note which ones pass or fail. This helps identify
                                exactly which constraint is violated.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Feasibility Tester ===== */}
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
                        Interactive Feasibility Tester
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem, then click a test point to see if it satisfies all constraints.
                            The graph will show you exactly where the point lies.
                        </p>

                        {/* Example selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {examples.map((ex) => (
                                <button
                                    key={ex.id}
                                    onClick={() => {
                                        setSelectedExample(ex.id);
                                        setShowTestResult(false);
                                    }}
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

                        {/* Test point buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs text-slate-500 dark:text-slate-400 mr-2 self-center">Test points:</span>
                            {presetPoints.map((pt) => (
                                <button
                                    key={pt.label}
                                    onClick={() => handlePresetPoint(pt.x, pt.y)}
                                    className={clsx(
                                        "px-3 py-1 text-sm rounded-lg border transition-all duration-200",
                                        testPoint.x === pt.x && testPoint.y === pt.y && showTestResult
                                            ? pt.feasible
                                                ? "bg-emerald-600 text-white border-emerald-600"
                                                : "bg-rose-600 text-white border-rose-600"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500"
                                    )}
                                >
                                    {pt.label}
                                </button>
                            ))}
                        </div>

                        {/* Custom test point */}
                        <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                            <span className="text-sm text-orange-700 dark:text-orange-300">Custom point:</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">x =</span>
                                <input
                                    type="number"
                                    value={testPoint.x}
                                    onChange={(e) => {
                                        setTestPoint({ ...testPoint, x: parseFloat(e.target.value) || 0 });
                                        setShowTestResult(true);
                                    }}
                                    className="w-16 px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">y =</span>
                                <input
                                    type="number"
                                    value={testPoint.y}
                                    onChange={(e) => {
                                        setTestPoint({ ...testPoint, y: parseFloat(e.target.value) || 0 });
                                        setShowTestResult(true);
                                    }}
                                    className="w-16 px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                                />
                            </div>
                            <span className={clsx(
                                "text-sm font-medium px-3 py-1 rounded-full",
                                isTestPointFeasible && showTestResult
                                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                    : showTestResult
                                    ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                            )}>
                                {showTestResult ? (isTestPointFeasible ? "✓ Feasible" : "✗ Infeasible") : "Enter values"}
                            </span>
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
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Feasibility tester">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t17" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t17)" />

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
                                {showFeasibleRegion && (
                                    (() => {
                                        const pts = getFeasibleRegionShading();
                                        if (pts.length > 2) {
                                            return (
                                                <polygon
                                                    points={pts.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="#fb923c"
                                                    fillOpacity="0.15"
                                                    stroke="#fb923c"
                                                    strokeWidth="2"
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
                                            <g key={`t17-tick-${v}`}>
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
                                                opacity="0.7"
                                            />
                                        );
                                    }
                                    return null;
                                })}

                                {/* Test point */}
                                {showTestResult && (() => {
                                    const { px, py } = toPixel(testPoint.x, testPoint.y);
                                    const color = isTestPointFeasible ? "#10b981" : "#ef4444";
                                    return (
                                        <g>
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r="10"
                                                fill={color}
                                                fillOpacity="0.2"
                                                className=""
                                            />
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r="8"
                                                fill={color}
                                                stroke="#fff"
                                                strokeWidth="2.5"
                                                className=""
                                            />
                                            <text
                                                x={px + 14}
                                                y={py - 10}
                                                fontSize="14"
                                                fill={color}
                                                className="font-mono font-bold"
                                            >
                                                ({testPoint.x}, {testPoint.y}) {isTestPointFeasible ? "✓" : "✗"}
                                            </text>
                                            {!isTestPointFeasible && (
                                                <text
                                                    x={px + 14}
                                                    y={py + 10}
                                                    fontSize="10"
                                                    fill={color}
                                                >
                                                    Violates constraint
                                                </text>
                                            )}
                                        </g>
                                    );
                                })()}

                                {/* Legend */}
                                <rect x="20" y="20" width="190" height="80" rx="4" fill="white" fillOpacity="0.92" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                <text x="28" y="38" fontSize="11" fill="#475569" className="dark:fill-slate-400 font-medium">
                                    {currentExample.name}
                                </text>
                                <text x="28" y="54" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.description}
                                </text>
                                {showTestResult && (
                                    <text x="28" y="70" fontSize="9" fill={isTestPointFeasible ? "#10b981" : "#ef4444"} className="font-medium">
                                        ({testPoint.x}, {testPoint.y}) is {isTestPointFeasible ? "FEASIBLE ✓" : "INFEASIBLE ✗"}
                                    </text>
                                )}
                                {!showTestResult && (
                                    <text x="28" y="70" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">
                                        Click a point above to test feasibility
                                    </text>
                                )}
                                {showFeasibleRegion && (
                                    <rect x="170" y="22" width="12" height="12" fill="#fb923c" fillOpacity="0.3" stroke="#fb923c" strokeWidth="1" />
                                )}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full mr-2">
                                {currentExample.constraints.length} constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {showFeasibleRegion ? "Feasible region shown" : "Region hidden"}
                            </span>
                            {showTestResult && (
                                <span className={clsx(
                                    "inline-block px-3 py-1 rounded-full ml-2",
                                    isTestPointFeasible
                                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                        : "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                                )}>
                                    {isTestPointFeasible ? "✓ Feasible" : "✗ Infeasible"}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Common Feasibility Checks ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Common Feasibility Checks
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">✓ Non-Negativity</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Check that x ≥ 0 and y ≥ 0. Most LP problems require this.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">✓ Resource Limits</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Check that all ≤ constraints are satisfied (resources not exceeded).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">✓ Minimum Requirements</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Check that all ≥ constraints are satisfied (minimums met).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">✓ Special Constraints</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Check any additional constraints specific to the problem.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Think about:</span> When testing a corner point,
                                remember that two constraints will be binding (equality). But the point must still
                                satisfy ALL other constraints to be feasible.
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
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🌍</span>
                        Real-World Examples
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-orange-600 dark:text-orange-400">Production Feasibility</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-orange-600 dark:text-orange-400">Ichapur</span>{" "}
                                tests if production plan (x=2, y=2) is feasible. It must satisfy machine hours,
                                labor, and non-negativity. If any constraint fails, the plan must be adjusted.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Resource Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-amber-600 dark:text-amber-400">Kolkata</span>,
                                a project manager checks if resource allocation (x=3, y=4) is feasible. The
                                point must satisfy budget, time, and quality constraints.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Mamata</span>{" "}
                                tests if meal plan (x=2, y=3) meets calorie, protein, and cost requirements.
                                Only if all constraints are satisfied is the meal plan feasible.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-rose-600 dark:text-rose-400">Investment</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-rose-600 dark:text-rose-400">Jadavpur</span>{" "}
                                tests if portfolio allocation satisfies risk, return, and liquidity constraints.
                                Infeasible allocations are rejected.
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
                                <li>Check non-negativity first — it's the simplest.</li>
                                <li>Be systematic: check one constraint at a time.</li>
                                <li>If a point fails one constraint, stop — it's infeasible.</li>
                                <li>Mark which constraint fails for troubleshooting.</li>
                                <li>Use the graph to verify your feasibility check.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Forgetting to check all constraints.</li>
                                <li>Assuming a point is feasible without testing.</li>
                                <li>Misreading inequality signs (≤ vs ≥).</li>
                                <li>Not checking non-negativity.</li>
                                <li>Stopping after one constraint passes.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Create a checklist of all constraints.</li>
                                <li>Substitute values carefully.</li>
                                <li>Use a table to track which constraints pass/fail.</li>
                                <li>Double-check your arithmetic.</li>
                                <li>Verify both graphically and algebraically.</li>
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
                            <span>I can substitute a point into all constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can determine if a point is feasible.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that ALL constraints must be satisfied.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify which constraint is violated.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify feasibility graphically.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that infeasible points cannot be solutions.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Determining Feasibility – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Determining Feasibility – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic17_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Feasibility testing is a crucial skill that students often rush through. I tell my students: 'A point is only feasible if it passes EVERY test. One failure means it's out.' I recommend using a systematic approach — create a table with constraints and check each one. This helps catch mistakes and builds confidence. Also, emphasize that corner points must be feasible — if an intersection violates any constraint, it's not a corner point of the feasible region."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 17 — Determining Feasibility &bull; Validating solution candidates
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Checking Feasibility of Corner Points (Topic 18)
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

export default Topic17;