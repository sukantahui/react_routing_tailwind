"""
=============================================================================
TOPIC 5: Histogram with plt.hist()
Script 03: Cumulative Empirical CDF & Theoretical PDF Overlays
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Histogram with Theoretical Normal PDF & Empirical CDF")

np.random.seed(42)
mu, sigma = 100, 15
data = np.random.normal(mu, sigma, 1000)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 4.5))

# 1. Density histogram with Gaussian Bell Curve Overlay
count, bins, _ = ax1.hist(data, bins=30, density=True, color='#8b5cf6', alpha=0.65, edgecolor='#4c1d95', rwidth=0.9)

# Compute theoretical Gaussian PDF
x_range = np.linspace(bins.min(), bins.max(), 200)
pdf = (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x_range - mu) / sigma) ** 2)

ax1.plot(x_range, pdf, color='#f43f5e', lw=2.5, label=f'Normal PDF (μ={mu}, σ={sigma})')
ax1.set_title("Density Histogram + Theoretical PDF", fontweight='bold')
ax1.set_xlabel("Value")
ax1.set_ylabel("Probability Density")
ax1.legend()
ax1.grid(True, linestyle="--", alpha=0.3)

# 2. Cumulative Distribution Function (CDF)
ax2.hist(data, bins=40, density=True, cumulative=True, histtype='step', color='#06b6d4', lw=2.5, label='Empirical CDF')
ax2.set_title("Cumulative Distribution (cumulative=True)", fontweight='bold')
ax2.set_xlabel("Value")
ax2.set_ylabel("Cumulative Probability P(X ≤ x)")
ax2.set_ylim(0, 1.05)
ax2.axhline(0.5, color='#f59e0b', linestyle=':', label='Median (50th Percentile)')
ax2.legend()
ax2.grid(True, linestyle="--", alpha=0.3)

plt.tight_layout()
plt.close(fig)

print("✓ Successfully rendered PDF overlay and empirical CDF histograms.")
