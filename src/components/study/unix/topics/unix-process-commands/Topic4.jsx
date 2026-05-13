// Topic4.jsx
import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import bgDemoScript from './topic4_files/bg_demo.sh?raw';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';

/**
 * Topic4: bg Command – Running suspended jobs in the background
 * 
 * Covers:
 * - Suspending foreground jobs with Ctrl+Z (SIGTSTP)
 * - Resuming suspended jobs in the background using `bg`
 * - Job numbers and job control (jobs, fg, bg)
 * - Practical scenarios: moving long tasks to background
 * 
 * @returns {JSX.Element}
 */
const Topic4 = () => {
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bgPulse {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(34,197,94,0.3)); }
      50% { filter: drop-shadow(0 0 8px rgba(34,197,94,0.6)); }
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
          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-teal-600 dark:from-green-400 dark:to-teal-300 bg-clip-text text-transparent">
              bg Command – Running Suspended Jobs in Background
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Resume stopped processes without blocking the terminal
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            Have you ever started a long‑running task, realised you need the terminal, and wished you could push it to the background? 
            The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">bg</code> command lets you resume a suspended (stopped) job and continue it in the background, 
            freeing your terminal for other commands.
          </p>
        </div>

        {/* Concept: foreground → suspend → background (SVG flow) */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">⏸️▶️</span> How <code>bg</code> Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-200">
                  <li>A <strong>foreground process</strong> is running (e.g., <code>vim</code>, <code>top</code>, or a script).</li>
                  <li>Press <kbd className="px-1 bg-gray-300 dark:bg-gray-700 rounded">Ctrl+Z</kbd> – the shell sends SIGTSTP, <strong>suspending</strong> the process. The shell returns with a message like <code>[1]+ Stopped</code>.</li>
                  <li>The job is now <strong>suspended</strong> (paused) and appears in the <code>jobs</code> list.</li>
                  <li>Use <code>bg %job_number</code> (or <code>bg</code> for the last job) to resume it <strong>in the background</strong>.</li>
                  <li>The process runs in the background, and you can continue typing other commands.</li>
                </ol>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <p className="text-sm">💡 <strong>Real‑world analogy:</strong> Imagine Debangshu from Barrackpore is copying a huge folder using <code>cp -r</code>. He realises he needs the terminal. He presses Ctrl+Z, then <code>bg</code> – the copy continues silently while he runs <code>ls</code> and <code>ps</code>.</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <svg width="260" height="190" viewBox="0 0 260 190" className="hover:scale-[1.02] transition-transform">
                  <rect x="15" y="10" width="70" height="40" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
                  <text x="50" y="34" textAnchor="middle" fill="#3b82f6" fontSize="9">Foreground</text>
                  <text x="50" y="46" textAnchor="middle" fill="#6b7280" fontSize="7">(shell blocked)</text>
                  <line x1="85" y1="30" x2="120" y2="30" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                  <text x="100" y="22" fill="#ef4444" fontSize="7">Ctrl+Z</text>
                  <rect x="125" y="10" width="70" height="40" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
                  <text x="160" y="34" textAnchor="middle" fill="#f59e0b" fontSize="9">Suspended</text>
                  <text x="160" y="46" textAnchor="middle" fill="#6b7280" fontSize="7">(paused)</text>
                  <line x1="195" y1="30" x2="230" y2="30" stroke="#10b981" strokeWidth="2" />
                  <text x="210" y="22" fill="#10b981" fontSize="7">bg</text>
                  <rect x="15" y="110" width="70" height="40" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
                  <text x="50" y="134" textAnchor="middle" fill="#10b981" fontSize="9">Background</text>
                  <text x="50" y="146" textAnchor="middle" fill="#6b7280" fontSize="7">(shell free)</text>
                  <path d="M160 50 L160 110" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3" />
                  <circle cx="160" cy="80" r="4" fill="#f59e0b">
                    <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Basic syntax and examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">📝 Syntax & Common Usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <code className="text-sm font-mono">bg [job_spec]</code>
                <div className="mt-3 space-y-2 text-sm">
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">bg</span> → resumes the most recent suspended job in background</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">bg %1</span> → resumes job number 1</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">bg %vim</span> → resumes job whose command starts with 'vim'</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-bold text-green-600">🔄 Typical Workflow</h3>
                <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  <p>$ sleep 300    # foreground</p>
                  <p>^Z              # press Ctrl+Z</p>
                  <p>[1]+  Stopped                 sleep 300</p>
                  <p>$ bg %1</p>
                  <p>[1]+ sleep 300 &amp;</p>
                  <p>$ jobs          # now running in background</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live demo script */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">🐚 Live Demo: Suspending and Backgrounding</h2>
            <p className="mb-3">This script starts a foreground loop, lets you suspend it (Ctrl+Z in real terminal), and then shows how to bring it to background using <code>bg</code>. In a non‑interactive environment, we simulate the steps.</p>
            <ShellFileLoader
              fileModule={bgDemoScript}
              title="📁 bg_demo.sh – interactive simulation"
              highlightLines={[8, 14, 18]}
            />
            <div className="mt-4 text-sm bg-gray-900 text-gray-100 p-3 rounded-md">
              <p className="text-green-300">$ bash bg_demo.sh</p>
              <p className="text-gray-300">Starting a countdown in foreground (press Ctrl+Z after 3 seconds)...</p>
              <p className="text-gray-300">Countdown: 10 9 8 ... ^Z</p>
              <p className="text-gray-300">[1]+  Stopped                 bash countdown.sh</p>
              <p className="text-gray-300">Resuming in background with bg...</p>
              <p className="text-gray-300">[1]+ bash countdown.sh &amp;</p>
            </div>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-bold flex items-center gap-2">💡 Professional Tips & Tricks</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex gap-2"><span className="text-green-600">🔹</span> Use <code>bg</code> without arguments to resume the last suspended job (the one marked with <code>+</code>).</li>
              <li className="flex gap-2"><span className="text-green-600">🔹</span> Suspend a job, then <code>bg</code> and immediately <code>disown</code> to prevent SIGHUP on logout.</li>
              <li className="flex gap-2"><span className="text-green-600">🔹</span> <code>bg %2</code> works even if the job is not suspended? No – only suspended jobs can be backgrounded; running background jobs are already in background.</li>
              <li className="flex gap-2"><span className="text-green-600">🔹</span> Combine with <code>nohup</code>? Not needed; <code>bg</code> merely resumes, while <code>nohup</code> protects from hangup.</li>
              <li className="flex gap-2"><span className="text-green-600">🔹</span> To see job numbers: <code>jobs</code>. Then <code>bg %3</code> resumes job #3.</li>
            </ul>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Trying to <code>bg</code> a job that is already in background – it will give an error or do nothing.</li>
              <li>Forgetting that a background job may still write to the terminal (output can mess up your prompt).</li>
              <li>Closing the terminal after <code>bg</code> without <code>disown</code> – the job may receive SIGHUP and die.</li>
              <li>Using <code>bg</code> on interactive programs (like <code>vim</code>) – they will likely stop or behave strangely (since they need terminal input).</li>
              <li>Not checking <code>jobs</code> after <code>bg</code> to confirm state changed from Stopped to Running.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always redirect output to a file when backgrounding: <code>bg &gt; /dev/null 2&gt;&amp;1</code> (after suspension).</li>
              <li>Use <code>jobs -l</code> to see PIDs and verify backgrounded processes.</li>
              <li>Before leaving the terminal, <code>disown %job</code> or use <code>nohup</code> from the start.</li>
              <li>For long tasks, consider starting directly in background with <code>&amp;</code> instead of suspending+background.</li>
              <li>Test with <code>sleep 10 &amp;</code> and <code>jobs</code> to understand job numbers.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-fade-slide-up bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold flex gap-2">🧠 Think about...</h3>
          <p className="italic">Observe carefully: Run <code>top</code> (foreground). Press <kbd>Ctrl+Z</kbd>. Now type <code>bg</code>. What happens? <code>top</code> is now in background. Can you still see its output? Try to bring it back with <code>fg</code>. Why does <code>top</code> not update when in background? (Because it needs terminal input to refresh – it stops drawing).</p>
        </div>

        {/* Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-2xl animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
          <h3 className="font-bold text-lg">📋 Student Checklist – bg Command</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know how to suspend a foreground process (Ctrl+Z).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can resume a suspended job in the background using <code>bg</code>.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can list all jobs with <code>jobs</code> and identify the current job (<code>+</code>).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I understand the difference between a suspended (Stopped) and a background (Running) job.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know that <code>bg %2</code> backgrounds job number 2.</label>
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <FAQTemplate title="bg Command – Frequently Asked Questions" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up border-t-4 border-green-400 bg-green-50 dark:bg-green-950/20 p-6 rounded-xl shadow-md hover:shadow-lg transition" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-green-200 dark:bg-green-800 rounded-full p-3 text-3xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200">Teacher’s Note — Sukanta Hui</h3>
              <p className="text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 +91 7003756860</p>
              <p className="text-sm">🔧 <strong>{teacherExperience} years of experience</strong> (since 1998) — Programming, RDBMS, OS, Web Development</p>
              <p className="mt-3 italic">“When I taught at Shyamnagar, Swadeep asked: ‘Why would I suspend a job instead of starting it with & from the beginning?’ Great question. Suspending is useful when you’ve already started a long operation and forgot to background it, or when you need to temporarily pause something (like a build) and later resume. Master <code>bg</code> and <code>fg</code> – they are your terminal multitasking superpowers.” — Sukanta Hui</p>
              <div className="mt-2 text-green-700 dark:text-green-300 text-sm font-mono">🔥 Pro move: <code>kill -STOP PID</code> and <code>kill -CONT PID</code> achieve same as suspend/resume but for any process, not just shell jobs.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic4;