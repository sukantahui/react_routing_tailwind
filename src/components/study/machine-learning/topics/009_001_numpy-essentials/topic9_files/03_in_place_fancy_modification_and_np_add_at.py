"""
================================================================================
Topic 9 - Script 03: In-Place Modification & Repeated Index Buffering (np.add.at)
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Mutating original arrays via fancy assignment: arr[indices] = new_values
- The Repeated Index Race Condition: arr[[1, 1, 1]] += 1 only increments ONCE
- Using np.add.at(arr, indices, values) for unbuffered histogram accumulation
================================================================================
"""

import numpy as np

def demonstrate_fancy_mutations():
    print("=" * 65)
    print("1. DIRECT IN-PLACE FANCY ASSIGNMENT")
    print("=" * 65)

    arr = np.zeros(6, dtype=int)
    print("Initial Array:", arr)

    # Overwrite indices 0, 2, 4 with 100, 200, 300
    arr[[0, 2, 4]] = [100, 200, 300]
    print("After arr[[0, 2, 4]] = [100, 200, 300]:", arr)

    print("\n" + "=" * 65)
    print("2. THE REPEATED INDEX RACE CONDITION TRAP")
    print("=" * 65)
    
    counts = np.zeros(5, dtype=int)
    # Sachin tries to increment index 1 three times:
    counts[[1, 1, 1]] += 1
    print("counts[[1, 1, 1]] += 1 Result:", counts)
    print("TRAP EXPLANATION: Standard Python buffered evaluation reads counts[1]=0 once,")
    print("adds 1, and writes 1 back three times. Final value is 1, NOT 3!")

    print("\n" + "=" * 65)
    print("3. THE FIX: np.add.at() FOR UNBUFFERED ACCUMULATION")
    print("=" * 65)
    
    correct_counts = np.zeros(5, dtype=int)
    np.add.at(correct_counts, [1, 1, 1, 3], 1)
    print("np.add.at(correct_counts, [1, 1, 1, 3], 1) Result:", correct_counts)
    print("Index 1 was correctly incremented 3 times -> value is 3!")

if __name__ == "__main__":
    demonstrate_fancy_mutations()
