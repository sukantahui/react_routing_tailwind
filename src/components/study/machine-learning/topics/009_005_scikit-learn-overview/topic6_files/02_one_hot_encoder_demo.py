"""
Topic 6: LabelEncoder and OneHotEncoder
Script 2: OneHotEncoder for 2D Categorical Features
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

# Multi-column categorical student records
df_students = pd.DataFrame({
    'City': ['Barrackpore', 'Kolkata', 'Shyamnagar', 'Barrackpore'],
    'Department': ['CS', 'Math', 'CS', 'Physics']
})

print("--- Raw Categorical Features (X) ---")
print(df_students)

# 1. Standard OneHotEncoder with sparse_output=False for dense numpy array
ohe = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
encoded_matrix = ohe.fit_transform(df_students)

# Feature names after one-hot expansion
feature_names = ohe.get_feature_names_out(['City', 'Department'])
df_encoded = pd.DataFrame(encoded_matrix, columns=feature_names)

print("\n--- One-Hot Encoded Matrix ---")
print(df_encoded)

# 2. Handling unseen / novel categories during inference
unseen_student = pd.DataFrame({
    'City': ['Naihati'],      # 'Naihati' was never seen in training
    'Department': ['CS']
})

unseen_encoded = ohe.transform(unseen_student)
print("\n--- Transforming Unseen Category ('Naihati') with handle_unknown='ignore' ---")
print(pd.DataFrame(unseen_encoded, columns=feature_names))
print("Notice how all City columns are zero for 'Naihati' instead of throwing an error!")
