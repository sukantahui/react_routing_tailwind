import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic20_files/topic20_questions';

export default function Topic20() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Header */}
        <div className="animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <div className="border-b-4 border-emerald-500 dark:border-emerald-400 inline-block pb-1 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Practice Lab: Edit Config Files & Write a Script
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Apply everything you've learned. Edit real configuration files, write a shell script from scratch using Vim, and reflect on your workflow. This lab simulates daily sysadmin and developer tasks.
          </p>
        </div>

        {/* Lab Objectives */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-3xl">🎯</span> Lab Objectives
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              <li>Use Vim to edit system configuration files safely.</li>
              <li>Write a functional shell script using Vim, applying modes, editing, and saving.</li>
              <li>Practice navigation, search/replace, and multiple files.</li>
              <li>Recover from mistakes using undo, registers, and swap files.</li>
              <li>Reflect on efficient editing workflows.</li>
            </ul>
          </div>
        </div>

        {/* SVG – Lab Steps Overview */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500">
            <h3 className="text-xl font-semibold mb-3 text-center">Lab Workflow</h3>
            <div className="flex justify-center">
              <svg width="560" height="180" viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <rect x="10" y="20" width="110" height="60" rx="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                <text x="65" y="45" textAnchor="middle" className="text-sm fill-blue-800 dark:fill-blue-300">Task 1</text>
                <text x="65" y="65" textAnchor="middle" className="text-xs fill-blue-800 dark:fill-blue-300">Edit Config</text>
                <line x1="120" y1="50" x2="160" y2="50" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr)" />

                <rect x="160" y="20" width="110" height="60" rx="6" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="2" />
                <text x="215" y="45" textAnchor="middle" className="text-sm fill-purple-800 dark:fill-purple-300">Task 2</text>
                <text x="215" y="65" textAnchor="middle" className="text-xs fill-purple-800 dark:fill-purple-300">Write Script</text>
                <line x1="270" y1="50" x2="310" y2="50" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr)" />

                <rect x="310" y="20" width="110" height="60" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
                <text x="365" y="45" textAnchor="middle" className="text-sm fill-yellow-800 dark:fill-yellow-300">Task 3</text>
                <text x="365" y="65" textAnchor="middle" className="text-xs fill-yellow-800 dark:fill-yellow-300">Search & Fix</text>
                <line x1="420" y1="50" x2="460" y2="50" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr)" />

                <rect x="460" y="20" width="90" height="60" rx="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
                <text x="505" y="45" textAnchor="middle" className="text-sm fill-red-800 dark:fill-red-300">Reflect</text>
                <text x="505" y="65" textAnchor="middle" className="text-xs fill-red-800 dark:fill-red-300">Questions</text>

                <defs>
                  <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">Complete each task, then reflect on what you learned.</p>
          </div>
        </div>

        {/* Task 1: Edit config files */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.3s]  [animation-fill-mode:forwards] space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-5 border-l-8 border-blue-500">
            <h3 className="text-xl font-bold flex items-center gap-2">📝 Task 1: Edit Configuration Files (15 minutes)</h3>
            <ul className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-3">
              <li>Open your shell configuration file (<code>~/.bashrc</code> or <code>~/.zshrc</code>) using <code>view</code> (read‑only) first to inspect.</li>
              <li>Then open it in Vim for editing: <code>vim ~/.bashrc</code>.</li>
              <li>Add an alias: <code>alias cls='clear'</code> at the end of the file.</li>
              <li>Search for the word <code>PATH</code> and observe its value.</li>
              <li>Create a backup of the file inside Vim using <code>:saveas ~/.bashrc.backup</code>.</li>
              <li>Quit without saving changes (<code>:q!</code>) – we'll not actually change your shell config.</li>
            </ul>
            <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded italic text-sm">
              💡 Tip: Use <code>set number</code> to see line numbers. Use <code>/PATH</code> to search.
            </div>
          </div>
        </div>

        {/* Task 2: Write a script */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.4s]  [animation-fill-mode:forwards] space-y-4">
          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-5 border-l-8 border-purple-500">
            <h3 className="text-xl font-bold flex items-center gap-2">🐚 Task 2: Write a Shell Script (25 minutes)</h3>
            <p>Create a script called <code>system_report.sh</code> that prints system information. Use Vim to write it from scratch.</p>
            <div className="bg-gray-900 dark:bg-gray-950 rounded p-3 my-3 overflow-x-auto">
              <pre className="text-sm text-emerald-300 font-mono whitespace-pre-wrap">{`#!/bin/bash
# system_report.sh – A simple system info script
echo "System Report – $(date)"
echo "========================"
echo "Hostname: $(hostname)"
echo "Uptime: $(uptime -p)"
echo "Memory Usage:"
free -h
echo "Disk Usage:"
df -h / | tail -1
echo "Logged in users:"
who`}</pre>
            </div>
            <ul className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Open Vim: <code>vim system_report.sh</code>.</li>
              <li>Enter Insert mode (<code>i</code>) and type the shebang and script content.</li>
              <li>Use <code>dd</code> to delete a line; undo with <code>u</code>.</li>
              <li>Save the script with <code>:w</code>.</li>
              <li>Make it executable from outside Vim: <code>chmod +x system_report.sh</code>.</li>
              <li>Test your script: <code>./system_report.sh</code>.</li>
              <li>If you find a mistake, reopen the script and fix it using Vim's search and replace.</li>
            </ul>
          </div>
        </div>

        {/* Task 3: Search and replace, and multi-file */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.5s]  [animation-fill-mode:forwards] space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl p-5 border-l-8 border-yellow-500">
            <h3 className="text-xl font-bold flex items-center gap-2">🔍 Task 3: Search, Replace & Multiple Files (15 minutes)</h3>
            <ul className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Create a copy of your script: <code>:saveas system_report_v2.sh</code> while still in Vim (or using shell <code>cp</code>).</li>
              <li>In <code>system_report_v2.sh</code>, replace all occurrences of <code>Memory Usage</code> with <code>RAM Info</code> using <code>:%s/Memory Usage/RAM Info/g</code>.</li>
              <li>Open both scripts in vertical splits: <code>vim -O system_report.sh system_report_v2.sh</code>.</li>
              <li>Navigate between splits with <code>Ctrl+w h</code> and <code>Ctrl+w l</code>.</li>
              <li>Set a mark <code>ma</code> at a key line in the first script, then jump to the second script and back with <code>'a</code> (global mark? No, lowercase works per buffer. For cross‑file, use uppercase <code>mA</code>).</li>
              <li>Quit Vim: <code>:qa</code>.</li>
            </ul>
          </div>
        </div>

        {/* Reflection Questions */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.6s]  [animation-fill-mode:forwards]">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-l-8 border-emerald-500 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">📝 Reflection Questions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>What was the most challenging part of editing the config file? How did you overcome it?</li>
              <li>Which Vim commands saved you the most time while writing the script?</li>
              <li>Did you ever accidentally delete something? How did you recover?</li>
              <li>How would you use marks and jumps in a larger project?</li>
              <li>What is one new Vim feature you want to learn next?</li>
            </ol>
            <p className="mt-3 text-sm">Write your answers in a text file using Vim, or discuss with a peer.</p>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.7s]  [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">💡 Lab Hacks</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Use <code>set mouse=a</code> to easily select text and copy/paste between terminal and Vim.</li>
                <li>Inside Vim, you can run shell commands with <code>:! ./system_report.sh</code> to test without leaving Vim.</li>
                <li>Use <code>:split</code> to view the script and its output log simultaneously.</li>
              </ul>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">🧪 Extension Challenges</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Add error handling to the script: check if <code>free</code> or <code>df</code> commands exist.</li>
                <li>Use <code>:r! date</code> to insert the current date into the script.</li>
                <li>Record a macro to add a comment header to every function in a script.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.8s]  [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl">
          <h3 className="text-xl font-bold mb-3">📋 Student Checklist – Lab Completion</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "☐ Viewed .bashrc with view, then edited (but didn't save).",
              "☐ Added alias line and backed up file.",
              "☐ Created system_report.sh with proper shebang.",
              "☐ Used Insert mode, save, and made executable.",
              "☐ Tested script and fixed errors with Vim.",
              "☐ Performed global substitution with :%s",
              "☐ Opened two files in vertical splits and navigated.",
              "☐ Answered reflection questions.",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.9s]  [animation-fill-mode:forwards] bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="italic text-gray-700 dark:text-gray-200">💡 <strong>Observe carefully:</strong> When you open a file with <code>view</code>, you cannot save. This is a safety net. But note that you can still force-write with <code>:w!</code> if you have permissions. Always double-check before forcing.</p>
        </div>

        {/* FAQ Component */}
        <div className="animate-[fadeInUp_0.5s_ease-out_1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_1s]  [animation-fill-mode:forwards]">
          <FAQTemplate
            title="Practice Lab – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeInUp_0.5s_ease-out_1.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_1.1s]  [animation-fill-mode:forwards] group">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <div className="flex items-start gap-4">
              <div className="text-5xl">👨‍🏫</div>
              <div>
                <h3 className="text-2xl font-bold">Teacher's Note — Sukanta Hui</h3>
                <p className="text-emerald-300 text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 7003756860 | 🧠 {experienceYears}+ years experience (since 1998)</p>
                <div className="mt-3 space-y-2 text-gray-200">
                  <p>🎓 <strong>Classroom facilitation:</strong> Walk around while students do the lab. Notice who uses arrow keys vs <code>hjkl</code>. Intervene with quick tips. Encourage pair programming for the script writing.</p>
                  <p>📝 <strong>Assessment:</strong> Ask students to submit the script file and a short log of the Vim commands they used (e.g., <code>history</code> inside Vim with <code>:history</code>).</p>
                  <p>🏫 For Naihati/Shyamnagar labs: If students don't have permission to edit <code>.bashrc</code>, use a dummy config file: <code>cp ~/.bashrc ~/lab_bashrc</code> and instruct them to edit that instead.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
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
            [class*="animate-"] {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}