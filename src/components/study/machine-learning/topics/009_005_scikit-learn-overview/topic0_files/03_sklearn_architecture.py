"""
03_sklearn_architecture.py
Title: Unified Object-Oriented Interfaces in Scikit-Learn
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 03: The 3 Core Object Interfaces")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Mahima")
    print("=" * 65)

    print("""
    ┌─────────────────────────────────────────────────────────────┐
    │ 1. ESTIMATORS (State Estimation & Learning)                 │
    │    • Instantiated with hyper-parameters: model = Model(C=1) │
    │    • Methods: model.fit(X, y)                               │
    │    • Stores learned state with trailing underscore (e.g.    │
    │      coef_, intercept_, classes_, feature_importances_)     │
    ├─────────────────────────────────────────────────────────────┤
    │ 2. TRANSFORMERS (Feature Preprocessing & Filtering)         │
    │    • Methods: transform.fit(X), transform.transform(X)      │
    │    • Convenience: transform.fit_transform(X)               │
    │    • Examples: StandardScaler, OneHotEncoder, PCA           │
    ├─────────────────────────────────────────────────────────────┤
    │ 3. PREDICTORS (Inference & Scoring)                         │
    │    • Methods: model.predict(X_new), predict_proba(X_new)    │
    │    • Evaluation: model.score(X, y)                          │
    └─────────────────────────────────────────────────────────────┘
    """)
    print("✓ Consistent object-oriented design makes algorithm experimentation effortless!")

if __name__ == "__main__":
    main()
