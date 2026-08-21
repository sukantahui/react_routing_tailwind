import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic8 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [showFirstQuadrant, setShowFirstQuadrant] = useState(true);
    const [selectedExample, setSelectedExample] = useState(0);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Example constraints with non-negativity
    const examples = [
        {
            label: "x ≥ 0, y ≥ 0",
            constraints: [
                { a: 1, b: 0, c: 0, sign: "≥", label: "x ≥ 0" },
                { a: 0, b: 1, c: 0, sign: "≥", label: "y ≥ 0" },
            ],
            description: "Basic non-negativity restrictions — feasible region is the first quadrant"
        },
        {
            label: "x ≥ 0, y ≥ 0, x + y ≤ 10",
            constraints: [
                { a: 1, b: 0, c: 0, sign: "≥", label: "x ≥ 0" },
                { a: 0, b: 1, c: 0, sign: "≥", label: "y ≥ 0" },
                { a: 1, b: 1, c: 10, sign: "≤", label: "x + y ≤ 10" },
            ],
            description: "Non-negativity plus a resource constraint"
        },
        {
            label: "x ≥ 0, y ≥ 0, 2x + 3y ≤ 12",
            constraints: [
                { a: 1, b: 0, c: 0, sign: "≥", label: "x ≥ 0" },
                { a: 0, b: 1, c: 0, sign: "≥", label: "y ≥ 0" },
                { a: 2, b: 3, c: 12, sign: "≤", label: "2x + 3y ≤ 12" },
            ],
            description: "Non-negativity with a production constraint"
        },
        {
            label: "x ≥ 0, y ≥ 0, x + 2y ≥ 8",
            constraints: [
                { a: 1, b: 0, c: 0, sign: "≥", label: "x ≥ 0" },
                { a: 0, b: 1, c: 0, sign: "≥", label: "y ≥ 0" },
                { a: 1, b: 2, c: 8, sign: "≥", label: "x + 2y ≥ 8" },
            ],
            description: "Non-negativity with a minimum requirement"
        },
    ];

    const currentExample = examples[selectedExample];

    // Helper: convert coordinates to SVG pixels
    const toPixel = (x, y) => ({
        px: 200 + x * 40,
        py: 200 - y * 40,
    });

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        if (b !== 0 && a !== 0) {
            for (let x = -0.5; x <= 5.5; x += 0.05) {
                const y = (c - a * x) / b;
                if (y >= -0.5 && y <= 5.5) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -0.5 && xVal <= 5.5) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -0.5 && yVal <= 5.5) {
                const py = 200 - yVal * 40;
                points.push({ px: 20, py });
                points.push({ px: 380, py });
            }
        }
        return points;
    };

    // Determine if a constraint is solid (≥ or ≤)
    const isSolid = (sign) => sign === "≥" || sign === "≤";

    // Get shading polygon for first quadrant (x≥0, y≥0)
    const getFirstQuadrantShading = () => {
        return [
            { px: 200, py: 200 },
            { px: 380, py: 200 },
            { px: 380, py: 20 },
            { px: 200, py: 20 },
        ];
    };

    // Get shading polygon for a specific constraint
    const getConstraintShading = (a, b, c, sign) => {
        const pts = [];
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(4.5);
                    if (yRight >= -0.5 && yRight <= 5.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= 5.5) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                } else {
                    pts.push({ px: 200, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(4.5);
                    if (yRight >= -0.5 && yRight <= 5.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= 5.5) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                }
            } else {
                if (b > 0) {
                    pts.push({ px: 200, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(4.5);
                    if (yRight >= -0.5 && yRight <= 5.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= 5.5) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                } else {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(4.5);
                    if (yRight >= -0.5 && yRight <= 5.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= 5.5) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            const px = 200 + xVal * 40;
            if (sign === "≥" || sign === ">") {
                pts.push({ px: px, py: 20 });
                pts.push({ px: 380, py: 20 });
                pts.push({ px: 380, py: 380 });
                pts.push({ px: px, py: 380 });
            } else {
                pts.push({ px: 200, py: 20 });
                pts.push({ px: px, py: 20 });
                pts.push({ px: px, py: 380 });
                pts.push({ px: 200, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            const py = 200 - yVal * 40;
            if (sign === "≥" || sign === ">") {
                pts.push({ px: 200, py: 20 });
                pts.push({ px: 380, py: 20 });
                pts.push({ px: 380, py: py });
                pts.push({ px: 200, py: py });
            } else {
                pts.push({ px: 200, py: py });
                pts.push({ px: 380, py: py });
                pts.push({ px: 380, py: 380 });
                pts.push({ px: 200, py: 380 });
            }
        }
        return pts.filter(p => p.px >= 200 && p.px <= 380 && p.py >= 20 && p.py <= 380);
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                        Topic 8 — Non-Negativity
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Graphical Representation of <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Non-Negativity Restrictions
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Understand how non-negativity constraints restrict the feasible region to the first quadrant
                        — a fundamental concept in linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> 8 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What are Non-Negativity Restrictions? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 dark:hover:shadow-green-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🚫</span>
                        What are Non-Negativity Restrictions?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            <strong className="text-green-600 dark:text-green-400">Non-negativity restrictions</strong>{" "}
                            are constraints that require decision variables to be greater than or equal to zero:
                            <span className="font-mono"> x ≥ 0</span> and <span className="font-mono">y ≥ 0</span>.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Why are they needed?</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Most real-world quantities can't be negative</li>
                                    <li>• You can't produce negative items</li>
                                    <li>• You can't spend negative money</li>
                                    <li>• You can't have negative time</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Graphical Effect</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Restricts solution to first quadrant</li>
                                    <li>• Creates two additional constraints</li>
                                    <li>• Often forms part of the feasible region boundary</li>
                                    <li>• Corner points include axes intercepts</li>
                                </ul>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Real-world analogy:</span> Think of a student
                                like <span className="font-medium text-blue-600 dark:text-blue-400">Mamata</span>{" "}
                                who can't study negative hours or attend negative classes. Non-negativity ensures
                                all variables represent real, meaningful quantities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Graphing Non-Negativity ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        Graphing Non-Negativity Restrictions
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Non-negativity restrictions <span className="font-mono">x ≥ 0</span> and{" "}
                            <span className="font-mono">y ≥ 0</span> are simply constraints like any other:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                                <h3 className="font-semibold text-green-700 dark:text-green-300">x ≥ 0</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Vertical line at x = 0 (the y-axis)</li>
                                    <li>• Solid line (includes equality)</li>
                                    <li>• Shade to the RIGHT</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">y ≥ 0</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Horizontal line at y = 0 (the x-axis)</li>
                                    <li>• Solid line (includes equality)</li>
                                    <li>• Shade ABOVE</li>
                                </ul>
                            </div>
                        </div>
                        <p>
                            The intersection of these two constraints is the <strong className="text-green-600 dark:text-green-400">first quadrant</strong>.
                            This becomes the "playing field" for most LP problems.
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Non-Negativity Explorer ===== */}
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
                        See Non-Negativity in Action
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select an example to see how non-negativity restricts the feasible region to the first
                            quadrant. The green shading shows the first quadrant (x≥0, y≥0).
                        </p>

                        {/* Example selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {examples.map((ex, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedExample(idx)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                        selectedExample === idx
                                            ? "bg-green-600 dark:bg-green-500 text-white border-green-600 dark:border-green-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-green-400 dark:hover:border-green-500"
                                    )}
                                >
                                    {ex.label}
                                </button>
                            ))}
                        </div>

                        {/* Toggle first quadrant shading */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowFirstQuadrant(!showFirstQuadrant)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showFirstQuadrant
                                        ? "bg-emerald-600 text-white border-emerald-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showFirstQuadrant ? "Hide First Quadrant" : "Show First Quadrant"}
                            </button>
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Non-negativity explorer">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t8" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t8)" />

                                {/* First quadrant shading */}
                                {showFirstQuadrant && (
                                    <polygon
                                        points={getFirstQuadrantShading().map(p => `${p.px},${p.py}`).join(' ')}
                                        fill="#10b981"
                                        fillOpacity="0.15"
                                        stroke="none"
                                    />
                                )}

                                {/* Additional constraint shadings */}
                                {currentExample.constraints.map((con, idx) => {
                                    const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                    if (shading.length > 2 && !(con.a === 1 && con.b === 0 && con.c === 0) && !(con.a === 0 && con.b === 1 && con.c === 0)) {
                                        const colors = ["#8b5cf6", "#f59e0b", "#ef4444", "#3b82f6"];
                                        return (
                                            <polygon
                                                key={idx}
                                                points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                fill={colors[idx % colors.length]}
                                                fillOpacity="0.12"
                                                stroke="none"
                                            />
                                        );
                                    }
                                    return null;
                                })}

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

                                {/* Tick marks (first quadrant only) */}
                                {[40, 80, 120, 160, 240, 280, 320, 360].map((v) => {
                                    const val = (v - 200) / 40;
                                    if (val >= 0 && val <= 4.5) {
                                        return (
                                            <g key={`t8-tick-${v}`}>
                                                <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                {v >= 40 && v <= 360 && val !== 0 && (
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
                                {currentExample.constraints.map((con, idx) => {
                                    const points = getLinePoints(con.a, con.b, con.c);
                                    const solid = isSolid(con.sign);
                                    const colors = ["#8b5cf6", "#f59e0b", "#ef4444", "#3b82f6"];
                                    const color = colors[idx % colors.length];
                                    
                                    // Special highlighting for x≥0 and y≥0
                                    const isNonNeg = (con.a === 1 && con.b === 0 && con.c === 0) || 
                                                    (con.a === 0 && con.b === 1 && con.c === 0);
                                    const strokeWidth = isNonNeg ? 3 : 2.5;
                                    const strokeColor = isNonNeg ? "#10b981" : color;
                                    const dash = solid ? "none" : "8,6";
                                    
                                    if (points.length > 1) {
                                        return (
                                            <polyline
                                                key={idx}
                                                points={points.map(p => `${p.px},${p.py}`).join(' ')}
                                                fill="none"
                                                stroke={strokeColor}
                                                strokeWidth={strokeWidth}
                                                strokeDasharray={dash}
                                                opacity={isNonNeg ? 0.8 : 0.7}
                                            />
                                        );
                                    }
                                    return null;
                                })}

                                {/* Labels for non-negativity constraints */}
                                <text x="30" y="100" fontSize="12" fill="#10b981" className="font-bold">
                                    x ≥ 0
                                </text>
                                <text x="240" y="380" fontSize="12" fill="#10b981" className="font-bold">
                                    y ≥ 0
                                </text>

                                {/* Example description */}
                                <text x="20" y="380" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.description}
                                </text>

                                {/* First quadrant label */}
                                {showFirstQuadrant && (
                                    <text x="260" y="60" fontSize="14" fill="#10b981" className="font-bold">
                                        QI
                                    </text>
                                )}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full mr-2">
                                ✓ First quadrant (x≥0, y≥0)
                            </span>
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                {currentExample.constraints.length} constraints total
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Corner Points with Non-Negativity ===== */}
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
                        <span className="text-3xl">📍</span>
                        Corner Points and Non-Negativity
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Non-negativity restrictions create important corner points where constraints intersect
                            the axes. These corner points are often candidates for optimal solutions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Origin (0,0)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Intersection of x=0 and y=0. Often a feasible corner point.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">x-axis intercept</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Where a constraint meets x-axis (y=0). Point is (x, 0).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">y-axis intercept</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Where a constraint meets y-axis (x=0). Point is (0, y).
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Key insight:</span> The origin and axis
                                intercepts are always potential corner points. They should never be overlooked
                                when evaluating the objective function.
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
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🌍</span>
                        Real-World Examples
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-green-600 dark:text-green-400">Production Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-green-600 dark:text-green-400">Ichapur</span>{" "}
                                produces two products. Non-negativity ensures production quantities are never
                                negative — you can't produce -5 units of product A.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Budget Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A student in <span className="font-medium text-emerald-600 dark:text-emerald-400">Kolkata</span>{" "}
                                allocates money between food and travel. Non-negativity means spending can't be
                                negative — you can't spend -₹100 on food.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-teal-600 dark:text-teal-400">Time Management</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-teal-600 dark:text-teal-400">Debangshu</span>{" "}
                                allocates time between study and exercise. Non-negativity means time cannot be
                                negative — you can't study for -2 hours.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-cyan-600 dark:text-cyan-400">Inventory Management</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A warehouse in <span className="font-medium text-cyan-600 dark:text-cyan-400">Jadavpur</span>{" "}
                                stores two types of goods. Non-negativity ensures inventory levels are never
                                negative — you can't have -10 units in stock.
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
                                <li>Always include non-negativity in LP formulations.</li>
                                <li>Graph only the first quadrant for LP problems.</li>
                                <li>Origin is almost always a feasible corner point.</li>
                                <li>Axis intercepts are key corner points.</li>
                                <li>Use the first quadrant as your "playing field."</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Forgetting to include non-negativity constraints.</li>
                                <li>Graphing in all four quadrants unnecessarily.</li>
                                <li>Not recognizing origin as a potential optimum.</li>
                                <li>Ignoring axis intercepts as corner points.</li>
                                <li>Using dashed lines for x≥0 or y≥0 (should be solid).</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always shade the first quadrant for x≥0, y≥0.</li>
                                <li>Label the axes clearly with variables.</li>
                                <li>Use solid lines for non-negativity constraints.</li>
                                <li>Include origin in your set of candidate points.</li>
                                <li>Check if variables truly can't be negative.</li>
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
                            <span>I understand why non-negativity constraints are needed.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can graph x ≥ 0 and y ≥ 0 as solid lines.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that non-negativity restricts the region to the first quadrant.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can shade the first quadrant correctly.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that the origin and axis intercepts are important corner points.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify when non-negativity creates the feasible region boundary.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Non-Negativity Restrictions – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Non-Negativity Restrictions – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic8_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Non-negativity is often overlooked because it seems 'obvious.' But I've seen many students lose marks by forgetting to include it in their LP formulations. I tell my students: 'If it's a real quantity, it can't be negative.' Also, emphasize that the first quadrant is where all the action happens — it's your problem-solving arena. A useful exercise: give students a problem without non-negativity and ask them why it's needed."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 8 — Non-Negativity Restrictions &bull; Restricting to the first quadrant
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Plotting Multiple Constraints on the Same Graph (Topic 9)
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

export default Topic8;