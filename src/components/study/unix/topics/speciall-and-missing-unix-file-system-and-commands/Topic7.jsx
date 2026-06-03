import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import duDfBasics from './topic7_files/du_df_basics.sh?raw';
import duDfAdvanced from './topic7_files/du_df_advanced.sh?raw';
import interpretingOutput from './topic7_files/interpreting_output.sh?raw';

// Import 30 FAQ questions
import questions from './topic7_files/topic7_questions';

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
  { q: "What does `df` command do?", a: "Reports file system disk space usage (total, used, available, mount points)." },
  { q: "What does `du` command do?", a: "Estimates file and directory space usage (disk usage)." },
  { q: "How do you make `df` show human‑readable sizes (e.g., MB, GB)?", a: "Use `df -h` (or `-H` for 1000‑based)." },
  { q: "How do you make `du` show human‑readable sizes?", a: "Use `du -h`." },
  { q: "What does `df -i` show?", a: "Inode usage (total, used, free, use percentage) instead of block usage." },
  { q: "What does `du -s` do?", a: "Displays only a total for each argument (summary)." },
  { q: "How do you check disk usage of a specific directory?", a: "`du -sh /path/to/dir`" },
  { q: "What is the difference between `df` and `du`?", a: "`df` reports on file system (partition) level, including metadata; `du` sums file sizes within a directory tree, ignoring metadata overhead." },
  { q: "Why might `du` and `df` show different numbers for the same directory?", a: "`du` counts only file data blocks; `df` includes filesystem metadata (inodes, superblock, journal), deleted but still open files, and reserved space." },
  { q: "How do you see the total disk usage of the current directory and all subdirectories?", a: "`du -sh .` or `du -sh`" },
  { q: "How can you sort `du` output by size?", a: "`du -sh * | sort -h`" },
  { q: "What does `du --max-depth=1` do?", a: "Summarizes usage one level deep (subdirectories only, not their children)." },
  { q: "Which command shows available space on all mounted filesystems?", a: "`df -h` (or `df -a`)." },
  { q: "What is a ‘stale NFS handle’ and how does `df` behave with it?", a: "A file handle that no longer exists; `df` may hang or show ???? for that mount." },
  { q: "How do you exclude certain files from `du` calculation?", a: "Use `--exclude=PATTERN` or pipe through `grep -v`." },
  { q: "What does `du -b` do?", a: "Shows sizes in bytes (not blocks)." },
  { q: "How do you view disk usage for only the current directory (not subdirectories)?", a: "`du -sh --max-depth=0`" },
  { q: "What is the difference between `df -h` and `df -H`?", a: "`-h` uses 1024‑based units (KiB, MiB, GiB); `-H` uses 1000‑based (KB, MB, GB)." },
  { q: "How can you find which directory is consuming the most space?", a: "`du -sh /* 2>/dev/null | sort -h | tail -5`" },
  { q: "What is the purpose of the `-x` option in `du` and `df`?", a: "Restricts to a single file system; do not cross mount points." }
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
        🧠 Test Your Knowledge – 20 du/df Questions
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

export default function Topic7() {
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
              File System Size & Disk Usage (<code className="text-3xl bg-transparent">du</code>, <code className="text-3xl bg-transparent">df</code>)
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Monitor disk space, analyse directory usage, and understand the difference between free space and actual file consumption.
            </p>
          </div>

          {/* SVG Illustration: du vs df comparison */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <rect x="50" y="20" width="280" height="180" rx="12" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
                <text x="190" y="50" textAnchor="middle" fill="#4F46E5" fontSize="16" fontWeight="bold">df (disk free)</text>
                <text x="190" y="80" textAnchor="middle" fill="#1E1B4B" fontSize="13">Filesystem      Size  Used Avail Use% Mounted</text>
                <text x="190" y="105" textAnchor="middle" fill="#4B5563" fontSize="12">/dev/sda1       50G   30G   20G   60% /</text>
                <text x="190" y="130" textAnchor="middle" fill="#4B5563" fontSize="12">tmpfs           4G   10M   4G    1% /tmp</text>
                <text x="190" y="155" textAnchor="middle" fill="#6B7280" fontSize="11">Includes metadata, reserved blocks</text>
                <text x="190" y="175" textAnchor="middle" fill="#6B7280" fontSize="11">shows whole filesystem</text>

                <rect x="390" y="20" width="280" height="180" rx="12" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
                <text x="530" y="50" textAnchor="middle" fill="#10B981" fontSize="16" fontWeight="bold">du (disk usage)</text>
                <text x="530" y="80" textAnchor="middle" fill="#065F46" fontSize="13">12M    ./photos</text>
                <text x="530" y="105" textAnchor="middle" fill="#065F46" fontSize="13">45M    ./music</text>
                <text x="530" y="130" textAnchor="middle" fill="#065F46" fontSize="13">8M     ./docs</text>
                <text x="530" y="155" textAnchor="middle" fill="#6B7280" fontSize="11">Sums file data blocks only</text>
                <text x="530" y="175" textAnchor="middle" fill="#6B7280" fontSize="11">works per directory</text>

                {hoverSvg && (
                  <text x="360" y="235" textAnchor="middle" fill="#F59E0B" fontSize="13">
                    💡 `df` shows entire partition; `du` shows directory tree usage
                  </text>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-14">
            {[
              { title: "💾 df – disk free", content: "Reports file system space: total, used, available, use percentage, mount point. Essential for monitoring overall disk health." },
              { title: "📁 du – disk usage", content: "Summarizes disk usage of files and directories. Great for finding space hogs. Can be limited by depth or pattern." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 2])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 Command Signatures</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# df (disk free)
df [options] [file|mountpoint]
df -h                     # human-readable
df -i                     # inode usage
df -T                     # show filesystem type
df -x tmpfs               # exclude tmpfs

# du (disk usage)
du [options] [file|directory]
du -sh                    # summary, human-readable
du -sh * | sort -h        # sort by size
du --max-depth=1          # one level deep
du -a                     # show files, not just directories
du -c                     # produce grand total`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Monitor disk space usage, identify full file systems, and find large directories/files. <strong>When/Why:</strong> Daily maintenance, capacity planning, troubleshooting 'disk full' errors, cleaning up old logs, or optimising storage.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, the lab administrator runs `df -h` every morning to check free space. When students report 'no space left', Tuhina uses `du -sh /home/* | sort -h` to find the culprit. Debangshu uses `du --max-depth=1 /var/log` before log rotation.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 du and df in Action</h2>
            <div className="grid gap-5 md:grid-cols-1">
              <ShellFileLoader fileModule={duDfBasics} title="du_df_basics.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={duDfAdvanced} title="du_df_advanced.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={interpretingOutput} title="interpreting_output.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Use `df -h` for a quick overview; then `du -sh /path/* | sort -h` to drill down. To exclude certain directories in `du`, combine with `--exclude` or use `grep -v`.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use `ncdu` (interactive) or `du -sh * | sort -h` for better readability.</li>
                <li>To see progress for large directories, use `du -sh --apparent-size` for apparent vs actual block usage.</li>
                <li>`df -h --output=source,size,used,avail,pcent,target` customises columns.</li>
                <li>Combine `du` with `find` to list largest files: `find /home -type f -exec du -b {} + | sort -nr | head -20`.</li>
                <li>Set up monitoring: `df -h` in cron to alert when usage > 90%.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Assuming `du` and `df` match exactly – they often differ due to metadata, reserved blocks, and open deleted files.</li>
                <li>Running `du` on `/` without limiting depth may take hours.</li>
                <li>Forgetting `-h` and misreading block counts (512‑byte blocks by default).</li>
                <li>Using `df` without `-h` on large filesystems – numbers become unreadable.</li>
                <li>Running `du` on network filesystems (NFS) can be very slow; use `-x` or limit scope.</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">For monitoring:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>Regularly run `df -h` on critical mounts.</li>
                  <li>Alert when use percentage > 85% (leave buffer).</li>
                  <li>Use `-i` to monitor inode exhaustion (can cause 'no space' even with free blocks).</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">For troubleshooting:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Start with `df` to see full filesystems.</li>
                  <li>☑️ Then `du -sh /mountpoint/* | sort -h` to find largest directories.</li>
                  <li>☑️ Use `lsof | grep deleted` to find open deleted files consuming space.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">Create a large file, run `du` on it, then delete it while it's still open by a process. `df` will still show space as used until the process closes the file. Use `lsof | grep deleted` to find such files. How would you reclaim that space without killing the process? (Answer: kill the process or close the file descriptor.)</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="`df` and `du` are the first tools I teach for storage management. I always start with a demo: fill a directory with small files until inodes run out (`touch {1..100000}`) – then `df` shows free blocks but still 'no space'. That illustrates the importance of `df -i`. For `du`, I show how to find top‑10 largest files and directories. Students love `ncdu` for interactive exploration." />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="du and df Commands – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}