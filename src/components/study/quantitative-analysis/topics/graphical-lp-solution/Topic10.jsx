import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic10 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showFeasibleRegion, setShowFeasibleRegion] = useState(true);
    const [showCornerPoints, setShowCornerPoints] = useState(false);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Example problems with multiple constraints
    const examples = [
        {
            id: 0,
            name: "Product Mix Problem",
            description: "A factory produces two products with machine and labor constraints.",
            constraints: [
                { label: "2x + 3y ≤ 12", a: 2, b: 3, c: 12, sign: "≤", color: "#8b5cf6" },
                { label: "x + 2y ≤ 8", a: 1, b: 2, c: 8, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            feasibleRegion: "The quadrilateral with vertices at (0,0), (4,0), (2,2), (0,4)",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)" },
                { x: 4, y: 0, label: "A (4,0)" },
                { x: 2, y: 2, label: "B (2,2)" },
                { x: 0, y: 4, label: "C (0,4)" },
            ]
        },
        {
            id: 1,
            name: "Resource Allocation",
            description: "Two resources must be allocated subject to budget and time constraints.",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x + 2y ≤ 12", a: 1, b: 2, c: 12, sign: "≤", color: "#ef4444" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            feasibleRegion: "The pentagon with vertices at (0,0), (5,0), (4,3), (2,4), (0,5)",
            cornerPoints: [
                { x: 0, y: 0, label: "O (0,0)" },
                { x: 5, y: 0, label: "A (5,0)" },
                { x: 4, y: 3, label: "B (4,3)" },
                { x: 2, y: 4, label: "C (2,4)" },
                { x: 0, y: 5, label: "D (0,5)" },
            ]
        },
        {
            id: 2,
            name: "Minimum Requirements",
            description: "Production must meet minimum requirements with limited resources.",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "2x + y ≤ 10", a: 2, b: 1, c: 10, sign: "≤", color: "#f59e0b" },
                { label: "x + 2y ≤ 10", a: 1, b: 2, c: 10, sign: "≤", color: "#ef4444" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            feasibleRegion: "The quadrilateral with vertices at (2,2), (4,0), (5,0), (0,5)",
            cornerPoints: [
                { x: 2, y: 2, label: "A (2,2)" },
                { x: 4, y: 0, label: "B (4,0)" },
                { x: 5, y: 0, label: "C (5,0)" },
                { x: 0, y: 5, label: "D (0,5)" },
            ]
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
        if (b !== 0 && a !== 0) {
            for (let x = -0.5; x <= 6.5; x += 0.05) {
                const y = (c - a * x) / b;
                if (y >= -0.5 && y <= 6.5) {
                    points.push(toPixel(x, y));
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            if (xVal >= -0.5 && xVal <= 6.5) {
                const px = 200 + xVal * 40;
                points.push({ px, py: 20 });
                points.push({ px, py: 380 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            if (yVal >= -0.5 && yVal <= 6.5) {
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
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(5.5);
                    if (yRight >= -0.5 && yRight <= 6.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= 6.5) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                } else {
                    pts.push({ px: 200, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(5.5);
                    if (yRight >= -0.5 && yRight <= 6.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= 6.5) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                }
            } else {
                if (b > 0) {
                    pts.push({ px: 200, py: 20 });
                    pts.push({ px: 380, py: 20 });
                    const yRight = yAtX(5.5);
                    if (yRight >= -0.5 && yRight <= 6.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= 6.5) {
                        pts.push({ px: 200, py: 200 - yLeft * 40 });
                    }
                } else {
                    pts.push({ px: 200, py: 380 });
                    pts.push({ px: 380, py: 380 });
                    const yRight = yAtX(5.5);
                    if (yRight >= -0.5 && yRight <= 6.5) {
                        pts.push({ px: 380, py: 200 - yRight * 40 });
                    }
                    const yLeft = yAtX(-0.5);
                    if (yLeft >= -0.5 && yLeft <= 6.5) {
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

    // Get feasible region shading (intersection of all constraints)
    // For display, we'll use the intersection polygon
    const getFeasibleRegionShading = () => {
        // Simplified: use the corner points to draw the polygon
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                        Topic 10 — Feasible Region
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Finding the <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            Common Feasible Region
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn to identify the intersection of all constraints — the region where every rule is
                        satisfied simultaneously.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: What is the Common Feasible Region? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        What is the Common Feasible Region?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            The <strong className="text-teal-600 dark:text-teal-400">common feasible region</strong>{" "}
                            (or simply <strong className="text-cyan-600 dark:text-cyan-400">feasible region</strong>)
                            is the set of all points that satisfy <strong>every constraint</strong> in a linear
                            programming problem simultaneously.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">Definition</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The intersection of all constraint half-planes.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">Visual</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The overlapping shaded area on the graph.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Purpose</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Contains all possible solutions to the LP problem.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Real-world analogy:</span> Think of a student
                                like <span className="font-medium text-blue-600 dark:text-blue-400">Abhronila</span>{" "}
                                trying to schedule her week. The feasible region is the set of schedules that
                                satisfy ALL her constraints: study time, sleep, work, and social commitments.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Find the Common Feasible Region ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        How to Find the Common Feasible Region
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50">
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">Step 1: Plot all constraints</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Graph each constraint individually on the same coordinate plane.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
                                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">Step 2: Shade each constraint</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Shade the feasible side of each constraint using light shading.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 3: Identify the overlap</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The common feasible region is where all shaded areas overlap.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Step 4: Find corner points</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Identify the vertices (corners) of the feasible region.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                            <p className="text-sm text-purple-800 dark:text-purple-300">
                                <span className="font-semibold">💡 Pro tip:</span> The feasible region is typically
                                a <strong>convex polygon</strong>. Its corners (vertices) are the key points where
                                optimal solutions occur.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Feasible Region Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Explore the Common Feasible Region
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select a problem to see its constraints and the common feasible region highlighted.
                            Toggle corner points to see the vertices where optimal solutions are found.
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
                                            ? "bg-teal-600 dark:bg-teal-500 text-white border-teal-600 dark:border-teal-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500"
                                    )}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowFeasibleRegion(!showFeasibleRegion)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showFeasibleRegion
                                        ? "bg-teal-600 text-white border-teal-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showFeasibleRegion ? "Hide Feasible Region" : "Show Feasible Region"}
                            </button>
                            <button
                                onClick={() => setShowCornerPoints(!showCornerPoints)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showCornerPoints
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showCornerPoints ? "Hide Corner Points" : "Show Corner Points"}
                            </button>
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Feasible region explorer">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t10" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t10)" />

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

                                {/* Feasible region (highlighted overlap) */}
                                {showFeasibleRegion && (
                                    (() => {
                                        const pts = getFeasibleRegionShading();
                                        if (pts.length > 2) {
                                            return (
                                                <polygon
                                                    points={pts.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="#14b8a6"
                                                    fillOpacity="0.3"
                                                    stroke="#14b8a6"
                                                    strokeWidth="2"
                                                    strokeDasharray="4,4"
                                                />
                                            );
                                        }
                                        return null;
                                    })()
                                )}

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
                                    if (val >= 0 && val <= 5.5) {
                                        return (
                                            <g key={`t10-tick-${v}`}>
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
                                                opacity="0.8"
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
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r="7"
                                                fill="#f59e0b"
                                                stroke="#fff"
                                                strokeWidth="2"
                                                className="animate-[pulse_1.5s_ease-in-out_infinite]"
                                            />
                                            <text
                                                x={px + 10}
                                                y={py - 10}
                                                fontSize="11"
                                                fill="#f59e0b"
                                                className="font-mono font-bold"
                                            >
                                                {cp.label}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Legend */}
                                <rect x="20" y="20" width="170" height="80" rx="4" fill="white" fillOpacity="0.9" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                <text x="28" y="38" fontSize="11" fill="#475569" className="dark:fill-slate-400 font-medium">
                                    {currentExample.name}
                                </text>
                                <text x="28" y="54" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.description}
                                </text>
                                {showFeasibleRegion && (
                                    <text x="28" y="70" fontSize="9" fill="#14b8a6" className="font-medium">
                                        Feasible Region: {currentExample.feasibleRegion}
                                    </text>
                                )}
                                {!showFeasibleRegion && (
                                    <text x="28" y="70" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">
                                        Click "Show Feasible Region" to see overlap
                                    </text>
                                )}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full mr-2">
                                {currentExample.constraints.length} constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full">
                                {currentExample.cornerPoints.length} corner points
                            </span>
                            {showFeasibleRegion && (
                                <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full ml-2">
                                    ✓ Feasible region visible
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Properties of the Feasible Region ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📐</span>
                        Properties of the Feasible Region
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">✓ Convex</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The feasible region is always convex. A line segment between any two points
                                    in the region stays within the region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">✓ Polygonal</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The feasible region is a polygon (bounded or unbounded) with straight edges.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">✓ Empty possible</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    If constraints conflict, the feasible region is empty (infeasible problem).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">✓ Corner points exist</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The corners (vertices) are where constraint lines intersect. Optimal solutions
                                    occur at these points.
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
                            <div className="font-semibold text-teal-600 dark:text-teal-400">Manufacturing</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-teal-600 dark:text-teal-400">Ichapur</span>{" "}
                                produces two products with constraints on machine hours, labor, and materials.
                                The feasible region shows all production combinations that are possible.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-cyan-600 dark:text-cyan-400">Investment Portfolio</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-cyan-600 dark:text-cyan-400">Kolkata</span>,
                                an investor allocates money between stocks and bonds with constraints on risk,
                                return, and liquidity. The feasible region shows all valid portfolios.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Mamata</span>{" "}
                                plans her meals with constraints on calories, protein, carbs, and cost. The
                                feasible region shows all meal combinations meeting her nutritional goals.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Time Management</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A student in <span className="font-medium text-amber-600 dark:text-amber-400">Jadavpur</span>{" "}
                                allocates time between study, sleep, work, and social activities. The feasible
                                region shows all weekly schedules that work.
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
                                <li>The feasible region is always the overlap of all constraints.</li>
                                <li>Corner points are where optimal solutions are found.</li>
                                <li>Use different colors to distinguish constraints.</li>
                                <li>Light shading helps see the overlap clearly.</li>
                                <li>Always include non-negativity constraints.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Forgetting to include all constraints.</li>
                                <li>Misidentifying the overlap (shading the wrong area).</li>
                                <li>Not checking if the feasible region is empty.</li>
                                <li>Ignoring corner points on the axes.</li>
                                <li>Using inconsistent shading directions.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>List all constraints before graphing.</li>
                                <li>Plot non-negativity first.</li>
                                <li>Use light shading for each constraint.</li>
                                <li>Label the feasible region clearly.</li>
                                <li>Identify and label all corner points.</li>
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
                            <span>I can plot all constraints on the same graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify the overlapping feasible region.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the corner points of the feasible region.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I understand that the feasible region is convex.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify if a point is in the feasible region.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know that optimal solutions occur at corner points.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Finding the Common Feasible Region – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Common Feasible Region – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic10_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "The feasible region is where all the pieces come together. I tell my students: 'The feasible region is the answer space — any point in it is a valid solution. But the BEST solution is always at a corner.' Emphasize that the feasible region is convex and polygonal. A great classroom exercise is to have students draw a feasible region and then try to find a point inside it that would be better than all corner points — they'll discover it can't be done, which proves the corner-point principle."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 10 — Common Feasible Region &bull; The intersection of all constraints
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: The Feasible Region (Topic 11) — In-depth exploration
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

export default Topic10;