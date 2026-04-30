import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (adjust paths as needed)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import teeBasics from './topic9_files/tee_basics.sh?raw';
import teeAppend from './topic9_files/tee_append.sh?raw';
import teeMultiple from './topic9_files/tee_multiple.sh?raw';

// Import 30 FAQ questions
import questions from './topic9_files/topic9_questions';

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
  { q: "What does the `tee` command do?", a: "Reads from standard input and writes to both standard output and one or more files simultaneously." },
  { q: "How do you write output to both a file and the terminal using `tee`?", a: "`command | tee file.txt`" },
  { q: "How do you append to a file with `tee` instead of overwriting?", a: "`command | tee -a file.txt`" },
  { q: "Can `tee` write to multiple files at once?", a: "Yes: `command | tee file1.txt file2.txt file3.txt`" },
  { q: "How can you use `tee` to write to a file and also pipe to another command?", a: "`command | tee file.txt | next_command`" },
  { q: "What does `tee -i` do?", a: "Ignores interrupt signals (useful when you want tee to finish writing even if pipe is broken)." },
  { q: "How do you suppress the stdout (terminal) output but still write to a file using `tee`?", a: "`command | tee file.txt > /dev/null` (stdout goes to file via tee, then redirected to null)." },
  { q: "What is a common use case for `tee` in system administration?", a: "Logging output of a long-running script while still seeing it in real time, or splitting a stream to multiple processing pipelines." },
  { q: "How does `tee` differ from simply using `>` redirection?", a: "`>` only writes to a file; `tee` writes to both file and stdout." },
  { q: "Can `tee` be used with sudo to write to a protected file?", a: "Yes: `echo 'config' | sudo tee /etc/config_file` (instead of `sudo echo > file` which fails)." },
  { q: "Why does `sudo echo 'text' > /root/file` fail? How does `tee` solve it?", a: "Redirection is applied by the shell before sudo, so shell needs write permission. `sudo tee` runs tee as root, which can write." },
  { q: "What does `tee --version` show?", a: "The version of tee (part of GNU coreutils or similar)." },
  { q: "How do you use `tee` to capture both stdout and stderr?", a: "`command 2>&1 | tee file.txt` (combine stderr into stdout first)." },
  { q: "What is the exit code of `tee` if a file cannot be opened for writing?", a: "Non-zero. The command may fail, but data may still be written to other files or stdout." },
  { q: "Can `tee` read from a file instead of stdin?", a: "No, `tee` only reads from stdin. Use input redirection if needed: `tee file < input.txt`." },
  { q: "What is the purpose of `tee` in build systems (e.g., make)?", a: "Capture build logs while still showing progress on terminal: `make 2>&1 | tee build.log`." },
  { q: "How does `tee -a` differ from `tee` without `-a`?", a: "`-a` appends to the file(s) instead of overwriting." },
  { q: "What happens if you specify multiple files to `tee` and one of them is not writable?", a: "The writable files still receive data; tee returns a non-zero exit code but continues." },
  { q: "How can you use `tee` to simultaneously write to a file and to a network socket? (Advanced)", a: "Use process substitution: `command | tee >(nc host port) > file.txt`" },
  { q: "Is `tee` available on all Unix-like systems?", a: "Yes, tee is POSIX and available on Linux, macOS, BSD, Solaris, etc." }
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
        🧠 Test Your Knowledge – 20 tee Command Questions
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

export default function Topic9() {
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
              Using <code className="text-3xl bg-transparent">tee</code> for Output Redirection
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Split a stream – simultaneously write to files and standard output. Perfect for logging, debugging, and tee-ing into multiple pipelines.
            </p>
          </div>

          {/* SVG Illustration: tee splitting stream */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <text x="375" y="30" textAnchor="middle" fill="#1E293B" className="dark:text-white" fontSize="16" fontWeight="bold">How `tee` Works</text>

                {/* Input arrow */}
                <line x1="80" y1="100" x2="180" y2="100" stroke="#4F46E5" strokeWidth="3" markerEnd="url(#arrowTee)" />
                <text x="130" y="90" textAnchor="middle" fill="#4F46E5" fontSize="13">stdin</text>

                {/* tee box */}
                <rect x="200" y="70" width="120" height="60" rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="2.5" />
                <text x="260" y="100" textAnchor="middle" fill="#065F46" fontSize="18" fontWeight="bold">tee</text>
                <text x="260" y="118" textAnchor="middle" fill="#4B5563" fontSize="11">tee file.log</text>

                {/* Output to stdout (terminal) */}
                <line x1="320" y1="90" x2="420" y2="90" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrowBlue)" />
                <text x="370" y="80" textAnchor="middle" fill="#3B82F6" fontSize="13">stdout</text>
                <rect x="430" y="70" width="100" height="40" rx="6" fill="#DBEAFE" stroke="#3B82F6" />
                <text x="480" y="95" textAnchor="middle" fill="#1E3A8A" fontSize="12">Terminal</text>

                {/* Output to file */}
                <line x1="320" y1="120" x2="420" y2="150" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowOrange)" />
                <text x="370" y="170" textAnchor="middle" fill="#F59E0B" fontSize="13">file.log</text>
                <rect x="430" y="140" width="100" height="40" rx="6" fill="#FEF3C7" stroke="#F59E0B" />
                <text x="480" y="165" textAnchor="middle" fill="#92400E" fontSize="12">Disk file</text>

                {/* Multiple files option */}
                <rect x="200" y="200" width="250" height="40" rx="6" fill="#FCE7F3" stroke="#BE185D" strokeWidth="1.5" />
                <text x="325" y="225" textAnchor="middle" fill="#831843" fontSize="12">
                  `... | tee file1 file2 file3`
                </text>

                <defs>
                  <marker id="arrowTee" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5" /></marker>
                  <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                  <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" /></marker>
                </defs>

                {hoverSvg && (
                  <text x="375" y="255" textAnchor="middle" fill="#10B981" fontSize="13">
                    💡 `tee` = T‑junction: one input, multiple outputs
                  </text>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
            {[
              { title: "🔀 Split Stream", content: "`tee` reads stdin and writes to stdout and to one or more files. Enables logging without losing console visibility." },
              { title: "📝 Append Mode", content: "`-a` (or `--append`) appends to files instead of overwriting. Essential for keeping historical logs." },
              { title: "🛡️ Sudo Helper", content: "Use `sudo tee` to write to protected files: `echo 'config' | sudo tee /etc/config`." },
              { title: "📊 Multiple Targets", content: "Specify several files: `command | tee file1 file2 file3`. Each file gets the full stream." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 4])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 tee Command Signatures</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`# Basic usage
command | tee [OPTION]... [FILE]...

# Write to file and terminal (overwrite)
ls -l | tee listing.txt

# Append to file
echo "new line" | tee -a log.txt

# Write to multiple files
ps aux | tee process_list.txt process_list_backup.txt

# Capture stderr as well (merge stderr into stdout)
build_script 2>&1 | tee build.log

# Suppress terminal output but still write to file
command | tee file.txt > /dev/null

# Use with sudo to write to root-owned files
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf

# Use -i to ignore interrupts
long_running_task | tee -i output.log

# Write to a file and also pipe to another command
command | tee intermediate.txt | next_command`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Save a copy of output while still displaying it in real time. <strong>When/Why:</strong> Logging scripts, debugging pipelines, writing to configuration files with sudo, splitting a data stream for parallel processing.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> At Barrackpore High School, the lab administrator runs `make 2>&1 | tee build.log` to compile software while saving errors. Tuhina uses `echo 'export PATH=$PATH:/opt/bin' | sudo tee /etc/profile.d/custom.sh` to write system configuration. Swadeep debugs a pipeline: `csvtool readable data.csv | tee debug.txt | wc -l`.</p>
            </div>
          </div>

          {/* Shell code examples */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 tee in Action</h2>
            <div className="grid gap-5 md:grid-cols-1">
              <ShellFileLoader fileModule={teeBasics} title="tee_basics.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={teeAppend} title="tee_append.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={teeMultiple} title="tee_multiple.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> When writing to root-owned files, remember: `sudo tee` works, `sudo echo > file` does not. Use `tee` whenever you need to preserve terminal output while logging.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Combine with process substitution to write to multiple different commands: `command | tee >(grep error > errors.log) >(wc -l > count.txt)`.</li>
                <li>Use `tee -a` for persistent logs (prevents overwriting on each run).</li>
                <li>Capture both stdout and stderr with `2>&1 | tee log` – crucial for build scripts.</li>
                <li>Use `tee >(command1) >(command2) >/dev/null` to broadcast to parallel processes without terminal clutter.</li>
                <li>Check exit status: `PIPESTATUS[0]` for tee's exit code in bash.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Forgetting `-a` and overwriting important logs.</li>
                <li>Using `sudo` only on `echo` but not on redirect: `sudo echo "text" > /root/file` fails.</li>
                <li>Not merging stderr: `cmd | tee log` only captures stdout; stderr still goes to terminal (but not to log). Use `2>&1`.</li>
                <li>Assuming `tee` works with files that have spaces without quoting: `tee "my file.log"`.</li>
                <li>Using `tee` in scripts and not checking its exit code (if a file is unwritable, tee fails but pipeline may still succeed).</li>
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
                  <li>Always use `2>&1 | tee` if you need errors in log.</li>
                  <li>Use `-a` when appending to existing logs.</li>
                  <li>Rotate logs to avoid huge files.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">For privileged writes:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Use `sudo tee` with redirection from `echo` or from a command.</li>
                  <li>☑️ Quote file paths with spaces.</li>
                  <li>☑️ Verify that the file was written: `sudo cat /etc/config`.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">Run `echo hello | tee out.txt > /dev/null`. Where does "hello" go? (To out.txt only, not terminal.) Now try `echo hello | tee -a out.txt | cat`. The `cat` gets the stream and prints it. How would you write to two log files and also display on terminal? (Answer: `command | tee log1.txt log2.txt` – tee writes to both files and stdout by default.)</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="`tee` is a lifesaver for debugging pipelines. I show students: `ls -l | tee listing.txt | wc -l` – they see the line count and also have the full listing saved. Then I demonstrate `sudo tee` by trying to write to `/etc/hosts` – they see why `sudo echo` fails and `sudo tee` works. The T‑junction analogy (plumbing tee) sticks." />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="tee Command – FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}