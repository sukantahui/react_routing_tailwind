// Topic10.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic10_files/topic10_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import stateObserverSh from './topic10_files/state_observer.sh?raw';
import stateDemoC from './topic10_files/state_demo.c?raw';

const Topic10 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 to-rose-600 dark:from-fuchsia-400 dark:to-rose-400 bg-clip-text text-transparent">
            Process States & State Transition Diagram
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-fuchsia-500 pl-4">
            The lifecycle of a process – from birth to death, through ready, running, and waiting.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-fuchsia-500">📊</span> What are Process States?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                A process moves through different <strong>states</strong> during its lifetime. The operating system's scheduler uses these states to decide which process gets the CPU. The classic five states are:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>New</strong> – Process is being created</li>
                <li><strong>Ready</strong> – Loaded in memory, waiting for CPU</li>
                <li><strong>Running</strong> – Executing instructions on CPU</li>
                <li><strong>Waiting (Blocked)</strong> – Suspended, waiting for an event (I/O, signal)</li>
                <li><strong>Terminated</strong> – Finished execution, waiting to be reaped</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000  1234  1233  0  80   0 -  1234 wait   pts/0    00:00:00 bash
0 R  1000  5678  1234  0  80   0 -  1234 -      pts/0    00:00:00 ps`}
                </code>
                <p className="text-xs mt-1">State codes: R=running, S=sleeping (waiting), D=uninterruptible sleep, Z=zombie, T=stopped</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-rose-500">🏁</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                Think of a busy restaurant kitchen in <strong>Barrackpore</strong>. Orders come in (<strong>New</strong>). They are placed on the order board (<strong>Ready</strong>). 
                A chef picks an order and starts cooking (<strong>Running</strong>). If the chef needs ingredients from the pantry (I/O), they put the order aside and wait (<strong>Waiting/Blocked</strong>). 
                When the ingredients arrive, the order goes back to the board (<strong>Ready</strong>). After cooking is done, the order leaves the kitchen (<strong>Terminated</strong>). 
                The head chef (<strong>scheduler</strong>) decides which order to pick next, sometimes preempting a partially cooked order if a higher‑priority order appears.
              </p>
              <div className="mt-4 border-l-4 border-rose-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "The state diagram is the map of a process's journey through the system."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Comprehensive Process State Transition Diagram */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">🔄 Complete Process State Transition Diagram</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on any state – animated labels and arrows show transitions</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="750" height="420" viewBox="0 0 750 420" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="state-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#c026d3" />
                </marker>
                <filter id="shadow-state">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/*<!-- NEW state -->*/}
              <g transform="translate(60, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-state)">
                <rect x="-45" y="-30" width="90" height="60" rx="10" fill="#10b981" className="hover:fill-emerald-500 transition">
                  <animate attributeName="width" values="90;96;90" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">NEW</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">creation</text>
                <title>Process being created (fork/exec in progress)</title>
              </g>
              
              {/* <!-- READY state --> */}
              <g transform="translate(220, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-state)">
                <rect x="-50" y="-30" width="100" height="60" rx="10" fill="#3b82f6" className="hover:fill-blue-500 transition">
                  <animate attributeName="y" values="80;76;80" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">READY</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">waiting for CPU</text>
                <title>Loaded in memory, ready to run</title>
              </g>
              
              {/* <!-- RUNNING state --> */}
              <g transform="translate(420, 80)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-state)">
                <rect x="-55" y="-30" width="110" height="60" rx="10" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="height" values="60;66;60" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">RUNNING</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">executing on CPU</text>
                <title>Process instructions currently being executed</title>
              </g>
              
              {/* <!-- WAITING state --> */}
              <g transform="translate(420, 200)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-state)">
                <rect x="-55" y="-30" width="110" height="60" rx="10" fill="#ef4444" className="hover:fill-red-500 transition">
                  <animate attributeName="x" values="420;424;420" dur="3.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">WAITING</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">blocked on I/O</text>
                <title>Process waiting for event (disk, network, user input)</title>
              </g>
              
              {/* <!-- TERMINATED state --> */}
              <g transform="translate(220, 200)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-state)">
                <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#6b7280" className="hover:fill-gray-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">TERMINATED</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">zombie / reaped</text>
                <title>Process finished, waiting for wait() or being cleaned up</title>
              </g>
              
              {/* <!-- Transition arrows -->
              <!-- NEW -> READY (admit) --> */}
              <line x1="105" y1="80" x2="165" y2="80" stroke="#c026d3" strokeWidth="2" markerEnd="url(#state-arrow)"/>
              <text x="135" y="65" fill="#c026d3" fontSize="10">admit (fork/exec)</text>
              
              {/* <!-- READY -> RUNNING (dispatch) --> */}
              {/* <line x1="270" y1="80" x2="360" y2="80" stroke="#c026d3" strokeWidth="2" markerEnd="url(#state-arrow)"/> */}
              <text x="315" y="65" fill="#c026d3" fontSize="10">dispatch</text>
              
              {/* <!-- RUNNING -> READY (preempt / time slice) --> */}
              <line x1="420" y1="110" x2="270" y2="110" stroke="#c026d3" strokeWidth="2" markerEnd="url(#state-arrow)" strokeDasharray="4"/>
              <text x="345" y="125" fill="#c026d3" fontSize="9">time slice expired / preempt</text>
              
              {/* <!-- RUNNING -> WAITING (I/O request) --> */}
              <line x1="420" y1="140" x2="420" y2="170" stroke="#c026d3" strokeWidth="2" markerEnd="url(#state-arrow)"/>
              <text x="435" y="155" fill="#c026d3" fontSize="10">I/O request</text>
              
              {/* <!-- WAITING -> READY (event completion) --> */}
              <line x1="380" y1="230" x2="275" y2="140" stroke="#c026d3" strokeWidth="2" markerEnd="url(#state-arrow)" strokeDasharray="4"/>
              <text x="330" y="190" fill="#c026d3" fontSize="9">event completion (I/O done)</text>
              
              {/* <!-- RUNNING -> TERMINATED (exit) --> */}
              <line x1="365" y1="80" x2="290" y2="170" stroke="#c026d3" strokeWidth="2" markerEnd="url(#state-arrow)"/>
              <text x="320" y="135" fill="#c026d3" fontSize="10">exit / kill</text>
              
              {/* <!-- Additional: from WAITING to TERMINATED (if killed) --> */}
              <path d="M420,230 L420,250 L280,250" stroke="#c026d3" strokeWidth="1.5" strokeDasharray="3" fill="none" markerEnd="url(#state-arrow)"/>
              <text x="350" y="265" fill="#c026d3" fontSize="9">signal kill</text>
              
              <text x="375" y="360" textAnchor="middle" fill="#6b7280" fontSize="12">The scheduler moves processes between states based on events, time slices, and I/O</text>
            </svg>
          </div>
          <div className="text-center text-xs mt-3 text-gray-500 dark:text-gray-400">R: running, S: sleeping (waiting), D: uninterruptible sleep, Z: zombie, T: stopped</div>
        </div>

        {/* Detailed State Descriptions */}
        <div className="grid md:grid-cols-3 gap-4 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-xl border-l-4 border-emerald-500">
            <h4 className="font-bold">🆕 New</h4>
            <p className="text-sm mt-1">Process descriptor (PCB) created, but process not yet admitted to ready queue. Usually very short.</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold">✅ Ready</h4>
            <p className="text-sm mt-1">Loaded in memory, waiting for CPU. Multiple processes can be in ready queue.</p>
          </div>
          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-xl border-l-4 border-amber-500">
            <h4 className="font-bold">⚡ Running</h4>
            <p className="text-sm mt-1">Process currently executing on CPU. Only one per CPU core.</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-xl border-l-4 border-red-500">
            <h4 className="font-bold">⏳ Waiting/Blocked</h4>
            <p className="text-sm mt-1">Suspended, waiting for event (I/O, signal, lock). Not eligible for CPU.</p>
          </div>
          <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-xl border-l-4 border-gray-600">
            <h4 className="font-bold">💀 Terminated</h4>
            <p className="text-sm mt-1">Process finished but PCB persists until parent calls wait() (zombie).</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl border-l-4 border-purple-500">
            <h4 className="font-bold">⏸ Stopped</h4>
            <p className="text-sm mt-1">Suspended by SIGSTOP/SIGTSTP. Can be resumed with SIGCONT.</p>
          </div>
        </div>

        {/* Additional States (Linux specifics) */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold">🐧 Additional Linux Process States</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
            <div><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">D</code> – Uninterruptible sleep (usually waiting for disk I/O)</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Z</code> – Zombie (terminated, not reaped)</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">T</code> – Stopped (by job control or ptrace)</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">t</code> – Tracing stop (debugger)</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">X</code> – Dead (about to be destroyed)</div>
            <div><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">I</code> – Idle kernel thread</div>
          </div>
        </div>

        {/* C program demonstrating state changes */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-xl font-semibold mb-3">📝 Example: Process State Changes (C)</h3>
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
        printf("Child (PID %d) - RUNNING state\\n", getpid());
        sleep(5);  // Will become Sleeping (S) state
        printf("Child exiting - will become ZOMBIE temporarily\\n");
        return 0;
    } else {
        // Parent process
        printf("Parent (PID %d) - RUNNING, child PID = %d\\n", getpid(), pid);
        sleep(2);
        printf("Parent waiting for child... (state: SLEEPING while waiting)\\n");
        wait(NULL);  // Parent blocks -> SLEEPING until child exits
        printf("Parent reaped child. Now exiting.\\n");
    }
    return 0;
}`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Run this and in another terminal execute <code>ps -l</code> to see states: R (running), S (sleeping), Z (zombie).</p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={stateObserverSh}
            title="Observe process states in real time with watch"
            highlightLines={[5, 12, 18]}
          />
          <ShellFileLoader
            fileModule={stateDemoC}
            title="state_demo.c – compile and see state changes"
            highlightLines={[7, 12, 17, 21]}
          />
          <div className="bg-fuchsia-50 dark:bg-fuchsia-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-fuchsia-600">🔍</span> Quick commands to inspect states:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Show all processes with their state codes
ps -e -o pid,stat,comm
# Count number of processes in each state
ps -e -o stat | cut -c1 | sort | uniq -c
# Continuously monitor state changes
watch -n 1 'ps -e -o stat | head -20'`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>High number of <strong>waiting (S)</strong> processes is normal; high <strong>running (R)</strong> indicates CPU load.</li>
              <li><strong>Uninterruptible sleep (D)</strong> often indicates disk/network I/O issues – can't be killed.</li>
              <li>Use <code>ps -l</code> to see the <strong>WCHAN</strong> column – what kernel function the process is waiting in.</li>
              <li>Stopped processes (<strong>T</strong>) can be resumed with <code>kill -CONT</code>.</li>
              <li>Zombies (<strong>Z</strong>) mean the parent didn't call wait – check parent code.</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Run <code>dd if=/dev/zero of=/dev/null &amp;</code> to create a CPU‑bound process. Watch its state (should be R). Now run <code>dd if=/dev/zero of=/tmp/bigfile</code> – what state does it spend most time in? (Hint: disk I/O).</p>
            <p className="mt-1 text-xs">Also: suspend a process with Ctrl+Z, then use <code>ps -l</code> to see its state (T). Resume with <code>fg</code>.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Confusing "sleeping" with "stopped" – sleep (S) is waiting for I/O; stopped (T) is suspended by signal.</li>
              <li>Assuming a process in D state can be killed – it cannot; you may need to fix the I/O or reboot.</li>
              <li>Not understanding that "Running" doesn't always mean using CPU – it may be in kernel mode or waiting for CPU due to preemption.</li>
              <li>Misreading ps state letters: "R" can mean runnable (waiting for CPU) as well as actually running.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Use <code>top -p $PID</code> to watch a specific process's state in real time.</li>
              <li>For troubleshooting, look at <code>/proc/$PID/status</code> – shows state and more details.</li>
              <li>When teaching, illustrate states with simple programs: loop (R), sleep (S), read from keyboard (S), zombie (Z).</li>
              <li>Remember that state transitions are driven by kernel – understanding them helps debugging performance issues.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand process states when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-fuchsia-500">☑</span> Can name the five classic states and draw the diagram</div>
            <div className="flex items-center gap-2"><span className="text-fuchsia-500">☑</span> Know the meaning of R, S, D, Z, T in ps output</div>
            <div className="flex items-center gap-2"><span className="text-fuchsia-500">☑</span> Can explain why a process enters waiting state</div>
            <div className="flex items-center gap-2"><span className="text-fuchsia-500">☑</span> Understand the role of the scheduler in state transitions</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Process States and State Transition Diagram" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-fuchsia-50 to-rose-50 dark:from-fuchsia-950/40 dark:to-rose-950/40 p-6 rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.65s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-fuchsia-800 dark:text-fuchsia-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “The state transition diagram is the most visual part of teaching process management. At <strong>Naihati</strong>, I use coloured magnets on a whiteboard: blue for ready, green for running, red for waiting. 
                <strong>Tuhina</strong> visualised it as a board game where the scheduler moves tokens. 
                One effective demo: run <code>while true; do :; done</code> in one terminal and watch it stay R (runnable). 
                Then run <code>{`cat > /dev/null`}</code> and press Ctrl+Z – see it become T (stopped). 
                <strong>Abhronila</strong> found it illuminating to see her own bash shell change state while waiting for commands.
                I always emphasise: a process in R state may be waiting for CPU, not actually executing – that's the 'ready' queue.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Use <code>watch -n 1 "ps -e -o stat,comm | sort | uniq -c"</code> to see state counts update live.</p>
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

export default Topic10;