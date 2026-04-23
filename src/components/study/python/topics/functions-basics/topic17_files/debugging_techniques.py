# debugging_techniques.py
# Using print() and pdb for debugging

def calculate_average(numbers):
    print(f"[DEBUG] numbers = {numbers}")  # print debugging
    if not numbers:
        return 0
    total = sum(numbers)
    print(f"[DEBUG] total = {total}")
    avg = total / len(numbers)
    print(f"[DEBUG] avg = {avg}")
    return avg

# Call with good data
result = calculate_average([10, 20, 30])
print(f"Average: {result}")

# Buggy function – find the error
def find_max(data):
    max_val = data[0]  # what if data is empty?
    for x in data:
        if x > max_val:
            max_val = x
    return max_val

# Uncomment to see IndexError
# print(find_max([]))

# Using pdb (Python Debugger)
import pdb

def buggy_function(a, b):
    result = a + b
    pdb.set_trace()  # Execution pauses here
    result = result * 2
    return result

# To use pdb, run this script with: python -m pdb debugging_techniques.py
# Or uncomment the next line and run normally (then type 'c' to continue)
# buggy_function(3, 5)

print("\nDebugging tips:")
print("1. Use print() to see variable values")
print("2. Use pdb.set_trace() for interactive debugging")
print("3. Check edge cases (empty lists, zero, None)")