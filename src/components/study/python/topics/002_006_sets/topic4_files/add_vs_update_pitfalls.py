# ====================================================================
# Topic 4: Adding Elements (add vs update)
# File: add_vs_update_pitfalls.py
# Description: Demonstrating the classic string and list pitfalls in add() vs update()
# ====================================================================

# 1. PITFALL 1: Passing a string to update() vs add()
set_a = set()
set_b = set()

# What you wanted: Add the complete word "Kolkata"
set_a.add("Kolkata")
print("set_a.add('Kolkata') ->", set_a)  # {'Kolkata'} (1 element)

# What happens if you accidentally call update('Kolkata'):
set_b.update("Kolkata")
print("set_b.update('Kolkata') ->", set_b)  # {'K', 'o', 'l', 'k', 'a', 't'} (6 characters!)

# 2. PITFALL 2: Passing a list to add()
sample_set = {"Admin"}
try:
    sample_set.add(["Manager", "Staff"])  # TypeError!
except TypeError as error:
    print("\n[TypeError with add([list])]:", error)
    print("Fix: Use sample_set.update(['Manager', 'Staff']) to unpack list items!")

# 3. PITFALL 3: Reassigning to the return value of add/update
# add() and update() mutate in place and return None
bad_set = {"Python"}
bad_set = bad_set.add("React")  # DANGER: bad_set becomes None!
print("\nAccidental None reassignment:", bad_set)
