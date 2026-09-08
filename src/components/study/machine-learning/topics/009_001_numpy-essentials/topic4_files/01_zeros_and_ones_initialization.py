"""
================================================================================
Topic 4 - Script 01: Zeros, Ones, and Full Constant Initializers in ML
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- np.zeros(shape, dtype=float64) for zero-initialized biases and accumulators
- np.ones(shape, dtype=float64) for mask creation and bias column augmentation
- np.full(shape, fill_value) for initializing custom default thresholds or priors
- np.zeros_like() and np.ones_like() for matching existing tensor dimensions
================================================================================
"""

import numpy as np

def demonstrate_zeros_and_ones():
    print("=" * 65)
    print("1. ZERO INITIALIZATION (ML Bias Vectors & Accumulators)")
    print("=" * 65)
    # Neural network bias vector for 10 output classes
    biases = np.zeros(10, dtype=np.float32)
    print("Class Biases Vector (shape (10,)):\n", biases)
    
    # 2D Zero Matrix for Gradient Accumulator (3 layers x 4 neurons)
    grad_acc = np.zeros((3, 4), dtype=np.float32)
    print("\nGradient Accumulator Matrix:\n", grad_acc)

    print("\n" + "=" * 65)
    print("2. ONES & FULL INITIALIZATION")
    print("=" * 65)
    # Unit weights matrix
    unit_weights = np.ones((2, 3), dtype=np.float32)
    print("Unit Weights (2, 3):\n", unit_weights)
    
    # Initializing all sentiment scores to neutral score 0.5
    sentiment_priors = np.full((3, 3), fill_value=0.5, dtype=np.float32)
    print("\nCustom Prior Matrix (fill_value=0.5):\n", sentiment_priors)

    print("\n" + "=" * 65)
    print("3. MATCHING SHAPES WITH _like() VARIANTS")
    print("=" * 65)
    student_marks = np.array([[80, 85, 90], [70, 75, 80]])
    # Create matching mask of booleans or floats
    mask = np.ones_like(student_marks, dtype=bool)
    print("Original Marks Shape:", student_marks.shape)
    print("Matched Ones Mask:\n", mask)

if __name__ == "__main__":
    demonstrate_zeros_and_ones()
