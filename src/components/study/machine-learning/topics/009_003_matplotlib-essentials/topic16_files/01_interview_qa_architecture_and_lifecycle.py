"""
=============================================================================
TOPIC 16: Short Questions & Interview Preparation
Script 01: Core Architecture, Hierarchy & Memory Lifecycle Q&A
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

# -----------------------------------------------------------------------------
# Question 1: Figure vs Axes vs Axis
# -----------------------------------------------------------------------------
section("Q1: What is the fundamental difference between Figure, Axes, and Axis?")
print("""
• Figure: The top-level window or page canvas that contains everything (subplots,
  super-titles, global colorbars, and legends).
• Axes: The actual plotting region/subplot with its own coordinate system containing
  lines, bars, text, ticks, and titles. (A Figure can contain multiple Axes).
• Axis: The 1D number-line objects (ax.xaxis and ax.yaxis) that manage tick marks,
  grid lines, data limits, and logarithmic/linear scaling.
""")

# -----------------------------------------------------------------------------
# Question 2: Stateful vs Object-Oriented Interface
# -----------------------------------------------------------------------------
section("Q2: Why is the Object-Oriented (OO) style preferred over the pyplot state machine?")
print("""
• Stateful (plt.plot): Implicitly mutates whichever Figure/Axes happens to be active.
  Prone to subtle cross-talk bugs in loops, multi-panel figures, or web backends.
• OO Style (fig, ax = plt.subplots()): Explicitly binds objects to local variable
  handles `fig` and `ax`. Guarantees thread-safety, modular code, and clean multi-subplot
  indexing (axs[row, col]).
""")

# -----------------------------------------------------------------------------
# Question 3: Memory Management & Leaks
# -----------------------------------------------------------------------------
section("Q3: How do you prevent memory leaks when generating thousands of plots in a loop?")
print("""
• In Matplotlib, Figures are held in internal memory cache until explicitly destroyed.
• If `plt.close(fig)` or `plt.close('all')` is omitted inside a loop, Python consumes
  increasing RAM until throwing 'RuntimeWarning: More than 20 figures have been opened'.
• Fix: Always call `plt.close(fig)` immediately after `fig.savefig()`.
""")
