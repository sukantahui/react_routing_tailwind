import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts (raw text)
import headExamplesScript from './topic0_files/head_examples.sh?raw';
import tailExamplesScript from './topic0_files/tail_examples.sh?raw';
import cutByBytesScript from './topic0_files/cut_by_bytes.sh?raw';
import cutByCharsScript from './topic0_files/cut_by_chars.sh?raw';
import cutByFieldsScript from './topic0_files/cut_by_fields.sh?raw';
import selectRowsColumnsScript from './topic0_files/select_rows_columns.sh?raw';
import practicalLogAnalysisScript from './topic0_files/practical_log_analysis.sh?raw';
import questions from './topic0_files/topic0_questions.js';

// Reusable ShellFileLoader (self-contained)
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

// Main component: Topic 0
const Topic0 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: row and column selection
  const RowColumnIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="320" viewBox="0 0 600 320" className="w-full max-w-md h-auto">
        <rect width="600" height="320" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Data grid */}
        <g fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-200">
          <rect x="50" y="40" width="500" height="20" fill="#e2e8f0" className="dark:fill-gray-700" />
          <text x="55" y="55">Name      Age  Grade</text>
          <rect x="50" y="65" width="500" height="20" fill="white" className="dark:fill-gray-800" />
          <text x="55" y="80">Swadeep   20   A</text>
          <rect x="50" y="90" width="500" height="20" fill="#f1f5f9" className="dark:fill-gray-750" />
          <text x="55" y="105">Tuhina    21   A+</text>
          <rect x="50" y="115" width="500" height="20" fill="white" className="dark:fill-gray-800" />
          <text x="55" y="130">Abhronila 19   B</text>
          <rect x="50" y="140" width="500" height="20" fill="#f1f5f9" className="dark:fill-gray-750" />
          <text x="55" y="155">Debangshu 22   A</text>
        </g>
        
        {/* Row selection highlight (first 2 rows) */}
        <rect x="48" y="38" width="504" height="44" fill="none" stroke="#4f46e5" strokeWidth="3" strokeDasharray="5">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
        </rect>
        <text x="50" y="210" fontSize="13" fill="#4f46e5">Row selection: head -2</text>
        
        {/* Column selection highlight (Name column) */}
        <rect x="48" y="38" width="60" height="124" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" begin="1s" repeatCount="indefinite" />
        </rect>
        <text x="50" y="240" fontSize="13" fill="#10b981">Column selection: cut -d' ' -f1</text>
        
        {/* Combined */}
        <text x="50" y="280" fontSize="14" fontWeight="bold" fill="#f59e0b">head -2 | cut -d' ' -f1,3</text>
        <text x="50" y="300" fontSize="12" fill="#f59e0b">→ first two rows, only Name and Grade</text>
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Row‑wise & Column‑wise Data Selection
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master the basics of data slicing: select specific rows with `head`/`tail` and specific columns with `cut`.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <RowColumnIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 Prototypes / Signatures</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-blue-600 dark:text-blue-400">head [-n lines] [file...]           # first N lines (default 10)</code>
            <code className="text-blue-600 dark:text-blue-400">tail [-n lines] [file...]           # last N lines</code>
            <code className="text-blue-600 dark:text-blue-400">cut -c LIST [file...]               # select by character positions</code>
            <code className="text-blue-600 dark:text-blue-400">cut -d DELIMITER -f LIST [file...]  # select by fields (columns)</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> All commands write the selected data to stdout; exit 0 on success.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To extract subsets of data – first/last rows for quick inspection, specific columns for further analysis. Foundation of data manipulation pipelines.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Row & Column Selection Explained</h2>
          <p className="mb-3"><strong>Row selection:</strong> <code>head</code> gives you the top of a file (useful for previewing headers), <code>tail</code> gives the bottom (useful for checking recent logs). Both default to 10 lines but accept <code>-n</code> to specify count.</p>
          <p className="mb-3"><strong>Column selection:</strong> <code>cut</code> extracts columns. Two modes:</p>
          <ul className="list-disc list-inside mb-3 space-y-1 ml-4">
            <li><code>-c LIST</code> – character positions (e.g., <code>cut -c 1-5,10-15</code>)</li>
            <li><code>-d DELIMITER -f LIST</code> – field (column) based on a delimiter (e.g., CSV, tab). Default delimiter is tab.</li>
          </ul>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm"><strong>Real‑world at Barrackpore College:</strong> A teacher has a large CSV of student scores. She uses <code>head -5 marks.csv</code> to verify columns, then <code>cut -d',' -f2,4 marks.csv</code> to extract only names and grades for a report.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: head, tail, cut</h2>
          <div className="grid-cols-1 md:grid-cols-1 gap-1">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={headExamplesScript} title="📄 head – first N lines" highlightLines={[8,12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={tailExamplesScript} title="📄 tail – last N lines & follow" highlightLines={[8,13,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutByBytesScript} title="✂️ cut -b (bytes)" highlightLines={[10,13]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutByCharsScript} title="✂️ cut -c (characters)" highlightLines={[8,12]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutByFieldsScript} title="✂️ cut -f (fields, delimiter)" highlightLines={[10,14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={selectRowsColumnsScript} title="🔗 Combine head/tail + cut" highlightLines={[12,17]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={practicalLogAnalysisScript} title="📊 Practical: Log Analysis Pipeline" highlightLines={[14,20,26]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-1 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>head -n -5</strong> shows all lines except last 5 (GNU).</li>
              <li><strong>tail -f</strong> follows growing file – perfect for live logs.</li>
              <li><code>cut -d' ' -f1-4</code> prints fields 1 through 4.</li>
              <li><code>cut -c 5-</code> prints from character 5 to end of each line.</li>
              <li>Use <code>--output-delimiter</code> to change output separator in cut.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Space as delimiter in cut:</strong> <code>cut -d' ' -f2</code> treats consecutive spaces as separate delimiters. Use <code>tr -s ' '</code> first.</li>
              <li><strong>Cut does not re‑order columns:</strong> <code>-f2,1</code> still outputs column 2 then 1 but prints original order? Actually it prints in the order given (GNU). Check man.</li>
              <li><strong>Default tail shows last 10 lines, not first.</strong> Confusing for beginners.</li>
              <li><strong>Using head/tail on binary files</strong> may produce terminal‑breaking output. Use <code>strings</code> first.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices & Beginner‑Safe Habits</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Preview large files with <code>head</code> before processing with <code>cut</code>.</p>
              <p>✔️ Use <code>tail -n +2</code> to skip header row (start from line 2).</p>
              <p>✔️ Quote delimiters that are special to shell: <code>cut -d '|'</code>.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Combine with <code>sed</code> to normalise whitespace before cutting fields.</p>
              <p>✔️ Always check the number of columns with <code>head -1 | wc -c</code> before using <code>cut -c</code>.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-1 gap-1 mt-2">
              <li>☐ I can show first 5 lines with <code>head -5</code>.</li>
              <li>☐ I can show last 20 lines with <code>tail -20</code>.</li>
              <li>☐ I can follow a log with <code>tail -f</code>.</li>
              <li>☐ I can extract columns by character positions (<code>-c</code>).</li>
              <li>☐ I can extract fields by delimiter (<code>-d',' -f2</code>).</li>
              <li>☐ I can pipe <code>head</code> into <code>cut</code> to preview first few columns.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a CSV file with 1 million rows. You only need to see the "email" column (the 3rd column) for the first 50 rows. Can you write a single pipeline? What if the CSV uses "|" as delimiter? Try changing the delimiter option in cut. Observe: cut -d'|' -f3. Now imagine the file uses multiple spaces – how would you handle that?`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-blue-700 dark:text-blue-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for Row & Column Selection:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Naihati, I give students a messy attendance log and ask: 'Who were present yesterday?' They need to use tail to get the last day's entries, then cut to extract names – they learn pipelines naturally."</li>
                  <li>Always demonstrate <code>head -5 file | cut ...</code> – it's the most common real‑world pattern for data exploration.</li>
                  <li>Remind that `cut` cannot reorder columns; for that you need `awk` or `paste`. Build curiosity for later topics.</li>
                </ul>
                <p className="mt-2 italic text-sm">"Data selection is like using a scalpel – precise and powerful. Master head, tail, and cut, and you will slice through any text file with ease." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ Row & Column Selection – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 0: Row‑wise & Column‑wise Data Selection – The Foundation of Text Processing
        </div>
      </div>
    </div>
  );
};

export default Topic0;