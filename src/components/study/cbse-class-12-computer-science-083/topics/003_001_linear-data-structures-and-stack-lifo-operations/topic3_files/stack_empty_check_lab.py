"""
CBSE Class 12 Computer Science - Data Structures
Topic 3: Checking for Empty Stack Condition and Defensive Guards
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def isEmpty(stk):
    """Returns True if stack is empty, False otherwise."""
    return len(stk) == 0

def safe_pop(stk):
    """Pops an element safely guarding against Underflow."""
    if isEmpty(stk):
        print("Underflow: Stack is empty! Cannot POP.")
        return None
    else:
        val = stk.pop()
        print(f"Successfully popped: {val}")
        return val

def safe_peek(stk):
    """Peeks at top element safely guarding against IndexError."""
    if isEmpty(stk):
        print("Stack is empty! No element to peek.")
        return None
    else:
        return stk[-1]

def test_empty_guards():
    my_stack = []
    
    print("--- 1. TESTING ON EMPTY STACK ---")
    print(f"isEmpty(my_stack) -> {isEmpty(my_stack)}")
    safe_peek(my_stack)
    safe_pop(my_stack)
    
    print("\n--- 2. PUSHING ELEMENTS AND TESTING ---")
    my_stack.append(100)
    my_stack.append(200)
    print(f"Stack: {my_stack} | isEmpty(my_stack) -> {isEmpty(my_stack)}")
    print(f"PEEK -> {safe_peek(my_stack)}")
    
    print("\n--- 3. POPPING UNTIL EMPTY ---")
    safe_pop(my_stack)
    safe_pop(my_stack)
    safe_pop(my_stack) # Underflow triggered safely!

if __name__ == "__main__":
    test_empty_guards()