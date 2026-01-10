import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";
import {
    Layers,
    AlertTriangle,
    CheckCircle,
    Lightbulb,
    HelpCircle,
    BookOpen,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic0 extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ visible: true }), 120);
    }

    render() {
        return (
            <div className="space-y-12 leading-relaxed text-slate-700 dark:text-slate-200">
                <style>{animationStyles}</style>

                {/* ================= TITLE ================= */}
                {/* ================= TEACHER MINDSET ================= */}
                <section className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-indigo-500">
                        How to Think About import (Teacher’s Explanation)
                    </h2>
                    <p className="mt-2">
                        Beginners try to write everything inside one file. This works only for
                        very small programs. As soon as your program grows, it becomes fragile.
                    </p>
                    <p className="mt-2">
                        Professional programmers store related logic in <b>separate files</b>
                        and use <code>import</code> to connect them — exactly like using tools
                        from different cupboards in a classroom.
                    </p>
                </section>

                <section
                    className={`p-6 rounded-2xl bg-white dark:bg-slate-900 shadow transition-all duration-300 hover:shadow-xl ${this.state.visible &&
                        "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
                        }`}
                >
                    <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-300">
                        Topic 1 – import & from-import in Python
                    </h1>
                    <p className="mt-3">
                        Large Python applications are built using many small files. The
                        <b> import system</b> connects those files and allows you to reuse
                        code instead of rewriting it again and again.
                    </p>
                </section>

                {/* ================= THEORY ================= */}
                <section className="grid md:grid-cols-2 gap-6">
                    {[
                        {
                            title: "What is import?",
                            text:
                                "import loads the entire module as a single object. You must access its members using the module name.",
                        },
                        {
                            title: "What is from-import?",
                            text:
                                "from-import extracts only specific items and places them directly into the current program namespace.",
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl transition-all duration-300 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]"
                        >
                            <h3 className="font-semibold text-emerald-500">{card.title}</h3>
                            <p className="mt-2">{card.text}</p>
                        </div>
                    ))}
                </section>

                {/* ================= BASIC EXAMPLE ================= */}
                <section className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-sky-500 flex gap-2 items-center">
                        <BookOpen size={20} /> Basic import
                    </h2>

                    <EditablePythonCodeBlock
                        title="Using import"
                        initialCode={`import math

print(math.sqrt(49))
print(math.factorial(5))`}
                    />
                </section>

                {/* ================= FROM IMPORT ================= */}
                <section className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-indigo-500 flex gap-2 items-center">
                        <Layers size={20} /> Using from-import
                    </h2>

                    <EditablePythonCodeBlock
                        title="Selective import"
                        initialCode={`from math import sqrt, factorial

print(sqrt(81))
print(factorial(6))`}
                    />
                </section>

                {/* ================= REAL WORLD ================= */}
                <section className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-sky-500">
                        Real-World Scenario
                    </h2>

                    <EditablePythonCodeBlock
                        title="tax.py"
                        initialCode={`def calculate_gst(amount):
    return amount + (amount * 0.18)`}
                    />

                    <EditablePythonCodeBlock
                        title="main.py"
                        initialCode={`import tax
total = tax.calculate_gst(5000)
print("Total amount with GST =", total)`}
                    />
                </section>

                {/* ================= WHY from-import IS DANGEROUS ================= */}
                <section className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-amber-600">
                        Why from-import Must Be Used Carefully
                    </h2>
                    <p className="mt-2">
                        When you write <code>from tax import calculate_gst</code>, Python forgets
                        where the function came from. If another file also has a function with
                        the same name, your program becomes confusing and error-prone.
                    </p>
                </section>

                {/* ================= GLOSSARY ================= */}
                <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-sky-500">
                        Glossary — module
                    </h2>

                    <blockquote className="mt-3 p-4 border-l-4 border-sky-500 bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 italic">
                        An object that serves as an organizational unit of Python code.
                        Modules have a namespace containing arbitrary Python objects.
                        Modules are loaded into Python by the process of importing.
                    </blockquote>

                    <p className="mt-4 text-sm text-slate-300">
                        In simple words, a <b>module is not just a file</b>.
                        When Python imports a file, it turns that file into a <b>live object in memory</b>.
                        This object stores all functions, variables and classes defined inside it.
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                        That is why we write:
                        <code className="mx-1 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                            tax.calculate_gst(5000)
                        </code>
                        — because <b>tax</b> is now an object with its own namespace.
                    </p>
                </section>



                {/* ================= COMMON PITFALLS ================= */}
                <section className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-rose-500 flex gap-2 items-center">
                        <AlertTriangle size={20} /> Common Pitfalls
                    </h2>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Using sqrt() instead of math.sqrt()</li>
                        <li>Using from module import * blindly</li>
                        <li>Importing inside loops unnecessarily</li>
                        <li>File name conflicts like math.py</li>
                    </ul>
                </section>

                {/* ================= BEST PRACTICES ================= */}
                <section className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-emerald-500 flex gap-2 items-center">
                        <CheckCircle size={20} /> Best Practices
                    </h2>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Keep imports at the top of the file</li>
                        <li>Avoid wildcard imports</li>
                        <li>Use meaningful module names</li>
                    </ul>
                </section>

                {/* ================= HINT ================= */}
                <section className="p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-yellow-600 flex gap-2 items-center">
                        <HelpCircle size={20} /> Hint
                    </h2>
                    <p>
                        Observe carefully… what happens if two imported modules define the
                        same function name?
                    </p>
                </section>

                {/* ================= TEACHER NOTE ================= */}
                <section className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold flex gap-2 items-center">
                        <Lightbulb size={20} /> Teacher’s Note
                    </h2>
                    <p className="mt-2">
                        Once students understand import properly, their programs naturally
                        become modular, readable, and professional.
                    </p>
                </section>

                {/* ================= EXPLORE MORE ================= */}
                <section className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-900/20 shadow hover:shadow-xl transition-all duration-300">
                    <h3 className="text-lg font-semibold text-sky-500">
                        Explore More (Official Python Documentation)
                    </h3>

                    <p className="mt-2 text-sm text-slate-300">
                        Learn directly from Python’s official source about what a <b>module</b> is
                        and how it works internally.
                    </p>

                    <a
                        href="https://docs.python.org/3/search.html?q=module"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm hover:bg-sky-700 transition-all duration-300"
                    >
                        🔍 Explore Module in Official Docs
                    </a>
                </section>
            </div>


        );
    }
}
