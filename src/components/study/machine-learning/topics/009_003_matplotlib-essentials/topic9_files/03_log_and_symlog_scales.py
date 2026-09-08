"""
=============================================================================
TOPIC 9: Setting Axis Limits
Script 03: Logarithmic & Symmetrical Log (symlog) Limits
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Standard Log vs Symlog for Negative / Zero Values")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 4.5))

# 1. Standard Logarithmic Scale for Regularization Alpha spanning 8 decades
alphas = np.logspace(-6, 2, 100)
# Ridge/Lasso Coefficients decay
ridge_coefs = 10 / (1 + alphas * 100)

ax1.plot(alphas, ridge_coefs, color='#38bdf8', lw=2.5)
ax1.set_xscale('log')
ax1.set_xlim(1e-6, 1e2)
ax1.set_title("1. Standard Log Scale: ax.set_xscale('log')", fontweight='bold')
ax1.set_xlabel("L2 Regularization Alpha (log scale)")
ax1.set_ylabel("Weight Magnitude")
ax1.grid(True, which="both", linestyle=":", alpha=0.5)

# 2. Symmetrical Log (symlog) - Allows values spanning [-1000 to +1000] including 0!
# Gradient updates that oscillate between positive and negative values
steps = np.arange(100)
gradients = (np.sin(steps * 0.2) * 10 ** (np.random.uniform(-2, 3, 100)))

ax2.plot(steps, gradients, color='#ec4899', lw=1.8, marker='.')
ax2.set_yscale('symlog', linthresh=0.01) # Linear range between -0.01 and +0.01
ax2.set_title("2. Symmetrical Log: ax.set_yscale('symlog', linthresh=0.01)", fontweight='bold')
ax2.set_xlabel("Optimization Step")
ax2.set_ylabel("Gradient (symlog scale)")
ax2.grid(True, which="both", linestyle=":", alpha=0.5)

plt.tight_layout()
plt.close(fig)

print("✓ Log and Symmetrical Log (symlog) scaling demonstrated.")
