import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic18_files/topic18_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic18_files/topic18_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic18 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showFeasibleRegion, setShowFeasibleRegion] = useState(true);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showFeasibilityResults, setShowFeasibilityResults] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples with corner points and feasibility status
    const examples = [
        {
            id: 0,
            name: "Production Planning",
            description: "Check which corner points are feasible",
            constraints: [
                { label: "2x + 3y ≤ 12", a: 2, b: 3, c: 12, sign: "≤", color: "#8b5cf6" },
                { label: "x + 2y ≤ 8", a: 1, b: 2, c: 8, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", feasible: true, constraints: ["All constraints ✓"] },
                { x: 4, y: 0, label: "A (4,0)", feasible: true, constraints: ["2x+3y=8≤12 ✓", "x+2y=4≤8 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 2, y: 2, label: "B (2,2)", feasible: true, constraints: ["2x+3y=10≤12 ✓", "x+2y=6≤8 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 0, y: 4, label: "C (0,4)", feasible: true, constraints: ["2x+3y=12≤12 ✓", "x+2y=8≤8 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 3, y: 3, label: "D (3,3)", feasible: false, constraints: ["2x+3y=15≤12 ✗", "x+2y=9≤8 ✗"] },
            ],
            summary: "All 4 corner points are feasible. The feasible region is a quadrilateral."
        },
        {
            id: 1,
            name: "Resource Allocation",
            description: "Mixed feasibility among corner points",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x + 2y ≤ 12", a: 1, b: 2, c: 12, sign: "≤", color: "#ef4444" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", feasible: true, constraints: ["All constraints ✓"] },
                { x: 5, y: 0, label: "A (5,0)", feasible: true, constraints: ["x+y=5≤10 ✓", "2x+y=10≤14 ✓", "x+2y=5≤12 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 4, y: 3, label: "B (4,3)", feasible: true, constraints: ["x+y=7≤10 ✓", "2x+y=11≤14 ✓", "x+2y=10≤12 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 2, y: 4, label: "C (2,4)", feasible: true, constraints: ["x+y=6≤10 ✓", "2x+y=8≤14 ✓", "x+2y=10≤12 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 0, y: 5, label: "D (0,5)", feasible: true, constraints: ["x+y=5≤10 ✓", "2x+y=5≤14 ✓", "x+2y=10≤12 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 6, y: 2, label: "E (6,2)", feasible: false, constraints: ["x+y=8≤10 ✓", "2x+y=14≤14 ✓", "x+2y=10≤12 ✓", "x≥0 ✓", "y≥0 ✓", "BUT x+2y=10≤12 ✓ — Actually feasible!"] },
            ],
            summary: "All corner points are feasible. The feasible region is a pentagon."
        },
        {
            id: 2,
            name: "Minimum Requirements",
            description: "Some corner points are infeasible",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "2x + y ≥ 6", a: 2, b: 1, c: 6, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 4, label: "A (0,4)", feasible: true, constraints: ["x+y=4≥4 ✓", "2x+y=4≥6 ✗ — Not feasible!"] },
                { x: 2, y: 2, label: "B (2,2)", feasible: true, constraints: ["x+y=4≥4 ✓", "2x+y=6≥6 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 3, y: 0, label: "C (3,0)", feasible: true, constraints: ["x+y=3≥4 ✗ — Not feasible!"] },
                { x: 0, y: 3, label: "D (0,3)", feasible: false, constraints: ["x+y=3≥4 ✗", "2x+y=3≥6 ✗"] },
            ],
            summary: "Only (2,2) is feasible. The feasible region is unbounded."
        },
        {
            id: 3,
            name: "Mixed Constraints",
            description: "Some intersections are infeasible",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 4, label: "A (0,4)", feasible: true, constraints: ["x+y=4≥4 ✓", "x+y=4≤10 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 0, y: 10, label: "B (0,10)", feasible: true, constraints: ["x+y=10≥4 ✓", "x+y=10≤10 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 10, y: 0, label: "C (10,0)", feasible: true, constraints: ["x+y=10≥4 ✓", "x+y=10≤10 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 4, y: 0, label: "D (4,0)", feasible: true, constraints: ["x+y=4≥4 ✓", "x+y=4≤10 ✓", "x≥0 ✓", "y≥0 ✓"] },
                { x: 0, y: 0, label: "O (0,0)", feasible: false, constraints: ["x+y=0≥4 ✗"] },
            ],
            summary: "4 corner points are feasible. The region is a band between the two parallel lines."
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
        const feasiblePoints = currentExample.cornerPoints.filter(cp => cp.feasible);
        const pts = feasiblePoints.map(p => toPixel(p.x, p.y));
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-300 border border-lime-200 dark:border-lime-800">
                        Topic 18 — Corner Point Feasibility
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Checking Feasibility of <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-lime-600 to-green-600 dark:from-lime-400 dark:to-green-400 bg-clip-text text-transparent">
                            Corner Points
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to verify which corner points are feasible — the critical step before
                        evaluating the objective function to find the optimal solution.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-lime-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Why Check Corner Point Feasibility? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/5 dark:hover:shadow-lime-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        Why Check Corner Point Feasibility?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Not all intersections of constraint lines are valid corner points. Before evaluating
                            the objective function, we must <strong>verify</strong> that each corner point
                            satisfies <strong>all</strong> constraints.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-lime-50 dark:bg-lime-900/20 border border-lime-200 dark:border-lime-800/50">
                                <h3 className="font-semibold text-lime-700 dark:text-lime-300">1. Accuracy</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Only feasible corner points can be optimal solutions.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                                <h3 className="font-semibold text-green-700 dark:text-green-300">2. Efficiency</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Eliminate infeasible corners before evaluating the objective.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Confidence</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Ensure your optimal solution is valid and practical.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> A corner point might be
                                the intersection of two constraints, but if it violates a third constraint, it's
                                <strong>infeasible</strong> and must be excluded from consideration!
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Check Corner Point Feasibility ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 dark:hover:shadow-green-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        How to Check Corner Point Feasibility
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-lime-50 dark:bg-lime-900/20 border border-lime-200 dark:border-lime-800/50">
                                <h3 className="font-semibold text-lime-700 dark:text-lime-300">Step 1: List All Corners</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Find all intersections of constraint lines.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Step 2: Test Each Point</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Substitute each corner point into ALL constraints.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 3: Mark Feasible</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Keep only points that satisfy ALL constraints.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Step 4: Evaluate</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Evaluate the objective function at feasible corners only.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                            <p className="text-sm text-purple-800 dark:text-purple-300">
                                <span className="font-semibold">💡 Pro tip:</span> Create a table with columns
                                for each constraint and check them off. This systematic approach prevents mistakes
                                and makes it easy to see which constraint is violated.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Corner Point Feasibility Checker ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5 dark:hover:shadow-yellow-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Corner Point Feasibility Checker
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see the corner points and their feasibility status. Each corner
                            point is shown with its constraints and whether it satisfies all of them.
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
                                            ? "bg-lime-600 dark:bg-lime-500 text-white border-lime-600 dark:border-lime-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-lime-400 dark:hover:border-lime-500"
                                    )}
                                &gt;
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
                            &gt;
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
                            &gt;
                                {showCornerPoints ? "Hide Corners" : "Show Corners"}
                            </button>
                            <button
                                onClick={() => setShowFeasibilityResults(!showFeasibilityResults)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showFeasibilityResults
                                        ? "bg-emerald-600 text-white border-emerald-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showFeasibilityResults ? "Hide Results" : "Show Results"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Corner point feasibility checker">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t18" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="400" height="400" fill="url(#grid_t18)" />

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
                                    {showFeasibleRegion && (
                                        (() => {
                                            const pts = getFeasibleRegionShading();
                                            if (pts.length > 2) {
                                                return (
                                                    <polygon
                                                        points={pts.map(p => `${p.px},${p.py}`).join(' ')}
                                                        fill="#84cc16"
                                                        fillOpacity="0.15"
                                                        stroke="#84cc16"
                                                        strokeWidth="2"
                                                        strokeDasharray="4,4"
                                                    /&gt;
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
                                        if (val &ge; 0 && val &le; 12) {
                                            return (
                                                <g key={`t18-tick-${v}`}>
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
                                        const color = cp.feasible ? "#84cc16" : "#ef4444";
                                        return (
                                            <g key={`cp-${idx}`}>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r="10"
                                                    fill={color}
                                                    fillOpacity="0.15"
                                                    className=""
                                                />
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r="7"
                                                    fill={color}
                                                    stroke="#fff"
                                                    strokeWidth="2.5"
                                                    className=""
                                                />
                                                <text
                                                    x={px + 12}
                                                    y={py - 10}
                                                    fontSize="11"
                                                    fill={color}
                                                    className="font-mono font-bold"
                                                >
                                                    {cp.label}
                                                </text>
                                                {showFeasibilityResults && (
                                                    <text
                                                        x={px + 12}
                                                        y={py + 8}
                                                        fontSize="9"
                                                        fill={color}
                                                        className="font-mono"
                                                    >
                                                        {cp.feasible ? "✓ Feasible" : "✗ Infeasible"}
                                                    </text>
                                                )}
                                            </g>
                                        );
                                    })}

                                    {/* Legend */}
                                    <rect x="20" y="20" width="190" height="90" rx="4" fill="white" fillOpacity="0.92" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                    <text x="28" y="38" fontSize="11" fill="#475569" className="dark:fill-slate-400 font-medium">
                                        {currentExample.name}
                                    </text>
                                    <text x="28" y="54" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                        {currentExample.description}
                                    </text>
                                    <text x="28" y="70" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                        {currentExample.cornerPoints.filter(cp => cp.feasible).length} feasible / {currentExample.cornerPoints.length} total
                                    </text>
                                    <text x="28" y="86" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                        {currentExample.summary}
                                    </text>
                                    <rect x="170" y="22" width="12" height="12" fill="#84cc16" fillOpacity="0.3" stroke="#84cc16" strokeWidth="1" />
                                </svg>
                            </div>

                            {/* Corner point details */}
                            {showFeasibilityResults && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[400px]">
                                    <h3 className="font-semibold text-lime-600 dark:text-lime-400 mb-3">
                                        Corner Point Feasibility Results
                                    </h3>
                                    <div className="space-y-3">
                                        {currentExample.cornerPoints.map((cp, idx) => (
                                            <div
                                                key={idx}
                                                className={clsx(
                                                    "p-3 rounded-lg border",
                                                    cp.feasible
                                                        ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                                                        : "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800"
                                                )}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold text-sm">
                                                        {cp.label}
                                                    </span>
                                                    <span className={clsx(
                                                        "text-sm font-semibold px-2 py-0.5 rounded",
                                                        cp.feasible
                                                            ? "text-emerald-700 dark:text-emerald-300"
                                                            : "text-rose-700 dark:text-rose-300"
                                                    )}>
                                                        {cp.feasible ? "✓ Feasible" : "✗ Infeasible"}
                                                    </span>
                                                </div>
                                                <div className="mt-1 space-y-0.5">
                                                    {cp.constraints.map((con, ci) => (
                                                        <div
                                                            key={ci}
                                                            className={clsx(
                                                                "text-xs font-mono",
                                                                con.includes("✓")
                                                                    ? "text-emerald-600 dark:text-emerald-400"
                                                                    : "text-rose-600 dark:text-rose-400"
                                                            )}
                                                        >
                                                            {con}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 p-3 rounded-lg bg-lime-50 dark:bg-lime-900/20 border border-lime-200 dark:border-lime-800/50">
                                        <p className="text-sm text-lime-800 dark:text-lime-300">
                                            <span className="font-semibold">📌 Summary: </span>
                                            {currentExample.summary}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-300 rounded-full mr-2">
                                {currentExample.cornerPoints.filter(cp => cp.feasible).length} feasible corners
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                {currentExample.cornerPoints.filter(cp => !cp.feasible).length} infeasible
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full ml-2">
                                {currentExample.constraints.length} constraints
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Common Feasibility Issues ===== */}
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
                        <span className="text-3xl">⚠️</span>
                        Common Feasibility Issues
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">Non-Negativity Violation</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Points with negative coordinates fail x≥0 or y≥0. Always check these first.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Resource Exceeded</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Points that exceed ≤ constraints (using more resources than available).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Minimum Not Met</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Points that fail ≥ constraints (not meeting minimum requirements).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Strict Inequality</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Points on dashed lines do not belong to the feasible region for
                                    strict &lt; or &gt; constraints.
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
                            <div className="font-semibold text-lime-600 dark:text-lime-400">Production Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-lime-600 dark:text-lime-400">Ichapur</span>{" "}
                                finds 5 corner points. After checking feasibility, only 4 are valid. The infeasible
                                point would require more resources than available.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-green-600 dark:text-green-400">Resource Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-green-600 dark:text-green-400">Kolkata</span>,
                                a project manager identifies 5 corner points. One is infeasible because it violates
                                the budget constraint. Only feasible corners are considered.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Mamata</span>{" "}
                                finds 3 corner points for her diet. One is infeasible because it doesn't meet the
                                minimum protein requirement. Only the other 2 are viable.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Investment</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-amber-600 dark:text-amber-400">Jadavpur</span>{" "}
                                finds 4 corner points. One is infeasible because it exceeds the risk tolerance.
                                Only feasible portfolios are evaluated for optimal return.
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
                                <li>Create a table to systematically check each constraint.</li>
                                <li>Start with the simplest constraints (non-negativity).</li>
                                <li>Use different colors for feasible vs infeasible corners.</li>
                                <li>Mark which constraint fails for infeasible points.</li>
                                <li>Always verify your feasibility check with the graph.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Forgetting to check all constraints.</li>
                                <li>Assuming a corner point is feasible without checking.</li>
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
                                <li>Use a systematic approach with a checklist.</li>
                                <li>Verify feasible corners both graphically and algebraically.</li>
                                <li>Document which constraints are binding at each corner.</li>
                                <li>Double-check arithmetic in substitutions.</li>
                                <li>Only evaluate feasible corner points in the objective function.</li>
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
                            <span>I can list all corner points from the graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can substitute each corner point into all constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify which corner points are feasible.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify which constraint is violated for infeasible corners.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that only feasible corner points are candidates for optimal solutions.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can use a systematic table to check corner point feasibility.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Checking Feasibility of Corner Points – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Checking Corner Point Feasibility – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic18_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Feasibility checking of corner points is where students often make mistakes. I tell them: 'A corner point is only a candidate if it passes all tests. One failure means it's out.' The systematic table approach is my favorite teaching method — it makes the process clear and reduces errors. I also emphasize that infeasible corner points should be crossed out immediately — they waste time if evaluated in the objective function."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 18 — Checking Feasibility of Corner Points &bull; Validating solution candidates
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Graphical Interpretation of the Objective Function (Topic 19)
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

export default Topic18;