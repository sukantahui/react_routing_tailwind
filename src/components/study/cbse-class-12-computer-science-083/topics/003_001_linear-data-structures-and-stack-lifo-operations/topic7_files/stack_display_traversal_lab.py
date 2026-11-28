"""
CBSE Class 12 Computer Science - Data Structures
Topic 7: Displaying Stack Contents from TOP to Bottom
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def Display(stk):
    """Displays stack contents from TOP down to bottom."""
    if len(stk) == 0:
        print("Stack is empty! Nothing to display.")
        return
        
    print("\n--- STACK CONTENTS (TOP -> BOTTOM) ---")
    top_index = len(stk) - 1
    # Display the top element with pointer label
    print(f"{stk[top_index]:<15} <-- TOP")
    
    # Iterate downward from top-1 to 0
    for i in range(top_index - 1, -1, -1):
        print(f"{stk[i]:<15}")
        
    print("-" * 35)
    print(f"Total elements in stack: {len(stk)}")

def test_display_operations():
    stack = ["Action #1", "Action #2", "Action #3", "Action #4"]
    print("Underlying Python list:", stack)
    
    # Non-destructive display
    Display(stack)
    
    # Verifying that Display did NOT delete any elements
    print(f"Verifying stack length after Display: {len(stack)} (Preserved!)")
    
    print("\nTesting on empty stack:")
    empty_stack = []
    Display(empty_stack)

if __name__ == "__main__":
    test_display_operations()