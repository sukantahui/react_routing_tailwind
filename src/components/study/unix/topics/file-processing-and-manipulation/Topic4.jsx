import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import wcBasicScript from './topic4_files/wc_basic.sh?raw';
import wcLinesOnlyScript from './topic4_files/wc_lines_only.sh?raw';
import wcWordsCharsScript from './topic4_files/wc_words_chars.sh?raw';
import wcBytesScript from './topic4_files/wc_bytes.sh?raw';
import wcMaxLineLengthScript from './topic4_files/wc_max_line_length.sh?raw';
import wcPipelineScript from './topic4_files/wc_pipeline.sh?raw';
import wcPracticalScript from './topic4_files/wc_practical.sh?raw';
import questions from './topic4_files/topic4_questions.js';

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

// Main component: Topic 4
const Topic4 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: wc counting
  const WcIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="260" viewBox="0 0 600 260" className="w-full max-w-md h-auto">
        <rect width="600" height="260" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Sample file content */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">data.txt:</text>
        <rect x="30" y="55" width="300" height="100" rx="6" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="40" y="75" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Hello world</text>
        <text x="40" y="95" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">The quick brown fox</text>
        <text x="40" y="115" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Unix is powerful</text>

        {/* wc command */}
        <rect x="370" y="55" width="180" height="40" rx="6" fill="#fef9c3" className="dark:fill-yellow-900/40" />
        <text x="460" y="80" fontSize="14" fontFamily="monospace" fill="#854d0e" textAnchor="middle">wc data.txt</text>

        {/* Output */}
        <text x="370" y="130" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">Output:</text>
        <rect x="370" y="145" width="180" height="70" rx="6" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="380" y="165" fontSize="12" fontFamily="monospace" fill="#16a34a">3       9      44</text>
        <text x="380" y="185" fontSize="11" fill="#16a34a">lines  words  chars</text>
        <text x="380" y="205" fontSize="10" fill="#6b7280">(spaces count as characters)</text>

        {/* Animated counter */}
        <circle cx="460" cy="200" r="3" fill="#16a34a">
          <animate attributeName="r" values="2;6;2" dur="1.5s" repeatCount="indefinite" />
        </circle>
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
            Counting Lines, Words, and Characters using wc
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `wc` – the essential tool for measuring file sizes, validating data integrity, and monitoring log growth.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <WcIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 wc Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-green-600 dark:text-green-400">wc [OPTION]... [FILE]...</code>
            <code className="text-green-600 dark:text-green-400"># Default: lines, words, characters (in that order)</code>
            <code className="text-green-600 dark:text-green-400">wc file.txt</code>
            <code className="text-green-600 dark:text-green-400"># Count only lines</code>
            <code className="text-green-600 dark:text-green-400">wc -l file.txt</code>
            <code className="text-green-600 dark:text-green-400"># Count only words</code>
            <code className="text-green-600 dark:text-green-400">wc -w file.txt</code>
            <code className="text-green-600 dark:text-green-400"># Count characters (or bytes with -c)</code>
            <code className="text-green-600 dark:text-green-400">wc -m file.txt   # characters</code>
            <code className="text-green-600 dark:text-green-400">wc -c file.txt   # bytes</code>
            <code className="text-green-600 dark:text-green-400"># Longest line length</code>
            <code className="text-green-600 dark:text-green-400">wc -L file.txt</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Prints counts (one or more numbers) to stdout; exit 0 unless file error.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To count lines, words, characters, bytes, or maximum line length in files. Used for data validation, progress monitoring, log rotation triggers, and pipeline statistics.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 What wc Counts</h2>
          <p className="mb-3"><strong>Lines (`-l`):</strong> Counts newline characters. Each line ends with a newline; the last line may also have a newline (most tools add one).</p>
          <p className="mb-3"><strong>Words (`-w`):</strong> A word is a sequence of non‑whitespace characters separated by spaces, tabs, or newlines. Punctuation attached to words counts as part of the word.</p>
          <p className="mb-3"><strong>Characters (`-m`):</strong> Counts multibyte characters correctly (UTF‑8). `-c` counts raw bytes (may differ for non‑ASCII).</p>
          <p className="mb-3"><strong>Max line length (`-L`):</strong> Prints the length (in characters) of the longest line. Useful for checking column widths in fixed‑width files.</p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border-l-4 border-green-500">
            <p className="text-sm"><strong>Real‑world at Barrackpore College:</strong> A teacher needs to know how many students scored above 80. She uses `grep -c ',[8-9][0-9]' marks.csv`. But when she wants total lines in the file: `wc -l marks.csv`. For a log file, she monitors growth with `watch -n 5 'wc -l /var/log/nginx/access.log'`.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: wc in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={wcBasicScript} title="📊 Default wc (lines, words, chars)" highlightLines={[8,12]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={wcLinesOnlyScript} title="📏 Count Lines Only (-l)" highlightLines={[8,12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={wcWordsCharsScript} title="📝 Words (-w) and Characters (-m)" highlightLines={[10,14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={wcBytesScript} title="💾 Bytes (-c) vs Characters (-m)" highlightLines={[10,14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={wcMaxLineLengthScript} title="📏 Longest Line (-L)" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={wcPipelineScript} title="🔗 Pipelines: grep | wc -l" highlightLines={[12,16,20]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={wcPracticalScript} title="🧪 Practical: Monitoring, Validation, Statistics" highlightLines={[14,22,30,38]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Count files matching a pattern:</strong> `ls *.log | wc -l`</li>
              <li><strong>Count lines containing pattern:</strong> `grep -c 'ERROR' log.txt` (faster than `grep | wc -l`).</li>
              <li><strong>Watch log growth:</strong> `watch -n 30 'wc -l /var/log/syslog'`</li>
              <li><strong>Get total characters in all files:</strong> `cat *.txt | wc -c`</li>
              <li><strong>Find longest line in a file:</strong> `wc -L file` (useful for fixed‑width parsing).</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Confusing `-c` (bytes) with `-m` (chars)</strong> – for UTF‑8, they differ.</li>
              <li><strong>Using `wc -l` on a file without trailing newline:</strong> counts one fewer line than expected.</li>
              <li><strong>Piping `grep pattern | wc -l` instead of using `grep -c`</strong> – slower and uses extra process.</li>
              <li><strong>Assuming `wc -w` counts only alphabetic words</strong> – numbers and punctuation are included.</li>
              <li><strong>Forgetting that `wc` outputs filename when multiple files are given.</strong></li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Use `wc -l` for line counts, `wc -c` for file sizes in scripts.</p>
              <p>✔️ Prefer `grep -c` over `grep | wc -l` for performance.</p>
              <p>✔️ Use `--files0-from` for large lists of files.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ For UTF‑8 text, use `-m` (characters) not `-c` (bytes).</p>
              <p>✔️ Combine with `find` for recursive counts: `find . -name "*.py" -exec wc -l {} +`.</p>
              <p>✔️ Use `wc -L` to validate maximum line length before fixed‑width parsing.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can count lines with `wc -l`.</li>
              <li>☐ I can count words with `wc -w`.</li>
              <li>☐ I can count characters with `wc -m` and bytes with `wc -c`.</li>
              <li>☐ I know the difference between `-c` and `-m`.</li>
              <li>☐ I can find the longest line with `wc -L`.</li>
              <li>☐ I can pipe commands into `wc` (e.g., `ls | wc -l`).</li>
              <li>☐ I can count lines matching a pattern with `grep -c`.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a file with 1000 lines. Some lines are very long (up to 5000 characters). You need to split it into chunks where each chunk has roughly the same total character count (not line count). How would you approximate the chunk sizes using wc -L? Can you think of a way to split by character count without breaking lines (hint: split -C)?`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-green-700 dark:text-green-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for wc Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Shyamnagar, I gave students a folder of 50 lab reports and asked them to count total lines. They used `wc -l *.txt | tail -1` – perfect! Then I asked for only the Python files: `find . -name '*.py' | xargs wc -l`."</li>
                  <li>Demonstrate that `wc` on multiple files prints a total line at the end – useful for project statistics.</li>
                  <li>Classroom exercise: Count words in a paragraph, then compare with `wc -w`; discuss what counts as a word (hyphenated? apostrophes?).</li>
                  <li>Introduce `grep -c` as a faster alternative to `grep | wc -l` for performance‑conscious scripts.</li>
                </ul>
                <p className="mt-2 italic text-sm">"wc is the simplest tool in your toolbox, yet it's indispensable for everyday tasks." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ wc Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 4: Counting Lines, Words, and Characters – Measure Your Text Data
        </div>
      </div>
    </div>
  );
};

export default Topic4;