import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic6 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedConstraint, setSelectedConstraint] = useState(0);
    const [testPoint, setTestPoint] = useState({ x: 0, y: 0 });
    const [showTestResult, setShowTestResult] = useState(false);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Example constraints for testing
    const constraints = [
        { label: "2x + 3y ≤ 12", a: 2, b: 3, c: 12, sign: "≤" },
        { label: "x - 2y ≥ 6", a: 1, b: -2, c: 6, sign: "≥" },
        { label: "3x + y < 9", a: 3, b: 1, c: 9, sign: "<" },
        { label: "x + 2y > 8", a: 1, b: 2, c: 8, sign: ">" },
        { label: "4x - y ≤ 4", a: 4, b: -1, c: 4, sign: "≤" },
    ];

    const current = constraints[selectedConstraint];

    // Helper: convert coordinates to SVG pixels
    const toPixel = (x, y) => ({
        px: 200 + x * 40,
        py: 200 - y * 40,
    });

    // Generate line points
    const getLinePoints = () => {
        const { a, b, c } = current;
        const points = [];
        if (b !== 0 && a !== 0) {
            for (let x = -5; x <= 5; x += 0.1) {
                const y = (c - a * x) / b;
                if (y >= -5 && y <= 5) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -5 && xVal <= 5) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
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
    const isSolid = current.sign === "≤" || current.sign === "≥";

    // Test the point
    const testPointFeasibility = () => {
        const { a, b, c, sign } = current;
        const lhs = a * testPoint.x + b * testPoint.y;
        let result = false;
        switch (sign) {
            case "≤": result = lhs <= c; break;
            case "≥": result = lhs >= c; break;
            case "<": result = lhs < c; break;
            case ">": result = lhs > c; break;
            default: result = false;
        }
        return result;
    };

    const isFeasible = testPointFeasibility();

    // Predefined test points
    const presetPoints = [
        { label: "(0,0)", x: 0, y: 0 },
        { label: "(1,1)", x: 1, y: 1 },
        { label: "(3,2)", x: 3, y: 2 },
        { label: "(5,1)", x: 5, y: 1 },
        { label: "(-1,3)", x: -1, y: 3 },
        { label: "(2,-1)", x: 2, y: -1 },
    ];

    const handlePresetPoint = (x, y) => {
        setTestPoint({ x, y });
        setShowTestResult(true);
    };

    // Calculate intercepts for display
    const xInt = current.b !== 0 ? current.c / current.a : null;
    const yInt = current.a !== 0 ? current.c / current.b : null;

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800">
                        Topic 6 — Testing
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Testing a Point to Determine <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 bg-clip-text text-transparent">
                            the Feasible Side
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn the critical skill of determining which side of a constraint line satisfies the
                        inequality — the key to shading the feasible region.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span> 10 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-pink-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Why Test a Point? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/5 dark:hover:shadow-fuchsia-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        Why Test a Point?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            After plotting a constraint line, you need to know <strong>which side</strong> of the
                            line satisfies the inequality. This is where the <strong className="text-fuchsia-600 dark:text-fuchsia-400">test point method</strong> comes in.
                        </p>
                        <div className="p-4 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800/50">
                            <p className="text-sm text-fuchsia-800 dark:text-fuchsia-300">
                                <span className="font-semibold">💡 Key principle:</span> A line divides the plane
                                into two half-planes. All points in one half-plane satisfy the inequality; all
                                points in the other do not. Testing just <strong>one point</strong> tells you
                                which whole side to shade.
                            </p>
                        </div>
                        <p>
                            The test point method is simple, reliable, and works for every linear inequality.
                            The origin <span className="font-mono">(0,0)</span> is the most common test point
                            because it's easy to evaluate — unless it lies on the line.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 2: The Test Point Method ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        The Test Point Method — Step by Step
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800/50">
                                <h3 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Step 1: Pick a test point</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Choose a point <strong>not on the line</strong> (origin is best).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800/50">
                                <h3 className="font-semibold text-pink-700 dark:text-pink-300">Step 2: Substitute</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plug the point's coordinates into the inequality.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">Step 3: Evaluate</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Check if the inequality is <strong>true</strong> or <strong>false</strong>.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 4: Shade</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If true → shade the side containing the test point.<br />
                                    If false → shade the opposite side.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Example:</span> For <span className="font-mono">2x + 3y ≤ 12</span>,
                                test <span className="font-mono">(0,0)</span>: 0 ≤ 12 → <strong>true</strong> → shade
                                the side containing the origin.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Test Point Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/5 dark:hover:shadow-rose-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Test a Point — Interactive
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a constraint, then click a test point to see if it satisfies the inequality.
                            The graph will show the line, the test point, and whether it's feasible.
                        </p>

                        {/* Constraint selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {constraints.map((con, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setSelectedConstraint(idx);
                                        setShowTestResult(false);
                                    }}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 font-mono",
                                        selectedConstraint === idx
                                            ? "bg-fuchsia-600 dark:bg-fuchsia-500 text-white border-fuchsia-600 dark:border-fuchsia-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-fuchsia-400 dark:hover:border-fuchsia-500"
                                    )}
                                >
                                    {con.label}
                                </button>
                            ))}
                        </div>

                        {/* Test point buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs text-slate-500 dark:text-slate-400 mr-2 self-center">Test points:</span>
                            {presetPoints.map((pt) => (
                                <button
                                    key={pt.label}
                                    onClick={() => handlePresetPoint(pt.x, pt.y)}
                                    className={clsx(
                                        "px-3 py-1 text-sm rounded-lg border transition-all duration-200",
                                        testPoint.x === pt.x && testPoint.y === pt.y && showTestResult
                                            ? "bg-emerald-600 text-white border-emerald-600"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-fuchsia-400 dark:hover:border-fuchsia-500"
                                    )}
                                >
                                    {pt.label}
                                </button>
                            ))}
                            <span className="text-xs text-slate-400 dark:text-slate-500 self-center ml-2">
                                Current: ({testPoint.x}, {testPoint.y})
                            </span>
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Test point explorer">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t6" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t6)" />

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
                                    <g key={`t6-tick-${v}`}>
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

                                {/* Shading (if test result shown) */}
                                {showTestResult && (
                                    <g>
                                        {isFeasible ? (
                                            <rect x="20" y="20" width="180" height="180" fill="#10b981" fillOpacity="0.1" />
                                        ) : (
                                            <rect x="200" y="200" width="180" height="180" fill="#ef4444" fillOpacity="0.1" />
                                        )}
                                    </g>
                                )}

                                {/* Draw constraint line */}
                                {linePoints.length > 1 && (
                                    <polyline
                                        points={linePoints.map(p => `${p.px},${p.py}`).join(' ')}
                                        fill="none"
                                        stroke="#8b5cf6"
                                        strokeWidth="3"
                                        strokeDasharray={isSolid ? "none" : "8,6"}
                                    />
                                )}

                                {/* Test point */}
                                {showTestResult && (() => {
                                    const { px, py } = toPixel(testPoint.x, testPoint.y);
                                    const color = isFeasible ? "#10b981" : "#ef4444";
                                    return (
                                        <g>
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r="8"
                                                fill={color}
                                                stroke="#fff"
                                                strokeWidth="2"
                                                className="animate-[pulse_1.5s_ease-in-out_infinite]"
                                            />
                                            <text
                                                x={px + 12}
                                                y={py - 10}
                                                fontSize="12"
                                                fill={color}
                                                className="font-mono font-bold"
                                            >
                                                ({testPoint.x}, {testPoint.y}) {isFeasible ? "✓" : "✗"}
                                            </text>
                                        </g>
                                    );
                                })()}

                                {/* Constraint label */}
                                <text x="20" y="380" fontSize="12" fill="#8b5cf6" className="font-mono font-bold">
                                    {current.label}
                                </text>
                            </svg>
                        </div>

                        {/* Result display */}
                        <div className="mt-3 text-center">
                            {showTestResult ? (
                                <div className={clsx(
                                    "inline-block px-4 py-2 rounded-lg font-medium",
                                    isFeasible
                                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                        : "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                                )}>
                                    {isFeasible
                                        ? `✅ (${testPoint.x}, ${testPoint.y}) SATISFIES ${current.label}`
                                        : `❌ (${testPoint.x}, ${testPoint.y}) does NOT satisfy ${current.label}`}
                                </div>
                            ) : (
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    Click a test point above to check feasibility
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Choosing a Test Point ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">💡</span>
                        Choosing the Right Test Point
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">✓ Best: Origin (0,0)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Simplest to evaluate. Use unless the line passes through the origin.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">✓ Alternative: (1,0) or (0,1)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Easy to evaluate. Use when origin is on the line.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50">
                                <h3 className="font-semibold text-sky-700 dark:text-sky-300">✓ Smart choice: (1,1)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Often works well when origin is on the line.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">✗ Avoid: Points on the line</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If the point satisfies equality, it doesn't tell you which side to shade.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Pro tip:</span> Always check if your test point
                                is on the line first. If it is, pick a different point. The origin is not on the
                                line if <span className="font-mono">c ≠ 0</span>.
                            </p>
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
                            <div className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">Budget Check</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                For <span className="font-mono">2x + 3y ≤ 12</span>, <span className="font-medium text-fuchsia-600 dark:text-fuchsia-400">Mamata</span>{" "}
                                tests (0,0) → 0 ≤ 12 true. So any combination below the line is affordable.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-pink-600 dark:text-pink-400">Minimum Requirement</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                For <span className="font-mono">x + 2y ≥ 8</span>, a student in{" "}
                                <span className="font-medium text-pink-600 dark:text-pink-400">Kolkata</span>{" "}
                                tests (0,0) → 0 ≥ 8 false. So they must be above the line to meet the requirement.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-rose-600 dark:text-rose-400">Time Limit</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-rose-600 dark:text-rose-400">Ichapur</span>,
                                a factory has <span className="font-mono">3x + y ≤ 15</span> hours. Test (1,1) →
                                4 ≤ 15 true, so this combination is feasible.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Storage Capacity</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Abhronila</span>{" "}
                                has storage <span className="font-mono">x + y ≤ 20</span>. Test (5,10) → 15 ≤ 20
                                true, so this combination fits in the warehouse.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5",
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
                                <li>The origin (0,0) is almost always the best test point.</li>
                                <li>If origin is on the line, try (1,0) or (0,1).</li>
                                <li>Test only ONE point — it's enough for the whole half-plane.</li>
                                <li>Write "True" or "False" next to the inequality when testing.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Testing a point on the line (gives equality, not truth).</li>
                                <li>Shading the wrong side (misinterpreting true/false).</li>
                                <li>Forgetting to substitute both x and y coordinates.</li>
                                <li>Misreading the inequality symbol during testing.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always check if your test point is on the line.</li>
                                <li>Mark the tested point on the graph with "✓" or "✗".</li>
                                <li>Write the inequality and the test result clearly.</li>
                                <li>Use the test point to confirm your shading.</li>
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
                            <span>I understand why we test a point to determine shading.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can substitute a point into an inequality.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can determine if a point satisfies the inequality.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know to avoid testing points on the line.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify which side to shade based on the test result.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can use the origin as a test point effectively.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Testing a Point to Determine the Feasible Side – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Testing a Point – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic6_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "The test point method is one of the most important concepts in graphical LP, yet students often overcomplicate it. I tell them: 'One point is enough — the line divides the plane into two halves, and every point in a half-plane behaves the same way.' I also emphasize checking if the origin is on the line first. A common mistake is testing a point on the line and getting equality, which tells you nothing. Practice with simple inequalities like x ≤ 3 or y ≥ 2 to build confidence."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 6 — Testing a Point &bull; Essential skill for shading the feasible region
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Shading the Appropriate Half-Plane (Topic 7)
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

export default Topic6;