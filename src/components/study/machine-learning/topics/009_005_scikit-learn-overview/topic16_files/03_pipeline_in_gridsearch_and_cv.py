"""
Topic 16: Scikit-learn Pipeline
Script 3: Preventing Data Leakage in Cross-Validation & Hyperparameter Tuning
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

from sklearn.datasets import load_breast_cancer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV, cross_val_score

X, y = load_breast_cancer(return_X_y=True)

# Encapsulate Scaler + SVM into Pipeline to prevent test leakage across CV folds
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('svm', SVC())
])

# Define parameter grid (use double underscore 'stepname__paramname' syntax)
param_grid = {
    'svm__C': [0.1, 1.0, 10.0],
    'svm__kernel': ['linear', 'rbf']
}

grid = GridSearchCV(pipeline, param_grid, cv=5, scoring='accuracy')
grid.fit(X, y)

print("--- GridSearchCV with Pipeline ---")
print("Best Parameters:", grid.best_params_)
print(f"Best 5-Fold Cross-Validated Accuracy: {grid.best_score_*100:.2f}%")
print(f"Best Estimator Pipeline: {grid.best_estimator_}")
