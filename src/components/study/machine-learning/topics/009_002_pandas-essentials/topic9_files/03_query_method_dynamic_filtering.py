"""
03_query_method_dynamic_filtering.py
====================================
Topic: Expressive SQL-like Filtering with df.query() & Variable Substitution (@var)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("EXPRESSIVE FILTERING: df.query() & NUMEXPR ACCELERATION")
    print("=" * 70)

    df = pd.DataFrame({
        "StudentID": [101, 102, 103, 104, 105, 106],
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"],
        "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore"],
        "Math": [85, 92, 65, 88, 78, 90],
        "Science": [90, 95, 70, 85, 80, 92]
    })

    print("Master DataFrame:\n", df)

    # 1. Basic df.query() syntax (clean, no repeated df['col'] mentions)
    query_basic = df.query("Math >= 85 and Science >= 90")
    print("\n1. df.query('Math >= 85 and Science >= 90'):\n", query_basic)

    # 2. Dynamic Variable Injection via @ symbol
    min_score = 80
    allowed_cities = ["Barrackpore", "Shyamnagar", "Ichapur"]

    query_dynamic = df.query("Math >= @min_score and Locality in @allowed_cities")
    print(f"\n2. Dynamic df.query('Math >= @min_score and Locality in @allowed_cities') [min={min_score}]:\n", query_dynamic)

    # 3. String Expressions in query
    query_str = df.query("Locality == 'Barrackpore'")
    print("\n3. df.query(\"Locality == 'Barrackpore'\"):\n", query_str)

if __name__ == "__main__":
    main()
