"""
=============================================================================
TOPIC 0: MEANING AND SCOPE OF MACHINE LEARNING
Academic Practical Laboratory & Step-by-Step Educational Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B)
=============================================================================

Demonstrating the Core Machine Learning Principle Piece by Piece:
1. Feature Matrix (X) and Observed Target Outcomes (y)
2. Vector Dot Product Hypothesis: h(x) = w^T x + b
3. Loss Evaluation: Comparing Predictions h(x) vs Actual y
4. Gradient Descent Optimization: Automated Parameter Learning (w, b)
5. Inference on Brand New Unseen Inputs (Kolkata Real Estate & Email Spam)
=============================================================================
"""

import math
from typing import List, Tuple, Dict, Any

# =============================================================================
# PART 1: HOUSE PRICE PREDICTION ENGINE (LINEAR REGRESSION VIA GRADIENT DESCENT)
# =============================================================================

class HousePricePredictor:
    """
    Learns to predict house prices in ₹ Lakhs from historical input vectors X:
    Features: [Size (sq ft), Bedrooms, Age (years)] -> Target: Price (₹ Lakhs)
    """
    def __init__(self, learning_rate: float = 0.0000005, epochs: int = 5000):
        self.lr = learning_rate
        self.epochs = epochs
        # Initial terrible weights and bias
        self.w = [0.0, 0.0, 0.0]  # [w1_size, w2_beds, w3_age]
        self.b = 0.0
        self.loss_history: List[float] = []

    def hypothesis(self, x: List[float]) -> float:
        """
        Computes the hypothesis: h(x) = w^T x + b
        = (w1 * size) + (w2 * bedrooms) + (w3 * age) + bias
        """
        dot_product = sum(weight * feature for weight, feature in zip(self.w, x))
        return dot_product + self.b

    def compute_mse_loss(self, X: List[List[float]], y: List[float]) -> float:
        """
        Mean Squared Error Loss:
        L = (1 / N) * sum_{i=1}^N (h(x_i) - y_i)^2
        """
        N = len(X)
        total_squared_error = 0.0
        for x_vec, target in zip(X, y):
            pred = self.hypothesis(x_vec)
            error = pred - target
            total_squared_error += error ** 2
        return total_squared_error / N

    def train(self, X: List[List[float]], y: List[float]) -> List[Dict[str, Any]]:
        """
        Iterative Gradient Descent Loop:
        1. Make predictions h(x)
        2. Calculate error (h(x) - y)
        3. Compute gradients dL/dw and dL/db
        4. Update parameters: w := w - lr * grad_w, b := b - lr * grad_b
        """
        N = len(X)
        history = []

        for epoch in range(1, self.epochs + 1):
            grad_w = [0.0, 0.0, 0.0]
            grad_b = 0.0

            for x_vec, target in zip(X, y):
                pred = self.hypothesis(x_vec)
                error = pred - target  # Residual error (h(x) - y)

                for j in range(len(self.w)):
                    grad_w[j] += error * x_vec[j]
                grad_b += error

            # Average gradients across N samples
            grad_w = [g / N for g in grad_w]
            grad_b = grad_b / N

            # Parameter update step
            for j in range(len(self.w)):
                self.w[j] -= self.lr * grad_w[j]
            self.b -= (self.lr * 1000.0) * grad_b  # Scaled bias rate for convergence

            if epoch in [1, 10, 100, 500, 1000, 2500, 5000]:
                loss = self.compute_mse_loss(X, y)
                self.loss_history.append(loss)
                history.append({
                    "epoch": epoch,
                    "loss": round(loss, 2),
                    "w_size": round(self.w[0], 5),
                    "w_beds": round(self.w[1], 3),
                    "w_age": round(self.w[2], 3),
                    "bias": round(self.b, 2)
                })

        return history


# =============================================================================
# PART 2: EMAIL SPAM CLASSIFICATION ENGINE (LOGISTIC REGRESSION)
# =============================================================================

class EmailSpamClassifier:
    """
    Demonstrates binary classification:
    Features: [Exclamation Marks, Dollar Signs, Embedded Links] -> Target: Spam (1) or Ham (0)
    """
    def __init__(self):
        # Learned optimal weights and bias for email spam detection
        self.w = [0.65, 0.85, 0.40]  # [exclamations, dollar_signs, links]
        self.b = -4.50

    @staticmethod
    def sigmoid(z: float) -> float:
        """Squashes linear score z into probability interval [0.0, 1.0]"""
        z_clamped = max(min(z, 20.0), -20.0)
        return 1.0 / (1.0 + math.exp(-z_clamped))

    def predict_probability(self, x: List[float]) -> float:
        """h(x) = sigma(w^T x + b)"""
        z = sum(weight * feature for weight, feature in zip(self.w, x)) + self.b
        return self.sigmoid(z)

    def classify(self, x: List[float], threshold: float = 0.50) -> Tuple[int, float, str]:
        prob = self.predict_probability(x)
        is_spam = prob >= threshold
        label = "SPAM [ALERT]" if is_spam else "LEGITIMATE (HAM) [CLEAN]"
        return (1 if is_spam else 0), round(prob * 100, 2), label


# =============================================================================
# MAIN LABORATORY EXECUTION & PEDAGOGICAL WALKTHROUGH
# =============================================================================

def run_topic0_lab():
    print("=" * 85)
    print("CODER & ACCOTAX - MACHINE LEARNING LAB (TOPIC 0)")
    print("DECONSTRUCTING THE CORE MACHINE LEARNING PRINCIPLE PIECE BY PIECE")
    print("Author: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 85)

    # -------------------------------------------------------------------------
    # PIECE 1 & 2: HISTORICAL INPUTS X AND OBSERVED OUTCOMES y
    # -------------------------------------------------------------------------
    print("\n" + "-" * 85)
    print("PIECE 1 & 2: WHAT ARE X AND y? (HISTORICAL DATASET)")
    print("-" * 85)
    
    # Historical House Data: [Size (sq ft), Bedrooms, Age (years)]
    X_houses = [
        [1000.0, 2.0, 10.0],
        [1500.0, 3.0, 5.0],
        [2000.0, 4.0, 3.0],
        [2500.0, 4.0, 2.0]
    ]
    # Observed actual prices in Rs. Lakhs
    y_prices = [40.0, 60.0, 85.0, 110.0]

    print("Historical Training Dataset (Past Examples):")
    print(f"{'Sample #':<10} | {'Input Vector x = [Size, Beds, Age]':<38} | {'Actual Price y'}")
    print("-" * 85)
    for idx, (x_vec, price) in enumerate(zip(X_houses, y_prices), 1):
        print(f"Row {idx:<6} | x = [{x_vec[0]:>4.0f} sq ft, {x_vec[1]:>1.0f} beds, {x_vec[2]:>2.0f} yrs] {'':<12} | Rs. {price:>5.1f} Lakhs")

    # -------------------------------------------------------------------------
    # PIECE 3, 4 & 5: HYPOTHESIS FUNCTION & GRADIENT OPTIMIZATION
    # -------------------------------------------------------------------------
    print("\n" + "-" * 85)
    print("PIECE 3, 4 & 5: HYPOTHESIS h(x) = w^T x + b & GRADIENT DESCENT LEARNING")
    print("-" * 85)

    model = HousePricePredictor(learning_rate=0.0000004, epochs=5000)

    # Step A: Initial Terrible State
    initial_loss = model.compute_mse_loss(X_houses, y_prices)
    print(f"[*] Initial Untrained State (Epoch 0):")
    print(f"    Initial Weights: w = {model.w}, Bias: b = {model.b}")
    print(f"    Initial Mean Squared Error Loss: {initial_loss:.2f} (Terrible predictions!)")

    print("\n[*] Running Gradient Descent: Adjusting parameters iteratively...")
    training_history = model.train(X_houses, y_prices)

    print("\n[*] Optimization Convergence Trajectory:")
    print(f"{'Epoch':<8} | {'MSE Loss':<12} | {'w1 (Size)':<12} | {'w2 (Beds)':<12} | {'w3 (Age)':<12} | {'Bias (b)'}")
    print("-" * 85)
    for record in training_history:
        print(f"{record['epoch']:<8} | {record['loss']:<12} | {record['w_size']:<12} | {record['w_beds']:<12} | {record['w_age']:<12} | {record['bias']}")

    # -------------------------------------------------------------------------
    # PIECE 6 & 7: EVALUATION & INFERENCE ON BRAND NEW UNSEEN HOUSES
    # -------------------------------------------------------------------------
    print("\n" + "-" * 85)
    print("PIECE 6: INFERENCE ON TRAINING SAMPLES (EVALUATING LEARNED MODEL)")
    print("-" * 85)

    for idx, (x_vec, actual_p) in enumerate(zip(X_houses, y_prices), 1):
        pred_p = model.hypothesis(x_vec)
        diff = pred_p - actual_p
        print(f"House {idx}: Features={x_vec} -> Predicted: Rs. {pred_p:.2f}L | Actual: Rs. {actual_p:.1f}L | Error: {diff:+.2f}L")

    print("\n" + "-" * 85)
    print("PREDICTING ON BRAND NEW UNSEEN HOMES (KOLKATA & SALT LAKE):")
    print("-" * 85)
    
    new_unseen_homes = [
        {"desc": "Modern Flat in Salt Lake Sector V",  "features": [1800.0, 3.0, 4.0]},
        {"desc": "Spacious Villa in New Town Action Area", "features": [2800.0, 5.0, 1.0]},
        {"desc": "Vintage Apartment in North Kolkata",  "features": [1200.0, 2.0, 18.0]}
    ]

    for home in new_unseen_homes:
        x_new = home["features"]
        pred_price = model.hypothesis(x_new)
        print(f"-> {home['desc']:<38} | Features: {x_new}")
        print(f"   Calculated Hypothesis: h(x) = Rs. {pred_price:.2f} Lakhs\n")

    # -------------------------------------------------------------------------
    # PIECE 7: EMAIL SPAM CLASSIFIER DEMO
    # -------------------------------------------------------------------------
    print("-" * 85)
    print("PIECE 7: BINARY EMAIL SPAM CLASSIFICATION DEMO")
    print("-" * 85)
    
    spam_engine = EmailSpamClassifier()
    test_emails = [
        {"subject": "Urgent! Claim Cash Prize Now!!!", "features": [6.0, 12.0, 3.0]},
        {"subject": "Semester Exam Schedule from Barrackpore Lab", "features": [0.0, 0.0, 1.0]},
        {"subject": "Special 50% Discount on Retail Shopping",   "features": [3.0, 4.0, 2.0]}
    ]

    for email in test_emails:
        x_email = email["features"]
        pred_class, prob_pct, verdict = spam_engine.classify(x_email)
        print(f"Subject: \"{email['subject']}\"")
        print(f"Features: [Exclamations={x_email[0]}, DollarSigns={x_email[1]}, Links={x_email[2]}]")
        print(f"Prediction: {verdict} (Spam Probability: {prob_pct}%)\n")

    # -------------------------------------------------------------------------
    # PIECE 8: THE GRAND TAKEAWAY
    # -------------------------------------------------------------------------
    print("=" * 85)
    print("PIECE 8: THE GRAND TAKEAWAY (IN ONE SENTENCE)")
    print("Traditional Programming: Rules + Data -> Output")
    print("Machine Learning:        Data + Answers + Learning Algorithm -> Learned Model h(x) -> Output")
    print("=" * 85)

if __name__ == "__main__":
    run_topic0_lab()
