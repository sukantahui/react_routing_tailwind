"""
01_single_and_compound_boolean_conditions.py
============================================
Topic: Boolean Filtering: Single Conditions & Compound Bitwise Operators (&, |, ~)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("BOOLEAN FILTERING: SINGLE & COMPOUND CONDITIONS (&, |, ~)")
    print("=" * 70)

    df = pd.DataFrame({
        "StudentID": [101, 102, 103, 104, 105, 106],
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"],
        "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore"],
        "Math": [85, 92, 65, 88, 78, 90],
        "Science": [90, 95, 70, 85, 80, 92]
    })

    print("Master DataFrame:\n", df)

    # 1. Single Boolean Condition
    # High achievers in Math (Math >= 85)
    math_mask = df["Math"] >= 85
    print("\n1. Boolean Mask (df['Math'] >= 85):\n", math_mask)
    print("\n   Filtered DataFrame (df[math_mask]):\n", df[math_mask])

    # 2. Compound AND Condition (&) with PARENTHESES:
    # Rule: Must wrap each condition in () due to Python bitwise operator precedence!
    # Students with Math >= 85 AND Science >= 90
    merit_students = df[(df["Math"] >= 85) & (df["Science"] >= 90)]
    print("\n2. Compound AND: df[(df['Math'] >= 85) & (df['Science'] >= 90)]:\n", merit_students)

    # 3. Compound OR Condition (|):
    # Students either from Barrackpore OR with Math > 90
    or_filter = df[(df["Locality"] == "Barrackpore") | (df["Math"] > 90)]
    print("\n3. Compound OR: (Locality == 'Barrackpore') | (Math > 90):\n", or_filter)

    # 4. NOT / Negation Condition (~):
    # Students NOT from Barrackpore
    not_barrackpore = df[~(df["Locality"] == "Barrackpore")]
    print("\n4. Negation NOT (~): df[~(df['Locality'] == 'Barrackpore')]:\n", not_barrackpore)

if __name__ == "__main__":
    main()
