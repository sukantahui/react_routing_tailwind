"""
================================================================================
Topic 9 - Script 04: Stochastic Mini-Batch Sampling & Dataset Shuffling
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Stochastic Gradient Descent (SGD) mini-batch extraction using fancy indexing
- Generating random index permutations with np.random.permutation(n)
- Shuffling feature matrix X and target labels y in perfect synchrony
================================================================================
"""

import numpy as np

def demonstrate_sgd_sampling():
    print("=" * 65)
    print("ML PIPELINE: Stochastic Mini-Batch Extraction & Shuffling")
    print("=" * 65)

    np.random.seed(42)
    n_samples = 10
    n_features = 3

    # Generate student feature dataset X and target labels y
    X = np.random.randint(50, 100, size=(n_samples, n_features))
    y = np.array([0, 1, 1, 0, 1, 0, 1, 1, 0, 0])

    print("Master Feature Matrix X (10 samples):\n", X)
    print("Master Labels y:", y)

    print("\n" + "=" * 65)
    print("1. SHUFFLING X AND y SYNCHRONOUSLY")
    print("=" * 65)
    
    # Generate random permutation of indices 0 to 9
    shuffled_indices = np.random.permutation(n_samples)
    print("Shuffled Index Order:", shuffled_indices)

    # Apply permutation to both X and y simultaneously
    X_shuffled = X[shuffled_indices]
    y_shuffled = y[shuffled_indices]

    print("\nShuffled X (Top 3 rows):\n", X_shuffled[:3])
    print("Shuffled y (Top 3 items):", y_shuffled[:3])

    print("\n" + "=" * 65)
    print("2. EXTRACTING RANDOM MINI-BATCH (BATCH_SIZE = 4)")
    print("=" * 65)
    
    batch_size = 4
    batch_indices = np.random.choice(n_samples, size=batch_size, replace=False)
    print("Sampled Batch Indices:", batch_indices)

    X_batch = X[batch_indices]
    y_batch = y[batch_indices]

    print(f"X_batch Shape {X_batch.shape}:\n", X_batch)
    print(f"y_batch Shape {y_batch.shape}:", y_batch)

if __name__ == "__main__":
    demonstrate_sgd_sampling()
