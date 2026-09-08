"""
01_problem1_one_hot_encoding.py
===============================
Practice Problem 1: Manual One-Hot Encoding via np.eye & Fancy Indexing
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def one_hot_encode(labels: np.ndarray, num_classes: int = None) -> np.ndarray:
    """Converts 1D integer class array into 2D One-Hot Encoded Matrix."""
    if num_classes is None:
        num_classes = np.max(labels) + 1
    # np.eye creates identity matrix of shape (C, C)
    # Fancy indexing with labels vector selects corresponding one-hot rows!
    return np.eye(num_classes)[labels]

def main():
    print("=" * 70)
    print("PRACTICE PROBLEM 1: VECTORIZED ONE-HOT ENCODING")
    print("=" * 70)

    # Integer student exam grades: [0: Fail, 1: Pass, 2: Merit, 3: Distinction]
    # Students: Debangshu (2), Susmita (3), Swadeep (1), Tuhina (3), Sachin (0)
    labels = np.array([2, 3, 1, 3, 0])
    class_names = ["Fail", "Pass", "Merit", "Distinction"]

    print("Input Class Labels:", labels)
    for i, l in enumerate(labels):
        print(f"  Student {i}: Label {l} ({class_names[l]})")

    # One-Hot Encoding
    one_hot = one_hot_encode(labels, num_classes=4)
    print(f"\nResulting One-Hot Matrix Shape: {one_hot.shape} (N=5, NumClasses=4)")
    print("One-Hot Encoded Matrix:\n", one_hot)

    # Verification: Row sum must equal 1.0 everywhere
    assert np.all(np.sum(one_hot, axis=1) == 1.0)
    # Decoding back via argmax
    decoded = np.argmax(one_hot, axis=1)
    assert np.all(decoded == labels)
    print("\nDecoded back via np.argmax(axis=1):", decoded, "-> Matches perfectly!")

if __name__ == "__main__":
    main()
