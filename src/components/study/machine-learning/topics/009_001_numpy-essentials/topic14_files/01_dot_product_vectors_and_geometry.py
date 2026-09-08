"""
01_dot_product_vectors_and_geometry.py
======================================
Topic: 1D Vector Dot Product, Geometric Interpretation & Cosine Similarity
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("1D VECTOR DOT PRODUCT & GEOMETRIC PROJECTION")
    print("=" * 70)

    # 1. Defining two vectors representing feature embeddings
    # e.g., Debangshu and Susmita's preference scores for [Action, Romance, Sci-Fi]
    u = np.array([4.0, 1.0, 5.0])
    v = np.array([3.0, 2.0, 4.0])

    print(f"Vector u (Debangshu): {u}, Shape: {u.shape}")
    print(f"Vector v (Susmita)  : {v}, Shape: {v.shape}")

    # 2. Algebraic Dot Product: sum(u_i * v_i)
    # 4*3 + 1*2 + 5*4 = 12 + 2 + 20 = 34
    dot_manual = np.sum(u * v)
    dot_np = np.dot(u, v)
    dot_matmul = u @ v  # Python 3.5+ infix matrix multiplication operator

    print(f"\nAlgebraic Calculation:")
    print(f"  Element-wise product (u * v)  : {u * v}")
    print(f"  np.sum(u * v)                 : {dot_manual}")
    print(f"  np.dot(u, v)                  : {dot_np}")
    print(f"  u @ v                         : {dot_matmul}")
    assert dot_manual == dot_np == dot_matmul == 34.0

    # 3. Geometric Interpretation: u . v = ||u|| * ||v|| * cos(theta)
    # Vector Norms (Euclidean lengths)
    norm_u = np.linalg.norm(u)  # sqrt(4^2 + 1^2 + 5^2) = sqrt(42) ≈ 6.4807
    norm_v = np.linalg.norm(v)  # sqrt(3^2 + 2^2 + 4^2) = sqrt(29) ≈ 5.3851

    # Cosine Similarity = (u . v) / (||u|| * ||v||)
    cos_theta = np.dot(u, v) / (norm_u * norm_v)
    theta_rad = np.arccos(np.clip(cos_theta, -1.0, 1.0))
    theta_deg = np.degrees(theta_rad)

    print(f"\nGeometric Analysis:")
    print(f"  Norm ||u||                    : {norm_u:.4f}")
    print(f"  Norm ||v||                    : {norm_v:.4f}")
    print(f"  Cosine Similarity (cos θ)     : {cos_theta:.4f}")
    print(f"  Angle between vectors θ       : {theta_deg:.2f}°")

    # 4. Orthogonal Vectors (Dot product = 0)
    ortho_1 = np.array([2.0, 0.0, -1.0])
    ortho_2 = np.array([1.0, 5.0, 2.0])
    # 2*1 + 0*5 + (-1)*2 = 2 + 0 - 2 = 0
    dot_ortho = np.dot(ortho_1, ortho_2)
    print(f"\nOrthogonal Test:")
    print(f"  ortho_1 . ortho_2             : {dot_ortho} (Vectors are perpendicular)")

if __name__ == "__main__":
    main()
