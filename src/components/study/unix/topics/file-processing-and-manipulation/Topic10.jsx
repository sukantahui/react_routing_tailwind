import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import joinBasicScript from './topic10_files/join_basic.sh?raw';
import joinCustomFieldsScript from './topic10_files/join_custom_fields.sh?raw';
import joinDifferentDelimitersScript from './topic10_files/join_different_delimiters.sh?raw';
import joinUnmatchedScript from './topic10_files/join_unmatched.sh?raw';
import joinMultipleFieldsScript from './topic10_files/join_multiple_fields.sh?raw';
import joinOuterJoinScript from './topic10_files/join_outer_join.sh?raw';
import joinSubstituteOuterScript from './topic10_files/join_substitute_outer.sh?raw';
import joinPracticalScript from './topic10_files/join_practical.sh?raw';
import questions from './topic10_files/topic10_questions.js';

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

// Main component: Topic 10
const Topic10 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: join concept
  const JoinIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="280" viewBox="0 0 600 280" className="w-full max-w-md h-auto">
        <rect width="600" height="280" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        {/* File A: students */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File A (students):</text>
        <rect x="30" y="55" width="180" height="90" rx="6" fill="#e0e7ff" className="dark:fill-indigo-900/30" />
        <text x="40" y="75" fontSize="12" fontFamily="monospace" fill="#4f46e5">101 Swadeep</text>
        <text x="40" y="95" fontSize="12" fontFamily="monospace" fill="#4f46e5">102 Tuhina</text>
        <text x="40" y="115" fontSize="12" fontFamily="monospace" fill="#4f46e5">103 Abhronila</text>
        <text x="40" y="135" fontSize="12" fontFamily="monospace" fill="#4f46e5">104 Debangshu</text>

        {/* File B: scores */}
        <text x="240" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">File B (scores):</text>
        <rect x="240" y="55" width="150" height="90" rx="6" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="250" y="75" fontSize="12" fontFamily="monospace" fill="#16a34a">101 85</text>
        <text x="250" y="95" fontSize="12" fontFamily="monospace" fill="#16a34a">103 92</text>
        <text x="250" y="115" fontSize="12" fontFamily="monospace" fill="#16a34a">104 78</text>
        <text x="250" y="135" fontSize="12" fontFamily="monospace" fill="#16a34a">105 88</text>

        {/* Arrow & join */}
        <line x1="210" y1="100" x2="230" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowJoin)" />
        <text x="420" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">join -j1 fileA fileB</text>
        <rect x="420" y="55" width="160" height="90" rx="6" fill="#fef9c3" className="dark:fill-yellow-900/40" />
        <text x="430" y="75" fontSize="11" fontFamily="monospace" fill="#854d0e">101 Swadeep 85</text>
        <text x="430" y="95" fontSize="11" fontFamily="monospace" fill="#854d0e">103 Abhronila 92</text>
        <text x="430" y="115" fontSize="11" fontFamily="monospace" fill="#854d0e">104 Debangshu 78</text>

        <defs>
          <marker id="arrowJoin" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Joining Two Files Using join Command
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `join` – SQL‑like relational data joining on sorted files, inner joins, outer joins, and field selection.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <JoinIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 join Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-purple-600 dark:text-purple-400">join [OPTION]... FILE1 FILE2</code>
            <code className="text-purple-600 dark:text-purple-400"># Join on first field (default)</code>
            <code className="text-purple-600 dark:text-purple-400">join file1.txt file2.txt</code>
            <code className="text-purple-600 dark:text-purple-400"># Join on different fields: FILE1 field 2, FILE2 field 3</code>
            <code className="text-purple-600 dark:text-purple-400">join -1 2 -2 3 file1.txt file2.txt</code>
            <code className="text-purple-600 dark:text-purple-400"># Custom delimiter (default whitespace)</code>
            <code className="text-purple-600 dark:text-purple-400">join -t ',' file1.csv file2.csv</code>
            <code className="text-purple-600 dark:text-purple-400"># Output only specific fields</code>
            <code className="text-purple-600 dark:text-purple-400">join -o 1.1,2.2,1.3 file1 file2</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit 0 unless error; writes joined lines to stdout.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To combine two sorted files based on a common key (like SQL JOIN). Essential for merging datasets, enriching data, and producing reports.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Understanding join</h2>
          <p className="mb-3"><strong>Sorted input requirement:</strong> Both files must be sorted on the join field (default field 1). Use `sort -k1,1` before joining.</p>
          <p className="mb-3"><strong>Default join (inner join):</strong> Only lines where the key exists in both files are output. Output includes the common key once, then all other fields from both files.</p>
          <p className="mb-3"><strong>Custom join fields:</strong> Use `-1 FIELD -2 FIELD` to specify join fields (1‑based indices).</p>
          <p className="mb-3"><strong>Output formatting:</strong> Use `-o` to select specific fields (e.g., `-o 1.1,2.2,1.3`).</p>
          <p className="mb-3"><strong>Unmatched lines:</strong> `-a 1` includes lines from file1 even if no match; `-v 1` shows only unmatched lines from file1.</p>
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border-l-4 border-purple-500">
            <p className="text-sm"><strong>Real‑world at Barrackpore College:</strong> Two files: student_rolls.txt (roll,name,dept) and scores.txt (roll,subject,marks). Using `join -1 1 -2 1` merges scores with names. In database terms, `join` performs a relational inner join, perfect for enriching logs, merging CSV exports, and creating reports.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: join in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={joinBasicScript} title="🔗 Basic join (inner on field 1)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={joinCustomFieldsScript} title="🎯 Join on different fields (-1, -2)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={joinDifferentDelimitersScript} title="📑 Custom delimiters (-t)" highlightLines={[14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={joinUnmatchedScript} title="🚫 Unmatched lines (-a, -v)" highlightLines={[14,18,24]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={joinMultipleFieldsScript} title="🔢 Multiple fields in output (-o)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={joinOuterJoinScript} title="🔄 Outer join (full, left, right)" highlightLines={[14,20,26]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={joinSubstituteOuterScript} title="🛠️ Substituting missing fields" highlightLines={[14,20]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={joinPracticalScript} title="🧪 Practical: Merging CSV reports, ID mapping" highlightLines={[14,22,30]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Process substitution to sort on the fly:</strong> `join &lt;(sort file1) &lt;(sort file2)`</li>
              <li><strong>Left outer join:</strong> `join -a1 file1 file2` (keep all keys from file1).</li>
              <li><strong>Full outer join:</strong> `join -a1 -a2 file1 file2` (union of keys).</li>
              <li><strong>Case‑insensitive join:</strong> convert keys to same case before sorting.</li>
              <li><strong>Join on multiple fields:</strong>{`Combine fields with a delimiter, e.g., awk '{print $1"_"$2, $0}', then sort and join.`}</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Files not sorted on the correct field:</strong> join will miss matches or produce wrong output.</li>
              <li><strong>Whitespace differences:</strong> Leading/trailing spaces cause key mismatch; use `sort -b` and pre‑process.</li>
              <li><strong>Delimiter issues:</strong> Tab vs space; default is whitespace (multiple spaces/tabs count as one). Use `-t` to specify exact delimiter.</li>
              <li><strong>Key appears multiple times in one file:</strong> join produces cartesian product for that key (all combinations).</li>
              <li><strong>Assumptions of numeric fields:</strong> join treats keys as strings, not numbers. `10` and `010` are different.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always sort files on the join key before using join.</p>
              <p>✔️ Use `-t` explicitly for CSV or other delimited files.</p>
              <p>✔️ Pre‑process keys to normalise case or whitespace.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ For large files, use `sort -k1,1` and redirect to temporary files.</p>
              <p>✔️ Use `-o` to avoid printing the join key twice.</p>
              <p>✔️ Test with `join -a1 -v2` to verify unmatched keys.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I understand join requires sorted input on the join field.</li>
              <li>☐ I can join two files on the first field (default).</li>
              <li>☐ I can specify different join fields with `-1` and `-2`.</li>
              <li>☐ I can set custom delimiter with `-t`.</li>
              <li>☐ I can control output fields with `-o`.</li>
              <li>☐ I can perform left/right/full outer joins (`-a`).</li>
              <li>☐ I can find unmatched lines (`-v`).</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a sales file (product_id, product_name) and an inventory file (product_id, quantity). Write a join command to produce product_name, quantity for products that exist in both files. Now modify it to also show products that have zero quantity (i.e., in sales but not in inventory). How would you handle product_id that appears multiple times in inventory (multiple warehouses)?`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-purple-700 dark:text-purple-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for join Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Shyamnagar, I introduce join as the Unix equivalent of SQL JOIN. They grasp quickly when I show two CSV files – students and scores – and we produce a merged report."</li>
                  <li>Emphasise that join expects sorted input; many beginners forget this and get puzzled.</li>
                  <li>Classroom exercise: Merge a list of product codes with prices, then join with sales to calculate revenue.</li>
                  <li>Demonstrate `-a1 -a2` for full outer join using temporary placeholders for missing fields.</li>
                </ul>
                <p className="mt-2 italic text-sm">"`join` turns flat files into relational data – a superpower for any data‑minded sysadmin." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ join Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 10: Joining Two Files Using join – The Relational Power of Unix
        </div>
      </div>
    </div>
  );
};

export default Topic10;