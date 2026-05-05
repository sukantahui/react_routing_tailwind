import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts
import splitBasicScript from './topic3_files/split_basic.sh?raw';
import splitByBytesScript from './topic3_files/split_by_bytes.sh?raw';
import splitCustomPrefixScript from './topic3_files/split_custom_prefix.sh?raw';
import splitNumericSuffixScript from './topic3_files/split_numeric_suffix.sh?raw';
import splitFilterScript from './topic3_files/split_filter.sh?raw';
import splitPracticalScript from './topic3_files/split_practical.sh?raw';
import questions from './topic3_files/topic3_questions.js';

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

// Main component: Topic 3
const Topic3 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // SVG Illustration: split process
  const SplitIllustration = () => (
    <div className="flex justify-center my-8">
      <svg width="600" height="280" viewBox="0 0 600 280" className="w-full max-w-md h-auto">
        <rect width="600" height="280" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />
        
        {/* Large file */}
        <text x="30" y="40" fontSize="14" fill="#0f172a" className="dark:fill-gray-200">Large file (1000 lines)</text>
        <rect x="30" y="55" width="120" height="160" rx="6" fill="#e2e8f0" className="dark:fill-gray-700" />
        <text x="60" y="80" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Line 1</text>
        <text x="60" y="100" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">...</text>
        <text x="60" y="120" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Line 500</text>
        <text x="60" y="140" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">...</text>
        <text x="60" y="200" fontSize="12" fontFamily="monospace" fill="#0f172a" className="dark:fill-gray-100">Line 1000</text>

        {/* Split command */}
        <text x="180" y="80" fontSize="14" fontWeight="bold" fill="#f59e0b">split -l 200 data.txt</text>

        {/* Arrow */}
        <path d="M 155 140 L 195 140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowSplit)" />

        {/* Output chunks */}
        <rect x="210" y="55" width="100" height="50" rx="6" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="220" y="75" fontSize="12" fontFamily="monospace" fill="#16a34a">xaa (200 lines)</text>
        <rect x="210" y="115" width="100" height="50" rx="6" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="220" y="135" fontSize="12" fontFamily="monospace" fill="#16a34a">xab (200 lines)</text>
        <rect x="210" y="175" width="100" height="50" rx="6" fill="#dcfce7" className="dark:fill-green-900/40" />
        <text x="220" y="195" fontSize="12" fontFamily="monospace" fill="#16a34a">xac (200 lines)</text>
        <text x="240" y="240" fontSize="12" fill="#6b7280">... 5 chunks total</text>

        <defs>
          <marker id="arrowSplit" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400">
            Splitting Large Files using split Command
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Break massive files into manageable chunks by lines, bytes, or custom rules – essential for log rotation, data partitioning, and parallel processing.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
          <SplitIllustration />
        </div>

        {/* Command Signatures */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold mb-3">📜 split Command Syntax</h2>
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <code className="text-red-600 dark:text-red-400">split [OPTION]... [INPUT [PREFIX]]</code>
            <code className="text-red-600 dark:text-red-400"># Split by number of lines (default 1000)</code>
            <code className="text-red-600 dark:text-red-400">split -l 500 bigfile.txt chunk_</code>
            <code className="text-red-600 dark:text-red-400"># Split by bytes</code>
            <code className="text-red-600 dark:text-red-400">split -b 1M largefile.bin part_</code>
            <code className="text-red-600 dark:text-red-400"># Numeric suffixes instead of alphabetic</code>
            <code className="text-red-600 dark:text-red-400">split -d -l 1000 data.txt output_</code>
            <code className="text-red-600 dark:text-red-400"># Custom suffix length</code>
            <code className="text-red-600 dark:text-red-400">split -a 4 -l 500 file.txt part</code>
          </div>
          <p className="mt-4"><span className="font-semibold">Return type:</span> Creates output files; no output to stdout unless `--verbose`.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To split large files into smaller pieces for easier transfer, parallel processing, or archival. Common in big data, log management, and batch jobs.</p>
        </div>

        {/* Theory */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">🧠 How split Works</h2>
          <p className="mb-3"><strong>Line‑based splitting (`-l`):</strong> Default splits every 1000 lines. Useful for text files (logs, CSVs) where each line is a record. Output files are named xaa, xab, ... unless you provide a PREFIX.</p>
          <p className="mb-3"><strong>Byte‑based splitting (`-b`):</strong> Splits by size (k, M, G suffixes). Ideal for binary files or when you need chunks of specific size.</p>
          <p className="mb-3"><strong>Suffix options:</strong> Use `-d` for numeric suffixes (00,01,...) instead of alphabetic (aa, ab,...). Use `-a N` to control suffix length (e.g., `-a 3` gives 000,001,...).</p>
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-l-4 border-red-500">
            <p className="text-sm"><strong>Real‑world at Shyamnagar IT Park:</strong> A data engineer receives a 50GB CSV log file. To process it in parallel, she uses `split -l 1000000 huge.log part_` to create 1‑million‑line chunks, then runs analysis simultaneously on each chunk. Later, she recombines them with `cat part_* > original.log`.</p>
          </div>
        </div>

        {/* Script Demos */}
        <div className="reveal-section space-y-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold">📁 Live Examples: split in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={splitBasicScript} title="📄 Basic split (by lines)" highlightLines={[12,17,22]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={splitByBytesScript} title="💾 Split by bytes (-b)" highlightLines={[10,14,18]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={splitCustomPrefixScript} title="🏷️ Custom Prefix" highlightLines={[12,16]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={splitNumericSuffixScript} title="🔢 Numeric Suffixes (-d)" highlightLines={[12,16,20]} />
            </div>
            <div className="hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={splitFilterScript} title="🔧 Splitting with filter (--filter)" highlightLines={[14,20]} />
            </div>
            <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
              <ShellFileLoader fileModule={splitPracticalScript} title="🧪 Practical: Log Rotation & Parallel Processing" highlightLines={[14,20,28]} />
            </div>
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Recombine chunks:</strong> `cat part_* > original`</li>
              <li><strong>Use `-d` and `-a` for predictable naming:</strong> `split -d -a 3 -l 1000 file part_` gives part_000, part_001...</li>
              <li><strong>Split by number of chunks with `-n`:</strong> `split -n l/3 file` splits into 3 chunks (more or less balanced).</li>
              <li><strong>`--filter` to process each chunk immediately:</strong> `split -l 1000 --filter='gzip > $FILE.gz' big.log`</li>
              <li><strong>Overwrite chunks:</strong> Use `--verbose` to see which files are created.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li><strong>Forgetting that split creates many files:</strong> Can fill disk if too many small chunks.</li>
              <li><strong>Not providing a prefix:</strong> Chunks named xaa, xab may collide with other splits.</li>
              <li><strong>Using `-b` on text files:</strong> May split in middle of a line, breaking line‑based tools.</li>
              <li><strong>Assuming chunks are exactly the specified size:</strong> Last chunk may be smaller.</li>
              <li><strong>Overwriting without backups:</strong> If you rerun split with same prefix, it overwrites.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold mb-3">✅ Best Practices</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="space-y-2">
              <p>✔️ Always use a meaningful prefix (e.g., `data_part_`).</p>
              <p>✔️ For text files, split by lines (`-l`) to keep line integrity.</p>
              <p>✔️ For binary files, split by bytes (`-b`).</p>
            </div>
            <div className="space-y-2">
              <p>✔️ Use `-d -a 4` for large splits (more than 1000 parts).</p>
              <p>✔️ Test with a small file first to verify chunk naming.</p>
              <p>✔️ Keep a manifest of chunk names and sizes for reassembly.</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold">📝 Mini Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
              <li>☐ I can split a file into 500‑line chunks with `split -l 500`.</li>
              <li>☐ I can split a binary file into 1MB chunks with `split -b 1M`.</li>
              <li>☐ I can provide a custom prefix (e.g., `chunk_`).</li>
              <li>☐ I can use numeric suffixes (`-d`) and control length (`-a`).</li>
              <li>☐ I understand the difference between line and byte splitting.</li>
              <li>☐ I can recombine chunks with `cat`.</li>
              <li>☐ I can use `--filter` to compress each chunk on the fly.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="reveal-section bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-bold flex items-center gap-2">💭 Think About…</h3>
          <p className="mt-1">
            {`You have a 10GB database dump file. You need to transfer it over a network that only allows 1GB per file. How would you split it and then reassemble on the other side? What if the file is text (SQL) and you need to ensure no statement is split across two files? Consider using split -l or split -C (line‑buffered).`}
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
              <p className="font-medium text-red-700 dark:text-red-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
              <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                <p><strong>🎓 Teacher's Advice for split Command:</strong></p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>"At Ichapur, I once asked students to split a 50,000‑line mark sheet into class‑wise chunks (200 lines each). They quickly mastered `split -l 200`. Then I asked them to add class prefixes – they learned `--filter` to rename chunks on the fly."</li>
                  <li>Demonstrate that `cat x* > combined` works even when chunks are numbered – but only if the chunks are in order. Use `ls -v` for `xaa`, `xab` ordering.</li>
                  <li>Classroom exercise: Give them a large log file, ask to split into daily chunks (by date inside lines). Not directly possible with split – leads to learning grep/awk.</li>
                  <li>Emphasise that split is a building block for parallel processing with GNU Parallel or xargs.</li>
                </ul>
                <p className="mt-2 italic text-sm">"Split makes big data manageable. Master it, and you'll tame any giant file." — Sukanta Sir</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animationDelay: '0.5s' }}>
          <FAQTemplate title="❓ split Command – 30 Expert FAQs" questions={questions} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
          Topic 3: Splitting Large Files – Divide and Conquer Your Data
        </div>
      </div>
    </div>
  );
};

export default Topic3;