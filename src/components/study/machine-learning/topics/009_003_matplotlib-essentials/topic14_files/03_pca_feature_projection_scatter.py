"""
=============================================================================
TOPIC 14: Worked Example 3: Scatter Plot of Features
Script 03: PCA Dimensionality Reduction Scatter (High-D to 2D)
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Visualizing High-Dimensional Data via PCA Projection")

np.random.seed(42)
n = 150

# Simulating 10-dimensional feature space projected onto 2 Principal Components
pc1_benign = np.random.normal(-2.5, 1.2, n)
pc2_benign = np.random.normal(0.5, 1.0, n)

pc1_malignant = np.random.normal(2.5, 1.5, n)
pc2_malignant = np.random.normal(-0.5, 1.3, n)

fig, ax = plt.subplots(figsize=(9, 5.5))

ax.scatter(pc1_benign, pc2_benign, color='#10b981', s=50, alpha=0.75, edgecolors='black', label='Benign Tumors (Class 0)')
ax.scatter(pc1_malignant, pc2_malignant, color='#f43f5e', s=50, alpha=0.75, edgecolors='black', marker='^', label='Malignant Tumors (Class 1)')

# Annotating Explained Variance
ax.text(
    0.05, 0.92,
    "PCA Projection:\nPC1 Explained Variance: 64.2%\nPC2 Explained Variance: 21.8%\nCumulative Information: 86.0%",
    transform=ax.transAxes,
    fontsize=9,
    bbox=dict(boxstyle='round', facecolor='#0f172a', edgecolor='#64748b')
)

ax.set_title("Breast Cancer Dataset: 30 Features Projected onto 2D PCA Space", fontweight='bold', pad=12)
ax.set_xlabel("Principal Component 1 (64.2% Variance)")
ax.set_ylabel("Principal Component 2 (21.8% Variance)")
ax.set_aspect('equal')
ax.legend(loc='upper right')
ax.grid(True, linestyle=":", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ PCA 2D projection scatter plot with explained variance metadata generated.")
