"""
=============================================================================
TOPIC 2: Figure and Axes Concept
Script 03: Coordinate Transforms & Precision Text Annotations
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Understanding Coordinate Transform Systems")
print("""
Matplotlib supports 3 primary coordinate spaces for placing text/shapes:
  1. ax.transData    : Data points (e.g., x=4.5, y=98.2)
  2. ax.transAxes    : Fraction of axes (0.0 to 1.0, where (0,0)=bottom-left, (1,1)=top-right)
  3. fig.transFigure : Fraction of entire window canvas (0.0 to 1.0)
""")

fig, ax = plt.subplots(figsize=(7, 4))
x = np.linspace(0, 10, 100)
y = np.exp(-0.3 * x) * np.sin(2 * np.pi * 0.5 * x)

ax.plot(x, y, color="#8b5cf6", lw=2, label="Damped Harmonic Oscillation")

# 1. Annotation using Data coordinates + Arrow
peak_x, peak_y = 0.5, np.exp(-0.3 * 0.5) * np.sin(np.pi * 0.5)
ax.annotate(
    f"First Peak ({peak_x:.1f}, {peak_y:.2f})",
    xy=(peak_x, peak_y),
    xytext=(peak_x + 1.5, peak_y + 0.3),
    arrowprops=dict(facecolor='#f43f5e', shrink=0.05, width=1.5, headwidth=7),
    fontsize=10,
    fontweight='bold',
    color='#f43f5e'
)

# 2. Watermark / Metric Box using Axes Coordinates (Relative 0.0 to 1.0)
ax.text(
    0.95, 0.95,
    "Coder & AccoTax ML Lab\nModel Precision: 98.4%",
    transform=ax.transAxes,
    fontsize=9,
    verticalalignment='top',
    horizontalalignment='right',
    bbox=dict(boxstyle='round,pad=0.5', facecolor='#0f172a', edgecolor='#6366f1', alpha=0.9),
    color='#e2e8f0'
)

ax.set_title("Coordinate Transform Demonstration")
ax.grid(True, alpha=0.3)
plt.close(fig)

print("✓ Annotated chart created using both transData and transAxes coordinate systems.")
