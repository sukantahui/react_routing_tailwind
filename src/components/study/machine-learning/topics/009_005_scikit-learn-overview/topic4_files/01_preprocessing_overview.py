"""
Topic 4: Preprocessing with sklearn.preprocessing
Script 1: Preprocessing Ecosystem & Quick Transformations
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn import preprocessing

# Sample dataset representing student metrics in Barrackpore batch
raw_data = {
    'student': ['Debangshu', 'Susmita', 'Swadeep', 'Tuhina', 'Sachin'],
    'study_hours': [12.0, 35.0, 8.0, 24.0, 18.0],
    'exam_score': [45, 92, 38, 78, 62],
    'passed_test': [0, 1, 0, 1, 1]
}
df = pd.DataFrame(raw_data)
print("--- Raw Input DataFrame ---")
print(df)

# 1. Binarization: Convert continuous values to 0/1 based on a threshold
# E.g., Marking students scoring >= 60 as distinction (1), else 0
binarizer = preprocessing.Binarizer(threshold=60.0)
scores_2d = df[['exam_score']].values
distinction = binarizer.fit_transform(scores_2d)
df['distinction_flag'] = distinction

# 2. MaxAbsScaler: Scale each feature by its maximum absolute value (keeps sparsity)
max_abs = preprocessing.MaxAbsScaler()
df['study_hours_maxabs'] = max_abs.fit_transform(df[['study_hours']])

# 3. RobustScaler: Scale features using statistics that are robust to outliers (IQR)
robust = preprocessing.RobustScaler()
df['exam_score_robust'] = robust.fit_transform(df[['exam_score']])

print("\n--- Preprocessed DataFrame ---")
print(df[['student', 'study_hours', 'study_hours_maxabs', 'exam_score', 'distinction_flag', 'exam_score_robust']])
