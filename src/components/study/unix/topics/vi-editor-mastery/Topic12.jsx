import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic12_files/topic12_questions';

export default function Topic12() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Header */}
        <div className="animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <div className="border-b-4 border-emerald-500 dark:border-emerald-400 inline-block pb-1 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Splitting Windows in Vi/Vim
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Why settle for one view? Split your editor vertically or horizontally to compare files, debug scripts, or watch logs while coding. Master <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400">:split</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400">:vsplit</code>, and <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400">Ctrl+w</code> navigation.
          </p>
        </div>

        {/* Theory – Windows vs Buffers */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-3xl">🪟</span> Windows ≠ Buffers
            </h2>
            <p className="leading-relaxed mb-4">
              A <strong className="text-blue-600 dark:text-blue-400">buffer</strong> is the in‑memory content of a file. A <strong className="text-indigo-600 dark:text-indigo-400">window</strong> is a viewport onto a buffer. You can have multiple windows showing the same buffer (different locations) or different buffers. Splitting creates new windows without closing the current one.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              <li><strong className="font-semibold">Horizontal split</strong> – <code>:split</code> (or <code>:sp</code>) divides the screen top/bottom.</li>
              <li><strong className="font-semibold">Vertical split</strong> – <code>:vsplit</code> (or <code>:vs</code>) divides left/right.</li>
              <li><strong className="font-semibold">Navigate</strong> – <code>Ctrl+w</code> followed by <code>h/j/k/l</code> or arrow keys.</li>
              <li><strong className="font-semibold">Close a window</strong> – <code>:q</code> or <code>Ctrl+w q</code>. Last window closes Vim.</li>
            </ul>
          </div>
        </div>

        {/* SVG Interactive Split Demo */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500">
            <h3 className="text-xl font-semibold mb-3 text-center">Window Splitting in Action</h3>
            <div className="flex justify-center">
              <svg width="500" height="260" viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                {/* Outer Vim border */}
                <rect x="10" y="10" width="480" height="240" rx="6" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
                {/* Horizontal split line */}
                <line x1="10" y1="130" x2="490" y2="130" stroke="#10b981" strokeWidth="2" strokeDasharray="6" className="group-hover:stroke-emerald-400 transition-colors">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite" />
                </line>
                {/* Top window content */}
                <text x="30" y="40" fill="#9ca3af" fontSize="12" fontFamily="monospace">:split</text>
                <text x="30" y="65" fill="#e5e7eb" fontSize="14" fontFamily="monospace">-- file1.txt --</text>
                <text x="30" y="90" fill="#cbd5e1" fontSize="12">Line 1: Hello</text>
                <text x="30" y="110" fill="#cbd5e1" fontSize="12">Line 2: World</text>
                {/* Bottom window content */}
                <text x="30" y="155" fill="#e5e7eb" fontSize="14" fontFamily="monospace">-- file2.log --</text>
                <text x="30" y="180" fill="#cbd5e1" fontSize="12">2025-04-12 Error: ...</text>
                <text x="30" y="200" fill="#cbd5e1" fontSize="12">2025-04-12 Info: started</text>
                {/* Vertical split hint on the side */}
                <text x="390" y="210" fill="#10b981" fontSize="11" className="group-hover:fill-emerald-400">:vsplit →</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">Multiple windows allow simultaneous editing of different files or different parts of the same file.</p>
          </div>
        </div>

        {/* Commands Reference Table */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.3s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">⌨️ Essential Split Commands</h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-3 text-left">Command</th><th className="p-3 text-left">Effect</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:split (or :sp)</td><td>Split window horizontally</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:vsplit (or :vs)</td><td>Split window vertically</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:new</td><td>Create new empty file in a horizontal split</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:vnew</td><td>Create new empty file in a vertical split</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">Ctrl+w h/j/k/l</td><td>Move focus left/down/up/right</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">Ctrl+w w</td><td>Cycle focus through windows</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">Ctrl+w q</td><td>Close current window</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">Ctrl+w o</td><td>Close all other windows (keep only current)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">Ctrl+w =</td><td>Equalize window sizes</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:resize +5</td><td>Increase height by 5 lines</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:vertical resize -10</td><td>Decrease width by 10 columns</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-gray-500 italic text-center">Pro tip: <code>Ctrl+w</code> then <code>Shift+h</code> moves to leftmost window, <code>Shift+l</code> to rightmost.</div>
        </div>

        {/* Real‑World Scenarios */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.4s]  [animation-fill-mode:forwards]">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-l-8 border-emerald-500 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">🌍 Where Splits Shine</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>📝 <strong>Tuhina</strong> copies configuration from <code>nginx.conf</code> (top window) to <code>nginx.conf.bak</code> (bottom window) – no need to leave Vim.</li>
              <li>🐞 <strong>Debangshu</strong> debugs a shell script: left window shows the script, right window runs <code>:!./script.sh</code> in a terminal (using <code>:term</code>).</li>
              <li>📊 <strong>Shyamnagar school lab</strong>: students compare two CSV files side‑by‑side with <code>:vsplit marks1.csv</code> and <code>:vsplit marks2.csv</code>.</li>
              <li>📋 <strong>Abhronila</strong> edits a long LaTeX document: splits horizontally to see both abstract and conclusion simultaneously.</li>
            </ul>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.5s]  [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">⚡ Speed Hacks</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1">:sp %</code> – split current file (same buffer, different location).</li>
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1">:vs #</code> – vertical split with alternate file.</li>
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1">Ctrl+w _</code> – maximise current window height.</li>
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1">Ctrl+w |</code> – maximise current window width.</li>
              </ul>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">🧠 Cognitive Flow</div>
              <p>Use splits to avoid context switching. Keep reference material (specs, logs) in one window, code in another. Bind <code>Ctrl+h/j/k/l</code> to move between splits without the <code>Ctrl+w</code> prefix by adding to <code>.vimrc</code>:</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l`}</pre>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.6s]  [animation-fill-mode:forwards] space-y-6">
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-lg">❌ Common Beginner Mistakes</h4>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Forgetting the <code>Ctrl+w</code> prefix – typing just <code>h</code> moves the cursor, not the window focus.</li>
              <li>Closing the wrong window with <code>:q</code> and losing unsaved changes in other windows (splits are independent).</li>
              <li>Assuming splits share the same buffer – they can show different parts of the same buffer, but editing one updates all.</li>
              <li>Over-splitting (20+ windows) – Vim can handle it, but your brain can't. Use <code>Ctrl+w o</code> to clean up.</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg">✅ Best Practices</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Use <code>:help window-move-cursor</code> to learn all navigation shortcuts.</li>
              <li>Save window layout with <code>:mksession</code> to restore later.</li>
              <li>Start Vim with splits: <code>vim -O file1 file2</code> (vertical) or <code>-o</code> (horizontal).</li>
              <li>Resize splits using mouse if <code>set mouse=a</code> is enabled – but learn the keyboard way first.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.7s]  [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl">
          <h3 className="text-xl font-bold mb-3">📋 Student Checklist — Splitting Windows</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "✅ Open a horizontal split with :sp",
              "✅ Open a vertical split with :vs",
              "✅ Move focus using Ctrl+w h/j/k/l",
              "✅ Cycle windows with Ctrl+w w",
              "✅ Close current window with Ctrl+w q",
              "✅ Maximize current window with Ctrl+w _ (height) or | (width)",
              "✅ Split current file with :sp %",
              "✅ Start Vim with vertical splits: vim -O file1 file2"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.8s]  [animation-fill-mode:forwards] bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="italic text-gray-700 dark:text-gray-200">💡 <strong>Think about:</strong> How would you use splits to compare two versions of the same file? Try <code>:sp</code> then <code>:diffthis</code> in both windows – Vim highlights differences automatically!</p>
        </div>

        {/* FAQ Component */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.9s]  [animation-fill-mode:forwards]">
          <FAQTemplate
            title="Splitting Windows in Vi/Vim – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeInUp_0.5s_ease-out_1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_1s]  [animation-fill-mode:forwards] group">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <div className="flex items-start gap-4">
              <div className="text-5xl">👨‍🏫</div>
              <div>
                <h3 className="text-2xl font-bold">Teacher's Note — Sukanta Hui</h3>
                <p className="text-emerald-300 text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 7003756860 | 🧠 {experienceYears}+ years experience (since 1998)</p>
                <div className="mt-3 space-y-2 text-gray-200">
                  <p>🎓 <strong>Classroom tip:</strong> After teaching <code>:split</code>, ask students to open a long log file and split it, then use <code>/</code> search in one window while keeping a reference point in the other. This builds muscle memory for navigation.</p>
                  <p>🔄 <strong>Memory aid:</strong> "Ctrl+w is the window key – think of 'w' for window. Then the same movement keys as Normal mode (h,j,k,l)."</p>
                  <p>🏫 For students in Ichapur and Naihati: Use <code>:vs /etc/hosts</code> and <code>:vs /etc/hostname</code> side‑by‑side to understand system config files.</p>
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