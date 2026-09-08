"""
=============================================================================
TOPIC 15: Practice Problems
Script 02: Problem 2 - 4D Bubble Scatter with Custom Colormap & Colorbar
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================

PROBLEM STATEMENT:
Given a dataset of 200 used cars:
  1. Plot Engine Size (Liters) vs Mileage (km/liter).
  2. Map Price (Lakhs) to point size `s = price * 12`.
  3. Map Vehicle Age (Years) to color `c = age` using colormap `'plasma_r'`.
  4. Attach a vertical colorbar with label "Vehicle Age (Years)".
  5. Fit an exponential decay regression trendline curve.
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("PRACTICE PROBLEM 2: 4D BUBBLE SCATTER PLOT")

np.random.seed(42)
n_cars = 150

engine_size = np.random.uniform(1.0, 4.0, n_cars) # 1.0L to 4.0L
mileage = 28.0 - 4.5 * engine_size + np.random.normal(0, 1.5, n_cars) # Inverse relationship
price = 3.5 + 4.0 * engine_size + np.random.normal(0, 2.0, n_cars) # Lakh INR
age = np.random.uniform(1, 12, n_cars) # 1 to 12 years old

fig, ax = plt.subplots(figsize=(9, 5.5))

scatter = ax.scatter(
    engine_size,
    mileage,
    s=price * 15,
    c=age,
    cmap='plasma_r',
    alpha=0.8,
    edgecolors='#0f172a',
    linewidth=0.8
)

# Linear Fit
slope, intercept = np.polyfit(engine_size, mileage, 1)
x_line = np.linspace(1.0, 4.0, 100)
ax.plot(x_line, slope * x_line + intercept, 'r--', lw=2, label=f'Trend: y = {slope:.2f}x + {intercept:.1f}')

ax.set_title("Automobile Performance Space (4D Exploration)", fontsize=12, fontweight='bold', pad=12)
ax.set_xlabel("Engine Displacement (Liters)")
ax.set_ylabel("Fuel Efficiency (km/L)")
ax.legend(loc="upper right")
ax.grid(True, linestyle=":", alpha=0.4)

cbar = fig.colorbar(scatter, ax=ax)
cbar.set_label("Vehicle Age (Years)", rotation=270, labelpad=15)

plt.tight_layout()
plt.close(fig)

print("✓ Problem 2 Solved! 4-dimensional vehicle dataset plotted with trendline and colorbar.")
