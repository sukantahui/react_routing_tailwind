"""
Topic 8: Linear Models
Script 2: LogisticRegression - Binary Classification & Sigmoid Probabilities
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix

# Features: [Study Hours, Attendance Rate %] -> Target: 0 (Fail) / 1 (Pass)
X = np.array([
    [2.0, 50.0],
    [4.0, 60.0],
    [6.0, 65.0],
    [8.0, 80.0],
    [10.0, 85.0],
    [12.0, 95.0]
])
y = np.array([0, 0, 0, 1, 1, 1])

# Instantiate LogisticRegression
clf = LogisticRegression(random_state=42)
clf.fit(X, y)

print("--- Logistic Regression (Binary Classifier) ---")
print("Classes learned (classes_):", clf.classes_)
print("Weights / Coefficients (coef_):", clf.coef_)
print("Bias / Intercept (intercept_):", clf.intercept_)

# Predict discrete class labels & continuous probability distributions
y_pred = clf.predict(X)
y_prob = clf.predict_proba(X)

print("\n--- Predictions & Sigmoid Probabilities ---")
for i in range(len(X)):
    p_fail, p_pass = y_prob[i]
    print(f"Sample {i+1} ({X[i][0]}h, {X[i][1]}%): P(Fail)={p_fail:.3f}, P(Pass)={p_pass:.3f} => Pred={y_pred[i]} (Actual={y[i]})")

print(f"\nTraining Accuracy: {accuracy_score(y, y_pred) * 100:.1f}%")
