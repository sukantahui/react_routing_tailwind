import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic14_files/topic14_questions';

export default function Topic14() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Header */}
        <div className="animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <div className="border-b-4 border-emerald-500 dark:border-emerald-400 inline-block pb-1 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Using Vi/Vim as a Pager: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400">view</code> Command
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Why settle for <code>less</code> when you can have Vim's full search, syntax highlighting, and navigation? Use <code>view</code> (read‑only Vim) to safely explore logs, configs, command outputs, and large files without accidental edits.
          </p>
        </div>

        {/* Theory – What is view? */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-3xl">📖</span> Read‑Only Vim = <code>view</code>
            </h2>
            <p className="leading-relaxed mb-4">
              <strong className="text-blue-600 dark:text-blue-400"><code>view</code></strong> is a symlink to Vim that starts in read‑only mode (<code>set readonly</code>). All navigation and search commands work normally, but trying to write (<code>:w</code>) will fail unless forced with <code>w!</code>. It's perfect for paging through files you should not modify, like system logs or configuration examples.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              <li><strong className="font-semibold">Safe browsing</strong> – No accidental <code>i</code> or <code>dd</code> will change the file.</li>
              <li><strong className="font-semibold">Same power as Vim</strong> – Search (<code>/pattern</code>), scroll (<code>Ctrl+u/d</code>), jump (<code>gg</code>, <code>G</code>), even visual mode.</li>
              <li><strong className="font-semibold">Can be activated inside Vim</strong> – <code>:set readonly</code> toggles read‑only status.</li>
              <li><strong className="font-semibold">Viewing from pipes</strong> – <code>command | view -</code> reads stdin into a read‑only buffer.</li>
            </ul>
          </div>
        </div>

        {/* SVG – view vs less comparison */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500">
            <h3 className="text-xl font-semibold mb-3 text-center">Why <code>view</code> Beats <code>less</code></h3>
            <div className="flex justify-center">
              <svg width="520" height="240" viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                {/* less block */}
                <rect x="20" y="20" width="220" height="180" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" />
                <text x="130" y="50" textAnchor="middle" fill="#ef4444" className="font-mono font-bold text-sm">less pager</text>
                <text x="40" y="80" fill="#4b5563" className="dark:fill-gray-300 text-xs">- Basic search (/)</text>
                <text x="40" y="100" fill="#4b5563" className="dark:fill-gray-300 text-xs">- No syntax highlighting</text>
                <text x="40" y="120" fill="#4b5563" className="dark:fill-gray-300 text-xs">- Limited motions (j/k, G)</text>
                <text x="40" y="140" fill="#4b5563" className="dark:fill-gray-300 text-xs">- No visual mode</text>
                <text x="40" y="160" fill="#4b5563" className="dark:fill-gray-300 text-xs">- Can't edit (but that's fine)</text>

                {/* view block */}
                <rect x="280" y="20" width="220" height="180" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />
                <text x="390" y="50" textAnchor="middle" fill="#10b981" className="font-mono font-bold text-sm">view pager</text>
                <text x="300" y="80" fill="#4b5563" className="dark:fill-gray-300 text-xs">✓ Full Vim search (/ ? n N)</text>
                <text x="300" y="100" fill="#4b5563" className="dark:fill-gray-300 text-xs">✓ Syntax highlighting (syntax on)</text>
                <text x="300" y="120" fill="#4b5563" className="dark:fill-gray-300 text-xs">✓ All Vim motions (w, b, gg, G, etc.)</text>
                <text x="300" y="140" fill="#4b5563" className="dark:fill-gray-300 text-xs">✓ Visual selection and yank</text>
                <text x="300" y="160" fill="#4b5563" className="dark:fill-gray-300 text-xs">✓ Read‑only safety (no :w)</text>
                <line x1="245" y1="110" x2="275" y2="110" stroke="#10b981" strokeWidth="2" strokeDasharray="4">
                  <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                </line>
                <text x="260" y="100" textAnchor="middle" fill="#10b981" fontSize="10">better</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">Use <code>view</code> when you need Vim's power but cannot risk editing the file.</p>
          </div>
        </div>

        {/* Commands Reference Table */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.3s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">📜 Essential <code>view</code> Commands</h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-3 text-left">Command / Key</th><th className="p-3 text-left">Effect</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">view filename</td><td>Open file in read‑only mode</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">view -</td><td>Read stdin into read‑only buffer</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:set readonly</td><td>Make current buffer read‑only</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:set noreadonly</td><td>Allow writing again</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:w!</td><td>Force write even in read‑only mode (if you have permissions)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:q</td><td>Quit (no changes to save)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">/pattern</td><td>Search forward</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">n / N</td><td>Next / previous match</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">v, V, Ctrl+v</td><td>Visual modes (still work, but cannot change)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">y</td><td>Yank (copy) text – allowed</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real‑World Scenarios */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.4s]  [animation-fill-mode:forwards]">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-l-8 border-emerald-500 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">🌍 Where <code>view</code> Shines</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>📋 <strong>Swadeep</strong> inspects a huge <code>/var/log/syslog</code> file – uses <code>view</code> to search for "error" with <code>/error</code> and jump through matches with <code>n</code>, something <code>less</code> cannot highlight as nicely.</li>
              <li>🐞 <strong>Debangshu</strong> debugs a script: <code>./script.sh 2>&1 | view -</code> pipes stdout+stderr directly into a read‑only Vim buffer with syntax highlighting enabled.</li>
              <li>🏫 <strong>Barrackpore lab</strong> sets <code>alias less=view</code> for students so they learn Vim navigation while browsing documentation.</li>
              <li>🔒 <strong>Abhronila</strong> edits a critical config file – opens with <code>view /etc/nginx/nginx.conf</code> to double‑check before using <code>sudo vim</code>.</li>
              <li>📚 <strong>Tuhina</strong> reads long man pages: <code>man bash | col -b | view -</code> – gets Vim search in documentation.</li>
            </ul>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.5s]  [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">⚡ Smart Aliases</div>
              <p>Add to your <code>.bashrc</code> or <code>.zshrc</code>:</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`alias less='view -R'
alias vless='view -'
alias log='view /var/log/syslog'
alias manv='man -P "view -"'`}</pre>
              <p className="text-sm mt-2">Now <code>manv bash</code> opens man page in Vim.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">🧠 Syntax Highlighting in Pipes</div>
              <p>Vim auto‑detects file type from content, but you can force it:</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`# Pipe JSON into view with JSON highlighting
curl api.example.com | view - +'set ft=json'

# Same for logs
tail -f app.log | view - +'set ft=log'`}</pre>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.6s]  [animation-fill-mode:forwards] space-y-6">
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-lg">❌ Common Mistakes</h4>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Forgetting that <code>view</code> is read‑only by name but you can still <code>:w!</code> if you have write permission – not a true sandbox.</li>
              <li>Using <code>view</code> on huge files (>1GB) may be slower than <code>less</code> because Vim loads the whole file into memory.</li>
              <li>Piping into <code>view -</code> and then trying to <code>:w</code> – it will ask for a filename; not obvious to beginners.</li>
              <li>Not setting <code>syntax on</code> in <code>.vimrc</code> – then <code>view</code> lacks highlighting, defeating half the purpose.</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg">✅ Best Practices</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Add <code>set readonly</code> to a separate color scheme (e.g., red status line) to remind you.</li>
              <li>Use <code>view</code> for any file you only need to read – train your muscle memory.</li>
              <li>Combine with <code>vim -R</code> (same as <code>view</code>).</li>
              <li>For live logs, use <code>tail -f</code> piped to <code>view</code> but be aware that Vim buffers the whole stream – might fill memory.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.7s]  [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl">
          <h3 className="text-xl font-bold mb-3">📋 Student Checklist — Using <code>view</code></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "☐ Open a system log with view /var/log/syslog",
              "☐ Search for a pattern using /keyword",
              "☐ Jump to next match with n",
              "☐ Try to save with :w – see the error",
              "☐ Force write with :w! (if you have permission)",
              "☐ Use view - to read from a pipe: echo hello | view -",
              "☐ Open a man page in view: man bash | col -b | view -",
              "☐ Add alias less=view to your shell config",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.8s]  [animation-fill-mode:forwards] bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="italic text-gray-700 dark:text-gray-200">💡 <strong>Observe carefully:</strong> Start Vim normally, then type <code>:set readonly</code>. Notice how the status line changes (if you have one). Now try <code>:w</code>. Vim refuses. But you can still yank and paste into another buffer. This is how <code>view</code> works internally.</p>
        </div>

        {/* FAQ Component */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.9s]  [animation-fill-mode:forwards]">
          <FAQTemplate
            title="Using Vim as a Pager – FAQs"
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
                  <p>🎓 <strong>Classroom tip:</strong> After teaching <code>view</code>, ask students to replace <code>less</code> with <code>view</code> for a week. They will become comfortable with Vim navigation without fear of editing.</p>
                  <p>🧠 <strong>Real‑world story:</strong> At a sysadmin job, I used <code>view /etc/shadow</code> to check user accounts – read‑only prevented any chance of corruption. Students should adopt the same caution.</p>
                  <p>🏫 For Naihati lab: Have students create a shell function <code>{`vless() { view -R "$1"; }`}</code> and compare speed with <code>less</code>. Discuss why Vim loads the entire file and when that matters.</p>
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