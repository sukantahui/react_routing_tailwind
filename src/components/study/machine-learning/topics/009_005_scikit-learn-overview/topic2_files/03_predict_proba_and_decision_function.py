"""
03_predict_proba_and_decision_function.py
Title: Probability Confidence (.predict_proba) vs Hard Predictions (.predict)
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

from sklearn.linear_model import LogisticRegression
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 03: Soft Probabilities vs Hard Class Labels")
    print("   Instructor: Sukanta Hui | Students: Mahima, Debangshu, Susmita")
    print("=" * 65)

    # Synthetic binary classification data: Exam Pass (1) vs Fail (0)
    X = np.array([[3], [5], [7], [9], [11], [14]]) # Study hours
    y = np.array([0, 0, 0, 1, 1, 1])

    clf = LogisticRegression()
    clf.fit(X, y)

    X_new = np.array([[6], [8], [12]])

    # 1. Hard class predictions: y in {0, 1}
    hard_preds = clf.predict(X_new)

    # 2. Soft probability estimates: P(y=0), P(y=1)
    soft_probs = clf.predict_proba(X_new)

    print("\nInference Comparison on Unseen Hours:")
    for hours, label, (p0, p1) in zip(X_new.flatten(), hard_preds, soft_probs):
        status = "PASSED ✓" if label == 1 else "FAILED ✗"
        print(f" • {hours} hrs -> Hard Label: {status} | Probabilities: [Fail: {p0:.1%}, Pass: {p1:.1%}]")

if __name__ == "__main__":
    main()
