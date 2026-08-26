"""
Module: 001_003_operators-and-expressions
Topic: Topic 6 - Evaluating Expressions (Step-by-Step Rules & Order of Evaluation)
File: operator_chaining_and_ast_tree.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates Python Abstract Syntax Tree (AST) evaluation, operator chaining,
and non-associative comparison execution.
"""

import ast

def inspect_expression_ast(expression_str):
    print("=" * 65)
    print(f"  PYTHON EXPRESSION AST INSPECTION: '{expression_str}'")
    print("=" * 65)

    parsed_tree = ast.parse(expression_str, mode='eval')
    print(ast.dump(parsed_tree, indent=2))
    print("-" * 65)

def test_chained_comparisons():
    print("\n  TESTING CHAINED COMPARISONS UNDER THE HOOD")
    print("-" * 65)

    # Expression: 10 < 20 <= 20 == 20
    print("Expression: 10 < 20 <= 20 == 20")
    print("Evaluation: (10 < 20) and (20 <= 20) and (20 == 20)")
    c1 = 10 < 20
    c2 = 20 <= 20
    c3 = 20 == 20
    print(f"  Part 1: 10 < 20  -> {c1}")
    print(f"  Part 2: 20 <= 20 -> {c2}")
    print(f"  Part 3: 20 == 20 -> {c3}")
    print(f"  Combined Result  -> {c1 and c2 and c3}")

    # Chaining with False short-circuit: 1 < 2 < 1
    print("\nExpression: 1 < 2 < 1")
    print("Evaluation: (1 < 2) and (2 < 1)")
    print(f"  Part 1: 1 < 2    -> {1 < 2} (True)")
    print(f"  Part 2: 2 < 1    -> {2 < 1} (False)")
    print(f"  Combined Result  -> {1 < 2 < 1} (False)")
    print("=" * 65)

if __name__ == "__main__":
    inspect_expression_ast("10 + 2 * 3")
    test_chained_comparisons()
