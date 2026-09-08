"""
Topic 17: Worked Example 1 (End-to-End Classification)
Script 2: Model Benchmark Comparison across 4 Classifiers
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer

# Load dataset
X, y = load_breast_cancer(return_X_y=True)

# Define classifiers to benchmark
models = {
    'Logistic Regression': LogisticRegression(max_iter=300),
    'KNN (K=5)': KNeighborsClassifier(n_neighbors=5),
    'Decision Tree (depth=4)': DecisionTreeClassifier(max_depth=4, random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
results = []

for name, clf in models.items():
    pipe = Pipeline([
        ('scaler', StandardScaler()),
        ('model', clf)
    ])
    scores = cross_val_score(pipe, X, y, cv=cv, scoring='accuracy')
    results.append({
        'Model': name,
        'Mean Accuracy (%)': scores.mean() * 100,
        'Std Dev (%)': scores.std() * 100
    })

df_comparison = pd.DataFrame(results).sort_values(by='Mean Accuracy (%)', ascending=False)
print("--- Classifier Benchmark Comparison ---")
print(df_comparison.to_string(index=False))
