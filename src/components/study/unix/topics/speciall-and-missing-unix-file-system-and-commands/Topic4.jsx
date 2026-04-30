import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import timestampBasics from './topic4_files/timestamp_basics.sh?raw';
import timestampDemo from './topic4_files/timestamp_demo.sh?raw';
import ctimeVsMtime from './topic4_files/ctime_vs_mtime.sh?raw';

// Import 30 FAQ questions
import questions from './topic4_files/topic4_questions';

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
  { q: "What are the three timestamps associated with a Unix file?", a: "Access time (atime), Modification time (mtime), Change time (ctime)." },
  { q: "What does atime represent?", a: "The last time the file was read (accessed). Updated by commands like `cat`, `less`, `head`." },
  { q: "What does mtime represent?", a: "The last time the file's content was modified. Updated by editors, `echo >>`, `cp`, etc." },
  { q: "What does ctime represent?", a: "The last time the file's metadata (permissions, ownership, link count) or any timestamp was changed." },
  { q: "Which `ls` option shows atime?", a: "`ls -lu`" },
  { q: "Which `ls` option shows ctime?", a: "`ls -lc`" },
  { q: "Which `ls` option shows mtime (default)?", a: "`ls -l` (no extra option)." },
  { q: "What command displays all three timestamps in detail?", a: "`stat filename`" },
  { q: "Does reading a file with `cat` change ctime?", a: "No, only atime changes; ctime stays the same." },
  { q: "Does changing file permissions with `chmod` change atime?", a: "No, only ctime changes (metadata) and optionally mtime? Actually `chmod` only changes ctime, not atime or mtime." },
  { q: "Does `touch` on an existing file change ctime?", a: "Yes, because atime and/or mtime change, which is metadata change, so ctime updates to current time." },
  { q: "Can ctime be set directly by the user?", a: "No, ctime is managed by the kernel; only system calls that change metadata update it." },
  { q: "What operation changes all three timestamps at once?", a: "Changing file content (e.g., `echo >> file`) updates mtime (content) and atime (if read before?) Actually writing updates mtime, atime may also update depending on implementation. Then ctime updates because mtime changed." },
  { q: "How can you see only the modification time of a file?", a: "`stat -c %y file` or `date -r file` (on some systems)." },
  { q: "What does `find -mtime +7` mean?", a: "Find files whose modification time is more than 7 days ago." },
  { q: "What does `find -atime 0` mean?", a: "Find files accessed within the last 24 hours." },
  { q: "What does `find -ctime -2` mean?", a: "Find files whose status changed less than 2 days ago." },
  { q: "Why might atime updates be disabled on some systems?", a: "Performance – each read would trigger a disk write to update atime, which can be expensive. `noatime` mount option disables it." },
  { q: "What is the difference between mtime and ctime when a file is renamed?", a: "mtime does not change (content unchanged); ctime does change because directory entry (metadata) is updated." },
  { q: "What happens to timestamps when a hard link is created?", a: "The inode's link count changes, so ctime updates. atime and mtime remain unchanged." }
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
        🧠 Test Your Knowledge – 20 File Timestamps Questions
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

export default function Topic4() {
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
              Understanding File Timestamps
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Access time (atime) · Modification time (mtime) · Change time (ctime) – what each means, how to view them, and why they matter.
            </p>
          </div>

          {/* SVG Illustration: Three timestamps visual */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
                {/* File inode box */}
                <rect x="50" y="30" width="200" height="120" rx="8" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
                <text x="150" y="60" textAnchor="middle" fill="#1E1B4B" fontSize="14" fontWeight="bold">Inode (file metadata)</text>
                <text x="150" y="90" textAnchor="middle" fill="#4B5563" fontSize="12">atime: last read</text>
                <text x="150" y="110" textAnchor="middle" fill="#4B5563" fontSize="12">mtime: last content change</text>
                <text x="150" y="130" textAnchor="middle" fill="#4B5563" fontSize="12">ctime: last metadata change</text>

                {/* Arrow: read operation */}
                <path d="M 260 60 L 320 60" stroke="#3B82F6" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
                <text x="290" y="50" textAnchor="middle" fill="#3B82F6" fontSize="12">cat, less</text>
                <rect x="330" y="45" width="130" height="30" rx="4" fill="#DBEAFE" stroke="#3B82F6" />
                <text x="395" y="65" textAnchor="middle" fill="#1E3A8A" fontSize="11">Updates atime</text>

                {/* Arrow: write operation */}
                <path d="M 260 100 L 320 100" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arrowGreen)" />
                <text x="290" y="95" textAnchor="middle" fill="#10B981" fontSize="12">echo, vi</text>
                <rect x="330" y="85" width="130" height="30" rx="4" fill="#D1FAE5" stroke="#10B981" />
                <text x="395" y="105" textAnchor="middle" fill="#065F46" fontSize="11">Updates mtime</text>

                {/* Arrow: chmod/chown */}
                <path d="M 260 140 L 320 140" stroke="#F59E0B" strokeWidth="2.5" markerEnd="url(#arrowOrange)" />
                <text x="290" y="135" textAnchor="middle" fill="#F59E0B" fontSize="12">chmod, chown</text>
                <rect x="330" y="125" width="130" height="30" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
                <text x="395" y="145" textAnchor="middle" fill="#92400E" fontSize="11">Updates ctime</text>

                <defs>
                  <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6" /></marker>
                  <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#10B981" /></marker>
                  <marker id="arrowOrange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F59E0B" /></marker>
                </defs>

                {/* Legend */}
                <rect x="520" y="30" width="180" height="150" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
                <text x="610" y="55" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="bold">Legend</text>
                <circle cx="540" cy="75" r="5" fill="#3B82F6" />
                <text x="555" y="79" fill="#334155" fontSize="11">atime – read</text>
                <circle cx="540" cy="100" r="5" fill="#10B981" />
                <text x="555" y="104" fill="#334155" fontSize="11">mtime – content change</text>
                <circle cx="540" cy="125" r="5" fill="#F59E0B" />
                <text x="555" y="129" fill="#334155" fontSize="11">ctime – metadata change</text>
                <text x="540" y="160" fill="#EF4444" fontSize="10">ctime also updates when</text>
                <text x="540" y="175" fill="#EF4444" fontSize="10">atime or mtime change.</text>

                {hoverSvg && (
                  <text x="610" y="200" fill="#6B7280" fontSize="11">✨ Try `stat file`</text>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-14">
            {[
              { title: "📖 atime (Access)", content: "Last time file was read. Updated by `cat`, `less`, `head`, `tail`, or any program that opens for reading. Can be disabled with `noatime` mount option for performance." },
              { title: "✏️ mtime (Modify)", content: "Last time file content was changed. Updated by writing (echo, vi, cp, mv within same filesystem). Preserved by `cp -p`. Default shown by `ls -l`." },
              { title: "🔧 ctime (Change)", content: "Last time file metadata changed – permissions, ownership, link count, or any timestamp. Also updates when atime/mtime change. Cannot be set by user." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 3])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section – stat and ls options */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 Viewing Timestamps – Command Signatures</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# Default ls shows mtime
ls -l file

# Show atime (access time)
ls -lu file

# Show ctime (status change time)
ls -lc file

# Detailed stat output
stat file

# Format stat output
stat -c "%x (atime), %y (mtime), %z (ctime)" file

# Find files by timestamp
find . -atime +7    # accessed more than 7 days ago
find . -mtime -1    # modified within last 24 hours
find . -ctime 0     # status changed within last day`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Understand when a file was last read, modified, or its metadata changed. <strong>When/Why:</strong> Auditing, backup strategies (incremental backups use mtime), cleaning old logs, security forensics (identify accessed files), and debugging build systems (make uses mtime).</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, the lab manager uses `find /home -atime +30` to identify unused student accounts. Abhronila uses `stat` to check if her assignment file was secretly opened by someone else (atime). The backup server uses mtime to decide which files to incrementally back up.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 Timestamp Experiments</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <ShellFileLoader fileModule={timestampBasics} title="timestamp_basics.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={timestampDemo} title="timestamp_demo.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={ctimeVsMtime} title="ctime_vs_mtime.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Use `stat --format='%w %W' file` to see birth time (creation time) on filesystems that support it (e.g., ext4, XFS, but not all). Birth time is not POSIX.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use `find -newerXY` to compare timestamps: `find . -newerBt "2024-01-01"` (birth time).</li>
                <li>To preserve timestamps when copying, use `cp -p` or `rsync -t`.</li>
                <li>If atime updates are causing excessive disk writes, mount with `noatime` or `relatime` (default on many Linux systems).</li>
                <li>`ctime` is often used by backup software to detect metadata changes that might affect security (e.g., a file becoming executable).</li>
                <li>Tools like `inotify` can watch for timestamp changes in real time.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Confusing ctime with creation time – ctime is NOT creation time; it's status change time.</li>
                <li>Assuming `ls -l` shows creation time – it shows mtime.</li>
                <li>Thinking that `chmod` changes atime – it changes only ctime.</li>
                <li>Relying on atime for security auditing on systems with `noatime` mount – it won't update.</li>
                <li>Forgetting that moving a file within the same filesystem (`mv`) does not change mtime or atime, but does change ctime (directory entry changed).</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">For backups & archiving:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>Use mtime for incremental backups (content-based).</li>
                  <li>Verify timestamps after restore with `stat`.</li>
                  <li>Use `rsync -t` to preserve mtime.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">For security & auditing:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Monitor ctime changes on critical binaries (indicates tampering).</li>
                  <li>☑️ Use `find -ctime` to detect recent metadata changes.</li>
                  <li>☑️ Remember that atime may be unreliable with `noatime`.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">Create a file, run `stat` and note all three times. Then `cat` the file and stat again – atime changed, others unchanged. Then `echo "x" >> file` and stat – mtime and ctime changed. Then `chmod 644 file` – only ctime changed. Finally, `mv file file2` – ctime changes (directory entry), mtime/atime same. These experiments solidify the differences.</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="Timestamps are often misunderstood. I use a physical analogy: atime = 'last time you opened a book'; mtime = 'last time you wrote in it'; ctime = 'last time you changed the cover or moved it on the shelf'. The fact that ctime updates whenever atime or mtime changes surprises many. I have students write a script that logs timestamps before/after each operation – that builds deep understanding." />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="File Timestamps (atime, mtime, ctime) – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}