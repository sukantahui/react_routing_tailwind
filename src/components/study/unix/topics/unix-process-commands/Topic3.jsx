// Topic3.jsx
import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import killDemoScript from './topic3_files/kill_demo.sh?raw';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';

/**
 * Topic3: kill Command – Terminating Processes with Signals
 * 
 * Covers:
 * - Sending signals to processes using kill (default SIGTERM -15)
 * - SIGKILL (-9) for forced termination
 * - Listing available signals (kill -l)
 * - Checking process existence before killing
 * - Safety and best practices
 * 
 * @returns {JSX.Element}
 */
const Topic3 = () => {
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes softPulseRed {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(239,68,68,0.3)); }
      50% { filter: drop-shadow(0 0 8px rgba(239,68,68,0.7)); }
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
          <div className="border-l-4 border-red-500 pl-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-700 to-pink-600 dark:from-red-400 dark:to-pink-300 bg-clip-text text-transparent">
              kill Command – Terminating Processes
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Sending signals to processes: graceful exit (SIGTERM) vs. force kill (SIGKILL)
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">kill</code> command sends signals to processes. 
            Contrary to its name, it is not only for termination – it can deliver many signals (e.g., pause, resume, reload config). 
            However, the most common use is terminating unresponsive or unwanted processes.
          </p>
        </div>

        {/* Signal Basics + SVG analogy */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">🔔</span> Signals: Software Interrupts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p>Signals are asynchronous notifications sent to a process. The <code>kill</code> command sends signals by number or name.</p>
                <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
                  <li><strong>SIGTERM (15)</strong> – Default. Asks process to terminate gracefully (clean up, close files).</li>
                  <li><strong>SIGKILL (9)</strong> – Force kill. Process cannot ignore or handle it; OS immediately removes it.</li>
                  <li><strong>SIGSTOP (19/17/...)</strong> – Pause process (cannot be caught).</li>
                  <li><strong>SIGCONT (18)</strong> – Resume a stopped process.</li>
                  <li><strong>SIGHUP (1)</strong> – Hangup; often used to reload configuration.</li>
                </ul>
                <div className="mt-4 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                  <p className="text-sm">⚠️ <strong>Important:</strong> SIGKILL (<code>-9</code>) should be the last resort. It gives the process no chance to save data or clean up temporary files.</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <svg width="260" height="170" viewBox="0 0 260 170" className="hover:scale-[1.02] transition-transform">
                  <rect x="20" y="30" width="100" height="60" rx="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" />
                  <text x="70" y="58" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Process</text>
                  <text x="70" y="72" textAnchor="middle" fill="#6b7280" fontSize="8">PID=1234</text>
                  {/* Signal arrow */}
                  <line x1="120" y1="55" x2="155" y2="55" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="10;0" dur="0.6s" repeatCount="indefinite" />
                  </line>
                  <polygon points="157,50 170,55 157,60" fill="#3b82f6" />
                  <rect x="175" y="15" width="70" height="35" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
                  <text x="210" y="36" textAnchor="middle" fill="#3b82f6" fontSize="10">kill -15</text>
                  <text x="210" y="48" textAnchor="middle" fill="#6b7280" fontSize="8">SIGTERM</text>
                  {/* Two outcomes */}
                  <path d="M210 50 L210 90" stroke="#9ca3af" strokeWidth="1.5" />
                  <line x1="175" y1="120" x2="130" y2="120" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3" />
                  <rect x="20" y="105" width="100" height="30" rx="6" fill="#10b981" fillOpacity="0.15" stroke="#10b981" />
                  <text x="70" y="124" textAnchor="middle" fill="#10b981" fontSize="9">Graceful exit</text>
                  <line x1="245" y1="50" x2="245" y2="120" stroke="#ef4444" strokeWidth="1.5" />
                  <rect x="195" y="105" width="100" height="30" rx="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" />
                  <text x="245" y="124" textAnchor="middle" fill="#ef4444" fontSize="9">Instant termination</text>
                  <text x="245" y="138" textAnchor="middle" fill="#9ca3af" fontSize="7">(no cleanup)</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Basic syntax and examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">📝 Syntax & Common Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <code className="text-sm font-mono">kill [signal] PID</code>
                <div className="mt-3 space-y-2 text-sm">
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">kill 1234</span> → sends SIGTERM (15) to PID 1234</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">kill -15 1234</span> → same as default</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">kill -9 1234</span> → forceful SIGKILL</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">kill -l</span> → list all signal names</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">kill -HUP 5678</span> → reload configuration (e.g., nginx)</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-bold text-red-600">⚠️ Caution with SIGKILL</h3>
                <p className="text-sm mt-2">Imagine Abhronila editing a file in <code>vim</code>. Sending <code>kill -9</code> will lose unsaved changes. Always try SIGTERM first.</p>
                <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                  <p>❌ <span className="line-through">kill -9 `pgrep firefox`</span> (Firefox may corrupt profile)</p>
                  <p>✅ <span>kill `pgrep firefox`</span> → ask Firefox to close gracefully</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo script with kill in action */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">🔧 Live Demo: Starting and Killing Processes</h2>
            <p className="mb-3">This script starts background processes, shows how to terminate them using different signals, and observes the difference.</p>
            <ShellFileLoader
              fileModule={killDemoScript}
              title="📁 kill_demo.sh – signal demonstration"
              highlightLines={[12, 21, 28]}
            />
            <div className="mt-4 text-sm bg-gray-900 text-gray-100 p-3 rounded-md">
              <p className="text-green-300">$ bash kill_demo.sh</p>
              <p className="text-gray-300">[1] 26501 sleep 200</p>
              <p className="text-gray-300">Sending SIGTERM (15) to PID 26501...</p>
              <p className="text-gray-300">Process 26501 terminated gracefully (exit code 0).</p>
            </div>
          </div>
        </div>

        {/* Pro Tips section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-red-200 dark:border-red-800">
            <h2 className="text-xl font-bold flex items-center gap-2">💡 Professional Tips & Tricks</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex gap-2"><span className="text-red-600">🔹</span> <code>kill -0 PID</code> checks if process exists (sends no signal, just error checking).</li>
              <li className="flex gap-2"><span className="text-red-600">🔹</span> Use <code>pgrep</code> to find PIDs: <code>kill $(pgrep -f "script.py")</code>.</li>
              <li className="flex gap-2"><span className="text-red-600">🔹</span> Kill all processes of a user: <code>pkill -u username</code> (be careful!).</li>
              <li className="flex gap-2"><span className="text-red-600">🔹</span> <code>killall firefox</code> kills all processes named 'firefox'.</li>
              <li className="flex gap-2"><span className="text-red-600">🔹</span> Resume a stopped process: <code>kill -CONT PID</code> (or <code>fg</code>/<code>bg</code>).</li>
            </ul>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Killing a parent shell (e.g., <code>kill $$</code>) can log you out.</li>
              <li>Using <code>kill -9</code> on a database may corrupt data (no flush).</li>
              <li>Not having permission to kill another user's process (only root or owner).</li>
              <li>Confusing signal numbers: <code>-9</code> is SIGKILL, <code>-15</code> is SIGTERM.</li>
              <li>Typing <code>kill -9 -1</code> (negative PID) kills all processes you own – dangerous!</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always try plain <code>kill PID</code> (SIGTERM) first.</li>
              <li>Wait a few seconds before escalating to <code>-9</code>.</li>
              <li>Use <code>pkill -f "pattern"</code> carefully – test with <code>pgrep -f "pattern"</code> first.</li>
              <li>Log operations: <code>kill -15 PID &amp;&amp; logger "Terminated PID"</code>.</li>
              <li>In scripts, use <code>kill -0 PID &amp;&amp; echo "Process exists"</code> for checks.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-fade-slide-up bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold flex gap-2">🧠 Think about...</h3>
          <p className="italic">Observe carefully: Run <code>sleep 500 &amp;</code>. Note its PID. Now run <code>kill -0 PID</code> (replace PID). Check <code>echo $?</code> (exit code 0 = exists). Then run <code>kill PID</code> and again <code>kill -0 PID</code> – what changed? What does <code>-0</code> tell you?</p>
        </div>

        {/* Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-2xl animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
          <h3 className="font-bold text-lg">📋 Student Checklist – kill Command</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I understand the difference between SIGTERM (15) and SIGKILL (9).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can send a signal to a process using its PID.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know how to list all available signals (<code>kill -l</code>).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can check if a process exists using <code>kill -0</code>.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I avoid using <code>kill -9</code> as first choice.</label>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <FAQTemplate title="kill Command – Frequently Asked Questions" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up border-t-4 border-red-400 bg-red-50 dark:bg-red-950/20 p-6 rounded-xl shadow-md hover:shadow-lg transition" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-red-200 dark:bg-red-800 rounded-full p-3 text-3xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Teacher’s Note — Sukanta Hui</h3>
              <p className="text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 +91 7003756860</p>
              <p className="text-sm">🔧 <strong>{teacherExperience} years of experience</strong> (since 1998) — Programming, RDBMS, OS, Web Development</p>
              <p className="mt-3 italic">“I recall a student, Tuhina from Naihati, who accidentally ran <code>kill -9 -1</code> on a production machine and logged herself out. Ever since, I teach: never use <code>-9</code> unless you understand the consequences. Practice with <code>sleep</code> and harmless scripts first.” — Sukanta Hui</p>
              <div className="mt-2 text-red-700 dark:text-red-300 text-sm font-mono">🔥 Pro move: Use <code>timeout 10s command</code> instead of manually killing after a delay.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic3;