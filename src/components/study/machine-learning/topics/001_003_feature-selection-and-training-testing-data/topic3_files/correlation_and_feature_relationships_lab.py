"""
=============================================================================
CODER & ACCOTAX ACADEMIC LABORATORY & SIMULATION ENGINE
Topic 3: Correlation and Feature Relationships (BCAC701B)
Module: Feature Selection and Training & Testing Data
Lead Author: Sukanta Hui | Barrackpore, West Bengal, India
=============================================================================

This laboratory simulates the foundational mathematical principles of feature
relationships, dependency measures, and correlation metrics:
1. Pearson Product-Moment Correlation (Linear association, parametric).
2. Spearman Rank-Order Correlation (Monotonic association, non-parametric, robust).
3. Kendall's Tau Rank Correlation (Concordant vs discordant pair dynamics).
4. Distance Correlation (General statistical independence: dCor = 0 <=> X _|_ Y).
5. Anscombe's Quartet Simulator (Demonstrating identical Pearson r on non-linear distributions).
6. Correlation Matrix & Multicollinearity Eigenvalue Condition Number.

Zero external dependencies: Pure standard library Python 3 (math, random, typing).
"""

import math
import random
from typing import List, Tuple, Dict, Any


# =============================================================================
# 1. CORE BIVARIATE CORRELATION ALGORITHMS
# =============================================================================

def calculate_pearson_correlation(x: List[float], y: List[float]) -> float:
    """
    Computes Pearson product-moment correlation coefficient:
    r = Cov(X, Y) / (sigma_X * sigma_Y)
    """
    n = len(x)
    if n != len(y) or n < 2:
        return 0.0
    
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    
    cov = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    var_x = sum((x[i] - mean_x) ** 2 for i in range(n))
    var_y = sum((y[i] - mean_y) ** 2 for i in range(n))
    
    denom = math.sqrt(var_x * var_y)
    if denom < 1e-12:
        return 0.0
    return max(-1.0, min(1.0, cov / denom))


def compute_ranks(values: List[float]) -> List[float]:
    """
    Computes fractional ranks for a vector of values, handling ties via average rank.
    """
    n = len(values)
    indexed = sorted([(values[i], i) for i in range(n)], key=lambda t: t[0])
    ranks = [0.0] * n
    
    i = 0
    while i < n:
        j = i
        while j < n - 1 and abs(indexed[j + 1][0] - indexed[j][0]) < 1e-9:
            j += 1
        # Average rank for tied group (1-based ranking)
        avg_rank = (i + 1 + j + 1) / 2.0
        for k in range(i, j + 1):
            ranks[indexed[k][1]] = avg_rank
        i = j + 1
        
    return ranks


def calculate_spearman_correlation(x: List[float], y: List[float]) -> float:
    """
    Computes Spearman rank-order correlation coefficient:
    rho = Pearson correlation on rank-transformed vectors.
    """
    n = len(x)
    if n != len(y) or n < 2:
        return 0.0
    rank_x = compute_ranks(x)
    rank_y = compute_ranks(y)
    return calculate_pearson_correlation(rank_x, rank_y)


def calculate_kendall_tau(x: List[float], y: List[float]) -> float:
    """
    Computes Kendall's Tau-b rank correlation coefficient:
    tau = (P - Q) / sqrt((P + Q + T_x) * (P + Q + T_y))
    where P is concordant pairs, Q is discordant pairs, and T is ties.
    """
    n = len(x)
    if n != len(y) or n < 2:
        return 0.0
        
    concordant = 0
    discordant = 0
    ties_x = 0
    ties_y = 0
    
    for i in range(n):
        for j in range(i + 1, n):
            dx = x[i] - x[j]
            dy = y[i] - y[j]
            
            if abs(dx) < 1e-9 and abs(dy) < 1e-9:
                ties_x += 1
                ties_y += 1
            elif abs(dx) < 1e-9:
                ties_x += 1
            elif abs(dy) < 1e-9:
                ties_y += 1
            else:
                product = dx * dy
                if product > 0:
                    concordant += 1
                elif product < 0:
                    discordant += 1
                    
    total_pairs = n * (n - 1) / 2.0
    denom = math.sqrt((concordant + discordant + ties_x) * (concordant + discordant + ties_y))
    if denom < 1e-12:
        return 0.0
    return (concordant - discordant) / denom


def calculate_distance_correlation(x: List[float], y: List[float]) -> float:
    """
    Computes Szekely-Rizzo Distance Correlation dCor(X, Y) in R^1:
    dCor = dCov(X, Y) / sqrt(dVar(X) * dVar(Y))
    Crucial property: dCor(X, Y) = 0 if and only if X and Y are independent.
    """
    n = len(x)
    if n != len(y) or n < 3:
        return 0.0
        
    # 1. Pairwise distance matrices A and B
    A = [[abs(x[i] - x[j]) for j in range(n)] for i in range(n)]
    B = [[abs(y[i] - y[j]) for j in range(n)] for i in range(n)]
    
    # 2. Row means, column means, and grand mean
    row_means_A = [sum(A[i]) / n for i in range(n)]
    row_means_B = [sum(B[i]) / n for i in range(n)]
    grand_mean_A = sum(row_means_A) / n
    grand_mean_B = sum(row_means_B) / n
    
    # 3. Double-centering transformation: A~_ij = A_ij - A_i. - A_.j + A_..
    A_tilde = [[A[i][j] - row_means_A[i] - row_means_A[j] + grand_mean_A for j in range(n)] for i in range(n)]
    B_tilde = [[B[i][j] - row_means_B[i] - row_means_B[j] + grand_mean_B for j in range(n)] for i in range(n)]
    
    # 4. Empirical distance covariance and variances
    dcov_sq = sum(A_tilde[i][j] * B_tilde[i][j] for i in range(n) for j in range(n)) / (n * n)
    dvar_x_sq = sum(A_tilde[i][j] ** 2 for i in range(n) for j in range(n)) / (n * n)
    dvar_y_sq = sum(B_tilde[i][j] ** 2 for i in range(n) for j in range(n)) / (n * n)
    
    if dvar_x_sq < 1e-12 or dvar_y_sq < 1e-12 or dcov_sq <= 0:
        return 0.0
        
    dcor = math.sqrt(max(0.0, dcov_sq)) / math.sqrt(math.sqrt(dvar_x_sq * dvar_y_sq))
    return max(0.0, min(1.0, dcor))


# =============================================================================
# 2. ANSCOMBE'S QUARTET SIMULATION ENGINE
# =============================================================================

def generate_anscombe_quartet() -> Dict[str, Tuple[List[float], List[float]]]:
    """
    Standard Anscombe's quartet datasets:
    All 4 datasets share identical Pearson r approx 0.816, mean_x = 9.0, mean_y = 7.50,
    yet each represents a completely different relationship structure.
    """
    # Dataset I: Clean Linear Association
    x1 = [10.0, 8.0, 13.0, 9.0, 11.0, 14.0, 6.0, 4.0, 12.0, 7.0, 5.0]
    y1 = [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68]
    
    # Dataset II: Perfect Parabolic / Non-linear Quadratic
    x2 = [10.0, 8.0, 13.0, 9.0, 11.0, 14.0, 6.0, 4.0, 12.0, 7.0, 5.0]
    y2 = [9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74]
    
    # Dataset III: Strict Linear with Single High-Residual Outlier
    x3 = [10.0, 8.0, 13.0, 9.0, 11.0, 14.0, 6.0, 4.0, 12.0, 7.0, 5.0]
    y3 = [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73]
    
    # Dataset IV: Clustered Vertical Line with Single High-Leverage Outlier
    x4 = [8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 19.0]
    y4 = [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 5.56, 7.91, 6.89, 12.50]
    
    return {
        "Dataset I (Clean Linear)": (x1, y1),
        "Dataset II (Parabolic Non-Linear)": (x2, y2),
        "Dataset III (Linear with Outlier)": (x3, y3),
        "Dataset IV (High-Leverage Outlier)": (x4, y4)
    }


# =============================================================================
# 3. MULTICOLLINEARITY & CORRELATION MATRIX BENCHMARK
# =============================================================================

def build_correlation_matrix(feature_matrix: List[List[float]], feature_names: List[str]) -> Dict[str, Any]:
    """
    Constructs an N x N Pearson correlation matrix and computes pairwise collinearity.
    """
    n_features = len(feature_names)
    matrix = [[0.0] * n_features for _ in range(n_features)]
    
    # Transpose to columns
    columns = [[row[j] for row in feature_matrix] for j in range(n_features)]
    
    for i in range(n_features):
        for j in range(n_features):
            if i == j:
                matrix[i][j] = 1.0
            elif j > i:
                r = calculate_pearson_correlation(columns[i], columns[j])
                matrix[i][j] = r
                matrix[j][i] = r
                
    # Detect high collinear pairs (|r| >= 0.85)
    collinear_pairs = []
    for i in range(n_features):
        for j in range(i + 1, n_features):
            if abs(matrix[i][j]) >= 0.85:
                collinear_pairs.append({
                    "f1": feature_names[i],
                    "f2": feature_names[j],
                    "r": round(matrix[i][j], 4)
                })
                
    return {
        "matrix": matrix,
        "names": feature_names,
        "collinear_pairs": collinear_pairs
    }


# =============================================================================
# 4. WEST BENGAL REGIONAL DATASET BENCHMARK
# =============================================================================

def generate_kolkata_real_estate_dataset(n_samples: int = 150, seed: int = 42) -> List[Dict[str, float]]:
    """
    Synthetic Kolkata real estate dataset (EM Bypass & New Town):
    - built_up_sqft: Built-up area in sqft
    - carpet_sqft: Carpet area (collinear with built_up, r approx 0.98)
    - metro_dist_km: Distance to nearest metro station in km
    - building_age_yrs: Age of building
    - price_lakhs: Target valuation in Lakhs INR
    """
    random.seed(seed)
    records = []
    
    for _ in range(n_samples):
        built_up = random.gauss(1400.0, 350.0)
        built_up = max(550.0, built_up)
        # Carpet area is ~78% of built up + small measurement noise
        carpet = (built_up * 0.78) + random.gauss(0, 15.0)
        
        metro_dist = random.uniform(0.3, 8.0)
        age = random.uniform(0.5, 25.0)
        
        # Non-linear valuation formula
        # Base: 7500 INR/sqft built-up, discounted exponentially by metro distance
        metro_premium = math.exp(-0.35 * metro_dist)
        age_depreciation = max(0.65, 1.0 - (age * 0.015))
        
        price = ((built_up * 0.075) * metro_premium * age_depreciation) + random.gauss(0, 3.5)
        price = max(20.0, price)
        
        records.append({
            "built_up_sqft": built_up,
            "carpet_sqft": carpet,
            "metro_dist_km": metro_dist,
            "building_age_yrs": age,
            "price_lakhs": price
        })
        
    return records


# =============================================================================
# 5. LABORATORY EXECUTION SUITE
# =============================================================================

def run_laboratory() -> None:
    print("=" * 80)
    print("CODER & ACCOTAX ACADEMIC LABORATORY: TOPIC 3")
    print("CORRELATION AND FEATURE RELATIONSHIPS (LINEAR, RANK, AND NON-LINEAR)")
    print("Module: Feature Selection and Training & Testing Data (BCAC701B)")
    print("Lead Author: Sukanta Hui | Barrackpore, West Bengal, India")
    print("=" * 80)
    
    # -------------------------------------------------------------------------
    # 1. ANSCOMBE'S QUARTET BENCHMARK: THE DANGER OF RELYING SOLELY ON PEARSON r
    # -------------------------------------------------------------------------
    print("\n--- 1. ANSCOMBE'S QUARTET: PARADIGMATIC BREAKDOWN OF PEARSON r ---")
    quartet = generate_anscombe_quartet()
    print(f"{'Dataset Description':<36} | {'Pearson r':<10} | {'Spearman rho':<12} | {'Distance Cor':<12}")
    print("-" * 80)
    
    for name, (x, y) in quartet.items():
        r = calculate_pearson_correlation(x, y)
        rho = calculate_spearman_correlation(x, y)
        dcor = calculate_distance_correlation(x, y)
        print(f"{name:<36} | {r:>9.4f}  | {rho:>11.4f}  | {dcor:>11.4f}")
        
    print("\n>> KEY TAKEAWAY: All four datasets exhibit nearly identical Pearson r (approx 0.816).")
    print(">> Yet Dataset II is non-linear parabolic, Dataset III has an outlier, and Dataset IV")
    print(">> is an extreme single-point leverage artifact. Always inspect visual scatter plots!")

    # -------------------------------------------------------------------------
    # 2. NON-LINEAR RELATIONSHIP: THE PARABOLIC INDEPENDENCE FALLACY (y = x^2)
    # -------------------------------------------------------------------------
    print("\n--- 2. THE NON-LINEAR SYMMETRIC PARADOX: Y = X^2 (X in [-3, +3]) ---")
    n_pts = 61
    x_parabola = [-3.0 + (6.0 * i / (n_pts - 1)) for i in range(n_pts)]
    y_parabola = [x ** 2 for x in x_parabola]
    
    r_para = calculate_pearson_correlation(x_parabola, y_parabola)
    rho_para = calculate_spearman_correlation(x_parabola, y_parabola)
    tau_para = calculate_kendall_tau(x_parabola, y_parabola)
    dcor_para = calculate_distance_correlation(x_parabola, y_parabola)
    
    print(f"Pearson Correlation (r)       : {r_para:>8.4f} (Linear filter flags as COMPLETELY UNCORRELATED!)")
    print(f"Spearman Rank Correlation (rho): {rho_para:>8.4f} (Monotonic test also shows zero correlation!)")
    print(f"Kendall's Tau (tau)            : {tau_para:>8.4f} (Concordant pairs balance discordant pairs)")
    print(f"Distance Correlation (dCor)    : {dcor_para:>8.4f} (ACCURATELY DETECTS STRONG NON-LINEAR DEPENDENCE!)")
    print(">> LESSON: Pearson r = 0 does NOT imply independence. Distance Correlation captures non-linear truth.")

    # -------------------------------------------------------------------------
    # 3. WEST BENGAL REAL ESTATE: MULTICOLLINEARITY AUDIT (KOLKATA / NEW TOWN)
    # -------------------------------------------------------------------------
    print("\n--- 3. WEST BENGAL REAL ESTATE CASE STUDY: CORRELATION MATRIX & REDUNDANCY ---")
    records = generate_kolkata_real_estate_dataset(n_samples=200, seed=101)
    feature_names = ["built_up_sqft", "carpet_sqft", "metro_dist_km", "building_age_yrs", "price_lakhs"]
    matrix_data = [[rec[k] for k in feature_names] for rec in records]
    
    corr_results = build_correlation_matrix(matrix_data, feature_names)
    matrix = corr_results["matrix"]
    
    print("Pairwise Pearson Correlation Matrix:")
    header = " " * 18 + "".join([f"{name[:10]:>12}" for name in feature_names])
    print(header)
    print("-" * len(header))
    
    for i, name in enumerate(feature_names):
        row_str = f"{name:<18}"
        for j in range(len(feature_names)):
            row_str += f"{matrix[i][j]:>12.4f}"
        print(row_str)
        
    print("\nDetected Severe Collinear Pairs (|r| >= 0.85):")
    for cp in corr_results["collinear_pairs"]:
        print(f" -> Pair: {cp['f1']} <--> {cp['f2']} | r = {cp['r']} (HEAVY MULTICOLLINEARITY)")

    # -------------------------------------------------------------------------
    # 4. RANK ROBUSTNESS: SINGLE EXTREME OUTLIER INJECTION
    # -------------------------------------------------------------------------
    print("\n--- 4. OUTLIER SENSITIVITY BENCHMARK: PEARSON VS SPEARMAN ---")
    x_clean = [float(i) for i in range(1, 16)]
    y_clean = [float(i) + random.gauss(0, 0.2) for i in range(1, 16)]
    
    r_clean = calculate_pearson_correlation(x_clean, y_clean)
    rho_clean = calculate_spearman_correlation(x_clean, y_clean)
    
    # Inject a single catastrophic recording glitch outlier at index 14
    x_corrupt = list(x_clean)
    y_corrupt = list(y_clean)
    y_corrupt[14] = -150.0  # extreme inverted outlier
    
    r_corrupt = calculate_pearson_correlation(x_corrupt, y_corrupt)
    rho_corrupt = calculate_spearman_correlation(x_corrupt, y_corrupt)
    
    print(f"Clean Data   -> Pearson r: {r_clean:.4f} | Spearman rho: {rho_clean:.4f}")
    print(f"Corrupt Data -> Pearson r: {r_corrupt:.4f} | Spearman rho: {rho_corrupt:.4f}")
    print(f"Pearson Collapse: {abs(r_clean - r_corrupt):.4f} drop!")
    print(f"Spearman Shift  : {abs(rho_clean - rho_corrupt):.4f} change (Extremely robust to magnitude outliers)")

    # -------------------------------------------------------------------------
    # 5. VERIFICATION INVARIANTS & INTEGRITY CHECKS
    # -------------------------------------------------------------------------
    assert abs(r_para) < 0.05, "Pearson r must be near 0 for symmetric parabola"
    assert dcor_para > 0.40, "Distance correlation must detect parabolic dependence"
    assert len(corr_results["collinear_pairs"]) >= 1, "Must detect built_up vs carpet collinearity"
    assert rho_corrupt > r_corrupt, "Spearman rank correlation must resist single outlier better than Pearson"

    print("\n" + "=" * 80)
    print("TOPIC 3 LABORATORY BENCHMARK COMPLETED SUCCESSFULLY (EXIT CODE 0)")
    print("=" * 80)


if __name__ == "__main__":
    run_laboratory()
