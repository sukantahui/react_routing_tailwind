# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 3: Operators & Expression Evaluation: Precedence, Associativity & Short-Circuit
# =====================================================================

# 1. Operator Precedence Hierarchy
# ** (Right-to-left) > *, /, //, % > +, - > Comparisons > not > and > or

# Right-to-Left Associativity of Exponentiation:
# 2 ** 3 ** 2 is evaluated as 2 ** (3 ** 2) = 2 ** 9 = 512 (NOT (2**3)**2 = 64)
result_exp = 2 ** 3 ** 2
print(f"2 ** 3 ** 2 = {result_exp} (Right-to-left evaluation)")

# 2. Floor Division with Negative Numbers
# Floor division always rounds DOWN towards negative infinity:
# 7 // 2 = 3
# -7 // 2 = -4 (since -3.5 rounded down is -4)
# 7 // -2 = -4
print(f"7 // 2 = {7 // 2}")
print(f"-7 // 2 = {-7 // 2}")
print(f"7 % 2 = {7 % 2}")
print(f"-7 % 2 = {-7 % 2} (Formula: r = a - (b * (a // b)) -> -7 - (2 * -4) = 1)")

# 3. Short-Circuit Logic Evaluation
# 'and' returns the first falsy operand, or the last operand if all are truthy
# 'or' returns the first truthy operand, or the last operand if all are falsy

print("\n--- Short-Circuit Logic ---")
print("0 and 100:", 0 and 100)           # Returns 0 without evaluating 100
print("10 and 20:", 10 and 20)           # Returns 20 (last truthy)
print("0 or 'Python':", 0 or 'Python')   # Returns 'Python' (first truthy)
print("'' or None:", '' or None)         # Returns None (last falsy)

# Preventing ZeroDivisionError using short-circuit:
divisor = 0
safe_check = (divisor != 0) and (100 / divisor > 5)
print(f"Safe check with divisor=0: {safe_check} (No crash!)")
