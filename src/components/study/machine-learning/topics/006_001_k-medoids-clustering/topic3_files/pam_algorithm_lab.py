"""
pam_algorithm_lab.py
Module 006_001: K-Medoids Clustering
Topic 3: The PAM (Partitioning Around Medoids) Algorithm
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def compute_cost(data, medoid_indices, dist_matrix):
    """Compute total absolute dissimilarity cost for a chosen set of medoids."""
    cost = 0.0
    assignments = []
    
    for i in range(len(data)):
        distances_to_medoids = [dist_matrix[i, m] for m in medoid_indices]
        closest_m_idx = np.argmin(distances_to_medoids)
        assignments.append(closest_m_idx)
        cost += distances_to_medoids[closest_m_idx]
        
    return cost, np.array(assignments)

def pam_k_medoids(data, k, max_iter=100):
    """
    Partitioning Around Medoids (PAM) complete implementation.
    1. BUILD Phase: Greedy selection of initial k medoids.
    2. SWAP Phase: Test swapping each medoid with non-medoids.
    """
    n = len(data)
    # 1. Precompute N x N Manhattan Distance Matrix
    dist_matrix = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            dist_matrix[i, j] = np.sum(np.abs(data[i] - data[j]))
            
    # BUILD PHASE: Select initial k medoids
    # First medoid: Point minimizing sum of distances to all other points
    first_medoid = np.argmin(np.sum(dist_matrix, axis=1))
    medoids = [first_medoid]
    
    while len(medoids) < k:
        best_candidate = -1
        best_reduction = -float("inf")
        
        for i in range(n):
            if i in medoids:
                continue
            # Calculate gain of adding candidate i
            current_costs = np.min(dist_matrix[:, medoids], axis=1)
            new_costs = np.minimum(current_costs, dist_matrix[:, i])
            reduction = np.sum(current_costs - new_costs)
            
            if reduction > best_reduction:
                best_reduction = reduction
                best_candidate = i
                
        medoids.append(best_candidate)
        
    current_cost, assignments = compute_cost(data, medoids, dist_matrix)
    print(f"BUILD Phase Complete: Initial Medoids = {medoids}, Initial Cost = {current_cost:.2f}")
    
    # SWAP PHASE
    iter_count = 0
    while iter_count < max_iter:
        iter_count += 1
        best_swap = None
        best_delta_cost = 0.0
        
        for m_idx in range(k):
            m = medoids[m_idx]
            for h in range(n):
                if h in medoids:
                    continue
                    
                # Test swap m with h
                temp_medoids = medoids.copy()
                temp_medoids[m_idx] = h
                new_cost, _ = compute_cost(data, temp_medoids, dist_matrix)
                delta_cost = new_cost - current_cost
                
                if delta_cost < best_delta_cost:
                    best_delta_cost = delta_cost
                    best_swap = (m_idx, h)
                    
        # If a swap reduces cost, perform it
        if best_swap is not None and best_delta_cost < -1e-6:
            m_idx, h = best_swap
            old_m = medoids[m_idx]
            medoids[m_idx] = h
            current_cost += best_delta_cost
            print(f"  Iteration {iter_count}: Swapped Medoid P{old_m} with P{h} (Delta Cost = {best_delta_cost:.2f}, New Cost = {current_cost:.2f})")
        else:
            print(f"SWAP Phase Converged after {iter_count} iterations. No cost reduction possible!")
            break
            
    final_cost, final_assignments = compute_cost(data, medoids, dist_matrix)
    return medoids, final_assignments, final_cost

def demo_pam():
    print("=" * 65)
    print(" Partitioning Around Medoids (PAM) Complete Lifecycle")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    # Small 2D dataset
    dataset = np.array([
        [2, 6],   # P0
        [3, 4],   # P1
        [3, 8],   # P2
        [4, 7],   # P3
        [6, 2],   # P4
        [6, 4],   # P5
        [7, 3],   # P6
        [7, 4],   # P7
        [8, 5],   # P8
        [7, 6]    # P9
    ])
    
    k = 2
    medoids, assignments, cost = pam_k_medoids(dataset, k)
    
    print("\nFinal PAM Results:")
    print(f"  Optimal Medoid Indices: {medoids}")
    for idx, m in enumerate(medoids):
        print(f"    Cluster {idx+1} Medoid: Point P{m} = {dataset[m]}")
    print(f"  Final Total Dissimilarity Cost: {cost:.2f}")
    print(f"  Cluster Assignments: {assignments}")

if __name__ == "__main__":
    demo_pam()
