import React, { useEffect, useRef, useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/array_demo.c?raw";

const GARBAGE_SAMPLES = [-858993460, 32767, -1073741824, 4199616, -2147483648, 1431655765, -1, 7352];

export default function Topic0() {
  const sectionRefs = useRef([]);

  // Mode Selection: "malloc" | "calloc" | "realloc" | "free"
  const [allocMode, setAllocMode] = useState("malloc");

  // Heap Memory Block State
  const [heapElements, setHeapElements] = useState([
    { val: GARBAGE_SAMPLES[0], isGarbage: true, isInitialized: false },
    { val: GARBAGE_SAMPLES[1], isGarbage: true, isInitialized: false },
    { val: GARBAGE_SAMPLES[2], isGarbage: true, isInitialized: false },
    { val: GARBAGE_SAMPLES[3], isGarbage: true, isInitialized: false },
    { val: GARBAGE_SAMPLES[4], isGarbage: true, isInitialized: false },
  ]);

  const [baseAddress, setBaseAddress] = useState(0x2000);
  const [dataTypeSize, setDataTypeSize] = useState(4); // 4 for int, 8 for double, 1 for char
  const [dataTypeName, setDataTypeName] = useState("int");
  const [activeStep, setActiveStep] = useState(0);
  const [isFreed, setIsFreed] = useState(false);
  const [ptrIsNeutralized, setPtrIsNeutralized] = useState(false); // ptr = NULL
  const [statusMessage, setStatusMessage] = useState(
    "malloc(5 * sizeof(int)) executed: 20 bytes allocated on Heap. Memory contains uninitialized garbage values!"
  );

  // Input States
  const [customVal, setCustomVal] = useState("");
  const [customIdx, setCustomIdx] = useState(0);

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

  // 1. Allocate with malloc
  const handleAllocMalloc = (count = 5) => {
    setIsFreed(false);
    setPtrIsNeutralized(false);
    setAllocMode("malloc");
    const newBlocks = Array.from({ length: count }, (_, i) => ({
      val: GARBAGE_SAMPLES[i % GARBAGE_SAMPLES.length],
      isGarbage: true,
      isInitialized: false,
    }));
    setHeapElements(newBlocks);
    setActiveStep(0);
    setStatusMessage(
      `malloc(${count} * sizeof(${dataTypeName})): Allocated ${count * dataTypeSize} bytes on Heap at 0x${baseAddress.toString(16).toUpperCase()}. WARNING: Bytes are uninitialized (Garbage values)!`
    );
  };

  // 2. Allocate with calloc
  const handleAllocCalloc = (count = 5) => {
    setIsFreed(false);
    setPtrIsNeutralized(false);
    setAllocMode("calloc");
    const newBlocks = Array.from({ length: count }, () => ({
      val: 0,
      isGarbage: false,
      isInitialized: true,
    }));
    setHeapElements(newBlocks);
    setActiveStep(0);
    setStatusMessage(
      `calloc(${count}, sizeof(${dataTypeName})): Allocated ${count * dataTypeSize} bytes on Heap at 0x${baseAddress.toString(16).toUpperCase()}. All ${count * dataTypeSize} bytes are zero-cleared to 0x00!`
    );
  };

  // 3. Reallocate with realloc
  const handleAllocRealloc = (newCount = 7) => {
    if (isFreed) {
      setStatusMessage("Cannot realloc() already freed memory block! Please allocate fresh memory first.");
      return;
    }
    setAllocMode("realloc");
    const currentLen = heapElements.length;
    let newBlocks = [];
    if (newCount > currentLen) {
      newBlocks = [
        ...heapElements,
        ...Array.from({ length: newCount - currentLen }, (_, i) => ({
          val: GARBAGE_SAMPLES[(currentLen + i) % GARBAGE_SAMPLES.length],
          isGarbage: true,
          isInitialized: false,
        })),
      ];
      setStatusMessage(
        `realloc(ptr, ${newCount} * sizeof(${dataTypeName})): Expanded memory from ${currentLen * dataTypeSize}B to ${newCount * dataTypeSize}B. Existing elements preserved, newly allocated slots contain garbage!`
      );
    } else {
      newBlocks = heapElements.slice(0, newCount);
      setStatusMessage(
        `realloc(ptr, ${newCount} * sizeof(${dataTypeName})): Shrunk memory to ${newCount * dataTypeSize}B. Excess trailing memory released to OS.`
      );
    }
    setHeapElements(newBlocks);
  };

  // 4. Populate with sequential values
  const handlePopulateData = () => {
    if (isFreed) {
      setStatusMessage("ERROR: Attempted to write to freed heap memory! Segmentation fault / Heap corruption.");
      return;
    }
    setHeapElements((prev) =>
      prev.map((item, idx) => ({
        val: (idx + 1) * 10 + 5,
        isGarbage: false,
        isInitialized: true,
      }))
    );
    setStatusMessage(`Written valid data into all ${heapElements.length} heap slots via pointer dereference (*(ptr + i) = val).`);
  };

  // 5. Write custom value at index
  const handleWriteAtIndex = () => {
    if (isFreed) {
      setStatusMessage("ERROR: Cannot write to deallocated pointer memory!");
      return;
    }
    const idx = parseInt(customIdx, 10);
    const val = parseInt(customVal, 10);
    if (isNaN(idx) || idx < 0 || idx >= heapElements.length) {
      setStatusMessage(`Index ${customIdx} is out of bounds! Valid indices: 0 to ${heapElements.length - 1}.`);
      return;
    }
    if (isNaN(val)) {
      setStatusMessage("Please enter a valid numeric value.");
      return;
    }
    setHeapElements((prev) =>
      prev.map((item, i) => (i === idx ? { val, isGarbage: false, isInitialized: true } : item))
    );
    setActiveStep(idx);
    setStatusMessage(`Assigned ptr[${idx}] = ${val} (*(ptr + ${idx}) = ${val}) at address 0x${(baseAddress + idx * dataTypeSize).toString(16).toUpperCase()}.`);
    setCustomVal("");
  };

  // 6. Free memory
  const handleFreeMemory = () => {
    if (isFreed) {
      setStatusMessage("WARNING: Double Free detected! Calling free() twice on the same pointer triggers undefined behavior / crash.");
      return;
    }
    setIsFreed(true);
    setAllocMode("free");
    setStatusMessage(
      `free(ptr) executed: Reclaimed ${heapElements.length * dataTypeSize} bytes on Heap. CRITICAL: Pointer 'ptr' is now a DANGLING POINTER pointing to dead memory!`
    );
  };

  // 7. Neutralize pointer
  const handleNeutralizePointer = () => {
    if (!isFreed) {
      setStatusMessage("Please call free(ptr) before setting ptr = NULL to avoid memory leaks.");
      return;
    }
    setPtrIsNeutralized(true);
    setStatusMessage("Defensive Protocol Applied: ptr = NULL; Dangling pointer neutralized! Safe from Use-After-Free.");
  };

  // 8. Step pointer
  const handleStepForward = () => {
    if (heapElements.length === 0) return;
    const nextStep = (activeStep + 1) % heapElements.length;
    setActiveStep(nextStep);
    const targetAddr = baseAddress + nextStep * dataTypeSize;
    setStatusMessage(
      `Pointer Arithmetic: ptr + ${nextStep} → Physical Address 0x${targetAddr.toString(16).toUpperCase()} (Offset +${nextStep * dataTypeSize}B). Dereferenced value = ${heapElements[nextStep]?.val}`
    );
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
        
        {/* SECTION 1: HEADER & METADATA */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Segment 1 · Topic 0</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Contiguous Memory Layout, malloc vs calloc, and Physical Address Calculation
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deep architectural breakdown of Heap Dynamic Allocation (<code>malloc</code> uninitialized raw memory vs <code>calloc</code> zero-cleared memory), pointer arithmetic formulas, reallocation mechanics, and memory safety invariants.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-100</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: FRIENDLY TEACHER'S DESK */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: Physical Memory Intuition &amp; malloc vs calloc
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Classroom Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> The Physical Difference: malloc vs calloc in Silicon Hardware
                </h3>
                <p>
                  Think of requesting memory from the OS like renting apartments in a building:
                </p>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-300 pl-2">
                  <li>
                    <b className="text-amber-300">malloc(n * sizeof(int))</b> is like handing you the keys to an apartment immediately after the previous tenant moved out without cleaning it. The rooms are filled with leftover junk (<b className="text-amber-400">Garbage Values</b>). It is fast because the OS doesn't wipe anything, but reading before writing causes subtle bugs.
                  </li>
                  <li>
                    <b className="text-emerald-300">calloc(n, sizeof(int))</b> sends in a professional cleaning crew that scrubs every single room and sets every single byte to zero (<b className="text-emerald-400">0x00</b>). It is clean, safe, and guarantees zero garbage data.
                  </li>
                </ul>
              </div>

              {/* Classroom Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Barrackpore Lab Classroom Discussion
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p>
                    <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why does <code>malloc()</code> take 1 argument while <code>calloc()</code> takes 2 arguments?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Great observation! <code>malloc(total_bytes)</code> takes the raw total byte count directly (e.g. <code>malloc(5 * 4)</code>). <code>calloc(num_elements, element_size)</code> takes the count and the type size separately so it can check for arithmetic integer multiplication overflow before zero-clearing the heap block."</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Tuhina:</strong> <em>"And what happens if we forget to call <code>free()</code> or forget to set <code>ptr = NULL</code>?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"If you omit <code>free()</code>, you cause a <b>Memory Leak</b> where Heap RAM remains occupied forever until the process terminates. If you call <code>free(ptr)</code> but don't write <code>ptr = NULL;</code>, <code>ptr</code> becomes a <b>Dangling Pointer</b>. Dereferencing it later triggers a devastating Use-After-Free vulnerability!"</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE MEMORY STUDIO (malloc, calloc, realloc, free) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            
            {/* Studio Header & Metrics */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Dynamic Memory Allocation &amp; Address Studio
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Live simulation of Heap allocation (<code>malloc</code> vs <code>calloc</code>), <code>realloc</code>, and pointer address mapping
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                  Mode: <strong className="text-white uppercase">{allocMode}</strong>
                </div>
                <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-sky-300">
                  Size: <strong className="text-white">{heapElements.length} elements ({heapElements.length * dataTypeSize}B)</strong>
                </div>
                <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                  State: <strong className={isFreed ? (ptrIsNeutralized ? "text-slate-400" : "text-rose-400") : "text-emerald-300"}>
                    {isFreed ? (ptrIsNeutralized ? "FREED (ptr=NULL)" : "DANGLING POINTER ⚠️") : "ACTIVE ON HEAP"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Mode Switcher & Primary Triggers */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleAllocMalloc(5)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${
                    allocMode === "malloc" && !isFreed
                      ? "bg-amber-500 text-slate-950 shadow-amber-500/20"
                      : "bg-slate-900 text-amber-300 hover:bg-slate-800 border border-amber-500/30"
                  }`}
                >
                  <span>📦</span>
                  <span>malloc(5 * sizeof({dataTypeName}))</span>
                </button>

                <button
                  onClick={() => handleAllocCalloc(5)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${
                    allocMode === "calloc" && !isFreed
                      ? "bg-emerald-500 text-slate-950 shadow-emerald-500/20"
                      : "bg-slate-900 text-emerald-300 hover:bg-slate-800 border border-emerald-500/30"
                  }`}
                >
                  <span>🧼</span>
                  <span>calloc(5, sizeof({dataTypeName}))</span>
                </button>

                <button
                  onClick={() => handleAllocRealloc(heapElements.length === 5 ? 8 : 5)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${
                    allocMode === "realloc" && !isFreed
                      ? "bg-sky-500 text-slate-950 shadow-sky-500/20"
                      : "bg-slate-900 text-sky-300 hover:bg-slate-800 border border-sky-500/30"
                  }`}
                >
                  <span>🔄</span>
                  <span>realloc({heapElements.length === 5 ? "8" : "5"})</span>
                </button>

                <button
                  onClick={handlePopulateData}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/80 hover:bg-indigo-900/90 text-indigo-300 border border-indigo-700/50 transition cursor-pointer flex items-center gap-1"
                >
                  <span>📝</span>
                  <span>Write Data *(ptr+i)</span>
                </button>
              </div>

              {/* Free & Neutralize Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleFreeMemory}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    isFreed
                      ? "bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed"
                      : "bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700/60 shadow-md shadow-rose-950/50"
                  }`}
                >
                  <span>🧹</span>
                  <span>free(ptr)</span>
                </button>

                {isFreed && !ptrIsNeutralized && (
                  <button
                    onClick={handleNeutralizePointer}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-slate-950 transition cursor-pointer animate-pulse shadow-md shadow-teal-500/30 flex items-center gap-1"
                  >
                    <span>🛡️</span>
                    <span>ptr = NULL;</span>
                  </button>
                )}
              </div>
            </div>

            {/* Memory Block Display */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="uppercase tracking-wider">
                  Physical Heap Memory Layout &amp; Address Calculation:
                </span>
                <span className="font-mono text-cyan-400">
                  Formula: Address = 0x{baseAddress.toString(16).toUpperCase()} + (i * {dataTypeSize})
                </span>
              </div>

              {/* Memory Grid */}
              <div
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-wrap items-center gap-3.5 min-h-[140px] ${
                  isFreed
                    ? "bg-rose-950/20 border-rose-800/40"
                    : allocMode === "malloc"
                    ? "bg-amber-950/15 border-amber-500/30"
                    : "bg-slate-950/90 border-slate-800"
                }`}
              >
                {heapElements.map((item, idx) => {
                  const itemAddress = baseAddress + idx * dataTypeSize;
                  const isFocused = idx === activeStep && !isFreed;

                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className={`flex flex-col items-center justify-between p-3 rounded-2xl border transition-all duration-300 w-32 sm:w-36 ${
                          isFreed
                            ? "bg-slate-950/90 border-rose-900/60 text-slate-500 opacity-60"
                            : isFocused
                            ? "bg-gradient-to-b from-cyan-950 via-slate-900 to-slate-950 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-105"
                            : item.isGarbage
                            ? "bg-slate-900/90 border-amber-500/40 text-amber-200"
                            : "bg-slate-900/90 border-emerald-500/40 text-emerald-200"
                        }`}
                      >
                        {/* Top: Index & Pointer */}
                        <div className="flex items-center justify-between w-full text-[10px] font-mono border-b border-slate-800 pb-1 mb-1">
                          <span className="text-slate-400 font-bold">ptr[{idx}]</span>
                          <span className="text-cyan-400 font-medium">*(ptr+{idx})</span>
                        </div>

                        {/* Middle: Value & State Badge */}
                        <div className="my-1.5 text-center">
                          <div className="text-lg font-mono font-bold tracking-tight">
                            {isFreed ? "—" : item.val}
                          </div>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-sans font-semibold inline-block mt-1 ${
                              isFreed
                                ? "bg-rose-950/60 text-rose-400 border border-rose-800/40"
                                : item.isGarbage
                                ? "bg-amber-950/60 text-amber-300 border border-amber-500/30"
                                : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {isFreed ? "Freed Memory" : item.isGarbage ? "Garbage ⚠️" : "Initialized ✅"}
                          </span>
                        </div>

                        {/* Bottom: Address & Byte Offset */}
                        <div className="w-full pt-1.5 border-t border-slate-800/80 text-center font-mono text-[9.5px]">
                          <div className="text-cyan-300 font-semibold">0x{itemAddress.toString(16).toUpperCase()}</div>
                          <div className="text-slate-500 text-[9px]">Offset: +{idx * dataTypeSize}B</div>
                        </div>
                      </div>

                      {idx < heapElements.length - 1 && (
                        <span className="text-slate-600 font-bold text-xs select-none hidden sm:inline">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Pointer Stepper & Modification Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              
              {/* Left Control: Write Custom Value */}
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Write Value:</span>
                <input
                  type="number"
                  value={customIdx}
                  onChange={(e) => setCustomIdx(e.target.value)}
                  placeholder="Idx"
                  min="0"
                  max={heapElements.length - 1}
                  className="bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-xs text-cyan-300 font-mono w-14 focus:outline-none focus:border-cyan-400"
                />
                <span className="text-slate-500 text-xs font-mono">=</span>
                <input
                  type="number"
                  value={customVal}
                  onChange={(e) => setCustomVal(e.target.value)}
                  placeholder="Value"
                  className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-white font-mono w-20 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleWriteAtIndex}
                  className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md"
                >
                  Assign ptr[i]
                </button>
              </div>

              {/* Right Control: Pointer Step & Base Address */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Type:</span>
                  <select
                    value={dataTypeName}
                    onChange={(e) => {
                      const t = e.target.value;
                      setDataTypeName(t);
                      if (t === "int") setDataTypeSize(4);
                      else if (t === "double") setDataTypeSize(8);
                      else if (t === "char") setDataTypeSize(1);
                    }}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-cyan-300 font-mono focus:outline-none"
                  >
                    <option value="int">int (4B)</option>
                    <option value="double">double (8B)</option>
                    <option value="char">char (1B)</option>
                  </select>
                </div>

                <button
                  onClick={handleStepForward}
                  className="px-3.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>⏭️</span>
                  <span>Step Pointer ptr++</span>
                </button>
              </div>
            </div>

            {/* Real-time Status Log */}
            <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 font-mono text-xs text-cyan-300 flex items-start gap-2.5 shadow-inner">
              <span className="text-base leading-none">💡</span>
              <span className="leading-relaxed">{statusMessage}</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: DEEP TECHNICAL EXPLANATION & ARCHITECTURE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <span>📚</span> Deep Technical Breakdown &amp; Memory Allocation Invariants
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: malloc vs calloc */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>1️⃣</span> malloc vs calloc: Architectural Comparison
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code>malloc(size)</code> allocates raw Heap memory leaving existing bit patterns intact (Garbage values). <code>calloc(num, size)</code> guarantees zero-initialization of every byte via OS-level page zeroing or <code>memset()</code>.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside font-mono">
                <li><strong className="text-amber-300">malloc:</strong> 1 argument (bytes) · High speed · Uninitialized garbage.</li>
                <li><strong className="text-emerald-300">calloc:</strong> 2 arguments (count, size) · Zero-cleared · Overflow protected.</li>
                <li><strong className="text-sky-300">realloc:</strong> Resizes block in-place or relocates &amp; copies data.</li>
              </ul>
            </div>

            {/* Card 2: Pointer Arithmetic Formula */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <span>2️⃣</span> Physical Address Calculation Mechanics
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Because array memory is contiguous, the CPU calculates the physical RAM address in $O(1)$ constant time using a single multiplication and addition instruction:
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300">
                Address(A[i]) = Base_Address + (i * sizeof(type))
              </div>
              <p className="text-xs text-slate-400">
                Incrementing pointer <code>ptr++</code> advances the physical memory address by exactly <code>sizeof(*ptr)</code> bytes (4B for int, 8B for double).
              </p>
            </div>

            {/* Card 3: Memory Safety Protocol */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <span>3️⃣</span> Zero-Leak &amp; Dangling Pointer Safety Protocol
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Dynamic allocation on the Heap creates an explicit ownership contract. If you fail to release memory or mismanage pointers, production systems crash.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                <li><b className="text-rose-300">Memory Leak:</b> Losing the pointer without calling <code>free(ptr)</code>.</li>
                <li><b className="text-amber-300">Dangling Pointer:</b> Retaining pointer address after <code>free(ptr)</code>.</li>
                <li><b className="text-emerald-300">Neutralization:</b> Always write <code>ptr = NULL;</code> immediately after <code>free(ptr)</code>.</li>
              </ul>
            </div>

            {/* Card 4: 2D Matrix Row-Major Order */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                <span>4️⃣</span> 2D Matrix Row-Major Linearization
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hardware RAM is strictly 1-dimensional. In C, multi-dimensional arrays are stored in <b>Row-Major Order</b> where consecutive rows are laid out end-to-end contiguously.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Address(A[i][j]) = Base + ((i * NUM_COLS + j) * sizeof(type))
              </div>
              <p className="text-xs text-slate-400">
                Traversing row-by-row maximizes CPU L1 cache line hits (64B spatial locality).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable Production C Implementation (malloc, calloc, realloc, free)
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="array_demo.c" />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="DSA Topic Note: Contiguous Memory Layout, malloc vs calloc, Pointer Arithmetic and Memory Safety" />
        </section>

        {/* SECTION 8: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
