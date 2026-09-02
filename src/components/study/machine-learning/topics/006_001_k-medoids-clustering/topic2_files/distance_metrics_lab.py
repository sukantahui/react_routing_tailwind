"""
distance_metrics_lab.py
Module 006_001: K-Medoids Clustering
Topic 2: Distance-Based Clustering & Metric Mathematics
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def euclidean_distance(p1, p2):
    """L2 Norm: Straight-line Euclidean distance."""
    return np.sqrt(np.sum((p1 - p2) ** 2))

def manhattan_distance(p1, p2):
    """L1 Norm: Grid-based Manhattan / City-block distance."""
    return np.sum(np.abs(p1 - p2))

def chebyshev_distance(p1, p2):
    """L_infinity Norm: Maximum coordinate difference (Chessboard distance)."""
    return np.max(np.abs(p1 - p2))

def cosine_distance(p1, p2):
    """Cosine Distance: 1 - Cosine Similarity (Directional angle)."""
    dot = np.dot(p1, p2)
    norm1 = np.linalg.norm(p1)
    norm2 = np.linalg.norm(p2)
    if norm1 == 0 or norm2 == 0:
        return 1.0
    return 1.0 - (dot / (norm1 * norm2))

def compute_distance_matrix(data, metric_func):
    """Compute full N x N pairwise distance matrix."""
    n = len(data)
    matrix = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            matrix[i, j] = metric_func(data[i], data[j])
    return matrix

def demo_distance_metrics():
    print("=" * 65)
    print(" Distance-Based Clustering: Metric Mathematical Comparison")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    # 4 sample vectors (e.g. Student engagement metrics in Barrackpore)
    # [Lab Hours, Coding Commits, Quiz Score]
    points = np.array([
        [10, 5, 80],   # Student 1
        [12, 6, 85],   # Student 2 (Similar profile)
        [2, 1, 30],    # Student 3 (Low engagement)
        [30, 25, 95]   # Student 4 (Advanced enthusiast)
    ])
    
    print("\nDataset Points (N = 4):")
    for idx, p in enumerate(points):
        print(f"  Student S{idx+1}: {p}")
        
    print("\nPairwise Distances between Student S1 and Student S2:")
    print(f"  • Euclidean (L2) Distance: {euclidean_distance(points[0], points[1]):.4f}")
    print(f"  • Manhattan (L1) Distance: {manhattan_distance(points[0], points[1]):.4f}")
    print(f"  • Chebyshev (Linf) Distance: {chebyshev_distance(points[0], points[1]):.4f}")
    print(f"  • Cosine Distance (Angle): {cosine_distance(points[0], points[1]):.4f}")
    
    # Distance Matrix Demonstration
    print("\nFull 4x4 Manhattan Pairwise Distance Matrix:")
    manhattan_matrix = compute_distance_matrix(points, manhattan_distance)
    print(np.round(manhattan_matrix, 2))
    
    print("\n✓ K-Medoids can operate directly on this distance matrix without feature coordinates!")

if __name__ == "__main__":
    demo_distance_metrics()
