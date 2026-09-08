"""
================================================================================
Topic 8 - Script 03: Conditional In-Place Mutation & Implementing Neural ReLU
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- In-place mutation using boolean masking: arr[mask] = new_value
- Implementing ReLU (Rectified Linear Unit): x[x < 0] = 0
- Value clipping and threshold capping (np.clip vs mask assignment)
- np.where(condition, x, y) for branchless ternary selection
================================================================================
"""

import numpy as np

def demonstrate_conditional_mutation():
    print("=" * 65)
    print("1. IMPLEMENTING NEURAL NETWORK ReLU ACTIVATION")
    print("=" * 65)

    # Simulated pre-activation raw layer outputs (logits with negative values)
    raw_logits = np.array([
        [-2.5,  1.4, -0.8,  3.2],
        [ 0.5, -4.1,  2.0, -1.1]
    ], dtype=np.float32)
    print("Raw Logits (Before ReLU):\n", raw_logits)

    # Fast in-place ReLU: replace all negative numbers with 0
    relu_out = raw_logits.copy()
    relu_out[relu_out < 0] = 0.0
    print("\nAfter In-Place ReLU (relu_out[relu_out < 0] = 0.0):\n", relu_out)

    print("\n" + "=" * 65)
    print("2. TERNARY SELECTION WITH np.where()")
    print("=" * 65)
    
    # Binary classification thresholding: Pass (1) if score >= 60 else Fail (0)
    final_scores = np.array([78, 45, 92, 59, 83])
    predicted_classes = np.where(final_scores >= 60, 1, 0)
    
    print("Scores            :", final_scores)
    print("Predicted Classes :", predicted_classes)

if __name__ == "__main__":
    demonstrate_conditional_mutation()
