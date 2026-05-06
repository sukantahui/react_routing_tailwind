import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import gzipBasicSh from './topic6_files/gzip_basic.sh?raw';
import gzipOptionsSh from './topic6_files/gzip_options.sh?raw';
import gzipMultipleSh from './topic6_files/gzip_multiple.sh?raw';
import gzipScriptingSh from './topic6_files/gzip_scripting.sh?raw';

/**
 * Topic6 Component: File compression using gzip command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'gzip' command in Unix/Linux for compressing files using Lempel-Ziv coding.
 * @usage Used in classroom environments to teach file compression, disk space management, and backup optimization.
 */
const Topic6 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive gzip simulator
  const [compressionLevel, setCompressionLevel] = useState(6);
  const [fileSize, setFileSize] = useState('1048576'); // 1MB in bytes
  const [compressedSize, setCompressedSize] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [keepOriginal, setKeepOriginal] = useState(false);
  const [verbose, setVerbose] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    // Simulate compression ratio based on level (1-9) and file size
    // Higher level = better compression (smaller output)
    const ratio = 1 - (compressionLevel / 20); // level 6 gives 0.7, level 9 gives 0.55
    const compressed = Math.floor(parseInt(fileSize) * Math.max(0.1, ratio));
    setCompressedSize(compressed.toLocaleString());
  }, [compressionLevel, fileSize]);

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes subtlePulse {
      0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
      70% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
      100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up, [class*="animate-"] {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.5s ease-out forwards;
    }
    .animate-pulse-subtle {
      animation: subtlePulse 1.5s infinite;
    }
    .card-hover {
      transition: all 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
    }
    .svg-step-hover {
      transition: filter 0.2s ease, transform 0.2s ease;
    }
    .svg-step-hover:hover {
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
      transform: scale(1.02);
    }
    .teacher-note-hover {
      transition: background-color 0.2s ease, border-left-width 0.2s ease;
    }
    .teacher-note-hover:hover {
      background-color: rgba(59, 130, 246, 0.05);
      border-left-width: 6px;
    }
  `;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <style>{keyframesStyle}</style>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 animate-fade-slide-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            🗜️ The `gzip` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compress files to save disk space and bandwidth — using the Lempel-Ziv (LZ77) compression algorithm.
          </p>
        </div>

        {/* Interactive Compression Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Simulate gzip compression
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Original file size (bytes):</label>
              <input
                type="number"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compression level (1-9):</label>
              <input
                type="range"
                min="1"
                max="9"
                value={compressionLevel}
                onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm">{compressionLevel} (1=fast, 9=best)</div>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={keepOriginal} onChange={() => setKeepOriginal(!keepOriginal)} />
              <span>Keep original file (-k)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={verbose} onChange={() => setVerbose(!verbose)} />
              <span>Verbose output (-v)</span>
            </label>
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>gzip {keepOriginal ? '-k ' : ''}{verbose ? '-v ' : ''}-{compressionLevel} data.bin</span>
            </div>
            <pre className={clsx('transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {verbose ? `data.bin:      ${parseInt(fileSize).toLocaleString()} bytes -> ${compressedSize} bytes, ${Math.round((1 - parseInt(compressedSize.replace(/,/g,''))/parseInt(fileSize))*100)}% reduction\n` : ''}
              {keepOriginal ? 'Original file kept: data.bin\n' : 'Original file removed: data.bin → data.bin.gz'}
              {'Compressed file: data.bin.gz'}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 `gzip` compresses a single file; use `tar` for directories.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `gzip`?</h2>
              <p className="mb-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">gzip</code> (GNU zip) is a file compression utility that uses the DEFLATE algorithm
                (LZ77 + Huffman coding). It reduces file sizes, typically by 60-80% for text files.
              </p>
              <p>
                By default, `gzip` replaces the original file with a compressed version (appending `.gz`), preserving
                timestamps and permissions. It's widely used for log rotation, software distribution, and backups.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>gzip [ -acdfhklLnNrtvV19 ] [ -S suffix ] [ name ... ]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Compress files using DEFLATE algorithm.</li>
                <li><strong>Return:</strong> Exit 0 on success, non-zero on error.</li>
                <li><strong>When used:</strong> To save disk space, reduce network transfer size, or prepare files for archiving.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Log compression:</strong> Rotate and compress old logs: <code className="text-sm">gzip /var/log/syslog.1</code></li>
                <li><strong>Web servers:</strong> Serve pre-compressed static files (`.gz` versions) to save bandwidth.</li>
                <li><strong>Backup scripts:</strong> Compress database dumps before transferring to remote storage.</li>
                <li><strong>Package distribution:</strong> Source code tarballs are often `.tar.gz` (compressed with gzip).</li>
                <li><strong>Email attachments:</strong> Reduce size before sending.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Best compression level:</strong> `-9` gives smallest size (slower); `-1` is fastest; level `6` is default.</li>
                <li><strong>Keep original file:</strong> `gzip -k file.txt` (GNU gzip) or `gzip -c file.txt &gt; file.txt.gz`.</li>
                <li><strong>Test integrity:</strong> `gzip -t file.gz` checks if the archive is valid.</li>
                <li><strong>View compressed content:</strong> `zcat file.gz | less` or `gzip -dc file.gz`.</li>
                <li><strong>Compress only if new:</strong> Use with `-n` to avoid storing original filename timestamp.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 How `gzip` Compresses a File</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="160" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="100" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. Original file</text>
            <text x="100" y="75" textAnchor="middle" fill="currentColor" fontSize="12">data.txt (1 MB)</text>
            
            <line x1="180" y1="70" x2="230" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow6)" />
            
            <rect x="240" y="30" width="160" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="320" y="50" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold">2. LZ77 + Huffman</text>
            <text x="320" y="70" textAnchor="middle" fill="currentColor" fontSize="11">Find repeating patterns</text>
            <text x="320" y="85" textAnchor="middle" fill="currentColor" fontSize="11">Build Huffman tree</text>
            
            <line x1="400" y1="70" x2="450" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow6)" />
            
            <rect x="460" y="30" width="160" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="540" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. DEFLATE</text>
            <text x="540" y="75" textAnchor="middle" fill="currentColor" fontSize="12">encode + write .gz</text>
            
            <line x1="620" y1="70" x2="670" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow6)" />
            
            <rect x="680" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="750" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Compressed</text>
            <text x="750" y="75" textAnchor="middle" fill="currentColor" fontSize="12">data.txt.gz (300 KB)</text>

            <defs>
              <marker id="arrow6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Original → pattern detection → encoding → compressed output</text>
            <rect x="680" y="180" width="80" height="30" rx="4" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="720" y="200" textAnchor="middle" fill="currentColor" fontSize="10">Smaller</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={gzipBasicSh} title="Basic Compression" highlightLines={[4,9]} />
          <ShellFileLoader fileModule={gzipOptionsSh} title="Compression Levels & Options" highlightLines={[6,12,18]} />
          <ShellFileLoader fileModule={gzipMultipleSh} title="Compressing Multiple Files" highlightLines={[5,10,15]} />
          <ShellFileLoader fileModule={gzipScriptingSh} title="Scripting with gzip" highlightLines={[8,16,22]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Losing original files:</strong> By default, `gzip` removes the original. Use `-k` or redirect output.</li>
            <li><strong>Compressing already compressed files:</strong> `gzip` on a `.jpg` or `.mp4` yields little to no gain.</li>
            <li><strong>Not using `-c` when scripting:</strong> Without `-c`, you lose the original. Use `gzip -c file > file.gz`.</li>
            <li><strong>Forgetting that `gzip` only works on single files:</strong> Directories require `tar` first.</li>
            <li><strong>Assuming `.gz` is always smaller:</strong> Very small files or already compressed data may increase in size due to overhead.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Keep original when uncertain:</strong> Use `gzip -k important.txt`.</li>
            <li><strong>Test compressed file integrity:</strong> `gzip -t archive.gz` before deleting originals.</li>
            <li><strong>Use `gzip -9` for archival (best ratio) and `-1` for temporary files.</strong></li>
            <li><strong>Combine with `find` for batch compression:</strong> `find . -name "*.log" -exec gzip {} \;`</li>
            <li><strong>For logs, use `logrotate` which handles compression natively.</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Why does compressing a `.jpg` image not reduce its size significantly?</li>
            <li>What happens if you run `gzip` on a file and then `gzip` on the resulting `.gz`?</li>
            <li>How would you compress all `.txt` files in a directory while keeping originals?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can compress a file with `gzip filename`.</li>
            <li>✅ Knows that original file is replaced by default.</li>
            <li>✅ Can keep original using `-k` or `-c`.</li>
            <li>✅ Can adjust compression level (`-1` to `-9`).</li>
            <li>✅ Can test integrity with `-t`.</li>
            <li>✅ Understands that gzip is for single files; use tar for directories.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about gzip Command" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border-l-8 border-indigo-500 teacher-note-hover transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center text-xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">Teacher's Note</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sukanta Hui • {experienceYears} years experience (since 1998)</p>
            </div>
          </div>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong>✉️ Email:</strong> sukantahui@codernaccotax.co.in | <strong>📞 Mobile:</strong> 7003756860</p>
            <p><strong>💻 Expertise:</strong> Programming Language, RDBMs, Operating System, Web Development</p>
            <hr className="my-3 border-gray-300 dark:border-gray-700" />
            <p><strong>🎓 Classroom Tip:</strong> Demonstrate compression by creating a large text file (e.g., `dd if=/dev/zero of=big.txt bs=1M count=10`), then compressing it with `gzip`. Show the size difference and explain that text has high redundancy. Also show a JPEG to illustrate incompressibility.</p>
            <p><strong>⚠️ Remember:</strong> Students often panic when their original file disappears after `gzip`. Emphasize the `-k` option and that `gunzip` restores it. Also mention that `gzip` is single-threaded; for multi-core compression, use `pigz`.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that compresses all files older than 7 days in `/var/log`, but only if they are not already compressed. Use `find`, `gzip`, and test with `-name "*.gz"` exclusion.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic6;