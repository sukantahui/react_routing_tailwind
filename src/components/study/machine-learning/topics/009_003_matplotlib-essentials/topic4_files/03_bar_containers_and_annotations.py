"""
=============================================================================
TOPIC 4: Bar Chart with plt.bar()
Script 03: Feature Importance Bar Chart with Error Bars (yerr/xerr)
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Feature Importance with Standard Deviation Error Bars")

features = ['Age', 'Annual_Income', 'Credit_Score', 'Loan_Amount', 'Debt_Ratio']
importances = np.array([0.12, 0.28, 0.34, 0.16, 0.10])
std_devs    = np.array([0.02, 0.04, 0.05, 0.03, 0.015])

# Sort descending for readable visual hierarchy
indices = np.argsort(importances)

fig, ax = plt.subplots(figsize=(8, 4.5))

bars = ax.barh(
    np.array(features)[indices],
    importances[indices],
    xerr=std_devs[indices],
    color='#0ea5e9',
    capsize=5,
    edgecolor='#0369a1',
    alpha=0.9
)

ax.set_title("Random Forest: Gini Feature Importance (with 5-fold Std Dev)", fontweight='bold')
ax.set_xlabel("Mean Impurity Decrease")
ax.grid(axis='x', linestyle='--', alpha=0.4)
ax.bar_label(bars, fmt='%.2f', padding=8, fontweight='bold', color='#f8fafc')

plt.tight_layout()
plt.close(fig)

print("✓ Feature Importance ranking chart with error bars exported successfully.")
