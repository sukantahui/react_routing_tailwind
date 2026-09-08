"""
=============================================================================
TOPIC 7: Pie Chart with plt.pie()
Script 02: Modern Donut Charts & Central KPI Overlays
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Donut Chart with Center Circle Patch & KPI Label")

platforms = ['Mobile App', 'Web Portal', 'API Integration', 'POS Terminals']
shares = [48, 26, 16, 10]
colors = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6']

fig, ax = plt.subplots(figsize=(7, 5))

# Plot standard pie chart
wedges, texts, autotexts = ax.pie(
    shares,
    labels=platforms,
    colors=colors,
    autopct='%1.0f%%',
    pctdistance=0.82,
    startangle=90,
    wedgeprops=dict(width=0.35, edgecolor='#0f172a', linewidth=2)
)

for at in autotexts:
    at.set_color('#ffffff')
    at.set_fontweight('bold')

# Central Metric / KPI Annotation inside Donut hole
ax.text(
    0, 0,
    "TOTAL\n1.2M\nEvents",
    ha='center',
    va='center',
    fontsize=11,
    fontweight='bold',
    color='#38bdf8'
)

ax.set_title("Coder & AccoTax Multi-Channel Traffic Mix", fontsize=12, fontweight='bold', pad=15)
plt.tight_layout()
plt.close(fig)

print("✓ Modern Donut chart created using wedgeprops(width=0.35).")
