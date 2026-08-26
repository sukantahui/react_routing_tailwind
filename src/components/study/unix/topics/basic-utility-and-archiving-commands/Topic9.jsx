import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';
import unzipBasicSh from './topic9_files/unzip_basic.sh?raw';
import unzipOptionsSh from './topic9_files/unzip_options.sh?raw';
import unzipSelectiveSh from './topic9_files/unzip_selective.sh?raw';
import unzipScriptingSh from './topic9_files/unzip_scripting.sh?raw';

/**
 * Topic9 Component: Extracting zip files using unzip command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'unzip' command in Unix/Linux for extracting ZIP archives.
 * @usage Used in classroom environments to teach archive extraction, selective file restoration, and cross-platform data retrieval.
 */
const Topic9 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive unzip simulator
  const [extractOption, setExtractOption] = useState('default');
  const [targetDir, setTargetDir] = useState('extracted_files');
  const [verbose, setVerbose] = useState(false);
  const [overwrite, setOverwrite] = useState('default'); // default, never, always
  const [simulateSize, setSimulateSize] = useState(5242880);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
  }, [extractOption, targetDir, verbose, overwrite]);

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
            📂 The `unzip` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Extract files from ZIP archives — restore compressed packages, software, and backups.
          </p>
        </div>

        {/* Interactive Unzip Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Simulate unzip extraction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Extraction mode:</label>
              <select
                value={extractOption}
                onChange={(e) => setExtractOption(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <option value="default">Default (extract all)</option>
                <option value="subdir">Extract to subdirectory</option>
                <option value="list">List contents (-l)</option>
                <option value="test">Test integrity (-t)</option>
                <option value="quiet">Quiet extraction (-q)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target directory:</label>
              <input
                type="text"
                value={targetDir}
                onChange={(e) => setTargetDir(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-mono"
                disabled={extractOption !== 'subdir'}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={verbose} onChange={() => setVerbose(!verbose)} />
              <span>Verbose output (-v)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={overwrite === 'never'} onChange={() => setOverwrite(overwrite === 'never' ? 'default' : 'never')} />
              <span>Never overwrite (-n)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={overwrite === 'always'} onChange={() => setOverwrite(overwrite === 'always' ? 'default' : 'always')} />
              <span>Force overwrite (-o)</span>
            </label>
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>
                unzip {extractOption === 'list' ? '-l ' : ''}
                {extractOption === 'test' ? '-t ' : ''}
                {extractOption === 'quiet' ? '-q ' : ''}
                {verbose ? '-v ' : ''}
                {overwrite === 'never' ? '-n ' : ''}
                {overwrite === 'always' ? '-o ' : ''}
                {extractOption === 'subdir' ? `-d ${targetDir} ` : ''}
                archive.zip
              </span>
            </div>
            <pre className={clsx('transition-opacity duration-300 whitespace-pre-wrap', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {extractOption === 'list' && (
                `Archive:  archive.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n     1234  2025-03-18 10:00   file1.txt\n     5678  2025-03-18 10:01   file2.txt\n---------                     -------\n     6912                     2 files`
              )}
              {extractOption === 'test' && (
                `Archive:  archive.zip\n    testing: file1.txt                 OK\n    testing: file2.txt                 OK\nNo errors detected in compressed data.`
              )}
              {extractOption !== 'list' && extractOption !== 'test' && (
                `Archive:  archive.zip\n  inflating: ${extractOption === 'subdir' ? targetDir + '/' : ''}file1.txt  \n  inflating: ${extractOption === 'subdir' ? targetDir + '/' : ''}file2.txt  \n${verbose ? '   creating: extracted_files/subdir/\n  inflating: extracted_files/subdir/data.txt\n' : ''}Extraction complete.`
              )}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 `unzip` is available on Linux, macOS, and Windows (via tools like Cygwin or Git Bash).
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `unzip`?</h2>
              <p className="mb-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">unzip</code> extracts files from ZIP archives created by `zip` or other archivers.
                It restores the original directory structure, permissions, and timestamps.
              </p>
              <p>
                As the counterpart to `zip`, `unzip` is essential for handling software packages, email attachments,
                backup restoration, and any ZIP file you encounter in cross-platform environments.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>unzip [options] archive.zip [-d directory] [file(s)] [-x pattern]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Extract files from ZIP archives.</li>
                <li><strong>Return:</strong> Exit 0 on success, non-zero on error (bad archive, missing files).</li>
                <li><strong>When used:</strong> Whenever you need to open or restore a ZIP file.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Software installation:</strong> Many downloadable packages come as `.zip` files.</li>
                <li><strong>Email attachments:</strong> Extract documents sent as ZIP archives.</li>
                <li><strong>Backup recovery:</strong> <code className="text-sm">unzip backup.zip -d /restore/path</code></li>
                <li><strong>Selective extraction:</strong> <code className="text-sm">unzip archive.zip "*.txt" -x "*.log"</code></li>
                <li><strong>Batch processing:</strong> Loop over multiple ZIP files and extract them.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>List contents:</strong> <code className="text-sm">unzip -l archive.zip</code> (no extraction).</li>
                <li><strong>Test archive integrity:</strong> <code className="text-sm">unzip -t archive.zip</code> before extraction.</li>
                <li><strong>Extract to different directory:</strong> <code className="text-sm">unzip archive.zip -d /target/dir</code>.</li>
                <li><strong>Extract specific files:</strong> <code className="text-sm">unzip archive.zip document.pdf image.jpg</code>.</li>
                <li><strong>Quiet extraction:</strong> <code className="text-sm">unzip -q archive.zip</code> for scripts.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 How `unzip` Extracts an Archive</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="160" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="100" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. ZIP archive</text>
            <text x="100" y="75" textAnchor="middle" fill="currentColor" fontSize="12">archive.zip</text>
            
            <line x1="180" y1="70" x2="230" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow9)" />
            
            <rect x="240" y="30" width="160" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="320" y="50" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold">2. Read central dir</text>
            <text x="320" y="70" textAnchor="middle" fill="currentColor" fontSize="11">Index of files</text>
            <text x="320" y="85" textAnchor="middle" fill="currentColor" fontSize="11">timestamps, sizes</text>
            
            <line x1="400" y1="70" x2="450" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow9)" />
            
            <rect x="460" y="30" width="160" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="540" y="50" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold">3. DEFLATE inflate</text>
            <text x="540" y="70" textAnchor="middle" fill="currentColor" fontSize="11">Decompress each</text>
            <text x="540" y="85" textAnchor="middle" fill="currentColor" fontSize="11">file stream</text>
            
            <line x1="620" y1="70" x2="670" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow9)" />
            
            <rect x="680" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="750" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Restored files</text>
            <text x="750" y="75" textAnchor="middle" fill="currentColor" fontSize="12">original names & paths</text>

            <defs>
              <marker id="arrow9" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">.zip → index → inflate → original files</text>
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
          <ShellFileLoader fileModule={unzipBasicSh} title="Basic Extraction" highlightLines={[4,9]} />
          <ShellFileLoader fileModule={unzipOptionsSh} title="Extraction Options (-d, -l, -t, -q)" highlightLines={[6,12,18]} />
          <ShellFileLoader fileModule={unzipSelectiveSh} title="Selective File Extraction" highlightLines={[5,10,15]} />
          <ShellFileLoader fileModule={unzipScriptingSh} title="Scripting with unzip" highlightLines={[8,16,24]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Extracting into current directory without checking contents:</strong> ZIP may overwrite existing files; use `-n` or extract to subdir.</li>
            <li><strong>Forgetting `-d` target directory:</strong> Archive contents spam the current folder.</li>
            <li><strong>Not quoting wildcards:</strong> `unzip archive.zip *.txt` - shell expands `*.txt` before unzip sees it; use quotes: `"*.txt"`.</li>
            <li><strong>Assuming `unzip` is installed on minimal systems:</strong> Some Linux servers don't have it by default; install `unzip` package.</li>
            <li><strong>Extracting from UTF-8 filenames incorrectly:</strong> Older `unzip` versions may mangle Unicode. Use `-O` option to specify charset.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Always list contents first:</strong> `unzip -l archive.zip` before full extraction.</li>
            <li><strong>Test archive integrity before extracting important data:</strong> `unzip -t archive.zip`.</li>
            <li><strong>Extract to a temporary directory to avoid clutter:</strong> <code className="text-sm">unzip archive.zip -d temp/</code>.</li>
            <li><strong>Use `-q` in scripts to suppress verbose output.</strong></li>
            <li><strong>Set file permissions using `umask` before extraction if needed.</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>What could happen if you extract a ZIP that contains absolute paths (e.g., `/etc/passwd`)?</li>
            <li>How would you extract only files modified after a certain date from a ZIP?</li>
            <li>Why might `unzip` fail with "End-of-central-directory signature not found"?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can extract a ZIP archive with `unzip archive.zip`.</li>
            <li>✅ Can list contents using `-l`.</li>
            <li>✅ Can test integrity with `-t`.</li>
            <li>✅ Can extract to a specific directory with `-d`.</li>
            <li>✅ Can extract specific files (e.g., `"*.txt"`).</li>
            <li>✅ Can suppress output with `-q`.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about unzip Command" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> Bring a real-world scenario: Download a ZIP from the internet (e.g., a book from Project Gutenberg), then demonstrate `unzip -l`, `unzip -t`, and finally `unzip -d book/`. Show how to extract only the text files using wildcards. This bridges theory and practice.</p>
            <p><strong>⚠️ Remember:</strong> Warn students about "zip bombs" – a malicious zip that expands to huge size. Always test with `unzip -l` and `unzip -t` before full extraction, especially for untrusted sources.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that finds all `.zip` files in a directory, tests each, and if valid, extracts them into subdirectories named after the zip file (without extension). This simulates a bulk extraction utility.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic9;