import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic13_files/topic13_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic13 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showLabels, setShowLabels] = useState(true);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples with different corner point configurations
    const examples = [
        {
            id: 0,
            name: "Triangle Region",
            description: "3 corner points (minimum for a bounded region)",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", isExtreme: true },
                { x: 10, y: 0, label: "A (10,0)", isExtreme: true },
                { x: 0, y: 10, label: "B (0,10)", isExtreme: true },
            ],
            keyFeature: "Triangle has 3 corner points — the simplest bounded region"
        },
        {
            id: 1,
            name: "Quadrilateral Region",
            description: "4 corner points from intersecting constraints",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", isExtreme: true },
                { x: 5, y: 0, label: "A (5,0)", isExtreme: true },
                { x: 4, y: 3, label: "B (4,3)", isExtreme: true },
                { x: 0, y: 10, label: "C (0,10)", isExtreme: true },
            ],
            keyFeature: "Quadrilateral has 4 corner points — common in production problems"
        },
        {
            id: 2,
            name: "Pentagon Region",
            description: "5 corner points from multiple intersecting constraints",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x + 2y ≤ 12", a: 1, b: 2, c: 12, sign: "≤", color: "#ef4444" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)", isExtreme: true },
                { x: 5, y: 0, label: "A (5,0)", isExtreme: true },
                { x: 4, y: 3, label: "B (4,3)", isExtreme: true },
                { x: 2, y: 4, label: "C (2,4)", isExtreme: true },
                { x: 0, y: 5, label: "D (0,5)", isExtreme: true },
            ],
            keyFeature: "Pentagon has 5 corner points — more complex problem"
        },
        {
            id: 3,
            name: "Unbounded Region",
            description: "2 corner points with region extending to infinity",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 4, label: "A (0,4)", isExtreme: true },
                { x: 4, y: 0, label: "B (4,0)", isExtreme: true },
            ],
            keyFeature: "Unbounded region can still have corner points (2 here)"
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
            for (let x = -0.5; x <= range; x += 0.05) {
                const y = (c - a * x) / b;
                if (y >= -0.5 && y <= range) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -0.5 && xVal <= range) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -0.5 && yVal <= range) {
                const py = 200 - yVal * 40;
                points.push({ px: 20, py });
                points.push({ px: 380, py });
            }
        }
        return points;
    };

    // Determine if a constraint is solid (≥ or ≤)
    const isSolid = (sign) => sign === "≥" || sign === "≤";

    // Get shading polygon for a specific constraint
    const getConstraintShading = (a, b, c, sign) => {
        const pts = [];
        const range = 12;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(range);
                    if (yRight >= -0.5 && yRight <= range) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= range) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                } else {
                    pts.push({ px: 200, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(range);
                    if (yRight >= -0.5 && yRight <= range) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= range) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                }
            } else {
                if (b > 0) {
                    pts.push({ px: 200, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(range);
                    if (yRight >= -0.5 && yRight <= range) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= range) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                } else {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(range);
                    if (yRight >= -0.5 && yRight <= range) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= range) {
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

    // Get feasible region shading
    const getFeasibleRegionShading = () => {
        const pts = currentExample.cornerPoints.map(p => toPixel(p.x, p.y));
        return pts;
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        Topic 13 — Corner Points
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Corner Points and <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent">
                            Extreme Points
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Understand the critical points where constraint lines intersect — the vertices where
                        optimal solutions are always found in linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-violet-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What are Corner Points? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        What are Corner Points and Extreme Points?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            <strong className="text-purple-600 dark:text-purple-400">Corner points</strong> (also
                            called <strong className="text-violet-600 dark:text-violet-400">extreme points</strong>)
                            are the vertices of the feasible region — where two or more constraint lines intersect.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    A point where two or more constraints intersect and form a "corner" of the
                                    feasible region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">Importance</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    By the <strong>Corner-Point Principle</strong>, the optimal solution of any LP
                                    problem occurs at a corner point.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Key insight:</span> The corner-point principle
                                is the foundation of LP. Instead of checking infinitely many points, we only need
                                to evaluate the objective function at the corner points!
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Why Corner Points Matter ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">⭐</span>
                        Why Corner Points Matter
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-purple-600 dark:text-purple-400">Corner-Point Principle</strong>{" "}
                            states that if a linear programming problem has an optimal solution, it will occur at
                            a corner point of the feasible region.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">1. Efficiency</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Only need to check corner points, not every point in the region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">2. Guarantee</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If an optimal solution exists, it's guaranteed to be at a corner.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">3. Simplicity</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Makes LP solvable by evaluating a finite set of points.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Think about:</span> Why can't the optimal
                                solution be in the middle of an edge? Because linear functions change linearly
                                along an edge — the maximum or minimum must be at one of the endpoints!
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Corner Points Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/5 dark:hover:shadow-fuchsia-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Explore Corner Points
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select different examples to see how corner points form at constraint intersections.
                            Each corner point is a candidate for the optimal solution.
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
                                            ? "bg-purple-600 dark:bg-purple-500 text-white border-purple-600 dark:border-purple-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowCornerPoints(!showCornerPoints)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showCornerPoints
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showCornerPoints ? "Hide Corners" : "Show Corners"}
                            </button>
                            <button
                                onClick={() => setShowLabels(!showLabels)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showLabels
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showLabels ? "Hide Labels" : "Show Labels"}
                            </button>
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Corner points explorer">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t13" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t13)" />

                                {/* Shading for all constraints */}
                                {currentExample.constraints.map((con) => {
                                    const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                    if (shading.length > 2) {
                                        return (
                                            <polygon
                                                key={`shade-${con.label}`}
                                                points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                fill={con.color}
                                                fillOpacity="0.08"
                                                stroke="none"
                                            />
                                        );
                                    }
                                    return null;
                                })}

                                {/* Feasible region */}
                                {(() => {
                                    const pts = getFeasibleRegionShading();
                                    if (pts.length > 2) {
                                        return (
                                            <polygon
                                                points={pts.map(p => `${p.px},${p.py}`).join(' ')}
                                                fill="#8b5cf6"
                                                fillOpacity="0.15"
                                                stroke="none"
                                            />
                                        );
                                    }
                                    return null;
                                })()}

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
                                    if (val >= 0 && val <= 12) {
                                        return (
                                            <g key={`t13-tick-${v}`}>
                                                <line x1={v} y1="195" x2={v} y2="205" stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                <line x1="195" y1={v} x2="205" y2={v} stroke="#1e293b" strokeWidth="1.2" className="dark:stroke-slate-300" />
                                                {v >= 40 && v <= 360 && val !== 0 && val <= 10 && (
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
                                                strokeWidth="2.5"
                                                strokeDasharray={solid ? "none" : "8,6"}
                                                opacity="0.7"
                                            />
                                        );
                                    }
                                    return null;
                                })}

                                {/* Corner points */}
                                {showCornerPoints && currentExample.cornerPoints.map((cp, idx) => {
                                    const { px, py } = toPixel(cp.x, cp.y);
                                    return (
                                        <g key={`cp-${idx}`}>
                                            {/* Glow effect */}
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r="12"
                                                fill="#f59e0b"
                                                fillOpacity="0.15"
                                                className="animate-[pulse_2s_ease-in-out_infinite]"
                                            />
                                            {/* Main point */}
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r="8"
                                                fill="#f59e0b"
                                                stroke="#fff"
                                                strokeWidth="2.5"
                                                className=""
                                            />
                                            {showLabels && (
                                                <>
                                                    <text
                                                        x={px + 12}
                                                        y={py - 10}
                                                        fontSize="11"
                                                        fill="#f59e0b"
                                                        className="font-mono font-bold"
                                                    >
                                                        {cp.label}
                                                    </text>
                                                    <text
                                                        x={px + 12}
                                                        y={py + 6}
                                                        fontSize="9"
                                                        fill="#94a3b8"
                                                        className="font-mono"
                                                    >
                                                        {cp.isExtreme ? "★ Extreme" : ""}
                                                    </text>
                                                </>
                                            )}
                                        </g>
                                    );
                                })}

                                {/* Legend */}
                                <rect x="20" y="20" width="200" height="100" rx="4" fill="white" fillOpacity="0.92" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                <text x="28" y="38" fontSize="11" fill="#475569" className="dark:fill-slate-400 font-medium">
                                    {currentExample.name}
                                </text>
                                <text x="28" y="54" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.description}
                                </text>
                                <text x="28" y="70" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.cornerPoints.length} corner points
                                </text>
                                <text x="28" y="86" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.keyFeature}
                                </text>
                                {showCornerPoints && (
                                    <rect x="170" y="22" width="12" height="12" fill="#f59e0b" rx="2" />
                                )}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full mr-2">
                                {currentExample.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full">
                                {showCornerPoints ? "✓ Showing corners" : "Corners hidden"}
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full ml-2">
                                {currentExample.constraints.length} constraints
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: How to Find Corner Points ===== */}
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
                        <span className="text-3xl">✏️</span>
                        How to Find Corner Points
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Step 1: Graph</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plot all constraints and identify the feasible region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">Step 2: Identify</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Look for the "corners" where constraint lines intersect.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800/50">
                                <h3 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Step 3: Verify</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Check that the point satisfies all constraints.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Pro tip:</span> In a bounded region, the number
                                of corner points equals the number of constraints that form the boundary. Each
                                corner point is the intersection of two constraint lines (or one constraint and
                                an axis for points on axes).
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: Real-World Examples ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
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
                            <div className="font-semibold text-purple-600 dark:text-purple-400">Production Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-purple-600 dark:text-purple-400">Ichapur</span>{" "}
                                has 5 constraints. The corner points represent production combinations where
                                resources are fully utilized. The optimal profit is always at one of these corners.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-violet-600 dark:text-violet-400">Resource Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-violet-600 dark:text-violet-400">Kolkata</span>,
                                a project manager allocates resources. Each corner point represents a different
                                allocation strategy where resources are just enough or just too much.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Investment Portfolio</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-emerald-600 dark:text-emerald-400">Jadavpur</span>{" "}
                                has constraints on risk, return, and liquidity. The corner points represent
                                portfolio allocations that maximize return for a given risk level.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-amber-600 dark:text-amber-400">Mamata</span>{" "}
                                plans her diet with constraints on calories, protein, and cost. Corner points
                                represent meal combinations that are just meeting requirements.
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
                                <li>Every corner point is the intersection of two constraint lines.</li>
                                <li>In bounded regions, all corner points are feasible.</li>
                                <li>Check corner points on the axes (where non-negativity binds).</li>
                                <li>The optimal solution is always at a corner point.</li>
                                <li>Use the corner-point principle to reduce the search space.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Missing corner points on the axes.</li>
                                <li>Assuming interior points can be optimal.</li>
                                <li>Not verifying if a corner point is feasible.</li>
                                <li>Counting points that aren't actually corners.</li>
                                <li>Forgetting that unbounded regions may have corner points too.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Always identify all corner points of the feasible region.</li>
                                <li>Verify each corner point satisfies all constraints.</li>
                                <li>Check points where two or more constraints intersect.</li>
                                <li>Include origin and axis intercepts.</li>
                                <li>Use the corner-point principle to justify your solution.</li>
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
                            <span>I can identify corner points on a graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that corner points are constraint intersections.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know the corner-point principle.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify if a corner point is feasible.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand why optimal solutions occur at corner points.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find corner points for both bounded and unbounded regions.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Corner Points and Extreme Points – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Corner Points and Extreme Points – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic13_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "The corner-point principle is the most important concept in LP. I tell my students: 'If you understand corner points, you understand LP.' The key insight is that linear functions change linearly along edges, so the maximum or minimum must be at a corner. I recommend having students draw a feasible region and try to find a point that's better than all corners — they'll quickly realize it's impossible. This builds deep intuition about why the simplex method works."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 13 — Corner Points and Extreme Points &bull; The vertices of the feasible region
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Finding Corner Points from the Graph (Topic 14)
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

export default Topic13;