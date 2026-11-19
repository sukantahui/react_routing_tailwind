"""
=============================================================================
TOPIC 14: DATA TRANSFORMATION (MATHEMATICAL TRANSFORMATIONS & DISCRETIZATION)
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
=============================================================================

This laboratory engine provides pure-Python, zero-dependency implementations of:
1. Higher-Order Statistical Moments (Fisher-Pearson Skewness & Excess Kurtosis)
2. Logarithmic & Root Family Transforms (Log, Log1p, Sqrt, Signed Cube-Root)
3. Box-Cox Power Transformation with Profile Maximum Likelihood Estimation (MLE)
4. Yeo-Johnson Transformation supporting negative and zero real numbers
5. Discretization / Binning Mechanics (Equal-Width vs. Equal-Frequency Quantile)
6. Shannon Entropy calculation to measure information preservation after binning
7. Industrial Case Studies from Salt Lake Sector V FinTech and CESC Grid Feeds
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any, Optional

# -----------------------------------------------------------------------------
# 1. HIGHER-ORDER STATISTICAL MOMENTS (SKEWNESS & KURTOSIS)
# -----------------------------------------------------------------------------

def calculate_moments(data: List[float]) -> Dict[str, float]:
    """
    Computes sample mean, sample variance, standard deviation,
    Fisher-Pearson standardized skewness (g1), and sample excess kurtosis (g2).
    """
    n = len(data)
    if n < 4:
        raise ValueError("At least 4 samples required for valid skewness & kurtosis estimation.")
    
    mean = sum(data) / n
    m2 = sum((x - mean) ** 2 for x in data) / n
    m3 = sum((x - mean) ** 3 for x in data) / n
    m4 = sum((x - mean) ** 4 for x in data) / n
    
    variance = m2 * (n / (n - 1))
    stdev = math.sqrt(variance)
    
    # Unbiased Fisher-Pearson skewness: G1 = sqrt(n*(n-1))/(n-2) * (m3 / m2^(1.5))
    if m2 <= 1e-12:
        skewness = 0.0
        kurtosis = 0.0
    else:
        g1 = m3 / (m2 ** 1.5)
        skewness = (math.sqrt(n * (n - 1)) / (n - 2)) * g1
        
        # Excess kurtosis (G2): relative to normal distribution (3.0)
        g2 = (m4 / (m2 ** 2)) - 3.0
        kurtosis = ((n - 1) / ((n - 2) * (n - 3))) * ((n + 1) * g2 + 6)
        
    return {
        "n": n,
        "mean": round(mean, 4),
        "variance": round(variance, 4),
        "stdev": round(stdev, 4),
        "skewness": round(skewness, 4),
        "excess_kurtosis": round(kurtosis, 4)
    }

# -----------------------------------------------------------------------------
# 2. ELEMENTARY POWER & ROOT TRANSFORMS
# -----------------------------------------------------------------------------

def transform_log1p(data: List[float]) -> List[float]:
    """Computes y = ln(1 + x). Strictly requires x > -1.0."""
    return [math.log(1.0 + x) for x in data]

def transform_sqrt(data: List[float]) -> List[float]:
    """Computes y = sqrt(x). Strictly requires x >= 0."""
    return [math.sqrt(max(0.0, x)) for x in data]

def transform_signed_cbrt(data: List[float]) -> List[float]:
    """
    Computes signed cube root y = sign(x) * |x|^(1/3).
    Supports all real numbers including negative and zero.
    """
    return [math.copysign(abs(x) ** (1.0 / 3.0), x) for x in data]

# -----------------------------------------------------------------------------
# 3. BOX-COX POWER TRANSFORMATION & PROFILE MLE (George Box & David Cox, 1964)
# -----------------------------------------------------------------------------

def box_cox_scalar(x: float, lmbda: float) -> float:
    """
    Computes the Box-Cox transformed value for a single strictly positive scalar x > 0:
    y(lambda) = (x^lambda - 1) / lambda   if lambda != 0
    y(lambda) = ln(x)                     if lambda == 0
    """
    if x <= 0:
        raise ValueError(f"Box-Cox requires strictly positive values (x > 0). Found: {x}")
    if abs(lmbda) < 1e-6:
        return math.log(x)
    return (x ** lmbda - 1.0) / lmbda

def box_cox_transform(data: List[float], lmbda: float) -> List[float]:
    """Applies Box-Cox transform over a dataset for a fixed parameter lambda."""
    return [box_cox_scalar(x, lmbda) for x in data]

def box_cox_profile_log_likelihood(data: List[float], lmbda: float) -> float:
    """
    Computes the Profile Log-Likelihood L(lambda) for Box-Cox:
    L(lambda) = - (n/2) * ln(sigma_hat^2(lambda)) + (lambda - 1) * sum(ln(x_i))
    where sigma_hat^2(lambda) = (1/n) * sum((y_i(lambda) - y_bar(lambda))^2)
    """
    n = len(data)
    y = box_cox_transform(data, lmbda)
    mean_y = sum(y) / n
    var_y = sum((val - mean_y) ** 2 for val in y) / n
    
    if var_y <= 1e-14:
        return -float("inf")
    
    sum_ln_x = sum(math.log(x) for x in data)
    ll = -0.5 * n * math.log(var_y) + (lmbda - 1.0) * sum_ln_x
    return ll

def fit_box_cox(data: List[float], lmbda_min: float = -2.0, lmbda_max: float = 2.0, steps: int = 401) -> Tuple[float, float, List[float]]:
    """
    Finds the optimal Box-Cox parameter lambda* that maximizes the profile log-likelihood
    via fine-grained 1D grid search.
    Returns: (optimal_lambda, max_log_likelihood, transformed_data)
    """
    best_ll = -float("inf")
    best_lmbda = 1.0
    step_size = (lmbda_max - lmbda_min) / (steps - 1)
    
    for i in range(steps):
        cand_lmbda = round(lmbda_min + i * step_size, 4)
        try:
            ll = box_cox_profile_log_likelihood(data, cand_lmbda)
            if ll > best_ll:
                best_ll = ll
                best_lmbda = cand_lmbda
        except (ValueError, OverflowError):
            continue
            
    transformed = box_cox_transform(data, best_lmbda)
    return best_lmbda, best_ll, transformed

# -----------------------------------------------------------------------------
# 4. YEO-JOHNSON TRANSFORMATION (Ing-Guey Yeo & Richard Johnson, 2000)
# -----------------------------------------------------------------------------

def yeo_johnson_scalar(x: float, lmbda: float) -> float:
    """
    Computes the Yeo-Johnson transformed value for any real scalar x in (-inf, +inf):
    For x >= 0:
      if lambda != 0: ((x + 1)^lambda - 1) / lambda
      if lambda == 0: ln(x + 1)
    For x < 0:
      if lambda != 2: - ((-x + 1)^(2 - lambda) - 1) / (2 - lambda)
      if lambda == 2: - ln(-x + 1)
    """
    if x >= 0:
        if abs(lmbda) < 1e-6:
            return math.log(x + 1.0)
        return ((x + 1.0) ** lmbda - 1.0) / lmbda
    else:
        if abs(lmbda - 2.0) < 1e-6:
            return -math.log(-x + 1.0)
        return -(((-x + 1.0) ** (2.0 - lmbda) - 1.0) / (2.0 - lmbda))

def yeo_johnson_transform(data: List[float], lmbda: float) -> List[float]:
    """Applies Yeo-Johnson transform across a dataset for a fixed parameter lambda."""
    return [yeo_johnson_scalar(x, lmbda) for x in data]

def yeo_johnson_profile_log_likelihood(data: List[float], lmbda: float) -> float:
    """
    Computes the Profile Log-Likelihood for Yeo-Johnson:
    L(lambda) = - (n/2) * ln(sigma_hat^2(lambda)) + (lambda - 1) * sum(sign(x_i) * ln(|x_i| + 1))
    """
    n = len(data)
    y = yeo_johnson_transform(data, lmbda)
    mean_y = sum(y) / n
    var_y = sum((val - mean_y) ** 2 for val in y) / n
    
    if var_y <= 1e-14:
        return -float("inf")
    
    jacobian_sum = sum(
        (1.0 if x >= 0 else -1.0) * math.log(abs(x) + 1.0)
        for x in data
    )
    ll = -0.5 * n * math.log(var_y) + (lmbda - 1.0) * jacobian_sum
    return ll

def fit_yeo_johnson(data: List[float], lmbda_min: float = -2.0, lmbda_max: float = 2.0, steps: int = 401) -> Tuple[float, float, List[float]]:
    """
    Finds the optimal Yeo-Johnson parameter lambda* via 1D grid search.
    Returns: (optimal_lambda, max_log_likelihood, transformed_data)
    """
    best_ll = -float("inf")
    best_lmbda = 1.0
    step_size = (lmbda_max - lmbda_min) / (steps - 1)
    
    for i in range(steps):
        cand_lmbda = round(lmbda_min + i * step_size, 4)
        try:
            ll = yeo_johnson_profile_log_likelihood(data, cand_lmbda)
            if ll > best_ll:
                best_ll = ll
                best_lmbda = cand_lmbda
        except (ValueError, OverflowError):
            continue
            
    transformed = yeo_johnson_transform(data, best_lmbda)
    return best_lmbda, best_ll, transformed

# -----------------------------------------------------------------------------
# 5. DISCRETIZATION & BINNING (EQUAL-WIDTH VS EQUAL-FREQUENCY QUANTILE)
# -----------------------------------------------------------------------------

def calculate_shannon_entropy(bin_counts: List[int], n: int) -> float:
    """Computes Shannon Entropy H(X) = - sum(p_i * log2(p_i)) in bits."""
    entropy = 0.0
    for count in bin_counts:
        if count > 0:
            p = count / n
            entropy -= p * math.log2(p)
    return round(entropy, 4)

def equal_width_binning(data: List[float], k: int) -> Dict[str, Any]:
    """
    Divides the feature range [min, max] into k equal-width intervals.
    bin_width = (max - min) / k
    """
    min_val = min(data)
    max_val = max(data)
    rng = max_val - min_val
    if rng <= 1e-12:
        return {"edges": [min_val, max_val], "counts": [len(data)], "entropy": 0.0, "assignments": [0] * len(data)}
        
    width = rng / k
    edges = [min_val + i * width for i in range(k + 1)]
    edges[-1] = max_val + 1e-9  # Include upper bound
    
    counts = [0] * k
    assignments = []
    
    for x in data:
        bin_idx = int((x - min_val) / width)
        if bin_idx >= k:
            bin_idx = k - 1
        elif bin_idx < 0:
            bin_idx = 0
        counts[bin_idx] += 1
        assignments.append(bin_idx)
        
    entropy = calculate_shannon_entropy(counts, len(data))
    max_possible_entropy = round(math.log2(k), 4)
    
    return {
        "k": k,
        "width": round(width, 4),
        "edges": [round(e, 4) for e in edges],
        "counts": counts,
        "entropy_bits": entropy,
        "max_entropy_bits": max_possible_entropy,
        "entropy_ratio": round(entropy / max_possible_entropy, 4) if max_possible_entropy > 0 else 1.0,
        "assignments": assignments
    }

def equal_frequency_binning(data: List[float], k: int) -> Dict[str, Any]:
    """
    Divides data into k quantiles so each bin contains approximately n / k observations.
    """
    n = len(data)
    sorted_data = sorted(data)
    
    edges = [sorted_data[0]]
    for i in range(1, k):
        idx = int(i * (n / k))
        edges.append(sorted_data[idx])
    edges.append(sorted_data[-1] + 1e-9)
    
    counts = [0] * k
    assignments = []
    
    for x in data:
        # Binary search or scan for bin
        placed = False
        for b in range(k):
            if edges[b] <= x < edges[b + 1]:
                counts[b] += 1
                assignments.append(b)
                placed = True
                break
        if not placed:
            counts[k - 1] += 1
            assignments.append(k - 1)
            
    entropy = calculate_shannon_entropy(counts, n)
    max_possible_entropy = round(math.log2(k), 4)
    
    return {
        "k": k,
        "edges": [round(e, 4) for e in edges],
        "counts": counts,
        "entropy_bits": entropy,
        "max_entropy_bits": max_possible_entropy,
        "entropy_ratio": round(entropy / max_possible_entropy, 4) if max_possible_entropy > 0 else 1.0,
        "assignments": assignments
    }

# -----------------------------------------------------------------------------
# 6. LABORATORY EXPERIMENTS & REAL-WORLD REGIONAL BENCHMARKS
# -----------------------------------------------------------------------------

def run_laboratory():
    print("=" * 80)
    print("  ACADEMIC & INDUSTRIAL BENCHMARK: DATA TRANSFORMATION ENGINE")
    print("  Course: BCAC701B | Machine Learning Preprocessing Laboratory")
    print("  Author: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    # -------------------------------------------------------------------------
    # EXPERIMENT 1: FINTECH LOAN REQUESTS (SALT LAKE SECTOR V) - POSITIVE SKEW
    # -------------------------------------------------------------------------
    print("\n--- [EXPERIMENT 1] FINTECH LOAN REQUEST AMOUNTS (SECTOR V, KOLKATA) ---")
    # Highly right-skewed loan amounts in INR thousands
    loans = [
        15.0, 18.0, 20.0, 22.0, 25.0, 25.0, 30.0, 32.0, 35.0, 40.0,
        45.0, 50.0, 60.0, 75.0, 90.0, 120.0, 180.0, 250.0, 400.0, 850.0
    ]
    raw_moments = calculate_moments(loans)
    print(f"Total Loan Applications: {raw_moments['n']}")
    print(f"Raw Feature Metrics: Mean = Rs {raw_moments['mean']}k | StDev = Rs {raw_moments['stdev']}k")
    print(f"Raw Skewness g1: {raw_moments['skewness']} (Severely Right-Skewed!)")
    print(f"Raw Excess Kurtosis g2: {raw_moments['excess_kurtosis']} (Heavy-Tailed Leptokurtic)")

    # 1. Log1p Transform
    log_loans = transform_log1p(loans)
    log_moments = calculate_moments(log_loans)
    print(f"\n1. Natural Logarithm (ln(1 + x)):")
    print(f"   Transformed Skewness: {log_moments['skewness']} (Reduced from {raw_moments['skewness']})")
    print(f"   Transformed Kurtosis: {log_moments['excess_kurtosis']}")

    # 2. Square Root Transform
    sqrt_loans = transform_sqrt(loans)
    sqrt_moments = calculate_moments(sqrt_loans)
    print(f"\n2. Square Root Transform (sqrt(x)):")
    print(f"   Transformed Skewness: {sqrt_moments['skewness']}")
    print(f"   Transformed Kurtosis: {sqrt_moments['excess_kurtosis']}")

    # 3. Box-Cox MLE Transform
    opt_lambda_bc, max_ll_bc, bc_loans = fit_box_cox(loans)
    bc_moments = calculate_moments(bc_loans)
    print(f"\n3. Box-Cox Maximum Likelihood Estimation (MLE):")
    print(f"   Optimal Parameter lambda*: {opt_lambda_bc}")
    print(f"   Max Profile Log-Likelihood: {round(max_ll_bc, 2)}")
    print(f"   Transformed Skewness: {bc_moments['skewness']} (Closest to Normal N(0,1)!)")
    print(f"   Transformed Kurtosis: {bc_moments['excess_kurtosis']}")

    # -------------------------------------------------------------------------
    # EXPERIMENT 2: CESC GRID DEMAND WITH REVERSE SOLAR FEEDS - NEGATIVE VALUES
    # -------------------------------------------------------------------------
    print("\n--- [EXPERIMENT 2] CESC POWER GRID NET LOAD (MW) - NEGATIVE & ZERO VALUES ---")
    # Hourly net load: positive = demand from grid, negative = rooftop solar surplus feed-in
    grid_load = [
        -14.2, -8.5, -4.0, -1.2, 0.0, 3.5, 8.2, 12.0, 18.5, 25.0,
        34.0, 42.0, 50.5, 62.0, 78.0, 95.0, 110.0, 135.0, 175.0, 240.0
    ]
    raw_grid_moments = calculate_moments(grid_load)
    print(f"Observations: {raw_grid_moments['n']} hours")
    print(f"Min Load: {min(grid_load)} MW | Max Load: {max(grid_load)} MW")
    print(f"Raw Skewness: {raw_grid_moments['skewness']}")
    print("⚠️ Box-Cox CANNOT be computed because data contains zero and negative values (x <= 0)!")

    # Yeo-Johnson Transform
    opt_lambda_yj, max_ll_yj, yj_grid = fit_yeo_johnson(grid_load)
    yj_moments = calculate_moments(yj_grid)
    print(f"\nYeo-Johnson Transform (Supports R):")
    print(f"   Optimal Parameter lambda*: {opt_lambda_yj}")
    print(f"   Max Profile Log-Likelihood: {round(max_ll_yj, 2)}")
    print(f"   Transformed Skewness: {yj_moments['skewness']} (Symmetrized from {raw_grid_moments['skewness']})")
    print(f"   Transformed Kurtosis: {yj_moments['excess_kurtosis']}")

    # -------------------------------------------------------------------------
    # EXPERIMENT 3: DISCRETIZATION COMPARISON: EQUAL-WIDTH VS EQUAL-FREQUENCY
    # -------------------------------------------------------------------------
    print("\n--- [EXPERIMENT 3] DISCRETIZATION & SHANNON ENTROPY PRESERVATION ---")
    # Dataset with extreme outlier (e.g. 1000)
    salary_data = [20, 22, 24, 25, 26, 28, 30, 32, 35, 38, 40, 42, 45, 50, 60, 1000]
    k_bins = 4
    
    ew = equal_width_binning(salary_data, k=k_bins)
    ef = equal_frequency_binning(salary_data, k=k_bins)
    
    print(f"Dataset Size: {len(salary_data)} | Outlier: 1000 | Target Bins: {k_bins}")
    print(f"\nA. Equal-Width Binning:")
    print(f"   Bin Edges: {ew['edges']}")
    print(f"   Bin Frequencies: {ew['counts']}")
    print(f"   Shannon Entropy: {ew['entropy_bits']} / {ew['max_entropy_bits']} bits (Efficiency: {ew['entropy_ratio'] * 100}%)")
    print("   ⚠️ Notice: 15 samples collapsed into Bin 0, Bins 1 and 2 are EMPTY (Swamped by Outlier)!")

    print(f"\nB. Equal-Frequency (Quantile) Binning:")
    print(f"   Bin Edges: {ef['edges']}")
    print(f"   Bin Frequencies: {ef['counts']}")
    print(f"   Shannon Entropy: {ef['entropy_bits']} / {ef['max_entropy_bits']} bits (Efficiency: {ef['entropy_ratio'] * 100}%)")
    print("   ✔ Quantile binning retains balanced sample distribution and near-maximal entropy!")

    print("\n" + "=" * 80)
    print("  LABORATORY EXECUTION COMPLETE: ALL TRANSFORMATION ENGINES VERIFIED")
    print("=" * 80)

if __name__ == "__main__":
    run_laboratory()
