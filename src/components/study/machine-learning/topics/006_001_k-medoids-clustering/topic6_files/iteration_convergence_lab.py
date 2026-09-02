"""
iteration_convergence_lab.py
Module 006_001: K-Medoids Clustering
Topic 6: Iteration and Convergence Dynamics
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def run_kmedoids_with_convergence_history(data, k, max_iter=20):
    """
    Runs Alternate K-Medoids tracking convergence history at every iteration.
    Returns: iteration log containing medoid indices, total cost, and delta cost.
    """
    n = len(data)
    # Precompute pairwise Manhattan distance matrix
    D = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            D[i, j] = np.sum(np.abs(data[i] - data[j]))
            
    # Random initial medoid selection
    np.random.seed(42)
    current_medoids = np.random.choice(n, k, replace=False)
    
    history = []
    
    for iteration in range(1, max_iter + 1):
        # 1. Assignment Step
        assignments = np.zeros(n, dtype=int)
        for i in range(n):
            assignments[i] = np.argmin([D[i, m] for m in current_medoids])
            
        # Compute current total cost
        total_cost = 0.0
        for i in range(n):
            total_cost += D[i, current_medoids[assignments[i]]]
            
        # 2. Update Step: Update medoids within each cluster
        new_medoids = np.zeros(k, dtype=int)
        for cluster_id in range(k):
            members = np.where(assignments == cluster_id)[0]
            if len(members) == 0:
                new_medoids[cluster_id] = current_medoids[cluster_id]
                continue
                
            # Find member minimizing distance to all other members in this cluster
            sub_D = D[np.ix_(members, members)]
            best_local_idx = np.argmin(np.sum(sub_D, axis=1))
            new_medoids[cluster_id] = members[best_local_idx]
            
        # Check convergence: Did medoid indices change?
        converged = np.array_equal(np.sort(current_medoids), np.sort(new_medoids))
        
        history.append({
            "iteration": iteration,
            "medoids": current_medoids.copy(),
            "cost": total_cost,
            "converged": converged
        })
        
        if converged:
            break
            
        current_medoids = new_medoids.copy()
        
    return history, current_medoids, assignments

def demo_convergence():
    print("=" * 65)
    print(" K-Medoids Iteration & Convergence Dynamics")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    # 2D dataset with 3 clusters
    dataset = np.array([
        [1, 2], [2, 1], [2, 3], [3, 2],       # Cluster A
        [10, 11], [11, 10], [10, 12], [12, 11],# Cluster B
        [20, 21], [21, 20], [22, 21], [20, 22] # Cluster C
    ])
    
    k = 3
    history, final_medoids, final_assign = run_kmedoids_with_convergence_history(dataset, k)
    
    print(f"\nConvergence Progression Table (K = {k}):")
    print("-" * 65)
    print(f"{'Iter':<6}{'Active Medoid Indices':<28}{'Total Cost':<14}{'Status'}")
    print("-" * 65)
    for row in history:
        status = "CONVERGED ✓" if row['converged'] else "Iterating..."
        med_str = str(list(row['medoids']))
        print(f"{row['iteration']:<6}{med_str:<28}{row['cost']:<14.2f}{status}")
        
    print("-" * 65)
    print(f"\nFinal Medoids: {final_medoids} -> Total Iterations: {len(history)}")

if __name__ == "__main__":
    demo_convergence()
