"""
=============================================================================
TOPIC 2: Figure and Axes Concept
Script 01: The Visual Anatomy of a Matplotlib Plot
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

# -----------------------------------------------------------------------------
# 1. Deconstructing Figure vs Axes vs Axis
# -----------------------------------------------------------------------------
section("1. Figure vs Axes vs Axis Hierarchy")

# Create Figure and Axes
fig, ax = plt.subplots(figsize=(8, 4))

print(f"Figure Type       : {type(fig)}")
print(f"Axes Type         : {type(ax)}")
print(f"X-Axis Object     : {type(ax.xaxis)}")
print(f"Y-Axis Object     : {type(ax.yaxis)}")
print(f"Spines (Borders)  : {list(ax.spines.keys())}")

# -----------------------------------------------------------------------------
# 2. Manipulating Spines, Ticks, and Grids
# -----------------------------------------------------------------------------
section("2. Fine-Grained Artist Manipulation")

x = np.linspace(-5, 5, 200)
y = np.tanh(x)

ax.plot(x, y, color="#6366f1", lw=2.5, label=r'$\tanh(x)$')

# Spine Customization (Clean ML look: hide top & right spines)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('#94a3b8')
ax.spines['bottom'].set_color('#94a3b8')

# Customizing Ticks & Labels
ax.set_title("Hyperbolic Tangent Activation Anatomy", fontsize=13, fontweight='bold', pad=12)
ax.set_xlabel("Input Feature (x)", fontsize=10, labelpad=8)
ax.set_ylabel("Activation tanh(x)", fontsize=10, labelpad=8)

# Major and Minor Ticks
ax.minorticks_on()
ax.grid(which='major', linestyle='-', linewidth=0.7, alpha=0.6)
ax.grid(which='minor', linestyle=':', linewidth=0.4, alpha=0.3)

ax.legend(frameon=True, facecolor="#1e293b", edgecolor="#475569")

plt.close(fig)
print("✓ Anatomy plot constructed: Spines, Ticks, Major/Minor grids customized successfully.")
