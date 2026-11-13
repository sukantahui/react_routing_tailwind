"""
=============================================================================
TOPIC 7: CLASSIFICATION AND REGRESSION OVERVIEW
Module: Introduction to Machine Learning (Slug: 001_001_introduction-to-machine-learning)
Academic Practical Laboratory & Interactive Simulation Engine
Author: Sukanta Hui | Senior Academic Mentor | Coder & AccoTax
Location: Barrackpore, West Bengal, India
Course Code: BCAC701B / MCA / B.Tech Computer Science
=============================================================================

This laboratory engine demonstrates:
1. Fundamental Target Distinction: Continuous Target Space y in R vs Discrete Class Labels y in {0, 1}.
2. Task A (Binary Classification): Loan Default Risk Modeling in Kolkata Banking Sector.
   - Computing Decision Thresholds (theta = 0.30, 0.50, 0.70).
   - Generating Full Confusion Matrix: TP, FP, TN, FN.
   - Calculating Precision, Recall (Sensitivity), Specificity, and F1-Score.
3. Task B (Continuous Regression): Apartment Property Valuation in Salt Lake & Rajarhat.
   - Fitting Ordinary Least Squares (OLS) Linear Regression.
   - Computing MSE, RMSE, MAE, and R^2 Coefficient of Determination.
   - Outlier Stress-Test: Demonstrating why RMSE spikes on outlier mansions while MAE remains stable.
4. Comprehensive Scorecard Comparison: Knowing when to pick which scorecard in production.
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any

# =============================================================================
# PART 1: BINARY CLASSIFICATION PIPELINE (LOAN DEFAULT PREDICTION)
# =============================================================================

class ClassificationPipeline:
    """
    Simulates a binary classification engine for bank loan default risk.
    Features:
      x1: Annual Income (in Lakhs INR, normalized)
      x2: Credit CIBIL Score (normalized 0 to 1)
      x3: Existing Debt-to-Income Ratio (0 to 1)
    Target:
      y: 1 = Defaulted, 0 = Fully Paid
    """
    def __init__(self):
        # Learned weights from empirical credit default risk models
        self.weights = [-0.65, -1.20, 1.45]
        self.bias = 0.35

    def generate_synthetic_cohort(self, n: int = 50, seed: int = 42) -> List[Dict[str, Any]]:
        random.seed(seed)
        cohort = []
        for i in range(n):
            income = round(random.uniform(3.0, 30.0), 2)  # Lakhs
            cibil = random.randint(550, 850)
            dti = round(random.uniform(0.10, 0.65), 2)
            
            # Normalize features for sigmoid evaluation
            x1 = (income - 3.0) / 27.0
            x2 = (cibil - 550) / 300.0
            x3 = dti
            
            # True ground truth generation with slight stochastic noise
            z = (self.weights[0] * x1) + (self.weights[1] * x2) + (self.weights[2] * x3) + self.bias
            true_prob = 1.0 / (1.0 + math.exp(-z))
            actual = 1 if true_prob >= 0.45 else 0
            
            cohort.append({
                "id": f"APP-{i+1:03d}",
                "income_lakhs": income,
                "cibil": cibil,
                "dti": dti,
                "x1": x1,
                "x2": x2,
                "x3": x3,
                "actual": actual
            })
        return cohort

    def predict_probability(self, x1: float, x2: float, x3: float) -> float:
        z = (self.weights[0] * x1) + (self.weights[1] * x2) + (self.weights[2] * x3) + self.bias
        return 1.0 / (1.0 + math.exp(-max(min(z, 20.0), -20.0)))

    def evaluate_threshold(self, cohort: List[Dict[str, Any]], threshold: float = 0.50) -> Dict[str, Any]:
        tp, fp, tn, fn = 0, 0, 0, 0
        for sample in cohort:
            prob = self.predict_probability(sample["x1"], sample["x2"], sample["x3"])
            pred = 1 if prob >= threshold else 0
            if pred == 1 and sample["actual"] == 1:
                tp += 1
            elif pred == 1 and sample["actual"] == 0:
                fp += 1
            elif pred == 0 and sample["actual"] == 0:
                tn += 1
            elif pred == 0 and sample["actual"] == 1:
                fn += 1
                
        total = len(cohort)
        accuracy = (tp + tn) / total
        precision = tp / max(1, tp + fp)
        recall = tp / max(1, tp + fn)
        specificity = tn / max(1, tn + fp)
        f1 = (2 * precision * recall) / max(1e-9, precision + recall)
        
        return {
            "threshold": threshold,
            "tp": tp, "fp": fp, "tn": tn, "fn": fn,
            "accuracy": round(accuracy * 100, 2),
            "precision": round(precision * 100, 2),
            "recall": round(recall * 100, 2),
            "specificity": round(specificity * 100, 2),
            "f1_score": round(f1 * 100, 2)
        }


# =============================================================================
# PART 2: CONTINUOUS REGRESSION PIPELINE (FLAT VALUATION IN KOLKATA)
# =============================================================================

class RegressionPipeline:
    """
    Simulates a continuous regression engine for real estate valuation.
    Feature:
      x: Carpet Area in square feet
    Target:
      y: Market Price in Lakhs INR (Continuous real number)
    """
    def __init__(self):
        # Base true relationship: Price = 0.045 * Area + 15.0 Lakhs
        self.slope = 0.045
        self.intercept = 15.0

    def generate_synthetic_housing(self, n: int = 50, seed: int = 42) -> List[Dict[str, Any]]:
        random.seed(seed)
        housing = []
        for i in range(n):
            area = random.randint(600, 2500)
            noise = random.gauss(0.0, 4.0)
            true_price = round((self.slope * area) + self.intercept + noise, 2)
            housing.append({
                "id": f"PROP-{i+1:03d}",
                "area_sqft": area,
                "actual_price": max(15.0, true_price)
            })
        return housing

    def fit_and_evaluate(self, housing: List[Dict[str, Any]]) -> Dict[str, Any]:
        n = len(housing)
        actuals = [h["actual_price"] for h in housing]
        areas = [h["area_sqft"] for h in housing]
        
        # Closed-form Ordinary Least Squares (OLS)
        mean_x = sum(areas) / n
        mean_y = sum(actuals) / n
        
        num = sum((areas[i] - mean_x) * (actuals[i] - mean_y) for i in range(n))
        den = sum((areas[i] - mean_x)**2 for i in range(n))
        w = num / max(1e-9, den)
        b = mean_y - (w * mean_x)
        
        predictions = [(w * a) + b for a in areas]
        
        # Calculate Regression Scorecards
        mae = sum(abs(actuals[i] - predictions[i]) for i in range(n)) / n
        mse = sum((actuals[i] - predictions[i])**2 for i in range(n)) / n
        rmse = math.sqrt(mse)
        
        ss_tot = sum((actuals[i] - mean_y)**2 for i in range(n))
        ss_res = sum((actuals[i] - predictions[i])**2 for i in range(n))
        r2 = 1.0 - (ss_res / max(1e-9, ss_tot))
        
        return {
            "w": round(w, 5),
            "b": round(b, 2),
            "mae": round(mae, 2),
            "mse": round(mse, 2),
            "rmse": round(rmse, 2),
            "r2_score": round(r2, 4),
            "sample_count": n
        }

    def inject_outliers_and_reevaluate(self, housing: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Injects 3 luxury heritage mansions priced 5x above market to demonstrate
        how RMSE explodes while MAE remains relatively stable.
        """
        corrupted = [dict(h) for h in housing]
        # Infiltrate 3 extreme outliers
        corrupted[0]["actual_price"] = 550.0  # Normal: ~60 Lakhs
        corrupted[1]["actual_price"] = 620.0  # Normal: ~80 Lakhs
        corrupted[2]["actual_price"] = 490.0  # Normal: ~50 Lakhs
        
        return self.fit_and_evaluate(corrupted)


# =============================================================================
# PART 3: MASTER EXPERIMENT RUNNER & CONSOLE DEMONSTRATION
# =============================================================================

def run_laboratory_experiment():
    print("=" * 85)
    print("CODER & ACCOTAX - MACHINE LEARNING ADVANCED RESEARCH LABORATORY")
    print("TOPIC 7: CLASSIFICATION AND REGRESSION OVERVIEW")
    print("Mentor: Sukanta Hui | Barrackpore, West Bengal, India | Course: BCAC701B")
    print("=" * 85)

    # -------------------------------------------------------------------------
    # 1. TASK A: BINARY CLASSIFICATION
    # -------------------------------------------------------------------------
    print("\n[PHASE 1: BINARY CLASSIFICATION — BANK LOAN DEFAULT PREDICTION]")
    clf_engine = ClassificationPipeline()
    cohort = clf_engine.generate_synthetic_cohort(n=50, seed=42)
    
    defaults_count = sum(1 for c in cohort if c["actual"] == 1)
    print(f"Cohort Size: {len(cohort)} applicants | Actual Defaults: {defaults_count} | Paid Clean: {len(cohort) - defaults_count}")
    print("-" * 85)
    print(f"{'Decision Threshold (θ)':<24} | {'Accuracy':<10} | {'Precision':<11} | {'Recall':<10} | {'F1-Score':<10} | {'TP/FP/TN/FN'}")
    print("-" * 85)
    
    for thresh in [0.30, 0.50, 0.70]:
        res = clf_engine.evaluate_threshold(cohort, threshold=thresh)
        matrix_str = f"{res['tp']}/{res['fp']}/{res['tn']}/{res['fn']}"
        print(f"θ = {thresh:.2f} ({thresh*100:>2.0f}% Risk Cutoff)   | {res['accuracy']:>6.2f}%   | {res['precision']:>7.2f}%   | {res['recall']:>6.2f}%   | {res['f1_score']:>6.2f}%   | {matrix_str:<12}")

    print("\nTeacher Sukanta Hui's Insight on Threshold Tuning:")
    print(" -> Lowering threshold to θ=0.30 boosts Recall (catches high-risk borrowers) but reduces Precision.")
    print(" -> Raising threshold to θ=0.70 boosts Precision (fewer false default alarms) but misses defaults.")

    # -------------------------------------------------------------------------
    # 2. TASK B: CONTINUOUS REGRESSION
    # -------------------------------------------------------------------------
    print("\n" + "=" * 85)
    print("[PHASE 2: CONTINUOUS REGRESSION — SALT LAKE PROPERTY VALUATION]")
    reg_engine = RegressionPipeline()
    housing = reg_engine.generate_synthetic_housing(n=50, seed=42)
    clean_eval = reg_engine.fit_and_evaluate(housing)
    outlier_eval = reg_engine.inject_outliers_and_reevaluate(housing)

    print(f"Clean Dataset OLS Equation: Price = ({clean_eval['w']:.4f} × Area) + ₹{clean_eval['b']:.2f} Lakhs")
    print("-" * 85)
    print(f"{'Dataset Scenario':<32} | {'MAE (Linear)':<14} | {'RMSE (Squared)':<16} | {'R² Score':<10}")
    print("-" * 85)
    print(f"{'1. Clean Apartment Registry':<32} | ₹{clean_eval['mae']:>5.2f} Lakhs   | ₹{clean_eval['rmse']:>6.2f} Lakhs     | {clean_eval['r2_score']:>6.4f}")
    print(f"{'2. Infiltrated Outlier Mansions':<32} | ₹{outlier_eval['mae']:>5.2f} Lakhs   | ₹{outlier_eval['rmse']:>6.2f} Lakhs     | {outlier_eval['r2_score']:>6.4f}")
    print("-" * 85)

    print("\nTeacher Sukanta Hui's Insight on Regression Scorecards:")
    print(f" -> When 3 extreme mansions were added, MAE shifted modestly from ₹{clean_eval['mae']}L to ₹{outlier_eval['mae']}L.")
    print(f" -> Meanwhile, RMSE exploded from ₹{clean_eval['rmse']}L to ₹{outlier_eval['rmse']}L because squared errors penalize outliers heavily!")

    print("\n" + "=" * 85)
    print("SUMMARY COMPARISON TAXONOMY:")
    print("  * Classification: Discrete outputs Y ∈ {0, 1, ..., C-1}. Scorecards: Accuracy, Precision, Recall, F1, ROC-AUC.")
    print("  * Regression:     Continuous outputs Y ∈ R. Scorecards: MAE (real units), RMSE (penalizes blunders), R² (variance captured).")
    print("=" * 85)


# =============================================================================
# PART 4: PRODUCTION SCIKIT-LEARN REFERENCE TEMPLATE
# =============================================================================
"""
# Ready-to-copy Scikit-Learn Template:
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.metrics import confusion_matrix, precision_recall_fscore_support, mean_squared_error, r2_score

# 1. Classification
clf = LogisticRegression()
clf.fit(X_train, y_train_discrete)
y_pred_discrete = clf.predict(X_test)
cm = confusion_matrix(y_test_discrete, y_pred_discrete)

# 2. Regression
reg = LinearRegression()
reg.fit(X_train, y_train_continuous)
y_pred_cont = reg.predict(X_test)
mse = mean_squared_error(y_test_cont, y_pred_cont)
r2 = r2_score(y_test_cont, y_pred_cont)
"""

if __name__ == "__main__":
    run_laboratory_experiment()
