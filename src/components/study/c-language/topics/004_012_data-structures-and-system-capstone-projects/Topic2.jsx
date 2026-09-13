import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/StackQueueDemo.c?raw";
import { topic2Questions } from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_012</span>
          <span>•</span>
          <span>Topic 2</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Stack (LIFO) &amp; Queue (FIFO) Implementations in Pure C
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master fundamental abstract data types. Compare contiguous array buffers against dynamic linked node mechanics for Stacks (Last-In, First-Out) and Queues (First-In, First-Out) with strict $O(1)$ operations and memory safety.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🥞 Classroom Story: The Cafeteria Tray Stack vs The Ticket Queue</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Barrackpore lab, <strong>Abhronila</strong> and <strong>Debangshu</strong> were modeling a print buffer and an undo engine. Debangshu asked why two different data structures were needed when both store sequential elements.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> explained the physical analogy: <em>&ldquo;A <strong>Stack</strong> is like a stack of cafeteria trays: the last tray placed on top is the first one taken off (LIFO), which powers undo buttons and function recursion. A <strong>Queue</strong> is like a movie ticket counter: the first person to arrive is the first person served (FIFO), which powers packet buffers and task schedulers.&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: LIFO Stack vs FIFO Queue
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Stack vs Queue Diagram"
          >
            <rect width="900" height="280" fill="none" />

            {/* STACK (LIFO) */}
            <rect x="50" y="30" width="360" height="220" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="230" y="60" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">STACK (LIFO: Push &amp; Pop at Top)</text>

            <path d="M 120 75 L 120 105" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-sq-green)" />
            <text x="130" y="95" fill="#10b981" fontSize="11" fontWeight="bold">push()</text>

            <path d="M 320 105 L 320 75" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-sq-red)" />
            <text x="330" y="95" fill="#f43f5e" fontSize="11" fontWeight="bold">pop()</text>

            <rect x="140" y="110" width="180" height="35" rx="6" fill="#0284c7" stroke="#38bdf8" />
            <text x="230" y="133" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">[Top] Node: 300</text>

            <rect x="140" y="150" width="180" height="35" rx="6" fill="#0369a1" />
            <text x="230" y="173" fill="#e0f2fe" fontSize="13" textAnchor="middle">Node: 200</text>

            <rect x="140" y="190" width="180" height="35" rx="6" fill="#075985" />
            <text x="230" y="213" fill="#bae6fd" fontSize="13" textAnchor="middle">[Bottom] Node: 100</text>

            {/* QUEUE (FIFO) */}
            <rect x="490" y="30" width="360" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="670" y="60" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">QUEUE (FIFO: Enqueue Rear, Dequeue Front)</text>

            <path d="M 520 145 L 560 145" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-sq-red)" />
            <text x="510" y="130" fill="#f43f5e" fontSize="11" fontWeight="bold">dequeue()</text>

            <rect x="570" y="125" width="70" height="45" rx="6" fill="#047857" stroke="#10b981" />
            <text x="605" y="152" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">10</text>
            <text x="605" y="190" fill="#a7f3d0" fontSize="11" textAnchor="middle">front</text>

            <rect x="650" y="125" width="70" height="45" rx="6" fill="#065f46" />
            <text x="685" y="152" fill="#e0f2fe" fontSize="14" textAnchor="middle">20</text>

            <rect x="730" y="125" width="70" height="45" rx="6" fill="#064e3b" stroke="#34d399" />
            <text x="765" y="152" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">30</text>
            <text x="765" y="190" fill="#a7f3d0" fontSize="11" textAnchor="middle">rear</text>

            <path d="M 840 145 L 810 145" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-sq-green)" />
            <text x="815" y="130" fill="#10b981" fontSize="11" fontWeight="bold">enqueue()</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-sq-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrow-sq-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: Stack vs Queue Characteristics
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3">Characteristic</th>
                <th className="p-3">Stack (LIFO)</th>
                <th className="p-3">Queue (FIFO)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold">Primary Principle</td>
                <td className="p-3 font-bold text-sky-500">Last-In, First-Out (LIFO)</td>
                <td className="p-3 font-bold text-emerald-500">First-In, First-Out (FIFO)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Insertion Point</td>
                <td className="p-3"><code>push()</code> at Top</td>
                <td className="p-3"><code>enqueue()</code> at Rear</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Removal Point</td>
                <td className="p-3"><code>pop()</code> at Top</td>
                <td className="p-3"><code>dequeue()</code> at Front</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Time Complexity</td>
                <td className="p-3 font-mono text-emerald-500 font-bold">O(1) push, O(1) pop</td>
                <td className="p-3 font-mono text-emerald-500 font-bold">O(1) enqueue, O(1) dequeue</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Key Applications</td>
                <td className="p-3">Recursion, Expression Evaluation, Undo/Redo</td>
                <td className="p-3">OS Task Scheduling, Packet Buffers, BFS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Linked Stack &amp; Queue Engines
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates dynamic heap-allocated implementations of both a Linked Stack and a Linked Queue with peek, pop, and cleanup routines.
        </p>
        <CFileLoader
          fileName="StackQueueDemo.c"
          code={cCode}
          title="Dynamic Linked Stack (LIFO) & Queue (FIFO) Implementations"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Stack (LIFO) & Queue (FIFO) Implementations in C
=====================================================

>>> 1. Stack (LIFO: Last-In, First-Out) Operations:
    Pushed 100, 200, 300 to Stack (Size: 3)
    Peek Top Element: 300
    Popping elements from Stack: [300] [200] [100] 

-----------------------------------------------------
>>> 2. Queue (FIFO: First-In, First-Out) Operations:
    Enqueued 10, 20, 30 to Queue (Size: 3)
    Dequeuing elements from Queue: [10] [20] [30] 

=== Stack & Queue Demonstration Completed Successfully ===`}
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
              <span>⚠️ Forgetting to Reset Rear on Empty Queue</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When dequeuing the last element in a queue (<code>front == NULL</code>), if you fail to set <code>rear = NULL</code>, subsequent enqueues will write to dangling pointer memory!
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Safe Output Pointer Protocol</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Implement <code>bool pop(Stack *s, int *out)</code> instead of returning a sentinel value like <code>-1</code>. This allows storing any integer (including negative numbers) without value collisions.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Implementing a Queue with 2 Stacks</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          How can you build a FIFO Queue using only two LIFO Stacks (Stack1 &amp; Stack2)? Push elements to Stack1. For dequeue: if Stack2 is empty, pop all elements from Stack1 and push them into Stack2 (reversing their order to FIFO!), then pop from Stack2 in amortized $O(1)$ time!
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic2Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic2_Stack_Queue_Implementations_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Stacks and queues are the fundamental engines of computer science. Master their pointer mechanics and you understand how operating systems manage recursive call stacks and task execution."
      />
    </div>
  );
};

export default Topic2;
