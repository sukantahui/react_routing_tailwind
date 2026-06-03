// Topic8.jsx
import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import nohupDemoScript from './topic8_files/nohup_demo.sh?raw';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';

/**
 * Topic8: nohup Command – Running Processes Immune to Hangups
 * 
 * Covers:
 * - SIGHUP (hangup) signal and why it's sent on terminal logout
 * - Using `nohup` to ignore SIGHUP and continue running after logout
 * - Output redirection (nohup.out)
 * - Differences between `nohup`, `&`, `disown`
 * - Practical use cases for long‑running server tasks and scheduled jobs
 * 
 * @returns {JSX.Element}
 */
const Topic8 = () => {
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes hangupProtect {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(34,197,94,0.3)); }
      50% { filter: drop-shadow(0 0 12px rgba(34,197,94,0.8)); }
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
          <div className="border-l-4 border-green-600 pl-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent">
              nohup Command – Logout‑Safe Process Execution
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Run commands that survive terminal logout (immune to SIGHUP)
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            When you close a terminal or log out from an SSH session, all processes started from that terminal receive a 
            <strong className="text-green-700 dark:text-green-300"> SIGHUP (hangup)</strong> signal, which usually terminates them. 
            The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">nohup</code> command makes a process ignore SIGHUP, allowing it to continue running even after you log out.
            This is essential for long‑running server scripts, data backups, or remote computations.
          </p>
        </div>

        {/* Concept: Terminal logout kills processes – nohup prevents that (SVG) */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">🔌</span> How <code>nohup</code> Protects Processes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-2">Without <code>nohup</code>, closing the terminal sends SIGHUP to every child process.</p>
                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg mb-3">
                  <span className="font-mono text-sm">$ long_task &amp; → logout → process killed ❌</span>
                </div>
                <p>With <code>nohup</code>, the process ignores SIGHUP and keeps running.</p>
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <span className="font-mono text-sm">$ nohup long_task &amp; → logout → process survives ✅</span>
                </div>
                <div className="mt-4 text-sm">
                  <p><strong>Output handling:</strong> <code>nohup</code> automatically appends stdout/stderr to a file named <code>nohup.out</code> in the current directory (or <code>$HOME/nohup.out</code> if not writable).</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <svg width="270" height="180" viewBox="0 0 270 180" className="hover:scale-[1.02] transition-transform">
                  <rect x="10" y="20" width="90" height="45" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
                  <text x="55" y="45" textAnchor="middle" fill="#3b82f6" fontSize="10">Terminal</text>
                  <text x="55" y="58" textAnchor="middle" fill="#6b7280" fontSize="7">SSH session</text>
                  <line x1="100" y1="42" x2="135" y2="42" stroke="#ef4444" strokeWidth="2" strokeDasharray="4">
                    <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite" />
                  </line>
                  <text x="112" y="34" fill="#ef4444" fontSize="8">SIGHUP</text>
                  <rect x="140" y="15" width="80" height="40" rx="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" />
                  <text x="180" y="38" textAnchor="middle" fill="#ef4444" fontSize="9">Process</text>
                  <text x="180" y="50" textAnchor="middle" fill="#6b7280" fontSize="7">(killed)</text>
                  {/* nohup branch */}
                  <line x1="55" y1="65" x2="55" y2="105" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3" />
                  <rect x="10" y="110" width="90" height="45" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
                  <text x="55" y="135" textAnchor="middle" fill="#10b981" fontSize="10">nohup</text>
                  <text x="55" y="148" textAnchor="middle" fill="#6b7280" fontSize="7">ignores SIGHUP</text>
                  <line x1="100" y1="132" x2="235" y2="132" stroke="#10b981" strokeWidth="2" />
                  <polygon points="237,127 250,132 237,137" fill="#10b981" />
                  <text x="190" y="118" fill="#10b981" fontSize="8">Survives logout</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Syntax and usage */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">📝 Syntax & Common Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <code className="text-sm font-mono">nohup command [args] [&]</code>
                <div className="mt-3 space-y-2 text-sm">
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">nohup ./backup.sh &</span> → runs backup in background, survives logout</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">nohup python server.py &gt; server.log 2&gt;&amp;1 &amp;</span> → redirect output to custom file</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">nohup bash -c "cmd1 &amp;&amp; cmd2"</span> → runs compound command</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-bold text-green-600">📂 Output file behaviour</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>If <code>nohup.out</code> exists and is writable, output is appended.</li>
                  <li>If not writable, <code>$HOME/nohup.out</code> is used.</li>
                  <li>You can redirect to another file: <code>nohup command &gt; my.log 2&gt;&amp;1</code></li>
                  <li>To discard output: <code>nohup command &gt; /dev/null 2&gt;&amp;1 &amp;</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Demo script */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">🐚 Live Demo: <code>nohup</code> in Action</h2>
            <p className="mb-3">This script starts a long‑running process with <code>nohup</code>, writes output to a log, and shows how to verify it's still running after a simulated logout.</p>
            <ShellFileLoader
              fileModule={nohupDemoScript}
              title="📁 nohup_demo.sh – logout‑safe execution"
              highlightLines={[9, 14, 22]}
            />
            <div className="mt-4 text-sm bg-gray-900 text-gray-100 p-3 rounded-md">
              <p className="text-green-300">$ bash nohup_demo.sh</p>
              <p className="text-gray-300">Starting logger in background with nohup ...</p>
              <p className="text-gray-300">Output appended to nohup.out</p>
              <p className="text-gray-300">Process PID: 28765</p>
              <p className="text-gray-300">Check with: tail -f nohup.out</p>
              <p className="text-gray-300">Now you can close the terminal – the logger keeps running.</p>
            </div>
          </div>
        </div>

        {/* Comparison table: & vs nohup & vs disown */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.35s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">🔄 Comparison: Backgrounding with & vs nohup</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr><th className="p-2">Method</th><th>Survives logout?</th><th>Output</th><th>Can be `fg` later?</th></tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="p-2"><code>cmd &amp;</code></td><td>❌ No (SIGHUP kills)</td><td>Terminal (messy)</td><td>✅ Yes</td></tr>
                  <tr><td className="p-2"><code>nohup cmd &amp;</code></td><td>✅ Yes</td><td>nohup.out (or redirected)</td><td>❌ Not a shell job</td></tr>
                  <tr><td className="p-2"><code>cmd &amp; ; disown</code></td><td>✅ Yes</td><td>Terminal (messy)</td><td>❌ No</td></tr>
                  <tr><td className="p-2"><code>screen / tmux</code></td><td>✅ Yes</td><td>Detachable session</td><td>✅ Attachable</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3 text-gray-500">💡 <strong>Tip:</strong> Use <code>nohup</code> for simple background tasks; use <code>screen</code> or <code>tmux</code> when you need to reattach later.</p>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-bold flex items-center gap-2">💡 Professional Tips & Tricks</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex gap-2"><span className="text-green-600">🔹</span> Always redirect output: <code>nohup ./script &gt; script.log 2&gt;&amp;1 &amp;</code>.</li>
              <li className="flex gap-2"><span className="text-green-600">🔹</span> Use <code>nohup</code> inside systemd timers or cron if you need process persistence.</li>
              <li className="flex gap-2"><span className="text-green-600">🔹</span> Combine with <code>nice</code>: <code>nice -n 19 nohup backup &amp;</code> (low priority & logout safe).</li>
              <li className="flex gap-2"><span className="text-green-600">🔹</span> In scripts, use <code>nohup $CMD &gt; /dev/null 2&gt;&amp;1 &amp;</code> to silently daemonize.</li>
              <li className="flex gap-2"><span className="text-green-600">🔹</span> To test if a process is immune to SIGHUP, check its signal mask: <code>ps -o pid,sig -p $PID</code>.</li>
            </ul>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Forgetting to redirect output – `nohup.out` can fill up disk space.</li>
              <li>Assuming `nohup` works on shell builtins – `nohup cd` fails; use `nohup bash -c "cd ..."`.</li>
              <li>Expecting that `nohup` detaches the process from the terminal completely – it still inherits file descriptors unless redirected.</li>
              <li>Not using `&` – without backgrounding, the terminal is blocked until the command finishes (but still logout‑safe).</li>
              <li>Thinking `nohup` prevents all signals – it only ignores SIGHUP; SIGTERM or SIGINT still work.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always redirect both stdout and stderr when using `nohup` in scripts.</li>
              <li>Capture the PID right after starting: `nohup cmd &amp; PID=$!` for later monitoring.</li>
              <li>Use absolute paths for commands and output files to avoid surprises after logout.</li>
              <li>For production daemons, consider systemd instead of `nohup` + `&`.</li>
              <li>Test your `nohup` setup by logging out and back in, then checking `ps`.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-fade-slide-up bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold flex gap-2">🧠 Think about...</h3>
          <p className="italic">Observe carefully: Run <code>nohup sleep 300 &amp;</code> and note its PID. Then close the terminal (or exit SSH). Log back in and run <code>ps aux | grep sleep</code>. Is the process still there? What about its parent PID (PPID) – has it changed to 1 (init/systemd)? Why?</p>
        </div>

        {/* Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-2xl animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
          <h3 className="font-bold text-lg">📋 Student Checklist – nohup Command</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know what SIGHUP is and when it is sent.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can start a process with <code>nohup</code> that survives logout.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I understand that <code>nohup</code> redirects output to <code>nohup.out</code> by default.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can redirect output to a custom file.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know the difference between <code>nohup cmd &amp;</code> and <code>cmd &amp; disown</code>.</label>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <FAQTemplate title="nohup Command – Frequently Asked Questions" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up border-t-4 border-green-400 bg-green-50 dark:bg-green-950/20 p-6 rounded-xl shadow-md hover:shadow-lg transition" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-green-200 dark:bg-green-800 rounded-full p-3 text-3xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200">Teacher’s Note — Sukanta Hui</h3>
              <p className="text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 +91 7003756860</p>
              <p className="text-sm">🔧 <strong>{teacherExperience} years of experience</strong> (since 1998) — Programming, RDBMS, OS, Web Development</p>
              <p className="mt-3 italic">“Swadeep from Ichapur once lost a 3‑hour data migration because he closed his laptop. After that, I taught him <code>nohup</code>. Now he always starts long tasks with <code>nohup</code> and redirects output. Remember: production scripts should never rely on an open terminal – use <code>nohup</code> or proper daemonization.” — Sukanta Hui</p>
              <div className="mt-2 text-green-700 dark:text-green-300 text-sm font-mono">🔥 Pro tip: For critical long‑running jobs, use <code>nohup</code> and also log the PID to a file: <code>nohup cmd &amp; echo $! &gt; pidfile</code>.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic8;