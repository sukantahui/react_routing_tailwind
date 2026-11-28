# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 7: The LEGB Rule: Local, Enclosing, Global, and Built-in
# =====================================================================

# 1. Built-in Scope (B): Functions & objects like len(), max(), sum(), print
# 2. Global Scope (G): Variables defined at module top-level
x = "GLOBAL x"

def outer_function():
    # 3. Enclosing Scope (E): Names in the enclosing namespace of a nested function
    x = "ENCLOSING x"

    def inner_function():
        # 4. Local Scope (L): Names declared inside the innermost function
        # Uncommenting the next line makes x resolve locally:
        # x = "LOCAL x"
        print(f"Inside inner_function -> resolves to: {x}")

    inner_function()

print("--- 1. Testing LEGB Lookup Resolution ---")
outer_function()

# 2. Overriding Built-in Names (Shadowing Built-ins)
print("\n--- 2. Built-in Scope Shadowing Demonstration ---")
# len is a built-in function in __builtins__
print("Original built-in len([1, 2, 3]):", len([1, 2, 3]))

# Defining a global name 'len' shadows the built-in function!
# len = 99
# print("Shadowed len:", len) # Now len is an integer, len([1]) would crash!
