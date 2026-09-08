"""
=============================================================================
TOPIC 11: Subplots with plt.subplot()
Script 02: Complex GridSpec Layouts (Marginal Distribution Plot)
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Joint Feature Scatter with Marginal Histograms using GridSpec")

np.random.seed(42)
x = np.random.randn(500)
y = 0.5 * x + np.random.randn(500) * 0.8

fig = plt.figure(figsize=(8, 8))

# Define GridSpec layout: 4 rows x 4 cols with custom height/width ratios
gs = fig.add_gridspec(
    4, 4,
    width_ratios=[4, 4, 4, 1.2],
    height_ratios=[1.2, 4, 4, 4],
    wspace=0.1, hspace=0.1
)

# 1. Top Marginal Histogram for Feature X: Spans Row 0, Cols 0 to 2
ax_histx = fig.add_subplot(gs[0, 0:3])
ax_histx.hist(x, bins=30, color='#38bdf8', edgecolor='#0f172a')
ax_histx.tick_params(axis='x', labelbottom=False)
ax_histx.set_ylabel("Counts")
ax_histx.grid(True, linestyle=":", alpha=0.3)

# 2. Main Central 2D Scatter: Spans Rows 1 to 3, Cols 0 to 2
ax_scatter = fig.add_subplot(gs[1:4, 0:3], sharex=ax_histx)
ax_scatter.scatter(x, y, color='#6366f1', alpha=0.6, edgecolors='black', s=25)
ax_scatter.set_xlabel("Feature X")
ax_scatter.set_ylabel("Feature Y")
ax_scatter.grid(True, linestyle=":", alpha=0.3)

# 3. Right Marginal Histogram for Feature Y: Spans Rows 1 to 3, Col 3
ax_histy = fig.add_subplot(gs[1:4, 3], sharey=ax_scatter)
ax_histy.hist(y, bins=30, orientation='horizontal', color='#ec4899', edgecolor='#0f172a')
ax_histy.tick_params(axis='y', labelleft=False)
ax_histy.set_xlabel("Counts")
ax_histy.grid(True, linestyle=":", alpha=0.3)

fig.suptitle("Machine Learning Bivariate Feature Correlation & Marginals", fontsize=12, fontweight='bold', y=0.95)
plt.close(fig)

print("✓ Complex asymmetric layout with marginal distribution plots created via GridSpec.")
