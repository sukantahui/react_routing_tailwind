"""
Topic 20: Practice Problems
Problem 2: Classifier Benchmarking with 5-Fold Cross-Validation
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB

X, y = load_iris(return_X_y=True)

models = {
    'LogisticRegression': LogisticRegression(max_iter=300),
    'KNN (K=5)': KNeighborsClassifier(n_neighbors=5),
    'DecisionTree': DecisionTreeClassifier(max_depth=3, random_state=42),
    'GaussianNB': GaussianNB()
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
benchmark_records = []

for name, clf in models.items():
    scores = cross_val_score(clf, X, y, cv=cv, scoring='accuracy')
    benchmark_records.append({
        'Classifier': name,
        'Mean Accuracy (%)': round(scores.mean() * 100, 2),
        'Std Dev (%)': round(scores.std() * 100, 2)
    })

print("--- Problem 2: Classifier Leaderboard ---")
print(pd.DataFrame(benchmark_records).sort_values(by='Mean Accuracy (%)', ascending=False).to_string(index=False))
