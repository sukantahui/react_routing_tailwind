import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import cmpBasicScript from './topic8_files/cmp_basic.sh?raw';
import cmpVerboseScript from './topic8_files/cmp_verbose.sh?raw';
import cmpLimitBytesScript from './topic8_files/cmp_limit_bytes.sh?raw';
import cmpIgnoreBlanksScript from './topic8_files/cmp_ignore_blanks.sh?raw';
import cmpBinaryScript from './topic8_files/cmp_binary.sh?raw';
import cmpDiffContrastScript from './topic8_files/cmp_diff_contrast.sh?raw';
import cmpPracticalScript from './topic8_files/cmp_practical.sh?raw';
import questions from './topic8_files/topic8_questions.js';

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

// Main component: Topic 8
const Topic8 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: cmp byte‑by‑byte
  const CmpIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="260" viewBox="0 0 600 260" className="w-full max-w-md h-auto">
        <rect width="600" height="260" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        {/* File A bytes */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File A:</text>
        <rect x="30" y="55" width="250" height="30" rx="4" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="40" y="75" fontSize="14" fontFamily="monospace" fill="#4f46e5">H e l l o   W o r l d</text>
        <text x="40" y="100" fontSize="10" fill="#4f46e5">1 2 3 4 5 6 7 8 9 10 11</text>

        {/* File B bytes */}
        <text x="30" y="140" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File B:</text>
        <rect x="30" y="155" width="250" height="30" rx="4" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="40" y="175" fontSize="14" fontFamily="monospace" fill="#16a34a">H e l p o   W o r l d</text>
        <text x="40" y="200" fontSize="10" fill="#16a34a">1 2 3 4 5 6 7 8 9 10 11</text>

        {/* Difference marker */}
        <rect x="158" y="53" width="18" height="34" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3">
          <animate attributeName="stroke-dashoffset" values="0;6" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="158" y="153" width="18" height="34" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3">
          <animate attributeName="stroke-dashoffset" values="0;6" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <text x="300" y="100" fontSize="14" fill="#ef4444">char 4: 'l' vs 'p'</text>
        <text x="300" y="180" fontSize="14" fill="#ef4444">difference at byte 4</text>

        {/* Command display */}
        <rect x="400" y="35" width="160" height="30" rx="6" fill="#fef9c3" className="dark:fill-yellow-900/40" />
        <text x="480" y="55" fontSize="13" fontFamily="monospace" fill="#854d0e" textAnchor="middle">cmp -b A B</text>
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400">
            Comparing Files Character by Character using cmp
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `cmp` – binary‑safe, byte‑level file comparison to find the exact position of the first difference.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <CmpIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 cmp Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-pink-600 dark:text-pink-400">cmp [OPTION]... FILE1 [FILE2 [SKIP1 [SKIP2]]]</code>
            <code className="text-pink-600 dark:text-pink-400"># Basic comparison – prints first differing byte and line</code>
            <code className="text-pink-600 dark:text-pink-400">cmp file1.txt file2.txt</code>
            <code className="text-pink-600 dark:text-pink-400"># Verbose: print byte number and differing byte values</code>
            <code className="text-pink-600 dark:text-pink-400">cmp -b file1.txt file2.txt</code>
            <code className="text-pink-600 dark:text-pink-400"># Suppress output, only return exit status (-s)</code>
            <code className="text-pink-600 dark:text-pink-400">cmp -s file1.txt file2.txt</code>
            <code className="text-pink-600 dark:text-pink-400"># Limit comparison to first N bytes (-n)</code>
            <code className="text-pink-600 dark:text-pink-400">cmp -n 100 file1.txt file2.txt</code>
            <code className="text-pink-600 dark:text-pink-400"># Skip bytes at start (2nd and 3rd args)</code>
            <code className="text-pink-600 dark:text-pink-400">cmp file1.txt file2.txt 10 20</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit 0 if identical, 1 if different, &gt;1 on error.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To find the exact byte offset where two files differ – crucial for binary file verification, integrity checks, and finding corrupted data.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How cmp Compares</h2>
          <p className="mb-3"><strong>Byte‑by‑byte (binary) comparison:</strong> Unlike `diff` which is line‑oriented, `cmp` compares files at the byte level, making it suitable for binary files (executables, images, archives) as well as text.</p>
          <p className="mb-3"><strong>Output format:</strong> By default, prints the byte number and line number of the first difference: `file1 file2 differ: byte 10, line 2`. The `-b` flag also shows the actual differing byte values (in octal).</p>
          <p className="mb-3"><strong>Skipping bytes:</strong> You can give skip offsets to start comparison at specific positions – useful for comparing headers or embedded data.</p>
          <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-950/30 rounded-lg border-l-4 border-pink-500">
            <p className="text-sm"><strong>Real‑world at Barrackpore College:</strong> A student downloaded a large binary file but suspects corruption. He uses `cmp -b original.bin downloaded.bin` to find the first differing byte position. In system administration, `cmp` is used to verify file integrity after backups.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: cmp in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cmpBasicScript} title="🔍 Basic cmp (byte & line number)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cmpVerboseScript} title="📖 Verbose output (-b, -i)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cmpLimitBytesScript} title="⏱️ Limit bytes (-n)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cmpIgnoreBlanksScript} title="␡ Ignore (no) – cmp has no whitespace ignore" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cmpBinaryScript} title="💾 Binary file comparison" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cmpDiffContrastScript} title="⚖️ cmp vs diff (contrast)" highlightLines={[12,16,20]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={cmpPracticalScript} title="🧪 Practical: Integrity check, skip offsets, exit status" highlightLines={[12,18,24]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Quiet mode for scripts:</strong> `cmp -s file1 file2` (suppress output, just exit status).</li>
              <li><strong>Show differing bytes easily:</strong> `cmp -b file1 file2` prints byte values (octal) and ASCII.</li>
              <li><strong>Skip headers:</strong> `cmp file1 file2 100 100` to ignore first 100 bytes of each file.</li>
              <li><strong>Compare only first N bytes:</strong> `cmp -n 1024 file1 file2` – fast integrity check of headers.</li>
              <li><strong>Use with `dd` to extract differing block:</strong> `dd if=file1 bs=1 skip=OFFSET count=1 2&gt;/dev/null`.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Assuming cmp works line‑by‑line:</strong> It's byte‑oriented; newline bytes are just bytes.</li>
              <li><strong>Not using `-s` in scripts:</strong> cmp prints error message on mismatch; use `-s` to suppress.</li>
              <li><strong>Confusing byte offset with line offset:</strong> Default output shows byte number (1‑based) and line number (1‑based).</li>
              <li><strong>No options to ignore whitespace or case:</strong> Use `diff` for those; cmp is strict.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ For binary integrity checks, use `cmp -s` and test exit status.</p>
              <p>✔️ When comparing large files, limit with `-n` to first few bytes for performance.</p>
              <p>✔️ Use `-b` to see the actual differing byte values (helps diagnose encoding issues).</p>
            </div>
            <div className="space-y-2">
              <p>✔️ For text, `diff` is usually more informative; use `cmp` when byte precision matters.</p>
              <p>✔️ In scripts, prefer `cmp -s` over checking output strings.</p>
              <p>✔️ Use skip offsets to compare sections of files (e.g., data after headers).</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can compare two files and get the first differing byte/line.</li>
              <li>☐ I can use `cmp -b` to see the byte values.</li>
              <li>☐ I can suppress output with `cmp -s` for scripting.</li>
              <li>☐ I can limit comparison to N bytes with `-n`.</li>
              <li>☐ I can skip bytes at the beginning of each file.</li>
              <li>☐ I understand that exit status 0 = identical, 1 = different, &gt;1 = error.</li>
              <li>☐ I know when to use `cmp` vs `diff`.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have two 1GB disk images that should be identical except for the first 512 bytes (boot record). How would you use cmp to verify that the rest of the file matches? Explore using skip offsets: cmp -i 512 image1 image2 512. Now suppose you want to find the exact position where they differ, but only if the difference occurs after byte 1000 – can cmp do that? (Hint: skip offsets, then run normally).`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-pink-700 dark:text-pink-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for cmp Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Shyamnagar, I give students two almost identical binary files (one corrupted) and ask them to locate the exact byte offset. They learn `cmp -b` and understand that computers compare at byte level."</li>
                  <li>Emphasise that `cmp` is the tool for binary files, while `diff` is for text.</li>
                  <li>Classroom exercise: Create two files with a single byte difference, ask students to find it using `cmp -l` (list all differing bytes).</li>
                  <li>Show `cmp -s` in shell scripts for file change detection.</li>
                </ul>
                <p className="mt-2 italic text-sm">"`cmp` tells you exactly where things go wrong – byte by byte. It's the detective of the file system." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ cmp Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 8: Comparing Files with cmp – Byte‑Level Precision
        </div>
      </div>
    </div>
  );
};

export default Topic8;