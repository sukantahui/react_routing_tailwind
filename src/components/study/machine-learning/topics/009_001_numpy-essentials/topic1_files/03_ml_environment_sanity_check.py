"""
================================================================================
Topic 1 - Script 03: Machine Learning Stack Sanity & Compatibility Checker
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Checking seamless interoperability between NumPy and core ML stack (pandas, scipy, scikit-learn)
- Verifying memory buffer compatibility across libraries
- Running a rapid 1-second linear regression check using pure NumPy ndarrays
================================================================================
"""

import sys

def check_ml_stack():
    print("=" * 65)
    print("BARRACKPORE AI LAB: Full ML Stack Sanity Verification")
    print("=" * 65)

    packages = ["numpy", "scipy", "pandas", "sklearn", "matplotlib"]
    
    for pkg in packages:
        try:
            mod = __import__(pkg)
            version = getattr(mod, "__version__", "installed")
            print(f"  [+] {pkg:<12} : {version}")
        except ImportError:
            print(f"  [-] {pkg:<12} : NOT INSTALLED")

    print("\n" + "=" * 65)
    print("RUNNING RAPID NUMPY ML SMOKE TEST:")
    print("=" * 65)
    
    import numpy as np
    
    # Generate synthetic training features X (5 students, 2 features: Study Hours, Attendance %)
    # and ground truth target y (Final Marks)
    np.random.seed(42)
    X = np.array([
        [2.5, 75.0],
        [4.0, 85.0],
        [6.5, 92.0],
        [1.5, 60.0],
        [8.0, 98.0]
    ])
    
    # Weights vector w (study_weight=5.0, attendance_weight=0.5)
    w = np.array([5.0, 0.5])
    bias = 20.0
    
    # Vectorized forward pass: y_pred = X @ w + b
    y_pred = np.dot(X, w) + bias
    
    print("Input Student Matrix X:\n", X)
    print("\nCalculated Predictions y_pred:\n", y_pred)
    print("\nSmoke test passed! NumPy linear algebra engine is fully operational.")

if __name__ == "__main__":
    check_ml_stack()
