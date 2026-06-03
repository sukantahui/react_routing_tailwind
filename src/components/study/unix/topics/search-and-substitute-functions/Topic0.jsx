import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

// ============================================================
// Local Mock Components (to ensure self-contained demonstration)
// In a real project, these would be imported from the common directory
// ============================================================

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
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
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

const FAQTemplate = ({ title, questions }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{title}</h3>
      <div className="space-y-4">
        {questions.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left px-6 py-4 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex justify-between items-center"
            >
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
                  <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto mt-2">
                    <code>{faq.codeExample}</code>
                  </pre>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// Main Component: Topic0 - Searching text using grep command
// ============================================================

const Topic0 = () => {
  // Experience calculation: from 1998 to current year
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Inline script content for various grep examples (simulating separate .sh files)
  const grepBasicScript = `#!/bin/bash
# basic_grep.sh - Search for "error" in application.log
echo "Searching for 'error' in log file:"
grep "error" app.log

# Show line numbers
grep -n "error" app.log

# Count occurrences
grep -c "error" app.log
`;

  const grepRegexScript = `#!/bin/bash
# regex_grep.sh - Using regular expressions
# Find lines starting with a digit
grep "^[0-9]" data.txt

# Find lines ending with a period
grep "\\.$" sentences.txt

# Match either 'color' or 'colour'
grep "colou?r" dictionary.txt
`;

  const grepRecursiveScript = `#!/bin/bash
# recursive_grep.sh - Search recursively in directory
# Search all .js files for 'TODO' in src folder
grep -r "TODO" --include="*.js" src/

# Exclude node_modules directory
grep -r "console.log" --exclude-dir=node_modules .
`;

  const grepCaseScript = `#!/bin/bash
# case_insensitive_grep.sh
# Case-insensitive search for 'warning'
grep -i "warning" system.log

# Invert match: show lines NOT containing 'debug'
grep -v "debug" app.log

# Show lines before and after match
grep -B 2 -A 3 "exception" trace.log
`;

  // 30 Expert-level FAQ questions about grep
  const grepFaqs = [
    { question: "What does the basic syntax of grep look like?", shortAnswer: "grep [OPTIONS] PATTERN [FILE...]", explanation: "The pattern can be a simple string or a regular expression. If no file is given, grep reads from standard input.", hint: "Think of grep as a filter.", level: "basic", codeExample: "grep 'error' logfile.txt" },
    { question: "How do I search case-insensitively with grep?", shortAnswer: "Use the -i flag.", explanation: "The -i option makes the pattern matching case-insensitive, so 'Error', 'ERROR', 'error' all match.", hint: "Remember -i stands for ignore case.", level: "basic", codeExample: "grep -i 'warning' system.log" },
    { question: "What flag shows line numbers of matches?", shortAnswer: "-n", explanation: "Using -n prefixes each matched line with its line number within the file.", hint: "n for number.", level: "basic", codeExample: "grep -n 'TODO' project.py" },
    { question: "How can I recursively search directories?", shortAnswer: "Use -r or -R flag.", explanation: "Recursively reads all files under each directory, following symbolic links if -R is used.", hint: "Add -r to search entire folder hierarchies.", level: "intermediate", codeExample: "grep -r 'function_name' ./src/" },
    { question: "What is the difference between grep, egrep, and fgrep?", shortAnswer: "egrep uses extended regex, fgrep treats patterns as fixed strings.", explanation: "Modern grep with -E and -F flags replaces them. -E enables extended regex (+, ?, |, etc.), -F disables regex metacharacters.", hint: "Use -E for complex patterns.", level: "expert", codeExample: "grep -E 'word1|word2' file.txt" },
    { question: "How to invert match (show lines not containing pattern)?", shortAnswer: "Use -v flag.", explanation: "Shows lines that do NOT match the given pattern. Useful for filtering out unwanted lines.", hint: "v for 'inverse'.", level: "basic", codeExample: "grep -v '^#' config.cfg" },
    { question: "How do I count matching lines?", shortAnswer: "Use -c flag.", explanation: "Suppresses normal output and prints only the count of matching lines per file.", hint: "c for count.", level: "basic", codeExample: "grep -c 'error' *.log" },
    { question: "What does -w flag do?", shortAnswer: "Matches whole words only.", explanation: "Ensures the pattern matches only as a whole word, not as a substring (e.g., 'word' won't match 'wordy').", hint: "Protects against partial matches.", level: "intermediate", codeExample: "grep -w 'if' script.sh" },
    { question: "How to show only the matching part of a line?", shortAnswer: "Use -o flag.", explanation: "Prints only the matched (non-empty) parts of a matching line, with each such part on a separate output line.", hint: "o stands for 'only matching'.", level: "intermediate", codeExample: "grep -o '[0-9]\\+' data.txt" },
    { question: "What does -A, -B, -C flags control?", shortAnswer: "Context lines: After, Before, and Context.", explanation: "-A NUM prints NUM lines after match, -B NUM before, -C NUM both before and after.", hint: "Useful for debugging around a match.", level: "intermediate", codeExample: "grep -A 2 -B 2 'Exception' trace.log" },
    { question: "How to search multiple patterns at once?", shortAnswer: "Using -e flag multiple times or a regex with | (with -E).", explanation: "Each -e pattern is considered a pattern to match. Or combine with OR operator in extended regex.", hint: "Combine patterns logically.", level: "advanced", codeExample: "grep -e 'error' -e 'fail' log.txt" },
    { question: "What is the exit status of grep?", shortAnswer: "0 if match found, 1 if no match, >1 on error.", explanation: "Useful in shell scripts to conditionally execute commands based on pattern presence.", hint: "Check $? after grep.", level: "expert", codeExample: "if grep -q 'pattern' file; then echo found; fi" },
    { question: "What does -q or --quiet do?", shortAnswer: "Suppresses output and exits with status.", explanation: "Quiet mode; useful for checking existence without printing matches.", hint: "Use with conditionals.", level: "advanced", codeExample: "grep -q 'secret' config.ini && echo 'Found'" },
    { question: "How to search binary files?", shortAnswer: "Use -a (--text) or --binary-files=text.", explanation: "Treat binary files as text; otherwise grep may output 'Binary file matches'.", hint: "Be careful for huge binaries.", level: "expert", codeExample: "grep -a 'string' binaryfile.bin" },
    { question: "How to suppress filenames in output?", shortAnswer: "Use -h (--no-filename).", explanation: "Suppresses prefixing of filenames when multiple files are searched.", hint: "Useful when piping.", level: "intermediate", codeExample: "grep -h 'pattern' *.txt" },
    { question: "What does -l flag output?", shortAnswer: "Only filenames with at least one match.", explanation: "Prints just the names of files containing matches, once per file.", hint: "l for 'files with matches'.", level: "intermediate", codeExample: "grep -l 'TODO' *.js" },
    { question: "What is the difference between grep and zgrep?", shortAnswer: "zgrep works on compressed files.", explanation: "zgrep uses grep syntax but operates on gzip-compressed files without decompressing manually.", hint: "Use zgrep to search .gz logs directly.", level: "expert", codeExample: "zgrep 'error' archive.log.gz" },
    { question: "How can I limit grep to specific file types?", shortAnswer: "Use --include and --exclude.", explanation: "Glob patterns to include/exclude files from recursive search.", hint: "Filter by extension.", level: "advanced", codeExample: "grep -r --include='*.py' 'import' ./project" },
    { question: "What does -m NUM do?", shortAnswer: "Stop after NUM matches per file.", explanation: "Limits number of matching lines output per file.", hint: "m for max count.", level: "advanced", codeExample: "grep -m 5 'error' huge.log" },
    { question: "How to get colored output from grep?", shortAnswer: "Use --color=always or --color=auto.", explanation: "Highlights the matching strings in the output.", hint: "Set alias grep='grep --color=auto' for convenience.", level: "basic", codeExample: "grep --color=always 'pattern' file" },
    { question: "What is the function of the -f flag?", shortAnswer: "Read patterns from a file, one per line.", explanation: "Useful for long pattern lists.", hint: "f for file.", level: "expert", codeExample: "grep -f patterns.txt data.txt" },
    { question: "How to match tab characters with grep?", shortAnswer: "Insert literal tab using $'\\t' or press Ctrl+V + Tab.", explanation: "In shell, use $'\\t' to represent tab in pattern.", hint: "Use printf to test.", level: "advanced", codeExample: "grep $'\\t' file.txt" },
    { question: "How to search across line boundaries?", shortAnswer: "Standard grep works line-by-line; use -z to treat input as NUL-separated.", explanation: "-z treats the input as a set of lines terminated by zero byte, allowing matches that span newlines.", hint: "Combine with tr or find -print0.", level: "expert", codeExample: "grep -z 'start.*end' multiline.txt" },
    { question: "What is the performance impact of using -E vs basic regex?", shortAnswer: "Negligible for most cases; -E more expressive.", explanation: "Modern grep optimizes both, but basic regex is slightly faster for trivial patterns.", hint: "Prioritize clarity.", level: "expert", codeExample: "time grep -E 'pattern' largefile" },
    { question: "How to match control characters like carriage return?", shortAnswer: "Use $'\\r' or od -c to inspect.", explanation: "Carriage return can be matched with $'\\r', or use printf.", hint: "Use cat -A to see hidden characters.", level: "expert", codeExample: "grep -U $'\\r' windows.txt" },
    { question: "What does -P flag enable?", shortAnswer: "Perl-compatible regular expressions (PCRE).", explanation: "Provides advanced features like lookahead, lookbehind, and more.", hint: "Not available on all systems, check man grep.", level: "expert", codeExample: "grep -P '(?<=foo)bar' file" },
    { question: "How to make grep print only filenames with no matches?", shortAnswer: "Combine -L (--files-without-match).", explanation: "Inverse of -l.", hint: "L for 'files without'.", level: "advanced", codeExample: "grep -L 'success' *.log" },
    { question: "How to include line number and filename in grep output for search in many files?", shortAnswer: "Default behavior: grep -Hn pattern files, -H forces filename.", explanation: "Use -H (--with-filename) and -n (line numbers) together.", hint: "Useful for IDE integration.", level: "intermediate", codeExample: "grep -Hn 'FIXME' *.java" },
    { question: "What is the difference between -s and -q?", shortAnswer: "-s suppresses error messages, -q suppresses all output.", explanation: "-s (--no-messages) hides 'file not found' errors; -q completely silences stdout.", hint: "Combine -s with -q for totally silent checks.", level: "advanced", codeExample: "grep -sq 'pattern' * && echo found" },
    { question: "How to recursively grep while following symlinks?", shortAnswer: "Use -R (capital R).", explanation: "-R follows symbolic links, while -r does not.", hint: "Be careful of infinite loops.", level: "expert", codeExample: "grep -R 'config' /etc/" }
  ];

  // Animated SVG illustrating grep concept
  const GrepIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="500" height="280" viewBox="0 0 500 280" className="w-full max-w-md h-auto">
        {/* Background */}
        <rect width="500" height="280" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        {/* File content lines */}
        <g fill="#334155" className="dark:fill-gray-300">
          <text x="30" y="40" fontSize="14">[INFO] Application started</text>
          <text x="30" y="65" fontSize="14">[ERROR] Failed to connect</text>
          <text x="30" y="90" fontSize="14">[WARN] Deprecated API used</text>
          <text x="30" y="115" fontSize="14">[ERROR] Timeout occurred</text>
          <text x="30" y="140" fontSize="14">[INFO] Retry attempt 3</text>
        </g>
        {/* Highlight lines with animation */}
        <rect x="20" y="52" width="240" height="22" fill="#fecaca" className="dark:fill-red-900/50" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="20" y="102" width="240" height="22" fill="#fecaca" className="dark:fill-red-900/50" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </rect>
        {/* Magnifying glass + grep */}
        <circle cx="400" cy="60" r="28" stroke="#4f46e5" strokeWidth="3" fill="none" />
        <line x1="420" y1="82" x2="445" y2="110" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" />
        <text x="375" y="30" fontSize="16" fill="#4f46e5" textAnchor="middle" fontFamily="monospace">grep</text>
        <text x="355" y="140" fontSize="14" fill="#4f46e5" textAnchor="middle">"ERROR"</text>
        {/* Result box */}
        <rect x="280" y="160" width="180" height="90" rx="8" stroke="#4f46e5" strokeWidth="2" fill="white" className="dark:fill-gray-700" />
        <text x="290" y="185" fontSize="12" fill="#1e293b" className="dark:fill-gray-200">Output:</text>
        <text x="290" y="210" fontSize="13" fill="#ef4444">[ERROR] Failed...</text>
        <text x="290" y="235" fontSize="13" fill="#ef4444">[ERROR] Timeout...</text>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .reveal-section {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            animation: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header Section */}
        <div className="reveal-section text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Searching Text with <code className="bg-gray-200 dark:bg-gray-800 px-2 rounded">grep</code>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master the Swiss Army knife of text search: patterns, regex, recursion, and real-world logging.
          </p>
        </div>

        {/* SVG Concept Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <GrepIllustration />
        </div>

        {/* Command Signature & Purpose */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">📜 Prototype / Signature</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
            <code className="text-indigo-600 dark:text-indigo-400">grep [OPTIONS] PATTERN [FILE...]</code>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-200"><span className="font-semibold">Return type:</span> Exit status (0=found, 1=not found, >1=error) and prints matching lines to stdout.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> Search input files (or stdin) for lines matching a PATTERN. Used daily by sysadmins, developers, and data analysts to filter logs, configs, and code.</p>
          <p className="mt-2"><span className="font-semibold">When & Why:</span> When you need fast, powerful text search in terminal — from debugging server errors to finding function definitions in a codebase.</p>
        </div>

        {/* Detailed Explanation */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Theory & Conceptual Breakdown</h2>
          <p className="mb-3"><code>grep</code> (Global Regular Expression Print) reads each line from files or standard input, applies a pattern (string or regex), and outputs lines that match. It's built on the concept of line-by-line scanning, making it extremely efficient for large files.</p>
          <p className="mb-3"><strong>Real-world context:</strong> Imagine you're a teacher at Barrackpore Government College. You have a log file of 10,000 student attendance records. Instead of opening manually, you run:</p>
          <code className="bg-gray-100 dark:bg-gray-900 p-2 rounded block my-2 text-sm">{`grep "Swadeep" attendance.log`}</code>
          <p>Instantly find Swadeep's entries. Or in a project at Shyamnagar IT Hub: <code>grep -r "TODO" --include="*.jsx" ./src</code> finds all pending tasks.</p>
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border-l-4 border-indigo-500">
            <p className="text-sm"><strong>✨ Professional Tip:</strong> Use <code>grep -n -C 3 "error" app.log</code> to show line numbers and 3 lines of context — invaluable for debugging failing cron jobs or web server errors.</p>
          </div>
        </div>

        {/* Real Shell Examples using ShellFileLoader */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Script Demos (grep in action)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={grepBasicScript} title="🔍 Basic Search & Line Numbers" highlightLines={[4,7]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={grepRegexScript} title="🧩 Regular Expression Patterns" highlightLines={[5,8]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={grepRecursiveScript} title="📂 Recursive Directory Search" highlightLines={[3,7]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={grepCaseScript} title="⚙️ Case-Insensitive & Invert Match" highlightLines={[3,8]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes + Best Practices */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-5 rounded-xl border border-amber-200 dark:border-amber-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-200">
              <li><code>grep --color=auto pattern</code> — highlights matches, set alias <code>alias grep='grep --color=auto'</code></li>
              <li>Use <code>grep -e "pattern1" -e "pattern2"</code> for multiple patterns without regex '|'</li>
              <li>Pipe <code>history | grep "docker"</code> to find past commands</li>
              <li><code>ps aux | grep [s]sh</code> — brackets avoid grep showing itself</li>
              <li>Search through compressed logs: <code>zgrep "error" /var/log/syslog.2.gz</code></li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Mistakes & Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-200">
              <li>Forgetting to quote patterns with spaces or special characters: use <code>grep "my error"</code> not <code>grep my error</code></li>
              <li>Confusing regex meta-characters: . * [ ] need escaping in basic grep. Use -E for extended.</li>
              <li>Assume case-insensitivity by default → false, always use -i explicitly</li>
              <li>Using <code>grep -r pattern .</code> may read large binaries, use <code>{`--exclude-dir={node_modules,.git}`}</code></li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Mini Checklist */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices & Beginner-Safe Habits</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">✔️</span> Always quote your pattern to avoid shell expansion.</p>
              <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">✔️</span> Test regex online or with <code>grep --color</code> to see matches.</p>
              <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">✔️</span> Combine with <code>find</code> for complex file selection.</p>
            </div>
            <div className="space-y-2">
              <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">✔️</span> Use <code>-l</code> to get filenames, <code>-L</code> to find files without match.</p>
              <p><span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">✔️</span> Save common searches as bash aliases.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist for Students</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I know the basic syntax: grep [options] pattern [file]</li>
              <li>☐ I can use -i, -n, -c, -v, -r, -w</li>
              <li>☐ I can explain exit status and use it in scripts</li>
              <li>☐ I can search recursively and exclude directories</li>
              <li>☐ I can write simple regex patterns (^, $, ., *)</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">Observe carefully: when you search for "error" in a file, what happens if the word is "Error" or "ERROR"? How does the <code>-i</code> flag change the behavior? Try changing <code>grep "error"</code> to <code>grep -i "error"</code> and notice the difference. Can you construct a command that finds lines starting with a digit and ending with a period?</p>
        </div>

        {/* Teacher's Note - Sukanta Hui with dynamic experience */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-indigo-700 dark:text-indigo-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for grep:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>Always remember: <strong>grep doesn't modify files</strong> — it only reads and filters.</li>
                  <li>Encourage students to build "search pipelines": <code>cat logs | grep ERROR | wc -l</code></li>
                  <li>Use the <code>--help</code> flag: <code>grep --help | less</code> — it's a goldmine of options.</li>
                  <li>Regular expression proficiency with grep translates directly to sed, awk, vim, and most programming languages.</li>
                </ul>
                <p className="mt-2 italic text-sm">"In my 27+ years of teaching at Ichapur & Naihati, the students who master grep become terminal power users. Experiment with sample logs from your project." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section with 30 questions */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ grep Command FAQs (30 Advanced Concepts)" questions={grepFaqs} />
        </div>

        {/* Footer / final note */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 0: Mastering grep — Foundation for Text Processing Pipelines
        </div>
      </div>
    </div>
  );
};

export default Topic0;