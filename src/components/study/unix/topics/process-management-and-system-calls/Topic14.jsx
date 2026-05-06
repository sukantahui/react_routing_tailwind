// Topic14.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic14_files/topic14_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import topDemoSh from './topic14_files/top_demo.sh?raw';
import monitorScriptSh from './topic14_files/monitor_script.sh?raw';

const Topic14 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
            Monitoring Processes Using top Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-yellow-500 pl-4">
            The live dashboard of your system – real‑time process monitoring and control.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-yellow-500">🎛️</span> What is the top command?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">top</code> is the standard interactive process viewer on Unix systems. 
                It displays a continuously updating list of processes with their resource usage, sorted by a chosen metric (default: %CPU). 
                It also shows system summary lines: uptime, load average, task counts, CPU states, and memory usage.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>Interactive</strong> – real‑time updates, sort columns, kill processes</li>
                <li><strong>Customisable</strong> – change fields, colors, delay, filter by user</li>
                <li><strong>Batch mode</strong> – for scripting (<code>-b</code> flag)</li>
                <li><strong>Security</strong> – requires no special privileges (though some operations need root)</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`# Basic invocation
top

# Batch mode for logging (single iteration)
top -b -n 1

# Show only specific user's processes
top -u username

# Set delay to 2 seconds
top -d 2`}
                </code>
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-orange-500">🎮</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                In a busy airport control tower in <strong>Barrackpore</strong>, air traffic controllers (<strong>top</strong>) watch a screen showing all flights (processes). 
                Columns display: flight number (PID), fuel (RES), priority (NI), status (S), and position (CPU). 
                Controllers can sort by fuel (memory) or speed (CPU), kill a misbehaving flight (kill), or focus on airlines (filter by user). 
                The summary line shows overall traffic: how many planes are waiting to land (load average), runway utilisation (CPU states), and gate occupation (memory). 
                This live dashboard helps <strong>Tuhina</strong> and <strong>Swadeep</strong> diagnose a congested system.
              </p>
              <div className="mt-4 border-l-4 border-orange-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "top is the command that turns your terminal into a mission control centre."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – top interface illustration */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">🖥️ top Command Interface – Summary & Columns</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on any area to see explanation – animated highlights show interactive keys</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="750" height="400" viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <filter id="shadow-top">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Header – system summary */}
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-top)">
                <rect x="10" y="10" width="730" height="80" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <text x="20" y="30" fill="#94a3b8" fontSize="12" fontFamily="monospace">
                  top - 14:30:12 up 2 days, 1:23, 4 users, load average: 0.08, 0.15, 0.12
                </text>
                <text x="20" y="48" fill="#94a3b8" fontSize="12" fontFamily="monospace">
                  Tasks: 124 total, 2 running, 122 sleeping, 0 stopped, 0 zombie
                </text>
                <text x="20" y="66" fill="#94a3b8" fontSize="12" fontFamily="monospace">
                  %Cpu(s): 3.2 us, 1.1 sy, 0.0 ni, 94.7 id, 0.8 wa, 0.0 hi, 0.2 si, 0.0 st
                </text>
                <text x="20" y="84" fill="#94a3b8" fontSize="12" fontFamily="monospace">
                  MiB Mem :   7856.0 total,   2420.0 free,   2145.0 used,   3291.0 buff/cache
                </text>
                <title>System summary: uptime, load, tasks, CPU, memory</title>
              </g>
              
              {/* Column headers */}
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-top)">
                <rect x="10" y="95" width="730" height="25" rx="0" fill="#0f172a" />
                <text x="30" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">PID</text>
                <text x="80" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">USER</text>
                <text x="140" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">PR</text>
                <text x="175" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">NI</text>
                <text x="205" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">VIRT</text>
                <text x="260" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">RES</text>
                <text x="315" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">SHR</text>
                <text x="360" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">S</text>
                <text x="385" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">%CPU</text>
                <text x="435" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">%MEM</text>
                <text x="490" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">TIME+</text>
                <text x="560" y="112" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">COMMAND</text>
                <title>Process columns: press f to select fields, F to sort by column</title>
              </g>
              
              {/* Sample process rows */}
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-top)">
                <rect x="10" y="120" width="730" height="18" fill="#1e293b" />
                <text x="30" y="133" fill="#cbd5e1" fontSize="10" fontFamily="monospace">1    root      20   0   250688 115456 30212 S   0.7   1.4 12:34.56 systemd</text>
              </g>
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-top)">
                <rect x="10" y="138" width="730" height="18" fill="#0f172a" />
                <text x="30" y="151" fill="#cbd5e1" fontSize="10" fontFamily="monospace">1234 swadeep   20   0  345678  45678 12345 S   2.3   0.6  5:12.34 bash</text>
              </g>
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-top)">
                <rect x="10" y="156" width="730" height="18" fill="#1e293b" />
                <text x="30" y="169" fill="#cbd5e1" fontSize="10" fontFamily="monospace">5678 tuhina    20   0  987654 123456 34567 R  15.2   1.9 20:00.01 firefox</text>
                <title>Process rows: dynamic, sortable, colour-coded by state (R=red, S=blue, etc.)</title>
              </g>
              
              {/* Interactive keys legend */}
              <g transform="translate(375, 210)">
                <rect x="-320" y="-15" width="640" height="40" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="-300" y="8" fill="#facc15" fontSize="12" fontFamily="monospace">Interactive Keys:</text>
                <text x="-150" y="8" fill="#94a3b8" fontSize="11" fontFamily="monospace">M → sort by MEM | P → sort by CPU | T → sort by TIME | k → kill | r → renice</text>
                <text x="-150" y="22" fill="#94a3b8" fontSize="11" fontFamily="monospace">u → filter user | f → choose fields | W → write config | q → quit</text>
              </g>
              
              {/* Animated highlight on a key */}
              <rect x="165" y="198" width="15" height="15" fill="none" stroke="#facc15" strokeWidth="2">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
              </rect>
              <rect x="435" y="198" width="15" height="15" fill="none" stroke="#facc15" strokeWidth="2">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              
              <text x="375" y="280" textAnchor="middle" fill="#6b7280" fontSize="12">top is interactive – press 'h' for help while running</text>
            </svg>
          </div>
        </div>

        {/* Column explanations */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-5 rounded-2xl border-l-8 border-yellow-500">
            <h3 className="font-bold">📊 Important Columns to Watch</h3>
            <ul className="text-sm list-disc pl-4 mt-2 space-y-1">
              <li><strong>PID</strong> – Process ID</li>
              <li><strong>%CPU</strong> – CPU usage since last update (not cumulative)</li>
              <li><strong>%MEM</strong> – Resident memory usage share</li>
              <li><strong>RES</strong> – Physical memory used (KB)</li>
              <li><strong>S</strong> – State (R=running, S=sleeping, Z=zombie, T=stopped)</li>
              <li><strong>COMMAND</strong> – Process name (truncated)</li>
            </ul>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 p-5 rounded-2xl border-l-8 border-orange-500">
            <h3 className="font-bold">⌨️ Essential Interactive Keys</h3>
            <ul className="text-sm list-disc pl-4 mt-2 space-y-1">
              <li><kbd>P</kbd> – Sort by CPU (default)</li>
              <li><kbd>M</kbd> – Sort by Memory</li>
              <li><kbd>T</kbd> – Sort by Time (cumulative CPU)</li>
              <li><kbd>k</kbd> – Kill a process (prompts for PID and signal)</li>
              <li><kbd>r</kbd> – Renice a process (change priority)</li>
              <li><kbd>u</kbd> – Show only one user's processes</li>
              <li><kbd>f</kbd> – Choose displayed fields</li>
            </ul>
          </div>
        </div>

        {/* Example demonstrating batch mode and customization */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 Batch Mode for Scripting</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`# Single iteration (snapshot)
top -b -n 1 | head -20

# Log every 10 seconds for 1 hour
while true; do
    echo "=== $(date) ===" >> /var/log/top.log
    top -b -n 1 -w 512 >> /var/log/top.log
    sleep 10
done

# Non‑interactive with custom fields (batch mode)
top -b -n 1 -o %MEM -p 1234

# Use with watch (not needed, top already refreshes, but example)
watch -n 2 top -b -n 1 | grep "Cpu(s)"`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Batch mode is useful for logging, monitoring scripts, and when you cannot run interactively.</p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={topDemoSh}
            title="top basics and interactive commands demo"
            highlightLines={[5, 10, 15]}
          />
          <ShellFileLoader
            fileModule={monitorScriptSh}
            title="Monitor a specific process with top in batch mode"
            highlightLines={[4, 9, 14]}
          />
          <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-yellow-600">🔍</span> Quick tips for top:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Show help inside top (press 'h' or '?')
# Change update delay: press 's' then enter new seconds
# Filter by user: press 'u' then type username
# Save configuration: press W (writes to ~/.toprc)
# Highlight running processes: press 'R' (reverse sort) then 'P'
# View command line arguments: press 'c' to toggle`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Use <code>top -p PID1,PID2</code> to monitor specific processes.</li>
              <li>Press <kbd>e</kbd> to toggle between KiB, MiB, GiB for memory units.</li>
              <li>Press <kbd>V</kbd> to enter tree view (forest view) – shows parent‑child relationships.</li>
              <li>Press <kbd>W</kbd> to save your current settings (fields, sort order) to <code>~/.toprc</code>.</li>
              <li>For CPU percentage accuracy over longer intervals, increase delay (<code>-d 5</code>).</li>
              <li>Use <code>htop</code> for an even richer interface (colours, mouse, easier killing).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Run <code>top</code> and sort by CPU (<kbd>P</kbd>). Now run a CPU‑intensive task like <code>yes > /dev/null &amp;</code>. Watch how the process jumps to the top. Then kill it using top: press <kbd>k</kbd>, enter the PID, then signal 15 (SIGTERM) or 9 (SIGKILL).</p>
            <p className="mt-1 text-xs">Also: press <kbd>u</kbd> and enter your username to see only your processes – then press <kbd>V</kbd> for tree view. How does process hierarchy become clear?</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Misinterpreting %CPU as CPU usage over process lifetime – it's since last screen update.</li>
              <li>Forgetting that %CPU can exceed 100% on multi‑core systems (sum of cores).</li>
              <li>Killing the wrong process because of out‑of‑date screen (always verify PID before sending signal).</li>
              <li>Not realising that top uses a delay – changes may not be instantaneous.</li>
              <li>Leaving top running in a terminal (especially over SSH) – it consumes CPU for updates.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Always verify PID before killing – use <kbd>k</kbd> and read the highlighted line.</li>
              <li>To investigate a suspicious process, press <kbd>l</kbd>, <kbd>t</kbd>, <kbd>m</kbd> to toggle load/memory/cpu graphs (if available).</li>
              <li>Save a custom configuration with <kbd>W</kbd> after setting your preferred fields.</li>
              <li>For non‑interactive monitoring, use <code>top -b -n 1</code> and parse or log.</li>
              <li>For a more user‑friendly experience, install <code>htop</code>.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand top when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-yellow-500">☑</span> Can launch top and interpret the summary lines</div>
            <div className="flex items-center gap-2"><span className="text-yellow-500">☑</span> Know how to sort by CPU, memory, and time</div>
            <div className="flex items-center gap-2"><span className="text-yellow-500">☑</span> Can kill a process from inside top using 'k'</div>
            <div className="flex items-center gap-2"><span className="text-yellow-500">☑</span> Understand the meaning of %CPU, %MEM, RES, SHR</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Monitoring Processes Using top Command" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/40 dark:to-orange-950/40 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “I recall a lab session at <strong>Shyamnagar</strong> where <strong>Debangshu</strong> accidentally started a fork bomb. 
                The system slowed to a crawl, but we still had an open terminal. I typed <code>top</code>, and we saw hundreds of 'yes' processes. 
                We pressed <kbd>k</kbd> and killed the parent – problem solved. 
                That moment cemented top's importance for my students. 
                I always teach the essential keys: <kbd>P</kbd>, <kbd>M</kbd>, <kbd>k</kbd>, and <kbd>u</kbd>. 
                Also, I show them <code>htop</code> as an alternative: ‘top is your scalpel, htop is your swiss army knife – learn both.’”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Run <code>top -d 5</code> if you need less CPU overhead on a busy server.</p>
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

export default Topic14;