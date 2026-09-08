"""
03_relplot_facets.py
Title: Figure-level Relationship Plotting with sns.relplot() Facets
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Faceting Subplots with sns.relplot()")
    print("   Instructor: Sukanta Hui | Students: Mahima, Tuhina, Sachin")
    print("=" * 65)

    tips = sns.load_dataset("tips")

    # sns.relplot() is the Figure-level entry point for relationship plots (kind="scatter" or kind="line").
    # It allows splitting subplots into rows and columns effortlessly using `col` and `row`!
    g = sns.relplot(
        data=tips,
        x="total_bill",
        y="tip",
        hue="smoker",
        col="time",
        row="sex",
        kind="scatter",
        height=3.5,
        aspect=1.2
    )

    g.fig.subplots_adjust(top=0.9)
    g.fig.suptitle("Faceted Multi-panel Scatter Matrix: Bill vs Tip", fontsize=14)
    print("✓ Successfully generated multi-column faceted relationship plot.")

if __name__ == "__main__":
    main()
