"""
Topic 8: Linear Models
Script 1: LinearRegression - Predicting Continuous Exam Scores
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Training data: Study Hours -> Exam Score
X_train = np.array([[2.0], [4.0], [6.0], [8.0], [10.0], [12.0]])
y_train = np.array([28.0, 42.0, 56.0, 71.0, 84.0, 96.0])

# Initialize and fit LinearRegression estimator
reg = LinearRegression(fit_intercept=True)
reg.fit(X_train, y_train)

# Inspect learned parameters
slope = reg.coef_[0]
intercept = reg.intercept_

print("--- LinearRegression Model Learned ---")
print(f"Regression Equation: y = {slope:.2f} * x + {intercept:.2f}")
print(f"Learned Weight (coef_):      {reg.coef_}")
print(f"Learned Bias (intercept_):  {reg.intercept_:.4f}")

# Make predictions on training data and evaluate
y_pred = reg.predict(X_train)
mse = mean_squared_error(y_train, y_pred)
r2 = r2_score(y_train, y_pred)

print(f"\nModel Performance on Training Set:")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"R-squared Score (R2):     {r2:.4f}")

# Predict for a new student studying 7.5 hours
X_new = np.array([[7.5]])
pred_score = reg.predict(X_new)[0]
print(f"\nPredicted score for 7.5 hours study: {pred_score:.2f} marks")
