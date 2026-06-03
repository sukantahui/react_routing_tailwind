import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import cutDelimitersScript from './topic1_files/cut_delimiters.sh?raw';
import cutComplementScript from './topic1_files/cut_complement.sh?raw';
import cutOutputDelimiterScript from './topic1_files/cut_output_delimiter.sh?raw';
import cutFieldRangesScript from './topic1_files/cut_field_ranges.sh?raw';
import cutPracticalCasesScript from './topic1_files/cut_practical_cases.sh?raw';
import cutPipelineTricksScript from './topic1_files/cut_pipeline_tricks.sh?raw';
import questions from './topic1_files/topic1_questions.js';

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

// Main component: Topic 1
const Topic1 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: cut command options
  const CutOptionsIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="280" viewBox="0 0 600 280" className="w-full max-w-md h-auto">
        <rect width="600" height="280" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Input line: fields */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">Input:</text>
        <rect x="80" y="25" width="450" height="28" rx="4" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="90" y="45" fontSize="13" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Field1:Field2:Field3:Field4:Field5</text>

        {/* Options menu */}
        <rect x="30" y="80" width="540" height="120" rx="8" fill="#f1f5f9" className="dark:fill-gray-800" stroke="#cbd5e1" strokeWidth="1" />
        
        <text x="50" y="105" fontSize="14" fontWeight="bold" fill="#4f46e5">cut -d ':' -f 1,3,5</text>
        <text x="50" y="125" fontSize="12" fill="#475569" className="dark:fill-gray-400">→ Extract fields 1,3,5 (Field1, Field3, Field5)</text>
        
        <text x="50" y="150" fontSize="14" fontWeight="bold" fill="#10b981">cut -c 1-5,10-14</text>
        <text x="50" y="170" fontSize="12" fill="#475569" className="dark:fill-gray-400">→ Extract character positions 1‑5 and 10‑14</text>
        
        <text x="50" y="195" fontSize="14" fontWeight="bold" fill="#f59e0b">cut -f 2 --complement</text>
        <text x="50" y="215" fontSize="12" fill="#475569" className="dark:fill-gray-400">→ All fields except field 2</text>

        {/* Animated highlight */}
        <rect x="30" y="80" width="540" height="120" rx="8" fill="none" stroke="#f59e0b" strokeWidth="2">
          <animate attributeName="stroke-dashoffset" values="0;200" dur="4s" repeatCount="indefinite" />
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            Using cut Command with Different Options
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `cut` – the Swiss Army knife for extracting columns: delimiters, ranges, complement, and custom outputs.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <CutOptionsIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 cut Command Syntax Variations</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-green-600 dark:text-green-400">cut OPTION... [FILE]...</code>
            <code className="text-green-600 dark:text-green-400"># Field mode (column extraction)</code>
            <code className="text-green-600 dark:text-green-400">cut -d DELIMITER -f LIST [FILE]</code>
            <code className="text-green-600 dark:text-green-400">cut -f LIST [FILE]               # delimiter is TAB</code>
            <code className="text-green-600 dark:text-green-400"># Character/byte mode</code>
            <code className="text-green-600 dark:text-green-400">cut -c LIST [FILE]               # by character positions</code>
            <code className="text-green-600 dark:text-green-400">cut -b LIST [FILE]               # by byte positions</code>
            <code className="text-green-600 dark:text-green-400"># Additional options</code>
            <code className="text-green-600 dark:text-green-400">cut --complement -f LIST [FILE]  # select all except LIST</code>
            <code className="text-green-600 dark:text-green-400">cut --output-delimiter=STRING    # change output separator</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Prints selected parts of each line; exit 0 unless error.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> Efficiently extract columns, character ranges, or byte sequences from text files – ideal for data processing, log analysis, and format conversion.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Understanding cut Options</h2>
          <p className="mb-3"><strong>Field mode (`-f`):</strong> Splits each line into fields based on a delimiter (`-d`). Default delimiter is tab. Useful for CSV, TSV, `/etc/passwd` (colon), and log files with consistent separators.</p>
          <p className="mb-3"><strong>Character/Byte mode (`-c`, `-b`):</strong> Extracts fixed‑width columns by character or byte position. `-c` respects multibyte characters (UTF‑8), `-b` works on raw bytes.</p>
          <p className="mb-3"><strong>Complement (`--complement`):</strong> Inverts selection – prints all fields/characters except those listed. Great for removing columns.</p>
          <p className="mb-3"><strong>Output delimiter (`--output-delimiter`):</strong> Changes the separator used when printing selected fields. Default is the input delimiter.</p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border-l-4 border-green-500">
            <p className="text-sm"><strong>Real‑world at Shyamnagar IT Park:</strong> A developer needs to generate a report from a pipe‑separated log. She uses `cut -d'|' -f2,4,6` to extract specific columns, then `--output-delimiter=';'` to produce a semicolon‑separated CSV. Later, to hide a sensitive column, she uses `cut --complement -f3`.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: cut Options in Action</h2>
          <div className="grid-cols-1 md:grid-cols-1 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutDelimitersScript} title="🔧 Different Delimiters (-d)" highlightLines={[10,14,18,24]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutComplementScript} title="🔄 Complement (--complement)" highlightLines={[10,15]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutOutputDelimiterScript} title="📤 Output Delimiter (--output-delimiter)" highlightLines={[10,15]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutFieldRangesScript} title="📏 Field Ranges (1-3, 5, 7-)" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutPracticalCasesScript} title="🧪 Practical Use Cases" highlightLines={[14,20,26]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cutPipelineTricksScript} title="🔗 Pipeline Tricks & Performance" highlightLines={[12,18,24,30]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Use `--output-delimiter` to transform formats:</strong> Convert CSV to space‑separated quickly.</li>
              <li><strong>Combine `--complement` to drop columns:</strong> `cut --complement -f2,5` keeps everything except columns 2 and 5.</li>
              <li><strong>Quote delimiters that are shell special:</strong> `cut -d '|'` / `cut -d '$'` / `cut -d '!'`.</li>
              <li><strong>Use `-c` for fixed‑width log files where columns align by character.</strong></li>
              <li><strong>Speed tip:</strong> `cut` is faster than `awk` for simple column extraction on huge files.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Multiple spaces as delimiter:</strong> `cut` treats each space separately → empty fields. Use `tr -s ' '` or `awk`.</li>
              <li><strong>Forgetting to specify `-d` when delimiter is not tab:</strong> Defaults to tab, resulting in only one field.</li>
              <li><strong>Using `-f` without `-d` on CSV:</strong> It won't split on commas.</li>
              <li><strong>Assuming `--output-delimiter` works with `-c`:</strong> It does not; it's only for field mode.</li>
              <li><strong>Confusing `-b` vs `-c` with Unicode:</strong> `-b` can cut in the middle of a multibyte character → corrupted output.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always specify `-d` explicitly when not using tab.</p>
              <p>✔️ For multi‑character delimiters, use `awk` (cut only supports single character).</p>
              <p>✔️ Use `head` to preview before cutting: `head -5 file | cut ...`.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Quote delimiter to avoid shell interpretation: `-d ';'`.</p>
              <p>✔️ Use `--complement` for readability instead of listing many fields.</p>
              <p>✔️ For fixed‑width columns, `-c` is more intuitive than `-b` for humans.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can extract fields with `-d` and `-f`.</li>
              <li>☐ I can use ranges: `-f1-3,5,7-`.</li>
              <li>☐ I can exclude fields with `--complement`.</li>
              <li>☐ I can change output separator with `--output-delimiter`.</li>
              <li>☐ I can extract characters with `-c` and bytes with `-b`.</li>
              <li>☐ I understand the difference between `-c` (UTF‑8 safe) and `-b` (byte level).</li>
              <li>☐ I know that cut does NOT reorder fields – they print in the order they appear in the line (or as specified? GNU cut respects LIST order).</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a file with lines like "ID:1234:Name:Swadeep:Score:85". Using cut, how would you extract only the name and score? What delimiter would you choose? Now, suppose you want the output to be "Swadeep scored 85". Can you combine cut with something else to rearrange the order? (Hint: cut alone cannot reorder; you might need paste or awk). Observe how --output-delimiter works – can you make it output a space and then the word "scored"?`}
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
                <p><strong>🎓 Teacher's Advice for cut Command Options:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Ichapur, I gave students a messy `/etc/passwd` dump and asked them to extract usernames and home directories. They quickly learned `-d':'` and `-f1,6`. Then I introduced `--output-delimiter=' -> '` to make the output readable."</li>
                  <li>Emphasise that `cut` is limited to one character delimiter. When they encounter multi‑character delimiters, it's time to introduce `awk` in next topics.</li>
                  <li>Classroom exercise: Take a CSV of student marks and use `cut --complement` to drop the 'ID' column, then `--output-delimiter='|'` to produce a pipe‑separated file.</li>
                </ul>
                <p className="mt-2 italic text-sm">"The power of `cut` is its simplicity – it does one thing perfectly. Master it, and you'll never fear column extraction again." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ cut Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 1: Using cut command with different options – Precision Column Extraction
        </div>
      </div>
    </div>
  );
};

export default Topic1;