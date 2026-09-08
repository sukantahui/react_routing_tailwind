"""
02_corner_pairplot.py
Title: Corner Pairplot Optimization on Small Tabular Features
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 3: Corner Pairplot Sub-Grid")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    data = {
        "Study_Hours": [14, 16, 8, 13, 10, 15, 11, 7, 18, 12],
        "Coding_Projects": [5, 6, 2, 4, 3, 5, 4, 2, 7, 4],
        "Final_Exam": [92, 96, 72, 89, 78, 95, 85, 70, 99, 84],
        "Track": ["DL", "DS", "Web", "DS", "Web", "DL", "DS", "Web", "DL", "DS"]
    }
    df = pd.DataFrame(data)

    # corner=True trims the 3x3 matrix from 9 subplots to only 6 subplots!
    g = sns.pairplot(
        data=df,
        hue="Track",
        corner=True,
        diag_kind="hist",
        palette="bright"
    )

    g.fig.subplots_adjust(top=0.92)
    g.fig.suptitle("Corner Pairplot: Lower Triangle + Diagonal Only", fontsize=12)
    print("✓ Successfully rendered corner pairplot.")

if __name__ == "__main__":
    main()
