"""
Topic 10: Tree Models
Script 3: Feature Importances & Text Tree Visualization
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text

# Real-estate / Loan Risk Dataset
df = pd.DataFrame({
    'Income_k': [30, 45, 60, 20, 80, 110, 35, 95],
    'Credit_Score': [580, 640, 710, 520, 780, 820, 610, 750],
    'Loan_Amount_k': [15, 20, 25, 10, 40, 50, 12, 35],
    'Default': [1, 0, 0, 1, 0, 0, 1, 0]
})

feature_cols = ['Income_k', 'Credit_Score', 'Loan_Amount_k']
X = df[feature_cols]
y = df['Default']

tree = DecisionTreeClassifier(max_depth=3, random_state=42)
tree.fit(X, y)

# 1. Inspect Feature Importances (Gini importance / Mean Decrease Impurity)
importances = pd.Series(tree.feature_importances_, index=feature_cols).sort_values(ascending=False)
print("--- Normalized Feature Importances (Sum = 1.0) ---")
print(importances)

# 2. Export human-readable ASCII decision tree rules
tree_text_rules = export_text(tree, feature_names=feature_cols)
print("\n--- ASCII Decision Tree Rules ---")
print(tree_text_rules)
