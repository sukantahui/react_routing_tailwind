import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import rawQuestions from './topic11_files/topic11_questions';

// ✅ Defensive: ensure questions is an array
const safeQuestions = Array.isArray(rawQuestions) ? rawQuestions : [];

// Simple inline error boundary for the FAQ component
class FAQErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-xl border border-yellow-400">
          <p className="text-yellow-800 dark:text-yellow-200">⚠️ FAQ component could not load. The question data is still available – please check the console for details.</p>
          <details className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <summary>Show raw questions</summary>
            <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded overflow-auto">
              {JSON.stringify(safeQuestions, null, 2)}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Topic11() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Header Section – same as before */}
        <div className="animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <div className="border-b-4 border-emerald-500 dark:border-emerald-400 inline-block pb-1 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Working with Multiple Files
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Real-world editing rarely involves a single file. Master <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400">:e</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400">:n</code>, and <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400">:b</code> to juggle configuration files, logs, and code seamlessly.
          </p>
        </div>

        {/* Theory: Buffers & Argument List */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-3xl">📂</span> Understanding Vi/Vim's Memory
            </h2>
            <p className="leading-relaxed mb-4">
              When you open a file, Vim loads its content into a <strong className="text-blue-600 dark:text-blue-400">buffer</strong> — an in-memory representation of the file. You can have many buffers simultaneously. Additionally, Vim tracks an <strong className="text-indigo-600 dark:text-indigo-400">argument list</strong> (files passed at startup or via <code>:args</code>).
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              <li><strong className="font-semibold">Buffer list</strong> : All files currently open, created, or hidden. View with <code>:ls</code>.</li>
              <li><strong className="font-semibold">Argument list</strong> : Sequence of files specified when launching Vim. Traverse with <code>:n</code> (next) and <code>:prev</code>.</li>
              <li><strong className="font-semibold">Hidden buffers</strong> : If you switch without saving (<code>:set hidden</code>), Vim keeps unsaved changes in the background.</li>
            </ul>
            <div className="mt-4 text-sm bg-white/60 dark:bg-black/20 p-3 rounded-xl italic">
              💡 Think of buffers as tabs in a browser, but more powerful — you can navigate them without visual clutter.
            </div>
          </div>
        </div>

        {/* SVG Illustration: Buffer Interaction – same as original but ensure no syntax errors */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500">
            <h3 className="text-xl font-semibold mb-3 text-center">How Buffers Work</h3>
            <div className="flex justify-center">
              <svg width="380" height="220" viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <rect x="10" y="10" width="120" height="80" rx="8" fill="#1e3a8a" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" className="group-hover:stroke-emerald-500 transition-all duration-300" />
                <text x="70" y="55" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-200 text-sm font-mono">file_a.txt</text>

                <rect x="130" y="10" width="120" height="80" rx="8" fill="#1e3a8a" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                <text x="190" y="55" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-200 text-sm font-mono">config.conf</text>

                <rect x="250" y="10" width="120" height="80" rx="8" fill="#1e3a8a" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                <text x="310" y="55" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-200 text-sm font-mono">script.sh</text>

                <rect x="30" y="130" width="320" height="70" rx="12" fill="#111827" fillOpacity="0.05" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4" />
                <text x="190" y="160" textAnchor="middle" fill="#2d3748" className="dark:fill-gray-300 text-sm font-mono">:ls → buffers 1,2,3</text>
                <text x="190" y="185" textAnchor="middle" fill="#2d3748" className="dark:fill-gray-300 text-sm font-mono">:b 2 → switch to config.conf</text>

                <line x1="70" y1="90" x2="70" y2="125" stroke="#10b981" strokeWidth="2" strokeDasharray="4" className="group-hover:stroke-emerald-400 transition-colors">
                  <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">Buffers store edited files independently; commands like <code>:b</code> jump between them.</p>
          </div>
        </div>

        {/* Core commands table – same as original */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.3s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">⚙️ Essential Multi-File Commands</h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-3 text-left">Command</th><th className="p-3 text-left">Effect</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:e filename</td><td>Edit a new file (replace current buffer)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:e#</td><td>Toggle between previous file</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:n</td><td>Next file in argument list</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:prev / :N</td><td>Previous file in argument list</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:args</td><td>Show argument list</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:ls</td><td>List all buffers</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:b N / :b name</td><td>Go to buffer number / name</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:bnext / :bprev</td><td>Cycle through buffers</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:bd</td><td>Delete buffer (close without deleting file)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:set hidden</td><td>Allow switching buffers without saving</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-world usage – same */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.4s]  [animation-fill-mode:forwards]">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-l-8 border-emerald-500 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">🌍 Real‑World Scenarios</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>🔧 <strong>Swadeep</strong> debugging a web server: opens <code>/etc/nginx/nginx.conf</code>, edits, then <code>:e /var/log/nginx/error.log</code> to check logs without leaving Vim.</li>
              <li>📁 <strong>Abhronila</strong> refactors a Python project: <code>vim main.py utils.py config.py</code>, then moves through files with <code>:n</code> and <code>:prev</code> while applying global substitutions.</li>
              <li>🏫 <strong>Barrackpore High School</strong> lab: teachers maintain multiple student record CSV files – switching with <code>:b student_2025.csv</code> and <code>Ctrl+^</code> toggling saves hours.</li>
            </ul>
          </div>
        </div>

        {/* Tips from pros – same */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.5s]  [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">🎯 Pro Tip</div>
              <p className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded">:set autowrite</p>
              <p className="text-sm mt-2">Automatically saves buffer when using <code>:n</code>, <code>:prev</code> or <code>:make</code>. Avoids “No write since last change” warnings.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">⚡ Hidden Gems</div>
              <p><code className="bg-gray-200 dark:bg-gray-700 px-1">:bufdo %s/old/new/g | update</code> – run substitution across all buffers and save changed ones.</p>
              <p className="mt-2"><code className="bg-gray-200 dark:bg-gray-700 px-1">Ctrl+^</code> toggles between current and alternate file — faster than <code>:e#</code>.</p>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices – same */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.6s]  [animation-fill-mode:forwards] space-y-6">
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-lg">❌ Common Beginner Mistakes</h4>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Forgetting <code>:set hidden</code> → Vim refuses to switch buffers, losing work.</li>
              <li>Using <code>:q</code> instead of <code>:bd</code> → leaves hidden buffers consuming memory.</li>
              <li>Confusing argument list (<code>:n</code>) with buffer list (<code>:bnext</code>).</li>
              <li><strong>Debangshu's mistake</strong>: editing <code>/etc/passwd</code> and accidentally <code>:q!</code> – unsaved changes gone forever.</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg">✅ Best Practices</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Add <code>set hidden</code> in <code>~/.vimrc</code> for non‑destructive buffer switching.</li>
              <li>Use <code>:b</code> with partial names + tab completion: <code>:b conf&lt;TAB&gt;</code>.</li>
              <li>Clean up unused buffers with <code>:bd</code> to keep <code>:ls</code> manageable.</li>
              <li>Combine <code>:bufdo</code> + <code>:wall</code> to update many files at once.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist – same */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.7s]  [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl">
          <h3 className="text-xl font-bold mb-3">📋 Student Checklist — Multiple Files</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {["✅ Open two files with :e file1 file2", "✅ View all buffers using :ls", "✅ Switch between buffers using :b2 or :bname", "✅ Use :n and :N in argument list", "✅ Set hidden and verify switching without saving", "✅ Delete a buffer with :bd", "✅ Toggle between two files using Ctrl+^", "✅ Run :bufdo command on all open buffers"].map((item,i)=>(
              <div key={i} className="flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </div>
        </div>

        {/* Hint to trigger thinking – same */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.8s]  [animation-fill-mode:forwards] bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="italic text-gray-700 dark:text-gray-200">💡 <strong>Observe carefully</strong> — What happens if you edit a new file with <code>:e</code> but never save the previous one? Try <code>:set hidden</code> and see how buffers behave. Why might a sysadmin prefer <code>:b</code> over reopening files?</p>
        </div>

        {/* FAQ Component with Error Boundary */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.9s]  [animation-fill-mode:forwards]">
          <FAQErrorBoundary>
            <FAQTemplate
              title="Multiple Files in Vi/Vim"
              questions={safeQuestions}
            />
          </FAQErrorBoundary>
        </div>

        {/* Teacher's Note – same */}
        <div className="animate-[fadeInUp_0.5s_ease-out_1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_1s]  [animation-fill-mode:forwards] group">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <div className="flex items-start gap-4">
              <div className="text-5xl">👨‍🏫</div>
              <div>
                <h3 className="text-2xl font-bold">Teacher's Note — Sukanta Hui</h3>
                <p className="text-emerald-300 text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 7003756860 | 🧠 {experienceYears}+ years experience (since 1998)</p>
                <div className="mt-3 space-y-2 text-gray-200">
                  <p>✨ <strong>Pro classroom advice:</strong> Always have students run <code class="bg-gray-700 px-1 rounded">vim -O file1 file2</code> alongside learning buffers — visual split+multiple files reinforce the concept.</p>
                  <p>🔁 <strong>Memory hook:</strong> "Buffer = Bedroom (you store things), Argument = Playlist (order matters)". Practice <code>:ls</code> after each <code>:e</code>.</p>
                  <p>⚠️ For students in Naihati / Shyamnagar lab sessions: use <code>:bdelete</code> regularly to prevent "too many buffers" slowdown.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global keyframe style */}
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
            .animate-\\[fadeInUp.*\\] {
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