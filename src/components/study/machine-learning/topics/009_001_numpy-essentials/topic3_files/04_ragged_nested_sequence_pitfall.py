"""
================================================================================
Topic 3 - Script 04: The Ragged Nested Sequence Pitfall & ML Zero-Padding
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Why creating arrays from lists of uneven lengths is deprecated (ValueError / Object array)
- The Rectangular Matrix Requirement of ndarrays
- Standard ML Preprocessing Solution: Zero-Padding sequences to equal length
================================================================================
"""

import numpy as np

def demonstrate_ragged_and_padding():
    print("=" * 65)
    print("1. THE PITFALL: INHOMOGENEOUS (RAGGED) LISTS")
    print("=" * 65)
    
    # 3 sentences with different token counts: [3 tokens, 2 tokens, 4 tokens]
    ragged_tokens = [
        [101, 2045, 102],       # Len 3
        [101, 102],             # Len 2
        [101, 7592, 2023, 102]  # Len 4
    ]
    print("Uneven sequence inputs:", ragged_tokens)
    print("Passing uneven sequences to np.array() causes deprecation warnings or ValueError.")

    print("\n" + "=" * 65)
    print("2. ML BEST PRACTICE: PADDING TO UNIFORM RECTANGULAR SHAPE")
    print("=" * 65)
    
    max_len = max(len(seq) for seq in ragged_tokens)
    pad_value = 0 # 0 is standard PAD token index
    
    padded_matrix = np.full((len(ragged_tokens), max_len), fill_value=pad_value, dtype=np.int32)
    for i, seq in enumerate(ragged_tokens):
        padded_matrix[i, :len(seq)] = seq

    print(f"Padded Uniform Matrix (Shape {padded_matrix.shape}):\n", padded_matrix)
    print("\nNow this rectangular matrix can be passed directly to Neural Networks / Scikit-learn!")

if __name__ == "__main__":
    demonstrate_ragged_and_padding()
