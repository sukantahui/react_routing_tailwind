"""
=============================================================================
TOPIC 11: Subplots with plt.subplot()
Script 01: Classic 1-Based Subplot Indexing vs plt.subplots()
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Classic Procedural plt.subplot(nrows, ncols, index)")
print("""
Classic 3-digit shorthand notation:
  • plt.subplot(2, 2, 1) or plt.subplot(221) -> Top-Left (1-indexed)
  • plt.subplot(2, 2, 2) or plt.subplot(222) -> Top-Right
  • plt.subplot(2, 2, 3) or plt.subplot(223) -> Bottom-Left
  • plt.subplot(2, 2, 4) or plt.subplot(224) -> Bottom-Right
""")

fig = plt.figure(figsize=(9, 6))

x = np.linspace(0, 10, 100)

# Subplot 1: Sine
plt.subplot(2, 2, 1)
plt.plot(x, np.sin(x), 'b-')
plt.title("1. Sine Wave")
plt.grid(True, alpha=0.3)

# Subplot 2: Cosine
plt.subplot(2, 2, 2)
plt.plot(x, np.cos(x), 'r--')
plt.title("2. Cosine Wave")
plt.grid(True, alpha=0.3)

# Subplot 3: Exponential Decay
plt.subplot(2, 2, 3)
plt.plot(x, np.exp(-0.3 * x), 'g:')
plt.title("3. Exponential Decay")
plt.grid(True, alpha=0.3)

# Subplot 4: Damped Oscillation
plt.subplot(2, 2, 4)
plt.plot(x, np.exp(-0.2 * x) * np.sin(2 * x), 'm-.')
plt.title("4. Damped Oscillation")
plt.grid(True, alpha=0.3)

fig.suptitle("Classic 2x2 Multi-Panel Visual using plt.subplot()", fontsize=13, fontweight='bold')
plt.tight_layout()
plt.close(fig)

print("✓ 2x2 subplot grid constructed using classic 1-indexed procedural commands.")
