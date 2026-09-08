"""
02_random_seed_and_generator_reproducibility.py
===============================================
Topic: Random Seeds, Reproducibility, Legacy np.random vs Modern default_rng (PCG64)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("REPRODUCIBILITY: LEGACY np.random.seed VS MODERN default_rng")
    print("=" * 70)

    # 1. Why Reproducibility Matters in ML:
    # Train-test splits, weight initializations, and k-fold shuffles MUST be reproducible
    # so that Debangshu and Susmita get identical benchmark results on the same code.

    # 2. Legacy Method: np.random.seed(seed) (Global State - Not Thread Safe)
    np.random.seed(42)
    sample_legacy_1 = np.random.rand(3)
    
    np.random.seed(42)  # Resetting global seed produces identical numbers
    sample_legacy_2 = np.random.rand(3)
    
    print("1. Legacy np.random.seed(42):")
    print("   Run 1:", np.round(sample_legacy_1, 4))
    print("   Run 2:", np.round(sample_legacy_2, 4))
    assert np.all(sample_legacy_1 == sample_legacy_2)

    # 3. Modern Recommended Method (NumPy 1.17+): np.random.default_rng(seed)
    # Uses PCG64 bit-generator. Isolated generator instance, fast, statistically superior.
    rng = np.random.default_rng(seed=2026)

    val_uniform = rng.random((2, 3))           # Uniform [0, 1)
    val_integers = rng.integers(1, 100, size=5) # Discrete integers [1, 100)
    val_normal = rng.normal(loc=0, scale=1, size=(2, 2)) # Gaussian

    print("\n2. Modern np.random.default_rng(seed=2026):")
    print("   rng.random((2, 3)):\n", np.round(val_uniform, 4))
    print("   rng.integers(1, 100, size=5):\n", val_integers)
    print("   rng.normal(0, 1, size=(2, 2)):\n", np.round(val_normal, 4))

if __name__ == "__main__":
    main()
