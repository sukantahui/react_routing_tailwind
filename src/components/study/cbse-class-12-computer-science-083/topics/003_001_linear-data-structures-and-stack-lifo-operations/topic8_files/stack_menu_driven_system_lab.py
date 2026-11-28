"""
CBSE Class 12 Computer Science - Data Structures
Topic 8: Full Menu-Driven Stack Implementation
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def Push(stk, item):
    stk.append(item)
    print(f"Successfully pushed '{item}' onto stack.")

def Pop(stk):
    if len(stk) == 0:
        print("Underflow: Stack is empty! Cannot POP.")
        return None
    val = stk.pop()
    print(f"Popped element: {val}")
    return val

def Peek(stk):
    if len(stk) == 0:
        print("Stack is empty! Nothing to peek.")
        return None
    return stk[-1]

def Display(stk):
    if len(stk) == 0:
        print("Stack is empty! Nothing to display.")
        return
    top = len(stk) - 1
    print(f"{stk[top]} <-- TOP")
    for i in range(top - 1, -1, -1):
        print(stk[i])

def stack_menu():
    stack = []
    while True:
        print("\n=============================")
        print("    STACK OPERATIONS MENU    ")
        print("=============================")
        print("1. PUSH Element")
        print("2. POP Element")
        print("3. PEEK (Top Element)")
        print("4. DISPLAY Stack")
        print("5. EXIT")
        choice = input("Enter your choice (1-5): ").strip()
        
        if choice == '1':
            item = input("Enter element to push: ").strip()
            Push(stack, item)
        elif choice == '2':
            Pop(stack)
        elif choice == '3':
            top_val = Peek(stack)
            if top_val is not None:
                print(f"Top element is: {top_val}")
        elif choice == '4':
            Display(stack)
        elif choice == '5':
            print("Exiting Stack Application. Goodbye!")
            break
        else:
            print("Invalid choice! Please select between 1 and 5.")

if __name__ == "__main__":
    stack_menu()