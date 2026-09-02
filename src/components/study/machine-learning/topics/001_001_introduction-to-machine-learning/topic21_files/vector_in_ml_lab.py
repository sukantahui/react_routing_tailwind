"""
===============================================================================
CODER & ACCOTAX ML LAB: Vector Foundations & Operations
File: vector_in_ml_lab.py
Module: 001_001 Introduction to Machine Learning • Topic 21
Educator: Teacher (Barrackpore, West Bengal)
===============================================================================
"""

import numpy as np
import time

def run_vector_demo():
    print("=" * 75)
    print("  CODER & ACCOTAX ML LAB: Plain Vector Foundations & ML Feature Vectors")
    print("  Educator: Teacher | Location: Barrackpore")
    print("=" * 75)

    # -------------------------------------------------------------------------
    # PART 1: PLAIN VECTOR CONCEPT (PHYSICS & GEOMETRY)
    # -------------------------------------------------------------------------
    print("\n1. PLAIN VECTOR CONCEPT (2D Physical Displacement Arrows):")
    v_A = np.array([4.0, 3.0])
    v_B = np.array([1.0, 5.0])

    print(f"   Plain Vector A (Arrow 1): {v_A}")
    print(f"   Plain Vector B (Arrow 2): {v_B}")

    v_sum = v_A + v_B
    print(f"   Resultant Vector Sum (A + B): {v_sum}")

    mag_A = np.linalg.norm(v_A)
    mag_B = np.linalg.norm(v_B)
    print(f"   Magnitude ||A||: {mag_A:.2f} units (Straight line distance from origin)")
    print(f"   Magnitude ||B||: {mag_B:.2f} units")

    # -------------------------------------------------------------------------
    # PART 2: MACHINE LEARNING FEATURE VECTORS
    # -------------------------------------------------------------------------
    print("\n2. ML FEATURE VECTORS (Generalizing to d-Dimensional Attribute Space):")
    x1 = np.array([28.0, 5.5, 0.85, 20.0])
    x2 = np.array([32.0, 6.0, 0.88, 22.0])

    print(f"   Customer 1 Feature Vector (x1 in R^4): {x1}")
    print(f"   Customer 2 Feature Vector (x2 in R^4): {x2}")

    v_diff = x2 - x1
    print(f"   Attribute Difference Vector (x2 - x1): {v_diff}")

    norm_x1 = np.linalg.norm(x1)
    norm_x2 = np.linalg.norm(x2)
    print(f"   ||x1|| = {norm_x1:.4f}")
    print(f"   ||x2|| = {norm_x2:.4f}")

    # -------------------------------------------------------------------------
    # PART 3: DOT PRODUCT & LINEAR MODEL PREDICTION
    # -------------------------------------------------------------------------
    w = np.array([0.02, 0.35, 0.50, -0.10])
    b = 0.05
    y_hat1 = np.dot(w, x1) + b
    print(f"\n3. Dot Product Credit Score Prediction (w^T * x1 + b):")
    print(f"   Model Weights w: {w}")
    print(f"   Predicted Credit Score (y_hat1): {y_hat1:.4f}")

    # -------------------------------------------------------------------------
    # PART 4: COSINE SIMILARITY & ANGLE
    # -------------------------------------------------------------------------
    dot_product = np.dot(x1, x2)
    cosine_sim = dot_product / (norm_x1 * norm_x2)
    angle_rad = np.arccos(np.clip(cosine_sim, -1.0, 1.0))
    angle_deg = np.degrees(angle_rad)
    print(f"\n4. Cosine Similarity & Vector Direction Angle:")
    print(f"   Dot Product (x1 . x2): {dot_product:.4f}")
    print(f"   Cosine Similarity: {cosine_sim:.4f}")
    print(f"   Angle Between Feature Vectors: {angle_deg:.2f} degrees")

    # -------------------------------------------------------------------------
    # PART 5: NUMPY VECTORIZATION SPEEDUP TEST
    # -------------------------------------------------------------------------
    N = 1_000_000
    a_list = list(range(N))
    b_list = list(range(N))
    a_np = np.array(a_list, dtype=np.float64)
    b_np = np.array(b_list, dtype=np.float64)

    start_time = time.time()
    dot_loop = sum(x * y for x, y in zip(a_list, b_list))
    loop_time = time.time() - start_time

    start_time = time.time()
    dot_np = np.dot(a_np, b_np)
    np_time = time.time() - start_time

    print(f"\n5. Hardware Vectorization Performance (N = 1,000,000 dimension):")
    print(f"   Python Loop Time:  {loop_time * 1000:.2f} ms")
    print(f"   NumPy Vector Time: {np_time * 1000:.2f} ms")
    print(f"   🚀 SIMD Speedup:   {loop_time / np_time:.1f}x faster!")

    print("\n" + "=" * 75)
    print("  Vector Foundations Demo Execution Completed Successfully!")
    print("=" * 75)

if __name__ == '__main__':
    run_vector_demo()
