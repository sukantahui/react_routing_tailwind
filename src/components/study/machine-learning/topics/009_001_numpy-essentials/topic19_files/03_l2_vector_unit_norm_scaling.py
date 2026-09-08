"""
03_l2_vector_unit_norm_scaling.py
=================================
Worked Example 3: Sample-wise L2 Unit Vector Normalization (Cosine Similarity Prep)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def l2_normalize_rows(X: np.ndarray, eps: float = 1e-12) -> np.ndarray:
    """Normalizes each row vector to unit length ||x||_2 = 1.0."""
    # Compute L2 norm per row: axis=1 with keepdims=True to get (N, 1)
    # L2 norm = sqrt(sum(x_i^2))
    row_norms = np.linalg.norm(X, ord=2, axis=1, keepdims=True)
    # Avoid zero division
    row_norms = np.maximum(row_norms, eps)
    return X / row_norms

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 3: ROW-WISE L2 UNIT VECTOR NORMALIZATION")
    print("=" * 70)

    # Word / Document TF-IDF or Embedding Vectors for 3 students
    # Debangshu, Susmita, Swadeep text representations
    embeddings = np.array([
        [3.0, 4.0, 0.0],
        [1.0, 2.0, 2.0],
        [0.0, 5.0, 12.0]
    ])

    print("1. Raw Embedding Vectors:\n", embeddings)
    norms_before = np.linalg.norm(embeddings, axis=1)
    print("   Original Row Norms (Euclidean lengths):", np.round(norms_before, 4))

    # Normalize rows
    unit_embeddings = l2_normalize_rows(embeddings)
    print("\n2. L2 Unit Normalized Vectors:\n", np.round(unit_embeddings, 4))

    # Verify unit lengths: ||x||_2 == 1.0
    norms_after = np.linalg.norm(unit_embeddings, axis=1)
    print("\n3. Normalized Row Norms:", np.round(norms_after, 4))
    assert np.allclose(norms_after, 1.0)

    # Pairwise Cosine Similarity between Debangshu (row 0) & Susmita (row 1)
    # For unit vectors, cosine similarity is simply the dot product!
    cos_sim = np.dot(unit_embeddings[0], unit_embeddings[1])
    print(f"\n4. Cosine Similarity (Debangshu vs Susmita): {cos_sim:.4f}")

if __name__ == "__main__":
    main()
