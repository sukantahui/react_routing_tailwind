import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts (.sh files as raw text)
import delimiterAlternativesScript from './topic5_files/delimiter_alternatives.sh?raw';
import flagExtendedRegexScript from './topic5_files/flag_extended_regex.sh?raw';
import flagGlobalScript from './topic5_files/flag_global.sh?raw';
import flagPrintScript from './topic5_files/flag_print.sh?raw';
import flagWriteScript from './topic5_files/flag_write.sh?raw';
import flagCaseInsensitiveScript from './topic5_files/flag_case_insensitive.sh?raw';
import flagNumberOccurrenceScript from './topic5_files/flag_number_occurrence.sh?raw';
import multipleFlagsScript from './topic5_files/multiple_flags.sh?raw';
import questions from './topic5_files/topic5_questions.js';

// Reusable ShellFileLoader component
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
        <button onClick={handleCopy} className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
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

// Reusable FAQTemplate component
const FAQTemplate = ({ title, questions }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{title}</h3>
      <div className="space-y-4">
        {questions.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
            <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full text-left px-6 py-4 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex justify-between items-center">
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
                  <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto mt-2"><code>{faq.codeExample}</code></pre>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component: Topic 5
const Topic5 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration for delimiters and flags
  const DelimiterFlagsIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="300" viewBox="0 0 600 300" className="w-full max-w-md h-auto">
        <rect width="600" height="300" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        {/* Original delimiter (slash) */}
        <text x="30" y="50" fontSize="16" fill="#1e293b" className="dark:fill-gray-200">Traditional:</text>
        <rect x="120" y="35" width="220" height="28" rx="4" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="130" y="55" fontSize="14" fontFamily="monospace" fill="#dc2626">sed 's/usr/local/opt/'</text>
        <text x="350" y="55" fontSize="20" fill="#f59e0b">⚠️</text>
        <text x="380" y="55" fontSize="12" fill="#f59e0b">Leaning toothpick syndrome</text>

        {/* Alternative delimiter */}
        <text x="30" y="110" fontSize="16" fill="#1e293b" className="dark:fill-gray-200">Better:</text>
        <rect x="120" y="95" width="240" height="28" rx="4" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="130" y="115" fontSize="14" fontFamily="monospace" fill="#16a34a">sed 's|/usr/local|/opt|'</text>

        {/* Flags section */}
        <text x="30" y="180" fontSize="16" fill="#1e293b" className="dark:fill-gray-200">Flags:</text>
        <rect x="100" y="165" width="460" height="50" rx="6" fill="#cffafe" className="dark:fill-cyan-900/30" />
        <text x="115" y="185" fontSize="13" fontFamily="monospace" fill="#0891b2">g → global</text>
        <text x="220" y="185" fontSize="13" fontFamily="monospace" fill="#0891b2">i → case‑insensitive</text>
        <text x="360" y="185" fontSize="13" fontFamily="monospace" fill="#0891b2">p → print</text>
        <text x="115" y="205" fontSize="13" fontFamily="monospace" fill="#0891b2">2 → second occurrence</text>
        <text x="260" y="205" fontSize="13" fontFamily="monospace" fill="#0891b2">w file → write</text>
        <text x="380" y="205" fontSize="13" fontFamily="monospace" fill="#0891b2">e → execute (GNU)</text>

        {/* Animated highlight */}
        <rect x="100" y="165" width="460" height="50" rx="6" fill="none" stroke="#0891b2" strokeWidth="2">
          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .reveal-section {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section { animation: none; opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="reveal-section text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
            Using Delimiters & Flags in sed
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Break free from forward‑slash hell and master sed's substitution flags: global, case‑insensitive, print, write, occurrence numbers, and more.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <DelimiterFlagsIllustration />
        </div>

        {/* Prototype / Signature */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 sed Substitution with Delimiters & Flags</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-cyan-600 dark:text-cyan-400"># General form: s/pattern/replacement/flags</code>
            <code className="text-cyan-600 dark:text-cyan-400"># Using different delimiters (any character)</code>
            <code className="text-cyan-600 dark:text-cyan-400">sed 's|pattern|replacement|g'</code>
            <code className="text-cyan-600 dark:text-cyan-400">sed 's#pattern#replacement#i'</code>
            <code className="text-cyan-600 dark:text-cyan-400">sed 's@pattern@replacement@2'</code>
            <code className="text-cyan-600 dark:text-cyan-400"># Common flags: g, i, p, w, NUMBER, e, I, M</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Purpose:</span> To make sed substitution more flexible – choose any delimiter to avoid escaping, and control exactly which occurrences are replaced with flags.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Delimiters & Flags Explained</h2>
          <p className="mb-3"><strong>Delimiters:</strong> After the <code>s</code> command, you can use any character as the delimiter – not just forward slash. This is especially useful when your pattern or replacement contains slashes (e.g., file paths, URLs). Example: <code>sed 's|/home/user|/home/guest|'</code> avoids the "leaning toothpick syndrome".</p>
          <p className="mb-3"><strong>Flags (modifiers):</strong> Placed after the last delimiter, they change the substitution behavior:</p>
          <ul className="list-disc list-inside mb-3 space-y-1 ml-4">
            <li><code>g</code> – Global: replace all occurrences on each line (not just the first).</li>
            <li><code>i</code> or <code>I</code> – Case‑insensitive matching.</li>
            <li><code>p</code> – Print the line if a substitution was made (usually with <code>-n</code>).</li>
            <li><code>w filename</code> – Append the line to a file if a substitution was made.</li>
            <li><code>NUMBER</code> (e.g., <code>2</code>, <code>3</code>) – Replace only the Nth occurrence on each line.</li>
            <li><code>e</code> (GNU sed) – Execute the replacement as a shell command and replace with its output.</li>
            <li><code>M</code> – Multiline mode (affects ^ and $).</li>
          </ul>
          <div className="mt-4 p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg border-l-4 border-cyan-500">
            <p className="text-sm"><strong>Real‑world scenario:</strong> At Shyamnagar IT Park, a developer needs to replace all pipe‑separated values with commas in a legacy report. Using <code>|</code> as delimiter clashes with the pipe character. Solution: <code>sed 's#|#,#g' report.txt</code>. Or at Barrackpore College, to change the second colon in each line of a time log: <code>sed 's/:/ /2' timelog.txt</code>.</p>
          </div>
        </div>

        {/* Script Demos – using external .sh files */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Demos: Delimiters & Flags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={delimiterAlternativesScript} title="🔀 Alternative Delimiters (|, #, @, etc.)" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={flagGlobalScript} title="🌍 Global flag /g" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={flagCaseInsensitiveScript} title="🔡 Case‑insensitive flag /i" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={flagNumberOccurrenceScript} title="🔢 Nth occurrence (e.g., /2, /3)" highlightLines={[12,17]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={flagPrintScript} title="🖨️ Print flag /p (with -n)" highlightLines={[12,15]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={flagWriteScript} title="💾 Write flag /w" highlightLines={[12,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={flagExtendedRegexScript} title="🧩 Extended regex flag -E (in command line)" highlightLines={[10,14]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={multipleFlagsScript} title="🎯 Combining multiple flags (gi, g2, etc.)" highlightLines={[12,17,22]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Pick a delimiter that does not appear in pattern/replacement:</strong> <code>|</code>, <code>#</code>, <code>@</code>, <code>%</code>, <code>^</code> are common.</li>
              <li><strong>Combine flags:</strong> <code>sed 's/old/new/gi'</code> – global + case‑insensitive.</li>
              <li><strong>Use <code>/p</code> to debug:</strong> <code>sed -n 's/pattern/&/p' file</code> shows which lines would change.</li>
              <li><strong>Write flag for logging:</strong> <code>sed 's/ERROR/WARNING/w errors.log' app.log</code> saves every changed line.</li>
              <li><strong>Escape the delimiter inside pattern:</strong> If you use <code>|</code> as delimiter, escape it as <code>\|</code> in pattern.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Forgetting that delimiter is arbitrary:</strong> Many beginners struggle with slashes in paths – simply use another delimiter.</li>
              <li><strong>Using <code>/g</code> unnecessarily:</strong> If only one occurrence exists, <code>/g</code> is harmless but can be slower on huge files.</li>
              <li><strong>Flag ordering:</strong> Flags can be in any order, but number must come before <code>g</code> if both: <code>s/old/new/2g</code> (all after 2nd).</li>
              <li><strong>Confusing <code>w</code> flag with <code>-i</code>:</strong> <code>w</code> writes changed lines to a separate file, does not modify original.</li>
              <li><strong>Assuming <code>/e</code> works on all platforms:</strong> GNU sed only – not on macOS default.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always test complex flags with <code>-n</code> and <code>p</code> first.</p>
              <p>✔️ Use non‑alphabetic delimiters for readability when dealing with paths or regex.</p>
              <p>✔️ Prefer <code>sed -E</code> (extended regex) with flags for cleaner patterns.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Store frequently used flag combinations in shell aliases.</p>
              <p>✔️ In scripts, comment what each flag does: <code># g = global, i = ignore case</code>.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can use delimiters other than <code>/</code> (e.g., <code>|</code>, <code>#</code>).</li>
              <li>☐ I understand the global flag <code>g</code> and when to use it.</li>
              <li>☐ I can perform case‑insensitive substitution with <code>i</code>.</li>
              <li>☐ I can replace only the Nth occurrence with a number flag.</li>
              <li>☐ I can print only changed lines using <code>-n</code> and <code>p</code>.</li>
              <li>☐ I can write changed lines to a file with <code>w</code>.</li>
              <li>☐ I can combine multiple flags (e.g., <code>gi</code>, <code>2g</code>).</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">Observe: In <code>sed 's/old/new/g'</code> the delimiter is <code>/</code>. If your pattern is <code>/usr/local</code>, you'd have to write <code>\/usr\/local</code>. How could a different delimiter solve this? Try writing a sed command that replaces the third comma on each line with a semicolon (flag <code>3</code>). What happens if you use both <code>2</code> and <code>g</code> together? (Hint: <code>2g</code> replaces from the second occurrence onward.)</p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-cyan-700 dark:text-cyan-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for Delimiters & Flags:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Naihati, I show students a file containing many paths like <code>/etc/nginx/sites-available/default</code> – they groan at escaping slashes. Then I reveal <code>sed 's|/etc|/opt|'</code> and their eyes light up."</li>
                  <li>Flags turn sed from a simple tool into a Swiss army knife. Practice by building a command that extracts only email addresses from a mixed log (hint: <code>/p</code> flag with pattern).</li>
                  <li>Emphasise that <code>w</code> flag is great for logging – e.g., record every line where a substitution happened for auditing.</li>
                </ul>
                <p className="mt-2 italic text-sm">"The right delimiter can save you from backslash hell. And the right flag can turn a ten‑line script into a one‑liner." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ Delimiters & Flags in sed — 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 5: Using Delimiters and Flags in sed — Total Control Over Substitutions
        </div>
      </div>
    </div>
  );
};

export default Topic5;