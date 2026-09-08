"""
03_violinplot_distribution.py
Title: sns.violinplot() Combining Boxplot Quartiles with KDE Densities
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Violin Plots with Split Categories")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Swadeep")
    print("=" * 65)

    tips = sns.load_dataset("tips")

    fig, axes = plt.subplots(1, 2, figsize=(12, 5))

    # 1. Standard Violin Plot
    sns.violinplot(
        data=tips,
        x="day",
        y="total_bill",
        palette="muted",
        inner="quartile",
        ax=axes[0]
    )
    axes[0].set_title("Standard Violin (inner='quartile')", fontsize=12)

    # 2. Split Violin Plot (Comparing 2 categories on the left and right halves!)
    sns.violinplot(
        data=tips,
        x="day",
        y="total_bill",
        hue="sex",
        split=True,
        palette="pastel",
        inner="stick",
        ax=axes[1]
    )
    axes[1].set_title("Split Violin Plot (split=True, hue='sex')", fontsize=12)

    plt.tight_layout()
    print("✓ Successfully rendered split violin plot.")

if __name__ == "__main__":
    main()
