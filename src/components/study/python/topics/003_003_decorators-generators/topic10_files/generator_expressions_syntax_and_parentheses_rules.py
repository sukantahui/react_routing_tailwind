# topic10_files/generator_expressions_syntax_and_parentheses_rules.py
# Module: 003_003_decorators-generators
# Topic: Generator expressions for memory efficiency
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 1: Generator Expressions Syntax & Parentheses Rules
Demonstrates:
  1. Syntax of Generator Expressions: `(expr for item in iterable if condition)`
  2. Syntactic sugar: Omitting duplicate outer parentheses in single-argument function calls
  3. Short-circuiting evaluation with `any()` and `all()`
"""

import sys

def demonstrate_genexp_syntax():
    print("=" * 70)
    print("CODER & ACCOTAX - GENERATOR EXPRESSION SYNTAX & RULES")
    print("=" * 70)

    raw_scores = [72, 85, 91, 58, 94, 63, 88]

    # 1. List Comprehension vs Generator Expression Syntax:
    print("1. List Comprehension vs Generator Expression:")
    list_comp = [s * 1.10 for s in raw_scores if s >= 80]
    gen_exp = (s * 1.10 for s in raw_scores if s >= 80)

    print(f"   * List Comprehension: {list_comp} (Type: {type(list_comp)})")
    print(f"   * Generator Expression: {gen_exp} (Type: {type(gen_exp)})\n")

    # 2. Parentheses Reduction in Single-Argument Calls:
    print("2. Parentheses Reduction in Built-in Aggregators (`sum`, `max`, `min`):")
    # Redundant double parentheses: sum(((s for s in raw_scores)))
    # Idiomatic single parentheses:
    total_score = sum(s for s in raw_scores)
    max_score = max(s for s in raw_scores if s < 90)
    min_score = min(s for s in raw_scores)

    print(f"   * Idiomatic `sum(s for s in ...)`: {total_score}")
    print(f"   * Idiomatic `max(s for s in ...)`: {max_score}")
    print(f"   * Idiomatic `min(s for s in ...)`: {min_score}\n")

    # 3. Short-Circuiting Evaluation with `any()` and `all()`:
    print("3. Short-Circuiting Evaluation with `any()` & `all()`:")
    # Generator expression evaluation stops IMMEDIATELY on the first True for any()!
    has_topper = any(s >= 90 for s in raw_scores)
    all_passed = all(s >= 60 for s in raw_scores)  # Stops on 58!

    print(f"   * Has Candidate achieved >= 90%? : {has_topper} (Short-circuits on 91!)")
    print(f"   * Have all candidates passed >= 60%? : {all_passed} (Short-circuits on 58!)")

    print(r"""
The Generator Expression Rules:
  1. Syntax: `(expr for x in iterable if cond)`
  2. Single-Argument Sugar: `func(x for x in seq)` instead of `func((x for x in seq))`
  3. Short-Circuit Efficiency: When used with `any()`, `all()`, or `next()`, evaluation
     halts as soon as the condition is satisfied without computing remaining elements!
""")
    print("[PASSED] Generator Expression Syntax & Rules Verified.")


if __name__ == "__main__":
    demonstrate_genexp_syntax()
