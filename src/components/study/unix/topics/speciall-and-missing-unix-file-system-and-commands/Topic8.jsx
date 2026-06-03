import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import redirectBasics from './topic8_files/redirect_basics.sh?raw';
import redirectAppend from './topic8_files/redirect_append.sh?raw';
import redirectErrors from './topic8_files/redirect_errors.sh?raw';

// Import 30 FAQ questions
import questions from './topic8_files/topic8_questions';

// Inline keyframes for animations
const animations = `
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-slide-up {
    animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-slide-up {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`;

// 20 interactive questions (click to reveal answer)
const interactiveQuestions = [
  { q: "What does `>` do in the shell?", a: "Redirects standard output (stdout) to a file, overwriting the file if it exists." },
  { q: "What does `>>` do?", a: "Redirects standard output to a file, appending to the file (creating it if it doesn't exist)." },
  { q: "How do you redirect standard error (stderr) only?", a: "`command 2> error.log`" },
  { q: "How do you redirect both stdout and stderr to the same file?", a: "`command > output.log 2>&1` or `command &> output.log` (bash)." },
  { q: "What is the difference between `2>&1` and `2>&1` placement?", a: "Order matters: `> file 2>&1` sends both to file; `2>&1 > file` sends stderr to current stdout (terminal) then stdout to file – stderr not captured." },
  { q: "What does `2> /dev/null` do?", a: "Discards error messages by redirecting stderr to the null device." },
  { q: "How do you append stderr to a file?", a: "`command 2>> error.log`" },
  { q: "How can you redirect stdout and stderr to two different files?", a: "`command > stdout.log 2> stderr.log`" },
  { q: "What is the purpose of `1>`?", a: "Explicitly redirects stdout (same as `>`). Usually omitted because `>` defaults to stdout." },
  { q: "What does `&>` do in bash?", a: "Redirects both stdout and stderr to a file (bash-specific). Example: `command &> all.log`." },
  { q: "How do you append stderr to stdout's file?", a: "`command >> file 2>&1` (append both)." },
  { q: "What happens when you run `> file` without a command?", a: "Creates an empty file (truncates existing file)." },
  { q: "How do you redirect only stdout to a file and still see stderr on terminal?", a: "`command > file` (stderr goes to terminal by default)." },
  { q: "How do you redirect a specific file descriptor (e.g., 3) to a file?", a: "`exec 3> file` then `command >&3`." },
  { q: "What is the meaning of `2>&1` inside a script?", a: "Send stderr to wherever stdout is currently going (duplicate file descriptor 1)." },
  { q: "How can you prevent overwriting a file with `>` (clobber)?", a: "Use `set -o noclobber`; then `>|` forces overwrite." },
  { q: "What does `|` (pipe) have to do with redirection?", a: "Pipe redirects stdout of left command to stdin of right command. It's a form of redirection between processes." },
  { q: "How do you redirect stdout to a file and also to terminal (tee)?", a: "`command | tee file` (writes to file and stdout). Use `tee -a` to append." },
  { q: "What is the difference between `&>` and `2>&1`?", a: "`&>` is shorthand that works only in bash/ksh; `2>&1` is POSIX and works in all shells." },
  { q: "How do you check if redirection to a file succeeded (e.g., disk full)?", a: "Shell does not automatically exit; check `$?` after command but the redirection itself may fail before command runs. Use `if ! command >file 2>&1; then echo 'failed'; fi`." }
];

function InteractiveQuestionsBlock() {
  const [revealed, setRevealed] = useState(Array(interactiveQuestions.length).fill(false));
  const toggle = (idx) => {
    setRevealed(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };
  return (
    <div className="mt-16 rounded-2xl bg-white/50 dark:bg-gray-800/50 p-6 shadow-lg backdrop-blur-sm">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100 border-l-4 border-indigo-500 pl-4">
        🧠 Test Your Knowledge – 20 Redirection Operators Questions
      </h3>
      <div className="grid gap-4 md:grid-cols-1">
        {interactiveQuestions.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
            <div className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{idx+1}. {item.q}</p>
                <button
                  onClick={() => toggle(idx)}
                  className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-200 dark:bg-indigo-900/60 dark:text-indigo-200"
                >
                  {revealed[idx] ? "Hide" : "Show answer"}
                </button>
              </div>
              {revealed[idx] && (
                <div className="mt-3 rounded-lg bg-indigo-50 p-3 text-gray-700 dark:bg-indigo-900/30 dark:text-gray-200">
                  {item.a}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Topic8() {
  const [hoverSvg, setHoverSvg] = useState(false);
  const cardDelays = ["animation-delay-0", "animation-delay-100", "animation-delay-200", "animation-delay-300"];

  return (
    <>
      <style>{animations}</style>
      <style>{`
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        @media (prefers-reduced-motion: reduce) {
          [class*="animation-delay-"] { animation-delay: 0ms; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">

          {/* Hero */}
          <div className="animate-fade-slide-up mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Redirection Operators (<code className="text-3xl bg-transparent">&gt;</code> and <code className="text-3xl bg-transparent">&gt;&gt;</code>)
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Control where output goes – overwrite, append, and manage error streams. Master command line I/O redirection.
            </p>
          </div>

          {/* SVG Illustration: flow of redirection */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <text x="350" y="30" textAnchor="middle" fill="#1E293B" className="dark:text-white" fontSize="16" fontWeight="bold">Standard Streams & Redirectors</text>
                
                {/* stdin */}
                <rect x="50" y="60" width="120" height="50" rx="6" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
                <text x="110" y="90" textAnchor="middle" fill="#1E1B4B" fontSize="13" fontWeight="bold">stdin (0)</text>
                <text x="110" y="105" textAnchor="middle" fill="#4B5563" fontSize="10">input</text>
                
                {/* command box */}
                <rect x="250" y="50" width="150" height="70" rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
                <text x="325" y="80" textAnchor="middle" fill="#065F46" fontSize="14" fontWeight="bold">Command</text>
                <text x="325" y="100" textAnchor="middle" fill="#4B5563" fontSize="10">(process)</text>
                
                {/* stdout */}
                <rect x="470" y="50" width="120" height="50" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
                <text x="530" y="80" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">stdout (1)</text>
                <text x="530" y="95" textAnchor="middle" fill="#4B5563" fontSize="10">normal output</text>
                
                {/* stderr */}
                <rect x="470" y="130" width="120" height="50" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
                <text x="530" y="160" textAnchor="middle" fill="#991B1B" fontSize="13" fontWeight="bold">stderr (2)</text>
                <text x="530" y="175" textAnchor="middle" fill="#4B5563" fontSize="10">errors</text>
                
                {/* arrows */}
                <line x1="170" y1="85" x2="250" y2="85" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowPurp)" />
                <line x1="400" y1="85" x2="470" y2="75" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                <line x1="400" y1="85" x2="470" y2="155" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
                
                <defs>
                  <marker id="arrowPurp" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4F46E5" /></marker>
                  <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6" /></marker>
                  <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#EF4444" /></marker>
                </defs>
                
                {/* Redirection syntax boxes */}
                <rect x="50" y="170" width="250" height="30" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                <text x="175" y="190" textAnchor="middle" fill="#92400E" fontSize="12">`>` file overwrite stdout</text>
                
                <rect x="320" y="170" width="250" height="30" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                <text x="445" y="190" textAnchor="middle" fill="#92400E" fontSize="12">`>>` file append stdout</text>
                
                <rect x="50" y="210" width="250" height="30" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                <text x="175" y="230" textAnchor="middle" fill="#92400E" fontSize="12">`2>` file redirect stderr</text>
                
                <rect x="320" y="210" width="250" height="30" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                <text x="445" y="230" textAnchor="middle" fill="#92400E" fontSize="12">`2>&1` stderr→stdout</text>

                {hoverSvg && (
                  <text x="350" y="255" textAnchor="middle" fill="#F59E0B" fontSize="13">💡 `&>` redirects both stdout and stderr (bash)</text>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
            {[
              { title: "📤 Overwrite (`>`)", content: "Sends stdout to a file, overwriting existing content. Creates file if not exists. Danger: can erase data." },
              { title: "📥 Append (`>>`)", content: "Sends stdout to a file, adding to the end. Preserves existing content. Safer for logs." },
              { title: "⚠️ Error Redirection", content: "`2> file` redirects stderr. `2>> file` appends. Use `2>&1` to combine with stdout." },
              { title: "🔁 File Descriptors", content: "0=stdin, 1=stdout, 2=stderr. Others can be used (3-9). `&` duplicates a file descriptor." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 4])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 Redirection Syntax</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# Overwrite stdout
command > file

# Append stdout
command >> file

# Redirect stderr (error output)
command 2> error.log
command 2>> error.log

# Redirect both stdout and stderr to same file (POSIX)
command > file 2>&1

# Bash shorthand for both
command &> file
command &>> file

# Discard output
command > /dev/null
command 2> /dev/null

# Redirect one file descriptor to another
# Send stdout to stderr
echo "message" 1>&2

# Use >| to force overwrite even with noclobber
set -o noclobber
echo "force" >| file`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Control where command output goes – files, devices, or other commands. <strong>When/Why:</strong> Logging, silent background jobs, script automation, error handling, and building pipelines.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, Swadeep runs a backup script that appends logs with `>> backup.log`. Tuhina uses `grep pattern file > results.txt` to save search results. Debangshu suppresses cron job noise with `script.sh > /dev/null 2>&1`.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 Redirection in Action</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <ShellFileLoader fileModule={redirectBasics} title="redirect_basics.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={redirectAppend} title="redirect_append.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={redirectErrors} title="redirect_errors.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Always test redirection with `echo` or `ls` first. Remember that order matters: `> file 2>&1` vs `2>&1 > file` produce different results.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use `>>` in cron jobs to prevent losing previous log entries.</li>
                <li>To redirect both stdout and stderr to separate files and also see them on terminal, use `command > out 2> err ; cat out err` or `tee`.</li>
                <li>Use `exec 2> error.log` to redirect all subsequent stderr in a script.</li>
                <li>For temporary suppression: `command 2>/dev/null`.</li>
                <li>Use `set -o noclobber` to prevent accidental overwrites; then `>|` forces overwrite.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Confusing `>` and `>>` – using `>` when you meant `>>` erases previous data.</li>
                <li>Misplacing `2>&1`: `command 2>&1 > file` sends stderr to current stdout (terminal) and only stdout to file.</li>
                <li>Forgetting to quote spaces in filenames: `command > "my file.txt"`.</li>
                <li>Assuming `&>` works in POSIX shells (it's bash/ksh). Use `> file 2>&1` for portability.</li>
                <li>Redirection inside a pipeline affects only the command it applies to, not the whole pipeline.</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">For logging:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>Use `>>` for persistent logs (append).</li>
                  <li>Redirect stderr separately or combine with `2>&1`.</li>
                  <li>Consider log rotation to avoid huge files.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">For safety:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Enable `noclobber` in interactive shells.</li>
                  <li>☑️ Test destructive redirections with `echo` first.</li>
                  <li>☑️ Always quote file paths containing spaces.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">What happens when you run `echo hello > file` and then `echo world > file`? The second overwrites. Now try `set -o noclobber` and repeat. How do you override? Use `>|`. Also, try `find / -name core 2>/dev/null` – why would you redirect errors to /dev/null? (To hide permission denied messages.)</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="Redirection is the foundation of shell scripting. I start with a simple example: `ls > list.txt` then `cat list.txt`. Then show `date >> list.txt` (append). The epiphany comes when we combine stderr: `find / -name '*.conf' 2>/dev/null`. I also demonstrate the perils of `>` in a directory with important files – they never forget to double-check after that!" />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="Redirection Operators – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}