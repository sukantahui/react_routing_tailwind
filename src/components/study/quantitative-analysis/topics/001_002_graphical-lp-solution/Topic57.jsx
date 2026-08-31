import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic57_files/topic57_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic57_files/topic57_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic57 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showUnboundedHighlight, setShowUnboundedHighlight] = useState(true);
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

    // Worked Example 16: Unbounded Maximization Problem
    const examples = [
        {
            id: 0,
            name: "Unbounded Maximization",
            description: "Maximize Z = x + y with x ≥ 0, y ≥ 0",
            problemStatement: "A company wants to maximize profit Z = x + y subject to x ≥ 0, y ≥ 0. Is this problem bounded? Find the optimal solution if it exists.",
            constraints: [
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = x + y",
            isUnbounded: true,
            unboundedReason: "With only non-negativity constraints, x and y can grow infinitely. Z can go to infinity.",
            direction: "Increasing both x and y (northeast direction)",
            keyInsight: "In maximization, if the feasible region is unbounded in the direction of improvement, the objective is unbounded.",
            steps: [
                "Step 1: Graph the constraints x ≥ 0 and y ≥ 0.",
                "  This creates the first quadrant.",
                "Step 2: The feasible region is the entire first quadrant.",
                "  It extends infinitely in the x and y directions.",
                "Step 3: Draw the objective line Z = x + y for different values.",
                "  For Z = 2: x + y = 2",
                "  For Z = 4: x + y = 4",
                "  For Z = 6: x + y = 6",
                "Step 4: Notice that as Z increases, the line moves outward.",
                "  The line never leaves the feasible region.",
                "  There is no upper limit to Z.",
                "Step 5: Conclusion: The problem is UNBOUNDED.",
                "  No finite optimal solution exists.",
                "  Z can go to infinity."
            ]
        },
        {
            id: 1,
            name: "Unbounded with Lower Bound",
            description: "Maximize Z = x + y with x + y ≥ 5, x ≥ 0, y ≥ 0",
            problemStatement: "A company wants to maximize profit Z = x + y subject to x + y ≥ 5, x ≥ 0, y ≥ 0. Is this problem bounded?",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = x + y",
            isUnbounded: true,
            unboundedReason: "The constraint x+y≥5 is a lower bound. x and y can still grow infinitely.",
            direction: "Increasing both x and y (northeast direction)",
            keyInsight: "Lower bound constraints do not prevent unboundedness in maximization.",
            steps: [
                "Step 1: Graph the constraints x ≥ 0, y ≥ 0, and x + y ≥ 5.",
                "  This creates the region above the line x + y = 5.",
                "Step 2: The feasible region extends infinitely in the northeast direction.",
                "Step 3: Draw the objective line Z = x + y for different values.",
                "  For Z = 6: x + y = 6 (above the constraint)",
                "  For Z = 8: x + y = 8",
                "  For Z = 10: x + y = 10",
                "Step 4: As Z increases, the line moves outward.",
                "  The line never leaves the feasible region.",
                "  There is no upper limit to Z.",
                "Step 5: Conclusion: The problem is UNBOUNDED.",
                "  No finite optimal solution exists."
            ]
        },
        {
            id: 2,
            name: "Unbounded with One Upper Bound",
            description: "Maximize Z = 2x + y with y ≤ 5, x ≥ 0, y ≥ 0",
            problemStatement: "A company wants to maximize profit Z = 2x + y subject to y ≤ 5, x ≥ 0, y ≥ 0. Is this problem bounded?",
            constraints: [
                { label: "y ≤ 5", a: 0, b: 1, c: 5, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "Z = 2x + y",
            isUnbounded: true,
            unboundedReason: "While y is bounded above by 5, x has no upper bound. Z can go to infinity as x increases.",
            direction: "Increasing x (right direction)",
            keyInsight: "Even with one upper bound, if another variable is unbounded, the problem is unbounded.",
            steps: [
                "Step 1: Graph the constraints x ≥ 0, y ≥ 0, and y ≤ 5.",
                "  This creates a strip: 0 ≤ y ≤ 5, x ≥ 0.",
                "Step 2: The feasible region extends infinitely to the right.",
                "Step 3: Draw the objective line Z = 2x + y for different values.",
                "  For Z = 4: 2x + y = 4",
                "  For Z = 8: 2x + y = 8",
                "  For Z = 12: 2x + y = 12",
                "Step 4: As Z increases, the line moves right.",
                "  The line never leaves the feasible region.",
                "  There is no upper limit to Z.",
                "Step 5: Conclusion: The problem is UNBOUNDED.",
                "  No finite optimal solution exists."
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
        const minRange = -1;
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
        const minRange = -1;
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

    // Get objective line at a specific Z value
    const getObjectiveLineAtZ = (Z) => {
        const { objective } = currentExample;
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
            for (let x = -1; x <= range + 1; x += 0.1) {
                const y = (Z - a * x) / b;
                if (y >= -1 && y <= range + 1) {
                    const p = toPixel(x, y);
                    if (p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390) {
                        points.push(p);
                    }
                }
            }
        }
        return points;
    };

    // Generate multiple objective lines to show unboundedness
    const generateMultipleLines = () => {
        const lines = [];
        const values = [2, 4, 6, 8, 10, 12];
        values.forEach(value => {
            lines.push({
                value,
                points: getObjectiveLineAtZ(value),
            });
        });
        return lines;
    };

    const multipleLines = generateMultipleLines();

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        Topic 57 — Worked Example 16
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Worked Example 16: <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                            Unbounded Maximization
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Walk through complete examples of unbounded maximization problems — learn to identify
                        when no finite optimal solution exists.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> 15 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Intermediate
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Problem Statement
                    </h2>
                    <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                        <p className="text-sm text-amber-800 dark:text-amber-300">
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
                                Determine if the problem is bounded. If not, explain why.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Graphical Solution ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5 dark:hover:shadow-yellow-400/5",
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
                            Graph all constraints and observe the behavior of the objective line. Notice how
                            it keeps moving outward without bound.
                        </p>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowUnboundedHighlight(!showUnboundedHighlight)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showUnboundedHighlight
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showUnboundedHighlight ? "Hide Highlight" : "Show Highlight"}
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
                                            ? "bg-amber-600 dark:bg-amber-500 text-white border-amber-600 dark:border-amber-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-amber-400 dark:hover:border-amber-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Unbounded maximization graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t57" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t57)" />

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

                                    {/* Multiple objective lines showing unboundedness */}
                                    {multipleLines.map((line, idx) => {
                                        const colors = ["#94a3b8", "#a8b5c8", "#bcc8d8", "#d0dae8", "#e4ecf8", "#f0f5ff"];
                                        const color = colors[idx % colors.length];
                                        if (line.points.length > 1) {
                                            return (
                                                <polyline
                                                    key={idx}
                                                    points={line.points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={color}
                                                    strokeWidth="2"
                                                    strokeDasharray="4,4"
                                                    opacity="0.7"
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Unbounded highlight */}
                                    {showUnboundedHighlight && currentExample.isUnbounded && (
                                        <g>
                                            <rect x="20" y="70" width="290" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="2" />
                                            <text x="30" y="90" fontSize="14" fill="#ef4444" className="font-bold">
                                                ∞ UNBOUNDED MAXIMIZATION
                                            </text>
                                            <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                {currentExample.objective} can go to infinity
                                            </text>
                                            <text x="30" y="126" fontSize="10" fill="#ef4444">
                                                Direction: {currentExample.direction}
                                            </text>
                                        </g>
                                    )}

                                    {/* Direction arrow */}
                                    <g>
                                        <polyline
                                            points="480,320 500,300 500,320"
                                            fill="none"
                                            stroke="#ef4444"
                                            strokeWidth="2"
                                        />
                                        <polygon points="500,295 505,305 495,305" fill="#ef4444" />
                                        <text x="505" y="290" fontSize="10" fill="#ef4444" className="font-bold">
                                            ∞
                                        </text>
                                        <text x="490" y="335" fontSize="9" fill="#ef4444">
                                            Z increases
                                        </text>
                                    </g>

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
                                        if (val >= -1 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t57-tick-${v}`}>
                                                    <line x1={v} y1="373" x2={v} y2="387" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <text x={v - 6} y="400" fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                </g>
                                            );
                                        }
                                        return null;
                                    })}
                                    {[100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360].map((v) => {
                                        const val = Math.round((380 - v) / 40);
                                        if (val >= -1 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t57-ytick-${v}`}>
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
                                    <text x="20" y="50" fontSize="13" fill="#f59e0b" className="font-mono font-bold">
                                        {currentExample.objective}
                                    </text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {currentExample.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Steps panel */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                    <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-3">
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
                                            ❌ Conclusion: {currentExample.isUnbounded ? "UNBOUNDED" : "Bounded"}
                                        </p>
                                        <p className="text-sm text-rose-800 dark:text-rose-300">
                                            No finite optimal solution exists.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full mr-2">
                                {currentExample.constraints.length} constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                ❌ Unbounded
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full ml-2">
                                {currentExample.objective}
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
                                <span className="font-semibold">📌 Key Takeaway:</span> Unbounded maximization
                                means the objective can go to infinity. No finite optimal solution exists. The
                                problem needs additional upper-bound constraints.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">What We Learned</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Unbounded maximization has no finite optimum</li>
                                    <li>• The objective can go to infinity</li>
                                    <li>• Missing upper bounds causes unboundedness</li>
                                    <li>• Lower bounds don't prevent unboundedness</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">What To Do</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Add upper bound constraints</li>
                                    <li>• Check if variables have no upper bounds</li>
                                    <li>• Revise the model to make it bounded</li>
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
                                <li>Check if the region extends in the direction of objective improvement.</li>
                                <li>Look for missing upper bounds on variables.</li>
                                <li>In maximization, unbounded = no finite optimum.</li>
                                <li>Add constraints to make the problem bounded.</li>
                                <li>Always check feasibility before optimizing.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming a finite optimum exists in unbounded problems.</li>
                                <li>Not checking if the objective is bounded.</li>
                                <li>Confusing unbounded with infeasible.</li>
                                <li>Not adding upper bounds when needed.</li>
                                <li>Forgetting that lower bounds don't prevent unboundedness.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Check if the feasible region is bounded.</li>
                                <li>Determine if the objective is bounded in the unbounded direction.</li>
                                <li>Ensure there are upper bounds on variables for maximization.</li>
                                <li>Add constraints to make the problem bounded if needed.</li>
                                <li>Document the unboundedness and suggested fixes.</li>
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
                            <span>I can identify an unbounded maximization problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand why unbounded maximization occurs.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that unbounded maximization has no finite optimum.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify the direction of unboundedness.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can suggest ways to make a maximization problem bounded.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between unbounded maximization and minimization.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Worked Example 16 – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Worked Example 16 – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic57_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Unbounded maximization is a common issue in LP. I tell my students: 'If you can keep increasing the objective forever, you've got an unbounded problem — and no finite answer.' The key is recognizing that missing upper bounds cause unboundedness. A great exercise: give students an unbounded problem and ask them to add constraints to make it bounded."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 57 — Worked Example 16 &bull; Unbounded maximization problems
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Worked Example 17: Unbounded Minimization (Topic 58)
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

export default Topic57;