// Topic1.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import lifecycleDemoSh from './topic1_files/lifecycle_demo.sh?raw';
import processChainSh from './topic1_files/process_chain.sh?raw';

const Topic1 = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

                {/* Header Section */}
                <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                        Process Creation & Lifecycle
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-emerald-500 pl-4">
                        From birth to termination – how Unix processes are born, live, and die.
                    </p>
                </div>

                {/* Core Concepts + Real world */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
                        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-emerald-500">🌱</span> How is a Process Created?</h2>
                            <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                                In Unix, every process (except the initial <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">init</code>) is created by another process using the <strong className="text-emerald-600 dark:text-emerald-400">fork()</strong> system call.
                                <code>fork()</code> duplicates the calling process – the parent – to produce a nearly identical child process.
                                The child then often calls <code>exec()</code> to replace its own memory image with a new program.
                            </p>
                            <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                                <code className="block">
                                    {`pid_t pid = fork();
                                        if (pid == 0) {
                                            execlp("ls", "ls", NULL); // child runs ls
                                        } else {
                                            wait(NULL); // parent waits
                                        }`}
                                </code>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">🔍 <em>Swadeep</em> at Barrackpore lab: “fork() creates a clone, like photocopying a letter then editing the copy.”</p>
                        </div>
                    </div>
                    <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
                        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-teal-500">🔄</span> The Process Lifecycle</h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                                A process moves through several states: <strong>New → Ready → Running → Waiting → Terminated</strong>.
                                The OS scheduler moves processes between these states. Understanding this cycle is crucial for debugging and performance tuning.
                            </p>
                            <div className="mt-4 bg-white dark:bg-gray-900 p-3 rounded-lg border">
                                <div className="flex flex-wrap gap-2 text-xs font-mono justify-center">
                                    <span className="bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">New</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="bg-sky-100 dark:bg-sky-900 px-2 py-1 rounded">Ready</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">Running</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="bg-rose-100 dark:bg-rose-900 px-2 py-1 rounded">Waiting</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded">Terminated</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* State Transition Diagram (SVG with animation and hover) */}
                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
                    <h3 className="text-xl font-semibold text-center mb-2">📊 Process State Transition Diagram</h3>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on any state to see its meaning — steps transition automatically</p>
                    <div className="flex justify-center overflow-x-auto">
                        <svg width="700" height="350" viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                            <defs>
                                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill="#4b5563" />
                                </marker>
                                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
                                </filter>
                            </defs>

                            {/* States */}
                            <g className="transition-all duration-300 cursor-pointer hover:drop-shadow-lg">
                                <rect x="30" y="140" width="80" height="50" rx="8" fill="#10b981" fillOpacity="0.8" className="hover:fill-emerald-500 transition">
                                    <animate attributeName="width" values="80;84;80" dur="3s" repeatCount="indefinite" />
                                </rect>
                                <text x="70" y="170" textAnchor="middle" fill="white" fontWeight="bold">NEW</text>
                                <title>Process being created (fork/exec started)</title>
                            </g>

                            <g className="transition-all duration-300 cursor-pointer hover:drop-shadow-lg">
                                <rect x="180" y="140" width="90" height="50" rx="8" fill="#3b82f6" fillOpacity="0.8" className="hover:fill-blue-500 transition">
                                    <animate attributeName="y" values="140;136;140" dur="2.5s" repeatCount="indefinite" />
                                </rect>
                                <text x="225" y="170" textAnchor="middle" fill="white" fontWeight="bold">READY</text>
                                <title>Loaded in memory, waiting for CPU</title>
                            </g>

                            <g className="transition-all duration-300 cursor-pointer hover:drop-shadow-lg">
                                <rect x="330" y="140" width="100" height="50" rx="8" fill="#f59e0b" fillOpacity="0.8" className="hover:fill-amber-500 transition">
                                    <animate attributeName="height" values="50;56;50" dur="2s" repeatCount="indefinite" />
                                </rect>
                                <text x="380" y="170" textAnchor="middle" fill="white" fontWeight="bold">RUNNING</text>
                                <title>Instructions being executed on CPU</title>
                            </g>

                            <g className="transition-all duration-300 cursor-pointer hover:drop-shadow-lg">
                                <rect x="500" y="140" width="95" height="50" rx="8" fill="#ef4444" fillOpacity="0.8" className="hover:fill-red-500 transition">
                                    <animate attributeName="x" values="500;504;500" dur="3.5s" repeatCount="indefinite" />
                                </rect>
                                <text x="547" y="170" textAnchor="middle" fill="white" fontWeight="bold">WAITING</text>
                                <title>Blocked on I/O or event (e.g., reading file)</title>
                            </g>

                            <g className="transition-all duration-300 cursor-pointer hover:drop-shadow-lg">
                                <rect x="180" y="250" width="90" height="50" rx="8" fill="#6b7280" fillOpacity="0.8" className="hover:fill-gray-500 transition">
                                    <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
                                </rect>
                                <text x="225" y="280" textAnchor="middle" fill="white" fontWeight="bold">TERMINATED</text>
                                <title>Released all resources, removed from process table</title>
                            </g>

                            {/* Arrows */}
                            <line x1="110" y1="165" x2="175" y2="165" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="130" y="150" fill="#374151" fontSize="10">fork/exec (admit)</text>

                            <line x1="270" y1="165" x2="325" y2="165" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="285" y="150" fill="#374151" fontSize="10">scheduler dispatch</text>

                            <line x1="430" y1="165" x2="495" y2="165" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="445" y="150" fill="#374151" fontSize="10">I/O or event wait</text>

                            <line x1="545" y1="190" x2="545" y2="215" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4" />
                            <text x="555" y="205" fill="#374151" fontSize="10">I/O complete</text>

                            <line x1="380" y1="190" x2="380" y2="220" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="390" y="210" fill="#374151" fontSize="10">time slice expired</text>

                            {/* from waiting back to ready path */}
                            <path d="M595,190 L620,190 L620,280 L275,280" stroke="#374151" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4" />
                            <text x="630" y="235" fill="#374151" fontSize="10">event completion → ready</text>

                            {/* from running to terminated */}
                            <line x1="410" y1="190" x2="430" y2="250" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="435" y="220" fill="#374151" fontSize="10">exit / kill</text>
                        </svg>
                    </div>
                    <div className="text-center text-xs mt-3 text-gray-500 dark:text-gray-400">Diagram explains how processes change state. The <strong>scheduler</strong> is the traffic cop.</div>
                </div>

                {/* System call prototypes (fork, exec, wait) */}
                <div className="grid md:grid-cols-3 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.35s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.35s]">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-5 rounded-2xl border-l-8 border-emerald-500 transition hover:shadow-md">
                        <h4 className="font-mono font-bold">fork()</h4>
                        <p className="text-sm mt-1"><span className="font-semibold">Prototype:</span> <code>pid_t fork(void);</code></p>
                        <p><span className="font-semibold">Returns:</span> 0 to child, child's PID to parent, -1 on error.</p>
                        <p><span className="font-semibold">Purpose:</span> Create a new process by duplicating the caller.</p>
                        <p className="text-xs italic">Used in almost every server (Apache, bash, etc.)</p>
                    </div>
                    <div className="bg-sky-100 dark:bg-sky-900/30 p-5 rounded-2xl border-l-8 border-sky-500">
                        <h4 className="font-mono font-bold">exec() family</h4>
                        <p className="text-sm mt-1"><code>int execlp(const char *file, const char *arg, ...);</code></p>
                        <p>Replaces current process image with a new program. No return on success.</p>
                        <p className="italic text-xs">Example: <code>execlp("ls", "ls", "-l", NULL);</code></p>
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-5 rounded-2xl border-l-8 border-amber-500">
                        <h4 className="font-mono font-bold">wait() / waitpid()</h4>
                        <p className="text-sm mt-1"><code>pid_t wait(int *status);</code></p>
                        <p>Suspends caller until child terminates, returns child PID and exit status.</p>
                        <p className="italic text-xs">Prevents zombies – essential for lifecycle management.</p>
                    </div>
                </div>

                {/* Shell examples */}
                <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.4s]">
                    <h3 className="text-2xl font-semibold">📜 Practical Shell Demos</h3>
                    <ShellFileLoader
                        fileModule={lifecycleDemoSh}
                        title="Process Lifecycle in Action (fork + wait)"
                        highlightLines={[6, 12, 15]}
                    />
                    <ShellFileLoader
                        fileModule={processChainSh}
                        title="Chain of processes – parent creates child, then grandchild"
                        highlightLines={[8, 14]}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">Run these scripts to observe PIDs and states using <code>ps</code> in another terminal.</p>
                </div>

                {/* Tips & Tricks + Hint */}
                <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.45s]">
                    <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">💡 Professional Tips</div>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>Always check <code>fork()</code> return value – it can fail (process limit, memory).</li>
                            <li>Use <code>waitpid()</code> with <code>WNOHANG</code> for non‑blocking child checks.</li>
                            <li>Name your processes with <code>prctl(PR_SET_NAME)</code> for easier debugging.</li>
                            <li>Inside scripts, <code>$!</code> gives PID of last background process.</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold">🤔 Hint Section – Experiment</div>
                        <p className="mt-2 text-sm">Run <code>sleep 1000 &amp;</code> then <code>ps -l</code>. In which state is the sleep process? What happens to its state when you wake it (<code>kill -CONT</code>)?</p>
                        <p className="mt-1 text-xs">Also try: create a fork bomb prevention: <code>ulimit -u 50</code> before running heavy forks.</p>
                    </div>
                </div>

                {/* Common Pitfalls & Best Practices */}
                <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
                    <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
                        <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">⚠️ Common Pitfalls</h4>
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                            <li>Forgetting to wait() – leads to zombie processes.</li>
                            <li>Assuming child inherits everything exactly (file locks, pending signals differ).</li>
                            <li>Calling exec() without forking (overwrites the only process).</li>
                            <li>Mixing buffered I/O (stdio) before fork – causes duplicate output.</li>
                        </ul>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
                        <h4 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">✅ Best Practices</h4>
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                            <li>Use <code>vfork()</code> if you only need exec (now legacy, but know it).</li>
                            <li>Set close-on-exec flag for file descriptors not needed in child.</li>
                            <li>Install signal handlers for SIGCHLD to reap children automatically.</li>
                            <li>Check errno after fork/exec failures and log appropriately.</li>
                        </ul>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
                    <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand process creation and lifecycle when..."</h3>
                    <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
                        <div className="flex items-center gap-2"><span className="text-emerald-500">☑</span> Can explain fork() + exec() mechanism</div>
                        <div className="flex items-center gap-2"><span className="text-emerald-500">☑</span> Name 5 process states and typical transitions</div>
                        <div className="flex items-center gap-2"><span className="text-emerald-500">☑</span> Differentiate between zombie and orphan (future topics)</div>
                        <div className="flex items-center gap-2"><span className="text-emerald-500">☑</span> Write a minimal fork+wait program</div>
                    </div>
                </div>

                {/* FAQ */}
                <FAQTemplate title="Process Creation & Lifecycle" questions={questions} />

                {/* Teacher's Note */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">👨‍🏫</div>
                        <div>
                            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">Teacher's Note</h3>
                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
                            <p className="mt-3 leading-relaxed">
                                “While teaching at <strong>Shyamnagar</strong> and <strong>Ichapur</strong>, I’ve seen students struggle to visualize the state diagram. Use the SVG above as a live reference.
                                One trick: run <code>ps –l</code> while compiling a large program – you’ll see processes in 'R', 'S', 'D' states.
                                Remind <strong>Abhronila</strong> and <strong>Debangshu</strong> that <code>fork()</code> returns twice – that’s the magic of process creation.
                                Encourage them to write a small shell in C (uses fork/exec) – that’s the best way to internalize the lifecycle.”
                            </p>
                            <p className="mt-2 text-xs opacity-80">Pro tip: Use <code>strace -f</code> to trace forks and see syscalls in real time.</p>
                        </div>
                    </div>
                </div>

                <style>{`
          @keyframes fade-slide-up {
            0% { opacity: 0.7; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            [class*="animate-"] { animation: none !important; opacity: 1 !important; transform: none !important; }
          }
        `}</style>
            </div>
        </div>
    );
};

export default Topic1;