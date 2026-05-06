// Topic2.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import initCheckSh from './topic2_files/init_check.sh?raw';
import pstreeDemoSh from './topic2_files/pstree_demo.sh?raw';

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Understanding init Process
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-purple-500 pl-4">
            PID 1 – the first userspace process, ancestor of all processes, and the ultimate orphanage caretaker.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-purple-500">👑</span> What is the init Process?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <strong className="text-purple-600 dark:text-purple-400">init</strong> is the first user‑space process started by the kernel after booting. It always has <strong>PID 1</strong>. 
                Its responsibilities include:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li>Booting the entire user‑space (starting daemons, login managers, etc.)</li>
                <li>Adopting <strong>orphan processes</strong> (when a parent dies before its child)</li>
                <li>Reaping zombie processes (calling <code>wait()</code> on its adopted children)</li>
                <li>Managing system runlevels (traditional SysV init) or targets (systemd)</li>
                <li>Handling <strong>Ctrl+Alt+Del</strong> and shutdown signals</li>
              </ul>
              <p className="mt-4 text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border">
                💡 <span className="font-mono">ps -p 1</span> shows init – on modern Linux it’s usually <code>systemd</code>.
              </p>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-pink-500">🏡</span> Real‑world Analogy – The Great Orphanage</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                Imagine a school in <strong>Naihati</strong> where <strong>Swadeep</strong> and <strong>Abhronila</strong> are students (normal processes). Their class teacher (parent process) sometimes leaves early (terminates). 
                The <strong>Principal (init)</strong> automatically becomes the guardian of any student whose teacher leaves. The principal ensures they are cared for and their records are cleaned up when they graduate (terminate). 
                No student is ever without a parent – that’s the role of init.
              </p>
              <div className="mt-4 border-l-4 border-pink-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "init is the ultimate parent – kill it, and the system panics."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Process Tree showing init at root */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">🌲 Process Tree – All Roads Lead to init</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on any node to see its role. The tree grows from PID 1.</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="500" height="400" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                  <polygon points="0 0, 6 2, 0 4" fill="#4b5563"/>
                </marker>
              </defs>
              {/*init root */}
              <g className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg" transform="translate(250,20)">
                <circle r="30" fill="#8b5cf6" className="hover:fill-purple-500 transition">
                  <animate attributeName="r" values="30;33;30" dur="3s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">init</text>
                <text x="0" y="20" textAnchor="middle" fill="white" fontSize="10">PID 1</text>
                <title>Root of all processes</title>
              </g>

              {/* Children lines */}
              <line x1="250" y1="50" x2="100" y2="110" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)"/>
              <line x1="250" y1="50" x2="250" y2="110" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)"/>
              <line x1="250" y1="50" x2="400" y2="110" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)"/>

              {/* systemd-journald*/}
              <g className="cursor-pointer hover:drop-shadow transition" transform="translate(100,140)">
                <rect x="-40" y="-15" width="80" height="30" rx="6" fill="#3b82f6" className="hover:fill-blue-400 transition">
                  <animate attributeName="width" values="80;84;80" dur="4s" repeatCount="indefinite"/>
                </rect>
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="11">journald</text>
                <title>Logging daemon</title>
              </g>

              {/* <!-- login shell --> */}
              <g className="cursor-pointer hover:drop-shadow transition" transform="translate(250,140)">
                <rect x="-50" y="-15" width="100" height="30" rx="6" fill="#10b981" className="hover:fill-emerald-400 transition"/>
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="11">getty / login</text>
                <title>Spawn user login sessions</title>
              </g>

              {/* <!-- sshd --> */}
              <g className="cursor-pointer hover:drop-shadow transition" transform="translate(400,140)">
                <rect x="-35" y="-15" width="70" height="30" rx="6" fill="#ef4444" className="hover:fill-red-400 transition"/>
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="11">sshd</text>
                <title>Secure shell daemon</title>
              </g>

              {/* <!-- from login to bash (grandchild) --> */}
              <line x1="250" y1="155" x2="250" y2="210" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)"/>
              <g transform="translate(250,240)">
                <rect x="-35" y="-15" width="70" height="30" rx="6" fill="#f59e0b" className="hover:fill-amber-400 transition"/>
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="11">bash</text>
                <title>User shell (child of login)</title>
              </g>

              {/* <!-- from bash to child processes --> */}
              <line x1="250" y1="255" x2="180" y2="300" stroke="#4b5563" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="3"/>
              <line x1="250" y1="255" x2="320" y2="300" stroke="#4b5563" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="3"/>
              <g transform="translate(180,320)">
                <circle r="15" fill="#6b7280"/>
                <text x="0" y="4" textAnchor="middle" fill="white" fontSize="9">ls</text>
              </g>
              <g transform="translate(320,320)">
                <circle r="15" fill="#6b7280"/>
                <text x="0" y="4" textAnchor="middle" fill="white" fontSize="9">ps</text>
              </g>

              <text x="250" y="380" textAnchor="middle" fill="#6b7280" fontSize="12">Every process has init as ultimate ancestor</text>
            </svg>
          </div>
        </div>

        {/* Evolution of init systems */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <h3 className="text-2xl font-semibold text-center mb-4">📜 Evolution of init (Historical & Modern)</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="border-l-4 border-amber-500 pl-3">
              <span className="font-bold">SysV init (1980s–2000s)</span>
              <p>Sequential startup scripts (<code>/etc/inittab</code>, runlevels). Slow but simple.</p>
            </div>
            <div className="border-l-4 border-sky-500 pl-3">
              <span className="font-bold">Upstart (2006–2014)</span>
              <p>Event‑based, parallel startup. Used in Ubuntu 6.10–14.04.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <span className="font-bold">systemd (2010–present)</span>
              <p>Parallel, socket‑activated, dependency‑based. Most Linux distros now use it.</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            💡 Check your init: <code>ls -l /sbin/init</code> or <code>systemd --version</code>
          </p>
        </div>

        {/* System Call / Concepts */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-5 rounded-2xl border-l-8 border-purple-500">
            <h4 className="font-mono font-bold">Orphan Adoption (Kernel mechanism)</h4>
            <p className="text-sm mt-1">When a parent dies, the kernel <strong>reparents</strong> all its children to PID 1 (init).</p>
            <p className="font-semibold mt-2">Prototype (internal):</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded">
              {`do_exit() → forget_original_parent() → find_new_reaper() → init`}
            </code>
            <p className="mt-2 text-xs italic">Why? So no process is ever parentless – init will eventually wait() for it.</p>
          </div>
          <div className="bg-pink-100 dark:bg-pink-900/30 p-5 rounded-2xl border-l-8 border-pink-500">
            <h4 className="font-mono font-bold">getppid() – Who is my parent?</h4>
            <p><span className="font-semibold">Prototype:</span> <code>pid_t getppid(void);</code></p>
            <p>Returns the PID of the parent process. For an orphan, returns 1 (init).</p>
            <p className="text-xs mt-2">Useful for checking if your process has been reparented.</p>
          </div>
        </div>

        {/* Shell Examples */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Shell Demos – init in Action</h3>
          <ShellFileLoader
            fileModule={initCheckSh}
            title="Check init type and PID 1"
            highlightLines={[3, 5, 8]}
          />
          <ShellFileLoader
            fileModule={pstreeDemoSh}
            title="Visualize process tree with pstree"
            highlightLines={[4]}
          />
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-blue-600">🔍</span> Try in terminal:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# See init's children
pstree -p 1
# Orphan a process intentionally
( sleep 1000 & )   # subshell dies, sleep becomes child of init`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Use <code>prctl(PR_SET_CHILD_SUBREAPER, 1)</code> to make your process a "sub‑init" (adopts its descendant orphans).</li>
              <li>In Docker containers, PID 1 is often your entrypoint – it <strong>must</strong> reap zombies properly.</li>
              <li>Debug init issues with <code>systemd-analyze blame</code> (systemd) or <code>bootlogd</code> (SysV).</li>
              <li>Never send SIGKILL to PID 1 – kernel ignores it. Try <code>sudo shutdown -h now</code> instead.</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Write a small C program that forks a child, then the parent exits immediately. Use <code>ps -o pid,ppid,comm</code> to see who adopts the child. What changes if you call <code>prctl(PR_SET_CHILD_SUBREAPER, 1)</code> before forking?</p>
            <p className="mt-1 text-xs">Also try: <code>kill -STOP 1</code> (allowed) vs <code>kill -KILL 1</code> (ignored).</p>
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Assuming PID 1 is always <code>systemd</code> – embedded systems may use BusyBox init.</li>
              <li>Writing a long‑running container entrypoint that doesn't wait for children → zombies.</li>
              <li>Forgetting that daemons should double‑fork to avoid becoming attached to a terminal – this makes init the parent.</li>
              <li>Trying to <code>kill -9 1</code> – won't work, but may confuse.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>When writing a daemon, double‑fork + setsid() ensures init becomes the parent.</li>
              <li>In container environments, use a minimal init wrapper (e.g., <code>tini</code> or <code>dumb-init</code>) to reap zombies.</li>
              <li>Always check the parent PID after forking – handle reparenting gracefully.</li>
              <li>Use <code>systemctl status</code> to inspect systemd services – they are children of PID 1.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand init when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-purple-500">☑</span> Can explain why init never dies (kernel protection)</div>
            <div className="flex items-center gap-2"><span className="text-purple-500">☑</span> Know what happens to orphans</div>
            <div className="flex items-center gap-2"><span className="text-purple-500">☑</span> Can identify init type on a Linux system</div>
            <div className="flex items-center gap-2"><span className="text-purple-500">☑</span> Understand the importance of reaping zombies in containers</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Understanding init Process" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 p-6 rounded-2xl border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “At <strong>Barrackpore</strong> and <strong>Shyamnagar</strong>, students often ask: ‘Why can’t we kill init?’. I tell them: init is like the <strong>foundation of a building</strong> – remove it, everything collapses. 
                <strong>Debangshu</strong> once wrote a script that accidentally killed PID 1 (using a buggy signal). The system panicked. That’s when they truly understood init’s critical role.
                <br/><br/>
                A memorable exercise: Build a minimal container with a custom init that only prints ‘adopted’ and then calls <code>wait()</code> in a loop. It teaches orphan reaping perfectly.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: <code>docker run --init</code> uses <code>/sbin/docker-init</code> (tini) as PID 1 – inspect with <code>docker exec</code>.</p>
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

export default Topic2;