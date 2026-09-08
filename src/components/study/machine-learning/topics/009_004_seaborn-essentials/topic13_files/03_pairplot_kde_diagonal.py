"""
03_pairplot_kde_diagonal.py
Title: Customizing Diagonal KDE Bands and Marker Aesthetics
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 3: Fine-Tuning Diagonals & Scatter Markers")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Mahima")
    print("=" * 65)

    data = {
        "Study_Hours": [14, 16, 8, 13, 10, 15, 11, 7, 18, 12],
        "Coding_Projects": [5, 6, 2, 4, 3, 5, 4, 2, 7, 4],
        "Final_Exam": [92, 96, 72, 89, 78, 95, 85, 70, 99, 84],
        "Track": ["DL", "DS", "Web", "DS", "Web", "DL", "DS", "Web", "DL", "DS"]
    }
    df = pd.DataFrame(data)

    # Passing diag_kws and plot_kws dictionaries for fine-grained style control
    g = sns.pairplot(
        data=df,
        hue="Track",
        diag_kind="kde",
        diag_kws={"fill": True, "alpha": 0.4, "bw_adjust": 1.2},
        plot_kws={"s": 80, "edgecolor": "white", "linewidth": 1.5},
        palette="Dark2"
    )

    print("✓ Successfully customized diagonal KDEs and scatter marker styling.")

if __name__ == "__main__":
    main()
