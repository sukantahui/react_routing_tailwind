"""
=============================================================================
TOPIC 2: Figure and Axes Concept
Script 02: Multi-Axes Subplot Layouts & Dimension Unpacking
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Unpacking 1D vs 2D Axes Arrays")

# 1D Row of Subplots (1x3)
fig1, axs_1d = plt.subplots(1, 3, figsize=(12, 3))
print(f"1D axs shape: {axs_1d.shape} | Access via axs[0], axs[1], axs[2]")
plt.close(fig1)

# 2D Grid of Subplots (2x2)
fig2, axs_2d = plt.subplots(2, 2, figsize=(8, 6), sharex=True, sharey=True)
print(f"2D axs shape: {axs_2d.shape} | Access via axs[row, col] or axs.flatten()")

x = np.linspace(-3, 3, 100)
activations = {
    "ReLU": np.maximum(0, x),
    "LeakyReLU": np.where(x > 0, x, x * 0.1),
    "Sigmoid": 1 / (1 + np.exp(-x)),
    "ELU": np.where(x > 0, x, np.exp(x) - 1)
}

# Iterating over flattened axes array
for ax, (name, y_vals) in zip(axs_2d.flatten(), activations.items()):
    ax.plot(x, y_vals, color="#0ea5e9", lw=2)
    ax.set_title(f"Func: {name}")
    ax.grid(True, linestyle="--", alpha=0.5)

fig2.suptitle("Deep Learning Activation Functions Multi-Axes Grid", fontsize=14, fontweight='bold')
plt.tight_layout()
plt.close(fig2)

print("✓ Successfully populated 2x2 grid using vectorized axes indexing.")
