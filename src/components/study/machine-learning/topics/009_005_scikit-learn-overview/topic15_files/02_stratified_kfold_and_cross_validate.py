"""
Topic 15: Cross-Validation
Script 2: StratifiedKFold & cross_validate() with Multiple Metrics
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.datasets import make_classification
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import StratifiedKFold, cross_validate

# Imbalanced classification dataset
X, y = make_classification(n_samples=200, n_classes=2, weights=[0.85, 0.15], random_state=42)

# Define custom cross-validation splitter with explicit shuffling
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

clf = DecisionTreeClassifier(max_depth=3, random_state=42)

# cross_validate allows evaluating multiple metrics simultaneously and inspecting fit/score times
scoring_metrics = ['accuracy', 'precision', 'recall', 'f1']
cv_results = cross_validate(
    clf, X, y,
    cv=skf,
    scoring=scoring_metrics,
    return_train_score=True
)

df_results = pd.DataFrame({
    'Fit Time (s)': cv_results['fit_time'],
    'Train Acc': cv_results['train_accuracy'],
    'Test Acc': cv_results['test_accuracy'],
    'Test Precision': cv_results['test_precision'],
    'Test Recall': cv_results['test_recall'],
    'Test F1': cv_results['test_f1']
})

print("--- 5-Fold Stratified cross_validate() Results ---")
print(df_results.round(4))
print("\nMean Test F1-Score:", np.round(df_results['Test F1'].mean(), 4))
