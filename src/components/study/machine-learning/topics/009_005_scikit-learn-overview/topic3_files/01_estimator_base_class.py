"""
01_estimator_base_class.py
Title: BaseEstimator, ClassifierMixin, and RegressorMixin Architecture
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

from sklearn.base import BaseEstimator, ClassifierMixin, RegressorMixin

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 01: Estimator Object Hierarchy & Mixins")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    # In Scikit-learn, every algorithm inherits from BaseEstimator:
    # 1. BaseEstimator : Provides get_params() and set_params() for GridSearchCV compatibility
    # 2. ClassifierMixin: Adds .score(X, y) that computes classification accuracy
    # 3. RegressorMixin : Adds .score(X, y) that computes R² score
    # 4. TransformerMixin: Automatically creates .fit_transform() from .fit() and .transform()

    print("\n🏛️ Inheritance Hierarchy:")
    print("   BaseEstimator")
    print("      ├── ClassifierMixin -> LogisticRegression, SVC, DecisionTreeClassifier")
    print("      ├── RegressorMixin  -> LinearRegression, SVR, RandomForestRegressor")
    print("      └── TransformerMixin -> StandardScaler, PCA, SimpleImputer")

    print("\n✓ This standardized mixin inheritance ensures 100% interoperability with Pipelines!")

if __name__ == "__main__":
    main()
