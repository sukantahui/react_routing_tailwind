// Topic7.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import zombieDemoSh from './topic7_files/zombie_demo.sh?raw';
import zombieDemoC from './topic7_files/zombie_demo.c?raw';

const Topic7 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Zombie Process Concept
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-amber-500 pl-4">
            Undead processes – what they are, why they exist, and how to prevent them.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-amber-500">🧟</span> What is a Zombie Process?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                A <strong className="text-amber-600 dark:text-amber-400">zombie</strong> (or <strong>defunct</strong>) process is a process that has terminated but still has an entry in the process table. 
                This happens when a child exits but its parent has not yet called <code>wait()</code> to read its exit status.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>Consumes</strong> only a process table slot (struct task_struct) – no memory, no CPU</li>
                <li><strong>Shows state code <code>Z</code></strong> in <code>ps</code> output</li>
                <li><strong>Cannot be killed</strong> – you must kill the parent to remove the zombie</li>
                <li><strong>Important</strong>: The kernel keeps the zombie so the parent can later read the exit status.</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm">
                <code className="block whitespace-pre">
                  {`$ ps aux | grep defunct
swadeep  12345  0.0  0.0      0     0 pts/0    Z+   10:00   0:00 [a.out] <defunct>`}
                </code>
              </div>
              <p className="mt-3 text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border">
                💡 The zombie is already dead – you cannot <code>kill -9</code> it. The only way to remove it is to <code>wait()</code> (or kill its parent).
              </p>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-orange-500">🏫</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                At a school in <strong>Naihati</strong>, a student (<strong>Debangshu</strong>) completes his final exam and leaves school (process terminates). 
                However, the teacher (<strong>Sukanta</strong>) has not yet recorded the grade in the register. 
                The student's name remains in the attendance book (process table) – he is neither present nor fully gone, a "zombie student". 
                The only way to remove his name is for the teacher to record the grade (call <code>wait()</code>). 
                If the teacher never does this, the name stays forever – or until the teacher retires (parent dies) and the principal (init) cleans up.
              </p>
              <div className="mt-4 border-l-4 border-orange-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "Zombies are the ghosts of processes that have died but not yet been buried by their parents."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Zombie lifecycle */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">🧟 Zombie Lifecycle – From Living to Undead</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on each state – animated arrows show the transition</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="700" height="300" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="zombie-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#d97706" />
                </marker>
                <filter id="shadow-zombie">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Running process */}
              <g transform="translate(100, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-zombie)">
                <rect x="-50" y="-30" width="100" height="60" rx="10" fill="#10b981" className="hover:fill-emerald-500 transition">
                  <animate attributeName="width" values="100;106;100" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Living</text>
                <text x="0" y="12" textAnchor="middle" fill="white" fontSize="11">(Running)</text>
                <text x="0" y="28" textAnchor="middle" fill="white" fontSize="10">consumes resources</text>
                <title>Normal process, using memory and CPU</title>
              </g>
              
              {/* exit() call */}
              <line x1="150" y1="80" x2="230" y2="80" stroke="#d97706" strokeWidth="2" markerEnd="url(#zombie-arrow)"/>
              <text x="190" y="65" fill="#d97706" fontSize="11">exit() / return</text>
              
              {/* Zombie process */}
              <g transform="translate(280, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-zombie)">
                <rect x="-55" y="-35" width="110" height="70" rx="10" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-8" textAnchor="middle" fill="white" fontWeight="bold">Zombie</text>
                <text x="0" y="10" textAnchor="middle" fill="white" fontSize="11">(Defunct)</text>
                <text x="0" y="25" textAnchor="middle" fill="white" fontSize="9">PCB exists, no memory</text>
                <title>Process terminated, but PCB still in process table (state Z)</title>
              </g>
              
              {/* Parent calls wait */}
              <line x1="390" y1="80" x2="470" y2="80" stroke="#d97706" strokeWidth="2" markerEnd="url(#zombie-arrow)" strokeDasharray="4"/>
              <text x="430" y="65" fill="#d97706" fontSize="9">wait()</text>
              
              {/* Zombie reaped – disappears */}
              <g transform="translate(520, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-zombie)">
                <rect x="-45" y="-30" width="90" height="60" rx="10" fill="#6b7280" className="hover:fill-gray-500 transition">
                  <animate attributeName="x" values="520;523;520" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Reaped</text>
                <text x="0" y="12" textAnchor="middle" fill="white" fontSize="11">(Removed)</text>
                <title>Parent called wait(), zombie cleaned up</title>
              </g>
              
              {/* Arrow if parent dies before reaping */}
              <path d="M280,115 L280,160 L100,160" stroke="#dc2626" strokeWidth="2" strokeDasharray="6,3" fill="none" markerEnd="url(#zombie-arrow)"/>
              <text x="180" y="150" fill="#dc2626" fontSize="10" fillOpacity="0.8">parent dies → adopt by init</text>
              
              {/* init reaps */}
              <g transform="translate(100, 180)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-zombie)">
                <rect x="-45" y="-25" width="90" height="50" rx="10" fill="#8b5cf6" className="hover:fill-purple-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="5" textAnchor="middle" fill="white" fontWeight="bold">init</text>
                <text x="0" y="20" textAnchor="middle" fill="white" fontSize="10">reaps orphan</text>
                <title>If parent died, init (PID 1) eventually calls wait()</title>
              </g>
              <line x1="145" y1="175" x2="275" y2="105" stroke="#d97706" strokeWidth="2" markerEnd="url(#zombie-arrow)"/>
              
              <text x="350" y="250" textAnchor="middle" fill="#6b7280" fontSize="12">Zombies are a temporary state – always clean them with wait()</text>
            </svg>
          </div>
        </div>

        {/* Why zombies exist and how to detect */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-5 rounded-2xl border-l-8 border-amber-500">
            <h4 className="font-mono font-bold">Why Do Zombies Exist?</h4>
            <p className="text-sm mt-1">The kernel cannot simply discard a child's exit status because the parent might need it (e.g., shell's <code>$?</code>). So it keeps a minimal entry (PCB) until the parent reads it with <code>wait()</code>. Without zombies, the parent would never know how the child died.</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">Zombies are a necessary design feature, not a bug.</p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 p-5 rounded-2xl border-l-8 border-orange-500">
            <h4 className="font-mono font-bold">How to Detect Zombies</h4>
            <ul className="list-disc pl-4 text-sm mt-1 space-y-0.5">
              <li><code>ps aux | grep defunct</code> or <code>ps -e -o pid,stat,comm | grep '^.* Z'</code></li>
              <li><code>top</code> shows a count of zombie processes (if any) on the summary line</li>
              <li><code>htop</code> highlights zombies in red or shows 'Z'</li>
              <li><code>ps -l</code> – column <code>S</code> shows <code>Z</code> for zombies</li>
            </ul>
          </div>
        </div>

        {/* C program that creates a zombie */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 Example: Creating a Zombie (Parent does NOT wait)</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        // Child process
        printf("Child (PID %d) exiting...\\n", getpid());
        return 0;
    } else {
        // Parent does NOT wait – child becomes zombie
        printf("Parent (PID %d). Child PID = %d\\n", getpid(), pid);
        printf("Press Enter to exit and let init adopt the zombie...\\n");
        getchar();
        // Parent exits – zombie becomes orphan, init will reap it
        return 0;
    }
}`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Compile and run. In another terminal, run <code>ps -l</code> to see the zombie (state Z) before parent exits.</p>
        </div>

        {/* Shell demo and C demo files */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={zombieDemoSh}
            title="Shell script: create and detect a zombie"
            highlightLines={[6, 12, 20]}
          />
          <ShellFileLoader
            fileModule={zombieDemoC}
            title="zombie_demo.c – compile and create zombies"
            highlightLines={[8, 14, 17]}
          />
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-amber-600">🔍</span> Quick commands to explore zombies:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Count zombie processes system-wide
ps aux | grep -c defunct
# Watch zombie count in real time
watch -n 1 'ps -e -o stat | grep -c Z'
# Show zombies with parent and command
ps -e -o pid,ppid,stat,comm | awk '$3 ~ /Z/ {print}'`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>In long‑running daemons, always call <code>waitpid(-1, NULL, WNOHANG)</code> periodically or set a <code>SIGCHLD</code> handler.</li>
              <li>Use <code>signal(SIGCHLD, SIG_IGN)</code> on Linux to automatically reap children (no zombies).</li>
              <li>In container environments, use a proper init like <code>tini</code> or <code>dumb-init</code> as PID 1 to reap zombies.</li>
              <li>Monitor zombie count: a sudden increase indicates a buggy parent process (often a service).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Write a program that forks 10 children, and the parent does <strong>not</strong> wait. Use <code>ps</code> in another terminal. How many zombies appear? Then modify the parent to call <code>wait()</code> in a loop after all children are forked – what happens to the zombies?</p>
            <p className="mt-1 text-xs">Also try: send <code>SIGKILL</code> to a zombie process – does it work? Why not?</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Assuming you can kill a zombie – you cannot. You must kill its parent or wait for init.</li>
              <li>Forgetting to wait() in a long‑running program, causing a zombie leak that exhausts PIDs.</li>
              <li>Calling <code>wait()</code> from a signal handler without using <code>WNOHANG</code> – may block.</li>
              <li>Misinterpreting zombie as a resource hog – zombies only consume a tiny kernel structure, but large numbers can fill the process table.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Always pair <code>fork()</code> with a corresponding <code>wait()</code> or <code>waitpid()</code>.</li>
              <li>For daemons, install a <code>SIGCHLD</code> handler that loops <code>waitpid(-1, NULL, WNOHANG)</code>.</li>
              <li>Avoid creating long‑lived processes that ignore children. If you must, <code>SIG_IGN</code> SIGCHLD.</li>
              <li>Use <code>prctl(PR_SET_CHILD_SUBREAPER)</code> to make your process act like init for its subtree.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand zombies when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-amber-500">☑</span> Can explain why a zombie appears</div>
            <div className="flex items-center gap-2"><span className="text-amber-500">☑</span> Know how to detect zombies using ps/top</div>
            <div className="flex items-center gap-2"><span className="text-amber-500">☑</span> Understand that zombies cannot be killed with SIGKILL</div>
            <div className="flex items-center gap-2"><span className="text-amber-500">☑</span> Can write code that avoids zombies (using wait)</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Zombie Process Concept" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “I have a memorable story from <strong>Barrackpore</strong>: a student, <strong>Tuhina</strong>, wrote a web server fork‑based but forgot to call <code>wait()</code>. After a few thousand requests, the system refused new connections – the process table was full of zombies. 
                We used <code>ps aux | grep Z</code> and saw hundreds of defunct children. Adding a <code>SIGCHLD</code> handler with <code>waitpid(-1, NULL, WNOHANG)</code> solved it. 
                I tell my students: ‘Zombies are like uncollected homework – they clutter the system. Always be a responsible parent: wait for your children.’”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Run <code>watch -n 1 'ps -e -o stat | grep -c Z'</code> while stress‑testing a server to detect zombie leaks.</p>
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

export default Topic7;