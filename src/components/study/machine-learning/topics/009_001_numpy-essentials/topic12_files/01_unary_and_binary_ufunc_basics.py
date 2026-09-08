"""
================================================================================
Topic 12 - Script 01: Unary and Binary Universal Functions (ufuncs)
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- What is a ufunc: C-level vectorized function operating element-by-element
- Unary ufuncs: np.abs(), np.sqrt(), np.exp(), np.log(), np.sin()
- Binary ufuncs: np.add(), np.maximum(), np.minimum(), np.power()
================================================================================
"""

import numpy as np

def demonstrate_ufunc_basics():
    print("=" * 65)
    print("1. UNARY UNIVERSAL FUNCTIONS (1 INPUT -> 1 OUTPUT)")
    print("=" * 65)

    z = np.array([-2.5, 0.0, 1.5, 3.0])
    print("Input Vector z:", z)
    print("-" * 45)
    print("np.abs(z)  :", np.abs(z))
    print("np.exp(z)  :", np.exp(z))
    print("np.sqrt(|z|):", np.sqrt(np.abs(z)))
    print("np.sin(z)  :", np.sin(z))

    print("\n" + "=" * 65)
    print("2. BINARY UNIVERSAL FUNCTIONS (2 INPUTS -> 1 OUTPUT)")
    print("=" * 65)
    
    a = np.array([10, 50, 30, 80])
    b = np.array([25, 40, 60, 20])

    print("Array a:", a)
    print("Array b:", b)
    print("-" * 45)
    print("np.maximum(a, b) :", np.maximum(a, b), " (Element-wise ceiling)")
    print("np.minimum(a, b) :", np.minimum(a, b), " (Element-wise floor)")
    print("np.power(a, 2)   :", np.power(a, 2))

if __name__ == "__main__":
    demonstrate_ufunc_basics()
