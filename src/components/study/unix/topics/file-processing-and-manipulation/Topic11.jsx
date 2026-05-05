import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import uniqBasicScript from './topic11_files/uniq_basic.sh?raw';
import uniqCountScript from './topic11_files/uniq_count.sh?raw';
import uniqRepeatedScript from './topic11_files/uniq_repeated.sh?raw';
import uniqUniqueScript from './topic11_files/uniq_unique.sh?raw';
import uniqIgnoreCaseScript from './topic11_files/uniq_ignore_case.sh?raw';
import uniqSkipFieldsScript from './topic11_files/uniq_skip_fields.sh?raw';
import uniqSkipCharsScript from './topic11_files/uniq_skip_chars.sh?raw';
import uniqCompareFilesScript from './topic11_files/uniq_compare_files.sh?raw';
import uniqPracticalScript from './topic11_files/uniq_practical.sh?raw';
import questions from './topic11_files/topic11_questions.js';

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

// Main component: Topic 11
const Topic11 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: uniq concept
  const UniqIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="260" viewBox="0 0 600 260" className="w-full max-w-md h-auto">
        <rect width="600" height="260" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        {/* Sorted file with duplicates */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">Sorted input (with duplicates):</text>
        <rect x="30" y="55" width="180" height="120" rx="6" fill="#fee2e2" className="dark:fill-red-900/30" />
        <text x="45" y="75" fontSize="12" fontFamily="monospace" fill="#dc2626">apple</text>
        <text x="45" y="95" fontSize="12" fontFamily="monospace" fill="#dc2626">apple</text>
        <text x="45" y="115" fontSize="12" fontFamily="monospace" fill="#dc2626">banana</text>
        <text x="45" y="135" fontSize="12" fontFamily="monospace" fill="#dc2626">banana</text>
        <text x="45" y="155" fontSize="12" fontFamily="monospace" fill="#dc2626">cherry</text>

        {/* Arrow */}
        <line x1="220" y1="115" x2="260" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowUniq)" />

        {/* uniq output (unique lines) */}
        <text x="280" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">uniq (no options):</text>
        <rect x="280" y="55" width="180" height="90" rx="6" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="295" y="75" fontSize="12" fontFamily="monospace" fill="#16a34a">apple</text>
        <text x="295" y="95" fontSize="12" fontFamily="monospace" fill="#16a34a">banana</text>
        <text x="295" y="115" fontSize="12" fontFamily="monospace" fill="#16a34a">cherry</text>

        {/* uniq -c (counts) */}
        <text x="280" y="170" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">uniq -c:</text>
        <rect x="280" y="185" width="180" height="60" rx="6" fill="#fef9c3" className="dark:fill-yellow-900/40" />
        <text x="295" y="205" fontSize="11" fontFamily="monospace" fill="#854d0e">2 apple</text>
        <text x="295" y="225" fontSize="11" fontFamily="monospace" fill="#854d0e">2 banana</text>
        <text x="295" y="245" fontSize="11" fontFamily="monospace" fill="#854d0e">1 cherry</text>

        <defs>
          <marker id="arrowUniq" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400">
            Removing Duplicates Using uniq Command
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `uniq` – report or omit repeated lines, count duplicates, and customise comparison with field/character skipping.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <UniqIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 uniq Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-yellow-600 dark:text-yellow-400">uniq [OPTION]... [INPUT [OUTPUT]]</code>
            <code className="text-yellow-600 dark:text-yellow-400"># Remove adjacent duplicates (output only unique lines)</code>
            <code className="text-yellow-600 dark:text-yellow-400">uniq file.txt</code>
            <code className="text-yellow-600 dark:text-yellow-400"># Count occurrences</code>
            <code className="text-yellow-600 dark:text-yellow-400">uniq -c file.txt</code>
            <code className="text-yellow-600 dark:text-yellow-400"># Show only duplicate lines</code>
            <code className="text-yellow-600 dark:text-yellow-400">uniq -d file.txt</code>
            <code className="text-yellow-600 dark:text-yellow-400"># Show only non‑duplicate (unique) lines</code>
            <code className="text-yellow-600 dark:text-yellow-400">uniq -u file.txt</code>
            <code className="text-yellow-600 dark:text-yellow-400"># Skip first N fields (space/tab separated)</code>
            <code className="text-yellow-600 dark:text-yellow-400">uniq -f N file.txt</code>
            <code className="text-yellow-600 dark:text-yellow-400"># Skip first N characters</code>
            <code className="text-yellow-600 dark:text-yellow-400">uniq -s N file.txt</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit 0 unless error; writes results to stdout (or output file).</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To filter repeated lines in sorted text – essential for data deduplication, counting frequency, and identifying unique records.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How uniq Works</h2>
          <p className="mb-3"><strong>Adjacent duplicates only:</strong> Uniq compares only consecutive lines. Therefore input must be sorted (or have duplicates grouped together). The typical pipeline is `sort file | uniq`.</p>
          <p className="mb-3"><strong>Count duplicates (`-c`):</strong> Prefixes each output line with the number of occurrences.</p>
          <p className="mb-3"><strong>Selective output:</strong> `-d` prints only lines that are repeated (duplicates), `-u` prints only lines that are unique (appear once).</p>
          <p className="mb-3"><strong>Skipping fields/characters:</strong> Use `-f N` to ignore first N whitespace‑separated fields, and `-s N` to ignore first N characters when comparing lines.</p>
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border-l-4 border-yellow-500">
            <p className="text-sm"><strong>Real‑world at Naihati High School:</strong> A teacher has a list of student names with possible duplicates. He sorts and uses `uniq` to get the unique class roster. Later, `uniq -c` helps count how many times each student name appears across multiple attendance sheets.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: uniq in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqBasicScript} title="📄 Basic uniq (remove duplicates)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqCountScript} title="🔢 Count duplicates (-c)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqRepeatedScript} title="🔁 Show only duplicates (-d)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqUniqueScript} title="🆕 Show only unique lines (-u)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqIgnoreCaseScript} title="🔡 Case‑insensitive uniq (pre‑process)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqSkipFieldsScript} title="📋 Skip fields (-f)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqSkipCharsScript} title="🔤 Skip characters (-s)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqCompareFilesScript} title="📑 Compare two files with uniq" highlightLines={[14,18]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={uniqPracticalScript} title="🧪 Practical: Log analysis, frequency counting, data cleaning" highlightLines={[14,22,30]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Count frequency:</strong> `sort | uniq -c | sort -nr` (sort by count descending).</li>
              <li><strong>Find unique lines across two files:</strong> `cat file1 file2 | sort | uniq -u`.</li>
              <li><strong>Case‑insensitive uniq:</strong> `tr '[:upper:]' '[:lower:]' | sort | uniq`.</li>
              <li><strong>Save output directly:</strong> `uniq input.txt output.txt` (no redirection needed).</li>
              <li><strong>Combine with `grep -v`:</strong> `uniq -d` to find duplicates, then process them.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Forgetting to sort before uniq:</strong> Uniq only removes adjacent duplicates, unsorted input may still have duplicates elsewhere.</li>
              <li><strong>Whitespace differences:</strong> Leading/trailing spaces cause lines to be considered different; use `sed` to normalise.</li>
              <li><strong>Case sensitivity:</strong> `uniq` is case‑sensitive; pre‑process if needed.</li>
              <li><strong>Assuming `-d` shows duplicates once:</strong> It shows each duplicate line once (the first occurrence of the duplicate block).</li>
              <li><strong>Confusing `-u` with `-d`:</strong> `-u` shows lines that appear only once; `-d` shows lines that appear more than once.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always combine `sort | uniq` unless data is already grouped.</p>
              <p>✔️ Use `sort -u` as a shortcut for `sort | uniq` (but `uniq -c` requires pipe).</p>
              <p>✔️ For large files, `sort -u` may be more memory‑efficient than piping.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Use `-f` to skip timestamp fields when duplicates differ only by time.</p>
              <p>✔️ Use `-s` to skip line numbers or fixed prefixes.</p>
              <p>✔️ To preserve original order of first occurrence, use `awk '!seen[$0]++'` instead of `sort | uniq`.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I know uniq only works on adjacent duplicates (needs sorted input).</li>
              <li>☐ I can remove duplicates with `sort | uniq`.</li>
              <li>☐ I can count occurrences with `uniq -c`.</li>
              <li>☐ I can show only duplicates with `uniq -d`.</li>
              <li>☐ I can show only unique lines with `uniq -u`.</li>
              <li>☐ I can skip fields (`-f`) and characters (`-s`).</li>
              <li>☐ I can make uniq case‑insensitive by pre‑processing with `tr`.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a log file with lines: "ERROR: timeout", "ERROR: disk full", "ERROR: timeout". After sorting, how would you count how many times each error message occurs? Use uniq -c. What if you only want to count errors regardless of the message? Use cut -d' ' -f1 to extract the first word, then sort and uniq -c. Now suppose the log has varying IP addresses; how would you find unique IPs?`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-yellow-700 dark:text-yellow-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for uniq Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Barrackpore, students often run `uniq` without sorting and wonder why duplicates remain. I always say: `sort` then `uniq` is like washing then drying – order matters."</li>
                  <li>Demonstrate that `sort -u` is a shortcut, but `uniq -c` is irreplaceable for frequency analysis.</li>
                  <li>Classroom exercise: give a file of student names with duplicates, ask them to find the total number of unique students and the frequency of each name.</li>
                  <li>Show real‑world use: counting unique IP addresses in a web log: `cut -d' ' -f1 access.log | sort | uniq -c | sort -nr`.</li>
                </ul>
                <p className="mt-2 italic text-sm">"`uniq` is the final step to clean data – it turns chaos into clarity." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ uniq Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 11: Removing Duplicates Using uniq – Cleanse Your Data
        </div>
      </div>
    </div>
  );
};

export default Topic11;