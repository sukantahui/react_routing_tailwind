"""
=============================================================================
TOPIC 14: WORKED EXAMPLE 1: STUDENT PASS/FAIL PREDICTION
Module: Introduction to Machine Learning (BCAC701B)
Academic Practical Laboratory & Mathematical Optimization Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
=============================================================================

Mathematical Objective:
    min_w J(w, b) = (1/N) * sum_{i=1}^N L(h(x_i; w, b), y_i) + lambda * Omega(w)

Where:
    - x_i = [Attendance_Rate, Weekly_Study_Hours, Quiz_Score]
    - h(x_i; w, b) = sigma(w^T x_i + b) = 1 / (1 + exp(-(w1*x1 + w2*x2 + w3*x3 + b)))
    - L(y_hat, y) = - [ y * ln(y_hat) + (1 - y) * ln(1 - y_hat) ]  (Binary Cross-Entropy)
    - Omega(w) = sum_{j=1}^d w_j^2  (L2 Ridge Regularization)
    - lambda >= 0  (Regularization Strength Hyperparameter)
=============================================================================
"""

import math
from typing import List, Tuple, Dict, Any

class StudentPassFailOptimizer:
    """
    Implements full Empirical Risk Minimization with L2 Regularization
    for binary student outcome prediction (Pass=1, Fail=0).
    """
    def __init__(self, learning_rate: float = 0.1, reg_lambda: float = 0.01, epochs: int = 200):
        self.lr = learning_rate
        self.reg_lambda = reg_lambda
        self.epochs = epochs
        # Initial weights for 3 features: [Attendance, Study_Hours, Quiz_Score] and bias
        self.weights = [0.5, 0.5, 0.5]
        self.bias = 0.0
        self.history: List[Dict[str, float]] = []

    @staticmethod
    def sigmoid(z: float) -> float:
        """Numerically stable sigmoid function."""
        z_clamped = max(min(z, 25.0), -25.0)
        return 1.0 / (1.0 + math.exp(-z_clamped))

    def predict_probability(self, x: List[float]) -> float:
        """h(x_i; w, b) = sigma(w^T x_i + b)"""
        z = sum(w * val for w, val in zip(self.weights, x)) + self.bias
        return self.sigmoid(z)

    def compute_bce_loss(self, y_hat: float, y: int) -> float:
        """L(h(x_i; w), y_i) = - [y * ln(y_hat) + (1 - y) * ln(1 - y_hat)]"""
        eps = 1e-15  # Prevent log(0)
        y_hat_safe = max(min(y_hat, 1.0 - eps), eps)
        return - (y * math.log(y_hat_safe) + (1 - y) * math.log(1.0 - y_hat_safe))

    def compute_regularization_penalty(self) -> float:
        """Omega(w) = sum(w_j^2)"""
        return sum(w ** 2 for w in self.weights)

    def compute_total_objective(self, dataset: List[Dict[str, Any]]) -> Tuple[float, float, float]:
        """
        Calculates J(w, b) = (1/N) * sum(L_i) + lambda * Omega(w)
        Returns: (total_objective, mean_bce_loss, reg_penalty)
        """
        N = len(dataset)
        total_loss = 0.0
        for row in dataset:
            y_hat = self.predict_probability(row["features"])
            total_loss += self.compute_bce_loss(y_hat, row["label"])

        mean_loss = total_loss / N
        reg_penalty = self.compute_regularization_penalty()
        total_objective = mean_loss + (self.reg_lambda * reg_penalty)
        return total_objective, mean_loss, reg_penalty

    def train(self, dataset: List[Dict[str, Any]]) -> List[Dict[str, float]]:
        """
        Gradient Descent Optimization loop minimizing J(w, b):
        w_j := w_j - alpha * [ (1/N) * sum((y_hat_i - y_i) * x_ij) + 2 * lambda * w_j ]
        b   := b   - alpha * [ (1/N) * sum(y_hat_i - y_i) ]
        """
        N = len(dataset)
        self.history = []

        for epoch in range(1, self.epochs + 1):
            grad_w = [0.0, 0.0, 0.0]
            grad_b = 0.0

            # 1. Accumulate empirical loss gradients
            for row in dataset:
                x = row["features"]
                y = row["label"]
                y_hat = self.predict_probability(x)
                error = y_hat - y  # Residual error (y_hat - y)

                for j in range(len(self.weights)):
                    grad_w[j] += error * x[j]
                grad_b += error

            # 2. Average over N and add L2 regularization derivative: 2 * lambda * w_j
            for j in range(len(self.weights)):
                grad_w[j] = (grad_w[j] / N) + (2.0 * self.reg_lambda * self.weights[j])
            grad_b = grad_b / N

            # 3. Parameter Update Step
            for j in range(len(self.weights)):
                self.weights[j] -= self.lr * grad_w[j]
            self.bias -= self.lr * grad_b

            # 4. Record Metrics
            if epoch % 25 == 0 or epoch == 1 or epoch == self.epochs:
                total_obj, mean_loss, reg_pen = self.compute_total_objective(dataset)
                self.history.append({
                    "epoch": epoch,
                    "total_objective": round(total_obj, 4),
                    "mean_bce_loss": round(mean_loss, 4),
                    "reg_penalty": round(reg_pen, 4),
                    "w1_attendance": round(self.weights[0], 3),
                    "w2_study_hours": round(self.weights[1], 3),
                    "w3_quiz_score": round(self.weights[2], 3),
                    "bias": round(self.bias, 3)
                })

        return self.history


def run_student_worked_example():
    print("=" * 85)
    print("CODER & ACCOTAX - MACHINE LEARNING LAB (TOPIC 14)")
    print("WORKED EXAMPLE 1: STUDENT PASS/FAIL PREDICTION WITH REGULARIZED OPTIMIZATION")
    print("Formula: min_w J(w,b) = (1/N) sum L(h(x_i; w), y_i) + lambda * Omega(w)")
    print("=" * 85)

    # Normalized Cohort Dataset: [Attendance (0-1), Study Hours (0-1 where 1=20h), Quiz Score (0-1)]
    student_cohort = [
        {"name": "Mamata (Barrackpore)", "features": [0.90, 0.85, 0.88], "label": 1},
        {"name": "Mahima (Kolkata)",     "features": [0.95, 0.90, 0.92], "label": 1},
        {"name": "Abhronila (Jadavpur)", "features": [0.82, 0.70, 0.78], "label": 1},
        {"name": "Susmita (Ichapur)",    "features": [0.72, 0.60, 0.65], "label": 1},
        {"name": "Debangshu (Salt Lake)","features": [0.45, 0.25, 0.35], "label": 0},
        {"name": "Rohan (Shyamnagar)",   "features": [0.38, 0.30, 0.40], "label": 0},
        {"name": "Priyanka (Titagarh)",  "features": [0.85, 0.45, 0.68], "label": 1},
        {"name": "Sourav (Kankinara)",   "features": [0.50, 0.20, 0.30], "label": 0}
    ]

    print(f"\n[1] Training Cohort Size: N = {len(student_cohort)} students")
    print("    Features: x = [Attendance Rate, Study Hours / 20, Mock Quiz Score]")
    print("    Target:   y in {1: Pass, 0: Fail}")
    print("    Regularization Strength: lambda = 0.02 (L2 Ridge)\n")

    optimizer = StudentPassFailOptimizer(learning_rate=0.4, reg_lambda=0.02, epochs=200)
    
    # Initial state before training
    init_obj, init_loss, init_reg = optimizer.compute_total_objective(student_cohort)
    print(f"[*] Initial State (Epoch 0):")
    print(f"    Weights = {optimizer.weights}, Bias = {optimizer.bias:.2f}")
    print(f"    Mean BCE Loss = {init_loss:.4f} | Reg Penalty = {init_reg:.4f} | Total Objective J = {init_obj:.4f}\n")

    print("[*] Executing Gradient Descent Optimization...")
    history = optimizer.train(student_cohort)

    print("\n[2] Optimization Convergence Trajectory:")
    print(f"{'Epoch':<8} | {'Mean BCE Loss':<14} | {'Reg Penalty':<12} | {'Total Obj J(w)':<15} | {'Weights [w1, w2, w3]':<22} | {'Bias'}")
    print("-" * 85)
    for h in history:
        w_str = f"[{h['w1_attendance']}, {h['w2_study_hours']}, {h['w3_quiz_score']}]"
        print(f"{h['epoch']:<8} | {h['mean_bce_loss']:<14} | {h['reg_penalty']:<12} | {h['total_objective']:<15} | {w_str:<22} | {h['bias']}")

    print("\n[3] Final Model Evaluation on Student Cohort:")
    print(f"{'Student Name':<25} | {'Logit z':<8} | {'Prob P(Pass)':<12} | {'Pred':<6} | {'Actual':<7} | {'BCE Loss':<9} | {'Verdict'}")
    print("-" * 85)

    correct_count = 0
    for student in student_cohort:
        x = student["features"]
        y = student["label"]
        z = sum(w * val for w, val in zip(optimizer.weights, x)) + optimizer.bias
        prob = optimizer.predict_probability(x)
        pred = 1 if prob >= 0.50 else 0
        loss = optimizer.compute_bce_loss(prob, y)
        is_correct = pred == y
        if is_correct:
            correct_count += 1
        verdict = "CORRECT ✔" if is_correct else "MISCLASSIFIED ❌"

        print(f"{student['name']:<25} | {z:>7.3f} | {prob*100:>10.2f}% | {pred:<6} | {y:<7} | {loss:>8.4f} | {verdict}")

    accuracy = (correct_count / len(student_cohort)) * 100
    print("-" * 85)
    print(f"Final Model Classification Accuracy: {accuracy:.1f}% ({correct_count}/{len(student_cohort)} correct)")
    print(f"Learned Decision Boundary: {optimizer.weights[0]:.2f}*Attendance + {optimizer.weights[1]:.2f}*StudyHours + {optimizer.weights[2]:.2f}*QuizScore + ({optimizer.bias:.2f}) = 0")
    print("=" * 85)

if __name__ == "__main__":
    run_student_worked_example()
