"""
02_gender_comparisons_palette.py
Title: Multi-track Conditioning: Gender x Track Nested Boxplot
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 1: Nested Category Split (Gender × Track)")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # 2-level categorical analysis: X is Track, Hue is Gender
    data = {
        "Track": ["Deep Learning", "Data Science", "Web ML"] * 20,
        "Gender": (["Male"] * 10 + ["Female"] * 10) * 3,
        "Marks": np.random.randint(65, 100, 60)
    }
    df = pd.DataFrame(data)

    plt.figure(figsize=(9, 5))
    sns.boxplot(
        data=df,
        x="Track",
        y="Marks",
        hue="Gender",
        palette={"Male": "#60a5fa", "Female": "#f472b6"},
        showmeans=True, # Displays green mean marker
        meanprops={"marker": "^", "markerfacecolor": "white", "markeredgecolor": "black"}
    )

    plt.title("Exam Marks by Track and Gender (with Mean Indicators ^)", fontsize=12)
    plt.tight_layout()
    print("✓ Successfully created nested track-gender boxplot with mean markers.")

if __name__ == "__main__":
    main()
