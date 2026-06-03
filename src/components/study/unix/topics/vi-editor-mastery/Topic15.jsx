import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic15_files/topic15_questions';

export default function Topic15() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Header */}
        <div className="animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <div className="border-b-4 border-emerald-500 dark:border-emerald-400 inline-block pb-1 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Syntax Highlighting & File Type Detection
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Colour isn't just decoration – it's meaning. Let Vim highlight keywords, strings, comments, and errors automatically. Learn how Vim detects file types and how you can take full control.
          </p>
        </div>

        {/* Theory – What is syntax highlighting? */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-3xl">🎨</span> Adding Colour to Code
            </h2>
            <p className="leading-relaxed mb-4">
              Syntax highlighting uses colour and formatting to distinguish different elements of a file – keywords, strings, comments, constants, etc. <strong className="text-blue-600 dark:text-blue-400">File type detection</strong> (filetype) tells Vim which language or format rules to apply.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              <li><strong className="font-semibold">Enable syntax</strong> – <code>:syntax on</code> or add <code>syntax on</code> to your .vimrc.</li>
              <li><strong className="font-semibold">Automatic filetype detection</strong> – <code>:filetype on</code> (usually in <code>/etc/vim/vimrc</code>).</li>
              <li><strong className="font-semibold">Manual filetype</strong> – <code>:set filetype=python</code> (or <code>set ft=python</code>).</li>
              <li><strong className="font-semibold">Clear highlighting</strong> – <code>:syntax off</code> turns it all off.</li>
              <li><strong className="font-semibold">Colour schemes</strong> – <code>:colorscheme desert</code> changes the entire palette.</li>
            </ul>
          </div>
        </div>

        {/* SVG – How file type detection works */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500">
            <h3 className="text-xl font-semibold mb-3 text-center">How Vim Chooses Your Syntax</h3>
            <div className="flex justify-center">
              <svg width="550" height="220" viewBox="0 0 550 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <rect x="10" y="20" width="100" height="40" rx="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                <text x="60" y="45" textAnchor="middle" fill="#1e40af" className="dark:text-blue-300 text-xs">Open file</text>
                <line x1="110" y1="40" x2="150" y2="40" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />

                <rect x="150" y="10" width="130" height="60" rx="6" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="2" />
                <text x="215" y="32" textAnchor="middle" fill="#5b21b6" className="dark:text-purple-300 text-xs">Check filename</text>
                <text x="215" y="52" textAnchor="middle" fill="#5b21b6" className="dark:text-purple-300 text-xs">(.py, .js, .c, ...)</text>
                <line x1="280" y1="40" x2="320" y2="40" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />

                <rect x="320" y="10" width="130" height="60" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
                <text x="385" y="32" textAnchor="middle" fill="#d97706" className="dark:text-yellow-300 text-xs">Shebang (#!)</text>
                <text x="385" y="52" textAnchor="middle" fill="#d97706" className="dark:text-yellow-300 text-xs">or content sniff</text>
                <line x1="450" y1="40" x2="490" y2="40" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />

                <rect x="490" y="10" width="50" height="60" rx="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
                <text x="515" y="45" textAnchor="middle" fill="#b91c1c" className="dark:text-red-300 text-sm">Set ft</text>

                <rect x="150" y="110" width="300" height="60" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4" />
                <text x="300" y="135" textAnchor="middle" fill="#065f46" className="dark:text-emerald-300 text-xs">Load syntax rules from</text>
                <text x="300" y="155" textAnchor="middle" fill="#065f46" className="dark:text-emerald-300 text-xs">{`$VIMRUNTIME/syntax/{ft}.vim`}</text>

                <defs>
                  <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">Vim decides file type by extension, shebang, or content. Then it applies the matching syntax highlighter.</p>
          </div>
        </div>

        {/* Common filetype and syntax commands table */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.3s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">🎨 Essential Syntax & Filetype Commands</h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-3 text-left">Command</th><th className="p-3 text-left">Effect</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:syntax on</td><td>Enable syntax highlighting</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:syntax off</td><td>Disable syntax highlighting</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:filetype on</td><td>Enable file type detection</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:set filetype=python</td><td>Manually set filetype to python (also :set ft=python)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:set filetype?</td><td>Show current filetype</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:colorscheme desert</td><td>Change colour scheme</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:highlight Comment ctermfg=Blue</td><td>Customise one syntax group colour</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:syn list</td><td>List all active syntax groups</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:set background=dark</td><td>Tell Vim to use light text on dark background</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Example – how code looks with and without syntax */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.4s]  [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-300 dark:border-gray-600">
              <div className="text-sm font-mono text-gray-700 dark:text-gray-300">
                <div className="font-bold mb-2">Without syntax highlighting (plain)</div>
                <pre className="whitespace-pre-wrap">{`# function to greet
def greet(name):
    # print greeting
    print(f"Hello, {name}!")
greet("World")`}</pre>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-300 dark:border-gray-600">
              <div className="text-sm font-mono">
                <div className="font-bold mb-2">With syntax highlighting (colours)</div>
                <pre className="whitespace-pre-wrap">
                  <span className="text-purple-700 dark:text-purple-400"># function to greet</span>
                  <span className="text-blue-700 dark:text-blue-400">def</span> <span className="text-yellow-600 dark:text-yellow-400">greet</span>(<span className="text-orange-600 dark:text-orange-400">name</span>):
                      <span className="text-purple-700 dark:text-purple-400"># print greeting</span>
                      <span className="text-blue-700 dark:text-blue-400">print</span>(<span className="text-green-600 dark:text-green-400">f"Hello, {name}!"</span>)
                  <span className="text-yellow-600 dark:text-yellow-400">greet</span>(<span className="text-green-600 dark:text-green-400">"World"</span>)
                </pre>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">Syntax highlighting makes errors, keywords, and structure immediately visible.</p>
        </div>

        {/* Real‑World Scenarios */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.5s]  [animation-fill-mode:forwards]">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-l-8 border-emerald-500 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">🌍 Syntax in the Wild</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>🐍 <strong>Abhronila</strong> writes Python scripts; syntax highlighting immediately shows unclosed strings (string colour continues) and indentation errors (reported as red).</li>
              <li>📝 <strong>Debangshu</strong> edits a <code>Dockerfile</code> – Vim detects the filetype automatically because of the filename, and highlights commands like <code>FROM</code>, <code>RUN</code>, <code>COPY</code>.</li>
              <li>🏫 <strong>Shyamnagar lab</strong> sets <code>syntax on</code> globally in <code>/etc/vim/vimrc</code> so every student gets colour out of the box.</li>
              <li>🔧 <strong>Swadeep</strong> opens a log file – no highlighting by default, but he runs <code>:set ft=log</code> and gets timestamps and severity levels coloured.</li>
            </ul>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.6s]  [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">⚡ Override Filetype Quickly</div>
              <p>When Vim gets it wrong (e.g., a <code>.conf</code> file that's actually JSON), force it:</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`:set ft=json
:set ft=sh
:set syntax=python`}</pre>
              <p className="text-sm mt-2">Use <code>Ctrl+6</code> or <code>:e</code> to refresh filetype detection after renaming.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">🧠 Custom Syntax Highlighting</div>
              <p>Add your own rules in <code>~/.vim/after/syntax/</code>. Example: highlight TODO in comments:</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`" ~/.vim/after/syntax/c.vim
syn keyword myTodo TODO XXX contained
hi def link myTodo Todo`}</pre>
              <p className="text-sm mt-2">Now <code>TODO</code> appears in orange/yellow.</p>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.7s]  [animation-fill-mode:forwards] space-y-6">
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-lg">❌ Common Mistakes</h4>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Forgetting to enable <code>syntax on</code> – then everything stays black and white.</li>
              <li>Not having <code>filetype on</code> – detection won’t work, so <code>*.c</code> may not be highlighted as C.</li>
              <li>Overriding a colour scheme incorrectly – order matters: set <code>colorscheme</code> after enabling syntax.</li>
              <li>Assuming that all terminals support 256 colours – <code>$TERM</code> must be correct (e.g., <code>xterm-256color</code>).</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg">✅ Best Practices</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Always include <code>syntax on</code> and <code>filetype plugin indent on</code> in your <code>.vimrc</code>.</li>
              <li>Set the correct <code>background</code> (dark or light) so colours contrast well.</li>
              <li>Use a colour scheme that works for both day and night (e.g., <code>desert</code>, <code>slate</code>).</li>
              <li>When sharing config files, avoid terminal‑specific colours; stick to <code>ctermbg</code>/<code>ctermfg</code>.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.8s]  [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl">
          <h3 className="text-xl font-bold mb-3">📋 Student Checklist — Syntax & Filetype</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "☐ Enable syntax highlighting with :syntax on",
              "☐ Check current filetype with :set ft?",
              "☐ Open a Python file and confirm colouring",
              "☐ Open a C file and confirm colouring",
              "☐ Force a wrong filetype to see the difference",
              "☐ Change colour scheme with :colorscheme desert",
              "☐ Add syntax on and filetype on to .vimrc",
              "☐ Use :highlight to see all syntax groups",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.9s]  [animation-fill-mode:forwards] bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="italic text-gray-700 dark:text-gray-200">💡 <strong>Try changing this:</strong> Create a file named <code>test.xyz</code> with random content. Open it – no syntax. Then <code>:set ft=c</code> – suddenly it's coloured like C code. That's the power of manual filetype assignment. Now imagine writing a custom syntax file for a new language.</p>
        </div>

        {/* FAQ Component */}
        <div className="animate-[fadeInUp_0.5s_ease-out_1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_1s]  [animation-fill-mode:forwards]">
          <FAQTemplate
            title="Syntax Highlighting & Filetype Detection – FAQs"
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
                  <p>🎓 <strong>Classroom activity:</strong> Give students two versions of the same code file, one with syntax on, one off. Ask them to find a missing quote or bracket. The colour version reveals the error instantly – this convinces them of the value.</p>
                  <p>📚 <strong>Pro tip:</strong> Show students <code>:TOhtml</code> – it converts the current buffer with syntax highlighting to HTML. Great for printing code or embedding in reports.</p>
                  <p>🏫 For students in Ichapur: Have them write a small script that changes the colour scheme based on the time of day (e.g., dark theme at night). They'll learn about <code>:colorscheme</code> and shell conditionals.</p>
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