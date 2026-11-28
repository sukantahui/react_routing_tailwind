"""
CBSE Class 12 Computer Science - Data Structures
Topic 2: Stack Terminology Demonstration (TOP, Push, Pop, Peek, Underflow)
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def demonstrate_stack_terminology():
    stack = []
    
    def get_top_index(s):
        return len(s) - 1 if len(s) > 0 else -1
        
    print("--- 1. INITIAL EMPTY STATE ---")
    print(f"Stack: {stack} | Length: {len(stack)} | TOP pointer: {get_top_index(stack)}")
    
    print("\n--- 2. PUSH OPERATIONS ---")
    for val in [10, 20, 30]:
        stack.append(val)
        print(f"PUSH({val}) -> Stack: {stack} | TOP value: {stack[-1]} (Index: {get_top_index(stack)})")
        
    print("\n--- 3. PEEK OPERATION (INSPECTION WITHOUT REMOVAL) ---")
    top_element = stack[-1] if len(stack) > 0 else None
    print(f"PEEK -> Current Top: {top_element} | Stack remains unchanged: {stack}")
    
    print("\n--- 4. POP OPERATIONS ---")
    while len(stack) > 0:
        popped = stack.pop()
        print(f"POP() -> Removed: {popped} | Remaining Stack: {stack} | TOP: {get_top_index(stack)}")
        
    print("\n--- 5. UNDERFLOW DEMONSTRATION ---")
    print(f"Attempting to POP from empty stack (length={len(stack)})...")
    if len(stack) == 0:
        print("UNDERFLOW ALERT: Cannot perform POP() on an empty stack!")
    else:
        stack.pop()

if __name__ == "__main__":
    demonstrate_stack_terminology()