// Topic15.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic15_files/topic15_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import niceDemoSh from './topic15_files/nice_demo.sh?raw';
import reniceDemoSh from './topic15_files/renice_demo.sh?raw';
import niceDemoC from './topic15_files/nice_demo.c?raw';

const Topic15 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Process Priority Using nice Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4">
            Be nice to your CPU – adjusting process priorities for a well‑behaved system.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-blue-500">🎚️</span> What is nice?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">nice</code> is a Unix command and system call that changes the <strong>scheduling priority</strong> of a process. 
                The concept of "niceness" means: a process with a higher nice value is <strong>nicer</strong> to other processes (gets less CPU), while a lower nice value makes it <strong>less nice</strong> (gets more CPU). 
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>Nice value range:</strong> -20 (highest priority) to +19 (lowest priority)</li>
                <li><strong>Default nice:</strong> 0</li>
                <li><strong>Only root</strong> can lower nice (set negative values, increasing priority)</li>
                <li><strong>Any user</strong> can raise nice (set positive values, decreasing priority)</li>
                <li>The <strong>effect</strong> is on CPU scheduling – not on I/O or memory.</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`# Start a command with nice value 10
nice -n 10 long_running_command

# Start with highest priority (requires root)
nice -n -20 urgent_task

# Change priority of an existing process
renice -n 5 -p 1234`}
                </code>
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-cyan-500">🤝</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                At a restaurant in <strong>Barrackpore</strong>, there are VIP customers (low nice value, high priority) and regular customers (nice = 0). 
                The chef (<strong>scheduler</strong>) serves VIPs first, even if they arrived later. 
                A very "nice" customer (nice = +19) is willing to wait while others eat – they'll get served only when no one else needs the chef. 
                The restaurant owner (<strong>root</strong>) can upgrade anyone to VIP status (lower nice), but regular customers can only downgrade themselves to "nicer" (raise nice) – they cannot become VIPs. 
                <strong>Abhronila</strong> might run a backup script with nice +19 so it doesn't slow down her interactive work.
              </p>
              <div className="mt-4 border-l-4 border-cyan-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "Nice is about politeness – the higher your nice value, the more you yield the CPU."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Nice value effect on scheduling */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">📊 How Nice Values Affect CPU Time</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on each process – higher nice receives less CPU</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="700" height="300" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <filter id="shadow-nice">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* CPU time bar */}
              <g transform="translate(100, 50)">
                <rect x="0" y="0" width="500" height="30" rx="5" fill="#1e293b" />
                <text x="250" y="-10" textAnchor="middle" fill="#cbd5e1" fontSize="12">CPU Time Allocation (example with 3 processes)</text>
              </g>
              
              {/* Process A: nice -10 (high priority) */}
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-nice)">
                <rect x="100" y="55" width="200" height="25" rx="3" fill="#ef4444" />
                <text x="140" y="72" fill="white" fontSize="11">nice = -10 (high priority)</text>
                <title>Low nice = high priority → gets more CPU time</title>
              </g>
              
              {/* Process B: nice 0 (default) */}
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-nice)">
                <rect x="100" y="90" width="150" height="25" rx="3" fill="#f59e0b" />
                <text x="140" y="107" fill="white" fontSize="11">nice = 0 (default)</text>
                <title>Normal priority – gets standard time share</title>
              </g>
              
              {/* Process C: nice +10 (low priority) */}
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-nice)">
                <rect x="100" y="125" width="100" height="25" rx="3" fill="#3b82f6" />
                <text x="140" y="142" fill="white" fontSize="11">nice = +10 (low priority)</text>
                <title>High nice = low priority → gets less CPU time</title>
              </g>
              
              <text x="350" y="200" textAnchor="middle" fill="#6b7280" fontSize="12">Higher nice = more polite = less CPU time</text>
            </svg>
          </div>
        </div>

        {/* Nice value effect and limitations */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-2xl border-l-8 border-blue-500">
            <h3 className="font-bold">📈 Effect on Scheduling (CFS)</h3>
            <p className="text-sm mt-1">In Linux's Completely Fair Scheduler (CFS), nice values affect the <strong>vruntime</strong> increment rate. A process with nice -20 gets ~5x more CPU than a nice 0 process, and a nice +19 gets ~0.2x. The relationship is exponential, not linear.</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">Approximate weight: nice -20 weight = 88761, nice 0 weight = 1024, nice +19 weight = 15.</p>
          </div>
          <div className="bg-cyan-100 dark:bg-cyan-900/30 p-5 rounded-2xl border-l-8 border-cyan-500">
            <h3 className="font-bold">⚠️ Limitations & Notes</h3>
            <ul className="text-sm list-disc pl-4 mt-1 space-y-0.5">
              <li>Nice affects only CPU time, not I/O or memory bandwidth.</li>
              <li>Real‑time processes (SCHED_FIFO/RR) ignore nice values.</li>
              <li>Changing nice does not change the process's static priority immediately; the scheduler gradually adjusts.</li>
              <li>On modern CPUs, the effect may be subtle unless the system is CPU‑bound.</li>
            </ul>
          </div>
        </div>

        {/* Command examples and C program */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 Using nice & renice – Examples</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`# Starting a process with a nice value
nice -n 10 ./cpu_intensive_program

# Without explicit value, default increment is +10
nice ./script.sh   # runs with nice 10

# Setting nice value inside script
#!/bin/bash
renice -n 15 -p $$

# Change priority of running process (by PID)
renice -n -5 -p 1234   # requires root

# Change priority of all processes of a user
renice -n +10 -u swadeep

# Check nice value of a process
ps -o pid,ni,comm -p 1234
top -p 1234   # look at NI column`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">The <code>nice()</code> system call in C does the same thing.</p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={niceDemoSh}
            title="Setting nice value when launching commands"
            highlightLines={[3, 8, 14]}
          />
          <ShellFileLoader
            fileModule={reniceDemoSh}
            title="Changing priority of running processes with renice"
            highlightLines={[5, 11, 18]}
          />
          <ShellFileLoader
            fileModule={niceDemoC}
            title="nice_demo.c – using the nice() system call in C"
            highlightLines={[6, 12, 18]}
          />
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-blue-600">🔍</span> Verify nice values in real time:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Watch nice values of all processes of your user
watch -n 1 'ps -o pid,ni,comm -u $USER'
# See CPU time difference between nice 0 and nice +19
stress --cpu 1 --timeout 30 &
nice -n 19 stress --cpu 1 --timeout 30 &
# Then check 'top' to compare %CPU`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Use <code>nice -n 19</code> for batch jobs, backups, and log rotations to avoid hurting interactive performance.</li>
              <li>For CPU‑intensive daemons that must stay responsive, use a low nice (e.g., -10) to ensure they get CPU quickly.</li>
              <li>Monitor <code>top</code> or <code>htop</code> while adjusting nice to see real‑time effect (look at PR column: RT = real‑time, NI = nice value).</li>
              <li>Remember that <code>renice</code> affects future scheduling decisions – the effect is not instant in all schedulers.</li>
              <li>Never run a normal user process with nice -20 unless you know what you're doing – it can starve important system processes.</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Create two CPU‑intensive processes: one with nice +19, one with nice -10 (as root). Which one gets more CPU? Measure using <code>top -d 1</code>. Also try <code>renice</code> while the process is running – can you see the change in <code>top</code>?</p>
            <p className="mt-1 text-xs">Also: what happens if you nice a process that is already blocked on I/O? Does it affect I/O priority? (No, not by default; use ionice for that.)</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Confusing nice value meaning: <strong>higher nice = lower priority</strong>. New users often think the opposite.</li>
              <li>Trying to set negative nice as a normal user – get "Permission denied". Only root can increase priority.</li>
              <li>Assuming nice affects I/O – it does not. Use <code>ionice</code> for disk I/O priority.</li>
              <li>Forgetting that <code>nice</code> without argument adds +10, but the default nice of the shell is 0, so the command runs with nice 10.</li>
              <li>Setting nice on a process that is already CPU‑bound – the effect may not be visible immediately due to scheduler smoothing.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Always use <code>nice -n</code> explicitly; older syntax assumes increment, but it's confusing.</li>
              <li>For long‑running non‑critical tasks, set nice to at least 10, preferably 19.</li>
              <li>Combine <code>nice</code> with <code>ionice</code> for full resource regulation of batch jobs.</li>
              <li>Use <code>renice -p</code> when you discover a runaway process hogging CPU – increase its nice.</li>
              <li>Document nice values in cron jobs and scripts so admins know the intended impact.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand nice command when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-blue-500">☑</span> Can explain what nice value -20 vs +19 means</div>
            <div className="flex items-center gap-2"><span className="text-blue-500">☑</span> Know how to start a command with a specific nice value</div>
            <div className="flex items-center gap-2"><span className="text-blue-500">☑</span> Can change nice of a running process using renice</div>
            <div className="flex items-center gap-2"><span className="text-blue-500">☑</span> Understand why regular users cannot assign negative nice values</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Process Priority Using nice Command" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “I always start this lesson at <strong>Ichapur</strong> with a demonstration: two <code>stress --cpu 1</code> processes – one at nice 0, one at nice 19. 
                <strong>Tuhina</strong> immediately sees the nice 19 process gets fewer CPU cycles. 
                A classic mistake is students thinking nice -20 is 'nicer' – we use the phrase ‘meaner gets more CPU’. 
                I also show them that on today's multi‑core systems, the effect may be less dramatic unless the system is fully loaded. 
                The key takeaway: nice is not for real‑time control, it's for politeness. 
                For real‑time, you need <code>chrt</code> and appropriate privileges. 
                Always remind them: ‘Be nice to your system, and it will be nice to you.’”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: In scripts, use <code>ulimit -e</code> to set scheduling priority (rare), but nice is more portable.</p>
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

export default Topic15;