# ====================================================================
# Topic 11: Symmetric Difference Deep Dive
# File: disjoint_exclusive_auditing.py
# Description: Multi-set chaining with '^' and three-way XOR behavior
# ====================================================================

# Sets of voters registered in Barrackpore (A), Ichapur (B), and Shyamnagar (C)
set_a = {"Susmita", "Mamata", "Debangshu"}
set_b = {"Mamata", "Debangshu", "Rohan"}
set_c = {"Debangshu", "Pooja", "Susmita"}

# Multi-set chaining: A ^ B ^ C
# In mathematics/Boolean algebra, A ^ B ^ C keeps elements that appear
# in an ODD number of sets (i.e. in 1 set or all 3 sets)!
three_way_xor = set_a ^ set_b ^ set_c

print("Set A:", set_a)
print("Set B:", set_b)
print("Set C:", set_c)
print("\nThree-Way Chained Symmetric Difference (A ^ B ^ C):", three_way_xor)
print("Note: Debangshu is in ALL 3 sets (odd count) -> Kept!")
print("Note: Mamata is in 2 sets (even count) -> Cancelled out!")
print("Note: Rohan is in 1 set (odd count) -> Kept!")
