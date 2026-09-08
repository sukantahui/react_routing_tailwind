"""
03_stripplot_overlay_box.py
Title: Hybrid Visualization: Overlaying Raw Points (stripplot) on Boxplots
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 1: Jittered Stripplot + Boxplot Hybrid")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Abhronila")
    print("=" * 65)

    # Combining a Boxplot with a jittered Stripplot lets you see BOTH:
    # 1. Macro summary statistics (Q1, Median, Q3, Whiskers)
    # 2. Micro sample density (actual individual student dots)

    np.random.seed(42)
    df = pd.DataFrame({
        "Gender": ["Male"] * 25 + ["Female"] * 30,
        "Marks": np.concatenate([np.random.normal(80, 8, 25), np.random.normal(87, 6, 30)])
    })

    plt.figure(figsize=(7, 5))
    
    # Base Boxplot
    sns.boxplot(
        data=df,
        x="Gender",
        y="Marks",
        palette="pastel",
        fliersize=0 # Hide default fliers to prevent duplicate points
    )

    # Overlay jittered Stripplot
    sns.stripplot(
        data=df,
        x="Gender",
        y="Marks",
        color="#0f172a",
        alpha=0.6,
        jitter=0.2,
        size=6
    )

    plt.title("Student Marks by Gender with Raw Jittered Observations", fontsize=12)
    plt.tight_layout()
    print("✓ Successfully rendered Boxplot + Stripplot hybrid overlay.")

if __name__ == "__main__":
    main()
