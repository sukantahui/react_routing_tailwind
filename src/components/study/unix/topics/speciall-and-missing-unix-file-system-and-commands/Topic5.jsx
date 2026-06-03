import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import touchDtBasics from './topic5_files/touch_dt_basics.sh?raw';
import touchDtFormats from './topic5_files/touch_dt_formats.sh?raw';
import touchDtScripts from './topic5_files/touch_dt_scripts.sh?raw';

// Import 30 FAQ questions
import questions from './topic5_files/topic5_questions';

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
  { q: "What does `touch -d` allow you to do?", a: "Set a file's timestamp using a human-readable date string (e.g., 'yesterday', '2 days ago', '2024-12-31 12:00')." },
  { q: "What does `touch -t` allow you to do?", a: "Set a file's timestamp using a compact numeric format: [[CC]YY]MMDDhhmm[.ss]." },
  { q: "Give an example of `touch -d` with a relative date.", a: "`touch -d '2 days ago' file` or `touch -d 'next Monday' file`." },
  { q: "Give an example of `touch -t` setting December 31, 2025 at 11:59 PM.", a: "`touch -t 202512312359 file` or `touch -t 2512312359` (2-digit year)." },
  { q: "What is the meaning of the `.ss` part in `touch -t`?", a: "Optional seconds (00-59). Example: `touch -t 202512312359.30 file` sets seconds to 30." },
  { q: "Does `touch -d` accept timezone information?", a: "Yes, e.g., `touch -d '2024-12-31 12:00 UTC' file` or `EST`." },
  { q: "What happens if you use `-d` with an invalid date string?", a: "`touch` prints an error and does not change the file (exit code non-zero)." },
  { q: "Which option is more portable across Unix variants: `-d` or `-t`?", a: "`-t` is POSIX standard and available on more systems; `-d` is GNU extension." },
  { q: "How can you set a file's timestamp to a specific date in the past using `-d`?", a: "`touch -d '2020-01-01 00:00:00' oldfile.txt`" },
  { q: "Write a command to set a file's timestamp to midnight of the current day.", a: "`touch -d '00:00' file`" },
  { q: "How do you set a file's timestamp to exactly 3:45:30 PM using `-t`?", a: "`touch -t 154530 file` (assuming current date, or include date: `MMDD1545.30`)." },
  { q: "What is the range for the year in `touch -t` with 2-digit format?", a: "`YY` between 69 and 99 -> 1969-1999; 00-68 -> 2000-2068 (POSIX)." },
  { q: "Can `touch -d` understand natural language like 'last Sunday'?", a: "Yes, GNU date parser handles many English phrases: 'last Sunday', 'next week', '10:30'." },
  { q: "How do you set only the modification time with `-d` or `-t`?", a: "Combine with `-m`: `touch -m -t 202512311200 file`" },
  { q: "What does `touch -d '1 day ago' file` do?", a: "Sets timestamps to 24 hours before the current moment." },
  { q: "How would you backdate a file to its original creation date after copying?", a: "If you know the original timestamp, use `touch -t YYYYMMDDhhmm.ss file`." },
  { q: "What is the difference between `touch -d '2025-01-01' file` and `touch -t 202501010000 file`?", a: "Both set timestamp to Jan 1, 2025 at midnight, but `-d` is more readable and flexible." },
  { q: "Can `touch -d` use `+` and `-` for relative offsets?", a: "Yes: `touch -d '+2 hours' file`, `touch -d '-10 minutes' file`." },
  { q: "How can you verify the timestamp after using `-d` or `-t`?", a: "Use `stat file` or `ls -l --full-time file`." },
  { q: "Why might you use `touch -t` in a shell script instead of `-d`?", a: "`-t` is POSIX and more predictable across different Unix systems (BSD, macOS, Linux)." }
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
        🧠 Test Your Knowledge – 20 touch -d / -t Options Questions
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

export default function Topic5() {
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
              Using touch with <code className="text-3xl bg-transparent">-d</code> and <code className="text-3xl bg-transparent">-t</code> Options
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Set precise timestamps – human-readable dates with `-d`, numeric precision with `-t`. Master both to manipulate file times flexibly.
            </p>
          </div>

          {/* SVG Illustration: date format comparison */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-4xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <text x="375" y="30" textAnchor="middle" fill="#1E293B" className="dark:text-white" fontSize="16" fontWeight="bold">two ways to set a date</text>

                {/* -d card */}
                <rect x="40" y="50" width="320" height="180" rx="12" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
                <text x="200" y="80" textAnchor="middle" fill="#4F46E5" fontSize="16" fontWeight="bold">-d  (user-friendly)</text>
                <text x="200" y="110" textAnchor="middle" fill="#1E1B4B" fontSize="13">touch -d "2025-12-31 23:59:59" file</text>
                <text x="200" y="135" textAnchor="middle" fill="#1E1B4B" fontSize="13">touch -d "next Monday 10:30" file</text>
                <text x="200" y="160" textAnchor="middle" fill="#1E1B4B" fontSize="13">touch -d "2 days ago" file</text>
                <text x="200" y="185" textAnchor="middle" fill="#4B5563" fontSize="12">✨ natural language, timezones, relative</text>
                <text x="200" y="210" textAnchor="middle" fill="#6B7280" fontSize="11">GNU extension (Linux, Cygwin)</text>

                {/* -t card */}
                <rect x="390" y="50" width="320" height="180" rx="12" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
                <text x="550" y="80" textAnchor="middle" fill="#10B981" fontSize="16" fontWeight="bold">-t  (POSIX, compact)</text>
                <text x="550" y="110" textAnchor="middle" fill="#065F46" fontSize="13">touch -t 202512312359.59 file</text>
                <text x="550" y="135" textAnchor="middle" fill="#065F46" fontSize="13">touch -t 2512312359 file   (2‑digit year)</text>
                <text x="550" y="160" textAnchor="middle" fill="#065F46" fontSize="13">touch -t 12010000 file   (Jan 1, 00:00)</text>
                <text x="550" y="185" textAnchor="middle" fill="#4B5563" fontSize="12">✨ numeric, no spaces, portable</text>
                <text x="550" y="210" textAnchor="middle" fill="#6B7280" fontSize="11">POSIX (works on BSD, macOS, Solaris)</text>

                {hoverSvg && (
                  <g>
                    <text x="375" y="255" textAnchor="middle" fill="#F59E0B" fontSize="13">💡 Use `-d` for scripts with user input; `-t` for fixed formats</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-14">
            {[
              { title: "📅 Option `-d` (date string)", content: "Accepts almost any human-readable date: 'yesterday', '2 hours ago', '2024-12-31 12:00:00', 'next Sunday', '10:30'. Uses GNU date parser. Very flexible." },
              { title: "🔢 Option `-t` (numeric)", content: "Format: [[CC]YY]MMDDhhmm[.ss]. Example: 202512311200.30 = Dec 31 2025 12:00:30. POSIX standard. No spaces, fixed width." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 2])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 Command Signatures (GNU touch)</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# Using -d (human-readable)
touch -d "DATE_STRING" file
touch -d "2024-12-31 23:59:59" log.txt
touch -d "last Friday 14:30" report.txt
touch -d "2 days ago 00:00" old.log

# Using -t (numeric)
touch -t [[CC]YY]MMDDhhmm[.ss] file
touch -t 202512312359.59 deadline.txt
touch -t 2412312359 meeting.txt

# Combine with -a (only access) or -m (only modify)
touch -a -d "2024-01-01" file
touch -m -t 202501011200 file`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Set file timestamps to arbitrary past or future dates without using the current system time. <strong>When/Why:</strong> Testing scripts that depend on file age, restoring timestamps after backup, creating placeholder files with specific dates for compliance, or simulating data from a certain period.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, the admin restores student projects from backup and uses `touch -r` or `-t` to restore original submission dates. Debangshu uses `touch -d 'last Monday'` to generate weekly report files with consistent timestamps. The testing team uses `touch -d '2 years ago'` to simulate old log files for log rotation tests.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 touch -d and -t in Action</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <ShellFileLoader fileModule={touchDtBasics} title="touch_dt_basics.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={touchDtFormats} title="touch_dt_formats.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={touchDtScripts} title="touch_dt_scripts.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Before using `-d` in a script, test the date string with `date -d "string"` to verify it parses correctly. For maximum portability, prefer `-t` with explicit YYYYMMDDhhmm format.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use `date -d` to experiment with date strings before using them in `touch`.</li>
                <li>Combine `-d` with `-r` to copy and adjust: `touch -d "next week" -r reference target`.</li>
                <li>For years before 1970, `-t` may not work (system dependent). Use `-d` with dates like '1969-12-31' on GNU.</li>
                <li>If you need to set only mtime, use `touch -m -t ...` to avoid updating atime unnecessarily.</li>
                <li>Remember that `-d` and `-t` also affect ctime (as side effect), so you cannot hide timestamp changes.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Assuming `-d` works on non-GNU systems (BSD/macOS uses `-d` differently or not at all).</li>
                <li>Forgetting that `-t` requires exactly the right number of digits (no spaces).</li>
                <li>Using 2-digit year in `-t` with year 68–99 (1968-1999) vs 00-68 (2000-2068).</li>
                <li>Not quoting the date string when it contains spaces: `touch -d "Dec 31 2025"` is fine, but `touch -d Dec 31 2025` fails.</li>
                <li>Setting timestamps to future may confuse `make` or backup tools (they assume future = always newer).</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">Choosing between -d and -t:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>For portability across Unix variants → use `-t`.</li>
                  <li>For readability in scripts → use `-d` and ensure GNU touch.</li>
                  <li>For absolute precision → use `-t` with seconds.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Script reliability:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Validate date strings before actual touch.</li>
                  <li>☑️ Use ISO 8601 format with `-d` (YYYY-MM-DD HH:MM:SS) for clarity.</li>
                  <li>☑️ Always quote the argument to prevent word splitting.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">What happens if you set a file's mtime to a future date using `touch -t 203001011200 file`, then run `make` that depends on that file? make will think the file is newer than any target and skip rebuilding. This can be used to force or prevent builds. Experiment with a simple Makefile.</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="`-d` and `-t` are superpowers. I show students how to 'time travel' files. 
            One exercise: set a file's timestamp to last year, then run `find -mtime +365` and see it appear. Aother: set a log file's date to tomorrow and observe logrotate skipping it. Emphasise that `-t` is the only POSIX way, but `-d`      makes teaching dates fun because you can say 'touch -d next Tuesday 09:00  homework.txt" />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="touch with -d and -t Options – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}