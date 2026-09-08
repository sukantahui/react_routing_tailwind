"""
=============================================================================
TOPIC 12: Worked Example 1: Plotting Student Marks
Script 03: Radar / Spider Competency Assessment in Polar Coordinates
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Radar Spider Chart in Polar Projection (subplot_kw=dict(polar=True))")

categories = ['NumPy & Math', 'Pandas Cleaning', 'Matplotlib EDA', 'Scikit-Learn ML', 'Feature Eng', 'Model Tuning']
N = len(categories)

# Competency marks for Susmita vs Swadeep
susmita_scores = [95, 98, 92, 96, 90, 94]
swadeep_scores = [75, 82, 88, 79, 85, 80]

# Compute angle for each category (closing the polygon by repeating first value)
angles = [n / float(N) * 2 * np.pi for n in range(N)]
angles += angles[:1]

susmita_scores += susmita_scores[:1]
swadeep_scores += swadeep_scores[:1]

fig, ax = plt.subplots(figsize=(7, 7), subplot_kw=dict(polar=True))

# Draw category lines & labels
plt.xticks(angles[:-1], categories, color='#cbd5e1', size=9, fontweight='bold')
ax.set_rlabel_position(0)
plt.yticks([40, 60, 80, 100], ["40%", "60%", "80%", "100%"], color="#94a3b8", size=8)
plt.ylim(0, 100)

# Plot Susmita
ax.plot(angles, susmita_scores, color='#10b981', linewidth=2, linestyle='solid', label='Susmita (Expert)')
ax.fill(angles, susmita_scores, color='#10b981', alpha=0.25)

# Plot Swadeep
ax.plot(angles, swadeep_scores, color='#f59e0b', linewidth=2, linestyle='solid', label='Swadeep (Emerging)')
ax.fill(angles, swadeep_scores, color='#f59e0b', alpha=0.25)

plt.title("Student Skillset Radar Assessment", size=13, color='#f8fafc', y=1.08, fontweight='bold')
plt.legend(loc='upper right', bbox_to_anchor=(0.1, 0.1))

plt.tight_layout()
plt.close(fig)

print("✓ Radar / Spider chart rendered in polar coordinates.")
