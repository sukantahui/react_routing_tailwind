# =====================================================================
# CBSE Class 12 Computer Science (083) - Master Lab Suite
# Complete Module 2: Functions, Scope Rules & Modular Architecture
# Author: Sukanta Hui | Institute: Coder & AccoTax
# =====================================================================

"""
This master executable Python script contains verified laboratory implementations
for all functions, parameters, scope rules (LEGB), the global statement,
pass-by-object-reference, and modular imports required by CBSE Class 12 CS (083).
"""

import math
import random

# Module-Level Global Variable
TOTAL_CALLS = 0

def demonstrate_functions(x, y=10, *extra):
    """Demonstrates positional, default, and variable arguments."""
    global TOTAL_CALLS
    TOTAL_CALLS += 1
    total = x + y + sum(extra)
    return total, TOTAL_CALLS

def demonstrate_pass_by_reference(my_list, my_num):
    """
    my_list: mutable (will be altered in caller)
    my_num: immutable (will NOT be altered in caller)
    """
    my_list.append("NEW_ITEM")
    my_num += 100
    return my_list, my_num

def demonstrate_legb_resolution():
    """Demonstrates LEGB namespace resolution hierarchy."""
    resolved_val = "LOCAL"
    return f"Resolved identifier: {resolved_val}"

if __name__ == '__main__':
    print("--- 1. Testing Multi-Argument Function ---")
    res, count = demonstrate_functions(5, 20, 1, 2, 3)
    print(f"Result = {res}, Total Calls Recorded = {count}")

    print("\n--- 2. Testing Pass-by-Object-Reference ---")
    data_list = [10, 20]
    num_val = 50
    print(f"Before: list={data_list}, num={num_val}")
    demonstrate_pass_by_reference(data_list, num_val)
    print(f"After: list={data_list} (mutated!), num={num_val} (unchanged!)")

    print("\n--- 3. Testing LEGB Resolution ---")
    print(demonstrate_legb_resolution())
    print("\n--- Module 2 Laboratory Suite Executed Successfully ---")
