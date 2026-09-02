"""
===============================================================================
CODER & ACCOTAX ML LAB: Interpreting Dendrograms & Cophenetic Correlation
File: dendrogram_interpretation_lab.py
Module: 006_002 Hierarchical Clustering • Topic 9
Educator: Sukanta Hui (Barrackpore, West Bengal)
===============================================================================
"""

import numpy as np
from scipy.cluster.hierarchy import dendrogram, linkage, cophenet
from scipy.spatial.distance import pdist

def run_hierarchical_demo():
    print("=" * 70)
    print("  CODER & ACCOTAX ML LAB: Interpreting Dendrograms & Cophenetic Correlation")
    print("  Educator: Sukanta Hui | Location: Barrackpore")
    print("=" * 70)

    # 1. Create synthetic 2D dataset representing 5 regional business hubs
    X = np.array([
        [2.0, 3.0],   # Hub 1 (Barrackpore)
        [2.5, 3.5],   # Hub 2 (Shyamnagar)
        [8.0, 9.0],   # Hub 3 (Kolkata Sector V)
        [8.5, 9.5],   # Hub 4 (Jadavpur)
        [5.0, 5.0]    # Hub 5 (Chandan Pukur)
    ])

    print("\n1. Input Dataset Matrix X (5 points x 2 features):")
    print(X)

    # 2. Compute Pairwise Distance Matrix
    distances = pdist(X, metric='euclidean')
    print("\n2. Condensed Pairwise Euclidean Distance Vector:")
    print(np.round(distances, 3))

    # 3. Perform Agglomerative Hierarchical Clustering (Ward's Linkage)
    Z_ward = linkage(X, method='ward')
    print("\n3. Hierarchical Linkage Matrix (Ward's Method):")
    print("   [Cluster 1, Cluster 2, Distance, Count]")
    print(np.round(Z_ward, 3))

    # 4. Compute Cophenetic Correlation Coefficient (CPCC)
    c, coph_dists = cophenet(Z_ward, distances)
    print(f"\n4. Cophenetic Correlation Coefficient (CPCC): {c:.4f}")
    if c > 0.85:
        print("   [PASS] Excellent dendrogram tree fidelity!")
    else:
        print("   [WARN] Tree exhibits moderate metric distortion.")

    print("\n" + "=" * 70)
    print("  Execution completed successfully!")
    print("=" * 70)

if __name__ == '__main__':
    run_hierarchical_demo()
