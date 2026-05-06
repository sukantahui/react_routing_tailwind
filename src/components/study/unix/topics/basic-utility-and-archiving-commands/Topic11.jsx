import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic11_files/topic11_questions';
import tarGzipSh from './topic11_files/tar_gzip.sh?raw';
import tarBzip2Sh from './topic11_files/tar_bzip2.sh?raw';
import tarXzSh from './topic11_files/tar_xz.sh?raw';
import tarCompareSh from './topic11_files/tar_compare.sh?raw';

/**
 * Topic11 Component: Combining compression with archiving
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate combining tar archiving with compression (gzip, bzip2, xz) for efficient storage and distribution.
 * @usage Used in classroom environments to teach best practices for creating compressed archives (.tar.gz, .tar.bz2, .tar.xz).
 */
const Topic11 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive compression + archiving simulator
  const [operation, setOperation] = useState('create');
  const [compression, setCompression] = useState('gzip');
  const [level, setLevel] = useState(6);
  const [verbose, setVerbose] = useState(false);
  const [keepOriginal, setKeepOriginal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
  }, [operation, compression, level, verbose]);

  const getExtension = () => {
    if (compression === 'gzip') return '.tar.gz';
    if (compression === 'bzip2') return '.tar.bz2';
    if (compression === 'xz') return '.tar.xz';
    return '.tar';
  };

  const getCommand = () => {
    let cmd = 'tar ';
    if (operation === 'create') cmd += '-c';
    if (operation === 'extract') cmd += '-x';
    if (operation === 'list') cmd += '-t';
    if (verbose) cmd += 'v';
    if (compression === 'gzip') cmd += 'z';
    if (compression === 'bzip2') cmd += 'j';
    if (compression === 'xz') cmd += 'J';
    cmd += 'f archive' + getExtension();
    if (operation === 'create') cmd += ' /path/to/source';
    return cmd;
  };

  const getOutput = () => {
    if (operation === 'create') {
      return `${verbose ? 'file1.txt\nfile2.txt\nsubdir/file3.txt\n' : ''}Compression level: ${level}\nArchive created successfully.`;
    }
    if (operation === 'extract') {
      return verbose ? `file1.txt\nfile2.txt\nsubdir/file3.txt\nExtraction complete.` : `Archive extracted.`;
    }
    if (operation === 'list') {
      return `file1.txt\nfile2.txt\nsubdir/file3.txt`;
    }
    return '';
  };

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
            🗜️📦 Tar + Compression
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Combine archiving with compression — create `.tar.gz`, `.tar.bz2`, and `.tar.xz` files for efficient storage.
          </p>
        </div>

        {/* Interactive Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Simulate tar + compression
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Operation:</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <option value="create">Create (c)</option>
                <option value="extract">Extract (x)</option>
                <option value="list">List (t)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compression method:</label>
              <select
                value={compression}
                onChange={(e) => setCompression(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <option value="gzip">gzip (.tar.gz) -z</option>
                <option value="bzip2">bzip2 (.tar.bz2) -j</option>
                <option value="xz">xz (.tar.xz) -J</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Compression level (1-9):</label>
              <input
                type="range"
                min="1"
                max="9"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="w-full"
                disabled={operation !== 'create'}
              />
              <div className="text-center text-sm">{level} (1=fast, 9=best)</div>
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={verbose} onChange={() => setVerbose(!verbose)} />
                <span>Verbose (-v)</span>
              </label>
            </div>
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>{getCommand()}</span>
            </div>
            <pre className={clsx('whitespace-pre-wrap transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {getOutput()}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 Tar compresses the entire archive together, achieving better ratio than compressing files individually.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 Why Combine Tar with Compression?</h2>
              <p className="mb-3">
                While `tar` alone bundles files, it does not reduce size. By combining `tar` with a compression tool like `gzip`, `bzip2`, or `xz`,
                we achieve both packaging and compression in one step.
              </p>
              <p>
                The typical extensions are `.tar.gz` (or `.tgz`), `.tar.bz2`, and `.tar.xz`. This method is the standard for source code distribution,
                system backups, and file exchange on Unix-like systems.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Common Patterns</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded space-y-1">
                <code>tar -czf archive.tar.gz source/</code>  <span className="text-gray-500"># gzip</span><br />
                <code>tar -cjf archive.tar.bz2 source/</code> <span className="text-gray-500"># bzip2</span><br />
                <code>tar -cJf archive.tar.xz source/</code>  <span className="text-gray-500"># xz</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Reduce storage and transfer size while preserving directory structure.</li>
                <li><strong>When used:</strong> Distributing software, creating backups, compressing logs.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Source code tarballs:</strong> `curl -O https://example.com/software-1.0.tar.gz`</li>
                <li><strong>System backups:</strong> `tar -czf /backup/home_$(date +%Y%m%d).tar.gz /home`</li>
                <li><strong>Package distribution:</strong> Compiling with `make dist` creates `.tar.gz`.</li>
                <li><strong>Log rotation:</strong> Archive old logs with high compression (xz).</li>
                <li><strong>Data transfer:</strong> Pipe compressed tar over SSH: `tar czf - dir | ssh host 'cat > dir.tar.gz'`</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Choose compression based on need:</strong> gzip is fastest, bzip2 smaller, xz slowest but best.</li>
                <li><strong>Use `-9` for maximum size reduction (e.g., for archives).</strong></li>
                <li><strong>Automatically detect compression on extraction:</strong> `tar -xf archive.tar.xz` works without flags.</li>
                <li><strong>Parallel compression with `pigz`:</strong> `tar -cf - data | pigz -9 > archive.tar.gz`</li>
                <li><strong>Exclude patterns while compressing:</strong> `tar -czf backup.tar.gz --exclude='*.log' /home`</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 Tar + Compression Pipeline</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="160" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="100" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. Files + dirs</text>
            <text x="100" y="75" textAnchor="middle" fill="currentColor" fontSize="12">source/</text>
            
            <line x1="180" y1="70" x2="230" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow11)" />
            
            <rect x="240" y="30" width="160" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="320" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">2. Tar archiving</text>
            <text x="320" y="75" textAnchor="middle" fill="currentColor" fontSize="12">tar -c → raw tar stream</text>
            
            <line x1="400" y1="70" x2="450" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow11)" />
            
            <rect x="460" y="30" width="160" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="540" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. Compression</text>
            <text x="540" y="75" textAnchor="middle" fill="currentColor" fontSize="12">gzip/bzip2/xz</text>
            
            <line x1="620" y1="70" x2="670" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow11)" />
            
            <rect x="680" y="30" width="170" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="765" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Compressed archive</text>
            <text x="765" y="75" textAnchor="middle" fill="currentColor" fontSize="12">.tar.gz / .tar.bz2 / .tar.xz</text>

            <defs>
              <marker id="arrow11" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Files → tar → compression → .tar.gz</text>
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
          <ShellFileLoader fileModule={tarGzipSh} title="Tar with gzip (.tar.gz)" highlightLines={[4,8,12]} />
          <ShellFileLoader fileModule={tarBzip2Sh} title="Tar with bzip2 (.tar.bz2)" highlightLines={[4,8,12]} />
          <ShellFileLoader fileModule={tarXzSh} title="Tar with xz (.tar.xz)" highlightLines={[4,8,12]} />
          <ShellFileLoader fileModule={tarCompareSh} title="Comparing Compression Methods" highlightLines={[8,16,24]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Using wrong flag when extracting:</strong> `tar -xf` auto-detects, but old tar may need explicit `-z`, `-j`, `-J`.</li>
            <li><strong>Compressing already compressed files:</strong> Wastes time and may increase size.</li>
            <li><strong>Not specifying compression level:</strong> Default may be suboptimal for archives (use `-9`).</li>
            <li><strong>Forgetting `-f` after options:</strong> `tar -czf archive.tar.gz` is correct; `tar -czf archive.tar.gz` — ensure `-f` comes last before filename.</li>
            <li><strong>Using absolute paths in archives:</strong> Can cause extraction to overwrite system files. Use `-C` or `--transform`.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Use `tar -czf` for speed/size balance, `-cjf` for better compression, `-cJf` for archives meant for long-term storage.</strong></li>
            <li><strong>Always test compressed archives after creation:</strong> `tar -tzf archive.tar.gz` (list).</li>
            <li><strong>Document compression method in filename: use standard extensions (.tar.gz, .tar.bz2, .tar.xz).</strong></li>
            <li><strong>For incremental backups, combine `--listed-incremental` with compression.</strong></li>
            <li><strong>Use `pigz` for parallel gzip compression when CPU cores are available.</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Why does compressing multiple files after tar achieve better ratio than compressing each file individually?</li>
            <li>When would you choose `.tar.bz2` over `.tar.gz`? When would xz be overkill?</li>
            <li>How would you stream a compressed tar over the network without writing to disk?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can create a `.tar.gz` archive: `tar -czf archive.tar.gz dir/`.</li>
            <li>✅ Can create `.tar.bz2` and `.tar.xz` archives.</li>
            <li>✅ Can extract any compressed tarball with `tar -xf archive.tar.xz`.</li>
            <li>✅ Knows which compression flag corresponds to which method (`z`, `j`, `J`).</li>
            <li>✅ Understands that `tar -cf` alone does not compress.</li>
            <li>✅ Can exclude files using `--exclude`.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about Tar + Compression" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> Create a demo directory of mixed files (text, images, binaries). Show students the size of the directory, then create `.tar`, `.tar.gz`, `.tar.bz2`, `.tar.xz`. Let them compare sizes. Ask: "Which method gave the smallest result for text? For images?" This hands-on comparison is memorable.</p>
            <p><strong>⚠️ Remember:</strong> Many students will forget the `-f` flag or put it in the wrong order. Use the mnemonic "**C**reate **Z**ipped **F**ile" for `tar -czf`. Also emphasize that modern tar auto-detects compression on extract, so `tar -xf` works universally.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that takes a directory as argument, creates a timestamped `.tar.xz` archive, then checks its integrity and computes the compression ratio. Finally, upload it to a remote server using `scp`. This simulates a production backup workflow.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic11;