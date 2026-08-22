// Topic8.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic8_files/topic8_note.txt?raw';

const Topic8 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const sectionRefs = useRef([]);

  // Intersection observer for section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const toggleAnswer = (idx) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const flashcardCategories = [
    {
      category: 'Core Theory & Definitions',
      cards: [
        {
          q: 'What is an Initial Basic Feasible Solution (IBFS)?',
          a: 'An initial non-negative shipping plan (x_ij ≥ 0) that satisfies all supply (∑ x_ij = S_i) and demand (∑ x_ij = D_j) constraints with exactly m + n - 1 basic variables and no cycles.',
        },
        {
          q: 'Why is the number of basic variables in an m × n problem m + n - 1?',
          a: 'Because total supply equals total demand (conservation of flow), creating one redundant constraint. The rank of the constraint matrix is therefore exactly m + n - 1.',
        },
        {
          q: 'What is Degeneracy and how is it resolved in Matrix Minima?',
          a: 'Degeneracy occurs when allocated cells < m + n - 1. It is resolved by allocating an infinitesimal zero (ε) to an independent unallocated cell.',
        },
        {
          q: 'What is the Big-M method for prohibited routes?',
          a: 'Setting the unit freight rate of an impassable link to an arbitrarily large penalty M (e.g. ₹999,999) so that the greedy argmin operator strictly bypasses it.',
        },
      ],
    },
    {
      category: 'Algorithmic Mechanics & Rules',
      cards: [
        {
          q: 'How does Matrix Minima resolve ties between duplicate minimum costs?',
          a: 'By applying the Maximum Allocation Volume rule: max { min(S_i, D_j) }. Moving larger volume at lowest cost locks in maximum immediate rupee savings.',
        },
        {
          q: 'Why does Matrix Minima outperform the North-West Corner Rule?',
          a: 'Matrix Minima is cost-aware (scans the full 2D cost matrix in ₹), whereas NWCR is completely cost-blind and steps mechanically along the top-left diagonal.',
        },
        {
          q: 'Why does line elimination prevent closed loops?',
          a: 'A closed loop requires at least two allocations in every row/column involved. Eliminating the line immediately after its first allocation blocks cycle completion.',
        },
        {
          q: 'What is the physical meaning of a ₹0 dummy allocation?',
          a: 'It indicates that the origin factory retains surplus unconsumed inventory in local storage without incurring any freight transportation costs.',
        },
      ],
    },
    {
      category: 'Industrial Case Studies (Bengal Corridor)',
      cards: [
        {
          q: 'Debangshu Fasteners: What was the total cost and savings over NWCR?',
          a: 'Matrix Minima Cost: ₹470 vs NWCR Cost: ₹670. Immediate savings: ₹200 (29.8% cost reduction).',
        },
        {
          q: 'Mamata FMCG: What was the total cost and savings over NWCR?',
          a: 'Matrix Minima Cost: ₹490 vs NWCR Cost: ₹840. Immediate savings: ₹350 (41.7% cost reduction).',
        },
        {
          q: 'Susmita Oxygen: What was the total cost and savings over NWCR?',
          a: 'Matrix Minima Cost: ₹1,470 vs NWCR Cost: ₹2,030. Immediate savings: ₹560 (27.6% cost reduction).',
        },
        {
          q: 'Abhronila & Mahima Courier: What was the total cost and savings over NWCR?',
          a: 'Matrix Minima Cost: ₹400 vs NWCR Cost: ₹630. Immediate savings: ₹230 (36.5% cost reduction).',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 8
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Short Questions & Viva Mastery Guide
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Rapid-fire conceptual review, viva voce oral examination questions, theoretical definitions, and core quantitative analysis principles.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: Interactive Flashcard Simulator */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Viva Flashcard Deck
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Select a subject category and click on any card to test your conceptual knowledge before revealing the model answer:
            </p>

            {/* Category Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {flashcardCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(idx);
                    setRevealedAnswers({});
                  }}
                  className={clsx(
                    'py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 border text-center',
                    selectedCategory === idx
                      ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300 shadow-md font-bold'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Flashcard List */}
            <div className="flex flex-col space-y-3">
              {flashcardCategories[selectedCategory].cards.map((card, idx) => {
                const isRevealed = revealedAnswers[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleAnswer(idx)}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all duration-200 flex flex-col space-y-2 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-start space-x-2">
                        <span className="text-cyan-400 font-mono">Q{idx + 1}:</span>
                        <span>{card.q}</span>
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 shrink-0">
                        {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                      </span>
                    </div>

                    {isRevealed && (
                      <div className="p-3 bg-cyan-950/30 rounded-lg border border-cyan-900/50 text-xs text-cyan-200 leading-relaxed mt-1">
                        <strong className="text-emerald-400">Model Answer: </strong>
                        {card.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: The 4 Golden Rules */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 4 Golden Rules for Transportation Mastery
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3">
                <span className="text-amber-400 font-bold text-lg font-mono mt-0.5">1</span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Balance the Ledger First</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Always confirm <span className="font-mono text-cyan-300">∑ S_i === ∑ D_j</span>. If unbalanced, add a ₹0 dummy row or column before touching any cost cells.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3">
                <span className="text-teal-400 font-bold text-lg font-mono mt-0.5">2</span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Greedy Scan with Max-Volume Tie-Break</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Find the global minimum cost <span className="font-mono text-cyan-300">{"c_kl = min { c_ij }"}</span>. If tied, pick the cell with larger <span className="font-mono text-cyan-300">{"min(S_i, D_j)"}</span>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3">
                <span className="text-blue-400 font-bold text-lg font-mono mt-0.5">3</span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Atomic Deduction & Line Striking</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Commit <span className="font-mono text-cyan-300">x_kl = min(S_k, D_l)</span>, deduct from both margins, and strike out zeroed lines. Inject <span className="font-mono text-white">ε</span> on simultaneous zeroing.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3">
                <span className="text-emerald-400 font-bold text-lg font-mono mt-0.5">4</span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Basis Verification & Cost Audit</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Verify that total allocated cells equal <span className="font-mono text-cyan-300">m + n - 1</span>, then calculate grand total <span className="font-mono text-emerald-300">Z = ∑ c_ij x_ij</span> in ₹ currency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Hints & Conceptual Prompts */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Pedagogical Hints & Deep Thinking Prompts
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-cyan-400 font-semibold text-sm">🤔 Think about...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Why does a transportation problem with <span className="font-mono text-white">m</span> origins and <span className="font-mono text-white">n</span> destinations have exactly <span className="font-mono text-cyan-300">m + n - 1</span> basic variables? Because one equation is linearly dependent on the rest!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Notice how in every oral examination, professors love to ask about degeneracy. If you answer that degeneracy occurs when allocated cells &lt; m + n - 1 and is fixed by adding ε, you demonstrate deep mastery!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Explain the difference between NWCR, Matrix Minima, and VAM to a friend without using formulas. Explaining it in simple terms solidifies your understanding!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Professional Tips */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Tips & Viva Strategies
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">1. Lead with Economic Rationale</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  In viva exams, always explain <em>why</em> Matrix Minima is chosen (captures lowest freight rates, saves 30–40% over NWCR, reduces MODI pivot cycles) before describing mechanical steps.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Use Real-World Analogies</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Describe the transportation problem as a real supply chain: factories in Barrackpore/Ichapur shipping to retailers in Kolkata/Jadavpur. Professors appreciate industrial context.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. State the Upper Bound Property</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always emphasize that the Matrix Minima starting cost <span className="font-mono text-cyan-300">Z_IBFS</span> provides a mathematically rigorous upper bound on the global optimal cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Pitfalls in Viva & Oral Exams
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Claiming Matrix Minima is an Exact Algorithm</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Matrix Minima is a constructive greedy heuristic. Only MODI or Simplex can guarantee and prove true optimality.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Forgetting the -1 in m + n - 1</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Saying m + n basic variables instead of m + n - 1 is a classic student slip during oral examinations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Confusing Unit Rate with Total Cost</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Mixing up <span className="font-mono text-slate-200">c_ij</span> (₹/unit) with grand total <span className="font-mono text-emerald-300">Z</span> (total ₹ expenditure).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Best Practices & Coding Guidelines
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">1. Clean Modular Structure</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Keep algorithm functions decoupled: `findMinCell()`, `allocate()`, `updateState()`, `computeZ()`.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Comprehensive Error Handling</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Throw meaningful exceptions if input arrays are unbalanced or if degeneracy is detected without an epsilon handler.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Consistent Rupee Formatting</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always use the Indian Rupee symbol (<span className="font-mono text-emerald-300">₹</span>) across all problem sets and UI displays.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                { title: 'Mastered Core Definitions', desc: 'Can clearly define IBFS, BFS, Feasibility, and Basis' },
                { title: 'Memorized Basis Dimension', desc: 'Knows number of basic cells is m + n - 1' },
                { title: 'Understands Degeneracy', desc: 'Knows how and when to inject ε' },
                { title: 'Can Explain Tie-Breaking', desc: 'Knows the max-volume rule' },
                { title: 'Understands Big-M Penalty', desc: 'Knows how prohibited routes are filtered' },
                { title: 'Recalls Benchmark Savings', desc: 'Knows Matrix Minima saves 25–45% over NWCR' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3 hover:bg-slate-800/70 transition-colors"
                >
                  <span className="text-emerald-400 text-base mt-0.5">✅</span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "Congratulations to Debangshu, Susmita, Mamata, Abhronila, and Mahima on completing the entire module on the Matrix Minima Method! Throughout our studies across Kolkata, Barrackpore, Ichapur, and Jadavpur, we have seen how a simple economic heuristic can transform an arbitrary shipping plan into an efficient, near-optimal logistics schedule. Remember: always verify problem balance, apply the max-volume tie-breaking rule, strike out your zero lines cleanly, and confirm that your basic cell count equals m + n - 1. You are now fully prepared to excel in any university examination or quantitative analysis interview!"
            }
          />
        </section>

        {/* Section 9: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Short Questions FAQs"
            questions={questions}
          />
        </section>

        {/* Section 10: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Short Questions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
