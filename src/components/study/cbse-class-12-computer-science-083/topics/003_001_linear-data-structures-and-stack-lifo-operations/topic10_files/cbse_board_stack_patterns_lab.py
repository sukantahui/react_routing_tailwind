"""
CBSE Class 12 Computer Science - Data Structures
Topic 10: CBSE Board Examination Standard Question Patterns
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def demonstrate_board_patterns():
    print("--- PATTERN 1: CONDITIONAL PUSH FROM DICTIONARY (MARKS > 75) ---")
    student_dict = {
        "Aarav": 92,
        "Diya": 68,
        "Rohan": 84,
        "Pooja": 71,
        "Tanmay": 95
    }
    high_scorers_stack = []
    
    # Push students with marks > 75
    for name, marks in student_dict.items():
        if marks > 75:
            high_scorers_stack.append(name)
            
    print(f"Source Dictionary: {student_dict}")
    print(f"Resulting Stack of High Scorers: {high_scorers_stack}")
    print(f"Top Student: {high_scorers_stack[-1]}")
    
    print("\n--- PATTERN 2: CONDITIONAL PUSH (NUMBERS DIVISIBLE BY 5) ---")
    nums = [12, 25, 33, 50, 64, 75, 82]
    div5_stack = []
    for n in nums:
        if n % 5 == 0:
            div5_stack.append(n)
    print(f"Source Numbers: {nums}")
    print(f"Stack (Divisible by 5): {div5_stack}")
    
    print("\n--- PATTERN 3: POP ALL AND DISPLAY IN LIFO ORDER ---")
    print("Popping all elements until stack is empty:")
    while len(div5_stack) > 0:
        val = div5_stack.pop()
        print(f"Popped: {val}")
        
    print(f"Stack state after full drain: {div5_stack} (Underflow safe!)")

if __name__ == "__main__":
    demonstrate_board_patterns()