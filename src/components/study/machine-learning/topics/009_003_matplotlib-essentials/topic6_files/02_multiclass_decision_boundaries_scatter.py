"""
=============================================================================
TOPIC 6: Scatter Plot with plt.scatter()
Script 02: Classification Clusters & Regression Trendline Fit
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Linear Regression Trendline Overlay on Scatter Plot")

np.random.seed(42)
experience = np.random.uniform(1, 15, 60)
salary = 3.5 + 1.8 * experience + np.random.normal(0, 2.5, 60) # Lakhs / annum

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 4.5))

# 1. Scatter with Ordinary Least Squares (OLS) Trendline
ax1.scatter(experience, salary, color='#0284c7', edgecolor='#0f172a', s=55, alpha=0.85, label='Actual Candidates')

# Compute Best Fit Line using np.polyfit (degree 1)
slope, intercept = np.polyfit(experience, salary, 1)
x_line = np.linspace(experience.min(), experience.max(), 100)
y_line = slope * x_line + intercept

ax1.plot(x_line, y_line, color='#ef4444', lw=2.5, linestyle='--', label=f'OLS Fit: y = {slope:.2f}x + {intercept:.2f}')
ax1.set_title("Experience vs Salary Regression Fit", fontweight='bold')
ax1.set_xlabel("Years of Experience")
ax1.set_ylabel("Salary (LPA)")
ax1.legend()
ax1.grid(True, linestyle=":", alpha=0.4)

# 2. Multi-Class Clustering (3 Synthetic Customer Segments)
cluster_0 = np.random.randn(50, 2) + np.array([2, 2])
cluster_1 = np.random.randn(50, 2) + np.array([7, 8])
cluster_2 = np.random.randn(50, 2) + np.array([3, 10])

ax2.scatter(cluster_0[:, 0], cluster_0[:, 1], color='#10b981', marker='o', s=50, label='Cohort 0 (Budget)', edgecolor='black')
ax2.scatter(cluster_1[:, 0], cluster_1[:, 1], color='#6366f1', marker='^', s=55, label='Cohort 1 (Premium)', edgecolor='black')
ax2.scatter(cluster_2[:, 0], cluster_2[:, 1], color='#f59e0b', marker='s', s=50, label='Cohort 2 (Tech-Savvy)', edgecolor='black')

ax2.set_title("K-Means 3-Cluster Segmentation Scatter", fontweight='bold')
ax2.set_xlabel("Feature 1 (Spending Score)")
ax2.set_ylabel("Feature 2 (Engagement Frequency)")
ax2.legend()
ax2.grid(True, linestyle=":", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ Trendline regression and 3-class cluster scatter plots constructed.")
