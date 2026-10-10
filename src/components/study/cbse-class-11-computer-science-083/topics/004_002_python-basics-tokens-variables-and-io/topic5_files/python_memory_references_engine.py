"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 5: Variables as Object References, id() function, and Garbage Collection

This script demonstrates Python's memory model:
1. Variables as object references (names bound to heap objects)
2. Memory address inspection via id()
3. Object Identity ('is') vs Value Equality ('==')
4. Small integer caching / interning range (-5 to 256)
5. Reference counting and automatic garbage collection
"""

import sys
import gc

def demonstrate_object_references(val: int) -> dict:
    """Demonstrates variable aliasing and shared object references."""
    a = val
    b = a  # b references the exact same object as a
    c = val
    
    return {
        "a_val": a,
        "b_val": b,
        "c_val": c,
        "id_a": id(a),
        "id_b": id(b),
        "id_c": id(c),
        "are_a_b_same_object": (a is b),
        "are_a_c_same_object": (a is c),
        "ref_count_approx": sys.getrefcount(a)
    }


def demonstrate_is_vs_equality() -> dict:
    """Demonstrates difference between '==' (value equality) and 'is' (identity)."""
    # Two distinct list objects with identical contents
    list1 = [1, 2, 3]
    list2 = [1, 2, 3]
    list3 = list1 # Alias
    
    return {
        "list1_id": id(list1),
        "list2_id": id(list2),
        "list3_id": id(list3),
        "value_equality_1_2": (list1 == list2),  # True (same values)
        "identity_1_2": (list1 is list2),        # False (different memory addresses)
        "identity_1_3": (list1 is list3)         # True (exact same object)
    }


def demonstrate_small_int_caching() -> dict:
    """Demonstrates Python's small integer caching (-5 to 256)."""
    # Inside caching range (e.g. 100)
    x1 = 100
    y1 = 100
    
    # Outside caching range (e.g. 1000)
    x2 = 1000
    y2 = 1000
    
    return {
        "small_int_100_same_id": (x1 is y1),
        "x1_id": id(x1),
        "y1_id": id(y1),
        "large_int_1000_same_id": (x2 is y2), # Might differ in interactive shell
        "x2_id": id(x2),
        "y2_id": id(y2)
    }


if __name__ == "__main__":
    print("=== 1. OBJECT REFERENCES & ID() ===")
    ref_demo = demonstrate_object_references(42)
    print(f"a=42 id: {ref_demo['id_a']} | b=a id: {ref_demo['id_b']}")
    print(f"a is b: {ref_demo['are_a_b_same_object']}")
    
    print("\n=== 2. IDENTITY (is) VS EQUALITY (==) ===")
    eq_demo = demonstrate_is_vs_equality()
    print(f"list1 == list2: {eq_demo['value_equality_1_2']}")
    print(f"list1 is list2: {eq_demo['identity_1_2']} (Different memory addresses)")
    print(f"list1 is list3: {eq_demo['identity_1_3']} (Aliased reference)")
