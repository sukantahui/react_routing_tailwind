"""
==============================================================================
Topic 25: Practice Problems in Pandas
Script 03: Practice Problem 5 - High-Performance Pipeline & Compressed Export
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd
import numpy as np

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# --------------------------------------------------------------------------
# PROBLEM 5: End-to-End Pipeline & Top-K Extraction
# --------------------------------------------------------------------------
section("PROBLEM 5: PIPELINE FUNCTION WITH TOP-K EXTRACTION")

raw_stream = {
    "Candidate Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh"],
    "Test 1": [85, 92, 65, 88, 78, 90, 84],
    "Test 2": [90, 95, 70, 85, 80, 92, 88]
}

def etl_pipeline(data_dict, top_k=3):
    df = pd.DataFrame(data_dict)
    
    # Standardize column headers
    df.columns = df.columns.str.lower().str.replace(" ", "_")
    
    # Vectorized computation
    df["composite_score"] = (df["test_1"] * 0.4) + (df["test_2"] * 0.6)
    
    # High-performance Top-K extraction
    top_candidates = df.nlargest(n=top_k, columns="composite_score").reset_index(drop=True)
    top_candidates.index = top_candidates.index + 1
    top_candidates.index.name = "Rank"
    
    return top_candidates

top_3_result = etl_pipeline(raw_stream, top_k=3)
print("Problem 5 Solution Output (Top 3 Performers):")
print(top_3_result)
