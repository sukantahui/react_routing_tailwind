# ====================================================================
# Topic 13: Frozen Sets (Immutable Sets)
# File: nested_sets_demo.py
# Description: Building Nested Sets (Sets of Sets) using frozenset
# ====================================================================

# Standard mutable sets CANNOT be nested:
try:
    bad_set = {{"A", "B"}, {"C", "D"}}  # TypeError: unhashable type: 'set'
except TypeError as error:
    print("[TypeError Caught]:", error)
    print("Reason: Standard sets are mutable and unhashable, so they cannot be set members!\n")

# PROPER SOLUTION: Wrap inner sets as frozensets
nested_cohorts = {
    frozenset(["Susmita", "Mamata"]),
    frozenset(["Debangshu", "Abhronila"]),
    frozenset(["Susmita", "Mamata"]),  # Duplicate combination -> Collapsed!
}

print("Valid Nested Set of Frozensets:")
for idx, cohort in enumerate(nested_cohorts, start=1):
    print(f"Cohort Group {idx}: {cohort}")

print(f"\nTotal Unique Cohorts Count: {len(nested_cohorts)} (Duplicate collapsed)")
