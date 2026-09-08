"""
=============================================================================
TOPIC 7: Pie Chart with plt.pie()
Script 01: Slices, Explode Offsets, Autopct & Shadows
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Classic Exploded Pie Chart for Class Balance Analysis")

# Machine Learning Target Class Distribution in Fraud Detection Dataset
labels = ['Legitimate (Normal)', 'Card Fraud', 'Wire Fraud', 'Account Takeover']
counts = [8400, 450, 280, 170]
colors = ['#10b981', '#ef4444', '#f59e0b', '#8b5cf6']

# Explode the fraud slices away from the main legitimate transactions
explode = (0, 0.12, 0.15, 0.20)

fig, ax = plt.subplots(figsize=(7, 5))

wedges, texts, autotexts = ax.pie(
    counts,
    explode=explode,
    labels=labels,
    colors=colors,
    autopct='%1.1f%%',
    pctdistance=0.75,
    startangle=140,
    shadow=True,
    wedgeprops={'edgecolor': '#0f172a', 'linewidth': 1.2}
)

# Customizing percentage label font properties
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontsize(9)
    autotext.set_weight('bold')

for text in texts:
    text.set_fontsize(9.5)

ax.set_title("Target Class Imbalance in Fraud Detection", fontsize=12, fontweight='bold', pad=15)
plt.tight_layout()
plt.close(fig)

print("✓ Exploded Pie chart generated with custom percentage formatting.")
