"""
03_ml_preprocessing_pipeline_preview.py
=======================================
Topic: Pandas in the Machine Learning Lifecycle (ETL to Scikit-Learn Model)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("PANDAS IN THE ML WORKFLOW: ETL & FEATURE MATRIX EXTRACTION")
    print("=" * 70)

    # 1. Raw Tabular Dataset (e.g. Loan Application or Course Enrollment)
    raw_data = {
        "Applicant": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin"],
        "Age": [24, 28, 22, 31, 26],
        "Monthly_Income_INR": [35000, 65000, 18000, 72000, 42000],
        "Credit_Score": [720, 790, 610, 810, 680],
        "Approved": [1, 1, 0, 1, 0]
    }
    df = pd.DataFrame(raw_data)
    print("1. Raw Labeled Tabular DataFrame:\n", df)

    # 2. Exploratory Overview
    print("\n2. Summary Statistics (df.describe()):\n", df.describe())

    # 3. Separating Feature Matrix X and Target Vector y
    # X holds independent features (Age, Income, Credit)
    # y holds dependent binary target (Approved)
    X = df[["Age", "Monthly_Income_INR", "Credit_Score"]].to_numpy()
    y = df["Approved"].to_numpy()

    print("\n3. Extracted NumPy Feature Matrix X for ML Model:")
    print("   Shape:", X.shape)
    print(X)

    print("\n4. Extracted NumPy Target Vector y:")
    print("   Shape:", y.shape)
    print(y)

if __name__ == "__main__":
    main()
