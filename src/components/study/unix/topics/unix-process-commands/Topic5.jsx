// Topic5.jsx
import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import fgDemoScript from './topic5_files/fg_demo.sh?raw';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';

/**
 * Topic5: fg Command – Bringing Background Jobs to Foreground
 * 
 * Covers:
 * - Resuming background or suspended jobs in the foreground
 * - Job specification syntax (%n, %string, %+, %-)
 * - Interaction with terminal input/output when foregrounded
 * - Common use cases: pausing a background task to interact with it
 * 
 * @returns {JSX.Element}
 */
const Topic5 = () => {
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fgPulse {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(245,158,11,0.3)); }
      50% { filter: drop-shadow(0 0 10px rgba(245,158,11,0.7)); }
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
          <div className="border-l-4 border-orange-500 pl-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-700 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent">
              fg Command – Bringing Background Jobs to Foreground
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Resume suspended or background jobs and regain terminal control
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            After moving a process to the background (with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&amp;</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">bg</code>),
            you may need to bring it back to the foreground to interact with it or monitor its output.
            The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">fg</code> command does exactly that – it returns a job to the foreground,
            attaching it to the terminal’s input and output streams.
          </p>
        </div>

        {/* Concept: background → foreground (SVG transition) */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">🔄</span> How <code>fg</code> Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-200">
                  <li>A job is running <strong>in the background</strong> (e.g., <code>sleep 300 &amp;</code>).</li>
                  <li>The shell prompt is free – you can run other commands.</li>
                  <li>Use <code>fg %job_number</code> (or <code>fg</code> for the last background job) to bring it to the <strong>foreground</strong>.</li>
                  <li>The shell waits for the job to finish or be suspended again.</li>
                  <li>While in foreground, the job receives keyboard signals (Ctrl+C, Ctrl+Z).</li>
                </ol>
                <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <p className="text-sm">💡 <strong>Real‑world scenario:</strong> Tuhina from Shyamnagar starts a long compilation (<code>make &gt; build.log &amp;</code>). She wants to stop it early if something goes wrong. She brings it to foreground with <code>fg</code>, then presses Ctrl+C to cancel.</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <svg width="270" height="180" viewBox="0 0 270 180" className="hover:scale-[1.02] transition-transform">
                  <rect x="15" y="100" width="80" height="40" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
                  <text x="55" y="124" textAnchor="middle" fill="#3b82f6" fontSize="9">Background</text>
                  <text x="55" y="136" textAnchor="middle" fill="#6b7280" fontSize="7">(shell free)</text>
                  <line x1="95" y1="120" x2="130" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4">
                    <animate attributeName="stroke-dashoffset" values="8;0" dur="0.8s" repeatCount="indefinite" />
                  </line>
                  <text x="110" y="102" fill="#f59e0b" fontSize="8">fg</text>
                  <rect x="135" y="50" width="80" height="40" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
                  <text x="175" y="74" textAnchor="middle" fill="#f59e0b" fontSize="9">Foreground</text>
                  <text x="175" y="86" textAnchor="middle" fill="#6b7280" fontSize="7">(shell blocked)</text>
                  <path d="M55 140 L55 170" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3" />
                  <text x="30" y="167" fill="#9ca3af" fontSize="7">stdin/stdout</text>
                  <rect x="210" y="130" width="50" height="30" rx="4" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" />
                  <text x="235" y="149" textAnchor="middle" fill="#ef4444" fontSize="8">Ctrl+C</text>
                  <line x1="175" y1="90" x2="235" y2="130" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Syntax and usage examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">📝 Syntax & Job Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <code className="text-sm font-mono">fg [job_spec]</code>
                <div className="mt-3 space-y-2 text-sm">
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">fg</span> → brings most recent background job to foreground</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">fg %1</span> → job number 1</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">fg %vim</span> → job whose command starts with 'vim'</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">fg %+</span> → current job (same as <code>fg</code>)</p>
                  <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-1">fg %-</span> → previous job</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-bold text-amber-600">🎮 Typical Interaction</h3>
                <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  <p>$ sleep 300 &amp;</p>
                  <p>[1] 12345</p>
                  <p>$ jobs</p>
                  <p>[1]+ Running                 sleep 300 &amp;</p>
                  <p>$ fg %1</p>
                  <p>sleep 300   # now foreground, shell waits</p>
                  <p>^C          # Ctrl+C kills it</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo script: foreground to background to foreground */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">🐚 Live Demo: Foreground & Background Cycling</h2>
            <p className="mb-3">This script demonstrates starting a process in foreground, suspending it, backgrounding it, and then bringing it back to foreground.</p>
            <ShellFileLoader
              fileModule={fgDemoScript}
              title="📁 fg_demo.sh – job control demonstration"
              highlightLines={[12, 18, 24]}
            />
            <div className="mt-4 text-sm bg-gray-900 text-gray-100 p-3 rounded-md">
              <p className="text-green-300">$ bash fg_demo.sh</p>
              <p className="text-gray-300">Starting a countdown (try Ctrl+Z after 3 seconds)...</p>
              <p className="text-gray-300">Countdown: 9 8 7 ... ^Z</p>
              <p className="text-gray-300">[1]+  Stopped                 bash countdown.sh</p>
              <p className="text-gray-300">Resuming in background with bg...</p>
              <p className="text-gray-300">Now bringing back to foreground with fg...</p>
              <p className="text-gray-300">Countdown continues in foreground: 5 4 3 ...</p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <h2 className="text-xl font-bold flex items-center gap-2">💡 Professional Tips & Tricks</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> Use <code>fg</code> without arguments to bring the job marked <code>+</code> (current).</li>
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> If you have multiple background jobs, <code>jobs</code> shows which one is current (<code>+</code>).</li>
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> <code>fg %?pattern</code> (e.g., <code>fg %?sleep</code>) brings the job with command containing 'sleep'.</li>
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> Combine with <code>kill -STOP</code> and <code>fg</code> to pause/resume any background process.</li>
              <li className="flex gap-2"><span className="text-amber-600">🔹</span> In scripts, you rarely need <code>fg</code> – it’s mostly interactive.</li>
            </ul>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Bringing an editor (<code>vim</code>) to foreground works, but if it was never suspended, it’s already foreground.</li>
              <li>Trying to <code>fg</code> a job that has already finished – error message.</li>
              <li>Forgetting that <code>fg</code> blocks the shell until the job finishes or is suspended again.</li>
              <li>Assuming <code>fg</code> restores terminal settings – some interactive programs may break.</li>
              <li>Using <code>fg</code> on a process that was started with <code>nohup</code> – no difference, but <code>nohup</code> already protects SIGHUP.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Before <code>fg</code> a background job, check its status with <code>jobs -l</code>.</li>
              <li>If you need to stop a background job temporarily, suspend it with <code>kill -STOP %1</code>, then <code>fg</code> later.</li>
              <li>Redirect output before backgrounding if you don't want it to flood terminal when foregrounded.</li>
              <li>Use <code>fg</code> only for interactive tasks that need input (e.g., editors, debuggers).</li>
              <li>For logging, keep jobs in background and use <code>tail -f</code> on log file instead of bringing to foreground.</li>
            </ul>
          </div>
        </div>

        {/* Hint */}
        <div className="animate-fade-slide-up bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold flex gap-2">🧠 Think about...</h3>
          <p className="italic">Observe carefully: Run <code>sleep 200 &amp;</code>, then <code>jobs</code>. Now run <code>fg</code>. What happens to your shell prompt? It disappears until the sleep finishes. Why? Because the foreground job “takes over” the terminal. Now try pressing Ctrl+Z to suspend it, then <code>jobs</code> again – what changed?</p>
        </div>

        {/* Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-2xl animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
          <h3 className="font-bold text-lg">📋 Student Checklist – fg Command</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can bring a background job to the foreground using <code>fg</code>.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I understand that <code>fg</code> blocks the shell until the job completes.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can bring a specific job by number (<code>fg %2</code>).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know how to use <code>jobs</code> to see which job is current (<code>+</code>).</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can bring a job to foreground and then suspend it (Ctrl+Z) again.</label>
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <FAQTemplate title="fg Command – Frequently Asked Questions" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up border-t-4 border-orange-400 bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl shadow-md hover:shadow-lg transition" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-orange-200 dark:bg-orange-800 rounded-full p-3 text-3xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">Teacher’s Note — Sukanta Hui</h3>
              <p className="text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 +91 7003756860</p>
              <p className="text-sm">🔧 <strong>{teacherExperience} years of experience</strong> (since 1998) — Programming, RDBMS, OS, Web Development</p>
              <p className="mt-3 italic">“Abhronila once asked: ‘If I background a process, can I ever interact with it again?’ Yes, with <code>fg</code>. Many beginners think background processes are lost forever. Use <code>jobs</code> to find them, then <code>fg</code> to reclaim control. It’s like putting a book on a shelf (background) and taking it back to read (foreground).” — Sukanta Hui</p>
              <div className="mt-2 text-orange-700 dark:text-orange-300 text-sm font-mono">🔥 Advanced trick: <code>fg %2 &amp;&amp; echo "Finished"</code> waits for job 2 and then echoes.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic5;