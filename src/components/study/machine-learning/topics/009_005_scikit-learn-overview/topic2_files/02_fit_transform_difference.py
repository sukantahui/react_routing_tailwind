"""
02_fit_transform_difference.py
Title: Crucial Distinction: Estimators (.fit -> .predict) vs Transformers (.fit -> .transform)
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import numpy as np
from sklearn.preprocessing import StandardScaler

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 02: fit() vs transform() vs fit_transform()")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Abhronila")
    print("=" * 65)

    X_train = np.array([[10, 200], [20, 400], [30, 600], [40, 800]])
    X_test = np.array([[15, 300], [25, 500]])

    scaler = StandardScaler()

    # 1. On Training data: fit_transform() learns μ, σ AND scales
    X_train_scaled = scaler.fit_transform(X_train)
    print("✓ Training Data Scaled with scaler.fit_transform(X_train):")
    print(f"  Learned Mean (mean_) : {scaler.mean_}")
    print(f"  Learned Std (scale_) : {scaler.scale_}")

    # 2. On Test data: ONLY transform() using TRAINING μ and σ (Prevent Data Leakage!)
    X_test_scaled = scaler.transform(X_test)
    print("\n✓ Test Data Scaled with scaler.transform(X_test) [NO RE-FITTING!]:")
    print(X_test_scaled.round(2))

    print("\n🚨 Golden Rule: NEVER call fit() or fit_transform() on your test dataset!")

if __name__ == "__main__":
    main()
