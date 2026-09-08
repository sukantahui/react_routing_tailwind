"""
=============================================================================
TOPIC 6: Scatter Plot with plt.scatter()
Script 03: Big Data Overplotting Solutions: Alpha vs Hexbin
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Tackling Overplotting with 10,000 Data Points")

np.random.seed(42)
n_large = 10000
x = np.random.randn(n_large)
y = 0.6 * x + np.random.randn(n_large) * 0.8

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 4.5))

# 1. High-Density Scatter with Low Alpha Transparency
ax1.scatter(x, y, color='#38bdf8', s=8, alpha=0.15, edgecolors='none')
ax1.set_title("1. Scatter with Low Alpha (alpha=0.15)", fontweight='bold')
ax1.set_xlabel("Feature X")
ax1.set_ylabel("Feature Y")
ax1.grid(True, linestyle=":", alpha=0.3)

# 2. Hexagonal 2D Binning (ax.hexbin) - High performance for large datasets
hb = ax2.hexbin(x, y, gridsize=30, cmap='inferno', mincnt=1)
ax2.set_title("2. 2D Hexagonal Binning (ax.hexbin)", fontweight='bold')
ax2.set_xlabel("Feature X")
ax2.set_ylabel("Feature Y")

cb = fig.colorbar(hb, ax=ax2)
cb.set_label("Sample Density Count in Hexagon", rotation=270, labelpad=15)

plt.tight_layout()
plt.close(fig)

print("✓ Overplotting tackled via alpha transparency and 2D hexagonal binning.")
