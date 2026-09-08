"""
04_problem4_minibatch_generator.py
==================================
Practice Problem 4: Synchronous Shuffling & Mini-Batch Generator for SGD Training
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def generate_mini_batches(X: np.ndarray, y: np.ndarray, batch_size: int = 3, shuffle: bool = True, seed: int = 42):
    """Yields mini-batches of (X_batch, y_batch) with synchronous shuffling."""
    N = len(X)
    indices = np.arange(N)
    
    if shuffle:
        rng = np.random.default_rng(seed=seed)
        rng.shuffle(indices)
        
    for start_idx in range(0, N, batch_size):
        end_idx = min(start_idx + batch_size, N)
        batch_idx = indices[start_idx:end_idx]
        yield X[batch_idx], y[batch_idx]

def main():
    print("=" * 70)
    print("PRACTICE PROBLEM 4: MINI-BATCH GENERATOR FOR NEURAL NETWORKS")
    print("=" * 70)

    # Dataset: 8 students, 2 features (Math, Science), 1 binary label (Pass/Fail)
    X = np.array([
        [85, 90], [92, 95], [65, 70], [88, 85],
        [78, 80], [95, 98], [55, 60], [82, 84]
    ])
    y = np.array([1, 1, 0, 1, 0, 1, 0, 1])
    batch_size = 3

    print(f"Total Dataset: N={len(X)} samples, Batch Size={batch_size}")

    # Iterate through 1 Epoch of training
    print("\n--- Epoch 1 Mini-Batch Iteration ---")
    batch_count = 0
    for b_idx, (X_batch, y_batch) in enumerate(generate_mini_batches(X, y, batch_size=batch_size, shuffle=True, seed=42), 1):
        batch_count += 1
        print(f"\nBatch {b_idx} (Size={len(X_batch)}):")
        print("  X_batch:\n", X_batch)
        print("  y_batch:", y_batch)

    print(f"\nCompleted Epoch with {batch_count} mini-batches (Handles remaining leftover sample correctly).")

if __name__ == "__main__":
    main()
