"""
Topic 16: Scikit-learn Pipeline
Script 2: Full End-to-End Pipeline with ColumnTransformer
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

# Mixed raw student DataFrame with missing values
raw_df = pd.DataFrame({
    'study_hours': [10.0, None, 25.0, 30.0, 15.0, 20.0],
    'attendance_pct': [60.0, 75.0, None, 95.0, 70.0, 85.0],
    'city': ['Barrackpore', 'Kolkata', 'Barrackpore', 'Shyamnagar', 'Kolkata', 'Barrackpore'],
    'passed': [0, 1, 1, 1, 0, 1]
})

X = raw_df[['study_hours', 'attendance_pct', 'city']]
y = raw_df['passed']

# 1. Sub-pipeline for numeric features (Impute median -> StandardScale)
numeric_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# 2. Sub-pipeline for categorical features (Impute most_frequent -> OneHotEncode)
categorical_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

# 3. Combine into ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_pipe, ['study_hours', 'attendance_pct']),
        ('cat', categorical_pipe, ['city'])
    ]
)

# 4. Master Pipeline: Preprocessing + Model
full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model', RandomForestClassifier(n_estimators=50, random_state=42))
])

full_pipeline.fit(X, y)
print("--- Master Pipeline Fitted Successfully ---")
print("Steps in Master Pipeline:", [name for name, _ in full_pipeline.steps])
print("Training Score:", full_pipeline.score(X, y))
