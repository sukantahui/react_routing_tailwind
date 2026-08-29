import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import BinaryTreeVisualizer from "../../../../../common/BinaryTreeVisualizer";
import AvlTreeVisualizer from "../../../../../common/AvlTreeVisualizer";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/bst_avl_demo.c?raw";

export default function TreesTopic() {
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
        
        {/* HEADER */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Module 04 · Topic 0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Binary Trees, BST &amp; AVL Self-Balancing Trees in C
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore tree structures, recursive &amp; iterative traversals, Binary Search Tree (BST) operations, and AVL Tree self-balancing rotations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-201</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* FRIENDLY TEACHER EXPLANATION SECTION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/30 border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl shadow-inner">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-purple-300">
                  Teacher's Desk: Understanding Binary Search Trees &amp; AVL Rotations
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui's Friendly Guide to Tree Hierarchies &amp; Balancing
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-purple-400 font-bold flex items-center gap-2 text-base">
                  <span>🌳</span> The Organizational Chart Metaphor
                </h3>
                <p>
                  Think of a Binary Search Tree (BST) like a company organizational hierarchy! The CEO sits at the top (Root). Everyone assigned to the left branch earns less than the CEO, and everyone on the right branch earns more.
                </p>
                <p>
                  Because every decision splits the search space in half (left or right), finding any employee's record takes logarithmic time <strong>O(log n)</strong>!
                </p>
              </div>

              {/* Lab Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Lab Experiment: Tuhina &amp; Abhronila on Tree Skewing
                </h3>
                <div className="space-y-2 text-xs sm:text-sm font-sans border-l-2 border-purple-500/40 pl-4 py-1">
                  <p><strong className="text-purple-400">Tuhina:</strong> <em>"Sir, if I insert keys 10, 20, 30, 40, 50 in sorted order into a BST, what happens?"</em></p>
                  <p><strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Ah! The BST turns into a single straight line leaning right! Its height becomes n, and search degrades to slow O(n)!"</em></p>
                  <p><strong className="text-emerald-400">Abhronila:</strong> <em>"And that's why we use an <strong>AVL Tree</strong> to automatically perform single or double rotations (LL, RR, LR, RL) whenever balance factors exceed 1!"</em></p>
                  <p><strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Spot on, Abhronila! AVL rotations re-balance the tree instantly so search time remains guaranteed O(log n)!"</em></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL CONCEPT EXPOSITION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <span>💡</span> Tree Anatomies &amp; AVL Rotations
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              A Binary Search Tree (BST) ensures every node satisfies the invariant: key(Left Subtree) &lt; key(Root) &lt; key(Right Subtree). An AVL Tree maintains balance factors strictly within <code className="text-cyan-300 font-mono">&#123;-1, 0, +1&#125;</code> using LL, RR, LR, and RL rotations.
            </p>
          </div>
        </section>

        {/* VISUALIZERS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-sky-400 text-center">Binary Tree &amp; BST Visualizer</h3>
            <BinaryTreeVisualizer />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-emerald-400 text-center">AVL Tree Rotations Visualizer</h3>
            <AvlTreeVisualizer />
          </div>
        </section>

        {/* CODE EDITOR DEMO */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🛠️</span> Runnable C BST Code Demo
          </h2>
          <EditableCCodeBlock code={demoCode} initialCode={demoCode} title="bst_mechanics.c" />
        </section>

        {/* FAQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* PRINTABLE NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} title="DSA Module 4 Note: Trees, BST &amp; AVL Balance Mechanics" />
        </section>

        {/* MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
