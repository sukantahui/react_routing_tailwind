import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import diffBasicScript from './topic7_files/diff_basic.sh?raw';
import diffContextScript from './topic7_files/diff_context.sh?raw';
import diffUnifiedScript from './topic7_files/diff_unified.sh?raw';
import diffSideBySideScript from './topic7_files/diff_side_by_side.sh?raw';
import diffIgnoreCaseScript from './topic7_files/diff_ignore_case.sh?raw';
import diffIgnoreWhitespaceScript from './topic7_files/diff_ignore_whitespace.sh?raw';
import diffPatchScript from './topic7_files/diff_patch.sh?raw';
import diffRecursiveScript from './topic7_files/diff_recursive.sh?raw';
import diffPracticalScript from './topic7_files/diff_practical.sh?raw';
import questions from './topic7_files/topic7_questions.js';

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

// Main component: Topic 7
const Topic7 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: diff comparison
  const DiffIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="280" viewBox="0 0 600 280" className="w-full max-w-md h-auto">
        <rect width="600" height="280" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* File A */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File A:</text>
        <rect x="30" y="55" width="200" height="130" rx="6" fill="#e0e7ff" className="dark:fill-indigo-900/30" />
        <text x="40" y="75" fontSize="12" fontFamily="monospace" fill="#4f46e5">Hello world</text>
        <text x="40" y="95" fontSize="12" fontFamily="monospace" fill="#4f46e5">Unix is powerful</text>
        <text x="40" y="115" fontSize="12" fontFamily="monospace" fill="#4f46e5">Linux is great</text>
        <text x="40" y="135" fontSize="12" fontFamily="monospace" fill="#4f46e5">Open source</text>
        <text x="40" y="155" fontSize="12" fontFamily="monospace" fill="#4f46e5">Community driven</text>

        {/* File B */}
        <text x="370" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File B:</text>
        <rect x="370" y="55" width="200" height="130" rx="6" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="380" y="75" fontSize="12" fontFamily="monospace" fill="#16a34a">Hello world</text>
        <text x="380" y="95" fontSize="12" fontFamily="monospace" fill="#16a34a">Unix is powerful</text>
        <text x="380" y="115" fontSize="12" fontFamily="monospace" fill="#16a34a">Linux is awesome</text>
        <text x="380" y="135" fontSize="12" fontFamily="monospace" fill="#16a34a">Community driven</text>

        {/* Diff markings */}
        <line x1="240" y1="75" x2="360" y2="75" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="240" y1="95" x2="360" y2="95" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="240" y1="115" x2="360" y2="115" stroke="#ef4444" strokeWidth="2" strokeDasharray="4">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="0.8s" repeatCount="indefinite" />
        </line>
        <line x1="240" y1="135" x2="360" y2="135" stroke="#ef4444" strokeWidth="2" strokeDasharray="4">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="0.8s" begin="0.2s" repeatCount="indefinite" />
        </line>
        <line x1="240" y1="155" x2="360" y2="155" stroke="#cbd5e1" strokeWidth="1" />

        {/* Diff symbols */}
        <text x="260" y="115" fontSize="18" fill="#ef4444" textAnchor="middle">-</text>
        <text x="340" y="115" fontSize="18" fill="#ef4444" textAnchor="middle">+</text>
        <text x="300" y="135" fontSize="12" fill="#ef4444" textAnchor="middle">(changed line)</text>

        {/* annotation */}
        <text x="300" y="210" fontSize="13" fill="#f59e0b" textAnchor="middle">diff fileA fileB</text>
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Comparing Files Line by Line using diff
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `diff` – find differences between files, generate patches, review code changes, and understand various output formats.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <DiffIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 diff Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-indigo-600 dark:text-indigo-400">diff [OPTION]... FILE1 FILE2</code>
            <code className="text-indigo-600 dark:text-indigo-400"># Default output (normal format)</code>
            <code className="text-indigo-600 dark:text-indigo-400">diff file1.txt file2.txt</code>
            <code className="text-indigo-600 dark:text-indigo-400"># Context format (-c)</code>
            <code className="text-indigo-600 dark:text-indigo-400">diff -c file1.txt file2.txt</code>
            <code className="text-indigo-600 dark:text-indigo-400"># Unified format (-u) – standard for patches</code>
            <code className="text-indigo-600 dark:text-indigo-400">diff -u file1.txt file2.txt</code>
            <code className="text-indigo-600 dark:text-indigo-400"># Side‑by‑side comparison (-y)</code>
            <code className="text-indigo-600 dark:text-indigo-400">diff -y file1.txt file2.txt</code>
            <code className="text-indigo-600 dark:text-indigo-400"># Ignore whitespace, case, etc.</code>
            <code className="text-indigo-600 dark:text-indigo-400">diff -iw file1.txt file2.txt</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit 0 if files identical, 1 if different, >1 on error.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To compare text files, identify added/removed/changed lines, create patches, review code changes, and verify file integrity.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Understanding diff Output</h2>
          <p className="mb-3"><strong>Normal format (default):</strong> Uses letters `a` (add), `d` (delete), `c` (change) with line numbers and the actual lines prefixed by `&lt;` (from first file) and `&gt;` (from second file).</p>
          <p className="mb-3"><strong>Context format (`-c`):</strong> Shows lines from both files around each change, with `!` for changed, `+` for added, `-` for removed. Includes a header with file timestamps.</p>
          <p className="mb-3"><strong>Unified format (`-u`):</strong> More compact, showing changed lines with `-` (removed) and `+` (added). Preferred for patches and version control (git uses unified diff).</p>
          <p className="mb-3"><strong>Side‑by‑side (`-y`):</strong> Displays files in two columns; marks differences with `|`, `&lt;`, `&gt;`.</p>
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border-l-4 border-indigo-500">
            <p className="text-sm"><strong>Real‑world at Shyamnagar IT Park:</strong> Two programmers work on the same script. After merging, they run `diff -u version1.sh version2.sh` to see changes, then apply the patch with `patch`. Teachers at Barrackpore use `diff` to compare student assignment submissions for plagiarism detection.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: diff in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffBasicScript} title="📄 Basic diff (normal format)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffContextScript} title="📊 Context diff (-c)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffUnifiedScript} title="📋 Unified diff (-u)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffSideBySideScript} title="🖥️ Side‑by‑side (-y)" highlightLines={[14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffIgnoreCaseScript} title="🔡 Ignore case (-i)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffIgnoreWhitespaceScript} title="␡ Ignore whitespace (-w, -b, -B)" highlightLines={[14,18,22]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffPatchScript} title="📌 Creating & applying patches" highlightLines={[14,20,26]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffRecursiveScript} title="📁 Recursive diff (-r) for directories" highlightLines={[12,18]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={diffPracticalScript} title="🧪 Practical: Comparing configs, code versions, reports" highlightLines={[14,22,30,38]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Use `-u` for human‑readable diffs and patches.</strong></li>
              <li><strong>Quick check if files differ:</strong> `diff -q file1 file2` (only reports whether they differ).</li>
              <li><strong>Ignore all whitespace:</strong> `diff -w` (great for comparing formatted documents).</li>
              <li><strong>Exclude certain files in directories:</strong> `diff -r -x "*.log" dir1 dir2`.</li>
              <li><strong>Colorized diff:</strong> `diff --color=always file1 file2` (GNU diff).</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Confusing `&lt;` and `&gt;`:</strong> `&lt;` lines are from first file, `&gt;` from second.</li>
              <li><strong>Not using `-w` when whitespace differences are irrelevant:</strong> May report false positives.</li>
              <li><strong>Assuming diff works for binary files:</strong> For binary, use `cmp` or `diff -a` (treat as text).</li>
              <li><strong>Patch application order:</strong> Patches must be applied to the original file; use `patch &lt; patchfile` carefully.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Use unified diff (`-u`) for version control and code reviews.</p>
              <p>✔️ Test patches on a copy before applying to original files.</p>
              <p>✔️ Use `--ignore-blank-lines` (`-B`) to ignore empty lines when appropriate.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ For directory comparisons, use `-r` and `-x` to exclude irrelevant files.</p>
              <p>✔️ Combine with `grep` to filter differences: `diff file1 file2 | grep '^&gt;'`.</p>
              <p>✔️ Store patches with `.patch` or `.diff` extension for clarity.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can run basic diff and interpret normal output (`a`,`d`,`c`).</li>
              <li>☐ I can use context diff (`-c`) and unified diff (`-u`).</li>
              <li>☐ I can view side‑by‑side differences (`-y`).</li>
              <li>☐ I can ignore case (`-i`) and whitespace (`-w`, `-b`).</li>
              <li>☐ I can create a patch and apply it with `patch`.</li>
              <li>☐ I can compare directories recursively (`-r`).</li>
              <li>☐ I know that exit status tells if files differ.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have two configuration files from different servers. They have the same lines but in different order. How do diff behave? Would -y help? How can you see only lines that are present in one file but not the other? (Hint: diff -u and then filter lines starting with `+` or `-`). Try also diff --unchanged-line-format='' --old-line-format='- %L' --new-line-format='+ %L' file1 file2.`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-indigo-700 dark:text-indigo-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for diff Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Naihati, I give students two nearly identical Python scripts – one with a bug. They use `diff -u` to spot the difference, which is much faster than manual proofreading."</li>
                  <li>Demonstrate that `diff` is the foundation of version control systems like Git. Show how `git diff` mirrors `diff -u`.</li>
                  <li>Classroom exercise: Provide two versions of a students' attendance list (role numbers in different orders) and ask students to find who joined and who left using `diff`.</li>
                  <li>Emphasise exit status: using `diff -q` in shell scripts to detect changes.</li>
                </ul>
                <p className="mt-2 italic text-sm">"`diff` is the detective of the Unix world – it finds every single change no matter how subtle." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ diff Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 7: Comparing Files with diff – Spot Every Difference
        </div>
      </div>
    </div>
  );
};

export default Topic7;