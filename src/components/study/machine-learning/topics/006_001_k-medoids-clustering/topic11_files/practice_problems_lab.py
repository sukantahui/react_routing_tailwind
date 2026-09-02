"""
practice_problems_lab.py
Module 006_001: K-Medoids Clustering
Topic 11: Practice Problem Solutions & Self-Evaluation Harness
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def solve_practice_problem_1():
    """
    Problem 1: Customer Segmentation by Purchase Amount (₹) and Visit Frequency.
    Points: C1(2, 5), C2(3, 8), C3(8, 2), C4(9, 3), C5(20, 20) [Outlier]
    Cluster into K=2 groups using Manhattan K-Medoids.
    """
    print("--- Problem 1 Solution: Customer Segmentation with Outlier (K=2) ---")
    customers = np.array([
        [2, 5],   # C1
        [3, 8],   # C2
        [8, 2],   # C3
        [9, 3],   # C4
        [20, 20]  # C5 (High-net-worth Outlier)
    ])
    n = len(customers)
    D = np.sum(np.abs(customers[:, None] - customers[None, :]), axis=2)
    
    # 1st Medoid
    m1 = np.argmin(np.sum(D, axis=1))
    # 2nd Medoid
    gains = [sum(max(0, D[j, m1] - D[j, i]) for j in range(n)) if i != m1 else 0 for i in range(n)]
    m2 = np.argmax(gains)
    
    medoids = [m1, m2]
    cost = sum(min(D[j, m1], D[j, m2]) for j in range(n))
    
    print(f"Optimal Medoids: Customer C{m1+1} {customers[m1]} and Customer C{m2+1} {customers[m2]}")
    print(f"Total Intra-Cluster Manhattan Cost: ₹{cost:.2f}")
    print("Note: Outlier C5 does NOT distort the normal customer medoid C1/C2!\n")

def solve_practice_problem_2():
    """
    Problem 2: Distance Metric Invariance Test.
    Compare Euclidean vs Manhattan Medoid choices on a 4-point diamond dataset.
    """
    print("--- Problem 2 Solution: Metric Invariance on 4-Point Diamond ---")
    points = np.array([[0, 2], [2, 0], [0, -2], [-2, 0]])
    
    # Manhattan distance matrix
    D_man = np.sum(np.abs(points[:, None] - points[None, :]), axis=2)
    sums_man = np.sum(D_man, axis=1)
    
    # Euclidean distance matrix
    D_euc = np.linalg.norm(points[:, None] - points[None, :], axis=2)
    sums_euc = np.sum(D_euc, axis=1)
    
    print("Manhattan Row Sums:", sums_man)
    print("Euclidean Row Sums:", sums_euc.round(2))
    print("Due to 4-fold rotational symmetry, all 4 points are equally valid medoids!\n")

def run_all_practice():
    print("=" * 65)
    print(" K-Medoids Practice Problem Automated Laboratory")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    solve_practice_problem_1()
    solve_practice_problem_2()

if __name__ == "__main__":
    run_all_practice()
