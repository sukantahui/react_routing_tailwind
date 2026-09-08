"""
=============================================================================
TOPIC 4: Bar Chart with plt.bar()
Script 01: Vertical vs Horizontal Bar Charts & Custom Colors
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Vertical Bar Chart (plt.bar)")

categories = ['Random Forest', 'XGBoost', 'Logistic Reg', 'SVM', 'KNN']
f1_scores = [0.92, 0.95, 0.81, 0.88, 0.79]
colors = ['#38bdf8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 4.5))

# Vertical Bars (ax1)
bars1 = ax1.bar(categories, f1_scores, color=colors, width=0.55, edgecolor='#0f172a', linewidth=1.2)
ax1.set_title("ML Model F1-Scores (Vertical Bar)", fontweight='bold')
ax1.set_ylabel("F1 Score")
ax1.set_ylim(0, 1.1)
ax1.tick_params(axis='x', rotation=25)
ax1.grid(axis='y', linestyle='--', alpha=0.4)

# Modern Matplotlib 3.4+ Direct Labeling
ax1.bar_label(bars1, fmt='%.2f', padding=3, fontweight='bold')

# Horizontal Bars (ax2) - Great for long category labels
bars2 = ax2.barh(categories, f1_scores, color=colors, height=0.55, edgecolor='#0f172a', linewidth=1.2)
ax2.set_title("ML Model F1-Scores (Horizontal Bar)", fontweight='bold')
ax2.set_xlabel("F1 Score")
ax2.set_xlim(0, 1.1)
ax2.grid(axis='x', linestyle='--', alpha=0.4)
ax2.bar_label(bars2, fmt='%.2f', padding=5, fontweight='bold')

plt.tight_layout()
plt.close(fig)

print("✓ Vertical and Horizontal bar charts created with ax.bar_label annotations.")
