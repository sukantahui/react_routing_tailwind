import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic1 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);

    // Staggered delays
    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // State for interactive constraint example
    const [selectedConstraint, setSelectedConstraint] = useState(0);
    const constraints = [
        { label: "x + y ≤ 8", a: 1, b: 1, c: 8, sign: "≤" },
        { label: "2x + y ≥ 6", a: 2, b: 1, c: 6, sign: "≥" },
        { label: "x - 2y ≤ 4", a: 1, b: -2, c: 4, sign: "≤" },
        { label: "3x + 4y ≥ 12", a: 3, b: 4, c: 12, sign: "≥" },
    ];

    // Compute intercepts for display
    const getIntercepts = (a, b, c) => {
        const xInt = b !== 0 ? c / a : Infinity;
        const yInt = a !== 0 ? c / b : Infinity;
        return { xInt: isFinite(xInt) ? xInt : null, yInt: isFinite(yInt) ? yInt : null };
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

    const current = constraints[selectedConstraint];
    const { xInt, yInt } = getIntercepts(current.a, current.b, current.c);

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
                        Topic 1 — Graphing Fundamentals
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Plotting Constraints on <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                            a Coordinate Plane
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to accurately place constraint lines on a graph — the essential skill for
                        building the feasible region in linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 10 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-sky-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Why Plot Constraints? ===== */}
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
                        <span className="text-3xl">🎯</span>
                        Why Plot Constraints?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            In linear programming, <strong className="text-emerald-600 dark:text-emerald-400">constraints</strong> are
                            the rules that limit our decisions. Plotting them on a coordinate plane is the first
                            visual step toward finding the optimal solution. Each constraint becomes a line that
                            divides the plane into two halves — one allowed, one forbidden.
                        </p>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                <span className="font-semibold">💡 Real-world analogy:</span> Think of constraints
                                as the rules of a game. Plotting them is like drawing the boundaries of the playing
                                field. Before you can score (optimize), you must know where you can and cannot go.
                            </p>
                        </div>
                        <p>
                            In this topic, we'll master the skill of drawing constraint lines from their algebraic
                            forms — using intercepts, slope, or a table of values. This is the foundation for
                            everything that follows.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 2: Methods for Plotting a Line ===== */}
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
                        <span className="text-3xl">📏</span>
                        Methods to Plot a Straight Line
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            A linear equation <span className="font-mono">ax + by = c</span> can be plotted using
                            three common methods. Choose the one that fits the problem best.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="font-semibold text-blue-600 dark:text-blue-400">Intercept Method</h3>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                    Find x-intercept (set y=0) and y-intercept (set x=0). Plot both points and draw
                                    the line through them.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded">
                                    2x + 3y = 12 → (6,0) and (0,4)
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Slope-Intercept</h3>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                    Rearrange to y = mx + b. Plot the y-intercept (0,b), then use slope m to find
                                    another point.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded">
                                    2x - y = 4 → y = 2x - 4 → slope 2, intercept -4
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="font-semibold text-amber-600 dark:text-amber-400">Table of Values</h3>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                    Choose a few x-values, compute y, plot the points, and connect them.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded">
                                    x: 0, 1, 2 → y: 3, 1, -1 for 2x + y = 3
                                </div>
                            </div>
                        </div>
                        <p className="mt-2">
                            <span className="font-semibold">Pro tip:</span> The intercept method is fastest when
                            the equation is in standard form. Slope-intercept is great when you already have y
                            isolated. The table method is safest for complex coefficients.
                        </p>
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
                        <span className="text-3xl">✏️</span>
                        Practice: Plot These Constraints
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Click on a constraint to see how it's plotted. Note the intercepts and the line type
                            (solid/dashed). Try to predict the graph before clicking.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {constraints.map((con, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedConstraint(idx)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 font-mono",
                                        selectedConstraint === idx
                                            ? "bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-sm"
                                    )}
                                >
                                    {con.label}
                                </button>
                            ))}
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Constraint graph">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t1" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t1)" />

                                {/* Axes */}
                                <line x1="20" y1="200" x2="380" y2="200" stroke="#1e293b" strokeWidth="2" className="dark:stroke-slate-300" />
                                <line x1="200" y1="380" x2="200" y2="20" stroke="#1e293b" strokeWidth="2" className="dark:stroke-slate-300" />
                                <polygon points="380,195 395,200 380,205" fill="#1e293b" className="dark:fill-slate-300" />
                                <polygon points="195,20 200,5 205,20" fill="#1e293b" className="dark:fill-slate-300" />
                                <text x="385" y="215" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">x</text>
                                <text x="210" y="22" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">y</text>

                                {/* Origin */}
                                <circle cx="200" cy="200" r="3" fill="#ef4444" />
                                <text x="205" y="215" fontSize="12" fill="#1e293b" className="dark:fill-slate-300">O</text>

                                {/* Ticks */}
                                {[40, 80, 120, 160, 240, 280, 320, 360].map((v) => (
                                    <g key={`t1-tick-${v}`}>
                                        <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1" className="dark:stroke-slate-300" />
                                        <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1" className="dark:stroke-slate-300" />
                                        {v >= 40 && v <= 360 && (
                                            <>
                                                <text x={v - 4} y="218" fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">{v === 200 ? 0 : (v - 200) / 40}</text>
                                                <text x="178" y={v + 4} fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">{v === 200 ? 0 : (200 - v) / 40}</text>
                                            </>
                                        )}
                                    </g>
                                ))}

                                {/* ===== DYNAMIC LINE ===== */}
                                {(() => {
                                    const { a, b, c, sign } = current;
                                    // Scale: each unit = 40 pixels
                                    // We need to draw line ax + by = c
                                    // Find two points: x-intercept (c/a,0) and y-intercept (0,c/b)
                                    const xIntVal = b !== 0 ? c / a : null;
                                    const yIntVal = a !== 0 ? c / b : null;

                                    let x1 = 20, y1 = 380, x2 = 380, y2 = 20; // default diagonal
                                    if (xIntVal !== null && yIntVal !== null) {
                                        // Both intercepts exist
                                        const px1 = 200 + xIntVal * 40;
                                        const py1 = 200 - 0 * 40; // y=0 -> at 200
                                        const px2 = 200 + 0 * 40;
                                        const py2 = 200 - yIntVal * 40;
                                        // But we need to extend to edges
                                        // Find line equation and compute at x=20 and x=380
                                        const yAtX = (x) => (c - a * x) / b;
                                        const xAtY = (y) => (c - b * y) / a;
                                        // Get points on left/right edges
                                        const leftY = yAtX(-4.5); // x = -4.5 (since 20-> -4.5)
                                        const rightY = yAtX(4.5); // x = 4.5 (380->4.5)
                                        const bottomX = xAtY(-4.5);
                                        const topX = xAtY(4.5);
                                        // Choose points that are on the grid
                                        let points = [];
                                        if (leftY >= -4.5 && leftY <= 4.5) points.push([20, 200 - leftY * 40]);
                                        if (rightY >= -4.5 && rightY <= 4.5) points.push([380, 200 - rightY * 40]);
                                        if (bottomX >= -4.5 && bottomX <= 4.5) points.push([200 + bottomX * 40, 380]);
                                        if (topX >= -4.5 && topX <= 4.5) points.push([200 + topX * 40, 20]);

                                        if (points.length >= 2) {
                                            // Use first two
                                            x1 = points[0][0];
                                            y1 = points[0][1];
                                            x2 = points[1][0];
                                            y2 = points[1][1];
                                        } else {
                                            // fallback: use intercepts
                                            const ix = 200 + (xIntVal !== null ? xIntVal * 40 : 0);
                                            const iy = 200 - (yIntVal !== null ? yIntVal * 40 : 0);
                                            // Use another point
                                            const xOther = xIntVal !== null ? xIntVal + 1 : 1;
                                            const yOther = (c - a * xOther) / b;
                                            const pxOther = 200 + xOther * 40;
                                            const pyOther = 200 - yOther * 40;
                                            x1 = ix;
                                            y1 = iy;
                                            x2 = pxOther;
                                            y2 = pyOther;
                                        }
                                    } else if (xIntVal !== null) {
                                        // vertical line: x = c/a
                                        const xPos = 200 + xIntVal * 40;
                                        x1 = xPos; y1 = 20; x2 = xPos; y2 = 380;
                                    } else if (yIntVal !== null) {
                                        // horizontal line: y = c/b
                                        const yPos = 200 - yIntVal * 40;
                                        x1 = 20; y1 = yPos; x2 = 380; y2 = yPos;
                                    }

                                    // Determine if solid or dashed (<= or >= -> solid, < or > -> dashed)
                                    const isSolid = sign.includes("=");
                                    const strokeDasharray = isSolid ? "none" : "8,4";
                                    const color = "#0ea5e9"; // sky-500

                                    return (
                                        <g>
                                            <line x1={x1} y1={y1} x2={x2} y2={y2}
                                                stroke={color} strokeWidth="2.5"
                                                strokeDasharray={strokeDasharray}
                                            />
                                            {/* Labels for intercepts if they exist */}
                                            {xIntVal !== null && xIntVal >= -4.5 && xIntVal <= 4.5 && (
                                                <circle cx={200 + xIntVal * 40} cy={200} r="5" fill="#f59e0b" />
                                            )}
                                            {yIntVal !== null && yIntVal >= -4.5 && yIntVal <= 4.5 && (
                                                <circle cx={200} cy={200 - yIntVal * 40} r="5" fill="#f59e0b" />
                                            )}
                                            {/* Label the equation */}
                                            <text x="20" y="30" fontSize="12" fill="#475569" className="dark:fill-slate-400 font-mono">
                                                {current.label}
                                            </text>
                                        </g>
                                    );
                                })()}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                {current.sign.includes("=") ? "Solid line (≤ or ≥)" : "Dashed line (< or >)"}
                            </span>
                            <span className="inline-block ml-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                x-int: {xInt !== null ? xInt.toFixed(2) : "none"} &nbsp; y-int: {yInt !== null ? yInt.toFixed(2) : "none"}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Handling Special Cases ===== */}
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
                        Special Cases in Plotting
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-rose-600 dark:text-rose-400">Vertical Line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Equation: <span className="font-mono">x = k</span>. Plot a vertical line at x = k.
                                    Example: <span className="font-mono">x = 3</span> is a vertical line through (3,0).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-rose-600 dark:text-rose-400">Horizontal Line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Equation: <span className="font-mono">y = k</span>. Plot a horizontal line at y = k.
                                    Example: <span className="font-mono">y = -2</span> is a horizontal line through (0,-2).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-rose-600 dark:text-rose-400">Line through Origin</h3>
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
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                                <span>📦</span> Warehouse Capacity
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-mono">x + y ≤ 100</span> — A warehouse in{" "}
                                <span className="font-medium text-blue-600 dark:text-blue-400">Ichapur</span> can
                                store up to 100 units of two products. Plot the line x+y=100; the feasible side is below.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                                <span>⏱️</span> Production Time
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-mono">2x + 3y ≤ 24</span> — A factory in{" "}
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Jadavpur</span>{" "}
                                has 24 machine-hours available. Plot the line; intercepts are (12,0) and (0,8).
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                                <span>🌾</span> Farm Acreage
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-mono">x + 2y ≥ 40</span> — A farmer near{" "}
                                <span className="font-medium text-amber-600 dark:text-amber-400">Barrackpore</span>{" "}
                                must plant at least 40 acres of crops. Plot the line; shade above it.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                                <span>💊</span> Nutrient Mix
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-mono">3x + y ≥ 15</span> — A diet requires at least 15 units
                                of vitamin C. Plot the line; all points above meet the requirement.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 dark:hover:shadow-orange-400/5",
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
                                <li>Use intercepts when equation is in standard form (ax+by=c).</li>
                                <li>For slope-intercept, ensure you correctly identify the slope and intercept.</li>
                                <li>Always draw the line extending beyond the axes – it helps in large-scale problems.</li>
                                <li>Label the line with its equation directly on the graph.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Misplacing intercepts (swapping x and y).</li>
                                <li>Using the wrong slope (rise/run sign).</li>
                                <li>Forgetting to extend the line across the entire plane.</li>
                                <li>Not checking if the line passes through the origin.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always verify your line by plugging in a known point.</li>
                                <li>Use a straightedge for accurate lines.</li>
                                <li>Choose a scale that fits all constraints comfortably.</li>
                                <li>For inequalities, decide line type before plotting.</li>
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
                            <span>I can plot a line using the intercept method.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can plot a line using slope-intercept form.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can handle vertical and horizontal lines.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know when to use solid vs dashed lines.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify intercepts from an equation.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can draw a line that accurately represents the constraint.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Plotting Constraints on a Coordinate Plane – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Plotting Constraints – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic1_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "I often see students rush to shade before correctly plotting the line. Emphasize that the line comes first — it's the boundary. Use the intercept method as a default; it's visual and quick. Also, remind them that if the line doesn't cross an axis (like x=5), they should still extend it across the graph. Practice with a few examples on the board — like x+y=10, 2x-y=4 — and ask students to predict the intercepts before plotting. This builds confidence."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 1 — Plotting Constraints &bull; Building the foundation for feasible regions
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Understanding the x-axis and y-axis (Topic 2)
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

export default Topic1;