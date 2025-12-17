import React, { Component } from "react";
import {
    Monitor,
    Keyboard,
    Terminal,
    Puzzle,
    GitBranch,
    Zap,
    ShieldCheck,
    Brain,
} from "lucide-react";

export default class VSCodeUltraExpertGuide extends Component {
    render() {
        return (
            <div className="min-h-screen bg-gray-950 text-slate-200">
                <div className="max-w-5xl mx-auto space-y-16">

                    {/* ================= HEADER ================= */}
                    <header className="space-y-3">
                        <h2 className="flex items-center gap-2 text-2xl font-semibold text-sky-300">
                            <Monitor size={22} />
                            VS Code — Ultra Expert Developer Guide
                        </h2>

                        <p className="text-slate-400 text-sm max-w-4xl">
                            This guide trains students to think and work like a professional
                            software developer using Visual Studio Code — regardless of
                            programming language or academic board.
                        </p>
                    </header>

                    {/* ================= STEP 1 ================= */}
                    <section className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                            <Brain size={18} />
                            Step 1: Developer Mindset (Before Touching the Keyboard)
                        </h3>

                        <p className="text-slate-300 text-sm leading-relaxed">
                            VS Code is not “software you open to type code”.
                            It is a <b>workspace where thinking happens</b>.
                        </p>

                        <ul className="list-disc pl-6 text-sm text-slate-400 space-y-1">
                            <li>Code is written → but thinking happens before</li>
                            <li>Files are organized → not scattered</li>
                            <li>Errors are normal → panic is not</li>
                        </ul>

                        <p className="text-emerald-300 text-sm">
                            👩‍🏫 Mentor Note: Smart coders solve problems, not syntax.
                        </p>
                    </section>

                    {/* ================= STEP 2 ================= */}
                    <section className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                            <Keyboard size={18} />
                            Step 2: Keyboard-First Habit (Speed = Confidence)
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
                                <p className="text-slate-200 text-sm font-medium mb-2">
                                    Must-Know Shortcuts
                                </p>
                                <ul className="text-sm text-slate-400 space-y-1">
                                    <li><b>Ctrl + P</b> → Jump to any file</li>
                                    <li><b>Ctrl + Shift + P</b> → Command Palette</li>
                                    <li><b>Ctrl + `</b> → Open terminal</li>
                                    <li><b>Alt + Click</b> → Multi-cursor editing</li>
                                </ul>
                            </div>

                            <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
                                <p className="text-slate-200 text-sm font-medium mb-2">
                                    Bad Student Habits ❌
                                </p>
                                <ul className="text-sm text-rose-400 space-y-1">
                                    <li>Using mouse for everything</li>
                                    <li>Scrolling instead of searching</li>
                                    <li>Copy-paste without understanding</li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-yellow-300 text-sm">
                            💡 Tip: Speed comes from shortcuts, not intelligence.
                        </p>
                    </section>

                    {/* ================= SHORTCUT TABLE ================= */}
                    <section className="space-y-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                            <Keyboard size={18} />
                            Essential VS Code Shortcuts (Ultra Expert Set)
                        </h3>

                        <p className="text-slate-400 text-sm max-w-4xl">
                            These shortcuts are not optional for professional developers.
                            Mastering them will dramatically improve speed, focus, and confidence.
                        </p>

                        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-slate-800 text-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 border-b border-slate-700">Shortcut</th>
                                        <th className="px-4 py-3 border-b border-slate-700">Action</th>
                                        <th className="px-4 py-3 border-b border-slate-700">Why It Matters</th>
                                    </tr>
                                </thead>

                                <tbody className="text-slate-300">
                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + P</td>
                                        <td className="px-4 py-3">Quick file open</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Instantly jump to any file without using the mouse.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + Shift + P</td>
                                        <td className="px-4 py-3">Command Palette</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Access every VS Code feature from one place.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + `</td>
                                        <td className="px-4 py-3">Toggle terminal</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Run code, commands, and Git without leaving the editor.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Alt + Click</td>
                                        <td className="px-4 py-3">Multi-cursor</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Edit multiple lines at once like a pro.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + D</td>
                                        <td className="px-4 py-3">Select next occurrence</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Rename variables safely and quickly.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + /</td>
                                        <td className="px-4 py-3">Toggle comment</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Comment or uncomment code instantly while debugging.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Alt + ↑ / ↓</td>
                                        <td className="px-4 py-3">Move line up/down</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Reorder logic without cut-paste mistakes.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + B</td>
                                        <td className="px-4 py-3">Toggle sidebar</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Focus mode for deep coding sessions.
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + Shift + P → Wrap with Abbreviation</td>
                                        <td className="px-4 py-3">Wrap selected code with a tag</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Instantly wraps selected code inside div, section, ul, form, etc. using Emmet.
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + D</td>
                                        <td className="px-4 py-3">Select next same word</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Rename or edit multiple occurrences of a word step by step.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Ctrl + Shift + L</td>
                                        <td className="px-4 py-3">Select all same words</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Instantly edit all occurrences of a variable or text.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-slate-800/60">
                                        <td className="px-4 py-3 font-mono">Alt + Click</td>
                                        <td className="px-4 py-3">Manual multi-cursor</td>
                                        <td className="px-4 py-3 text-slate-400">
                                            Place multiple cursors manually for advanced edits.
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <p className="text-emerald-300 text-sm">
                            👩‍🏫 Mentor Note: Professionals don’t memorize shortcuts — they use them daily.
                        </p>
                    </section>


                    {/* ================= STEP 3 ================= */}
                    <section className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                            <Terminal size={18} />
                            Step 3: Terminal = Developer Power
                        </h3>

                        <p className="text-slate-300 text-sm leading-relaxed">
                            Professional developers live inside the terminal.
                            VS Code’s terminal removes fear of commands.
                        </p>

                        <ul className="list-disc pl-6 text-sm text-slate-400 space-y-1">
                            <li>Run programs</li>
                            <li>Install packages</li>
                            <li>Use Git</li>
                            <li>Debug faster</li>
                        </ul>

                        <p className="text-emerald-300 text-sm">
                            👩‍🏫 Mentor Note: If you fear terminal, you are not yet free.
                        </p>
                    </section>

                    {/* ================= STEP 4 ================= */}
                    <section className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                            <Puzzle size={18} />
                            Step 4: Extensions — Power, Not Decoration
                        </h3>

                        <ul className="list-disc pl-6 text-sm text-slate-400 space-y-1">
                            <li>Language support (Java, Python, JS)</li>
                            <li>Linting & formatting</li>
                            <li>Error highlighting</li>
                            <li>Git integration</li>
                        </ul>

                        <p className="text-yellow-300 text-sm">
                            💡 Rule: Install only what improves thinking speed.
                        </p>
                    </section>

                    {/* ================= STEP 5 ================= */}
                    <section className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                            <GitBranch size={18} />
                            Step 5: Git Awareness (Even for Beginners)
                        </h3>

                        <p className="text-slate-300 text-sm leading-relaxed">
                            You don’t need to master Git on day one —
                            but you must understand why it exists.
                        </p>

                        <ul className="list-disc pl-6 text-sm text-slate-400 space-y-1">
                            <li>Track mistakes safely</li>
                            <li>Undo fearlessly</li>
                            <li>Collaborate confidently</li>
                        </ul>
                    </section>

                    {/* ================= STEP 6 ================= */}
                    <section className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                            <Zap size={18} />
                            Step 6: Debugging Like a Pro
                        </h3>

                        <ul className="list-disc pl-6 text-sm text-slate-400 space-y-1">
                            <li>Read error messages slowly</li>
                            <li>Use breakpoints</li>
                            <li>Check assumptions</li>
                            <li>Fix root cause, not symptoms</li>
                        </ul>

                        <p className="text-emerald-300 text-sm">
                            👩‍🏫 Mentor Note: Debugging builds intelligence faster than success.
                        </p>
                    </section>

                    {/* ================= STEP 7 ================= */}
                    <section className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                            <ShieldCheck size={18} />
                            Step 7: Discipline = Ultra Expert Level
                        </h3>

                        <ul className="list-disc pl-6 text-sm text-slate-400 space-y-1">
                            <li>Clean folder structure</li>
                            <li>Meaningful file names</li>
                            <li>Readable code</li>
                            <li>Consistent formatting</li>
                        </ul>

                        <p className="text-sky-300 text-sm">
                            🌟 Final Truth: Tools don’t make coders great — habits do.
                        </p>
                    </section>

                </div>
            </div>
        );
    }
}
