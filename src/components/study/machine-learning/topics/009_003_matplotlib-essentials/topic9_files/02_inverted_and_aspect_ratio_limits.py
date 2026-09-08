"""
=============================================================================
TOPIC 9: Setting Axis Limits
Script 02: Inverted Axes & Equal Aspect Ratios in ML Geometry
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Equal Aspect Ratio (ax.set_aspect('equal')) for Euclidean Distance")

np.random.seed(42)
# Principal Component Analysis (PCA) 2D Projection
pca1 = np.random.normal(0, 2, 100)
pca2 = np.random.normal(0, 1, 100)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

# 1. Distorted aspect ratio (Default: stretches axes independently)
ax1.scatter(pca1, pca2, color='#8b5cf6', alpha=0.7, edgecolor='black')
# Draw a unit circle to illustrate distortion
theta = np.linspace(0, 2*np.pi, 100)
ax1.plot(np.cos(theta)*2, np.sin(theta)*2, 'r--', label='Circle Radius = 2')
ax1.set_title("1. Default Aspect (Distorted Euclidean Distance)", fontweight='bold')
ax1.set_xlabel("PC 1")
ax1.set_ylabel("PC 2")
ax1.legend()
ax1.grid(True, linestyle=":", alpha=0.4)

# 2. Equal Aspect ratio (Preserves true geometric circularity and distance)
ax2.scatter(pca1, pca2, color='#10b981', alpha=0.7, edgecolor='black')
ax2.plot(np.cos(theta)*2, np.sin(theta)*2, 'r--', label='True Circle Radius = 2')
ax2.set_aspect('equal') # 1 unit in X = 1 unit in Y
ax2.set_title("2. ax.set_aspect('equal') (Geometric Integrity)", fontweight='bold')
ax2.set_xlabel("PC 1")
ax2.set_ylabel("PC 2")
ax2.legend()
ax2.grid(True, linestyle=":", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ Aspect ratio normalization demonstrated for PCA distance preservation.")
