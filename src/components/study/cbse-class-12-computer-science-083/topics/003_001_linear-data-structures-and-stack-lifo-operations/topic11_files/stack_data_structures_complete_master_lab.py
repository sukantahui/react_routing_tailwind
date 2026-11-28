"""
CBSE Class 12 Computer Science (Code 083) - Unit I: Data Structures
Module: Linear Data Structures & Stack (LIFO) - Complete Master Lab Script
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax, Barrackpore
"""

def isEmpty(stk):
    return len(stk) == 0

def Push(stk, item):
    stk.append(item)
    print(f"PUSH: Added {item} | Stack: {stk} | TOP: {stk[-1]}")

def Pop(stk):
    if isEmpty(stk):
        print("UNDERFLOW: Cannot POP from empty stack!")
        return None
    val = stk.pop()
    print(f"POP: Removed {val} | Remaining: {stk}")
    return val

def Peek(stk):
    if isEmpty(stk):
        print("Stack is empty! No element to peek.")
        return None
    return stk[-1]

def Display(stk):
    if isEmpty(stk):
        print("Stack is empty! Nothing to display.")
        return
    top = len(stk) - 1
    print("\n--- CURRENT STACK (TOP -> BOTTOM) ---")
    print(f"{stk[top]} <-- TOP")
    for i in range(top - 1, -1, -1):
        print(stk[i])
    print("-" * 35)

def run_all_demonstrations():
    print("=== CBSE CLASS 12 DATA STRUCTURES: COMPLETE STACK LAB ===")
    my_stack = []
    
    # 1. Testing Empty State
    print("\n1. Testing Empty Guards:")
    Pop(my_stack)
    Peek(my_stack)
    Display(my_stack)
    
    # 2. Pushing Elements
    print("\n2. Testing Push Operations:")
    Push(my_stack, 10)
    Push(my_stack, 20)
    Push(my_stack, 30)
    
    # 3. Peek and Display
    print("\n3. Testing Peek & Display:")
    print(f"Top element: {Peek(my_stack)}")
    Display(my_stack)
    
    # 4. Record-Based Stack Demonstration
    print("\n4. Testing Record-Based Stack:")
    rec_stack = []
    Push(rec_stack, [101, "Aarav Sharma", 95.5])
    Push(rec_stack, [102, "Pooja Roy", 88.0])
    Display(rec_stack)
    Pop(rec_stack)
    Display(rec_stack)

if __name__ == "__main__":
    run_all_demonstrations()