import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/SinglyLinkedListDemo.c?raw";
import { topic0Questions } from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_012</span>
          <span>•</span>
          <span>Topic 0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Singly Linked Lists in C: Node Anatomy, Heap Allocation &amp; In-Place Reversal
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master dynamic non-contiguous data structures in C. Understand self-referential structures, pointer-to-pointer parameter passing (<code className="text-emerald-600 dark:text-emerald-400 font-mono">Node **headRef</code>), $O(1)$ head insertions, and the classic 3-pointer in-place reversal algorithm.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🔗 Classroom Story: The Array Resizing Bottleneck at Barrackpore</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Barrackpore lab, <strong>Swadeep</strong> was inserting items into a dynamic array. Whenever he inserted an element at index 0, <code>realloc()</code> and <code>memmove()</code> had to shift 500,000 integers to the right, grinding the system to a crawl.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> explained the power of linked memory: <em>&ldquo;In an array, physical memory is contiguous. In a linked list, each node is an independent heap island connected by pointer bridges. To insert at the front, you don&apos;t shift half a million numbers—you simply wire the new node&apos;s pointer to the existing head in $O(1)$ constant time!&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Singly Linked List Node Chain
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 240"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Singly Linked List Memory Architecture"
          >
            <rect width="900" height="240" fill="none" />

            {/* Head Pointer */}
            <rect x="30" y="90" width="100" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="80" y="115" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">head</text>
            <text x="80" y="130" fill="#94a3b8" fontSize="10" textAnchor="middle">0x7FFE00</text>

            <path d="M 130 115 L 180 115" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-link)" />

            {/* Node 1 */}
            <rect x="180" y="70" width="160" height="90" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <rect x="180" y="70" width="90" height="90" fill="#064e3b" />
            <text x="225" y="115" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">10</text>
            <text x="225" y="140" fill="#a7f3d0" fontSize="10" textAnchor="middle">data</text>
            <text x="305" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">next</text>
            <text x="305" y="135" fill="#94a3b8" fontSize="9" textAnchor="middle">0x7FFE60</text>

            <path d="M 340 115 L 400 115" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-link)" />

            {/* Node 2 */}
            <rect x="400" y="70" width="160" height="90" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <rect x="400" y="70" width="90" height="90" fill="#064e3b" />
            <text x="445" y="115" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">20</text>
            <text x="445" y="140" fill="#a7f3d0" fontSize="10" textAnchor="middle">data</text>
            <text x="525" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">next</text>
            <text x="525" y="135" fill="#94a3b8" fontSize="9" textAnchor="middle">0x7FFE90</text>

            <path d="M 560 115 L 620 115" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-link)" />

            {/* Node 3 */}
            <rect x="620" y="70" width="160" height="90" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <rect x="620" y="70" width="90" height="90" fill="#064e3b" />
            <text x="665" y="115" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">30</text>
            <text x="665" y="140" fill="#a7f3d0" fontSize="10" textAnchor="middle">data</text>
            <text x="745" y="115" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">NULL</text>
            <text x="745" y="135" fill="#fda4af" fontSize="9" textAnchor="middle">0x000000</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-link" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Pointer-to-Pointer Parameter Rule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400">
              ❌ The Single Pointer Trap (Pass-by-Value)
            </h3>
            <pre className="bg-slate-900 text-rose-300 p-3 rounded-lg text-xs font-mono overflow-x-auto">
{`void insertHead(Node *head, int val) {
    Node *newNode = createNode(val);
    newNode->next = head;
    head = newNode; // Only modifies local copy!
}`}
            </pre>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When <code>head</code> is passed by value, changing <code>head</code> locally has zero effect on the caller&apos;s pointer in <code>main()</code>.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              ✅ The Double Pointer Idiom (Pass-by-Reference)
            </h3>
            <pre className="bg-slate-900 text-emerald-300 p-3 rounded-lg text-xs font-mono overflow-x-auto">
{`void insertHead(Node **headRef, int val) {
    Node *newNode = createNode(val);
    newNode->next = *headRef;
    *headRef = newNode; // Modifies caller's head!
}`}
            </pre>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Passing <code>&amp;head</code> allows dereferencing <code>*headRef</code> to directly mutate the caller&apos;s actual head pointer.
            </p>
          </div>
        </div>

        {/* Reversal Algorithm Breakdown */}
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-700 space-y-3">
          <h3 className="text-lg font-bold text-emerald-400">The 3-Pointer In-Place Reversal Protocol</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reverses links in $O(N)$ time with $O(1)$ auxiliary space without allocating a single new node:
          </p>
          <pre className="text-xs font-mono text-slate-200 bg-slate-800 p-3 rounded-lg overflow-x-auto">
{`Node *prev = NULL, *current = *headRef, *next = NULL;
while (current != NULL) {
    next = current->next;   // 1. Save next node pointer
    current->next = prev;   // 2. Reverse current pointer
    prev = current;         // 3. Move prev forward
    current = next;         // 4. Move current forward
}
*headRef = prev;`}
          </pre>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Complete Singly Linked List Implementation
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates dynamic heap node creation, head/tail insertion, search-and-delete, 3-pointer in-place reversal, and clean heap deallocation.
        </p>
        <CFileLoader
          fileName="SinglyLinkedListDemo.c"
          code={cCode}
          title="Singly Linked List CRUD & In-Place Reversal Engine"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Singly Linked List Implementation in Pure C
=====================================================

>>> Step 1: Inserting elements at Head and Tail...
    Current List:
    [10] -> [20] -> [30] -> [40] -> [50] -> NULL

-----------------------------------------------------
>>> Step 2: Deleting node with value 30...
    Node 30 deleted successfully.
    Current List:
    [10] -> [20] -> [40] -> [50] -> NULL

-----------------------------------------------------
>>> Step 3: In-Place Iterative List Reversal (O(1) auxiliary space)...
    Reversed List:
    [50] -> [40] -> [20] -> [10] -> NULL

-----------------------------------------------------
>>> Step 4: Deallocating all heap nodes with freeList()...
    [Empty List: NULL]

=== Singly Linked List Operations Completed Successfully ===`}
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
              <span>⚠️ Freeing Node Before Storing Next</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Writing <code>free(curr); curr = curr-&gt;next;</code> is a critical use-after-free error. Once freed, reading <code>curr-&gt;next</code> accesses deallocated memory. Always cache <code>Node *next = curr-&gt;next; free(curr); curr = next;</code>.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Nullify Head After Freeing List</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Always set <code>*headRef = NULL;</code> at the conclusion of your <code>freeList()</code> cleanup function to prevent lingering dangling pointer bugs.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Why Can&apos;t We Binary Search a Linked List?</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Why can&apos;t we execute Binary Search in $O(\log N)$ on a sorted linked list? Because Binary Search requires instantaneous $O(1)$ random access to calculate <code>mid = (low + high) / 2</code>. Finding the middle node of a linked list requires $O(N)$ sequential traversal, keeping the overall search time strictly at $O(N)$!
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic0Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic0_Singly_Linked_Lists_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="A programmer who masters pointers and linked lists stops thinking about code as lines of text and begins visualizing memory as an interactive network of interconnected nodes."
      />
    </div>
  );
};

export default Topic0;
