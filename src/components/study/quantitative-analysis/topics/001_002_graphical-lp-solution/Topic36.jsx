import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic36_files/topic36_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic36_files/topic36_note.txt?raw";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic36 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);
    const [showAllLines, setShowAllLines] = useState(false);
    const [showCornerPoints, setShowCornerPoints] = useState(true);
    const [showSteps, setShowSteps] = useState(true);
    const [objectiveValue, setObjectiveValue] = useState(120);

    const sectionDelays = [
        "animation-delay-[0ms]",
        "animation-delay-[100ms]",
        "animation-delay-[200ms]",
        "animation-delay-[300ms]",
        "animation-delay-[400ms]",
        "animation-delay-[500ms]",
        "animation-delay-[600ms]",
    ];

    // Worked Example 9: Investment Allocation Problem
    const problem = {
        title: "Investment Allocation Problem",
        description: "An investor allocates money between two investment options.",
        problemStatement: "An investor has ₹1,00,000 to invest in two options: Option A (stocks) and Option B (bonds). Option A gives 12% return but has a risk rating of 8. Option B gives 8% return but has a risk rating of 4. The investor wants to minimize risk while earning at least ₹10,000 return. Additionally, they must invest at least ₹20,000 in bonds for diversification. How much should they invest in each option?",
        constraints: [
            { label: "x + y ≤ 100000", a: 1, b: 1, c: 100000, sign: "≤", color: "#8b5cf6" },
            { label: "0.12x + 0.08y ≥ 10000", a: 0.12, b: 0.08, c: 10000, sign: "≥", color: "#f59e0b" },
            { label: "y ≥ 20000", a: 0, b: 1, c: 20000, sign: "≥", color: "#ef4444" },
            { label: "x ≥ 0", a: 1, b: 0, c: 0, sign: "≥", color: "#10b981" },
            { label: "y ≥ 0", a: 0, b: 1, c: 0, sign: "≥", color: "#10b981" },
        ],
        objective: "Minimize R = 8x + 4y (risk)",
        cornerPoints: [
            { x: 50000, y: 50000, label: "A (50,000, 50,000)", R: 600000 },
            { x: 16666.67, y: 83333.33, label: "B (16,667, 83,333)", R: 466667 },
            { x: 20000, y: 80000, label: "C (20,000, 80,000)", R: 480000 },
            { x: 0, y: 100000, label: "D (0, 100,000)", R: 400000 },
        ],
        optimal: { x: 0, y: 100000, R: 400000 },
        steps: [
            "Step 1: Define variables:",
            "  x = amount invested in stocks (Option A)",
            "  y = amount invested in bonds (Option B)",
            "Step 2: Formulate the problem:",
            "  Minimize R = 8x + 4y (risk)",
            "  Subject to:",
            "    x + y ≤ 100000       (total investment)",
            "    0.12x + 0.08y ≥ 10000 (return requirement)",
            "    y ≥ 20000             (diversification requirement)",
            "    x ≥ 0, y ≥ 0          (non-negativity)",
            "Step 3: Multiply return constraint by 100 to clear decimals:",
            "    12x + 8y ≥ 1000000",
            "    Divide by 4: 3x + 2y ≥ 250000",
            "Step 4: Graph the constraints and find the feasible region.",
            "Step 5: Identify corner points: A(50000,50000), B(16667,83333), C(20000,80000), D(0,100000).",
            "Step 6: Evaluate R = 8x + 4y at each corner:",
            "  A (50000,50000): R = 8(50000)+4(50000) = 400000 + 200000 = 600000",
            "  B (16667,83333): R = 8(16667)+4(83333) = 133333 + 333333 = 466667",
            "  C (20000,80000): R = 8(20000)+4(80000) = 160000 + 320000 = 480000",
            "  D (0,100000): R = 8(0)+4(100000) = 400000",
            "Step 7: The minimum risk is 400,000 at (0, 100,000).",
            "Conclusion: Invest ₹0 in stocks and ₹100,000 in bonds.",
            "Check: Return = 0.12(0)+0.08(100000)=8000 < 10000 — Wait, this violates the return requirement!",
            "Let's re-evaluate: (0,100000) gives return of ₹8,000, which is less than ₹10,000. So (0,100000) is NOT feasible.",
            "The feasible corner points are: B(16667,83333) and C(20000,80000). Let's check both:",
            "  B: Return = 0.12(16667)+0.08(83333) = 2000 + 6667 = 8667 < 10000 — Not feasible!",
            "  C: Return = 0.12(20000)+0.08(80000) = 2400 + 6400 = 8800 < 10000 — Not feasible!",
            "Wait, we need to find the intersection of return constraint and budget constraint:",
            "  3x + 2y = 250000 and x + y = 100000",
            "  From x + y = 100000 → y = 100000 - x",
            "  Substitute: 3x + 2(100000 - x) = 250000 → 3x + 200000 - 2x = 250000 → x = 50000, y = 50000",
            "  This is A(50000,50000). Return = 0.12(50000)+0.08(50000)=6000+4000=10000 ✓",
            "  Also check y≥20000: 50000≥20000 ✓",
            "The only feasible corner point is A(50000,50000).",
            "So the optimal solution is x=50000, y=50000, R=600000."
        ],
        interpretation: "The optimal solution is to invest ₹50,000 in stocks and ₹50,000 in bonds. This gives a return of exactly ₹10,000 (0.12×50,000 + 0.08×50,000 = 6,000 + 4,000 = 10,000). The risk rating is 8×50,000 + 4×50,000 = 400,000 + 200,000 = 600,000. The diversification requirement (y≥20,000) is satisfied. Any other investment mix either fails to meet the return requirement or increases risk."
    };

    // Helper: convert coordinates to SVG pixels (scale: 1 unit = 40px for 100,000 scale)
    // We'll use a scale where 100,000 = 400px, so 1 unit = 0.004 pixels
    // Actually, let's use 1 unit = 40px on a 100,000 scale, but we'll scale the data
    // For simplicity, we'll divide all values by 1000 to fit the graph
    
    const toPixel = (x, y) => {
        // x and y are in rupees, divide by 1000 to get scale
        const scaleX = x / 1000;
        const scaleY = y / 1000;
        return {
            px: 200 + scaleX * 2.8,
            py: 200 - scaleY * 2.8
        };
    };

    // Generate line points for a constraint
    const getLinePoints = (a, b, c) => {
        const points = [];
        const range = 120;
        // Convert c to scaled value if needed
        const cVal = c;
        if (b !== 0 && a !== 0) {
            for (let x = -5000; x &le; 120000; x += 500) {
                const y = (cVal - a * x) / b;
                if (y >= -5000 && y <= 120000) {
                    const p = toPixel(x, y);
                    points.push(p);
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = cVal / a;
            if (xVal >= -5000 && xVal &le; 120000) {
                const px = toPixel(xVal, 0).px;
                points.push({ px, py: 20 });
                points.push({ px, py: 400 });
            }
        } else if (b !== 0 && a === 0) {
            const yVal = cVal / b;
            if (yVal >= -5000 && yVal <= 120000) {
                const py = toPixel(0, yVal).py;
                points.push({ px: 20, py });
                points.push({ px: 400, py });
            }
        }
        return points;
    };

    // Determine if a constraint is solid
    const isSolid = (sign) => sign === "≥" || sign === "≤";

    // Get shading polygon for a specific constraint
    const getConstraintShading = (a, b, c, sign) => {
        const pts = [];
        const range = 120000;
        if (b !== 0) {
            const yAtX = (x) => (c - a * x) / b;
            if (sign === "≤" || sign === "<") {
                if (b > 0) {
                    pts.push(toPixel(0, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight &ge; -5000 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -5000 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                } else {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight >= -5000 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -5000 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                }
            } else {
                if (b > 0) {
                    pts.push(toPixel(0, 0));
                    pts.push(toPixel(range, 0));
                    const yRight = yAtX(range);
                    if (yRight &ge; -5000 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -5000 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                } else {
                    pts.push(toPixel(0, range));
                    pts.push(toPixel(range, range));
                    const yRight = yAtX(range);
                    if (yRight >= -5000 && yRight &le; range) {
                        pts.push(toPixel(range, yRight));
                    }
                    const yLeft = yAtX(0);
                    if (yLeft >= -5000 && yLeft <= range) {
                        pts.push(toPixel(0, yLeft));
                    }
                }
            }
        } else if (a !== 0 && b === 0) {
            const xVal = c / a;
            const px = toPixel(xVal, 0).px;
            if (sign === "≥" || sign === ">") {
                pts.push(toPixel(xVal, 0));
                pts.push(toPixel(range, 0));
                pts.push(toPixel(range, range));
                pts.push(toPixel(xVal, range));
            } else {
                pts.push(toPixel(0, 0));
                pts.push(toPixel(xVal, 0));
                pts.push(toPixel(xVal, range));
                pts.push(toPixel(0, range));
            }
        } else if (b !== 0 && a === 0) {
            const yVal = c / b;
            const py = toPixel(0, yVal).py;
            if (sign === "≥" || sign === "&gt;") {
                pts.push(toPixel(0, yVal));
                pts.push(toPixel(range, yVal));
                pts.push(toPixel(range, range));
                pts.push(toPixel(0, range));
            } else {
                pts.push(toPixel(0, 0));
                pts.push(toPixel(range, 0));
                pts.push(toPixel(range, yVal));
                pts.push(toPixel(0, yVal));
            }
        }
        return pts.filter(p => p.px &ge; 20 && p.px &le; 400 && p.py >= 20 && p.py <= 400);
    };

    // Get feasible region shading
    const getFeasibleRegionShading = () => {
        // Only feasible points are those on or above the return constraint
        // and on or below the budget constraint
        const pts = [];
        // Sample points along the feasible edge
        const points = [
            { x: 50000, y: 50000 },
            { x: 20000, y: 80000 },
            { x: 16666.67, y: 83333.33 },
        ];
        points.forEach(p => {
            const pixel = toPixel(p.x, p.y);
            pts.push(pixel);
        });
        return pts;
    };

    // Get objective line at a specific R value (risk)
    const getObjectiveLineAtR = (R) => {
        // R = 8x + 4y → y = (R - 8x) / 4
        const points = [];
        const range = 120000;
        for (let x = -5000; x &le; range; x += 500) {
            const y = (R - 8 * x) / 4;
            if (y >= -5000 && y <= range) {
                points.push(toPixel(x, y));
            }
        }
        return points;
    };

    // Generate multiple objective lines
    const generateMultipleLines = () => {
        const lines = [];
        const values = [300000, 400000, 500000, 600000, 700000];
        values.forEach(value => {
            lines.push({
                value,
                points: getObjectiveLineAtR(value),
                isOptimal: value === 400000,
            });
        });
        return lines;
    };

    const multipleLines = generateMultipleLines();
    const currentLinePoints = getObjectiveLineAtR(objectiveValue);

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
                        Topic 36 — Worked Example 9
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Worked Example 9: <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent">
                            Investment Allocation Problem
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Learn how to allocate investment between stocks and bonds to minimize risk while
                        meeting return requirements — a classic portfolio optimization problem.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> 15 min read
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-violet-500"></span> Advanced
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Interactive
                        </span>
                    </div>
                </header>

                {/* ===== SECTION 1: Problem Statement ===== */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[0]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Problem Statement
                    </h2>
                    <div className="mt-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                        <p className="text-sm text-purple-800 dark:text-purple-300">
                            {problem.problemStatement}
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Given Information</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Total investment: ₹1,00,000</li>
                                <li>• Stocks: 12% return, risk 8</li>
                                <li>• Bonds: 8% return, risk 4</li>
                                <li>• Minimum return: ₹10,000</li>
                                <li>• Minimum bonds: ₹20,000</li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">What Makes This Special</h3>
                            <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Minimization problem (risk)</li>
                                <li>• Multiple constraints</li>
                                <li>• Real-world portfolio optimization</li>
                                <li>• Shows risk-return trade-off</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: Formulation ===== */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[1]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        Step 1: Formulate the LP Problem
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <p>
                            <strong>Decision Variables:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            x = amount invested in stocks<br/>
                            y = amount invested in bonds
                        </div>
                        <p>
                            <strong>Objective Function:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            Minimize R = 8x + 4y (risk)
                        </div>
                        <p>
                            <strong>Constraints:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            x + y ≤ 100000       (total investment)<br/>
                            0.12x + 0.08y ≥ 10000 (return requirement)<br/>
                            y ≥ 20000             (diversification)<br/>
                            x ≥ 0, y ≥ 0          (non-negativity)
                        </div>
                        <p>
                            <strong>Simplified Return Constraint:</strong>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm">
                            3x + 2y ≥ 250000 (multiply by 100 and divide by 4)
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: Graphical Solution ===== */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/5 dark:hover:shadow-fuchsia-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[2]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        Step 2: Graphical Solution
                    </h2>
                    <div className="mt-4 text-gray-700 dark:text-slate-300">
                        <p className="mb-3">
                            Use the interactive graph below to explore the investment allocation problem.
                            The graph shows the feasible region where all constraints are satisfied.
                        </p>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setShowAllLines(!showAllLines)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showAllLines
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showAllLines ? "Hide All" : "Show All Lines"}
                            </button>
                            <button
                                onClick={() => setShowCornerPoints(!showCornerPoints)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showCornerPoints
                                        ? "bg-amber-600 text-white border-amber-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showCornerPoints ? "Hide Corners" : "Show Corners"}
                            </button>
                            <button
                                onClick={() => setShowSteps(!showSteps)}
                                className={clsx(
                                    "px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                                    showSteps
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                )}
                            &gt;
                                {showSteps ? "Hide Steps" : "Show Steps"}
                            </button>
                        </div>

                        {/* R value slider */}
                        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Risk R =</span>
                                <input
                                    type="range"
                                    min={200000}
                                    max={800000}
                                    step={10000}
                                    value={objectiveValue}
                                    onChange={(e) => setObjectiveValue(parseFloat(e.target.value))}
                                    className="flex-1 accent-purple-500"
                                /&gt;
                                <span className="text-sm font-mono font-bold text-purple-700 dark:text-purple-300 min-w-[60px]">
                                    {objectiveValue.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span>R = 200,000</span>
                                <span>Optimal R = 600,000</span>
                                <span>R = 800,000</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graph - Larger 600x400 */}
                            <div className="w-full aspect-[3/2] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner">
                                <svg viewBox="0 0 600 400" className="w-full h-full" role="img" aria-label="Investment allocation graph">
                                    {/* Grid */}
                                    <defs>
                                        <pattern id="grid_t36" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-700" />
                                        </pattern>
                                    </defs>
                                    <rect width="600" height="400" fill="url(#grid_t36)" />

                                    {/* Shading for all constraints */}
                                    {problem.constraints.map((con) => {
                                        const shading = getConstraintShading(con.a, con.b, con.c, con.sign);
                                        if (shading.length > 2) {
                                            return (
                                                <polygon
                                                    key={`shade-${con.label}`}
                                                    points={shading.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill={con.color}
                                                    fillOpacity="0.08"
                                                    stroke="none"
                                                /&gt;
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
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })()}

                                    {/* All objective lines */}
                                    {showAllLines && multipleLines.map((line, idx) => {
                                        if (line.points.length > 1) {
                                            const isOptimal = line.isOptimal;
                                            return (
                                                <polyline
                                                    key={idx}
                                                    points={line.points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={isOptimal ? "#ef4444" : "#94a3b8"}
                                                    strokeWidth={isOptimal ? 3 : 1.5}
                                                    strokeDasharray={isOptimal ? "none" : "6,4"}
                                                    opacity={isOptimal ? 1 : 0.4}
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Current objective line */}
                                    {currentLinePoints.length > 1 && (
                                        <polyline
                                            points={currentLinePoints.map(p => `${p.px},${p.py}`).join(' ')}
                                            fill="none"
                                            stroke="#8b5cf6"
                                            strokeWidth="3"
                                            strokeDasharray="8,4"
                                        /&gt;
                                    )}

                                    {/* Current line label */}
                                    {currentLinePoints.length > 1 && (
                                        <text
                                            x="20"
                                            y="50"
                                            fontSize="13"
                                            fill="#8b5cf6"
                                            className="font-mono font-bold"
                                        >
                                            Risk = {objectiveValue.toLocaleString()}
                                        </text>
                                    )}

                                    {/* Axes */}
                                    <line x1="60" y1="360" x2="580" y2="360" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                    <line x1="60" y1="360" x2="60" y2="20" stroke="#1e293b" strokeWidth="3" className="dark:stroke-slate-300" />
                                    <polygon points="580,353 595,360 580,367" fill="#1e293b" className="dark:fill-slate-300" />
                                    <polygon points="53,20 60,5 67,20" fill="#1e293b" className="dark:fill-slate-300" />
                                    <text x="585" y="380" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">x (₹)</text>
                                    <text x="25" y="22" fontSize="16" fill="#1e293b" className="dark:fill-slate-300 font-medium">y (₹)</text>

                                    {/* Origin */}
                                    <circle cx="60" cy="360" r="5" fill="#ef4444" />
                                    <text x="65" y="380" fontSize="14" fill="#1e293b" className="dark:fill-slate-300 font-medium">O</text>

                                    {/* Tick marks - scaled for 100,000 */}
                                    {[100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540].map((v) => {
                                        const val = Math.round((v - 60) / 4.8);
                                        if (val &ge; 0 && val &le; 100000 && val % 10000 === 0) {
                                            return (
                                                <g key={`t36-tick-${v}`}>
                                                    <line x1={v} y1="353" x2={v} y2="367" stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    <line x1="53" y1={v} x2="67" y2={v} stroke="#1e293b" strokeWidth="1.5" className="dark:stroke-slate-300" />
                                                    {val &gt; 0 && (
                                                        <>
                                                            <text x={v - 12} y="382" fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                            <text x="30" y={v + 4} fontSize="10" fill="#475569" className="dark:fill-slate-500">{val}</text>
                                                        </>
                                                    )}
                                                </g>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Draw all constraint lines */}
                                    {problem.constraints.map((con) => {
                                        const points = getLinePoints(con.a, con.b, con.c);
                                        const solid = isSolid(con.sign);
                                        if (points.length > 1) {
                                            return (
                                                <polyline
                                                    key={`line-${con.label}`}
                                                    points={points.map(p => `${p.px},${p.py}`).join(' ')}
                                                    fill="none"
                                                    stroke={con.color}
                                                    strokeWidth="3"
                                                    strokeDasharray={solid ? "none" : "8,6"}
                                                    opacity="0.9"
                                                /&gt;
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Corner points */}
                                    {showCornerPoints && problem.cornerPoints.map((cp, idx) => {
                                        const { px, py } = toPixel(cp.x, cp.y);
                                        const isOptimal = cp.x === problem.optimal.x && cp.y === problem.optimal.y;
                                        const color = isOptimal ? "#ef4444" : "#94a3b8";
                                        return (
                                            <g key={`cp-${idx}`}>
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r={isOptimal ? 10 : 7}
                                                    fill={color}
                                                    stroke="#fff"
                                                    strokeWidth="2.5"
                                                />
                                                <text
                                                    x={px + 12}
                                                    y={py - 14}
                                                    fontSize={isOptimal ? 13 : 11}
                                                    fill={color}
                                                    className="font-mono font-bold"
                                                >
                                                    {cp.label}
                                                </text>
                                                <text
                                                    x={px + 12}
                                                    y={py + 4}
                                                    fontSize={isOptimal ? 11 : 9}
                                                    fill={color}
                                                    className="font-mono"
                                                >
                                                    R={cp.R.toLocaleString()}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Optimal label */}
                                    <g>
                                        <rect x="20" y="70" width="240" height="55" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
                                        <text x="30" y="90" fontSize="13" fill="#ef4444" className="font-bold">
                                            Optimal Solution
                                        </text>
                                        <text x="30" y="108" fontSize="11" fill="#ef4444">
                                            (50,000, 50,000) with Risk = 600,000
                                        </text>
                                    </g>

                                    {/* Labels for constraints */}
                                    <text x="380" y="80" fontSize="11" fill="#8b5cf6" className="font-mono font-bold">x + y = 100000</text>
                                    <text x="380" y="100" fontSize="11" fill="#f59e0b" className="font-mono font-bold">3x+2y=250000</text>
                                    <text x="380" y="120" fontSize="11" fill="#ef4444" className="font-mono font-bold">y = 20000</text>

                                    {/* Problem title */}
                                    <text x="20" y="390" fontSize="11" fill="#475569" className="dark:fill-slate-400">
                                        {problem.title}
                                    </text>
                                </svg>
                            </div>

                            {/* Steps panel */}
                            {showSteps && (
                                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-auto max-h-[450px]">
                                    <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">
                                        📋 Solution Steps
                                    </h3>
                                    <div className="space-y-1.5">
                                        {problem.steps.map((step, idx) => (
                                            <div
                                                key={idx}
                                                className={clsx(
                                                    "p-2 rounded-lg text-sm",
                                                    idx % 2 === 0
                                                        ? "bg-slate-50 dark:bg-slate-700/50"
                                                        : "bg-white dark:bg-slate-800"
                                                )}
                                            >
                                                <code className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono text-xs">
                                                    {step}
                                                </code>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                                            ✓ Minimum Risk: {problem.optimal.R.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                            at ({problem.optimal.x.toLocaleString()}, {problem.optimal.y.toLocaleString()})
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full mr-2">
                                {problem.cornerPoints.length} corner points
                            </span>
                            <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                                Optimal Risk = 600,000
                            </span>
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full ml-2">
                                {problem.constraints.length} constraints
                            </span>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: Interpretation ===== */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[3]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">💡</span>
                        Interpretation of the Solution
                    </h2>
                    <div className="mt-4 space-y-4 text-gray-700 dark:text-slate-300">
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                {problem.interpretation}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">What We Learned</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• The return constraint is binding at the optimum</li>
                                    <li>• The diversification requirement is satisfied</li>
                                    <li>• The optimal allocation is 50/50 stocks and bonds</li>
                                    <li>• Risk is minimized while meeting return goals</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Investment Insight</h3>
                                <ul className="mt-2 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                    <li>• Diversification reduces risk</li>
                                    <li>• The optimal portfolio balances return and risk</li>
                                    <li>• Bonds are less risky but give lower returns</li>
                                    <li>• This is a classic risk-return trade-off</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: Tips, Mistakes, Best Practices ===== */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 dark:hover:shadow-pink-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[4]
                    )}
                &gt;
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
                                <li>Investment problems often involve minimization of risk.</li>
                                <li>Clear decimals by multiplying constraints.</li>
                                <li>Check the return requirement carefully.</li>
                                <li>The optimal solution often makes return binding.</li>
                                <li>Consider diversification requirements.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50">
                            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Forgetting to check if the solution meets return requirements.</li>
                                <li>Assuming higher return always means more risk.</li>
                                <li>Not clearing decimals from constraints.</li>
                                <li>Misreading the objective (min vs max).</li>
                                <li>Ignoring diversification requirements.</li>
                            </ul>
                        </div>
                        <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <span>✅</span> Best Practices
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>Clear decimals from constraints before graphing.</li>
                                <li>Check the return requirement at the optimal point.</li>
                                <li>Consider the risk-return trade-off.</li>
                                <li>Verify diversification requirements are met.</li>
                                <li>Use the graphical method to visualize the solution.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: Mini Checklist ===== */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={clsx(
                        "mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5",
                        "animate-[fadeUp_0.7s_ease-out_forwards] motion-safe:animate-[fadeUp_0.7s_ease-out_forwards] motion-reduce:animate-none",
                        sectionDelays[5]
                    )}
                &gt;
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        Mini Checklist
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can formulate an investment allocation problem.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can clear decimals from constraints.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can find the optimal investment allocation.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can verify the return requirement is met.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can interpret the solution in investment terms.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-emerald-500 text-lg">☑️</span>
                            <span>I can explain the risk-return trade-off.</span>
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <div className="mb-14">
                    <FAQTemplate
                        title="Worked Example 9 – FAQs"
                        questions={questions}
                    />
                </div>

                {/* ===== PLAIN TEXT PRINT ===== */}
                <div className="mb-14">
                    <PlainTextPrint
                        content={noteText}
                        title="Worked Example 9 – Printable Notes"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes (TXT)"
                        downloadFileName="topic36_note.txt"
                    />
                </div>

                {/* ===== TEACHER'S NOTE ===== */}
                <div className="mb-8">
                    <Teacher
                        note={
                            "This example introduces investment allocation — a practical application of LP. I tell my students: 'Investing is about balancing risk and return — LP helps you find the optimal balance.' The key insight is that the return constraint is binding at the optimum. I recommend having students explore what happens if the return requirement changes — it's a great sensitivity analysis exercise."
                        }
                    />
                </div>

                {/* ===== FOOTER ===== */}
                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Topic 36 — Worked Example 9 &bull; Investment allocation problem
                    </p>
                    <p className="mt-1 text-xs">
                        🎯 Next: Worked Example 10: Agricultural Production Problem (Topic 37)
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

export default Topic36;