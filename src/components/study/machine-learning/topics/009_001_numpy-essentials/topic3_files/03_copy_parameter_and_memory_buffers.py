"""
================================================================================
Topic 3 - Script 03: The copy Parameter and Buffer Protocol
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- The `copy` parameter in `np.array(source, copy=True/False)`
- Zero-copy view creation vs defensive copying
- `np.asarray()` as an efficient alternative that avoids unnecessary memory copies
================================================================================
"""

import numpy as np

def demonstrate_copy_semantics():
    print("=" * 65)
    print("DEMO: np.array(arr, copy=True) vs np.asarray(arr)")
    print("=" * 65)

    original = np.array([100, 200, 300, 400], dtype=np.int32)
    
    # Passing existing array with copy=True (Default behavior in many contexts)
    forced_copy = np.array(original, copy=True)
    
    # Passing existing array to np.asarray (Reuses buffer if dtype matches)
    reused_view = np.asarray(original)

    print("Original memory address   :", hex(original.ctypes.data))
    print("Forced copy address       :", hex(forced_copy.ctypes.data), "(Different -> New Allocation)")
    print("asarray address           :", hex(reused_view.ctypes.data), "(Identical -> Zero-Copy)")

    # Modifying original
    original[0] = 999
    print("\nAfter mutating original[0] = 999:")
    print("Original Array :", original)
    print("Forced Copy    :", forced_copy, " (Unchanged!)")
    print("asarray View   :", reused_view, " (Mutated because it shares buffer!)")

if __name__ == "__main__":
    demonstrate_copy_semantics()
