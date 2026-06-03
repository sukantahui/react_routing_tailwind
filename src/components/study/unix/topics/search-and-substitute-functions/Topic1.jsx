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
// Main Component: Topic1 - Advanced Pattern Matching with Regular Expressions
// ============================================================

const Topic1 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Example scripts (simulating separate .sh files)
  const basicRegexScript = `#!/bin/bash
# basic_regex.sh - Metacharacters in practice
echo "Sample data:"
cat <<EOF > sample.txt
apple
apple pie
applesauce
pineapple
EOF

echo "1) Lines containing 'apple' as a whole word:"
grep -w 'apple' sample.txt

echo "2) Lines starting with 'app':"
grep '^app' sample.txt

echo "3) Lines ending with 'e':"
grep 'e$' sample.txt

echo "4) Any character between 'a' and 'e' (a.e):"
grep 'a.e' sample.txt
`;

  const quantifiersScript = `#!/bin/bash
# quantifiers.sh - *, +, ?, {n}
cat <<EOF > codes.txt
ID: 42
ID: 7
ID: 123
ID: 9999
CODE: A-42
CODE: B-7X
EOF

echo "IDs with exactly 2 digits:"
grep -E 'ID: [0-9]{2}' codes.txt

echo "IDs with 1 or more digits:"
grep -E 'ID: [0-9]+' codes.txt

echo "Optional hyphen:"
grep -E 'CODE: [A-Z]-?[0-9]+' codes.txt
`;

  const characterClassesScript = `#!/bin/bash
# char_classes.sh - Character classes and negation
cat <<EOF > contacts.txt
John: 555-1234
Jane: 555-5678
Mike: 555-90AB
Sarah: 555-!@#$
EOF

echo "Phone numbers with only digits and hyphen:"
grep -E '[0-9-]+' contacts.txt

echo "Invalid phone numbers (non-digit/non-hyphen):"
grep -E '[^0-9-]' contacts.txt

echo "Names starting with J:"
grep '^[J]' contacts.txt
`;

  const groupingAlternationScript = `#!/bin/bash
# grouping_alternation.sh - ( ) and |
cat <<EOF > fruits.txt
color: red apple
color: green apple
color: yellow banana
fruit: orange
fruit: kiwi
EOF

echo "Either 'apple' or 'banana':"
grep -E '(apple|banana)' fruits.txt

echo "Lines with 'color:' followed by red or green:"
grep -E 'color: (red|green)' fruits.txt

# Backreference example
echo "Repeated word detection:"
echo "hello hello world" | grep -E '([a-z]+) \\1'
`;

  const emailRegexScript = `#!/bin/bash
# email_regex.sh - Practical email pattern
cat <<EOF > emails.txt
user@example.com
first.last@domain.co.uk
invalid@domain
name@.com
EOF

echo "Valid email addresses (simplified):"
grep -E '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' emails.txt
`;

  // 30 FAQ on regular expressions (focused on grep)
  const regexFaqs = [
    { question: "What is the difference between basic and extended regex in grep?", shortAnswer: "Basic regex (default) requires escaping of ?, +, {, |, (, ). Extended (-E) treats them as special.", explanation: "In basic regex, use '\\?' for optional, '\\+' for one-or-more, '\\{' for quantifiers. Extended regex makes syntax cleaner.", hint: "Use 'grep -E' for modern regex habits.", level: "intermediate", codeExample: "grep -E 'colou?r' file.txt   # extended\ngrep 'colou\\?r' file.txt   # basic" },
    { question: "How does the dot (.) metacharacter work?", shortAnswer: "Matches any single character except newline.", explanation: "Useful for wildcard matching. To match literal dot, escape it: '\\.'", hint: "Think of . as a placeholder for one character.", level: "basic", codeExample: "echo 'cat' | grep 'c.t'   # matches\n echo 'cot' | grep 'c.t'   # also matches" },
    { question: "What does the caret (^) and dollar ($) anchor do?", shortAnswer: "^ matches start of line, $ matches end of line.", explanation: "Anchors restrict matches to line boundaries. Crucial for precise pattern matching.", hint: "Use ^pattern to find lines that begin with pattern, pattern$ for endings.", level: "basic", codeExample: "grep '^ERROR' log.txt   # lines starting with ERROR\ngrep 'done$' script.sh   # lines ending with done" },
    { question: "What is the difference between * and + quantifiers?", shortAnswer: "* matches zero or more, + matches one or more.", explanation: "* can match nothing, + requires at least one occurrence of preceding element.", hint: "Use + when the pattern must exist at least once.", level: "intermediate", codeExample: "grep -E 'go*gle'   # matches gogle, google, gooogle\ngrep -E 'go+gle'   # matches google, gooogle (NOT gogle)" },
    { question: "How to match a specific number of repetitions?", shortAnswer: "Use {n}, {n,}, {n,m} quantifiers.", explanation: "{3} exactly 3, {2,} at least 2, {1,3} between 1 and 3.", hint: "Requires -E or escaping in basic regex.", level: "advanced", codeExample: "grep -E '[0-9]{3}-[0-9]{4}'   # phone like 123-4567" },
    { question: "What are character classes and how to use them?", shortAnswer: "[abc] matches a, b, or c. [^abc] matches anything except a,b,c.", explanation: "Also ranges: [a-z], [A-Z], [0-9]. Predefined classes: [[:digit:]], [[:alpha:]], etc.", hint: "Combine ranges: [A-Za-z0-9_].", level: "intermediate", codeExample: "grep '[0-9]' file   # any digit\ngrep '[^0-9]' file  # non-digit" },
    { question: "How to match whitespace characters?", shortAnswer: "Use [[:space:]] or \\s (if -P enabled).", explanation: "Space, tab, newline, etc. Portable: [[:space:]] works everywhere.", hint: "For tab specifically, use $'\\t'.", level: "advanced", codeExample: "grep '[[:space:]]' file    # any whitespace" },
    { question: "What are word boundaries and how to use them?", shortAnswer: "\\< and \\> for start/end of word, or \\b with -P.", explanation: "In basic grep, use \\<word\\> to match whole word. Equivalent to grep -w.", hint: "Word boundaries prevent partial matches.", level: "advanced", codeExample: "grep '\\<the\\>' file   # matches 'the' not 'then'" },
    { question: "How to match alternatives (OR) in grep?", shortAnswer: "Use | with -E, or multiple -e options.", explanation: "Alternation allows matching one of several patterns.", hint: "Group with parentheses for complex alternatives.", level: "intermediate", codeExample: "grep -E 'error|warning|fail' log.txt" },
    { question: "What are backreferences and capturing groups?", shortAnswer: "\\1, \\2 refer to matched groups inside the same pattern.", explanation: "Useful for finding repeated words, swapping patterns, etc.", hint: "Groups are defined by parentheses. Requires -E.", level: "expert", codeExample: "grep -E '([a-z]+) \\1' file   # repeated word" },
    { question: "How to match literal metacharacters like ., *, [, etc.?", shortAnswer: "Escape them with backslash: \\. \\* \\[", explanation: "Inside character classes, most lose special meaning except ^, -, ].", hint: "Use grep -F for fixed strings to avoid escaping.", level: "intermediate", codeExample: "grep '\\.' file   # matches literal dot" },
    { question: "What is the difference between greedy and lazy quantifiers?", shortAnswer: "Default quantifiers are greedy (match as much as possible). Lazy (*?) not supported in basic/extended grep.", explanation: "For lazy matching, need -P (PCRE) or restructure regex.", hint: "Workaround: use [^...]* instead of .*?", level: "expert", codeExample: "grep -P 'a.*?b'   # non-greedy (requires -P)" },
    { question: "How to match a pattern that spans multiple lines?", shortAnswer: "Standard grep works line-by-line. Use -z to treat file as NUL-separated.", explanation: "-z allows matching across newlines by reading whole file at once.", hint: "Combine with '\\n' in pattern (requires -P or -z).", level: "expert", codeExample: "grep -z 'start.*\\n.*end' multiline.txt" },
    { question: "How to use POSIX character classes in grep?", shortAnswer: "[:alnum:], [:alpha:], [:digit:], [:lower:], [:upper:], [:punct:], [:space:] etc.", explanation: "Must be inside double brackets: [[:digit:]]", hint: "Portable across Unix systems.", level: "advanced", codeExample: "grep '[[:alpha:]]' file   # any letter" },
    { question: "What does the ? quantifier mean?", shortAnswer: "Makes preceding element optional (0 or 1 occurrence).", explanation: "Example: 'colou?r' matches 'color' and 'colour'.", hint: "Use with -E or escape in basic: 'colou\\?r'.", level: "basic", codeExample: "grep -E 'https?' file   # http or https" },
    { question: "How to match a pattern only if followed by something (lookahead)?", shortAnswer: "Lookahead (?=...) is not supported in basic/extended grep.", explanation: "Use -P (PCRE) for lookahead/lookbehind.", hint: "Use multiple greps piped together as workaround.", level: "expert", codeExample: "grep -P 'foo(?=bar)' file   # 'foo' only if followed by 'bar'" },
    { question: "How to match uppercase or lowercase with regex?", shortAnswer: "Use [A-Z] or [[:upper:]] or combine with -i flag.", explanation: "Case-insensitive flag -i is often simpler than writing both cases.", hint: "Let -i handle case, regex handle pattern structure.", level: "basic", codeExample: "grep -i 'error' file   # case-insensitive" },
    { question: "How to escape a forward slash / in regex when using sed? (grep context)", shortAnswer: "grep doesn't require escaping /, but if used in sed, use different delimiter.", explanation: "In grep, '/' is not special. No escaping needed.", hint: "But in sed, use '\\/' or alternate delimiter like '|'.", level: "intermediate", codeExample: "grep '/home/user' file   # fine" },
    { question: "What is the difference between ( ) in basic vs extended?", shortAnswer: "Basic: \\( \\) for grouping and backref; Extended: ( ) is special.", explanation: "Remember to escape parentheses in basic regex.", hint: "Use -E to avoid confusing backslashes.", level: "advanced", codeExample: "grep '\\(abc\\)' file   # basic\ngrep -E '(abc)' file   # extended" },
    { question: "How to debug complex regular expressions?", shortAnswer: "Use grep --color=always to see matches, test stepwise.", explanation: "Start with simple parts and add complexity incrementally.", hint: "Use online regex testers for visual feedback.", level: "professional", codeExample: "echo 'test123' | grep --color 'test[0-9]+'" },
    { question: "How to match a pattern that contains newline using only grep?", shortAnswer: "Not possible with standard grep without -z.", explanation: "grep reads line by line, so pattern with \\n will never match.", hint: "Use awk or sed for multiline patterns.", level: "expert", codeExample: "# Not possible" },
    { question: "What does the -P flag give me?", shortAnswer: "Perl-compatible regex (PCRE) with advanced features: \\d, \\s, \\w, lookarounds, non-greedy.", explanation: "Not available on all platforms (GNU grep only).", hint: "Use with caution for portability.", level: "expert", codeExample: "grep -P '\\d{3}-\\d{4}' file" },
    { question: "How to match one or the other but not both?", shortAnswer: "Use alternation and anchors: ^(pattern1|pattern2)$", explanation: "For lines that contain either pattern exclusively, you may need additional logic.", hint: "Combine with -v to invert.", level: "advanced", codeExample: "grep -E '^(error|warning)$' file" },
    { question: "What is the performance impact of complex regex?", shortAnswer: "Exponential backtracking possible with nested quantifiers.", explanation: "Avoid .* inside .* or overlapping groups on large files.", hint: "Use specific character classes instead of .* for speed.", level: "expert", codeExample: "# Slow: .*a.*b.*c. Fast: [^a]*a[^b]*b[^c]*c" },
    { question: "How to handle large numbers with regex?", shortAnswer: "Use quantifiers like [0-9]{1,3} for numbers 0-999.", explanation: "No numeric comparisons, just pattern matching.", hint: "For numeric range, it's often easier to use awk.", level: "intermediate", codeExample: "grep -E '[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}' ip.txt" },
    { question: "What are locale-dependent character class issues?", shortAnswer: "[a-z] may not match only a-z in some locales.", explanation: "Set LC_ALL=C for ASCII-only behavior.", hint: "Use [[:lower:]] for portability.", level: "expert", codeExample: "LC_ALL=C grep '[A-Z]' file" },
    { question: "How to match IP addresses accurately with regex?", shortAnswer: "Complex but possible: ([0-9]{1,3}\\.){3}[0-9]{1,3}", explanation: "This matches any 1-3 digits, but doesn't validate 0-255 range.", hint: "Use external validation for precise IP check.", level: "advanced", codeExample: "grep -E '([0-9]{1,3}\\.){3}[0-9]{1,3}' file" },
    { question: "What's the difference between grep and egrep?", shortAnswer: "egrep is deprecated, same as grep -E.", explanation: "Modern scripts use grep -E for extended regex.", hint: "Use grep -E for clarity.", level: "basic", codeExample: "egrep 'pattern' file   # old\ngrep -E 'pattern' file  # new" },
    { question: "How to match a pattern only at the beginning of a word?", shortAnswer: "Use \\< or [[:<:]]", explanation: "Left word boundary. Also can use (^|[^a-zA-Z])pattern but messy.", hint: "grep -w might be simpler for whole words.", level: "intermediate", codeExample: "grep '\\<part' file   # matches 'part', 'partial', not 'depart'" },
    { question: "How to make regex case-insensitive only for part of pattern?", shortAnswer: "Not directly in classic grep; use -i for whole pattern or multiple patterns.", explanation: "You may use character classes [Ee][Rr][Rr][Oo][Rr] but very verbose.", hint: "Simplify by using -i and precise anchors.", level: "advanced", codeExample: "grep -i '^error' file   # case-insensitive only at start" }
  ];

  // SVG Illustration for regex concepts
  const RegexIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="550" height="300" viewBox="0 0 550 300" className="w-full max-w-md h-auto">
        <rect width="550" height="300" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        {/* Input string */}
        <text x="30" y="40" fontSize="16" fill="#1e293b" className="dark:fill-gray-200">Input: The quick brown fox jumps over the lazy dog.</text>
        {/* Regex pattern with highlight */}
        <rect x="30" y="70" width="280" height="32" rx="6" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
        <text x="40" y="92" fontSize="16" fontFamily="monospace" fill="#4f46e5">Pattern: ^The .*fox.*dog\.$</text>
        {/* Animated scanning eye */}
        <circle cx="130" cy="180" r="30" fill="#cbd5e1" className="dark:fill-gray-600" opacity="0.6">
          <animate attributeName="cx" values="130;420;130" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="130" cy="180" r="12" fill="#1e293b" className="dark:fill-white">
          <animate attributeName="cx" values="130;420;130" dur="6s" repeatCount="indefinite" />
        </circle>
        {/* Explanation boxes */}
        <rect x="30" y="220" width="150" height="50" rx="6" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="40" y="240" fontSize="12" fill="#166534" className="dark:fill-green-300">^ → start of line</text>
        <text x="40" y="258" fontSize="12" fill="#166534" className="dark:fill-green-300">.* → anything</text>
        <rect x="200" y="220" width="150" height="50" rx="6" fill="#fef9c3" className="dark:fill-yellow-900/40" />
        <text x="210" y="240" fontSize="12" fill="#854d0e" className="dark:fill-yellow-300">fox → literal string</text>
        <text x="210" y="258" fontSize="12" fill="#854d0e" className="dark:fill-yellow-300">\.$ → literal dot + end</text>
        <rect x="370" y="220" width="150" height="50" rx="6" fill="#ffe4e6" className="dark:fill-rose-900/40" />
        <text x="380" y="240" fontSize="12" fill="#9f1239" className="dark:fill-rose-300">Quantifiers & Anchors</text>
        <text x="380" y="258" fontSize="12" fill="#9f1239" className="dark:fill-rose-300">Are the foundation.</text>
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400">
            Advanced Pattern Matching with Regular Expressions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master regex metacharacters, quantifiers, groups, and character classes to supercharge your grep searches.
          </p>
        </div>

        {/* SVG Concept Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <RegexIllustration />
        </div>

        {/* Prototype / Signature */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">📜 grep with Regular Expressions</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
            <code className="text-indigo-600 dark:text-indigo-400">grep [OPTIONS] 'REGEX_PATTERN' [FILE...]</code>
            <br />
            <code className="text-indigo-600 dark:text-indigo-400 text-xs"># Extended regex (recommended)</code>
            <br />
            <code className="text-indigo-600 dark:text-indigo-400">grep -E 'pattern' file</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit status 0/1/2, prints matching lines.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To search for complex, flexible text patterns beyond fixed strings. Used for data validation, log parsing, code analysis, and text mining.</p>
          <p className="mt-2"><span className="font-semibold">When & Why:</span> When you need to find emails, IP addresses, dates, or any structured pattern in text — regex is the universal language of pattern matching.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 Building Blocks of Regular Expressions</h2>
          <p className="mb-3">A regular expression is a sequence of characters defining a search pattern. Think of it as a mini-programming language for text. For example, <code className="bg-gray-200 dark:bg-gray-700 px-1">^[A-Z][a-z]*$</code> matches a capitalized word.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border-l-4 border-indigo-500 pl-3">
              <p className="font-bold">Metacharacters</p>
              <p className="text-sm">. ^ $ * + ? { } [ ] \ | ( )</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <p className="font-bold">Character classes</p>
              <p className="text-sm">[aeiou] [0-9] [[:digit:]] [^a-z]</p>
            </div>
            <div className="border-l-4 border-pink-500 pl-3">
              <p className="font-bold">Quantifiers</p>
              <p className="text-sm">{`* (0+) + (1+) ? (0/1) {n} {n,} {n,m}`}</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-3">
              <p className="font-bold">Grouping & Alternation</p>
              <p className="text-sm">(group)  |  (pattern1|pattern2)</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
            <p className="text-sm"><strong>Real-world scenario:</strong> At Shyamnagar High School, a teacher has a file of student emails from different domains. To find all Gmail addresses: <code className="bg-gray-200 dark:bg-gray-700 px-1">grep -E '[a-z.]+@gmail\.com' students.txt</code>. Or to find marks between 80 and 100: <code className="bg-gray-200 dark:bg-gray-700 px-1">grep -E ' (8[0-9]|9[0-9]|100)' marks.txt</code> — a regex that handles the numeric range.</p>
          </div>
        </div>

        {/* Shell Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Practical Scripts: regex in grep</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={basicRegexScript} title="🔤 Basic Metacharacters (^, ., $)" highlightLines={[6,9,12,15]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={quantifiersScript} title="🔁 Quantifiers: *, +, ?, {n}" highlightLines={[7,12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={characterClassesScript} title="📚 Character Classes & Negation" highlightLines={[10,14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={groupingAlternationScript} title="🔗 Grouping () and Alternation |" highlightLines={[8,12,19]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={emailRegexScript} title="📧 Practical: Email Validation Pattern" highlightLines={[8]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Professional Tips</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Always quote your regex:</strong> Use single quotes to prevent shell expansion.</li>
              <li><strong>Color is your friend:</strong> <code>grep --color=always</code> to see exactly what matches.</li>
              <li><strong>Test with echo first:</strong> <code>echo "sample" | grep -E 'pattern'</code></li>
              <li><strong>Use -o to extract only the match:</strong> Great for scraping.</li>
              <li><strong>Prefer -E over backslash hell:</strong> Modern scripts use <code>grep -E</code>.</li>
              <li><strong>Set LC_ALL=C</strong> for consistent [a-z] behavior across locales.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li>Forgetting to escape <code>.</code> when you mean literal dot → <code>\.</code></li>
              <li>Using <code>.*</code> greedily matches too much; leads to unexpected results.</li>
              <li>Not using <code>^</code> and <code>$</code> anchors → matches substring anywhere.</li>
              <li>Confusing character class negation <code>[^abc]</code> with line start <code>^</code> outside brackets.</li>
              <li>Assuming <code>\d</code> works (requires <code>-P</code>). Use <code>[0-9]</code> or <code>[[:digit:]]</code> for portability.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices & Clean Code Habits</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Write regex from specific to general: start with literal strings, then add wildcards.</p>
              <p>✔️ Break complex regex into pieces using <code>grep</code> pipes or <code>--color</code>.</p>
              <p>✔️ Use comments in scripts with <code>#</code> to explain what the regex does.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Store reusable regex patterns in environment variables.</p>
              <p>✔️ Validate regex with online testers (regex101) before deploying.</p>
              <p>✔️ Prefer <code>grep -F</code> for fixed strings for performance.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I understand the difference between basic and extended regex.</li>
              <li>☐ I can match start (^) and end ($) of lines.</li>
              <li>{`☐ I can use quantifiers *, +, ?, {n} with -E.`}</li>
              <li>☐ I can create character classes [a-z] and negated [^a-z].</li>
              <li>☐ I can group with () and alternate with |.</li>
              <li>☐ I can escape metacharacters to match them literally.</li>
              <li>☐ I can apply regex to real data (emails, dates, IPs).</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">Observe: to match a phone number like "555-1234", you need digits and a hyphen. Try <code>grep -E '[0-9]{3}-[0-9]{4}'</code>. What happens if you forget the hyphen? How would you also match numbers without hyphen like "5551234"? Try changing <code>-</code> to <code>-?</code> (optional hyphen). Can you construct a regex that matches only valid dates in DD/MM/YYYY format?</p>
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
                <p><strong>🎓 Teacher's Advice for Regular Expressions:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"Regex is like a puzzle: every piece (metacharacter) matters. Practice by writing patterns for student roll numbers (e.g., 'R001' to 'R999')."</li>
                  <li>Encourage students to build a "regex library" for common patterns: email, URLs, phone, dates.</li>
                  <li>Use the <code>grep -o</code> flag to extract matches — a skill used in data science and log analysis.</li>
                  <li>Debugging: run <code>grep --color</code> and watch the highlighting — often reveals misunderstanding of quantifiers.</li>
                </ul>
                <p className="mt-2 italic text-sm">"At Barrackpore, students who master regex become terminal wizards. Remember: 'Some people, when confronted with a problem, think "I know, I'll use regular expressions." Now they have two problems.' — but with practice, you will overcome!" — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ Regular Expressions in grep — 30 Expert FAQs" questions={regexFaqs} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 1: Advanced Pattern Matching — Unlock the Power of grep with Regular Expressions
        </div>
      </div>
    </div>
  );
};

export default Topic1;