"""
02_pandas_vs_numpy_vs_sql.py
============================
Topic: Comparative Analysis: Python Lists vs NumPy ndarray vs Pandas vs SQL
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("COMPARISON: NUMPY NDARRAY VS PANDAS DATAFRAME")
    print("=" * 70)

    # 1. NumPy: Fast Homogeneous Pure Numeric Matrices
    # Best for: Linear Algebra, SIMD vector math, Neural Network weights, Tensors
    np_matrix = np.array([
        [1.0, 2.5, 3.0],
        [4.0, 5.5, 6.0]
    ])
    print("1. NumPy ndarray (Homogeneous, Unlabeled):")
    print(np_matrix)
    print("   Type:", type(np_matrix), "Dtype:", np_matrix.dtype)

    # 2. Pandas: Heterogeneous Labeled Tabular Data
    # Best for: Real-world CSV/Excel ingestion, text/categorical columns, SQL-like groupbys
    df = pd.DataFrame({
        "ID": [101, 102],
        "Name": ["Debangshu", "Susmita"],
        "Salary_INR": [45000.50, 62000.75],
        "Is_Active": [True, True]
    })
    print("\n2. Pandas DataFrame (Heterogeneous, Column-Indexed):")
    print(df)

    # 3. Interoperability: Seamless conversions between NumPy and Pandas
    # Extract underlying NumPy buffer from Pandas
    extracted_numpy = df[["Salary_INR"]].to_numpy()
    print("\n3. Converting DataFrame Column to NumPy ndarray (df.to_numpy()):")
    print(extracted_numpy)
    print("   Extracted NumPy shape:", extracted_numpy.shape)

if __name__ == "__main__":
    main()
