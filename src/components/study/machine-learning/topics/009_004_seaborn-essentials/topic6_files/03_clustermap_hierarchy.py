"""
03_clustermap_hierarchy.py
Title: Hierarchical Clustering with sns.clustermap()
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: sns.clustermap() with Dendrograms")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Swadeep")
    print("=" * 65)

    # sns.clustermap() performs hierarchical agglomerative clustering on rows and columns!
    # It re-orders rows and columns such that similar samples are grouped together.

    iris = sns.load_dataset("iris")
    species = iris.pop("species")

    # Standardize features before clustering
    g = sns.clustermap(
        iris,
        cmap="mako",
        standard_scale=1, # Normalize columns to [0, 1]
        figsize=(8, 8)
    )

    print("✓ Successfully executed hierarchical clustermap with dendrogram trees.")

if __name__ == "__main__":
    main()
