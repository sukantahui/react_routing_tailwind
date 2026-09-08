"""
=============================================================================
TOPIC 8: Adding Titles, Labels and Legends
Script 03: Attaching Multiple Legends to a Single Axes Object
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Adding Multiple Independent Legends with ax.add_artist()")

fig, ax = plt.subplots(figsize=(8, 4.5))

x = np.arange(1, 11)
# Model 1
line1, = ax.plot(x, x**1.2, 'b-', label='ResNet-50 (Architecture)')
line2, = ax.plot(x, x**1.4, 'b--', label='ViT-Base (Architecture)')

# Optimizers
line3, = ax.plot(x, x**1.1, 'r-', label='AdamW (Optimizer)')
line4, = ax.plot(x, x**1.3, 'r:', label='SGD+Momentum (Optimizer)')

# Legend 1: Architectures (Top Left)
first_legend = ax.legend(handles=[line1, line2], loc='upper left', title='Architectures')

# CRITICAL STEP: Add the first legend manually as an Artist to the Axes
# Calling ax.legend() again without this step will overwrite the first legend!
ax.add_artist(first_legend)

# Legend 2: Optimizers (Bottom Right)
ax.legend(handles=[line3, line4], loc='lower right', title='Optimizers')

ax.set_title("Neural Network Convergence with Dual Independent Legends", fontweight='bold')
ax.set_xlabel("Epochs")
ax.set_ylabel("Metric Scaling")
ax.grid(True, linestyle=":", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ Two distinct legends attached to a single Axes using ax.add_artist().")
