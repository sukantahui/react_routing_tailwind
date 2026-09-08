"""
01_fit_predict_score_workflow.py
Title: The Canonical 3-Step Scikit-Learn Estimator Workflow
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import numpy as np
from sklearn.linear_model import LinearRegression

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 01: Canonical API Pattern (.fit -> .predict -> .score)")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    # 1. Feature matrix X must be 2D: (n_samples, n_features)
    #    Target vector y must be 1D: (n_samples,)
    X_train = np.array([[2], [4], [6], [8], [10], [12]]) # Study hours
    y_train = np.array([25, 42, 58, 72, 85, 96])          # ML Marks

    # Step A: Instantiate Estimator with hyperparameters
    model = LinearRegression()
    print("Step 1: Instantiated LinearRegression()")

    # Step B: Fit / Estimate model parameters on training set
    model.fit(X_train, y_train)
    print("Step 2: Model trained via model.fit(X_train, y_train)")
    print(f"   • Learned Slope (coef_)      : {model.coef_[0]:.2f}")
    print(f"   • Learned Intercept (intercept_): {model.intercept_:.2f}")

    # Step C: Predict on new unseen 2D test observations
    X_test = np.array([[5], [9], [14]])
    y_pred = model.predict(X_test)
    print("\nStep 3: Inferences generated via model.predict(X_test):")
    for hrs, pred in zip(X_test.flatten(), y_pred):
        print(f"   • {hrs} Study Hours -> Predicted ML Mark: {pred:.1f}/100")

    # Step D: Score model (R² coefficient of determination)
    r2_score = model.score(X_train, y_train)
    print(f"\nStep 4: Model Evaluation Score R²: {r2_score:.4f} (Near 1.0 is excellent fit)")

if __name__ == "__main__":
    main()
