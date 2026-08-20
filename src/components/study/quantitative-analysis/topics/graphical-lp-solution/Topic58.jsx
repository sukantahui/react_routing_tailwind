import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic58_files/topic58_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic58_files/topic58_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic58 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showBoundedHighlight, setShowBoundedHighlight] = useState(true);
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

    // Worked Example 17: Unbounded Minimization Problem
    const examples = [
        {
            id: 0,
            name: "Bounded Minimization",
            description: "Minimize C = x + y with x ≥ 0, y ≥ 0, x + y ≥ 5",
            problemStatement: "A company wants to minimize cost C = x + y subject to x ≥ 0, y ≥ 0, x + y ≥ 5. Is this problem bounded? Find the optimal solution if it exists.",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = x + y",
            isUnbounded: false,
            unboundedReason: "Even though the region is unbounded, the objective C = x + y has a minimum at the boundary x+y=5.",
            direction: "Moving toward the origin (southwest direction) until hitting the constraint",
            keyInsight: "Unbounded regions can still have optimal solutions for minimization problems if the objective decreases toward the region.",
            steps: [
                "Step 1: Graph the constraints x ≥ 0, y ≥ 0, and x + y ≥ 5.",
                "  This creates the region above the line x + y = 5.",
                "Step 2: The feasible region extends infinitely in the northeast direction.",
                "Step 3: Draw the objective line C = x + y for different values.",
                "  For C = 6: x + y = 6 (above the constraint)",
                "  For C = 5: x + y = 5 (on the constraint)",
                "  For C = 4: x + y = 4 (below the constraint - infeasible)",
                "Step 4: As C decreases, the line moves toward the origin.",
                "  The smallest C that still touches the region is C = 5.",
                "Step 5: Conclusion: The problem is BOUNDED for minimization.",
                "  Optimal solution: C = 5 at (5,0) or (0,5)."
            ]
        },
        {
            id: 1,
            name: "Unbounded Minimization",
            description: "Minimize C = -x - y with x ≥ 0, y ≥ 0, x + y ≥ 5",
            problemStatement: "A company wants to minimize cost C = -x - y subject to x ≥ 0, y ≥ 0, x + y ≥ 5. Is this problem bounded?",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = -x - y",
            isUnbounded: true,
            unboundedReason: "The objective C = -x - y decreases as x and y increase. Since the region is unbounded in the northeast direction, C can go to negative infinity.",
            direction: "Increasing both x and y (northeast direction) → C decreases",
            keyInsight: "Unbounded minimization occurs when the objective decreases in the unbounded direction of the feasible region.",
            steps: [
                "Step 1: Graph the constraints x ≥ 0, y ≥ 0, and x + y ≥ 5.",
                "  This creates the region above the line x + y = 5.",
                "Step 2: The feasible region extends infinitely in the northeast direction.",
                "Step 3: Draw the objective line C = -x - y for different values.",
                "  For C = -6: -x - y = -6 → x + y = 6",
                "  For C = -8: -x - y = -8 → x + y = 8",
                "  For C = -10: -x - y = -10 → x + y = 10",
                "Step 4: As C decreases (more negative), the line moves outward.",
                "  The line never leaves the feasible region.",
                "  There is no lower limit to C.",
                "Step 5: Conclusion: The problem is UNBOUNDED for minimization.",
                "  No finite optimal solution exists."
            ]
        },
        {
            id: 2,
            name: "Bounded Minimization with Upper Bound",
            description: "Minimize C = x + y with x ≥ 0, y ≥ 0, x + y ≥ 5, x ≤ 10, y ≤ 10",
            problemStatement: "A company wants to minimize cost C = x + y subject to x ≥ 0, y ≥ 0, x + y ≥ 5, x ≤ 10, y ≤ 10. Is this problem bounded?",
            constraints: [
                { label: "x + y ≥ 5", a: 1, b: 1, c: 5, sign: "≥", color: "#8b5cf6" },
                { label: "x ≤ 10", a: 1, b: 0, c: 10, sign: "≤", color: "#f59e0b" },
                { label: "y ≤ 10", a: 0, b: 1, c: 10, sign: "≤", color: "#ef4444" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            objective: "C = x + y",
            isUnbounded: false,
            unboundedReason: "The upper bounds x≤10 and y≤10 make the region bounded. The minimum is still at the boundary x+y=5.",
            direction: "Moving toward the origin until hitting x+y=5",
            keyInsight: "Adding upper bounds makes the region bounded, but the optimal solution may still be at the same boundary.",
            steps: [
                "Step 1: Graph all constraints: x≥0, y≥0, x+y≥5, x≤10, y≤10.",
                "  This creates a bounded region.",
                "Step 2: The feasible region is now a polygon.",
                "Step 3: Draw the objective line C = x + y for different values.",
                "  C = 6: x + y = 6",
                "  C = 5: x + y = 5",
                "  C = 4: x + y = 4 (infeasible)",
                "Step 4: The minimum is at C = 5 on the boundary.",
                "Step 5: Conclusion: The problem is BOUNDED.",
                "  Optimal solution: C = 5 at (5,0) or (0,5)."
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

    // Get objective line at a specific C value
    const getObjectiveLineAtC = (C) => {
        const { objective } = currentExample;
        let parts = objective.replace("C = ", "").split(" + ");
        // Handle negative coefficients
        if (objective.includes("-")) {
            parts = objective.replace("C = ", "").split(" - ");
            let a = 0, b = 0;
            if (parts[0].includes("x")) {
                a = parseFloat(parts[0].replace("x", "")) || 1;
            }
            if (parts[0].includes("y")) {
                b = parseFloat(parts[0].replace("y", "")) || 1;
            }
            if (parts.length > 1) {
                if (parts[1].includes("x")) {
                    a = -parseFloat(parts[1].replace("x", "")) || -1;
                }
                if (parts[1].includes("y")) {
                    b = -parseFloat(parts[1].replace("y", "")) || -1;
                }
            }
            const points = [];
            const range = 12;
            if (b !== 0) {
                for (let x = -1; x <= range + 1; x += 0.1) {
                    const y = (C - a * x) / b;
                    if (y >= -1 && y <= range + 1) {
                        const p = toPixel(x, y);
                        if (p.px >= 40 && p.px <= 560 && p.py >= 20 && p.py <= 390) {
                            points.push(p);
                        }
                    }
                }
            }
            return points;
        }
        // Handle positive coefficients
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
                const y = (C - a * x) / b;
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

    // Generate multiple objective lines
    const generateMultipleLines = () => {
        const lines = [];
        const objective = currentExample.objective;
        const isMin = objective.includes("C");
        let values;
        if (objective.includes("-")) {
            values = [-12, -10, -8, -6, -4];
        } else {
            values = [2, 3, 4, 5, 6, 7];
        }
        values.forEach(value => {
            lines.push({
                value,
                points: getObjectiveLineAtC(value),
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        Topic 58 — Worked Example 17
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Worked Example 17: <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Unbounded Minimization
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Explore how minimization problems behave in unbounded regions — sometimes they have
                        optimal solutions, and sometimes they don't.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 15 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span> Intermediate
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Problem Statement
                    </h2>
                    <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                        <p className="text-sm text-emerald-800 dark:text-emerald-300">
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
                                Determine if the problem is bounded. Find the optimal solution if it exists.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Graphical Solution ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
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
                            Graph all constraints and observe the behavior of the objective line. Notice whether
                            the objective decreases without bound or hits a boundary.
                        </p>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowBoundedHighlight(!showBoundedHighlight)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showBoundedHighlight
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showBoundedHighlight ? "Hide Highlight" : "Show Highlight"}
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
                                            ? "bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Unbounded minimization graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t58" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t58)" />

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

                                    {/* Multiple objective lines */}
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

                                    {/* Bounded/Unbounded highlight */}
                                    {showBoundedHighlight && (
                                        currentExample.isUnbounded ? (
                                            <g>
                                                <rect x="20" y="70" width="290" height="80" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="2" />
                                                <text x="30" y="90" fontSize="14" fill="#ef4444" className="font-bold">
                                                    ∞ UNBOUNDED MINIMIZATION
                                                </text>
                                                <text x="30" y="108" fontSize="11" fill="#ef4444">
                                                    {currentExample.objective} can go to -∞
                                                </text>
                                                <text x="30" y="126" fontSize="10" fill="#ef4444">
                                                    Direction: {currentExample.direction}
                                                </text>
                                            </g>
                                        ) : (
                                            <g>
                                                <rect x="20" y="70" width="280" height="65" rx="6" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="2" />
                                                <text x="30" y="90" fontSize="14" fill="#10b981" className="font-bold">
                                                    ✓ BOUNDED MINIMIZATION
                                                </text>
                                                <text x="30" y="108" fontSize="11" fill="#10b981">
                                                    Optimal exists at the boundary
                                                </text>
                                            </g>
                                        )
                                    )}

                                    {/* Direction arrow for unbounded */}
                                    {currentExample.isUnbounded && (
                                        <g>
                                            <polyline
                                                points="480,320 500,300 500,320"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="2"
                                            />
                                            <polygon points="500,295 505,305 495,305" fill="#ef4444" />
                                            <text x="505" y="290" fontSize="10" fill="#ef4444" className="font-bold">
                                                -∞
                                            </text>
                                            <text x="490" y="335" fontSize="9" fill="#ef4444">
                                                C decreases
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
                                        if (val >= -1 && val <= 12 && val % 1 === 0) {
                                            return (
                                                <g key={`t58-tick-${v}`}>
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
                                                <g key={`t58-ytick-${v}`}>
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
                                    <text x="20" y="50" fontSize="13" fill="#10b981" className="font-mono font-bold">
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
                                    <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
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
                                            {currentExample.isUnbounded ? "❌ UNBOUNDED" : "✓ BOUNDED"}
                                        </p>
                                        <p className="text-sm text-rose-800 dark:text-rose-300">
                                            {currentExample.isUnbounded 
                                                ? "No finite optimal solution exists." 
                                                : "Optimal solution exists at the boundary."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className={clsx(
                                "inline-block px-3 py-1 rounded-full mr-2",
                                currentExample.isUnbounded 
                                    ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                                    : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                            )}>
                                {currentExample.isUnbounded ? "❌ Unbounded" : "✓ Bounded"}
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {currentExample.constraints.length} constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full ml-2">
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
                                <span className="font-semibold">📌 Key Takeaway:</span> In minimization,
                                unbounded regions can have optimal solutions if the objective decreases toward
                                the region. But if the objective decreases in the unbounded direction, the
                                problem is unbounded.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">What We Learned</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Unbounded regions can have optimal solutions for minimization</li>
                                    <li>• The objective direction determines boundedness</li>
                                    <li>• If the objective decreases toward the region → bounded</li>
                                    <li>• If the objective decreases in the unbounded direction → unbounded</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">What To Do</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Check the direction of objective improvement</li>
                                    <li>• If unbounded, add constraints or revise the objective</li>
                                    <li>• If bounded, find the optimal solution at the boundary</li>
                                    <li>• Document the boundedness status</li>
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
                                <li>Check if the objective decreases toward the unbounded direction.</li>
                                <li>For minimization, unbounded regions may still have optimal solutions.</li>
                                <li>If the objective has negative coefficients, check the direction carefully.</li>
                                <li>Add upper bounds if a finite solution is needed.</li>
                                <li>Always verify if the objective is bounded in the unbounded direction.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Assuming unbounded regions always have no optimal solution.</li>
                                <li>Not checking the objective direction for minimization.</li>
                                <li>Confusing unbounded minimization with maximization.</li>
                                <li>Not adding upper bounds when needed.</li>
                                <li>Forgetting that negative objective coefficients change the direction.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Check if the objective is bounded in the unbounded direction.</li>
                                <li>For minimization, unbounded regions may still have optimal solutions.</li>
                                <li>Add constraints to make the problem bounded if needed.</li>
                                <li>Document the boundedness status.</li>
                                <li>Verify the optimal solution by substitution.</li>
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
                            <span>I can identify bounded minimization in unbounded regions.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify unbounded minimization problems.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand why boundedness depends on objective direction.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that unbounded regions can have optimal solutions for minimization.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between unbounded minimization and maximization.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can suggest ways to make a minimization problem bounded.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Worked Example 17 – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Worked Example 17 – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic58_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "The key to understanding unbounded minimization is the direction of the objective. I tell my students: 'For minimization, the question is: does the objective decrease toward the region or into infinity?' A great exercise: give students an unbounded region and ask them to find an objective that is bounded and one that is unbounded. This builds intuition about how the objective function interacts with the feasible region."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 58 — Worked Example 17 &bull; Unbounded minimization problems
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Redundant Constraints (Topic 59)
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

export default Topic58;