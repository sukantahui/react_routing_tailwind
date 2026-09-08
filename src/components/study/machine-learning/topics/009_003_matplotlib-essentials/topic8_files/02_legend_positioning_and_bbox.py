"""
=============================================================================
TOPIC 8: Adding Titles, Labels and Legends
Script 02: Legend Placement & bbox_to_anchor Outside Canvas
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Placing Legends Outside Plot Canvas with bbox_to_anchor")

fig, ax = plt.subplots(figsize=(8, 4.5))

x = np.linspace(0, 10, 100)
colors = ['#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444']

for i, c in enumerate(colors, 1):
    ax.plot(x, np.sin(x + i*0.5) * (1 / i**0.5), color=c, lw=2, label=f'Sensor {i:02d} (Freq {i*2}Hz)')

ax.set_title("Multi-Sensor Real-Time Stream", fontweight='bold')
ax.set_xlabel("Time (seconds)")
ax.set_ylabel("Amplitude (mV)")

# Place legend completely OUTSIDE the axes to the right
# bbox_to_anchor=(x_pos, y_pos) where (1.02, 1) puts it just beyond right border
ax.legend(
    bbox_to_anchor=(1.02, 1),
    loc='upper left',
    borderaxespad=0.,
    frameon=True,
    title="Sensor Nodes",
    title_fontsize=9.5,
    fontsize=8.5
)
ax.grid(True, linestyle="--", alpha=0.3)

# Notice: bbox_inches='tight' is essential when saving figures with external legends!
plt.tight_layout()
plt.close(fig)

print("✓ External legend positioned with bbox_to_anchor=(1.02, 1).")
