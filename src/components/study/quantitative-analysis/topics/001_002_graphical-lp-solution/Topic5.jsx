import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic5 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedConstraint, setSelectedConstraint] = useState(0);
    const [showIntercepts, setShowIntercepts] = useState(true);
    const [showLineType, setShowLineType] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Example constraints with different line types
    const constraints = [
        { label: "2x + 3y = 12", a: 2, b: 3, c: 12, type: "equality", lineType: "solid" },
        { label: "x - 2y ≤ 6", a: 1, b: -2, c: 6, type: "inequality", sign: "≤", lineType: "solid" },
        { label: "3x + y ≥ 9", a: 3, b: 1, c: 9, type: "inequality", sign: "≥", lineType: "solid" },
        { label: "x + 2y < 8", a: 1, b: 2, c: 8, type: "inequality", sign: "<", lineType: "dashed" },
        { label: "2x - y > 4", a: 2, b: -1, c: 4, type: "inequality", sign: ">", lineType: "dashed" },
        { label: "x = 3", a: 1, b: 0, c: 3, type: "vertical", lineType: "solid" },
        { label: "y = -2", a: 0, b: 1, c: -2, type: "horizontal", lineType: "solid" },
    ];

    const current = constraints[selectedConstraint];
    
    // Calculate intercepts
    const xInt = current.b !== 0 ? current.c / current.a : null;
    const yInt = current.a !== 0 ? current.c / current.b : null;

    // Helper: convert coordinates to SVG pixels
    const toPixel = (x, y) => ({
        px: 200 + x * 40,
        py: 200 - y * 40,
    });

    // Generate line points for the current constraint
    const getLinePoints = () => {
        const { a, b, c } = current;
        const points = [];
        
        if (b !== 0 && a !== 0) {
            // Sloped line
            for (let x = -5; x <= 5; x += 0.1) {
                const y = (c - a * x) / b;
                if (y >= -5 && y <= 5) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            // Vertical line: x = c/a
            const xVal = c / a;
            if (xVal >= -5 && xVal <= 5) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            // Horizontal line: y = c/b
            const yVal = c / b;
            if (yVal >= -5 && yVal <= 5) {
                const py = 200 - yVal * 40;
                points.push({ px: 20, py });
                points.push({ px: 380, py });
            }
        }
        return points;
    };

    const linePoints = getLinePoints();
    const isSolid = current.lineType === "solid";

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
                        Topic 5 — Graphing Constraints
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Plotting a <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-cyan-600 to-sky-600 dark:from-cyan-400 dark:to-sky-400 bg-clip-text text-transparent">
                            Straight-Line Constraint
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to accurately plot constraint lines from their equations — the essential skill
                        for building the feasible region in linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span> 10 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-sky-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is a Constraint Line? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        What is a Constraint Line?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            A <strong className="text-cyan-600 dark:text-cyan-400">constraint line</strong> is the
                            boundary of a constraint in a linear programming problem. It represents the limit of
                            a resource, capacity, or requirement.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold text-cyan-600 dark:text-cyan-400">Equality</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400">ax + by = c</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500">Solid line</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">≤ or ≥</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Includes the line</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500">Solid line</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold text-rose-600 dark:text-rose-400">&lt; or &gt;</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Excludes the line</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500">Dashed line</p>
                            </div>
                        </div>
                        <p>
                            The constraint line divides the coordinate plane into two halves — one that satisfies
                            the constraint and one that doesn't. Plotting it correctly is the first step toward
                            finding the feasible region.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 2: Step-by-Step Guide ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        Step-by-Step: Plotting a Constraint Line
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">Step 1: Identify the line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Replace inequality with equality to get the boundary line.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50">
                                <h3 className="font-semibold text-sky-700 dark:text-sky-300">Step 2: Find two points</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Use intercepts (set x=0, y=0) or choose convenient values.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 3: Decide line type</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Solid (≤, ≥, =) or dashed (&lt;, &gt;).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Step 4: Plot and draw</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plot the points, draw the line, and extend it across the graph.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Example:</span> For <span className="font-mono">2x + 3y ≤ 12</span>,
                                first plot <span className="font-mono">2x + 3y = 12</span> as a solid line using intercepts (6,0) and (0,4).
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Constraint Plotter ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Practice: Plot These Constraints
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Click on a constraint to see how it's plotted. Toggle features to learn more.
                        </p>
                        
                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowIntercepts(!showIntercepts)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showIntercepts
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showIntercepts ? "Hide Intercepts" : "Show Intercepts"}
                            </button>
                            <button
                                onClick={() => setShowLineType(!showLineType)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showLineType
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showLineType ? "Hide Line Info" : "Show Line Info"}
                            </button>
                        </div>

                        {/* Constraint buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {constraints.map((con, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedConstraint(idx)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 font-mono",
                                        selectedConstraint === idx
                                            ? "bg-cyan-600 dark:bg-cyan-500 text-white border-cyan-600 dark:border-cyan-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500"
                                    )}
                                >
                                    {con.label}
                                </button>
                            ))}
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Constraint plotter">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t5" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t5)" />

                                {/* Axes */}
                                <line x1="20" y1="200" x2="380" y2="200" stroke="#1e293b" strokeWidth="2.5" className="dark:stroke-slate-300" />
                                <line x1="200" y1="380" x2="200" y2="20" stroke="#1e293b" strokeWidth="2.5" className="dark:stroke-slate-300" />
                                <polygon points="380,195 395,200 380,205" fill="#1e293b" className="dark:fill-slate-300" />
                                <polygon points="195,20 200,5 205,20" fill="#1e293b" className="dark:fill-slate-300" />
                                <text x="385" y="215" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">x</text>
                                <text x="210" y="22" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">y</text>

                                {/* Origin */}
                                <circle cx="200" cy="200" r="5" fill="#ef4444" />
                                <text x="205" y="215" fontSize="14" fill="#1e293b" className="dark:fill-slate-300 font-medium">O</text>

                                {/* Ticks */}
                                {[40, 80, 120, 160, 240, 280, 320, 360].map((v) => (
                                    <g key={`t5-tick-${v}`}>
                                        <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                        <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                        {v >= 40 && v <= 360 && (
                                            <>
                                                <text x={v - 4} y="218" fontSize="11" fill="#475569" className="dark:fill-slate-500">{v === 200 ? 0 : (v - 200) / 40}</text>
                                                <text x="178" y={v + 5} fontSize="11" fill="#475569" className="dark:fill-slate-500">{v === 200 ? 0 : (200 - v) / 40}</text>
                                            </>
                                        )}
                                    </g>
                                ))}

                                {/* Draw the constraint line */}
                                {linePoints.length > 1 && (
                                    <polyline
                                        points={linePoints.map(p => `${p.px},${p.py}`).join(' ')}
                                        fill="none"
                                        stroke="#0ea5e9"
                                        strokeWidth="3"
                                        strokeDasharray={isSolid ? "none" : "8,6"}
                                    />
                                )}

                                {/* Highlight intercepts if enabled */}
                                {showIntercepts && xInt !== null && xInt >= -5 && xInt <= 5 && (
                                    <g>
                                        <circle cx={200 + xInt * 40} cy={200} r="7" fill="#f97316" stroke="#fff" strokeWidth="2">
                                            <animate attributeName="r" values="7;9;7" dur="1.5s" repeatCount="indefinite" />
                                        </circle>
                                        <text x={200 + xInt * 40 + 10} y={195} fontSize="12" fill="#f97316" className="font-mono font-bold">
                                            ({xInt.toFixed(1)},0)
                                        </text>
                                    </g>
                                )}
                                {showIntercepts && yInt !== null && yInt >= -5 && yInt <= 5 && (
                                    <g>
                                        <circle cx={200} cy={200 - yInt * 40} r="7" fill="#f59e0b" stroke="#fff" strokeWidth="2">
                                            <animate attributeName="r" values="7;9;7" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                                        </circle>
                                        <text x={205} y={200 - yInt * 40 - 10} fontSize="12" fill="#f59e0b" className="font-mono font-bold">
                                            (0,{yInt.toFixed(1)})
                                        </text>
                                    </g>
                                )}

                                {/* Line type info */}
                                {showLineType && (
                                    <g>
                                        <rect x="20" y="20" width="160" height="50" rx="6" fill="white" fillOpacity="0.9" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                        <text x="28" y="38" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                            {current.type === "equality" ? "Equality (solid)" :
                                             current.type === "vertical" ? "Vertical (solid)" :
                                             current.type === "horizontal" ? "Horizontal (solid)" :
                                             `${current.sign} ${current.lineType === "solid" ? "(solid)" : "(dashed)"}`}
                                        </text>
                                        <text x="28" y="55" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                            {xInt !== null ? `x-int: ${xInt.toFixed(2)}` : "No x-int"}
                                            {yInt !== null ? `, y-int: ${yInt.toFixed(2)}` : ", No y-int"}
                                        </text>
                                    </g>
                                )}

                                {/* Constraint label */}
                                <text x="20" y="380" fontSize="12" fill="#0ea5e9" className="font-mono font-bold">
                                    {current.label}
                                </text>
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className={clsx(
                                "inline-block px-3 py-1 rounded-full mr-2",
                                isSolid ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" :
                                "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                            )}>
                                {isSolid ? "● Solid Line" : "--- Dashed Line"}
                            </span>
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                {current.type === "equality" ? "Equality constraint" :
                                 current.type === "vertical" ? "Vertical line" :
                                 current.type === "horizontal" ? "Horizontal line" :
                                 `Inequality (${current.sign})`}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Special Cases ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">⚠️</span>
                        Special Cases
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-sky-600 dark:text-sky-400">Vertical Line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Form: <span className="font-mono">x = k</span>. Plot a vertical line at x = k.
                                    Example: <span className="font-mono">x = 3</span> is a vertical line through (3,0).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Horizontal Line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Form: <span className="font-mono">y = k</span>. Plot a horizontal line at y = k.
                                    Example: <span className="font-mono">y = -2</span> is a horizontal line through (0,-2).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-amber-600 dark:text-amber-400">Line through Origin</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If c = 0 (e.g., <span className="font-mono">2x - y = 0</span>), the line passes through
                                    the origin. Use slope method to find another point.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-rose-600 dark:text-rose-400">Zero Coefficient</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If a=0, it's horizontal (y = c/b). If b=0, it's vertical (x = c/a).
                                    Handle these separately.
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
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
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
                            <div className="font-semibold text-cyan-600 dark:text-cyan-400">Production Capacity</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-cyan-600 dark:text-cyan-400">Ichapur</span>{" "}
                                has constraint <span className="font-mono">2x + 3y ≤ 24</span>. Plot the line to see
                                production combinations — intercepts show max of each product.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Budget Limit</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A student like <span className="font-medium text-emerald-600 dark:text-emerald-400">Mahima</span>{" "}
                                has a budget constraint <span className="font-mono">x + y ≤ 50</span> where x is books
                                and y is supplies. The line shows all combinations that exactly use the budget.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Minimum Requirement</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-amber-600 dark:text-amber-400">Jadavpur</span>,
                                a farm must plant at least <span className="font-mono">x + 2y ≥ 40</span> acres.
                                Plot the line to see the minimum combinations of crops.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-rose-600 dark:text-rose-400">Time Management</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-rose-600 dark:text-rose-400">Debangshu</span>{" "}
                                has <span className="font-mono">2x + y ≤ 8</span> hours available for study (x) and
                                practice (y). The line shows the time trade-off.
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
                                <li>Always find two points before drawing the line.</li>
                                <li>Use intercepts when possible — they're easy and precise.</li>
                                <li>Draw the line across the entire graph, not just between points.</li>
                                <li>Label the line with its equation.</li>
                                <li>For inequalities, decide line type before plotting.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Using dashed line for ≤ or ≥ (should be solid).</li>
                                <li>Not extending the line across the entire graph.</li>
                                <li>Misplacing intercepts (swapping x and y).</li>
                                <li>Forgetting to handle vertical/horizontal lines properly.</li>
                                <li>Not checking the line by plugging in a point.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always verify your line by checking a second point.</li>
                                <li>Use a straightedge for accurate lines.</li>
                                <li>Choose a scale that fits all constraints comfortably.</li>
                                <li>Double-check line type before finalizing.</li>
                                <li>Keep your graph neat and organized.</li>
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
                            <span>I can identify the boundary line from a constraint.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find two points to plot a line (intercepts or other).</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know when to use solid vs dashed lines.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can handle vertical and horizontal constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can draw a line that accurately represents the constraint.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify my plotted line with a test point.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Plotting a Straight-Line Constraint – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Plotting a Straight-Line Constraint – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic5_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "I often tell my students: 'A constraint line is like a fence — it shows where you can and cannot go.' The key is to practice, practice, practice. Start with simple equations like x+y=10, then move to inequalities. Emphasize that for inequalities, the line type (solid/dashed) is just as important as the line itself. In my experience at Barrackpore, students who master plotting lines early breeze through the rest of LP."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 5 — Plotting a Straight-Line Constraint &bull; Building the feasible region
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Testing a Point to Determine the Feasible Side (Topic 6)
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

export default Topic5;