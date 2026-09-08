"""
Topic 11: Naive Bayes
Script 1: GaussianNB for Continuous Feature Classification
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score

# Features: [Height (cm), Weight (kg)] -> Target: 0 (Class A / Athlete) / 1 (Class B / General)
X_train = np.array([
    [175.0, 70.0],
    [180.0, 78.0],
    [185.0, 82.0],
    [190.0, 88.0],
    [155.0, 50.0],
    [160.0, 54.0],
    [165.0, 60.0],
    [170.0, 62.0]
])
y_train = np.array([0, 0, 0, 0, 1, 1, 1, 1])

# Initialize and fit Gaussian Naive Bayes
gnb = GaussianNB()
gnb.fit(X_train, y_train)

print("--- GaussianNB Learned Parameters ---")
print("Class Priors (class_prior_):", gnb.class_prior_)
print("Per-class Feature Means (theta_):\n", gnb.theta_)
print("Per-class Feature Variances (var_):\n", gnb.var_)

# Predict on new query: [Height: 182cm, Weight: 76kg]
X_new = np.array([[182.0, 76.0]])
pred_class = gnb.predict(X_new)[0]
pred_prob = gnb.predict_proba(X_new)[0]

print(f"\nQuery: Height=182cm, Weight=76kg")
print(f"Predicted Class: {pred_class} ({'Athlete' if pred_class==0 else 'General'})")
print(f"Posterior Probabilities: P(Athlete)={pred_prob[0]*100:.2f}%, P(General)={pred_prob[1]*100:.2f}%")
