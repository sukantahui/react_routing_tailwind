// Topic13.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic13_files/topic13_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import vmstatDemoSh from './topic13_files/vmstat_demo.sh?raw';
import pressureTestSh from './topic13_files/pressure_test.sh?raw';

const Topic13 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
            Monitoring System Performance Using vmstat
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-green-500 pl-4">
            The swiss army knife of Unix performance – real‑time system statistics at a glance.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-green-500">📊</span> What is vmstat?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">vmstat</code> (virtual memory statistics) reports information about <strong>processes, memory, paging, block I/O, traps, interrupts, and CPU activity</strong>. 
                It is the first tool professionals reach for when investigating system slowness.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>Procs</strong>: r (runnable processes), b (blocked processes)</li>
                <li><strong>Memory</strong>: swpd, free, buff, cache</li>
                <li><strong>Swap</strong>: si (swap in), so (swap out) – per second</li>
                <li><strong>I/O</strong>: bi (blocks in), bo (blocks out)</li>
                <li><strong>System</strong>: in (interrupts), cs (context switches)</li>
                <li><strong>CPU</strong>: us, sy, id, wa, st</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`# Basic usage - snapshot
vmstat
# Continuous reporting every 1 second, 5 times
vmstat 1 5
# With disk stats (-d) and slab info (-s)`}
                </code>
                <p className="text-xs mt-1">Prototype: <code>vmstat [options] [delay [count]]</code></p>
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-teal-500">🏥</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                At a hospital in <strong>Shyamnagar</strong>, the triage nurse (<strong>vmstat</strong>) constantly monitors:
                <ul className="list-disc pl-6 mt-2">
                  <li><strong>r (patients waiting)</strong> – how many are in the waiting room (run queue).</li>
                  <li><strong>b (blocked)</strong> – patients waiting for test results (blocked on I/O).</li>
                  <li><strong>si/so (swap)</strong> – how often patients are moved to/from overflow rooms (swap).</li>
                  <li><strong>us/sy (CPU)</strong> – time doctors spend treating patients (user) vs paperwork (system).</li>
                  <li><strong>wa (wait)</strong> – doctors waiting for equipment (I/O wait).</li>
                </ul>
                If <strong>Swadeep</strong> sees high <code>wa</code> and <code>b</code>, the storage system is slow. High <code>r</code> with near‑100% <code>us</code> means a CPU‑bound process.
              </p>
              <div className="mt-4 border-l-4 border-teal-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "vmstat gives you a dashboard of system health – learn it, live it, love it."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – vmstat column explanation */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">📈 Understanding vmstat Output Columns</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on any column to see its meaning – real‑time example below</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="750" height="340" viewBox="0 0 750 340" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <filter id="shadow-vmstat">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Title row */}
              <g transform="translate(375, 20)">
                <text x="0" y="0" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----</text>
              </g>
              
              {/* Column groups */}
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-vmstat)">
                <rect x="40" y="45" width="70" height="40" rx="5" fill="#3b82f6" />
                <text x="75" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">r  b</text>
                <title>r: processes in run queue (ready) / b: processes blocked on I/O</title>
              </g>
              
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-vmstat)">
                <rect x="120" y="45" width="160" height="40" rx="5" fill="#10b981" />
                <text x="200" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">swpd   free   buff   cache</text>
                <title>swpd: swapped memory (KB), free: free RAM, buff: buffer cache, cache: page cache</title>
              </g>
              
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-vmstat)">
                <rect x="290" y="45" width="70" height="40" rx="5" fill="#f59e0b" />
                <text x="325" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">si   so</text>
                <title>si: swap in (KB/s), so: swap out (KB/s) – non‑zero indicates swapping activity</title>
              </g>
              
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-vmstat)">
                <rect x="370" y="45" width="70" height="40" rx="5" fill="#ef4444" />
                <text x="405" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">bi   bo</text>
                <title>bi: blocks in from disk (KB/s), bo: blocks out to disk</title>
              </g>
              
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-vmstat)">
                <rect x="450" y="45" width="80" height="40" rx="5" fill="#8b5cf6" />
                <text x="490" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">in    cs</text>
                <title>in: interrupts per second, cs: context switches per second</title>
              </g>
              
              <g className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-vmstat)">
                <rect x="540" y="45" width="150" height="40" rx="5" fill="#ec489a" />
                <text x="615" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">us  sy  id  wa  st</text>
                <title>us: user CPU%, sy: system CPU%, id: idle, wa: I/O wait, st: stolen (virtual machines)</title>
              </g>
              
              {/* Sample data row */}
              <g transform="translate(375, 120)">
                <text x="0" y="0" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
                  5  0   4096   102400   50000   30000    0   0   100   200   300   400   30   10   50   5   0
                </text>
              </g>
              
              {/* Animated highlights */}
              <g>
                <rect x="40" y="100" width="70" height="25" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </rect>
                <rect x="290" y="100" width="70" height="25" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </rect>
                <rect x="540" y="100" width="150" height="25" fill="none" stroke="#ec489a" strokeWidth="2">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
                </rect>
              </g>
              
              <text x="375" y="200" textAnchor="middle" fill="#6b7280" fontSize="12">Example: vmstat 2  – updates every 2 seconds</text>
            </svg>
          </div>
        </div>

        {/* Key metrics interpretation */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-2xl border-l-8 border-green-500">
            <h3 className="font-bold">📋 When to Worry? – Red Flags</h3>
            <ul className="text-sm list-disc pl-4 mt-2 space-y-1">
              <li><strong>r</strong> &gt number of CPU cores (sustained) – overloaded</li>
              <li><strong>si/so</strong> non‑zero (especially &gt 0) – swap thrashing</li>
              <li><strong>wa</strong> &gt 10% – disk I/O bottleneck</li>
              <li><strong>sy</strong> &gt 40% – high kernel activity (driver, interrupts)</li>
              <li><strong>cs</strong> very high – many context switches (may indicate lock contention)</li>
            </ul>
          </div>
          <div className="bg-teal-100 dark:bg-teal-900/30 p-5 rounded-2xl border-l-8 border-teal-500">
            <h3 className="font-bold">📈 Normal Ranges (Desktop/Server)</h3>
            <ul className="text-sm list-disc pl-4 mt-2 space-y-1">
              <li><strong>r</strong> ≤ 2 × CPU cores</li>
              <li><strong>us+sy</strong> &lt 80% (some idle time)</li>
              <li><strong>id</strong> &gt 20% (except when fully loaded)</li>
              <li><strong>si/so</strong> = 0 (ideally)</li>
              <li><strong>cs</strong> ~ 2000‑10000 on modern systems</li>
            </ul>
          </div>
        </div>

        {/* Detailed command examples */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 vmstat Options and Examples</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`# Snapshot (since boot)
vmstat

# Every 2 seconds, 10 times
vmstat 2 10

# Show disk statistics (Linux)
vmstat -d

# Show slab cache info
vmstat -s

# Show summary of events and statistics
vmstat -s

# With timestamps
vmstat -t 1 5

# Wide output (no column truncation)
vmstat -w 2`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Combine with <code>watch</code> for colourful monitoring: <code>watch -n 1 vmstat</code></p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={vmstatDemoSh}
            title="vmstat – interactive monitoring and interpretation"
            highlightLines={[5, 11, 18]}
          />
          <ShellFileLoader
            fileModule={pressureTestSh}
            title="Simulate system load and observe vmstat changes"
            highlightLines={[8, 14, 22]}
          />
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-green-600">🔍</span> Quick analysis patterns:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Find if system is CPU or I/O bound
vmstat 2 10
# Then if us+sy near 100% and wa low → CPU bound
# If wa high and b > 0 → I/O bound

# Watch swap activity only
vmstat 1 | awk '{print $3, $4}'  # si, so columns

# Record stats for later analysis
vmstat 5 100 > /tmp/vmstat.log`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>First line of <code>vmstat</code> is averages since boot; second line onward is per‑interval.</li>
              <li>Use <code>vmstat -w</code> for wide output (better readability).</li>
              <li>High <code>cs</code> with low CPU usage often indicates a process doing many system calls (e.g., <code>select</code>).</li>
              <li>If <code>si/so</code> &gt 0 persistently, add more RAM or reduce memory usage.</li>
              <li>Use <code>vmstat -d</code> to see per‑disk stats, cross‑reference with <code>iostat</code>.</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Run <code>stress --cpu 4 --timeout 30</code> and simultaneously <code>vmstat 1</code>. Watch the <code>r</code> column and <code>us</code> CPU. Then run <code>stress --io 4</code> – observe <code>sy</code> and <code>cs</code> increase. What does <code>wa</code> do?</p>
            <p className="mt-1 text-xs">Also: simulate disk I/O with <code>dd if=/dev/zero of=test bs=1M count=1000 &amp;</code> and watch <code>bi/bo</code> and <code>wa</code>.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Misreading the first line as current stats – it's the average since boot.</li>
              <li>Confusing <code>bi/bo</code> (blocks) with KB – older systems use 1 block = 1024 bytes, but modern Linux shows KB.</li>
              <li>Interpreting <code>si/so</code> as swap usage – it's per‑second rate, not total.</li>
              <li>Not checking <code>vmstat</code> on the node where the problem occurs (use remote monitoring).</li>
              <li>Forgetting that virtual machines have <code>st</code> (stolen time) – high <code>st</code> means hypervisor overload.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>When troubleshooting, always take at least three samples (<code>vmstat 2 5</code>).</li>
              <li>Record baseline vmstat outputs for your system when it's healthy.</li>
              <li>Combine with <code>ps</code> and <code>iostat</code> to pinpoint the offending process.</li>
              <li>Use <code>vmstat -s</code> to check for memory shortage and slab fragmentation.</li>
              <li>In scripts, use <code>vmstat --no-first</code> (if supported) to skip the summary line.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand vmstat when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-green-500">☑</span> Can explain what r, b, si, so, cs, wa, us, sy mean</div>
            <div className="flex items-center gap-2"><span className="text-green-500">☑</span> Know how to run vmstat in continuous mode</div>
            <div className="flex items-center gap-2"><span className="text-green-500">☑</span> Can identify CPU vs I/O bound systems</div>
            <div className="flex items-center gap-2"><span className="text-green-500">☑</span> Understand the difference between first line and subsequent lines</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Monitoring System Performance Using vmstat" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/40 dark:to-teal-950/40 p-6 rounded-2xl border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “I always start my performance class at <strong>Naihati</strong> with a live <code>vmstat 1</code> while running a simple loop. 
                <strong>Swadeep</strong> and <strong>Tuhina</strong> immediately see the <code>r</code> column jump to 1 and <code>us</code> to 100%. 
                Then I run <code>dd if=/dev/zero of=/dev/null &amp;</code> – still CPU. Then <code>dd if=/dev/zero of=test bs=1M count=1000</code> – they watch <code>wa</code> climb. 
                That visual feedback convinces them more than any textbook. 
                I tell students: ‘vmstat is your detective’s magnifying glass – learn to read the clues.’”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Run <code>vmstat -n 2 | while read line; do date; echo "$line"; done</code> to timestamp output.</p>
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

export default Topic13;