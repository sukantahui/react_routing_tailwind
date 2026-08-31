import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic54_files/topic54_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic54_files/topic54_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic54 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showConflictHighlight, setShowConflictHighlight] = useState(true);
    const [showSteps, setShowSteps] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Worked Example 15: Infeasible Graphical LP Problem
    const examples = [
        {
            id: 0,
            name: "Conflicting Constraints",
            description: "x + y ≤ 5 and x + y ≥ 10 with non-negativity",
            problemStatement: "A company wants to maximize profit Z = 3x + 4y subject to: x + y ≤ 5, x + y ≥ 10, x ≥ 0, y ≥ 0. Is this problem feasible?",
            constraints: [
                { label: "x + y ≤ 5", a: 1, b: 1, c: 5, sign: "≤", color: "#8b5cf6" },
                { label: "x + y ≥ 10", a: 1, b: 1, c: 10, sign: "≥", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 3x + 4y",
            infeasibleReason: "The constraints x + y ≤ 5 and x + y ≥ 10 directly conflict. No point can satisfy both simultaneously.",
            conflictType: "Direct Conflict",
            identification: "The constraints are parallel with opposite inequality directions.",
            solution: "No feasible solution exists. The problem is infeasible.",
            steps: [
                "Step 1: Graph the constraint x + y ≤ 5.",
                "  This creates a region below the line x + y = 5.",
                "Step 2: Graph the constraint x + y ≥ 10.",
                "  This creates a region above the line x + y = 10.",
                "Step 3: Graph non-negativity constraints x ≥ 0 and y ≥ 0.",
                "  This restricts the region to the first quadrant.",
                "Step 4: Look for the overlap of all shaded regions.",
                "  The region below x+y=5 and above x+y=10 don't overlap.",
                "  There is no point that satisfies both constraints.",
                "Step 5: Conclusion: The feasible region is EMPTY.",
                "  The problem is infeasible. No solution exists."
            ]
        },
        {
            id: 1,
            name: "Resource Over-Requirement",
            description: "3x + 2y ≥ 12 with x + y ≤ 3",
            problemStatement: "A company wants to minimize cost C = 4x + 5y subject to: 3x + 2y ≥ 12, x + y ≤ 3, x ≥ 0, y ≥ 0. Is this problem feasible?",
            constraints: [
                { label: "3x + 2y ≥ 12", a: 3, b: 2, c: 12, sign: "≥", color: "#8b5cf6" },
                { label: "x + y ≤ 3", a: 1, b: 1, c: 3, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = 4x + 5y",
            infeasibleReason: "The maximum possible value of 3x+2y with x+y≤3 is at (0,3): 2(3)=6 < 12. The requirement cannot be met.",
            conflictType: "Resource Over-Requirement",
            identification: "Even at maximum resource allocation, the minimum requirement cannot be met.",
            solution: "No feasible solution exists. The problem is infeasible.",
            steps: [
                "Step 1: Graph the constraint 3x + 2y ≥ 12.",
                "  This creates a region above the line 3x + 2y = 12.",
                "Step 2: Graph the constraint x + y ≤ 3.",
                "  This creates a region below the line x + y = 3.",
                "Step 3: Graph non-negativity constraints x ≥ 0 and y ≥ 0.",
                "Step 4: Look for the overlap of all shaded regions.",
                "  At (0,3), 3(0)+2(3)=6 < 12.",
                "  At (3,0), 3(3)+2(0)=9 < 12.",
                "  No point satisfies both constraints.",
                "Step 5: Conclusion: The feasible region is EMPTY.",
                "  The problem is infeasible."
            ]
        },
        {
            id: 2,
            name: "Overly Restrictive Bounds",
            description: "x + y ≥ 8 with x ≤ 2, y ≤ 3",
            problemStatement: "A company wants to maximize profit Z = 5x + 6y subject to: x + y ≥ 8, x ≤ 2, y ≤ 3, x ≥ 0, y ≥ 0. Is this problem feasible?",
            constraints: [
                { label: "x + y ≥ 8", a: 1, b: 1, c: 8, sign: "≥", color: "#8b5cf6" },
                { label: "x ≤ 2", a: 1, b: 0, c: 2, sign: "≤", color: "#f59e0b" },
                { label: "y ≤ 3", a: 0, b: 1, c: 3, sign: "≤", color: "#ef4444" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 5x + 6y",
            infeasibleReason: "The maximum possible sum with x≤2 and y≤3 is 2+3=5 < 8. The requirement cannot be met.",
            conflictType: "Overly Restrictive Bounds",
            identification: "The upper bounds are too low to meet the minimum requirement.",
            solution: "No feasible solution exists. The problem is infeasible.",
            steps: [
                "Step 1: Graph the constraint x + y ≥ 8.",
                "  This creates a region above the line x + y = 8.",
                "Step 2: Graph the constraint x ≤ 2.",
                "  This creates a region left of the line x = 2.",
                "Step 3: Graph the constraint y ≤ 3.",
                "  This creates a region below the line y = 3.",
                "Step 4: Graph non-negativity constraints.",
                "Step 5: Look for the overlap.",
                "  At (2,3), x+y=5 < 8.",
                "  The entire region x≤2, y≤3 has sum ≤ 5.",
                "  No point satisfies x+y≥8.",
                "Step 6: Conclusion: The feasible region is EMPTY."
            ]
        },
    ];

    const currentExample = examples[selectedExample];

    // Helper: convert coordinates to SVG pixels
    const toPixel = (x, y) => {
        const maxVal = 12;
        const scale = 460 / maxVal;
        return {
            px: 80 + x * scale,
            py: 380 - y * scale
        };
    };

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const range = 12;
        const minRange = -2;
        if (b !== 0 && a !== 0) {
            for (let x = minRange; x <= range + 1; x += 0.1) {
                const y = (c - a * x) / b;
                if (y >= minRange && y <= range + 1) {
                    const p = toPixel(x, y);
                    if (p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390) {
                        points.push(p);
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= minRange && xVal <= range + 1) {
                const px = toPixel(xVal, 0).px;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= minRange && yVal <= range + 1) {
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
        const range = 12;
        const minRange = -2;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push(toPixel(minRange, minRange));
                    pts.push(toPixel(range, minRange));
                    const yRight = yAtX(range);
                    if (yRight >= minRange && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(minRange);
                    if (yLeft >= minRange && yLeft <= range) {
                        pts.push(toPixel(minRange, yLeft));
                    }
                } else {
                    pts.push(toPixel(minRange, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= minRange && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(minRange);
                    if (yLeft >= minRange && yLeft <= range) {
                        pts.push(toPixel(minRange, yLeft));
                    }
                }
            } else {
                if (b > 0) {
                    pts.push(toPixel(minRange, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= minRange && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(minRange);
                    if (yLeft >= minRange && yLeft <= range) {
                        pts.push(toPixel(minRange, yLeft));
                    }
                } else {
                    pts.push(toPixel(minRange, minRange));
                    pts.push(toPixel(range, minRange));
                    const yRight = yAtX(range);
                    if (yRight >= minRange && yRight <= range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(minRange);
                    if (yLeft >= minRange && yLeft <= range) {
                        pts.push(toPixel(minRange, yLeft));
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            const px = toPixel(xVal, 0).px;
            if (sign === "≥" || sign === ">") {
                pts.push(toPixel(xVal, minRange));
                pts.push(toPixel(range, minRange));
                pts.push(toPixel(range, range));
                pts.push(toPixel(xVal, range));
            } else {
                pts.push(toPixel(minRange, minRange));
                pts.push(toPixel(xVal, minRange));
                pts.push(toPixel(xVal, range));
                pts.push(toPixel(minRange, range));
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            const py = toPixel(0, yVal).py;
            if (sign === "≥" || sign === ">") {
                pts.push(toPixel(minRange, yVal));
                pts.push(toPixel(range, yVal));
                pts.push(toPixel(range, range));
                pts.push(toPixel(minRange, range));
            } else {
                pts.push(toPixel(minRange, minRange));
                pts.push(toPixel(range, minRange));
                pts.push(toPixel(range, yVal));
                pts.push(toPixel(minRange, yVal));
            }
        }
        return pts.filter(p => p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390);
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
                        Topic 54 — Worked Example 15
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Worked Example 15: <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                            Infeasible Graphical LP
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Walk through complete examples of infeasible LP problems — learn how to identify
                        contradictions and empty feasible regions step by step.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span> 15 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Intermediate
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 dark:hover:shadow-orange-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Problem Statement
                    </h2>
                    <div className="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                        <p className="text-sm text-orange-800 dark:text-orange-300">
                            {currentExample.problemStatement}
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Objective</h3>
                            <p className="text-sm font-mono text-blue-800 dark:text-blue-300 mt-1">
                                {currentExample.objective}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">What to Find</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Determine if the problem is feasible. If not, explain why.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Graphical Solution ===== */}
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
                        <span className="text-3xl">📊</span>
                        Graphical Solution
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Graph all constraints to see if they overlap. If there's no overlap, the problem
                            is infeasible.
                        </p>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowConflictHighlight(!showConflictHighlight)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showConflictHighlight
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showConflictHighlight ? "Hide Highlight" : "Show Highlight"}
                            </button>
                            <button
                                onClick={() => setShowSteps(!showSteps)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showSteps
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showSteps ? "Hide Steps" : "Show Steps"}
                            </button>
                        </div>

                        {/* Example selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {examples.map((ex) => (
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Infeasible example graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t54" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t54)" />

                                    {/* Shading for all constraints */}
                                    {currentExample.constraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            return (
                                                <polygon
                                                    key={`shade-${con.label}`}
                                                    points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill={con.color}
                                                    fillOpacity="0.15"
                                                    stroke="none"
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Conflict highlight */}
                                    {showConflictHighlight && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="65" rx="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#ef4444" className="font-bold">
                                                ⚠️ INFEASIBLE PROBLEM
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                {currentExample.conflictType}
                                            </text>
                                            <text x="30" y="124" fontSize="10" fill="#ef4444">
                                                {currentExample.identification}
                                            </text>
                                        </g>
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
                                    {[100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540].map((v) => {
                                        const val = Math.round((v - 80) / 40);
                                        if (val >= -2 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t54-tick-${v}`}>
                                                    <line x1={v} y1="373" x2={v} y2="387" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <text x={v - 6} y="400" fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                </g>
                                            );
                                        }
                                        return null;
                                    })}
                                    {[100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360].map((v) => {
                                        const val = Math.round((380 - v) / 40);
                                        if (val >= -2 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t54-ytick-${v}`}>
                                                    <line x1="73" y1={v} x2="87" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <text x="50" y={v + 4} fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
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
                                                    strokeWidth="3"
                                                    strokeDasharray={solid ? "none" : "8,6"}
                                                    opacity="0.9"
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Objective label */}
                                    <text x="20" y="50" fontSize="12" fill="#94a3b8" className="font-mono">
                                        {currentExample.objective}
                                    </text>

                                    {/* Infeasible label */}
                                    <text x="20" y="390" fontSize="12" fill="#ef4444" className="font-bold">
                                        ❌ Feasible Region: EMPTY
                                    </text>
                                </svg>
                            </div>

                            {/* Steps panel */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                    <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">
                                        📋 Solution Steps
                                    </h3>
                                    <div className="space-y-1.5">
                                        {currentExample.steps.map((step, idx) => (
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
                                    <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                        <p className="text-sm text-rose-800 dark:text-rose-300 font-medium">
                                            ❌ Conclusion: {currentExample.solution}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full mr-2">
                                {currentExample.constraints.length} constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                ❌ Infeasible
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full ml-2">
                                {currentExample.conflictType}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interpretation ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">💡</span>
                        Interpretation and Lessons
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                <span className="font-semibold">📌 Key Takeaway:</span> Infeasibility means the
                                constraints are contradictory. No solution exists. The problem must be revised.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">What We Learned</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Infeasible problems have no solution</li>
                                    <li>• Constraints can directly conflict</li>
                                    <li>• Requirements may exceed resources</li>
                                    <li>• Upper bounds can be too restrictive</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">What To Do</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Identify conflicting constraints</li>
                                    <li>• Relax or revise constraints</li>
                                    <li>• Check if requirements are realistic</li>
                                    <li>• Re-solve the revised problem</li>
                                </ul>
                            </div>
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
                                <li>Always check feasibility before optimizing.</li>
                                <li>Graph constraints to verify overlap.</li>
                                <li>Look for parallel constraints with opposite signs.</li>
                                <li>Check if requirements exceed available resources.</li>
                                <li>Infeasibility means the model needs revision.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming feasibility without checking.</li>
                                <li>Not graphing constraints to verify overlap.</li>
                                <li>Missing contradictory constraints.</li>
                                <li>Not checking if requirements are realistic.</li>
                                <li>Continuing optimization despite infeasibility.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always check feasibility before optimizing.</li>
                                <li>Graph constraints to see if they overlap.</li>
                                <li>Identify which constraints are contradictory.</li>
                                <li>If infeasible, relax constraints or revise the model.</li>
                                <li>Document the infeasibility for stakeholders.</li>
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
                            <span>I can identify an infeasible LP problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand why infeasibility occurs.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify conflicting constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that infeasibility means no solution exists.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can suggest ways to fix an infeasible problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between infeasible and unbounded problems.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Worked Example 15 – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Worked Example 15 – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic54_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Infeasible problems are important to recognize. I tell my students: 'Before you optimize, make sure your constraints actually allow a solution.' A great exercise: give students a set of constraints and ask them to determine if the problem is feasible. If not, ask them to suggest how to make it feasible by relaxing constraints. This builds practical problem-solving skills."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 54 — Worked Example 15 &bull; Infeasible graphical LP problems
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Unbounded LP Problems (Topic 55)
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

export default Topic54;
