import React, { useState } from 'react';
import clsx from 'clsx';

// ============================================================
// Import external files (raw text and FAQ JSON)
// ============================================================
import globalReplaceScript from './topic4_files/global_replace.sh?raw';
import selectiveLineScript from './topic4_files/selective_line.sh?raw';
import selectivePatternScript from './topic4_files/selective_pattern.sh?raw';
import selectiveMultipleScript from './topic4_files/selective_multiple.sh?raw';
import selectiveConditionalScript from './topic4_files/selective_conditional.sh?raw';
import questions from './topic4_files/topic4_questions.js';

// ============================================================
// Local reusable components (ShellFileLoader, FAQTemplate)
// ============================================================

const ShellFileLoader = ({ fileModule, title, highlightLines = [] }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(fileModule);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <span className="text-sm font-mono font-medium text-gray-700 dark:text-gray-200">{title}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
        <code>
          {fileModule.split('\n').map((line, idx) => (
            <div key={idx} className={clsx(highlightLines.includes(idx + 1) && 'bg-yellow-200 dark:bg-yellow-900/30')}>
              {line}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

const FAQTemplate = ({ title, questions }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{title}</h3>
      <div className="space-y-4">
        {questions.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left px-6 py-4 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <svg className={clsx("w-5 h-5 transition-transform duration-300", openIndex === idx && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === idx && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 animate-[fadeIn_0.3s_ease-out]">
                <p className="text-gray-600 dark:text-gray-300 mb-2"><span className="font-semibold">Short:</span> {faq.shortAnswer}</p>
                <p className="text-gray-700 dark:text-gray-200 mb-2"><span className="font-semibold">Explanation:</span> {faq.explanation}</p>
                {faq.hint && <p className="text-sm text-indigo-600 dark:text-indigo-400 italic mb-2"><span className="font-semibold">💡 Hint:</span> {faq.hint}</p>}
                {faq.codeExample && (
                  <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto mt-2">
                    <code>{faq.codeExample}</code>
                  </pre>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// Main Component: Topic4 - Global and selective replacement in files
// ============================================================

const Topic4 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration for global vs selective replacement
  const ReplacementIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="320" viewBox="0 0 600 320" className="w-full max-w-md h-auto">
        <rect width="600" height="320" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Global replacement example */}
        <text x="30" y="40" fontSize="16" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">Global replacement (/g)</text>
        <rect x="30" y="55" width="250" height="24" rx="4" fill="#fee2e2" className="dark:fill-red-900/40" />
        <text x="40" y="73" fontSize="14" fontFamily="monospace" fill="#dc2626">apple apple apple</text>
        <text x="290" y="73" fontSize="20" fill="#4f46e5">→</text>
        <rect x="320" y="55" width="250" height="24" rx="4" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="330" y="73" fontSize="14" fontFamily="monospace" fill="#16a34a">MANGO MANGO MANGO</text>
        
        {/* Selective replacement example (line 2 only) */}
        <text x="30" y="130" fontSize="16" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">Selective (line 2 only)</text>
        <rect x="30" y="145" width="250" height="24" rx="4" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="40" y="163" fontSize="14" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Line 1: OK</text>
        <rect x="30" y="175" width="250" height="24" rx="4" fill="#fef9c3" className="dark:fill-yellow-900/60" />
        <text x="40" y="193" fontSize="14" fontFamily="monospace" fill="#854d0e">Line 2: Warning</text>
        <rect x="30" y="205" width="250" height="24" rx="4" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="40" y="223" fontSize="14" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Line 3: OK</text>
        <text x="290" y="193" fontSize="20" fill="#4f46e5">→</text>
        <rect x="320" y="175" width="250" height="24" rx="4" fill="#cffafe" className="dark:fill-cyan-900/40" />
        <text x="330" y="193" fontSize="14" fontFamily="monospace" fill="#0891b2">Line 2: ERROR</text>
        
        {/* Animated selector arrow */}
        <path d="M 280 187 L 310 187" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowSelect)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        <defs>
          <marker id="arrowSelect" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .reveal-section {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            animation: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="reveal-section text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
            Global & Selective Replacement in Files
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master precision editing with sed: replace all occurrences, target specific lines, patterns, or ranges — transform exactly what you need.
          </p>
        </div>

        {/* SVG Concept Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <ReplacementIllustration />
        </div>

        {/* Command Signatures / Prototype */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">📜 Prototype / Signature</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-orange-600 dark:text-orange-400 block"># Global replacement (all occurrences in every line)</code>
            <code className="text-orange-600 dark:text-orange-400 block">sed 's/pattern/replacement/g' file</code>
            <code className="text-orange-600 dark:text-orange-400 block"># Selective by line number</code>
            <code className="text-orange-600 dark:text-orange-400 block">sed '3 s/pattern/replacement/' file</code>
            <code className="text-orange-600 dark:text-orange-400 block"># Selective by line range</code>
            <code className="text-orange-600 dark:text-orange-400 block">sed '2,5 s/pattern/replacement/' file</code>
            <code className="text-orange-600 dark:text-orange-400 block"># Selective by pattern address</code>
            <code className="text-orange-600 dark:text-orange-400 block">sed '/ERROR/ s/pattern/replacement/' file</code>
            <code className="text-orange-600 dark:text-orange-400 block"># Selective by pattern range (from ERROR to next INFO)</code>
            <code className="text-orange-600 dark:text-orange-400 block">sed '/ERROR/,/INFO/ s/pattern/replacement/' file</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit 0 on success; prints transformed lines (or modifies file with -i).</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To surgically edit text files – from applying the same change everywhere to modifying only specific sections based on line numbers, content patterns, or structural ranges.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Understanding Global vs Selective Replacement</h2>
          <p className="mb-3"><strong>Global replacement (<code>/g</code> flag):</strong> Substitutes every occurrence of the pattern on each line. Without <code>/g</code>, only the first match per line is replaced. Think of it as "replace all" in a text editor.</p>
          <p className="mb-3"><strong>Selective replacement (addresses):</strong> You can prefix the <code>s</code> command with an address to restrict which lines are affected. Addresses can be:</p>
          <ul className="list-disc list-inside mb-3 space-y-1 ml-4">
            <li>A single line number: <code>sed '10 s/old/new/'</code></li>
            <li>A range of line numbers: <code>sed '10,20 s/old/new/'</code></li>
            <li>A pattern: <code>sed '/pattern/ s/old/new/'</code></li>
            <li>A range between two patterns: <code>sed '/start/,/end/ s/old/new/'</code></li>
            <li>Negated address: <code>sed '/pattern/! s/old/new/'</code> (lines NOT matching pattern)</li>
          </ul>
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border-l-4 border-orange-500">
            <p className="text-sm"><strong>Real-world scenario at Barrackpore College:</strong> A CSV file with student marks (Swadeep, Tuhina, etc.) contains old grade boundaries. To update only the 'F' grades (below 50) to 'Fail' but leave others untouched: <code className="bg-gray-200 dark:bg-gray-700 px-1">sed '/,[0-4][0-9],F/ s/F/Fail/' marks.csv</code>. Or in a web project at Shyamnagar, replace all 'localhost:3000' with 'api.example.com' but ONLY inside the <code>config.js</code> file after the line <code>// API CONFIG</code>: <code className="bg-gray-200 dark:bg-gray-700 px-1">sed '/\/\/ API CONFIG/,$ s/localhost:3000/api.example.com/g' config.js</code>.</p>
          </div>
        </div>

        {/* Shell Script Demos (using external .sh files) */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Demos: Global & Selective Replacement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={globalReplaceScript} title="🌍 Global Replacement (/g flag)" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={selectiveLineScript} title="📍 Selective by Line Number(s)" highlightLines={[14,18,22]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={selectivePatternScript} title="🔍 Selective by Pattern Address" highlightLines={[14,18,23]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={selectiveMultipleScript} title="🔧 Multiple Selective Replacements" highlightLines={[18,22]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={selectiveConditionalScript} title="⚙️ Advanced Conditional Replacement" highlightLines={[14,18,23]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Combine global with selective:</strong> <code>sed '5,10 s/old/new/g'</code> – all matches on lines 5–10.</li>
              <li><strong>Use <code>^</code> and <code>$</code> anchors with addresses:</strong> <code>sed '/^$/ s/.*/--EMPTY--/'</code> replaces empty lines.</li>
              <li><strong>Negation for safety:</strong> <code>sed '/^#/! s/old/new/'</code> never changes comment lines.</li>
              <li><strong>Test with <code>p</code> flag and <code>-n</code>:</strong> <code>sed -n '/pattern/ s/old/new/p'</code> shows only changed lines.</li>
              <li><strong>Use <code>&amp;</code> in replacement for selective wrapping:</strong> <code>sed '/error/ s/[0-9]\+/[&]/'</code> puts brackets around error codes.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls & Misconceptions</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Assuming global is default:</strong> Without <code>/g</code> only first match per line changes – #1 newbie mistake.</li>
              <li><strong>Pattern range surprises:</strong> <code>/start/,/end/</code> stops at first 'end'; if 'end' missing, goes to EOF.</li>
              <li><strong>Overlapping ranges:</strong> Nesting ranges can cause unexpected behavior; use braces <code>{}</code> to group.</li>
              <li><strong>Address with comma but no second address:</strong> <code>'2,'</code> means from line 2 to end, but <code>'2'</code> alone is line 2. Forgetting the second number gives 'from line 2 to end'.</li>
              <li><strong>Using <code>$</code> in an address range:</strong> <code>'5,$'</code> works, but <code>'$'</code> alone is last line.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Mini Checklist */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices & Beginner-Safe Habits</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always preview: <code>sed 'address s/old/new/' file | head -20</code> before <code>-i</code>.</p>
              <p>✔️ For ranges, use <code>p</code> flag to verify: <code>sed -n '/start/,/end/ s/old/new/p'</code>.</p>
              <p>✔️ When using <code>/pattern/,/pattern/</code> make sure second pattern actually appears later.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Store complex addresses in variables: <code>addr='/ERROR/,/WARNING/'</code>; <code>sed "$addr s/old/new/"</code>.</p>
              <p>✔️ For multiple selective edits, write a sed script file with <code>-f</code> for maintainability.</p>
              <p>✔️ Use <code>-i.bak</code> when experimenting with selective edits that could break a file.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I understand the difference between global (<code>/g</code>) and first-match-only.</li>
              <li>☐ I can replace all occurrences on every line.</li>
              <li>☐ I can replace on a specific line number (e.g., line 5).</li>
              <li>☐ I can replace on a range of lines (e.g., lines 10–20).</li>
              <li>☐ I can restrict replacement to lines matching a pattern.</li>
              <li>☐ I can restrict replacement to lines NOT matching a pattern (<code>!</code>).</li>
              <li>☐ I can replace within a pattern range (<code>/start/,/end/</code>).</li>
              <li>☐ I can combine global and selective (<code>'2,5 s/old/new/g'</code>).</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">Observe: <code>sed 's/foo/bar/' file</code> changes only the first 'foo' on each line. How would you change <strong>every</strong> 'foo'? Now, if you only want to change lines that contain the word 'baz', how do you modify the command? Try writing a sed command that replaces 'localhost' with '127.0.0.1' but only on lines 20 to 50 of a configuration file. What happens if the range <code>/START/,/END/</code> never finds 'END'? (Hint: sed continues to end of file.)</p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-orange-700 dark:text-orange-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for Global & Selective Replacement:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Naihati, I give students a log file with mixed-case errors and ask them to highlight only ERROR lines, then replace within those lines – that's where selective replacement shines."</li>
                  <li>Always demonstrate the power of <code>/start/,/end/</code> with HTML/XML snippets – it's like a mini‑parser.</li>
                  <li>Classroom exercise: Take a CSV of student scores (Swadeep, Tuhina, etc.) and use selective replacement to bump all A's to A+, but only for the first 10 rows.</li>
                  <li>Remember: sed addresses are like 'if' conditions for text processing – learn them, and you can edit any structured file.</li>
                </ul>
                <p className="mt-2 italic text-sm">"With great power comes great responsibility. <code>-i.bak</code> is your safety net. Use it." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section (imported from external file) */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ Global & Selective Replacement — 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 4: Global and Selective Replacement — Precision Editing with sed
        </div>
      </div>
    </div>
  );
};

export default Topic4;