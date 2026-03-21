import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import internalFrag from './topic11_files/internal_fragmentation.c?raw';
import externalFrag from './topic11_files/external_fragmentation.c?raw';
import preventFrag from './topic11_files/fragmentation_prevention.c?raw';

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

const Topic11 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // internal
    '300ms',  // external
    '400ms',  // svg
    '500ms',  // code examples
    '600ms',  // pitfalls
    '700ms',  // best practices
    '800ms',  // checklist
    '900ms',  // hints
    '1000ms', // tips
  ];

  const getSectionClass = () => clsx('animate-fade-slide-up', 'opacity-0');

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div className={getSectionClass()} style={{ animationDelay: sectionDelays[0] }}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Memory Fragmentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Internal and external fragmentation — the hidden enemies of heap memory.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Why Memory Fragmentation Matters
          </h2>
          <p className="leading-relaxed mb-3">
            Even when there's enough total free memory, it might be split into many small unusable blocks.
            This is called <strong>fragmentation</strong>. It causes <code>malloc</code> to fail even though
            the total free space is large, and it degrades performance by increasing allocation overhead.
          </p>
          <p className="leading-relaxed">
            There are two types: <strong>internal fragmentation</strong> (wasted space within allocated blocks)
            and <strong>external fragmentation</strong> (wasted space between allocated blocks). Understanding
            both is key to writing efficient, long‑running programs.
          </p>
        </section>

        {/* Internal Fragmentation */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            🧩 Internal Fragmentation
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              Internal fragmentation occurs when allocated memory is larger than the requested size.
              This can happen due to:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li><strong>Alignment requirements:</strong> Many allocators round up sizes to multiples of 8 or 16 bytes.</li>
              <li><strong>Fixed‑size allocation pools:</strong> Using a slab allocator where each block is a fixed size.</li>
              <li><strong>Metadata overhead:</strong> Each allocated block has a small header (size, flags) stored before the data.</li>
            </ul>
            <p>For example, requesting 5 bytes may actually allocate 16 bytes. The wasted 11 bytes are internal fragmentation.</p>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
              <p className="text-sm"><strong>⚠️ Internal fragmentation is often invisible</strong> — you ask for 5 bytes, you get a pointer to 5 bytes, but the heap manager actually reserved more space.</p>
            </div>
          </div>
        </section>

        {/* External Fragmentation */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🧩 External Fragmentation
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              External fragmentation happens when free memory is split into many small, non‑contiguous blocks.
              Even if total free space is large, a request for a big block may fail because no single free block is big enough.
            </p>
            <p className="leading-relaxed mb-3">
              This is common in programs that allocate and free blocks of varying sizes over time. The classic example:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Allocate A (100 bytes), B (200 bytes), C (100 bytes)</li>
              <li>Free B → now free blocks: 100 (before), 200 (middle), 100 (after) → external fragmentation.</li>
              <li>Now request 150 bytes → cannot fit in any single block → allocation fails.</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
              <p className="text-sm"><strong>💡 Tip:</strong> External fragmentation can be mitigated by using memory pools, buddy allocators, or by allocating similar sizes together.</p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Visualizing Fragmentation
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 280" className="w-full h-auto" aria-label="Fragmentation illustration">
              <rect width="800" height="280" fill="transparent" />

              {/* Internal fragmentation */}
              <text x="50" y="30" fill="currentColor" className="text-sm font-semibold">Internal Fragmentation</text>
              <rect x="50" y="50" width="300" height="80" fill="none" stroke="#22c55e" strokeWidth="2" rx="4" />
              <rect x="60" y="60" width="100" height="60" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1" />
              <text x="70" y="95" fill="currentColor" className="text-xs">Requested: 40B</text>
              <rect x="170" y="60" width="170" height="60" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2" />
              <text x="180" y="95" fill="#ef4444" className="text-xs">Wasted (internal)</text>
              <text x="70" y="125" fill="currentColor" className="text-xs">Actual allocated: 100B (due to alignment/pool)</text>

              {/* External fragmentation */}
              <text x="50" y="170" fill="currentColor" className="text-sm font-semibold">External Fragmentation</text>
              <rect x="50" y="190" width="700" height="50" fill="none" stroke="#a855f7" strokeWidth="2" rx="4" />
              <rect x="60" y="200" width="100" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              <text x="85" y="220" fill="currentColor" className="text-xs">A</text>
              <rect x="180" y="200" width="140" height="30" fill="rgba(156,163,175,0.3)" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
              <text x="210" y="220" fill="gray" className="text-xs">Free 140B</text>
              <rect x="340" y="200" width="80" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              <text x="360" y="220" fill="currentColor" className="text-xs">B</text>
              <rect x="440" y="200" width="70" height="30" fill="rgba(156,163,175,0.3)" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
              <text x="460" y="220" fill="gray" className="text-xs">Free 70B</text>
              <rect x="530" y="200" width="100" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              <text x="560" y="220" fill="currentColor" className="text-xs">C</text>
              <rect x="650" y="200" width="90" height="30" fill="rgba(156,163,175,0.3)" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
              <text x="670" y="220" fill="gray" className="text-xs">Free 90B</text>
              <text x="400" y="260" fill="#ef4444" className="text-xs">Request 150B fails → no contiguous free block</text>
            </svg>
          </div>
        </section>

        {/* Code Examples */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💻 Code Examples
          </h2>
          <div className="space-y-6">
            <EditableCCodeBlock
              title="Example 1: Internal fragmentation (alignment overhead)"
              initialCode={internalFrag}
            />
            <EditableCCodeBlock
              title="Example 2: External fragmentation (allocation pattern)"
              initialCode={externalFrag}
            />
            <EditableCCodeBlock
              title="Example 3: Reducing fragmentation (pool allocator)"
              initialCode={preventFrag}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Ignoring fragmentation:</strong> Assuming memory is always available leads to unexpected allocation failures.</li>
            <li><strong>Mixing very different allocation sizes:</strong> Creates many small holes, worsening external fragmentation.</li>
            <li><strong>Frequent allocation/free of large blocks:</strong> Can quickly fragment the heap.</li>
            <li><strong>Not using memory pools:</strong> For many small, fixed‑size objects, a custom allocator can eliminate fragmentation.</li>
            <li><strong>Assuming <code>realloc</code> will always succeed:</strong> It can fail due to fragmentation even if total memory is available.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ For many small objects of the same size, use a memory pool (slab allocator) to eliminate fragmentation.</li>
              <li>✔️ Try to allocate blocks of similar sizes together to reduce external fragmentation.</li>
              <li>✔️ Free memory in the reverse order of allocation when possible (LIFO) to keep free space contiguous.</li>
              <li>✔️ For long‑running programs, periodically defragment the heap (e.g., using a copying allocator).</li>
              <li>✔️ Use memory allocators designed for low fragmentation (e.g., jemalloc, tcmalloc) for large‑scale applications.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            📋 Mini Checklist
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-1">
              <li>☐ I understand the difference between internal and external fragmentation.</li>
              <li>☐ I can identify situations that cause fragmentation.</li>
              <li>☐ I know how alignment and metadata cause internal fragmentation.</li>
              <li>☐ I can explain why external fragmentation leads to allocation failures.</li>
              <li>☐ I am aware of techniques to reduce fragmentation (pools, LIFO freeing).</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Observe carefully...</p>
            <ul className="list-disc list-inside mt-2">
              <li>In the external fragmentation example, what happens if you free in LIFO order instead of FIFO?</li>
              <li>How would you design a simple memory pool for fixed‑size objects? What would its structure look like?</li>
              <li>Why does <code>realloc</code> sometimes move the block? How does this help fragmentation?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> with <code>--tool=massif</code> to visualize heap usage and fragmentation.</p>
            <p><strong>📦 Performance:</strong> For real‑time systems, pre‑allocate a large buffer and use a custom allocator to avoid fragmentation entirely.</p>
            <p><strong>🧹 Reuse objects:</strong> Instead of freeing and allocating repeatedly, reuse allocated objects (object pools) to avoid fragmentation.</p>
            <p><strong>📏 Know your allocator:</strong> Different allocators have different fragmentation characteristics; choose one that fits your workload.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Fragmentation is like a library where books are returned but placed on the wrong shelves — you have space, but can't fit a large book. In your programs, think about allocation patterns: allocate similar sizes together, free in reverse order, and consider using memory pools for frequent allocations. This will keep your heap healthy and your program reliable."
        />
      </div>
    </>
  );
};

export default Topic11;