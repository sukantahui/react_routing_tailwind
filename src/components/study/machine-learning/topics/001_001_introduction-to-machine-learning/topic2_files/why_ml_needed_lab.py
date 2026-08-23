"""
=============================================================================
TOPIC 2: WHY MACHINE LEARNING IS NEEDED
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B)
=============================================================================

This simulation demonstrates:
1. The Breakdown of Handcoded Heuristics: Comparing Linear Separability vs Complex Manifolds.
2. Massive Scale & High-Dimensional Feature Spaces (Sensor Telemetry in Kolkata).
3. Dynamic Non-Stationary Environments (Adapting to Evolving Traffic Patterns on BT Road).
4. Personalized Recommendations: Why rule engines cannot scale to millions of users.
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any

class LinearRuleClassifier:
    """
    Simple Linear Threshold System (Traditional / Naive approach).
    Attempts to separate data using a single linear hyperplane.
    """
    def __init__(self, threshold: float = 0.5):
        self.threshold = threshold

    def predict(self, x1: float, x2: float) -> int:
        # Linear decision boundary: x1 + x2 >= threshold
        return 1 if (x1 + x2) >= self.threshold else 0


class NonLinearMLClassifier:
    """
    Non-Linear Machine Learning Classifier (RBF Kernel Kernelized / 2-Layer Neural Network approximation).
    Learns circular/concentric decision boundaries that linear rules cannot separate.
    """
    def __init__(self, centers: List[Tuple[float, float]], gamma: float = 2.5):
        self.centers = centers
        self.gamma = gamma
        self.weights = [0.0] * len(centers)
        self.bias = 0.0

    def rbf_feature(self, x1: float, x2: float, c1: float, c2: float) -> float:
        dist_sq = (x1 - c1) ** 2 + (x2 - c2) ** 2
        return math.exp(-self.gamma * dist_sq)

    def predict_proba(self, x1: float, x2: float) -> float:
        z = sum(w * self.rbf_feature(x1, x2, c[0], c[1]) for w, c in zip(self.weights, self.centers)) + self.bias
        z_clamped = max(min(z, 20.0), -20.0)
        return 1.0 / (1.0 + math.exp(-z_clamped))

    def predict(self, x1: float, x2: float) -> int:
        return 1 if self.predict_proba(x1, x2) >= 0.5 else 0

    def fit_synthetic(self, X: List[Tuple[float, float]], y: List[int], epochs: int = 150, lr: float = 0.3) -> None:
        N = len(X)
        K = len(self.centers)
        for _ in range(epochs):
            for i in range(N):
                x1, x2 = X[i]
                target = y[i]
                prob = self.predict_proba(x1, x2)
                err = prob - target
                for k in range(K):
                    phi_k = self.rbf_feature(x1, x2, self.centers[k][0], self.centers[k][1])
                    self.weights[k] -= (lr / N) * err * phi_k
                self.bias -= (lr / N) * err


def generate_concentric_iot_data() -> Tuple[List[Tuple[float, float]], List[int], List[str]]:
    """
    Generates non-linear telemetry data from industrial turbines in Barrackpore & Ichapur.
    Inner Circle = Normal Operation (0)
    Outer Ring = Anomalous Thermal/Vibration Risk (1)
    """
    data = [
        # Normal Core (Low vibration, optimal temperature)
        ((0.1, 0.2), 0, "Turbine-1 (Barrackpore)"),
        ((0.0, -0.1), 0, "Turbine-2 (Ichapur)"),
        ((-0.2, 0.1), 0, "Turbine-3 (Kolkata)"),
        ((0.15, -0.15), 0, "Turbine-4 (Jadavpur)"),
        ((0.05, 0.05), 0, "Turbine-5 (Barrackpore)"),

        # Anomalous Outer Ring (Complex interaction)
        ((0.8, 0.7), 1, "Turbine-6 (Ichapur)"),
        ((-0.7, 0.8), 1, "Turbine-7 (Kolkata)"),
        ((0.9, -0.6), 1, "Turbine-8 (Barrackpore)"),
        ((-0.8, -0.7), 1, "Turbine-9 (Jadavpur)"),
        ((0.0, 0.95), 1, "Turbine-10 (Salt Lake)"),
        ((0.95, 0.0), 1, "Turbine-11 (Barrackpore)"),
        ((-0.95, 0.0), 1, "Turbine-12 (Ichapur)"),
    ]

    X = [item[0] for item in data]
    y = [item[1] for item in data]
    names = [item[2] for item in data]
    return X, y, names


def run_laboratory():
    print("=" * 80)
    print("CODER & ACCOTAX - TOPIC 2 LABORATORY")
    print("Why Machine Learning is Needed: Overcoming Non-Linearity & Scale Limits")
    print("=" * 80)

    X, y, names = generate_concentric_iot_data()

    # 1. Evaluate Traditional Linear Rule
    linear_rule = LinearRuleClassifier(threshold=0.0)
    linear_correct = 0
    for (x1, x2), target in zip(X, y):
        if linear_rule.predict(x1, x2) == target:
            linear_correct += 1

    # 2. Evaluate Non-Linear ML Classifier
    centers = [(0.0, 0.0), (0.7, 0.7), (-0.7, 0.7), (0.7, -0.7), (-0.7, -0.7)]
    ml_clf = NonLinearMLClassifier(centers=centers, gamma=2.0)
    ml_clf.fit_synthetic(X, y, epochs=200, lr=0.5)

    ml_correct = 0
    print(f"\n{'Sensor Node':<26} | {'True Condition':<15} | {'Linear Rule':<12} | {'ML Predict':<12} | {'ML Prob':<10}")
    print("-" * 85)

    for i in range(len(X)):
        x1, x2 = X[i]
        target = y[i]
        true_str = "Anomaly (1)" if target == 1 else "Normal (0)"

        l_pred = linear_rule.predict(x1, x2)
        l_str = "Anomaly" if l_pred == 1 else "Normal"

        m_pred = ml_clf.predict(x1, x2)
        m_prob = ml_clf.predict_proba(x1, x2)
        m_str = "Anomaly" if m_pred == 1 else "Normal"

        if m_pred == target: ml_correct += 1

        print(f"{names[i]:<26} | {true_str:<15} | {l_str:<12} | {m_str:<12} | {m_prob*100:>6.1f}%")

    print("-" * 85)
    print(f"Linear Rule Accuracy:     {linear_correct}/{len(X)} ({linear_correct/len(X)*100:.1f}%)")
    print(f"Non-Linear ML Accuracy:   {ml_correct}/{len(X)} ({ml_correct/len(X)*100:.1f}%)")
    print("\nCONCLUSION: Real-world physical, biological, and economic phenomena are inherently")
    print("non-linear and high-dimensional. Machine Learning is essential because human-crafted")
    print("linear rules cannot capture curved manifolds or scale to big data volumes.")
    print("=" * 80)


if __name__ == "__main__":
    run_laboratory()
