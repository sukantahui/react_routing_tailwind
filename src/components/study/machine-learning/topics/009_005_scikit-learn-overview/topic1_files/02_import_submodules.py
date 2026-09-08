"""
02_import_submodules.py
Title: Explicit Submodule Import Architecture in Scikit-Learn
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 02: Explicit Submodule Imports")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    print("""
    💡 Best Practice: Scikit-learn DOES NOT eagerly load all submodules
       when you write `import sklearn`.
       You must explicitly import specific classes from subpackages:

       # 1. Preprocessing & Scalers
       from sklearn.preprocessing import StandardScaler, OneHotEncoder

       # 2. Dataset Splitting & Tuning
       from sklearn.model_selection import train_test_split, cross_val_score

       # 3. Estimator Models
       from sklearn.linear_model import LinearRegression, LogisticRegression
       from sklearn.tree import DecisionTreeClassifier
       from sklearn.cluster import KMeans

       # 4. Metrics & Evaluation
       from sklearn.metrics import accuracy_score, mean_squared_error, classification_report
    """)
    print("✓ Explicit imports prevent memory bloat and keep scripts clean!")

if __name__ == "__main__":
    main()
