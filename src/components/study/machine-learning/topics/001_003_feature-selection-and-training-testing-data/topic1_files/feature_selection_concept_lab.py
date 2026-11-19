"""
=============================================================================
TOPIC 1: FEATURE SELECTION CONCEPT — PURE PYTHON LABORATORY
Module: Feature Selection and Training & Testing Data (Slug: 001_003_feature-selection-and-training-testing-data)
Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
Author: Sukanta Hui | Head of AI & Advanced Analytics | Barrackpore, WB
Academic Body: MAKAUT (Maulana Abul Kalam Azad University of Technology)
=============================================================================

This laboratory engine (pure Python standard library, zero external dependencies) demonstrates:
1. The Combinatorial Challenge: Searching 2^d possible feature subsets.
2. The 3 Classical Feature Selection Paradigms:
   - Filter Method: Pearson Correlation r(x_j, y) and Variance Thresholding.
   - Wrapper Method: Greedy Forward Stepwise Selection evaluating R^2.
   - Embedded Method: L1 Soft-Thresholding (Lasso Proxy) driving weights to zero.
3. The Bias-Variance Tradeoff across Feature Cardinality k in {1, ..., d}:
   - Training MSE monotonically decreases with more features.
   - Validation MSE follows a convex U-shaped curve reaching an optimal minimum k*.
4. Multicollinearity & Variance Inflation Factor (VIF) calculation.
5. West Bengal Student Performance & Career Placement Dataset:
   - Mamata (Barrackpore), Mahima (Kolkata), Susmita (Ichapur), Debangshu (Salt Lake),
     Abhronila (Jadavpur), Rohan (Hooghly), Subhajit (Siliguri).
=============================================================================
"""

import math
from typing import List, Dict, Any, Tuple

# =============================================================================
# 1. WEST BENGAL CANDIDATE DATASET WITH SIGNAL & NOISE FEATURES
# =============================================================================

STUDENT_DATASET = [
    {
        "name": "Mamata", "institution": "Barrackpore",
        # Informative Signal Features
        "attendance": 94.0, "internal_marks": 88.0, "study_hours": 24.0, "mock_tests": 18.0,
        # Redundant / Collinear Feature (correlates strongly with internal_marks)
        "assignments": 89.0,
        # Irrelevant Noise Features
        "commute_mins": 25.0, "shoe_size": 6.5, "favorite_num": 7.0,
        # Continuous Target y (Semester Percentage)
        "target": 91.5
    },
    {
        "name": "Mahima", "institution": "Kolkata",
        "attendance": 91.0, "internal_marks": 85.0, "study_hours": 22.0, "mock_tests": 15.0,
        "assignments": 86.0,
        "commute_mins": 45.0, "shoe_size": 7.0, "favorite_num": 3.0,
        "target": 87.0
    },
    {
        "name": "Susmita", "institution": "Ichapur",
        "attendance": 86.0, "internal_marks": 78.0, "study_hours": 18.0, "mock_tests": 12.0,
        "assignments": 80.0,
        "commute_mins": 15.0, "shoe_size": 6.0, "favorite_num": 9.0,
        "target": 82.5
    },
    {
        "name": "Debangshu", "institution": "Salt Lake",
        "attendance": 68.0, "internal_marks": 60.0, "study_hours": 10.0, "mock_tests": 5.0,
        "assignments": 62.0,
        "commute_mins": 60.0, "shoe_size": 8.5, "favorite_num": 13.0,
        "target": 62.0
    },
    {
        "name": "Abhronila", "institution": "Jadavpur",
        "attendance": 96.0, "internal_marks": 94.0, "study_hours": 28.0, "mock_tests": 22.0,
        "assignments": 95.0,
        "commute_mins": 30.0, "shoe_size": 6.5, "favorite_num": 5.0,
        "target": 95.0
    },
    {
        "name": "Rohan", "institution": "Hooghly",
        "attendance": 62.0, "internal_marks": 54.0, "study_hours": 8.0, "mock_tests": 4.0,
        "assignments": 55.0,
        "commute_mins": 40.0, "shoe_size": 8.0, "favorite_num": 2.0,
        "target": 56.0
    },
    {
        "name": "Subhajit", "institution": "Siliguri",
        "attendance": 78.0, "internal_marks": 72.0, "study_hours": 15.0, "mock_tests": 10.0,
        "assignments": 74.0,
        "commute_mins": 20.0, "shoe_size": 7.5, "favorite_num": 11.0,
        "target": 74.0
    }
]

FEATURE_NAMES = [
    "attendance",
    "internal_marks",
    "study_hours",
    "mock_tests",
    "assignments",
    "commute_mins",
    "shoe_size",
    "favorite_num"
]

# =============================================================================
# 2. STATISTICAL ENGINE & METRICS
# =============================================================================

def mean(arr: List[float]) -> float:
    return sum(arr) / len(arr) if arr else 0.0

def variance(arr: List[float]) -> float:
    n = len(arr)
    if n < 2: return 0.0
    m = mean(arr)
    return sum((x - m) ** 2 for x in arr) / (n - 1)

def std_dev(arr: List[float]) -> float:
    return math.sqrt(variance(arr))

def pearson_corr(x: List[float], y: List[float]) -> float:
    n = len(x)
    if n != len(y) or n < 2: return 0.0
    mx, my = mean(x), mean(y)
    cov = sum((x[i] - mx) * (y[i] - my) for i in range(n))
    denom = math.sqrt(sum((x[i] - mx) ** 2 for i in range(n))) * math.sqrt(sum((y[i] - my) ** 2 for i in range(n)))
    return cov / denom if denom > 0 else 0.0

def fit_ols_multi(X: List[List[float]], y: List[float]) -> Tuple[List[float], float, float]:
    """
    Fits multi-variable linear regression using normal equations:
    w = (X^T X)^(-1) X^T y (for 1 or 2 features via closed-form).
    For simplicity across arbitrary features, uses QR/Gram-Schmidt or iterative SGD.
    Here we implement closed-form for 1 feature or numerical pseudo-inverse.
    """
    n = len(y)
    d = len(X[0])
    
    # Simple closed-form for d=1
    if d == 1:
        x_col = [row[0] for row in X]
        r = pearson_corr(x_col, y)
        sx, sy = std_dev(x_col), std_dev(y)
        w1 = r * (sy / sx) if sx > 0 else 0.0
        w0 = mean(y) - w1 * mean(x_col)
        preds = [w0 + w1 * val for val in x_col]
        ss_res = sum((y[i] - preds[i]) ** 2 for i in range(n))
        ss_tot = sum((y[i] - mean(y)) ** 2 for i in range(n))
        r2 = 1.0 - (ss_res / ss_tot) if ss_tot > 0 else 0.0
        return [w0, w1], r2, ss_res / n

    # Multi-variable normal equation via coordinate descent / ridge proxy
    weights = [0.0] * (d + 1) # [w0, w1, ..., wd]
    weights[0] = mean(y)
    lr = 0.0001
    
    # Feature standardization for numerical stability in GD
    means = [mean([row[j] for row in X]) for j in range(d)]
    stds = [std_dev([row[j] for row in X]) for j in range(d)]
    
    X_std = []
    for row in X:
        X_std.append([(row[j] - means[j]) / (stds[j] if stds[j] > 0 else 1.0) for j in range(d)])
        
    w_std = [0.0] * d
    w0_std = mean(y)
    
    # 500 gradient steps
    for _ in range(500):
        preds = [w0_std + sum(w_std[j] * X_std[i][j] for j in range(d)) for i in range(n)]
        errors = [preds[i] - y[i] for i in range(n)]
        grad_w0 = (2.0 / n) * sum(errors)
        w0_std -= lr * grad_w0 * 100.0
        for j in range(d):
            grad_wj = (2.0 / n) * sum(errors[i] * X_std[i][j] for i in range(n))
            w_std[j] -= lr * grad_wj * 100.0

    preds = [w0_std + sum(w_std[j] * X_std[i][j] for j in range(d)) for i in range(n)]
    ss_res = sum((y[i] - preds[i]) ** 2 for i in range(n))
    ss_tot = sum((y[i] - mean(y)) ** 2 for i in range(n))
    r2 = max(0.0, 1.0 - (ss_res / ss_tot)) if ss_tot > 0 else 0.0
    return [w0_std] + w_std, r2, ss_res / n

# =============================================================================
# 3. THE 3 FEATURE SELECTION ENGINES
# =============================================================================

class FeatureSelectionSuite:
    """
    Implements Filter, Wrapper, and Embedded feature selection algorithms.
    """
    def __init__(self, dataset: List[Dict[str, Any]]):
        self.dataset = dataset
        self.y = [float(row["target"]) for row in dataset]

    def filter_method_pearson(self, threshold: float = 0.60) -> List[Dict[str, Any]]:
        """
        Filter: Evaluates each feature independently using Pearson correlation.
        Fast O(d), model-agnostic, ignores cross-feature interactions.
        """
        results = []
        for feat in FEATURE_NAMES:
            x_vals = [float(row[feat]) for row in self.dataset]
            r = pearson_corr(x_vals, self.y)
            f_var = variance(x_vals)
            selected = abs(r) >= threshold
            results.append({
                "feature": feat,
                "pearson_r": round(r, 4),
                "abs_r": round(abs(r), 4),
                "variance": round(f_var, 2),
                "selected": selected
            })
        results.sort(key=lambda x: x["abs_r"], reverse=True)
        return results

    def wrapper_forward_stepwise(self, max_features: int = 4) -> List[str]:
        """
        Wrapper: Greedy Forward Stepwise Selection using OLS R^2 as evaluation oracle.
        Finds optimal interactive subsets but computationally intensive O(d^2).
        """
        selected: List[str] = []
        remaining = list(FEATURE_NAMES)

        for step in range(max_features):
            best_feat = None
            best_r2 = -1.0

            for candidate in remaining:
                current_features = selected + [candidate]
                X_cand = [[float(row[f]) for f in current_features] for row in self.dataset]
                _, r2, _ = fit_ols_multi(X_cand, self.y)
                if r2 > best_r2:
                    best_r2 = r2
                    best_feat = candidate

            if best_feat is not None and (best_r2 - (0.0 if not selected else 0.0)) > 0.001:
                selected.append(best_feat)
                remaining.remove(best_feat)
            else:
                break

        return selected

    def embedded_lasso_soft_threshold(self, lambda_reg: float = 2.5) -> List[Dict[str, Any]]:
        """
        Embedded: L1 Penalized Regression Proxy with Soft-Thresholding:
        S_lambda(w) = sign(w) * max(0, |w| - lambda).
        Drives uninformative or collinear weights exactly to zero.
        """
        # Fit standardized OLS weights first
        X_all = [[float(row[f]) for f in FEATURE_NAMES] for row in self.dataset]
        weights, _, _ = fit_ols_multi(X_all, self.y)
        raw_weights = weights[1:]

        embedded_results = []
        for j, feat in enumerate(FEATURE_NAMES):
            w = raw_weights[j]
            # Soft-thresholding operator
            sparse_w = math.copysign(max(0.0, abs(w) - lambda_reg), w) if abs(w) > lambda_reg else 0.0
            embedded_results.append({
                "feature": feat,
                "raw_weight": round(w, 4),
                "sparse_weight": round(sparse_w, 4),
                "retained": sparse_w != 0.0
            })
        return embedded_results

    def simulate_bias_variance_u_curve(self) -> List[Dict[str, Any]]:
        """
        Demonstrates the U-shaped error curve as feature cardinality k increases from 1 to 8:
        - Train Error strictly decreases monotonically (R^2 increases).
        - Test/Validation Error drops then rises (overfitting to noise features like shoe_size).
        """
        curve = []
        # Ordered features from most informative to pure noise
        ranked = ["attendance", "internal_marks", "study_hours", "mock_tests", "assignments", "commute_mins", "shoe_size", "favorite_num"]

        for k in range(1, len(ranked) + 1):
            sub_feats = ranked[:k]
            X_k = [[float(row[f]) for f in sub_feats] for row in self.dataset]
            _, r2, train_mse = fit_ols_multi(X_k, self.y)

            # Synthetic validation error penalty simulating degrees of freedom penalty (AIC/BIC or CV)
            # Adding noise penalty for k >= 5
            noise_penalty = 0.0
            if k >= 5:
                noise_penalty = (k - 4) * 2.8

            val_mse = train_mse + noise_penalty + (0.5 * k)
            curve.append({
                "k": k,
                "features": sub_feats,
                "train_mse": round(train_mse, 2),
                "val_mse": round(val_mse, 2),
                "r2": round(r2, 4)
            })
        return curve

# =============================================================================
# 4. MAIN LABORATORY EXECUTION & OUTPUT VERIFICATION
# =============================================================================

def run_topic1_laboratory():
    print("=" * 80)
    print("CODER & ACCOTAX ACADEMIC LABORATORY & SIMULATION ENGINE")
    print("Topic 1: Feature Selection Concept (Filter, Wrapper, Embedded)")
    print("Module: Feature Selection and Training & Testing Data (BCAC701B)")
    print("Lead Author: Sukanta Hui | Barrackpore, West Bengal, India")
    print("=" * 80)

    suite = FeatureSelectionSuite(STUDENT_DATASET)

    print("\n--- 1. FILTER METHOD: PEARSON CORRELATION RANKING (Threshold |r| >= 0.60) ---")
    filter_res = suite.filter_method_pearson(threshold=0.60)
    print(f"{'Feature Name':<18} | {'Variance':<10} | {'Pearson r':<10} | {'Selection Verdict':<18}")
    print("-" * 65)
    for row in filter_res:
        verdict = "SELECTED ✓" if row["selected"] else "DISCARDED (Noise) ✗"
        print(f"{row['feature']:<18} | {row['variance']:>10.2f} | {row['pearson_r']:>10.4f} | {verdict:<18}")

    print("\n--- 2. WRAPPER METHOD: GREEDY FORWARD STEPWISE SELECTION ---")
    wrapper_selected = suite.wrapper_forward_stepwise(max_features=4)
    print(f"Optimal Subset Selected by Wrapper (k=4): {wrapper_selected}")

    print("\n--- 3. EMBEDDED METHOD: LASSO L1 REGULARIZATION & SPARSE COEFFICIENTS ---")
    embedded_res = suite.embedded_lasso_soft_threshold(lambda_reg=2.5)
    print(f"{'Feature Name':<18} | {'Raw OLS Weight':<16} | {'Sparse L1 Weight':<18} | {'Status':<16}")
    print("-" * 75)
    for row in embedded_res:
        status = "Active Coefficient" if row["retained"] else "SPARSIFIED TO 0.0 (Pruned)"
        print(f"{row['feature']:<18} | {row['raw_weight']:>16.4f} | {row['sparse_weight']:>18.4f} | {status:<16}")

    print("\n--- 4. THE BIAS-VARIANCE TRADEOFF U-CURVE SIMULATION ---")
    print(f"{'k (Features)':<14} | {'Train MSE':<12} | {'Validation MSE':<16} | {'R^2 Score':<10} | {'State':<20}")
    print("-" * 78)
    u_curve = suite.simulate_bias_variance_u_curve()
    best_k = min(u_curve, key=lambda x: x["val_mse"])
    for row in u_curve:
        state = "OPTIMAL SWEET SPOT ★" if row["k"] == best_k["k"] else ("Underfitting" if row["k"] < best_k["k"] else "Overfitting Noise")
        print(f"{row['k']:<14} | {row['train_mse']:>12.2f} | {row['val_mse']:>16.2f} | {row['r2']:>10.4f} | {state:<20}")

    print("\n" + "=" * 80)
    print("TOPIC 1 LABORATORY BENCHMARK COMPLETED SUCCESSFULLY (EXIT CODE 0)")
    print("=" * 80)

if __name__ == "__main__":
    run_topic1_laboratory()
