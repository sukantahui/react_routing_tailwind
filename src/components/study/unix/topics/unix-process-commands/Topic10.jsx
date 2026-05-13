import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic10_files/topic10_questions';

// Import scenario scripts
import scenario1Cleanup from './topic10_files/scenario1_cleanup.sh?raw';
import scenario2Monitor from './topic10_files/scenario2_monitor.sh?raw';
import scenario3Batch from './topic10_files/scenario3_batch.sh?raw';
import scenario4SafeKill from './topic10_files/scenario4_safekill.sh?raw';
import scenario5LogRotate from './topic10_files/scenario5_logrotate.sh?raw';
import scenario6WebServer from './topic10_files/scenario6_webserver.sh?raw';

const Topic10 = () => {
  const currentYear = new Date().getFullYear();
  const teachingExperience = currentYear - 1998;

  return (
    <div className="dark min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Common Process Management Scenarios
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-world situations and practical solutions using process control tools
          </p>
        </div>

        {/* Theory: Why Scenarios Matter */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 animate-[fadeSlideUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.1s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4 mb-4">
            Process Management in Practice
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              Knowing the commands (<code>ps</code>, <code>top</code>, <code>kill</code>, <code>bg</code>, <code>fg</code>, <code>jobs</code>, <code>nice</code>, <code>nohup</code>) is one thing; applying them to solve real problems is another. This topic brings together everything you've learned into practical, everyday scenarios faced by system administrators, developers, and power users.
            </p>
            <p>
              From cleaning up runaway processes to scheduling batch jobs safely, these scenarios will help you think like a professional. We'll work through examples inspired by real classrooms and production systems.
            </p>
          </div>

          {/* SVG Illustration: Process Management Workflow */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg viewBox="0 0 800 180" className="w-full h-auto" aria-label="Process management workflow">
              <rect x="20" y="20" width="140" height="50" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
              <text x="90" y="50" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">Identify</text>
              
              <rect x="220" y="20" width="140" height="50" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="290" y="50" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">Analyze</text>
              
              <rect x="420" y="20" width="140" height="50" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="490" y="50" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Act</text>
              
              <rect x="620" y="20" width="140" height="50" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
              <text x="690" y="50" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">Verify</text>

              <path d="M160 45 L210 45" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowSmall)" />
              <path d="M360 45 L410 45" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowSmall)" />
              <path d="M560 45 L610 45" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowSmall)" />

              <defs>
                <marker id="arrowSmall" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
                </marker>
              </defs>
            </svg>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Systematic approach to handling process issues: Identify → Analyze → Act → Verify
            </p>
          </div>
        </div>

        {/* Scenario 1: Handling runaway processes */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.15s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-red-500 pl-4 mb-4">
            Scenario 1: Runaway Process Eating CPU
          </h2>
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="font-medium text-red-800 dark:text-red-300">Problem:</p>
              <p className="text-gray-700 dark:text-gray-300">A misbehaving script (e.g., infinite loop) is consuming 100% CPU, slowing down the entire system. You need to locate and terminate it without rebooting.</p>
            </div>
            <ShellFileLoader
              fileModule={scenario1Cleanup}
              title="Solution: Identify and Kill Runaway Process"
              highlightLines={[7, 12, 18]}
            />
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded text-sm">
              <p><strong className="text-blue-600 dark:text-blue-400">Pro Tip:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">top -p PID</code> to monitor a single process in real-time before killing.</p>
            </div>
          </div>
        </div>

        {/* Scenario 2: Monitoring Logs While Working */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.2s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-yellow-500 pl-4 mb-4">
            Scenario 2: Monitoring Logs in Background
          </h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="font-medium text-yellow-800 dark:text-yellow-300">Problem:</p>
              <p className="text-gray-700 dark:text-gray-300">You need to watch a log file for errors, but you also need to keep using the terminal for other commands. Running <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">tail -f</code> in foreground blocks the shell.</p>
            </div>
            <ShellFileLoader
              fileModule={scenario2Monitor}
              title="Solution: Background tail with job control"
              highlightLines={[6, 12, 19]}
            />
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded text-sm">
              <p><strong className="text-blue-600 dark:text-blue-400">Think about…</strong> How would you stop the background <code>tail -f</code> without killing it? (Hint: <code>fg</code> then Ctrl+C)</p>
            </div>
          </div>
        </div>

        {/* Scenario 3: Batch Processing with Nice */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.25s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4 mb-4">
            Scenario 3: Low-Priority Batch Job
          </h2>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="font-medium text-green-800 dark:text-green-300">Problem:</p>
              <p className="text-gray-700 dark:text-gray-300">You need to run a large data compression or backup that might take hours, but you don't want it to interfere with interactive tasks. It should yield CPU to other processes.</p>
            </div>
            <ShellFileLoader
              fileModule={scenario3Batch}
              title="Solution: nice + background + nohup"
              highlightLines={[5, 9, 14]}
            />
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded text-sm">
              <p><strong className="text-blue-600 dark:text-blue-400">Pro Technique:</strong> Combine <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">renice</code> on already running processes: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">renice +10 -p PID</code>.</p>
            </div>
          </div>
        </div>

        {/* Scenario 4: Safe Termination of Stale Jobs */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.3s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4 mb-4">
            Scenario 4: Killing Stale or Hung Processes
          </h2>
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="font-medium text-purple-800 dark:text-purple-300">Problem:</p>
              <p className="text-gray-700 dark:text-gray-300">An application has become unresponsive (hung). Sending a normal SIGTERM (kill -15) does nothing. You need to force terminate it, but want to avoid collateral damage.</p>
            </div>
            <ShellFileLoader
              fileModule={scenario4SafeKill}
              title="Solution: Escalate signals safely"
              highlightLines={[8, 14, 22]}
            />
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded text-sm">
              <p><strong className="text-blue-600 dark:text-blue-400">Safety First:</strong> Always try <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">kill -15</code> before <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">kill -9</code>. SIGKILL shouldn't be your first resort.</p>
            </div>
          </div>
        </div>

        {/* Scenario 5: Log Rotation with HUP Signal */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.35s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-indigo-500 pl-4 mb-4">
            Scenario 5: Reloading Configuration with SIGHUP
          </h2>
          <div className="space-y-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <p className="font-medium text-indigo-800 dark:text-indigo-300">Problem:</p>
              <p className="text-gray-700 dark:text-gray-300">You've changed a configuration file (e.g., <code>/etc/nginx/nginx.conf</code>). Instead of restarting the service (which would cause downtime), you want to reload gracefully.</p>
            </div>
            <ShellFileLoader
              fileModule={scenario5LogRotate}
              title="Solution: Using SIGHUP for graceful reload"
              highlightLines={[5, 12, 18]}
            />
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded text-sm">
              <p><strong className="text-blue-600 dark:text-blue-400">Classroom Note:</strong> Many daemons treat SIGHUP as a configuration reload signal. Check documentation; some use SIGUSR1 or SIGUSR2.</p>
            </div>
          </div>
        </div>

        {/* Scenario 6: Keeping a Web Server Process Alive After Logout */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.4s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4 mb-4">
            Scenario 6: Long-Running Server Startup on SSH
          </h2>
          <div className="space-y-4">
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
              <p className="font-medium text-teal-800 dark:text-teal-300">Problem:</p>
              <p className="text-gray-700 dark:text-gray-300">You SSH into a remote machine, start a development web server, then need to disconnect. But the server dies when you log out because of SIGHUP.</p>
            </div>
            <ShellFileLoader
              fileModule={scenario6WebServer}
              title="Solution: nohup + disown + background"
              highlightLines={[7, 13, 20]}
            />
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded text-sm">
              <p><strong className="text-blue-600 dark:text-blue-400">Pro Tip:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">screen</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">tmux</code> for persistent sessions – more robust than nohup alone.</p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls in Real Scenarios */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.45s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-red-500 pl-4 mb-4">
            Common Pitfalls in Scenario-Based Process Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2"><span className="text-red-500 text-lg">⚠️</span><p><strong>Killing the wrong process</strong> – Double-check PIDs with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ps aux | grep pattern</code> before kill.</p></div>
              <div className="flex items-start gap-2"><span className="text-red-500 text-lg">⚠️</span><p><strong>Forgetting to redirect output</strong> – Background jobs writing to terminal can cause confusion when you switch workspaces.</p></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2"><span className="text-red-500 text-lg">⚠️</span><p><strong>Assuming nice works for I/O</strong> – <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">nice</code> affects CPU only; use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ionice</code> for disk priority.</p></div>
              <div className="flex items-start gap-2"><span className="text-red-500 text-lg">⚠️</span><p><strong>Not checking job status after logout</strong> – If you use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">nohup</code> but forget <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&amp;</code>, it still runs in foreground blocking logout.</p></div>
            </div>
          </div>
        </div>

        {/* Best Practices Summary */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.5s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4 mb-4">
            Best Practices & Pro Mindset
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">✅ Professional Habits</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mt-2">
                <li>Always verify before kill: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ps -ef | grep -E "pattern1|pattern2"</code></li>
                <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">kill -l</code> to list signals prior to sending.</li>
                <li>Redirect output of any background job: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">command &gt; log 2&gt;&amp;1 &amp;</code></li>
                <li>For critical production processes, use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">systemd</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">supervisord</code>, not manual background.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 dark:text-green-400">💡 Debugging Mindset</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mt-2">
                <li>When a process misbehaves, check its state: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ps -o pid,stat,comm -p PID</code></li>
                <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">strace -p PID</code> to see system calls (advanced).</li>
                <li>Monitor system load with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">htop</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">top -c</code>.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 flex items-center gap-2">💭 Think About…</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">You have a script that starts 10 background jobs. How would you reliably kill all of them if one fails? Could you use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pkill -P $$</code>? What are the risks?</p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.55s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.55s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4 mb-4">
            Scenario Mastery Checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Identify runaway processes using top/ps",
              "Gracefully terminate with SIGTERM before SIGKILL",
              "Run long tasks in background with & and job control",
              "Use nice/renice to manage CPU priority",
              "Keep processes alive after logout with nohup or disown",
              "Redirect output from background jobs to avoid clutter",
              "Send SIGHUP to reload configurations gracefully",
              "Combine tools (ps, grep, kill, jobs, fg, bg) fluidly"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-500 text-xl">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.6s] [animation-fill-mode:forwards]">
          <FAQTemplate title="Process Management Scenarios – FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900/80 border border-blue-200 dark:border-blue-800/50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] animate-[fadeSlideUp_0.5s_ease-out_0.65s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.65s] [animation-fill-mode:forwards]">
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
                  <p className="italic">"Over my {teachingExperience} years in the classroom at Barrackpore and Shyamnagar, I've seen students like Swadeep, Abhronila, and Debangshu excel when they stop memorizing commands and start thinking in scenarios. When Tuhina asked, 'How do I keep my download running after I close the laptop?' that was the perfect moment to teach nohup and disown. The key is to connect each tool to a real pain point. Practice each scenario until it becomes second nature."</p>
                </div>
                <div className="mt-2 text-sm">
                  <p><strong>🌟 Final Takeaway:</strong> Process management is not about isolated commands but about solving problems. Master these six scenarios, and you'll handle 90% of real-world situations.</p>
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

export default Topic10;