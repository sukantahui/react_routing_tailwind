"""
CBSE Class 12 Computer Science - Data Structures
Topic 0: Classification of Data Structures & Basic List Operations
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def demonstrate_data_structures():
    print("--- 1. PRIMITIVE DATA TYPES ---")
    age = 17                  # int
    percentage = 94.6         # float
    subject = "Computer Science" # str
    is_enrolled = True        # bool
    print(f"Primitive values: age={age} ({type(age).__name__}), percentage={percentage} ({type(percentage).__name__})")
    
    print("\n--- 2. LINEAR NON-PRIMITIVE DATA STRUCTURE: PYTHON LIST ---")
    linear_list = [10, 20, 30, 40, 50]
    print(f"Linear sequential collection: {linear_list}")
    print(f"Element at index 2 (Predecessor: {linear_list[1]}, Successor: {linear_list[3]}): {linear_list[2]}")
    
    # Common operations
    print("\n--- 3. COMMON OPERATIONS ON LINEAR STRUCTURE ---")
    # Insertion
    linear_list.append(60)
    print(f"After Insertion of 60 : {linear_list}")
    # Deletion
    removed = linear_list.pop(0)
    print(f"After Deletion of {removed}   : {linear_list}")
    # Traversal
    print("Traversal: ", end="")
    for item in linear_list:
        print(f"[{item}]", end=" -> ")
    print("END")
    
    # Searching
    target = 40
    if target in linear_list:
        print(f"Search: {target} found at index {linear_list.index(target)}")

if __name__ == "__main__":
    demonstrate_data_structures()