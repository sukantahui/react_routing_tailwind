# ====================================================================
# Topic 9: Mathematical Set Operations Overview
# File: methods_vs_operators_rules.py
# Description: Demonstrating the critical difference: Methods accept ANY iterable; Operators require SET operands
# ====================================================================

prime_set = {2, 3, 5, 7, 11}
numbers_list = [7, 11, 13, 17]

# 1. METHOD: union() accepts ANY iterable (List, Tuple, Generator)
method_res = prime_set.union(numbers_list)
print("Method .union(list) -> SUCCESS:", method_res)

# 2. OPERATOR: '|' STRICTLY requires a Set operand on both sides
try:
    operator_res = prime_set | numbers_list  # Raises TypeError!
except TypeError as error:
    print("\n[TypeError with '|' Operator]:", error)
    print("Fix: Convert operand: prime_set | set(numbers_list)")

# 3. Validated operator usage after conversion
operator_res = prime_set | set(numbers_list)
print("Operator with converted set -> SUCCESS:", operator_res)
