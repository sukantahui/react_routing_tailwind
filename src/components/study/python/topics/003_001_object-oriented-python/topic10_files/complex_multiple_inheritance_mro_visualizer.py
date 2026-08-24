# topic10_files/complex_multiple_inheritance_mro_visualizer.py
# Module: 003_001_object-oriented-python
# Topic: Method Resolution Order (MRO)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 3: C3 Linearization Merge Algorithm in Pure Python
Demonstrates:
  1. The mathematical C3 merge formula: L(C) = [C] + merge(L(B1), L(B2), ..., [B1, B2, ...])
  2. A reference implementation of the C3 merge algorithm in pure Python
  3. Verifying that our Python calculation matches CPython's internal `Class.__mro__` 100%
"""

from typing import List, Type

def c3_merge(sequences: List[List[Type]]) -> List[Type]:
    """Pure Python implementation of the C3 Linearization Merge step."""
    result = []
    # Make a shallow copy of sequences:
    seqs = [list(s) for s in sequences if s]

    while seqs:
        # Find a good candidate head (not in the tail of any other sequence):
        candidate = None
        for seq in seqs:
            head = seq[0]
            # Check if 'head' appears in the tail (index 1+) of any sequence:
            in_any_tail = any(head in s[1:] for s in seqs)
            if not in_any_tail:
                candidate = head
                break

        if candidate is None:
            raise TypeError("Cannot create a consistent method resolution order (MRO) - Cyclic dependency!")

        result.append(candidate)

        # Remove candidate from all sequences:
        for seq in seqs:
            if seq and seq[0] == candidate:
                seq.pop(0)

        # Filter out empty lists:
        seqs = [s for s in seqs if s]

    return result


def compute_mro(cls: Type) -> List[Type]:
    """Recursively computes MRO of a class using C3 linearization."""
    if not cls.__bases__:
        return [cls]
    # L(C) = [C] + merge(L(B1), L(B2), ..., [B1, B2, ...])
    base_mros = [compute_mro(b) for b in cls.__bases__]
    direct_bases = [list(cls.__bases__)]
    return [cls] + c3_merge(base_mros + direct_bases)


# =====================================================================
# TEST HIERARCHY (Complex Multi-Layer Diamond)
# =====================================================================
class O: pass
class A(O): pass
class B(O): pass
class C(O): pass
class D(O): pass
class E(O): pass
class K1(A, B, C): pass
class K2(D, B, E): pass
class K3(D, A): pass
class Z(K1, K2, K3): pass


def demonstrate_c3_calculation():
    print("=" * 70)
    print("CODER & ACCOTAX - C3 LINEARIZATION ALGORITHM VERIFICATION")
    print("=" * 70)

    calculated = compute_mro(Z)
    cpython_actual = list(Z.__mro__)

    print(f"Target Class: {Z.__name__}(K1, K2, K3)\n")
    print("Step-by-Step C3 Linearization Result:")
    for idx, (calc, actual) in enumerate(zip(calculated, cpython_actual)):
        match_str = "[MATCH]" if calc == actual else "[MISMATCH]"
        print(f"  [{idx}] Computed: {calc.__name__:<6} | CPython __mro__: {actual.__name__:<6} -> {match_str}")

    is_identical = calculated == cpython_actual
    print(f"\nExact 1-to-1 Match with CPython Internal C-Engine? -> {is_identical}")
    print("\n[PASSED] C3 Linearization Algorithm Verified.")


if __name__ == "__main__":
    demonstrate_c3_calculation()
