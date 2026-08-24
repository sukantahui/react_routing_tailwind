import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import classInstantiation from "./topic1_files/class_definition_and_instantiation.py?raw";
import objectLifecycle from "./topic1_files/object_lifecycle_and_memory_model.py?raw";
import namespacesAndDict from "./topic1_files/object_namespaces_and_dict.py?raw";
import fleetSystem from "./topic1_files/vehicle_fleet_management_system.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Classes, Instances & Objects: syntax and lifecycle
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("memory");

  // Interactive Object Instantiation State
  const [instances, setInstances] = useState([
    { id: "0x7fa28c045b10", name: "Abhishek Karmakar", course: "Python Full-Stack", status: "ACTIVE" },
    { id: "0x7fa28c045b98", name: "Debolina Mukherjee", course: "Data Analytics", status: "ACTIVE" },
  ]);
  const [studentName, setStudentName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Python Pro Full-Stack");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleCreateInstance = () => {
    if (!studentName.trim()) return;
    const randomHex = "0x" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0") + "a0";
    const newInst = {
      id: randomHex,
      name: studentName.trim(),
      course: selectedCourse,
      status: "ACTIVE",
    };
    setInstances((prev) => [...prev, newInst]);
    setStudentName("");
  };

  const handleDeleteInstance = (hexId) => {
    setInstances((prev) => prev.filter((i) => i.id !== hexId));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 3 • Module 003_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Classes, Instances &amp; Objects: <span className="text-teal-400">Syntax</span> &amp; <span className="text-cyan-400">Lifecycle</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the mechanics of class declarations, living heap instances, memory identity (<code className="text-teal-300 font-mono">id()</code> and <code className="text-cyan-300 font-mono">is</code>), the 4 stages of CPython's object lifecycle (<code className="text-emerald-300 font-mono">__new__</code> $\rightarrow$ <code className="text-teal-300 font-mono">__init__</code> $\rightarrow$ <code className="text-purple-300 font-mono">__del__</code>), and object namespaces (<code className="text-amber-300 font-mono">__dict__</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Class Blueprint vs Living Instances
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💾 Heap Memory Identity (id &amp; is)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 4-Stage Lifecycle (__new__ / __init__ / __del__)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🗂️ Namespace Resolution (__dict__)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: BLUEPRINTS & LIVING INSTANCES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏗️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Class Blueprint vs Heap Memory Instances
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, a <strong>Class</strong> is an abstract blueprint written in code. An <strong>Instance (Object)</strong> is a concrete entity created in physical heap memory with its own unique memory address:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Class Declaration</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">class Student: pass</code>
                <p className="text-[11px] text-slate-300">
                  Stored once in memory containing shared class variables and methods.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Instantiation Callable</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">s1 = Student()</code>
                <p className="text-[11px] text-slate-300">
                  Invokes <code className="text-cyan-300">__new__</code> and <code className="text-cyan-300">__init__</code> to allocate a new heap structure.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Unique Memory ID</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">hex(id(s1)) → 0x7fa2...</code>
                <p className="text-[11px] text-slate-300">
                  Every instance gets its own isolated <code className="text-purple-300">__dict__</code> attribute table.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Value Equality (`==`) vs Memory Identity (`is`)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The <code className="text-teal-300 font-mono">==</code> operator tests if two objects have equal data. The <code className="text-cyan-300 font-mono">is</code> operator tests if two variables reference the <strong>exact same memory address</strong> (<code className="text-cyan-300 font-mono">id(a) == id(b)</code>).
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Object Lifecycle &amp; Memory Layout
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("memory")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memory"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Memory Layout &amp; Identity
              </button>
              <button
                onClick={() => setActiveInteractiveTab("lifecycle")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lifecycle"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                4-Stage Lifecycle
              </button>
              <button
                onClick={() => setActiveInteractiveTab("lookup")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lookup"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Attribute Lookup Flow
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining memory heap pointers, object construction pipelines, and namespace dictionaries:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "memory" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">HEAP MEMORY ADDRESSES &amp; INSTANCE ISOLATION</text>

                {/* Class Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="240" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Class: Student</text>
                  <text x="20" y="55" fill="#a7f3d0" fontSize="10 font-mono">institute = "Coder &amp; AccoTax"</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="10">• Shared Class Scope</text>
                  <text x="20" y="105" fill="#cbd5e1" fontSize="10">• Holds method code</text>
                  <rect x="20" y="180" width="200" height="40" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="205" fill="#34d399" fontSize="10 font-bold">Single Instance in RAM</text>
                </g>

                {/* Arrows */}
                <g transform="translate(280, 110)">
                  <text x="10" y="0" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>
                  <text x="10" y="80" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>
                </g>

                {/* Instances */}
                <g transform="translate(330, 50)">
                  {/* Instance 1 */}
                  <rect x="0" y="0" width="490" height="105" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="25" fill="#c4b5fd" fontSize="12" fontWeight="bold">s1 (Address: 0x7fa28c045b10)</text>
                  <text x="20" y="50" fill="#cbd5e1" fontSize="11 font-mono">s1.__dict__ = {'{'} 'name': 'Abhishek', 'course': 'Full-Stack' {'}'}</text>
                  <text x="20" y="75" fill="#a7f3d0" fontSize="10">Points back to class via s1.__class__</text>

                  {/* Instance 2 */}
                  <rect x="0" y="130" width="490" height="105" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="155" fill="#a5f3fc" fontSize="12" fontWeight="bold">s2 (Address: 0x7fa28c045b98)</text>
                  <text x="20" y="180" fill="#cbd5e1" fontSize="11 font-mono">s2.__dict__ = {'{'} 'name': 'Debolina', 'course': 'Data Analytics' {'}'}</text>
                  <text x="20" y="205" fill="#38bdf8" fontSize="10">s1 is s2 → FALSE (Distinct Memory Heaps)</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "lifecycle" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">CPYTHON OBJECT LIFECYCLE: 4 STAGES</text>

                {/* 4 Steps */}
                <g transform="translate(30, 60)">
                  {/* Stage 1 */}
                  <rect x="0" y="0" width="180" height="200" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Stage 1: Allocation</text>
                  <text x="15" y="60" fill="#f8fafc" fontSize="11 font-mono">__new__(cls)</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="10">• Allocates memory heap</text>
                  <text x="15" y="110" fill="#cbd5e1" fontSize="10">• Returns raw instance</text>
                  <text x="15" y="140" fill="#34d399" fontSize="10 font-bold">Static Constructor</text>

                  {/* Stage 2 */}
                  <rect x="210" y="0" width="180" height="200" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="225" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">Stage 2: Init</text>
                  <text x="225" y="60" fill="#f8fafc" fontSize="11 font-mono">__init__(self)</text>
                  <text x="225" y="90" fill="#cbd5e1" fontSize="10">• Sets initial state</text>
                  <text x="225" y="110" fill="#cbd5e1" fontSize="10">• self.name = ...</text>
                  <text x="225" y="140" fill="#38bdf8" fontSize="10 font-bold">State Initializer</text>

                  {/* Stage 3 */}
                  <rect x="420" y="0" width="180" height="200" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="435" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Stage 3: Active</text>
                  <text x="435" y="60" fill="#f8fafc" fontSize="11 font-mono">obj.method()</text>
                  <text x="435" y="90" fill="#cbd5e1" fontSize="10">• Method calls</text>
                  <text x="435" y="110" fill="#cbd5e1" fontSize="10">• Refcount tracked</text>
                  <text x="435" y="140" fill="#c084fc" fontSize="10 font-bold">sys.getrefcount</text>

                  {/* Stage 4 */}
                  <rect x="630" y="0" width="180" height="200" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="645" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Stage 4: Destroy</text>
                  <text x="645" y="60" fill="#f8fafc" fontSize="11 font-mono">__del__(self)</text>
                  <text x="645" y="90" fill="#fca5a5" fontSize="10">• Refcount hits 0</text>
                  <text x="645" y="110" fill="#fca5a5" fontSize="10">• Destructor called</text>
                  <text x="645" y="140" fill="#f43f5e" fontSize="10 font-bold">GC Frees Memory</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ATTRIBUTE LOOKUP RESOLUTION ENGINE: obj.attr</text>

                {/* Step 1 */}
                <g transform="translate(30, 60)">
                  <rect x="0" y="0" width="240" height="120" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="25" fill="#99f6e4" fontSize="11 font-bold">Step 1: Check obj.__dict__</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="10 font-mono">if 'attr' in obj.__dict__:</text>
                  <text x="15" y="75" fill="#34d399" fontSize="10 font-bold">  return obj.__dict__['attr']</text>
                  <text x="15" y="100" fill="#a7f3d0" fontSize="9">Instance attribute found!</text>
                </g>

                <g transform="translate(280, 110)">
                  <text x="5" y="10" fill="#38bdf8" fontSize="16" fontWeight="bold">→</text>
                  <text x="-5" y="30" fill="#94a3b8" fontSize="9">If Not Found</text>
                </g>

                {/* Step 2 */}
                <g transform="translate(320, 60)">
                  <rect x="0" y="0" width="240" height="120" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="25" fill="#c4b5fd" fontSize="11 font-bold">Step 2: Check Class.__dict__</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="10 font-mono">if 'attr' in Class.__dict__:</text>
                  <text x="15" y="75" fill="#c084fc" fontSize="10 font-bold">  return Class.__dict__['attr']</text>
                  <text x="15" y="100" fill="#c4b5fd" fontSize="9">Shared class attribute / method</text>
                </g>

                <g transform="translate(570, 110)">
                  <text x="5" y="10" fill="#38bdf8" fontSize="16" fontWeight="bold">→</text>
                  <text x="-5" y="30" fill="#94a3b8" fontSize="9">If Not Found</text>
                </g>

                {/* Step 3 */}
                <g transform="translate(610, 60)">
                  <rect x="0" y="0" width="240" height="120" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="15" y="25" fill="#fda4af" fontSize="11 font-bold">Step 3: Base Classes / Error</text>
                  <text x="15" y="55" fill="#cbd5e1" fontSize="10">• Check Base Classes in MRO</text>
                  <text x="15" y="80" fill="#fca5a5" fontSize="10 font-bold">• Else: raise AttributeError</text>
                  <text x="15" y="100" fill="#fda4af" fontSize="9">'Student' object has no attribute</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE OBJECT INSTANTIATION PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Object Instantiation &amp; Memory Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Instantiate new student objects dynamically to inspect their unique heap memory addresses and isolated <code className="text-teal-300 font-mono">__dict__</code> state:
          </p>

          {/* Creation Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                Student Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Tanushree Das"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-teal-300 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                Course Track
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-cyan-300 font-mono text-sm"
              >
                <option value="Python Pro Full-Stack">Python Pro Full-Stack</option>
                <option value="Data Analytics with Python">Data Analytics with Python</option>
                <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleCreateInstance}
                className="w-full bg-teal-900/80 hover:bg-teal-800 text-teal-200 border border-teal-600 rounded-lg p-2.5 text-sm font-mono font-bold transition-all shadow-md shadow-teal-950"
              >
                + Instantiate Object (s = Student())
              </button>
            </div>
          </div>

          {/* Living Instances Grid */}
          <div className="space-y-3 bg-slate-950 p-6 rounded-xl border border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold mb-2">
              Living Objects in Memory Heap ({instances.length} Active Instances)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {instances.map((inst) => (
                <div key={inst.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-300">
                      ID: {inst.id}
                    </span>
                    <button
                      onClick={() => handleDeleteInstance(inst.id)}
                      className="text-[11px] text-rose-400 hover:text-rose-300 font-mono"
                    >
                      del obj (__del__)
                    </button>
                  </div>
                  <div className="text-sm font-bold text-white">{inst.name}</div>
                  <div className="text-xs text-slate-400">{inst.course}</div>
                  <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-1.5 rounded border border-slate-800">
                    __dict__ = {'{'} 'name': '{inst.name}', 'course': '{inst.course}' {'}'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER LIFECYCLE METHODS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Object Lifecycle &amp; Introspection Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Hook / Function</th>
                  <th className="py-3.5 px-4 font-bold">Role in Lifecycle</th>
                  <th className="py-3.5 px-4 font-bold">Signature</th>
                  <th className="py-3.5 px-4 font-bold">Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">__new__</td>
                  <td className="py-3 px-4">Static constructor; allocates raw memory</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">__new__(cls, *args)</td>
                  <td className="py-3 px-4">Override only for singletons or immutable subclasses</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">__init__</td>
                  <td className="py-3 px-4">State initializer; configures attributes</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">__init__(self, *args)</td>
                  <td className="py-3 px-4">Always declare all expected instance attributes here</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">__del__</td>
                  <td className="py-3 px-4">Destructor; called when refcount reaches 0</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">__del__(self)</td>
                  <td className="py-3 px-4">Use context managers (<code className="text-rose-300">with</code>) instead for guaranteed cleanup</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">isinstance()</td>
                  <td className="py-3 px-4">Checks if object belongs to class/subclass</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">isinstance(obj, Class)</td>
                  <td className="py-3 px-4">Preferred over <code className="text-purple-300">type() is Class</code> for inheritance safety</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">id() / is</td>
                  <td className="py-3 px-4">Tests virtual heap memory identity</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">id(obj) / a is b</td>
                  <td className="py-3 px-4">Use to test singleton identity (e.g. <code className="text-amber-300">x is None</code>)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating class declarations, the 4-stage lifecycle, namespace tables, and physical asset fleet management:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "class_definition_and_instantiation.py",
                code: classInstantiation,
                description: "Class definition syntax, multiple instance creation, id() memory addresses, and type verification.",
              },
              {
                filename: "object_lifecycle_and_memory_model.py",
                code: objectLifecycle,
                description: "Complete object lifecycle walkthrough (__new__ allocation -> __init__ -> refcounting -> __del__ deallocation).",
              },
              {
                filename: "object_namespaces_and_dict.py",
                code: namespacesAndDict,
                description: "Internal __dict__ attribute tables, instance vs class namespaces, and attribute resolution mechanics.",
              },
              {
                filename: "vehicle_fleet_management_system.py",
                code: fleetSystem,
                description: "Commercial logistics vehicle fleet tracker modeling instance lifecycle states (ACTIVE, IN_SERVICE).",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Accidentally Shadowing Class Variables
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">self.total_count += 1</code> inside a method creates a new attribute in <code className="text-rose-300 font-mono">self.__dict__</code> instead of modifying the shared class variable!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Update class variables explicitly: <code className="text-emerald-300">ClassName.total_count += 1</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Relying on `__del__` for Sockets/Files
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                In CPython, circular references can prevent <code className="text-amber-300 font-mono">__del__</code> from firing until process termination, causing resource leaks.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use context managers (<code className="text-emerald-300">with open(...)</code>) for deterministic cleanup.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Adding Ad-Hoc Attributes Outside `__init__`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Assigning new attributes in arbitrary helper methods leads to <code className="text-purple-300 font-mono">AttributeError</code> bugs if methods are called out of order.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Declare and initialize all attributes inside <code className="text-emerald-300">__init__</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Confusing `type() is Class` vs `isinstance()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Checking <code className="text-cyan-300 font-mono">type(s) is Person</code> returns False if <code className="text-cyan-300 font-mono">s</code> is a Student (a subclass of Person), breaking polymorphism.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">isinstance(s, Person)</code> for type validation.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering class declarations, object lifecycle stages, memory identification, and namespace resolution:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with lifecycle diagrams, attribute resolution recipes, and introspection methods:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic1_classes_instances_and_lifecycle_notes.txt"
              title="Print Topic 1 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
