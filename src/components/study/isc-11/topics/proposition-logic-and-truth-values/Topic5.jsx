// src/components/study/isc/class11/logic/Topic5.jsx
// Topic 6: Truth Values – True & False
// React 19 – CLASS-BASED COMPONENT ONLY
// Tailwind CSS – ZERO CONFIG, NO PLUGINS, NO EXTERNAL ANIMATION LIBRARIES

import React, { Component } from "react";
import { AlertTriangle, CheckCircle2, HelpCircle, Lightbulb } from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic5 extends Component {
    constructor(props) {
        super(props);
        this.state = { mounted: false };
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    render() {

        const reveal = this.state.mounted
            ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
            : "opacity-0";

        const card = "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300";

        return (
            <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
                <style>{animationStyles}</style>

                {/* Header */}
                <div className={reveal}>
                    <h1 className="text-3xl font-semibold mb-4">Truth Values – True & False</h1>
                    <p className="text-lg">
                        Every proposition must evaluate to exactly one of two values:
                        <strong> True (T)</strong> or <strong> False (F)</strong>. This binary nature
                        is the foundation of all logical reasoning and computer decision making.
                    </p>
                </div>

                {/* Concept Explanation */}
                <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
                    <div className={card}>
                        <h2 className="text-xl font-semibold mb-2">🔍 What is a Truth Value?</h2>
                        <p>
                            A <strong>truth value</strong> indicates whether a proposition is true or false.
                        </p>
                        <p className="mt-3">
                            Example: <br />
                            “Barrackpore is in West Bengal.” → True <br />
                            “7 is an even number.” → False
                        </p>
                    </div>

                    <div className={card}>
                        <h2 className="text-xl font-semibold mb-2">🎯 Purpose</h2>
                        <p>
                            Computers internally convert every condition into True or False before
                            executing commands such as <em>if-else</em> statements.
                        </p>
                    </div>
                </div>

                {/* ISC Pattern Question */}
                <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
                    <div className={card}>
                        <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
                        <p>
                            State the truth value of: <br />
                            <strong>“Ichapur is near Barrackpore.”</strong>
                        </p>
                        <p className="mt-2 text-emerald-600 dark:text-emerald-400">
                            Answer: True
                        </p>
                    </div>
                </div>

                {/* Professional Insight */}
                <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
                    <div className={`${card} border-l-4 border-indigo-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <Lightbulb size={20} /> Professional Insight
                        </h2>
                        <p>
                            When a developer writes:
                            <code className="mx-1 bg-slate-200 dark:bg-slate-800 px-1 rounded">if(score >= 40)</code>
                            — the condition is first evaluated to True or False before the program moves ahead.
                        </p>
                    </div>
                </div>

                {/* Additional ISC Pattern Questions */}
                <div className={`mt-12 ${reveal} animation-delay-[420ms]`}>
                    <div className={card}>
                        <h2 className="text-xl font-semibold mb-3">📘 ISC Pattern – Practice Questions</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>State the truth value of: <strong>“29 is a prime number.”</strong></li>
                            <li>State whether the following has a truth value and justify: <strong>“Please open the window.”</strong></li>
                            <li>Write the truth value of: <strong>“Ichapur is south of Barrackpore.”</strong></li>
                            <li>Is the sentence <strong>“How are you?”</strong> a proposition? Give reason.</li>
                            <li>State the truth value of: <strong>“A square has four sides.”</strong></li>
                            <li>Write T or F: <strong>“7 is divisible by 3.”</strong></li>
                        </ol>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div className={`mt-12 ${reveal} animation-delay-[480ms]`}>
                    <div className={`${card} border-l-4 border-amber-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <AlertTriangle size={20} /> Common Pitfalls
                        </h2>
                        <ul className="list-disc pl-5">
                            <li>Assuming every sentence has a truth value.</li>
                            <li>Using questions or commands.</li>
                            <li>Confusing opinion statements as logical truth.</li>
                        </ul>
                    </div>
                </div>

                {/* Hint */}
                <div className={`mt-12 ${reveal} animation-delay-[600ms]`}>
                    <div className={`${card} border-l-4 border-sky-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <HelpCircle size={20} /> Hint
                        </h2>
                        <p>
                            Think about whether the statement can be verified in the real world.
                            If yes, it has a truth value.
                        </p>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className={`mt-12 ${reveal} animation-delay-[720ms]`}>
                    <div className={`${card} border-l-4 border-emerald-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <CheckCircle2 size={20} /> Mini Checklist
                        </h2>
                        <ul className="list-disc pl-5">
                            <li>Is the sentence declarative?</li>
                            <li>Can it be verified as True or False?</li>
                            <li>Does it avoid emotional or command words?</li>
                        </ul>
                    </div>
                </div>

            </section>
        );
    }
}
