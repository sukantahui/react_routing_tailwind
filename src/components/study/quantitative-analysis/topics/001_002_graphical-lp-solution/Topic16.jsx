import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic16_files/topic16_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic16_files/topic16_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic16 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showSteps, setShowSteps] = useState(true);
    const [showIntersection, setShowIntersection] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples showing different types of intersections
    const examples = [
        {
            id: 0,
            name: "Standard Intersection",
            description: "Two lines intersecting at a unique point",
            constraints: [
                { label: "x + y = 10", a: 1, b: 1, c: 10, sign: "=", color: "#8b5cf6" },
                { label: "2x + y = 14", a: 2, b: 1, c: 14, sign: "=", color: "#f59e0b" },
            ],
            intersection: { x: 4, y: 6 },
            type: "unique",
            steps: [
                "1. Write both equations:",
                "   x + y = 10  ... (1)",
                "   2x + y = 14 ... (2)",
                "2. Subtract (1) from (2):",
                "   (2x + y) - (x + y) = 14 - 10",
                "   x = 4",
                "3. Substitute x = 4 into (1):",
                "   4 + y = 10",
                "   y = 6",
                "4. Intersection point: (4, 6)"
            ],
            explanation: "Unique intersection where two distinct lines cross."
        },
        {
            id: 1,
            name: "Intersection with Vertical Line",
            description: "A line intersecting a vertical constraint",
            constraints: [
                { label: "2x + 3y = 12", a: 2, b: 3, c: 12, sign: "=", color: "#8b5cf6" },
                { label: "x = 3", a: 1, b: 0, c: 3, sign: "=", color: "#10b981" },
            ],
            intersection: { x: 3, y: 2 },
            type: "vertical",
            steps: [
                "1. Write both equations:",
                "   2x + 3y = 12 ... (1)",
                "   x = 3         ... (2)",
                "2. Substitute x = 3 into (1):",
                "   2(3) + 3y = 12",
                "   6 + 3y = 12",
                "   3y = 6",
                "   y = 2",
                "3. Intersection point: (3, 2)"
            ],
            explanation: "Intersection of a sloped line with a vertical line at x=3."
        },
        {
            id: 2,
            name: "Intersection with Horizontal Line",
            description: "A line intersecting a horizontal constraint",
            constraints: [
                { label: "3x + 4y = 24", a: 3, b: 4, c: 24, sign: "=", color: "#8b5cf6" },
                { label: "y = 3", a: 0, b: 1, c: 3, sign: "=", color: "#10b981" },
            ],
            intersection: { x: 4, y: 3 },
            type: "horizontal",
            steps: [
                "1. Write both equations:",
                "   3x + 4y = 24 ... (1)",
                "   y = 3         ... (2)",
                "2. Substitute y = 3 into (1):",
                "   3x + 4(3) = 24",
                "   3x + 12 = 24",
                "   3x = 12",
                "   x = 4",
                "3. Intersection point: (4, 3)"
            ],
            explanation: "Intersection of a sloped line with a horizontal line at y=3."
        },
        {
            id: 3,
            name: "Intersection at Origin",
            description: "Both lines passing through the origin",
            constraints: [
                { label: "2x - y = 0", a: 2, b: -1, c: 0, sign: "=", color: "#8b5cf6" },
                { label: "x + 2y = 0", a: 1, b: 2, c: 0, sign: "=", color: "#f59e0b" },
            ],
            intersection: { x: 0, y: 0 },
            type: "origin",
            steps: [
                "1. Write both equations:",
                "   2x - y = 0   ... (1)",
                "   x + 2y = 0   ... (2)",
                "2. From (1): y = 2x",
                "3. Substitute into (2):",
                "   x + 2(2x) = 0",
                "   x + 4x = 0",
                "   5x = 0",
                "   x = 0",
                "4. Substitute back: y = 2(0) = 0",
                "5. Intersection point: (0, 0)"
            ],
            explanation: "Both lines pass through the origin — intersection at (0,0)."
        },
        {
            id: 4,
            name: "Parallel Lines",
            description: "Lines that never intersect (no solution)",
            constraints: [
                { label: "x + y = 10", a: 1, b: 1, c: 10, sign: "=", color: "#8b5cf6" },
                { label: "x + y = 5", a: 1, b: 1, c: 5, sign: "=", color: "#f59e0b" },
            ],
            intersection: null,
            type: "parallel",
            steps: [
                "1. Write both equations:",
                "   x + y = 10 ... (1)",
                "   x + y = 5  ... (2)",
                "2. Subtract (2) from (1):",
                "   (x + y) - (x + y) = 10 - 5",
                "   0 = 5",
                "3. This is a contradiction!",
                "4. Conclusion: The lines are parallel",
                "   They never intersect — no solution"
            ],
            explanation: "Parallel lines have no intersection. They represent contradictory constraints."
        },
        {
            id: 5,
            name: "Coincident Lines",
            description: "Lines that are the same (infinite solutions)",
            constraints: [
                { label: "x + y = 10", a: 1, b: 1, c: 10, sign: "=", color: "#8b5cf6" },
                { label: "2x + 2y = 20", a: 2, b: 2, c: 20, sign: "=", color: "#f59e0b" },
            ],
            intersection: null,
            type: "coincident",
            steps: [
                "1. Write both equations:",
                "   x + y = 10   ... (1)",
                "   2x + 2y = 20 ... (2)",
                "2. Divide (2) by 2:",
                "   x + y = 10",
                "3. Both equations are identical!",
                "4. Conclusion: The lines coincide",
                "   They have infinitely many intersection points"
            ],
            explanation: "Coincident lines are the same line. Infinite intersection points."
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
            for (let x = -2; x &le; range; x += 0.05) {
                const y = (c - a * x) / b;
                if (y >= -2 && y <= range) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -2 && xVal &le; range) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -2 && yVal <= range) {
                const py = 200 - yVal * 40;
                points.push({ px: 20, py });
                points.push({ px: 380, py });
            }
        }
        return points;
    };

    // Determine if a constraint is solid (≥ or ≤)
    const isSolid = (sign) => sign === "≥" || sign === "≤" || sign === "=";

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        Topic 16 — Line Intersections
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Intersection of <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Two Constraint Lines
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Master the critical skill of finding where two constraints meet — the foundation of
                        determining corner points in linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is the Intersection of Two Lines? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        What is the Intersection of Two Constraint Lines?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-cyan-600 dark:text-cyan-400">intersection</strong> of two
                            constraint lines is the point where they cross. This point is a <strong>corner point</strong>{" "}
                            of the feasible region — a candidate for the optimal solution.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The point (x, y) that satisfies both line equations.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">Role in LP</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Every corner point is the intersection of two constraint lines.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Solution</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Found by solving two linear equations simultaneously.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> The intersection point
                                represents the solution where two constraints are both <strong>binding</strong>{" "}
                                (active). This is where resources are fully utilized.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Types of Intersections ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        Types of Intersections
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">✓ Unique</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Lines cross at exactly one point.
                                </p>
                                <p className="text-xs font-mono mt-1">x + y = 10, 2x + y = 14 → (4,6)</p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">∥ Parallel</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Lines never cross — no solution.
                                </p>
                                <p className="text-xs font-mono mt-1">x + y = 10, x + y = 5 → No intersection</p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">≡ Coincident</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Lines are identical — infinite solutions.
                                </p>
                                <p className="text-xs font-mono mt-1">x + y = 10, 2x + 2y = 20 → Same line</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Observe carefully:</span> In LP, we're usually
                                looking for <strong>unique</strong> intersections. Parallel lines represent
                                conflicting constraints (infeasible), while coincident lines represent redundant
                                constraints.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Intersection Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Interactive Intersection Explorer
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select different examples to see how two constraint lines intersect. Each example
                            demonstrates a different type of intersection.
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
                                            ? "bg-cyan-600 dark:bg-cyan-500 text-white border-cyan-600 dark:border-cyan-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500"
                                    )}
                                &gt;
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowIntersection(!showIntersection)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showIntersection
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showIntersection ? "Hide Point" : "Show Point"}
                            </button>
                            <button
                                onClick={() => setShowSteps(!showSteps)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showSteps
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showSteps ? "Hide Steps" : "Show Steps"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Intersection explorer">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t16" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="400" height="400" fill="url(#grid_t16)" />

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
                                        if (val &ge; -2 && val &le; 12) {
                                            return (
                                                <g key={`t16-tick-${v}`}>
                                                    <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                    <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                    {v &ge; 40 && v &le; 360 && val !== 0 && val >= -2 && val <= 10 && (
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
                                                    strokeWidth="3"
                                                    strokeDasharray={solid ? "none" : "8,6"}
                                                    opacity="0.9"
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Intersection point */}
                                    {showIntersection && currentExample.intersection && (() => {
                                        const { px, py } = toPixel(currentExample.intersection.x, currentExample.intersection.y);
                                        return (
                                            <g>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r="12"
                                                    fill="#f59e0b"
                                                    fillOpacity="0.2"
                                                    className=""
                                                />
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r="8"
                                                    fill="#f59e0b"
                                                    stroke="#fff"
                                                    strokeWidth="2.5"
                                                    className=""
                                                />
                                                <text
                                                    x={px + 14}
                                                    y={py - 10}
                                                    fontSize="14"
                                                    fill="#f59e0b"
                                                    className="font-mono font-bold"
                                                >
                                                    ({currentExample.intersection.x}, {currentExample.intersection.y})
                                                </text>
                                            </g>
                                        );
                                    })()}

                                    {/* No intersection message */}
                                    {showIntersection && !currentExample.intersection && (
                                        <g>
                                            <text x="150" y="200" fontSize="16" fill="#ef4444" className="font-bold text-center">
                                                No Intersection
                                            </text>
                                            <text x="120" y="220" fontSize="12" fill="#94a3b8" className="text-center">
                                                {currentExample.type === "parallel" ? "Lines are parallel" : "Lines are coincident"}
                                            </text>
                                        </g>
                                    )}

                                    {/* Type badge */}
                                    <rect x="20" y="20" width="100" height="24" rx="4" fill="white" fillOpacity="0.9" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                    <text x="28" y="36" fontSize="11" fill="#475569" className="dark:fill-slate-400 font-medium">
                                        Type: {currentExample.type}
                                    </text>

                                    {/* Labels for constraints */}
                                    {currentExample.constraints.map((con, idx) => (
                                        <text
                                            key={`label-${idx}`}
                                            x="20"
                                            y={380 - (idx * 20)}
                                            fontSize="10"
                                            fill={con.color}
                                            className="font-mono"
                                            opacity="0.8"
                                        >
                                            {con.label}
                                        </text>
                                    ))}
                                </svg>
                            </div>

                            {/* Steps and Explanation */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[400px]">
                                    <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
                                        Step-by-Step Solution
                                    </h3>
                                    <div className="space-y-2">
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
                                    <div className="mt-3 p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                        <p className="text-sm text-cyan-800 dark:text-cyan-300">
                                            <span className="font-semibold">📌 </span>
                                            {currentExample.explanation}
                                        </p>
                                    </div>
                                    {currentExample.intersection && (
                                        <div className="mt-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                            <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                                                ✓ Intersection: ({currentExample.intersection.x}, {currentExample.intersection.y})
                                            </p>
                                        </div>
                                    )}
                                    {!currentExample.intersection && (
                                        <div className="mt-2 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                            <p className="text-sm text-rose-800 dark:text-rose-300 font-medium">
                                                ✗ No intersection point
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className={clsx(
                                "inline-block px-3 py-1 rounded-full mr-2",
                                currentExample.type === "unique" ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" :
                                currentExample.type === "parallel" ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300" :
                                currentExample.type === "coincident" ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" :
                                "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300"
                            )}>
                                {currentExample.type.charAt(0).toUpperCase() + currentExample.type.slice(1)} intersection
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                                {currentExample.constraints.length} constraints
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Intersection Methods ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        Methods for Finding Intersections
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">1. Substitution</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Solve one equation for a variable, substitute into the other.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-800 p-2 rounded">
                                    x + y = 10 → y = 10 - x<br/>
                                    2x + y = 14 → 2x + (10-x) = 14
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">2. Elimination</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Add or subtract equations to eliminate a variable.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-800 p-2 rounded">
                                    x + y = 10<br/>
                                    2x + y = 14<br/>
                                    Subtract → x = 4
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Graphical</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Read the intersection point directly from the graph.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-800 p-2 rounded">
                                    Look where lines cross<br/>
                                    Estimate coordinates from grid
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Pro tip:</span> Use elimination when
                                coefficients align nicely. Use substitution when one equation is easily solved
                                for a variable. Use graphical for quick visualization and verification.
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
                            <div className="font-semibold text-cyan-600 dark:text-cyan-400">Production Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-cyan-600 dark:text-cyan-400">Ichapur</span>{" "}
                                has constraints: {`2x + 3y = 12`} (machine hours) and {`x + 2y = 8`} (labor hours).
                                Their intersection (2,2) shows the production mix that uses exactly all resources.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-teal-600 dark:text-teal-400">Resource Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-teal-600 dark:text-teal-400">Kolkata</span>,
                                a project manager finds where budget and time constraints intersect. This point
                                represents the optimal allocation of resources.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Mamata</span>{" "}
                                finds where calorie and protein constraints intersect. This gives the exact
                                combination of foods meeting both requirements.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Investment Portfolio</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-amber-600 dark:text-amber-400">Jadavpur</span>{" "}
                                finds where risk and return constraints intersect. This point represents the
                                optimal portfolio allocation.
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
                                <li>Choose elimination when coefficients align nicely.</li>
                                <li>Choose substitution when one equation is easy to solve.</li>
                                <li>Always check if the intersection satisfies all constraints.</li>
                                <li>Use graphical methods to verify algebraic solutions.</li>
                                <li>Watch for parallel and coincident lines.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Not checking if the intersection is feasible.</li>
                                <li>Confusing substitution and elimination methods.</li>
                                <li>Missing parallel lines (no solution).</li>
                                <li>Missing coincident lines (infinite solutions).</li>
                                <li>Arithmetic errors in solving systems.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Write both equations in standard form.</li>
                                <li>Choose the easiest method for the problem.</li>
                                <li>Always verify the solution by substitution.</li>
                                <li>Check for special cases (parallel, coincident).</li>
                                <li>Use both graphical and algebraic methods to cross-check.</li>
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
                            <span>I can find the intersection of two lines using substitution.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the intersection using elimination.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify parallel and coincident lines.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify if an intersection is feasible.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that intersections become corner points.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find intersections for special cases (vertical/horizontal).</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Intersection of Two Constraint Lines – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Intersection of Two Constraint Lines – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic16_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Understanding line intersections is crucial for LP. I tell my students: 'The intersection of two constraints is where resources are fully utilized — a corner point.' The three cases (unique, parallel, coincident) correspond to the three types of solutions to a system of equations. I recommend having students practice with simple systems first, then moving to more complex ones. Always emphasize verification — substituting back into both equations to check the solution."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 16 — Intersection of Two Constraint Lines &bull; Foundation of corner points
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Determining Whether a Point Satisfies All Constraints (Topic 17)
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

export default Topic16;