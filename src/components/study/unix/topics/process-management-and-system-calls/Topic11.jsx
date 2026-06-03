// Topic11.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic11_files/topic11_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import schedulerObserveSh from './topic11_files/scheduler_observe.sh?raw';
import schedDemoC from './topic11_files/sched_demo.c?raw';
import cfsDebugSh from './topic11_files/cfs_debug.sh?raw';

const Topic11 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            Unix Process Scheduler Overview
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-cyan-500 pl-4">
            The traffic cop of the CPU – how the kernel decides which process runs next.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-cyan-500">🚦</span> What is the Scheduler?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                The <strong className="text-cyan-600 dark:text-cyan-400">scheduler</strong> is the kernel component that decides which process runs on the CPU and for how long. 
                It is invoked on timer interrupts, when a process blocks (I/O), when a process exits, or when a process yields the CPU voluntarily.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>Preemptive scheduler</strong> – can forcibly remove a process from the CPU (time slice expiry)</li>
                <li><strong>Non‑preemptive scheduler</strong> – process runs until it blocks or yields (cooperative)</li>
                <li><strong>Context switch</strong> – saving/restoring process state</li>
                <li><strong>Timeslice (quantum)</strong> – max time a process can run before being preempted</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm">
                <code className="block whitespace-pre">
                  {`# Scheduling related system calls
#include <sched.h>
int sched_yield(void);           // voluntarily yield CPU
int sched_setaffinity(pid_t pid, size_t cpusetsize, cpu_set_t *mask);
int nice(int inc);               // change priority (lower = higher priority)`}
                </code>
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-blue-500">🔄</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                Imagine the food court at a mall in <strong>Barrackpore</strong>. Several counters (CPUs) and many customers (processes). 
                The <strong>courtyard manager (scheduler)</strong> decides:
                <ul className="list-disc pl-6 mt-2">
                  <li><strong>First Come First Served</strong> – the first in line gets served; long queue possible.</li>
                  <li><strong>Round Robin</strong> – each customer gets 5 seconds at the counter, then goes to the back of the line.</li>
                  <li><strong>Priority</strong> – VIP customers (high priority) jump the queue.</li>
                  <li><strong>Shortest Job First</strong> – those with small orders are served first to reduce average wait time.</li>
                </ul>
                Modern Unix uses a <strong>fair scheduling</strong> algorithm (CFS) that tries to give each process a fair share of CPU time.
              </p>
              <div className="mt-4 border-l-4 border-blue-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "The scheduler is the heart of multitasking – it creates the illusion of parallelism."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Scheduler Overview Diagram */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">⚙️ How the Scheduler Works</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on components – animated arrows show the scheduling loop</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="750" height="380" viewBox="0 0 750 380" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="sched-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#0891b2" />
                </marker>
                <filter id="shadow-sched">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Ready Queue */}
              <g transform="translate(140, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-sched)">
                <rect x="-60" y="-40" width="120" height="80" rx="10" fill="#3b82f6" className="hover:fill-blue-500 transition">
                  <animate attributeName="width" values="120;126;120" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-15" textAnchor="middle" fill="white" fontWeight="bold">Ready Queue</text>
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10">[P1] [P2] [P3]</text>
                <text x="0" y="20" textAnchor="middle" fill="white" fontSize="9">circular / priority</text>
                <title>List/queue of processes ready to run</title>
              </g>
              
              {/* CPU */}
              <g transform="translate(420, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-sched)">
                <rect x="-50" y="-35" width="100" height="70" rx="10" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="y" values="80;76;80" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-10" textAnchor="middle" fill="white" fontWeight="bold">CPU</text>
                <text x="0" y="10" textAnchor="middle" fill="white" fontSize="11">Running Process</text>
                <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10">(P2 currently)</text>
                <title>The CPU executes the chosen process</title>
              </g>
              
              {/* Scheduler */}
              <g transform="translate(280, 180)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-sched)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#8b5cf6" className="hover:fill-purple-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Scheduler</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">(pick next process)</text>
                <title>The scheduler selects which process to run next</title>
              </g>
              
              {/* Timer Interrupt */}
              <g transform="translate(560, 180)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-sched)">
                <rect x="-55" y="-25" width="110" height="50" rx="10" fill="#ef4444" className="hover:fill-red-500 transition">
                  <animate attributeName="x" values="560;563;560" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="5" textAnchor="middle" fill="white" fontWeight="bold">Timer</text>
                <text x="0" y="18" textAnchor="middle" fill="white" fontSize="9">HZ = 250/1000 Hz</text>
                <title>Timer interrupt triggers scheduler (preemption)</title>
              </g>
              
              {/* Arrows */}
              <line x1="200" y1="80" x2="360" y2="80" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sched-arrow)"/>
              <text x="280" y="65" fill="#0891b2" fontSize="11">dispatch</text>
              
              <line x1="420" y1="115" x2="280" y2="155" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sched-arrow)" strokeDasharray="4"/>
              <text x="350" y="140" fill="#0891b2" fontSize="9">time slice expired / preempt</text>
              
              <line x1="340" y1="180" x2="380" y2="115" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sched-arrow)"/>
              <text x="375" y="150" fill="#0891b2" fontSize="10">choose new process</text>
              
              <line x1="470" y1="180" x2="420" y2="150" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sched-arrow)"/>
              <text x="500" y="165" fill="#0891b2" fontSize="9">timer interrupt</text>
              
              {/* Context switch annotation */}
              <g transform="translate(300, 260)">
                <rect x="-120" y="-15" width="240" height="30" rx="6" fill="#1e293b" />
                <text x="0" y="5" textAnchor="middle" fill="#cbd5e1" fontSize="10">Context Switch: save → schedule → restore</text>
              </g>
              
              <text x="375" y="320" textAnchor="middle" fill="#6b7280" fontSize="12">The scheduler runs every timer tick and on blocking system calls</text>
            </svg>
          </div>
        </div>

        {/* Scheduling Algorithms Overview */}
        <div className="grid md:grid-cols-3 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-cyan-100 dark:bg-cyan-900/30 p-4 rounded-xl cursor-pointer hover:shadow-md transition">
            <h3 className="font-bold">🔄 Round Robin (RR)</h3>
            <p className="text-sm">Each process gets a fixed time slice (typically 4–100ms). After expiry, it's moved to the back of the ready queue. Fair and responsive.</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl cursor-pointer hover:shadow-md transition">
            <h3 className="font-bold">⚡ Priority Scheduling</h3>
            <p className="text-sm">Processes have static or dynamic priorities. Higher priority runs first. Linux uses dynamic priorities to prevent starvation.</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl cursor-pointer hover:shadow-md transition">
            <h3 className="font-bold">🍃 CFS – Linux's Scheduler</h3>
            <p className="text-sm">Completely Fair Scheduler: maintains `vruntime` and always picks the process with the smallest vruntime (virtual runtime).</p>
          </div>
        </div>

        {/* Key Scheduler Parameters */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📊 Understanding Time Slices & Priorities</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Default time slice (HZ):</strong><br />
              <code className="bg-gray-200 dark:bg-gray-700 px-1">getconf CLK_TCK</code> → usually 100 Hz (10ms) or 250 Hz (4ms), 1000 Hz (1ms) on low‑latency kernels.</p>
              <p className="mt-2"><strong>Nice value range:</strong> -20 (highest priority) to +19 (lowest). Default 0.</p>
            </div>
            <div>
              <p><strong>Real‑time policies:</strong> SCHED_FIFO, SCHED_RR (real‑time) – higher priority than normal.</p>
              <p className="mt-2"><strong>sched_yield()</strong> – voluntarily give up CPU (but stays in same priority level).</p>
            </div>
          </div>
        </div>

        {/* C demo – sched_yield and nice */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-xl font-semibold mb-3">📝 Example: Changing Priority and Yielding</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <sched.h>

int main() {
    // Get current nice value
    int old_nice = nice(0);
    printf("Current nice: %d\\n", old_nice);
    
    // Increase nice (lower priority)
    nice(10);
    printf("New nice: %d\\n", nice(0));
    
    // Voluntarily yield CPU
    sched_yield();
    
    // Set real‑time FIFO (requires root)
    struct sched_param param = { .sched_priority = 1 };
    if (sched_setscheduler(0, SCHED_FIFO, &param) == 0)
        printf("Now SCHED_FIFO priority 1\\n");
    else
        perror("sched_setscheduler (run as root)");
    
    return 0;
}`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Compile with <code>gcc -o sched_demo sched_demo.c</code></p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={schedulerObserveSh}
            title="Observe scheduling metrics with vmstat and top"
            highlightLines={[4, 9, 16]}
          />
          <ShellFileLoader
            fileModule={schedDemoC}
            title="sched_demo.c – nice, sched_yield, real‑time policies"
            highlightLines={[7, 12, 16, 21]}
          />
          <ShellFileLoader
            fileModule={cfsDebugSh}
            title="CFS debugging – examine vruntime and sched features"
            highlightLines={[3, 8, 12]}
          />
          <div className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-cyan-600">🔍</span> Quick scheduler inspection commands:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Show scheduler policy and priority for a process
chrt -p $$
# Show context switches per second
vmstat 1 5
# Show run queue length
uptime
# Show CFS parameters
sysctl kernel.sched_*`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Use <code>nice</code> to lower priority of CPU‑intensive background jobs.</li>
              <li>Real‑time policies (SCHED_FIFO/RR) can starve normal processes – use with caution.</li>
              <li>Monitor <strong>context switch rate</strong> (cs in vmstat) – high rates may indicate thrashing.</li>
              <li>For interactive responsiveness, Linux scheduler automatically boosts priority of I/O‑bound tasks.</li>
              <li><code>sched_setaffinity</code> can pin processes to specific CPU cores (isolation).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Run two CPU‑intensive loops: <code>while true; do :; done &amp;</code> (two of them). Observe how CPU usage is shared using <code>top</code>. Now <code>renice +19</code> one of them – what changes? Then try <code>chrt -f 99 ./program</code> to see real‑time behaviour.</p>
            <p className="mt-1 text-xs">Also: run <code>stress --cpu 4</code> and watch how the scheduler distributes load across cores.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Assuming higher nice value means higher priority – actually lower nice = higher priority (since nice = "niceness" to others).</li>
              <li>Forgetting that real‑time processes can block the system if they never yield (infinite loop in SCHED_FIFO).</li>
              <li>Not understanding that <code>sched_yield()</code> only yields to processes of same priority.</li>
              <li>Misinterpreting <code>vmstat</code>'s run queue (r) – values > number of cores indicate overload.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Use <code>taskset</code> to pin CPU‑intensive apps to specific cores to improve cache locality.</li>
              <li>For interactive applications, trust the default scheduler – do not manually change priority.</li>
              <li>When benchmarking, consider scheduler interference – use <code>isolcpus</code> boot parameter.</li>
              <li>Monitor <code>/proc/sched_debug</code> for detailed CFS statistics.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand scheduling when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-cyan-500">☑</span> Can explain the difference between preemptive and cooperative multitasking</div>
            <div className="flex items-center gap-2"><span className="text-cyan-500">☑</span> Know the purpose of nice values and how to change them</div>
            <div className="flex items-center gap-2"><span className="text-cyan-500">☑</span> Describe Round Robin and Priority scheduling</div>
            <div className="flex items-center gap-2"><span className="text-cyan-500">☑</span> Understand what a context switch is and when it occurs</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Unix Process Scheduler Overview" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/40 dark:to-blue-950/40 p-6 rounded-2xl border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.65s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “When I teach scheduling at <strong>Ichapur</strong> and <strong>Shyamnagar</strong>, I use a very simple demonstration: two terminals, both running <code>while true; do :; done &amp;</code>. 
                <strong>Swadeep</strong> is always surprised that both run at ~50% CPU. Then I explain the scheduler's time slicing. 
                Another memorable lab: we wrote a program that changes its own nice value and watched it get less CPU time via <code>top</code>. 
                I remind students that the scheduler is not magic – it's a precise algorithm aiming for fairness and responsiveness. 
                The CFS (Completely Fair Scheduler) is named that way for a reason; it tries to give each task a ‘fair’ share based on vruntime.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Use <code>perf sched record</code> and <code>perf sched latency</code> to analyse scheduler behaviour.</p>
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

export default Topic11;