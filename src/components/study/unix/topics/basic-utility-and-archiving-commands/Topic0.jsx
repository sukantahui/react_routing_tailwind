import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
// Import shell scripts as raw strings
import calBasicSh from './topic0_files/cal_basic.sh?raw';
import calOptionsSh from './topic0_files/cal_options.sh?raw';
import calScriptingSh from './topic0_files/cal_scripting.sh?raw';
import calYearlySh from './topic0_files/cal_yearly.sh?raw';

/**
 * Topic0 Component: Displaying calendar using cal command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'cal' command in Unix/Linux for displaying calendars, its options,
 *          real-world usage, and best practices.
 * @usage Used in classroom environments to teach command-line calendar utilities.
 */
const Topic0 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // State for interactive terminal simulation (just for visual feedback)
  const [activeCommand, setActiveCommand] = useState('cal');
  const [commandOutput, setCommandOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate command output based on user selection
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    const outputMap = {
      cal: `     March 2025
Su Mo Tu We Th Fr Sa
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30 31`,
      'cal -3': `     February 2025              March 2025               April 2025
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
                   1                     1         1  2  3  4  5
 2  3  4  5  6  7  8   2  3  4  5  6  7  8   6  7  8  9 10 11 12
 9 10 11 12 13 14 15   9 10 11 12 13 14 15  13 14 15 16 17 18 19
16 17 18 19 20 21 22  16 17 18 19 20 21 22  20 21 22 23 24 25 26
23 24 25 26 27 28     23 24 25 26 27 28 29  27 28 29 30
                      30 31`,
      'cal -y': `                            2025
      January               February               March
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
          1  2  3  4                     1                     1
 5  6  7  8  9 10 11   2  3  4  5  6  7  8   2  3  4  5  6  7  8
12 13 14 15 16 17 18   9 10 11 12 13 14 15   9 10 11 12 13 14 15
19 20 21 22 23 24 25  16 17 18 19 20 21 22  16 17 18 19 20 21 22
26 27 28 29 30 31     23 24 25 26 27 28     23 24 25 26 27 28 29
                                            30 31
... (continues for all months)`,
      'cal -j': `        March 2025
Sun Mon Tue Wed Thu Fri Sat
                      60
 61  62  63  64  65  66  67
 68  69  70  71  72  73  74
 75  76  77  78  79  80  81
 82  83  84  85  86  87  88
 89  90`,
      'cal 2025': `                            2025
      January               February               March
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
          1  2  3  4                     1                     1
 5  6  7  8  9 10 11   2  3  4  5  6  7  8   2  3  4  5  6  7  8
... (full year view)`,
    };
    setCommandOutput(outputMap[activeCommand] || outputMap.cal);
  }, [activeCommand]);

  // Inline keyframes for animations (respects reduced motion)
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

      {/* Hero Section with animation */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 animate-fade-slide-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            📅 The 'cal' Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Display calendars in the terminal — a timeless Unix utility for date awareness, planning, and scripting.
          </p>
        </div>

        {/* Interactive Terminal Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Try it live
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {['cal', 'cal -3', 'cal -y', 'cal -j', 'cal 2025'].map(cmd => (
              <button
                key={cmd}
                onClick={() => setActiveCommand(cmd)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all',
                  activeCommand === cmd
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
              <span>{activeCommand}</span>
            </div>
            <pre className={clsx('whitespace-pre-wrap transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {commandOutput}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 Interactive simulation — try different options!
          </p>
        </div>
      </section>

      {/* Theory Section with staggered children */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `cal`?</h2>
              <p className="mb-3">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">cal</code> command (short for <strong>calendar</strong>)
                displays a simple ASCII calendar in the terminal. It has been part of Unix and Linux systems since the early days,
                originally appearing in Version 7 Unix (1979).
              </p>
              <p>
                By default, <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">cal</code> shows the current month,
                with today's date highlighted (in most terminal emulators). It supports various options to show
                previous/next months, full years, Julian dates, and custom date ranges.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>cal [options] [[day] month] year</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Display a calendar in text format.</li>
                <li><strong>Return:</strong> Outputs calendar to stdout (exit code 0 on success).</li>
                <li><strong>When used:</strong> For date reference, planning, log file timestamps, backup scripts, or CLI dashboards.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>System Administration:</strong> Quickly check dates when reviewing logs (e.g., <code className="text-sm">cal 12 2024</code>).</li>
                <li><strong>Backup Scheduling:</strong> Combine with <code className="text-sm">cron</code> to generate monthly calendar reports.</li>
                <li><strong>Educational Tools:</strong> Teach students about date arithmetic and Gregorian calendar logic.</li>
                <li><strong>CLI Dashboards:</strong> Embed <code className="text-sm">cal -3</code> in <code className="text-sm">.bashrc</code> or welcome messages.</li>
                <li><strong>Historical Research:</strong> <code className="text-sm">cal 9 1752</code> shows the Gregorian calendar adoption (11 days missing!).</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Jump to a specific month:</strong> <code className="text-sm">cal 08 2025</code> (month can be 1-12 or name like 'Aug').</li>
                <li><strong>Julian dates:</strong> <code className="text-sm">cal -j</code> shows day-of-year numbers (1-366). Great for data processing.</li>
                <li><strong>Highlight today:</strong> Use <code className="text-sm">cal | sed "s/$(date +%e)/\\\x1b[7m&\\\x1b[0m/"</code> for reverse video.</li>
                <li><strong>As a countdown:</strong> <code className="text-sm">echo $(( ($(date -d "2025-12-31" +%s) - $(date +%s)) / 86400 ))</code> days left — use cal to verify.</li>
                <li><strong>Monday first week:</strong> <code className="text-sm">cal -m</code> (many regions start week on Monday).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration Step-by-step */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">📊 How `cal` Processes Your Request</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Step 1: Terminal Input */}
            <rect x="20" y="30" width="180" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="110" y="60" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. User types</text>
            <text x="110" y="85" textAnchor="middle" fill="currentColor" fontSize="13" fontFamily="monospace">cal 03 2025</text>

            {/* Arrow 1 */}
            <line x1="200" y1="70" x2="250" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="225" y="60" textAnchor="middle" fill="#6b7280" fontSize="10">parse</text>

            {/* Step 2: Argument Parsing */}
            <rect x="260" y="30" width="180" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="350" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">2. Parse options</text>
            <text x="350" y="75" textAnchor="middle" fill="currentColor" fontSize="12">month=3, year=2025</text>
            <text x="350" y="95" textAnchor="middle" fill="currentColor" fontSize="12">highlight today (optional)</text>

            {/* Arrow 2 */}
            <line x1="440" y1="70" x2="490" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Step 3: Calculate Layout */}
            <rect x="500" y="30" width="180" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="590" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. Compute grid</text>
            <text x="590" y="75" textAnchor="middle" fill="currentColor" fontSize="12">days, weeks,</text>
            <text x="590" y="95" textAnchor="middle" fill="currentColor" fontSize="12">starting weekday</text>

            {/* Arrow 3 */}
            <line x1="680" y1="70" x2="730" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Step 4: Output */}
            <rect x="740" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="810" y="60" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Display</text>
            <text x="810" y="85" textAnchor="middle" fill="currentColor" fontSize="12">ASCII calendar</text>

            {/* Arrow marker definition */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            {/* Background grid and labels */}
            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Command-line → option parsing → Gregorian calculation → formatted output</text>

            {/* Decorative current day highlight */}
            <circle cx="810" cy="180" r="15" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="810" y="184" textAnchor="middle" fill="currentColor" fontSize="10">Today</text>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            ✨ Hover over each step to see emphasis — `cal` translates your request into a formatted calendar grid.
          </p>
        </div>
      </section>

      {/* Shell Examples Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={calBasicSh} title="Basic Calendar Display" highlightLines={[5, 8]} />
          <ShellFileLoader fileModule={calOptionsSh} title="Using Common Options (-3, -y, -j)" highlightLines={[3, 7, 11]} />
          <ShellFileLoader fileModule={calScriptingSh} title="Calendar in Scripts (backup planning)" highlightLines={[10, 15]} />
          <ShellFileLoader fileModule={calYearlySh} title="Year Overview & Automation" highlightLines={[6, 12]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Wrong order:</strong> <code className="text-sm">cal 2025 03</code> — year must be first if only two args? Actually <code>cal month year</code> or <code>cal year</code>. Many confuse with <code>date</code>.</li>
            <li><strong>Assuming highlighting everywhere:</strong> Not all terminals highlight current day; use <code>cal -h</code> to disable if needed.</li>
            <li><strong>Gregorian vs Julian:</strong> <code>cal -j</code> still follows Gregorian calendar rules, only changes numbering.</li>
            <li><strong>Leap year confusion:</strong> Check <code>cal 02 2100</code> — 2100 is not a leap year (divisible by 100 but not 400).</li>
            <li><strong>Missing year range:</strong> Default year range 1-9999? Actually many versions support 1-9999, but be careful with historical BC.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Use `cal -3` for context:</strong> Shows previous, current, next month — great for planning.</li>
            <li><strong>Combine with `grep`:</strong> <code className="text-sm">cal | grep -E "2025|March"</code> to highlight.</li>
            <li><strong>Create an alias:</strong> <code className="text-sm">alias wk='cal -3'</code> for quick weekly view.</li>
            <li><strong>Documentation:</strong> Always use <code className="text-sm">man cal</code> for version-specific options.</li>
            <li><strong>Script friendly:</strong> Use <code className="text-sm">cal -h</code> (no highlight) and redirect to files without escape codes.</li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>How would you display the calendar for your birth month and year using <code>cal</code>?</li>
            <li>What happens if you give <code>cal 0 2025</code>? Try it! (Month 0 is December previous year)</li>
            <li>Why does <code>cal 9 1752</code> show missing days (Sep 3-13)? Historical calendar reform.</li>
            <li>How can you use <code>cal</code> inside a <code>.bashrc</code> welcome message without slowing login?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can display current month with <code>cal</code>.</li>
            <li>✅ Can show previous/current/next month using <code>-3</code>.</li>
            <li>✅ Can show full year with <code>-y</code> or <code>cal 2025</code>.</li>
            <li>✅ Can use Julian dates <code>-j</code> for day-of-year.</li>
            <li>✅ Knows that <code>cal</code> follows Gregorian calendar rules.</li>
            <li>✅ Understands that <code>cal</code> is for display, not for date arithmetic.</li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about cal Command" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border-l-8 border-indigo-500 teacher-note-hover transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center text-xl">
              👨‍🏫
            </div>
            <div>
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">Teacher's Note</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sukanta Hui • {experienceYears} years experience (since 1998)</p>
            </div>
          </div>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong>✉️ Email:</strong> sukantahui@codernaccotax.co.in | <strong>📞 Mobile:</strong> 7003756860</p>
            <p><strong>💻 Expertise:</strong> Programming Language, RDBMs, Operating System, Web Development</p>
            <hr className="my-3 border-gray-300 dark:border-gray-700" />
            <p><strong>🎓 Classroom Tip:</strong> When teaching <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">cal</code>, I always start with the historical 1752 example — it grabs attention and shows why calendar logic matters. Also, ask students to write a one-liner that displays a 3-month calendar and counts how many days until the end of the year. This transforms a simple command into a scripting challenge.</p>
            <p><strong>⚠️ Remember:</strong> <code>cal</code> is often the first command new users see that has "magic" (highlighting). Ensure they understand it's not a GUI but a powerful terminal utility used daily by sysadmins.</p>
            <p><strong>🚀 Pro Challenge:</strong> Combine <code>cal -j</code> with <code>bc</code> to calculate the average day number of the current month — then discuss why Julian dates are used in data pipelines.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic0;