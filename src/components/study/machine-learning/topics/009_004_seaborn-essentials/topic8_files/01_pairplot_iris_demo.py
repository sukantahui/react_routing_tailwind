"""
01_pairplot_iris_demo.py
Title: Automated Multivariable Exploratory Grid with sns.pairplot()
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: sns.pairplot() Pairwise Relationships")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    # In Machine Learning EDA, `sns.pairplot()` plots:
    # 1. Off-diagonal elements: Bivariate scatter plots between every feature pair (X_i vs X_j)
    # 2. Diagonal elements: Univariate distribution (KDE or Histogram) for each individual feature!

    iris = sns.load_dataset("iris")
    print("\nDataset: Iris dataset preview:")
    print(iris.head(4))

    # Generate pairwise plot grouped by flower species
    g = sns.pairplot(
        data=iris,
        hue="species",
        diag_kind="kde",
        palette="bright",
        corner=False # Full grid matrix
    )

    g.fig.subplots_adjust(top=0.94)
    g.fig.suptitle("Iris Feature Pairwise Scatter & Diagonal KDE Matrix", fontsize=13)
    print("✓ Successfully created Iris multi-feature pair plot.")

if __name__ == "__main__":
    main()
