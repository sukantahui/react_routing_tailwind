"""
=============================================================================
TOPIC 12: Worked Example 1: Plotting Student Marks
Script 01: Multi-Subject Grouped Benchmark Comparison
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Multi-Subject Academic Benchmark Comparison")

students = ['Debangshu', 'Susmita', 'Swadeep', 'Tuhina', 'Sachin', 'Mahima', 'Abhronila']
python_marks = [88, 95, 74, 92, 85, 90, 89]
ml_marks     = [84, 98, 70, 94, 88, 92, 91]
sql_marks    = [90, 92, 82, 89, 84, 88, 86]

x = np.arange(len(students))
width = 0.26

fig, ax = plt.subplots(figsize=(12, 5))

rects1 = ax.bar(x - width, python_marks, width, label='Python Core', color='#0284c7', edgecolor='#0f172a')
rects2 = ax.bar(x,         ml_marks,     width, label='Machine Learning', color='#10b981', edgecolor='#0f172a')
rects3 = ax.bar(x + width, sql_marks,    width, label='SQL & Data Eng', color='#f59e0b', edgecolor='#0f172a')

ax.set_title("Coder & AccoTax Barrackpore: Student Subject Performance Benchmark", fontsize=13, fontweight='bold', pad=15)
ax.set_ylabel("Marks Obtained (%)", fontsize=10)
ax.set_xticks(x)
ax.set_xticklabels(students, fontsize=10, fontweight='semibold')
ax.set_ylim(0, 115)
ax.axhline(75, color='#ef4444', linestyle=':', label='Distinction Threshold (75%)')
ax.legend(loc='upper right', framealpha=0.9)
ax.grid(axis='y', linestyle='--', alpha=0.4)

# Value annotations
ax.bar_label(rects1, padding=2, fontsize=8)
ax.bar_label(rects2, padding=2, fontsize=8)
ax.bar_label(rects3, padding=2, fontsize=8)

plt.tight_layout()
plt.close(fig)

print("✓ Student multi-subject benchmark chart generated successfully.")
