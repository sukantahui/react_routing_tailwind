"""
=============================================================================
TOPIC 14: Worked Example 3: Scatter Plot of Features
Script 01: Multi-Class 2D Feature Separation (Iris Dataset EDA)
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. 2D Multi-Class Feature Separation (Petal Length vs Width)")

np.random.seed(42)
# Simulating 3 Iris Species (Setosa, Versicolor, Virginica)
n_per_class = 50

# Setosa (Linearly separable, small petals)
setosa_x = np.random.normal(1.5, 0.2, n_per_class)
setosa_y = np.random.normal(0.25, 0.1, n_per_class)

# Versicolor (Medium petals)
versicolor_x = np.random.normal(4.2, 0.4, n_per_class)
versicolor_y = np.random.normal(1.3, 0.2, n_per_class)

# Virginica (Large petals, overlaps slightly with Versicolor)
virginica_x = np.random.normal(5.5, 0.5, n_per_class)
virginica_y = np.random.normal(2.0, 0.3, n_per_class)

fig, ax = plt.subplots(figsize=(9, 5.5))

ax.scatter(setosa_x, setosa_y, color='#10b981', marker='o', s=55, alpha=0.85, edgecolors='black', label='Iris Setosa (Class 0)')
ax.scatter(versicolor_x, versicolor_y, color='#0284c7', marker='s', s=50, alpha=0.85, edgecolors='black', label='Iris Versicolor (Class 1)')
ax.scatter(virginica_x, virginica_y, color='#ec4899', marker='^', s=60, alpha=0.85, edgecolors='black', label='Iris Virginica (Class 2)')

# Add threshold line showing linear separability of Setosa
ax.axvline(2.5, color='#ef4444', linestyle='--', label='Linear Separator (Setosa)')

ax.set_title("Iris Feature Space: Petal Length vs Petal Width", fontsize=12, fontweight='bold', pad=12)
ax.set_xlabel("Petal Length (cm)", fontsize=10)
ax.set_ylabel("Petal Width (cm)", fontsize=10)
ax.legend(loc='upper left', frameon=True, framealpha=0.9)
ax.grid(True, linestyle=":", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ Multi-class 2D feature scatter plot created successfully.")
