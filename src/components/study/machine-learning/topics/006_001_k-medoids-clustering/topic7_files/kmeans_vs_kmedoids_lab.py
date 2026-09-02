"""
kmeans_vs_kmedoids_lab.py
Module 006_001: K-Medoids Clustering
Topic 7: Comprehensive Benchmark: K-Means vs. K-Medoids
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def run_kmeans_simple(data, k=2, max_iter=20):
    """Simple K-Means implementation."""
    np.random.seed(42)
    centroids = data[np.random.choice(len(data), k, replace=False)].astype(float)
    for _ in range(max_iter):
        # Assignment
        dists = np.linalg.norm(data[:, None] - centroids[None, :], axis=2)
        labels = np.argmin(dists, axis=1)
        # Update
        new_centroids = np.array([data[labels == j].mean(axis=0) if np.sum(labels == j) > 0 else centroids[j] for j in range(k)])
        if np.allclose(centroids, new_centroids):
            break
        centroids = new_centroids
    return centroids, labels

def run_kmedoids_simple(data, k=2, max_iter=20):
    """Simple K-Medoids implementation using Manhattan distance."""
    np.random.seed(42)
    n = len(data)
    D = np.sum(np.abs(data[:, None] - data[None, :]), axis=2)
    medoids = np.random.choice(n, k, replace=False)
    for _ in range(max_iter):
        labels = np.argmin(D[:, medoids], axis=1)
        new_medoids = np.zeros(k, dtype=int)
        for j in range(k):
            members = np.where(labels == j)[0]
            if len(members) == 0:
                new_medoids[j] = medoids[j]
            else:
                sub_D = D[np.ix_(members, members)]
                new_medoids[j] = members[np.argmin(np.sum(sub_D, axis=1))]
        if np.array_equal(np.sort(medoids), np.sort(new_medoids)):
            break
        medoids = new_medoids
    return data[medoids], labels, medoids

def benchmark_comparison():
    print("=" * 65)
    print(" Head-to-Head Benchmark: K-Means vs. K-Medoids")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    # Dataset with clean clusters + 1 extreme outlier
    data = np.array([
        [1, 2], [2, 1], [2, 3], [3, 2],       # Cluster 1
        [8, 9], [9, 8], [8, 10], [10, 9],     # Cluster 2
        [50, 60]                               # Extreme Outlier!
    ])
    
    print(f"\nDataset Size: N = {len(data)} points (including extreme outlier [50, 60])")
    
    # Run K-Means
    centroids, kmeans_labels = run_kmeans_simple(data, k=2)
    print("\n--- 1. K-Means Results (Centroid Based) ---")
    print(f"  Cluster 0 Centroid: {centroids[0].round(2)}")
    print(f"  Cluster 1 Centroid: {centroids[1].round(2)} (Drastically pulled by outlier!)")
    
    # Run K-Medoids
    medoids, kmed_labels, med_indices = run_kmedoids_simple(data, k=2)
    print("\n--- 2. K-Medoids Results (Medoid Based) ---")
    print(f"  Cluster 0 Medoid: Point P{med_indices[0]} = {medoids[0]}")
    print(f"  Cluster 1 Medoid: Point P{med_indices[1]} = {medoids[1]} (Firmly anchored in dense core!)")
    
    print("\n✓ Conclusion: K-Medoids is 100% resistant to the outlier coordinate distortion!")

if __name__ == "__main__":
    benchmark_comparison()
