# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 9: Parameter Passing Mechanics: Pass-by-Object-Reference
# =====================================================================

# In Python, argument passing is strictly "Pass-by-Object-Reference"
# (also known as Call-by-Object or Call-by-Sharing).

# 1. Passing IMMUTABLE Objects (int, float, str, tuple)
# The function CANNOT modify the caller's original object.
def modify_number(num):
    print(f"  [Inside modify_number] Initial id(num): {id(num)}")
    num += 100  # Creates a NEW integer object and rebinds local 'num'
    print(f"  [Inside modify_number] Mutated id(num): {id(num)} (Different!)")
    print(f"  [Inside modify_number] Local num = {num}")

original_num = 50
print(f"Caller before function: original_num = {original_num}, id = {id(original_num)}")
modify_number(original_num)
print(f"Caller after function: original_num remains = {original_num} (UNCHANGED!)\n")

# 2. Passing MUTABLE Objects (list, dict, set)
# The function CAN modify the caller's object IN-PLACE!
def modify_list(items):
    print(f"  [Inside modify_list] Received id(items): {id(items)}")
    items.append(999)  # In-place mutation! Same memory address
    items[0] = "MODIFIED"
    print(f"  [Inside modify_list] Mutated list: {items}")

original_list = [10, 20, 30]
print(f"Caller before function: original_list = {original_list}, id = {id(original_list)}")
modify_list(original_list)
print(f"Caller after function: original_list MUTATED = {original_list} (CHANGED IN CALLER!)\n")

# 3. Rebinding a Mutable Parameter (Does NOT affect caller!)
def rebind_list(items):
    items = [100, 200, 300]  # Rebinding local name to a new list object
    print(f"  [Inside rebind_list] New local items: {items}")

another_list = [1, 2, 3]
rebind_list(another_list)
print(f"Caller after rebind_list: another_list remains = {another_list} (UNCHANGED!)")
