"""
cluster_assignment_lab.py
Module 006_001: K-Medoids Clustering
Topic 4: Cluster Assignment & Voronoi Partitioning
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def assign_clusters(data, medoids, dist_func=np.linalg.norm):
    """
    Assign every data point to its nearest medoid.
    Returns: cluster labels array and distances to nearest medoid.
    """
    n = len(data)
    labels = np.zeros(n, dtype=int)
    min_distances = np.zeros(n)
    
    for i in range(n):
        point = data[i]
        distances = [dist_func(point - m) for m in medoids]
        closest_m_idx = np.argmin(distances)
        
        labels[i] = closest_m_idx
        min_distances[i] = distances[closest_m_idx]
        
    return labels, min_distances

def demo_cluster_assignment():
    print("=" * 65)
    print(" Cluster Assignment Mechanics in K-Medoids")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    # 8 sample student data points in 2D
    # [Math Score, Coding Score]
    dataset = np.array([
        [2, 3],  # P0
        [3, 4],  # P1
        [4, 5],  # P2
        [5, 4],  # P3
        [12, 14], # P4
        [14, 15], # P5
        [15, 13], # P6
        [13, 16]  # P7
    ])
    
    # Two fixed medoids: P1(3, 4) and P5(14, 15)
    medoid_indices = [1, 5]
    medoids = dataset[medoid_indices]
    
    print("\nFixed Medoids:")
    print(f"  Cluster 0 Medoid: Point P1 = {medoids[0]}")
    print(f"  Cluster 1 Medoid: Point P5 = {medoids[1]}")
    
    labels, distances = assign_clusters(dataset, medoids)
    
    print("\nPoint-by-Point Cluster Assignment Results:")
    for idx in range(len(dataset)):
        is_medoid = " (MEDOID)" if idx in medoid_indices else ""
        print(f"  Point P{idx} {dataset[idx]} -> Assigned to Cluster {labels[idx]} (Dist to Medoid = {distances[idx]:.2f}){is_medoid}")
        
    cluster_0_count = np.sum(labels == 0)
    cluster_1_count = np.sum(labels == 1)
    print(f"\nCluster Sizes: Cluster 0 = {cluster_0_count} points, Cluster 1 = {cluster_1_count} points")
    print(f"Total Intra-Cluster Distance Sum: {np.sum(distances):.2f}")

if __name__ == "__main__":
    demo_cluster_assignment()
