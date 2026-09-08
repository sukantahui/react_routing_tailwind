"""
================================================================================
Topic 13 - Script 01: Core Aggregation Functions & Axis Reduction Mechanics
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Global reductions vs Axis-specific reductions
- axis=0: Collapses rows -> computes stats for each feature column
- axis=1: Collapses columns -> computes stats for each student sample
- Core functions: np.sum(), np.mean(), np.std(), np.var(), np.min(), np.max()
================================================================================
"""

import numpy as np

def demonstrate_aggregations():
    print("=" * 65)
    print("1. GLOBAL AGGREGATIONS OVER ENTIRE 2D ARRAY")
    print("=" * 65)

    # 4 students (Debangshu, Susmita, Swadeep, Tuhina) x 3 subjects (Math, Sci, Eng)
    marks = np.array([
        [85, 90, 88],  # Debangshu
        [92, 95, 91],  # Susmita
        [65, 70, 72],  # Swadeep
        [88, 85, 94]   # Tuhina
    ], dtype=np.float64)

    print("Student Exam Matrix (4x3):\n", marks)
    print("-" * 50)
    print(f"Global Sum   (np.sum)  : {np.sum(marks):.1f}")
    print(f"Global Mean  (np.mean) : {np.mean(marks):.2f}")
    print(f"Global Std   (np.std)  : {np.std(marks):.2f}")
    print(f"Global Min   (np.min)  : {np.min(marks):.1f}")
    print(f"Global Max   (np.max)  : {np.max(marks):.1f}")

    print("\n" + "=" * 65)
    print("2. AXIS=0 REDUCTION: COLUMN-WISE (PER FEATURE STATS)")
    print("=" * 65)
    print("Collapses dimension 0 (rows). Result has shape (3,) -> 1 stat per subject:")
    subject_means = np.mean(marks, axis=0)
    subject_stds  = np.std(marks, axis=0)
    subject_mins  = np.min(marks, axis=0)
    subject_maxs  = np.max(marks, axis=0)

    print("Subject Means [Math, Sci, Eng]:", subject_means)
    print("Subject Stds  [Math, Sci, Eng]:", np.round(subject_stds, 2))
    print("Subject Mins  [Math, Sci, Eng]:", subject_mins)
    print("Subject Maxs  [Math, Sci, Eng]:", subject_maxs)

    print("\n" + "=" * 65)
    print("3. AXIS=1 REDUCTION: ROW-WISE (PER STUDENT STATS)")
    print("=" * 65)
    print("Collapses dimension 1 (columns). Result has shape (4,) -> 1 stat per student:")
    student_totals = np.sum(marks, axis=1)
    student_averages = np.mean(marks, axis=1)

    names = ["Debangshu", "Susmita", "Swadeep", "Tuhina"]
    for name, total, avg in zip(names, student_totals, student_averages):
        print(f"  {name:<12}: Total = {total:.1f} | Average = {avg:.2f}")

if __name__ == "__main__":
    demonstrate_aggregations()
