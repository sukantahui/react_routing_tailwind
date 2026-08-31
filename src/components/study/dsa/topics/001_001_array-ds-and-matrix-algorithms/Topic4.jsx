import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import demoCode from "./topic4_files/safe_dynamic_array_realloc.c?raw";

export default function Topic4() {
  const sectionRefs = useRef([]);

  // Active Simulation Mode: "normal" | "leak" | "dangling" | "neutralized" | "unsafe_realloc" | "safe_realloc"
  const [simMode, setSimMode] = useState("normal");

  // Heap State
  const [heapBuffer, setHeapBuffer] = useState({
    address: 0x3000,
    capacity: 4,
    size: 3,
    data: [10, 20, 30, 0],
    isAllocated: true,
    isLeaked: false,
    isFreed: false,
    isCorrupted: false,
  });

  // Pointer State
  const [pointerAddress, setPointerAddress] = useState(0x3000); // points to 0x3000 or NULL (0x0)
  const [statusMessage, setStatusMessage] = useState(
    "Heap buffer allocated at 0x3000 (16 bytes). Pointer `arr` safely references 0x3000."
  );

  // Intersection Observer for scroll animations
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

  // Actions for Memory Hazard Simulation
  const handleAction = (actionType) => {
    if (actionType === "reset") {
      setSimMode("normal");
      setHeapBuffer({
        address: 0x3000,
        capacity: 4,
        size: 3,
        data: [10, 20, 30, 0],
        isAllocated: true,
        isLeaked: false,
        isFreed: false,
        isCorrupted: false,
      });
      setPointerAddress(0x3000);
      setStatusMessage("Buffer reset. Dynamic array initialized at 0x3000 with capacity = 4.");
    } else if (actionType === "leak") {
      setSimMode("leak");
      setPointerAddress(0x0); // Pointer overwritten or lost without calling free()
      setHeapBuffer((prev) => ({
        ...prev,
        isLeaked: true,
      }));
      setStatusMessage(
        "CRITICAL MEMORY LEAK! `arr` pointer was overwritten or went out of scope without calling free(). 16 bytes remain permanently locked in Heap memory until program exits!"
      );
    } else if (actionType === "free_without_null") {
      setSimMode("dangling");
      setHeapBuffer((prev) => ({
        ...prev,
        isAllocated: false,
        isFreed: true,
        isCorrupted: false,
      }));
      // pointerAddress remains 0x3000! (DANGLING POINTER)
      setStatusMessage(
        "DANGLING POINTER CREATED! `free(arr)` executed, releasing memory back to OS, but `arr` STILL holds address 0x3000! `arr` is now a Dangling Pointer."
      );
    } else if (actionType === "use_after_free") {
      setSimMode("dangling");
      setHeapBuffer((prev) => ({
        ...prev,
        data: [999, 999, 999, 999],
        isCorrupted: true,
      }));
      setStatusMessage(
        "USE-AFTER-FREE BUG (CWE-416)! Attempted write `*arr = 999` through dangling pointer! This corrupts arbitrary heap chunks or causes unpredictable security vulnerabilities!"
      );
    } else if (actionType === "free_with_null") {
      setSimMode("neutralized");
      setHeapBuffer((prev) => ({
        ...prev,
        isAllocated: false,
        isFreed: true,
        isCorrupted: false,
      }));
      setPointerAddress(0x0); // arr = NULL
      setStatusMessage(
        "SAFE POINTER NEUTRALIZATION: `free(arr); arr = NULL;` executed. Pointer neutralized to 0x0. Any accidental dereference will trigger a clean hardware MMU fault instead of silent memory corruption!"
      );
    } else if (actionType === "unsafe_realloc_fail") {
      setSimMode("unsafe_realloc");
      setPointerAddress(0x0); // realloc failed and returned NULL, overwriting arr!
      setHeapBuffer((prev) => ({
        ...prev,
        isLeaked: true,
      }));
      setStatusMessage(
        "FATAL REALLOC TRAP: `arr = realloc(arr, 1000000000);` executed! System ran out of memory, realloc() returned NULL, and directly overwrote `arr`. The original 0x3000 buffer is now an UNRECOVERABLE MEMORY LEAK!"
      );
    } else if (actionType === "safe_realloc_fail") {
      setSimMode("safe_realloc");
      // pointerAddress stays 0x3000 because temp caught the NULL!
      setStatusMessage(
        "SAFE REALLOCATION IDIOM: `int *temp = realloc(arr, 1000000000);` failed and returned NULL. But because we checked `if (temp != NULL)`, our original buffer at 0x3000 is 100% SAFE and intact!"
      );
    }
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

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* SECTION 1: HEADER & METADATA */}
        <header ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Segment 1 · Topic 4</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Memory Leak Prevention, Dangling Pointer Traps &amp; Safe Array Reallocation in C
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deep architectural analysis of dynamic heap memory lifecycle, glibc allocator mechanics, Use-After-Free vulnerabilities (CWE-416), Double-Free corruption (CWE-415), the fatal <code>realloc()</code> overwrite trap, and defensive pointer neutralization.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-104</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 1.5: CORE DEFINITIONS & TAXONOMY OF MEMORY HAZARDS */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/40 border border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            
            {/* Section Title */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl">
                🛡️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300">
                  What Are Dynamic Memory Hazards? (The 4 Fatal Traps in C)
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Formal Definitions, Hardware Root Causes &amp; Industrial Prevention Strategies
                </p>
              </div>
            </div>

            {/* The 4 Core Memory Hazards Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Hazard 1: Memory Leak */}
              <div className="p-5 rounded-3xl bg-slate-950/90 border border-rose-500/30 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-rose-400 flex items-center gap-2">
                    <span>💧</span> 1. Memory Leak (Unreleased Heap RAM)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                    Resource Exhaustion
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Occurs when dynamically allocated heap memory (via <code>malloc/calloc/realloc</code>) loses all pointer references before calling <code>free()</code>. That RAM remains permanently occupied and unusable by the operating system until the process dies.
                </p>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-rose-300">
                  <code>int *p = malloc(100); p = malloc(200); // 100B leaked!</code>
                </div>
              </div>

              {/* Hazard 2: Dangling Pointer & Use-After-Free */}
              <div className="p-5 rounded-3xl bg-slate-950/90 border border-amber-500/30 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <span>🪝</span> 2. Dangling Pointer &amp; Use-After-Free (CWE-416)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                    Security Exploit
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Calling <code>free(ptr)</code> frees the memory chunk, but <b>does not change the pointer variable</b>! <code>ptr</code> still holds the old address. Dereferencing it (Use-After-Free) corrupts newly allocated memory or enables remote code execution exploits.
                </p>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300">
                  <code>free(p); *p = 50; // Use-After-Free Corruption!</code>
                </div>
              </div>

              {/* Hazard 3: Double Free */}
              <div className="p-5 rounded-3xl bg-slate-950/90 border border-purple-500/30 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-purple-400 flex items-center gap-2">
                    <span>💥</span> 3. Double-Free Vulnerability (CWE-415)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                    Heap Metadata Corruption
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Calling <code>free(ptr)</code> twice on the exact same address corrupts the memory allocator's internal free-list bins (e.g. glibc ptmalloc tcache / fastbins), allowing malicious actors to manipulate chunk headers.
                </p>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-purple-300">
                  <code>free(p); free(p); // glibc: double free or corruption!</code>
                </div>
              </div>

              {/* Hazard 4: The realloc Overwrite Trap */}
              <div className="p-5 rounded-3xl bg-slate-950/90 border border-cyan-500/30 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                    <span>⚠️</span> 4. The <code>realloc()</code> Overwrite Trap
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Novice Antipattern
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Writing <code>arr = realloc(arr, new_size);</code> directly overwrites <code>arr</code> with <code>NULL</code> if allocation fails! The old buffer's address is erased forever, creating an instant unrecoverable memory leak.
                </p>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300">
                  <code>int *temp = realloc(arr, sz); if (temp) arr = temp;</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TEACHER'S DESK */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: Physical Mental Model of Dynamic Memory
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Classroom Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> The Hotel Keycard Metaphor
                </h3>
                <p>
                  Think of the <b>Heap</b> as a 5-star hotel with 10,000 rooms, and a <b>Pointer variable</b> as a digital keycard with room number <code>304</code> written on it:
                </p>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                  <li>
                    <b className="text-rose-400">Memory Leak:</b> You walk out of the hotel, throw the keycard in the river, but never check out at the front desk. Room 304 stays reserved forever—nobody else can ever use it!
                  </li>
                  <li>
                    <b className="text-amber-400">Dangling Pointer:</b> You check out at the front desk (<code>free(arr)</code>), but keep a duplicate copy of the keycard in your pocket. The hotel assigns Room 304 to a new guest, but you still unlock the door and mess with their belongings (<b>Use-After-Free Data Corruption!</b>).
                  </li>
                  <li>
                    <b className="text-emerald-400">Pointer Neutralization:</b> Immediately upon checking out, you erase your keycard to blank (<code>arr = NULL;</code>). Now if you accidentally try to swipe it, nothing happens!
                  </li>
                </ul>
              </div>

              {/* Classroom Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Barrackpore Lab Classroom Discussion
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p>
                    <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why does C allow dangling pointers to exist at all? Why doesn't free() automatically set our pointer to NULL?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Because in C, functions receive arguments <b>by value</b>! <code>free(void *ptr)</code> receives a copy of the memory address. It can notify the OS heap manager to release the chunk, but it has no access to the caller's stack frame variable to change it to NULL. That is why YOU, the systems programmer, must write <code>ptr = NULL;</code> right after <code>free(ptr);</code>!"</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Tuhina:</strong> <em>"And what about realloc()? Why is `arr = realloc(arr, new_size);` considered a deadly trap?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Because if the OS is out of memory, realloc() returns NULL. If you assign that directly to `arr`, you erase the ONLY pointer to your existing buffer! Always use a temporary pointer `temp = realloc(...)` first!"</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE MEMORY HAZARD & REALLOCATION STUDIO */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive Memory Hazard &amp; Reallocation Studio
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Live Stack Pointer vs. Heap Buffer State Machine · Simulate Leaks, Dangling Pointers &amp; Safe Realloc
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300">
                  Pointer State: <strong className={pointerAddress === 0x0 ? "text-slate-400" : "text-emerald-300"}>{pointerAddress === 0x0 ? "NULL (0x0)" : `0x${pointerAddress.toString(16).toUpperCase()}`}</strong>
                </span>
                <span className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${
                  heapBuffer.isLeaked
                    ? "bg-rose-950 border-rose-700 text-rose-300 animate-pulse font-bold"
                    : heapBuffer.isFreed
                    ? "bg-slate-950 border-slate-800 text-slate-400"
                    : "bg-emerald-950 border-emerald-700 text-emerald-300 font-bold"
                }`}>
                  Heap Chunk: {heapBuffer.isLeaked ? "LEAKED 💀" : heapBuffer.isFreed ? "FREED (0x0)" : "ALLOCATED (ACTIVE)"}
                </span>
              </div>
            </div>

            {/* Interactive Control Buttons */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Trigger Real-World Scenarios:
              </span>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleAction("reset")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-semibold transition cursor-pointer"
                >
                  🔄 1. Fresh Allocation (`malloc`)
                </button>
                <button
                  onClick={() => handleAction("leak")}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 text-xs font-semibold transition cursor-pointer"
                >
                  💧 2. Simulate Memory Leak (`arr = NULL`)
                </button>
                <button
                  onClick={() => handleAction("free_without_null")}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800/60 text-xs font-semibold transition cursor-pointer"
                >
                  🪝 3. `free(arr)` without `arr = NULL` (Dangling Pointer)
                </button>
                <button
                  onClick={() => handleAction("use_after_free")}
                  disabled={!heapBuffer.isFreed}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 disabled:opacity-40 disabled:cursor-not-allowed text-rose-200 border border-rose-700 text-xs font-semibold transition cursor-pointer"
                >
                  💥 4. Write `*arr = 999` (Use-After-Free)
                </button>
                <button
                  onClick={() => handleAction("free_with_null")}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 text-xs font-semibold transition cursor-pointer"
                >
                  🛡️ 5. Safe Free (`free(arr); arr = NULL;`)
                </button>
                <button
                  onClick={() => handleAction("unsafe_realloc_fail")}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 text-xs font-semibold transition cursor-pointer"
                >
                  🚫 6. Unsafe `arr = realloc(...)` Fail
                </button>
                <button
                  onClick={() => handleAction("safe_realloc_fail")}
                  className="px-3.5 py-1.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 border border-sky-800/60 text-xs font-semibold transition cursor-pointer"
                >
                  ✅ 7. Safe `temp = realloc(...)` Idiom
                </button>
              </div>
            </div>

            {/* Live Status Message Banner */}
            <div className={`p-4 rounded-2xl border font-mono text-xs leading-relaxed transition-all shadow-inner ${
              heapBuffer.isLeaked || heapBuffer.isCorrupted
                ? "bg-rose-950/80 border-rose-500/60 text-rose-200"
                : simMode === "dangling"
                ? "bg-amber-950/80 border-amber-500/60 text-amber-200"
                : "bg-slate-950 border-cyan-500/40 text-cyan-200"
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{heapBuffer.isLeaked || heapBuffer.isCorrupted ? "🚨 HAZARD DETECTED:" : "ℹ️ SYSTEM STATUS:"}</span>
              </div>
              <p>{statusMessage}</p>
            </div>

            {/* STACK VS HEAP DUAL MEMORY VISUALIZATION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Stack Frame Card: Pointer Variable */}
              <div className="lg:col-span-4 bg-slate-950/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                      <span>📦</span>
                      <span>Stack Frame (Local Scope)</span>
                    </h3>
                    <span className="text-[11px] text-slate-400">Pointer Variable <code>int *arr</code></span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    8 Bytes (64-bit)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-center">
                  <div className="text-xs text-slate-400">Variable: <code>int *arr</code></div>
                  
                  <div className={`p-4 rounded-2xl border transition-all text-base font-bold ${
                    pointerAddress === 0x0
                      ? "bg-slate-950 border-slate-800 text-slate-500"
                      : pointerAddress === heapBuffer.address && heapBuffer.isFreed
                      ? "bg-amber-950/80 border-amber-400 text-amber-300 ring-2 ring-amber-400 animate-pulse shadow-lg shadow-amber-950"
                      : "bg-cyan-950/60 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400 shadow-lg shadow-cyan-950"
                  }`}>
                    {pointerAddress === 0x0 ? "NULL (0x00000000)" : `0x${pointerAddress.toString(16).toUpperCase()}`}
                  </div>

                  <div className="text-[11px] text-slate-400 font-sans">
                    {pointerAddress === 0x0
                      ? "Pointer is neutralized to NULL. MMU safe."
                      : pointerAddress === heapBuffer.address && heapBuffer.isFreed
                      ? "⚠️ DANGLING POINTER! Holds address of freed heap memory."
                      : "Valid pointer referencing active Heap allocation."}
                  </div>
                </div>
              </div>

              {/* Heap Space Card: Allocated Buffer */}
              <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                      <span>🧱</span>
                      <span>Heap Memory Space (Dynamic Chunk)</span>
                    </h3>
                    <span className="text-[11px] text-slate-400">Address: 0x{heapBuffer.address.toString(16).toUpperCase()} · Capacity: {heapBuffer.capacity} ints (16B)</span>
                  </div>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                    heapBuffer.isLeaked
                      ? "bg-rose-950 text-rose-300 border-rose-700"
                      : heapBuffer.isFreed
                      ? "bg-slate-900 text-slate-500 border-slate-800"
                      : "bg-emerald-950 text-emerald-300 border-emerald-700"
                  }`}>
                    {heapBuffer.isLeaked ? "Orphaned / Unreachable" : heapBuffer.isFreed ? "Deallocated by OS" : "Active Allocation"}
                  </span>
                </div>

                {/* Heap Memory Cells Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  {heapBuffer.data.map((val, idx) => {
                    const cellAddress = heapBuffer.address + idx * 4;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border transition-all text-center flex flex-col justify-between ${
                          heapBuffer.isLeaked
                            ? "bg-rose-950/50 border-rose-600 text-rose-300 border-dashed"
                            : heapBuffer.isCorrupted
                            ? "bg-rose-900/70 border-rose-400 text-white ring-2 ring-rose-400 animate-pulse"
                            : heapBuffer.isFreed
                            ? "bg-slate-950/60 border-slate-850 text-slate-700"
                            : "bg-slate-900/90 border-cyan-500/50 text-cyan-200 shadow-md shadow-cyan-950/40"
                        }`}
                      >
                        <div className="text-[10px] text-slate-500 font-bold">
                          0x{cellAddress.toString(16).toUpperCase()}
                        </div>
                        <div className="my-2">
                          <div className={`text-lg font-bold ${
                            heapBuffer.isFreed && !heapBuffer.isCorrupted ? "text-slate-700 line-through" : "text-emerald-300"
                          }`}>
                            {val}
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-500 font-sans">
                          arr[{idx}] ({idx * 4}B)
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Invariant Explanation Box */}
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="font-bold text-slate-300 flex items-center gap-1.5">
                    <span>💡</span> Heap Allocator Rule:
                  </div>
                  <p>
                    Heap buffers do not vanish when functions return. They require explicit destruction via <code>free()</code>. If the pointer is lost before calling <code>free()</code>, those bytes remain allocated in RAM until process death.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DEEP TECHNICAL BREAKDOWN & INDUSTRIAL BEST PRACTICES */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📚</span> The 5 Golden Invariants of Heap Memory in C
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Safe Realloc Idiom */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <span>1️⃣</span> The 3-Step <code>realloc()</code> Temporary Pointer Idiom
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Always capture the return value of <code>realloc()</code> into a temporary pointer before assigning it to your master array pointer:
              </p>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400">
                <code>
                  int *temp = (int*)realloc(arr, new_cap * sizeof(int));<br />
                  if (!temp) &#123; /* handle error; arr is SAFE */ &#125;<br />
                  else &#123; arr = temp; capacity = new_cap; &#125;
                </code>
              </div>
            </div>

            {/* Card 2: Pointer Neutralization */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                <span>2️⃣</span> Immediate Pointer Neutralization
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Immediately assign <code>ptr = NULL;</code> after calling <code>free(ptr)</code>. In C:
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside font-mono">
                <li><code>free(NULL)</code> is explicitly guaranteed to be a safe NO-OP.</li>
                <li>Dereferencing NULL triggers a clean, deterministic MMU crash (SIGSEGV at 0x0) instead of silent heap corruption.</li>
              </ul>
            </div>

            {/* Card 3: AddressSanitizer & Valgrind */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>3️⃣</span> Industrial Sanitizers (ASan &amp; Valgrind)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Modern compilers integrate hardware-assisted sanitizers:
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-emerald-300 font-bold block">GCC / Clang AddressSanitizer:</span>
                  <code>gcc -fsanitize=address -g main.c -o app</code>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-sky-300 font-bold block">Valgrind Leak Profiling:</span>
                  <code>valgrind --leak-check=full ./app</code>
                </div>
              </div>
            </div>

            {/* Card 4: RAII & Single Ownership */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                <span>4️⃣</span> Struct Encapsulation &amp; Clear Ownership
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Never pass loose raw pointers across modules without their capacity metadata. Encapsulate dynamic arrays in a dedicated struct with designated constructor and destructor functions:
              </p>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-300">
                <code>
                  typedef struct &#123; int *data; size_t size; size_t capacity; &#125; Vector;<br />
                  Vector* createVector(size_t cap);<br />
                  void freeVector(Vector **v);
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: RUNNABLE C CODE IMPLEMENTATION */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable Production C Implementation: Safe Dynamic Array Reallocation
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="safe_dynamic_array_realloc.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE STUDY NOTE */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10">
          <PlainTextPrint content={noteText} title="DSA Topic Note: Memory Leak Prevention and Dangling Pointer Traps in C" />
        </section>

        {/* SECTION 8: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-7xl mx-auto mb-10">
          <Teacher />
        </section>
      </div>
    </>
  );
}
