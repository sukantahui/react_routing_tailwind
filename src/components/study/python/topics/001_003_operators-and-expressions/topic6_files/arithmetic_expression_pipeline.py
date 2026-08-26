"""
Module: 001_003_operators-and-expressions
Topic: Topic 6 - Evaluating Expressions (Step-by-Step Rules & Order of Evaluation)
File: arithmetic_expression_pipeline.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates step-by-step arithmetic expression evaluation in Python,
illustrating operator precedence, associativity, and intermediate reduction.
"""

def evaluate_arithmetic_pipeline():
    print("=" * 65)
    print("  PYTHON EXPRESSION EVALUATION PIPELINE: ARITHMETIC")
    print("=" * 65)

    # Complex arithmetic expression
    # Expression: 100 - 3 * 2 ** 3 + 18 // 3 % 4
    print("\nTarget Expression: 100 - 3 * 2 ** 3 + 18 // 3 % 4")
    print("-" * 65)

    # Step 1: Exponentiation (Level 2 priority, Right-to-Left)
    step1_power = 2 ** 3
    print(f"Step 1 [Exponentiation 2 ** 3]   : 2 ** 3 = {step1_power}")
    print("  Current State                   : 100 - 3 * 8 + 18 // 3 % 4")

    # Step 2: Multiplication (Level 4 priority, Left-to-Right)
    step2_mult = 3 * step1_power
    print(f"Step 2 [Multiplication 3 * 8]    : 3 * 8 = {step2_mult}")
    print("  Current State                   : 100 - 24 + 18 // 3 % 4")

    # Step 3: Floor Division (Level 4 priority, Left-to-Right)
    step3_floordiv = 18 // 3
    print(f"Step 3 [Floor Division 18 // 3]  : 18 // 3 = {step3_floordiv}")
    print("  Current State                   : 100 - 24 + 6 % 4")

    # Step 4: Modulo (Level 4 priority, Left-to-Right)
    step4_mod = step3_floordiv % 4
    print(f"Step 4 [Modulus 6 % 4]           : 6 % 4 = {step4_mod}")
    print("  Current State                   : 100 - 24 + 2")

    # Step 5: Subtraction (Level 5 priority, Left-to-Right)
    step5_sub = 100 - step2_mult
    print(f"Step 5 [Subtraction 100 - 24]    : 100 - 24 = {step5_sub}")
    print("  Current State                   : 76 + 2")

    # Step 6: Addition (Level 5 priority, Left-to-Right)
    final_result = step5_sub + step4_mod
    print(f"Step 6 [Addition 76 + 2]         : 76 + 2 = {final_result}")
    print("-" * 65)
    print(f"Final Direct Evaluation Output   : {100 - 3 * 2 ** 3 + 18 // 3 % 4}")
    print(f"Step-by-Step Pipeline Match      : {final_result == (100 - 3 * 2 ** 3 + 18 // 3 % 4)}")
    print("=" * 65)

if __name__ == "__main__":
    evaluate_arithmetic_pipeline()
