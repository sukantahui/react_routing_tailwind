import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic13_files/topic13_questions';

export default function Topic13() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Header */}
        <div className="animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <div className="border-b-4 border-emerald-500 dark:border-emerald-400 inline-block pb-1 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Configuring Vi/Vim with <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400">~/.vimrc</code>
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Stop typing the same settings every session. Write them once in <code>.vimrc</code> and Vim will behave exactly as you like – line numbers, indentation, color scheme, and more. This is the first step toward a professional editing environment.
          </p>
        </div>

        {/* Theory – What is .vimrc? */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-3xl">⚙️</span> The Vim Initialization File
            </h2>
            <p className="leading-relaxed mb-4">
              <strong className="text-blue-600 dark:text-blue-400"><code>.vimrc</code></strong> (Vim Run Commands) is a plain text file placed in your home directory (<code>~/.vimrc</code> on Linux/macOS, <code>_vimrc</code> on Windows). Vim reads it every time it starts, executing the commands inside. It replaces repeated manual typing with automation.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              <li><strong className="font-semibold">System-wide vs user</strong> – Global <code>/etc/vim/vimrc</code> affects all users; your <code>~/.vimrc</code> overrides it.</li>
              <li><strong className="font-semibold">No file? Create it</strong> – <code>touch ~/.vimrc</code> or edit with <code>vim ~/.vimrc</code>.</li>
              <li><strong className="font-semibold">Settings start with <code>set</code></strong> – e.g., <code>set number</code> turns on line numbers.</li>
              <li><strong className="font-semibold">Comments use <code>"</code></strong> – Vim ignores everything after a double quote on a line.</li>
            </ul>
          </div>
        </div>

        {/* SVG – .vimrc loading process */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500">
            <h3 className="text-xl font-semibold mb-3 text-center">How .vimrc Gets Loaded</h3>
            <div className="flex justify-center">
              <svg width="500" height="200" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <rect x="20" y="20" width="120" height="50" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                <text x="80" y="50" textAnchor="middle" fill="#1e293b" className="dark:fill-gray-200 text-sm font-mono">vim file.txt</text>
                <line x1="140" y1="45" x2="200" y2="45" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                <rect x="200" y="20" width="140" height="50" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />
                <text x="270" y="42" textAnchor="middle" fill="#065f46" className="dark:text-emerald-300 text-xs">Reads ~/.vimrc</text>
                <text x="270" y="58" textAnchor="middle" fill="#065f46" className="dark:text-emerald-300 text-xs">Executes each line</text>
                <line x1="340" y1="45" x2="400" y2="45" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                <rect x="400" y="20" width="80" height="50" rx="8" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
                <text x="440" y="50" textAnchor="middle" fill="#4c1d95" className="dark:text-purple-300 text-sm">Vim starts</text>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">Every Vim session begins by applying all settings from your <code>.vimrc</code>.</p>
          </div>
        </div>

        {/* Essential settings table */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.3s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">📝 Must‑Have Settings for Beginners</h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-3 text-left">Setting</th><th className="p-3 text-left">Effect</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set number</td><td>Show line numbers (absolute)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set relativenumber</td><td>Show line numbers relative to cursor</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set tabstop=4</td><td>Number of spaces a tab counts for</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set shiftwidth=4</td><td>Indent width for &gt;&gt; and &lt;&lt;</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set expandtab</td><td>Convert tabs to spaces</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set autoindent</td><td>Copy indent from previous line</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set hlsearch</td><td>Highlight search matches</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set incsearch</td><td>Search as you type</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set cursorline</td><td>Highlight current line</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">syntax on</td><td>Enable syntax highlighting</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set mouse=a</td><td>Enable mouse support</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">set background=dark</td><td>Use dark color scheme</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-gray-500 italic text-center">Pro tip: Many settings can be toggled with <code>:set setting? </code> to check current value.</div>
        </div>

        {/* Example .vimrc content */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.4s]  [animation-fill-mode:forwards]">
          <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-5 border border-gray-700 overflow-x-auto">
            <h3 className="text-lg font-semibold text-white mb-2">Sample <code>.vimrc</code> (for a student in Barrackpore)</h3>
            <pre className="text-sm text-emerald-300 font-mono whitespace-pre-wrap">
{`" Basic settings for readability
set number               " Show absolute line numbers
set relativenumber       " Show relative line numbers too
set tabstop=4            " Tabs appear as 4 spaces
set shiftwidth=4         " Indentation width
set expandtab            " Insert spaces instead of <Tab>
set autoindent           " Copy indent from previous line

" Search and visual improvements
set hlsearch             " Highlight search matches
set incsearch            " Search incrementally
set cursorline           " Highlight current line
syntax on                " Syntax highlighting

" Mouse and clipboard
set mouse=a              " Enable mouse in all modes
set clipboard=unnamedplus " Use system clipboard (Linux)

" Color scheme (if you have one installed)
colorscheme desert       " Built-in scheme

" Save and restore cursor position
au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif`}
            </pre>
            <p className="text-gray-400 text-xs mt-2">Put this in <code>~/.vimrc</code> and restart Vim. Each line is executed at startup.</p>
          </div>
        </div>

        {/* Real‑World Usage */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.5s]  [animation-fill-mode:forwards]">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-l-8 border-emerald-500 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">🌍 Why Config Matters</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>👩‍💻 <strong>Abhronila</strong> programs Python daily: she sets <code>tabstop=4 expandtab</code> to comply with PEP8, and <code>set number</code> to navigate errors.</li>
              <li>👨‍💻 <strong>Debangshu</strong> edits many JSON configs: uses <code>set smartindent</code> and <code>colorscheme elflord</code> for better visibility.</li>
              <li>🏫 <strong>Shyamnagar lab</strong> pre‑configures <code>.vimrc</code> for all students with <code>set mouse=a</code> and <code>syntax on</code> to reduce support questions.</li>
              <li>📝 <strong>Tuhina</strong> writes markdown: adds <code>set wrap</code> and <code>set linebreak</code> to soft‑wrap long lines.</li>
            </ul>
          </div>
        </div>

        {/* Advanced Tips */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.6s]  [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">⚡ Conditional Settings</div>
              <p>Use <code>if has('gui_running')</code> to apply settings only in GUI Vim (gvim). Or set <code>set filetype=python</code>‑specific indentation with <code>autocmd FileType python set tabstop=2</code>.</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`" Only in GUI
if has('gui_running')
  set guifont=Monospace\\ 12
  set guioptions-=T  " No toolbar
endif`}</pre>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">🔁 Mappings & Abbreviations</div>
              <p>Save keystrokes by creating shortcuts in <code>.vimrc</code>. Example:</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`" Quick save and exit
nnoremap <C-s> :w<CR>
inoremap jk <Esc>
" Edit .vimrc quickly
nnoremap <leader>ev :split ~/.vimrc<CR>`}</pre>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.7s]  [animation-fill-mode:forwards] space-y-6">
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-lg">❌ Common Mistakes</h4>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Syntax errors</strong> – forgetting <code>set</code> before options (e.g., writing <code>number</code> instead of <code>set number</code>).</li>
              <li><strong>Spacing errors</strong> – using spaces after <code>set</code>? Actually <code>set number</code> works with or without space, but consistency matters.</li>
              <li><strong>Conflicting settings</strong> – e.g., <code>set expandtab</code> but also <code>set noexpandtab</code> later; the last one wins.</li>
              <li><strong>Over‑complicating early</strong> – trying to copy huge configs from the internet without understanding each line.</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg">✅ Best Practices</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Start small – add one setting at a time and test.</li>
              <li>Comment your <code>.vimrc</code> heavily – future you will thank you.</li>
              <li>Keep a backup or version control (<code>git init</code> in <code>~/.vim</code>).</li>
              <li>Use <code>:source ~/.vimrc</code> to reload without restarting Vim.</li>
              <li>For large configurations, split into multiple files in <code>~/.vim/plugin/</code>.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.8s]  [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl">
          <h3 className="text-xl font-bold mb-3">📋 Student Checklist — Configuring .vimrc</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "☐ Create ~/.vimrc in your home directory",
              "☐ Add set number for line numbers",
              "☐ Add set tabstop=4 and expandtab",
              "☐ Enable syntax highlighting with syntax on",
              "☐ Set cursorline to highlight current line",
              "☐ Add set mouse=a to enable mouse support",
              "☐ Save the file and restart Vim",
              "☐ Reload config with :source ~/.vimrc",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.9s]  [animation-fill-mode:forwards] bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="italic text-gray-700 dark:text-gray-200">💡 <strong>Think about:</strong> Why would you <code>set expandtab</code>? Try editing a Makefile (which requires literal tabs) — you might temporarily disable it. How would you toggle settings quickly? (Hint: <code>:set invexpandtab</code> toggles).</p>
        </div>

        {/* FAQ Component */}
        <div className="animate-[fadeInUp_0.5s_ease-out_1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_1s]  [animation-fill-mode:forwards]">
          <FAQTemplate
            title="Vim Configuration – FAQs"
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
                  <p>🎓 <strong>Classroom tip:</strong> After explaining <code>.vimrc</code>, ask students to pair up and compare their configs. Have them explain why they chose each setting. This builds critical thinking.</p>
                  <p>🧩 <strong>Challenge:</strong> Ask students to create a minimal <code>.vimrc</code> that makes Vim look and feel like a modern IDE with line numbers and syntax highlighting – but no more than 10 lines.</p>
                  <p>🏫 For students in Ichapur and Naihati: Remind them that <code>.vimrc</code> is a hidden file – use <code>ls -a</code> to see it. And never copy someone else's entire config blindly; understand every line.</p>
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