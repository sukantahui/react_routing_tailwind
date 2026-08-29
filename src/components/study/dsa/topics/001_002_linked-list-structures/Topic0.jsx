import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/linked_list_demo.c?raw";

export default function Topic0() {
  const sectionRefs = useRef([]);

  // ==========================================
  // Section 1: Struct Padding & Memory Alignment State
  // ==========================================
  const [archMode, setArchMode] = useState("64"); // "64" or "32"
  const [hoveredByte, setHoveredByte] = useState(null);

  // ==========================================
  // Section 2: Interactive Heap Allocator Visualizer State
  // ==========================================
  const [heapNodes, setHeapNodes] = useState([
    { id: 1, val: 10, addr: "0x55a010", nextAddr: "0x55a030" },
    { id: 2, val: 25, addr: "0x55a030", nextAddr: "0x55a070" },
    { id: 3, val: 40, addr: "0x55a070", nextAddr: "NULL" },
  ]);
  const [newNodeValue, setNewNodeValue] = useState("");
  const [traversalStep, setTraversalStep] = useState(0);
  const [allocStatus, setAllocStatus] = useState(
    "List initialized on heap with 3 nodes. Head pointer points to 0x55a010."
  );
  const [isTraversing, setIsTraversing] = useState(false);
  const [activeTrapTab, setActiveTrapTab] = useState("incomplete_type");

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Helper to generate realistic heap hex addresses
  const generateHeapAddress = () => {
    const randomHex = Math.floor(0x55a000 + Math.random() * 0xff0).toString(16);
    return `0x${randomHex}`;
  };

  // Interactive Node Allocator Actions
  const handleInsertHead = () => {
    const val = newNodeValue.trim() !== "" ? parseInt(newNodeValue, 10) : Math.floor(Math.random() * 90 + 10);
    if (isNaN(val)) return;

    const newAddr = generateHeapAddress();
    const currentHeadAddr = heapNodes.length > 0 ? heapNodes[0].addr : "NULL";

    const newNode = {
      id: Date.now(),
      val: val,
      addr: newAddr,
      nextAddr: currentHeadAddr,
    };

    setHeapNodes([newNode, ...heapNodes]);
    setAllocStatus(
      `malloc(sizeof(Node)) allocated 16B at ${newAddr}. newNode->data = ${val}, newNode->next = ${currentHeadAddr}. Head pointer updated.`
    );
    setNewNodeValue("");
  };

  const handleInsertTail = () => {
    const val = newNodeValue.trim() !== "" ? parseInt(newNodeValue, 10) : Math.floor(Math.random() * 90 + 10);
    if (isNaN(val)) return;

    const newAddr = generateHeapAddress();
    const newNode = {
      id: Date.now(),
      val: val,
      addr: newAddr,
      nextAddr: "NULL",
    };

    if (heapNodes.length === 0) {
      setHeapNodes([newNode]);
      setAllocStatus(`malloc(sizeof(Node)) created initial root node at ${newAddr}. Head = ${newAddr}.`);
    } else {
      const updatedNodes = [...heapNodes];
      updatedNodes[updatedNodes.length - 1].nextAddr = newAddr;
      updatedNodes.push(newNode);
      setHeapNodes(updatedNodes);
      setAllocStatus(
        `malloc(sizeof(Node)) allocated node at ${newAddr}. Former tail's next pointer updated from NULL to ${newAddr}.`
      );
    }
    setNewNodeValue("");
  };

  const handleDeleteHead = () => {
    if (heapNodes.length === 0) {
      setAllocStatus("List is empty (head == NULL). Nothing to deallocate.");
      return;
    }
    const freedNode = heapNodes[0];
    const newHead = heapNodes.length > 1 ? heapNodes[1].addr : "NULL";
    setHeapNodes(heapNodes.slice(1));
    setAllocStatus(
      `free(${freedNode.addr}) executed! 16 bytes returned to OS heap. Head pointer updated to ${newHead}.`
    );
  };

  const handleStepTraversal = () => {
    if (heapNodes.length === 0) {
      setAllocStatus("Cannot traverse: Head pointer is NULL (empty list).");
      return;
    }
    setIsTraversing(true);
    const nextIdx = (traversalStep + 1) % (heapNodes.length + 1);
    setTraversalStep(nextIdx);

    if (nextIdx < heapNodes.length) {
      const curr = heapNodes[nextIdx];
      setAllocStatus(
        `Dereferencing register [curr]: Address ${curr.addr} -> curr->data = ${curr.val}, curr->next = ${curr.nextAddr}.`
      );
    } else {
      setAllocStatus(
        "Sentinel Encountered: curr == NULL (0x0). Traversal loop terminates safely. MMU protection preserved!"
      );
    }
  };

  const handleResetVisualizer = () => {
    setHeapNodes([
      { id: 1, val: 10, addr: "0x55a010", nextAddr: "0x55a030" },
      { id: 2, val: 25, addr: "0x55a030", nextAddr: "0x55a070" },
      { id: 3, val: 40, addr: "0x55a070", nextAddr: "NULL" },
    ]);
    setTraversalStep(0);
    setIsTraversing(false);
    setAllocStatus("Visualizer reset to default 3-node heap state.");
    setNewNodeValue("");
  };

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* ========================================================= */}
        {/* SECTION 1: HEADER & METADATA BREADCRUMB */}
        {/* ========================================================= */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-950/50">
            <span className="animate-pulse">⚡</span>
            <span>DSA Foundation · Module 001_002 · Topic 0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 tracking-tight leading-tight">
            Self-Referential Struct Mechanics
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-300 max-w-4xl mx-auto">
            Struct Padding, Heap Node Allocation via <code className="text-cyan-300 font-mono">malloc()</code>, and NULL Pointer Sentinel Checks
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed pt-1">
            A comprehensive, low-level architectural breakdown of why self-referential structures require pointer indirection, how CPU word alignment injects hidden padding bytes, how <code className="text-sky-300 font-mono">malloc()</code> claims heap pages, and how the OS MMU defends against NULL pointer dereferences.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-3">
            <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 flex items-center gap-1.5">
              <span>🏛️</span> Coder &amp; AccoTax (Barrackpore Lab)
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-1.5">
              <span>👨‍🏫</span> Mentor: Sukanta Hui
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-purple-400 flex items-center gap-1.5">
              <span>⚙️</span> x86-64 / GCC Systems Architecture
            </span>
          </div>
        </header>

        {/* ========================================================= */}
        {/* SECTION 2: BARRACKPORE LAB CLASSROOM INTUITION */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: The Physical Intuition Behind Linked Nodes
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Systems Discussion
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Core Mental Model */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> The Core Problem: Why Do We Need Self-Referential Structs?
                </h3>
                <p>
                  In C, arrays occupy a <strong>single continuous, rigid slab of RAM</strong>. If you want to insert a student in the middle of a 1,000-element array, the CPU must physically shuffle 500 memory slots rightward (<code className="text-amber-300 font-mono">O(N)</code> cost). Worse, if contiguous RAM runs out, your program fails even if fragmented memory exists across the heap!
                </p>
                <p>
                  A <strong>Self-Referential Struct</strong> breaks this rigidity. Instead of packing items shoulder-to-shoulder, each node lives anywhere in RAM and holds a <em>physical address pointer</em> to the next node. You get <code className="text-emerald-400 font-mono">O(1)</code> dynamic insertion and deletion simply by rewriting 8-byte pointer registers!
                </p>
              </div>

              {/* Classroom Dialogue */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Barrackpore Lab Classroom Discussion
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p>
                    <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why can't a struct directly contain another struct of its own type, like <code className="text-rose-300 font-mono">struct Node next;</code>? Why must it be a pointer <code className="text-cyan-300 font-mono">struct Node *next;</code>?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Think about memory calculation! If a <code className="text-slate-200 font-mono">Node</code> contains a full <code className="text-slate-200 font-mono">Node</code>, that inner Node must contain another Node, which contains another Node... It's an infinite recursive Russian doll! The compiler can never determine <code className="text-amber-300 font-mono">sizeof(Node)</code>, throwing the famous <strong>'field has incomplete type'</strong> error. But a pointer is simply an 8-byte memory address on 64-bit hardware. The compiler knows its exact size instantly!"</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Tuhina:</strong> <em>"And Sir, why is <code className="text-slate-200 font-mono">sizeof(struct Node)</code> equal to 16 bytes on my 64-bit laptop when an <code className="text-slate-200 font-mono">int</code> is 4 bytes and a pointer is 8 bytes ($4 + 8 = 12$)?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Outstanding question, Tuhina! That is <strong>Hardware Struct Padding</strong>. CPUs read memory in 8-byte word blocks. If an 8-byte pointer starts at byte offset 4, fetching it requires two memory bus transactions. The compiler silently injects a 4-byte padding hole to align the pointer to an 8-byte boundary for peak CPU throughput!"</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Abhronila:</strong> <em>"Sir, how should we formally define a <strong>Heap Node</strong> in our exams and technical interviews?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"A <strong>Heap Node</strong> is a dynamically allocated, self-referential struct instance carved out of the OS Heap via <code className="text-cyan-300 font-mono">malloc()</code>. Unlike stack variables that vanish when a function returns, a heap node's lifetime is persistent and independent—it holds the data payload, compiler padding, and a 64-bit pointer linking it to the next node in virtual memory until you explicitly <code className="text-rose-300 font-mono">free()</code> it!"</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Debangshu:</strong> <em>"And what happens if we forget to terminate our chain with <code className="text-rose-300 font-mono">NULL</code> or dereference address 0x0?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"The Memory Management Unit (MMU) catches an access to protected Page 0 and immediately issues a hardware trap, terminating your program with a <strong>Segmentation Fault (SIGSEGV)</strong>. That's why defensive sentinel checks are your primary safety shield."</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2.5: DEFINITION & ARCHITECTURE OF A "HEAP NODE" */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl">
                🧬
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-indigo-300">
                  What Exactly is a "Heap Node"?
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Formal Definition, Memory Segment Anatomy, and Glibc Chunk Headers
                </p>
              </div>
            </div>

            {/* Core Definition Banner */}
            <div className="bg-slate-950/90 border-l-4 border-indigo-500 rounded-r-xl p-5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Formal Systems Definition:
              </span>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                A <strong>Heap Node</strong> is an independently allocated, persistent memory block instantiated within the <strong>Heap Memory Segment</strong> via <code className="text-cyan-300 font-mono">malloc(sizeof(Node))</code>. It encapsulates two essential elements: a <strong>Data Payload</strong> (the application value) and one or more <strong>Self-Referential Pointer Links</strong> (<code className="text-sky-300 font-mono">struct Node *next</code>) holding the 64-bit virtual memory address of another heap node.
              </p>
            </div>

            {/* 3 Defining Characteristics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5 font-mono">
                  <span>1️⃣</span> Lifetime Persistence
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike local stack variables whose memory is reclaimed when their enclosing function returns, a Heap Node remains alive in RAM indefinitely across all function boundaries until explicitly released with <code className="text-rose-300 font-mono">free()</code>.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-cyan-400 font-bold text-sm flex items-center gap-1.5 font-mono">
                  <span>2️⃣</span> Non-Contiguous Freedom
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Heap nodes do not need to be positioned adjacent to each other. The OS memory allocator can scatter nodes across completely different virtual memory pages, linked logically through 64-bit address pointers.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5 font-mono">
                  <span>3️⃣</span> Anonymous Access
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Heap nodes have no variable names in C. You cannot access a node as <code className="text-slate-400 font-mono">node2</code>; it is accessed purely via <strong>pointer indirection</strong> (<code className="text-emerald-300 font-mono">head-&gt;next-&gt;data</code>) using memory addresses.
                </p>
              </div>
            </div>

            {/* Stack vs Heap Physical Architecture Diagram */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                PHYSICAL RAM MAP: Stack Variable (head) vs. Heap Nodes:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                {/* Stack Section */}
                <div className="md:col-span-4 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-indigo-800/60 pb-2">
                    <span className="text-xs font-bold text-indigo-300 font-mono">CALL STACK SEGMENT</span>
                    <span className="text-[10px] font-mono text-indigo-400">Auto Duration</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-indigo-900/60 space-y-1">
                      <div className="text-slate-400 text-[10px]">Stack Frame: main() [0x7ffe..]</div>
                      <div className="text-white font-bold">Node *head;</div>
                      <div className="text-cyan-400 text-[11px]">Value: 0x55a010</div>
                      <div className="text-slate-500 text-[9px]">8 Bytes Pointer Variable</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The variable <code className="text-indigo-300 font-mono">head</code> lives on the stack. It does not contain node data; it simply stores the starting memory address of the first heap node.
                  </p>
                </div>

                {/* Arrow */}
                <div className="md:col-span-1 flex items-center justify-center text-cyan-500 font-bold text-2xl select-none">
                  &rarr;
                </div>

                {/* Heap Section */}
                <div className="md:col-span-7 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-cyan-800/60 pb-2">
                    <span className="text-xs font-bold text-cyan-300 font-mono">HEAP MEMORY SEGMENT</span>
                    <span className="text-[10px] font-mono text-emerald-400">Dynamic Lifetime (malloc)</span>
                  </div>

                  {/* Heap Node Visual Blocks */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Node 1 */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-cyan-500/60 text-xs font-mono space-y-1 shadow-md min-w-[150px]">
                      <div className="text-[10px] text-cyan-400 font-bold">Heap Node @ 0x55a010</div>
                      <div className="text-white">data: 10 <span className="text-slate-500 text-[10px]">(4B)</span></div>
                      <div className="text-amber-400 text-[10px]">padding: [4B hole]</div>
                      <div className="text-sky-300 text-[10px]">next: 0x55a030 <span className="text-slate-500">(8B)</span></div>
                    </div>

                    <span className="text-cyan-500 font-bold text-sm">&rarr;</span>

                    {/* Node 2 */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-cyan-500/60 text-xs font-mono space-y-1 shadow-md min-w-[150px]">
                      <div className="text-[10px] text-cyan-400 font-bold">Heap Node @ 0x55a030</div>
                      <div className="text-white">data: 25 <span className="text-slate-500 text-[10px]">(4B)</span></div>
                      <div className="text-amber-400 text-[10px]">padding: [4B hole]</div>
                      <div className="text-rose-400 text-[10px]">next: NULL (0x0)</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                    Each Heap Node is a distinct 16-byte struct residing in heap RAM. The nodes link dynamically via virtual memory addresses without needing adjacent physical positioning.
                  </p>
                </div>
              </div>
            </div>

            {/* Glibc Heap Chunk Header Insight */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold font-mono text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <span>📦</span> Under the Hood: Glibc Memory Allocator Chunk Header
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                When you call <code className="text-cyan-300 font-mono">malloc(16)</code>, glibc actually allocates <strong>24 to 32 bytes</strong> on the heap. It prepends an invisible <strong>8-byte Chunk Header</strong> right before your node address:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-xs pt-1">
                <div className="p-2 rounded bg-purple-950/60 border border-purple-800 text-purple-300 text-center">
                  <span className="text-[9px] block text-slate-400">Offset -0x08</span>
                  <span>Chunk Header (8B)</span>
                  <span className="text-[9px] block text-purple-400">Size &amp; Flags</span>
                </div>
                <div className="p-2 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-center">
                  <span className="text-[9px] block text-slate-400">Offset +0x00</span>
                  <span>int data (4B)</span>
                  <span className="text-[9px] block text-cyan-400">Payload</span>
                </div>
                <div className="p-2 rounded bg-amber-950/60 border border-amber-800 text-amber-300 text-center">
                  <span className="text-[9px] block text-slate-400">Offset +0x04</span>
                  <span>Padding (4B)</span>
                  <span className="text-[9px] block text-amber-400">Alignment Hole</span>
                </div>
                <div className="p-2 rounded bg-sky-950/60 border border-sky-800 text-sky-300 text-center">
                  <span className="text-[9px] block text-slate-400">Offset +0x08</span>
                  <span>*next Ptr (8B)</span>
                  <span className="text-[9px] block text-sky-400">Address Link</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                When you call <code className="text-rose-300 font-mono">free(ptr)</code>, the allocator reads the chunk header at <code className="text-slate-300 font-mono">ptr - 8</code> to know how many bytes to return to the free-list bin!
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: THE THREE PILLARS OF SELF-REFERENTIAL STRUCTS */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
                <span>🧱</span> The Architectural Anatomy of a Node
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                C Syntax, Assembly Representation, and Incomplete Type Theory
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Why Pointer Indirection is Mandatory */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                  <span>❌</span> Illegal: Direct Nesting (Incomplete Type)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
                  Compile Error
                </span>
              </div>
              
              <div className="p-3.5 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 border border-rose-900/40 space-y-1">
                <span className="text-slate-500">// 🚫 Fails to compile: Infinite Size recursion</span>
                <p><span className="text-purple-400">struct</span> <span className="text-yellow-300">Node</span> &#123;</p>
                <p className="pl-4"><span className="text-cyan-400">int</span> data;         <span className="text-slate-500">// 4 Bytes</span></p>
                <p className="pl-4 text-rose-400 font-bold"><span className="text-purple-400">struct</span> <span className="text-yellow-300">Node</span> next;  <span className="text-rose-400">// 💥 ERROR: field has incomplete type</span></p>
                <p>&#125;;</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                The compiler must calculate <code className="text-rose-400 font-mono">sizeof(struct Node)</code> at declaration time. Because <code className="text-slate-300 font-mono">next</code> contains another <code className="text-slate-300 font-mono">struct Node</code>, the size would be $4 + 4 + 4 + \dots = \infty$.
              </p>
            </div>

            {/* Box 2: Legal Self-Referential Pointer */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <span>✅</span> Legal: Pointer Indirection (Fixed Size)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Valid C99 / C11 / C23
                </span>
              </div>
              
              <div className="p-3.5 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 border border-emerald-900/40 space-y-1">
                <span className="text-slate-500">// ✨ Compiles cleanly: Fixed 8-byte pointer</span>
                <p><span className="text-purple-400">typedef struct</span> <span className="text-yellow-300">Node</span> &#123;</p>
                <p className="pl-4"><span className="text-cyan-400">int</span> data;              <span className="text-slate-500">// 4 Bytes</span></p>
                <p className="pl-4 text-emerald-400 font-bold"><span className="text-purple-400">struct</span> <span className="text-yellow-300">Node</span> *next;     <span className="text-emerald-400">// 🎯 EXACTLY 8 Bytes (on 64-bit)</span></p>
                <p>&#125; <span className="text-yellow-300">Node</span>;</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                A pointer does not store the struct itself—it merely holds a <strong>64-bit physical memory address</strong>. The compiler knows all pointers are 8 bytes regardless of the struct contents!
              </p>
            </div>
          </div>

          {/* Deep Insight on Arrow Operator */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <span>🔍</span> What Does the Arrow Operator (<code className="text-cyan-400 font-mono">-&gt;</code>) Actually Do in Hardware?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-sky-400 font-bold">High-Level C Syntax:</div>
                <p className="text-emerald-300">ptr-&gt;data = 42;</p>
                <p className="text-slate-400">// Syntactic sugar for dereference &amp; access:</p>
                <p className="text-amber-300">(*ptr).data = 42;</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-indigo-400 font-bold">Underlying CPU Assembly (x86-64):</div>
                <p className="text-slate-300"><span className="text-purple-400">mov</span> <span className="text-cyan-400">rax</span>, [rbp - 8] <span className="text-slate-500">; Load ptr base address into register</span></p>
                <p className="text-slate-300"><span className="text-purple-400">mov</span> <span className="text-cyan-400">dword ptr</span> [rax + 0], 42 <span className="text-slate-500">; Write 42 at (base + 0 offset)</span></p>
                <p className="text-slate-300"><span className="text-purple-400">mov</span> <span className="text-cyan-400">rdx</span>, [rax + 8] <span className="text-slate-500">; Read next pointer at (base + 8 offset)</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: HARDWARE STRUCT PADDING & ALIGNMENT VISUALIZER */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>📐</span> Interactive Struct Memory Alignment &amp; Padding Inspector
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Explore how CPU Word Alignment injects invisible padding bytes into your struct
                </p>
              </div>

              {/* Architecture Switcher */}
              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setArchMode("64")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    archMode === "64"
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  64-Bit System (x86_64 / ARM64)
                </button>
                <button
                  onClick={() => setArchMode("32")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    archMode === "32"
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  32-Bit System (x86 / ARM32)
                </button>
              </div>
            </div>

            {/* Architecture Metrics Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">DATA MEMBER (int)</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">4 Bytes</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">STRUCT PADDING</span>
                <span className="text-lg font-bold text-amber-400 font-mono">
                  {archMode === "64" ? "4 Bytes (Hole)" : "0 Bytes"}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">NEXT POINTER (*next)</span>
                <span className="text-lg font-bold text-sky-400 font-mono">
                  {archMode === "64" ? "8 Bytes (64-bit)" : "4 Bytes (32-bit)"}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 text-center bg-cyan-950/20">
                <span className="text-[10px] font-mono text-cyan-300 block">TOTAL sizeof(Node)</span>
                <span className="text-lg font-bold text-white font-mono">
                  {archMode === "64" ? "16 Bytes" : "8 Bytes"}
                </span>
              </div>
            </div>

            {/* Byte-by-Byte Visualizer Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>BYTE-LEVEL MEMORY LAYOUT (Offset 0x00 to {archMode === "64" ? "0x0F" : "0x07"}):</span>
                <span>Hover over bytes to inspect hardware role</span>
              </div>

              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 p-4 bg-slate-950 rounded-xl border border-slate-800">
                {Array.from({ length: archMode === "64" ? 16 : 8 }).map((_, byteIdx) => {
                  let isData = byteIdx < 4;
                  let isPadding = archMode === "64" && byteIdx >= 4 && byteIdx < 8;

                  let colorClass = isData
                    ? "bg-cyan-950/80 border-cyan-500/60 text-cyan-300 hover:bg-cyan-900"
                    : isPadding
                    ? "bg-amber-950/60 border-amber-600/50 text-amber-300 hover:bg-amber-900 border-dashed"
                    : "bg-sky-950/80 border-sky-500/60 text-sky-300 hover:bg-sky-900";

                  let label = isData ? `D${byteIdx}` : isPadding ? `PAD` : `P${byteIdx - (archMode === "64" ? 8 : 4)}`;

                  return (
                    <div
                      key={byteIdx}
                      onMouseEnter={() => setHoveredByte(byteIdx)}
                      onMouseLeave={() => setHoveredByte(null)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer ${colorClass} ${
                        hoveredByte === byteIdx ? "scale-110 shadow-lg z-10 brightness-125" : ""
                      }`}
                    >
                      <span className="text-[9px] font-mono text-slate-400">+{byteIdx.toString(16).toUpperCase()}</span>
                      <span className="text-xs font-bold font-mono mt-0.5">{label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Byte Inspector Card */}
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-xs flex items-center gap-3">
                <span className="text-lg">ℹ️</span>
                {hoveredByte === null ? (
                  <span className="text-slate-400">
                    Hover over any memory byte block above to see field mapping and CPU bus alignment rules.
                  </span>
                ) : hoveredByte < 4 ? (
                  <span className="text-cyan-300">
                    Byte +0x0{hoveredByte.toString(16).toUpperCase()}: Member <code className="text-white">int data</code> (stores 32-bit integer payload in two's complement).
                  </span>
                ) : archMode === "64" && hoveredByte < 8 ? (
                  <span className="text-amber-300">
                    Byte +0x0{hoveredByte.toString(16).toUpperCase()}: <strong>COMPILER PADDING HOLE</strong>. Unused 4 bytes inserted so that the 8-byte pointer starts at address multiple of 8 (Offset +0x08).
                  </span>
                ) : (
                  <span className="text-sky-300">
                    Byte +0x{hoveredByte < 16 ? "0" : ""}{hoveredByte.toString(16).toUpperCase()}: Member <code className="text-white">struct Node *next</code> ({archMode === "64" ? "64-bit" : "32-bit"} virtual memory pointer to next node or NULL).
                  </span>
                )}
              </div>
            </div>

            {/* Why Struct Alignment Matters Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div className="space-y-1.5">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>⚡</span> Why Does the CPU Demand 8-Byte Alignment?
                </div>
                <p>
                  Modern 64-bit CPUs fetch memory through a 64-bit (8-byte) wide data bus. An 8-byte pointer starting at an address divisible by 8 is loaded in a <strong>single clock cycle</strong>. If placed at offset +4, it straddles two 8-byte cache boundaries, requiring two read cycles and a bit-shift operation!
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="font-bold text-sky-400 flex items-center gap-1.5">
                  <span>🧪</span> C Struct Packing Optimization (<code className="text-slate-300">#pragma pack</code>)
                </div>
                <p>
                  While you can force zero padding using <code className="text-amber-300 font-mono">__attribute__((packed))</code> or reordering struct members, unaligned pointer access causes severe CPU cycle penalties or hardware bus errors on ARM and RISC-V architectures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: HEAP ALLOCATION & NULL SENTINEL MECHANICS */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
                <span>🧠</span> Dynamic Heap Allocation &amp; NULL Sentinel Defenses
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                malloc() Lifecycles, MMU Virtual Memory Page 0, and Sentinel Invariants
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: malloc lifecycle */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>1️⃣</span> Heap Allocation Lifecycle
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nodes cannot live on the call stack because local stack frames are destroyed upon function return. We request dynamic memory from the OS heap:
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg font-mono text-[11px] text-slate-300 border border-slate-800">
                <span className="text-purple-400">Node</span> *newNode = (<span className="text-purple-400">Node</span>*)<span className="text-cyan-300">malloc</span>(<span className="text-yellow-300">sizeof</span>(<span className="text-purple-400">Node</span>));
              </div>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                <li>Allocates 16 contiguous bytes on heap.</li>
                <li>Returns a <code className="text-cyan-300">void*</code> virtual address.</li>
                <li>Lifetime persists until explicitly freed.</li>
              </ul>
            </div>

            {/* Card 2: NULL check guard */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>2️⃣</span> Mandatory NULL Guard
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If the operating system runs out of physical RAM or heap quota, <code className="text-cyan-300 font-mono">malloc()</code> returns <code className="text-rose-400 font-mono">NULL</code>:
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg font-mono text-[11px] text-slate-300 border border-amber-900/40">
                <span className="text-purple-400">if</span> (newNode == <span className="text-rose-400">NULL</span>) &#123;<br/>
                &nbsp;&nbsp;<span className="text-cyan-300">perror</span>(<span className="text-amber-300">"Heap exhausted"</span>);<br/>
                &nbsp;&nbsp;<span className="text-cyan-300">exit</span>(<span className="text-red-400">EXIT_FAILURE</span>);<br/>
                &#125;
              </div>
              <p className="text-[11px] text-slate-400">
                Dereferencing a NULL return without checking causes an immediate unrecoverable crash!
              </p>
            </div>

            {/* Card 3: MMU Page 0 & SIGSEGV */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>3️⃣</span> Why Dereferencing NULL Crashes
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In modern OS kernels (Linux/Windows/macOS), <strong>Virtual Page 0 (<code className="text-rose-300 font-mono">0x00000000</code>)</strong> is deliberately unmapped.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg text-[11px] text-slate-300 border border-rose-900/40 space-y-1">
                <div className="text-rose-400 font-bold font-mono">MMU Page Fault Trap:</div>
                <p className="text-slate-400 font-sans">
                  The CPU Memory Management Unit detects a read/write to Page 0, raises an interrupt, and the kernel kills the process with <strong className="text-rose-300">SIGSEGV (Signal 11)</strong>.
                </p>
              </div>
              <p className="text-[11px] text-slate-400">
                This prevents accidental corruption of low-memory boot vectors and kernel tables.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: INTERACTIVE HEAP SIMULATOR & STEP VISUALIZER */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive Heap Node Allocator &amp; Pointer Chain Simulator
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Simulate <code className="text-cyan-300">malloc()</code>, watch 64-bit hexadecimal heap addresses link together, and step through pointer traversal
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                  Nodes on Heap: <strong className="text-white">{heapNodes.length}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-sky-400">
                  Allocated Heap: <strong className="text-white">{heapNodes.length * 16} Bytes</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                  Head Pointer: <strong className="text-white">{heapNodes.length > 0 ? heapNodes[0].addr : "NULL"}</strong>
                </div>
              </div>
            </div>

            {/* Interactive Memory Chain Display */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Active Physical Memory Chain (Stack &rarr; Heap Nodes &rarr; Sentinel):</span>
                <span className="text-cyan-400 font-mono text-[11px]">sizeof(struct Node) = 16B</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 p-5 bg-slate-950/90 rounded-2xl border border-slate-800/90 min-h-[140px] overflow-x-auto">
                {/* Stack Head Pointer Register */}
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-indigo-950 to-slate-900 border border-indigo-500/50 shadow-md min-w-[100px]">
                  <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase">STACK (head)</span>
                  <span className="text-xs font-bold font-mono text-white my-1">
                    {heapNodes.length > 0 ? heapNodes[0].addr : "0x0 (NULL)"}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">ptr register</span>
                </div>

                <div className="text-cyan-500 font-bold text-lg select-none">&rarr;</div>

                {/* Heap Nodes */}
                {heapNodes.length === 0 ? (
                  <div className="text-sm font-mono text-slate-500 italic p-4">
                    List is empty (<code className="text-rose-400">head == NULL</code>). Click "Allocate &amp; Insert Head" to create your first heap node!
                  </div>
                ) : (
                  heapNodes.map((node, idx) => {
                    const isTraversingThis = isTraversing && traversalStep === idx;
                    return (
                      <React.Fragment key={node.id}>
                        {/* Node Card */}
                        <div
                          className={`flex flex-col rounded-xl border transition-all duration-300 overflow-hidden shadow-lg min-w-[150px] ${
                            isTraversingThis
                              ? "bg-cyan-950/90 border-cyan-400 shadow-cyan-950/80 scale-105 ring-2 ring-cyan-400"
                              : "bg-slate-900 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          {/* Node Header Address */}
                          <div className="bg-slate-950 px-3 py-1 border-b border-slate-800 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-cyan-400">{node.addr}</span>
                            <span className="text-[9px] font-mono text-slate-400">Node [{idx}]</span>
                          </div>

                          {/* Node Body (Data + Next) */}
                          <div className="p-3 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[10px] font-mono text-slate-400">data (4B):</span>
                              <span className="font-bold text-white text-sm">{node.val}</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
                              <span>next (8B):</span>
                              <span className={node.nextAddr === "NULL" ? "text-rose-400 font-bold" : "text-sky-300"}>
                                {node.nextAddr}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Arrow to next node */}
                        <div className="text-cyan-500 font-bold text-lg select-none">&rarr;</div>
                      </React.Fragment>
                    );
                  })
                )}

                {/* Final NULL Sentinel */}
                <div
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border min-w-[90px] transition-all ${
                    isTraversing && traversalStep >= heapNodes.length
                      ? "bg-rose-950/90 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/80 scale-105 ring-2 ring-rose-400"
                      : "bg-slate-950 border-slate-800 text-slate-500"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">SENTINEL</span>
                  <span className="text-sm font-bold font-mono text-rose-400 my-0.5">NULL</span>
                  <span className="text-[9px] font-mono text-slate-400">0x0 (Page 0)</span>
                </div>
              </div>
            </div>

            {/* Interactive Simulator Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <input
                type="number"
                value={newNodeValue}
                onChange={(e) => setNewNodeValue(e.target.value)}
                placeholder="Value (e.g. 50)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono w-32"
              />
              <button
                onClick={handleInsertHead}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-950 flex items-center gap-1.5"
              >
                <span>➕</span> Insert at Head
              </button>
              <button
                onClick={handleInsertTail}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-sky-950 flex items-center gap-1.5"
              >
                <span>📥</span> Insert at Tail
              </button>
              <button
                onClick={handleDeleteHead}
                className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5"
              >
                <span>🗑️</span> free(head)
              </button>
              <button
                onClick={handleStepTraversal}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all border border-slate-700 flex items-center gap-1.5"
              >
                <span>⏭️</span> Step Traversal (curr = curr-&gt;next)
              </button>
              <button
                onClick={handleResetVisualizer}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs sm:text-sm transition-all border border-slate-800"
              >
                Reset
              </button>
            </div>

            {/* Real-time Hardware Console Log */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-400 flex items-center gap-2.5">
              <span className="text-base">💻</span>
              <span className="leading-relaxed">{allocStatus}</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: INTERACTIVE ANTI-PATTERNS & COMMON C TRAPS */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
                <span>⚠️</span> Defensive Engineering: 5 Common Pointer Pitfalls &amp; Solutions
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Master the edge cases that trigger Segmentation Faults and Silent Memory Leaks in C
              </p>
            </div>
          </div>

          {/* Pitfall Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "incomplete_type", label: "1. Incomplete Type Trap" },
              { id: "use_after_free", label: "2. Use-After-Free & Dangling" },
              { id: "malloc_null", label: "3. Ignored malloc() NULL" },
              { id: "stack_escape", label: "4. Stack Address Escape" },
              { id: "sizeof_pointer", label: "5. sizeof(ptr) Miscalculation" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTrapTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTrapTab === tab.id
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            {activeTrapTab === "incomplete_type" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-rose-400">Pitfall 1: Defining a Struct with Direct Self-Nesting</h3>
                  <span className="text-xs font-mono text-slate-400">Compile-Time Failure</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                    <span className="text-rose-400 font-bold">// 🚫 BUGGY: Infinite Recursive Type Definition</span>
                    <p className="text-slate-400">struct Node &#123;</p>
                    <p className="pl-4 text-slate-400">int data;</p>
                    <p className="pl-4 text-rose-400">struct Node next; // 💥 Error: field has incomplete type</p>
                    <p className="text-slate-400">&#125;;</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/40 space-y-1">
                    <span className="text-emerald-400 font-bold">// ✅ DEFENSIVE FIX: Use Self-Referential Pointer</span>
                    <p className="text-slate-400">struct Node &#123;</p>
                    <p className="pl-4 text-slate-400">int data;</p>
                    <p className="pl-4 text-emerald-400">struct Node *next; // 🎯 8-byte pointer (known size)</p>
                    <p className="text-slate-400">&#125;;</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Why this happens:</strong> The C compiler parses structures sequentially to compute overall byte size. Direct recursion requires infinite bytes. Using a pointer (<code className="text-cyan-300 font-mono">*next</code>) provides a known 64-bit size (8 bytes) so the compiler finishes the type layout cleanly.
                </p>
              </div>
            )}

            {activeTrapTab === "use_after_free" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-rose-400">Pitfall 2: Accessing <code className="font-mono">curr-&gt;next</code> After Calling <code className="font-mono">free(curr)</code></h3>
                  <span className="text-xs font-mono text-slate-400">Undefined Behavior / Heap Corruption</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                    <span className="text-rose-400 font-bold">// 🚫 BUGGY: Use-After-Free Dereference</span>
                    <p className="text-slate-400">while (curr != NULL) &#123;</p>
                    <p className="pl-4 text-rose-400">free(curr);</p>
                    <p className="pl-4 text-rose-400">curr = curr-&gt;next; // 💥 CRASH: Reading deallocated memory!</p>
                    <p className="text-slate-400">&#125;</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/40 space-y-1">
                    <span className="text-emerald-400 font-bold">// ✅ DEFENSIVE FIX: Cache Next Pointer Prior to free()</span>
                    <p className="text-slate-400">while (curr != NULL) &#123;</p>
                    <p className="pl-4 text-emerald-400">Node *temp = curr-&gt;next; // 🎯 Save reference first</p>
                    <p className="pl-4 text-emerald-400">free(curr);</p>
                    <p className="pl-4 text-emerald-400">curr = temp;</p>
                    <p className="text-slate-400">&#125;</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Why this happens:</strong> Once <code className="text-rose-400 font-mono">free(curr)</code> is called, the memory block is reclaimed by the glibc heap free-list, and its bytes may be overwritten immediately. Always store <code className="text-emerald-400 font-mono">curr-&gt;next</code> in a temporary pointer variable before deallocating!
                </p>
              </div>
            )}

            {activeTrapTab === "malloc_null" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-rose-400">Pitfall 3: Dereferencing <code className="font-mono">malloc()</code> Without NULL Validation</h3>
                  <span className="text-xs font-mono text-slate-400">Segmentation Fault on Out-of-Memory</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                    <span className="text-rose-400 font-bold">// 🚫 BUGGY: Blind Assignment to malloc Return</span>
                    <p className="text-slate-400">Node *n = malloc(sizeof(Node));</p>
                    <p className="text-rose-400">n-&gt;data = 10; // 💥 SIGSEGV if n is NULL (0x0)</p>
                    <p className="text-slate-400">n-&gt;next = NULL;</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/40 space-y-1">
                    <span className="text-emerald-400 font-bold">// ✅ DEFENSIVE FIX: Guard Against Allocation Failure</span>
                    <p className="text-slate-400">Node *n = malloc(sizeof(*n));</p>
                    <p className="text-emerald-400">if (!n) &#123;</p>
                    <p className="pl-4 text-emerald-400">fprintf(stderr, "Heap alloc failed!\n");</p>
                    <p className="pl-4 text-emerald-400">exit(EXIT_FAILURE);</p>
                    <p className="text-emerald-400">&#125;</p>
                    <p className="text-slate-400">n-&gt;data = 10; n-&gt;next = NULL;</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Why this happens:</strong> High-reliability embedded, kernel, and backend systems cannot assume allocation always succeeds. Checking for NULL prevents catastrophic silent crashes and allows graceful error recovery.
                </p>
              </div>
            )}

            {activeTrapTab === "stack_escape" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-rose-400">Pitfall 4: Returning a Pointer to a Stack-Allocated Local Struct</h3>
                  <span className="text-xs font-mono text-slate-400">Dangling Stack Pointer / Memory Overwrite</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                    <span className="text-rose-400 font-bold">// 🚫 BUGGY: Returning Local Stack Address</span>
                    <p className="text-slate-400">Node* createNode(int val) &#123;</p>
                    <p className="pl-4 text-rose-400">Node temp; // Stack variable!</p>
                    <p className="pl-4 text-slate-400">temp.data = val; temp.next = NULL;</p>
                    <p className="pl-4 text-rose-400">return &amp;temp; // 💥 Dead address once frame pops!</p>
                    <p className="text-slate-400">&#125;</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/40 space-y-1">
                    <span className="text-emerald-400 font-bold">// ✅ DEFENSIVE FIX: Allocate on Persistent Heap</span>
                    <p className="text-slate-400">Node* createNode(int val) &#123;</p>
                    <p className="pl-4 text-emerald-400">Node *newNode = malloc(sizeof(*newNode));</p>
                    <p className="pl-4 text-slate-400">if (!newNode) return NULL;</p>
                    <p className="pl-4 text-slate-400">newNode-&gt;data = val; newNode-&gt;next = NULL;</p>
                    <p className="pl-4 text-emerald-400">return newNode; // 🎯 Heap lifetime is persistent</p>
                    <p className="text-slate-400">&#125;</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Why this happens:</strong> When a function returns, its stack frame is marked invalid and reused by the next function call. Returning <code className="text-rose-400 font-mono">&amp;temp</code> leaves you holding a dangling pointer to reclaimed stack space!
                </p>
              </div>
            )}

            {activeTrapTab === "sizeof_pointer" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-rose-400">Pitfall 5: Using <code className="font-mono">sizeof(ptr)</code> Instead of <code className="font-mono">sizeof(*ptr)</code></h3>
                  <span className="text-xs font-mono text-slate-400">Buffer Under-Allocation / Heap Overflow</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/40 space-y-1">
                    <span className="text-rose-400 font-bold">// 🚫 BUGGY: Allocates Only 8 Bytes Instead of 16</span>
                    <p className="text-slate-400">Node *ptr = malloc(sizeof(ptr));</p>
                    <p className="text-rose-400">// 💥 sizeof(ptr) is 8 bytes (pointer size),</p>
                    <p className="text-rose-400">// but sizeof(Node) is 16 bytes! Heap overflow!</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/40 space-y-1">
                    <span className="text-emerald-400 font-bold">// ✅ DEFENSIVE FIX: Dereference in sizeof Expression</span>
                    <p className="text-slate-400">Node *ptr = malloc(sizeof(*ptr));</p>
                    <p className="text-emerald-400">// 🎯 sizeof(*ptr) evaluates to sizeof(Node) == 16B</p>
                    <p className="text-slate-400">// Robust even if ptr's type is refactored!</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Industrial Best Practice:</strong> Always write <code className="text-emerald-400 font-mono">malloc(sizeof(*ptr))</code>. It binds the allocated size directly to the pointed-to object type rather than the pointer variable itself, eliminating size mismatch bugs.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: RUNNABLE C CODE DEMO */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                <span>🛠️</span> Runnable Production C Implementation
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Complete node creation, head/tail insertion, search, reversal, and safe deallocation
              </p>
            </div>
          </div>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="linked_list_demo.c" />
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: FAQS */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: PRINTABLE STUDY NOTE */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="DSA Topic Note: Self-Referential Struct Mechanics: Struct padding, heap node allocation via malloc(), and NULL pointer sentinel checks"
          />
        </section>

        {/* ========================================================= */}
        {/* SECTION 11: MENTOR CARD */}
        {/* ========================================================= */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
