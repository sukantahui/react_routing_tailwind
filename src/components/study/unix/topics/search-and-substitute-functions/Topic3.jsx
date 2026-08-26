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
// Main Component: Topic3 - Substitution using sed command
// ============================================================

const Topic3 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Example scripts (simulating separate .sh files)
  const basicSubstitutionScript = `#!/bin/bash
# basic_substitution.sh - Simple sed replacement
cat > hello.txt <<EOF
Hello world
Hello universe
Hello galaxy
EOF

echo "Original file:"
cat hello.txt

echo -e "\\nReplace 'Hello' with 'Hi' (output only):"
sed 's/Hello/Hi/' hello.txt

echo -e "\\nFile unchanged:"
cat hello.txt

echo -e "\\nIn-place edit (modify file):"
sed -i 's/Hello/Hi/' hello.txt
cat hello.txt
`;

  const globalSubstitutionScript = `#!/bin/bash
# global_substitution.sh - Using /g flag
cat > song.txt <<EOF
Na na na na na na
Na na na na
Na na na na na na na na
EOF

echo "Default (only first per line):"
sed 's/na/la/' song.txt

echo -e "\\nGlobal (every occurrence):"
sed 's/na/la/g' song.txt

echo -e "\\nReplace 2nd occurrence only:"
sed 's/na/la/2' song.txt
`;

  const addressRangeScript = `#!/bin/bash
# address_range.sh - Apply substitution on specific lines
cat > data.csv <<EOF
Name,Score,Grade
Swadeep,85,A
Tuhina,92,A+
Abhronila,78,B
Debangshu,88,A
EOF

echo "Replace only line 3:"
sed '3 s/A/B/' data.csv

echo -e "\\nReplace from line 2 to end:"
sed '2,$ s/A/A+/' data.csv

echo -e "\\nReplace only lines containing 'Swadeep':"
sed '/Swadeep/s/85/95/' data.csv
`;

  const regexSubstitutionScript = `#!/bin/bash
# regex_substitution.sh - Using regex in pattern
cat > contacts.txt <<EOF
John: 555-1234
Jane: 555-5678
Mike: 555-9012
EOF

echo "Capture groups: swap name and number"
sed -E 's/([A-Z][a-z]+): ([0-9-]+)/Number: \\2, Name: \\1/' contacts.txt

echo -e "\\nRedact phone numbers:"
sed 's/[0-9]\\{3\\}-[0-9]\\{4\\}/XXX-XXXX/g' contacts.txt
`;

  const inplaceBackupScript = `#!/bin/bash
# inplace_backup.sh - Safe in-place editing
cat > config.ini <<EOF
DEBUG=false
PORT=3000
HOST=localhost
EOF

echo "Original config:"
cat config.ini

echo -e "\\nEdit in-place with backup (-i.bak):"
sed -i.bak 's/DEBUG=false/DEBUG=true/' config.ini

echo "New config:"
cat config.ini

echo "Backup created:"
ls config.ini*
`;

  // 30 FAQ focused on sed substitution
  const sedFaqs = [
    { question: "What is the basic syntax for sed substitution?", shortAnswer: "sed 's/pattern/replacement/' file", explanation: "s stands for substitute. The first delimiter (/) separates pattern, replacement, and flags.", hint: "You can use other delimiters like | or # if / is in pattern.", level: "basic", codeExample: "sed 's/old/new/' file.txt" },
    { question: "How to replace all occurrences on each line?", shortAnswer: "Add the /g flag: sed 's/old/new/g'", explanation: "Without g, only first match per line is replaced.", hint: "g stands for global.", level: "basic", codeExample: "echo 'a a a' | sed 's/a/b/g'   # b b b" },
    { question: "How to edit a file in-place (modify original)?", shortAnswer: "Use -i flag: sed -i 's/old/new/' file", explanation: "Without -i, sed outputs to stdout. -i changes the file directly.", hint: "Use -i.bak to create backup: sed -i.bak 's/old/new/' file", level: "intermediate", codeExample: "sed -i 's/foo/bar/' config.txt" },
    { question: "How to use different delimiters in sed?", shortAnswer: "Any character can be delimiter after s: s|old|new| or s#old#new#", explanation: "Useful when pattern or replacement contains slashes.", hint: "Avoid 'leaning toothpick syndrome': s/\\/usr\\/local/\\/opt/", level: "advanced", codeExample: "sed 's|/usr/local|/opt|' paths.txt" },
    { question: "How to restrict substitution to specific lines?", shortAnswer: "Prefix with line address: sed '3 s/old/new/' or '2,5 s/old/new/'", explanation: "Address can be line numbers, ranges, or patterns /regex/.", hint: "Combine with $ for last line: sed '$ s/old/new/'", level: "intermediate", codeExample: "sed '/^ERROR/ s/old/new/' log.txt" },
    { question: "What are backreferences in sed?", shortAnswer: "\\1, \\2 refer to captured groups using \\( \\) or -E ( ... )", explanation: "Capture groups store parts of the matched pattern for reuse.", hint: "Use -E for extended regex to avoid escaping parentheses.", level: "advanced", codeExample: "sed -E 's/([0-9]+)/Number: \\1/' file" },
    { question: "How to replace only the Nth occurrence on a line?", shortAnswer: "Use /N flag like /2 for second, /3 for third.", explanation: "sed 's/old/new/2' replaces second match per line.", hint: "Combine /g after number? /2g replaces from 2nd to end.", level: "expert", codeExample: "echo 'a a a' | sed 's/a/b/2'   # a b a" },
    { question: "How to make substitution case-insensitive?", shortAnswer: "Use /I flag (GNU sed): sed 's/old/new/I'", explanation: "I flag ignores case when matching pattern.", hint: "Not all sed versions support I; use [Oo][Ll][Dd] as workaround.", level: "advanced", codeExample: "sed 's/error/warning/I' log.txt" },
    { question: "How to print only substituted lines?", shortAnswer: "Use -n with /p flag: sed -n 's/old/new/p'", explanation: "-n suppresses auto-print, p prints matched lines.", hint: "Useful for filtering transformations.", level: "intermediate", codeExample: "sed -n 's/[0-9]//gp' file" },
    { question: "How to perform multiple substitutions in one sed command?", shortAnswer: "Separate with semicolon or use -e: sed 's/a/b/; s/c/d/' file", explanation: "Each substitution is applied in order.", hint: "Also can use -e 's/a/b/' -e 's/c/d/'.", level: "intermediate", codeExample: "sed 's/foo/bar/; s/baz/qux/' data.txt" },
    { question: "What does the & symbol do in replacement?", shortAnswer: "& represents the entire matched pattern.", explanation: "Useful for wrapping or modifying matched text.", hint: "Example: sed 's/[0-9]\\+/[&]/g' adds brackets around numbers.", level: "advanced", codeExample: "echo 'abc123' | sed 's/[0-9]\\+/[&]/'   # abc[123]" },
    { question: "How to replace newline characters with sed?", shortAnswer: "Sed works line-by-line; use 'N' or 'z' for multiline.", explanation: "Standard sed cannot match newline in pattern unless you read entire file.", hint: "For simple tasks, use tr or awk.", level: "expert", codeExample: "sed ':a;N;$!ba;s/\\n/ /g' file   # joins all lines" },
    { question: "How to delete lines matching a pattern using sed?", shortAnswer: "Use d command: sed '/pattern/d' file", explanation: "Deletes entire lines matching pattern. Not substitution but often used together.", hint: "Combine with ! to delete non-matching lines.", level: "intermediate", codeExample: "sed '/^#/d' config.txt   # remove comments" },
    { question: "How to restrict replacement to word boundaries?", shortAnswer: "Use \\< and \\> or [[:<:]] and [[:>:]]", explanation: "Word boundaries prevent partial matches (e.g., 'the' vs 'their').", hint: "grep -w equivalent in sed: sed 's/\\<the\\>/The/g'", level: "advanced", codeExample: "sed 's/\\<old\\>/new/g' file" },
    { question: "How to use variables in sed substitution?", shortAnswer: "Use double quotes: sed \"s/$old/$new/\" file", explanation: "Double quotes allow shell variable expansion, but beware of special characters.", hint: "Escape any / in variables with parameter expansion.", level: "advanced", codeExample: "old='foo'; new='bar'; sed \"s/$old/$new/\" file" },
    { question: "How to print line numbers before each line?", shortAnswer: "Use = command: sed '=' file", explanation: "= prints line number on separate line. To combine with text: sed '=' file | sed 'N;s/\\n/ /'", hint: "Alternative: cat -n or nl.", level: "intermediate", codeExample: "sed '=' file" },
    { question: "What is the difference between sed -i and output redirection?", shortAnswer: "-i modifies in-place; redirect > creates new file.", explanation: "Redirection: sed 's/old/new/' file > newfile. -i replaces original.", hint: "Always test with output before using -i.", level: "basic", codeExample: "# Safe: sed 's/old/new/' file > file.tmp && mv file.tmp file" },
    { question: "How to substitute only if pattern is found (conditional)?", shortAnswer: "Use t command (test) to branch after successful substitute.", explanation: "Advanced sed scripting: t label jumps if last s/// succeeded.", hint: "Not for beginners; use awk for complex logic.", level: "expert", codeExample: "sed ':a;s/foo/bar/;ta' file   # loop until no more foo" },
    { question: "How to replace text in a specific column (fixed width)?", shortAnswer: "Use regular expression to target column or use cut/paste.", explanation: "sed can match positions with ^.{n} pattern for column offset.", hint: "For CSV, use awk with field separators.", level: "advanced", codeExample: "sed 's/^\\(.\\{5\\}\\)old/\\1new/' file" },
    { question: "How to escape special characters in replacement string?", shortAnswer: "Backslash escapes: \\&, \\/, \\\\, etc.", explanation: "In replacement, & is special, / is delimiter, \\ is escape.", hint: "Use different delimiter to reduce escaping.", level: "advanced", codeExample: "sed 's|/home/user|/home/guest|' file   # no escape needed" },
    { question: "How to write sed script to a file and execute?", shortAnswer: "Use -f script.sed", explanation: "Store commands in .sed file, one per line.", hint: "Great for complex transformations.", level: "expert", codeExample: "echo 's/old/new/g' > rules.sed; sed -f rules.sed file" },
    { question: "What does the w flag do in substitution?", shortAnswer: "w filename writes the resulting line to a file.", explanation: "sed 's/pattern/replacement/w output.txt' file", hint: "Useful for extracting transformed lines.", level: "expert", codeExample: "sed 's/ERROR/WARNING/w errors.log' app.log" },
    { question: "How to substitute across multiple lines (sed multiline)?", shortAnswer: "Use N, P, D commands in pattern space.", explanation: "Complex; often easier to use awk or perl for multiline.", hint: "Example: sed '/start/,/end/ s/old/new/' works on range.", level: "expert", codeExample: "sed '/<tag>/,/<\\/tag>/ s/foo/bar/' file.xml" },
    { question: "How to perform arithmetic with sed substitutions?", shortAnswer: "Sed cannot do arithmetic; use awk or bc.", explanation: "Sed is text-only; for numbers, pipe to bc or use shell.", hint: "sed 's/[0-9]\\+/$((&+1))/e' requires GNU sed with e flag.", level: "expert", codeExample: "echo '5' | sed 's/[0-9]\\+/echo $((&+1))/e'   # 6 (GNU only)" },
    { question: "What are the differences between sed on macOS and GNU sed?", shortAnswer: "macOS sed is BSD: -i requires argument, -E for extended regex, no \\t, no \\s.", explanation: "GNU sed has more features: -i without backup, -z, -r, many escape sequences.", hint: "For portability, test on target system; use star or awk.", level: "expert", codeExample: "# macOS: sed -i '' 's/old/new/' file; GNU: sed -i 's/old/new/' file" },
    { question: "How to use sed to replace only empty lines?", shortAnswer: "sed '/^$/ s/.*/replacement/'", explanation: "Empty lines have no characters between ^ and $.", hint: "Or insert lines: sed '/^$/i\\New text'", level: "intermediate", codeExample: "sed '/^$/c\\--EMPTY--' file" },
    { question: "How to remove trailing whitespace with sed?", shortAnswer: "sed 's/[[:space:]]*$//' file", explanation: "Matches zero or more spaces/tabs at line end and replaces with nothing.", hint: "Combine with leading spaces: sed 's/^[[:space:]]*//; s/[[:space:]]*$//'", level: "basic", codeExample: "sed 's/[ \\t]*$//' file" },
    { question: "How to capitalize first letter of each word with sed?", shortAnswer: "sed -E 's/\\b([a-z])/\\U\\1/g'", explanation: "\\U converts to uppercase (GNU sed). For portability, use complex patterns.", hint: "This requires GNU sed; macOS sed may not support \\U.", level: "expert", codeExample: "echo 'hello world' | sed 's/\\b./\\u&/g'   # Hello World (GNU)" },
    { question: "How to handle very large files with sed substitution?", shortAnswer: "Sed is stream-oriented, handles any file size.", explanation: "sed reads line by line, so memory usage is low.", hint: "For in-place edit of huge file, sed -i creates temp file, requires disk space.", level: "advanced", codeExample: "sed -i 's/old/new/g' hugefile.txt   # works efficiently" },
    { question: "How to test sed commands without changing file?", shortAnswer: "Remove -i and observe output.", explanation: "Sed defaults to printing to stdout. Always test first.", hint: "Use head for sample: head -100 file | sed '...'", level: "basic", codeExample: "sed 's/old/new/' file   # preview" }
  ];

  // SVG Illustration for sed substitution
  const SedIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="340" viewBox="0 0 600 340" className="w-full max-w-md h-auto">
        <rect width="600" height="340" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Input line */}
        <text x="30" y="50" fontSize="16" fill="#1e293b" className="dark:fill-gray-200">Input:</text>
        <rect x="90" y="35" width="260" height="28" rx="4" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="100" y="55" fontSize="14" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">The quick brown fox jumps</text>
        
        {/* Pattern matching */}
        <text x="30" y="110" fontSize="16" fill="#1e293b" className="dark:fill-gray-200">Pattern:</text>
        <rect x="100" y="95" width="180" height="28" rx="4" fill="#fee2e2" className="dark:fill-red-900/30" />
        <text x="110" y="115" fontSize="14" fontFamily="monospace" fill="#dc2626">brown</text>
        
        {/* Arrow down */}
        <line x1="190" y1="130" x2="190" y2="170" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowDown)" />
        
        {/* Replacement */}
        <text x="30" y="195" fontSize="16" fill="#1e293b" className="dark:fill-gray-200">Replacement:</text>
        <rect x="130" y="180" width="140" height="28" rx="4" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="140" y="200" fontSize="14" fontFamily="monospace" fill="#16a34a">red</text>
        
        {/* Output line */}
        <text x="30" y="250" fontSize="16" fill="#1e293b" className="dark:fill-gray-200">Output:</text>
        <rect x="90" y="235" width="260" height="28" rx="4" fill="#cffafe" className="dark:fill-cyan-900/40" />
        <text x="100" y="255" fontSize="14" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">
          <tspan>The quick </tspan><tspan fill="#16a34a" fontWeight="bold">red</tspan><tspan> fox jumps</tspan>
        </text>
        
        {/* sed command badge */}
        <rect x="400" y="180" width="150" height="60" rx="8" fill="#4f46e5" />
        <text x="475" y="205" fontSize="16" fill="white" textAnchor="middle" fontFamily="monospace">sed</text>
        <text x="475" y="225" fontSize="12" fill="#c7d2fe" textAnchor="middle">'s/brown/red/'</text>
        
        {/* Animated glowing effect on match */}
        <rect x="170" y="95" width="80" height="28" rx="4" fill="none" stroke="#dc2626" strokeWidth="2">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </rect>
        
        <defs>
          <marker id="arrowDown" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            Substitution using sed Command
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master the stream editor: find and replace text, edit files in-place, and transform data streams with sed substitution.
          </p>
        </div>

        {/* SVG Concept Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <SedIllustration />
        </div>

        {/* Command Signature & Purpose */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">📜 sed Substitution Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
            <code className="text-green-600 dark:text-green-400">sed 's/pattern/replacement/flags' [file]</code>
            <br />
            <code className="text-green-600 dark:text-green-400 text-xs"># In-place edit (modify original file)</code>
            <br />
            <code className="text-green-600 dark:text-green-400">sed -i 's/old/new/g' file</code>
            <br />
            <code className="text-green-600 dark:text-green-400 text-xs"># With backup</code>
            <br />
            <code className="text-green-600 dark:text-green-400">sed -i.bak 's/old/new/' file</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exits with 0 unless error; prints transformed lines (or modifies file with -i).</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> Perform text replacements in streams or files. Used for configuration management, log sanitization, code refactoring, and data transformation pipelines.</p>
          <p className="mt-2"><span className="font-semibold">When & Why:</span> When you need to change all occurrences of a word in a file, update config values across multiple files, or transform data format (e.g., CSV to JSON-like). sed is non-interactive and scriptable.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How sed Substitution Works</h2>
          <p className="mb-3"><strong>The s command:</strong> sed's most famous command. Syntax: <code className="bg-gray-200 dark:bg-gray-700 px-1">s/pattern/replacement/</code> – pattern is a regular expression, replacement is text with optional backreferences.</p>
          <p className="mb-3"><strong>Flags:</strong> <code>g</code> (global, all occurrences per line), <code>N</code> (replace Nth occurrence), <code>p</code> (print line if substitution made), <code>i/I</code> (case-insensitive), <code>w file</code> (write to file).</p>
          <p className="mb-3"><strong>Addressing:</strong> You can restrict substitution to specific lines: <code>sed '3 s/old/new/'</code> (line 3), <code>sed '2,5 s/old/new/'</code> (lines 2-5), <code>sed '/pattern/ s/old/new/'</code> (lines matching pattern).</p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border-l-4 border-green-500">
            <p className="text-sm"><strong>Real-world scenario at Ichapur High School:</strong> A teacher has a class roster CSV but the column header "RollNo" should be "StudentID". A quick <code className="bg-gray-200 dark:bg-gray-700 px-1">sed -i '1 s/RollNo/StudentID/' students.csv</code> fixes it. Or at Shyamnagar IT Park, developers update database connection string across 50 config files: <code className="bg-gray-200 dark:bg-gray-700 px-1">sed -i 's/localhost:5432/dbprod:5432/g' *.env</code>.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Scripts: sed Substitution in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={basicSubstitutionScript} title="🔧 Basic Substitution & -i" highlightLines={[12,17,22]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={globalSubstitutionScript} title="🌍 Global Flag /g" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={addressRangeScript} title="📍 Line Addresses & Ranges" highlightLines={[14,18,23]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={regexSubstitutionScript} title="🔍 Regex & Capture Groups" highlightLines={[12,17]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={inplaceBackupScript} title="💾 Safe In-Place Editing with Backup" highlightLines={[14,18,23]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Test with <code>p</code> flag:</strong> <code>sed -n 's/pattern/replacement/p' file</code> shows only changed lines.</li>
              <li><strong>Different delimiters:</strong> Avoid backslash hell: <code>sed 's|/home/user|/home/guest|'</code></li>
              <li><strong>In-place backup:</strong> Always use <code>-i.bak</code> for critical files; delete backup after verification.</li>
              <li><strong>Multiple edits:</strong> Chain with <code>-e</code> or semicolons: <code>sed -e 's/foo/bar/' -e 's/baz/qux/'</code></li>
              <li><strong>Use <code>&amp;</code> to repeat match:</strong> <code>sed 's/[0-9]\\+/[&]/g'</code> puts brackets around numbers.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls & Misconceptions</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Forgetting <code>/g</code>:</strong> Only first occurrence per line changes – common source of bugs.</li>
              <li><strong>Slash delimiter conflict:</strong> Pattern containing <code>/</code> breaks command; switch delimiter.</li>
              <li><strong><code>-i</code> without backup on macOS:</strong> Requires <code>-i ''</code> (space followed by empty quotes).</li>
              <li><strong>Over-escaping in replacement:</strong> <code>&amp;</code> and <code>\\</code> are special; escape them.</li>
              <li><strong>Assuming <code>-i</code> creates backup automatically:</strong> It does not unless you specify suffix.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Mini Checklist */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices & Beginner-Safe Habits</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always preview changes before in-place edit: <code>sed 's/old/new/' file | head</code></p>
              <p>✔️ Use <code>-i.bak</code> for the first time on important files.</p>
              <p>✔️ Quote your sed expression with single quotes to prevent shell expansion.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Keep sed commands simple; for complex transforms, use awk or perl.</p>
              <p>✔️ Test regex with <code>grep</code> first: <code>grep -E 'pattern' file</code> then convert to sed.</p>
              <p>✔️ Use extended regex <code>-E</code> for cleaner patterns: <code>sed -E 's/([0-9]+)/Num:\\1/'</code></p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I understand the basic syntax: <code>s/pattern/replacement/</code></li>
              <li>☐ I can use <code>/g</code> to replace all occurrences on a line.</li>
              <li>☐ I can edit files in-place with <code>-i</code> (and backup with <code>-i.bak</code>).</li>
              <li>☐ I know how to restrict substitution to specific lines (address ranges).</li>
              <li>☐ I can use different delimiters when <code>/</code> is in pattern or replacement.</li>
              <li>☐ I can capture groups with <code>\(...\)</code> or <code>-E (...)</code> and use <code>\1</code>.</li>
              <li>☐ I can combine multiple sed commands with <code>-e</code> or semicolons.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">Observe: Running <code>sed 's/a/b/' file</code> prints changes but doesn't save them. What happens if you forget to redirect output or use <code>-i</code>? Try changing the delimiter from <code>/</code> to <code>|</code> when your pattern contains slashes (like file paths). Why would you use <code>&amp;</code> in the replacement? Can you construct a sed command that swaps the first and last word on each line?</p>
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
                <p><strong>🎓 Teacher's Advice for sed Substitution:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"When I taught at Naihati, students would often forget the <code>/g</code> flag and wonder why only one 'na' changed in 'na na na'. Demonstrate with a funny example."</li>
                  <li>Always emphasize the non-destructive nature of sed (without -i). Let students experiment fearlessly.</li>
                  <li>Practice exercise: Given a file of student names (Swadeep, Tuhina, etc.), transform to uppercase using sed with capture groups. Hint: <code>sed 's/.*/\\U&amp;/'</code> (GNU).</li>
                  <li>sed is the 'search and replace' of the terminal – master it and you'll never fear mass edits again.</li>
                </ul>
                <p className="mt-2 italic text-sm">"sed is the scalpel of text processing. Start with simple substitutions, then gradually add flags, addresses, and regex – you'll be performing text surgery in no time." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section with 30 questions */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ sed Substitution — 30 Expert FAQs" questions={sedFaqs} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 3: Substitution using sed — The Stream Editor Power Tool
        </div>
      </div>
    </div>
  );
};

export default Topic3;