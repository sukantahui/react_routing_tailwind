import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';

const Topic0 = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

                {/* Header Section */}
                <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Concept of Process in Unix
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-indigo-500 pl-4">
                        From program to living entity — understanding what makes a process the heartbeat of Unix systems.
                    </p>
                </div>

                {/* Core Definition + Real World */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s_forwards] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s_forwards] opacity-1">
                        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-indigo-500">✦</span> What is a Process?</h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                                A <strong className="text-indigo-600 dark:text-indigo-400">process</strong> is a program in execution. It's not just code — it's the living instance that includes:
                            </p>
                            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                                <li>Program counter (next instruction)</li>
                                <li>CPU registers & stack</li>
                                <li>Data section (global variables)</li>
                                <li>Heap (dynamically allocated memory)</li>
                                <li>File descriptors & environment</li>
                            </ul>
                            <p className="mt-4 text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                💡 <span className="font-mono">ls -l</span> is a program — when you run it, the OS creates a process with PID (Process ID).
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
                        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-green-500">🌍</span> Real-world Analogy</h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                                Imagine <strong>Swadeep</strong> wants to cook a recipe (program) from a cookbook. The recipe is static (program). When Swadeep follows it — with ingredients, pans, fire — that cooking session is a <strong>process</strong>. If <strong>Tuhina</strong> also cooks the same recipe simultaneously, two separate processes exist. The OS in Barrackpore’s computer lab manages hundreds of such “cooking sessions” smoothly.
                            </p>
                            <div className="mt-4 border-l-4 border-green-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                                "A program is a passive collection of instructions; a process is an active execution with its own state."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Process Attributes & PCB */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
                        <h3 className="text-xl font-semibold flex gap-2 items-center">🏷️ Process Attributes</h3>
                        <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
                            <li><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">PID</span> – unique Process ID</li>
                            <li><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">PPID</span> – parent process ID</li>
                            <li><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">UID/EUID</span> – user / effective user</li>
                            <li><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Priority & nice value</span></li>
                            <li><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Memory map & open files</span></li>
                        </ul>
                    </div>
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.3s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.3s]">

                        <h3 className="text-xl font-semibold">
                            📦 Process Control Block (PCB)
                        </h3>

                        <p className="mt-2">
                            Kernel stores all metadata about a process in a PCB — a C{" "}
                            <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
                                struct task_struct
                            </code>{" "}
                            in Linux. Contains process state, registers, scheduling info, and pointers.
                        </p>

                        <div className="mt-3 text-xs bg-white dark:bg-gray-900 p-3 rounded border font-mono overflow-x-auto">
                            <pre>
                                {`struct task_struct {
                                pid_t pid;
                                volatile long state;
                                struct mm_struct *mm; // memory
                                ...
                                }`}
                            </pre>
                        </div>

                    </div>
                </div>

                {/* Program vs Process Table */}
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 animate-[fade-slide-up_0.6s_ease-out_0.35s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.35s] shadow-sm hover:shadow-md transition">
                    <h3 className="text-2xl font-semibold text-center mb-4">📖 Program vs Process — Key Differences</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-200 dark:bg-gray-700">
                                <tr><th className="p-3 border">Program</th><th className="p-3 border">Process</th></tr>
                            </thead>
                            <tbody>
                                <tr className="border-b"><td className="p-3">Passive entity stored on disk</td><td className="p-3">Active entity in RAM + CPU</td></tr>
                                <tr className="border-b"><td className="p-3">No PID / resources</td><td className="p-3">Has PID, state, registers, memory</td></tr>
                                <tr className="border-b"><td className="p-3">Single copy can run many processes</td><td className="p-3">Each process isolated (mostly)</td></tr>
                                <tr><td className="p-3">Example: <code>/bin/bash</code></td><td className="p-3">Each terminal session runs bash process</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* SVG — Process Memory Layout (interactive) */}
                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.4s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.4s]">
                    <h3 className="text-xl font-semibold text-center mb-2">🧠 Process Memory Layout</h3>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">Hover on the regions to see their role</p>
                    <div className="flex justify-center">
                        <svg width="320" height="400" viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                            <defs>
                                <filter id="glow"><feGaussianBlur stdDeviation="1.5" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                            </defs>
                            {/* Text Section */}
                            <g className="hover:brightness-110 transition-all duration-300 cursor-pointer">
                                <rect x="40" y="20" width="240" height="50" fill="#6366f1" fillOpacity="0.8" rx="6" className="transition-all hover:fill-opacity-100" />
                                <text x="160" y="50" textAnchor="middle" fill="white" fontWeight="bold">Text (Code)</text>
                                <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                                <title>Read-only machine instructions</title>
                            </g>
                            {/* Data */}
                            <rect x="40" y="80" width="240" height="40" fill="#10b981" fillOpacity="0.7" rx="6" className="hover:fill-opacity-100 transition-all">
                                <title>Initialized/Uninitialized data</title>
                                <animate attributeName="height" values="40;44;40" dur="4s" repeatCount="indefinite" />
                            </rect>
                            <text x="160" y="105" textAnchor="middle" fill="white" fontWeight="bold">Data (globals)</text>
                            {/* Heap */}
                            <rect x="40" y="130" width="240" height="100" fill="#f59e0b" fillOpacity="0.7" rx="6" className="hover:fill-opacity-100 transition-all">
                                <title>Dynamic memory (malloc, new)</title>
                            </rect>
                            <text x="160" y="180" textAnchor="middle" fill="white" fontWeight="bold">Heap (grows upward)</text>
                            {/* Stack */}
                            <rect x="40" y="280" width="240" height="100" fill="#ef4444" fillOpacity="0.7" rx="6" className="hover:fill-opacity-100 transition-all">
                                <title>Function calls, local vars, return addresses</title>
                            </rect>
                            <text x="160" y="330" textAnchor="middle" fill="white" fontWeight="bold">Stack (grows downward)</text>
                            <text x="160" y="260" textAnchor="middle" fill="#6b7280" fontSize="12">↑ free memory ↓</text>
                        </svg>
                    </div>
                    <div className="text-center text-xs mt-2 text-gray-500 dark:text-gray-400">Each process gets a virtual address space with these segments.</div>
                </div>

                {/* System Call Prototypes */}
                <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.45s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.45s]">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-5 rounded-2xl border-l-8 border-indigo-500">
                        <h4 className="font-mono font-bold">getpid() / getppid()</h4>
                        <p className="text-sm mt-1"><span className="font-semibold">Prototype:</span> <code>pid_t getpid(void); pid_t getppid(void);</code></p>
                        <p><span className="font-semibold">Return:</span> PID of current process / parent PID</p>
                        <p><span className="font-semibold">Purpose:</span> Identify process for logging, signaling, or resource tracking.</p>
                        <p className="text-xs italic mt-2">Why? When Swadeep's script needs to identify itself in logs.</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-2xl border-l-8 border-green-500">
                        <h4 className="font-mono font-bold">ps / top (userspace tools)</h4>
                        <p className="text-sm mt-1"><code>ps aux | grep bash</code> — list active processes.</p>
                        <p>Concept: These read <code>/proc/</code> filesystem where kernel exposes process information.</p>
                    </div>
                </div>

                {/* Tips & Tricks + Hint */}
                <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.5s]">
                    <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">💎 Professional Tips</div>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>Use <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">pstree -p</code> to visualize parent-child hierarchy.</li>
                            <li><code>pidof process_name</code> returns PID quickly.</li>
                            <li>Always store PID in a variable for safety in scripts: <code>mypid=$$</code></li>
                            <li>Check <code>/proc/[pid]/status</code> for deep process details.</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold">🤔 Hint Section — Think about…</div>
                        <p className="mt-2 text-sm">Why can two different users run the same binary (like <code>/usr/bin/vim</code>) and each have separate memory spaces? How does the OS prevent them from interfering? </p>
                        <p className="mt-1 text-xs">Try changing: run <code>sleep 1000 &</code> in background and inspect <code>/proc/$!/maps</code> — observe the memory layout.</p>
                    </div>
                </div>

                {/* Common Mistakes / Best Practices */}
                <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
                    <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
                        <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">⚠️ Common Pitfalls</h4>
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                            <li>"A program and process are same" — confusion leads to debugging mistakes.</li>
                            <li>Assuming a process can't be created except by fork() — but also <code>exec()</code> variants.</li>
                            <li>Ignoring environment variables: child processes inherit them, causing subtle bugs.</li>
                        </ul>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
                        <h4 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">✅ Best Practices</h4>
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                            <li>Name processes meaningfully via <code>prctl(PR_SET_NAME)</code> or <code>execv</code>.</li>
                            <li>Monitor process limits: <code>ulimit -a</code> before development.</li>
                            <li>Always check return values of fork/wait to avoid orphan/zombie states (future topics).</li>
                        </ul>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.6s]">
                    <h3 className="font-bold text-lg">✅ Student Mini-Checklist — "I understand process concept when..."</h3>
                    <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
                        <div className="flex items-center gap-2"><span className="text-green-500">☑</span> Can explain difference between program & process</div>
                        <div className="flex items-center gap-2"><span className="text-green-500">☑</span> Know what PID and PPID represent</div>
                        <div className="flex items-center gap-2"><span className="text-green-500">☑</span> Able to list processes using ps/top</div>
                        <div className="flex items-center gap-2"><span className="text-green-500">☑</span> Describe memory layout (text, data, heap, stack)</div>
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQTemplate title="Concept of Process in Unix" questions={questions} />

                {/* Teacher's Note */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.65s]">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">👨‍🏫</div>
                        <div>
                            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">Teacher's Note</h3>
                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
                            <p className="mt-3 leading-relaxed">
                                “From my years teaching OS at Barrackpore & Shyamnagar, the leap from program to process is where true systems thinking starts.
                                <strong>Debangshu</strong> once debugged a script for hours thinking program crashed — but actually it was a zombie process (Topic 7 later).
                                Always emphasize: <span className="bg-yellow-200 dark:bg-yellow-800 px-1">every running command is a process with its own memory prison</span>.
                                Use <code>htop</code> or <code>vmstat</code> to visually associate theory with real execution.”
                            </p>
                            <p className="mt-2 text-xs opacity-80">Remember: Processes are the living embodiment of your code — respect their lifecycle.</p>
                        </div>
                    </div>
                </div>

                {/* hidden style for custom keyframes */}
                <style>{`
          @keyframes fade-slide-up {
            0% { opacity: 0.7; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-\\[fade-slide-up.*\\] { animation: none !important; opacity: 1 !important; transform: none !important; }
          }
        `}</style>
            </div>
        </div>
    );
};

export default Topic0;