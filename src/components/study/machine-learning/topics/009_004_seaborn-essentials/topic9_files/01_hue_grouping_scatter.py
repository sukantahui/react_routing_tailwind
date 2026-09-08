"""
01_hue_grouping_scatter.py
Title: Color Dimension Encoding with Categorical and Numeric 'hue'
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: The Power of 'hue' Grouping")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Abhronila")
    print("=" * 65)

    # In Seaborn, 'hue' behaves intelligently depending on the data type:
    # 1. Categorical / String column: Assigns discrete categorical palette (e.g. Set1, muted)
    # 2. Continuous / Numeric column: Assigns a sequential color gradient (e.g. viridis, rocket)

    tips = sns.load_dataset("tips")

    fig, axes = plt.subplots(1, 2, figsize=(12, 5))

    # 1. Categorical Hue (discrete colors with named legend items)
    sns.scatterplot(
        data=tips,
        x="total_bill",
        y="tip",
        hue="day",
        palette="bright",
        s=80,
        ax=axes[0]
    )
    axes[0].set_title("Categorical Hue: hue='day' (Discrete Palettes)", fontsize=11)

    # 2. Numeric Continuous Hue (sequential gradient colormap)
    sns.scatterplot(
        data=tips,
        x="total_bill",
        y="tip",
        hue="size",
        palette="viridis",
        s=80,
        ax=axes[1]
    )
    axes[1].set_title("Continuous Numeric Hue: hue='size' (Colormap Gradient)", fontsize=11)

    plt.tight_layout()
    print("✓ Successfully generated categorical vs continuous hue demonstrations.")

if __name__ == "__main__":
    main()
