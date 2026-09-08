"""
=============================================================================
TOPIC 13: Worked Example 2: Histogram of Salary Distribution
Script 02: Hybrid Aligned Boxplot + Histogram GridSpec Dashboard
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Aligned Boxplot + Histogram Outlier Analysis")

np.random.seed(42)
salaries = np.random.lognormal(mean=2.3, sigma=0.6, size=1000) * 1.5
salaries = np.clip(salaries, 3.5, 65.0)

fig = plt.figure(figsize=(9, 6))

# 2-row GridSpec sharing X-axis: Top boxplot (25% height), Bottom histogram (75% height)
gs = fig.add_gridspec(2, 1, height_ratios=[1, 3], hspace=0.05)

# 1. Top Boxplot
ax_box = fig.add_subplot(gs[0])
ax_box.boxplot(
    salaries,
    vert=False,
    patch_artist=True,
    boxprops=dict(facecolor='#6366f1', color='#4338ca'),
    medianprops=dict(color='#f43f5e', lw=2),
    flierprops=dict(marker='o', markerfacecolor='#f43f5e', markersize=4, alpha=0.6)
)
ax_box.tick_params(axis='x', labelbottom=False)
ax_box.set_yticks([])
ax_box.set_title("Aligned Boxplot (Outlier Detection) & Density Histogram", fontweight='bold', pad=12)
ax_box.grid(True, linestyle=":", alpha=0.3)

# 2. Bottom Histogram
ax_hist = fig.add_subplot(gs[1], sharex=ax_box)
ax_hist.hist(salaries, bins=35, color='#0ea5e9', edgecolor='#0f172a', alpha=0.85)
ax_hist.set_xlabel("Annual Salary (Lakh INR)")
ax_hist.set_ylabel("Frequency Count")
ax_hist.grid(True, linestyle=":", alpha=0.3)

plt.close(fig)

print("✓ Aligned Boxplot + Histogram hybrid dashboard constructed.")
