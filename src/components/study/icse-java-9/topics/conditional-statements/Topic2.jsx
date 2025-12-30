// src/components/study/java-core/control-flow/Topic2.jsx
// Topic 3: else-if Ladder
// React 19 – CLASS BASED COMPONENT
// Tailwind CSS – ZERO CONFIG

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";
import { Lightbulb, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0%{opacity:0; transform:translateY(20px);}
  100%{opacity:1; transform:translateY(0);}
}
`;

export default class Topic2 extends Component {
    constructor(props) {
        super(props);
        this.state = { mounted: false };
    }
    componentDidMount() { this.setState({ mounted: true }); }

    render() {
        const reveal = this.state.mounted
            ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
            : "opacity-0";

        const card =
            "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white/80 dark:bg-slate-900/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300";

        return (
            <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
                <style>{animationStyles}</style>

                <h1 className={`text-3xl font-semibold text-slate-900 dark:text-white mb-6 ${reveal}`}>
                    Java Control Flow – else-if Ladder
                </h1>

                {/* ===== THEORY ===== */}
                <div className={`${card} mb-10 ${reveal} animation-delay-[120ms]`}>
                    <p>
                        The <strong>else-if ladder</strong> is used when more than two decisions
                        are required. The program evaluates conditions from top to bottom
                        and executes the <strong>first true block</strong> only.
                    </p>
                    <p className="mt-2">
                        Example: Grading system in Barrackpore school — Distinction, First,
                        Second, Fail — all based on ranges of marks.
                    </p>
                </div>

                {/* ===== COMPLETE else-if LADDER FLOW SVG ===== */}
                <div className={`${card} mb-10 flex justify-center ${reveal} animation-delay-[240ms]`}>
                    <svg viewBox="0 0 560 380" className="w-full max-w-xl group">

                        {/* START */}
                        <rect x="230" y="10" width="100" height="36" rx="6"
                            className="fill-sky-200 dark:fill-sky-900" />
                        <text x="280" y="33" textAnchor="middle">Start</text>

                        {/* CONDITION 1 */}
                        <polygon points="280,60 340,100 280,140 220,100"
                            className="fill-amber-200 dark:fill-amber-900" />
                        <text x="280" y="105" textAnchor="middle" className="text-xs">marks ≥ 75?</text>

                        {/* CONDITION 2 */}
                        <polygon points="280,150 340,190 280,230 220,190"
                            className="fill-amber-200 dark:fill-amber-900" />
                        <text x="280" y="195" textAnchor="middle" className="text-xs">marks ≥ 60?</text>

                        {/* CONDITION 3 */}
                        <polygon points="280,240 340,280 280,320 220,280"
                            className="fill-amber-200 dark:fill-amber-900" />
                        <text x="280" y="285" textAnchor="middle" className="text-xs">marks ≥ 40?</text>

                        {/* ACTION BLOCKS */}
                        <rect x="40" y="95" width="130" height="30" rx="6"
                            className="fill-emerald-200 dark:fill-emerald-900" />
                        <text x="105" y="115" textAnchor="middle">Distinction</text>

                        <rect x="40" y="185" width="130" height="30" rx="6"
                            className="fill-sky-200 dark:fill-sky-900" />
                        <text x="105" y="205" textAnchor="middle">First Class</text>

                        <rect x="40" y="275" width="130" height="30" rx="6"
                            className="fill-teal-200 dark:fill-teal-900" />
                        <text x="105" y="295" textAnchor="middle">Pass</text>

                        <rect x="390" y="275" width="130" height="30" rx="6"
                            className="fill-rose-200 dark:fill-rose-900" />
                        <text x="455" y="295" textAnchor="middle">Fail</text>

                        {/* FLOW LINES */}
                        <line x1="280" y1="46" x2="280" y2="60" stroke="black" />
                        <line x1="220" y1="100" x2="170" y2="110" stroke="black" />
                        <line x1="220" y1="190" x2="170" y2="200" stroke="black" />
                        <line x1="220" y1="280" x2="170" y2="290" stroke="black" />
                        <line x1="340" y1="280" x2="390" y2="290" stroke="black" />

                    </svg>
                </div>


                {/* ===== EXAMPLE 1 ===== */}
                <div className={`${card} mb-8 ${reveal} animation-delay-[360ms]`}>
                    <h3 className="font-medium mb-2">Example 1 – Grading System</h3>
                    <JavaCodeBlock code={`int marks = 68;

if(marks >= 75){
  System.out.println("Distinction");
}
else if(marks >= 60){
  System.out.println("First Class");
}
else if(marks >= 40){
  System.out.println("Pass");
}
else{
  System.out.println("Fail");
}`} />
                </div>

                {/* ===== EXAMPLE 2 ===== */}
                <div className={`${card} mb-8 ${reveal} animation-delay-[480ms]`}>
                    <h3 className="font-medium mb-2">Example 2 – Temperature Alert at Shyamnagar</h3>
                    <JavaCodeBlock code={`int temp = 42;

if(temp > 40){
  System.out.println("Heat Alert");
}
else if(temp > 30){
  System.out.println("Warm Day");
}
else if(temp > 20){
  System.out.println("Pleasant Weather");
}
else{
  System.out.println("Cold Day");
}`} />
                </div>

                {/* ===== EXAMPLE 3 ===== */}
                <div className={`${card} mb-10 ${reveal} animation-delay-[600ms]`}>
                    <h3 className="font-medium mb-2">Example 3 – Attendance Category</h3>
                    <JavaCodeBlock code={`int attendance = 82;

if(attendance >= 90){
  System.out.println("Excellent");
}
else if(attendance >= 75){
  System.out.println("Good");
}
else if(attendance >= 60){
  System.out.println("Average");
}
else{
  System.out.println("Poor");
}`} />
                </div>

                {/* ===== HINT ===== */}
                <div className={`${card} mb-8 ${reveal} animation-delay-[720ms]`}>
                    <h2 className="flex items-center gap-2"><Lightbulb size={18} /> Hint</h2>
                    <p>
                        Observe carefully how conditions must be written in descending order.
                        Try changing the order and see the wrong result.
                    </p>
                </div>

                {/* ===== PITFALLS ===== */}
                <div className={`${card} mb-8 ${reveal} animation-delay-[840ms]`}>
                    <h2 className="flex items-center gap-2"><AlertTriangle size={18} /> Common Pitfalls</h2>
                    <ul className="list-disc pl-5">
                        <li>Placing smaller conditions before larger ones.</li>
                        <li>Forgetting final else block.</li>
                        <li>Overlapping ranges.</li>
                    </ul>
                </div>

                {/* ===== CHECKLIST ===== */}
                <div className={`${card} mb-8 ${reveal} animation-delay-[960ms]`}>
                    <h2 className="flex items-center gap-2"><CheckCircle2 size={18} /> Mini Checklist</h2>
                    <ul className="list-disc pl-5">
                        <li>Conditions ordered properly</li>
                        <li>No overlapping ranges</li>
                        <li>Default else present</li>
                    </ul>
                </div>

                {/* ===== TEACHER NOTE ===== */}
                <div className={`${card} border-l-4 border-sky-400 ${reveal} animation-delay-[1080ms]`}>
                    <h2 className="font-medium mb-1">Teacher’s Note</h2>
                    <p>
                        else-if ladder must be practiced using grading, temperature,
                        attendance — not just numbers — that is how logic matures.
                    </p>
                </div>

            </section>
        );
    }
}
