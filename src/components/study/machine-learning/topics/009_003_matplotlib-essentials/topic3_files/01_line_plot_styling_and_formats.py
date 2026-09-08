"""
=============================================================================
TOPIC 3: Line Plot with plt.plot()
Script 01: Line Styling, Colors, Linewidths & Markers
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Format Strings (fmt) vs Explicit Keyword Arguments")
print("""
Format String shortcut: '[marker][line][color]' (e.g. 'ro--', 'b-s', 'g:^')
Explicit Keyword Arguments (Preferred for readability):
  color='#0284c7', linestyle='--', linewidth=2.5,
  marker='o', markersize=8, markerfacecolor='white', markeredgecolor='#0284c7'
""")

x = np.arange(1, 11)
# Polynomial complexity growth simulation in ML algorithms
linear = x * 10
log_linear = x * np.log2(x + 1) * 6
quadratic = (x ** 2)

fig, ax = plt.subplots(figsize=(8, 4.5))

# 1. Solid line with circular markers
ax.plot(x, linear, color='#0284c7', linestyle='-', linewidth=2,
        marker='o', markersize=6, label=r'Linear $O(N)$')

# 2. Dashed line with square markers
ax.plot(x, log_linear, color='#10b981', linestyle='--', linewidth=2.5,
        marker='s', markersize=6, markerfacecolor='#ecfdf5', label=r'Log-Linear $O(N \log N)$')

# 3. Dotted line with triangle markers
ax.plot(x, quadratic, color='#f43f5e', linestyle=':', linewidth=2.5,
        marker='^', markersize=7, label=r'Quadratic $O(N^2)$')

ax.set_title("Algorithm Time Complexity Scaling", fontsize=12, fontweight='bold')
ax.set_xlabel("Input Size (N items in thousands)")
ax.set_ylabel("Execution Time (milliseconds)")
ax.legend(frameon=True, loc="upper left")
ax.grid(True, linestyle="--", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ Multi-line styled chart successfully constructed!")
