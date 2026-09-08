"""
Topic 18: Worked Example 2 (End-to-End Regression)
Script 2: Multi-Regressor Benchmark & Ridge Alpha Tuning
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import KFold, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor

# Fetch real regression dataset
X, y = fetch_california_housing(return_X_y=True)
# Subsample 1000 records for fast classroom demo
X, y = X[:1000], y[:1000]

regressors = {
    'Linear Regression': LinearRegression(),
    'Ridge (alpha=1.0)': Ridge(alpha=1.0),
    'Lasso (alpha=0.1)': Lasso(alpha=0.1),
    'Random Forest (50 trees)': RandomForestRegressor(n_estimators=50, random_state=42)
}

cv = KFold(n_splits=5, shuffle=True, random_state=42)
records = []

for name, model in regressors.items():
    pipe = Pipeline([('scaler', StandardScaler()), ('reg', model)])
    r2_scores = cross_val_score(pipe, X, y, cv=cv, scoring='r2')
    rmse_scores = -cross_val_score(pipe, X, y, cv=cv, scoring='neg_root_mean_squared_error')
    records.append({
        'Model': name,
        'Mean R2': f"{r2_scores.mean():.4f} (±{r2_scores.std():.3f})",
        'Mean RMSE': f"{rmse_scores.mean():.4f}"
    })

print("--- Regression Benchmark Leaderboard ---")
print(pd.DataFrame(records).to_string(index=False))
