"""
=============================================================================
TOPIC 8: Adding Titles, Labels and Legends
Script 01: Typography, LaTeX Mathematical Notation & Padding
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. LaTeX Mathematical Notation & Advanced Label Styling")

fig, ax = plt.subplots(figsize=(8, 4.5))

x = np.linspace(-3, 3, 200)
# Normal Gaussian Density formula
gaussian = (1 / np.sqrt(2 * np.pi)) * np.exp(-0.5 * x**2)
# Logistic Sigmoid formula
sigmoid = 1 / (1 + np.exp(-x))

ax.plot(x, gaussian, color='#38bdf8', lw=2.5, label=r'$\mathcal{N}(x; 0, 1) = \frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}}$')
ax.plot(x, sigmoid, color='#f43f5e', lw=2.5, linestyle='--', label=r'$\sigma(x) = \frac{1}{1 + e^{-x}}$')

# High-impact typography with padding
ax.set_title(
    "Mathematical Comparison of Gaussian vs Logistic Sigmoid",
    fontsize=12,
    fontweight='bold',
    color='#0f172a',
    pad=15
)
ax.set_xlabel("Input Space $x \in \mathbb{R}$", fontsize=10, labelpad=10)
ax.set_ylabel("Probability / Output Magnitude", fontsize=10, labelpad=10)

# Multi-column LaTeX Legend
ax.legend(
    loc="upper left",
    fontsize=9.5,
    framealpha=0.9,
    edgecolor='#cbd5e1',
    shadow=True
)
ax.grid(True, linestyle=":", alpha=0.5)

plt.tight_layout()
plt.close(fig)

print("✓ Rendered LaTeX mathematical notations and formatted labels successfully.")
