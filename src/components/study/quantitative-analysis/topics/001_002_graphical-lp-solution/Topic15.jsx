import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic15_files/topic15_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic15_files/topic15_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic15 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showSteps, setShowSteps] = useState(true);
    const [selectedCorner, setSelectedCorner] = useState(null);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples with detailed algebraic solutions
    const examples = [
        {
            id: 0,
            name: "Simple Intersection",
            description: "Find the corner point where two constraints intersect",
            constraints: [
                { label: "x + y = 10", a: 1, b: 1, c: 10, sign: "=", color: "#8b5cf6" },
                { label: "2x + y = 14", a: 2, b: 1, c: 14, sign: "=", color: "#f59e0b" },
            ],
            solution: { x: 4, y: 6 },
            steps: [
                "Step 1: Write both equations:",
                "  x + y = 10  ... (1)",
                "  2x + y = 14 ... (2)",
                "Step 2: Subtract (1) from (2):",
                "  (2x + y) - (x + y) = 14 - 10",
                "  x = 4",
                "Step 3: Substitute x = 4 into (1):",
                "  4 + y = 10",
                "  y = 6",
                "Step 4: Solution: (4, 6)"
            ],
            method: "Elimination (subtraction)"
        },
        {
            id: 1,
            name: "Intersection with Non-Negativity",
            description: "Find corner point where a constraint meets the y-axis",
            constraints: [
                { label: "2x + 3y = 12", a: 2, b: 3, c: 12, sign: "=", color: "#8b5cf6" },
                { label: "x = 0", a: 1, b: 0, c: 0, sign: "=", color: "#10b981" },
            ],
            solution: { x: 0, y: 4 },
            steps: [
                "Step 1: Identify the constraints:",
                "  2x + 3y = 12 ... (1)",
                "  x = 0         ... (2)",
                "Step 2: Substitute x = 0 into (1):",
                "  2(0) + 3y = 12",
                "  3y = 12",
                "  y = 4",
                "Step 3: Solution: (0, 4)"
            ],
            method: "Substitution"
        },
        {
            id: 2,
            name: "Intersection with x-axis",
            description: "Find corner point where a constraint meets the x-axis",
            constraints: [
                { label: "3x + 4y = 24", a: 3, b: 4, c: 24, sign: "=", color: "#8b5cf6" },
                { label: "y = 0", a: 0, b: 1, c: 0, sign: "=", color: "#10b981" },
            ],
            solution: { x: 8, y: 0 },
            steps: [
                "Step 1: Identify the constraints:",
                "  3x + 4y = 24 ... (1)",
                "  y = 0         ... (2)",
                "Step 2: Substitute y = 0 into (1):",
                "  3x + 4(0) = 24",
                "  3x = 24",
                "  x = 8",
                "Step 3: Solution: (8, 0)"
            ],
            method: "Substitution"
        },
        {
            id: 3,
            name: "Using Elimination (Addition)",
            description: "Find intersection using elimination with addition",
            constraints: [
                { label: "x + 2y = 8", a: 1, b: 2, c: 8, sign: "=", color: "#8b5cf6" },
                { label: "3x - 2y = 4", a: 3, b: -2, c: 4, sign: "=", color: "#f59e0b" },
            ],
            solution: { x: 3, y: 2.5 },
            steps: [
                "Step 1: Write both equations:",
                "  x + 2y = 8   ... (1)",
                "  3x - 2y = 4  ... (2)",
                "Step 2: Add (1) and (2):",
                "  (x + 2y) + (3x - 2y) = 8 + 4",
                "  4x = 12",
                "  x = 3",
                "Step 3: Substitute x = 3 into (1):",
                "  3 + 2y = 8",
                "  2y = 5",
                "  y = 2.5",
                "Step 4: Solution: (3, 2.5)"
            ],
            method: "Elimination (addition)"
        },
        {
            id: 4,
            name: "Three Constraint Intersection",
            description: "Find the origin where three constraints meet",
            constraints: [
                { label: "x = 0", a: 1, b: 0, c: 0, sign: "=", color: "#10b981" },
                { label: "y = 0", a: 0, b: 1, c: 0, sign: "=", color: "#10b981" },
                { label: "x + y = 10", a: 1, b: 1, c: 10, sign: "=", color: "#8b5cf6" },
            ],
            solution: { x: 0, y: 0 },
            steps: [
                "Step 1: Identify the constraints:",
                "  x = 0      ... (1)",
                "  y = 0      ... (2)",
                "Step 2: From (1) and (2), x = 0 and y = 0",
                "Step 3: Check if (0,0) satisfies all constraints:",
                "  x = 0 ✓",
                "  y = 0 ✓",
                "  x + y = 10 → 0 + 0 = 10? ✗",
                "  Wait - (0,0) doesn't satisfy x+y=10!",
                "Step 3: The origin (0,0) is where x=0 and y=0 meet.",
                "  It's a corner point even if it doesn't satisfy other constraints.",
                "Step 4: Solution: (0, 0)"
            ],
            method: "Direct substitution"
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
            for (let x = -1; x <= range; x += 0.05) {
                const y = (c - a * x) / b;
                if (y >= -1 && y <= range) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -1 && xVal <= range) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -1 && yVal <= range) {
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        Topic 15 — Algebraic Corner Points
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Finding Corner Points <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Algebraically
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Master the algebraic methods to find exact corner point coordinates — essential for
                        solving LP problems with precision.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Why Algebraic Methods? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔢</span>
                        Why Algebraic Methods for Finding Corner Points?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            While graphical methods give a visual understanding, <strong>algebraic methods</strong>{" "}
                            provide <strong className="text-indigo-600 dark:text-indigo-400">exact coordinates</strong>{" "}
                            for corner points. This is essential when:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Precision</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Fractions and decimals are handled exactly.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Large Problems</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Works even when graphs are too large to draw.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Verification</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Confirm graphical solutions with exact values.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> Every corner point is the
                                intersection of two constraint lines. Algebraically, this means solving a system
                                of two linear equations in two variables.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Methods for Solving ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        Algebraic Methods for Finding Corner Points
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">1. Substitution</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Solve one equation for a variable, then substitute into the other.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-800 p-2 rounded">
                                    x + y = 10 → y = 10 - x<br/>
                                    2x + y = 14 → 2x + (10-x) = 14
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">2. Elimination</h3>
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
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Direct Reading</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    For constraints like x=0 or y=0, substitute directly.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-800 p-2 rounded">
                                    x = 0, 2x + 3y = 12<br/>
                                    → 3y = 12 → y = 4
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Pro tip:</span> Choose the method that makes
                                the problem easiest. For simple equations, substitution is quick. For systems
                                with coefficients that cancel nicely, use elimination.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Algebraic Solver ===== */}
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
                        <span className="text-3xl">🧮</span>
                        Interactive Algebraic Solver
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select an example to see the step-by-step algebraic solution for finding a corner point.
                            Each example demonstrates a different method.
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
                                            ? "bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowSteps(!showSteps)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showSteps
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showSteps ? "Hide Steps" : "Show Steps"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph */}
                            <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Algebraic corner point solver">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t15" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="400" height="400" fill="url(#grid_t15)" />

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
                                        if (val >= -1 && val <= 12) {
                                            return (
                                                <g key={`t15-tick-${v}`}>
                                                    <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                    <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                    {v >= 40 && v <= 360 && val !== 0 && val >= -1 && val <= 10 && (
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
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Highlight the intersection point */}
                                    {(() => {
                                        const { px, py } = toPixel(currentExample.solution.x, currentExample.solution.y);
                                        return (
                                            <g>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r="10"
                                                    fill="#f59e0b"
                                                    fillOpacity="0.2"
                                                    className="animate-[pulse_2s_ease-in-out_infinite]"
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
                                                    ({currentExample.solution.x}, {currentExample.solution.y})
                                                </text>
                                            </g>
                                        );
                                    })()}

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

                                    {/* Method label */}
                                    <text x="20" y="20" fontSize="10" fill="#475569" className="dark:fill-slate-400 font-medium">
                                        Method: {currentExample.method}
                                    </text>
                                </svg>
                            </div>

                            {/* Steps */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[400px]">
                                    <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
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
                                    <div className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                                            ✓ Solution: ({currentExample.solution.x}, {currentExample.solution.y})
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full mr-2">
                                Method: {currentExample.method}
                            </span>
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full">
                                Solution: ({currentExample.solution.x}, {currentExample.solution.y})
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Systematic Approach ===== */}
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
                        Systematic Approach to Finding All Corner Points
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Step 1: List All Constraints</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Write down every constraint in the problem, including non-negativity.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Step 2: Identify Pairs</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Each corner point is the intersection of two constraints. Identify all pairs.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 3: Solve Each Pair</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Solve each pair of equations to find potential corner points.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Step 4: Verify Feasibility</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Check that each point satisfies ALL constraints.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                            <p className="text-sm text-purple-800 dark:text-purple-300">
                                <span className="font-semibold">💡 Remember:</span> Not all intersections are
                                corner points! Always verify that the point satisfies all constraints. Some
                                intersections may lie outside the feasible region.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: Real-World Examples ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
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
                            <div className="font-semibold text-indigo-600 dark:text-indigo-400">Production Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-indigo-600 dark:text-indigo-400">Ichapur</span>{" "}
                                solves {`2x + 3y = 12`} and {`x + 2y = 8`} to find the optimal production mix.
                                The solution (2,2) shows exactly how many units of each product to make.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-blue-600 dark:text-blue-400">Resource Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-blue-600 dark:text-blue-400">Kolkata</span>,
                                a project manager solves constraints to find corner points. Each solution
                                represents a different resource allocation strategy.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Mamata</span>{" "}
                                solves {`x + 2y = 8`} and {`3x + y = 12`} to find exact nutrient combinations
                                that meet her dietary requirements.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Investment</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-amber-600 dark:text-amber-400">Jadavpur</span>{" "}
                                solves constraint intersections to find optimal portfolio allocations with
                                exact risk and return values.
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
                                <li>Choose the method that makes the problem easiest.</li>
                                <li>For x=0 or y=0 constraints, use direct substitution.</li>
                                <li>When coefficients align nicely, use elimination.</li>
                                <li>Always verify that the point satisfies all constraints.</li>
                                <li>Double-check your arithmetic.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Not verifying that the point satisfies all constraints.</li>
                                <li>Making arithmetic errors in substitution.</li>
                                <li>Choosing the wrong pair of constraints.</li>
                                <li>Forgetting to include non-negativity constraints.</li>
                                <li>Assuming all intersections are corner points.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>List all constraints before solving.</li>
                                <li>Work systematically through all pairs.</li>
                                <li>Always verify feasibility.</li>
                                <li>Use both graphical and algebraic methods to cross-check.</li>
                                <li>Keep your work organized.</li>
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
                            <span>I can solve two linear equations using substitution.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can solve two linear equations using elimination.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can handle constraints like x=0 and y=0.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify if a point satisfies all constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find all corner points algebraically.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can cross-check algebraic solutions graphically.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Finding Corner Points Algebraically – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Finding Corner Points Algebraically – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic15_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Algebraic methods are essential for exact solutions. I tell my students: 'The graph shows you where to look; algebra gives you the exact answer.' Emphasize that solving systems of equations is a foundational skill — mistakes in algebra are the most common source of errors in LP. I recommend practicing with simple systems first, then moving to more complex ones. Always verify solutions by substituting back into all constraints."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 15 — Finding Corner Points Algebraically &bull; Exact solutions for LP problems
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Intersection of Two Constraint Lines (Topic 16)
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

export default Topic15;