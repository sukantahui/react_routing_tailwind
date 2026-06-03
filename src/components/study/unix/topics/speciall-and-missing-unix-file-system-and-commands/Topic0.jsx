import React, { useState } from 'react';
import clsx from 'clsx';

// Common components (paths as per your project)
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import shell script examples
import straceDemo from './topic0_files/strace_demo.sh?raw';
import syscallCount from './topic0_files/syscall_count.sh?raw';
import simpleSyscallDemo from './topic0_files/simple_syscall_demo.sh?raw';

// Import 30 FAQ questions
import questions from './topic0_files/topic0_questions';

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
  { q: "What is a system call?", a: "A controlled entry point into the kernel, allowing user programs to request services (file, process, communication)." },
  { q: "Name three typical system calls.", a: "read(), write(), fork()" },
  { q: "Why can't user programs directly access hardware?", a: "For security and stability – the kernel mediates all hardware access." },
  { q: "What is the role of the system call interface?", a: "It provides a well-defined API between user space and kernel space." },
  { q: "How does a program invoke a system call?", a: "Via library functions (e.g., C `write()`) that trigger a software interrupt or `syscall` instruction." },
  { q: "What is the difference between a library function and a system call?", a: "Library functions run in user space; system calls enter the kernel. Some lib functions (e.g., `printf`) wrap syscalls (`write`)." },
  { q: "What is the return value of a typical system call?", a: "0 or positive on success, -1 on error, with `errno` set." },
  { q: "What happens during a context switch for a system call?", a: "CPU switches from user mode to kernel mode, saves registers, then executes kernel code." },
  { q: "How can you see which system calls a command makes?", a: "Use `strace` (Linux) or `truss` (Solaris)." },
  { q: "What is the purpose of `syscall` numbers?", a: "Each system call has a unique number used by the kernel to dispatch to the correct handler." },
  { q: "Give an example of a process management syscall.", a: "fork(), execve(), waitpid(), exit()" },
  { q: "Give an example of a file management syscall.", a: "open(), read(), write(), close(), lseek()" },
  { q: "What is a signal in Unix? Is the `kill()` syscall?", a: "Signals are software interrupts; `kill()` is a syscall to send signals." },
  { q: "What does the `strace` command do?", a: "Intercepts and records system calls made by a process." },
  { q: "What is the difference between `read()` and `fread()`?", a: "`read()` is a syscall (raw). `fread()` is a stdio library function that buffers data and calls `read()` internally." },
  { q: "What is the system call overhead?", a: "The cost of switching to kernel mode and back; thousands of cycles, so batching I/O reduces overhead." },
  { q: "What is `errno`?", a: "A global variable (or thread-local) set by syscalls to indicate the specific error." },
  { q: "Can a system call be interrupted by a signal?", a: "Yes, some syscalls (e.g., `read`, `write`) can return -1 with `errno=EINTR` if interrupted." },
  { q: "What is the `syscall()` function in Linux?", a: "A library function that invokes a system call given its number and arguments (architecture‑dependent)." },
  { q: "Why do operating systems provide a system call interface instead of direct kernel jumps?", a: "To enforce security, maintain abstraction, and allow binary compatibility across kernel versions." }
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
        🧠 Test Your Knowledge – 20 System Call Questions
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

export default function Topic0() {
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
              System Call Interface
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The bridge between user programs and the OS kernel – how applications request privileged operations.
            </p>
          </div>

          {/* SVG Illustration: User → Kernel mode transition */}
          <div
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSvg(true)}
            onMouseLeave={() => setHoverSvg(false)}
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" className="w-full">
                {/* User space area */}
                <rect x="30" y="30" width="300" height="100" rx="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-indigo-400" />
                <text x="180" y="60" textAnchor="middle" fill="#0F172A" className="dark:fill-white" fontSize="14" fontWeight="bold">User Space</text>
                <text x="180" y="85" textAnchor="middle" fill="#334155" className="dark:fill-gray-300" fontSize="12">Application (e.g., ls, cp, your program)</text>
                <text x="180" y="105" textAnchor="middle" fill="#334155" className="dark:fill-gray-300" fontSize="12">C library (glibc) – wrapper function</text>

                {/* Kernel space area */}
                <rect x="30" y="160" width="300" height="90" rx="10" fill="#FCE7F3" stroke="#BE185D" strokeWidth="2" className="dark:fill-gray-800 dark:stroke-pink-500" />
                <text x="180" y="190" textAnchor="middle" fill="#0F172A" className="dark:fill-white" fontSize="14" fontWeight="bold">Kernel Space</text>
                <text x="180" y="210" textAnchor="middle" fill="#334155" className="dark:fill-gray-300" fontSize="12">System call handler / table</text>
                <text x="180" y="230" textAnchor="middle" fill="#334155" className="dark:fill-gray-300" fontSize="12">Device drivers, file systems, IPC</text>

                {/* Arrow from user to kernel */}
                <path d="M 330 80 L 370 80 L 370 200 L 330 200" fill="none" stroke="#4F46E5" strokeWidth="3" strokeDasharray="5,5">
                  <animate attributeName="strokeDashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                </path>
                <polygon points="330,195 340,200 330,205" fill="#4F46E5" />

                {/* System call label */}
                <text x="420" y="130" fill="#4F46E5" fontSize="14" fontWeight="bold">System call</text>
                <text x="420" y="150" fill="#6B7280" fontSize="12">(e.g., write, open, fork)</text>

                {/* Return arrow */}
                <path d="M 330 220 L 290 220" fill="none" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowGreen)" />
                <defs>
                  <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#10B981" />
                  </marker>
                </defs>
                <text x="250" y="245" textAnchor="middle" fill="#10B981" fontSize="12">Return value / error</text>

                {hoverSvg && (
                  <g opacity="0.9">
                    <text x="530" y="80" fill="#4B5563" fontSize="12">✨ Privileged operation</text>
                    <text x="530" y="100" fill="#4B5563" fontSize="12">🔒 Hardware protection</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Core concept cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
            {[
              { title: "🔹 Definition", content: "System calls are the programmatic way for user-space applications to request services from the operating system kernel." },
              { title: "🔹 Role", content: "Provide abstraction, security, and controlled access to hardware (disk, network, memory, processes)." },
              { title: "🔹 API", content: "C library wrappers (e.g., `write`, `open`, `fork`, `exec`) that trigger a software interrupt or `syscall` instruction." },
              { title: "🔹 Modes", content: "User mode (restricted) → kernel mode (full privileges) via system call. Context switch overhead exists." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80", cardDelays[idx % 4])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / signature section */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 System Call Prototype (C language)</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`#include <unistd.h>

// Write to a file descriptor
ssize_t write(int fd, const void *buf, size_t count);

// Open a file
int open(const char *pathname, int flags, mode_t mode);

// Create a new process
pid_t fork(void);

// Return value: success → non-negative, error → -1 (errno set)`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Safely perform operations that require kernel privileges. <strong>When/Why:</strong> Every time a program reads a file, writes to terminal, creates a process, or communicates over network – system calls happen behind the scenes.</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real‑world:</span> When Swadeep runs <code className="bg-gray-200 px-1 dark:bg-gray-700">ls -l</code> in Barrackpore High School’s lab, the shell makes system calls like <code>open()</code>, <code>read()</code>, <code>getdents()</code>, <code>write()</code> to list directory contents and display them.</p>
            </div>
          </div>

          {/* Shell code examples (strace demos) */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">🐚 Observing System Calls with `strace`</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <ShellFileLoader fileModule={straceDemo} title="strace_demo.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={syscallCount} title="syscall_count.sh" highlightLines={[]} />
              <ShellFileLoader fileModule={simpleSyscallDemo} title="simple_syscall_demo.sh" highlightLines={[]} />
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> Run <code className="bg-gray-200 px-1 dark:bg-gray-700">strace -c your_command</code> to get a summary of system call counts and time.
              </p>
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Pro Tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use <code>strace -e trace=file</code> to see only file-related syscalls.</li>
                <li>Attach to a running process: <code>strace -p PID</code>.</li>
                <li>Batch I/O (read/write large blocks) reduces syscall overhead.</li>
                <li>Always check return values and <code>errno</code> in C programs.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Forgetting that <code>read()/write()</code> may transfer fewer bytes than requested.</li>
                <li>Not handling <code>EINTR</code> (interrupted system call).</li>
                <li>Assuming library functions are always syscalls (e.g., <code>printf</code> buffers).</li>
                <li>Misinterpreting <code>errno</code> after a successful call (must check before).</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">Coding habits:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>Always check return values of syscalls & handle errors.</li>
                  <li>Use perror() or strerror() to print meaningful errors.</li>
                  <li>Prefer higher‑level libraries (stdio, fopen) unless you need raw syscall control.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Performance & safety:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Minimize syscall frequency (use buffering).</li>
                  <li>☑️ Understand that system calls are expensive (kernel‑user switches).</li>
                  <li>☑️ Use <code>strace</code> to optimize hot paths.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about…</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">Try running <code>strace -e trace=open,close ls</code>. Observe how many files even a simple <code>ls</code> opens. What happens if you run the same command on a directory with thousands of files?</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="System calls are the 'hidden grammar' of every OS course. I always tell students: 'If you write a C program that does I/O, you are using syscalls.' Use strace early — demystifying the kernel becomes an exploration, not a theory. Emphasise that the syscall interface is the only safe way for applications to talk to hardware, and it's the same across all Unix‑like systems (Linux, macOS, BSD). Ask Swadeep and Tuhina to trace different commands and compare the syscall patterns." />
          </div>

          {/* FAQTemplate with 30 questions */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="System Call Interface – Advanced FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions (no opacity) */}
          <InteractiveQuestionsBlock />

        </div>
      </div>
    </>
  );
}