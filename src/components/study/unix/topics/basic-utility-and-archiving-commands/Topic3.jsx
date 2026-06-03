import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import whoBasicSh from './topic3_files/who_basic.sh?raw';
import whoOptionsSh from './topic3_files/who_options.sh?raw';
import whoScriptingSh from './topic3_files/who_scripting.sh?raw';
import whoMonitorSh from './topic3_files/who_monitor.sh?raw';

/**
 * Topic3 Component: Displaying logged-in users using who command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'who' command in Unix/Linux for listing logged-in users.
 * @usage Used in classroom environments to teach user monitoring, system administration, and security auditing.
 */
const Topic3 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive simulator - simulate who output with mock data
  const [whoOption, setWhoOption] = useState('who');
  const [whoOutput, setWhoOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock logged-in users data (like real system)
  const mockUsers = [
    { user: 'swadeep', tty: 'pts/0', date: '2025-03-18 09:23', idle: '  .', pid: '1234', comment: '(192.168.1.10)' },
    { user: 'tuhina', tty: 'pts/1', date: '2025-03-18 10:15', idle: '02:30', pid: '2345', comment: '(192.168.1.11)' },
    { user: 'abhronila', tty: 'tty2', date: '2025-03-18 08:00', idle: '  .', pid: '3456', comment: '(:0)' },
    { user: 'debangshu', tty: 'pts/3', date: '2025-03-18 11:45', idle: '  .', pid: '4567', comment: '(10.0.0.25)' },
    { user: 'sukanta', tty: 'pts/4', date: '2025-03-18 12:00', idle: '  .', pid: '5678', comment: '(teacher)' },
  ];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    
    if (whoOption === 'who') {
      setWhoOutput(mockUsers.map(u => `${u.user}     ${u.tty}         ${u.date} ${u.idle} ${u.pid} ${u.comment}`).join('\n'));
    } else if (whoOption === 'who -b') {
      setWhoOutput('system boot  2025-03-18 07:45');
    } else if (whoOption === 'who -q') {
      setWhoOutput('swadeep tuhina abhronila debangshu sukanta\n# users=5');
    } else if (whoOption === 'who -u') {
      setWhoOutput(mockUsers.map(u => `${u.user}     ${u.tty}         ${u.date} ${u.idle} ${u.pid} ${u.comment}`).join('\n'));
    } else if (whoOption === 'who -r') {
      setWhoOutput('run-level 5  2025-03-18 07:45');
    } else if (whoOption === 'who am i') {
      setWhoOutput('sukanta   pts/4        2025-03-18 12:00 (teacher)');
    } else if (whoOption === 'who --version') {
      setWhoOutput('who (GNU coreutils) 9.3\nWritten by Joseph Arceneaux, David MacKenzie, Michael Stone.');
    } else {
      setWhoOutput('Usage: who [OPTION]... [ FILE | ARG1 ARG2 ]\nTry \'who --help\' for more information.');
    }
  }, [whoOption, mockUsers]);

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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-4">
            👥 The `who` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Display who is logged into the system — essential for system monitoring, auditing, and user management.
          </p>
        </div>

        {/* Interactive Terminal Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Try it live
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              'who', 'who -b', 'who -q', 'who -u', 'who -r', 'who am i', 'who --version'
            ].map(cmd => (
              <button
                key={cmd}
                onClick={() => setWhoOption(cmd)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all',
                  whoOption === cmd
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
              <span>{whoOption}</span>
            </div>
            <pre className={clsx('whitespace-pre-wrap transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {whoOutput}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 `who` reads from `/var/run/utmp` — the system's user accounting database.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `who`?</h2>
              <p className="mb-3">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">who</code> command displays information about users who are currently logged into the system.
                It reads the <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">/var/run/utmp</code> file (or similar) which tracks login sessions.
              </p>
              <p>
                System administrators use `who` to see who is using the system, from which terminal or IP address,
                and how long they have been idle. It's a fundamental auditing tool.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>who [OPTION]... [ FILE | ARG1 ARG2 ]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Show who is logged on to the system.</li>
                <li><strong>Return:</strong> Outputs user list to stdout (exit 0 on success).</li>
                <li><strong>When used:</strong> For monitoring, writing login scripts, auditing security, or just curiosity.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Server monitoring:</strong> Check how many users are currently logged in before a reboot.</li>
                <li><strong>Security auditing:</strong> Detect unauthorized logins from unknown IPs.</li>
                <li><strong>Teaching environment:</strong> In a lab, see which students are logged into which terminal.</li>
                <li><strong>Automated reports:</strong> Mail a list of logged-in users to the admin every hour.</li>
                <li><strong>Idle time tracking:</strong> Use `who -u` to see idle times and maybe log out idle users.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Count logged-in users:</strong> <code className="text-sm">who -q | grep -c '^[a-z]'</code> or just <code className="text-sm">who -q</code> shows count.</li>
                <li><strong>Show your own login:</strong> <code className="text-sm">who am i</code> (exact wording).</li>
                <li><strong>Boot time:</strong> <code className="text-sm">who -b</code> tells when the system was last rebooted.</li>
                <li><strong>Run level:</strong> <code className="text-sm">who -r</code> shows current runlevel (Linux).</li>
                <li><strong>Legacy file:</strong> Use <code className="text-sm">who /var/log/wtmp</code> to see historical logins (binary file).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">📊 How `who` Retrieves User Information</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="180" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="110" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. User logs in</text>
            <text x="110" y="75" textAnchor="middle" fill="currentColor" fontSize="12">Login process writes to utmp</text>
            
            <line x1="200" y1="70" x2="250" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow3)" />
            
            <rect x="260" y="30" width="180" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="350" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">2. utmp database</text>
            <text x="350" y="75" textAnchor="middle" fill="currentColor" fontSize="12">/var/run/utmp (binary)</text>
            
            <line x1="440" y1="70" x2="490" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow3)" />
            
            <rect x="500" y="30" width="180" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="590" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. who command</text>
            <text x="590" y="75" textAnchor="middle" fill="currentColor" fontSize="12">reads utmp, formats output</text>
            
            <line x1="680" y1="70" x2="730" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow3)" />
            
            <rect x="740" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="810" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Display list</text>
            <text x="810" y="75" textAnchor="middle" fill="currentColor" fontSize="12">username, tty, time, IP</text>

            <defs>
              <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Login → utmp → who → readable user list</text>
            <circle cx="810" cy="180" r="15" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="810" y="184" textAnchor="middle" fill="currentColor" fontSize="10">Admin</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={whoBasicSh} title="Basic User Listing" highlightLines={[4,9]} />
          <ShellFileLoader fileModule={whoOptionsSh} title="Exploring Options (-b, -q, -u, -r)" highlightLines={[5,12,18]} />
          <ShellFileLoader fileModule={whoScriptingSh} title="Scripting with who" highlightLines={[8,15,22]} />
          <ShellFileLoader fileModule={whoMonitorSh} title="User Monitoring & Alerting" highlightLines={[10,20]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Confusing `who` with `w` or `users`:</strong> `w` shows more details (load avg, commands); `users` just lists names.</li>
            <li><strong>Assuming `who` shows remote IPs on all systems:</strong> Some configurations hide IPs, or show `:0` for local displays.</li>
            <li><strong>Reading `/var/run/utmp` directly without `who`:</strong> It's a binary file; use `who` or `utmpdump`.</li>
            <li><strong>Forgetting that `who am i` shows the user associated with stdin, not necessarily all users.</strong></li>
            <li><strong>Misinterpreting idle time:</strong> A dot (.) means less than 1 minute idle; a colon (:) means idle time > 24h.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Use `who -u` to see idle times:</strong> Helps identify inactive sessions for cleanup.</li>
            <li><strong>Redirect output to a log file for auditing:</strong> <code className="text-sm">who &gt;&gt; /var/log/userlogins</code></li>
            <li><strong>Combine with `grep` to filter specific users:</strong> <code className="text-sm">who | grep 'swadeep'</code></li>
            <li><strong>Use `who` in cron jobs to alert on unusual logins (e.g., root from unknown IP).</strong></li>
            <li><strong>Prefer `who -q` when you only need a count.</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>How would you detect if a specific user (e.g., 'debangshu') is logged in?</li>
            <li>Why might `who` show a user on `tty2` and another on `pts/0`? What's the difference?</li>
            <li>What happens to `who` output if the utmp file gets corrupted?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can display currently logged-in users using `who`.</li>
            <li>✅ Can show system boot time with `who -b`.</li>
            <li>✅ Can display idle times using `who -u`.</li>
            <li>✅ Can count logged-in users with `who -q`.</li>
            <li>✅ Knows the difference between `who`, `w`, and `users`.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about who Command" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> In a lab with many students, have everyone run `who` and see each other's sessions. Then explain the difference between local (`tty`) and pseudo-terminal (`pts`) sessions. It's a great way to demystify terminal multiplexers like `tmux`.</p>
            <p><strong>⚠️ Remember:</strong> `who` reads from `utmp`, which is only updated at login/logout. For real-time monitoring, `w` or `top` may be better. Also, on very busy servers, `who` can be slow because it reads the entire utmp file.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that runs every 5 minutes via cron, checks `who | wc -l`, and if the user count exceeds 10, sends an email alert to the admin. This teaches scheduling and system monitoring.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic3;