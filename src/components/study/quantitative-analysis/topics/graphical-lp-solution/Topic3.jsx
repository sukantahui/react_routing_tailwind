import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic3 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedPoint, setSelectedPoint] = useState(null);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Predefined points for interactive exploration
    const points = [
        { label: "A", x: 3, y: 2, quadrant: "QI" },
        { label: "B", x: -2, y: 4, quadrant: "QII" },
        { label: "C", x: -4, y: -3, quadrant: "QIII" },
        { label: "D", x: 5, y: -2, quadrant: "QIV" },
        { label: "Origin", x: 0, y: 0, quadrant: "Origin" },
        { label: "On x-axis", x: 4, y: 0, quadrant: "x-axis" },
        { label: "On y-axis", x: 0, y: 3, quadrant: "y-axis" },
    ];

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

    const handlePointClick = (point) => {
        setSelectedPoint(selectedPoint && selectedPoint.label === point.label ? null : point);
    };

    // Helper to convert coordinates to SVG pixel positions (scale: 1 unit = 40px)
    const toPixel = (x, y) => ({
        px: 200 + x * 40,
        py: 200 - y * 40,
    });

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
                        Topic 3 — Core Concepts
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Identifying the <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Origin and Coordinate Points
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Master the reference point of the coordinate system and learn to name any point by its
                        coordinates — essential for plotting constraints.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 8 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: The Origin ===== */}
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
                        <span className="text-3xl">🎯</span>
                        The Origin — (0, 0)
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-rose-600 dark:text-rose-400">origin</strong> is the heart
                            of the coordinate plane — the point where the x-axis and y-axis intersect. Its
                            coordinates are <span className="font-mono">(0, 0)</span>.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold">Coordinates</span>
                                <p className="text-sm font-mono text-rose-600 dark:text-rose-400">(0, 0)</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold">Role</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Reference point for all measurements</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="font-semibold">On axes?</span>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Lies on both axes</p>
                            </div>
                        </div>
                        <p>
                            The origin is the starting point for plotting any point. It's the 'zero' of the
                            coordinate system — just like 0 on a number line. In linear programming, non-negativity
                            constraints (x ≥ 0, y ≥ 0) often place the feasible region in the first quadrant,
                            with the origin as a possible corner point.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 2: Coordinate Points ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📍</span>
                        Understanding Coordinate Points
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Every point on the plane is identified by an ordered pair <span className="font-mono">(x, y)</span>.
                            The <strong className="text-indigo-600 dark:text-indigo-400">x-coordinate</strong> (abscissa)
                            gives the horizontal distance from the origin, and the <strong className="text-purple-600 dark:text-purple-400">y-coordinate</strong> (ordinate)
                            gives the vertical distance.
                        </p>
                        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                            <p className="text-sm text-indigo-800 dark:text-indigo-300">
                                <span className="font-semibold">💡 Analogy:</span> Think of the origin as the
                                post office in <span className="font-medium">Barrackpore</span>. The x-coordinate
                                tells you how many blocks east (positive) or west (negative), and the y-coordinate
                                tells you how many blocks north (positive) or south (negative).
                            </p>
                        </div>
                        <p>
                            To identify a point, simply read its coordinates from the axes. For example, a point
                            3 units to the right and 2 units up has coordinates <span className="font-mono">(3, 2)</span>.
                            This is the foundation for all graphing in LP.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Point Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Explore Points on the Plane
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Click on a point below to highlight it on the graph. Observe how its coordinates
                            relate to its position relative to the origin.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {points.map((pt) => (
                                <button
                                    key={pt.label}
                                    onClick={() => handlePointClick(pt)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 font-mono",
                                        selectedPoint && selectedPoint.label === pt.label
                                            ? "bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500"
                                    )}
                                >
                                    {pt.label} ({pt.x}, {pt.y})
                                </button>
                            ))}
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Coordinate plane with interactive points">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t3" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t3)" />

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
                                    <g key={`t3-tick-${v}`}>
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

                                {/* All points (with highlighting) */}
                                {points.map((pt) => {
                                    const { px, py } = toPixel(pt.x, pt.y);
                                    const isSelected = selectedPoint && selectedPoint.label === pt.label;
                                    const isOrigin = pt.label === "Origin";
                                    const color = isSelected ? "#8b5cf6" : (isOrigin ? "#ef4444" : "#0ea5e9");
                                    return (
                                        <g key={pt.label}>
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r={isSelected ? 8 : 5}
                                                fill={color}
                                                className={clsx(
                                                    "transition-all duration-300 cursor-pointer",
                                                    isSelected && "cursor-pointer"
                                                )}
                                            />
                                            <text
                                                x={px + 10}
                                                y={py - 8}
                                                fontSize="12"
                                                fill={color}
                                                className="font-mono"
                                            >
                                                {pt.label} ({pt.x},{pt.y})
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            {selectedPoint ? (
                                <span>
                                    <strong>{selectedPoint.label}</strong> at ({selectedPoint.x}, {selectedPoint.y})
                                    &nbsp;— {selectedPoint.quadrant}
                                </span>
                            ) : (
                                "Click a point to highlight it"
                            )}
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Points on Axes ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📌</span>
                        Points on the Axes
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Points on the axes have one coordinate equal to zero.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-sky-600 dark:text-sky-400">On the x-axis</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    <span className="font-mono">(x, 0)</span> — any value of x, y=0.
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                    Example: (3, 0), (-2, 0)
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-semibold text-blue-600 dark:text-blue-400">On the y-axis</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    <span className="font-mono">(0, y)</span> — any value of y, x=0.
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                    Example: (0, 4), (0, -1)
                                </p>
                            </div>
                        </div>
                        <p>
                            These points are particularly useful because they simplify calculations — for instance,
                            when finding intercepts of constraint lines.
                        </p>
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
                            <div className="font-semibold text-sky-600 dark:text-sky-400">Map Navigation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-sky-600 dark:text-sky-400">Barrackpore</span>,
                                the main square is the origin. A point at (2, 3) means 2 blocks east and 3 blocks north.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-indigo-600 dark:text-indigo-400">Stock Portfolio</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-indigo-600 dark:text-indigo-400">Kolkata</span>,
                                an investor tracks profit (y) vs. investment (x). The origin is the starting point
                                with zero profit and zero investment.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Temperature Log</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A student in <span className="font-medium text-emerald-600 dark:text-emerald-400">Jadavpur</span>{" "}
                                records temperature (y) at different times (x). The origin could be 6 AM and 0°C.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-rose-600 dark:text-rose-400">Study Hours vs. Grades</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-rose-600 dark:text-rose-400">Mamata</span> plots
                                study hours (x) and grades (y). The origin represents no study and a grade of 0.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
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
                                <li>Always start from the origin when plotting.</li>
                                <li>Use the origin as a test point — it's the easiest to evaluate.</li>
                                <li>For points on axes, remember one coordinate is zero.</li>
                                <li>Practice reading coordinates from graphs without plotting.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Confusing the origin (0,0) with (0, something else).</li>
                                <li>Misreading coordinates (reversing x and y).</li>
                                <li>Forgetting that points on axes have a zero coordinate.</li>
                                <li>Not recognizing that the origin lies on both axes.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Label the origin clearly on every graph.</li>
                                <li>When reading points, say "x is first" to yourself.</li>
                                <li>Use grid lines to help locate points.</li>
                                <li>Check your point by tracing horizontally and vertically.</li>
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
                            <span>I can identify the origin on a graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know the coordinates of the origin are (0,0).</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can read coordinates of any point on the plane.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that x-coordinate is horizontal, y is vertical.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify points on the x-axis (y=0) and y-axis (x=0).</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can use the origin as a reference for other points.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Identifying the Origin and Coordinate Points – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Origin and Coordinate Points – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic3_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "I often see students struggle to remember that the origin is (0,0) and that it lies on both axes. A simple mnemonic: 'Origin is the center, like the hub of a wheel.' Also, emphasize that the x-coordinate is always written first — 'x before y' — and that a point on the x-axis has y=0 (like 'y is zero on the horizontal'), and on the y-axis has x=0. Use real maps to reinforce the concept."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 3 — The Origin and Coordinate Points &bull; Building spatial awareness for LP
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Finding x-intercepts and y-intercepts (Topic 4)
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
                    50% { transform: scale(1.2); opacity: 1; }
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

export default Topic3;