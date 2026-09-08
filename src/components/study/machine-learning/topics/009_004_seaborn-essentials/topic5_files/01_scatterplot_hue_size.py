"""
01_scatterplot_hue_size.py
Title: Multi-dimensional Encoding with sns.scatterplot()
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: sns.scatterplot() Multi-channel Visuals")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    # Seaborn scatterplot allows encoding up to 5 dimensions on 2D space:
    # 1. x position
    # 2. y position
    # 3. hue (color category or continuous gradient)
    # 4. size (point diameter)
    # 5. style (marker shape: circle, square, triangle, x)

    tips = sns.load_dataset("tips")

    plt.figure(figsize=(9, 5))
    sns.scatterplot(
        data=tips,
        x="total_bill",
        y="tip",
        hue="time",
        style="smoker",
        size="size",
        sizes=(30, 200),
        alpha=0.85,
        palette="magma"
    )

    plt.title("Multi-channel Scatter: Bill vs Tip by Meal Time, Smoker, and Table Size", fontsize=12)
    plt.tight_layout()
    print("✓ Successfully generated multi-dimensional scatter plot.")

if __name__ == "__main__":
    main()
