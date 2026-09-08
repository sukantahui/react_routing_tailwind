"""
Topic 6: LabelEncoder and OneHotEncoder
Script 3: OrdinalEncoder vs OneHotEncoder & ColumnTransformer Workflow
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer

# Mixed data: Numerical, Ordinal categorical, Nominal categorical
data = pd.DataFrame({
    'Student': ['Debangshu', 'Susmita', 'Swadeep', 'Tuhina'],
    'Experience_Level': ['Beginner', 'Advanced', 'Intermediate', 'Intermediate'], # Ordinal
    'City': ['Barrackpore', 'Kolkata', 'Kolkata', 'Barrackpore'],                # Nominal
    'Attendance_Pct': [75.0, 95.0, 80.0, 88.0]                                   # Numeric
})

print("--- Multi-Type Input Dataset ---")
print(data)

# Specify explicit hierarchy for OrdinalEncoder
ordinal_levels = [['Beginner', 'Intermediate', 'Advanced']]

# Build a unified ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ('ord', OrdinalEncoder(categories=ordinal_levels), ['Experience_Level']),
        ('cat', OneHotEncoder(drop='first'), ['City']),
        ('num', StandardScaler(), ['Attendance_Pct'])
    ],
    remainder='drop'
)

processed_array = preprocessor.fit_transform(data)

print("\n--- ColumnTransformer Processed Array ---")
print(processed_array)
print("Output Columns: ['Experience_Level(0-2)', 'City_Kolkata(0/1)', 'Attendance_Pct(std)']")
