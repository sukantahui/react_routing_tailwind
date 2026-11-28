"""
CBSE Class 12 Computer Science - Data Structures
Topic 12: Diagnostic Assessment Solution Lab
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def verify_all_stack_features():
    print("--- CBSE CLASS 12 CS: STACK MASTERY BENCHMARK ---")
    stk = []
    
    # 1. Pushing elements
    for x in [10, 20, 30, 40]:
        stk.append(x)
    print("Pushed 4 elements:", stk)
    
    # 2. Peeking
    print("Peek top element:", stk[-1])
    
    # 3. Popping with underflow protection
    while len(stk) > 0:
        val = stk.pop()
        print(f"Popped: {val}")
        
    # 4. Underflow check
    if len(stk) == 0:
        print("Underflow guard triggered safely on empty stack.")

if __name__ == "__main__":
    verify_all_stack_features()