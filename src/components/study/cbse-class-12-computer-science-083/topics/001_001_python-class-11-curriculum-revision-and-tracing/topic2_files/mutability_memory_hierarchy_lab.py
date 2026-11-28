# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 2: Data Types Hierarchy: Mutable vs Immutable
# =====================================================================

# 1. Immutable Types: Numbers, Strings, Tuples
print("--- 1. Immutability in Numbers & Strings ---")
num = 50
addr_before = id(num)
num += 10
addr_after = id(num)
print(f"Number ID before: {addr_before}, after: {addr_after} (Different? {addr_before != addr_after})")

text = "CBSE"
# text[0] = 'K' # TypeError: 'str' object does not support item assignment
new_text = "K" + text[1:]
print(f"Reconstructed string: {new_text}")

# 2. Mutable Types: Lists, Dictionaries, Sets
print("\n--- 2. Mutability in Lists & Dictionaries ---")
my_list = [10, 20, 30]
list_id_before = id(my_list)
my_list.append(40)
my_list[0] = 999
list_id_after = id(my_list)
print(f"List after in-place modifications: {my_list}")
print(f"List ID unchanged: {list_id_before == list_id_after}")

student_dict = {"roll": 101, "name": "Tanmoy"}
dict_id_before = id(student_dict)
student_dict["marks"] = 96
print(f"Dictionary updated in-place: {student_dict}")
print(f"Dictionary ID unchanged: {dict_id_before == student_dict}")

# 3. Deep vs Shallow Copy Demonstration
import copy
original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)

original[0][0] = 999
print(f"After modifying nested item:")
print(f"Original: {original}")
print(f"Shallow Copy (affected!): {shallow}")
print(f"Deep Copy (protected!): {deep}")
