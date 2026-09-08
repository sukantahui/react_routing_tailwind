"""
02_practice_problem_2.py
Title: Practice Problem 2: Categorical Boxplot with Custom Outlier Styler
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Practice Problem 2: Categorical Outlier Formatting")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # Problem Statement:
    # 1. Load 'tips' dataset
    # 2. Render boxplot of total_bill grouped by day, conditioned on smoker
    # 3. Format outlier points (fliers) with red diamond markers

    tips = sns.load_dataset("tips")

    plt.figure(figsize=(8, 5))
    sns.boxplot(
        data=tips,
        x="day",
        y="total_bill",
        hue="smoker",
        palette="Set2",
        flierprops={"marker": "D", "markerfacecolor": "red", "markersize": 5},
        notch=True # Displays median notch confidence
    )

    plt.title("Practice Problem 2: Notched Boxplot with Custom Red Diamond Fliers", fontsize=12)
    plt.tight_layout()
    print("✓ Practice Problem 2 successfully solved!")

if __name__ == "__main__":
    main()
