import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';

// Import shell script files for demonstration
import longTaskScript from './topic6_files/long_task.sh?raw';
import monitorScript from './topic6_files/monitor_jobs.sh?raw';
import jobControlDemo from './topic6_files/job_control_demo.sh?raw';

const Topic6 = () => {
  // Calculate teacher experience dynamically
  const currentYear = new Date().getFullYear();
  const teachingExperience = currentYear - 1998;

  return (
    <div className={clsx("dark", "min-h-screen py-12 px-4 sm:px-6 lg:px-8")}>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section with Reveal Animation */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            jobs Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Listing all active background jobs in your shell session
          </p>
        </div>

        {/* Theory Section */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 animate-[fadeSlideUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4 mb-4">
            Understanding the jobs Command
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              The <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">jobs</code> command is a built-in shell utility that displays a list of all active background jobs in the current shell session. When you run commands in the background (using <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">&amp;</code>) or suspend them (using <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+Z</kbd>), the shell assigns each job a unique job ID and tracks its state.
            </p>
            <p>
              Each job represents a pipeline or command that the shell manages. Understanding <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">jobs</code> is essential for effective multitasking on Unix-like systems, allowing you to switch between tasks, check their status, and bring them to the foreground when needed.
            </p>
          </div>

          {/* SVG Illustration: Job Control Flow */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg viewBox="0 0 800 300" className="w-full h-auto" aria-label="Job control flow diagram">
              <rect x="20" y="20" width="160" height="60" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2">
                <animate attributeName="fillOpacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
              </rect>
              <text x="100" y="55" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Foreground</text>
              <rect x="320" y="20" width="160" height="60" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2">
                <animate attributeName="fillOpacity" values="0.1;0.2;0.1" dur="3s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="400" y="55" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">Background</text>
              <rect x="620" y="20" width="160" height="60" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />
              <text x="700" y="55" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Stopped</text>
              
              {/* Arrows */}
              <path d="M180 50 L310 50" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowGray)" />
              <path d="M480 50 L610 50" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowGray)" />
              <path d="M400 80 L400 140" stroke="#6b7280" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#arrowGray)" />
              <path d="M700 80 L700 140" stroke="#6b7280" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#arrowGray)" />
              
              <defs>
                <marker id="arrowGray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                </marker>
              </defs>
              
              <text x="245" y="40" fontSize="12" fill="#6b7280">&amp; or bg</text>
              <text x="545" y="40" fontSize="12" fill="#6b7280">Ctrl+Z</text>
              <text x="550" y="120" fontSize="12" fill="#6b7280">fg</text>
              <text x="420" y="120" fontSize="12" fill="#6b7280">jobs</text>
            </svg>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Job state transitions and the role of the jobs command
            </p>
          </div>
        </div>

        {/* Command Prototype & Options */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.15s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4 mb-4">
            Command Signature & Options
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <code className="text-green-400 font-mono text-lg">jobs [-lnprs] [jobID ...]</code>
            <p className="text-gray-400 text-sm mt-2">Built-in shell command | Exit status: 0 if jobs found, 1 otherwise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">Common Options</h3>
              <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">-l</code> - List process IDs (PIDs) along with job information</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">-p</code> - List only process IDs of job group leaders</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">-n</code> - Show only jobs that have changed status since last notification</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">-r</code> - Restrict output to running jobs only</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">-s</code> - Restrict output to stopped jobs only</li>
              </ul>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-green-600 dark:text-green-400">Job ID Formats</h3>
              <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">%n</code> - Job number n (e.g., %1, %2)</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">%string</code> - Job whose command starts with string</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">%?string</code> - Job whose command contains string</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">%%</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">%+</code> - Current job</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 rounded">%-</code> - Previous job</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-world Examples with Shell Scripts */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4 mb-4">
            Practical Examples
          </h2>
          
          <div className="space-y-6">
            <ShellFileLoader
              fileModule={longTaskScript}
              title="Creating background jobs with sleep tasks"
              highlightLines={[3, 5, 7]}
            />
            
            <ShellFileLoader
              fileModule={jobControlDemo}
              title="Interactive job control demonstration"
              highlightLines={[10, 12, 14, 16]}
            />
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sample Terminal Session</h3>
              <pre className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
                {`$ sleep 300 &
[1] 12345
$ nano report.txt
^Z
[2]+  Stopped                 nano report.txt
$ jobs
[1]-  Running                 sleep 300 &
[2]+  Stopped                 nano report.txt
$ jobs -l
[1]-  12345 Running                 sleep 300 &
[2]+  12346 Stopped                 nano report.txt
$ kill %1
[1]-  Terminated              sleep 300
$ jobs
[2]+  Stopped                 nano report.txt`}
              </pre>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.25s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-red-500 pl-4 mb-4">
            Common Pitfalls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold text-lg">⚠️</span>
                <p><strong>Job IDs ≠ Process IDs:</strong> Job IDs are shell-specific numbers (1,2,3...), while PIDs are system-wide. Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jobs -l</code> to see both.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold text-lg">⚠️</span>
                <p><strong>Jobs are session-bound:</strong> Jobs only exist in the shell where they were started. Closing the terminal kills all jobs unless disowned or run with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">nohup</code>.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold text-lg">⚠️</span>
                <p><strong>Background job output interference:</strong> Background jobs may write to stdout, disrupting your current terminal input. Redirect output with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&gt; logfile 2&gt;&amp;1</code>.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold text-lg">⚠️</span>
                <p><strong>Forgetting job control features:</strong> Many beginners try to kill background jobs with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">kill PID</code> but job IDs require <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">kill %jobID</code>.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold text-lg">⚠️</span>
                <p><strong>Stopped jobs consume memory:</strong> Suspended jobs (Ctrl+Z) remain in memory. Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">bg</code> to resume or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">kill %jobID</code> to terminate.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold text-lg">⚠️</span>
                <p><strong>Jobs command in subshells:</strong> Running <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jobs</code> inside a subshell <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">(jobs)</code> won't see parent shell's jobs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices & Tips */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.3s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4 mb-4">
            Best Practices & Professional Tips
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">✅ Daily Workflow Habits</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Always use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jobs -l</code> to see PIDs for debugging</li>
                <li>Redirect background job output: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">command &gt; logfile 2&gt;&amp;1 &amp;</code></li>
                <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">disown %jobID</code> to detach jobs from current shell</li>
                <li>Create aliases: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">alias j="jobs -l"</code> for quick checks</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-green-600 dark:text-green-400">💡 Pro-Level Techniques</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">wait %jobID</code> in scripts to pause until job completes</li>
                <li>Combine jobs with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ps</code>: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ps -o pid,stat,cmd -p $(jobs -p)</code></li>
                <li>Monitor stopped jobs: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">watch -n 2 'jobs -l'</code></li>
                <li>Set <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">set -o notify</code> for immediate job status changes</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 flex items-center gap-2">
              <span>💭</span> Think About…
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Why does <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jobs</code> show "Stopped" for processes suspended with <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+Z</kbd> but not for processes waiting for input? Try running <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">cat &gt; file.txt</code> then press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+Z</kbd> and observe the job state.
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.5s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.35s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4 mb-4">
            Mini Checklist: jobs Command Mastery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Understand job ID vs PID difference",
              "Can list jobs with -l option",
              "Know job state meanings: Running, Stopped, Terminated",
              "Use job specifications (%1, %vim, %?script)",
              "Differentiate between current (+) and previous (-) jobs",
              "Check jobs before closing terminal",
              "Redirect output from background jobs",
              "Use jobs in scripts to manage parallel tasks",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-500 text-xl">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.4s]  [animation-fill-mode:forwards]">
          <FAQTemplate
            title="jobs Command FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900/80 border border-blue-200 dark:border-blue-800/50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] animate-[fadeSlideUp_0.5s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.5s_ease-out_0.45s]  [animation-fill-mode:forwards]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-2xl">
              👨‍🏫
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Teacher's Note</h2>
              <div className="border-l-4 border-blue-500 pl-4 text-gray-700 dark:text-gray-300 space-y-2">
                <p className="font-medium">Sukanta Hui</p>
                <p className="text-sm">📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                <p className="text-sm">💻 Expertise: Programming Language, RDBMs, Operating System, Web Development</p>
                <p className="text-sm">🎓 {teachingExperience} years of teaching experience (since 1998)</p>
                <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="italic">"In my {teachingExperience} years of teaching OS concepts at Barrackpore and Shyamnagar, I've seen students like Swadeep and Tuhina struggle with job IDs initially. Remember: The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">jobs</code> command is your window into the shell's job table. Think of it as a task manager specifically for your current terminal session. Practice by running <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sleep 100 &amp;</code> followed by <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">jobs -l</code> - this simple exercise builds muscle memory."</p>
                </div>
                <div className="mt-2 text-sm">
                  <p><strong>🌟 Key Takeaway:</strong> The job control system (jobs, fg, bg) is a shell feature, not a kernel feature. Different shells (bash, zsh, fish) may display job information slightly differently but the core concepts remain universal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global animation keyframes */}
        <style>{`
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .motion-safe\\:animate-\\[fadeSlideUp_.*\\] {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic6;