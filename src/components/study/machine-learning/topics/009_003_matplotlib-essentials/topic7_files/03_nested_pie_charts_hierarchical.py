"""
=============================================================================
TOPIC 7: Pie Chart with plt.pie()
Script 03: Nested / Double Ring Donut Charts for Hierarchies
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Nested Concentric Donut Rings")

# Outer Ring: Specific Sub-models (e.g., ResNet, VGG, BERT, GPT, XGB, RF)
outer_counts = [20, 15, 25, 20, 12, 8]
outer_colors = ['#38bdf8', '#0284c7', '#a855f7', '#7e22ce', '#10b981', '#059669']

# Inner Ring: Broad ML Paradigms (Vision, NLP, Tabular)
inner_counts = [35, 45, 20]
inner_colors = ['#0ea5e9', '#9333ea', '#10b981']

fig, ax = plt.subplots(figsize=(7, 7))

# Outer Ring (radius=1.0, width=0.3)
ax.pie(
    outer_counts,
    radius=1.0,
    colors=outer_colors,
    wedgeprops=dict(width=0.3, edgecolor='#0f172a', linewidth=1.5),
    startangle=90
)

# Inner Ring (radius=0.7, width=0.3)
ax.pie(
    inner_counts,
    radius=0.7,
    colors=inner_colors,
    labels=['Computer Vision', 'NLP LLMs', 'Tabular ML'],
    labeldistance=0.45,
    rotatelabels=True,
    textprops=dict(color='white', fontsize=8, fontweight='bold', ha='center'),
    wedgeprops=dict(width=0.3, edgecolor='#0f172a', linewidth=1.5),
    startangle=90
)

ax.set_title("Hierarchical ML Model Deployment Share", fontsize=12, fontweight='bold')
plt.tight_layout()
plt.close(fig)

print("✓ Nested double-ring donut chart successfully constructed!")
