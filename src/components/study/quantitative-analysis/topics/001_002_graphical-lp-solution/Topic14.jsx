import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic14_files/topic14_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic14 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [selectedExample, setSelectedExample] = useState(0);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showCoordinates, setShowCoordinates] = useState(true);
    const [hoveredPoint, setHoveredPoint] = useState(null);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Examples with detailed corner point information
    const examples = [
        {
            id: 0,
            name: "Production Planning",
            description: "Find corner points from machine and labor constraints",
            constraints: [
                { label: "2x + 3y ≤ 12", a: 2, b: 3, c: 12, sign: "≤", color: "#8b5cf6" },
                { label: "x + 2y ≤ 8", a: 1, b: 2, c: 8, sign: "≤", color: "#f59e0b" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O", description: "Origin - no production" },
                { x: 4, y: 0, label: "A", description: "Max x with y=0" },
                { x: 2, y: 2, label: "B", description: "Intersection of both constraints" },
                { x: 0, y: 4, label: "C", description: "Max y with x=0" },
            ],
            instructions: "Look where the lines intersect. The corner points are at (0,0), (4,0), (2,2), and (0,4)."
        },
        {
            id: 1,
            name: "Resource Allocation",
            description: "Multiple constraints creating a pentagon",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "2x + y ≤ 14", a: 2, b: 1, c: 14, sign: "≤", color: "#f59e0b" },
                { label: "x + 2y ≤ 12", a: 1, b: 2, c: 12, sign: "≤", color: "#ef4444" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O", description: "Origin" },
                { x: 5, y: 0, label: "A", description: "x-axis from 2x+y=14" },
                { x: 4, y: 3, label: "B", description: "Intersection of x+y=10 and 2x+y=14" },
                { x: 2, y: 4, label: "C", description: "Intersection of x+y=10 and x+2y=12" },
                { x: 0, y: 5, label: "D", description: "y-axis from x+2y=12" },
            ],
            instructions: "5 corner points form a pentagon. Each is where two constraints intersect."
        },
        {
            id: 2,
            name: "Triangle Region",
            description: "Simple 3-corner region",
            constraints: [
                { label: "x + y ≤ 10", a: 1, b: 1, c: 10, sign: "≤", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 0, label: "O", description: "Origin" },
                { x: 10, y: 0, label: "A", description: "x-intercept of x+y=10" },
                { x: 0, y: 10, label: "B", description: "y-intercept of x+y=10" },
            ],
            instructions: "Triangle with 3 corner points. Each is on an axis or at the origin."
        },
        {
            id: 3,
            name: "Unbounded Region",
            description: "Region with minimum requirement",
            constraints: [
                { label: "x + y ≥ 4", a: 1, b: 1, c: 4, sign: "≥", color: "#8b5cf6" },
                { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
                { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
            ],
            cornerPoints: [
                { x: 0, y: 4, label: "A", description: "y-intercept of x+y=4" },
                { x: 4, y: 0, label: "B", description: "x-intercept of x+y=4" },
            ],
            instructions: "Only 2 corner points! Region extends infinitely in the direction of increasing x and y."
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
        <>
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
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                        Topic 14 — Graphical Corner Points
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Finding Corner Points <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                            from the Graph
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn to visually identify corner points on a graph — the critical first step in finding
                        the optimal solution to any LP problem.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-pink-500"></span> 10 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Why Find Corner Points Graphically? ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        Why Find Corner Points Graphically?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            Finding corner points graphically is the <strong>most intuitive way</strong> to
                            identify the vertices of the feasible region. By simply looking at the graph, you can
                            see exactly where constraints intersect.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800/50">
                                <h3 className="font-semibold text-pink-700 dark:text-pink-300">Visual</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    See the corners directly on the graph — no algebra needed.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">Fast</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Quick identification without solving equations.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Check</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Verify algebraic solutions by matching them to the graph.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Observe carefully:</span> Look for the "sharp"
                                points where the feasible region changes direction. These are your corner points.
                                Each corner is where two constraint lines meet.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Step-by-Step Guide ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/5 dark:hover:shadow-rose-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📖</span>
                        Step-by-Step: Finding Corner Points Graphically
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800/50">
                                <h3 className="font-semibold text-pink-700 dark:text-pink-300">Step 1: Plot</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Graph all constraints and shade the feasible region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">Step 2: Locate</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Find the "corners" where the boundary of the feasible region changes direction.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 3: Read</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Read the coordinates of each corner point from the graph.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Step 4: List</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    List all corner points with their coordinates. These are your candidates.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Try changing this:</span> As you look at the
                                graph, trace the boundary of the feasible region. Every time the boundary turns,
                                you've found a corner point. This works for both bounded and unbounded regions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Corner Point Finder ===== */}
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
                        Interactive Corner Point Finder
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Select an example and hover over the corner points to see their coordinates and
                            descriptions. Watch how the corners form at constraint intersections.
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
                                            ? "bg-pink-600 dark:bg-pink-500 text-white border-pink-600 dark:border-pink-500 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-pink-400 dark:hover:border-pink-500"
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
                                onClick={() => setShowCoordinates(!showCoordinates)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showCoordinates
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showCoordinates ? "Hide Coordinates" : "Show Coordinates"}
                            </button>
                        </div>

                        {/* Instructions */}
                        <div className="mb-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                            <p className="text-sm text-purple-800 dark:text-purple-300">
                                {currentExample.instructions}
                            </p>
                        </div>

                        {/* SVG Graph */}
                        <div className="w-full max-w-md mx-auto aspect-square bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                            <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Corner point finder">
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid_t14" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid_t14)" />

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
                                                fill="#ec4899"
                                                fillOpacity="0.12"
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
                                            <g key={`t14-tick-${v}`}>
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
                                    const isHovered = hoveredPoint === idx;
                                    return (
                                        <g
                                            key={`cp-${idx}`}
                                            onMouseEnter={() => setHoveredPoint(idx)}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                            className="cursor-pointer transition-all duration-300"
                                        >
                                            {/* Glow effect */}
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r={isHovered ? 20 : 14}
                                                fill="#f59e0b"
                                                fillOpacity={isHovered ? 0.25 : 0.1}
                                                className="transition-all duration-300"
                                            />
                                            {/* Main point */}
                                            <circle
                                                cx={px}
                                                cy={py}
                                                r={isHovered ? 10 : 7}
                                                fill="#f59e0b"
                                                stroke="#fff"
                                                strokeWidth={isHovered ? 3 : 2}
                                                className="transition-all duration-300"
                                            />
                                            {/* Label */}
                                            <text
                                                x={px + 14}
                                                y={py - 12}
                                                fontSize={isHovered ? 14 : 11}
                                                fill={isHovered ? "#f59e0b" : "#94a3b8"}
                                                className="font-bold transition-all duration-300"
                                            >
                                                {cp.label}
                                            </text>
                                            {/* Coordinates */}
                                            {showCoordinates && (
                                                <text
                                                    x={px + 14}
                                                    y={py + 4}
                                                    fontSize={isHovered ? 12 : 9}
                                                    fill={isHovered ? "#f59e0b" : "#94a3b8"}
                                                    className="font-mono transition-all duration-300"
                                                >
                                                    ({cp.x}, {cp.y})
                                                </text>
                                            )}
                                            {/* Description on hover */}
                                            {isHovered && (
                                                <g>
                                                    <rect
                                                        x={px + 14}
                                                        y={py + 16}
                                                        width="140"
                                                        height="20"
                                                        rx="4"
                                                        fill="#1e293b"
                                                        fillOpacity="0.9"
                                                    />
                                                    <text
                                                        x={px + 20}
                                                        y={py + 30}
                                                        fontSize="9"
                                                        fill="#f8fafc"
                                                        className="font-medium"
                                                    >
                                                        {cp.description}
                                                    </text>
                                                </g>
                                            )}
                                        </g>
                                    );
                                })}

                                {/* Legend */}
                                <rect x="20" y="20" width="200" height="80" rx="4" fill="white" fillOpacity="0.92" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
                                <text x="28" y="38" fontSize="11" fill="#475569" className="dark:fill-slate-400 font-medium">
                                    {currentExample.name}
                                </text>
                                <text x="28" y="54" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.cornerPoints.length} corner points found
                                </text>
                                <text x="28" y="70" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                                    {currentExample.description}
                                </text>
                                {showCornerPoints && (
                                    <rect x="170" y="22" width="12" height="12" fill="#f59e0b" rx="2" />
                                )}
                                {hoveredPoint !== null && (
                                    <div>
                                    <rect x="20" y="100" width="200" height="20" rx="4" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1" />
                                    <text x="28" y="113" fontSize="9" fill="#f59e0b" className="font-medium">
                                        Hovering: {currentExample.cornerPoints[hoveredPoint].label} ({currentExample.cornerPoints[hoveredPoint].x}, {currentExample.cornerPoints[hoveredPoint].y})
                                    </text>
                                    </div>
                                )}
                            </svg>
                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 rounded-full mr-2">
                                {currentExample.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full">
                                Hover over points for details
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full ml-2">
                                {currentExample.constraints.length} constraints
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Tips for Reading Corner Points ===== */}
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
                        <span className="text-3xl">💡</span>
                        Tips for Reading Corner Points from a Graph
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Look for Changes in Direction</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Every time the boundary of the feasible region changes direction, you've found a corner point.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Check the Axes</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Don't forget corner points on the x-axis and y-axis (where non-negativity binds).
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Count the Constraints</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Each corner point is where two constraints intersect. Count them to verify.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">Use Grid Lines</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Use the grid to accurately read the coordinates of each corner point.
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
                            <div className="font-semibold text-pink-600 dark:text-pink-400">Factory Production</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-pink-600 dark:text-pink-400">Ichapur</span>,
                                a factory manager looks at the graph of production constraints. The corner points
                                (0,0), (4,0), (2,2), (0,4) represent different production mixes where resources
                                are fully utilized.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-rose-600 dark:text-rose-400">Resource Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-rose-600 dark:text-rose-400">Kolkata</span>,
                                a project manager finds 5 corner points representing different resource allocation
                                strategies. Each corner is a candidate for the optimal plan.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">Mamata</span>{" "}
                                looks at her diet constraints. The corner points on the graph show meal combinations
                                that exactly meet her nutritional requirements.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Investment Portfolio</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                An investor in <span className="font-medium text-amber-600 dark:text-amber-400">Jadavpur</span>{" "}
                                identifies corner points on the graph. Each point represents a portfolio allocation
                                that maximizes return for a given risk level.
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
                                <li>Look for "sharp" corners where the boundary changes direction.</li>
                                <li>Always check points on the axes (non-negativity).</li>
                                <li>Use grid lines to read coordinates accurately.</li>
                                <li>Each corner is where two constraints intersect.</li>
                                <li>Draw a circle around the region to help find corners.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Missing corner points on the axes.</li>
                                <li>Counting points that aren't actually corners.</li>
                                <li>Misreading coordinates from the graph.</li>
                                <li>Forgetting to check if a point is feasible.</li>
                                <li>Not including all constraints when finding corners.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Draw the feasible region clearly.</li>
                                <li>Label all corner points with coordinates.</li>
                                <li>Verify corner points satisfy all constraints.</li>
                                <li>Use the graph to double-check algebraic solutions.</li>
                                <li>Work systematically around the boundary.</li>
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
                            <span>I know that corners are where constraints intersect.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can read coordinates from the graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I remember to check points on the axes.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify if a point is a valid corner.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can list all corner points of a feasible region.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Finding Corner Points from the Graph – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Finding Corner Points from the Graph – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic14_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "Finding corner points graphically is a skill that improves with practice. I tell my students: 'Trace the boundary of the feasible region with your finger. Every time your finger changes direction, you've found a corner.' This kinesthetic approach helps students internalize the concept. Also emphasize that the corner points on axes are often overlooked — remind them to check where constraints meet the x-axis and y-axis."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 14 — Finding Corner Points from the Graph &bull; Visual identification of vertices
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Finding Corner Points Algebraically (Topic 15)
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
        </>
    );
};

export default Topic14;