# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 1: Variables, Dynamic Typing & l-value vs r-value Mechanics
# =====================================================================

# 1. Dynamic Typing Demonstration
x = 100
print(f"Initial x: {x}, Type: {type(x)}, Memory Address: {id(x)}")

x = "Hello Python 3"
print(f"Re-bound x: {x}, Type: {type(x)}, Memory Address: {id(x)}")

# 2. l-value vs r-value Mechanics
# An l-value (locator value) must be an assignable memory target.
# An r-value is any evaluated expression or literal that produces a value.

a = 25          # Legal: 'a' is l-value, '25' is r-value
b = a + 50      # Legal: 'b' is l-value, 'a + 50' is evaluated r-value

# Invalid statements that raise SyntaxError:
# 25 = a        -> SyntaxError: cannot assign to literal
# a + b = 100   -> SyntaxError: cannot assign to expression

# 3. Multiple and Unpacked Assignments
p, q, r = 10, 20, 30
print(f"Unpacked p={p}, q={q}, r={r}")

# Swapping values without a temporary variable
p, q = q, p
print(f"After swap: p={p}, q={q}")

# 4. Augmented Assignment Operators
counter = 10
counter += 5    # counter = counter + 5
print(f"Augmented counter += 5: {counter}")
