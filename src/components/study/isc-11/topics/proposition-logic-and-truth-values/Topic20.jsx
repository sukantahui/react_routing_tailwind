// src/components/study/isc/class11/logic/Topic20.jsx
// Topic 21: Revision & Mixed Practice on Propositional Logic
// React 19 – CLASS-BASED COMPONENT ONLY
// Tailwind CSS – ZERO CONFIG, NO PLUGINS, NO EXTERNAL ANIMATION LIBRARIES

import React, { Component } from "react";
import { AlertTriangle, CheckCircle2, HelpCircle, Lightbulb, ClipboardList } from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic20 extends Component {
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

        const card =
            "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300";

        return (
            <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
                <style>{animationStyles}</style>

                {/* Header */}
                <div className={reveal}>
                    <h1 className="text-3xl font-semibold mb-4">
                        Revision & Mixed Practice on Propositional Logic
                    </h1>
                    <p className="text-lg">
                        This chapter ties together everything you have learned about propositions,
                        connectives, truth tables, tautology, contradiction and word problems.
                    </p>
                </div>

                {/* Revision Snapshot */}
                <div className={`mt-10 ${reveal} animation-delay-[120ms]`}>
                    <div className={`${card} border-l-4 border-indigo-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <ClipboardList size={20} /> Quick Revision Snapshot
                        </h2>
                        <div>
                            <ul className="list-disc pl-5">
                                <li>Proposition must have a truth value.</li>
                                <li>Use p, q, r to represent statements.</li>
                                <li>NOT, AND, OR are the basic connectives.</li>
                                <li>Truth tables validate expressions.</li>
                                <li>Tautology = Always True, Contradiction = Always False.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Mixed Questions */}
                <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
                    <div className={card}>
                        <h2 className="text-xl font-semibold mb-3">📘 Mixed Practice Questions</h2>
                        <div className="space-y-2">
                            <p>1. Is the sentence “Is the lab open?” a proposition? Give reason.</p>
                            <p>2. Let p: “Swadeep is present.” Write the negation of p.</p>
                            <p>3. Find truth value of p ∧ q if p is True and q is False.</p>
                            <p>4. Write symbolic form: “The train is late or the exam is postponed.”</p>
                            <p>5. Construct truth table for p ∨ ¬p.</p>
                            <p>6. Identify whether p ∧ ¬p is tautology or contradiction.</p>
                            <p>7. State whether “Barrackpore is in Kolkata” is True or False.</p>
                            <p>8. Write symbolic form: “Abhronila is present and the lab is closed.”</p>
                        </div>
                    </div>
                </div>

                {/* Answers Section */}
                <div className={`mt-12 ${reveal} animation-delay-[300ms]`}>
                    <div className={`${card} border-l-4 border-emerald-500`}>
                        <h2 className="text-xl font-semibold mb-3">✅ Answers</h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>1.</strong> Not a proposition – it is a question, has no truth value.</p>
                            <p><strong>2.</strong> ¬p : “Swadeep is not present.”</p>
                            <p><strong>3.</strong> p ∧ q = F (True ∧ False = False).</p>
                            <p><strong>4.</strong> Let p: “The train is late”, q: “The exam is postponed” → p ∨ q.</p>
                            <p><strong>5.</strong> p ∨ ¬p is always True → it is a tautology.</p>
                            <p><strong>6.</strong> p ∧ ¬p is a contradiction.</p>
                            <p><strong>7.</strong> False – Barrackpore is not in Kolkata.</p>
                            <p><strong>8.</strong> Let p: “Abhronila is present”, q: “The lab is closed” → p ∧ q.</p>
                        </div>
                    </div>
                </div>

                {/* Professional Insight */}
                <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
                    <div className={`${card} border-l-4 border-indigo-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <Lightbulb size={20} /> Professional Insight
                        </h2>
                        <p>
                            Every software condition — from login validation to exam eligibility —
                            is built on the same logic you learned here.
                        </p>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div className={`mt-12 ${reveal} animation-delay-[480ms]`}>
                    <div className={`${card} border-l-4 border-amber-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <AlertTriangle size={20} /> Common Pitfalls
                        </h2>
                        <div>
                            <ul className="list-disc pl-5">
                                <li>Skipping truth tables.</li>
                                <li>Confusing OR with AND.</li>
                                <li>Forgetting to define variables.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Hint */}
                <div className={`mt-12 ${reveal} animation-delay-[600ms]`}>
                    <div className={`${card} border-l-4 border-sky-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <HelpCircle size={20} /> Hint
                        </h2>
                        <p>
                            Treat every sentence like a program condition — it must return True or False.
                        </p>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className={`mt-12 ${reveal} animation-delay-[720ms]`}>
                    <div className={`${card} border-l-4 border-emerald-400`}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                            <CheckCircle2 size={20} /> Mini Checklist
                        </h2>
                        <div>
                            <ul className="list-disc pl-5">
                                <li>Can I identify propositions?</li>
                                <li>Can I write symbolic forms?</li>
                                <li>Can I evaluate truth tables?</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}
