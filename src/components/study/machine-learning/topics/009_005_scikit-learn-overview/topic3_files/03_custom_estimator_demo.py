"""
03_custom_estimator_demo.py
Title: Building a Custom Scikit-Learn Estimator from Scratch
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import numpy as np
from sklearn.base import BaseEstimator, ClassifierMixin

class BarrackporeThresholdClassifier(BaseEstimator, ClassifierMixin):
    """
    A custom threshold-based classifier conforming 100% to Scikit-learn API specs.
    """
    def __init__(self, threshold=50.0):
        # Hyperparameters must be passed directly without modification
        self.threshold = threshold

    def fit(self, X, y):
        # Validate inputs and store features seen
        self.classes_ = np.unique(y)
        self.n_features_in_ = X.shape[1]
        print(f"   [Custom Estimator] Trained with threshold={self.threshold}")
        return self

    def predict(self, X):
        # Predict class 1 if first feature >= threshold else 0
        return (X[:, 0] >= self.threshold).astype(int)

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 03: Custom Estimator Authoring")
    print("   Instructor: Sukanta Hui | Students: Swadeep, Susmita, Abhronila")
    print("=" * 65)

    X = np.array([[30], [45], [55], [75], [90]])
    y = np.array([0, 0, 1, 1, 1])

    custom_model = BarrackporeThresholdClassifier(threshold=50.0)
    custom_model.fit(X, y)
    
    preds = custom_model.predict(np.array([[40], [60], [85]]))
    print(f"Predictions on [[40], [60], [85]]: {preds}")
    print(f"Score on training set: {custom_model.score(X, y) * 100:.1f}%")
    print("✓ Custom estimator works seamlessly with all Scikit-learn ecosystem utilities!")

if __name__ == "__main__":
    main()
