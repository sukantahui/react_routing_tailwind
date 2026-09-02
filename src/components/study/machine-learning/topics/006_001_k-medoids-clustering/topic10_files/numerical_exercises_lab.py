"""
numerical_exercises_lab.py
Module 006_001: K-Medoids Clustering
Topic 10: Numerical Exercises & Mathematical Problem Solving
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def exercise_1_manhattan_pam():
    """
    Exercise 1: 4-Point Manhattan Clustering (K=2)
    Points: P1(1, 1), P2(2, 1), P3(7, 8), P4(8, 8)
    """
    print("--- Exercise 1: 4-Point Manhattan Distance Clustering (K=2) ---")
    points = np.array([[1, 1], [2, 1], [7, 8], [8, 8]])
    n = len(points)
    
    # 1. Distance matrix
    D = np.sum(np.abs(points[:, None] - points[None, :]), axis=2)
    print("Distance Matrix D:\n", D)
    
    # BUILD Phase: 1st Medoid
    sums = np.sum(D, axis=1)
    m1 = np.argmin(sums)
    print(f"Row sums: {sums} -> Medoid 1: P{m1+1} (Sum = {sums[m1]})")
    
    # 2nd Medoid: Gain calculation
    gains = [sum(max(0, D[j, m1] - D[j, i]) for j in range(n)) if i != m1 else 0 for i in range(n)]
    m2 = np.argmax(gains)
    print(f"Gains: {gains} -> Medoid 2: P{m2+1} (Gain = {gains[m2]})")
    
    total_cost = sum(min(D[j, m1], D[j, m2]) for j in range(n))
    print(f"Final Clusters: Medoids [P{m1+1}, P{m2+1}], Total Cost J = {total_cost}\n")

def exercise_2_swap_cost_delta():
    """
    Exercise 2: Evaluating candidate swap Delta C for Medoid M1=P1 with Candidate H=P3
    Given Distance Matrix D for 4 points.
    """
    print("--- Exercise 2: SWAP Phase Delta C Calculation ---")
    D = np.array([
        [0, 3, 8, 9],
        [3, 0, 7, 8],
        [8, 7, 0, 2],
        [9, 8, 2, 0]
    ])
    
    # Current medoids: P1 (idx 0) and P4 (idx 3)
    curr_medoids = [0, 3]
    cost_curr = sum(min(D[j, 0], D[j, 3]) for j in range(4))
    print(f"Current Medoids [P1, P4]: Cost = {cost_curr}")
    
    # Test swap: Replace P1 with P2 (idx 1)
    new_medoids = [1, 3]
    cost_new = sum(min(D[j, 1], D[j, 3]) for j in range(4))
    delta_C = cost_new - cost_curr
    print(f"Tested Medoids [P2, P4]: Cost = {cost_new} -> Delta C = {delta_C:+d}")
    print(f"Decision: {'ACCEPT SWAP (Cost Decreased)' if delta_C < 0 else 'REJECT SWAP (No Cost Decrease)'}\n")

def run_all_exercises():
    print("=" * 65)
    print(" K-Medoids Numerical Problem Solving Laboratory")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    exercise_1_manhattan_pam()
    exercise_2_swap_cost_delta()

if __name__ == "__main__":
    run_all_exercises()
