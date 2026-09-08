"""
Topic 7: train_test_split()
Script 2: Stratified Split for Imbalanced Classification
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

# Highly imbalanced dataset: 90% Class 0 (Normal), 10% Class 1 (Fraud / Rare)
np.random.seed(42)
n_samples = 100
X = np.random.randn(n_samples, 2)
# 90 zeros, 10 ones
y = np.array([0] * 90 + [1] * 10)

print(f"Overall Class Distribution: Class 0 = {np.sum(y == 0)}%, Class 1 = {np.sum(y == 1)}%")

# 1. Non-stratified split (Standard random sampling)
X_train_rand, X_test_rand, y_train_rand, y_test_rand = train_test_split(
    X, y, test_size=0.2, random_state=123
)
print("\n--- Non-Stratified Split ---")
print(f"Train Class 1 count: {np.sum(y_train_rand == 1)} / {len(y_train_rand)} ({np.mean(y_train_rand == 1)*100:.1f}%)")
print(f"Test Class 1 count:  {np.sum(y_test_rand == 1)} / {len(y_test_rand)} ({np.mean(y_test_rand == 1)*100:.1f}%)")

# 2. Stratified split (Preserves exact class proportions)
X_train_strat, X_test_strat, y_train_strat, y_test_strat = train_test_split(
    X, y, test_size=0.2, random_state=123, stratify=y
)
print("\n--- Stratified Split (stratify=y) ---")
print(f"Train Class 1 count: {np.sum(y_train_strat == 1)} / {len(y_train_strat)} ({np.mean(y_train_strat == 1)*100:.1f}%)")
print(f"Test Class 1 count:  {np.sum(y_test_strat == 1)} / {len(y_test_strat)} ({np.mean(y_test_strat == 1)*100:.1f}%)")
print("Notice how both Train and Test maintain exactly 10% positive instances!")
