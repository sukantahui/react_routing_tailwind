import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic4 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedEquation, setSelectedEquation] = useState(0);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Example equations for interactive intercepts
    const equations = [
        { label: "2x + 3y = 12", a: 2, b: 3, c: 12 },
        { label: "x - 2y = 6", a: 1, b: -2, c: 6 },
        { label: "-3x + 4y = 8", a: -3, b: 4, c: 8 },
        { label: "5x + 2y = 10", a: 5, b: 2, c: 10 },
    ];

    const currentEq = equations[selectedEquation];
    const xInt = currentEq.b !== 0 ? currentEq.c / currentEq.a : null;
    const yInt = currentEq.a !== 0 ? currentEq.c / currentEq.b : null;

    // Compute points for the line in SVG coordinates (scale: 1 unit = 40px)
    const toPixel = (x, y) => ({
        px: 200 + x * 40,
        py: 200 - y * 40,
    });

    // Generate line points across the visible range (-5 to 5 in both axes)
    const getLinePoints = () => {
        const { a, b, c } = currentEq;
        const points = [];
        for (let x = -5; x <= 5; x += 0.1) {
            if (b !== 0) {
                const y = (c - a * x) / b;
                if (y >= -5 && y <= 5) {
                    points.push(toPixel(x, y));
                }
            } else {
                // vertical line: x = c/a
                if (a !== 0) {
                    const xVal = c / a;
                    if (xVal >= -5 && xVal <= 5) {
                        const px = 200 + xVal * 40;
                        points.push({ px, py: 20 });
                        points.push({ px, py: 380 });
                    }
                }
                break;
            }
        }
        return points;
    };

    const linePoints = getLinePoints();

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
                        Topic 4 — Intercepts
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Finding <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                            x-intercepts and y-intercepts
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to quickly find where a line crosses the axes — a fundamental skill for
                        plotting constraints in linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span> 8 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-lime-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What are Intercepts? ===== */}
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
                        <span className="text-3xl">🎯</span>
                        What are x-intercepts and y-intercepts?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-orange-600 dark:text-orange-400">x-intercept</strong> is
                            the point where a line crosses the x-axis. At this point, the y-coordinate is <strong>zero</strong>.
                        </p>
                        <p>
                            The <strong className="text-amber-600 dark:text-amber-400">y-intercept</strong> is
                            the point where a line crosses the y-axis. At this point, the x-coordinate is <strong>zero</strong>.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold text-orange-600 dark:text-orange-400">x-intercept</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400">(x, 0) — y is always 0</p>
                                <p className="text-xs font-mono bg-slate-100 dark:bg-slate-700 p-1 rounded mt-1">Set y=0, solve for x</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold text-amber-600 dark:text-amber-400">y-intercept</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400">(0, y) — x is always 0</p>
                                <p className="text-xs font-mono bg-slate-100 dark:bg-slate-700 p-1 rounded mt-1">Set x=0, solve for y</p>
                            </div>
                        </div>
                        <p>
                            These intercepts are the quickest way to plot a line given in standard form
                            (<span className="font-mono">ax + by = c</span>). They provide two points that are
                            usually easy to find and plot.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Find Intercepts ===== */}
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
                        Step-by-Step: Finding Intercepts
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                                <h3 className="font-semibold text-orange-700 dark:text-orange-300">x-intercept</h3>
                                <ol className="mt-2 text-sm space-y-1 list-decimal list-inside">
                                    <li>Set y = 0 in the equation.</li>
                                    <li>Solve for x.</li>
                                    <li>Write as (x, 0).</li>
                                </ol>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">y-intercept</h3>
                                <ol className="mt-2 text-sm space-y-1 list-decimal list-inside">
                                    <li>Set x = 0 in the equation.</li>
                                    <li>Solve for y.</li>
                                    <li>Write as (0, y).</li>
                                </ol>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Example:</span> For <span className="font-mono">2x + 3y = 12</span>,
                                x-intercept: y=0 → 2x=12 → x=6 → (6,0).<br />
                                y-intercept: x=0 → 3y=12 → y=4 → (0,4).
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Intercept Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/5 dark:hover:shadow-lime-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        See Intercepts in Action
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Click on an equation to see its line and intercepts highlighted.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {equations.map((eq, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedEquation(idx)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 font-mono",
                                        selectedEquation === idx
                                            ? "bg-orange-600 dark:bg-orange-500 text-white border-orange-600 dark:border-orange-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500"
                                    )}
                                >
                                    {eq.label}
                                </button>
                            ))}
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Intercepts explorer">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t4" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t4)" />

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
                                    <g key={`t4-tick-${v}`}>
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

                                {/* Draw the line */}
                                {linePoints.length > 1 && (
                                    <polyline
                                        points={linePoints.map(p => `${p.px},${p.py}`).join(' ')}
                                        fill="none"
                                        stroke="#0ea5e9"
                                        strokeWidth="2.5"
                                    />
                                )}
                                {/* If line is vertical, draw separately */}
                                {currentEq.b === 0 && currentEq.a !== 0 && (
                                    (() => {
                                        const xVal = currentEq.c / currentEq.a;
                                        const px = 200 + xVal * 40;
                                        return <line x1={px} y1="20" x2={px} y2="380" stroke="#0ea5e9" strokeWidth="2.5" />;
                                    })()
                                )}

                                {/* Highlight intercepts if within range */}
                                {xInt !== null && xInt >= -5 && xInt <= 5 && (
                                    <g>
                                        <circle cx={200 + xInt * 40} cy={200} r="7" fill="#f97316" stroke="#fff" strokeWidth="2" />
                                        <text x={200 + xInt * 40 + 10} y={195} fontSize="13" fill="#f97316" className="font-mono font-bold">
                                            ({xInt.toFixed(1)},0)
                                        </text>
                                    </g>
                                )}
                                {yInt !== null && yInt >= -5 && yInt <= 5 && (
                                    <g>
                                        <circle cx={200} cy={200 - yInt * 40} r="7" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                                        <text x={205} y={200 - yInt * 40 - 10} fontSize="13" fill="#f59e0b" className="font-mono font-bold">
                                            (0,{yInt.toFixed(1)})
                                        </text>
                                    </g>
                                )}

                                {/* Equation label */}
                                <text x="20" y="30" fontSize="12" fill="#475569" className="dark:fill-slate-400 font-mono">
                                    {currentEq.label}
                                </text>
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full mr-2">
                                x-intercept: {xInt !== null ? `(${xInt.toFixed(2)}, 0)` : "none"}
                            </span>
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                y-intercept: {yInt !== null ? `(0, ${yInt.toFixed(2)})` : "none"}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Special Cases ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/5 dark:hover:shadow-rose-400/5",
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
                                <h3 className="font-semibold text-sky-600 dark:text-sky-400">Line passes through origin</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If c = 0 (e.g., <span className="font-mono">2x - 3y = 0</span>), then both
                                    intercepts are (0,0). The line crosses both axes at the origin.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-rose-600 dark:text-rose-400">Horizontal line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If a = 0 (e.g., <span className="font-mono">y = 3</span>), there is no x-intercept
                                    (unless y=0, which is the x-axis). The y-intercept is (0,3).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-amber-600 dark:text-amber-400">Vertical line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If b = 0 (e.g., <span className="font-mono">x = -2</span>), there is no y-intercept
                                    (unless x=0, which is the y-axis). The x-intercept is (-2,0).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">No intercept</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    A line parallel to an axis that doesn't cross it has no intercept on that axis.
                                    For example, y=5 has no x-intercept.
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
                            <div className="font-semibold text-orange-600 dark:text-orange-400">Budget Constraint</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                For <span className="font-mono">2x + 3y ≤ 12</span>, the x-intercept (6,0) means
                                if you buy only x, you can get 6 units; y-intercept (0,4) means if you buy only y,
                                you get 4 units.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Production Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-amber-600 dark:text-amber-400">Ichapur</span>,
                                a factory uses constraint <span className="font-mono">x + 2y = 40</span>. The intercepts
                                show max production of product A (40 units) or product B (20 units).
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-sky-600 dark:text-sky-400">Break-even Analysis</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A startup in <span className="font-medium text-sky-600 dark:text-sky-400">Kolkata</span>{" "}
                                plots cost vs. revenue. The x-intercept of the cost line shows the volume at which
                                cost is zero (if any).
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Diet Requirements</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                For <span className="font-mono">3x + y ≥ 15</span>, the intercepts help <span className="font-medium text-emerald-600 dark:text-emerald-400">Mamata</span>{" "}
                                see how much of each nutrient she needs if she consumes only one type.
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
                                <li>To find x-intercept, set y=0 — it's that simple.</li>
                                <li>To find y-intercept, set x=0.</li>
                                <li>If both intercepts are the origin, the line passes through origin.</li>
                                <li>Intercepts are often fractions; keep them as fractions for exact plotting.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Swapping the roles (for x-intercept, setting x=0 instead of y=0).</li>
                                <li>Forgetting that intercepts are points (coordinate pairs).</li>
                                <li>Not handling cases where intercept doesn't exist (e.g., horizontal/vertical lines).</li>
                                <li>Misreading the sign of intercepts (e.g., getting -6 instead of 6).</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Write intercepts as ordered pairs: (x,0) and (0,y).</li>
                                <li>Always label them on the graph.</li>
                                <li>Use intercepts to quickly sketch the line.</li>
                                <li>Check your intercepts by plugging them back into the equation.</li>
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
                            <span>I can find the x-intercept by setting y=0 and solving.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the y-intercept by setting x=0 and solving.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that intercepts are points (x,0) and (0,y).</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can handle special cases like horizontal/vertical lines.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can use intercepts to sketch a line quickly.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify intercepts by substituting back into the equation.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Finding x-intercepts and y-intercepts – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="x-intercepts and y-intercepts – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic4_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Intercepts are often the first hurdle students face when graphing. I like to use the mnemonic 'x marks the spot on the horizontal' — to find x-intercept, set y=0 (ground level). For y-intercept, set x=0 (against the wall). Also, emphasize that intercepts are points, so they must be written as ordered pairs. Once students master this, plotting lines becomes much faster and more intuitive."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 4 — Finding Intercepts &bull; Essential skill for plotting constraints
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Plotting a Straight-Line Constraint (Topic 5)
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

export default Topic4;