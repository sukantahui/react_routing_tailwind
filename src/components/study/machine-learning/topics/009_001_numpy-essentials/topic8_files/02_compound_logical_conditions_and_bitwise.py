"""
================================================================================
Topic 8 - Script 02: Compound Logical Conditions & Bitwise Operators
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Bitwise operators: & (AND), | (OR), ~ (NOT), ^ (XOR)
- Why Python's keywords 'and'/'or' fail with ValueError: truth value of array is ambiguous
- The critical necessity of parentheses around each condition due to operator precedence
================================================================================
"""

import numpy as np

def demonstrate_compound_conditions():
    print("=" * 65)
    print("1. COMPOUND CONDITIONS WITH BITWISE & (AND) AND | (OR)")
    print("=" * 65)

    # Student study hours
    hours = np.array([1.5, 4.0, 7.5, 2.0, 9.0, 5.5, 8.0])
    # Student test scores
    scores = np.array([45, 78, 88, 52, 95, 82, 91])

    print("Hours :", hours)
    print("Scores:", scores)

    # Find students who studied > 3 hours AND scored > 80
    # NOTE: Parentheses around (hours > 3) and (scores > 80) are MANDATORY!
    hardworking_pass_mask = (hours > 3) & (scores > 80)
    print("\nMask ((hours > 3) & (scores > 80)):", hardworking_pass_mask)
    print("Matching Scores                   :", scores[hardworking_pass_mask])

    # Find students who studied < 2 hours OR scored < 50 (Needs academic support)
    at_risk_mask = (hours < 2) | (scores < 50)
    print("\nAt-Risk Mask ((hours < 2) | (scores < 50)):", at_risk_mask)
    print("At-Risk Scores                            :", scores[at_risk_mask])

    print("\n" + "=" * 65)
    print("2. INVERSION WITH ~ (NOT)")
    print("=" * 65)
    not_at_risk = ~at_risk_mask
    print("Not at-risk mask (~at_risk_mask):", not_at_risk)

if __name__ == "__main__":
    demonstrate_compound_conditions()
