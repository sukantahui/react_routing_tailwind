"""
01_series_deep_dive_index_alignment.py
======================================
Topic: Pandas Series Deep Dive: Labeled Indexing & Automatic Alignment
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("PANDAS SERIES: LABELED 1D ARRAYS & AUTOMATIC INDEX ALIGNMENT")
    print("=" * 70)

    # 1. Creating Series with explicit custom string indices
    # Exam 1 scores for students in Barrackpore
    exam1 = pd.Series(
        data=[85, 92, 65, 88],
        index=["Debangshu", "Susmita", "Swadeep", "Tuhina"],
        name="Exam1_Score"
    )

    # Exam 2 scores (notice: different order and includes 'Sachin', excludes 'Swadeep')
    exam2 = pd.Series(
        data=[90, 88, 78, 85],
        index=["Susmita", "Debangshu", "Sachin", "Tuhina"],
        name="Exam2_Score"
    )

    print("Exam 1 Series:\n", exam1)
    print("\nExam 2 Series:\n", exam2)

    # 2. Automatic Index Alignment during Arithmetic:
    # When adding two Series, Pandas automatically aligns elements by their INDEX LABELS
    # (not by coordinate position). Mismatched labels receive NaN (Outer Join behavior)!
    total_scores = exam1 + exam2
    print("\n1. exam1 + exam2 (Automatic Label Alignment):\n", total_scores)

    # 3. Handling Missing Labels with .add(fill_value=0)
    safe_total = exam1.add(exam2, fill_value=0)
    print("\n2. exam1.add(exam2, fill_value=0):\n", safe_total)

    # 4. Statistical Methods on Series
    print(f"\n3. Statistical Reductions on Exam 1:")
    print(f"   Mean Score : {exam1.mean():.2f}")
    print(f"   Std Dev    : {exam1.std():.2f}")
    print(f"   Top Scorer : {exam1.idxmax()} ({exam1.max()} marks)")

if __name__ == "__main__":
    main()
