import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import findBasics from './topic6_files/find_basics.sh?raw';
import findAdvanced from './topic6_files/find_advanced.sh?raw';
import findActions from './topic6_files/find_actions.sh?raw';

// Import 30 FAQ questions
import questions from './topic6_files/topic6_questions';

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
  { q: "What is the primary purpose of the `find` command?", a: "Search for files and directories in a directory hierarchy based on various criteria (name, size, time, permissions, etc.)." },
  { q: "How do you find all files named `config.txt` starting from current directory?", a: "`find . -name 'config.txt'`" },
  { q: "What option makes the search case‑insensitive?", a: "`-iname` (e.g., `find . -iname '*.jpg'`)." },
  { q: "How do you find only directories (not regular files)?", a: "`find . -type d`" },
  { q: "How do you find only regular files?", a: "`find . -type f`" },
  { q: "How do you find files larger than 100 megabytes?", a: "`find . -size +100M`" },
  { q: "How do you find files modified in the last 7 days?", a: "`find . -mtime -7`" },
  { q: "How do you find files accessed more than 30 days ago?", a: "`find . -atime +30`" },
  { q: "How do you find files that are empty (zero bytes)?", a: "`find . -empty`" },
  { q: "How do you execute a command on each found file?", a: "Use `-exec` or `-ok` (e.g., `find . -name '*.tmp' -exec rm {} \\;`)." },
  { q: "What is the difference between `-exec` and `-ok`?", a: "`-ok` prompts for confirmation before executing for each file." },
  { q: "How do you delete files directly with `find` without using `-exec rm`?", a: "`find . -name '*.log' -delete`" },
  { q: "How do you limit the search depth to only the current directory (no subdirectories)?", a: "`find . -maxdepth 1 -name '*.txt'`" },
  { q: "How do you combine multiple conditions with logical AND?", a: "`find . -type f -size +10M -name '*.log'` (AND is default)." },
  { q: "How do you combine conditions with logical OR?", a: "`find . -name '*.jpg' -o -name '*.png'`" },
  { q: "What does `find . -perm 644` do?", a: "Finds files with exact permissions 644 (rw-r--r--)." },
  { q: "How do you find files owned by a specific user (e.g., `swadeep`)?", a: "`find /home -user swadeep`" },
  { q: "How do you find files that do NOT match a pattern?", a: "Use `!` or `-not`: `find . ! -name '*.txt'`" },
  { q: "What does `-prune` do in `find`?", a: "Excludes a directory from the search (prevents descending into it)." },
  { q: "How do you find files by inode number?", a: "`find . -inum 12345`" }
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
        🧠 Test Your Knowledge – 20 find Command Questions
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

export default function Topic6() {
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
              Finding Files & Directories (find)
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The ultimate file‑searching tool – filter by name, type, size, time, permissions, and execute actions on results.
            </p>
          </div>

          {/* SVG Illustration: find decision tree */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <rect x="260" y="20" width="200" height="40" rx="8" fill="#4F46E5" />
                <text x="360" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">find /path</text>
                
                {/* Branch: name */}
                <line x1="360" y1="60" x2="130" y2="120" stroke="#3B82F6" strokeWidth="2" />
                <circle cx="130" cy="120" r="6" fill="#3B82F6" />
                <text x="130" y="145" textAnchor="middle" fill="#3B82F6" fontSize="12">-name</text>
                <text x="130" y="160" textAnchor="middle" fill="#4B5563" fontSize="11">"*.txt"</text>
                
                {/* Branch: type */}
                <line x1="360" y1="60" x2="360" y2="120" stroke="#10B981" strokeWidth="2" />
                <circle cx="360" cy="120" r="6" fill="#10B981" />
                <text x="360" y="145" textAnchor="middle" fill="#10B981" fontSize="12">-type f</text>
                <text x="360" y="160" textAnchor="middle" fill="#4B5563" fontSize="11">(regular file)</text>
                
                {/* Branch: size */}
                <line x1="360" y1="60" x2="590" y2="120" stroke="#F59E0B" strokeWidth="2" />
                <circle cx="590" cy="120" r="6" fill="#F59E0B" />
                <text x="590" y="145" textAnchor="middle" fill="#F59E0B" fontSize="12">-size +10M</text>
                <text x="590" y="160" textAnchor="middle" fill="#4B5563" fontSize="11">larger than 10MB</text>
                
                {/* Combine to -exec */}
                <line x1="130" y1="180" x2="130" y2="230" stroke="#8B5CF6" strokeWidth="2" />
                <line x1="360" y1="180" x2="360" y2="230" stroke="#8B5CF6" strokeWidth="2" />
                <line x1="590" y1="180" x2="590" y2="230" stroke="#8B5CF6" strokeWidth="2" />
                <line x1="130" y1="230" x2="360" y2="230" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,2" />
                <line x1="590" y1="230" x2="360" y2="230" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,2" />
                <rect x="260" y="230" width="200" height="40" rx="8" fill="#8B5CF6" />
                <text x="360" y="255" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">-exec action {} \;</text>
                
                {hoverSvg && (
                  <g>
                    <text x="360" y="295" textAnchor="middle" fill="#6B7280" fontSize="12">✨ AND is default; use -o for OR</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
            {[
              { title: "🔍 Name & Type", content: "`-name`, `-iname` (case‑insensitive), `-type f` (file), `-type d` (directory). Wildcards must be quoted." },
              { title: "📏 Size & Time", content: "`-size +100M`, `-size -1k`; `-mtime -7` (modified within 7 days), `-atime +30` (accessed >30 days)." },
              { title: "⚙️ Actions", content: "`-exec command {} \\;` (runs command per file); `-delete`; `-print` (default); `-ok` (prompt)." },
              { title: "🔗 Conditions", content: "`-and` (default), `-or` (`-o`), `-not` (`!`). Group with `\\( ... \\)`. Use `-a` for and, `-o` for or." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 4])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 find Command Signatures</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# Basic syntax
find [starting_path] [options] [expression]

# Name search (always quote wildcards)
find . -name "*.txt"
find /home -iname "readme*"

# Type
find . -type f -size +10M
find . -type d -empty

# Time-based
find logs/ -mtime -1           # modified in last 24 hours
find . -atime +7               # accessed more than 7 days ago
find . -mmin -30               # modified in last 30 minutes

# Execute command
find . -name "*.tmp" -exec rm {} \;
find . -name "*.jpg" -exec cp {} backup/ \;

# Delete directly
find . -empty -delete

# Logical operators
find . -name "*.log" -o -name "*.out"
find . \\( -name "*.c" -o -name "*.h" \\) -exec grep -l "main" {} \;

# Limit depth
find . -maxdepth 2 -name "*.py"`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Locate files and directories based on arbitrary criteria. <strong>When/Why:</strong> Disk cleanup, log rotation, backup scripts, code searches, security audits, and everyday file management.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, the system administrator uses `find /home -atime +90 -type f` to identify unused student files for archiving. Swadeep uses `find . -name '*.java' -exec grep -l 'class Main' {} \\;` to locate all Java files containing a main class. Debangshu uses `find /var/log -mtime +30 -delete` to clean old logs.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 find in Action</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <ShellFileLoader fileModule={findBasics} title="find_basics.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={findAdvanced} title="find_advanced.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={findActions} title="find_actions.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Always test your `find` command with `-print` before adding destructive actions like `-delete` or `-exec rm`. Use `-ok` instead of `-exec` for interactive confirmation.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use `-exec ... {} +` instead of `\\;` to batch arguments and run command fewer times (faster).</li>
                <li>Combine with `xargs` for complex processing: `find . -name '*.log' -print0 | xargs -0 grep 'ERROR'`.</li>
                <li>Use `-prune` to exclude directories: `find . -path './.git' -prune -o -name '*.c' -print`.</li>
                <li>For case‑insensitive name matching, use `-iname` instead of `-name`.</li>
                <li>Use `-regex` for more complex pattern matching (e.g., `-regex '.*/[0-9]+\\.txt'`).</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Forgetting to quote wildcards: `find . -name *.txt` (shell expands before find runs).</li>
                <li>Using `-exec rm {} \\;` without testing first – can delete wrong files.</li>
                <li>Not escaping parentheses or semicolons in `-exec` when using shell metacharacters.</li>
                <li>Confusing `-mtime +7` (more than 7 days old) with `-mtime 7` (exactly 7 days old).</li>
                <li>Assuming `-delete` implies `-depth` (it does, but still dangerous).</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">Safety first:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>Always quote name patterns.</li>
                  <li>Test with `-print` before `-delete` or `-exec rm`.</li>
                  <li>Use `-ok` for interactive removal.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Efficiency:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Use `-maxdepth` to limit recursion.</li>
                  <li>☑️ Use `-exec ... +` for batching.</li>
                  <li>☑️ Combine conditions early to prune branches.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">What happens if you run `find . -name "*.txt" -exec rm {} \\;` without quoting `*.txt`? The shell expands `*.txt` before find sees it, so find only receives the existing filenames, not the pattern. Always quote! Experiment with `echo` instead of `rm` first.</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="`find` is the Swiss Army knife of file operations. I emphasise three levels: (1) simple name search, (2) adding size/time filters, (3) executing actions. The leap from `-exec echo {}` to `-exec rm {}` is a rite of passage – always practice with a test directory. Show students `find . -type f -exec grep -l 'password' {} \\;` for security checks. Also demonstrate `-print0` with `xargs -0` for handling filenames with spaces." />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="find Command – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}