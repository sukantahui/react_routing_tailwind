import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import gunzipBasicSh from './topic7_files/gunzip_basic.sh?raw';
import gunzipOptionsSh from './topic7_files/gunzip_options.sh?raw';
import gunzipMultipleSh from './topic7_files/gunzip_multiple.sh?raw';
import gunzipScriptingSh from './topic7_files/gunzip_scripting.sh?raw';

/**
 * Topic7 Component: File decompression using gunzip command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'gunzip' command in Unix/Linux for decompressing .gz files.
 * @usage Used in classroom environments to teach file restoration, archive extraction, and data recovery.
 */
const Topic7 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive gunzip simulator
  const [compressedSize, setCompressedSize] = useState('307200'); // 300KB
  const [decompressedSize, setDecompressedSize] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [keepCompressed, setKeepCompressed] = useState(false);
  const [verbose, setVerbose] = useState(false);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    // Simulate decompression: gzip typically gives 3-4x expansion for text
    const decompressed = Math.floor(parseInt(compressedSize) * 3.5);
    setDecompressedSize(decompressed.toLocaleString());
  }, [compressedSize]);

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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent mb-4">
            📦 The `gunzip` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Decompress files compressed with `gzip` — restore original files from `.gz` archives.
          </p>
        </div>

        {/* Interactive Decompression Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Simulate gunzip decompression
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Compressed file size (bytes):</label>
            <input
              type="number"
              value={compressedSize}
              onChange={(e) => setCompressedSize(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-mono"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={keepCompressed} onChange={() => setKeepCompressed(!keepCompressed)} />
              <span>Keep compressed file (-k)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={verbose} onChange={() => setVerbose(!verbose)} />
              <span>Verbose output (-v)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={testMode} onChange={() => setTestMode(!testMode)} />
              <span>Test mode (-t, no output)</span>
            </label>
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>gunzip {keepCompressed ? '-k ' : ''}{verbose ? '-v ' : ''}{testMode ? '-t ' : ''}archive.gz</span>
            </div>
            {testMode ? (
              <pre className="transition-opacity duration-300">
                ✅ Integrity check passed: archive.gz is valid.
              </pre>
            ) : (
              <pre className={clsx('transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
                {verbose ? `archive.gz:     ${parseInt(compressedSize).toLocaleString()} bytes -> ${decompressedSize} bytes, ${Math.round((parseInt(decompressedSize.replace(/,/g,''))/parseInt(compressedSize))*100)}% expansion\n` : ''}
                {keepCompressed ? 'Compressed file kept: archive.gz\n' : 'Compressed file removed: archive.gz → archive'}
                {'Decompressed file: archive'}
              </pre>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 `gunzip` is identical to `gzip -d` — it restores the original file from its `.gz` version.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `gunzip`?</h2>
              <p className="mb-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">gunzip</code> (GNU unzip) is the decompression counterpart of `gzip`.
                It restores files compressed with `gzip`, `.gz`, `.z`, `.tgz`, or `.taz` formats.
              </p>
              <p>
                By default, `gunzip` replaces the compressed file with the original decompressed version,
                preserving timestamps and permissions. It's essential for restoring logs, backups, and software packages.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>gunzip [ -acfhlLnNrtvV ] [ -S suffix ] [ name ... ]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Decompress files created by `gzip`.</li>
                <li><strong>Return:</strong> Exit 0 on success, non-zero on error (corrupt file, wrong format).</li>
                <li><strong>When used:</strong> Whenever you receive or need to restore a `.gz` compressed file.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Restoring rotated logs:</strong> <code className="text-sm">gunzip /var/log/syslog.1.gz</code></li>
                <li><strong>Extracting software source:</strong> <code className="text-sm">gunzip -c source.tar.gz | tar xf -</code></li>
                <li><strong>Recovering backed up data:</strong> Decompress database dumps before import.</li>
                <li><strong>Viewing compressed files without extracting:</strong> `zcat` internally uses `gunzip -c`.</li>
                <li><strong>Checking integrity of downloaded archives:</strong> `gunzip -t file.gz`.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Keep compressed file after decompression:</strong> `gunzip -k file.gz` (GNU).</li>
                <li><strong>Test before decompressing:</strong> `gunzip -t file.gz` ensures the archive isn't corrupt.</li>
                <li><strong>Decompress to stdout:</strong> `gunzip -c file.gz > output` preserves original archive.</li>
                <li><strong>Decompress multiple files:</strong> `gunzip *.gz` decompresses all at once.</li>
                <li><strong>Force overwrite:</strong> `gunzip -f file.gz` if output file already exists.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 How `gunzip` Restores a File</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="160" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="100" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. Compressed file</text>
            <text x="100" y="75" textAnchor="middle" fill="currentColor" fontSize="12">archive.gz (300 KB)</text>
            
            <line x1="180" y1="70" x2="230" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow7)" />
            
            <rect x="240" y="30" width="160" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="320" y="50" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold">2. Read .gz header</text>
            <text x="320" y="70" textAnchor="middle" fill="currentColor" fontSize="11">Extract metadata</text>
            <text x="320" y="85" textAnchor="middle" fill="currentColor" fontSize="11">(original name, timestamp)</text>
            
            <line x1="400" y1="70" x2="450" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow7)" />
            
            <rect x="460" y="30" width="160" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="540" y="50" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold">3. Inflate DEFLATE</text>
            <text x="540" y="70" textAnchor="middle" fill="currentColor" fontSize="11">LZ77 decompression</text>
            <text x="540" y="85" textAnchor="middle" fill="currentColor" fontSize="11">Huffman decoding</text>
            
            <line x1="620" y1="70" x2="670" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow7)" />
            
            <rect x="680" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="750" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Original file</text>
            <text x="750" y="75" textAnchor="middle" fill="currentColor" fontSize="12">archive (1 MB)</text>

            <defs>
              <marker id="arrow7" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">.gz → header → inflate → original file</text>
            <rect x="680" y="180" width="80" height="30" rx="4" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="720" y="200" textAnchor="middle" fill="currentColor" fontSize="10">Restored</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={gunzipBasicSh} title="Basic Decompression" highlightLines={[4,9]} />
          <ShellFileLoader fileModule={gunzipOptionsSh} title="Decompression Options (-c, -k, -t, -f)" highlightLines={[6,12,18]} />
          <ShellFileLoader fileModule={gunzipMultipleSh} title="Batch Decompression" highlightLines={[5,12]} />
          <ShellFileLoader fileModule={gunzipScriptingSh} title="Scripting with gunzip" highlightLines={[10,18,26]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Forgetting that `gunzip` removes the `.gz` file by default:</strong> Use `-k` to keep it.</li>
            <li><strong>Attempting to decompress non-gzip files:</strong> `gunzip` will fail and leave the file unchanged.</li>
            <li><strong>Overwriting existing files without warning:</strong> Use `-f` to force, but be careful.</li>
            <li><strong>Using `gunzip` on `.tar.gz` expecting a directory:</strong> It decompresses to a `.tar` file; then use `tar xf`.</li>
            <li><strong>Not testing integrity before decompressing large files:</strong> Always `gunzip -t` first.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Always test compressed files before decompressing:</strong> `gunzip -t archive.gz`.</li>
            <li><strong>Use `-c` to keep the original when you need to inspect content:</strong> `gunzip -c archive.gz | less`.</li>
            <li><strong>When decompressing multiple files, use `*.gz` after verifying.</strong></li>
            <li><strong>Preserve original by using `-k` if you need both versions.</strong></li>
            <li><strong>Combine with `tar` to directly extract: `tar -xzf archive.tar.gz` (automatically gunzips).</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>What happens if you run `gunzip` twice on the same `.gz` file?</li>
            <li>How would you decompress a file to a different name than the original?</li>
            <li>Why might you want to keep the compressed file after decompressing?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can decompress a `.gz` file with `gunzip`.</li>
            <li>✅ Knows that original `.gz` is removed by default.</li>
            <li>✅ Can keep compressed file using `-k`.</li>
            <li>✅ Can test integrity with `-t`.</li>
            <li>✅ Can decompress to stdout with `-c`.</li>
            <li>✅ Understands difference between `gunzip` and `tar -xzf`.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about gunzip Command" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> Have students download a `.tar.gz` file from the internet, then decompress it step by step: first `gunzip`, then `tar xf`. Then show the combined `tar -xzf` shortcut. This demystifies the two-step process.</p>
            <p><strong>⚠️ Remember:</strong> Emphasize that `gunzip` is exactly `gzip -d`. Many students confuse it with `unzip` (for `.zip` files). Show examples of each and note the different creators (gzip vs PKZIP).</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that finds all `.gz` files in a directory, tests them with `gunzip -t`, and moves corrupt ones to a `corrupt/` folder. This simulates an integrity checker for backups.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic7;