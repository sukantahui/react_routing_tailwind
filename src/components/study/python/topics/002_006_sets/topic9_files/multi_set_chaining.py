# ====================================================================
# Topic 9: Mathematical Set Operations Overview
# File: multi_set_chaining.py
# Description: Multi-set chaining operations across multiple cohorts
# ====================================================================

# Cohorts from Barrackpore, Kolkata, and Ichapur centers
barrackpore = {"Susmita", "Debangshu", "Mamata"}
kolkata     = {"Mamata", "Abhronila", "Debangshu"}
ichapur     = {"Mamata", "Debangshu", "Rohan"}

# 1. Chained Union: All students across all three locations
all_students = barrackpore | kolkata | ichapur
print("1. Chained Union (All Centers):", all_students)

# 2. Chained Intersection: Students enrolled in ALL three locations
universal_students = barrackpore & kolkata & ichapur
print("2. Chained Intersection (Universal):", universal_students)

# 3. Method Multi-Argument Signature
all_via_method = barrackpore.union(kolkata, ichapur)
print("3. Multi-Argument union():", all_via_method)

# 4. Universal via method
universal_via_method = barrackpore.intersection(kolkata, ichapur)
print("4. Multi-Argument intersection():", universal_via_method)
