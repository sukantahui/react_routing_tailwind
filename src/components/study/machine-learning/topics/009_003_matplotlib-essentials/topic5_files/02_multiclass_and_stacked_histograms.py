"""
=============================================================================
TOPIC 5: Histogram with plt.hist()
Script 02: Multi-Class Overlays & Stacked Distributions
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Overlaid vs Stacked Histograms for Binary Classification")

np.random.seed(42)
# Credit score feature distribution for Approved vs Rejected loan applicants
approved_scores = np.random.normal(740, 45, 500)
rejected_scores = np.random.normal(630, 55, 400)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 4.5))

# 1. Overlaid with transparency (alpha) and stepfilled histtype
bins = np.linspace(480, 880, 35)

ax1.hist(approved_scores, bins=bins, alpha=0.6, color='#10b981', label='Approved (Class 1)', edgecolor='#065f46')
ax1.hist(rejected_scores, bins=bins, alpha=0.6, color='#ef4444', label='Rejected (Class 0)', edgecolor='#991b1b')
ax1.set_title("1. Overlaid Distributions (Feature Separation)", fontweight='bold')
ax1.set_xlabel("Credit Score")
ax1.set_ylabel("Frequency Count")
ax1.legend()
ax1.grid(True, linestyle=":", alpha=0.4)

# 2. Side-by-side / Stacked multi-array input
ax2.hist(
    [approved_scores, rejected_scores],
    bins=25,
    color=['#10b981', '#ef4444'],
    label=['Approved', 'Rejected'],
    histtype='barstacked',
    edgecolor='#0f172a'
)
ax2.set_title("2. Stacked Class Histograms (Total Volume)", fontweight='bold')
ax2.set_xlabel("Credit Score")
ax2.set_ylabel("Cumulative Volume")
ax2.legend()
ax2.grid(True, linestyle=":", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ Multi-class overlaid and stacked histograms constructed.")
