import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic9 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [showAllConstraints, setShowAllConstraints] = useState(true);
    const [selectedConstraint, setSelectedConstraint] = useState(null);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Multiple constraints for a production problem
    const constraints = [
        {
            id: 0,
            label: "2x + 3y ≤ 12",
            a: 2, b: 3, c: 12,
            sign: "≤",
            color: "#8b5cf6",
            description: "Machine time constraint"
        },
        {
            id: 1,
            label: "x + 2y ≤ 8",
            a: 1, b: 2, c: 8,
            sign: "≤",
            color: "#f59e0b",
            description: "Labor constraint"
        },
        {
            id: 2,
            label: "x ≥ 0",
            a: 1, b: 0, c: 0,
            sign: "≥",
            color: "#10b981",
            description: "Non-negativity (x)"
        },
        {
            id: 3,
            label: "y ≥ 0",
            a: 0, b: 1, c: 0,
            sign: "≥",
            color: "#10b981",
            description: "Non-negativity (y)"
        },
        {
            id: 4,
            label: "x + y ≥ 4",
            a: 1, b: 1, c: 4,
            sign: "≥",
            color: "#ef4444",
            description: "Minimum production requirement"
        },
    ];

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

    // Get the feasible region (intersection of all constraints)
    // For display, we'll use a simpler approach: overlay all shadings
    // The actual feasible region is the overlap of all shaded areas

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

    const toggleConstraint = (id) => {
        if (selectedConstraint === id) {
            setSelectedConstraint(null);
        } else {
            setSelectedConstraint(id);
        }
    };

    // ============================================================
    // ADVANCED GRAPH HELPERS
    // ============================================================

    const GRAPH = {
        width: 400,
        height: 400,
        originX: 200,
        originY: 200,
        scale: 40,
        padding: 20,
    };

    // Convert mathematical coordinates → SVG coordinates
    const toSvg = (x, y) => ({
        px: GRAPH.originX + x * GRAPH.scale,
        py: GRAPH.originY - y * GRAPH.scale,
    });

    // Check whether a point satisfies a constraint
    const satisfiesConstraint = (x, y, con, tolerance = 0.0001) => {
        const value = con.a * x + con.b * y;

        switch (con.sign) {
            case "<=":
            case "≤":
                return value <= con.c + tolerance;

            case ">=":
            case "≥":
                return value >= con.c - tolerance;

            case "=":
            case "==":
                return Math.abs(value - con.c) <= tolerance;

            default:
                return true;
        }
    };

    // Find intersection of two constraint lines
    const getIntersection = (c1, c2) => {
        const determinant =
            c1.a * c2.b -
            c2.a * c1.b;

        if (Math.abs(determinant) < 0.000001) {
            return null;
        }

        const x =
            (c1.c * c2.b - c2.c * c1.b) /
            determinant;

        const y =
            (c1.a * c2.c - c2.a * c1.c) /
            determinant;

        return { x, y };
    };

    // Find feasible vertices
    const getFeasibleVertices = () => {
        const candidates = [];

        // Origin
        candidates.push({
            x: 0,
            y: 0,
            source: "Origin",
        });

        // Constraint/constraint intersections
        for (let i = 0; i < constraints.length; i++) {
            for (let j = i + 1; j < constraints.length; j++) {

                const point = getIntersection(
                    constraints[i],
                    constraints[j]
                );

                if (!point) continue;

                if (point.x < -0.0001 || point.y < -0.0001) {
                    continue;
                }

                const feasible = constraints.every(con =>
                    satisfiesConstraint(
                        point.x,
                        point.y,
                        con
                    )
                );

                if (feasible) {
                    candidates.push({
                        ...point,
                        source: `${constraints[i].id}-${constraints[j].id}`,
                    });
                }
            }
        }

        // Intersections with X-axis
        constraints.forEach(con => {
            if (Math.abs(con.a) > 0.000001) {

                const x = con.c / con.a;
                const y = 0;

                if (x >= 0) {
                    const feasible = constraints.every(c =>
                        satisfiesConstraint(x, y, c)
                    );

                    if (feasible) {
                        candidates.push({
                            x,
                            y,
                            source: `${con.id}-x-axis`,
                        });
                    }
                }
            }
        });

        // Intersections with Y-axis
        constraints.forEach(con => {
            if (Math.abs(con.b) > 0.000001) {

                const x = 0;
                const y = con.c / con.b;

                if (y >= 0) {
                    const feasible = constraints.every(c =>
                        satisfiesConstraint(x, y, c)
                    );

                    if (feasible) {
                        candidates.push({
                            x,
                            y,
                            source: `${con.id}-y-axis`,
                        });
                    }
                }
            }
        });

        // Remove duplicates
        const unique = [];

        candidates.forEach(point => {
            const exists = unique.some(
                p =>
                    Math.abs(p.x - point.x) < 0.001 &&
                    Math.abs(p.y - point.y) < 0.001
            );

            if (!exists) {
                unique.push(point);
            }
        });

        // Sort vertices around centroid
        if (unique.length > 2) {
            const center = unique.reduce(
                (acc, p) => ({
                    x: acc.x + p.x,
                    y: acc.y + p.y,
                }),
                { x: 0, y: 0 }
            );

            center.x /= unique.length;
            center.y /= unique.length;

            unique.sort(
                (a, b) =>
                    Math.atan2(
                        a.y - center.y,
                        a.x - center.x
                    ) -
                    Math.atan2(
                        b.y - center.y,
                        b.x - center.x
                    )
            );
        }

        return unique;
    };

    const feasibleVertices = getFeasibleVertices();

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
                        Topic 9 — Multiple Constraints
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Plotting Multiple Constraints <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            on the Same Graph
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to combine all constraints on one coordinate plane — the essential step toward
                        finding the feasible region in linear programming.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> 12 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Intermediate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Why Plot Multiple Constraints? ===== */}
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
                        Why Plot Multiple Constraints?
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            In real-world LP problems, there are <strong>never just one constraint</strong>.
                            You'll have multiple limitations — resources, budgets, time, minimum requirements —
                            all acting simultaneously.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Challenge</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    How do you find solutions that satisfy <strong>all</strong> constraints at once?
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Solution</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plot <strong>all</strong> constraints on the same graph and find the overlapping region.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <span className="font-semibold">💡 Real-world analogy:</span> Imagine a student
                                like <span className="font-medium text-blue-600 dark:text-blue-400">Mahima</span>{" "}
                                planning her week. She has multiple constraints: study hours (≥ 20), social time
                                (≥ 5), sleep (≥ 7 per night). All must be satisfied simultaneously.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: How to Plot Multiple Constraints ===== */}
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
                        <span className="text-3xl">✏️</span>
                        Step-by-Step: Plotting Multiple Constraints
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Step 1: List all constraints</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Write down every constraint in the problem, including non-negativity.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Step 2: Plot each constraint</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    For each constraint: find intercepts, decide line type, and shade.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50">
                                <h3 className="font-semibold text-violet-700 dark:text-violet-300">Step 3: Use different colors</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Use distinct colors or patterns for each constraint to avoid confusion.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Step 4: Find the overlap</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    The feasible region is where <strong>all</strong> shaded areas overlap.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">💡 Pro tip:</span> When plotting multiple constraints,
                                use light shading so you can see the overlaps. Heavy shading makes it hard to see
                                the feasible region.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Interactive Multiple Constraints Explorer ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">🖱️</span>
                        Explore Multiple Constraints
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Click on a constraint to highlight it. Toggle all constraints on/off to see each one individually.
                            The feasible region is where ALL constraints overlap.
                        </p>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowAllConstraints(!showAllConstraints)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showAllConstraints
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {showAllConstraints ? "Hide All Shading" : "Show All Shading"}
                            </button>
                        </div>

                        {/* Constraint toggles */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {constraints.map((con) => (
                                <button
                                    key={con.id}
                                    onClick={() => toggleConstraint(con.id)}
                                    className={clsx(
                                        "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 font-mono",
                                        selectedConstraint === con.id
                                            ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500",
                                        !showAllConstraints && "opacity-50"
                                    )}
                                    style={{
                                        borderColor: selectedConstraint === con.id ? con.color : undefined,
                                        backgroundColor: selectedConstraint === con.id ? con.color : undefined,
                                    }}
                                >
                                    {con.label}
                                </button>
                            ))}
                        </div>

                        {/* ============================================================
    ADVANCED SVG LINEAR PROGRAMMING GRAPH
============================================================ */}

                        <div className="w-full max-w-xl mx-auto">

                            {/* Graph Header */}
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Interactive Constraint Graph
                                    </h4>

                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Explore constraints and identify the feasible region
                                    </p>
                                </div>

                                {showAllConstraints && (
                                    <span className="inline-flex items-center gap-1.5
                             px-2.5 py-1 rounded-full
                             bg-emerald-50 dark:bg-emerald-950/30
                             border border-emerald-200
                             dark:border-emerald-800
                             text-emerald-700 dark:text-emerald-400
                             text-xs font-semibold">

                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

                                        Feasible Region Active
                                    </span>
                                )}

                            </div>


                            {/* GRAPH */}
                            <div
                                className="relative w-full aspect-square
                   bg-white dark:bg-slate-950
                   rounded-2xl
                   border border-slate-200 dark:border-slate-700
                   p-2
                   shadow-lg
                   overflow-hidden"
                            >

                                <svg
                                    viewBox="0 0 400 400"
                                    className="w-full h-full"
                                    role="img"
                                    aria-label="Interactive linear programming constraint graph"
                                >

                                    {/* ====================================================
                DEFINITIONS
            ==================================================== */}

                                    <defs>

                                        {/* Minor grid */}
                                        <pattern
                                            id="minorGrid_lp"
                                            width="10"
                                            height="10"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <path
                                                d="M 10 0 L 0 0 0 10"
                                                fill="none"
                                                stroke="#e2e8f0"
                                                strokeWidth="0.35"
                                                className="dark:stroke-slate-800"
                                            />
                                        </pattern>

                                        {/* Major grid */}
                                        <pattern
                                            id="majorGrid_lp"
                                            width="40"
                                            height="40"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <rect
                                                width="40"
                                                height="40"
                                                fill="url(#minorGrid_lp)"
                                            />

                                            <path
                                                d="M 40 0 L 0 0 0 40"
                                                fill="none"
                                                stroke="#cbd5e1"
                                                strokeWidth="0.8"
                                                className="dark:stroke-slate-700"
                                            />
                                        </pattern>

                                        {/* Feasible region gradient */}
                                        <linearGradient
                                            id="feasibleGradient_lp"
                                            x1="0"
                                            y1="1"
                                            x2="1"
                                            y2="0"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#10b981"
                                                stopOpacity="0.18"
                                            />

                                            <stop
                                                offset="100%"
                                                stopColor="#06b6d4"
                                                stopOpacity="0.10"
                                            />
                                        </linearGradient>

                                        {/* Feasible region border */}
                                        <filter
                                            id="feasibleGlow_lp"
                                            x="-30%"
                                            y="-30%"
                                            width="160%"
                                            height="160%"
                                        >
                                            <feGaussianBlur
                                                stdDeviation="2"
                                                result="blur"
                                            />

                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>

                                        {/* Arrow markers */}
                                        <marker
                                            id="arrowX_lp"
                                            markerWidth="8"
                                            markerHeight="8"
                                            refX="5"
                                            refY="4"
                                            orient="auto"
                                        >
                                            <path
                                                d="M0,0 L8,4 L0,8 Z"
                                                fill="#334155"
                                                className="dark:fill-slate-300"
                                            />
                                        </marker>

                                        <marker
                                            id="arrowY_lp"
                                            markerWidth="8"
                                            markerHeight="8"
                                            refX="5"
                                            refY="4"
                                            orient="auto"
                                        >
                                            <path
                                                d="M0,0 L8,4 L0,8 Z"
                                                fill="#334155"
                                                className="dark:fill-slate-300"
                                            />
                                        </marker>

                                    </defs>


                                    {/* ====================================================
                BACKGROUND
            ==================================================== */}

                                    <rect
                                        x="0"
                                        y="0"
                                        width="400"
                                        height="400"
                                        rx="12"
                                        fill="url(#majorGrid_lp)"
                                    />


                                    {/* ====================================================
                PLOT AREA
            ==================================================== */}

                                    <rect
                                        x="200"
                                        y="20"
                                        width="175"
                                        height="175"
                                        rx="4"
                                        fill="rgba(255,255,255,0.02)"
                                        className="dark:fill-slate-900"
                                    />


                                    {/* ====================================================
                AXES
            ==================================================== */}

                                    <line
                                        x1="200"
                                        y1="200"
                                        x2="375"
                                        y2="200"
                                        stroke="#334155"
                                        strokeWidth="2.5"
                                        markerEnd="url(#arrowX_lp)"
                                        className="dark:stroke-slate-300"
                                    />

                                    <line
                                        x1="200"
                                        y1="200"
                                        x2="200"
                                        y2="25"
                                        stroke="#334155"
                                        strokeWidth="2.5"
                                        markerEnd="url(#arrowY_lp)"
                                        className="dark:stroke-slate-300"
                                    />


                                    {/* ====================================================
                AXIS LABELS
            ==================================================== */}

                                    <text
                                        x="378"
                                        y="215"
                                        fontSize="15"
                                        fontWeight="700"
                                        fill="#334155"
                                        className="dark:fill-slate-200"
                                    >
                                        x
                                    </text>

                                    <text
                                        x="211"
                                        y="25"
                                        fontSize="15"
                                        fontWeight="700"
                                        fill="#334155"
                                        className="dark:fill-slate-200"
                                    >
                                        y
                                    </text>


                                    {/* ====================================================
                ORIGIN
            ==================================================== */}

                                    <circle
                                        cx="200"
                                        cy="200"
                                        r="5"
                                        fill="#ef4444"
                                        stroke="white"
                                        strokeWidth="2"
                                    />

                                    <text
                                        x="207"
                                        y="218"
                                        fontSize="11"
                                        fontWeight="700"
                                        fill="#475569"
                                        className="dark:fill-slate-300"
                                    >
                                        O (0,0)
                                    </text>


                                    {/* ====================================================
                AXIS TICKS
            ==================================================== */}

                                    {[1, 2, 3, 4].map(value => {

                                        const x = GRAPH.originX + value * GRAPH.scale;
                                        const y = GRAPH.originY - value * GRAPH.scale;

                                        return (
                                            <g key={`axis-${value}`}>

                                                {/* X tick */}
                                                <line
                                                    x1={x}
                                                    y1="196"
                                                    x2={x}
                                                    y2="204"
                                                    stroke="#64748b"
                                                    strokeWidth="1.3"
                                                    className="dark:stroke-slate-400"
                                                />

                                                <text
                                                    x={x}
                                                    y="219"
                                                    textAnchor="middle"
                                                    fontSize="10"
                                                    fill="#64748b"
                                                    className="dark:fill-slate-400"
                                                >
                                                    {value}
                                                </text>


                                                {/* Y tick */}
                                                <line
                                                    x1="196"
                                                    y1={y}
                                                    x2="204"
                                                    y2={y}
                                                    stroke="#64748b"
                                                    strokeWidth="1.3"
                                                    className="dark:stroke-slate-400"
                                                />

                                                <text
                                                    x="185"
                                                    y={y + 4}
                                                    textAnchor="end"
                                                    fontSize="10"
                                                    fill="#64748b"
                                                    className="dark:fill-slate-400"
                                                >
                                                    {value}
                                                </text>

                                            </g>
                                        );
                                    })}


                                    {/* ====================================================
                CONSTRAINT SHADING
            ==================================================== */}

                                    {showAllConstraints &&
                                        constraints.map(con => {

                                            const shading =
                                                getConstraintShading(
                                                    con.a,
                                                    con.b,
                                                    con.c,
                                                    con.sign
                                                );

                                            if (shading.length <= 2) {
                                                return null;
                                            }

                                            const isSelected =
                                                selectedConstraint === con.id;

                                            return (
                                                <polygon
                                                    key={`shade-${con.id}`}
                                                    points={shading
                                                        .map(
                                                            p =>
                                                                `${p.px},${p.py}`
                                                        )
                                                        .join(" ")
                                                    }
                                                    fill={con.color}
                                                    fillOpacity={
                                                        selectedConstraint !== null
                                                            ? isSelected
                                                                ? 0.16
                                                                : 0.025
                                                            : 0.07
                                                    }
                                                    stroke="none"
                                                    className="transition-all duration-300"
                                                />
                                            );
                                        })}


                                    {/* ====================================================
                FEASIBLE REGION
            ==================================================== */}

                                    {showAllConstraints &&
                                        feasibleVertices.length >= 3 && (

                                            <polygon
                                                points={feasibleVertices
                                                    .map(point => {

                                                        const svg =
                                                            toSvg(
                                                                point.x,
                                                                point.y
                                                            );

                                                        return `${svg.px},${svg.py}`;
                                                    })
                                                    .join(" ")
                                                }
                                                fill="url(#feasibleGradient_lp)"
                                                stroke="#10b981"
                                                strokeWidth="2.5"
                                                strokeLinejoin="round"
                                                filter="url(#feasibleGlow_lp)"
                                            />
                                        )}


                                    {/* ====================================================
                CONSTRAINT LINES
            ==================================================== */}

                                    {constraints.map(con => {

                                        const points =
                                            getLinePoints(
                                                con.a,
                                                con.b,
                                                con.c
                                            );

                                        const solid =
                                            isSolid(con.sign);

                                        const isHighlighted =
                                            selectedConstraint === con.id;

                                        const opacity =
                                            selectedConstraint !== null &&
                                                !isHighlighted
                                                ? 0.28
                                                : 0.95;

                                        if (points.length <= 1) {
                                            return null;
                                        }

                                        return (
                                            <g key={`constraint-${con.id}`}>

                                                {/* Glow */}
                                                {isHighlighted && (
                                                    <polyline
                                                        points={points
                                                            .map(
                                                                p =>
                                                                    `${p.px},${p.py}`
                                                            )
                                                            .join(" ")
                                                        }
                                                        fill="none"
                                                        stroke={con.color}
                                                        strokeWidth="8"
                                                        opacity="0.12"
                                                    />
                                                )}

                                                {/* Main line */}
                                                <polyline
                                                    points={points
                                                        .map(
                                                            p =>
                                                                `${p.px},${p.py}`
                                                        )
                                                        .join(" ")
                                                    }
                                                    fill="none"
                                                    stroke={con.color}
                                                    strokeWidth={
                                                        isHighlighted
                                                            ? 3.8
                                                            : 2.2
                                                    }
                                                    strokeDasharray={
                                                        solid
                                                            ? undefined
                                                            : "7 5"
                                                    }
                                                    strokeLinecap="round"
                                                    opacity={opacity}
                                                    className="transition-all duration-300"
                                                />

                                            </g>
                                        );
                                    })}


                                    {/* ====================================================
                FEASIBLE VERTICES
            ==================================================== */}

                                    {showAllConstraints &&
                                        feasibleVertices.map(
                                            (point, index) => {

                                                const svg =
                                                    toSvg(
                                                        point.x,
                                                        point.y
                                                    );

                                                return (
                                                    <g
                                                        key={`vertex-${index}`}
                                                        className="cursor-pointer"
                                                    >

                                                        {/* Outer ring */}
                                                        <circle
                                                            cx={svg.px}
                                                            cy={svg.py}
                                                            r="7"
                                                            fill="#10b981"
                                                            fillOpacity="0.15"
                                                        />

                                                        {/* Vertex */}
                                                        <circle
                                                            cx={svg.px}
                                                            cy={svg.py}
                                                            r="3.8"
                                                            fill="#10b981"
                                                            stroke="white"
                                                            strokeWidth="1.5"
                                                        />

                                                        {/* Coordinate */}
                                                        <rect
                                                            x={svg.px + 7}
                                                            y={svg.py - 17}
                                                            width="55"
                                                            height="16"
                                                            rx="4"
                                                            fill="white"
                                                            fillOpacity="0.92"
                                                            stroke="#d1d5db"
                                                            strokeWidth="0.7"
                                                            className="dark:fill-slate-800 dark:stroke-slate-600"
                                                        />

                                                        <text
                                                            x={svg.px + 34}
                                                            y={svg.py - 6}
                                                            textAnchor="middle"
                                                            fontSize="8.5"
                                                            fontWeight="600"
                                                            fill="#334155"
                                                            className="dark:fill-slate-200"
                                                        >
                                                            (
                                                            {point.x.toFixed(1)},
                                                            {point.y.toFixed(1)}
                                                            )
                                                        </text>

                                                    </g>
                                                );
                                            }
                                        )}


                                    {/* ====================================================
                GRAPH INFORMATION PANEL
            ==================================================== */}

                                    {showAllConstraints && (
                                        <g>

                                            <rect
                                                x="215"
                                                y="28"
                                                width="150"
                                                height="47"
                                                rx="8"
                                                fill="white"
                                                fillOpacity="0.94"
                                                stroke="#cbd5e1"
                                                strokeWidth="1"
                                                className="dark:fill-slate-900 dark:stroke-slate-700"
                                            />

                                            <circle
                                                cx="229"
                                                cy="43"
                                                r="4"
                                                fill="#10b981"
                                            />

                                            <text
                                                x="239"
                                                y="47"
                                                fontSize="10"
                                                fontWeight="700"
                                                fill="#334155"
                                                className="dark:fill-slate-200"
                                            >
                                                Feasible Region
                                            </text>

                                            <text
                                                x="225"
                                                y="63"
                                                fontSize="8.5"
                                                fill="#64748b"
                                                className="dark:fill-slate-400"
                                            >
                                                Satisfies ALL constraints
                                            </text>

                                        </g>
                                    )}


                                    {/* ====================================================
                CONSTRAINT LEGEND
            ==================================================== */}

                                    {showAllConstraints && (
                                        <g>

                                            <rect
                                                x="20"
                                                y="315"
                                                width="160"
                                                height={
                                                    Math.min(
                                                        25 +
                                                        constraints.length * 18,
                                                        70
                                                    )
                                                }
                                                rx="7"
                                                fill="white"
                                                fillOpacity="0.94"
                                                stroke="#cbd5e1"
                                                strokeWidth="1"
                                                className="dark:fill-slate-900 dark:stroke-slate-700"
                                            />

                                            <text
                                                x="30"
                                                y="331"
                                                fontSize="9"
                                                fontWeight="700"
                                                fill="#334155"
                                                className="dark:fill-slate-200"
                                            >
                                                Constraints
                                            </text>

                                            {constraints
                                                .slice(0, 3)
                                                .map((con, index) => (

                                                    <g
                                                        key={`legend-${con.id}`}
                                                    >

                                                        <line
                                                            x1="30"
                                                            y1={
                                                                343 +
                                                                index * 17
                                                            }
                                                            x2="47"
                                                            y2={
                                                                343 +
                                                                index * 17
                                                            }
                                                            stroke={con.color}
                                                            strokeWidth="2.5"
                                                            strokeDasharray={
                                                                isSolid(
                                                                    con.sign
                                                                )
                                                                    ? undefined
                                                                    : "5 3"
                                                            }
                                                        />

                                                        <text
                                                            x="53"
                                                            y={
                                                                346 +
                                                                index * 17
                                                            }
                                                            fontSize="8.5"
                                                            fill={con.color}
                                                            fontWeight="600"
                                                        >
                                                            {con.label}
                                                        </text>

                                                    </g>

                                                ))}

                                        </g>
                                    )}


                                    {/* ====================================================
                BOTTOM STATUS
            ==================================================== */}

                                    {showAllConstraints && (
                                        <text
                                            x="200"
                                            y="390"
                                            textAnchor="middle"
                                            fontSize="9"
                                            fill="#64748b"
                                            className="dark:fill-slate-500"
                                        >
                                            Green area = feasible solution space
                                        </text>
                                    )}

                                </svg>
                            </div>


                            {/* ============================================================
        GRAPH EXPLANATION
    ============================================================ */}

                            {showAllConstraints && (
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">

                                    <div className="rounded-lg border border-slate-200
                            dark:border-slate-700
                            bg-slate-50 dark:bg-slate-800/60
                            p-2.5">

                                        <div className="flex items-center gap-2 mb-1">

                                            <span className="w-2.5 h-2.5 rounded-full
                                     bg-emerald-500" />

                                            <span className="text-xs font-bold
                                     text-slate-700
                                     dark:text-slate-300">
                                                Feasible
                                            </span>

                                        </div>

                                        <p className="text-[10px] leading-4
                              text-slate-500
                              dark:text-slate-400">
                                            Points satisfying every constraint.
                                        </p>

                                    </div>


                                    <div className="rounded-lg border border-slate-200
                            dark:border-slate-700
                            bg-slate-50 dark:bg-slate-800/60
                            p-2.5">

                                        <div className="flex items-center gap-2 mb-1">

                                            <span className="w-5 h-0.5 bg-slate-500" />

                                            <span className="text-xs font-bold
                                     text-slate-700
                                     dark:text-slate-300">
                                                Boundary
                                            </span>

                                        </div>

                                        <p className="text-[10px] leading-4
                              text-slate-500
                              dark:text-slate-400">
                                            Each line represents a constraint.
                                        </p>

                                    </div>


                                    <div className="rounded-lg border border-slate-200
                            dark:border-slate-700
                            bg-slate-50 dark:bg-slate-800/60
                            p-2.5">

                                        <div className="flex items-center gap-2 mb-1">

                                            <span className="text-xs font-bold
                                     text-slate-700
                                     dark:text-slate-300">
                                                ● Vertices
                                            </span>

                                        </div>

                                        <p className="text-[10px] leading-4
                              text-slate-500
                              dark:text-slate-400">
                                            Candidate points for the optimum.
                                        </p>

                                    </div>

                                </div>
                            )}

                        </div>
                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full mr-2">
                                {constraints.length} constraints
                            </span>
                            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full">
                                {showAllConstraints ? "✓ All constraints shown" : "Hidden"}
                            </span>
                            {selectedConstraint !== null && (
                                <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full ml-2">
                                    Highlighted: {constraints.find(c => c.id === selectedConstraint)?.label}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Tips for Managing Multiple Constraints ===== */}
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
                        <span className="text-3xl">📊</span>
                        Tips for Managing Multiple Constraints
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">✓ Use Color Coding</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Assign a different color to each constraint. This makes it easy to see which
                                    line corresponds to which constraint.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">✓ Light Shading</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Use light shading so you can see overlaps clearly. Dark shading can hide the
                                    feasible region.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                                <h3 className="font-semibold text-purple-700 dark:text-purple-300">✓ Label Everything</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Write each constraint's equation next to its line. This avoids confusion.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                                <h3 className="font-semibold text-rose-700 dark:text-rose-300">✓ Work Systematically</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Plot constraints one at a time, starting with the simplest (non-negativity).
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
                            <div className="font-semibold text-purple-600 dark:text-purple-400">Production Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                A factory in <span className="font-medium text-purple-600 dark:text-purple-400">Ichapur</span>{" "}
                                has machine hours (2x+3y≤12), labor (x+2y≤8), and minimum production (x+y≥4).
                                All constraints must be satisfied simultaneously.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-indigo-600 dark:text-indigo-400">Resource Allocation</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-indigo-600 dark:text-indigo-400">Kolkata</span>,
                                a project manager allocates resources: budget (≤50), time (≤40), and minimum
                                quality score (≥70). Plot all to find feasible allocations.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-amber-600 dark:text-amber-400">Student Schedule</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-medium text-amber-600 dark:text-amber-400">Susmita</span>{" "}
                                plans her week: study (≥20h), sleep (≥7h/day), work (≤15h), and social (≥5h).
                                Multiple constraints determine feasible schedules.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="font-semibold text-rose-600 dark:text-rose-400">Diet Planning</div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                In <span className="font-medium text-rose-600 dark:text-rose-400">Jadavpur</span>,
                                a nutritionist plans a diet: calories (≥2000), protein (≥50g), carbs (≤300g),
                                and cost (≤₹500). All must be satisfied simultaneously.
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
                                <li>Plot non-negativity constraints first.</li>
                                <li>Use different colors for each constraint.</li>
                                <li>Light shading helps see overlaps.</li>
                                <li>Label each line with its equation.</li>
                                <li>Work systematically, one constraint at a time.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Missing a constraint (especially non-negativity).</li>
                                <li>Using inconsistent line types (solid/dashed).</li>
                                <li>Dark shading that hides the feasible region.</li>
                                <li>Not labeling constraints on the graph.</li>
                                <li>Plotting constraints in different scales.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Use a consistent scale for all constraints.</li>
                                <li>Lightly shade each constraint separately.</li>
                                <li>Find the overlap carefully.</li>
                                <li>Label the feasible region clearly.</li>
                                <li>Double-check all constraints are included.</li>
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
                            <span>I can list all constraints from a problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can plot each constraint on the same graph.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can identify the overlapping feasible region.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can use color coding to distinguish constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I know how to handle multiple inequalities.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify if a point satisfies all constraints.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Plotting Multiple Constraints – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Plotting Multiple Constraints – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic9_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "This is where everything comes together! I tell my students: 'Each constraint is like a rule in a game. The feasible region is where all rules are followed.' A common mistake is forgetting a constraint or using inconsistent shading. I recommend plotting constraints in order of complexity — start with the easiest (non-negativity) and build up. Also, remind students that the feasible region is often a polygon, and its vertices are the corner points we'll evaluate later."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 9 — Plotting Multiple Constraints &bull; Building the complete feasible region
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Finding the Common Feasible Region (Topic 10)
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

export default Topic9;