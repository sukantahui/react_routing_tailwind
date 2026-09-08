"""
=============================================================================
TOPIC 12: Worked Example 1: Plotting Student Marks
Script 02: Mock Test Progression & Trajectory Curves
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Student Score Trajectory Across 6 Consecutive Mock Tests")

mock_tests = ['Mock 1', 'Mock 2', 'Mock 3', 'Mock 4', 'Mock 5', 'Mock 6']

# Progress of 4 sample students
debangshu = [68, 74, 80, 84, 86, 91]
susmita   = [82, 85, 90, 92, 95, 98]
swadeep   = [55, 62, 68, 72, 75, 82]
tuhina    = [78, 82, 86, 89, 93, 95]

fig, ax = plt.subplots(figsize=(9, 5))

ax.plot(mock_tests, debangshu, marker='o', lw=2.5, color='#0284c7', label='Debangshu (Steady Growth)')
ax.plot(mock_tests, susmita,   marker='s', lw=2.5, color='#10b981', label='Susmita (Top Performer)')
ax.plot(mock_tests, swadeep,   marker='^', lw=2.5, color='#f59e0b', label='Swadeep (Most Improved +27%)')
ax.plot(mock_tests, tuhina,    marker='d', lw=2.5, color='#ec4899', label='Tuhina (Consistent Distinction)')

ax.set_title("Student Learning Trajectory Across ML Mock Tests", fontsize=12, fontweight='bold', pad=12)
ax.set_xlabel("Mock Test Series")
ax.set_ylabel("Score (%)")
ax.set_ylim(50, 105)
ax.axhline(80, color='#64748b', linestyle='--', alpha=0.6, label='Distinction Benchmark (80%)')
ax.legend(loc='lower right', frameon=True)
ax.grid(True, linestyle=":", alpha=0.5)

plt.tight_layout()
plt.close(fig)

print("✓ Progression timeline chart successfully rendered.")
