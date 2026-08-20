import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic2 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
    ];

    // Interactive axis label display
    const [showGridLabels, setShowGridLabels] = useState(true);
    const [highlightQuadrant, setHighlightQuadrant] = useState(null); // 1-4

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        Topic 2 — The Coordinate System
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Understanding the <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                            x-axis and y-axis
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Master the essential building blocks of the coordinate plane — the axes that give every
                        point a unique address.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-sky-500"></span> 8 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What are the Axes? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📏</span>
                        What are the x-axis and y-axis?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-sky-600 dark:text-sky-400">x-axis</strong> is the horizontal
                            number line, and the <strong className="text-blue-600 dark:text-blue-400">y-axis</strong>{" "}
                            is the vertical number line. They intersect at the <strong className="text-rose-600 dark:text-rose-400">origin</strong>{" "}
                            (0,0). Together, they form the coordinate plane, also called the Cartesian plane.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">x-axis</div>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Horizontal</li>
                                    <li>• Independent variable</li>
                                    <li>• Positive to the right, negative to the left</li>
                                    <li>• Also called the abscissa</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">y-axis</div>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Vertical</li>
                                    <li>• Dependent variable</li>
                                    <li>• Positive upward, negative downward</li>
                                    <li>• Also called the ordinate</li>
                                </ul>
                            </div>
                        </div>
                        <p className="mt-2">
                            The axes divide the plane into four <strong>quadrants</strong>, numbered
                            <span className="font-mono"> I (+,+), II (-,+), III (-,-), IV (+,-)</span>.
                            Understanding this layout is crucial for graphing constraints.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 2: Interactive Axes Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Explore the Axes
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Hover over the quadrants to highlight them. Click the buttons to toggle labels.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowGridLabels(!showGridLabels)}
                                className="px-3 py-1.5 text-sm rounded-lg border bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-200"
                            >
                                {showGridLabels ? "Hide Labels" : "Show Labels"}
                            </button>
                            <button
                                onClick={() => setHighlightQuadrant(1)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    highlightQuadrant === 1
                                        ? "bg-sky-600 text-white border-sky-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-sky-400"
                                )}
                            >
                                QI
                            </button>
                            <button
                                onClick={() => setHighlightQuadrant(2)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    highlightQuadrant === 2
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-indigo-400"
                                )}
                            >
                                QII
                            </button>
                            <button
                                onClick={() => setHighlightQuadrant(3)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    highlightQuadrant === 3
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-rose-400"
                                )}
                            >
                                QIII
                            </button>
                            <button
                                onClick={() => setHighlightQuadrant(4)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    highlightQuadrant === 4
                                        ? "bg-emerald-600 text-white border-emerald-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-emerald-400"
                                )}
                            >
                                QIV
                            </button>
                            <button
                                onClick={() => setHighlightQuadrant(null)}
                                className="px-3 py-1.5 text-sm rounded-lg border bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-gray-400 transition-all duration-200"
                            >
                                Reset
                            </button>
                        </div>

                        {/* SVG Graph with quadrants */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Coordinate axes explorer">
                                {/* Quadrant highlights */}
                                {highlightQuadrant === 1 && (
                                    <rect x="200" y="20" width="180" height="180" fill="#0ea5e9" fillOpacity="0.15" />
                                )}
                                {highlightQuadrant === 2 && (
                                    <rect x="20" y="20" width="180" height="180" fill="#6366f1" fillOpacity="0.15" />
                                )}
                                {highlightQuadrant === 3 && (
                                    <rect x="20" y="200" width="180" height="180" fill="#f43f5e" fillOpacity="0.15" />
                                )}
                                {highlightQuadrant === 4 && (
                                    <rect x="200" y="200" width="180" height="180" fill="#10b981" fillOpacity="0.15" />
                                )}

                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t2" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t2)" />

                                {/* Axes */}
                                <line x1="20" y1="200" x2="380" y2="200" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                <line x1="200" y1="380" x2="200" y2="20" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />

                                {/* Arrowheads */}
                                <polygon points="380,195 395,200 380,205" fill="#1e293b" className="dark:fill-slate-300" />
                                <polygon points="195,20 200,5 205,20" fill="#1e293b" className="dark:fill-slate-300" />

                                {/* Axis Labels */}
                                <text x="385" y="215" fontSize="18" fill="#0ea5e9" fontWeight="bold" className="dark:text-sky-400">x</text>
                                <text x="210" y="22" fontSize="18" fill="#3b82f6" fontWeight="bold" className="dark:text-blue-400">y</text>

                                {/* Origin */}
                                <circle cx="200" cy="200" r="5" fill="#ef4444" />
                                <text x="205" y="215" fontSize="14" fill="#1e293b" className="dark:fill-slate-300 font-medium">O</text>

                                {/* Tick marks and numbers */}
                                {showGridLabels && [40, 80, 120, 160, 240, 280, 320, 360].map((v) => (
                                    <g key={`t2-tick-${v}`}>
                                        <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                        <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                        {v >= 40 && v <= 360 && (
                                            <>
                                                <text x={v - 4} y="218" fontSize="11" fill="#475569" className="dark:fill-slate-500">{v === 200 ? 0 : (v - 200) / 40}</text>
                                                <text x="178" y={v + 5} fontSize="11" fill="#475569" className="dark:fill-slate-500">{v === 200 ? 0 : (200 - v) / 40}</text>
                                            </>
                                        )}
                                    </g>
                                ))}

                                {/* Quadrant labels */}
                                {showGridLabels && (
                                    <>
                                        <text x="280" y="80" fontSize="16" fill="#0ea5e9" fontWeight="bold" className="dark:text-sky-400">QI</text>
                                        <text x="60" y="80" fontSize="16" fill="#6366f1" fontWeight="bold" className="dark:text-indigo-400">QII</text>
                                        <text x="60" y="300" fontSize="16" fill="#f43f5e" fontWeight="bold" className="dark:text-rose-400">QIII</text>
                                        <text x="280" y="300" fontSize="16" fill="#10b981" fontWeight="bold" className="dark:text-emerald-400">QIV</text>
                                    </>
                                )}

                                {/* Hoverable points */}
                                <circle cx="280" cy="120" r="6" fill="#0ea5e9" className="" />
                                <text x="285" y="115" fontSize="12" fill="#0ea5e9" className="font-mono">(2,2)</text>

                                <circle cx="120" cy="120" r="6" fill="#6366f1" className="" />
                                <text x="100" y="115" fontSize="12" fill="#6366f1" className="font-mono">(-2,2)</text>

                                <circle cx="120" cy="280" r="6" fill="#f43f5e" className="" />
                                <text x="100" y="295" fontSize="12" fill="#f43f5e" className="font-mono">(-2,-2)</text>

                                <circle cx="280" cy="280" r="6" fill="#10b981" className="" />
                                <text x="285" y="295" fontSize="12" fill="#10b981" className="font-mono">(2,-2)</text>

                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            {highlightQuadrant === 1 && "QI: (+,+) – both positive"}
                            {highlightQuadrant === 2 && "QII: (-,+) – x negative, y positive"}
                            {highlightQuadrant === 3 && "QIII: (-,-) – both negative"}
                            {highlightQuadrant === 4 && "QIV: (+,-) – x positive, y negative"}
                            {highlightQuadrant === null && "Hover over a quadrant or click a button to highlight"}
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Reading and Interpreting Points ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📍</span>
                        Reading Coordinates
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Every point on the plane is given as an ordered pair <span className="font-mono">(x, y)</span>.
                            The <strong className="text-sky-600 dark:text-sky-400">x-coordinate</strong> tells how
                            far to move horizontally from the origin; the <strong className="text-blue-600 dark:text-blue-400">y-coordinate</strong>{" "}
                            tells how far to move vertically.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="font-semibold text-sky-600 dark:text-sky-400">Positive x, positive y</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">(3, 2) → 3 right, 2 up → Quadrant I</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="font-semibold text-indigo-600 dark:text-indigo-400">Negative x, positive y</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">(-3, 2) → 3 left, 2 up → Quadrant II</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="font-semibold text-rose-600 dark:text-rose-400">Negative x, negative y</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">(-3, -2) → 3 left, 2 down → Quadrant III</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="font-semibold text-emerald-600 dark:text-emerald-400">Positive x, negative y</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">(3, -2) → 3 right, 2 down → Quadrant IV</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Tip:</span> Always read the x-coordinate first.
                                Think "<span className="font-mono">x</span> marks the spot" — horizontal before vertical.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: The Origin and Special Points ===== */}
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
                        <span className="text-3xl">🎯</span>
                        The Origin and Special Points
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-rose-600 dark:text-rose-400">origin (0,0)</strong> is the
                            intersection of the axes. It's the reference point for all coordinates.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold text-rose-600 dark:text-rose-400">Origin</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">(0,0) — center of the plane</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold text-sky-600 dark:text-sky-400">On x-axis</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">(x, 0) — any point with y=0</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold text-blue-600 dark:text-blue-400">On y-axis</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">(0, y) — any point with x=0</p>
                            </div>
                        </div>
                        <p>
                            These special points are often used as test points when shading inequalities, because
                            they are easy to evaluate.
                        </p>
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
                            <div className="font-semibold text-sky-600 dark:text-sky-400">City Map Coordinates</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-sky-600 dark:text-sky-400">Barrackpore</span>,
                                the main market is at (3, 2) from the railway station. The x-axis could be the
                                main road, and y-axis a perpendicular lane.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-blue-600 dark:text-blue-400">Temperature & Time</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-blue-600 dark:text-blue-400">Kolkata</span>,
                                temperature (y-axis) vs. time of day (x-axis) — you can plot how temperature
                                changes over the day.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Profit vs. Production</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A business in <span className="font-medium text-emerald-600 dark:text-emerald-400">Jadavpur</span>{" "}
                                plots profit (y) against units produced (x). The axes help see the break-even point.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-rose-600 dark:text-rose-400">Nutrient Intake</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A student like <span className="font-medium text-rose-600 dark:text-rose-400">Mamata</span>{" "}
                                tracks calories (x-axis) and protein (y-axis) to ensure she meets daily
                                requirements.
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
                                <li>Remember: x comes before y in the ordered pair.</li>
                                <li>Use the phrase "x marks the spot" to recall horizontal first.</li>
                                <li>When plotting, move horizontally then vertically.</li>
                                <li>Always label your axes with variables.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Confusing x and y coordinates (reversing order).</li>
                                <li>Forgetting that negative x goes left, negative y down.</li>
                                <li>Not placing the origin at the correct intersection.</li>
                                <li>Misreading scales on the axes.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always start at the origin when plotting.</li>
                                <li>Use consistent scaling on both axes.</li>
                                <li>Check your point by reading it back from the graph.</li>
                                <li>Keep axes straight and perpendicular.</li>
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
                            <span>I can identify the x-axis and y-axis on a graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that x is horizontal and y is vertical.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can locate the origin and understand its role.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can read coordinates (x,y) and plot them correctly.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand the four quadrants and their signs.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can distinguish between points on axes and off axes.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Understanding the x-axis and y-axis – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Understanding the Axes – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic2_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "I've noticed that students often struggle with the concept of negative coordinates. A simple game: call out coordinates like (3, -2) and have them point to the location on a large grid on the floor. Also, emphasize that the axes are just number lines — the x-axis is a horizontal number line, the y-axis a vertical one. Once they see that, the jump to plotting is much easier. Use real-world maps to make it concrete."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 2 — The Coordinate System &bull; Foundations for plotting constraints
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Identifying the Origin and Coordinate Points (Topic 3)
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
                    0%, 100% { transform: scale(1); opacity: 0.6; }
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
                    .animate-\\[pulse_2s_ease-in-out_infinite\\] {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic2;