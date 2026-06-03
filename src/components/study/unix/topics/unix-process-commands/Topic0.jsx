// Topic0.jsx
import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import longOperationScript from './topic0_files/long_operation.sh?raw';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';

/**
 * Topic0: Introduction to Process Management
 * 
 * This component covers:
 * - Definition of a process (program in execution)
 * - Differences between foreground and background processes
 * - Basic job control concepts (without deep command explanation)
 * - Real-world analogies and use cases
 * 
 * @returns {JSX.Element} Fully animated, responsive and accessible component
 */
const Topic0 = () => {
  // Dynamic teacher experience calculation (based on 1998)
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  // Keyframes for fade-and-slide animations (motion-safe only)
  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes softGlow {
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

      {/* Main container with vertical stacking */}
      <div className="max-w-6xl mx-auto space-y-10">

        {/* --- SECTION 1: Title & Introduction (Reveal animation) --- */}
        <div className="animate-fade-slide-up">
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Introduction to Process Management
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Process, Foreground & Background — Building blocks of multitasking
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            Every command, application, or script you run on a Linux/Unix system becomes a <strong className="text-blue-600 dark:text-blue-400">process</strong>.
            Understanding how processes work — especially the difference between foreground and background execution — is essential for efficient system control.
          </p>
        </div>

        {/* --- SECTION 2: What is a Process? (SVG + Detailed explanation) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">⚙️</span> What is a Process?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text concept */}
              <div>
                <p className="mb-3">
                  A <strong className="text-blue-600">process</strong> is an instance of a program in execution. While a program is a passive 
                  collection of instructions (stored on disk like a <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.exe</code> or script), 
                  a process is the active, running entity with its own memory, registers, and system resources.
                </p>
                <p className="mb-3">
                  Each process is assigned a unique identifier called <strong className="font-mono">PID (Process ID)</strong>. 
                  The operating system schedules processes, allocates CPU time, and manages their lifecycle.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-2">
                  <p className="text-sm italic">📌 <strong>Real-world analogy:</strong> A recipe (program) vs. cooking (process). 
                  Swadeep from Barrackpore can follow the same recipe many times — each cooking session is a separate process.</p>
                </div>
              </div>
              {/* Step SVG - program → process */}
              <div className="flex justify-center items-center">
                <svg width="220" height="150" viewBox="0 0 220 150" className="drop-shadow-md hover:scale-[1.01] transition-transform">
                  <rect x="10" y="30" width="80" height="50" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                  <text x="50" y="58" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Program</text>
                  <text x="50" y="72" textAnchor="middle" fill="#6b7280" fontSize="9">(on disk)</text>
                  <line x1="90" y1="55" x2="125" y2="55" stroke="#2563eb" strokeWidth="2" strokeDasharray="4">
                    <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.8s" repeatCount="indefinite" />
                  </line>
                  <polygon points="127,50 140,55 127,60" fill="#2563eb" />
                  <rect x="145" y="20" width="70" height="60" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />
                  <text x="180" y="48" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Process</text>
                  <text x="180" y="62" textAnchor="middle" fill="#6b7280" fontSize="9">(in RAM + CPU)</text>
                  <circle cx="200" cy="92" r="6" fill="#10b981">
                    <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: Foreground vs Background Processes (Core concept) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2">
              <span className="text-3xl">🖥️↔️🕒</span> Foreground vs Background Processes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Foreground Process */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2">🎯 Foreground Process</h3>
                <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700 dark:text-gray-200">
                  <li>Runs in the terminal and <strong>blocks</strong> the shell until completion.</li>
                  <li>Receives keyboard input (stdin) and sends output to the screen (stdout/stderr).</li>
                  <li>Interrupt signals (like <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+C</kbd>) directly affect it.</li>
                  <li><strong>Example:</strong> Running <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">vim document.txt</code> – you cannot run other commands until you exit vim.</li>
                </ul>
                <div className="mt-3 text-sm bg-orange-50 dark:bg-orange-900/30 p-2 rounded">📌 <em>Tuhina runs <code>npm start</code> – her terminal is occupied until she stops it.</em></div>
              </div>

              {/* Background Process */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">🌱 Background Process</h3>
                <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700 dark:text-gray-200">
                  <li>Runs independently without locking the terminal.</li>
                  <li>Does not take input from the keyboard (by default), but output may still appear.</li>
                  <li>Started by appending <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&amp;</code> to a command.</li>
                  <li><strong>Example:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sleep 100 &amp;</code> – shell returns immediately, process runs in background.</li>
                </ul>
                <div className="mt-3 text-sm bg-green-50 dark:bg-green-900/30 p-2 rounded">📌 <em>Abhronila compresses a large folder: <code>tar -czf backup.tar.gz data/ &amp;</code> – keeps working.</em></div>
              </div>
            </div>
            {/* Comparison table */}
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr><th className="p-2">Feature</th><th>Foreground</th><th>Background</th></tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="p-2 font-medium">Shell blocked?</td><td>✅ Yes (until complete)</td><td>❌ No (returns prompt)</td></tr>
                  <tr><td className="p-2 font-medium">Receives Ctrl+C</td><td>✅ Yes</td><td>❌ No (by default)</td></tr>
                  <tr><td className="p-2 font-medium">Typical use</td><td>Editors, interactive tools</td><td>Log processing, backups, servers</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: Live Example with ShellFileLoader (Real script background) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">📜 See It in Action: Background Script</h2>
            <p className="mb-4">This script simulates a long-running task. Normally it would block the terminal, but we execute it in background using <code className="bg-gray-300 dark:bg-gray-700 px-1 rounded">&amp;</code></p>
            <ShellFileLoader
              fileModule={longOperationScript}
              title="📁 long_operation.sh (background demo)"
              highlightLines={[4, 6]}
            />
            <div className="mt-3 p-3 bg-gray-900 text-gray-100 rounded-md font-mono text-sm">
              <p>$ ./long_operation.sh &amp;</p>
              <p className="text-green-300">[1] 3421</p>
              <p>$ <span className="animate-pulse inline-block w-2 h-2 bg-green-400 rounded-full"></span> <em>Shell free to run other commands!</em></p>
            </div>
          </div>
        </div>

        {/* --- SECTION 5: Tips & Tricks (Professional) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
            <h2 className="text-xl font-bold flex items-center gap-2">💡 Pro Tips & Tricks</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex gap-2"><span className="text-indigo-600">🔹</span> Use <code className="bg-white dark:bg-gray-800 px-1 rounded">jobs -l</code> to see PIDs of background jobs.</li>
              <li className="flex gap-2"><span className="text-indigo-600">🔹</span> Redirect background output: <code>script.sh &gt; log.txt 2&gt;&amp;1 &amp;</code> to avoid clutter.</li>
              <li className="flex gap-2"><span className="text-indigo-600">🔹</span> Press <kbd>Ctrl+Z</kbd> to suspend a foreground process, then <code>bg</code> to resume in background.</li>
              <li className="flex gap-2"><span className="text-indigo-600">🔹</span> <code>disown</code> removes a background job from shell’s job table (advanced).</li>
            </ul>
          </div>
        </div>

        {/* --- SECTION 6: Common Pitfalls & Best Practices --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 dark:text-red-300 flex gap-1">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Forgetting that background processes continue after logout (use <code>nohup</code> for immune).</li>
              <li>Running interactive commands (like <code>vim</code>) in background – they'll likely stop.</li>
              <li>Assuming background tasks never output to terminal – they can interleave with your prompt.</li>
              <li>Confusing <code>&amp;</code> (background) with <code>&amp;&amp;</code> (logical AND).</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 dark:text-green-300 flex gap-1">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always redirect output of background processes to files.</li>
              <li>Use <code>jobs</code> to monitor background tasks before closing terminal.</li>
              <li>Set appropriate priority with <code>nice</code> for CPU-intensive background jobs.</li>
              <li>Test foreground first, then push to background when stable.</li>
            </ul>
          </div>
        </div>

        {/* --- SECTION 7: Hint Section (Guided Thinking) --- */}
        <div className="animate-fade-slide-up bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold flex gap-2">🧠 Think about...</h3>
          <p className="italic">Observe carefully: When you run a server like <code>python -m http.server</code> in foreground, you cannot use the terminal. How could you start it, keep it alive, and still run other commands? Try pressing <kbd>Ctrl+Z</kbd>, then type <code>bg</code> and see what happens. Try changing the command to include <code>&amp;</code>.</p>
        </div>

        {/* --- SECTION 8: Mini Checklist --- */}
        <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-2xl animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
          <h3 className="font-bold text-lg">📋 Student Checklist – Process Fundamentals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can define a process vs a program.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know how to start a background process with <code>&amp;</code>.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I understand that foreground blocks the shell.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I can name two real scenarios for background jobs.</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> I know how to suspend a foreground job (Ctrl+Z).</label>
          </div>
        </div>

        {/* --- SECTION 9: FAQTemplate (Using 20 questions) --- */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <FAQTemplate title="Introduction to Process Management" questions={questions} />
        </div>

        {/* --- SECTION 10: Teacher’s Note (Sukanta Hui) --- */}
        <div className="animate-fade-slide-up border-t-4 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-6 rounded-xl shadow-md hover:shadow-lg transition" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-blue-200 dark:bg-blue-800 rounded-full p-3 text-3xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">Teacher’s Note — Sukanta Hui</h3>
              <p className="text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 +91 7003756860</p>
              <p className="text-sm">🔧 <strong>{teacherExperience} years of experience</strong> (since 1998) — Programming, RDBMS, OS, Web Development</p>
              <p className="mt-3 italic">"Students from Shyamnagar and Ichapur often struggle separating foreground vs background mental models. Remember: A foreground process is like a classroom discussion — everyone focuses on it. Background tasks are like your teacher writing notes on board while still aware of the class. Both are processes, but your attention differs." — Sukanta Hui</p>
              <div className="mt-2 text-blue-700 dark:text-blue-300 text-sm font-mono">🔥 Tip: Use <code className="bg-white dark:bg-gray-800">sleep 30 &amp;</code> and then run <code>jobs</code> — you'll see your first background job!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic0;