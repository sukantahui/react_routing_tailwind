import React, { useState } from 'react';
import clsx from 'clsx';

// ============================================================
// Local Mock Components (self-contained for this topic)
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
// Main Component: Topic2 - Case-insensitive and recursive search options
// ============================================================

const Topic2 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Example scripts (simulating separate .sh files)
  const caseInsensitiveScript = `#!/bin/bash
# case_insensitive.sh
echo "Sample log entries:" > app.log
echo "Error: disk full" >> app.log
echo "WARNING: low memory" >> app.log
echo "error: permission denied" >> app.log
echo "INFO: startup complete" >> app.log

echo "=== Case-sensitive search (default) ==="
grep "error" app.log

echo -e "\\n=== Case-insensitive search (-i) ==="
grep -i "error" app.log

echo -e "\\n=== Count ignoring case ==="
grep -ic "error" app.log
`;

  const recursiveBasicScript = `#!/bin/bash
# recursive_basic.sh - Search in subdirectories
mkdir -p project/{src,docs}
echo "TODO: fix login" > project/src/auth.js
echo "TODO: update docs" > project/docs/readme.txt
echo "FIXME: optimize loop" > project/src/main.py

echo "=== Recursive search for 'TODO' ==="
grep -r "TODO" project/

echo -e "\\n=== With line numbers and filenames ==="
grep -rn "TODO" project/
`;

  const recursiveAdvancedScript = `#!/bin/bash
# recursive_advanced.sh - Include/exclude files
mkdir -p myapp/{src,tests,dist}
echo "console.log('debug')" > myapp/src/index.js
echo "console.log('test')" > myapp/tests/test.js
echo "console.log('prod')" > myapp/dist/bundle.js

echo "=== Only .js files ==="
grep -r --include="*.js" "console.log" myapp/

echo -e "\\n=== Exclude test directory ==="
grep -r --exclude-dir=tests "console.log" myapp/

echo -e "\\n=== Exclude multiple patterns ==="
grep -r --exclude="*.log" --exclude-dir={dist,node_modules} "error" .
`;

  const directoryActionsScript = `#!/bin/bash
# directory_actions.sh - -d and -D options
mkdir -p logs/subdir
echo "error: timeout" > logs/error.log
echo "info: started" > logs/subdir/app.log

echo "=== Default: skip directories ==="
grep "error" logs/

echo -e "\\n=== -d recurse (same as -r) ==="
grep -d recurse "error" logs/

echo -e "\\n=== -d read (treat dir as file) will cause error ==="
grep -d read "error" logs/ 2>&1 | head -1

echo -e "\\n=== Skip binary files automatically (grep does by default) ==="
echo -e "Binary file example:"
echo "test" | gzip > binary.gz
grep "test" binary.gz 2>&1
`;

  const smartCaseScript = `#!/bin/bash
# smart_case.sh - Combine -i with other options
cat > data.txt <<EOF
Apple
apple
APPLE
AppLe
EOF

echo "=== Case-insensitive count ==="
grep -ci "apple" data.txt

echo -e "\\n=== Recursive + case-insensitive in src folder ==="
mkdir -p src
echo "Error: fail" > src/err.log
echo "ERROR: fatal" > src/fatal.log
grep -ri "error" src/

echo -e "\\n=== Invert match with case-insensitive (lines without error) ==="
grep -vi "error" src/*.log
`;

  // 30 FAQ focused on case-insensitivity and recursive grep
  const grepOptionsFaqs = [
    { question: "What does the -i flag do in grep?", shortAnswer: "Makes search case-insensitive.", explanation: "Matches 'Error', 'ERROR', 'error' equally.", hint: "i stands for ignore case.", level: "basic", codeExample: "grep -i 'warning' log.txt" },
    { question: "How to recursively search directories with grep?", shortAnswer: "Use -r or -R flag.", explanation: "-r reads all files under each directory recursively, skipping symlinks; -R follows symlinks.", hint: "r for recursive.", level: "basic", codeExample: "grep -r 'pattern' ./src/" },
    { question: "What is the difference between -r and -R?", shortAnswer: "-r skips symlinks, -R follows them.", explanation: "Following symlinks can lead to infinite loops or duplicate results.", hint: "Use -R carefully on unknown directory trees.", level: "intermediate", codeExample: "grep -R 'config' /etc/   # follows symlinks" },
    { question: "How to exclude a directory from recursive search?", shortAnswer: "Use --exclude-dir=DIR", explanation: "Skips entire directory trees. Globs like --exclude-dir={node_modules,.git} work.", hint: "Saves time and avoids binary files.", level: "advanced", codeExample: "grep -r --exclude-dir=node_modules 'import' ." },
    { question: "How to search only specific file types recursively?", shortAnswer: "Use --include=GLOB", explanation: "Filters files by glob pattern (e.g., --include='*.js').", hint: "Combine with --exclude for fine control.", level: "intermediate", codeExample: "grep -r --include='*.py' 'def ' ./project" },
    { question: "Can I use multiple --include or --exclude?", shortAnswer: "Yes, can be used multiple times.", explanation: "Example: --include='*.c' --include='*.h'", hint: "Also brace expansion: --include='*.{c,h}'", level: "advanced", codeExample: "grep -r --include='*.jsx' --include='*.tsx' 'className' src/" },
    { question: "How to suppress filenames in recursive output?", shortAnswer: "Use -h (--no-filename).", explanation: "When searching multiple files, -h omits the filename prefix.", hint: "Useful when piping to other commands.", level: "intermediate", codeExample: "grep -rh 'TODO' . | sort -u" },
    { question: "How to show only filenames that match recursively?", shortAnswer: "Use -l (--files-with-matches).", explanation: "Lists each file that contains at least one match.", hint: "Often used with -r to find which files contain pattern.", level: "intermediate", codeExample: "grep -rl 'secret-key' ./config" },
    { question: "How to ignore binary files during recursive search?", shortAnswer: "Use -I", explanation: "Treats binary files as not matching; skips them entirely.", hint: "Prevents messy output from PDFs or executables.", level: "advanced", codeExample: "grep -rI 'password' /home/user" },
    { question: "What does --exclude-from=FILE do?", shortAnswer: "Reads exclude patterns from a file.", explanation: "Each line in FILE is a glob pattern to exclude.", hint: "Useful for .gitignore style exclusion.", level: "expert", codeExample: "grep -r --exclude-from=.grepignore 'TODO' ." },
    { question: "How to limit recursion depth?", shortAnswer: "grep has no built-in depth limit; use find with -maxdepth.", explanation: "Combine find and xargs or find -exec grep.", hint: "find . -maxdepth 2 -type f -exec grep 'pattern' {} +", level: "expert", codeExample: "find . -maxdepth 1 -type f | xargs grep 'pattern'" },
    { question: "How to make grep follow symlinks recursively but avoid loops?", shortAnswer: "Use -R but be aware of possible loops; use -s to suppress errors.", explanation: "Or use find -follow with grep.", hint: "For large trees, prefer find with -xtype.", level: "expert", codeExample: "grep -Rl 'pattern' /path/with/symlinks 2>/dev/null" },
    { question: "Can I combine -i and -r for case-insensitive recursive search?", shortAnswer: "Yes, -ri or -ir both work.", explanation: "Order of flags doesn't matter.", hint: "Use -rni for line numbers + recursive + case-insensitive.", level: "basic", codeExample: "grep -ri 'error' /var/log/" },
    { question: "How to search entire filesystem recursively (not recommended)?", shortAnswer: "Use grep -r / 2>/dev/null", explanation: "Redirect stderr to avoid permission errors.", hint: "Better to limit to specific directories like /etc, /home.", level: "expert", codeExample: "sudo grep -r 'pattern' / --exclude-dir={proc,sys,dev} 2>/dev/null" },
    { question: "What does -d recurse do compared to -r?", shortAnswer: "-d recurse is identical to -r.", explanation: "-d specifies action for directories: read, skip, recurse.", hint: "Use -r for convenience; -d recurse is more explicit.", level: "advanced", codeExample: "grep -d recurse 'pattern' dir/" },
    { question: "How to make grep skip directories entirely?", shortAnswer: "Use -d skip", explanation: "Directories are not read nor recursed into.", hint: "Useful when searching a list of files that could include directories.", level: "intermediate", codeExample: "grep -d skip 'pattern' *" },
    { question: "Can I search .gz compressed files recursively?", shortAnswer: "Use zgrep or combine find with zcat.", explanation: "zgrep works like grep but on gzipped files. Recursive: find . -name '*.gz' -exec zgrep 'pattern' {} +", hint: "For .gz logs, use zgrep directly.", level: "advanced", codeExample: "find . -name '*.log.gz' -exec zgrep -i 'error' {} +" },
    { question: "How to recursively count matches across files?", shortAnswer: "Use -r and -c together.", explanation: "grep -rc 'pattern' . shows count per file.", hint: "Add -h to suppress filenames if needed.", level: "intermediate", codeExample: "grep -rc 'TODO' ./src" },
    { question: "What does -R do on a symbolic link to a directory?", shortAnswer: "Follows the link and searches there.", explanation: "Can cause duplicate matches if linked directories overlap.", hint: "Use -r or set -R only when needed.", level: "expert", codeExample: "ln -s /etc etc_link; grep -R 'hosts' etc_link/" },
    { question: "How to search recursively but stay within one filesystem (avoid /proc, /sys)?", shortAnswer: "Use -xdev with find, not grep alone.", explanation: "grep doesn't have -xdev; use find -xdev -type f -exec grep ...", hint: "Important for system-wide searches.", level: "expert", codeExample: "find / -xdev -type f -exec grep -l 'pattern' {} \\;" },
    { question: "How to use --exclude-dir with multiple patterns elegantly?", shortAnswer: "Use brace expansion: --exclude-dir={dir1,dir2,dir3}", explanation: "Bash expands before grep sees it.", hint: "Also can use --exclude-dir=dir1 --exclude-dir=dir2", level: "advanced", codeExample: "grep -r --exclude-dir={.git,node_modules,dist} 'console.log' ." },
    { question: "How to show line numbers in recursive output?", shortAnswer: "Add -n flag.", explanation: "grep -rn 'pattern' . shows filename:linenum:line.", hint: "Essential for debugging references.", level: "basic", codeExample: "grep -rn 'TODO' --include='*.py' ." },
    { question: "What performance considerations for recursive grep?", shortAnswer: "Use --exclude-dir, --include, and avoid searching large binary files.", explanation: "Grep stops on first match per file unless -c or -l used.", hint: "For many small files, grep is fast; for huge logs, consider indexing (ripgrep).", level: "expert", codeExample: "time grep -r 'pattern' large_project/" },
    { question: "Can I search case-insensitively and recursively with context lines?", shortAnswer: "Yes, combine -i -r -A/-B/-C.", explanation: "Example: grep -ri -C 2 'error' ./logs", hint: "Useful for debugging.", level: "advanced", codeExample: "grep -riA 3 'exception' /var/log/" },
    { question: "How to invert match recursively (find files without pattern)?", shortAnswer: "Use -L (files without match) or -v (lines without pattern).", explanation: "grep -rL 'pattern' . lists files lacking pattern.", hint: "-L is opposite of -l.", level: "intermediate", codeExample: "grep -rL '#!/bin/bash' ./scripts/" },
    { question: "How to avoid 'grep: warning: recursive search of stdin'?", shortAnswer: "Do not pass directory to grep without -r. Use -r explicitly.", explanation: "If you do 'grep pattern directory/', grep assumes you want to read directory as file.", hint: "Always use -r when target is directory.", level: "basic", codeExample: "# Wrong: grep pattern mydir/ # Right: grep -r pattern mydir/" },
    { question: "What does --binary-files=without-match do?", shortAnswer: "Treats binary files as not matching, similar to -I.", explanation: "Suppresses 'Binary file matches' messages.", hint: "Use -I for short.", level: "expert", codeExample: "grep -r --binary-files=without-match 'pattern' ." },
    { question: "How to recursively search hidden files (dotfiles)?", shortAnswer: "Grep includes them by default unless excluded by --exclude.", explanation: "Patterns like '.*' are not needed; hidden files are regular files.", hint: "Use --exclude='.*' to ignore them.", level: "intermediate", codeExample: "grep -r 'alias' ~/.config/" },
    { question: "Can I use regex with recursive search?", shortAnswer: "Yes, combine -r with -E or default regex.", explanation: "grep -rE 'pattern|regex' ./src", hint: "Regex is independent of recursion.", level: "basic", codeExample: "grep -rE 'error|warning' /var/log/" },
    { question: "How to make recursive grep output relative paths?", shortAnswer: "By default, grep outputs paths relative to how you called it.", explanation: "From project root: grep -r 'main' . gives './src/main.c'", hint: "Use realpath if absolute needed.", level: "beginner", codeExample: "cd /project && grep -r 'TODO' ." }
  ];

  // SVG Illustration for case-insensitive + recursive search
  const OptionsIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="320" viewBox="0 0 600 320" className="w-full max-w-md h-auto">
        <rect width="600" height="320" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* File tree representation */}
        <g fill="#334155" className="dark:fill-gray-300">
          <text x="30" y="40" fontSize="14" fontWeight="bold">Project/</text>
          <text x="50" y="65" fontSize="13">├── src/</text>
          <text x="70" y="85" fontSize="12">│   ├── main.js</text>
          <text x="70" y="105" fontSize="12">│   └── util.js</text>
          <text x="50" y="130" fontSize="13">├── docs/</text>
          <text x="70" y="150" fontSize="12">│   └── README.md</text>
          <text x="50" y="175" fontSize="13">└── logs/</text>
          <text x="70" y="195" fontSize="12">    └── error.log</text>
        </g>
        
        {/* Recursive arrow */}
        <path d="M 230 100 L 280 60 L 280 80 L 350 80" stroke="#4f46e5" strokeWidth="2" fill="none" strokeDasharray="4" markerEnd="url(#arrow)" />
        <text x="290" y="70" fontSize="12" fill="#4f46e5">-r</text>
        
        {/* Case-insensitive icon (Aa) */}
        <rect x="400" y="40" width="140" height="50" rx="8" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="415" y="70" fontSize="22" fontWeight="bold" fill="#4f46e5">Aa</text>
        <text x="440" y="70" fontSize="14" fill="#4f46e5">case-insensitive (-i)</text>
        
        {/* Animated magnifying glass scanning folders */}
        <circle cx="480" cy="230" r="25" stroke="#f59e0b" strokeWidth="2.5" fill="none">
          <animate attributeName="cx" values="480;530;480" dur="5s" repeatCount="indefinite" />
        </circle>
        <line x1="498" y1="248" x2="520" y2="275" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="x1" values="498;548;498" dur="5s" repeatCount="indefinite" />
          <animate attributeName="y1" values="248;248;248" dur="5s" repeatCount="indefinite" />
        </line>
        
        <text x="440" y="290" fontSize="13" fill="#f59e0b" textAnchor="middle">Recursive discovery</text>
        
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5" />
          </marker>
        </defs>
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
        {/* Header */}
        <div className="reveal-section text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
            Case-insensitive & Recursive Search
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Extend grep's power: search across entire projects regardless of case, dive into directories recursively, and filter with include/exclude patterns.
          </p>
        </div>

        {/* SVG Concept Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <OptionsIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">📜 Prototype / Signature</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-amber-600 dark:text-amber-400 block">grep -i PATTERN [FILE...]       # Case-insensitive</code>
            <code className="text-amber-600 dark:text-amber-400 block">grep -r PATTERN [DIRECTORY]      # Recursive search</code>
            <code className="text-amber-600 dark:text-amber-400 block">grep -ri PATTERN [DIRECTORY]     # Combined</code>
            <code className="text-amber-600 dark:text-amber-400 block">grep -r --include="*.js" PATTERN .   # Include patterns</code>
            <code className="text-amber-600 dark:text-amber-400 block">{`grep -r --exclude-dir={node_modules,.git} PATTERN .`}</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit status 0 if matches found, 1 if none, &gt 1 on error; prints matching lines with optional filenames/line numbers.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To find patterns across entire codebases, configuration trees, or log directories without worrying about letter case, and to filter which files/directories are searched.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Deep Dive: Case-Insensitive & Recursive Search</h2>
          <p className="mb-3"><strong>Case-insensitive (-i):</strong> By default grep treats 'Error' and 'error' as different. The <code>-i</code> flag folds case distinctions, matching regardless of uppercase/lowercase. Essential when working with human-generated logs, configuration files, or when case is not guaranteed.</p>
          <p className="mb-3"><strong>Recursive (-r, -R):</strong> Instead of searching a single file, recursively traverses directories. <code>-r</code> skips symbolic links (safe), <code>-R</code> follows them (risky but thorough). Combined with <code>--include</code> and <code>--exclude-dir</code>, you can precisely target your search.</p>
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border-l-4 border-amber-500">
            <p className="text-sm"><strong>Real-world scenario at Barrackpore IT Park:</strong> 
            A developer needs to find all usages of a deprecated function 
            <code>getData()</code> across a React project with 200+ files, ignoring <code>node_modules</code> and <code>dist</code>
            . The command: <code className="bg-gray-200 dark:bg-gray-700 px-1">{`grep -r --exclude-dir={node_modules,dist} 'getData' src/`}</code>. 
            Also case may vary: <code>GetData</code>, <code>GETDATA</code> → add <code>-i</code>.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Scripts: -i, -r, --include, --exclude</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={caseInsensitiveScript} title="🔍 Case-Insensitive (-i)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={recursiveBasicScript} title="📂 Basic Recursive (-r)" highlightLines={[12,17]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={recursiveAdvancedScript} title="🎯 Include/Exclude Patterns" highlightLines={[12,17,22]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={directoryActionsScript} title="📁 Directory Actions (-d)" highlightLines={[12,16,20]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={smartCaseScript} title="🧠 Smart Combinations" highlightLines={[14,20,25]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks and Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Speed up recursive grep:</strong> Use <code>--exclude-dir=.git --exclude-dir=node_modules</code> to skip heavy folders.</li>
              <li><strong>Case-insensitive whole word:</strong> <code>grep -iw 'error'</code> matches whole word error regardless of case.</li>
              <li><strong>List all files containing pattern:</strong> <code>grep -rl 'TODO' .</code> – great for refactoring.</li>
              <li><strong>Use <code>-n</code> with recursion:</strong> <code>grep -rn 'pattern'</code> gives filename:linenumber.</li>
              <li><strong>Combine <code>-L</code> and <code>-r</code>:</strong> <code>grep -rL '#!/bin/bash' scripts/</code> finds scripts without shebang.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls & Misconceptions</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Forgetting -r:</strong> <code>grep pattern directory/</code> gives "Is a directory" error.</li>
              <li><strong>Not quoting globs:</strong> <code>--include=*.js</code> without quotes may be expanded by shell. Use <code>--include='*.js'</code>.</li>
              <li><strong>Case sensitivity surprise:</strong> New users often expect grep to be case-insensitive by default – it's not.</li>
              <li><strong>Overlooking symlinks:</strong> Using <code>-r</code> may miss files under symlinked directories; use <code>-R</code> intentionally.</li>
              <li><strong>Slow search on root:</strong> Recursively searching <code>/</code> without <code>{`--exclude-dir={proc,sys,dev}`}</code> will hang or produce errors.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Mini Checklist */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices & Beginner-Safe Habits</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always quote include/exclude glob patterns to prevent shell expansion.</p>
              <p>✔️ Use <code>--exclude-dir</code> for version control and build directories to save time.</p>
              <p>✔️ Combine <code>-ri</code> (order doesn't matter) but keep long options after short ones for readability.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ When testing, first run <code>ls | grep -r</code> on a small test directory to confirm scope.</p>
              <p>✔️ Use <code>grep -r --color=always</code> to visually confirm matches.</p>
              <p>✔️ Set alias <code>{`alias grepr='grep -r --exclude-dir={.git,node_modules}'`}</code> for daily use.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can search case-insensitively with <code>-i</code>.</li>
              <li>☐ I can recursively search directories with <code>-r</code>.</li>
              <li>☐ I can combine <code>-i</code> and <code>-r</code> as <code>-ri</code>.</li>
              <li>☐ I know how to include only certain file types (<code>--include</code>).</li>
              <li>☐ I know how to exclude directories (<code>--exclude-dir</code>).</li>
              <li>☐ I can show only filenames (<code>-l</code>) or line numbers (<code>-n</code>) in recursive search.</li>
              <li>☐ I understand the difference between <code>-r</code> and <code>-R</code>.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">Observe: When you run <code>grep -r 'error' .</code> in a large project, it might also search inside <code>.git</code> and <code>node_modules</code>. What would happen if you added <code>--exclude-dir=.git --exclude-dir=node_modules</code>? Try modifying a recursive search to skip backup files (<code>--exclude='*.bak'</code>). Why might you want to use <code>-I</code> to ignore binary files? Think about the difference in speed and output.</p>
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
                <p><strong>🎓 Teacher's Advice for Case-Insensitive & Recursive grep:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Shyamnagar High School, students learn to search their entire coding assignment folder with <code>grep -ri 'TODO' .</code> to find incomplete tasks. This builds project management skills."</li>
                  <li>Always demonstrate the danger of <code>-R</code> on a directory with symlinks to avoid confusion.</li>
                  <li>Encourage creating a small test directory tree to experiment with include/exclude before running on real projects.</li>
                  <li>Classroom exercise: Provide a messy log directory with mixed case 'Error', 'ERROR', 'error' and ask students to count all occurrences with <code>-i</code>.</li>
                </ul>
                <p className="mt-2 italic text-sm">"Recursive grep turned me from a casual terminal user into a power user. Master these options and you'll navigate any codebase like a pro." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section with 30 questions */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ Case-Insensitive & Recursive grep — 30 Expert FAQs" questions={grepOptionsFaqs} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 2: Case-Insensitive and Recursive Search — grep Beyond Single Files
        </div>
      </div>
    </div>
  );
};

export default Topic2;