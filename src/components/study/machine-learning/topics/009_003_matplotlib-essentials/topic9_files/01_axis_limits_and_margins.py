"""
=============================================================================
TOPIC 9: Setting Axis Limits
Script 01: Precision Limits, Margins & Tight Autoscaling
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Setting Explicit Limits vs Setting Margins")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 4.5))

x = np.linspace(0, 100, 100)
# Model training accuracy converging towards 100%
acc = 100 / (1 + 9 * np.exp(-0.06 * x))

# 1. Without explicit limits: Matplotlib adds 5% default margin padding
ax1.plot(x, acc, color='#0284c7', lw=2.5)
ax1.set_title("1. Default Autoscale (With Auto Margins)", fontweight='bold')
ax1.set_xlabel("Epoch")
ax1.set_ylabel("Accuracy (%)")
ax1.grid(True, linestyle=":", alpha=0.4)

# 2. With strict business limits (e.g. Accuracy fixed 0 to 100, Epochs 0 to 100)
ax2.plot(x, acc, color='#10b981', lw=2.5)
ax2.set_xlim(0, 100)
ax2.set_ylim(0, 105)
ax2.axhline(100, color='#ef4444', linestyle='--', label='100% Ideal Ceiling')
ax2.set_title("2. Explicit Limits: ax.set_xlim(0, 100), set_ylim(0, 105)", fontweight='bold')
ax2.set_xlabel("Epoch")
ax2.set_ylabel("Accuracy (%)")
ax2.legend()
ax2.grid(True, linestyle=":", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ Explicit axis limits and autoscale constraints demonstrated successfully.")
