import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';

// Import shell script files
import fgBgDemo from './topic9_files/fg_bg_demo.sh?raw';
import bgNotification from './topic9_files/bg_notification.sh?raw';
import jobControlCompare from './topic9_files/job_control_compare.sh?raw';

const Topic9 = () => {
  const currentYear = new Date().getFullYear();
  const teachingExperience = currentYear - 1998;

  return (
    <div className="dark min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Foreground vs Background Processes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding how processes interact with your terminal and multitasking in Unix/Linux
          </p>
        </div>

        {/* Theory: Definitions & Key Differences */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 animate-[fadeSlideUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.1s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4 mb-4">
            What Are Foreground and Background?
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              When you run a command in the terminal, it executes in the <strong className="text-blue-600 dark:text-blue-400">foreground</strong> by default. 
              This means the shell waits for the command to finish before showing you a new prompt. You cannot interact with the shell while the 
              foreground process is running.
            </p>
            <p>
              A <strong className="text-green-600 dark:text-green-400">background process</strong> runs independently, allowing the shell to immediately 
              accept new commands. You start one by appending an ampersand (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">&amp;</code>) 
              to the command. Background processes are ideal for long-running tasks that don't need user input.
            </p>
          </div>

          {/* SVG: Visual comparison */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg viewBox="0 0 800 250" className="w-full h-auto" aria-label="Foreground vs Background visual">
              {/* Foreground side */}
              <rect x="30" y="30" width="340" height="180" rx="12" fill="#3b82f6" fillOpacity="0.05" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
              <text x="200" y="65" textAnchor="middle" fill="#3b82f6" fontSize="18" fontWeight="bold">Foreground</text>
              <text x="200" y="95" textAnchor="middle" fill="#4b5563" fontSize="14">Shell waits → no prompt</text>
              <rect x="80" y="115" width="240" height="40" rx="6" fill="#3b82f6" fillOpacity="0.2" />
              <text x="200" y="140" textAnchor="middle" fill="#1e3a8a" fontSize="13">Command running</text>
              <text x="200" y="175" textAnchor="middle" fill="#6b7280" fontSize="12">User cannot type new commands</text>

              {/* Background side */}
              <rect x="430" y="30" width="340" height="180" rx="12" fill="#10b981" fillOpacity="0.05" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
              <text x="600" y="65" textAnchor="middle" fill="#10b981" fontSize="18" fontWeight="bold">Background</text>
              <text x="600" y="95" textAnchor="middle" fill="#4b5563" fontSize="14">Shell returns prompt immediately</text>
              <rect x="480" y="115" width="240" height="30" rx="6" fill="#10b981" fillOpacity="0.2" />
              <text x="600" y="135" textAnchor="middle" fill="#065f46" fontSize="13">Long task (sleep, backup...)</text>
              <text x="600" y="170" textAnchor="middle" fill="#6b7280" fontSize="12">User can run other commands</text>

              <defs>
                <marker id="arrowRight" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
                </marker>
              </defs>
              <path d="M370 120 L420 120" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowRight)" />
              <text x="395" y="110" textAnchor="middle" fill="#9ca3af" fontSize="11">vs</text>
            </svg>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Foreground blocks the shell; background runs alongside it
            </p>
          </div>
        </div>

        {/* Key Differences Table */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.15s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4 mb-4">
            Comparison Table
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aspect</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Foreground</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Background</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Shell availability</td><td className="px-4 py-2">Blocked until completion</td><td className="px-4 py-2">Immediately ready for new commands</td></tr>
                <tr><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Job control signals</td><td className="px-4 py-2">Can be suspended (Ctrl+Z) or interrupted (Ctrl+C)</td><td className="px-4 py-2">No direct terminal signals unless brought to foreground</td></tr>
                <tr><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Input from terminal</td><td className="px-4 py-2">Can read stdin (keyboard)</td><td className="px-4 py-2">Cannot read stdin; will stop if trying</td></tr>
                <tr><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Output to terminal</td><td className="px-4 py-2">Visible directly (may clutter)</td><td className="px-4 py-2">Also visible but can be redirected</td></tr>
                <tr><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Start method</td><td className="px-4 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">command</code></td><td className="px-4 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">command &</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Command signatures for job control */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.2s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4 mb-4">
            Essential Job Control Commands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <code className="text-green-600 dark:text-green-400 font-mono">fg [%jobID]</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bring a background or suspended job to foreground</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <code className="text-green-600 dark:text-green-400 font-mono">bg [%jobID]</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Resume a stopped job in the background</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <code className="text-green-600 dark:text-green-400 font-mono">jobs [-l]</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">List background and stopped jobs</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+Z</kbd>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Suspend foreground job (move to stopped state)</p>
            </div>
          </div>
        </div>

        {/* Real-world examples with shell scripts */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.25s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4 mb-4">
            Practical Examples
          </h2>
          <div className="space-y-6">
            <ShellFileLoader
              fileModule={fgBgDemo}
              title="Switching between foreground and background"
              highlightLines={[6, 12, 18]}
            />
            <ShellFileLoader
              fileModule={bgNotification}
              title="Background task with completion notification"
              highlightLines={[8, 14]}
            />
            <ShellFileLoader
              fileModule={jobControlCompare}
              title="Interactive comparison script"
              highlightLines={[4, 9, 15]}
            />
          </div>
        </div>

        {/* <!-- Common Pitfalls --> */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.3s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-red-500 pl-4 mb-4">
            Common Pitfalls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span><p><strong>Background jobs may read from stdin</strong> – they will stop (SIGTTIN) if they attempt to read input. Always redirect stdin or ensure they don't need it.</p></div>
              <div className="flex items-start gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span><p><strong>Output clutter</strong> – background jobs still write to terminal. Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&gt; logfile 2&gt;&amp;1</code> to redirect.</p></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span><p><strong>Forgetting to disown</strong> – background jobs die when the shell exits unless you <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">disown</code> them or use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">nohup</code>.</p></div>
              <div className="flex items-start gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span><p><strong>Ctrl+C kills foreground only</strong> – It does not affect background processes. You need <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">kill %jobID</code>.</p></div>
            </div>
          </div>
        </div>

        {/* Best Practices & Tips */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.35s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4 mb-4">
            Best Practices & Pro Tips
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">✅ Daily Habits</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mt-2">
                <li>Run long compilations, backups, or simulations in background with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&amp;</code>.</li>
                <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jobs -l</code> to monitor background tasks.</li>
                <li>Suspend an editor with <kbd>Ctrl+Z</kbd> to quickly run a command, then <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">fg</code> to return.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 dark:text-green-400">💡 Pro Techniques</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mt-2">
                <li>Create alias: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">alias bgkill='kill %1'</code> for quick termination.</li>
                <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">(command &amp;)</code> to start a background job in a subshell – it cannot be <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">fg</code>'d but survives terminal disown tricks.</li>
                <li>Combine <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">nohup</code> with background for truly detached execution.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 flex items-center gap-2">💭 Think About…</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">What happens if you start a background process that expects user confirmation (like <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">rm -i file.txt &amp;</code>)? Try it in a safe directory. Why does the process stop?</p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.4s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4 mb-4">
            Mini Checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "I can start a command in foreground and background",
              "I know how to suspend a foreground job with Ctrl+Z",
              "I can list jobs and identify the current (+) job",
              "I understand that background jobs cannot read from terminal",
              "I can bring a background job to foreground with fg",
              "I redirect output of background jobs to avoid clutter",
              "I know that closing the terminal kills background jobs unless disowned",
              "I can use jobs, fg, and bg fluently"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-500 text-xl">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.5s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.45s] [animation-fill-mode:forwards]">
          <FAQTemplate title="Foreground vs Background – FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900/80 border border-blue-200 dark:border-blue-800/50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] animate-[fadeSlideUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.5s] [animation-fill-mode:forwards]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-2xl">👨‍🏫</div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Teacher's Note</h2>
              <div className="border-l-4 border-blue-500 pl-4 text-gray-700 dark:text-gray-300 space-y-2">
                <p className="font-medium">Sukanta Hui</p>
                <p className="text-sm">📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                <p className="text-sm">💻 Programming Language, RDBMs, Operating System, Web Development</p>
                <p className="text-sm">🎓 {teachingExperience} years of teaching experience (since 1998)</p>
                <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="italic">"Students in my Barrackpore and Shyamnagar classes often ask: 'Why would I use background processes?' Remember, when Debangshu runs a large data import, or Abhronila compiles code, background processes let them continue working. The key insight: the shell is a job manager. Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">jobs</code> often to stay aware."</p>
                </div>
                <div className="mt-2 text-sm">
                  <p><strong>🌟 Core Takeaway:</strong> Foreground is for interactive, short tasks; background is for long-running, non-interactive work. Mastering this split makes you a power user.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .motion-safe\\:animate-\\[fadeSlideUp_.*\\] { animation: none !important; opacity: 1 !important; transform: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic9;