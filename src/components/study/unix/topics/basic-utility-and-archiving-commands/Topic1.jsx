import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import dateBasicSh from './topic1_files/date_basic.sh?raw';
import dateFormattingSh from './topic1_files/date_formatting.sh?raw';
import dateArithmeticSh from './topic1_files/date_arithmetic.sh?raw';
import dateScriptingSh from './topic1_files/date_scripting.sh?raw';

/**
 * Topic1 Component: Working with date and time using date command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'date' command in Unix/Linux for displaying and formatting system date/time.
 * @usage Used in classroom environments to teach command-line date manipulation, formatting, and scripting.
 */
const Topic1 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive simulator state
  const [command, setCommand] = useState('date');
  const [output, setOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    const outputMap = {
      date: new Date().toString(),
      'date +"%Y-%m-%d"': new Date().toISOString().slice(0,10),
      'date +"%A, %B %d, %Y"': new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      'date -d "last Friday"': (() => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 1) % 7) - 1); return d.toString(); })(),
      'date -u': new Date().toUTCString(),
    };
    setOutput(outputMap[command] || outputMap.date);
  }, [command]);

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
            🕒 The `date` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Display and manipulate system date & time — essential for logging, scripting, and scheduling.
          </p>
        </div>

        {/* Interactive Terminal */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Try it live
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              'date',
              'date +"%Y-%m-%d"',
              'date +"%A, %B %d, %Y"',
              'date -d "last Friday"',
              'date -u'
            ].map(cmd => (
              <button
                key={cmd}
                onClick={() => setCommand(cmd)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all',
                  command === cmd
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
              <span>{command}</span>
            </div>
            <pre className={clsx('transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {output}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 Try different format specifiers!
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `date`?</h2>
              <p className="mb-3">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">date</code> command displays the current system date and time.
                It can also set the system clock (requires superuser) and format output using powerful specifiers.
              </p>
              <p>
                It's one of the most frequently used commands for timestamps, log rotation, backup naming, and scheduling scripts.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>date [option]... [+format]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Display or set system date and time.</li>
                <li><strong>Return:</strong> Outputs formatted date/time to stdout (exit 0 on success).</li>
                <li><strong>When used:</strong> Every time you need a human-readable or machine-readable timestamp.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Log file naming:</strong> <code className="text-sm">backup_$(date +%Y%m%d).tar.gz</code></li>
                <li><strong>Script debugging:</strong> <code className="text-sm">echo "[$(date)] Starting process"</code></li>
                <li><strong>Schedule awareness:</strong> Check if today is weekend before running certain jobs.</li>
                <li><strong>Cross-timezone reporting:</strong> <code className="text-sm">TZ=UTC date</code></li>
                <li><strong>Age calculation:</strong> Seconds since epoch (Unix timestamp).</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Epoch time:</strong> <code className="text-sm">date +%s</code> → seconds since 1970-01-01.</li>
                <li><strong>Yesterday:</strong> <code className="text-sm">date -d "yesterday"</code></li>
                <li><strong>Specific format for logs:</strong> <code className="text-sm">date +"%Y-%m-%d %H:%M:%S"</code></li>
                <li><strong>Timezone conversion:</strong> <code className="text-sm">TZ=America/New_York date</code></li>
                <li><strong>ISO 8601:</strong> <code className="text-sm">date -Iseconds</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 How `date` Processes Formatting</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="180" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="110" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. Command + format</text>
            <text x="110" y="75" textAnchor="middle" fill="currentColor" fontSize="12">date +"%Y-%m-%d"</text>
            
            <line x1="200" y1="70" x2="250" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow1)" />
            
            <rect x="260" y="30" width="180" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="350" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">2. Parse format specifiers</text>
            <text x="350" y="75" textAnchor="middle" fill="currentColor" fontSize="12">%Y → year, %m → month, %d → day</text>
            
            <line x1="440" y1="70" x2="490" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow1)" />
            
            <rect x="500" y="30" width="180" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="590" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. Fetch current time</text>
            <text x="590" y="75" textAnchor="middle" fill="currentColor" fontSize="12">from system clock (UTC)</text>
            
            <line x1="680" y1="70" x2="730" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow1)" />
            
            <rect x="740" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="810" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Output</text>
            <text x="810" y="75" textAnchor="middle" fill="currentColor" fontSize="12">2025-03-18</text>

            <defs>
              <marker id="arrow1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Format string → specifiers → system time → formatted string</text>
            <circle cx="810" cy="180" r="15" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="810" y="184" textAnchor="middle" fill="currentColor" fontSize="10">Now</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={dateBasicSh} title="Basic Date Display" highlightLines={[4,7]} />
          <ShellFileLoader fileModule={dateFormattingSh} title="Custom Date Formats" highlightLines={[5,12]} />
          <ShellFileLoader fileModule={dateArithmeticSh} title="Date Arithmetic (yesterday, next week)" highlightLines={[8,14]} />
          <ShellFileLoader fileModule={dateScriptingSh} title="Scripting with Timestamps" highlightLines={[10,18]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Spacing in format:</strong> <code className="text-sm">date +"%Y-%m-%d"</code> is correct; <code className="text-sm">date +%Y-%m-%d</code> also works, but spaces require quotes.</li>
            <li><strong>Using `-d` on macOS:</strong> Different flags (BSD date). Always <code className="text-sm">man date</code> first.</li>
            <li><strong>Setting date without sudo:</strong> Permission denied.</li>
            <li><strong>Timezone confusion:</strong> <code className="text-sm">date</code> shows local time, <code className="text-sm">date -u</code> shows UTC.</li>
            <li><strong>Parsing `date` output:</strong> Use <code className="text-sm">+%s</code> for machine-readable.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Always quote format strings:</strong> Prevents shell interpretation.</li>
            <li><strong>Use ISO 8601 for logs:</strong> <code className="text-sm">date -Iseconds</code></li>
            <li><strong>Store timestamps in variables:</strong> <code className="text-sm">NOW=$(date +%s)</code></li>
            <li><strong>Test `-d` expressions with known dates first.</strong></li>
            <li><strong>Prefer UTC for distributed systems.</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>How would you get the date of the first Monday of next month?</li>
            <li>Why is epoch time useful for sorting events?</li>
            <li>What happens if you try to set the date while NTP is running?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can display current date/time with <code>date</code>.</li>
            <li>✅ Can format output using <code>+%Y-%m-%d</code>.</li>
            <li>✅ Can show UTC time with <code>-u</code>.</li>
            <li>✅ Can calculate yesterday/tomorrow with <code>-d</code>.</li>
            <li>✅ Understands epoch seconds.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about date Command" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> Have students create a script that logs the time every time they run a command (using PROMPT_COMMAND). This teaches the value of timestamps in real debugging.</p>
            <p><strong>⚠️ Remember:</strong> The `-d` option differs greatly between GNU and BSD date. Always demonstrate both if teaching cross-platform.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a one-liner that calculates the number of days until the next birthday using only `date` and arithmetic.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic1;