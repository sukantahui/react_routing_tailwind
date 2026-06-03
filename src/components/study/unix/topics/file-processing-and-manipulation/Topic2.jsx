import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import pasteBasicScript from './topic2_files/paste_basic.sh?raw';
import pasteDelimitersScript from './topic2_files/paste_delimiters.sh?raw';
import pasteSerialScript from './topic2_files/paste_serial.sh?raw';
import pasteMultifileScript from './topic2_files/paste_multifile.sh?raw';
import pastePracticalScript from './topic2_files/paste_practical.sh?raw';
import pastePipelineScript from './topic2_files/paste_pipeline.sh?raw';
import questions from './topic2_files/topic2_questions.js';

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

// Main component: Topic 2
const Topic2 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: paste merging horizontally
  const PasteIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="280" viewBox="0 0 600 280" className="w-full max-w-md h-auto">
        <rect width="600" height="280" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* File A */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File A:</text>
        <rect x="80" y="25" width="150" height="90" rx="6" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="90" y="50" fontSize="12" fontFamily="monospace" fill="#4f46e5">Alice</text>
        <text x="90" y="70" fontSize="12" fontFamily="monospace" fill="#4f46e5">Bob</text>
        <text x="90" y="90" fontSize="12" fontFamily="monospace" fill="#4f46e5">Charlie</text>

        {/* File B */}
        <text x="30" y="160" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File B:</text>
        <rect x="80" y="145" width="150" height="90" rx="6" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="90" y="170" fontSize="12" fontFamily="monospace" fill="#16a34a">85</text>
        <text x="90" y="190" fontSize="12" fontFamily="monospace" fill="#16a34a">92</text>
        <text x="90" y="210" fontSize="12" fontFamily="monospace" fill="#16a34a">78</text>

        {/* Arrow + paste join */}
        <path d="M 240 70 L 280 70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPaste)" />
        <path d="M 240 190 L 280 190" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPaste)" />

        {/* Result */}
        <text x="360" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">paste fileA fileB</text>
        <rect x="360" y="55" width="200" height="90" rx="6" fill="#fef9c3" className="dark:fill-yellow-900/40" />
        <text x="370" y="80" fontSize="12" fontFamily="monospace" fill="#854d0e">Alice 85</text>
        <text x="370" y="100" fontSize="12" fontFamily="monospace" fill="#854d0e">Bob 92</text>
        <text x="370" y="120" fontSize="12" fontFamily="monospace" fill="#854d0e">Charlie 78</text>

        {/* Animated glow on merge */}
        <circle cx="280" cy="70" r="4" fill="#f59e0b">
          <animate attributeName="r" values="2;8;2" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="190" r="4" fill="#f59e0b">
          <animate attributeName="r" values="2;8;2" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
        </circle>

        <defs>
          <marker id="arrowPaste" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400">
            Pasting and Merging Files Horizontally using paste
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Combine files side‑by‑side with `paste` – merge columns, customise delimiters, and create tabular data from separate sources.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <PasteIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 paste Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-amber-600 dark:text-amber-400">paste [OPTION]... [FILE]...</code>
            <code className="text-amber-600 dark:text-amber-400"># Merge files side‑by‑side (default delimiter = tab)</code>
            <code className="text-amber-600 dark:text-amber-400">paste file1 file2</code>
            <code className="text-amber-600 dark:text-amber-400"># Change delimiter to comma (CSV output)</code>
            <code className="text-amber-600 dark:text-amber-400">paste -d ',' file1 file2</code>
            <code className="text-amber-600 dark:text-amber-400"># Paste one file multiple times (serial mode)</code>
            <code className="text-amber-600 dark:text-amber-400">paste -s -d '|' file1</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Prints combined lines to stdout; exit 0 on success.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To merge corresponding lines from multiple files horizontally – like `cut` in reverse. Ideal for creating reports, combining split datasets, or generating CSV from separate columns.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How paste Works</h2>
          <p className="mb-3"><strong>Basic paste:</strong> Reads each file line‑by‑line and outputs them side‑by‑side, separated by a delimiter (tab by default). If files have different line counts, paste continues with the longer files, leaving empty fields for the shorter ones.</p>
          <p className="mb-3"><strong>Delimiter (`-d`):</strong> You can specify any character (or multiple characters cyclically) to separate columns. For example, `-d ','` produces CSV output.</p>
          <p className="mb-3"><strong>Serial mode (`-s`):</strong> Pastes lines from a single file sequentially (line 1 then line 2 etc. across columns), creating a single row with all lines.</p>
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border-l-4 border-amber-500">
            <p className="text-sm"><strong>Real‑world at Naihati High School:</strong> A teacher has two lists: student names (`names.txt`) and their exam scores (`scores.txt`). Using `paste names.txt scores.txt | column -t` she quickly creates a readable grade sheet. Later, she converts it to CSV with `paste -d',' names.txt scores.txt`.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: paste in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={pasteBasicScript} title="📄 Basic paste (tab separator)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={pasteDelimitersScript} title="⚙️ Custom Delimiters (-d)" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={pasteSerialScript} title="🔁 Serial Mode (-s)" highlightLines={[10,14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={pasteMultifileScript} title="📚 Multiple Files (3+) " highlightLines={[14,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={pastePracticalScript} title="🧪 Practical: CSV Builder" highlightLines={[16,23]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={pastePipelineScript} title="🔗 Pipelines & Column Command" highlightLines={[14,20,26]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Use `column -t` after paste for aligned output.</strong></li>
              <li><strong>Multiple delimiters cyclically:</strong> `-d ':,'` uses `:` between cols 1&2, `,` between cols 2&3, repeats.</li>
              <li><strong>Paste from stdin:</strong> Use `-` as filename: `cut ... | paste - file2`.</li>
              <li><strong>Create header row easily:</strong> `echo -e "Name\tScore" | paste - names.txt scores.txt`.</li>
              <li><strong>Combine with `process substitution`:</strong> `paste &lt;(cmd1) &lt;(cmd2)` (bash).</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Different line counts:</strong> paste continues, leaving blanks – may be unexpected.</li>
              <li><strong>Trailing delimiters:</strong> If files have different lengths, output may have trailing delimiters.</li>
              <li><strong>Confusing `-s` (serial) with default:</strong> `paste -s` merges lines of one file across columns, not across files.</li>
              <li><strong>No reordering:</strong> paste can't rearrange columns; use `cut` before pasting.</li>
              <li><strong>Large files:</strong> paste is line‑buffered, fine for big data, but reading files sequentially.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Ensure files have same number of lines, or handle missing data downstream.</p>
              <p>✔️ Use `-d` to produce structured output (CSV, TSV, etc.) for later tools.</p>
              <p>✔️ Preview with `head` before pasting large files.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Combine with `column -t` for human‑readable aligned tables.</p>
              <p>✔️ For uneven line counts, use `sed` or `awk` to pad shorter files.</p>
              <p>✔️ Use `paste -s` to convert a column of data into a row.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can merge two files side‑by‑side with default tab delimiter.</li>
              <li>☐ I can change delimiter with `-d` (e.g., `-d','`).</li>
              <li>☐ I understand the difference between normal and serial mode (`-s`).</li>
              <li>☐ I can use `paste` with standard input using `-`.</li>
              <li>☐ I know that missing lines produce empty fields.</li>
              <li>☐ I can create a CSV from separate column files.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have three files: first_names.txt (Swadeep, Tuhina, ...), last_names.txt (Hui, Chatterjee, ...), and scores.txt (85, 92, ...). How do you combine them into a single CSV with columns: "First,Last,Score"? Now suppose first_names.txt has 10 lines, scores has 12 lines – what will paste do with the extra two in scores? Try paste -d,' first_names.txt last_names.txt scores.txt | head -15.`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-amber-700 dark:text-amber-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for paste Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Barrackpore, I gave students two files – roll numbers and names – and asked them to create a single list. The lightbulb moment when they discovered `paste` is unforgettable."</li>
                  <li>Emphasise that `paste` is the counterpart to `cut`: one cuts columns, the other pastes columns together.</li>
                  <li>Demonstrate serial mode (`-s`) by showing how to transpose a column into a row – great for building header lines.</li>
                  <li>{`Classroom exercise: take the output of ls -1 and ls -l | awk '{print $5}' (sizes) and paste them side‑by‑side to compare filenames and sizes.`}</li>
                </ul>
                <p className="mt-2 italic text-sm">"`paste` is the unsung hero of report generation. Master it and you'll combine any columnar data with ease." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ paste Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 2: Pasting and Merging Files Horizontally – Combine Columns Like a Pro
        </div>
      </div>
    </div>
  );
};

export default Topic2;