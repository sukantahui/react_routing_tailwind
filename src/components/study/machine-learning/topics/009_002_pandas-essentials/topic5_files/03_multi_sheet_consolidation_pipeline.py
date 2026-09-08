"""
03_multi_sheet_consolidation_pipeline.py
========================================
Topic: Consolidating Multi-Sheet Workbooks into a Single Master DataFrame
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("ETL PIPELINE: CONSOLIDATING MULTI-SHEET WORKBOOKS INTO ONE MASTER DF")
    print("=" * 70)

    # Simulated Workbook with 3 branch sheets: 'Barrackpore', 'Shyamnagar', 'Ichapur'
    branch_sheets = {
        "Barrackpore": pd.DataFrame({
            "StudentID": [101, 102],
            "Name": ["Debangshu", "Susmita"],
            "Course": ["ML", "ML"],
            "Fees_Paid_INR": [15000, 15000]
        }),
        "Shyamnagar": pd.DataFrame({
            "StudentID": [201, 202],
            "Name": ["Tuhina", "Sachin"],
            "Course": ["DS", "DS"],
            "Fees_Paid_INR": [12000, 12000]
        }),
        "Ichapur": pd.DataFrame({
            "StudentID": [301],
            "Name": ["Swadeep"],
            "Course": ["ML"],
            "Fees_Paid_INR": [15000]
        })
    }

    # Consolidated Pipeline:
    # 1. Iterate through dictionary items
    # 2. Add 'Branch' identifier column to track sheet provenance
    # 3. Concatenate vertically via pd.concat
    consolidated_list = []
    for branch_name, df_b in branch_sheets.items():
        df_copy = df_b.copy()
        df_copy["Branch"] = branch_name  # Track source sheet
        consolidated_list.append(df_copy)

    master_df = pd.concat(consolidated_list, ignore_index=True)

    print("Consolidated Master DataFrame across all Branch Sheets:\n", master_df)
    print(f"\nTotal Records: {len(master_df)}, Total Revenue: ₹{master_df['Fees_Paid_INR'].sum():,}")

if __name__ == "__main__":
    main()
