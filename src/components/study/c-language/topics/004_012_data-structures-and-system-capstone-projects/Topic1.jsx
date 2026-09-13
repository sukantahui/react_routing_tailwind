import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/DoublyCircularListDemo.c?raw";
import { topic1Questions } from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_012</span>
          <span>•</span>
          <span>Topic 1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Doubly Linked Lists, Circular Lists &amp; Sentinel Nodes in C
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master bidirectional pointer topologies. Discover how Doubly Linked Lists achieve instantaneous $O(1)$ node deletion, implement circular round-robin queues, and understand the foundational data structures powering LRU caches and browser history.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚡ Classroom Story: The Instant O(1) Cache Eviction</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Shyamnagar lab, <strong>Tuhina</strong> was designing a cache engine. Whenever a cache node was hit, she needed to delete it from its current position and move it to the front. With a Singly Linked List, finding the previous node required an $O(N)$ linear scan on every cache access.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> showed her the power of the <code>prev</code> pointer: <em>&ldquo;In a Doubly Linked List, every node already knows who stands before it! Deleting a node takes exactly two pointer assignments: <code>node-&gt;prev-&gt;next = node-&gt;next</code> and <code>node-&gt;next-&gt;prev = node-&gt;prev</code>. Zero search loop, strictly $O(1)$ constant time.&rdquo;</em> Tuhina implemented the DLL, achieving microsecond-level cache promotions.
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Doubly Linked List Bidirectional Topology
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 240"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Doubly Linked List Memory Architecture"
          >
            <rect width="900" height="240" fill="none" />

            {/* Node 1 */}
            <rect x="50" y="60" width="200" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <rect x="50" y="60" width="50" height="100" fill="#0c4a6e" />
            <text x="75" y="115" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">NULL</text>
            <rect x="100" y="60" width="100" height="100" fill="#064e3b" />
            <text x="150" y="115" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">10</text>
            <text x="150" y="140" fill="#a7f3d0" fontSize="10" textAnchor="middle">data</text>
            <text x="225" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">next</text>

            {/* Bidirectional Arrows Between Node 1 and Node 2 */}
            <path d="M 250 90 L 350 90" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-dll-right)" />
            <path d="M 350 130 L 250 130" stroke="#0ea5e9" strokeWidth="2.5" markerEnd="url(#arrow-dll-left)" />

            {/* Node 2 */}
            <rect x="350" y="60" width="200" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <rect x="350" y="60" width="50" height="100" fill="#0c4a6e" />
            <text x="375" y="115" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">prev</text>
            <rect x="400" y="60" width="100" height="100" fill="#064e3b" />
            <text x="450" y="115" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">20</text>
            <text x="450" y="140" fill="#a7f3d0" fontSize="10" textAnchor="middle">data</text>
            <text x="525" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">next</text>

            {/* Bidirectional Arrows Between Node 2 and Node 3 */}
            <path d="M 550 90 L 650 90" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-dll-right)" />
            <path d="M 650 130 L 550 130" stroke="#0ea5e9" strokeWidth="2.5" markerEnd="url(#arrow-dll-left)" />

            {/* Node 3 */}
            <rect x="650" y="60" width="200" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <rect x="650" y="60" width="50" height="100" fill="#0c4a6e" />
            <text x="675" y="115" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">prev</text>
            <rect x="700" y="60" width="100" height="100" fill="#064e3b" />
            <text x="750" y="115" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">30</text>
            <text x="750" y="140" fill="#a7f3d0" fontSize="10" textAnchor="middle">data</text>
            <rect x="800" y="60" width="50" height="100" fill="#881337" />
            <text x="825" y="115" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">NULL</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-dll-right" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrow-dll-left" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: DLL vs Circular vs Sentinel Topologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
              Doubly Linked (DLL)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Provides bidirectional navigation. Deleting any node whose pointer is known takes $O(1)$ constant time with zero predecessor search.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sky-600 dark:text-sky-400 text-base">
              Circular List (CLL)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tail links back to head. Ideal for round-robin scheduling, audio ring buffers, and cyclic task dispatchers.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 text-base">
              Sentinel Nodes
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Permanent dummy head/tail nodes eliminate special null-boundary checks, producing concise, branch-free list insertion and deletion code.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Doubly Linked List CRUD &amp; Bidirectional Traversal
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates bidirectional forward/backward traversal, $O(1)$ in-place node deletion, and complete heap memory deallocation.
        </p>
        <CFileLoader
          fileName="DoublyCircularListDemo.c"
          code={cCode}
          title="Doubly Linked List CRUD & Bidirectional Traversal Engine"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Doubly Linked List & Bidirectional Traversal in C
=====================================================

>>> Step 1: Populating Doubly Linked List...
    Forward  : [10] <-> [20] <-> [30] <-> [40] <-> [50] <-> NULL
    Backward : [50] <-> [40] <-> [30] <-> [20] <-> [10] <-> NULL

-----------------------------------------------------
>>> Step 2: Deleting middle node (30) in O(1) pointer time...
    Node 30 deleted.
    Forward  : [10] <-> [20] <-> [40] <-> [50] <-> NULL
    Backward : [50] <-> [40] <-> [20] <-> [10] <-> NULL

-----------------------------------------------------
>>> Step 3: Deallocating all heap nodes...
    Forward  : NULL

=== Doubly Linked List Operations Completed Successfully ===`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common Pitfalls &amp; Professional Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <span>⚠️ Asymmetric Pointer Wiring</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When inserting a node, if you update <code>prev-&gt;next = node</code> but forget to update <code>node-&gt;next-&gt;prev = node</code>, forward traversal works normally while backward traversal corrupts memory. Always update all 4 pointers on DLL insertion!
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Sentinel Dummies for Complex Engines</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When building LRU caches, memory allocators, or event systems, allocate dummy sentinel head and tail nodes to remove special boundary checks and eliminate null dereferences.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: The Linux Kernel Circular list_head</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Why does the Linux kernel implement almost all internal subsystems (task scheduling, network packet buffers, device drivers) with circular doubly linked lists? Because circular DLLs allow inserting and removing nodes at head or tail in $O(1)$ time with zero conditional branching!
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic1Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic1_Doubly_Circular_Lists_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Doubly linked lists and sentinel nodes teach you that symmetric data architecture produces clean, bug-free code with minimal branch complexity."
      />
    </div>
  );
};

export default Topic1;
