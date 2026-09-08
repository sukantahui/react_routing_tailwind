"""
Topic 17: Worked Example 1 (End-to-End Classification)
Script 1: Complete Classification Pipeline on Real-World Student Data
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# 1. Real-world dataset simulation: Barrackpore batch student performance
raw_data = {
    'attendance_pct': [85, 92, 45, 60, 78, 88, 52, 95, 70, 65, 82, 40],
    'quiz_avg': [78.5, 90.0, 42.0, 55.0, 72.0, 84.0, 48.0, 96.0, 68.0, 60.0, 80.0, 35.0],
    'lab_completed': ['Yes', 'Yes', 'No', 'No', 'Yes', 'Yes', 'No', 'Yes', 'Yes', 'No', 'Yes', 'No'],
    'prior_exp': ['Beginner', 'Advanced', 'Beginner', 'Beginner', 'Intermediate', 'Intermediate', 'Beginner', 'Advanced', 'Intermediate', 'Beginner', 'Advanced', 'Beginner'],
    'certified': [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0]
}
df = pd.DataFrame(raw_data)
X = df.drop(columns=['certified'])
y = df['certified']

# 2. Stratified Train-Test Split (80/20)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

# 3. Build ColumnTransformer Preprocessing Pipeline
numeric_features = ['attendance_pct', 'quiz_avg']
categorical_features = ['lab_completed', 'prior_exp']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ]), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ]
)

# 4. Master Pipeline: Preprocessor + Random Forest Classifier
full_pipe = Pipeline([
    ('prep', preprocessor),
    ('clf', RandomForestClassifier(n_estimators=50, random_state=42))
])

# 5. Cross-Validation on Training Split
cv_scores = cross_val_score(full_pipe, X_train, y_train, cv=3, scoring='accuracy')
print(f"3-Fold CV Accuracy: {cv_scores.mean()*100:.1f}% ± {cv_scores.std()*100:.1f}%")

# 6. Fit on Train and Evaluate on Test
full_pipe.fit(X_train, y_train)
y_pred = full_pipe.predict(X_test)

print("\n--- Test Set Evaluation ---")
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=['Not Certified', 'Certified']))
