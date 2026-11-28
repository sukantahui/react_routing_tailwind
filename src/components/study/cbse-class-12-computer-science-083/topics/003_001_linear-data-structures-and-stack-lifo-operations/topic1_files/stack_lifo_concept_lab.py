"""
CBSE Class 12 Computer Science - Data Structures
Topic 1: Demonstration of the Stack LIFO (Last In, First Out) Principle
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def demonstrate_lifo():
    # Implementing a simple Stack using a Python list
    plate_stack = []
    
    print("--- 1. PUSHING ITEMS ONTO STACK (LIFO ORDER) ---")
    plates = ["Plate #1 (Red)", "Plate #2 (Blue)", "Plate #3 (Green)", "Plate #4 (Gold)"]
    
    for plate in plates:
        plate_stack.append(plate)
        print(f"Pushed '{plate}' -> Current TOP is '{plate_stack[-1]}'")
        
    print(f"\nStack state after pushes: {plate_stack}")
    print(f"Total elements: {len(plate_stack)} | Current TOP index: {len(plate_stack) - 1}")
    
    print("\n--- 2. POPPING ITEMS FROM STACK (NOTICE REVERSE ORDER) ---")
    while len(plate_stack) > 0:
        popped_plate = plate_stack.pop()
        print(f"Popped '{popped_plate}' <- Remainder: {plate_stack}")
        
    print("\nStack is now completely empty (UNDERFLOW if popped again).")

if __name__ == "__main__":
    demonstrate_lifo()