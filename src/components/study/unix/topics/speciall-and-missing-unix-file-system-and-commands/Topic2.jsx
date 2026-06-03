import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import chmodBasics from './topic2_files/chmod_basics.sh?raw';
import octalVsSymbolic from './topic2_files/octal_vs_symbolic.sh?raw';
import umaskDemo from './topic2_files/umask_demo.sh?raw';
import specialPermissions from './topic2_files/special_permissions.sh?raw';

// Import 30 FAQ questions
import questions from './topic2_files/topic2_questions';

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
  { q: "What command is used to change file permissions in Unix?", a: "`chmod` (change mode)." },
  { q: "What are the three basic permission types for a file?", a: "Read (r), Write (w), Execute (x)." },
  { q: "What are the three user categories for permissions?", a: "Owner (u), Group (g), Others (o)." },
  { q: "What numeric (octal) value represents read permission?", a: "4" },
  { q: "What numeric value represents write permission?", a: "2" },
  { q: "What numeric value represents execute permission?", a: "1" },
  { q: "What permission mode is `755` in symbolic form?", a: "`rwxr-xr-x` (owner: rwx, group: r-x, others: r-x)." },
  { q: "How do you give execute permission to the owner only?", a: "`chmod u+x filename`" },
  { q: "How do you remove write permission from group and others?", a: "`chmod go-w filename`" },
  { q: "What is the `umask` command used for?", a: "Sets the default permissions for newly created files and directories." },
  { q: "What is the typical default umask value? What does it mean?", a: "022 – removes write permission for group and others (directories 755, files 644)." },
  { q: "What does `chmod 600 file` do?", a: "Owner can read/write; no access for group/others (rw-------)." },
  { q: "How do you recursively change permissions for a directory and its contents?", a: "`chmod -R 755 directory`" },
  { q: "What is the `chown` command used for?", a: "Changes file owner and/or group." },
  { q: "What is the `chgrp` command used for?", a: "Changes the group ownership of a file." },
  { q: "What is the significance of the execute permission on a directory?", a: "Allows entering (cd) and traversing the directory to access files inside." },
  { q: "What does the `setuid` bit do (e.g., `chmod u+s`)?", a: "Executes the file with the owner's privileges, not the user who runs it (e.g., /bin/passwd)." },
  { q: "What does the `sticky bit` do on a directory (e.g., `chmod +t`)?", a: "Only the file owner, directory owner, or root can delete/rename files inside, even if directory is world‑writable (e.g., /tmp)." },
  { q: "What is the symbolic representation of `setgid` on a directory?", a: "`chmod g+s` – new files created inherit the directory's group." },
  { q: "How do you view current permissions of a file?", a: "`ls -l filename`" }
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
        🧠 Test Your Knowledge – 20 File Permissions Questions
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

export default function Topic2() {
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
              File Permissions & Security (chmod)
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Controlling access to files and directories – read, write, execute for owner, group, and others. Master `chmod`, `umask`, and special bits.
            </p>
          </div>

          {/* SVG Illustration: Permission matrix */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg" className="w-full">
                {/* Table header */}
                <rect x="50" y="20" width="120" height="40" fill="#4F46E5" rx="5" />
                <text x="110" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Category</text>
                <rect x="170" y="20" width="100" height="40" fill="#4F46E5" rx="5" />
                <text x="220" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Read (r)</text>
                <rect x="270" y="20" width="100" height="40" fill="#4F46E5" rx="5" />
                <text x="320" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Write (w)</text>
                <rect x="370" y="20" width="100" height="40" fill="#4F46E5" rx="5" />
                <text x="420" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Execute (x)</text>

                {/* Owner row */}
                <rect x="50" y="60" width="120" height="40" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.5" />
                <text x="110" y="85" textAnchor="middle" fill="#1E1B4B" fontSize="14" fontWeight="bold">Owner (u)</text>
                <rect x="170" y="60" width="100" height="40" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="220" y="85" textAnchor="middle" fill="#065F46" fontSize="20">✓</text>
                <rect x="270" y="60" width="100" height="40" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
                <text x="320" y="85" textAnchor="middle" fill="#065F46" fontSize="20">✓</text>
                <rect x="370" y="60" width="100" height="40" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
                <text x="420" y="85" textAnchor="middle" fill="#065F46" fontSize="20">✓</text>

                {/* Group row */}
                <rect x="50" y="100" width="120" height="40" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.5" />
                <text x="110" y="125" textAnchor="middle" fill="#1E1B4B" fontSize="14" fontWeight="bold">Group (g)</text>
                <rect x="170" y="100" width="100" height="40" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
                <text x="220" y="125" textAnchor="middle" fill="#065F46" fontSize="20">✓</text>
                <rect x="270" y="100" width="100" height="40" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
                <text x="320" y="125" textAnchor="middle" fill="#991B1B" fontSize="20">✗</text>
                <rect x="370" y="100" width="100" height="40" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
                <text x="420" y="125" textAnchor="middle" fill="#065F46" fontSize="20">✓</text>

                {/* Others row */}
                <rect x="50" y="140" width="120" height="40" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.5" />
                <text x="110" y="165" textAnchor="middle" fill="#1E1B4B" fontSize="14" fontWeight="bold">Others (o)</text>
                <rect x="170" y="140" width="100" height="40" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
                <text x="220" y="165" textAnchor="middle" fill="#065F46" fontSize="20">✓</text>
                <rect x="270" y="140" width="100" height="40" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
                <text x="320" y="165" textAnchor="middle" fill="#991B1B" fontSize="20">✗</text>
                <rect x="370" y="140" width="100" height="40" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
                <text x="420" y="165" textAnchor="middle" fill="#991B1B" fontSize="20">✗</text>

                {/* Octal explanation */}
                <text x="550" y="60" fill="#4B5563" className="dark:text-gray-300" fontSize="13">Octal: 4=read, 2=write, 1=exec</text>
                <text x="550" y="85" fill="#4B5563" className="dark:text-gray-300" fontSize="13">Example: 754 =</text>
                <text x="550" y="105" fill="#4B5563" className="dark:text-gray-300" fontSize="13">owner:7 (rwx),</text>
                <text x="550" y="125" fill="#4B5563" className="dark:text-gray-300" fontSize="13">group:5 (r-x),</text>
                <text x="550" y="145" fill="#4B5563" className="dark:text-gray-300" fontSize="13">others:4 (r--)</text>

                {hoverSvg && (
                  <g>
                    <text x="550" y="180" fill="#10B981" fontSize="12">✨ Use `chmod 754 file`</text>
                    <text x="550" y="200" fill="#F59E0B" fontSize="12">🔐 Symbolic: u=rwx,g=rx,o=r</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
            {[
              { title: "🔐 Permission Triplets", content: "rwx for owner (u), group (g), others (o). Shown by `ls -l` (e.g., `-rw-r--r--`)." },
              { title: "🔢 Octal Mode", content: "Each permission bit: read=4, write=2, execute=1. Sum to get mode (e.g., 7=rwx, 5=r-x)." },
              { title: "🔧 Symbolic Mode", content: "Use `u/g/o/a` with `+/-/=` and `r/w/x`. Example: `chmod go-w file` removes write from group/others." },
              { title: "🛡️ Special Bits", content: "setuid (4xxx), setgid (2xxx), sticky (1xxx). Applied with `u+s`, `g+s`, `+t`." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 4])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 chmod Command Signatures</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# Symbolic mode
chmod [options] [ugoa...][[+-=][rwxXst...]] file...

# Numeric (octal) mode
chmod [options] <octal_mode> file...

# Common examples
chmod u+x script.sh          # add execute for owner
chmod go-w file.txt          # remove write from group and others
chmod 755 program            # rwxr-xr-x
chmod -R 644 *.txt           # recursive (use with caution)
chmod u=rw,g=r,o=r file      # set exactly rw-r--r--`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Control who can read, write, or execute files/directories. <strong>When/Why:</strong> Every time you create a script, share a file, or secure sensitive data – permissions are the first line of defense.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, the teacher Tuhina creates a shared folder `/home/class/projects`. She sets permissions 770 (owner and group full access, others none) and uses `chgrp` to make the group `students`. Swadeep can edit, but outsiders cannot peek.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 chmod in Action</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <ShellFileLoader fileModule={chmodBasics} title="chmod_basics.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={octalVsSymbolic} title="octal_vs_symbolic.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={umaskDemo} title="umask_demo.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={specialPermissions} title="special_permissions.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Use <code className="bg-gray-200 px-1 dark:bg-gray-700">chmod -v</code> or <code>chmod -c</code> to see verbose changes. For debugging, `stat -c "%a %n" file` shows octal permissions.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Execute permission on a directory means you can `cd` into it and access its contents.</li>
                <li>Use uppercase `X` in symbolic mode: `chmod a+X *` adds execute only to directories and files that already have some execute bit.</li>
                <li>Set default permissions with `umask` (e.g., `umask 027` gives 750 for dirs, 640 for files).</li>
                <li>Never set recursive `chmod 777` on system files – huge security risk.</li>
                <li>Use `chmod --reference=ref_file target_file` to copy permissions from one file to another.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Forgetting that directories need execute permission to be traversed.</li>
                <li>Using `chmod 666` on a directory – directories need execute to be usable (should be 777 then umask).</li>
                <li>Applying `chmod -R` on large trees can be slow; use `find` with `-exec chmod` for selective changes.</li>
                <li>Confusing `chown` with `chmod` – they are different commands.</li>
                <li>Not understanding that `umask` subtracts from 777 (dirs) or 666 (files).</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">For scripts & binaries:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>755 for executables, 644 for scripts if no sensitive data.</li>
                  <li>Never world‑writable (except /tmp with sticky).</li>
                  <li>Use `setuid` sparingly (only for trusted utilities like `passwd`).</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">For shared directories:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ 2770 with setgid – new files inherit group.</li>
                  <li>☑️ Use `umask 002` in team environment.</li>
                  <li>☑️ Test with a test user before applying globally.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">Create a directory, set permissions to 300 (--x------). Can you `ls` inside? Can you `cd`? What about 500 (r-x------)? Observe how execute alone allows `cd`, but read is needed to list. Try `chmod 000` – then try to read/write as owner – you'll be locked out unless you `chmod` back using root.</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="Permissions are like keys to rooms. Owner has master key, group members have shared keys, others have no key. I use `ls -l` then `chmod` exercises: give each student a file, ask them to set permissions so that neighbor cannot read but teacher can. Also demo the script 'setuid' with a simple C program – it blows their minds! Emphasise: 'chmod 777 is not a solution – it’s a disaster.'" />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="File Permissions & chmod – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}