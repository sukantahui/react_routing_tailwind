import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import touchBasics from './topic3_files/touch_basics.sh?raw';
import touchTimestamps from './topic3_files/touch_timestamps.sh?raw';
import touchBulkFiles from './topic3_files/touch_bulk_files.sh?raw';

// Import 30 FAQ questions
import questions from './topic3_files/topic3_questions';

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
  { q: "What command creates an empty file in Unix?", a: "`touch filename`" },
  { q: "What happens if you `touch` an existing file?", a: "Its timestamps (access and modification) are updated to the current time, but the content remains unchanged." },
  { q: "How do you create multiple empty files at once with touch?", a: "`touch file1 file2 file3`" },
  { q: "What does `touch -a` do?", a: "Changes only the access time (atime) of the file." },
  { q: "What does `touch -m` do?", a: "Changes only the modification time (mtime) of the file." },
  { q: "How do you prevent touch from creating a new file if it doesn't exist?", a: "Use `touch -c` or `touch --no-create`." },
  { q: "What option allows you to set a specific timestamp instead of current time?", a: "`-t` (e.g., `touch -t 202412311200 file`) or `-d` (e.g., `touch -d '2024-12-31 12:00' file`)." },
  { q: "How do you set a file's timestamp to match another file?", a: "`touch -r reference_file target_file`" },
  { q: "What is the timestamp format for `touch -t`?", a: "`[[CC]YY]MMDDhhmm[.ss]` – e.g., `2412311200` for Dec 31 2024 12:00." },
  { q: "What are the three timestamps a Unix file has?", a: "Access time (atime), Modification time (mtime), Change time (ctime)." },
  { q: "Can `touch` change the change time (ctime)?", a: "No, ctime changes automatically when file metadata (permissions, ownership, etc.) changes. `touch` only updates atime and mtime." },
  { q: "What does `touch -d '2 days ago' file` do?", a: "Sets the file's timestamp to two days before the current time." },
  { q: "How do you create a file with a specific timestamp in the past?", a: "`touch -t 202301011200 file`" },
  { q: "Why would you use `touch` on an existing file?", a: "To force rebuilds in makefiles, update backup timestamps, or test scripts that rely on file age." },
  { q: "What is the difference between `touch file` and `> file`?", a: "`touch` updates timestamps of existing files or creates empty ones; `> file` truncates an existing file to zero length (destroys content) or creates empty." },
  { q: "How can you avoid creating a new file with touch if it doesn't exist?", a: "Use `touch -c` (no create) or `touch --no-create`." },
  { q: "What does `touch -h` do?", a: "Changes timestamps of a symbolic link itself, not the file it points to." },
  { q: "Can `touch` be used with wildcards to update many files?", a: "Yes, `touch *.log` updates all .log files in current directory." },
  { q: "What command shows the access time of a file?", a: "`stat file` or `ls -lu`." },
  { q: "What is the typical use of `touch` in build automation?", a: "To update timestamps of generated files so that make knows they are newer than sources, preventing unnecessary rebuilds." }
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
        🧠 Test Your Knowledge – 20 touch Command Questions
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

export default function Topic3() {
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
              Creating Empty Files & Modifying Timestamps (touch)
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The `touch` command – create empty files, update file timestamps, and manipulate access/modification times with precision.
            </p>
          </div>

          {/* SVG Illustration: touch updating timestamps */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg" className="w-full">
                {/* File box before */}
                <rect x="50" y="40" width="200" height="100" rx="8" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
                <text x="150" y="70" textAnchor="middle" fill="#1E1B4B" fontSize="14" fontWeight="bold">File: data.txt</text>
                <text x="150" y="95" textAnchor="middle" fill="#4B5563" fontSize="12">atime: 2025-01-01 10:00</text>
                <text x="150" y="115" textAnchor="middle" fill="#4B5563" fontSize="12">mtime: 2025-01-01 10:00</text>
                
                {/* Arrow with touch command */}
                <path d="M 260 90 L 320 90" stroke="#10B981" strokeWidth="3" markerEnd="url(#arrowGreen)" />
                <text x="290" y="80" textAnchor="middle" fill="#10B981" fontSize="13">touch data.txt</text>
                <defs>
                  <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                  </marker>
                </defs>

                {/* File box after */}
                <rect x="330" y="40" width="200" height="100" rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="2">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="430" y="70" textAnchor="middle" fill="#065F46" fontSize="14" fontWeight="bold">data.txt</text>
                <text x="430" y="95" textAnchor="middle" fill="#065F46" fontSize="12">atime: NOW</text>
                <text x="430" y="115" textAnchor="middle" fill="#065F46" fontSize="12">mtime: NOW</text>

                {/* Timestamp legend */}
                <rect x="580" y="40" width="140" height="180" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                <text x="650" y="65" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="bold">Timestamps</text>
                <text x="600" y="90" fill="#78350F" fontSize="11">atime: access</text>
                <text x="600" y="110" fill="#78350F" fontSize="11">mtime: modify</text>
                <text x="600" y="130" fill="#78350F" fontSize="11">ctime: change</text>
                <text x="600" y="160" fill="#EF4444" fontSize="10">touch updates atime & mtime</text>
                <text x="600" y="180" fill="#EF4444" fontSize="10">ctime always = NOW</text>
                <text x="600" y="200" fill="#6B7280" fontSize="10">(metadata change)</text>

                {hoverSvg && (
                  <g>
                    <text x="650" y="230" fill="#F59E0B" fontSize="12">✨ -a only atime</text>
                    <text x="650" y="248" fill="#F59E0B" fontSize="12">✨ -m only mtime</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
            {[
              { title: "📄 Create Empty Files", content: "`touch file` creates a zero-byte file if it doesn't exist. Useful for placeholders, lock files, or testing." },
              { title: "⏰ Update Timestamps", content: "If file exists, `touch` updates access (atime) and modification (mtime) to current time without changing content." },
              { title: "🎯 Selective Updates", content: "`-a` (access only), `-m` (modify only), `-c` (no create), `-h` (symlink itself)." },
              { title: "📅 Set Specific Times", content: "`-t` ([[CC]YY]MMDDhhmm[.ss]) or `-d` (human-readable, e.g., '2 days ago')." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 4])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 touch Command Signatures</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# Basic syntax
touch [OPTION]... FILE...

# Change only access time
touch -a file

# Change only modification time
touch -m file

# Do not create file if missing
touch -c file

# Set specific timestamp (format: [[CC]YY]MMDDhhmm[.ss])
touch -t 202512311200.30 file

# Human-readable date
touch -d "2024-12-31 12:00:00" file
touch -d "2 days ago" file
touch -d "last Sunday" file

# Copy timestamps from reference file
touch -r reference_file target_file

# Change symlink's own timestamp (not target)
touch -h symlink`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Create empty files or update file timestamps. <strong>When/Why:</strong> Everyday tasks: initializing config files, forcing `make` rebuilds, simulating file age for testing, updating last-modified for backup scripts, or creating lock files.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, Swadeep uses `touch` to create empty log files before a script runs. Debangshu uses `touch -t` to backdate assignment submissions for a test environment. The system admin uses `touch -r` to restore timestamps after restoring from backup.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 touch in Action</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <ShellFileLoader fileModule={touchBasics} title="touch_basics.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={touchTimestamps} title="touch_timestamps.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={touchBulkFiles} title="touch_bulk_files.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Use `touch *.log` to update all log files. Combine with `find` to touch only files older than a certain time: `find . -type f -mtime +7 -exec touch {} \\;` resets timestamps of files older than 7 days.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use `touch -d` with natural language: `"next Monday"`, `"yesterday"`, `"10:30"`.</li>
                <li>Combine `touch` with `find` to update timestamps of a filtered set of files.</li>
                <li>In scripts, `touch /tmp/lockfile` is a simple mutex; check existence with `[ -f /tmp/lockfile ]`.</li>
                <li>To set only access time: `touch -a`; only modification: `touch -m`; ctime will still update because metadata (timestamps) changed.</li>
                <li>Use `touch -h` on symlinks to avoid changing the target's timestamps.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Assuming `touch` changes ctime – it doesn't directly, but updating atime/mtime causes ctime to update as a side effect.</li>
                <li>Using `touch` on a directory updates its timestamps, which may affect backup strategies.</li>
                <li>Forgetting that `touch -t` expects a very specific format (no spaces, 2‑digit year if current century assumed).</li>
                <li>Using `touch` in a script without checking if the path is writable – can cause errors.</li>
                <li>Confusing `touch -c` (no create) with `-c` in other commands (e.g., `cp -c` doesn't exist).</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">Creating empty files:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>Use descriptive names (e.g., `.lock`, `.placeholder`).</li>
                  <li>Be careful with `touch *` – it updates all files in directory.</li>
                  <li>Use `-c` when you only want to update existing files.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Timestamp manipulation:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Verify with `stat` after setting custom times.</li>
                  <li>☑️ Use `-r` to preserve timestamps when copying metadata.</li>
                  <li>☑️ Remember that ctime cannot be set arbitrarily (only via system calls).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">Run `touch empty.txt; ls -l empty.txt`. Then `touch -t 202001011200 empty.txt` and `ls -l` again. Run `stat empty.txt` to see all three timestamps. Now change permissions: `chmod 600 empty.txt` and run `stat` again – observe that ctime changed, but atime/mtime stayed. Experiment with `touch -a` and `touch -m` separately.</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="`touch` is one of the simplest but most misunderstood commands. I tell students: 'It's like tapping a file on the shoulder – if it's not there, you create it; if it is, you update its watch.' Demonstrate the difference between atime, mtime, and ctime using `stat` before and after each operation. Also show how `make` uses timestamps – update a .c file's mtime to a future date and see `make` refuse to compile because the .o seems newer. Great for teaching side effects." />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="touch Command & File Timestamps – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}