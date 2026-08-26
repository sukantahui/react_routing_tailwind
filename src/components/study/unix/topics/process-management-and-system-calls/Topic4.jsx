// Topic4.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import traceForkSh from './topic4_files/trace_fork.sh?raw';
import simpleForkC from './topic4_files/simple_fork.c?raw';

const Topic4 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            System Calls: fork()
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4">
            The fundamental cloning system call – creating new processes by duplicating the caller.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-blue-500">🔄</span> What is fork()?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">fork()</code> is a system call that creates a new process by duplicating the calling process. 
                The new process is called the <strong>child</strong>, the original is the <strong>parent</strong>. 
                After <code>fork()</code>, both processes execute the next instruction independently.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>Returns 0</strong> to the child process</li>
                <li><strong>Returns child's PID</strong> to the parent process</li>
                <li><strong>Returns -1</strong> on error (errno set)</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`#include <unistd.h>
pid_t fork(void);`}
                </code>
              </div>
              <p className="mt-3 text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border">
                💡 <strong>Important:</strong> <code>fork()</code> returns <strong>twice</strong> – once in parent, once in child.
              </p>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-cyan-500">🌍</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                Imagine a teacher in <strong>Barrackpore</strong>, <strong>Sukanta</strong>, writing an assignment on the board. 
                He asks two students, <strong>Swadeep</strong> and <strong>Tuhina</strong>, to copy the entire board into their notebooks. 
                The act of copying is <code>fork()</code>. After the copy, both students have identical notes (<strong>memory image</strong>), 
                but they are now <strong>independent</strong> – they can doodle, erase, or add to their own copy without affecting the other.
                The teacher (parent) knows both students' roll numbers (PIDs), while each student knows they are the child (return 0).
              </p>
              <div className="mt-4 border-l-4 border-cyan-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "fork() clones the entire process – everything except the PID and some resource statistics."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – fork() process creation diagram */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">🌿 How fork() Creates a Child Process</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on each part – animated arrows show the duplication</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="650" height="280" viewBox="0 0 650 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="fork-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
                </marker>
                <filter id="shadow-fork">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Parent process before fork */}
              <g transform="translate(100, 120)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-fork)">
                <rect x="-60" y="-35" width="120" height="70" rx="10" fill="#3b82f6" className="hover:fill-blue-500 transition">
                  <animate attributeName="width" values="120;126;120" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-10" textAnchor="middle" fill="white" fontWeight="bold">Parent Process</text>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="12">PID = 1234</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10">(before fork)</text>
                <title>Parent process running – fork() will be called</title>
              </g>
              
              {/* fork() call arrow */}
              <line x1="220" y1="105" x2="300" y2="105" stroke="#2563eb" strokeWidth="2" markerEnd="url(#fork-arrow)" strokeDasharray="4"/>
              <text x="260" y="95" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">fork()</text>
              
              {/* After fork: parent continuation */}
              <g transform="translate(400, 60)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-fork)">
                <rect x="-60" y="-35" width="120" height="70" rx="10" fill="#10b981" className="hover:fill-emerald-500 transition">
                  <animate attributeName="x" values="400;403;400" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-10" textAnchor="middle" fill="white" fontWeight="bold">Parent</text>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="12">PID = 1234</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10">returns child PID (1235)</text>
                <title>Parent continues – fork() returns child's PID</title>
              </g>
              
              {/* After fork: child process */}
              <g transform="translate(400, 180)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-fork)">
                <rect x="-60" y="-35" width="120" height="70" rx="10" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-10" textAnchor="middle" fill="white" fontWeight="bold">Child</text>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="12">PID = 1235</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10">returns 0</text>
                <title>Child process is born – fork() returns 0</title>
              </g>
              
              {/* Arrow from fork to parent continuation */}
              <line x1="360" y1="105" x2="380" y2="80" stroke="#2563eb" strokeWidth="2" markerEnd="url(#fork-arrow)"/>
              <text x="370" y="70" fill="#2563eb" fontSize="10">!</text>
              
              {/* Arrow from fork to child */}
              <line x1="360" y1="105" x2="380" y2="190" stroke="#2563eb" strokeWidth="2" markerEnd="url(#fork-arrow)"/>
              <text x="370" y="145" fill="#2563eb" fontSize="10">!</text>
              
              <text x="325" y="260" textAnchor="middle" fill="#6b7280" fontSize="12">After fork: two independent processes run concurrently</text>
            </svg>
          </div>
        </div>

        {/* Key properties of fork() */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-2xl border-l-8 border-blue-500">
            <h4 className="font-mono font-bold">Copy‑on‑Write (COW)</h4>
            <p className="text-sm mt-1">Linux doesn't immediately copy the entire address space. Instead, pages are shared as read‑only until either process writes to them.</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">Makes fork() very fast – only page tables are duplicated, not physical memory.</p>
          </div>
          <div className="bg-cyan-100 dark:bg-cyan-900/30 p-5 rounded-2xl border-l-8 border-cyan-500">
            <h4 className="font-mono font-bold">What is inherited?</h4>
            <ul className="text-sm list-disc pl-4 mt-1 space-y-0.5">
              <li>File descriptors (including open files)</li>
              <li>Environment variables</li>
              <li>Signal handlers (but pending signals not inherited)</li>
              <li>Process group ID, session ID</li>
              <li>Working directory, umask</li>
            </ul>
          </div>
        </div>

        {/* Example C code */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 Minimal fork() Example (C)</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();

    if (pid == -1) {
        perror("fork failed");
        return 1;
    }
    else if (pid == 0) {
        printf("Child:  PID=%d, Parent PID=%d\\n", getpid(), getppid());
    }
    else {
        printf("Parent: PID=%d, Child PID=%d\\n", getpid(), pid);
    }
    return 0;
}`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Compile with <code>gcc -o fork_demo fork_demo.c</code> and run – see both outputs.</p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={traceForkSh}
            title="Tracing fork() with strace"
            highlightLines={[6, 10]}
          />
          <ShellFileLoader
            fileModule={simpleForkC}
            title="simple_fork.c – compile and run yourself"
            highlightLines={[7, 10, 14]}
          />
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-blue-600">🔍</span> Try this in terminal:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Count how many forks a command does
strace -f -e clone bash -c 'ls' 2>&1 | grep -c clone
# Or see fork in action with a C program
gcc -o /tmp/fork_demo /path/to/simple_fork.c && /tmp/fork_demo`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always check <code>fork()</code> return value – it can fail (process limit, memory).</li>
              <li>After <code>fork()</code>, the child should close unnecessary file descriptors to avoid resource leaks.</li>
              <li>Use <code>vfork()</code> only if you immediately call <code>exec()</code> – but modern COW makes it obsolete.</li>
              <li>In a multithreaded program, only the calling thread is duplicated; other threads disappear in the child.</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Write a program that calls <code>fork()</code> in a loop. Use <code>sleep(1)</code> in the child to keep it alive. While it runs, run <code>pstree -p</code> in another terminal. How does the process tree look? What happens if the parent exits before the child?</p>
            <p className="mt-1 text-xs">Also try: <code>fork()</code> inside a signal handler – what could go wrong? (It's unsafe).</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Forgetting that <code>fork()</code> can fail – leads to security holes if not checked.</li>
              <li>Assuming the parent or child runs first – they are scheduled arbitrarily.</li>
              <li>Using buffered I/O (e.g., <code>printf</code> without <code>fflush</code>) before <code>fork()</code> – output may be duplicated.</li>
              <li>Calling <code>exit()</code> instead of <code>_exit()</code> in child after <code>fork()</code> (flushes stdio buffers twice).</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>After <code>fork()</code>, consider calling <code>setsid()</code> in the child to create a new session (daemon).</li>
              <li>Use <code>waitpid()</code> with <code>WNOHANG</code> for non‑blocking child reaping.</li>
              <li>Set the <code>FD_CLOEXEC</code> flag on file descriptors that should not survive <code>exec()</code>.</li>
              <li>For performance, prefer <code>posix_spawn()</code> for fork+exec patterns in some scenarios.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand fork() when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-blue-500">☑</span> Can explain why fork() returns two different values</div>
            <div className="flex items-center gap-2"><span className="text-blue-500">☑</span> Know the difference between parent and child after fork</div>
            <div className="flex items-center gap-2"><span className="text-blue-500">☑</span> Understand Copy‑on‑Write and its benefits</div>
            <div className="flex items-center gap-2"><span className="text-blue-500">☑</span> Can write a simple program that forks and prints PIDs</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="System Calls: fork()" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “At <strong>Shyamnagar</strong> and <strong>Ichapur</strong>, I often use a simple exercise: ask students to predict the output of a program that calls <code>fork()</code> twice. 
                Many are surprised that 4 processes can be created from a single original. 
                <strong>Debangshu</strong> once pointed out that output lines appear interleaved – that’s the perfect moment to introduce scheduling. 
                Always remind them: ‘fork() returns twice, not once’. 
                The best debugging tool for fork() is <code>strace -f</code> – seeing the actual <code>clone</code> system call demystifies it.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Use <code>./fork_demo | cat</code> to see output without stdio buffering surprises.</p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-slide-up {
            0% { opacity: 0.7; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            [class*="animate-"] { animation: none !important; opacity: 1 !important; transform: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic4;