"""
CBSE Class 12 Computer Science - Data Structures
Topic 5: Implementation of the Pop Operation with Underflow Guard
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def Pop(stk):
    """Pops the top element safely guarding against Underflow."""
    if len(stk) == 0:
        print("Underflow: Stack is empty! Cannot POP.")
        return None
    else:
        element = stk.pop()
        print(f"Popped: {element} | Remaining Stack: {stk}")
        return element

def test_pop_operations():
    stack = [10, 20, 30]
    print(f"Initial Stack: {stack}")
    
    print("\n--- 1. POPPING EXISTING ELEMENTS ---")
    Pop(stack) # Pops 30
    Pop(stack) # Pops 20
    Pop(stack) # Pops 10
    
    print("\n--- 2. POPPING FROM EMPTY STACK (UNDERFLOW) ---")
    result = Pop(stack) # Triggers Underflow guard cleanly
    print(f"Result returned on empty stack: {result}")

if __name__ == "__main__":
    test_pop_operations()