"""
Topic 6: LabelEncoder and OneHotEncoder
Script 1: LabelEncoder for 1D Target Labels
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.preprocessing import LabelEncoder

# Student exam result classifications
raw_grades = ['Pass', 'Distinction', 'Fail', 'Pass', 'Distinction', 'Pass']

# Instantiate LabelEncoder
le = LabelEncoder()

# Fit on unique classes and transform into integer labels (0 to K-1)
encoded_grades = le.fit_transform(raw_grades)

print("--- Raw Categorical Target ---")
print(raw_grades)

print("\n--- Learned Classes (Alphabetically sorted) ---")
print("Classes (le.classes_):", le.classes_)

print("\n--- Integer Encoded Output ---")
print(encoded_grades)

# Decode integers back to text
recovered_grades = le.inverse_transform([0, 1, 2, 0])
print("\n--- Inverted back from [0, 1, 2, 0] ---")
print(recovered_grades)

# WARNING: LabelEncoder is designed ONLY for 1D target vectors (y), NOT 2D feature matrices (X)!
