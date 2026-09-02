"""
medoid_vs_centroid_lab.py
Module 006_001: K-Medoids Clustering
Topic 1: Medoid and Centroid Comparison
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import numpy as np

def compute_centroid(points):
    """Centroid: Arithmetic mean coordinate (virtual point)."""
    return np.mean(points, axis=0)

def compute_medoid(points):
    """Medoid: The actual observation minimizing sum of pairwise distances."""
    min_dist_sum = float("inf")
    best_medoid = None
    best_idx = -1
    
    for i, candidate in enumerate(points):
        # L1 Manhattan distance sum
        dist_sum = np.sum(np.abs(points - candidate))
        if dist_sum < min_dist_sum:
            min_dist_sum = dist_sum
            best_medoid = candidate
            best_idx = i
            
    return best_medoid, best_idx, min_dist_sum

def compare_centroid_and_medoid():
    print("=" * 65)
    print(" Medoid vs. Centroid Rigorous Mathematical Comparison")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    # 5 normal patient vital signs + 1 severe outlier
    # [Heart Rate, Blood Pressure]
    patient_data = np.array([
        [72, 120],  # P0
        [75, 122],  # P1
        [70, 118],  # P2
        [74, 121],  # P3
        [71, 119],  # P4
        [190, 220]  # P5: Severe Emergency Outlier!
    ])
    
    print("\nPatient Cohort Data (N = 6):")
    for idx, pt in enumerate(patient_data):
        tag = " (OUTLIER)" if idx == 5 else ""
        print(f"  Patient P{idx}: Heart Rate={pt[0]} bpm, BP={pt[1]} mmHg{tag}")
        
    # 1. Calculate Centroid (K-Means)
    centroid = compute_centroid(patient_data)
    print("\n1. K-Means Centroid (Arithmetic Mean):")
    print(f"   Coordinates: Heart Rate = {centroid[0]:.2f} bpm, BP = {centroid[1]:.2f} mmHg")
    print("   Analysis: Centroid is a VIRTUAL coordinate severely distorted by P5.")
    print("   Clinical Problem: No patient in the hospital has this profile!")
    
    # 2. Calculate Medoid (K-Medoids)
    medoid, medoid_idx, total_dist = compute_medoid(patient_data)
    print("\n2. K-Medoids Medoid (Actual Data Exemplar):")
    print(f"   Selected Point: Patient P{medoid_idx} -> Heart Rate = {medoid[0]} bpm, BP = {medoid[1]} mmHg")
    print(f"   Total Intra-Cluster L1 Distance Sum = {total_dist:.2f}")
    print("   Analysis: Medoid is a REAL PATIENT residing at the true cohort center.")
    print("   Clinical Advantage: Doctors can pull Patient P's physical chart directly!")

if __name__ == "__main__":
    compare_centroid_and_medoid()
