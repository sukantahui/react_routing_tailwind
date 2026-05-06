import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic10_files/topic10_questions';
import tarBasicSh from './topic10_files/tar_basic.sh?raw';
import tarOptionsSh from './topic10_files/tar_options.sh?raw';
import tarAdvancedSh from './topic10_files/tar_advanced.sh?raw';
import tarScriptingSh from './topic10_files/tar_scripting.sh?raw';

/**
 * Topic10 Component: Archiving files using tar command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'tar' command in Unix/Linux for archiving multiple files into a single file (tarball).
 * @usage Used in classroom environments to teach file archiving, backup creation, and software distribution.
 */
const Topic10 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive tar simulator
  const [operation, setOperation] = useState('create');
  const [tarFile, setTarFile] = useState('archive.tar');
  const [compression, setCompression] = useState('none');
  const [verbose, setVerbose] = useState(false);
  const [preservePerms, setPreservePerms] = useState(true);
  const [totalSize, setTotalSize] = useState(10485760); // 10MB
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
  }, [operation, tarFile, compression, verbose]);

  const getTarCommand = () => {
    let cmd = 'tar ';
    if (operation === 'create') cmd += '-c';
    if (operation === 'extract') cmd += '-x';
    if (operation === 'list') cmd += '-t';
    if (operation === 'append') cmd += '-r';
    if (operation === 'update') cmd += '-u';
    if (verbose) cmd += 'v';
    if (preservePerms && operation === 'create') cmd += 'p';
    if (compression === 'gzip') cmd += 'z';
    if (compression === 'bzip2') cmd += 'j';
    if (compression === 'xz') cmd += 'J';
    cmd += 'f ' + tarFile;
    if (operation === 'create') cmd += ' /path/to/files';
    if (operation === 'extract') cmd += ' [files]';
    return cmd;
  };

  const getOutput = () => {
    switch(operation) {
      case 'create':
        return `tar: Removing leading '/' from member names
${verbose ? 'file1.txt\nfile2.txt\nsubdir/file3.txt\n' : ''}archive created successfully.`;
      case 'extract':
        return verbose ? `tar: file1.txt\ntar: file2.txt\ntar: subdir/file3.txt\nExtraction complete.` : `Archive extracted.`;
      case 'list':
        return `file1.txt\nfile2.txt\nsubdir/file3.txt`;
      case 'append':
        return `File appended to ${tarFile}`;
      case 'update':
        return `Updated files added to ${tarFile}`;
      default:
        return '';
    }
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-gray-500 bg-clip-text text-transparent mb-4">
            📦 The `tar` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tape ARchiver — bundle multiple files and directories into a single archive (tarball).
          </p>
        </div>

        {/* Interactive Tar Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Simulate tar operations
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Operation:</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <option value="create">Create (-c)</option>
                <option value="extract">Extract (-x)</option>
                <option value="list">List (-t)</option>
                <option value="append">Append (-r)</option>
                <option value="update">Update (-u)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Archive name:</label>
              <input
                type="text"
                value={tarFile}
                onChange={(e) => setTarFile(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-mono"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Compression:</label>
              <select
                value={compression}
                onChange={(e) => setCompression(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <option value="none">None (.tar)</option>
                <option value="gzip">gzip (.tar.gz / .tgz)</option>
                <option value="bzip2">bzip2 (.tar.bz2)</option>
                <option value="xz">xz (.tar.xz)</option>
              </select>
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={verbose} onChange={() => setVerbose(!verbose)} />
                <span>Verbose (-v)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={preservePerms} onChange={() => setPreservePerms(!preservePerms)} />
                <span>Preserve permissions (-p)</span>
              </label>
            </div>
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>{getTarCommand()}</span>
            </div>
            <pre className={clsx('whitespace-pre-wrap transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {getOutput()}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 `tar` stands for "Tape ARchiver" — originally for magnetic tape backup, now ubiquitous for packaging.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `tar`?</h2>
              <p className="mb-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">tar</code> is a utility that groups multiple files and directories into a single file (tarball),
                preserving file permissions, ownership, timestamps, and directory structure.
              </p>
              <p>
                While tar alone does not compress, it is commonly combined with compressors like `gzip`, `bzip2`, or `xz`
                (e.g., `.tar.gz`, `.tar.bz2`, `.tar.xz`). It is the standard archiving tool on Unix and Linux for backups and distribution.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Common Operations</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded space-y-1">
                <code>tar -c -f archive.tar file1 dir/</code>  <span className="text-gray-500"># Create</span><br />
                <code>tar -x -f archive.tar</code>             <span className="text-gray-500"># Extract</span><br />
                <code>tar -t -f archive.tar</code>             <span className="text-gray-500"># List</span><br />
                <code>tar -r -f archive.tar newfile.txt</code>  <span className="text-gray-500"># Append</span><br />
                <code>tar -u -f archive.tar file.txt</code>     <span className="text-gray-500"># Update</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Combine files into one archive for easier transfer or backup.</li>
                <li><strong>Return:</strong> Exit 0 on success, non-zero on error.</li>
                <li><strong>When used:</strong> For source code distribution, system backups, log archiving, and software packaging.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Software distribution:</strong> Source code tarballs (`.tar.gz`).</li>
                <li><strong>System backups:</strong> <code className="text-sm">tar -czf backup.tar.gz /home /etc</code></li>
                <li><strong>Log rotation:</strong> Archive old logs into a dated tarball.</li>
                <li><strong>Package build systems:</strong> Create release tarballs for distribution.</li>
                <li><strong>Migration:</strong> Transfer entire directory trees between machines via `tar` over `ssh`.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Combine with compression:</strong> `-z` (gzip), `-j` (bzip2), `-J` (xz).</li>
                <li><strong>Extract to specific directory:</strong> `tar -xf archive.tar -C /target/dir`</li>
                <li><strong>Preserve permissions:</strong> `-p` flag when extracting as root (or with `--same-permissions`).</li>
                <li><strong>Exclude files:</strong> `--exclude="*.log"` during creation.</li>
                <li><strong>View contents without extracting:</strong> `tar -tf archive.tar`</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 How `tar` Archives Files</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="180" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="110" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. Files + Dirs</text>
            <text x="110" y="75" textAnchor="middle" fill="currentColor" fontSize="12">a.txt, b/, c.log</text>
            
            <line x1="200" y1="70" x2="250" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow10)" />
            
            <rect x="260" y="30" width="180" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="350" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">2. Metadata + Data</text>
            <text x="350" y="75" textAnchor="middle" fill="currentColor" fontSize="12">header (perms, name, size)</text>
            
            <line x1="440" y1="70" x2="490" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow10)" />
            
            <rect x="500" y="30" width="180" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="590" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. Concatenate</text>
            <text x="590" y="75" textAnchor="middle" fill="currentColor" fontSize="12">multiple entries into one stream</text>
            
            <line x1="680" y1="70" x2="730" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow10)" />
            
            <rect x="740" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="810" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Tarball</text>
            <text x="810" y="75" textAnchor="middle" fill="currentColor" fontSize="12">archive.tar</text>

            <defs>
              <marker id="arrow10" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Files → headers + data → concatenated → single archive</text>
            <rect x="740" y="180" width="80" height="30" rx="4" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="780" y="200" textAnchor="middle" fill="currentColor" fontSize="10">Packaged</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={tarBasicSh} title="Basic Archive Creation" highlightLines={[4,8,12]} />
          <ShellFileLoader fileModule={tarOptionsSh} title="Common Operations (list, extract, append)" highlightLines={[6,11,16]} />
          <ShellFileLoader fileModule={tarAdvancedSh} title="Incremental & Exclude Options" highlightLines={[8,15,22]} />
          <ShellFileLoader fileModule={tarScriptingSh} title="Backup Scripts with tar" highlightLines={[10,18,26]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Forgetting `-f`:</strong> `tar -cv` writes to default tape device (often causes hang). Always specify `-f`.</li>
            <li><strong>Order matters:</strong> `tar -cf archive.tar` creates, but `tar -fc` is wrong; options order is flexible but `-f` must be immediately followed by filename.</li>
            <li><strong>Absolute paths in archives:</strong> Tar stores absolute paths verbatim; extraction may overwrite system files. Use `-P` if needed, but usually remove leading `/` with `-C`.</li>
            <li><strong>Not preserving permissions on extract:</strong> Use `-p` to keep original permissions, especially for system backups.</li>
            <li><strong>Assuming `tar` compresses:</strong> It doesn't; use `-z`, `-j`, `-J` or pipe to compressor.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Use verbose (`-v`) for documentation, but not in scripts where quiet is needed.</strong></li>
            <li><strong>Always test archives after creation:</strong> `tar -tf archive.tar`.</li>
            <li><strong>Use `-C` to change directory before archiving to avoid absolute paths.</strong></li>
            <li><strong>For backups, use `--exclude` patterns to skip unnecessary directories (e.g., /proc, /dev, /tmp).</strong></li>
            <li><strong>Combine tar with `ssh` for remote backups: `tar -czf - dir | ssh user@host "cat > backup.tar.gz"`</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Why might you choose `.tar.gz` over `.zip` for Unix systems?</li>
            <li>What happens if you extract a tarball created with absolute paths like `/etc/passwd`?</li>
            <li>How would you back up a directory but skip all video files?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can create a tarball: `tar -cf archive.tar files/`.</li>
            <li>✅ Can list contents: `tar -tf archive.tar`.</li>
            <li>✅ Can extract: `tar -xf archive.tar`.</li>
            <li>✅ Can compress with gzip (`-z`), bzip2 (`-j`), xz (`-J`).</li>
            <li>✅ Can extract to specific directory with `-C`.</li>
            <li>✅ Understands the role of `-f` and argument order.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about tar Command" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> Use a physical metaphor: "tar is like a suitcase — you pack multiple items into one bag (archive). Then you can compress the suitcase with gzip (like vacuum packing)." Then demonstrate creating a `.tar`, then `.tar.gz`, and compare sizes.</p>
            <p><strong>⚠️ Remember:</strong> Most beginners forget `-f`. Create a mnemonic: "Tar Can't Function Without -f". Also emphasize that `-f` must be followed immediately by the archive name (no space needed).</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that performs a full system backup of `/home`, `/etc`, and `/var/log` into a dated `.tar.gz`, excluding temporary files. Then transfer the backup to a remote server via `scp`. This simulates a production backup routine.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic10;