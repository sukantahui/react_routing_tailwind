"""
=============================================================================
TOPIC 6: Scatter Plot with plt.scatter()
Script 01: Multi-Dimensional Mapping (X, Y, Size, Color & Colorbar)
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. 4-Dimensional Feature Visualization in a 2D Canvas")

np.random.seed(42)
n_samples = 150

# Simulating House Price Features:
# X: Square Footage, Y: House Price, Size (s): Number of Bedrooms, Color (c): Distance to City
sqft = np.random.uniform(800, 3500, n_samples)
price = 15 + 0.03 * sqft + np.random.normal(0, 10, n_samples) # Lakh INR
bedrooms = np.random.randint(1, 6, n_samples)
dist_to_city = np.random.uniform(2, 35, n_samples) # Kilometers

fig, ax = plt.subplots(figsize=(9, 5))

# 4D scatter plot: x, y, s (marker area in pt^2), c (numerical colormap)
scatter = ax.scatter(
    sqft,
    price,
    s=bedrooms * 25,             # 3rd dimension: Marker area
    c=dist_to_city,             # 4th dimension: Continuous color
    cmap='viridis_r',           # Reversed viridis (closer to city = brighter)
    alpha=0.8,
    edgecolors='#0f172a',
    linewidth=0.8
)

ax.set_title("Housing Market Feature Exploration (4 Dimensions)", fontsize=12, fontweight='bold')
ax.set_xlabel("Square Footage (sq ft)")
ax.set_ylabel("Property Price (Lakh INR)")
ax.grid(True, linestyle="--", alpha=0.3)

# Add Colorbar for 4th feature
cbar = fig.colorbar(scatter, ax=ax)
cbar.set_label("Distance to Metro Station (km)", rotation=270, labelpad=15)

# Add Marker Size Legend for 3rd feature
for beds in [1, 3, 5]:
    ax.scatter([], [], s=beds*25, c='gray', alpha=0.7, edgecolors='black', label=f'{beds} BHK')
ax.legend(title="Bedrooms", loc="upper left", frameon=True)

plt.tight_layout()
plt.close(fig)

print("✓ 4-Dimensional scatter plot rendered with continuous colorbar and size legend.")
