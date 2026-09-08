"""
03_handling_dates_na_and_chunking.py
====================================
Topic: Date Parsing, Custom Missing Values (na_values), and Chunked Iteration
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import io
import pandas as pd

def main():
    print("=" * 70)
    print("ADVANCED CSV: DATES, NA_VALUES & CHUNKING FOR BIG DATA")
    print("=" * 70)

    # Simulated messy CSV data with custom missing sentinels ('MISSING', 'N/A', -999)
    messy_csv = """TransactionID,Date,Amount_INR,Customer,Status
TX101,2026-09-01,1500.0,Debangshu,SUCCESS
TX102,2026-09-02,MISSING,Susmita,SUCCESS
TX103,2026-09-03,2400.5,Swadeep,PENDING
TX104,2026-09-04,-999.0,Tuhina,FAILED
TX105,2026-09-05,3200.0,Sachin,SUCCESS
"""

    # 1. Parsing Dates and Custom NA Sentinels
    df_cleaned = pd.read_csv(
        io.StringIO(messy_csv),
        parse_dates=["Date"],
        na_values=["MISSING", "-999.0", -999]
    )

    print("1. DataFrame with parse_dates & na_values:\n", df_cleaned)
    print(f"\n   Date Column Dtype: {df_cleaned['Date'].dtype} (True datetime64!)")
    print("   Missing Value Counts (df.isna().sum()):\n", df_cleaned.isna().sum())

    # 2. Chunking Large Datasets (chunksize=2)
    # When processing 10GB CSV files on a laptop with 8GB RAM:
    print("\n2. Chunked Processing Demo (chunksize=2):")
    chunk_reader = pd.read_csv(io.StringIO(messy_csv), chunksize=2)

    total_rows = 0
    for chunk_idx, chunk in enumerate(chunk_reader, 1):
        total_rows += len(chunk)
        print(f"   --- Chunk {chunk_idx} (Shape: {chunk.shape}) ---")
        print(chunk[["TransactionID", "Customer"]])

    print(f"\nTotal Processed Rows via Stream Chunking: {total_rows}")

if __name__ == "__main__":
    main()
