import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import zipBasicSh from './topic8_files/zip_basic.sh?raw';
import zipOptionsSh from './topic8_files/zip_options.sh?raw';
import zipRecursiveSh from './topic8_files/zip_recursive.sh?raw';
import zipScriptingSh from './topic8_files/zip_scripting.sh?raw';

/**
 * Topic8 Component: Creating zip archives using zip command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'zip' command in Unix/Linux for creating compressed archives.
 * @usage Used in classroom environments to teach file archiving, cross-platform compression, and backup creation.
 */
const Topic8 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive zip simulator
  const [archiveName, setArchiveName] = useState('backup');
  const [compressionLevel, setCompressionLevel] = useState(6);
  const [includeHidden, setIncludeHidden] = useState(false);
  const [recurse, setRecurse] = useState(true);
  const [verbose, setVerbose] = useState(false);
  const [totalSize, setTotalSize] = useState(5242880); // 5MB simulated
  const [compressedSize, setCompressedSize] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    // Simulate zip compression: ratio depends on level (1-9)
    const ratio = 1 - (compressionLevel / 25); // level 6 -> 0.76, level 9 -> 0.64
    const compressed = Math.floor(totalSize * Math.max(0.2, ratio));
    setCompressedSize(compressed.toLocaleString());
  }, [compressionLevel, totalSize]);

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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent mb-4">
            🗃️ The `zip` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Create compressed ZIP archives — the universal format for file packaging across all operating systems.
          </p>
        </div>

        {/* Interactive Zip Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Simulate zip compression
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Archive name (without .zip):</label>
              <input
                type="text"
                value={archiveName}
                onChange={(e) => setArchiveName(e.target.value)}
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
          <div className="flex flex-wrap gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={recurse} onChange={() => setRecurse(!recurse)} />
              <span>Recurse into directories (-r)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={includeHidden} onChange={() => setIncludeHidden(!includeHidden)} />
              <span>Include hidden files (.*)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={verbose} onChange={() => setVerbose(!verbose)} />
              <span>Verbose output (-v)</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Simulated total file size (bytes):</label>
            <input
              type="number"
              value={totalSize}
              onChange={(e) => setTotalSize(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-mono"
            />
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>zip {verbose ? '-v ' : ''}{recurse ? '-r ' : ''}{includeHidden ? '--include-hidden ' : ''}-{compressionLevel} {archiveName}.zip files/</span>
            </div>
            <pre className={clsx('transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {verbose ? `  adding: files/ (stored 0%)\n  adding: files/data.txt (deflated ${Math.round((1 - compressedSize/totalSize)*100)}%)\n` : ''}
              {`Archive: ${archiveName}.zip\n  Total files: 12\n  Original size: ${totalSize.toLocaleString()} bytes\n  Compressed size: ${compressedSize} bytes\n  Compression ratio: ${Math.round((1 - compressedSize/totalSize)*100)}%`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 ZIP files store directory structure and can be opened on Windows, macOS, and Linux.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `zip`?</h2>
              <p className="mb-3">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">zip</code> command creates compressed archives in the ZIP format,
                a widely supported standard for file packaging and compression (PKZIP compatible).
              </p>
              <p>
                Unlike `gzip` (which compresses single files), `zip` can package entire directories, preserve permissions and metadata,
                and store multiple files in one archive. It is the default compression tool on Windows and macOS.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>zip [options] archive.zip [files...]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Package and compress files/directories into a ZIP archive.</li>
                <li><strong>Return:</strong> Exit 0 on success, non-zero on error.</li>
                <li><strong>When used:</strong> Sharing files across platforms, creating backups, distributing software, or email attachments.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Email attachments:</strong> Zip multiple files into one before sending.</li>
                <li><strong>Website backup:</strong> <code className="text-sm">zip -r website_backup.zip /var/www/html</code></li>
                <li><strong>Project distribution:</strong> Share source code with directory structure intact.</li>
                <li><strong>Encrypted archives:</strong> Use `-e` to password-protect sensitive data.</li>
                <li><strong>Selective inclusion:</strong> <code className="text-sm">zip archive.zip *.txt -x secrets.txt</code></li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Recursive directory:</strong> <code className="text-sm">zip -r archive.zip folder/</code> (essential).</li>
                <li><strong>Compression level:</strong> <code className="text-sm">-1</code> fastest, <code>-9</code> smallest, default is <code>-6</code>.</li>
                <li><strong>Encrypt archive:</strong> <code className="text-sm">zip -e secret.zip file.txt</code> (prompts for password).</li>
                <li><strong>Include hidden files:</strong> <code className="text-sm">zip -r archive.zip .* *</code> (bash glob).</li>
                <li><strong>Exclude files:</strong> <code className="text-sm">zip -r backup.zip . -x "*.log" "*.tmp"</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 How `zip` Creates an Archive</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="160" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="100" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. Files + dirs</text>
            <text x="100" y="75" textAnchor="middle" fill="currentColor" fontSize="12">file1.txt, dir/, etc.</text>
            
            <line x1="180" y1="70" x2="230" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow8)" />
            
            <rect x="240" y="30" width="160" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="320" y="50" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold">2. Collect & compress</text>
            <text x="320" y="70" textAnchor="middle" fill="currentColor" fontSize="11">DEFLATE each file</text>
            <text x="320" y="85" textAnchor="middle" fill="currentColor" fontSize="11">store metadata</text>
            
            <line x1="400" y1="70" x2="450" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow8)" />
            
            <rect x="460" y="30" width="160" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="540" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. Central directory</text>
            <text x="540" y="75" textAnchor="middle" fill="currentColor" fontSize="12">index of entries</text>
            
            <line x1="620" y1="70" x2="670" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow8)" />
            
            <rect x="680" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="750" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. ZIP archive</text>
            <text x="750" y="75" textAnchor="middle" fill="currentColor" fontSize="12">archive.zip</text>

            <defs>
              <marker id="arrow8" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Files → compression → directory index → single .zip file</text>
            <rect x="680" y="180" width="80" height="30" rx="4" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="720" y="200" textAnchor="middle" fill="currentColor" fontSize="10">Portable</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={zipBasicSh} title="Basic ZIP Creation" highlightLines={[5,10]} />
          <ShellFileLoader fileModule={zipOptionsSh} title="Compression Levels & Encryption" highlightLines={[7,14,21]} />
          <ShellFileLoader fileModule={zipRecursiveSh} title="Recursive Directory Archiving" highlightLines={[6,12]} />
          <ShellFileLoader fileModule={zipScriptingSh} title="Scripting with zip" highlightLines={[8,16,24]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Forgetting `-r` for directories:</strong> Without `-r`, zip only includes empty directory names, not contents.</li>
            <li><strong>Overwriting previous archive:</strong> By default `zip` adds/replaces files; use `-FS` for sync or remove old archive.</li>
            <li><strong>Not quoting wildcards:</strong> <code className="text-sm">zip archive *.txt</code> lets shell expand; use quotes: `zip archive "*.txt"` to include recursively?</li>
            <li><strong>Using absolute paths:</strong> `zip /tmp/backup.zip /home/user/data` includes full path; use `-j` for junk paths or cd first.</li>
            <li><strong>Encryption weakness:</strong> Zip encryption (PKZIP 2.0) is weak; use `-e` for basic protection, but consider `7z` or `gpg` for secrets.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Always use `-r` when archiving directories.</strong></li>
            <li><strong>Use `-q` (quiet) in scripts to suppress output.</strong></li>
            <li><strong>Exclude temporary or large files with `-x`.</strong></li>
            <li><strong>Test archives with `unzip -t` after creation.</strong></li>
            <li><strong>For cross-platform compatibility, avoid zip's advanced features (like Unicode names may break).</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>How would you create a ZIP of all `.jpg` files in a folder but exclude thumbnails?</li>
            <li>Why might you want to use `-9` compression on a backup but `-1` on a daily log archive?</li>
            <li>What happens if you run `zip` on a symlink? (It stores the link path, not the target.)</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can create a ZIP archive of single files: `zip archive.zip file.txt`.</li>
            <li>✅ Can create a recursive ZIP of directories: `zip -r archive.zip folder/`.</li>
            <li>✅ Can adjust compression level (`-1` to `-9`).</li>
            <li>✅ Can add files to an existing archive.</li>
            <li>✅ Can exclude files using `-x` pattern.</li>
            <li>✅ Understands that ZIP preserves directory structure.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about zip Command" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> Have students compare `zip` and `gzip` by creating a large text file, compressing it with both, and examining sizes. Then show how `zip` can pack multiple files while `gzip` requires `tar`. Emphasize that ZIP files are universally readable (even on Windows), making them ideal for sharing.</p>
            <p><strong>⚠️ Remember:</strong> Students often forget `-r`; create a mental model: "zip by itself is for files, zip -r is for directories". Also point out that `zip` by default adds to an existing archive – which can be surprising.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that finds all `.log` files older than 30 days in `/var/log`, compresses each into a dated ZIP file, then moves the original logs to a backup directory. This teaches automation of log rotation with zip.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic8;