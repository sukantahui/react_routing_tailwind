import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import echoBasicSh from './topic5_files/echo_basic.sh?raw';
import echoOptionsSh from './topic5_files/echo_options.sh?raw';
import echoVariablesSh from './topic5_files/echo_variables.sh?raw';
import echoFormattingSh from './topic5_files/echo_formatting.sh?raw';

/**
 * Topic5 Component: Displaying text using echo command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'echo' command in Unix/Linux for outputting text to the terminal.
 * @usage Used in classroom environments to teach basic output, variable printing, and text formatting.
 */
const Topic5 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive echo simulator
  const [echoText, setEchoText] = useState('Hello, Barrackpore!');
  const [echoOptions, setEchoOptions] = useState('');
  const [echoOutput, setEchoOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    let output = echoText;
    if (echoOptions === '-n') {
      output = echoText + ' (no newline)';
    } else if (echoOptions === '-e') {
      output = echoText.replace(/\\n/g, '\n').replace(/\\t/g, '    ');
    } else if (echoOptions === '-E') {
      output = echoText;
    }
    setEchoOutput(output);
  }, [echoText, echoOptions]);

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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent mb-4">
            📢 The `echo` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Display text, variables, and formatted messages — the most fundamental output command in Unix/Linux.
          </p>
        </div>

        {/* Interactive Echo Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Try echo live
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Text to echo:</label>
            <input
              type="text"
              value={echoText}
              onChange={(e) => setEchoText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono"
              placeholder="Enter text..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Options:</label>
            <select
              value={echoOptions}
              onChange={(e) => setEchoOptions(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <option value="">None (default with newline)</option>
              <option value="-n">-n (no newline)</option>
              <option value="-e">-e (enable escapes: \n, \t)</option>
              <option value="-E">-E (disable escapes, default)</option>
            </select>
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>echo {echoOptions} "{echoText}"</span>
            </div>
            <pre className={clsx('whitespace-pre-wrap transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {echoOutput}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 `echo` is used in almost every shell script to provide feedback to the user.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `echo`?</h2>
              <p className="mb-3">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">echo</code> command is one of the simplest and most frequently used utilities.
                It outputs its arguments to standard output (usually the terminal), separated by spaces and followed by a newline.
              </p>
              <p>
                From printing "Hello World" to displaying variable values, `echo` is the foundation of user interaction in shell scripts.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>echo [OPTIONS] [STRING...]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Display a line of text.</li>
                <li><strong>Return:</strong> Writes output to stdout (exit 0 unless write error).</li>
                <li><strong>When used:</strong> In every script that needs to give feedback, show variable values, or format output.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>User prompts:</strong> <code className="text-sm">echo -n "Enter your name: "; read name</code></li>
                <li><strong>Debugging scripts:</strong> <code className="text-sm">echo "Variable value is: $var"</code></li>
                <li><strong>Generating file content:</strong> <code className="text-sm">echo "Hello" &gt; file.txt</code></li>
                <li><strong>Shell prompt customization:</strong> Displaying system info in PS1.</li>
                <li><strong>Progress indicators:</strong> <code className="text-sm">echo -n "."; sleep 1; echo " Done"</code></li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Print without newline:</strong> <code className="text-sm">echo -n "Message"</code> (or <code>printf</code> for portability).</li>
                <li><strong>Enable escape sequences:</strong> <code className="text-sm">echo -e "Line1\nLine2"</code></li>
                <li><strong>Print literal backslashes:</strong> <code className="text-sm">echo -E "C:\\Users"</code> or use single quotes.</li>
                <li><strong>Use variable expansion:</strong> <code className="text-sm">echo "Today is $(date)"</code></li>
                <li><strong>Colorize output with ANSI codes:</strong> <code className="text-sm">echo -e "\e[31mRed text\e[0m"</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">📢 How `echo` Works</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="180" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="110" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. User types</text>
            <text x="110" y="75" textAnchor="middle" fill="currentColor" fontSize="12">echo "Hello World"</text>
            
            <line x1="200" y1="70" x2="250" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow5)" />
            
            <rect x="260" y="30" width="180" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="350" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">2. Parse arguments</text>
            <text x="350" y="75" textAnchor="middle" fill="currentColor" fontSize="12">options, whitespace handling</text>
            
            <line x1="440" y1="70" x2="490" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow5)" />
            
            <rect x="500" y="30" width="180" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="590" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. Process escapes</text>
            <text x="590" y="75" textAnchor="middle" fill="currentColor" fontSize="12">if -e, convert \n, \t etc.</text>
            
            <line x1="680" y1="70" x2="730" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow5)" />
            
            <rect x="740" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="810" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Output</text>
            <text x="810" y="75" textAnchor="middle" fill="currentColor" fontSize="12">Hello World + newline</text>

            <defs>
              <marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Arguments → parsing → escaping → stdout</text>
            <circle cx="810" cy="180" r="15" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="810" y="184" textAnchor="middle" fill="currentColor" fontSize="10">You see</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={echoBasicSh} title="Basic Echo Usage" highlightLines={[4,8,12]} />
          <ShellFileLoader fileModule={echoOptionsSh} title="Options: -n, -e, -E" highlightLines={[5,10,15]} />
          <ShellFileLoader fileModule={echoVariablesSh} title="Displaying Variables" highlightLines={[6,12,18]} />
          <ShellFileLoader fileModule={echoFormattingSh} title="Formatting with Colors & Escapes" highlightLines={[8,16,24]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Portability issues:</strong> Options like `-e`, `-n` vary between shells (bash, dash, zsh). Use `printf` for consistent behavior.</li>
            <li><strong>Variables not expanded inside single quotes:</strong> <code className="text-sm">echo '$HOME'</code> prints $HOME, not the path.</li>
            <li><strong>Double quoting to preserve spaces:</strong> <code className="text-sm">echo $var</code> collapses spaces; use `echo "$var"`.</li>
            <li><strong>Escape sequences need `-e`:</strong> Without `-e`, `\n` prints literally.</li>
            <li><strong>Leading dashes misinterpreted as options:</strong> Use `echo -- "-n"` or `printf`.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Always quote variables:</strong> `echo "$variable"` to prevent word splitting.</li>
            <li><strong>Use `printf` for complex formatting:</strong> It's more predictable across platforms.</li>
            <li><strong>For user prompts, use `echo -n` or `printf` to keep input on same line.</strong></li>
            <li><strong>Use `echo` to debug: insert `echo "DEBUG: var=$var"` during development.</strong></li>
            <li><strong>Redirect error messages to stderr:</strong> <code className="text-sm">echo "Error" &gt;&amp;2</code></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>What happens if you type `echo "Hello   World"`? How many spaces appear?</li>
            <li>Why would you use `echo -n` in a script?</li>
            <li>How can you print a newline without `-e`? (Hint: use `echo $'\n'` in bash)</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can print text with `echo`.</li>
            <li>✅ Can print variables using double quotes.</li>
            <li>✅ Knows the difference between single and double quotes.</li>
            <li>✅ Can suppress newline with `-n`.</li>
            <li>✅ Can enable escape sequences with `-e`.</li>
            <li>✅ Understands that `echo` is not always portable and may fallback to `printf`.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about echo Command" questions={questions} />
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
            <p><strong>🎓 Classroom Tip:</strong> Start with `echo "Hello, World!"` to get students comfortable. Then show `echo $HOME`, `echo "Today is $(date)"`, and finally colored output. Emphasize that `echo` is their primary debugging tool.</p>
            <p><strong>⚠️ Remember:</strong> Many students get confused between `echo` and `printf`. Explain that `echo` is simpler but `printf` is more reliable for complex formatting. Show both and let them choose.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a script that asks for a user's name, then prints a personalized greeting with ASCII art using `echo -e`. This combines variables, escapes, and creativity.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic5;