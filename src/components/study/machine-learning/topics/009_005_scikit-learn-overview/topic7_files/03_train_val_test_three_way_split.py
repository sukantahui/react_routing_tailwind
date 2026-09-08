"""
Topic 7: train_test_split()
Script 3: 3-Way Split: Train, Validation, and Test
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.model_selection import train_test_split

# 1000 simulated samples
X = np.random.randn(1000, 5)
y = np.random.randint(0, 2, size=1000)

# Goal: 70% Train, 15% Validation, 15% Test
# Step 1: Split off 15% Test set first
X_train_val, X_test, y_train_val, y_test = train_test_split(
    X, y, test_size=0.15, random_state=42, stratify=y
)

# Step 2: From remaining 85%, calculate fraction for 15% validation: 0.15 / 0.85 ≈ 0.1765
val_fraction = 0.15 / (1.0 - 0.15)
X_train, X_val, y_train, y_val = train_test_split(
    X_train_val, y_train_val, test_size=val_fraction, random_state=42, stratify=y_train_val
)

print(f"Total Dataset:     {len(X)} samples (100%)")
print(f"Training Set:      {len(X_train)} samples ({len(X_train)/len(X)*100:.1f}%)")
print(f"Validation Set:    {len(X_val)} samples ({len(X_val)/len(X)*100:.1f}%)")
print(f"Testing Set:       {len(X_test)} samples ({len(X_test)/len(X)*100:.1f}%)")
