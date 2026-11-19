"""
=============================================================================
TOPIC 0: MEANING OF FEATURES AND TARGET — PURE PYTHON LABORATORY
Module: Feature Selection and Training & Testing Data (Slug: 001_003_feature-selection-and-training-testing-data)
Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
Author: Sukanta Hui | Head of AI & Advanced Analytics | Barrackpore, WB
Academic Body: MAKAUT (Maulana Abul Kalam Azad University of Technology)
=============================================================================

This laboratory engine (pure Python standard library, zero external dependencies) demonstrates:
1. Formal mathematical abstraction of Feature Space X in R^(N x d) and Target Vector y in Y.
2. Duality between Regression Targets (continuous Y in R) and Classification Targets (discrete Y in {0, 1}).
3. Empirical Risk Minimization (ERM) for finding f*(x) = E[Y | X = x].
4. Quantitative Feature-Target Relevance:
   - Pearson Correlation Coefficient r(x_j, y)
   - Feature Variance sigma^2_j
   - Target Leakage Detection Metric: Identifying features that deterministically proxy y.
5. West Bengal Academic & Placement Cohort benchmark:
   - Mamata (Barrackpore), Mahima (Kolkata), Susmita (Ichapur), Debangshu (Salt Lake),
     Abhronila (Jadavpur), Rohan (Hooghly), Subhajit (Siliguri).
=============================================================================
"""

import math
from typing import List, Dict, Any, Tuple

# =============================================================================
# 1. WEST BENGAL STUDENT COHORT DATASET (SUPERVISED LEARNING REPRESENTATION)
# =============================================================================

STUDENT_COHORT = [
    {
        "id": "WB-STU-01",
        "name": "Mamata",
        "institution": "Barrackpore Academy",
        # Features X
        "attendance_pct": 94.0,
        "internal_marks": 88.0,
        "study_hours_weekly": 24.0,
        "mock_tests_solved": 18,
        "commute_time_mins": 25.0,     # Irrelevant / low signal feature
        "interview_cleared": 1,        # Target leakage feature for placement
        # Targets Y
        "semester_score_pct": 91.5,    # Regression target (Continuous)
        "placement_status": 1          # Classification target (Binary: 1=Placed, 0=Unplaced)
    },
    {
        "id": "WB-STU-02",
        "name": "Mahima",
        "institution": "Kolkata Tech Hub",
        "attendance_pct": 91.0,
        "internal_marks": 85.0,
        "study_hours_weekly": 22.0,
        "mock_tests_solved": 15,
        "commute_time_mins": 45.0,
        "interview_cleared": 1,
        "semester_score_pct": 87.0,
        "placement_status": 1
    },
    {
        "id": "WB-STU-03",
        "name": "Susmita",
        "institution": "Ichapur FinTech Lab",
        "attendance_pct": 86.0,
        "internal_marks": 78.0,
        "study_hours_weekly": 18.0,
        "mock_tests_solved": 12,
        "commute_time_mins": 15.0,
        "interview_cleared": 1,
        "semester_score_pct": 82.5,
        "placement_status": 1
    },
    {
        "id": "WB-STU-04",
        "name": "Debangshu",
        "institution": "Salt Lake Sector V",
        "attendance_pct": 68.0,
        "internal_marks": 60.0,
        "study_hours_weekly": 10.0,
        "mock_tests_solved": 5,
        "commute_time_mins": 60.0,
        "interview_cleared": 0,
        "semester_score_pct": 62.0,
        "placement_status": 0
    },
    {
        "id": "WB-STU-05",
        "name": "Abhronila",
        "institution": "Jadavpur University",
        "attendance_pct": 96.0,
        "internal_marks": 94.0,
        "study_hours_weekly": 28.0,
        "mock_tests_solved": 22,
        "commute_time_mins": 30.0,
        "interview_cleared": 1,
        "semester_score_pct": 95.0,
        "placement_status": 1
    },
    {
        "id": "WB-STU-06",
        "name": "Rohan",
        "institution": "Hooghly Engg College",
        "attendance_pct": 62.0,
        "internal_marks": 54.0,
        "study_hours_weekly": 8.0,
        "mock_tests_solved": 4,
        "commute_time_mins": 40.0,
        "interview_cleared": 0,
        "semester_score_pct": 56.0,
        "placement_status": 0
    },
    {
        "id": "WB-STU-07",
        "name": "Subhajit",
        "institution": "Siliguri Analytics Inst",
        "attendance_pct": 78.0,
        "internal_marks": 72.0,
        "study_hours_weekly": 15.0,
        "mock_tests_solved": 10,
        "commute_time_mins": 20.0,
        "interview_cleared": 1,
        "semester_score_pct": 74.0,
        "placement_status": 1
    }
]

# =============================================================================
# 2. STATISTICAL & ALGORITHMIC FUNCTIONS
# =============================================================================

def mean(values: List[float]) -> float:
    return sum(values) / len(values) if values else 0.0

def variance(values: List[float]) -> float:
    n = len(values)
    if n < 2:
        return 0.0
    m = mean(values)
    return sum((x - m) ** 2 for x in values) / (n - 1)

def std_dev(values: List[float]) -> float:
    return math.sqrt(variance(values))

def pearson_correlation(x: List[float], y: List[float]) -> float:
    """
    Computes Pearson's product-moment correlation coefficient r(x, y):
    r = sum((x_i - mean_x) * (y_i - mean_y)) / (sqrt(sum(x_i - mean_x)^2) * sqrt(sum(y_i - mean_y)^2))
    """
    n = len(x)
    if n != len(y) or n < 2:
        return 0.0
    mean_x, mean_y = mean(x), mean(y)
    cov = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denom_x = math.sqrt(sum((x[i] - mean_x) ** 2 for i in range(n)))
    denom_y = math.sqrt(sum((y[i] - mean_y) ** 2 for i in range(n)))
    if denom_x * denom_y == 0:
        return 0.0
    return cov / (denom_x * denom_y)

def fit_univariate_ols(x: List[float], y: List[float]) -> Tuple[float, float, float]:
    """
    Fits simple Ordinary Least Squares y_hat = w0 + w1 * x
    Returns: (w0, w1, r_squared)
    """
    n = len(x)
    r = pearson_correlation(x, y)
    s_x, s_y = std_dev(x), std_dev(y)
    w1 = r * (s_y / s_x) if s_x > 0 else 0.0
    w0 = mean(y) - w1 * mean(x)
    r_squared = r ** 2
    return w0, w1, r_squared

# =============================================================================
# 3. FEATURE VS TARGET AUDIT ENGINE
# =============================================================================

class FeatureTargetAuditor:
    """
    Analyzes supervised learning design matrices to:
    1. Distinguish input features X from target labels y.
    2. Rank features by linear relevance to continuous and discrete targets.
    3. Detect severe target leakage (features that proxy the outcome directly).
    """
    def __init__(self, cohort: List[Dict[str, Any]]):
        self.cohort = cohort
        self.candidate_features = [
            "attendance_pct",
            "internal_marks",
            "study_hours_weekly",
            "mock_tests_solved",
            "commute_time_mins",
            "interview_cleared"
        ]
        self.targets = {
            "regression": "semester_score_pct",
            "classification": "placement_status"
        }

    def audit_features_against_target(self, target_key: str) -> List[Dict[str, Any]]:
        target_vals = [float(row[target_key]) for row in self.cohort]
        y_mean = mean(target_vals)
        y_std = std_dev(target_vals)

        audit_results = []
        for feat in self.candidate_features:
            feat_vals = [float(row[feat]) for row in self.cohort]
            corr = pearson_correlation(feat_vals, target_vals)
            f_var = variance(feat_vals)
            f_mean = mean(feat_vals)

            # Target Leakage Alert Logic:
            # If |correlation| > 0.98 or feature is known post-event outcome
            is_leakage = False
            relevance = "Informative"
            if feat == "interview_cleared" and target_key == "placement_status":
                is_leakage = True
                relevance = "CRITICAL TARGET LEAKAGE ⚠"
            elif abs(corr) >= 0.85:
                relevance = "Strong Predictor"
            elif abs(corr) >= 0.50:
                relevance = "Moderate Predictor"
            else:
                relevance = "Weak / Noise Feature"

            audit_results.append({
                "feature": feat,
                "mean": round(f_mean, 2),
                "variance": round(f_var, 2),
                "correlation": round(corr, 4),
                "abs_correlation": round(abs(corr), 4),
                "relevance": relevance,
                "is_leakage": is_leakage
            })

        # Sort descending by absolute correlation
        audit_results.sort(key=lambda r: r["abs_correlation"], reverse=True)
        return audit_results

# =============================================================================
# 4. MAIN LABORATORY EXECUTION & MATHEMATICAL VERIFICATION
# =============================================================================

def run_feature_target_laboratory():
    print("=" * 80)
    print("CODER & ACCOTAX ACADEMIC LABORATORY & SIMULATION ENGINE")
    print("Topic 0: Meaning of Features and Target")
    print("Module: Feature Selection and Training & Testing Data (BCAC701B)")
    print("Lead Author: Sukanta Hui | Barrackpore, West Bengal, India")
    print("=" * 80)

    auditor = FeatureTargetAuditor(STUDENT_COHORT)

    print("\n--- STAGE 1: REGRESSION TARGET ANALYSIS (Semester Score %) ---")
    reg_results = auditor.audit_features_against_target("semester_score_pct")
    print(f"{'Feature Name':<22} | {'Mean':<8} | {'Variance':<10} | {'Pearson r':<10} | {'Relevance Verdict':<24}")
    print("-" * 84)
    for row in reg_results:
        print(f"{row['feature']:<22} | {row['mean']:>8.2f} | {row['variance']:>10.2f} | {row['correlation']:>10.4f} | {row['relevance']:<24}")

    print("\n--- STAGE 2: CLASSIFICATION TARGET ANALYSIS (Placement Status: 0/1) ---")
    clf_results = auditor.audit_features_against_target("placement_status")
    print(f"{'Feature Name':<22} | {'Mean':<8} | {'Variance':<10} | {'Pearson r':<10} | {'Relevance Verdict':<24}")
    print("-" * 84)
    for row in clf_results:
        print(f"{row['feature']:<22} | {row['mean']:>8.2f} | {row['variance']:>10.2f} | {row['correlation']:>10.4f} | {row['relevance']:<24}")

    print("\n--- STAGE 3: EMPIRICAL RISK MINIMIZATION (OLS Model on Internal Marks) ---")
    x_internal = [float(row["internal_marks"]) for row in STUDENT_COHORT]
    y_score = [float(row["semester_score_pct"]) for row in STUDENT_COHORT]
    w0, w1, r2 = fit_univariate_ols(x_internal, y_score)
    print(f"Fitted Model: y_hat = {w0:.2f} + {w1:.4f} * internal_marks")
    print(f"Coefficient of Determination (R^2): {r2:.4f} ({r2*100:.1f}% variance explained)")

    print("\nIndividual Candidate Predictions vs Ground Truth:")
    for row in STUDENT_COHORT:
        actual = row["semester_score_pct"]
        pred = w0 + w1 * row["internal_marks"]
        residual = actual - pred
        print(f" -> {row['name']:<12} | Internal: {row['internal_marks']:>4.1f} | Actual y: {actual:>5.1f}% | Pred y_hat: {pred:>5.1f}% | Residual: {residual:>+5.2f}%")

    print("\n--- STAGE 4: TARGET LEAKAGE AUDIT & ARCHITECTURAL VERIFICATION ---")
    leak_feature = [r for r in clf_results if r["is_leakage"]]
    if leak_feature:
        print(f"ALERT: Detected Target Leakage on '{leak_feature[0]['feature']}'!")
        print("Reason: 'interview_cleared' occurs contemporaneously with or after 'placement_status'.")
        print("Consequence: Training on this feature produces 100% artificial accuracy offline, but model collapses in production when predicting applicants before interviews take place.")

    print("\n" + "=" * 80)
    print("TOPIC 0 LABORATORY BENCHMARK COMPLETED SUCCESSFULLY (EXIT CODE 0)")
    print("=" * 80)

if __name__ == "__main__":
    run_feature_target_laboratory()
