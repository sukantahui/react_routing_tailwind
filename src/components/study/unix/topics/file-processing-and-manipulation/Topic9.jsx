import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import commBasicScript from './topic9_files/comm_basic.sh?raw';
import commSuppressColumnsScript from './topic9_files/comm_suppress_columns.sh?raw';
import commUnsortedInputScript from './topic9_files/comm_unsorted_input.sh?raw';
import commDifferentDelimitersScript from './topic9_files/comm_different_delimiters.sh?raw';
import commCaseInsensitiveScript from './topic9_files/comm_case_insensitive.sh?raw';
import commCompareDirectoriesScript from './topic9_files/comm_compare_directories.sh?raw';
import commPracticalScript from './topic9_files/comm_practical.sh?raw';
import questions from './topic9_files/topic9_questions.js';

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

// Main component: Topic 9
const Topic9 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: comm columns
  const CommIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="260" viewBox="0 0 600 260" className="w-full max-w-md h-auto">
        <rect width="600" height="260" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        {/* File A */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File A (sorted):</text>
        <rect x="30" y="55" width="160" height="100" rx="6" fill="#e0e7ff" className="dark:fill-indigo-900/30" />
        <text x="40" y="75" fontSize="12" fontFamily="monospace" fill="#4f46e5">apple</text>
        <text x="40" y="95" fontSize="12" fontFamily="monospace" fill="#4f46e5">banana</text>
        <text x="40" y="115" fontSize="12" fontFamily="monospace" fill="#4f46e5">cherry</text>
        <text x="40" y="135" fontSize="12" fontFamily="monospace" fill="#4f46e5">date</text>

        {/* File B */}
        <text x="230" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File B (sorted):</text>
        <rect x="230" y="55" width="160" height="100" rx="6" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="240" y="75" fontSize="12" fontFamily="monospace" fill="#16a34a">banana</text>
        <text x="240" y="95" fontSize="12" fontFamily="monospace" fill="#16a34a">cherry</text>
        <text x="240" y="115" fontSize="12" fontFamily="monospace" fill="#16a34a">fig</text>
        <text x="240" y="135" fontSize="12" fontFamily="monospace" fill="#16a34a">grape</text>

        {/* comm output columns */}
        <text x="430" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">comm A B:</text>
        <rect x="430" y="55" width="140" height="100" rx="6" fill="#fef9c3" className="dark:fill-yellow-900/40" />
        <text x="440" y="75" fontSize="12" fontFamily="monospace" fill="#854d0e">apple</text>
        <text x="440" y="95" fontSize="12" fontFamily="monospace" fill="#854d0e">    banana</text>
        <text x="440" y="115" fontSize="12" fontFamily="monospace" fill="#854d0e">    cherry</text>
        <text x="440" y="135" fontSize="12" fontFamily="monospace" fill="#854d0e">date</text>
        <text x="440" y="155" fontSize="12" fontFamily="monospace" fill="#854d0e">        fig</text>
        <text x="440" y="175" fontSize="12" fontFamily="monospace" fill="#854d0e">        grape</text>

        {/* Annotation */}
        <text x="500" y="210" fontSize="11" fill="#6b7280">Column 1: only in A</text>
        <text x="500" y="225" fontSize="11" fill="#6b7280">Column 2: only in B</text>
        <text x="500" y="240" fontSize="11" fill="#6b7280">Column 3: common (tab prefixed)</text>
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
            Comparing Sorted Files Using comm
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `comm` – compare two sorted files line by line, showing lines unique to each file or common to both.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <CommIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 comm Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-blue-600 dark:text-blue-400">comm [OPTION]... FILE1 FILE2</code>
            <code className="text-blue-600 dark:text-blue-400"># Default: three‑column output</code>
            <code className="text-blue-600 dark:text-blue-400">comm file1.txt file2.txt</code>
            <code className="text-blue-600 dark:text-blue-400"># Suppress column 1 (lines only in FILE1)</code>
            <code className="text-blue-600 dark:text-blue-400">comm -1 file1.txt file2.txt</code>
            <code className="text-blue-600 dark:text-blue-400"># Suppress column 2 (lines only in FILE2)</code>
            <code className="text-blue-600 dark:text-blue-400">comm -2 file1.txt file2.txt</code>
            <code className="text-blue-600 dark:text-blue-400"># Suppress column 3 (common lines)</code>
            <code className="text-blue-600 dark:text-blue-400">comm -3 file1.txt file2.txt</code>
            <code className="text-blue-600 dark:text-blue-400"># Combine suppress options: lines only in FILE1</code>
            <code className="text-blue-600 dark:text-blue-400">comm -23 file1.txt file2.txt</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit 0 unless error; writes three‑column output to stdout.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To compare two sorted files and identify lines that are unique to each or common – essential for set operations (union, intersection, difference).</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How comm Works</h2>
          <p className="mb-3"><strong>Sorted input requirement:</strong> Both files must be sorted lexicographically (same order as `sort`). Otherwise, comm's output is undefined.</p>
          <p className="mb-3"><strong>Three‑column output (default):</strong> Column 1: lines only in FILE1; Column 2: lines only in FILE2; Column 3: lines common to both. Columns are separated by tabs.</p>
          <p className="mb-3"><strong>Suppressing columns:</strong> Use `-1`, `-2`, `-3` to suppress respective columns. This allows extracting set differences: `comm -23` = lines in FILE1 but not FILE2; `comm -13` = lines in FILE2 but not FILE1; `comm -12` = common lines.</p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm"><strong>Real‑world at Shyamnagar IT Park:</strong> Two system administrators maintain lists of allowed IPs. They want to find IPs present in the first list but missing in the second. After sorting both files, they use `comm -23 allowed_old.txt allowed_new.txt`. Teachers at Barrackpore use `comm` to compare student attendance lists across two months.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: comm in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={commBasicScript} title="📄 Basic comm (three columns)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={commSuppressColumnsScript} title="🔇 Suppressing columns (-1, -2, -3)" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={commUnsortedInputScript} title="⚠️ Unsorted input (incorrect output)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={commDifferentDelimitersScript} title="📑 Different delimiters (using sort -t $'\\t')" highlightLines={[14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={commCaseInsensitiveScript} title="🔠 Case‑insensitive comparison (pre‑process with tr)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={commCompareDirectoriesScript} title="📁 Comparing directories (generate file lists)" highlightLines={[14,20]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={commPracticalScript} title="🧪 Practical: Set operations (union, intersection, difference)" highlightLines={[14,22,30]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Set difference:</strong> `comm -23 file1 file2` → lines in file1 not in file2.</li>
              <li><strong>Intersection (common lines):</strong> `comm -12 file1 file2` (suppress cols 1&2).</li>
              <li><strong>Union (all lines, no duplicates):</strong> `comm -3 file1 file2 | sed 's/^\\t//'` (needs cleanup).</li>
              <li><strong>Sort without affecting original:</strong> `comm -23 &lt;(sort file1) &lt;(sort file2)`.</li>
              <li><strong>Ignore leading whitespace:</strong> Pre‑process with `sed 's/^[[:space:]]*//'` before sorting.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Using unsorted input:</strong> comm will produce misleading output; always sort first.</li>
              <li><strong>Locale differences:</strong> Sorting order may differ between locales; use `LC_ALL=C` for consistent ASCII order.</li>
              <li><strong>Trailing whitespace:</strong> Spaces change sorting; use `sort -b` or pre‑process.</li>
              <li><strong>Case sensitivity:</strong> comm is case‑sensitive; pre‑process with `tr '[:upper:]' '[:lower:]'` if needed.</li>
              <li><strong>Column confusion:</strong> Remember column order: 1=only in file1, 2=only in file2, 3=both.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always sort both files before using comm (or use process substitution).</p>
              <p>✔️ Use `LC_ALL=C` for portable sorting across systems.</p>
              <p>✔️ For large files, sort in‑place or use temporary sorted copies.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Combine with `uniq` if files contain duplicate lines (comm expects unique? It can handle duplicates but output becomes more complex).</p>
              <p>✔️ Use `comm -12` to find common lines efficiently.</p>
              <p>✔️ For checking if a file is subset of another: `comm -23 file1 file2 | wc -l`.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I understand that input must be sorted.</li>
              <li>☐ I can read three‑column comm output.</li>
              <li>☐ I can suppress columns with `-1`, `-2`, `-3`.</li>
              <li>☐ I can find lines only in file1 (`comm -23`).</li>
              <li>☐ I can find common lines (`comm -12`).</li>
              <li>☐ I can sort files with `sort` before using comm.</li>
              <li>☐ I know how to handle case‑insensitivity and whitespace.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have two lists of email subscribers (old_list.txt, new_list.txt). You need to find: (a) who unsubscribed (in old but not in new), (b) who newly subscribed (in new but not in old), (c) who remained subscribed (common). How would you use comm if both files are sorted? What if the files contain duplicates? Explore comm -23 and comm -13.`}
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
                <p><strong>🎓 Teacher's Advice for comm Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Ichapur, I ask students to compare two roll number lists to find absentees. `comm -23` is their new best friend."</li>
                  <li>Emphasise that `comm` is like a Venn diagram in text – three sets.</li>
                  <li>Classroom exercise: given two sorted files of student names, use `comm` to find who is in both classes (intersection) and who is only in the first class (difference).</li>
                  <li>Show the necessity of sorting by manually unsorting and seeing garbage output.</li>
                </ul>
                <p className="mt-2 italic text-sm">"`comm` is the set theory of the command line – master it to master data comparison." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ comm Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 9: Comparing Sorted Files Using comm – Set Operations at the Command Line
        </div>
      </div>
    </div>
  );
};

export default Topic9;