"""
Topic 20: Practice Problems
Problem 3: Building a Pipeline with Hyperparameter GridSearchCV
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

from sklearn.datasets import load_wine
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV

# Load Wine classification dataset
X, y = load_wine(return_X_y=True)

# Build leak-free Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('svc', SVC(random_state=42))
])

# Define grid of hyperparameters
param_grid = {
    'svc__C': [0.1, 1.0, 10.0, 100.0],
    'svc__kernel': ['linear', 'rbf'],
    'svc__gamma': ['scale', 'auto']
}

grid_search = GridSearchCV(
    estimator=pipeline,
    param_grid=param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

grid_search.fit(X, y)

print("--- Problem 3: GridSearchCV Results ---")
print("Best Hyperparameters:", grid_search.best_params_)
print(f"Best 5-Fold Cross-Validated Accuracy: {grid_search.best_score_*100:.2f}%")
