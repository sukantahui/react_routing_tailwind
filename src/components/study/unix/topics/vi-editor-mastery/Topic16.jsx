import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic16_files/topic16_questions';

export default function Topic16() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Header */}
        <div className="animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <div className="border-b-4 border-emerald-500 dark:border-emerald-400 inline-block pb-1 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Recording Macros: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400">q</code> + Register, Execute with <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400">@</code>
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Automate repetitive editing without writing scripts. Record your keystrokes into a macro, then replay them dozens or hundreds of times. Master this and you'll leave other editors behind.
          </p>
        </div>

        {/* Theory – What is a macro? */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/60 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-3xl">📼</span> What is a Macro?
            </h2>
            <p className="leading-relaxed mb-4">
              A macro is a recorded sequence of keystrokes stored in a <strong className="text-blue-600 dark:text-blue-400">register</strong> (a‑z, 0‑9). You can replay it with <code>@</code> and repeat it any number of times. Macros record <strong>anything</strong> you type in Normal, Insert, or Command mode – including motions, deletions, changes, and even recursive calls.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              <li><strong className="font-semibold">Start recording</strong> – <code>q</code> followed by a register letter (e.g., <code>qa</code>).</li>
              <li><strong className="font-semibold">Stop recording</strong> – press <code>q</code> again.</li>
              <li><strong className="font-semibold">Play macro once</strong> – <code>@a</code> (replace 'a' with your register).</li>
              <li><strong className="font-semibold">Play multiple times</strong> – <code>10@a</code> repeats macro `a` ten times.</li>
              <li><strong className="font-semibold">Replay the last used macro</strong> – <code>@@</code>.</li>
              <li><strong className="font-semibold">View macro contents</strong> – <code>:reg a</code> shows the recorded keystrokes.</li>
            </ul>
          </div>
        </div>

        {/* SVG Macro Recording Flow */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500">
            <h3 className="text-xl font-semibold mb-3 text-center">Macro Recording & Playback</h3>
            <div className="flex justify-center">
              <svg width="500" height="240" viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <rect x="20" y="20" width="100" height="60" rx="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
                <text x="70" y="45" textAnchor="middle" fill="#1e3a8a" className="dark:text-blue-300 text-sm font-mono">qa</text>
                <text x="70" y="65" textAnchor="middle" fill="#1e3a8a" className="dark:text-blue-300 text-xs">start record</text>
                <line x1="120" y1="50" x2="160" y2="50" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr)" />

                <rect x="160" y="10" width="180" height="80" rx="6" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="2" />
                <text x="250" y="35" textAnchor="middle" fill="#4c1d95" className="dark:text-purple-300 text-sm">Type actions</text>
                <text x="250" y="55" textAnchor="middle" fill="#4c1d95" className="dark:text-purple-300 text-xs">i, dd, j, x, /, etc.</text>
                <text x="250" y="75" textAnchor="middle" fill="#4c1d95" className="dark:text-purple-300 text-xs">Vim records everything</text>
                <line x1="340" y1="50" x2="380" y2="50" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr)" />

                <rect x="380" y="20" width="90" height="60" rx="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
                <text x="425" y="45" textAnchor="middle" fill="#991b1b" className="dark:text-red-300 text-sm font-mono">q</text>
                <text x="425" y="65" textAnchor="middle" fill="#991b1b" className="dark:text-red-300 text-xs">stop record</text>

                <rect x="120" y="140" width="120" height="50" rx="6" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />
                <text x="180" y="160" textAnchor="middle" fill="#065f46" className="dark:text-emerald-300 text-sm font-mono">@a</text>
                <text x="180" y="178" textAnchor="middle" fill="#065f46" className="dark:text-emerald-300 text-xs">play macro a</text>
                <line x1="240" y1="165" x2="280" y2="165" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arr)" />

                <rect x="280" y="140" width="100" height="50" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
                <text x="330" y="160" textAnchor="middle" fill="#b45309" className="dark:text-yellow-300 text-sm font-mono">5@a</text>
                <text x="330" y="178" textAnchor="middle" fill="#b45309" className="dark:text-yellow-300 text-xs">play 5 times</text>

                <defs>
                  <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">Record once, replay many times – macros are Vim's automation superpower.</p>
          </div>
        </div>

        {/* Example commands table */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.3s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">⌨️ Macro Commands Summary</h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-3 text-left">Command</th><th className="p-3 text-left">Effect</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">qa</td><td>Start recording into register 'a'</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">q</td><td>Stop recording (while recording)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">@a</td><td>Replay macro from register 'a' once</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">@@</td><td>Replay the last used macro</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">10@a</td><td>Replay macro 'a' ten times</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:reg a</td><td>View contents of register 'a'</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">qA</td><td>Append to macro 'a' (capital letter)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:let @a='...'</td><td>Set macro content directly (command mode)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">"ap</td><td>Put macro contents into the buffer (as text)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="p-3 font-mono">:normal @a</td><td>Replay macro in command mode (for scripting)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real‑World Example – Format CSV */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.4s]  [animation-fill-mode:forwards]">
          <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-5 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">📊 Real Example: Convert CSV to SQL INSERT</h3>
            <pre className="text-sm text-emerald-300 font-mono whitespace-pre-wrap overflow-x-auto">{`Sample data (names.csv):
John,25,Engineer
Jane,30,Designer
Mike,28,Manager

Step‑by‑step macro for register q:
1. qq                     start recording in register q
2. ^                      move to first character of line
3. iINSERT INTO users VALUES ('   start insert
4. <Esc>                  exit insert mode
5. f,                     find first comma
6. cw', ',                change from comma to ', ' (including quotes)
7. f,                     find next comma
8. cw', ',                change again
9. $                      go to end of line
10. a');<Esc>             append closing paren and semicolon
11. j                     move to next line
12. q                     stop recording

Now execute: 3@q`}</pre>
            <p className="text-gray-400 text-xs mt-2">This macro turns each CSV line into an SQL insert. Record once, replay for every line.</p>
          </div>
        </div>

        {/* Real‑World Scenarios */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.5s]  [animation-fill-mode:forwards]">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-l-8 border-emerald-500 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">🌍 Where Macros Save Hours</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>📋 <strong>Swadeep</strong> needs to add <code>#include &lt;debug.h&gt;</code> to 200 C files – records macro <code>ggO#include &lt;debug.h&gt;&lt;Esc&gt;:w&lt;CR&gt;:n&lt;CR></code>, then <code>200@a</code>.</li>
              <li>📊 <strong>Abhronila</strong> formats a messy log file: records a macro that deletes lines matching "DEBUG", then reformats timestamps, then repeats for the whole file with <code>1000@q</code>.</li>
              <li>🏫 <strong>Barrackpore lab</strong> teachers use macros to auto‑grade assignments: macro adds comments, inserts scores, and saves each student file.</li>
              <li>🐞 <strong>Debangshu</strong> debugs JavaScript: macro that inserts <code>console.log('variable:', variable)</code> for the variable under the cursor.</li>
            </ul>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.6s]  [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">⚡ Macro Power Tips</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Use <code>qq</code> to record, but use <code>qQ</code> to <strong>append</strong> to an existing macro.</li>
                <li>End your macro with a motion that brings you to the next starting position (e.g., <code>j</code> or <code>/pattern</code>) so you can repeat safely.</li>
                <li>If a macro fails (e.g., search fails), it stops – use <code>silent!</code> inside macro: <code>:silent! /pattern</code>.</li>
                <li>Edit a macro: paste it into the buffer (<code>"ap</code>), edit, then yank back (<code>"ayy</code>).</li>
              </ul>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-2xl mb-2">🧠 Recursion in Macros</div>
              <p>You can call a macro from within itself. Example: macro <code>q</code> that does a transformation then calls itself:</p>
              <pre className="text-xs bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">{`qq                     // start record
... transformation ...
j                      // move down
@q                     // call itself
q`}</pre>
              <p className="text-sm mt-2">Be careful – infinite loop! Use a counter or stop condition.</p>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.7s]  [animation-fill-mode:forwards] space-y-6">
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-lg">❌ Common Mistakes</h4>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Forgetting to stop recording – you keep typing and everything goes into the macro.</li>
              <li>Not ending the macro ready for the next line – you replay and it doesn't advance.</li>
              <li>Recording mouse actions – macros only record keyboard input; mouse clicks are ignored.</li>
              <li>Macro depends on cursor position – if not absolute, replay may fail on different line lengths.</li>
              <li>Using registers containing macro text as normal text – registers are shared; overwriting a register you meant to keep.</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg">✅ Best Practices</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Test your macro on a single line first, then undo and replay many times.</li>
              <li>Use `:verbose` to see what a macro does: `:reg a` shows the literal keystrokes.</li>
              <li>Store complex macros in your .vimrc using `let @a = '...'` (escape special characters).</li>
              <li>Name macros by function: `q` for quick, `w` for write, etc., but only 26 letters – use a mnemonic.</li>
              <li>Keep macros small and composable – record one action, then call it from another macro.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.8s]  [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl">
          <h3 className="text-xl font-bold mb-3">📋 Student Checklist — Macros</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "☐ Start recording: qa",
              "☐ Perform a series of edits (e.g., dd, iHello<Esc>)",
              "☐ Stop recording: q",
              "☐ Replay macro once: @a",
              "☐ Replay macro 5 times: 5@a",
              "☐ Replay last macro: @@",
              "☐ View macro contents: :reg a",
              "☐ Append to macro: qA (then new actions, then q)",
              "☐ Record macro that moves to next line (j) to repeat on many lines",
              "☐ Save macro in .vimrc: let @a = '...'",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300">{item}</div>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeInUp_0.5s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.5s_ease-out_0.9s]  [animation-fill-mode:forwards] bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="italic text-gray-700 dark:text-gray-200">💡 <strong>Think about:</strong> How would you record a macro that adds a semicolon at the end of every line in a file? Recording just <code>A;&lt;Esc&gt;j</code> then replaying with <code>100@q</code> works – but what if the file has blank lines? How could you skip them? (Hint: use <code>/^$</code> as a stop condition).</p>
        </div>

        {/* FAQ Component */}
        <div className="animate-[fadeInUp_0.5s_ease-out_1s] motion-safe:animate-[fadeInUp_0.5s_ease-out_1s]  [animation-fill-mode:forwards]">
          <FAQTemplate
            title="Macros in Vim – FAQs"
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
                  <p>🎓 <strong>Classroom drill:</strong> Give students a file with 50 lines of CSV data and ask them to add quotes around the second field using a macro. This forces them to think about relative motions (`f,`, `w`, `e`) and ending the macro ready for the next line.</p>
                  <p>🧠 <strong>Insight:</strong> Macros are Vim's "record and replay" – once a student masters them, they often ask: "Can I do this in other editors?" The answer is rarely as powerful.</p>
                  <p>🏫 For Naihati students: Challenge them to write a macro that comments out a block of code (insert // at start of line) and then uncomments it (remove //). They'll learn about regex in macros.</p>
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