"""
Topic 7: Paired t-Test (stats.ttest_rel) for Model Comparison Across K-Folds
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# 10-Fold Cross-Validation accuracy scores (%) for two models on the exact same folds
model_random_forest = np.array([88.2, 89.1, 87.5, 90.0, 88.8, 89.5, 87.9, 90.2, 88.4, 89.8])
model_decision_tree = np.array([82.1, 83.5, 81.9, 84.0, 82.5, 83.8, 81.2, 84.5, 82.0, 83.1])

# Paired related samples t-test
t_stat, p_val = stats.ttest_rel(model_random_forest, model_decision_tree)

print("--- 10-Fold Cross-Validation Paired t-Test ---")
print(f"Random Forest Mean Accuracy : {np.mean(model_random_forest):.2f}%")
print(f"Decision Tree Mean Accuracy : {np.mean(model_decision_tree):.2f}%")
print(f"Paired t-statistic          : {t_stat:.4f}")
print(f"p-value                     : {p_val:.10f}")
print("\nConclusion: The ensemble Random Forest outperforms single Decision Tree with extreme statistical significance.")
