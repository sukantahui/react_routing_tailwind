# ====================================================================
# Module: 002_007_string-processing
# Topic 1: String immutability & memory representation
# File: string_interning_and_identity.py
# Description: Demonstrating String Interning, sys.intern(), and 'is' vs '==' comparison
# ====================================================================

import sys

# 1. Automatic Interning of Identifiers / Short Literals
# Strings containing only alphanumeric characters and underscores are automatically interned by CPython
center_1 = "barrackpore_hub"
center_2 = "barrackpore_hub"

print("--- Automatic Interning ---")
print("center_1 == center_2 (Value equality):", center_1 == center_2)
print("center_1 is center_2 (Memory identity):", center_1 is center_2)
print("ID 1:", id(center_1), "| ID 2:", id(center_2))

# 2. Dynamically Created Strings with Special Characters
# Dynamically constructed strings with spaces are usually NOT automatically interned
name_part1 = "Coder & "
name_part2 = "AccoTax"
full_name_dynamic = name_part1 + name_part2
full_name_literal = "Coder & AccoTax"

print("\n--- Non-Interned Dynamic String ---")
print("full_name_dynamic == full_name_literal:", full_name_dynamic == full_name_literal)
print("full_name_dynamic is full_name_literal:", full_name_dynamic is full_name_literal)
print("Dynamic ID:", id(full_name_dynamic))
print("Literal ID:", id(full_name_literal))

# 3. Explicit Interning with sys.intern()
# Forces Python to store and reuse string from internal global intern table
interned_dynamic = sys.intern(full_name_dynamic)
interned_literal = sys.intern(full_name_literal)

print("\n--- Explicit sys.intern() ---")
print("interned_dynamic is interned_literal:", interned_dynamic is interned_literal)
print("Shared Interned ID:", id(interned_dynamic))
