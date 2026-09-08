"""
Topic 16: Scikit-learn Pipeline
Script 1: Basic Pipeline Construction & Execution
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Toy training data
X_train = np.array([[20, 30000], [25, 45000], [45, 120000], [52, 140000]])
y_train = np.array([0, 0, 1, 1])

# 1. Explicit named Pipeline
pipe_explicit = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression(random_state=42))
])

# Fit entire pipeline with a single .fit() call
pipe_explicit.fit(X_train, y_train)

# 2. Inspect named pipeline steps
print("--- Pipeline Named Steps ---")
print("Pipeline Steps:", pipe_explicit.named_steps.keys())
print("Learned Scaler Mean:", pipe_explicit.named_steps['scaler'].mean_)
print("Learned Model Coef:", pipe_explicit.named_steps['classifier'].coef_)

# 3. Predict seamlessly (transforms X_test automatically before predicting!)
X_test = np.array([[22, 35000], [48, 130000]])
y_pred = pipe_explicit.predict(X_test)
y_prob = pipe_explicit.predict_proba(X_test)

print("\n--- Predictions on Unseen Test Samples ---")
for x, pred, prob in zip(X_test, y_pred, y_prob):
    print(f"Input {x} -> Predicted Class: {pred} (Prob = {prob[pred]*100:.1f}%)")

# 4. Convenient shorthand: make_pipeline()
pipe_short = make_pipeline(StandardScaler(), LogisticRegression())
print("\nmake_pipeline() created steps:", pipe_short.named_steps.keys())
