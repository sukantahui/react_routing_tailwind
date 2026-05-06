// Topic12.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic12_files/topic12_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import swapInfoSh from './topic12_files/swap_info.sh?raw';
import swapMonitorSh from './topic12_files/swap_monitor.sh?raw';
import mlockDemoC from './topic12_files/mlock_demo.c?raw';

const Topic12 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-600 to-gray-600 dark:from-slate-400 dark:to-gray-400 bg-clip-text text-transparent">
            Concept of Swapped Memory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-slate-500 pl-4">
            When RAM fills up – how Unix uses disk space as an extension of physical memory.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-slate-500">💾</span> What is Swapped Memory?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <strong className="text-slate-600 dark:text-slate-400">Swapping</strong> is the mechanism by which a process's memory pages are moved from <strong>RAM</strong> to a <strong>swap space</strong> (disk partition or file) and back. 
                This allows the system to run more processes than physical memory can hold, effectively extending virtual memory.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>Swap space</strong> – dedicated disk area (partition or file) for swapped pages</li>
                <li><strong>Paging</strong> – moving individual pages (usually 4KB) between RAM and swap</li>
                <li><strong>Swappiness</strong> – kernel parameter (0–200) that biases swapping aggressiveness</li>
                <li><strong>Thrashing</strong> – excessive swapping that degrades performance</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm">
                <code className="block whitespace-pre">
                  {`# Check swap usage
$ free -h
              total   used   free   shared   buff/cache   available
Mem:           7.7G   2.1G   4.1G   123M       1.5G        5.1G
Swap:          2.0G   128M   1.9G

$ cat /proc/swaps
Filename                Type        Size    Used    Priority
/dev/sda2               partition   2097148 131072  -2`}
                </code>
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-gray-500">🏛️</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                In a library at <strong>Barrackpore</strong>, the reading room has limited shelf space (<strong>RAM</strong>). 
                When many students (<strong>processes</strong>) need books, some books that are not currently being read are moved to the basement stacks (<strong>swap space</strong>). 
                When a student asks for a book that's in the basement, a librarian retrieves it (<strong>swap in</strong>) – this takes time. 
                If students keep requesting books that ping‑pong between the reading room and the basement (<strong>thrashing</strong>), nobody gets reasonable service.
              </p>
              <div className="mt-4 border-l-4 border-gray-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "Swap is like a backup parking lot – convenient when the main lot is full, but walking (disk I/O) is slow."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Memory ↔ Swap Interaction */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">🔄 Swapping Pages Between RAM and Disk</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on components – animated page movement shows swapping</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="700" height="300" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="swap-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
                </marker>
                <filter id="shadow-swap">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* RAM */}
              <g transform="translate(140, 100)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-swap)">
                <rect x="-60" y="-50" width="120" height="100" rx="10" fill="#3b82f6" className="hover:fill-blue-500 transition">
                  <animate attributeName="width" values="120;126;120" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-25" textAnchor="middle" fill="white" fontWeight="bold">RAM</text>
                <text x="0" y="-8" textAnchor="middle" fill="white" fontSize="10">(Physical Memory)</text>
                <text x="0" y="12" textAnchor="middle" fill="white" fontSize="9">Page 1</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="9">Page 2</text>
                <text x="0" y="36" textAnchor="middle" fill="white" fontSize="9">Page 3</text>
                <title>Physical RAM – fast, limited capacity</title>
              </g>
              
              {/* Swap Space */}
              <g transform="translate(500, 100)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-swap)">
                <rect x="-60" y="-50" width="120" height="100" rx="10" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-25" textAnchor="middle" fill="white" fontWeight="bold">Swap Space</text>
                <text x="0" y="-8" textAnchor="middle" fill="white" fontSize="10">(Disk / SSD)</text>
                <text x="0" y="12" textAnchor="middle" fill="white" fontSize="9">Page A (swapped out)</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="9">Page B (swapped out)</text>
                <text x="0" y="36" textAnchor="middle" fill="white" fontSize="9">Page C (swapped out)</text>
                <title>Swap space – slower, larger capacity</title>
              </g>
              
              {/* Arrow RAM → Swap (swap out) */}
              <line x1="200" y1="80" x2="440" y2="80" stroke="#64748b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#swap-arrow)"/>
              <text x="320" y="65" fill="#64748b" fontSize="11">swap out (page eviction)</text>
              
              {/* Arrow Swap → RAM (swap in) */}
              <line x1="440" y1="160" x2="200" y2="160" stroke="#64748b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#swap-arrow)"/>
              <text x="320" y="180" fill="#64748b" fontSize="11">swap in (page fault)</text>
              
              {/* Animated page moving from RAM to Swap */}
              <g>
                <circle cx="170" cy="100" r="8" fill="#ef4444">
                  <animate attributeName="cx" values="170;350;480" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>
              
              {/* Animated page moving from Swap to RAM */}
              <g>
                <circle cx="480" cy="140" r="8" fill="#10b981">
                  <animate attributeName="cx" values="480;350;170" dur="3s" begin="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
                </circle>
              </g>
              
              <text x="350" y="250" textAnchor="middle" fill="#6b7280" fontSize="12">Pages moved between RAM and swap by the kernel's page daemon (kswapd)</text>
            </svg>
          </div>
        </div>

        {/* Key swap concepts */}
        <div className="grid md:grid-cols-3 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-slate-100 dark:bg-slate-900/30 p-5 rounded-xl border-l-4 border-slate-500">
            <h3 className="font-bold">🧠 Swappiness</h3>
            <p className="text-sm mt-1">Kernel parameter (0–200) controlling swap aggressiveness. Lower means prefer to drop caches, higher means swap out more aggressively. Default 60.</p>
            <code className="text-xs block mt-2">sysctl vm.swappiness</code>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-5 rounded-xl border-l-4 border-gray-500">
            <h3 className="font-bold">💿 Swap File vs Partition</h3>
            <p className="text-sm mt-1">Swap file – flexible, can be resized. Swap partition – slightly better performance (no filesystem overhead). Both work similarly.</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-5 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold">⚠️ Thrashing</h3>
            <p className="text-sm mt-1">Heavy swapping causing high I/O and low CPU utilisation. Fix by adding more RAM or reducing memory usage.</p>
          </div>
        </div>

        {/* System commands and C demo with mlock */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 Preventing Swapping: mlock()</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`#include <sys/mman.h>
int mlock(const void *addr, size_t len);   // lock pages in RAM
int munlock(const void *addr, size_t len); // unlock

// Example: prevent a critical memory region from being swapped
char *buffer = malloc(1024 * 1024);
if (mlock(buffer, 1024 * 1024) == 0) {
    printf("Memory locked, will not be swapped out\\n");
} else {
    perror("mlock (needs CAP_IPC_LOCK or root)");
}

// Real-time applications often lock memory to avoid latency spikes`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Compile with <code>gcc -o mlock_demo mlock_demo.c</code> (run as root or set ulimit -l unlimited)</p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={swapInfoSh}
            title="Check swap usage, priority, and swappiness"
            highlightLines={[3, 9, 15]}
          />
          <ShellFileLoader
            fileModule={swapMonitorSh}
            title="Monitor swap activity with vmstat and sar"
            highlightLines={[5, 11, 16]}
          />
          <ShellFileLoader
            fileModule={mlockDemoC}
            title="mlock_demo.c – lock memory pages to prevent swapping"
            highlightLines={[6, 12, 18]}
          />
          <div className="bg-slate-50 dark:bg-slate-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-slate-600">🔍</span> Quick swap inspection commands:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# Show swap usage per process (swap used)
for file in /proc/*/status; do grep -E "^(Pid|VmSwap)" "$file" 2>/dev/null; done | paste - - | sort -k3 -n -r | head -10
# Turn swap off/on (requires root)
sudo swapoff -a && sudo swapon -a
# Adjust swappiness temporarily
sudo sysctl vm.swappiness=10`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>For SSDs, swap works well; for HDDs, minimise swap usage to avoid performance hits.</li>
              <li>Use <code>zswap</code> or <code>zram</code> to compress swapped pages on modern systems.</li>
              <li>Critical services (database, real‑time) should use <code>mlock()</code> to lock memory.</li>
              <li>Monitor <code>si</code> (swap in) and <code>so</code> (swap out) in <code>vmstat 1</code> – non‑zero values indicate swap activity.</li>
              <li>Avoid swap on a partition that also holds the root filesystem (separate partition recommended).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Allocate a large memory region (e.g., using <code>stress --vm 1 --vm-bytes 2G</code>) and watch swap usage with <code>free -h -s 1</code>. What happens when RAM is exhausted? Why does the system slow down?</p>
            <p className="mt-1 text-xs">Also: try <code>echo 100 &gt; /proc/sys/vm/swappiness</code> and observe more aggressive swapping.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Running out of swap space – leads to OOM (Out of Memory) killer terminating processes.</li>
              <li>Setting swappiness too low – may cause OOM without swapping even when swap space is available.</li>
              <li>Using swap on a slow spinning disk – heavy swapping makes system unusable.</li>
              <li>Forgetting that hibernation (suspend-to-disk) requires swap at least as large as RAM.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Traditional rule: swap size = RAM for hibernation, otherwise 2x RAM for older systems, but today often 2–8GB or RAM*0.5.</li>
              <li>Monitor swap usage with <code>free</code> and <code>vmstat</code> regularly.</li>
              <li>Use separate swap partition (better performance) or swap file (easier resizing).</li>
              <li>For databases: disable swap (<code>swappiness=0</code>) and use enough RAM, or lock memory.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand swapped memory when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-slate-500">☑</span> Can explain why swapping exists and when it helps</div>
            <div className="flex items-center gap-2"><span className="text-slate-500">☑</span> Know how to check swap usage and swappiness</div>
            <div className="flex items-center gap-2"><span className="text-slate-500">☑</span> Understand thrashing and its symptoms</div>
            <div className="flex items-center gap-2"><span className="text-slate-500">☑</span> Can use mlock() to prevent critical memory from swapping</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Concept of Swapped Memory" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/40 dark:to-gray-950/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “I teach in <strong>Ichapur</strong>: swapping is one of the most misunderstood topics. 
                <strong>Debangshu</strong> once created a memory‑leaking program that caused the system to thrash – the disk light stayed on, and everything slowed to a crawl. 
                We used <code>vmstat 1</code> and showed high <code>si</code>/<code>so</code> values. That was the ‘aha!’ moment. 
                I remind students that swap is <strong>not evil</strong> – it's essential for oversubscription. 
                However, modern systems with enough RAM rarely swap out process pages, only file cache. 
                Understand when to tune swappiness and when to <code>mlock</code>.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Use <code>sar -W 1</code> to monitor swapping/scanning activity.</p>
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

export default Topic12;