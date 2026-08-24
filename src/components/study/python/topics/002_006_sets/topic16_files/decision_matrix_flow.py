# ====================================================================
# Topic 16: Sets vs Lists vs Tuples
# File: decision_matrix_flow.py
# Description: Architectural Decision Matrix: When to choose which container
# ====================================================================

def choose_container(need_order: bool, need_mutation: bool, need_uniqueness: bool, need_fast_lookup: bool):
    """Architectural decision helper function."""
    if need_uniqueness or need_fast_lookup:
        return "SET (or FROZENSET if immutability/dict-key is required)"
    if not need_mutation and need_order:
        return "TUPLE (Fastest memory, immutable, indexable)"
    if need_order and need_mutation:
        return "LIST (General-purpose sequential buffer)"

# Scenario 1: Allowed HTTP Methods Whitelist -> Immutable, fast lookup
print("1. Allowed HTTP Methods Whitelist ->", choose_container(need_order=False, need_mutation=False, need_uniqueness=True, need_fast_lookup=True))

# Scenario 2: Fixed Geographic GPS Coordinates (Lat, Long) in Barrackpore -> Immutable, ordered
print("2. GPS Coordinates (22.76, 88.36)  ->", choose_container(need_order=True, need_mutation=False, need_uniqueness=False, need_fast_lookup=False))

# Scenario 3: Real-time User Activity Feed -> Mutable, ordered timeline
print("3. Activity Timeline Feed         ->", choose_container(need_order=True, need_mutation=True, need_uniqueness=False, need_fast_lookup=False))
