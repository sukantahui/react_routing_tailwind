"""
=============================================================================
TOPIC 11: Subplots with plt.subplot()
Script 03: Inset Zoom Axes (ax.inset_axes & indicate_inset_zoom)
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Magnifying Critical Model Regions with Inset Axes")

fig, ax = plt.subplots(figsize=(8, 4.5))

x = np.linspace(0, 10, 500)
# High-frequency signal with subtle local minimum
loss = np.exp(-0.3 * x) * np.sin(5 * x) + 0.5

ax.plot(x, loss, color='#0284c7', lw=2, label='Global Loss Landscape')
ax.set_title("Loss Landscape with Inset Zoom on Local Minimum", fontweight='bold')
ax.set_xlabel("Parameter Value (w)")
ax.set_ylabel("Loss Function Value")
ax.grid(True, alpha=0.3)

# 1. Create Inset Axes within main plot bounds: [x0, y0, width, height] in normalized axes units
axins = ax.inset_axes([0.5, 0.45, 0.45, 0.45])
axins.plot(x, loss, color='#0284c7', lw=2.5)

# Sub-region coordinates to zoom into
x1, x2, y1, y2 = 2.8, 3.8, 0.05, 0.45
axins.set_xlim(x1, x2)
axins.set_ylim(y1, y2)
axins.grid(True, linestyle=":", alpha=0.6)
axins.set_title("Zoom (Local Min)", fontsize=8, fontweight='bold')

# 2. Draw connecting indicator lines between zoomed region and inset box
ax.indicate_inset_zoom(axins, edgecolor='#ef4444', alpha=0.8)

plt.tight_layout()
plt.close(fig)

print("✓ Inset magnification subplot generated with connecting indicator lines.")
