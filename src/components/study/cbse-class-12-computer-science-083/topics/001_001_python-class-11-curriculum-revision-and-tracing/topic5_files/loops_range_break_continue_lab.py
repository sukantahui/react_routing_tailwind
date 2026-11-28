# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 5: Iterative Constructs: for with range(), while, break, continue, else
# =====================================================================

# 1. range(start, stop, step) Mechanics
print("--- 1. range() Exploration ---")
print("range(5):", list(range(5)))                 # 0 to 4
print("range(2, 9, 2):", list(range(2, 9, 2)))      # 2, 4, 6, 8
print("range(10, 0, -2):", list(range(10, 0, -2)))  # 10, 8, 6, 4, 2
print("range(5, 5):", list(range(5, 5)))            # Empty list []

# 2. Loop-Else Suite Behavior
print("\n--- 2. Loop-Else Suite Mechanics ---")
# The 'else' block executes ONLY when loop terminates normally (without 'break')

def search_item(target, items):
    for idx, val in enumerate(items):
        if val == target:
            print(f"Item {target} FOUND at index {idx}! Terminating with break.")
            break
    else:
        print(f"Item {target} NOT found in collection (loop completed without break)!")

data = [10, 20, 30, 40, 50]
search_item(30, data)  # break encountered -> else SKIPPED
search_item(99, data)  # normal termination -> else EXECUTES

# 3. break vs continue Mechanics
print("\n--- 3. break vs continue in while loop ---")
n = 0
while n < 10:
    n += 1
    if n % 2 == 0:
        continue   # Skips printing for even numbers
    if n > 7:
        break      # Exits loop completely when n > 7
    print(f"Odd number: {n}")
