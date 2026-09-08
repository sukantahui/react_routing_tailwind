"""
02_pairplot_hue_palette.py
Title: Corner Pairplot Optimization and Diagonal Customization
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Reducing Clutter with corner=True")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # For datasets with many features (e.g. 10 features = 100 subplots),
    # pairplot can be slow and redundant.
    # Setting `corner=True` plots only the lower triangle!

    tips = sns.load_dataset("tips")

    g = sns.pairplot(
        data=tips,
        hue="sex",
        diag_kind="hist",
        corner=True, # Suppresses upper triangle
        palette="husl",
        plot_kws={"alpha": 0.6, "s": 35}
    )

    g.fig.subplots_adjust(top=0.92)
    g.fig.suptitle("Corner Pair Plot on Restaurant Tips", fontsize=12)
    print("✓ Successfully rendered memory-efficient corner pairplot.")

if __name__ == "__main__":
    main()
