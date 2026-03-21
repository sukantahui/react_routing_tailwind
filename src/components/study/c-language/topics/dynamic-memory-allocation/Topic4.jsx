import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import mallocVsCalloc from './topic4_files/malloc_vs_calloc.c?raw';
import performanceExample from './topic4_files/performance_example.c?raw';
import zeroInitExample from './topic4_files/zero_init_example.c?raw';

// Keyframes for reveal animations (inline style)
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-slide-up {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Topic4 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // comparison table
    '300ms',  // initialization
    '400ms',  // performance
    '500ms',  // svg
    '600ms',  // code examples
    '700ms',  // pitfalls
    '800ms',  // best practices
    '900ms',  // checklist
    '1000ms', // hints
    '1100ms', // tips
  ];

  const getSectionClass = () => clsx('animate-fade-slide-up', 'opacity-0');

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div className={getSectionClass()} style={{ animationDelay: sectionDelays[0] }}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            malloc vs calloc — Initialization & Performance
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Choosing the right allocation function: when speed matters and when safety wins.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Two Sides of the Same Coin
          </h2>
          <p className="leading-relaxed mb-3">
            Both <code>malloc()</code> and <code>calloc()</code> allocate memory from the heap,
            but they differ in two critical aspects: <strong>initialization</strong> and
            <strong>performance</strong>. Understanding these differences helps you pick the right
            tool for the job.
          </p>
          <p className="leading-relaxed">
            The table below summarizes the key differences at a glance.
          </p>
        </section>

        {/* Comparison Table */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📊 Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">malloc</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">calloc</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm">Prototype</td>
                  <td className="px-6 py-4 font-mono text-sm">void* malloc(size_t size);</td>
                  <td className="px-6 py-4 font-mono text-sm">void* calloc(size_t nmemb, size_t size);</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm">Initialization</td>
                  <td className="px-6 py-4 text-sm">Uninitialized (contains garbage)</td>
                  <td className="px-6 py-4 text-sm">Zero‑initialized (all bytes set to 0)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm">Arguments</td>
                  <td className="px-6 py-4 text-sm">Single argument: total bytes</td>
                  <td className="px-6 py-4 text-sm">Two arguments: number of elements × element size</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm">Performance</td>
                  <td className="px-6 py-4 text-sm">Faster (no zeroing overhead)</td>
                  <td className="px-6 py-4 text-sm">Slightly slower (must write zeros)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm">Use case</td>
                  <td className="px-6 py-4 text-sm">When you'll immediately initialize the memory</td>
                  <td className="px-6 py-4 text-sm">When you need zero‑initialized memory (arrays, strings, structures)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Initialization Deep Dive */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔍 Initialization: The Core Difference
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-medium mb-3">malloc — Raw, Uninitialized Memory</h3>
            <p className="leading-relaxed mb-4">
              <code>malloc</code> gives you a block of memory exactly as the system provides it.
              The contents are <strong>indeterminate</strong> — often referred to as "garbage".
              Reading from this memory before writing to it is <strong>undefined behavior</strong>
              and can lead to crashes, security vulnerabilities, or mysterious bugs.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">calloc — Guaranteed Zero‑Initialization</h3>
            <p className="leading-relaxed mb-4">
              <code>calloc</code> allocates and then <strong>writes zeros</strong> to every byte of
              the allocated block. This makes it safe to use immediately without explicit
              initialization. For arrays of integers, pointers, or structures, this often sets
              default values (0, NULL, false) that are predictable.
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
              <p className="text-sm"><strong>💡 Insight:</strong> In some operating systems,
              <code>calloc</code> can be implemented using OS‑level zero‑filled pages, which
              might be just as fast as <code>malloc</code> for large allocations.</p>
            </div>
          </div>
        </section>

        {/* Performance Considerations */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            ⚡ Performance: Speed vs Safety
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              Because <code>calloc</code> must zero the memory, it generally takes more time than
              <code>malloc</code>. However, the difference is often negligible for small or moderate
              allocations. For large allocations (megabytes), the zeroing overhead can be noticeable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold">When malloc wins:</p>
                <ul className="list-disc list-inside text-sm mt-1">
                  <li>You'll write to every byte immediately</li>
                  <li>Performance is critical and you can guarantee initialization</li>
                  <li>You need to allocate extremely large blocks (and will write them anyway)</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold">When calloc wins:</p>
                <ul className="list-disc list-inside text-sm mt-1">
                  <li>You need zero‑initialized memory (e.g., arrays, structures)</li>
                  <li>Safety and predictability matter more than a few microseconds</li>
                  <li>You're allocating for strings or data that should start as empty</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Visualizing the Difference
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 280" className="w-full h-auto" aria-label="malloc vs calloc memory content">
              <rect width="800" height="280" fill="transparent" />

              {/* malloc block */}
              <rect x="50" y="30" width="300" height="120" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" rx="6" />
              <text x="60" y="55" fill="currentColor" className="text-sm font-mono">malloc(5 * sizeof(int))</text>
              {[70, 90, 110, 130, 150].map((x, i) => (
                <rect key={i} x={x} y="70" width="30" height="25" fill="none" stroke="#22c55e" strokeWidth="1" />
              ))}
              <text x="75" y="85" fill="currentColor" className="text-xs">??</text>
              <text x="95" y="85" fill="currentColor" className="text-xs">??</text>
              <text x="115" y="85" fill="currentColor" className="text-xs">??</text>
              <text x="135" y="85" fill="currentColor" className="text-xs">??</text>
              <text x="155" y="85" fill="currentColor" className="text-xs">??</text>
              <text x="65" y="115" fill="currentColor" className="text-xs text-gray-500">garbage values (uninitialized)</text>

              {/* calloc block */}
              <rect x="450" y="30" width="300" height="120" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="2" rx="6" />
              <text x="460" y="55" fill="currentColor" className="text-sm font-mono">calloc(5, sizeof(int))</text>
              {[470, 490, 510, 530, 550].map((x, i) => (
                <rect key={i} x={x} y="70" width="30" height="25" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              ))}
              <text x="475" y="85" fill="currentColor" className="text-xs">0</text>
              <text x="495" y="85" fill="currentColor" className="text-xs">0</text>
              <text x="515" y="85" fill="currentColor" className="text-xs">0</text>
              <text x="535" y="85" fill="currentColor" className="text-xs">0</text>
              <text x="555" y="85" fill="currentColor" className="text-xs">0</text>
              <text x="465" y="115" fill="currentColor" className="text-xs text-gray-500">all bytes zero‑initialized</text>

              {/* arrows */}
              <defs>
                <marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                </marker>
              </defs>
              <line x1="350" y1="95" x2="450" y2="95" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow4)" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="380" y="85" fill="#6b7280" className="text-xs">calloc = malloc + zero fill</text>

              {/* performance note */}
              <text x="50" y="200" fill="currentColor" className="text-sm font-mono">malloc performance:</text>
              <rect x="50" y="210" width="300" height="20" fill="#22c55e" rx="3" />
              <text x="360" y="225" fill="currentColor" className="text-xs">faster</text>

              <text x="450" y="200" fill="currentColor" className="text-sm font-mono">calloc performance:</text>
              <rect x="450" y="210" width="280" height="20" fill="#a855f7" rx="3" />
              <text x="740" y="225" fill="currentColor" className="text-xs">slightly slower (zeroing)</text>
            </svg>
          </div>
        </section>

        {/* Code Examples */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💻 Code Examples
          </h2>
          <div className="space-y-6">
            <EditableCCodeBlock
              title="Example 1: malloc vs calloc — direct comparison"
              initialCode={mallocVsCalloc}
            />
            <EditableCCodeBlock
              title="Example 2: Performance difference (conceptual)"
              initialCode={performanceExample}
            />
            <EditableCCodeBlock
              title="Example 3: Zero‑initialization importance"
              initialCode={zeroInitExample}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Assuming malloc zeros memory:</strong> Leads to reading garbage values and unexpected behavior.</li>
            <li><strong>Using calloc for everything:</strong> Unnecessary zeroing can hurt performance in tight loops.</li>
            <li><strong>Forgetting to check for NULL:</strong> Both can fail; ignoring it leads to crashes.</li>
            <li><strong>Mixing up arguments:</strong> <code>calloc(5, sizeof(int))</code> vs <code>malloc(5 * sizeof(int))</code> – both work, but mistakes happen.</li>
            <li><strong>Overlooking zero‑initialization for pointers:</strong> <code>calloc</code> sets pointer members to NULL, which is often safe.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Use <code>calloc</code> when you need zero‑initialized memory (arrays, strings, structures with default values).</li>
              <li>✔️ Use <code>malloc</code> when you will immediately initialize the memory yourself.</li>
              <li>✔️ Always check for <code>NULL</code> after allocation, regardless of which function you use.</li>
              <li>✔️ For large allocations, profile both to see if zeroing overhead matters.</li>
              <li>✔️ Document your choice: e.g., "calloc ensures all fields are zeroed initially".</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            📋 Mini Checklist
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-1">
              <li>☐ I can explain the initialization difference between malloc and calloc.</li>
              <li>☐ I understand the performance trade‑off and when to choose each.</li>
              <li>☐ I know the prototypes and argument patterns.</li>
              <li>☐ I always check return values for NULL.</li>
              <li>☐ I can refactor code to use the appropriate function based on need.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Observe carefully...</p>
            <ul className="list-disc list-inside mt-2">
              <li>Run the comparison example multiple times — does the garbage value change?</li>
              <li>Try measuring time for large allocations (e.g., 100MB) with malloc vs calloc.</li>
              <li>What happens if you use calloc for an array of pointers? Are they all NULL?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[11] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use tools like Valgrind to detect reads of uninitialized memory from malloc.</p>
            <p><strong>📦 Performance tuning:</strong> For real‑time systems, prefer malloc and explicitly initialize only what's needed.</p>
            <p><strong>🧹 Code clarity:</strong> Use a macro or wrapper that chooses the right function based on a flag: <code>ALLOC_ZERO</code> vs <code>ALLOC_RAW</code>.</p>
            <p><strong>📏 Security:</strong> calloc can help avoid information leaks because it doesn't expose previous heap contents.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Think of malloc as a blank piece of paper with random scribbles – you must erase it (initialize) before use. calloc gives you a clean, white sheet. In exams and interviews, always highlight this initialization difference. Also remember: the performance gap is often exaggerated; clarity and safety usually win in production code."
        />
      </div>
    </>
  );
};

export default Topic4;