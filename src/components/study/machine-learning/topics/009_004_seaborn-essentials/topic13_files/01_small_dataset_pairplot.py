"""
01_small_dataset_pairplot.py
Title: Worked Example 3: End-to-End Pairplot Analysis on Small Student Dataset
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 3: Pairplot Pipeline for Student Cohort")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    # 1. Create a clean small multi-feature dataset
    data = {
        "Study_Hours": [14, 16, 8, 13, 10, 15, 11, 7, 18, 12],
        "Coding_Projects": [5, 6, 2, 4, 3, 5, 4, 2, 7, 4],
        "Quiz_Score": [88, 94, 68, 85, 75, 92, 80, 65, 98, 82],
        "Final_Exam": [92, 96, 72, 89, 78, 95, 85, 70, 99, 84],
        "Track": ["DL", "DS", "Web", "DS", "Web", "DL", "DS", "Web", "DL", "DS"]
    }
    df = pd.DataFrame(data)
    print("\nStudent Cohort Multi-Feature Dataset:")
    print(df.to_string(index=False))

    # 2. Render Seaborn Pairplot with hue and KDE diagonals
    sns.set_theme(style="ticks", palette="Set1")
    
    g = sns.pairplot(
        data=df,
        hue="Track",
        diag_kind="kde",
        markers=["o", "s", "D"],
        plot_kws={"s": 60, "alpha": 0.8}
    )

    g.fig.subplots_adjust(top=0.93)
    g.fig.suptitle("Barrackpore Batch: Multidimensional Pairwise Relationships", fontsize=13)
    print("\n✓ Successfully executed end-to-end Pairplot visualization pipeline.")

if __name__ == "__main__":
    main()
