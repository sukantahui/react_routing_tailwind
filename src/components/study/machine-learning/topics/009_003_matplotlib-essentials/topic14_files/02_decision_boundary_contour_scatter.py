"""
=============================================================================
TOPIC 14: Worked Example 3: Scatter Plot of Features
Script 02: Decision Boundary Contour Mesh & Data Scatter Overlay
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. 2D Classification Decision Boundary Visualizer")

# Generate synthetic non-linear 2D classification dataset
np.random.seed(42)
x1 = np.random.uniform(-3, 3, 200)
x2 = np.random.uniform(-3, 3, 200)
# Non-linear boundary: circle of radius 1.8
y_labels = (x1**2 + x2**2 < 3.2).astype(int)

# Create 2D Meshgrid for decision contour
xx, yy = np.meshgrid(np.linspace(-3.5, 3.5, 200), np.linspace(-3.5, 3.5, 200))
# Decision function Z
zz = (xx**2 + yy**2 < 3.2).astype(int)

fig, ax = plt.subplots(figsize=(8, 6))

# 1. Background Filled Contour of Decision Region
contour = ax.contourf(xx, yy, zz, levels=1, cmap='coolwarm', alpha=0.3)
ax.contour(xx, yy, zz, levels=[0.5], colors='#ef4444', linewidths=2.5, linestyles='--')

# 2. Overlaid Sample Scatter Points
scatter = ax.scatter(
    x1, x2,
    c=y_labels,
    cmap='coolwarm',
    edgecolors='black',
    s=55,
    alpha=0.9
)

ax.set_title("Non-Linear SVM / Neural Net Circular Decision Boundary", fontweight='bold', pad=12)
ax.set_xlabel("Feature $X_1$")
ax.set_ylabel("Feature $X_2$")
ax.set_aspect('equal')
ax.grid(True, linestyle=":", alpha=0.3)

plt.tight_layout()
plt.close(fig)

print("✓ Decision boundary contourf plot with overlaid data scatter rendered.")
