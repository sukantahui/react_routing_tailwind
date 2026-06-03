import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import sortBasicColumnScript from './topic6_files/sort_basic_column.sh?raw';
import sortNumericColumnScript from './topic6_files/sort_numeric_column.sh?raw';
import sortMultipleKeysScript from './topic6_files/sort_multiple_keys.sh?raw';
import sortCustomDelimiterScript from './topic6_files/sort_custom_delimiter.sh?raw';
import sortIgnoreBlanksScript from './topic6_files/sort_ignore_blanks.sh?raw';
import sortMonthColumnScript from './topic6_files/sort_month_column.sh?raw';
import sortComplexDemoScript from './topic6_files/sort_complex_demo.sh?raw';
import questions from './topic6_files/topic6_questions.js';

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

// Main component: Topic 6
const Topic6 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: column sorting
  const ColumnSortIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="300" viewBox="0 0 600 300" className="w-full max-w-md h-auto">
        <rect width="600" height="300" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Table header */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">Student Data:</text>
        <rect x="30" y="55" width="350" height="25" rx="3" fill="#cbd5e1" className="dark:fill-gray-600" />
        <text x="40" y="73" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-200">Name      Age  Score</text>
        
        {/* Rows - unordered */}
        <rect x="30" y="85" width="350" height="20" fill="white" className="dark:fill-gray-800" />
        <text x="40" y="100" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Tuhina    21   92</text>
        <rect x="30" y="110" width="350" height="20" fill="#f8fafc" className="dark:fill-gray-750" />
        <text x="40" y="125" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Swadeep   20   85</text>
        <rect x="30" y="135" width="350" height="20" fill="white" className="dark:fill-gray-800" />
        <text x="40" y="150" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Abhronila 19   78</text>
        <rect x="30" y="160" width="350" height="20" fill="#f8fafc" className="dark:fill-gray-750" />
        <text x="40" y="175" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Debangshu 22   88</text>

        {/* Arrow */}
        <line x1="400" y1="140" x2="440" y2="140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowCol)" />

        {/* Sorted by Score (column 3) */}
        <text x="460" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">sort -k3 -n</text>
        <rect x="460" y="55" width="130" height="130" rx="6" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="470" y="75" fontSize="11" fontFamily="monospace" fill="#16a34a">Abhronila 19 78</text>
        <text x="470" y="95" fontSize="11" fontFamily="monospace" fill="#16a34a">Swadeep 20 85</text>
        <text x="470" y="115" fontSize="11" fontFamily="monospace" fill="#16a34a">Debangshu 22 88</text>
        <text x="470" y="135" fontSize="11" fontFamily="monospace" fill="#16a34a">Tuhina 21 92</text>
        <text x="470" y="155" fontSize="10" fill="#6b7280">(ascending by Score)</text>

        <defs>
          <marker id="arrowCol" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">
            Sorting Based on Specific Columns
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `sort -k` and `-t` to sort tabular data by any column, mix keys, and control field boundaries.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <ColumnSortIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 Column Sorting Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-teal-600 dark:text-teal-400">sort -k POS[,POS] [OPTIONS] [FILE]</code>
            <code className="text-teal-600 dark:text-teal-400"># Sort by second column (default whitespace delimiter)</code>
            <code className="text-teal-600 dark:text-teal-400">sort -k2 data.txt</code>
            <code className="text-teal-600 dark:text-teal-400"># Sort by third column numerically</code>
            <code className="text-teal-600 dark:text-teal-400">sort -k3 -n data.txt</code>
            <code className="text-teal-600 dark:text-teal-400"># Sort by column 2, then by column 1</code>
            <code className="text-teal-600 dark:text-teal-400">sort -k2,2 -k1,1 data.txt</code>
            <code className="text-teal-600 dark:text-teal-400"># Custom delimiter (comma)</code>
            <code className="text-teal-600 dark:text-teal-400">sort -t',' -k3 -n data.csv</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Prints sorted lines; exit 0 unless error.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To sort tabular data (CSV, TSV, log files, etc.) by specific fields, enabling advanced report generation and data analysis.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How Column Sorting Works</h2>
          <p className="mb-3"><strong>Key specification (`-k`):</strong> The `-k` option defines which field(s) to sort by. Basic: `-k2` means “from field 2 to the end of the line”. To limit to a single field: `-k2,2`. You can also specify start and stop characters within a field: `-k1.2,1.4` (start at character 2 of field 1, end at character 4).</p>
          <p className="mb-3"><strong>Field delimiter (`-t`):</strong> By default, fields are separated by whitespace (space or tab). Use `-t` to define a custom delimiter, e.g., `-t','` for CSV.</p>
          <p className="mb-3"><strong>Multiple sort keys:</strong> Provide multiple `-k` options; earlier keys have higher precedence. Example: `sort -k2 -k1` sorts by field 2, then by field 1.</p>
          <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-950/30 rounded-lg border-l-4 border-teal-500">
            <p className="text-sm"><strong>Real‑world at Barrackpore College:</strong> A teacher has a CSV of student marks: `Name,Age,Score`. She wants to sort by Score (descending) and then by Age (ascending) to see youngest high‑scorers first: `sort -t',' -k3,3rn -k2,2n students.csv`. This uses reverse numeric on field 3 and numeric on field 2.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: Column Sorting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortBasicColumnScript} title="📊 Basic Column Sort (-k2)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortNumericColumnScript} title="🔢 Numeric Column Sort (-k3 -n)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortMultipleKeysScript} title="🔑 Multiple Keys (-k2 -k1)" highlightLines={[14,19]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortCustomDelimiterScript} title="📁 Custom Delimiter (-t)" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortIgnoreBlanksScript} title="🎯 Ignore Leading Blanks (-b)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortMonthColumnScript} title="📅 Month Column Sort (-M)" highlightLines={[12,16]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sortComplexDemoScript} title="🧩 Complex Sorting: IPs, Versions, Combined Keys" highlightLines={[14,20,26]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Use `-k2,2` not `-k2`</strong> to restrict to a single column (prevents spillover).</li>
              <li><strong>Combine flags inside a key:</strong> `sort -k3,3nr` (numeric, reverse) – order of flags matters.</li>
              <li><strong>Sort by IP addresses:</strong> `sort -t. -k1,1n -k2,2n -k3,3n -k4,4n`.</li>
              <li><strong>Stable multi‑key sort:</strong> Use `-s` to preserve original order for ties in earlier keys.</li>
              <li><strong>Debug with `--debug`:</strong> See which keys are used and how they are compared.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Forgetting `-k` endpoint:</strong> `-k2` sorts from field 2 to end of line, which may include later fields unintentionally.</li>
              <li><strong>Mixing numeric and lexicographic:</strong> Use `-n` on numeric columns, otherwise `10` sorts before `2`.</li>
              <li><strong>Case sensitivity in keys:</strong> Use `-f` inside key: `-k2,2f` for case‑insensitive sort on that field.</li>
              <li><strong>Delimiters are single characters:</strong> Cannot use multiple characters like `::`.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always specify both start and end fields (e.g., `-k3,3`) to avoid ambiguity.</p>
              <p>✔️ Use `-t` explicitly for CSV, TSV, or any non‑whitespace delimiter.</p>
              <p>✔️ When combining options like reverse and numeric, put them after the key: `-k3,3nr`.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Use `-s` with multiple keys for deterministic output when ties exist.</p>
              <p>✔️ Test with `head` and `--debug` before applying to large files.</p>
              <p>✔️ For version numbers, use `-V` instead of `-n` (e.g., `1.10` vs `1.2`).</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can sort by the 2nd column with `-k2,2`.</li>
              <li>☐ I can sort numerically by a column with `-k3,3n`.</li>
              <li>☐ I can use multiple keys (e.g., `-k2,2 -k1,1`).</li>
              <li>☐ I can set a delimiter with `-t` (e.g., `-t','`).</li>
              <li>☐ I can sort by month name with `-M`.</li>
              <li>☐ I can combine flags inside a key: `-k3,3nr`.</li>
              <li>☐ I can ignore leading blanks with `-b` or inside key: `-k2,2b`.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a CSV file: "Name, Score, Grade". Write a command to sort by Grade (descending), and for equal grades, by Score (ascending). Try using -k3,3r -k2,2n. What if the file uses space as delimiter and there are leading spaces? How does -b help? If you omit the end field (e.g., -k2), what will happen to lines with more than 2 fields?`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-teal-700 dark:text-teal-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for Column Sorting:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Shyamnagar, students often struggle with multi‑key sorts. I give them a sales CSV and ask: 'Sort by region, then by highest sales within each region.' They learn to use `-k1,1 -k3,3nr` – and the power of stable sorting."</li>
                  <li>Emphasise the difference between `-k2` and `-k2,2` by showing an example where extra fields cause unwanted ordering.</li>
                  <li>Classroom exercise: Sort the `/etc/passwd` file by UID (field 3) numerically, then by username (field 1).</li>
                  <li>Show `--debug` live to demystify key extraction.</li>
                </ul>
                <p className="mt-2 italic text-sm">"Column sorting turns raw data into actionable insights – one of the most practical skills you'll learn." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ Column Sorting – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 6: Sorting Based on Specific Columns – Precision Control Over Tabular Data
        </div>
      </div>
    </div>
  );
};

export default Topic6;