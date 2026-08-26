import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import prBasicSh from './topic2_files/pr_basic.sh?raw';
import prColumnsSh from './topic2_files/pr_columns.sh?raw';
import prHeadersSh from './topic2_files/pr_headers.sh?raw';
import prPrintingSh from './topic2_files/pr_printing.sh?raw';

/**
 * Topic2 Component: Formatting file output using pr command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'pr' command in Unix/Linux for paginating and columnizing text files.
 * @usage Used in classroom environments to teach text formatting, printing preparation, and report generation.
 */
const Topic2 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive simulator: simulate pr output on a sample text
  const [prOption, setPrOption] = useState('pr');
  const [prOutput, setPrOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const sampleText = `Student Name    Subject     Marks
Swadeep         Math        85
Tuhina          Science     92
Abhronila       English     88
Debangshu       History     76
Rohit           Geography   81
Priya           Physics     95
Aniket          Chemistry   79
Swati           Biology     84`;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    
    const outputMap = {
      'pr': () => sampleText,
      'pr -3': () => {
        const lines = sampleText.split('\n');
        const colSize = Math.ceil(lines.length / 3);
        let col1 = lines.slice(0, colSize);
        let col2 = lines.slice(colSize, 2*colSize);
        let col3 = lines.slice(2*colSize);
        const maxRows = Math.max(col1.length, col2.length, col3.length);
        let result = '';
        for (let i=0; i<maxRows; i++) {
          result += (col1[i] || '').padEnd(25) + (col2[i] || '').padEnd(25) + (col3[i] || '') + '\n';
        }
        return result;
      },
      'pr -l 10': () => sampleText + '\n\n[Page break simulation]\n(remaining content on next page)',
      'pr -h "Student Report"': () => `\n\n\n${' '.repeat(30)}Student Report\n\n${sampleText}`,
      'pr -o 5': () => sampleText.split('\n').map(line => '     ' + line).join('\n')
    };
    setPrOutput(outputMap[prOption] ? outputMap[prOption]() : sampleText);
  }, [prOption, sampleText]);

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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            📄 The `pr` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Format text files for printing — paginate, columnize, add headers, and prepare reports.
          </p>
        </div>

        {/* Interactive Terminal Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Try it live
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {['pr', 'pr -3', 'pr -l 10', 'pr -h "Student Report"', 'pr -o 5'].map(cmd => (
              <button
                key={cmd}
                onClick={() => setPrOption(cmd)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all',
                  prOption === cmd
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                )}
              >
                {cmd}
              </button>
            ))}
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>{prOption}</span>
            </div>
            <pre className={clsx('whitespace-pre-wrap transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {prOutput}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 The `pr` command does not change the original file; it only formats output.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `pr`?</h2>
              <p className="mb-3">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">pr</code> command (short for <strong>print</strong>) formats text files for printing.
                It adds headers, footers, page numbers, converts text into multi-column layouts, and adjusts margins.
              </p>
              <p>
                Originally designed for line printers, `pr` is still useful for generating reports, preparing data for mailing,
                or simply viewing wide text in columns.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>pr [options] [file...]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Paginate and columnize text files for printing or display.</li>
                <li><strong>Return:</strong> Outputs formatted text to stdout (exit 0 on success).</li>
                <li><strong>When used:</strong> Before sending text to a printer, or to create multi-column terminal output.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Printing reports:</strong> Add date/time and page numbers automatically.</li>
                <li><strong>Creating columnar data:</strong> <code className="text-sm">pr -3 data.txt</code> for 3-column output.</li>
                <li><strong>Preparing mailing labels:</strong> Combine with <code className="text-sm">fold</code> and <code className="text-sm">pr</code>.</li>
                <li><strong>Source code listing:</strong> <code className="text-sm">pr -l 60 -h "My Script" script.sh | lpr</code></li>
                <li><strong>Log file pagination:</strong> View long logs page by page using <code className="text-sm">pr -l 24 log.txt | less</code></li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Double-space output:</strong> <code className="text-sm">pr -d</code> (like `sed 'G'`).</li>
                <li><strong>Suppress headers:</strong> <code className="text-sm">pr -T</code> (no page headers/footers).</li>
                <li><strong>Custom page length:</strong> <code className="text-sm">pr -l 66</code> (standard line printer).</li>
                <li><strong>Combine with `enscript`:</strong> For even fancier printing (PostScript).</li>
                <li><strong>Wide output without truncation:</strong> <code className="text-sm">pr -W 200</code> (GNU pr).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 How `pr` Transforms a File</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="180" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="110" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. Input file</text>
            <text x="110" y="75" textAnchor="middle" fill="currentColor" fontSize="12">data.txt (plain text)</text>
            
            <line x1="200" y1="70" x2="250" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow2)" />
            
            <rect x="260" y="30" width="180" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="350" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">2. Apply options</text>
            <text x="350" y="75" textAnchor="middle" fill="currentColor" fontSize="12">-3 (columns), -h (header)</text>
            
            <line x1="440" y1="70" x2="490" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow2)" />
            
            <rect x="500" y="30" width="180" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="590" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. Paginate & format</text>
            <text x="590" y="75" textAnchor="middle" fill="currentColor" fontSize="12">add headers, page breaks</text>
            
            <line x1="680" y1="70" x2="730" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow2)" />
            
            <rect x="740" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="810" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Output</text>
            <text x="810" y="75" textAnchor="middle" fill="currentColor" fontSize="12">formatted for printer</text>

            <defs>
              <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Plain text → columnization → headers/pagination → printable format</text>
            <rect x="720" y="180" width="80" height="30" rx="4" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="760" y="200" textAnchor="middle" fill="currentColor" fontSize="10">Print</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={prBasicSh} title="Basic Pagination" highlightLines={[4,8]} />
          <ShellFileLoader fileModule={prColumnsSh} title="Multi-Column Output" highlightLines={[6,12]} />
          <ShellFileLoader fileModule={prHeadersSh} title="Custom Headers & Footers" highlightLines={[5,10]} />
          <ShellFileLoader fileModule={prPrintingSh} title="Preparing for Printing" highlightLines={[7,14]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Assuming `pr` modifies the original file:</strong> It does not; output must be redirected.</li>
            <li><strong>Mixing up `-l` and `-L`:</strong> `-l` sets page length, `-L` sets line length (GNU).</li>
            <li><strong>Overly narrow columns:</strong> Default 72 columns may truncate wide lines.</li>
            <li><strong>Headers on every page even when not desired:</strong> Use `-T` to suppress.</li>
            <li><strong>Confusing `pr` with `printf`:</strong> Different tools; `pr` is for pagination.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Always redirect output:</strong> <code className="text-sm">pr file.txt &gt; formatted.txt</code></li>
            <li><strong>Test with `less` first:</strong> <code className="text-sm">pr -3 file.txt | less</code></li>
            <li><strong>Use `-h` to add descriptive headers for printing.</strong></li>
            <li><strong>Adjust column width with `-W` (GNU) for wide data.</strong></li>
            <li><strong>Combine with `enscript` for PDF generation: <code className="text-sm">pr ... | enscript -o -</code>.</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>How would you create a 4-column list from a file of names?</li>
            <li>Why might you want to suppress page headers when piping to `less`?</li>
            <li>If you have a 200-line file, how many pages will `pr -l 50` produce?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can produce a simple paginated output with headers.</li>
            <li>✅ Can create multi-column output using `-num`.</li>
            <li>✅ Can set custom page length with `-l`.</li>
            <li>✅ Can add a custom header using `-h`.</li>
            <li>✅ Knows that `pr` does not edit files in place.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about pr Command" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> Have students use `pr` on a directory listing (`ls -l | pr -3 -h "Directory Contents"`) to see immediate real-world value. Then ask them to pipe the output to `lpr` if a printer is available (or to `pdf` generator).</p>
            <p><strong>⚠️ Remember:</strong> `pr` is rarely used in modern GUI environments but remains essential for CLI reporting and automated print jobs. Teach it as a bridge between raw text and printer-ready format.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that takes a CSV file, uses `pr` to format it into 2 columns, and adds a timestamp header. Then pipe to `enscript` to produce a PDF report.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic2;