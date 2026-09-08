"""
================================================================================
Topic 13 - Script 03: Finding Extrema Indices with np.argmin() and np.argmax()
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- np.argmax() & np.argmin(): Locating index positions of maximum and minimum values
- Multi-class classification: Converting Softmax probability distributions to class labels
- Finding top-performing students and identifying highest-loss training samples
================================================================================
"""

import numpy as np

def demonstrate_argmin_argmax():
    print("=" * 65)
    print("1. 1D VECTOR EXTREMA INDEX DISCOVERY")
    print("=" * 65)

    scores = np.array([72, 88, 95, 60, 84, 91])
    students = ["Debangshu", "Susmita", "Tuhina", "Swadeep", "Sachin", "Mahima"]

    max_idx = np.argmax(scores)
    min_idx = np.argmin(scores)

    print("Scores   :", scores)
    print(f"Top Scorer  : {students[max_idx]} with {scores[max_idx]} marks (Index {max_idx})")
    print(f"Lowest Score: {students[min_idx]} with {scores[min_idx]} marks (Index {min_idx})")

    print("\n" + "=" * 65)
    print("2. MULTI-CLASS ML PREDICTION (SOFTMAX -> CLASS LABELS)")
    print("=" * 65)
    
    # 4 sample images x 3 output classes (0: 'Cat', 1: 'Dog', 2: 'Bird')
    # Softmax probabilities output by a Neural Network:
    predicted_probs = np.array([
        [0.12, 0.81, 0.07],  # Sample 0 -> Dog (Class 1)
        [0.90, 0.05, 0.05],  # Sample 1 -> Cat (Class 0)
        [0.05, 0.15, 0.80],  # Sample 2 -> Bird (Class 2)
        [0.25, 0.65, 0.10]   # Sample 3 -> Dog (Class 1)
    ])
    classes = ["Cat", "Dog", "Bird"]

    # axis=1: Find the winning class per sample row
    winning_class_indices = np.argmax(predicted_probs, axis=1)
    winning_probabilities = np.max(predicted_probs, axis=1)

    print("Softmax Probability Matrix (4x3):\n", predicted_probs)
    print("\nArgmax Class Predictions (axis=1):", winning_class_indices)

    for i, (cls_idx, prob) in enumerate(zip(winning_class_indices, winning_probabilities)):
        print(f"  Image {i}: Predicted '{classes[cls_idx]}' (Confidence: {prob*100:.1f}%)")

if __name__ == "__main__":
    demonstrate_argmin_argmax()
