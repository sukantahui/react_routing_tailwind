// Topic7.jsx
import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import niceDemoScript from './topic7_files/nice_demo.sh?raw';
import reniceDemoScript from './topic7_files/renice_demo.sh?raw';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';

/**
 * Topic7: nice Command – Process Priority and Scheduling
 * 
 * Covers:
 * - Process priority (nice value) range -20 to 19
 * - Starting a process with a different priority using `nice`
 * - Changing priority of running process with `renice`
 * - Understanding CPU scheduling and fairness
 * - When to use high/low nice values
 * 
 * @returns {JSX.Element}
 */
const Topic7 = () => {
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes priorityMeter {
      0% { width: 0%; }
      100% { width: 100%; }
    }
    @media (prefers-reduced-motion: no-preference) {
      .animate-fade-slide-up {
        animation: fadeSlideUp 0.6s ease-out forwards;
      }
    }
  `;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      <style>{keyframesStyle}</style>

      <div className="max-w-6xl mx-auto space-y-10">

        {/* Title & Introduction */}
        <div className="animate-fade-slide-up">
          <div className="border-l-4 border-purple-500 pl-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
              nice Command – Setting Process Priority
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Control CPU scheduling with nice values (–20 to 19)
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            The Linux kernel schedules processes fairly, but sometimes you want a background backup to slow down,
            or a real‑time simulation to speed up. The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">nice</code> command
            lets you start a process with a specific <strong>nice value</strong> – a lower number means higher priority,
            higher number means lower priority (more “nice” to other processes).
          </p>
        </div>

        {/* Nice value explanation with SVG meter */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">⚖️</span> Nice Value – The Priority Scale
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-2">Nice values range from <strong>-20 (highest priority)</strong> to <strong>19 (lowest priority)</strong>. Default is 0.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Only <strong>root</strong> can set negative nice values (increase priority).</li>
                  <li>Any user can <strong>lower</strong> their own process priority (increase nice value).</li>
                  <li>Higher nice = nicer to others = gets less CPU when system is busy.</li>
                  <li>The actual CPU scheduling also depends on other factors (e.g., I/O, real‑time policies).</li>
                </ul>
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <p className="text-sm">💡 <strong>Analogy:</strong> Think of a cafeteria queue. Nice = 19 means you let everyone go ahead of you. Nice = -20 means you cut to the front (only root can do that).</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <svg width="260" height="160" viewBox="0 0 260 160" className="hover:scale-[1.02] transition-transform">
                  <rect x="10" y="20" width="240" height="20" rx="10" fill="#e5e7eb" />
                  <rect x="10" y="20" width="120" height="20" rx="10" fill="#ef4444" />
                  <text x="70" y="33" textAnchor="middle" fill="white" fontSize="8">Higher priority (-20)</text>
                  <rect x="130" y="20" width="120" height="20" rx="10" fill="#10b981" />
                  <text x="190" y="33" textAnchor="middle" fill="white" fontSize="8">Lower priority (+19)</text>
                  <text x="20" y="60" fill="#6b7280" fontSize="9">nice -20</text>
                  <text x="200" y="60" fill="#6b7280" fontSize="9">nice 19</text>
                  <text x="120" y="80" fill="#3b82f6" fontSize="10">Default nice = 0</text>
                  <line x1="120" y1="85" x2="120" y2="110" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3" />
                  <circle cx="120" cy="115" r="5" fill="#3b82f6">
                    <animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Syntax and usage */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">📝 Syntax & Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <code className="text-sm font-mono">nice -n adjustment command [args]</code>
                <div className="mt-3 space-y-2 text-sm">
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">nice -n 10 ./backup.sh</span> → run backup with lower priority (+10)</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">nice -n -5 ./urgent_task</span> → higher priority (-5, needs root)</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">nice -10 command</span> → same as `-n 10` (legacy)</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">renice +5 -p PID</span> → change priority of running process</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-bold text-purple-600">📊 Checking nice values</h3>
                <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  <p>$ ps -l | head -5</p>
                  <p>F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD</p>
                  <p>0 S  1000  1234  1230  0  80   0 -  1234 -      pts/0    00:00:00 bash</p>
                  <p>0 R  1000  4567  1234  0  80  10 -  2345 -      pts/0    00:00:01 nice_task</p>
                  <p>0 R  1000  4568  1234  0  80  -5 -  3456 -      pts/0    00:00:02 root_task</p>
                </div>
                <p className="text-xs mt-2">The `NI` column shows the nice value.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo scripts */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">🐚 Live Demo: Starting with Different Priority</h2>
            <p className="mb-3">These scripts demonstrate starting CPU‑intensive tasks with different nice values and observing the effect.</p>
            <div className="space-y-4">
              <ShellFileLoader
                fileModule={niceDemoScript}
                title="📁 nice_demo.sh – start a task with low priority"
                highlightLines={[8, 15]}
              />
              <ShellFileLoader
                fileModule={reniceDemoScript}
                title="📁 renice_demo.sh – change priority of running process"
                highlightLines={[10, 16]}
              />
            </div>
            <div className="mt-4 text-sm bg-gray-900 text-gray-100 p-3 rounded-md">
              <p className="text-green-300">$ bash nice_demo.sh</p>
              <p className="text-gray-300">Starting CPU stress with nice 19 (lowest priority).</p>
              <p className="text-gray-300">PID: 27890, Nice: 19</p>
              <p className="text-gray-300">Now if you run another CPU‑heavy task with default nice (0), it will get more CPU.</p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h2 className="text-xl font-bold flex items-center gap-2">💡 Professional Tips & Tricks</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex gap-2"><span className="text-purple-600">🔹</span> Use <code>nice -n 19 long_task &</code> for non‑critical backups or log processing.</li>
              <li className="flex gap-2"><span className="text-purple-600">🔹</span> Check system load with <code>top</code> and sort by <code>NI</code> column.</li>
              <li className="flex gap-2"><span className="text-purple-600">🔹</span> <code>renice -n -10 -p PID</code> (as root) can boost a struggling interactive process.</li>
              <li className="flex gap-2"><span className="text-purple-600">🔹</span> Combine <code>nice</code> with <code>ionice</code> (for I/O priority) for full control.</li>
              <li className="flex gap-2"><span className="text-purple-600">🔹</span> Use <code>chrt</code> for real‑time scheduling (beyond `nice`).</li>
            </ul>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Trying to set a negative nice value as non‑root – permission denied.</li>
              <li>Assuming `nice` works on all commands – it only affects CPU scheduling, not I/O.</li>
              <li>Forgetting that a process can change its own nice value (if it has permission).</li>
              <li>Using `nice` with a shell builtin – some builtins ignore `nice`. Use `nice bash -c "command"`.</li>
              <li>Not verifying if the `nice` value actually applied (check `ps -l`).</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always verify with `ps -l` or `top` after setting nice value.</li>
              <li>Use `nice -n 19` for batch jobs that should not impact interactive performance.</li>
              <li>Document why you set a specific nice value in scripts.</li>
              <li>Test with `stress` or `dd` to see priority impact.</li>
              <li>Remember that modern kernels also have auto‑grouping (CFS), so `nice` is not absolute.</li>
            </ul>
          </div>
        </div>

        {/* Hint */}
        <div className="animate-fade-slide-up bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold flex gap-2">🧠 Think about...</h3>
          <p className="italic">Observe carefully: Run two CPU‑intensive processes: <code>nice -n 19 dd if=/dev/zero of=/dev/null &</code> and <code>dd if=/dev/zero of=/dev/null &</code>. Use <code>top</code> to see which one gets more CPU. Then run <code>renice -n 0 -p PID_of_low_priority</code> – what changes?</p>
        </div>

        {/* Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-2xl animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
          <h3 className="font-bold text-lg">📋 Student Checklist – nice & renice</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I understand the nice value range (–20 to 19).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can start a process with a lower priority (<code>nice -n 10 cmd</code>).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know that only root can increase priority (negative nice).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can change the priority of a running process with <code>renice</code>.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can check nice values using <code>ps -l</code> or <code>top</code>.</label>
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <FAQTemplate title="nice & renice – Frequently Asked Questions" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up border-t-4 border-purple-400 bg-purple-50 dark:bg-purple-950/20 p-6 rounded-xl shadow-md hover:shadow-lg transition" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-purple-200 dark:bg-purple-800 rounded-full p-3 text-3xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">Teacher’s Note — Sukanta Hui</h3>
              <p className="text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 +91 7003756860</p>
              <p className="text-sm">🔧 <strong>{teacherExperience} years of experience</strong> (since 1998) — Programming, RDBMS, OS, Web Development</p>
              <p className="mt-3 italic">“Debangshu once ran a full system backup with nice 0, and his student’s online exam portal became sluggish. I showed him <code>nice -n 19</code> – the backup still ran but didn’t steal CPU from the web server. Being nice to other processes is a sysadmin’s superpower.” — Sukanta Hui</p>
              <div className="mt-2 text-purple-700 dark:text-purple-300 text-sm font-mono">🔥 Advanced: Use <code>cpulimit</code> to limit CPU percentage if `nice` is insufficient.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic7;