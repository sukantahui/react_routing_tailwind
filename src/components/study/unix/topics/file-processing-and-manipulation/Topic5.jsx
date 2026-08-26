import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import sortBasicScript from './topic5_files/sort_basic.sh?raw';
import sortReverseScript from './topic5_files/sort_reverse.sh?raw';
import sortNumericScript from './topic5_files/sort_numeric.sh?raw';
import sortCaseInsensitiveScript from './topic5_files/sort_case_insensitive.sh?raw';
import sortRandomScript from './topic5_files/sort_random.sh?raw';
import sortHumanNumericScript from './topic5_files/sort_human_numeric.sh?raw';
import sortStableScript from './topic5_files/sort_stable.sh?raw';
import questions from './topic5_files/topic5_questions.js';

// Reusable ShellFileLoader
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

// Reusable FAQTemplate
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

  // SVG Illustration: sorting concepts
  const SortIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="280" viewBox="0 0 600 280" className="w-full max-w-md h-auto">
        <rect width="600" height="280" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Unsorted list */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">Unsorted:</text>
        <rect x="30" y="55" width="150" height="120" rx="6" fill="#fee2e2" className="dark:fill-red-900/30" />
        <text x="45" y="75" fontSize="12" fontFamily="monospace" fill="#dc2626">banana</text>
        <text x="45" y="95" fontSize="12" fontFamily="monospace" fill="#dc2626">Apple</text>
        <text x="45" y="115" fontSize="12" fontFamily="monospace" fill="#dc2626">grape</text>
        <text x="45" y="135" fontSize="12" fontFamily="monospace" fill="#dc2626">cherry</text>
        <text x="45" y="155" fontSize="12" fontFamily="monospace" fill="#dc2626">Date</text>

        {/* Arrow */}
        <line x1="195" y1="115" x2="235" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowSort)" />

        {/* Sorted list (alphabetical) */}
        <text x="250" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">sort (default):</text>
        <rect x="250" y="55" width="150" height="120" rx="6" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="265" y="75" fontSize="12" fontFamily="monospace" fill="#16a34a">Apple</text>
        <text x="265" y="95" fontSize="12" fontFamily="monospace" fill="#16a34a">Date</text>
        <text x="265" y="115" fontSize="12" fontFamily="monospace" fill="#16a34a">banana</text>
        <text x="265" y="135" fontSize="12" fontFamily="monospace" fill="#16a34a">cherry</text>
        <text x="265" y="155" fontSize="12" fontFamily="monospace" fill="#16a34a">grape</text>

        {/* Option boxes */}
        <rect x="430" y="55" width="140" height="28" rx="4" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="440" y="75" fontSize="12" fill="#4f46e5">sort -r (reverse)</text>
        <rect x="430" y="90" width="140" height="28" rx="4" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="440" y="110" fontSize="12" fill="#4f46e5">sort -n (numeric)</text>
        <rect x="430" y="125" width="140" height="28" rx="4" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="440" y="145" fontSize="12" fill="#4f46e5">sort -f (case‑insensitive)</text>
        <rect x="430" y="160" width="140" height="28" rx="4" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="440" y="180" fontSize="12" fill="#4f46e5">sort -R (random)</text>

        <defs>
          <marker id="arrowSort" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400">
            Sorting File Content (Alphabetical & Numerical Sorting)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `sort` – organise any text data alphabetically, numerically, or randomly, and prepare data for analysis.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <SortIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 sort Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-orange-600 dark:text-orange-400">sort [OPTION]... [FILE]...</code>
            <code className="text-orange-600 dark:text-orange-400"># Alphabetical sort (default)</code>
            <code className="text-orange-600 dark:text-orange-400">sort file.txt</code>
            <code className="text-orange-600 dark:text-orange-400"># Reverse order</code>
            <code className="text-orange-600 dark:text-orange-400">sort -r file.txt</code>
            <code className="text-orange-600 dark:text-orange-400"># Numeric sort (treat numbers as values, not strings)</code>
            <code className="text-orange-600 dark:text-orange-400">sort -n numbers.txt</code>
            <code className="text-orange-600 dark:text-orange-400"># Case‑insensitive sort</code>
            <code className="text-orange-600 dark:text-orange-400">sort -f words.txt</code>
            <code className="text-orange-600 dark:text-orange-400"># Random sort (shuffle)</code>
            <code className="text-orange-600 dark:text-orange-400">sort -R file.txt</code>
            <code className="text-orange-600 dark:text-orange-400"># Stable sort (preserve original order for ties)</code>
            <code className="text-orange-600 dark:text-orange-400">sort -s file.txt</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Prints sorted concatenation of files; exit 0 unless error.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To reorder lines in files according to configurable rules – essential for data preparation, generating reports, and feeding into `uniq`.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How sort Works</h2>
          <p className="mb-3"><strong>Alphabetical (default):</strong> Sorts based on the locale's collating order. Uppercase letters typically come before lowercase (ASCII order). Use `-f` for case‑insensitive.</p>
          <p className="mb-3"><strong>Numeric (`-n`):</strong> Sorts numerically, treating numbers as values, not strings. Example: `10` comes after `2` when numeric, but `10` would come before `2` if lexicographic (because '1' &lt '2').</p>
          <p className="mb-3"><strong>Reverse (`-r`):</strong> Reverses the comparison order; high to low or Z to A.</p>
          <p className="mb-3"><strong>Random (`-R`):</strong> Shuffles lines (uses hash of lines, not truly random but sufficient).</p>
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border-l-4 border-orange-500">
            <p className="text-sm"><strong>Real‑world at Ichapur High School:</strong> A teacher has a list of student marks: `45, 78, 92, 67`. To find the top 3, she uses `sort -n marks.txt | tail -3`. For alphabetical class roster: `sort students.txt`. Combine with `uniq` to list unique cities after sorting.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: sort in Action</h2>
          <div className="grid-cols-1 md:grid-cols-1 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortBasicScript} title="🔤 Alphabetical Sort (default)" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortReverseScript} title="🔄 Reverse Order (-r)" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortNumericScript} title="🔢 Numeric Sort (-n vs default)" highlightLines={[10,14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortCaseInsensitiveScript} title="🔡 Case‑Insensitive (-f)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortRandomScript} title="🎲 Random Sort (-R)" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortHumanNumericScript} title="📊 Human‑Numeric (-h)" highlightLines={[12,16]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortStableScript} title="⚖️ Stable Sort (-s) & Unique (-u)" highlightLines={[12,16,20,24]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Remove duplicates:</strong> `sort file.txt | uniq` (sort required for uniq).</li>
              <li><strong>Sort by column:</strong> `sort -k2,2 data.txt` (next topic).</li>
              <li><strong>Human‑readable sizes:</strong> `sort -h` handles `1K`, `2M`, `3G` correctly.</li>
              <li><strong>Dictionary order (ignore punctuation):</strong> `sort -d`.</li>
              <li><strong>Merge already sorted files:</strong> `sort -m sorted1 sorted2` (fast).</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Forgetting `-n` for numbers:</strong> `10` comes before `2` when lexicographic sorting.</li>
              <li><strong>Locale affecting uppercase/lowercase order:</strong> Some locales may sort `a` after `A`; use `LC_ALL=C` for ASCII order.</li>
              <li><strong>Assume sort is stable:</strong> By default, stable only with `-s`. Ties may be reordered.</li>
              <li><strong>Using `-R` for cryptographic randomness:</strong> It's not; for real random, use `shuf`. But `-R` is fine for shuffling.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always use `-n` for numeric data to avoid incorrect ordering.</p>
              <p>✔️ For portable ASCII sorting, set `LC_ALL=C` before calling sort.</p>
              <p>✔️ Use `-u` instead of piping to `uniq` when you only need unique sorted output.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ For large files, `sort` automatically uses temporary disk space if needed.</p>
              <p>✔️ Specify `-T` directory for temporary files (`--temporary-directory`).</p>
              <p>✔️ Use `-k` for column sorting (next topic) for structured data.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can sort a file alphabetically with `sort file`.</li>
              <li>☐ I can sort in reverse with `sort -r`.</li>
              <li>☐ I can sort numerically with `sort -n`.</li>
              <li>☐ I can sort case‑insensitively with `sort -f`.</li>
              <li>☐ I can shuffle lines with `sort -R`.</li>
              <li>☐ I can remove duplicates with `sort -u`.</li>
              <li>☐ I understand the difference between lexicographic and numeric sorting.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a file with lines: "10", "2", "20", "100". If you run sort, the order is "10", "100", "2", "20". Why? How would you get "2", "10", "20", "100"? Now suppose the numbers have leading spaces: " 10", " 2", " 20", "100". How does sort behave? Try sort -n and sort -n -k1?`}
          </p>
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
                <p><strong>🎓 Teacher's Advice for sort Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Naihati, I gave students a list of exam scores (100, 89, 120, 45). They used `sort` and got `100,120,45,89` – perplexed until I taught `sort -n`. That moment of real‑world discovery sticks."</li>
                  <li>Demonstrate that `sort -u` is equivalent to `sort | uniq` but faster (single pass).</li>
                  <li>Classroom exercise: Take a list of fruits with mixed case, ask students to sort case‑insensitively and then reversely.</li>
                  <li>Explain the environment variable `LC_ALL`: `LC_ALL=C sort file` ensures ASCII order across all systems.</li>
                </ul>
                <p className="mt-2 italic text-sm">"Sorting is the backbone of data processing. Master it, and you'll organise any data set effortlessly." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ sort Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 5: Sorting File Content – Organise Your World
        </div>
      </div>
    </div>
  );
};

export default Topic5;