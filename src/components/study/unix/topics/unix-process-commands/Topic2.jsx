// Topic2.jsx
import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import topBatchDemo from './topic2_files/top_batch_demo.sh?raw';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';

/**
 * Topic2: top Command – Real‑time process monitoring
 * 
 * Covers:
 * - Interactive process viewer (real‑time CPU/memory)
 * - Understanding the header: load average, tasks, %CPU, %MEM
 * - Common interactive keys: q, h, k, r, s, P, M
 * - Batch mode for scripting: top -b -n 1
 * 
 * @returns {JSX.Element}
 */
const Topic2 = () => {
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes dashMove {
      to { stroke-dashoffset: 0; }
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

        {/* Section 1: Title & Introduction */}
        <div className="animate-fade-slide-up">
          <div className="border-l-4 border-yellow-500 pl-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-700 to-orange-600 dark:from-yellow-400 dark:to-orange-300 bg-clip-text text-transparent">
              top Command – Real‑time System Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Live view of processes, CPU, memory, and load averages
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">top</code> command provides a dynamic, real‑time view of a running system.
            It is the go‑to tool for performance troubleshooting, capacity planning, and quick identification of resource hogs.
          </p>
        </div>

        {/* Section 2: Visual overview (SVG schematic) */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span> What <code>top</code> Shows You
            </h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-black/80 text-green-400 p-4 rounded-md font-mono text-xs leading-relaxed overflow-x-auto">
                  <pre>{`top - 10:23:45 up 2 days,  1:23,  3 users,  load average: 0.25, 0.10, 0.05
Tasks: 123 total,   1 running, 122 sleeping,   0 stopped,   0 zombie
%Cpu(s):  5.2 us,  2.1 sy,  0.0 ni, 92.5 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   7864.3 total,   2100.2 free,   3500.1 used,   2264.0 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   4000.2 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1234 swadeep   20   0  825620 112340  28960 S   6.2   1.4   0:34.21 chrome
   5678 root      20   0  120000  45000  12000 S   2.1   0.6   2:45.10 snapd
    ...`}</pre>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <svg width="260" height="180" viewBox="0 0 260 180" className="hover:scale-[1.02] transition-transform">
                  <rect x="10" y="10" width="240" height="160" rx="8" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#fbbf24" fontSize="8">top - 10:23:45</text>
                  <text x="20" y="45" fill="#9ca3af" fontSize="7">Tasks: 123 total, 1 running</text>
                  <text x="20" y="60" fill="#9ca3af" fontSize="7">%Cpu(s): 5.2 us, 2.1 sy</text>
                  <rect x="20" y="75" width="100" height="12" fill="#3b82f6" />
                  <rect x="20" y="92" width="50" height="12" fill="#ef4444" />
                  <text x="20" y="118" fill="#e5e7eb" fontSize="7">PID  USER  %CPU  %MEM  COMMAND</text>
                  <text x="20" y="132" fill="#9ca3af" fontSize="7">1234  root   6.2   1.4  chrome</text>
                  <text x="20" y="146" fill="#9ca3af" fontSize="7">5678  user   2.1   0.6  snapd</text>
                  <circle cx="210" cy="30" r="6" fill="#10b981">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Key sections explained */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">🧩 Understanding the <code>top</code> Display</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <h3 className="font-bold text-yellow-600">📈 Header Area</h3>
                <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                  <li><strong>load average:</strong> 1,5,15 minute average of active processes.</li>
                  <li><strong>Tasks:</strong> total, running, sleeping, zombie counts.</li>
                  <li><strong>%Cpu(s):</strong> user, system, nice, idle, wait, etc.</li>
                  <li><strong>Mem/Swap:</strong> total, free, used, buff/cache.</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <h3 className="font-bold text-yellow-600">⌨️ Process List</h3>
                <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                  <li><strong>PID:</strong> Process ID.</li>
                  <li><strong>%CPU / %MEM:</strong> resource usage.</li>
                  <li><strong>RES:</strong> physical memory used.</li>
                  <li><strong>SHR:</strong> shared memory.</li>
                  <li><strong>TIME+:</strong> cumulative CPU time.</li>
                  <li><strong>COMMAND:</strong> executable name.</li>
                </ul>
              </div>
            </div>
            <div className="mt-5 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm">💡 <strong>Interactive keys</strong> – while <code>top</code> is running:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs font-mono">
                <span><kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">q</kbd> – quit</span>
                <span><kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">h</kbd> – help</span>
                <span><kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">P</kbd> – sort by CPU</span>
                <span><kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">M</kbd> – sort by memory</span>
                <span><kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">k</kbd> – kill process</span>
                <span><kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">r</kbd> – renice (priority)</span>
                <span><kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">s</kbd> – change delay</span>
                <span><kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">1</kbd> – toggle CPU cores</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Batch mode & demo script */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">🤖 Batch Mode: <code>top -b -n 1</code></h2>
            <p className="mb-3">For scripts and logging, use batch mode. One iteration captures the full output without the interactive UI.</p>
            <ShellFileLoader
              fileModule={topBatchDemo}
              title="📁 top_batch_demo.sh – sample snapshot logging"
              highlightLines={[5, 10]}
            />
            <div className="mt-4 text-sm bg-gray-900 text-gray-100 p-3 rounded-md">
              <p className="text-green-300">$ bash top_batch_demo.sh</p>
              <p className="text-gray-300">[INFO] Capturing top snapshot ...</p>
              <p className="text-gray-400">top - 14:32:10 up 1 day ...</p>
              <p className="text-gray-400">Tasks: 210 total, 2 running, ...</p>
              <p className="text-gray-400">... (full snapshot saved to snapshot.log)</p>
            </div>
          </div>
        </div>

        {/* Section 5: Pro Tips */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
            <h2 className="text-xl font-bold flex items-center gap-2">💡 Professional Tips & Tricks</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> Press <kbd>1</kbd> to view per‑CPU core statistics.</li>
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> Use <code>top -u username</code> to monitor a specific user.</li>
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> <code>top -p PID1,PID2</code> monitor specific PIDs only.</li>
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> Interactive command <kbd>V</kbd> (uppercase) toggles forest view (tree).</li>
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> Save custom defaults: write config file – run <kbd>W</kbd> inside <code>top</code>.</li>
            </ul>
          </div>
        </div>

        {/* Section 6: Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Misreading load average – high load doesn't always mean high CPU usage (could be I/O).</li>
              <li>Forgetting that <code>top</code> itself consumes some CPU (usually negligible).</li>
              <li>Using batch mode without <code>-n 1</code> – it will run forever.</li>
              <li>Assuming <code>%CPU</code> sums to 100%: On multi‑core systems it can exceed 100%.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always check load average + %wa (I/O wait) together.</li>
              <li>Sort by memory (<kbd>M</kbd>) to find memory leaks.</li>
              <li>Use <code>top -b -n 1 | head -20</code> for quick scripts.</li>
              <li>Combine <code>top</code> with <code>grep</code> in batch mode: <code>top -b -n 1 | grep "Cpu(s)"</code>.</li>
            </ul>
          </div>
        </div>

        {/* Section 7: Hint */}
        <div className="animate-fade-slide-up bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold flex gap-2">🧠 Think about...</h3>
          <p className="italic">Observe carefully: Start a CPU‑intensive task (like <code>dd if=/dev/zero of=/dev/null &</code>) and watch the <code>%Cpu(s)</code> line in <code>top</code>. How does the <strong>us</strong> (user space) value change? Now press <kbd>1</kbd> – how many cores are 100% busy?</p>
        </div>

        {/* Section 8: Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-2xl animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
          <h3 className="font-bold text-lg">📋 Student Checklist – <code>top</code> Command</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can interpret load average (1,5,15 minutes).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know how to sort by CPU (<kbd>P</kbd>) and memory (<kbd>M</kbd>).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can kill a process from inside <code>top</code> (<kbd>k</kbd>).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I understand difference between %CPU and TIME+.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can run <code>top</code> in batch mode for logging.</label>
          </div>
        </div>

        {/* Section 9: FAQ */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <FAQTemplate title="top Command – Frequently Asked Questions" questions={questions} />
        </div>

        {/* Section 10: Teacher's Note */}
        <div className="animate-fade-slide-up border-t-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-xl shadow-md hover:shadow-lg transition" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-yellow-200 dark:bg-yellow-800 rounded-full p-3 text-3xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Teacher’s Note — Sukanta Hui</h3>
              <p className="text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 +91 7003756860</p>
              <p className="text-sm">🔧 <strong>{teacherExperience} years of experience</strong> (since 1998) — Programming, RDBMS, OS, Web Development</p>
              <p className="mt-3 italic">“My student Debangshu from Ichapur once complained that the server was slow. I taught him to look at <code>%wa</code> (I/O wait) in top – it was high. He found a misconfigured backup script thrashing the disk. <code>top</code> is your stethoscope for the system.” — Sukanta Hui</p>
              <div className="mt-2 text-yellow-700 dark:text-yellow-300 text-sm font-mono">🔥 Advanced Tip: <code>htop</code> is a nicer alternative, but <code>top</code> is always there – master it first.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic2;