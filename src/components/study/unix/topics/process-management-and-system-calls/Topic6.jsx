// Topic6.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import waitDemoSh from './topic6_files/wait_demo.sh?raw';
import waitDemoC from './topic6_files/wait_demo.c?raw';

const Topic6 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
            System Calls: wait()
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-rose-500 pl-4">
            Reaping children, preventing zombies, and synchronising parent‑child execution.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-rose-500">⏳</span> What is wait()?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">wait()</code> and <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">waitpid()</code> system calls allow a parent process to obtain the termination status of its child processes. 
                They serve two critical purposes:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>Reap zombies</strong> – free the child's PCB after it terminates</li>
                <li><strong>Synchronise</strong> – parent can wait for a child to finish before continuing</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`#include <sys/wait.h>
pid_t wait(int *status);
pid_t waitpid(pid_t pid, int *status, int options);`}
                </code>
              </div>
              <p className="mt-3 text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border">
                💡 <strong>Without wait()</strong>, terminated children become <strong>zombies</strong> – consuming process table slots.
              </p>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-pink-500">🏫</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                In a school at <strong>Shyamnagar</strong>, <strong>Teacher Sukanta</strong> assigns a project to <strong>Swadeep</strong> (fork). 
                The teacher cannot start the next lesson until Swadeep submits his project. So the teacher <strong>waits</strong> for Swadeep to finish. 
                When Swadeep finishes, the teacher collects the project (reaps the child) and records the grade (exit status). 
                If the teacher never collects the project, Swadeep's desk (process table entry) remains occupied – that's a <strong>zombie</strong>. 
                <code>wait()</code> is the act of collecting the completed project.
              </p>
              <div className="mt-4 border-l-4 border-pink-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "A good parent always wait()s for its children – otherwise the system becomes cluttered with zombies."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – wait() Flow Diagram */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">🔁 How wait() Synchronises Parent and Child</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on each step – animated arrows show the flow</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="700" height="320" viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="wait-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#e11d48" />
                </marker>
                <filter id="shadow-wait">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Parent timeline */}
              <g transform="translate(120, 60)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-wait)">
                <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#3b82f6" className="hover:fill-blue-500 transition">
                  <animate attributeName="width" values="120;126;120" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Parent</text>
                <text x="0" y="12" textAnchor="middle" fill="white" fontSize="11">fork() → child</text>
                <text x="0" y="28" textAnchor="middle" fill="white" fontSize="10">continues</text>
                <title>Parent forks a child and continues running</title>
              </g>
              
              {/* Child timeline */}
              <g transform="translate(120, 180)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-wait)">
                <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Child</text>
                <text x="0" y="12" textAnchor="middle" fill="white" fontSize="11">executes</text>
                <text x="0" y="28" textAnchor="middle" fill="white" fontSize="10">exits / terminates</text>
                <title>Child runs, then terminates (becomes zombie)</title>
              </g>
              
              {/* Arrow fork */}
              <line x1="120" y1="90" x2="120" y2="150" stroke="#e11d48" strokeWidth="2" markerEnd="url(#wait-arrow)" strokeDasharray="4"/>
              <text x="140" y="120" fill="#e11d48" fontSize="11">fork()</text>
              
              {/* Parent calls wait */}
              <g transform="translate(380, 60)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-wait)">
                <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#10b981" className="hover:fill-emerald-500 transition">
                  <animate attributeName="x" values="380;383;380" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Parent</text>
                <text x="0" y="12" textAnchor="middle" fill="white" fontSize="11">calls wait()</text>
                <text x="0" y="28" textAnchor="middle" fill="white" fontSize="10">BLOCKS</text>
                <title>Parent calls wait() – blocks until child terminates</title>
              </g>
              <line x1="180" y1="75" x2="310" y2="75" stroke="#e11d48" strokeWidth="2" markerEnd="url(#wait-arrow)"/>
              
              {/* Child exits notification */}
              <line x1="180" y1="195" x2="310" y2="195" stroke="#e11d48" strokeWidth="2" strokeDasharray="4"/>
              <text x="245" y="185" fill="#e11d48" fontSize="10">child exits</text>
              
              {/* Parent reaps */}
              <g transform="translate(560, 60)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-wait)">
                <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#8b5cf6" className="hover:fill-purple-500 transition">
                  <animate attributeName="x" values="560;563;560" dur="3.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Parent</text>
                <text x="0" y="12" textAnchor="middle" fill="white" fontSize="11">wait() returns</text>
                <text x="0" y="28" textAnchor="middle" fill="white" fontSize="10">reaps zombie</text>
                <title>wait() returns, parent reaps child's status and PCB</title>
              </g>
              <line x1="440" y1="75" x2="490" y2="75" stroke="#e11d48" strokeWidth="2" markerEnd="url(#wait-arrow)"/>
              <text x="440" y="60" fill="#e11d48" fontSize="10">child done</text>
              
              {/* Notification from child to parent */}
              <path d="M120,210 C120,260 500,260 500,90" stroke="#e11d48" strokeWidth="2" strokeDasharray="5,3" fill="none" markerEnd="url(#wait-arrow)"/>
              <text x="310" y="270" fill="#e11d48" fontSize="10">SIGCHLD signal</text>
              
              <text x="350" y="310" textAnchor="middle" fill="#6b7280" fontSize="12">wait() blocks parent → child runs → parent reaps → no zombies</text>
            </svg>
          </div>
        </div>

        {/* wait() variants and options */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-rose-100 dark:bg-rose-900/30 p-5 rounded-2xl border-l-8 border-rose-500">
            <h4 className="font-mono font-bold">wait() – basic blocking</h4>
            <p className="text-sm mt-1"><code>pid_t wait(int *status);</code><br />
            Waits for <strong>any</strong> child to terminate. Returns child's PID, or -1 on error (ECHILD if no children).<br />
            The <code>status</code> pointer receives the child's exit status (use macros <code>WIFEXITED</code>, <code>WEXITSTATUS</code>).</p>
          </div>
          <div className="bg-pink-100 dark:bg-pink-900/30 p-5 rounded-2xl border-l-8 border-pink-500">
            <h4 className="font-mono font-bold">waitpid() – flexible waiting</h4>
            <p className="text-sm mt-1"><code>pid_t waitpid(pid_t pid, int *status, int options);</code><br />
            <strong>pid</strong> can be -1 (any child), &gt 0 (specific child), 0 (any in same group), &lt -1 (group).<br />
            <strong>options</strong>: <code>WNOHANG</code> (non‑blocking), <code>WUNTRACED</code>, <code>WCONTINUED</code>.</p>
          </div>
        </div>

        {/* Example C code with wait() */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 Example: Using wait() to reap children</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
                {`#include <stdio.h>
                #include <unistd.h>
                #include <sys/wait.h>

                int main() {
                    pid_t pid = fork();

                    if (pid == 0) {
                        // Child: sleep, then exit with code 42
                        sleep(2);
                        printf("Child exiting with status 42\\n");
                        return 42;
                    } else {
                        // Parent: wait for child
                        int status;
                        pid_t child_pid = wait(&status);
                        
                        printf("Parent: child %d terminated\\n", child_pid);
                        if (WIFEXITED(status)) {
                            printf("  Exit code: %d\\n", WEXITSTATUS(status));
                        } else if (WIFSIGNALED(status)) {
                            printf("  Killed by signal %d\\n", WTERMSIG(status));
                        }
                        return 0;
                    }
                }`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Compile with <code>gcc -o wait_demo wait_demo.c</code>; observe parent blocks until child exits.</p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={waitDemoSh}
            title="Shell: wait for background processes"
            highlightLines={[5, 9, 15]}
          />
          <ShellFileLoader
            fileModule={waitDemoC}
            title="wait_demo.c – compile and run yourself"
            highlightLines={[8, 11, 15, 19]}
          />
          <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-rose-600">🔍</span> Try these commands:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Run a background job and wait for it
sleep 5 &
wait $!
echo "Background sleep finished"

# Create zombie intentionally (parent doesn't wait)
sleep 30 &
ps -o pid,stat,comm -p $!   # see 'S' (sleeping)
kill $!
ps -o pid,stat,comm -p $!   # now 'Z' (zombie) if parent hasn't waited`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Use <code>waitpid()</code> with <code>WNOHANG</code> in a loop to reap multiple children without blocking.</li>
              <li>Install a <code>SIGCHLD</code> handler that calls <code>waitpid(-1, NULL, WNOHANG)</code> to automatically reap children.</li>
              <li>Always check the return value of <code>wait()</code> – it can be -1 if interrupted by a signal or no children exist.</li>
              <li>Use the <code>WEXITSTATUS</code> macro to get the child’s exit code (only valid if <code>WIFEXITED</code> true).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Write a program that forks 5 children, each sleeping a random time, then call <code>wait()</code> in a loop. What order do they finish? Reap them with <code>waitpid(-1, ...)</code> vs specifying a specific PID. Try <code>WNOHANG</code> with a non‑blocking check.</p>
            <p className="mt-1 text-xs">Also, what happens if a child is stopped (SIGSTOP) and you haven't set <code>WUNTRACED</code>?</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Forgetting to call <code>wait()</code> – creates zombies that consume process table entries.</li>
              <li>Calling <code>wait()</code> from a signal handler without using <code>waitpid()</code> with <code>WNOHANG</code> (it may block).</li>
              <li>Assuming <code>wait()</code> returns immediately if no children – it returns -1 with errno=ECHILD.</li>
              <li>Using <code>status</code> as an int but not examining it properly – always use the WIF* macros.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Always reap all children, especially in long‑running daemons.</li>
              <li>Use <code>waitpid(-1, &status, WNOHANG)</code> in a loop to reap all available children without blocking.</li>
              <li>Set a handler for <code>SIGCHLD</code> with <code>SA_RESTART</code> flag if you want system calls to restart after reaping.</li>
              <li>Consider using <code>posix_spawn()</code> if you don't need the advanced control of waitpid.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand wait() when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-rose-500">☑</span> Can explain why wait() prevents zombie processes</div>
            <div className="flex items-center gap-2"><span className="text-rose-500">☑</span> Know the difference between wait() and waitpid()</div>
            <div className="flex items-center gap-2"><span className="text-rose-500">☑</span> Can extract exit code from status using macros</div>
            <div className="flex items-center gap-2"><span className="text-rose-500">☑</span> Understand non‑blocking wait using WNOHANG</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="System Calls: wait()" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 p-6 rounded-2xl border border-rose-200 dark:border-rose-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-rose-800 dark:text-rose-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “At <strong>Ichapur</strong>, students often ask: ‘Why do we need wait()? The child terminates anyway.’ 
                I answer with the zombie demonstration. <strong>Abhronila</strong> once ran a program that forked 10,000 children without waiting – within seconds, the system ran out of PIDs. 
                After adding a simple <code>while(wait(NULL) > 0);</code> loop, the problem vanished. 
                I also emphasize the SIGCHLD handler technique – it's the professional way to reap children without blocking the main logic. 
                <strong>Debangshu</strong> liked the analogy of a teacher collecting assignments; it stuck with the class.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Run <code>watch -n 1 'ps aux | grep defunct'</code> to see zombies in real time.</p>
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

export default Topic6;