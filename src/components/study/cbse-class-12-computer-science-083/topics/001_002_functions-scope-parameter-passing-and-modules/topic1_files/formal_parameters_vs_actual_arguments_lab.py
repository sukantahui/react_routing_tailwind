# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 1: Function Header, Formal Parameters vs Actual Arguments
# =====================================================================

# In the function header:
# 'length' and 'width' are FORMAL PARAMETERS (placeholders in the definition)
def compute_rectangle_area(length, width):
    """
    Formal Parameters: length, width
    These receive references from actual arguments upon invocation.
    """
    area = length * width
    return area

# In the function calls below:
# 10, 5, x, y, and (a + 2) are ACTUAL ARGUMENTS (values passed to the function)

# 1. Passing Literals as Actual Arguments
res1 = compute_rectangle_area(10, 5)
print(f"Call with literals (10, 5) -> Area: {res1}")

# 2. Passing Variables as Actual Arguments
room_l = 15.5
room_w = 12.0
res2 = compute_rectangle_area(room_l, room_w)
print(f"Call with variables ({room_l}, {room_w}) -> Area: {res2}")

# 3. Passing Evaluated Expressions as Actual Arguments
base = 8
res3 = compute_rectangle_area(base * 2, base + 5)
print(f"Call with expressions ({base * 2}, {base + 5}) -> Area: {res3}")

# 4. Parameter Count Mismatch Demonstration
try:
    # Requires 2 arguments, but only 1 provided
    compute_rectangle_area(10)
except TypeError as err:
    print(f"\nCaught Expected Error: {err}")
