import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import exploreFs from './topic1_files/explore_fs.sh?raw';
import inodeDemo from './topic1_files/inode_demo.sh?raw';
import treeStructure from './topic1_files/tree_structure.sh?raw';

// Import 30 FAQ questions
import questions from './topic1_files/topic1_questions';

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
  { q: "What is the root directory in Unix?", a: "`/` – the topmost directory from which all other directories descend." },
  { q: "Name three standard directories directly under root.", a: "/bin, /etc, /home, /var, /usr, /tmp (any three)." },
  { q: "What is an inode?", a: "A data structure that stores metadata about a file (permissions, ownership, timestamps, pointers to data blocks) – not the filename." },
  { q: "How are filenames related to inodes?", a: "A directory maps filenames to inode numbers. Multiple filenames (hard links) can point to the same inode." },
  { q: "What is a hard link?", a: "An additional directory entry pointing to an existing inode. Both entries are equal; the file is removed when the last link is deleted." },
  { q: "What is a symbolic link (symlink)?", a: "A special file that contains a path to another file. It can point across filesystems and to directories." },
  { q: "What is the difference between absolute and relative path?", a: "Absolute starts from root (`/home/tuhina/file`). Relative starts from current directory (`docs/file`)." },
  { q: "What does `..` represent in a path?", a: "The parent directory of the current directory." },
  { q: "What does `.` represent?", a: "The current directory." },
  { q: "What is the purpose of the `/tmp` directory?", a: "Temporary files; often cleared on reboot. Usually world-writable with sticky bit." },
  { q: "What is the `/proc` filesystem?", a: "A virtual filesystem providing process and kernel information as files (e.g., /proc/cpuinfo)." },
  { q: "What is the `/dev` directory?", a: "Contains device files representing hardware (e.g., /dev/sda, /dev/tty)." },
  { q: "What does the `ls -i` command show?", a: "The inode number of each file." },
  { q: "How can you find all hard links to a file?", a: "Use `ls -li` to see inode numbers, then `find / -inum <inode> 2>/dev/null`." },
  { q: "What is the maximum number of hard links to a file?", a: "Limited by filesystem (often 65,000). Directories usually cannot be hard linked (except `.` and `..`)." },
  { q: "Why can't you create hard links across different filesystems?", a: "Because inode numbers are only unique within a single filesystem." },
  { q: "What does the `mount` command do?", a: "Attaches a filesystem to a directory (mount point), making it accessible under the root tree." },
  { q: "What is the Unix Filesystem Hierarchy Standard (FHS)?", a: "A guideline that defines the structure and contents of directories in Unix-like systems (e.g., /bin, /etc, /usr)." },
  { q: "What is the difference between `/bin` and `/usr/bin`?", a: "/bin contains essential binaries needed in single-user mode; /usr/bin holds non-essential user binaries. Many modern distros merge them." },
  { q: "What is a ‘sticky bit’ on a directory?", a: "A permission that restricts deletion of files in a shared directory – only file owner, directory owner, or root can delete (e.g., /tmp)." }
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
        🧠 Test Your Knowledge – 20 Unix Filesystem Questions
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

export default function Topic1() {
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
              Unix File System Structure & Basics
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A single hierarchical tree – from root (/) to every file. Learn directories, inodes, links, and the Unix philosophy.
            </p>
          </div>

          {/* SVG Illustration: Unix Filesystem Tree */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-4xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full">
                {/* Root */}
                <rect x="370" y="20" width="60" height="30" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                <text x="400" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">/</text>

                {/* Level 1 directories */}
                <rect x="80" y="90" width="70" height="30" rx="4" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="115" y="110" textAnchor="middle" fill="white" fontSize="11">/bin</text>

                <rect x="180" y="90" width="70" height="30" rx="4" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="215" y="110" textAnchor="middle" fill="white" fontSize="11">/etc</text>

                <rect x="280" y="90" width="70" height="30" rx="4" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="315" y="110" textAnchor="middle" fill="white" fontSize="11">/home</text>

                <rect x="380" y="90" width="70" height="30" rx="4" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="415" y="110" textAnchor="middle" fill="white" fontSize="11">/var</text>

                <rect x="480" y="90" width="70" height="30" rx="4" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="515" y="110" textAnchor="middle" fill="white" fontSize="11">/usr</text>

                <rect x="580" y="90" width="70" height="30" rx="4" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="615" y="110" textAnchor="middle" fill="white" fontSize="11">/tmp</text>

                {/* Connecting lines from root to level1 */}
                <line x1="400" y1="50" x2="115" y2="90" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="400" y1="50" x2="215" y2="90" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="400" y1="50" x2="315" y2="90" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="400" y1="50" x2="415" y2="90" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="400" y1="50" x2="515" y2="90" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="400" y1="50" x2="615" y2="90" stroke="#9CA3AF" strokeWidth="1.5" />

                {/* Deeper example: /home/swadeep */}
                <rect x="270" y="150" width="90" height="30" rx="4" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="1.5" />
                <text x="315" y="170" textAnchor="middle" fill="white" fontSize="11">/swadeep</text>
                <line x1="315" y1="120" x2="315" y2="150" stroke="#9CA3AF" strokeWidth="1.5" />

                {/* Deeper example: /usr/bin */}
                <rect x="480" y="150" width="70" height="30" rx="4" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="1.5" />
                <text x="515" y="170" textAnchor="middle" fill="white" fontSize="11">/bin</text>
                <line x1="515" y1="120" x2="515" y2="150" stroke="#9CA3AF" strokeWidth="1.5" />

                {/* Inode illustration box */}
                <rect x="50" y="240" width="700" height="90" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" className="dark:fill-gray-700 dark:stroke-amber-500" />
                <text x="400" y="265" textAnchor="middle" fill="#92400E" className="dark:text-amber-200" fontSize="13" fontWeight="bold">📄 Inode (metadata)</text>
                <text x="100" y="290" fill="#78350F" className="dark:text-amber-100" fontSize="11">Permissions | Owner | Size | Timestamps | Pointers to data blocks</text>
                <text x="100" y="310" fill="#78350F" className="dark:text-amber-100" fontSize="11">❌ Does NOT store filename (stored in directory entry → maps name → inode#)</text>

                {hoverSvg && (
                  <g opacity="0.9">
                    <text x="520" y="280" fill="#4B5563" fontSize="12">✨ Hard link = another name for same inode</text>
                    <text x="520" y="300" fill="#4B5563" fontSize="12">🔗 Symlink = special file with path</text>
                  </g>
                )}

                {/* Animate the tree lines */}
                <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
            {[
              { title: "🌳 Hierarchical Structure", content: "Single tree starting at root (/). Every file and directory is a descendant of root. No drive letters (like C:)." },
              { title: "📁 Standard Directories", content: "/bin, /etc, /home, /var, /usr, /tmp – each serves a specific role (binaries, config, user homes, logs, user programs, temporary)." },
              { title: "🔢 Inodes", content: "Each file (and directory) has an inode: metadata but not the name. Directories map names to inode numbers." },
              { title: "🔗 Links", content: "Hard links: multiple names for same inode (same file). Symbolic links: special files that store a path." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 4])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature style – not functions but common commands */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 Common Filesystem Commands (Signatures)</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# List directory contents with inode numbers
ls -li [path]

# Show file system disk usage
df -h [mount_point]

# Display inode information for a file
stat [file]

# Create a hard link
ln target_file link_name

# Create a symbolic link
ln -s target_file link_name

# Find files by inode number
find / -inum [inode_number] 2>/dev/null`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Navigate, inspect, and manage the Unix filesystem. <strong>When/Why:</strong> System administrators, developers, and power users rely on these to understand disk usage, locate files, and manage links.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, the lab computers use a shared `/home` mounted over NFS. Swadeep’s files are in `/home/swadeep`. Debangshu accidentally removed a file, but a hard link in a backup directory saved the day because both names pointed to the same inode.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 Exploring the Unix Filesystem</h2>
            <div className="grid gap-5 md:grid-cols-1">
              <ShellFileLoader fileModule={exploreFs} title="explore_fs.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={inodeDemo} title="inode_demo.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={treeStructure} title="tree_structure.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Use <code className="bg-gray-200 px-1 dark:bg-gray-700">tree -L 2 /</code> to see the first two levels of the root directory. Install `tree` if missing (`sudo apt install tree` on Debian/Ubuntu).
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use <code>ls -ld */</code> to list only directories in current location.</li>
                <li><code>find / -type f -size +100M</code> – locate large files.</li>
                <li>Hard links cannot cross filesystems; symlinks can.</li>
                <li><code>df -i</code> shows inode usage – important for files with many tiny files.</li>
                <li>Always quote paths with spaces: <code>cd "My Documents"</code>.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Confusing <code>/</code> (root) with <code>/root</code> (home of root user).</li>
                <li>Deleting a symlink removes the link, not the target.</li>
                <li>Assuming hard links are independent copies – they are not, editing one edits the other.</li>
                <li>Moving a file that has hard links: the links stay valid (inode unchanged).</li>
                <li>Using relative paths in scripts that change directory – use absolute paths or <code>cd</code> carefully.</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">Navigating & organizing:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>Keep personal files under <code>/home/username</code>.</li>
                  <li>Use relative paths when possible for shorter commands.</li>
                  <li>Use <code>ln -s</code> for links to directories and cross‑filesystem links.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Safety & sanity:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Check inode usage (<code>df -i</code>) before creating millions of tiny files.</li>
                  <li>☑️ Understand that <code>rm</code> on a hard link does not delete the data until last link removed.</li>
                  <li>☑️ Use <code>readlink -f</code> to resolve full path of a symlink.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">Create a file, then two hard links. Observe that editing any link changes the content for all. Now create a symlink to the same file – what happens if you delete the original file? The symlink becomes dangling. Try these experiments to internalise the difference.</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="The Unix filesystem is a beautiful tree. I tell students: 'Every file is a leaf, every directory a branch.' Emphasise that inodes are the real identity of a file – filenames are just labels. Use `ls -li` and `stat` to demystify. Relate to daily life: the school's file cabinet has folders (directories), each document has a reference number (inode), and you can put multiple index cards pointing to the same document (hard links)." />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="Unix File System Structure – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}