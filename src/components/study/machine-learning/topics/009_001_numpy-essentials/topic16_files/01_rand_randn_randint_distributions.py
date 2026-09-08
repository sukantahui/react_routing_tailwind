"""
01_rand_randn_randint_distributions.py
======================================
Topic: NumPy Random Distributions: rand, randn, randint, uniform, normal
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("NUMPY RANDOM DISTRIBUTIONS & SAMPLING")
    print("=" * 70)

    # 1. Standard Uniform Distribution: np.random.rand(d0, d1, ...) or uniform(low, high, size)
    # Generates continuous float values in [0.0, 1.0)
    uniform_samples = np.random.rand(4, 3)
    print("1. Standard Uniform [0, 1) rand(4, 3):\n", np.round(uniform_samples, 4))

    # Scaled uniform distribution between [50.0, 100.0) for exam marks
    scaled_uniform = np.random.uniform(low=50.0, high=100.0, size=(4,))
    print("\n   Custom Uniform [50, 100) Marks:\n", np.round(scaled_uniform, 2))

    # 2. Standard Normal (Gaussian) Distribution: np.random.randn(d0, d1, ...) or normal(mu, sigma, size)
    # Generates samples from N(mean=0, std=1) with bell-curve probability
    normal_samples = np.random.randn(5)
    print("\n2. Standard Normal N(0, 1) randn(5):\n", np.round(normal_samples, 4))

    # Custom Gaussian: Mean student score = 75, Standard deviation = 8.5
    student_scores = np.random.normal(loc=75.0, scale=8.5, size=1000)
    print(f"\n   Custom Normal N(75, 8.5^2) over 1000 samples:")
    print(f"   Empirical Mean : {np.mean(student_scores):.4f} (Expected ~75.0)")
    print(f"   Empirical Std  : {np.std(student_scores):.4f}  (Expected ~8.5)")

    # 3. Discrete Uniform Integers: np.random.randint(low, high, size)
    # Note: 'low' is inclusive, 'high' is EXCLUSIVE!
    dice_rolls = np.random.randint(low=1, high=7, size=(3, 4))
    print("\n3. Discrete Integers randint(1, 7, size=(3, 4)) [Dice Rolls]:\n", dice_rolls)

if __name__ == "__main__":
    main()
