"""
k_medoids_concept_lab.py
Module 006_001: K-Medoids Clustering
Topic 0: K-Medoids Clustering Concept & Mathematical Foundations
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def manhattan_distance(p1, p2):
    """Compute L1 (Manhattan) distance between two points."""
    return np.sum(np.abs(p1 - p2))

def euclidean_distance(p1, p2):
    """Compute L2 (Euclidean) distance between two points."""
    return np.sqrt(np.sum((p1 - p2) ** 2))

def compute_total_cost(data, medoids, dist_func=manhattan_distance):
    """
    Calculate the total absolute dissimilarity (cost) of clustering.
    Cost = sum over all points of distance to their closest medoid.
    """
    total_cost = 0.0
    assignments = []
    
    for i, point in enumerate(data):
        distances = [dist_func(point, medoid) for medoid in medoids]
        closest_medoid_idx = np.argmin(distances)
        min_dist = distances[closest_medoid_idx]
        
        assignments.append(closest_medoid_idx)
        total_cost += min_dist
        
    return total_cost, np.array(assignments)

def demo_k_medoids_concept():
    print("=" * 65)
    print(" K-Medoids Clustering Concept & Dissimilarity Minimization")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    # Sample 2D data points (e.g. Student scores in Barrackpore & Kolkata)
    # [Coding Score, Math Score]
    dataset = np.array([
        [2, 3],
        [3, 4],
        [4, 5],
        [8, 7],
        [9, 8],
        [25, 28]  # Extreme Outlier Point!
    ])
    
    print("\nDataset Points (N = 6):")
    for idx, pt in enumerate(dataset):
        print(f"  P{idx+1}: {pt}")
        
    # Pick two actual data points as Medoids (k = 2)
    # Candidate Set A: Medoids = P2 (3, 4) and P5 (9, 8)
    medoids_A = np.array([dataset[1], dataset[4]])
    cost_A, assign_A = compute_total_cost(dataset, medoids_A, manhattan_distance)
    
    print("\n--- Candidate Configuration A ---")
    print(f"  Selected Medoids: M1 = {medoids_A[0]}, M2 = {medoids_A[1]}")
    print(f"  Cluster Assignments: {assign_A}")
    print(f"  Total Manhattan Dissimilarity Cost: {cost_A:.2f}")
    
    # Candidate Set B: Medoids = P1 (2, 3) and P4 (8, 7)
    medoids_B = np.array([dataset[0], dataset[3]])
    cost_B, assign_B = compute_total_cost(dataset, medoids_B, manhattan_distance)
    
    print("\n--- Candidate Configuration B ---")
    print(f"  Selected Medoids: M1 = {medoids_B[0]}, M2 = {medoids_B[1]}")
    print(f"  Cluster Assignments: {assign_B}")
    print(f"  Total Manhattan Dissimilarity Cost: {cost_B:.2f}")
    
    best_config = "A" if cost_A < cost_B else "B"
    print(f"\n✓ Optimal Configuration: {best_config} (Lower Dissimilarity Cost)")
    print("✓ Notice how Medoids are ALWAYS real existing data points from dataset!")

if __name__ == "__main__":
    demo_k_medoids_concept()
