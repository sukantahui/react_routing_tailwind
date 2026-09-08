"""
02_dot_notation_vs_bracket_notation.py
======================================
Topic: Dot Notation (df.col) vs Bracket Notation (df['col']) & Name Collisions
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("DOT NOTATION VS BRACKET NOTATION & METHOD NAME COLLISIONS")
    print("=" * 70)

    # DataFrame with tricky column names (spaces, method collisions)
    df = pd.DataFrame({
        "Student Name": ["Debangshu", "Susmita", "Swadeep"],
        "count": [10, 20, 30],         # Collides with df.count() method!
        "shape": ["2D", "2D", "2D"],   # Collides with df.shape attribute!
        "Score_INR": [8500, 9200, 6500]
    })

    print("Master DataFrame:\n", df)

    # 1. Accessing Column with Spaces: Bracket Notation ONLY
    # df.Student Name -> SyntaxError!
    print("\n1. Column with Spaces (df['Student Name']):")
    print(df["Student Name"])

    # 2. Method Collision Trap (e.g. column named 'count'):
    # df.count -> Returns the bound method <bound method DataFrame.count ...>, NOT the column!
    print("\n2. Method Name Collision Trap ('count'):")
    print("   df.count (WRONG - returns method pointer):", type(df.count))
    print("   df['count'] (CORRECT - returns Series):\n", df["count"])

    # 3. Dynamic Column Selection via Variables
    target_var = "Score_INR"
    # df.target_var -> Looks for literal column named 'target_var' and fails!
    print(f"\n3. Dynamic Variable Access (df[target_var]):\n", df[target_var])

    print("\n-> Best Practice Rule: ALWAYS use Bracket Notation (df['col']) in production code!")

if __name__ == "__main__":
    main()
