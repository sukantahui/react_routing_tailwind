# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 2: Function Call, Control Flow and Value Returning Mechanism
# =====================================================================

print("--- 1. Step-by-Step Control Flow Demonstration ---")

def step_one():
    print("  -> Entering step_one()")
    val = 10 * 2
    print("  <- Exiting step_one() returning", val)
    return val

def step_two(x):
    print(f"  -> Entering step_two(x={x})")
    result = x + 50
    print("  <- Exiting step_two() returning", result)
    return result

print("[MAIN] Line 1: Starting script execution")
print("[MAIN] Line 2: Invoking step_one()")
intermediate = step_one()
print(f"[MAIN] Line 3: Received intermediate value: {intermediate}")

print("[MAIN] Line 4: Invoking step_two()")
final_result = step_two(intermediate)
print(f"[MAIN] Line 5: Final Result = {final_result}")

# 2. Early Return Behavior
print("\n--- 2. Early Return Demonstration ---")
def find_first_even(numbers):
    for num in numbers:
        if num % 2 == 0:
            return num  # Exits function immediately upon finding first even
    return -1           # Executed only if no even number exists

print("First even in [1, 3, 5, 8, 9]:", find_first_even([1, 3, 5, 8, 9]))
print("First even in [1, 3, 5]:", find_first_even([1, 3, 5]))
