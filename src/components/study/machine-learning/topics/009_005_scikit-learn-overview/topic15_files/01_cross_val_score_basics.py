"""
Topic 15: Cross-Validation
Script 1: 5-Fold cross_val_score() Basics
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

# Load iris dataset
X, y = load_iris(return_X_y=True)

# Initialize estimator
model = LogisticRegression(max_iter=200, random_state=42)

# Perform 5-fold cross validation
# Returns an array of scores of the estimator for each run of the cross-validation
cv_scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')

print("--- 5-Fold Cross-Validation Scores ---")
for fold_idx, score in enumerate(cv_scores, 1):
    print(f"Fold #{fold_idx}: Accuracy = {score:.4f} ({score*100:.2f}%)")

mean_acc = np.mean(cv_scores)
std_acc = np.std(cv_scores)

print("\n--- Summary Performance ---")
print(f"Mean Accuracy:       {mean_acc:.4f} ({mean_acc*100:.2f}%)")
print(f"Standard Deviation:  ±{std_acc:.4f} (±{std_acc*100:.2f}%)")
print(f"95% Confidence Band: [{mean_acc - 2*std_acc:.4f}, {mean_acc + 2*std_acc:.4f}]")
