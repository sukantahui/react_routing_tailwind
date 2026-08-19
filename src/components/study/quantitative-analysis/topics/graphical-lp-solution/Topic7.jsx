import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic7 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedConstraint, setSelectedConstraint] = useState(0);
    const [showShading, setShowShading] = useState(true);
    const [testPointResult, setTestPointResult] = useState(null);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Example constraints with their test points and expected results
    const constraints = [
        { 
            label: "2x + 3y ≤ 12", 
            a: 2, b: 3, c: 12, 
            sign: "≤", 
            testPoint: { x: 0, y: 0 },
            expectedResult: true,
            explanation: "0 ≤ 12 is true → shade origin side"
        },
        { 
            label: "x - 2y ≥ 6", 
            a: 1, b: -2, c: 6, 
            sign: "≥", 
            testPoint: { x: 0, y: 0 },
            expectedResult: false,
            explanation: "0 ≥ 6 is false → shade opposite side"
        },
        { 
            label: "3x + y < 9", 
            a: 3, b: 1, c: 9, 
            sign: "<", 
            testPoint: { x: 0, y: 0 },
            expectedResult: true,
            explanation: "0 < 9 is true → shade origin side (dashed)"
        },
        { 
            label: "x + 2y > 8", 
            a: 1, b: 2, c: 8, 
            sign: ">", 
            testPoint: { x: 0, y: 0 },
            expectedResult: false,
            explanation: "0 > 8 is false → shade opposite side (dashed)"
        },
        { 
            label: "4x - y ≤ 4", 
            a: 4, b: -1, c: 4, 
            sign: "≤", 
            testPoint: { x: 1, y: 0 },
            expectedResult: true,
            explanation: "4 ≤ 4 is true → shade test point side"
        },
    ];

    const current = constraints[selectedConstraint];
    const isSolid = current.sign === "≤" || current.sign === "≥";

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

    // Calculate intercepts for display
    const xInt = current.b !== 0 ? current.c / current.a : null;
    const yInt = current.a !== 0 ? current.c / current.b : null;

    // Determine shading polygon based on inequality sign
    const getShadingPolygon = () => {
        const { a, b, c, sign } = current;
        // For simplicity, we'll create a polygon that covers the feasible side
        // We'll use a large polygon that extends beyond the graph boundaries
        const pts = [];
        const margin = 10;
        
        if (b !== 0) {
            // For sloped or horizontal lines
            const yAtX = (x) => (c - a * x) / b;
            const xAtY = (y) => (c - b * y) / a;
            
            if (sign === "≤" || sign === "<") {
                // Shade below/left side
                if (b > 0) {
                    // Shade below the line
                    pts.push({ px: 20, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    // Find intersection with right edge
                    const yRight = yAtX(4.5);
                    if (yRight >= -4.5 && yRight <= 4.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    // Find intersection with left edge
                    const yLeft = yAtX(-4.5);
                    if (yLeft >= -4.5 && yLeft <= 4.5) {
                        pts.push({ px: 20, py: 200 - yLeft * 40 });
                    }
                } else {
                    // Shade above the line (for negative slope)
                    pts.push({ px: 20, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(4.5);
                    if (yRight >= -4.5 && yRight <= 4.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-4.5);
                    if (yLeft >= -4.5 && yLeft <= 4.5) {
                        pts.push({ px: 20, py: 200 - yLeft * 40 });
                    }
                }
            } else {
                // Shade above/right side
                if (b > 0) {
                    // Shade above the line
                    pts.push({ px: 20, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(4.5);
                    if (yRight >= -4.5 && yRight <= 4.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-4.5);
                    if (yLeft >= -4.5 && yLeft <= 4.5) {
                        pts.push({ px: 20, py: 200 - yLeft * 40 });
                    }
                } else {
                    // Shade below the line (for negative slope)
                    pts.push({ px: 20, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(4.5);
                    if (yRight >= -4.5 && yRight <= 4.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-4.5);
                    if (yLeft >= -4.5 && yLeft <= 4.5) {
                        pts.push({ px: 20, py: 200 - yLeft * 40 });
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            // Vertical line: x = c/a
            const xVal = c / a;
            const px = 200 + xVal * 40;
            if (sign === "≤" || sign === "<") {
                // Shade left side
                pts.push({ px: 20, py: 20 });
                pts.push({ px: px, py: 20 });
                pts.push({ px: px, py: 380 });
                pts.push({ px: 20, py: 380 });
            } else {
                // Shade right side
                pts.push({ px: px, py: 20 });
                pts.push({ px: 380, py: 20 });
                pts.push({ px: 380, py: 380 });
                pts.push({ px: px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            // Horizontal line: y = c/b
            const yVal = c / b;
            const py = 200 - yVal * 40;
            if (sign === "≤" || sign === "<") {
                // Shade below
                pts.push({ px: 20, py: py });
                pts.push({ px: 380, py: py });
                pts.push({ px: 380, py: 380 });
                pts.push({ px: 20, py: 380 });
            } else {
                // Shade above
                pts.push({ px: 20, py: 20 });
                pts.push({ px: 380, py: 20 });
                pts.push({ px: 380, py: py });
                pts.push({ px: 20, py: py });
            }
        }
        
        // Filter points to be within bounds
        return pts.filter(p => p.px >= 20 && p.px <= 380 && p.py >= 20 && p.py <= 380);
    };

    const shadingPolygon = getShadingPolygon();

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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        Topic 7 — Shading
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Shading the <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                            Appropriate Half-Plane
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Master the art of shading the correct side of a constraint line — the final step in
                        graphing individual constraints for linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> 10 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Beginner
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is Shading? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎨</span>
                        What is Shading the Half-Plane?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            <strong className="text-amber-600 dark:text-amber-400">Shading</strong> is the process
                            of visually marking the region of the coordinate plane that satisfies an inequality.
                            It transforms a simple line into a complete representation of the constraint.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Why Shade?</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Shading shows all possible solutions at a glance. It's the visual representation
                                    of the feasible region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50">
                                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">What to Shade?</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Shade the side where the inequality is true. This is determined by the test point.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Key insight:</span> The shaded region represents
                                <strong> all combinations</strong> of x and y that satisfy the constraint. This is
                                the "solution set" of the inequality.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Shade Correctly ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5 dark:hover:shadow-yellow-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        How to Shade the Half-Plane
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Step 1: Test</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Choose a test point not on the line and check if it satisfies the inequality.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50">
                                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Step 2: Decide</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If true → shade test point side.<br />
                                    If false → shade opposite side.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                                <h3 className="font-semibold text-orange-700 dark:text-orange-300">Step 3: Execute</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Lightly shade the entire half-plane using diagonal lines or a soft color.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                <span className="font-semibold">✅ Pro tip:</span> Use light shading or cross-hatching
                                so you can still see the grid and other constraints. In exams, diagonal lines or
                                light pencil shading works best.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Shading Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 dark:hover:shadow-orange-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        See Shading in Action
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a constraint to see the correct shading. Toggle shading on/off to see the
                            contrast between shaded and unshaded regions.
                        </p>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowShading(!showShading)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showShading
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showShading ? "Hide Shading" : "Show Shading"}
                            </button>
                        </div>

                        {/* Constraint selector */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {constraints.map((con, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedConstraint(idx)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 font-mono",
                                        selectedConstraint === idx
                                            ? "bg-amber-600 dark:bg-amber-500 text-white border-amber-600 dark:border-amber-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-amber-400 dark:hover:border-amber-500"
                                    )}
                                >
                                    {con.label}
                                </button>
                            ))}
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Shading explorer">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t7" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t7)" />

                                {/* Shading */}
                                {showShading && shadingPolygon.length > 2 && (
                                    <polygon
                                        points={shadingPolygon.map(p => `${p.px},${p.py}`).join(' ')}
                                        fill="#fbbf24"
                                        fillOpacity="0.25"
                                        stroke="none"
                                        className="dark:fill-amber-400 dark:fill-opacity-20"
                                    />
                                )}

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
                                    <g key={`t7-tick-${v}`}>
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

                                {/* Test point marker */}
                                {(() => {
                                    const { px, py } = toPixel(current.testPoint.x, current.testPoint.y);
                                    const color = current.expectedResult ? "#10b981" : "#ef4444";
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
                                                ({current.testPoint.x}, {current.testPoint.y}) {current.expectedResult ? "✓" : "✗"}
                                            </text>
                                        </g>
                                    );
                                })()}

                                {/* Constraint label */}
                                <text x="20" y="380" fontSize="12" fill="#8b5cf6" className="font-mono font-bold">
                                    {current.label}
                                </text>

                                {/* Legend */}
                                {showShading && (
                                    <g>
                                        <rect x="20" y="50" width="140" height="70" rx="4" fill="white" fillOpacity="0.9" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                        <text x="28" y="68" fontSize="11" fill="#475569" className="dark:fill-slate-400">Shaded region:</text>
                                        <rect x="28" y="76" width="20" height="12" fill="#fbbf24" fillOpacity="0.5" stroke="#e2e8f0" strokeWidth="0.5" />
                                        <text x="54" y="86" fontSize="10" fill="#475569" className="dark:fill-slate-400">Feasible side</text>
                                        <text x="28" y="106" fontSize="10" fill="#475569" className="dark:fill-slate-400">{current.explanation}</text>
                                    </g>
                                )}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className={clsx(
                                "inline-block px-3 py-1 rounded-full mr-2",
                                isSolid
                                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                    : "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                            )}>
                                {isSolid ? "● Solid Line" : "--- Dashed Line"}
                            </span>
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full">
                                {current.expectedResult 
                                    ? `✓ Shading contains (${current.testPoint.x}, ${current.testPoint.y})` 
                                    : `✗ Shading opposite to (${current.testPoint.x}, ${current.testPoint.y})`}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Shading for Different Inequality Types ===== */}
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
                        <span className="text-3xl">📊</span>
                        Shading Patterns by Inequality Type
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">≤ (Less than or equal)</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Solid line</li>
                                    <li>• Shade below/left</li>
                                    <li>• Origin side often shaded</li>
                                    <li>• Example: x + y ≤ 10</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">≥ (Greater than or equal)</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Solid line</li>
                                    <li>• Shade above/right</li>
                                    <li>• Opposite side often shaded</li>
                                    <li>• Example: x + y ≥ 10</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">&lt; (Less than)</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Dashed line</li>
                                    <li>• Shade below/left</li>
                                    <li>• Boundary not included</li>
                                    <li>• Example: x + y &lt; 10</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">&gt; (Greater than)</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Dashed line</li>
                                    <li>• Shade above/right</li>
                                    <li>• Boundary not included</li>
                                    <li>• Example: x + y &gt; 10</li>
                                </ul>
                            </div>
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
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Budget Constraint</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                For <span className="font-mono">2x + 3y ≤ 12</span>, shade below the line. This
                                represents all affordable combinations for <span className="font-medium text-amber-600 dark:text-amber-400">Mamata</span>{" "}
                                when buying two products.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-blue-600 dark:text-blue-400">Minimum Requirement</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                For <span className="font-mono">x + 2y ≥ 8</span>, shade above the line. In{" "}
                                <span className="font-medium text-blue-600 dark:text-blue-400">Barrackpore</span>,
                                this shows all combinations meeting the minimum requirement.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-rose-600 dark:text-rose-400">Strict Time Limit</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                For <span className="font-mono">3x + y &lt; 15</span>, shade below with a dashed line.
                                In <span className="font-medium text-rose-600 dark:text-rose-400">Kolkata</span>,
                                this shows schedules that strictly meet the time limit.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Storage Capacity</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                For <span className="font-mono">x + y ≤ 20</span>, shade below.{" "}
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Susmita</span>{" "}
                                can see all combinations that fit in her storage space.
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
                                <li>Use light shading or cross-hatching for clarity.</li>
                                <li>Always test a point before shading.</li>
                                <li>Label the shaded region as "Feasible" or "Satisfies".</li>
                                <li>Use different shading patterns for multiple constraints.</li>
                                <li>Keep shading light so you can see the grid lines.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Shading the wrong side (misinterpreting test result).</li>
                                <li>Using dark shading that obscures other constraints.</li>
                                <li>Forgetting to shade (leaving the line only).</li>
                                <li>Shading both sides (not deciding which is feasible).</li>
                                <li>Using the wrong line type with shading.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always verify shading with a test point.</li>
                                <li>Use light pencil strokes for exams.</li>
                                <li>Mark the test point and result on the graph.</li>
                                <li>Consistent shading style across all constraints.</li>
                                <li>Double-check the inequality direction.</li>
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
                            <span>I can test a point to determine which side to shade.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know when to shade above vs below a line.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can shade the correct half-plane for any inequality.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand the difference between solid and dashed shading.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can shade multiple constraints on the same graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify my shading with a test point.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Shading the Appropriate Half-Plane – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Shading the Half-Plane – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic7_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Shading is where the visual magic happens in graphical LP. I always tell students: 'The line is the fence, but the shading is the playing field.' A common mistake is shading before testing — always test first! Also, remind students that for multiple constraints, the feasible region is where ALL shadings overlap. In exams, light diagonal shading is best; dark shading can make the graph messy and hard to read."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 7 — Shading the Half-Plane &bull; Completing the constraint graph
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Graphical Representation of Non-Negativity Restrictions (Topic 8)
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

export default Topic7;