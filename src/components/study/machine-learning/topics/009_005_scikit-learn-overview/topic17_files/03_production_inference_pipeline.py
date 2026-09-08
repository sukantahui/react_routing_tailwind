"""
Topic 17: Worked Example 1 (End-to-End Classification)
Script 3: Production Inference Payload & Probability Calibration
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

# Synthetic training database
train_df = pd.DataFrame({
    'attendance_pct': [85, 92, 45, 60, 78],
    'quiz_avg': [78.5, 90.0, 42.0, 55.0, 72.0],
    'city': ['Barrackpore', 'Kolkata', 'Shyamnagar', 'Barrackpore', 'Kolkata'],
    'certified': [1, 1, 0, 0, 1]
})

X_train = train_df[['attendance_pct', 'quiz_avg', 'city']]
y_train = train_df['certified']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['attendance_pct', 'quiz_avg']),
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['city'])
    ]
)

prod_pipeline = Pipeline([
    ('prep', preprocessor),
    ('model', LogisticRegression(random_state=42))
])

prod_pipeline.fit(X_train, y_train)

# Incoming live queries (raw JSON payloads from students in Barrackpore)
new_applicants = pd.DataFrame([
    {'attendance_pct': 88, 'quiz_avg': 84.0, 'city': 'Barrackpore'},
    {'attendance_pct': 50, 'quiz_avg': 40.0, 'city': 'Kolkata'},
    {'attendance_pct': 70, 'quiz_avg': 68.0, 'city': 'Naihati'} # Note: 'Naihati' is unseen category!
])

predictions = prod_pipeline.predict(new_applicants)
probabilities = prod_pipeline.predict_proba(new_applicants)

print("--- Production Inference Results ---")
for idx, (row, pred, prob) in enumerate(zip(new_applicants.to_dict(orient='records'), predictions, probabilities)):
    status = "Certified (PASS)" if pred == 1 else "Needs Improvement (FAIL)"
    print(f"Applicant #{idx+1}: {row}")
    print(f"--> Decision: {status} | Confidence: {prob[pred]*100:.1f}%\n")
