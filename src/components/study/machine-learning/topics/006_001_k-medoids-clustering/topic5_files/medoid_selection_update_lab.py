"""
medoid_selection_update_lab.py
Module 006_001: K-Medoids Clustering
Topic 5: Medoid Selection and Update Procedure
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def update_cluster_medoid(data, cluster_member_indices):
    """
    Given the indices of all points belonging to a cluster,
    find the point that minimizes total intra-cluster distance.
    Returns: optimal medoid index and minimal intra-cluster distance sum.
    """
    best_medoid_idx = -1
    min_total_dist = float("inf")
    
    cluster_points = data[cluster_member_indices]
    k_members = len(cluster_member_indices)
    
    for i in range(k_members):
        candidate_idx = cluster_member_indices[i]
        candidate_pt = cluster_points[i]
        
        # Calculate L1 Manhattan distance sum to all other members in this cluster
        dist_sum = np.sum(np.abs(cluster_points - candidate_pt))
        
        if dist_sum < min_total_dist:
            min_total_dist = dist_sum
            best_medoid_idx = candidate_idx
            
    return best_medoid_idx, min_total_dist

def demo_medoid_update():
    print("=" * 65)
    print(" Medoid Selection and Intra-Cluster Update Demonstration")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    # 5 points in a single cluster (e.g. Delivery hubs in Shyamnagar)
    # [X coord, Y coord]
    cluster_data = np.array([
        [2, 3],   # P0
        [3, 4],   # P1
        [4, 5],   # P2
        [5, 4],   # P3
        [8, 9]    # P4
    ])
    
    indices = [0, 1, 2, 3, 4]
    
    print("\nCluster Members (N_k = 5):")
    for idx, p in enumerate(cluster_data):
        print(f"  P{idx}: {p}")
        
    print("\nEvaluating Each Candidate as Potential Cluster Medoid:")
    for i in indices:
        pt = cluster_data[i]
        distances = [np.sum(np.abs(pt - cluster_data[j])) for j in indices]
        total = sum(distances)
        print(f"  Candidate P{i} {pt} -> Total Intra-Cluster Distance Sum = {total}")
        
    best_m_idx, min_cost = update_cluster_medoid(cluster_data, indices)
    print(f"\n✓ Updated Cluster Medoid: Point P{best_m_idx} = {cluster_data[best_m_idx]}")
    print(f"✓ Minimum Total Distance Sum: {min_cost}")

if __name__ == "__main__":
    demo_medoid_update()
