================================================================================
CODER & ACCOTAX - MASTER INSTRUCTIONS FOR DSA IN C TUTORIAL GENERATION
Repository: react_routing_tailwind
Subject: Data Structures & Algorithms (C Language Implementation)
Educator: Sukanta Hui (Barrackpore, West Bengal, India)
Target Environment: React 19 + Vite + Tailwind CSS + Monaco Editor + WebAssembly
Special Features: Friendly Teacher's Desk, Classroom Lab Dialogues, Pointer Mechanics,
                  Memory Allocator Details, Interactive Visualizers & Printable Notes
================================================================================

CRITICAL DIRECTIVE: ZERO-TOLERANCE FOR GENERIC BOILERPLATE OR PLACEHOLDER FLUFF
--------------------------------------------------------------------------------
Every generated topic MUST be rich, deeply educational, highly specific, and technically rigorous.
NEVER use generic placeholder sentences like "understanding [Topic] is critical for writing robust code...".
Every single paragraph, runtime memory diagram, specification table, C demo script, pitfall comparison,
FAQ question, and plain-text note MUST be 100% tailored to the exact topic, explaining the actual
C memory mechanics, pointer arithmetic, heap allocation invariants, and practical enterprise use cases.


================================================================================
1. DIRECTORY STRUCTURE & FILE NAMING RULES
================================================================================
All topic folders must reside under:
`src/components/study/dsa/topics/`

Folder names MUST strictly match the module slug defined in `dsa-roadmap.json`:
Format: `[3-digit-segment]_[3-digit-module]_[descriptive-kebab-slug]`
Examples:
  * `001_001_array-ds-and-matrix-algorithms`
  * `001_002_linked-list-structures`
  * `001_003_stacks-and-queues`
  * `002_001_trees-bst-avl`
  * `002_002_heaps-and-priority-queues`
  * `002_003_hash-tables-and-hashing`
  * `003_001_graphs-and-graph-algorithms`
  * `003_002_sorting-and-searching-algorithms`
  * `003_003_algorithm-design-paradigms`
  * `004_001_dsa-output-practice-lab`
  * `004_002_dsa-capstone-projects-hub`

For standard topic index `N` (0, 1, 2, ...):
1. Create `Topic[N].jsx` directly inside the module slug folder.
2. Create a subfolder named `topic[N]_files/` containing:
   - `[DescriptiveName]Demo.c` (Runnable, clean, well-commented C code demonstrating operations)
   - `topic[N]_questions.js` (Structured Q&A array with options, answer, and detailed explanation)
   - `topic[N]_note.txt` (Comprehensive ASCII printable study note with complexity tables & memory formulas)

For Output Practice Lab topics (e.g. `004_001_dsa-output-practice-lab`):
1. `Topic[N].jsx` renders `<COutputPracticeTemplateWithFiles data={enhancedData} />`.
2. Subfolder `topic[N]_files/`:
   - `output-questions.json` (Structured JSON catalog of output practice questions)
   - `answers/` folder containing individual solution `.c` files (`D001.c`, `D002.c`, etc.)
   - Dynamically loaded via Vite eager glob: `import.meta.glob("./topic[N]_files/answers/*.c", { query: "?raw", import: "default", eager: true })`

For Capstone Project topics (e.g. `004_002_dsa-capstone-projects-hub`):
1. `Topic[N].jsx` renders `<CProjectAnswerTemplate data={enhancedData} />`.
2. Subfolder `topic[N]_files/`:
   - `dsa-projects-catalog.json` (Structured JSON catalog of real-world projects)
   - `answers/` folder containing individual solution `.c` files (`PROJ001.c`, `PROJ002.c`, etc.)


================================================================================
2. THE 4 MANDATORY CONTENT PILLARS (REQUIRED IN EVERY TOPIC & NOTE)
================================================================================
Every topic generated MUST thoroughly satisfy these 4 technical content pillars:

┌───────────────────────────────────────────────────────────────────────────────┐
│ PILLAR 1: FRIENDLY TEACHER'S DESK & CLASSROOM LAB DISCUSSIONS                 │
├───────────────────────────────────────────────────────────────────────────────┤
│ • Educator Sukanta Hui's intuitive analogies and real-world metaphors.        │
│ • Classroom lab dialogue featuring Barrackpore lab students (Swadeep, Tuhina, │
│   Abhronila, Debangshu) debugging real code and pointer traps.                │
│ • Clear mental models and step-by-step intuition before code syntax.           │
└───────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│ PILLAR 2: TECHNICAL KNOW-HOW & MEMORY MECHANICS (UNDER THE HOOD)             │
├───────────────────────────────────────────────────────────────────────────────┤
│ • Physical memory allocation (Stack vs Heap), struct padding, byte offsets.   │
│ • Pointer arithmetic, pointer indirection, self-referential structs.          │
│ • Big-O Asymptotic analysis (Best, Average, Worst case Time & Space).         │
│ • Visual memory layout diagrams and interactive visualizers.                  │
└───────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│ PILLAR 3: EXCEPTIONS, CORNER CASES & MEMORY SAFETY CHECKLISTS                 │
├───────────────────────────────────────────────────────────────────────────────┤
│ • Segmentation Faults (SIGSEGV), Buffer Overflows, Memory Leaks.              │
│ • Dangling Pointers, Double Free bugs, Stack Overflows/Underflows.            │
│ • Boundary conditions: Empty structures, single-element chains, NULL pointers.│
└───────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│ PILLAR 4: PRACTICAL ENTERPRISE C CODE EXAMPLES                                │
├───────────────────────────────────────────────────────────────────────────────┤
│ • Fully-functional, compilable, real-world C code with memory cleanup (`free`).│
│ • All C code passed to `<EditableCCodeBlock code={demoCode} initialCode={demoCode} />`.│
└───────────────────────────────────────────────────────────────────────────────┘


================================================================================
3. GOLD STANDARD `Topic[N].jsx` CODE BLUEPRINT
================================================================================
```jsx
import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic[N]_files/topic[N]_questions";
import noteText from "./topic[N]_files/topic[N]_note.txt?raw";
import demoCode from "./topic[N]_files/[DescriptiveName]Demo.c?raw";

export default function Topic[N]() {
  const sectionRefs = useRef([]);

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
            <span>DSA Module [ModuleSlug] · Topic [N]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            [Precise Topic Title]
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            [Summary of core mechanics, C memory allocations, and Big-O efficiency.]
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-[NUM]</span>
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
                  Teacher's Desk: [Topic Intuition]
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> Intuitive Metaphor
                </h3>
                <p>[Real world analogy explaining the data structure or algorithm...]</p>
              </div>

              {/* Classroom Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Lab Dialogue
                </h3>
                <div className="space-y-2 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p><strong className="text-emerald-400">Student:</strong> <em>"[Question about pitfall...]"</em></p>
                  <p><strong className="text-cyan-300">Sukanta Sir:</strong> <em>"[Clear explanation with C pointer rule...]"</em></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CODE DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C Code Demo
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="[filename].c" />
        </section>

        {/* SECTION 4: FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 5: PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="DSA Note: [Topic]" />
        </section>

        {/* SECTION 6: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
```

================================================================================
Coder & AccoTax Computer Education Center · Barrackpore, West Bengal, India
================================================================================
