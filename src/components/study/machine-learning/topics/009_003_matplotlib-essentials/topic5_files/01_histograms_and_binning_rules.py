"""
=============================================================================
TOPIC 5: Histogram with plt.hist()
Script 01: Binning Strategies, Density Normalization & Custom Edges
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Binning Strategies (Explicit vs Auto / Freedman-Diaconis)")

# Generate synthetic customer ages from Coder & AccoTax Tax filing dataset
np.random.seed(42)
ages = np.concatenate([
    np.random.normal(28, 4, 300),  # Young professionals cohort
    np.random.normal(52, 7, 200)   # Senior taxpayers cohort
])

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 4.5))

# Fixed Integer Bin count with rwidth spacing
counts, bin_edges, patches = ax1.hist(
    ages,
    bins=25,
    color='#38bdf8',
    edgecolor='#0f172a',
    linewidth=1.2,
    rwidth=0.85
)
ax1.set_title("1. Frequency Counts (bins=25)", fontweight='bold')
ax1.set_xlabel("Taxpayer Age (Years)")
ax1.set_ylabel("Count of Taxpayers")
ax1.grid(axis='y', linestyle='--', alpha=0.3)

print(f"Total Observations : {len(ages)}")
print(f"Computed Bin Edges : {np.round(bin_edges[:5], 2)} ...")

# Normalized Probability Density (density=True) with Freedman-Diaconis Rule
density_counts, edges, _ = ax2.hist(
    ages,
    bins='fd', # Freedman-Diaconis robust to outliers
    density=True,
    color='#10b981',
    edgecolor='#0f172a',
    linewidth=1.2,
    alpha=0.85
)
ax2.set_title("2. Probability Density (bins='fd', density=True)", fontweight='bold')
ax2.set_xlabel("Taxpayer Age (Years)")
ax2.set_ylabel("Probability Density")
ax2.grid(axis='y', linestyle='--', alpha=0.3)

# Verify integral under density curve sums to approximately 1.0
bin_widths = np.diff(edges)
total_area = np.sum(density_counts * bin_widths)
print(f"Density Integral (Area) : {total_area:.4f} (Confirmed 1.0)")

plt.tight_layout()
plt.close(fig)

print("✓ Histograms with fixed and automated binning created successfully.")
