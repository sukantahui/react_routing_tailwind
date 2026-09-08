"""
=============================================================================
TOPIC 0: Introduction to Matplotlib - Architecture & Foundations
Script 01: Matplotlib Three-Layer Architecture & Core Concepts
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import numpy as np
import matplotlib
import matplotlib.pyplot as plt

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

# -----------------------------------------------------------------------------
# 1. Matplotlib Three-Layer Architecture
# -----------------------------------------------------------------------------
section("1. The Three Layers of Matplotlib Architecture")

print(f"Matplotlib Version : {matplotlib.__version__}")
print(f"Current Backend    : {matplotlib.get_backend()}")

print("""
Matplotlib is structured in three hierarchical tiers:
1. Backend Layer (Canvas, Renderer, Event handling):
   - Handles physical rendering to raster/vector formats (PNG, SVG, PDF) or GUI canvases (TkAgg, Qt5Agg, WebAgg).
2. Artist Layer (Figure, Axes, Axis, Text, Line2D, Rectangle):
   - Every visible pixel in Matplotlib belongs to an 'Artist'.
   - Figure holds Axes, Axes holds Line2D / Text / Patches.
3. Scripting Layer (matplotlib.pyplot):
   - Stateful procedural wrapper designed for interactive exploratory analysis.
""")

# -----------------------------------------------------------------------------
# 2. Stateful Pyplot Interface vs Object-Oriented (OO) Interface
# -----------------------------------------------------------------------------
section("2. Stateful (pyplot) vs Object-Oriented (OO) Paradigm")

# A. Stateful Pyplot style (MATLAB-like, tracks active figure/axes implicitly)
plt.figure(figsize=(6, 3))
plt.plot([1, 2, 3, 4], [10, 25, 20, 35], 'b-o', label="Stateful Sales")
plt.title("Stateful pyplot Style (Implicit Active Axes)")
plt.xlabel("Quarter")
plt.ylabel("Revenue (Lakh INR)")
plt.legend()
plt.close() # Close memory buffer
print("✓ Stateful pyplot code executed: tracks plt.gca() and plt.gcf() under the hood.")

# B. Object-Oriented (OO) style (Recommended for production, explicit handles)
fig, ax = plt.subplots(figsize=(6, 3))
ax.plot([1, 2, 3, 4], [10, 25, 20, 35], color="#0284c7", marker="s", label="OO Sales")
ax.set_title("Object-Oriented Style (Explicit Figure & Axes Handles)")
ax.set_xlabel("Quarter")
ax.set_ylabel("Revenue (Lakh INR)")
ax.legend()
plt.close(fig)
print("✓ OO style code executed: explicitly manipulates `fig` and `ax` objects.")

# -----------------------------------------------------------------------------
# 3. Comparing the Approaches for ML Workflows
# -----------------------------------------------------------------------------
section("3. Why OO Style is Preferred in Machine Learning")
print("""
• In ML dashboards & subplots, OO style prevents subtle bugs caused by the state machine
  accidentally drawing on the wrong figure or subplot.
• OO allows fine-grained control over tick locators, formatters, spines, and dual axes.
""")
