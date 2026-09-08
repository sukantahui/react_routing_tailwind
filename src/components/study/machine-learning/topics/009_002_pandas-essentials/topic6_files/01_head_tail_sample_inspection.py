"""
01_head_tail_sample_inspection.py
=================================
Topic: Inspecting DataFrame Boundaries: head(), tail(), and sample()
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("EXPLORATORY DATA INSPECTION: head(), tail() & sample()")
    print("=" * 70)

    # 10 student records from Barrackpore machine learning center
    data = {
        "StudentID": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Sourav", "Pooja", "Rohan"],
        "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh", "Khardah", "Sodepur", "Barrackpore"],
        "Study_Hours": [12.5, 15.0, 8.0, 14.5, 10.0, 13.0, 11.5, 9.0, 16.0, 7.5],
        "Score": [88, 95, 72, 91, 80, 89, 84, 76, 96, 68]
    }
    df = pd.DataFrame(data)

    # 1. df.head(n=5) -> First n rows (default is 5)
    print("1. df.head(3) [First 3 rows]:\n", df.head(3))

    # 2. df.tail(n=5) -> Last n rows
    print("\n2. df.tail(3) [Last 3 rows]:\n", df.tail(3))

    # 3. df.sample(n=3) -> Unbiased Random Sample
    # Crucial in ML to check if data is ordered/sorted or biased by collection sequence
    print("\n3. df.sample(n=3, random_state=42) [Random 3 rows]:\n", df.sample(n=3, random_state=42))

if __name__ == "__main__":
    main()
