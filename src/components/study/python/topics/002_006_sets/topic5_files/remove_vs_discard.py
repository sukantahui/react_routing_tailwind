# ====================================================================
# Topic 5: Removing Elements (remove, discard, pop, clear)
# File: remove_vs_discard.py
# Description: Demonstrating set.remove() vs set.discard() error handling
# ====================================================================

active_students = {"Susmita", "Mamata", "Debangshu", "Abhronila"}
print("Initial Active Students:", active_students)

# 1. set.remove() - Removes item successfully
active_students.remove("Mamata")
print("\nAfter active_students.remove('Mamata'):", active_students)

# 2. set.remove() with non-existent element -> Raises KeyError!
try:
    active_students.remove("Pooja")
except KeyError as error:
    print("\n[KeyError Caught with .remove()]:", error)
    print("Explanation: .remove() requires the element to exist, or it raises KeyError!")

# 3. set.discard() - Removes item successfully if present
active_students.discard("Abhronila")
print("\nAfter active_students.discard('Abhronila'):", active_students)

# 4. set.discard() with non-existent element -> Silent, Safe No-Op!
active_students.discard("Pooja")  # Does NOT raise an error!
print("After active_students.discard('Pooja') (Silent No-Op):", active_students)
print("Set remains safe and intact:", active_students)
