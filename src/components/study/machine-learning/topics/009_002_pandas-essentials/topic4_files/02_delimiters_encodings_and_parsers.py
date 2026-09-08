"""
02_delimiters_encodings_and_parsers.py
======================================
Topic: Custom Delimiters (sep), Encodings, and High-Performance Engines
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import io
import pandas as pd

def main():
    print("=" * 70)
    print("CSV DELIMITERS, ENCODINGS & PARSING ENGINES")
    print("=" * 70)

    # 1. Semicolon-Separated Values (European / Tax Software standard)
    tsv_data = "Name;Department;Salary_INR;Joining_Date\nDebangshu;AI Lab;55000;2024-01-15\nSusmita;Data Science;65000;2023-11-01\nSwadeep;Cloud;42000;2024-06-20\n"

    df_semicolon = pd.read_csv(io.StringIO(tsv_data), sep=";")
    print("1. Parsed with sep=';':\n", df_semicolon)

    # 2. Tab-Separated Values (TSV / Logs): sep='\t'
    tab_data = "Student\tScore\tCity\nDebangshu\t88\tBarrackpore\nSusmita\t95\tShyamnagar\n"
    df_tab = pd.read_csv(io.StringIO(tab_data), sep="\t")
    print("\n2. Parsed with sep='\\t':\n", df_tab)

    # 3. Handling Files Without Header: header=None, names=[...]
    raw_no_header = "101,Debangshu,88\n102,Susmita,95\n103,Swadeep,72\n"
    df_no_head = pd.read_csv(
        io.StringIO(raw_no_header),
        header=None,
        names=["ID", "Candidate", "Score"]
    )
    print("\n3. Parsed with header=None and custom names=[...]:\n", df_no_head)

if __name__ == "__main__":
    main()
