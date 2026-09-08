"""
02_boxplot_quartiles.py
Title: sns.boxplot() for Outlier and Quartile Analysis
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Boxplot Quartiles & Outlier Detection (IQR)")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # Box plot Anatomy:
    # - Lower Whisker: Q1 - 1.5 * IQR
    # - Box Bottom: Q1 (25th percentile)
    # - Box Center Line: Median (50th percentile)
    # - Box Top: Q3 (75th percentile)
    # - Upper Whisker: Q3 + 1.5 * IQR
    # - Flier Points: Outliers beyond whiskers!

    tips = sns.load_dataset("tips")

    plt.figure(figsize=(8, 5))
    sns.boxplot(
        data=tips,
        x="day",
        y="total_bill",
        hue="smoker",
        palette="coolwarm"
    )
    plt.title("Bill Distributions Across Days with Outlier Points", fontsize=12)
    plt.tight_layout()
    print("✓ Successfully generated categorical boxplot.")

if __name__ == "__main__":
    main()
