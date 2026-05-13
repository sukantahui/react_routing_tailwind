// Topic1.jsx
import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import psDemoScript from './topic1_files/ps_demo.sh?raw';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';

/**
 * Topic1: ps Command – Displaying active processes
 * 
 * Covers:
 * - What `ps` shows (snapshot of current processes)
 * - Options: -e (all processes), -f (full format), -u (user‑oriented)
 * - Understanding columns: PID, TTY, STAT, TIME, CMD
 * 
 * @returns {JSX.Element}
 */
const Topic1 = () => {
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes softPulse {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(59,130,246,0.3)); }
      50% { filter: drop-shadow(0 0 8px rgba(59,130,246,0.6)); }
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

        {/* --- Section 1: Title & Introduction --- */}
        <div className="animate-fade-slide-up">
          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-teal-600 dark:from-green-400 dark:to-teal-300 bg-clip-text text-transparent">
              ps Command – Peeking into Active Processes
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Snapshot of running processes with powerful options
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ps</code> (process status) command gives you a static snapshot of current processes. 
            Unlike <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">top</code> (real‑time), <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ps</code> is ideal for scripts, one‑off checks, and historical analysis.
          </p>
        </div>

        {/* --- Section 2: Core Syntax & Basic Usage (SVG included) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">🔍</span> Basic <code>ps</code> Syntax
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-mono bg-gray-900 text-gray-100 p-3 rounded-md mb-4">
                  ps [options]
                </p>
                <p>Without options, <code>ps</code> shows only processes running in the current terminal:</p>
                <div className="bg-gray-800 text-gray-100 p-3 rounded-md font-mono text-sm mt-3">
                  <span className="text-green-300">$ ps</span>
                  <span className="block">  PID TTY          TIME CMD</span>
                  <span className="block">12345 pts/0    00:00:00 bash</span>
                  <span className="block">12378 pts/0    00:00:00 ps</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <svg width="260" height="160" viewBox="0 0 260 160" className="hover:scale-[1.02] transition-transform">
                  <rect x="10" y="20" width="90" height="50" rx="6" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />
                  <text x="55" y="48" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">ps</text>
                  <text x="55" y="62" textAnchor="middle" fill="#6b7280" fontSize="9">command</text>
                  <line x1="100" y1="45" x2="135" y2="45" stroke="#2563eb" strokeWidth="2" strokeDasharray="4">
                    <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
                  </line>
                  <polygon points="137,40 150,45 137,50" fill="#2563eb" />
                  <rect x="155" y="10" width="95" height="70" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                  <text x="202" y="36" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Process Table</text>
                  <text x="202" y="50" textAnchor="middle" fill="#6b7280" fontSize="9">(snapshot)</text>
                  <text x="202" y="64" textAnchor="middle" fill="#6b7280" fontSize="9">PID, CMD, ...</text>
                  <rect x="180" y="100" width="60" height="30" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
                  <text x="210" y="120" textAnchor="middle" fill="#f59e0b" fontSize="11">Terminal</text>
                  <path d="M210 100 L210 85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 3: Important Options -e, -f, -u (detailed) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">📖 Essential Options Explained</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition hover:-translate-y-1">
                <h3 className="text-xl font-bold text-purple-600">-e</h3>
                <p className="text-sm">Select <strong>all processes</strong> (every process on the system, equivalent to <code>-A</code>).</p>
                <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  ps -e | head -3
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition hover:-translate-y-1">
                <h3 className="text-xl font-bold text-blue-600">-f</h3>
                <p className="text-sm"><strong>Full‑format listing</strong> – includes UID, PPID, C, STIME, TTY, TIME, CMD.</p>
                <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  ps -ef | head -3
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition hover:-translate-y-1">
                <h3 className="text-xl font-bold text-green-600">-u</h3>
                <p className="text-sm"><strong>User‑oriented format</strong> – shows %CPU, %MEM, VSZ, RSS, START, etc.</p>
                <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  ps -u debangshu
                </div>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr><th className="p-2">Option</th><th>Description</th><th>Typical Use Case</th></tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="p-2 font-mono">-e</td><td>All processes system‑wide</td><td>Finding a process by name across whole system</td></tr>
                  <tr><td className="p-2 font-mono">-f</td><td>Full format (PPID, start time)</td><td>Seeing process ancestry (who started what)</td></tr>
                  <tr><td className="p-2 font-mono">-u</td><td>User‑focused with resource usage</td><td>Monitoring memory/CPU per user</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Section 4: Realistic Demo Script (using ShellFileLoader) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">🐚 Live Demo: <code>ps</code> in Action</h2>
            <p className="mb-3">This script launches a few dummy processes, then runs <code>ps -ef</code> and <code>ps -u</code> to illustrate real output.</p>
            <ShellFileLoader
              fileModule={psDemoScript}
              title="📁 ps_demo.sh – explore ps options"
              highlightLines={[7, 10, 13]}
            />
            <div className="mt-4 text-sm bg-gray-900 text-gray-100 p-3 rounded-md">
              <p className="text-green-300">$ bash ps_demo.sh</p>
              <p className="text-gray-300">[1] 14523 sleep 300</p>
              <p className="text-gray-300">[2] 14524 sleep 300</p>
              <p className="text-yellow-300">=== ps -ef (full format) ===</p>
              <p className="text-gray-300">UID   PID  PPID  C STIME TTY      TIME CMD</p>
              <p className="text-gray-300">...  14523 14005 0 10:23 pts/0 00:00:00 sleep 300</p>
            </div>
          </div>
        </div>

        {/* --- Section 5: Tips & Tricks (Professional) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
            <h2 className="text-xl font-bold flex items-center gap-2">💡 Pro Tips & Tricks</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex gap-2"><span className="text-indigo-600">🔹</span> <code>ps aux</code> (without dash) is BSD style – widely used, shows all users.</li>
              <li className="flex gap-2"><span className="text-indigo-600">🔹</span> Pipe to <code>grep</code>: <code>ps -ef | grep nginx</code> finds all nginx processes.</li>
              <li className="flex gap-2"><span className="text-indigo-600">🔹</span> <code>ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu</code> custom format + sort.</li>
              <li className="flex gap-2"><span className="text-indigo-600">🔹</span> Watch process tree: <code>ps -ef --forest</code> (on Linux).</li>
            </ul>
          </div>
        </div>

        {/* --- Section 6: Common Pitfalls & Best Practices --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 dark:text-red-300 flex gap-1">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Confusing <code>ps -e</code> (standard) with <code>ps aux</code> (BSD) – output formats differ.</li>
              <li>Forgetting that <code>ps</code> shows only a snapshot – not real‑time changes.</li>
              <li>Using <code>ps | grep process</code> often includes the grep process itself (use <code>grep [p]rocess</code> trick).</li>
              <li>Assuming PPID always points to the direct parent after process reparenting.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 dark:text-green-300 flex gap-1">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always use <code>ps -ef</code> or <code>ps aux</code> for complete system view.</li>
              <li>Redirect output to a file when inspecting many processes (<code>ps -ef &gt; processes.txt</code>).</li>
              <li>Combine with <code>watch</code> for pseudo‑real‑time: <code>watch 'ps -u swadeep'</code>.</li>
              <li>Learn the meaning of STAT codes (R=running, S=sleep, Z=zombie, etc.).</li>
            </ul>
          </div>
        </div>

        {/* --- Section 7: Hint (Observation) --- */}
        <div className="animate-fade-slide-up bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold flex gap-2">🧠 Think about...</h3>
          <p className="italic">Observe carefully: Run <code>ps -ef</code> and note the <strong>PPID</strong> column. Then launch a background process (<code>sleep 500 &amp;</code>) and run <code>ps -ef | grep sleep</code>. Can you see which process is the parent? What does that parent process do?</p>
        </div>

        {/* --- Section 8: Mini Checklist --- */}
        <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-2xl animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
          <h3 className="font-bold text-lg">📋 Student Checklist – <code>ps</code> Command</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know the difference between <code>ps</code> (snapshot) and <code>top</code> (real‑time).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can list every process on the system with <code>ps -e</code> or <code>ps aux</code>.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I understand columns shown by <code>ps -f</code> (UID, PID, PPID, STIME).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can filter a user’s processes using <code>ps -u username</code>.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I avoid the “grep itself” pitfall by using <code>ps aux | grep [s]leep</code>.</label>
          </div>
        </div>

        {/* --- Section 9: FAQ (20 questions) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <FAQTemplate title="ps Command FAQs" questions={questions} />
        </div>

        {/* --- Section 10: Teacher’s Note --- */}
        <div className="animate-fade-slide-up border-t-4 border-green-400 bg-green-50 dark:bg-green-950/20 p-6 rounded-xl shadow-md hover:shadow-lg transition" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-green-200 dark:bg-green-800 rounded-full p-3 text-3xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200">Teacher’s Note — Sukanta Hui</h3>
              <p className="text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 +91 7003756860</p>
              <p className="text-sm">🔧 <strong>{teacherExperience} years of experience</strong> (since 1998) — Programming, RDBMS, OS, Web Development</p>
              <p className="mt-3 italic">“Students from Barrackpore and Shyamnagar often ask: why <code>ps aux</code> works without dash? It’s a different style (BSD). I tell them: master both <code>ps -ef</code> (UNIX) and <code>ps aux</code> (BSD) – you’ll see them everywhere in the industry.” — Sukanta Hui</p>
              <div className="mt-2 text-green-700 dark:text-green-300 text-sm font-mono">🔥 Tip: <code>ps -eo pid,cmd,%mem,%cpu --sort=-%cpu | head</code> shows top resource consumers.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic1;