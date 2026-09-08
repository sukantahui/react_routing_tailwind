"""
02_inspecting_learned_attributes.py
Title: Inspecting Internal Estimator Parameters with Trailing Underscores
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 02: Model Introspection & Learned State")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Mahima")
    print("=" * 65)

    iris = load_iris()
    X, y = iris.data, iris.target

    model = LogisticRegression(max_iter=200)

    print("Before fitting: model is uninitialized.")
    try:
        print(model.coef_)
    except AttributeError:
        print("✓ Verified: model.coef_ does not exist before .fit() is called!")

    model.fit(X, y)
    print("\nAfter fitting: All learned attributes with trailing '_' are populated:")
    print(f" • Classes learned (classes_)       : {model.classes_}")
    print(f" • Weight Matrix shape (coef_)       : {model.coef_.shape}")
    print(f" • Intercepts Vector (intercept_)   : {model.intercept_.round(2)}")
    print(f" • Number of features seen (n_features_in_): {model.n_features_in_}")

if __name__ == "__main__":
    main()
