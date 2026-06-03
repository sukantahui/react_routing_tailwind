import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic17_files/topic17_questions';

export default function Topic17() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Header */}
        <div className="animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <div className="border-b-4 border-emerald-500 dark:border-emerald-400 inline-block pb-1 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400">vimtutor</code> – The Built‑in Interactive Tutorial
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            No need for videos or expensive courses. <code>vimtutor</code> is a hands‑on, interactive tutorial included with every Vim installation. Launch it now and learn Vim by doing, not watching.
          </p>
        </div>

        {/* Theory – What is vimtutor? */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-3xl">🎓</span> Your First Vim Lesson
            </h2>
            <p className="leading-relaxed mb-4">
              <strong className="text-blue-600 dark:text-blue-400"><code>vimtutor</code></strong> is a program that opens a specially crafted text file. Inside, you'll find lessons that <strong>expect you to try the commands</strong>. You read a short explanation, then perform the action – the tutorial checks that you do it correctly. It's the fastest way to acquire muscle memory.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              <li><strong className="font-semibold">Launch</strong> – simply type <code>vimtutor</code> in your terminal (no arguments).</li>
              <li><strong className="font-semibold">No sudo needed</strong> – runs as your user, creates a temporary copy.</li>
              <li><strong className="font-semibold">Languages</strong> – available in many languages (e.g., <code>vimtutor fr</code> for French).</li>
              <li><strong className="font-semibold">Duration</strong> – about 30–40 minutes for a complete first run.</li>
              <li><strong className="font-semibold">Persistence</strong> – after completing, you can restart and it will mark your progress.</li>
            </ul>
          </div>
        </div>

        {/* SVG – vimtutor flow */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500">
            <h3 className="text-xl font-semibold mb-3 text-center">How <code>vimtutor</code> Works</h3>
            <div className="flex justify-center">
              <svg width="520" height="220" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <rect x="10" y="20" width="110" height="50" rx="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                <text x="65" y="45" textAnchor="middle" className="text-sm font-mono dark:fill-blue-300 fill-blue-800">$ vimtutor</text>
                <line x1="120" y1="45" x2="160" y2="45" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr)" />

                <rect x="160" y="10" width="200" height="70" rx="6" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="2" />
                <text x="260" y="32" textAnchor="middle" className="text-sm dark:fill-purple-300 fill-purple-800">Opens tutorial file</text>
                <text x="260" y="52" textAnchor="middle" className="text-xs dark:fill-purple-300 fill-purple-800">Each lesson = instruction + task</text>
                <text x="260" y="68" textAnchor="middle" className="text-xs dark:fill-purple-300 fill-purple-800">You must perform the action</text>
                <line x1="360" y1="45" x2="400" y2="45" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr)" />

                <rect x="400" y="20" width="100" height="50" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
                <text x="450" y="45" textAnchor="middle" className="text-sm dark:fill-yellow-300 fill-yellow-800">Practice</text>
                <text x="450" y="62" textAnchor="middle" className="text-xs dark:fill-yellow-300 fill-yellow-800">& learn!</text>

                <rect x="160" y="140" width="200" height="50" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4" />
                <text x="260" y="162" textAnchor="middle" className="text-xs dark:fill-emerald-300 fill-emerald-800">After finishing: you can exit and</text>
                <text x="260" y="180" textAnchor="middle" className="text-xs dark:fill-emerald-300 fill-emerald-800">start over – progress is saved</text>

                <defs>
                  <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">No internet, no distractions – just you and Vim, learning by doing.</p>
          </div>
        </div>

        {/* What vimtutor covers */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">📚 What You'll Learn in <code>vimtutor</code></h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-3 text-left">Lesson Section</th><th className="p-3 text-left">Key Commands</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3">Lesson 1 – Cursor movement</td><td className="p-3 font-mono">h j k l, w, b, e, gg, G</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3">Lesson 2 – Deleting and undoing</td><td className="p-3 font-mono">x, dw, dd, u, U, Ctrl+R</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3">Lesson 3 – Putting and replacing</td><td className="p-3 font-mono">p, r, ce, cw</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3">Lesson 4 – File and search</td><td className="p-3 font-mono">:w, :q, /, ?, n, N, :! command</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3">Lesson 5 – Ex commands and more</td><td className="p-3 font-mono">:set, :s, :., :$</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3">Lesson 6 – Visual mode and options</td><td className="p-3 font-mono">v, V, Ctrl+v, :set, :colorscheme</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3">Lesson 7 – More help and resources</td><td className="p-3 font-mono">:help, vimtutor, vim-adventures</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500 text-center">The tutorial is interactive – you must type the commands to proceed. No passive reading!</p>
        </div>

        {/* Real‑World Scenarios */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-l-8 border-emerald-500 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">🌍 Who Benefits from <code>vimtutor</code></h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>👩‍🎓 <strong>Tuhina</strong> has never used Vim before – she runs <code>vimtutor</code> for 30 minutes and feels comfortable editing config files.</li>
              <li>👨‍🏫 <strong>Teachers in Barrackpore</strong> assign <code>vimtutor</code> as homework; students finish it at their own pace.</li>
              <li>💻 <strong>Swadeep</strong> is a VS Code user but needs to edit files over SSH – vimtutor teaches him the basics in an afternoon.</li>
              <li>🐧 <strong>System administrators</strong> run vimtutor once a year as a refresher before major maintenance.</li>
            </ul>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">⚡ Getting the Most Out of vimtutor</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Don't skip exercises – actually type the commands.</li>
                <li>If you make a mistake, use <code>u</code> to undo and try again.</li>
                <li>Complete the tutorial in one sitting (30-40 min).</li>
                <li>After finishing, run it again in a week to reinforce memory.</li>
              </ul>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">🌐 Languages & Customization</div>
              <p><code>vimtutor</code> supports many languages: <code>vimtutor fr</code>, <code>vimtutor de</code>, <code>vimtutor zh</code> etc. Check your system for available ones:</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`ls /usr/share/vim/vim*/tutor/`}</pre>
              <p className="text-sm mt-2">You can also create a custom tutor for your class by copying and editing the file.</p>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards] space-y-6">
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-lg">❌ Common Mistakes</h4>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Skipping exercises and just reading – you won't build muscle memory.</li>
              <li>Getting stuck on an exercise but not using `:help` or asking for help – the tutorial assumes you try multiple times.</li>
              <li>Closing the tutorial early – you can resume later, but continuity helps.</li>
              <li>Using arrow keys instead of `h j k l` – vimtutor warns you, but many ignore.</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg">✅ Best Practices</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Run `vimtutor` before you ever try to use Vim on real files.</li>
              <li>Keep a cheatsheet nearby (or use `:help` inside the tutor).</li>
              <li>After finishing, use `vimtutor` again but this time complete it without looking at the hints.</li>
              <li>Introduce vimtutor to colleagues or students – it's the single best resource for beginners.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl">
          <h3 className="text-xl font-bold mb-3">📋 Student Checklist — vimtutor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "☐ Open terminal and type `vimtutor`",
              "☐ Read Lesson 1, complete all exercises",
              "☐ Use `h j k l` to move (not arrow keys)",
              "☐ Complete Lessons 2–4 without quitting",
              "☐ Use `:help` inside the tutor if confused",
              "☐ Finish all 7 lessons in one session",
              "☐ Exit with `:q` after completion",
              "☐ Run `vimtutor` again next week for revision",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards] bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="italic text-gray-700 dark:text-gray-200">💡 <strong>Try changing this:</strong> After finishing vimtutor, open the same tutorial file with `vim /usr/share/vim/vim*/tutor/tutor` and see how it's written. Notice the special markers like `**` and how the tutorial checks your actions. You could even create a custom tutorial for your own students.</p>
        </div>

        {/* FAQ Component */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
          <FAQTemplate
            title="vimtutor – Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeInUp_0.5s_ease-out_1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_1s] opacity-0 [animation-fill-mode:forwards] group">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <div className="flex items-start gap-4">
              <div className="text-5xl">👨‍🏫</div>
              <div>
                <h3 className="text-2xl font-bold">Teacher's Note — Sukanta Hui</h3>
                <p className="text-emerald-300 text-sm mt-1">📧 sukantahui@codernaccotax.co.in | 📞 7003756860 | 🧠 {experienceYears}+ years experience (since 1998)</p>
                <div className="mt-3 space-y-2 text-gray-200">
                  <p>🎓 <strong>Classroom activity:</strong> Pair up students. One runs `vimtutor`, the other watches and gives hints (without touching the keyboard). Then swap. This reinforces teaching and learning.</p>
                  <p>📚 <strong>Pro tip:</strong> After students finish vimtutor, give them a real file (e.g., a messy CSV) and ask them to clean it up using only what they learned. This transfers knowledge.</p>
                  <p>🏫 For Ichapur/Naihati labs: If `vimtutor` is not installed (very rare), suggest `vim -u /usr/share/vim/vim*/tutor/tutor` – but generally it's always there. Also mention `vimtutor` works on any platform: Linux, macOS, Windows (with Git Bash or WSL).</p>
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