"""
CBSE Class 12 Computer Science - Data Structures
Topic 6: Implementation of the Peek Operation (Top Element Inspection)
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def Peek(stk):
    """Returns the top element without removing it from the stack."""
    if len(stk) == 0:
        print("Stack is empty! Nothing to peek.")
        return None
    else:
        top_val = stk[-1]
        print(f"PEEK -> Top element: {top_val} | Stack size remains: {len(stk)}")
        return top_val

def test_peek_operations():
    stack = ["First Document", "Second Document", "Third Document"]
    print(f"Initial Stack: {stack}")
    
    print("\n--- 1. PEEKING AT STACK ---")
    val1 = Peek(stack)
    print(f"Peek returned: '{val1}'")
    print(f"Verifying stack length after peek: {len(stack)} (Unchanged!)")
    
    print("\n--- 2. PEEKING MULTIPLE TIMES ---")
    val2 = Peek(stack)
    print(f"Second Peek returned identical value: '{val2}'")
    
    print("\n--- 3. PEEKING ON EMPTY STACK ---")
    empty_stk = []
    Peek(empty_stk) # Handled safely without crash!

if __name__ == "__main__":
    test_peek_operations()