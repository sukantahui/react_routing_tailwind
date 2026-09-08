"""
03_choice_and_permutation_sampling.py
=====================================
Topic: Discrete Sampling: choice, replacement, weighted probabilities, and shuffling
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("SAMPLING: CHOICE, WEIGHTED PROBABILITIES & PERMUTATIONS")
    print("=" * 70)

    rng = np.random.default_rng(seed=42)
    students = np.array(["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"])

    # 1. Random Choice with & without replacement
    # Without replacement (Sampling for 3 distinct presentation leaders)
    leaders = rng.choice(students, size=3, replace=False)
    print("1. Sampling without replacement (Distinct winners):", leaders)

    # With replacement (Bootstrapping 6 samples from existing pool)
    bootstrap_sample = rng.choice(students, size=6, replace=True)
    print("2. Bootstrap sampling with replacement:", bootstrap_sample)

    # 2. Weighted Random Choice (Simulating Class Imbalance in ML)
    # E.g. Fraud detection: 95% Normal (0), 5% Fraud (1)
    classes = np.array(["Normal_0", "Fraud_1"])
    imbalanced_batch = rng.choice(classes, size=10, p=[0.95, 0.05])
    print("\n3. Weighted Sampling (p=[0.95, 0.05]):", imbalanced_batch)

    # 3. Permutation vs In-place Shuffle
    indices = np.arange(6)
    
    # rng.permutation returns a NEW shuffled copy
    shuffled_copy = rng.permutation(indices)
    print("\n4. rng.permutation (Returns copy):")
    print("   Original :", indices)
    print("   Shuffled :", shuffled_copy)

    # rng.shuffle modifies the array IN-PLACE
    arr_to_mutate = np.copy(students)
    rng.shuffle(arr_to_mutate)
    print("\n5. rng.shuffle (Mutates in-place):")
    print("   Mutated Array:", arr_to_mutate)

if __name__ == "__main__":
    main()
