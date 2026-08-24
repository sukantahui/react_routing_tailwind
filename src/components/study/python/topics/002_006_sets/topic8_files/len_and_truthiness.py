# ====================================================================
# Topic 8: Set Length and Basic Operations
# File: len_and_truthiness.py
# Description: Demonstrating O(1) len(s) and Boolean truthiness evaluation
# ====================================================================

# 1. len() executes in O(1) constant time
enrolled_candidates = {"Susmita", "Debangshu", "Mamata", "Abhronila"}
print("Enrolled Candidates Set:", enrolled_candidates)
print(f"Total Unique Students (len): {len(enrolled_candidates)}")

# 2. Boolean Truthiness (Empty vs Populated Set)
empty_set = set()
populated_set = {"Python"}

print(f"\nTruthiness of empty_set: bool(set()) -> {bool(empty_set)}")
print(f"Truthiness of populated_set: bool({{'Python'}}) -> {bool(populated_set)}")

# 3. Idiomatic guard clause with set truthiness
def process_batch(student_set: set):
    if not student_set:
        return "Warning: Batch is empty! No notifications dispatched."
    return f"Success: Processing {len(student_set)} students..."

print("\n--- Guard Clause Checks ---")
print(process_batch(empty_set))
print(process_batch(enrolled_candidates))
