# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 6: Variable Scope & Lifetime: Local Scope vs Global Scope
# =====================================================================

# 1. Global Variable Definition
# Defined outside any function; accessible throughout the file.
global_var = 1000

def local_scope_demo():
    # 2. Local Variable Definition
    # Defined inside the function; lifetime exists only while function runs.
    local_var = 25
    print("Inside local_scope_demo():")
    print(f"  Accessing local_var: {local_var}")
    print(f"  Accessing global_var (read-only): {global_var}")

local_scope_demo()

print("\nOutside the function (Global Scope):")
print(f"Accessing global_var: {global_var}")

try:
    # Attempting to access local_var outside its function raises NameError!
    print("Attempting to access local_var:", local_var)
except NameError as err:
    print("Caught expected NameError:", err)

# 3. Variable Shadowing (Local hides Global)
count = 50  # Global count

def shadow_demo():
    count = 10  # Local count shadows (hides) global count
    print(f"Inside shadow_demo(): local count = {count}")

shadow_demo()
print(f"In global scope: global count remains = {count}")
