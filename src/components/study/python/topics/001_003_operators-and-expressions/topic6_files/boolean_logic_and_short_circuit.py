"""
Module: 001_003_operators-and-expressions
Topic: Topic 6 - Evaluating Expressions (Step-by-Step Rules & Order of Evaluation)
File: boolean_logic_and_short_circuit.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates complex boolean logic evaluation, short-circuit execution,
and why side-effects in short-circuited sub-expressions are bypassed.
"""

def side_effect_check(label, return_val):
    """Helper function to log when a sub-expression is actually evaluated."""
    print(f"  [EXECUTION LOG] Evaluating condition: '{label}' -> returning {return_val}")
    return return_val

def test_short_circuit_mechanics():
    print("=" * 65)
    print("  PYTHON EXPRESSION EVALUATION: SHORT-CIRCUIT MECHANICS")
    print("=" * 65)

    print("\nTest Case 1: Short-Circuiting in OR (Stops on first Truthy)")
    print("Expression: True or side_effect_check('Will Not Run', False)")
    print("-" * 65)
    # The right operand is NEVER evaluated because the first operand is True
    result_or = True or side_effect_check("Will Not Run", False)
    print(f"Result of OR evaluation : {result_or}")

    print("\nTest Case 2: Short-Circuiting in AND (Stops on first Falsy)")
    print("Expression: False and side_effect_check('Will Not Run', True)")
    print("-" * 65)
    # The right operand is NEVER evaluated because the first operand is False
    result_and = False and side_effect_check("Will Not Run", True)
    print(f"Result of AND evaluation: {result_and}")

    print("\nTest Case 3: Complex Multi-Condition Expression")
    print("Expression: not (5 + 3 > 10) and (4 * 2 == 8) or (10 > 20)")
    print("-" * 65)
    
    # Step 1: Sub-expressions
    e1 = 5 + 3 > 10    # 8 > 10 -> False
    e2 = not e1        # not False -> True
    e3 = 4 * 2 == 8    # 8 == 8 -> True
    e4 = 10 > 20       # False
    
    # Step 2: Logical AND
    and_result = e2 and e3 # True and True -> True
    
    # Step 3: Logical OR
    final_bool = and_result or e4 # True or False -> True
    
    print(f"1. 5 + 3 > 10              -> {e1}")
    print(f"2. not False               -> {e2}")
    print(f"3. 4 * 2 == 8              -> {e3}")
    print(f"4. True and True           -> {and_result}")
    print(f"5. True or False           -> {final_bool}")
    print(f"Final Evaluated Result     : {final_bool}")
    print("=" * 65)

if __name__ == "__main__":
    test_short_circuit_mechanics()
