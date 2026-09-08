"""
Topic 10: Tree Models
Script 2: Tree Pruning & Regularization Hyperparameters
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# Non-linear synthetic dataset
X, y = make_moons(n_samples=300, noise=0.25, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 1. Unconstrained Decision Tree (Prone to extreme overfitting)
dt_unconstrained = DecisionTreeClassifier(random_state=42)
dt_unconstrained.fit(X_train, y_train)

train_acc_un = accuracy_score(y_train, dt_unconstrained.predict(X_train))
test_acc_un = accuracy_score(y_test, dt_unconstrained.predict(X_test))

print("--- 1. Unconstrained Tree (Overfitting) ---")
print(f"Depth: {dt_unconstrained.get_depth()} | Leaves: {dt_unconstrained.get_n_leaves()}")
print(f"Train Accuracy: {train_acc_un*100:.1f}% | Test Accuracy: {test_acc_un*100:.1f}%")

# 2. Regularized Decision Tree (Constrained max_depth & min_samples_leaf)
dt_pruned = DecisionTreeClassifier(
    max_depth=4,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)
dt_pruned.fit(X_train, y_train)

train_acc_pr = accuracy_score(y_train, dt_pruned.predict(X_train))
test_acc_pr = accuracy_score(y_test, dt_pruned.predict(X_test))

print("\n--- 2. Pruned Tree (max_depth=4, min_samples_leaf=5) ---")
print(f"Depth: {dt_pruned.get_depth()} | Leaves: {dt_pruned.get_n_leaves()}")
print(f"Train Accuracy: {train_acc_pr*100:.1f}% | Test Accuracy: {test_acc_pr*100:.1f}%")
print("Notice how the pruned tree achieves higher generalization test accuracy!")
