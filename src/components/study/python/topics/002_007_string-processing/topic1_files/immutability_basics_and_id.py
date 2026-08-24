# ====================================================================
# Module: 002_007_string-processing
# Topic 1: String immutability & memory representation
# File: immutability_basics_and_id.py
# Description: Demonstrating string immutability, TypeError on mutation, and memory id() tracking
# ====================================================================

# 1. Strings are Immutable in Memory
student_name = "Susmita"
print("Initial student name:", student_name)
print("Initial memory address (id):", id(student_name))

# 2. Attempting in-place item assignment raises TypeError!
try:
    # Trying to change first letter 'S' to lowercase 's'
    student_name[0] = 's'
except TypeError as error:
    print("\n--- TypeError Caught ---")
    print("Error details:", error)
    print("Explanation: Strings cannot be modified in-place.")

# 3. Variable Rebinding vs Object Mutation
# When you 'modify' a string, Python allocates a completely NEW object
student_name = student_name + " Roy"
print("\nRebound student name:", student_name)
print("New memory address (id):", id(student_name))

# 4. Modifying via Slicing and Reconstruction
original_city = "barrackpore"
capitalized_city = "B" + original_city[1:]
print("\nOriginal city:", original_city, "| ID:", id(original_city))
print("Capitalized city:", capitalized_city, "| ID:", id(capitalized_city))
