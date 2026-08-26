// Topic5.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import getpidDemoSh from './topic5_files/getpid_demo.sh?raw';
import getpidDemoC from './topic5_files/getpid_demo.c?raw';

const Topic5 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
            System Calls: getpid() & getppid()
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-indigo-500 pl-4">
            Identifying yourself and your parent – fundamental building blocks for process management.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-indigo-500">🏷️</span> What are getpid() and getppid()?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">getpid()</code> returns the <strong>Process ID</strong> of the calling process.<br />
                <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">getppid()</code> returns the <strong>Parent Process ID</strong> – the PID of the process that created the calling process.
              </p>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`#include <unistd.h>
pid_t getpid(void);
pid_t getppid(void);`}
                </code>
              </div>
              <p className="mt-3 text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border">
                💡 These system calls <strong>never fail</strong> – they always return a valid PID (or 0 for special cases).
              </p>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-violet-500">🌍</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                At the school in <strong>Naihati</strong>, every student has a <strong>roll number (PID)</strong>. 
                <strong>Swadeep</strong>’s roll is 1234. He also knows his <strong>class teacher’s ID (PPID)</strong> – that’s <strong>getppid()</strong>. 
                If the teacher leaves and a substitute (init) takes over, <code>getppid()</code> will now return the substitute’s ID. 
                Similarly, <strong>Abhronila</strong> can ask “who am I?” (<code>getpid()</code>) and “who is my parent?” (<code>getppid()</code>) at any time.
              </p>
              <div className="mt-4 border-l-4 border-violet-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "These calls are the identity cards of the process world – simple but indispensable."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Relationship between PID and PPID */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">🔗 Parent‑Child Relationship: PID vs PPID</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on any process box – animated arrows show the connection</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="600" height="220" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="pid-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#4f46e5" />
                </marker>
                <filter id="shadow-pid">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Parent Process */}
              <g transform="translate(120, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-pid)">
                <rect x="-70" y="-35" width="140" height="70" rx="10" fill="#8b5cf6" className="hover:fill-purple-500 transition">
                  <animate attributeName="width" values="140;146;140" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-10" textAnchor="middle" fill="white" fontWeight="bold">Parent Process</text>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="12">PID = 1001</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10">PPID = 1 (init)</text>
                <title>Parent has its own PID and its parent (init)</title>
              </g>
              
              {/* Child Process */}
              <g transform="translate(420, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-pid)">
                <rect x="-65" y="-35" width="130" height="70" rx="10" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-10" textAnchor="middle" fill="white" fontWeight="bold">Child Process</text>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="12">PID = 1002</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10">PPID = 1001</text>
                <title>Child's PPID points back to parent's PID</title>
              </g>
              
              {/* Arrow from parent to child */}
              <line x1="190" y1="80" x2="350" y2="80" stroke="#4f46e5" strokeWidth="3" markerEnd="url(#pid-arrow)" strokeDasharray="6,4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="270" y="65" textAnchor="middle" fill="#4f46e5" fontWeight="bold" fontSize="12">fork()</text>
              
              {/* Label for PPID */}
              <text x="420" y="130" textAnchor="middle" fill="#6b7280" fontSize="11">getppid() → 1001</text>
              <text x="120" y="130" textAnchor="middle" fill="#6b7280" fontSize="11">getppid() → 1</text>
              
              <text x="300" y="190" textAnchor="middle" fill="#4f46e5" fontSize="12" fontWeight="bold">PPID of child = PID of parent</text>
            </svg>
          </div>
        </div>

        {/* Important properties */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-5 rounded-2xl border-l-8 border-indigo-500">
            <h4 className="font-mono font-bold">Return Values</h4>
            <p className="text-sm mt-1"><code>getpid()</code>: always the PID of current process (type <code>pid_t</code>, generally an <code>int</code>).<br />
            <code>getppid()</code>: returns PID of parent. If parent terminated and process reparented to init, returns 1.<br />
            For kernel threads, <code>getppid()</code> may return 0 (tread carefully).</p>
          </div>
          <div className="bg-violet-100 dark:bg-violet-900/30 p-5 rounded-2xl border-l-8 border-violet-500">
            <h4 className="font-mono font-bold">When to Use</h4>
            <ul className="list-disc pl-4 text-sm mt-1 space-y-0.5">
              <li>Logging: identify which process is writing a message</li>
              <li>Debugging: verify parent‑child relationships</li>
              <li>Daemons: check if we are the child after double‑fork</li>
              <li>Security: ensure a process isn't running under an unexpected parent</li>
            </ul>
          </div>
        </div>

        {/* C example */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 Example: getpid() and getppid() in C</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`#include <stdio.h>
#include <unistd.h>

int main() {
    printf("My PID = %d\\n", getpid());
    printf("My parent's PID = %d\\n", getppid());

    pid_t pid = fork();
    if (pid == 0) {
        printf("Child:  my PID = %d, my parent PID = %d\\n", getpid(), getppid());
    } else if (pid > 0) {
        printf("Parent: my PID = %d, my child PID = %d, my parent PID = %d\\n",
               getpid(), pid, getppid());
    }
    return 0;
}`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Try running: the child’s PPID should equal the parent’s PID.</p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={getpidDemoSh}
            title="Shell script: show PID and PPID"
            highlightLines={[3, 7, 10]}
          />
          <ShellFileLoader
            fileModule={getpidDemoC}
            title="getpid_demo.c – compile and run"
            highlightLines={[5, 6, 10, 12]}
          />
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-indigo-600">🔍</span> Try these one‑liners:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Current shell's PID
echo $$
# Parent of current shell
ps -o pid,ppid,comm -p $$
# Watch PID changes across subshells
( echo "Subshell PID: $$ , parent: $PPID" )`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Store <code>getpid()</code> early in a variable – PID never changes for a process.</li>
              <li>In scripts, <code>$$</code> expands to shell’s PID; <code>$PPID</code> gives parent PID.</li>
              <li>After <code>fork()</code>, the child can check its PPID to ensure it has been reparented (e.g., after double‑fork for daemonisation).</li>
              <li>Use <code>getpid()</code> to create unique temporary filenames (but beware of races).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Run a command in the background: <code>sleep 1000 &amp;</code>. Note its PID. What is its PPID? Now kill its parent (the shell). What happens to the sleep’s PPID? (<code>ps -o pid,ppid,comm -p $!</code>)</p>
            <p className="mt-1 text-xs">Also try: <code>echo $$ &amp;&amp; (echo $$)</code> – observe that subshell gets a different PID.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Assuming <code>getppid()</code> always returns the original parent’s PID – parent could exit, reparenting to init.</li>
              <li>Storing PID in an <code>int</code> on platforms where <code>pid_t</code> is larger (though rare).</li>
              <li>Using PID alone for security checks – PIDs are recycled and can be spoofed (e.g., via <code>/proc</code>).</li>
              <li>In scripts, using <code>$$</code> inside a pipeline – it runs in a subshell, PID changes.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Always format PID using <code>%ld</code> if <code>pid_t</code> may be 64‑bit (though on Linux <code>int</code> is fine).</li>
              <li>Use <code>getpid()</code> for logging identifiers, not for cryptography.</li>
              <li>When debugging, print both PID and PPID to understand process tree.</li>
              <li>Check <code>/proc/self</code> for more process information (e.g., <code>/proc/self/status</code>).</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand getpid/getppid when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-indigo-500">☑</span> Can explain what PID and PPID represent</div>
            <div className="flex items-center gap-2"><span className="text-indigo-500">☑</span> Know that getpid() and getppid() never fail</div>
            <div className="flex items-center gap-2"><span className="text-indigo-500">☑</span> Can write a C program that prints both</div>
            <div className="flex items-center gap-2"><span className="text-indigo-500">☑</span> Understand reparenting to init (PPID becomes 1)</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="System Calls: getpid() and getppid()" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “I tell my students at <strong>Barrackpore</strong> and <strong>Ichapur</strong>: ‘Always know your place in the tree.’ 
                <strong>Debangshu</strong> once wasted hours chasing a bug because he assumed the parent of a daemon was init – but the daemon had double‑forked, and the intermediate child’s PPID was not 1. 
                We used <code>getppid()</code> to reveal the truth. 
                Another fun exercise: write a program that prints its PID, sleeps, and then prints its PPID again; kill the parent while it sleeps and see the PPID change to 1. 
                That lesson on reparenting is unforgettable.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: In scripts, use <code>echo "$$"</code> and <code>echo "$PPID"</code> for quick checks.</p>
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

export default Topic5;