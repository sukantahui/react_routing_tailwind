import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import trBasicScript from './topic12_files/tr_basic.sh?raw';
import trCaseConvertScript from './topic12_files/tr_case_convert.sh?raw';
import trDeleteScript from './topic12_files/tr_delete.sh?raw';
import trSqueezeScript from './topic12_files/tr_squeeze.sh?raw';
import trComplementScript from './topic12_files/tr_complement.sh?raw';
import trPracticalScript from './topic12_files/tr_practical.sh?raw';
import trAdvancedScript from './topic12_files/tr_advanced.sh?raw';
import questions from './topic12_files/topic12_questions.js';

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

// Main component: Topic 12
const Topic12 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: tr translation concept
  const TrIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="260" viewBox="0 0 600 260" className="w-full max-w-md h-auto">
        <rect width="600" height="260" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        {/* Input */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">Input:</text>
        <rect x="30" y="55" width="250" height="30" rx="4" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="40" y="75" fontSize="14" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Hello World 123</text>

        {/* tr command */}
        <rect x="330" y="55" width="240" height="30" rx="6" fill="#fef9c3" className="dark:fill-yellow-900/40" />
        <text x="450" y="75" fontSize="13" fontFamily="monospace" fill="#854d0e" textAnchor="middle">tr 'A-Za-z' 'N-ZA-Mn-za-m'</text>
        <text x="450" y="95" fontSize="11" fill="#854d0e" textAnchor="middle">(ROT13 cipher)</text>

        {/* Output */}
        <text x="30" y="140" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">Output:</text>
        <rect x="30" y="155" width="250" height="30" rx="4" fill="#dcfce7" className="dark:fill-green-900/30" />
        <text x="40" y="175" fontSize="14" fontFamily="monospace" fill="#16a34a">Uryyb Jbeyq 123</text>

        {/* Arrow animate */}
        <line x1="285" y1="70" x2="320" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowTr)">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
        </line>

        <defs>
          <marker id="arrowTr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400">
            Transformation of Text Using tr Command
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master `tr` – translate, delete, or squeeze characters for data cleaning, case conversion, and simple ciphers.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <TrIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 tr Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-cyan-600 dark:text-cyan-400">tr [OPTION]... SET1 [SET2]</code>
            <code className="text-cyan-600 dark:text-cyan-400"># Translate: replace characters in SET1 with corresponding characters in SET2</code>
            <code className="text-cyan-600 dark:text-cyan-400">tr 'abc' 'xyz' &lt; input.txt</code>
            <code className="text-cyan-600 dark:text-cyan-400"># Case conversion</code>
            <code className="text-cyan-600 dark:text-cyan-400">tr '[:lower:]' '[:upper:]'</code>
            <code className="text-cyan-600 dark:text-cyan-400"># Delete characters in SET1</code>
            <code className="text-cyan-600 dark:text-cyan-400">tr -d 'aeiou' &lt; input.txt</code>
            <code className="text-cyan-600 dark:text-cyan-400"># Squeeze repeated characters (replace multiple with one)</code>
            <code className="text-cyan-600 dark:text-cyan-400">tr -s ' ' &lt; input.txt</code>
            <code className="text-cyan-600 dark:text-cyan-400"># Complement: use characters NOT in SET1</code>
            <code className="text-cyan-600 dark:text-cyan-400">tr -c '[:digit:]' ' ' &lt; input.txt</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Exit 0 unless error; writes transformed text to stdout.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To perform character‑level transformations – ideal for cleaning data, changing case, removing unwanted characters, and normalising whitespace.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How tr Works</h2>
          <p className="mb-3"><strong>Translation (default):</strong> Each character in SET1 is replaced by the corresponding character in SET2. If SET2 is shorter, the last character of SET2 is repeated (or the behaviour depends on implementation).</p>
          <p className="mb-3"><strong>Deletion (`-d`):</strong> Removes all characters specified in SET1.</p>
          <p className="mb-3"><strong>Squeeze (`-s`):</strong> Reduces sequences of repeated characters in SET1 to a single occurrence.</p>
          <p className="mb-3"><strong>Complement (`-c`):</strong> Operates on the complement of SET1 (i.e., all characters not in SET1).</p>
          <div className="mt-4 p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg border-l-4 border-cyan-500">
            <p className="text-sm"><strong>Real‑world at Ichapur:</strong> A data analyst receives a file with inconsistent spacing and uppercase/lowercase names. She uses `tr -s ' '` to normalise spaces and `tr '[:upper:]' '[:lower:]'` to convert all to lowercase. Later, she uses `tr -d '[:punct:]'` to remove punctuation for word frequency analysis.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: tr in Action</h2>
          <div className="grid-cols-1 md:grid-cols-1 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={trBasicScript} title="🔤 Basic character translation" highlightLines={[10,14]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={trCaseConvertScript} title="🔠 Case conversion (lower ↔ upper)" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={trDeleteScript} title="✂️ Deleting characters (-d)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={trSqueezeScript} title="⏲️ Squeeze repeats (-s)" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={trComplementScript} title="🔄 Complement (-c)" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={trPracticalScript} title="🧪 Practical: Data cleaning, ROT13" highlightLines={[14,22,30]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={trAdvancedScript} title="⚙️ Advanced: Character classes, multiple operations" highlightLines={[12,18,24]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Remove all digits:</strong> `tr -d '0-9'` (range notation).</li>
              <li><strong>Squeeze newlines:</strong> `tr -s '\\n'` (blank line removal).</li>
              <li><strong>Complement to keep only certain characters:</strong> `tr -cd '[:alnum:]'` (keep only alphanumeric).</li>
              <li><strong>One‑line ROT13 cipher:</strong> `tr 'A-Za-z' 'N-ZA-Mn-za-m'`.</li>
              <li><strong>Translate escape sequences with `echo -e`:</strong> `echo -e 'a\\tb' | tr '\\t' ','`.</li>
              <li><strong>Use character classes for readability:</strong> `[:digit:]`, `[:alpha:]`, `[:space:]`, etc.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Cannot operate on whole words:</strong> `tr` works on single characters, not strings. Use `sed` for word replacements.</li>
              <li><strong>Forgetting that `tr` reads from stdin only:</strong> `tr 'a' 'b' file.txt` does not work; use `tr 'a' 'b' &lt; file.txt`.</li>
              <li><strong>Range semantics may depend on locale:</strong> `A-Z` may not be contiguous in some locales; use `LC_ALL=C` or character classes.</li>
              <li><strong>Squeeze applied before deletion when combining `-s` and `-d`?</strong> Order matters; `tr -ds` first squeezes then deletes.</li>
              <li><strong>Trailing newlines may cause unexpected behaviour.</strong> tr processes all input bytes, including newline.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always redirect input with `&lt;` or pipe; tr does not accept filename arguments.</p>
              <p>✔️ Use POSIX character classes `[:class:]` instead of ranges for portability.</p>
              <p>✔️ For case conversion, prefer `tr '[:lower:]' '[:upper:]'` over `tr 'a-z' 'A-Z'`.</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Combine with `sort | uniq` to clean data before frequency analysis.</p>
              <p>✔️ Use `-c` with `-d` to delete everything except a set: `tr -cd '[:digit:]'` keeps only digits.</p>
              <p>✔️ To translate multiple characters, ensure SET2 has at least as many characters as SET1.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can translate characters (e.g., change case).</li>
              <li>☐ I can delete specific characters with `-d`.</li>
              <li>☐ I can squeeze repeated characters with `-s`.</li>
              <li>☐ I can complement a set with `-c`.</li>
              <li>☐ I can use character classes like `[:digit:]`, `[:alpha:]`.</li>
              <li>☐ I know tr only reads from stdin.</li>
              <li>☐ I can combine options (e.g., `tr -ds ' '`).</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a file where words are separated by variable amounts of spaces, tabs, and newlines. How can you use tr to normalise them to single spaces? Try tr -s '[:space:]' ' ' What about removing all punctuation except apostrophes? Use tr -cd "[:alnum:] '\\n". How would you convert all uppercase letters to lowercase but preserve the rest?`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-cyan-700 dark:text-cyan-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for tr Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Shyamnagar, I show students how `tr` can turn a messy CSV into a clean one by removing quotes and replacing delimiters. It's a huge productivity boost."</li>
                  <li>Emphasise that `tr` is for character munging, not word‑level transformations – use `sed` for patterns.</li>
                  <li>Classroom exercise: take a paragraph, convert it to uppercase, then squeeze spaces, then count words with `wc -w`.</li>
                  <li>Introduce ROT13 as a fun example of translation, and show how `tr` can be used for simple cryptography.</li>
                </ul>
                <p className="mt-2 italic text-sm">"`tr` is the scalpel of text cleaning – precise and powerful, but not a hammer. Use it where characters matter." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ tr Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 12: Transformation of Text Using tr – Clean, Convert, and Normalise
        </div>
      </div>
    </div>
  );
};

export default Topic12;