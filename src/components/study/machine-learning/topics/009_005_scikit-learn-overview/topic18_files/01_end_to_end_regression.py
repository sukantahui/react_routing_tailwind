"""
Topic 18: Worked Example 2 (End-to-End Regression)
Script 1: Complete Regression Pipeline on Real-World Student Salary Data
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# 1. Dataset: Graduate Student Attributes -> Starting Annual Salary (INR in Lakhs)
data = {
    'study_hours_weekly': [15, 25, 10, 30, 20, 28, 12, 35, 18, 22],
    'project_count': [2, 5, 1, 6, 3, 5, 1, 7, 2, 4],
    'certifications': ['Basic', 'Advanced', 'None', 'Advanced', 'Intermediate', 'Advanced', 'None', 'Advanced', 'Basic', 'Intermediate'],
    'location': ['Barrackpore', 'Kolkata', 'Barrackpore', 'Kolkata', 'Shyamnagar', 'Kolkata', 'Barrackpore', 'Kolkata', 'Barrackpore', 'Shyamnagar'],
    'salary_lakhs': [4.2, 8.5, 3.2, 11.0, 6.0, 9.8, 3.5, 12.5, 5.0, 7.2]
}
df = pd.DataFrame(data)
X = df.drop(columns=['salary_lakhs'])
y = df['salary_lakhs']

# 2. Train-Test Split (80/20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Preprocessor with ColumnTransformer
num_cols = ['study_hours_weekly', 'project_count']
cat_cols = ['certifications', 'location']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), num_cols),
        ('cat', OneHotEncoder(drop='first', handle_unknown='ignore'), cat_cols)
    ]
)

# 4. Master Regression Pipeline
reg_pipe = Pipeline([
    ('prep', preprocessor),
    ('reg', Ridge(alpha=1.0))
])

# 5. Cross-Validation (Negative Root Mean Squared Error)
cv_rmse = -cross_val_score(reg_pipe, X_train, y_train, cv=3, scoring='neg_root_mean_squared_error')
print(f"3-Fold Cross-Validated RMSE: ₹{cv_rmse.mean():.2f} Lakhs (±{cv_rmse.std():.2f})")

# 6. Fit and evaluate on Test Set
reg_pipe.fit(X_train, y_train)
y_pred = reg_pipe.predict(X_test)

print("\n--- Test Set Metrics ---")
print(f"MAE:  ₹{mean_absolute_error(y_test, y_pred):.2f} Lakhs")
print(f"RMSE: ₹{np.sqrt(mean_squared_error(y_test, y_pred)):.2f} Lakhs")
print(f"R2:   {r2_score(y_test, y_pred):.4f}")
