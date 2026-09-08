"""
================================================================================
Topic 10 - Script 03: In-Place Arithmetic Operators (+=, -=, *=, /=) & RAM
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Memory efficiency of in-place operators: +=, -=, *=, /=
- Comparing memory addresses: `a += b` (Same buffer) vs `a = a + b` (New buffer allocation)
- In-place type casting rule: TypeError / Cannot cast ufunc output
================================================================================
"""

import numpy as np

def demonstrate_inplace_arithmetic():
    print("=" * 65)
    print("MEMORY RE-USE: `a += b` vs `a = a + b`")
    print("=" * 65)

    # In-Place Addition
    a_inplace = np.array([10.0, 20.0, 30.0])
    orig_addr_1 = a_inplace.ctypes.data
    print("Initial address of a_inplace:", hex(orig_addr_1))

    a_inplace += 5.0
    new_addr_1 = a_inplace.ctypes.data
    print("Address after `a_inplace += 5.0`:", hex(new_addr_1))
    print("Addresses Match:", orig_addr_1 == new_addr_1, "(Zero memory allocation!)")

    print("\n" + "-" * 50)
    # Standard Out-of-Place Addition
    a_outplace = np.array([10.0, 20.0, 30.0])
    orig_addr_2 = a_outplace.ctypes.data
    print("Initial address of a_outplace:", hex(orig_addr_2))

    a_outplace = a_outplace + 5.0
    new_addr_2 = a_outplace.ctypes.data
    print("Address after `a_outplace = a_outplace + 5.0`:", hex(new_addr_2))
    print("Addresses Match:", orig_addr_2 == new_addr_2, "(Allocated a brand new array!)")

if __name__ == "__main__":
    demonstrate_inplace_arithmetic()
