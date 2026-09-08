"""
================================================================================
Topic 1 - Script 02: Standard Import Conventions vs Namespace Pollution
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Standard convention: `import numpy as np`
- The dangers of `from numpy import *` (Namespace collision with built-in sum, min, max, all, any)
- Performance and readability implications in collaborative ML projects
================================================================================
"""

import numpy as np

def demonstrate_import_best_practices():
    print("=" * 65)
    print("DEMO: The Universal Standard - 'import numpy as np'")
    print("=" * 65)
    
    # Standard usage
    arr = np.array([10, 20, 30, 40, 50])
    print("Array created with np.array():", arr)
    print("Calculated mean with np.mean():", np.mean(arr))
    
    print("\n" + "=" * 65)
    print("WARNING: Why 'from numpy import *' Breaks Python Code")
    print("=" * 65)
    print("1. Python has built-in 'sum([1, 2, 3])'")
    print("2. NumPy has 'np.sum(arr)' which operates differently on ndarrays.")
    print("3. Wildcard import overrides Python's built-in sum(), min(), max(),")
    print("   leading to subtle type bugs when other developers read the code.")
    
    # Example comparison
    py_list = [1, 2, 3, 4]
    print("\nBuilt-in sum(py_list):", sum(py_list), type(sum(py_list)))
    print("np.sum(arr):          ", np.sum(arr), type(np.sum(arr)))
    
    print("\n[RULE OF THUMB IN BARRACKPORE LAB]:")
    print("Always use 'import numpy as np'. Never alias as 'num', 'np1', or use wildcard '*'.")

if __name__ == "__main__":
    demonstrate_import_best_practices()
