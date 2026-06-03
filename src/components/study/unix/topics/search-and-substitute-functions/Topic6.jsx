import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts (.sh files as raw text)
import grepPipeSedScript from './topic6_files/grep_pipe_sed.sh?raw';
import sedWithGrepFilterScript from './topic6_files/sed_with_grep_filter.sh?raw';
import grepToSelectLinesSedEditScript from './topic6_files/grep_to_select_lines_sed_edit.sh?raw';
import grepCountBeforeSedScript from './topic6_files/grep_count_before_sed.sh?raw';
import multiplePipesScript from './topic6_files/multiple_pipes.sh?raw';
import processLogsScript from './topic6_files/process_logs.sh?raw';
import extractAndReplaceScript from './topic6_files/extract_and_replace.sh?raw';
import questions from './topic6_files/topic6_questions.js';

// Reusable ShellFileLoader component
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

// Reusable FAQTemplate component
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

  // SVG Illustration for grep + sed pipeline
  const PipelineIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="650" height="300" viewBox="0 0 650 300" className="w-full max-w-md h-auto">
        <rect width="650" height="300" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Input log lines */}
        <text x="30" y="40" fontSize="14" fill="#1e293b" className="dark:fill-gray-200">Log file:</text>
        <rect x="30" y="50" width="180" height="22" rx="3" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="40" y="66" fontSize="11" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">INFO: User login</text>
        <rect x="30" y="75" width="180" height="22" rx="3" fill="#fee2e2" className="dark:fill-red-900/40" />
        <text x="40" y="91" fontSize="11" fontFamily="monospace" fill="#dc2626">ERROR: Disk full</text>
        <rect x="30" y="100" width="180" height="22" rx="3" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="40" y="116" fontSize="11" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">INFO: Backup start</text>
        <rect x="30" y="125" width="180" height="22" rx="3" fill="#fee2e2" className="dark:fill-red-900/40" />
        <text x="40" y="141" fontSize="11" fontFamily="monospace" fill="#dc2626">ERROR: Network timeout</text>

        {/* grep filter */}
        <text x="250" y="40" fontSize="14" fill="#4f46e5">grep "ERROR"</text>
        <path d="M 215 90 L 245 90" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="250" y="75" width="160" height="40" rx="6" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="260" y="95" fontSize="12" fontFamily="monospace" fill="#4f46e5">ERROR: Disk full</text>
        <text x="260" y="110" fontSize="12" fontFamily="monospace" fill="#4f46e5">ERROR: Network timeout</text>

        {/* sed transformation */}
        <text x="460" y="40" fontSize="14" fill="#10b981">sed 's/ERROR/CRITICAL/'</text>
        <path d="M 415 95 L 445 95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)" />
        <rect x="460" y="75" width="180" height="40" rx="6" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="470" y="95" fontSize="12" fontFamily="monospace" fill="#16a34a">CRITICAL: Disk full</text>
        <text x="470" y="110" fontSize="12" fontFamily="monospace" fill="#16a34a">CRITICAL: Network timeout</text>

        {/* Animated glow on pipe */}
        <line x1="215" y1="90" x2="245" y2="90" stroke="#f59e0b" strokeWidth="3" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="415" y1="95" x2="445" y2="95" stroke="#f59e0b" strokeWidth="3" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
        </line>

        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5" />
          </marker>
          <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Combining grep and sed for Text Processing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Harness the Unix philosophy: pipe together grep (filtering) and sed (transforming) to build powerful text processing pipelines.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <PipelineIllustration />
        </div>

        {/* Prototype / Signature */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">🔗 Combining grep & sed</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-indigo-600 dark:text-indigo-400"># Pipe grep output to sed</code>
            <code className="text-indigo-600 dark:text-indigo-400">grep 'pattern' file | sed 's/old/new/'</code>
            <code className="text-indigo-600 dark:text-indigo-400"># Use grep to filter lines, then sed to transform</code>
            <code className="text-indigo-600 dark:text-indigo-400">grep -E 'ERROR|WARN' log.txt | sed 's/ERROR/CRITICAL/g' > output.txt</code>
            <code className="text-indigo-600 dark:text-indigo-400"># Process multiple files with find + xargs + grep + sed</code>
            <code className="text-indigo-600 dark:text-indigo-400">find . -name "*.log" -exec grep -l "ERROR" {} \; | xargs sed -i 's/ERROR/CRITICAL/g'</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit status of the last command in pipeline; prints transformed lines (or modifies files with -i).</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To select only relevant lines (grep) and then edit them (sed) – a classic Unix pipeline for log processing, configuration management, and data cleaning.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Why Combine grep and sed?</h2>
          <p className="mb-3"><strong>Separation of concerns:</strong> grep excels at filtering lines (selecting rows), sed excels at transforming text (editing columns/patterns). Piping them together creates a clean, readable, and powerful workflow.</p>
          <p className="mb-3"><strong>Filter then transform:</strong> Instead of writing complex sed addresses or conditions, use grep to first narrow down the lines, then sed to make changes only on those lines. This is often simpler and more efficient.</p>
          <p className="mb-3"><strong>Real-world examples:</strong></p>
          <ul className="list-disc list-inside mb-3 space-y-1 ml-4">
            <li>Extract all error lines from a log, then replace timestamp format: <code>grep ERROR app.log | sed 's/^[0-9-]* /[DATE] /'</code></li>
            <li>Find all TODO comments in code, then capitalize them: <code>grep -r "TODO" . | sed 's/TODO/TODO:/g'</code></li>
            <li>From a CSV, select rows where grade is 'A', then change the name to uppercase: <code>grep ',A$' students.csv | sed 's/^\([^,]*\)/\U\1/'</code></li>
          </ul>
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border-l-4 border-indigo-500">
            <p className="text-sm"><strong>Scenario at Barrackpore College:</strong> A teacher has a massive attendance log. She wants to find all lines where Swadeep or Tuhina were marked absent, and then replace "absent" with "MISSED". One pipeline: <code className="bg-gray-200 dark:bg-gray-700 px-1">grep -E "Swadeep|Tuhina" attendance.log | sed 's/absent/MISSED/g'</code>.</p>
          </div>
        </div>

        {/* Script Demos – using external .sh files */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Demos: grep + sed Pipelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={grepPipeSedScript} title="🔍 Basic pipe: grep → sed" highlightLines={[13,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={sedWithGrepFilterScript} title="🎯 Using grep inside sed (alternative)" highlightLines={[14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={grepToSelectLinesSedEditScript} title="📝 grep selects, sed edits" highlightLines={[14,18,23]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={grepCountBeforeSedScript} title="📊 Count matches before transforming" highlightLines={[14,19]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={multiplePipesScript} title="🔗 Multiple pipes (grep | sed | sort | uniq)" highlightLines={[18,23]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={processLogsScript} title="📜 Processing log files" highlightLines={[20,27]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={extractAndReplaceScript} title="📤 Extract + replace across multiple files" highlightLines={[17,20,24]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Use <code>grep -v</code> to exclude lines before sed:</strong> <code>grep -v "^#" config.txt | sed 's/old/new/'</code></li>
              <li><strong>Chain multiple transformations:</strong> <code>grep ERROR log | sed 's/ERROR/CRITICAL/' | sed 's/^/ALERT: /'</code></li>
              <li><strong>If you need to edit in-place after filtering:</strong> Use <code>grep -l</code> to list files, then <code>xargs sed -i</code>.</li>
              <li><strong>Use <code>tee</code> to inspect intermediate output:</strong> <code>grep ERROR log | tee filtered.txt | sed 's/ERROR/CRITICAL/'</code></li>
              <li><strong>Combine with <code>while read</code> for complex processing:</strong> <code>grep pattern file | while read line; do echo "$line" | sed '...'; done</code></li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls & Misconceptions</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Overusing pipes:</strong> Sometimes sed alone with addresses is enough; unnecessary pipes create extra processes.</li>
              <li><strong>Forgetting that grep removes lines:</strong> If you filter with grep, sed never sees the excluded lines – may lose needed context.</li>
              <li><strong>Using <code>grep | sed -i</code> doesn't work:</strong> <code>-i</code> requires a file argument, but stdin has no filename. Use <code>sed -i</code> with a temporary file or <code>xargs</code>.</li>
              <li><strong>Not quoting patterns in grep | sed pipeline:</strong> Spaces or special characters break the pipe.</li>
              <li><strong>Assuming sed sees the whole file:</strong> It works line by line, same as grep.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices & Beginner-Safe Habits</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Break complex pipelines into lines with backslashes for readability:</p>
              <code className="block text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded">grep 'ERROR' app.log | \
  sed 's/ERROR/CRITICAL/g' | \
  sort | uniq -c</code>
            </div>
            <div className="space-y-2">
              <p>✔️ Test each stage separately: first grep, then pipe to head, then add sed.</p>
              <p>✔️ Use <code>-E</code> (extended regex) consistently in both grep and sed.</p>
              <p>✔️ For in-place modification of filtered lines, use <code>sed -i</code> with an address that mirrors the grep pattern.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can pipe grep output into sed.</li>
              <li>☐ I understand that grep filters lines, sed edits them.</li>
              <li>☐ I can use extended regex in both grep and sed with -E.</li>
              <li>☐ I can chain multiple commands (grep | sed | sort | uniq).</li>
              <li>☐ I can use <code>grep -l</code> with <code>xargs sed -i</code> to edit multiple files.</li>
              <li>☐ I know when to use sed addresses instead of a grep pipe.</li>
              <li>☐ I can debug a pipeline by inserting <code>tee</code>.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">Observe: <code>grep 'ERROR' log.txt | sed 's/ERROR/CRITICAL/'</code> works, but what if you also need to replace on lines that have 'WARNING'? You could add another <code>| sed 's/WARNING/ALERT/'</code>. Now imagine you have 10 patterns. Could you use <code>grep -E 'ERROR|WARNING|...</code> and then a single sed with alternation? Which is more efficient? Try writing a pipeline that extracts only the IP addresses from a log, then replaces the last octet with '0' (e.g., 192.168.1.100 → 192.168.1.0).</p>
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
                <p><strong>🎓 Teacher's Advice for Combining grep & sed:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Shyamnagar, I make students process a messy CSV – first grep to select rows for students scoring above 80, then sed to clean the grade column. They learn the power of 'do one thing well'."</li>
                  <li>Always remind: grep is for selection, sed is for editing. Mixing them without a pipe leads to confusion.</li>
                  <li>Classroom exercise: Given a file of names (Swadeep, Tuhina, Abhronila, Debangshu) and grades, use a pipeline to extract only the 'A' students and replace their names with uppercase.</li>
                  <li>Debugging pipelines: Teach students to add <code>| head -5</code> after each stage to inspect intermediate output.</li>
                </ul>
                <p className="mt-2 italic text-sm">"The Unix philosophy: write programs that do one thing and do it well. grep selects, sed edits – together they are unstoppable." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ Combining grep and sed — 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 6: Combining grep and sed — Building Powerful Text Processing Pipelines
        </div>
      </div>
    </div>
  );
};

export default Topic6;