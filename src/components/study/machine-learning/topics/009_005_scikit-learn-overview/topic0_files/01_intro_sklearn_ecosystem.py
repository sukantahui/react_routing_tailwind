"""
01_intro_sklearn_ecosystem.py
Title: Introduction to Scikit-learn (sklearn) Machine Learning Ecosystem
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
"""

import sklearn
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Overview Lab 01: Core Philosophy & Ecosystem")
    print("   Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 65)

    print(f"\n📦 Scikit-learn Version: {sklearn.__version__}")
    print("\n🏛️ The 6 Pillars of Scikit-Learn:")
    print(" 1. Classification  : LogisticRegression, SVM, DecisionTrees, RandomForest, KNN")
    print(" 2. Regression      : LinearRegression, Ridge, Lasso, SVR, GradientBoosting")
    print(" 3. Clustering      : KMeans, DBSCAN, AgglomerativeClustering, SpectralClustering")
    print(" 4. Dimensionality  : PCA, TruncatedSVD, FastICA, t-SNE")
    print(" 5. Model Selection : train_test_split, cross_val_score, GridSearchCV")
    print(" 6. Preprocessing   : StandardScaler, MinMaxScaler, OneHotEncoder, SimpleImputer")

    print("\n💡 Core Design Principle: Consistent, Uniform API across all algorithms!")
    print("   • Estimator.fit(X, y)        -> Train model on data")
    print("   • Estimator.predict(X_test)  -> Predict target labels")
    print("   • Estimator.score(X, y)      -> Compute accuracy / R² evaluation")

if __name__ == "__main__":
    main()
