"""
CBSE Class 12 Computer Science - Data Structures
Topic 4: Implementation of the Push Operation on a Stack
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def Push(stk, item):
    """Pushes an element onto the top of the stack."""
    stk.append(item)
    print(f"Pushed: {item} | Stack: {stk} | TOP: {stk[-1]}")

def test_push_operations():
    # Initializing an empty stack
    stack = []
    print("Initial Stack:", stack)
    
    print("\n--- PUSHING NUMERIC VALUES ---")
    Push(stack, 10)
    Push(stack, 20)
    Push(stack, 30)
    
    print("\n--- PUSHING STRING & COMPOSITE VALUES ---")
    Push(stack, "Kolkata")
    Push(stack, [101, "Aarav", 98.5])
    
    print(f"\nFinal Stack contains {len(stack)} elements.")
    print(f"Top-most element is at index {len(stack)-1}: {stack[-1]}")

if __name__ == "__main__":
    test_push_operations()