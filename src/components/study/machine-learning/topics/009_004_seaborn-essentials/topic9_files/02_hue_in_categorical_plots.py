"""
02_hue_in_categorical_plots.py
Title: Secondary Sub-Grouping in Barplots, Boxplots, and Countplots
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Categorical Nested Grouping via hue")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # In categorical plots (barplot, boxplot, countplot),
    # `x` provides primary grouping while `hue` splits each primary bar/box into sub-groups (dodged by default)!

    tips = sns.load_dataset("tips")

    fig, axes = plt.subplots(1, 2, figsize=(12, 5))

    # 1. Nested Boxplot: x='day', hue='smoker'
    sns.boxplot(
        data=tips,
        x="day",
        y="total_bill",
        hue="smoker",
        palette="coolwarm",
        ax=axes[0]
    )
    axes[0].set_title("Nested Boxplot: Days split by Smoker status", fontsize=11)

    # 2. Nested Countplot: x='day', hue='time'
    sns.countplot(
        data=tips,
        x="day",
        hue="time",
        palette="Set2",
        ax=axes[1]
    )
    axes[1].set_title("Nested Countplot: Days split by Meal Time", fontsize=11)

    plt.tight_layout()
    print("✓ Successfully created nested categorical sub-grouped figures.")

if __name__ == "__main__":
    main()
