"""
03_pairgrid_custom_mapping.py
Title: Advanced Custom Subplot Mapping with PairGrid
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Precision Control with sns.PairGrid()")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Mahima")
    print("=" * 65)

    # `sns.pairplot()` is a high-level convenience wrapper over `sns.PairGrid()`.
    # With PairGrid, you can map different plot types to upper, diagonal, and lower quadrants!

    iris = sns.load_dataset("iris")
    g = sns.PairGrid(iris, hue="species", palette="Set1")

    # 1. Upper quadrant: Scatter plots
    g.map_upper(sns.scatterplot, alpha=0.7)
    # 2. Diagonal quadrant: KDE curves
    g.map_diag(sns.kdeplot, fill=True)
    # 3. Lower quadrant: 2D KDE contour density maps!
    g.map_lower(sns.kdeplot, levels=5)

    g.add_legend()
    print("✓ Successfully executed advanced tripartite PairGrid mapping.")

if __name__ == "__main__":
    main()
