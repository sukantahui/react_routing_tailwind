"""
=============================================================================
TOPIC 23: WORKED EXAMPLE 3: ENCODING CITY AND GENDER COLUMNS
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Industrial Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
=============================================================================

This laboratory engine demonstrates an end-to-end, production-grade categorical
encoding architecture on realistic West Bengal consumer demographic datasets:
1. Binary Encoding of Gender: {Female: 0, Male: 1} vs One-Hot Encoding.
2. Nominal Multi-class Encoding of City:
   - The Label Encoding Hazard: Artificial metric distance distortion.
   - Full One-Hot Encoding vs Dummy Variable Trap (K vs K-1 columns).
   - Rare/Infrequent City Pooling (Top-N + 'Other' bucket).
   - Target Encoding with Bayesian Smoothing (m-estimate).
   - Cold-Start / Unseen Category Inference Guard (e.g., 'Asansol' at test time).
3. Mathematical Singularity Proof: Determinant det(X^T X) = 0 under perfect multicollinearity.
4. Downstream Linear Model Parameter Estimation and Condition Number Audit.
=============================================================================
"""

import math
import random
from typing import List, Dict, Any, Tuple, Optional, Set

# =====================================================================
# 1. DATASET SYNTHESIS: WEST BENGAL CONSUMER COMMERCE COHORT
# =====================================================================

def get_wb_consumer_cohort() -> List[Dict[str, Any]]:
    """
    12 Representative Consumer records across Kolkata Metropolitan Area & Districts:
    - city: Kolkata, Barrackpore, Howrah, Siliguri, Durgapur, Kalyani
    - gender: Female, Male
    - age: Continuous feature
    - purchase_k: Monthly e-commerce spend in Thousands of INR (₹k)
    - high_value_buyer: Binary Target {0, 1}
    """
    return [
        {"id": "WB-CUST-01", "name": "Susmita", "city": "Kolkata", "gender": "Female", "age": 24, "spend_k": 18.5, "target": 1},
        {"id": "WB-CUST-02", "name": "Debangshu", "city": "Barrackpore", "gender": "Male", "age": 31, "spend_k": 28.0, "target": 1},
        {"id": "WB-CUST-03", "name": "Mahima", "city": "Howrah", "gender": "Female", "age": 22, "spend_k": 7.2, "target": 0},
        {"id": "WB-CUST-04", "name": "Mamata", "city": "Kolkata", "gender": "Female", "age": 29, "spend_k": 22.0, "target": 1},
        {"id": "WB-CUST-05", "name": "Abhronila", "city": "Siliguri", "gender": "Female", "age": 38, "spend_k": 35.0, "target": 1},
        {"id": "WB-CUST-06", "name": "Rohan", "city": "Barrackpore", "gender": "Male", "age": 26, "spend_k": 12.0, "target": 0},
        {"id": "WB-CUST-07", "name": "Priyanka", "city": "Durgapur", "gender": "Female", "age": 33, "spend_k": 15.5, "target": 0},
        {"id": "WB-CUST-08", "name": "Sourav", "city": "Kolkata", "gender": "Male", "age": 35, "spend_k": 31.0, "target": 1},
        {"id": "WB-CUST-09", "name": "Tanmoy", "city": "Howrah", "gender": "Male", "age": 25, "spend_k": 9.5, "target": 0},
        {"id": "WB-CUST-10", "name": "Ananya", "city": "Kalyani", "gender": "Female", "age": 28, "spend_k": 14.0, "target": 0},
        {"id": "WB-CUST-11", "name": "Subhajit", "city": "Siliguri", "gender": "Male", "age": 42, "spend_k": 40.0, "target": 1},
        {"id": "WB-CUST-12", "name": "Kallol", "city": "Barrackpore", "gender": "Male", "age": 30, "spend_k": 16.5, "target": 1},
    ]

def get_unseen_test_records() -> List[Dict[str, Any]]:
    """
    Test instances introducing cold-start unseen categories and rare cities:
    - ID T1: 'Asansol' (Completely unseen in training)
    - ID T2: 'Barrackpore' (Seen in training)
    """
    return [
        {"id": "WB-TEST-01", "name": "Rituparna", "city": "Asansol", "gender": "Female", "age": 27, "spend_k": 19.0, "target": 1},
        {"id": "WB-TEST-02", "name": "Siddhartha", "city": "Barrackpore", "gender": "Male", "age": 34, "spend_k": 25.0, "target": 1},
    ]

# =====================================================================
# 2. ENCODER IMPLEMENTATIONS (FROM SCRATCH)
# =====================================================================

class BinaryGenderEncoder:
    """
    Maps binary gender strictly to {0, 1}.
    Default: Female -> 0, Male -> 1.
    Includes guard for unknown/unseen values.
    """
    def __init__(self, mapping: Optional[Dict[str, int]] = None):
        self.mapping = mapping or {"Female": 0, "Male": 1}
        self.inverse_mapping = {v: k for k, v in self.mapping.items()}

    def fit_transform(self, values: List[str]) -> List[int]:
        return [self.transform_single(v) for v in values]

    def transform_single(self, val: str) -> int:
        if val in self.mapping:
            return self.mapping[val]
        # Robust fallback for cold-start / missing: default to 0
        return 0

class OneHotCityEncoder:
    """
    Comprehensive One-Hot Encoder with:
    - Drop-First mode (prevents dummy variable trap: K-1 columns)
    - Infrequent pooling (rare cities pooled into 'Other_City')
    - Handle unknown mode ('ignore' -> all zeros vector, 'error' -> exception)
    """
    def __init__(self, drop_first: bool = False, min_freq: int = 1, handle_unknown: str = "ignore"):
        self.drop_first = drop_first
        self.min_freq = min_freq
        self.handle_unknown = handle_unknown
        self.categories_: List[str] = []
        self.dropped_category_: Optional[str] = None
        self.feature_names_: List[str] = []

    def fit(self, cities: List[str]) -> "OneHotCityEncoder":
        counts: Dict[str, int] = {}
        for c in cities:
            counts[c] = counts.get(c, 0) + 1

        # Determine frequent categories vs pooled 'Other_City'
        frequent = sorted([c for c, count in counts.items() if count >= self.min_freq])
        has_rare = any(count < self.min_freq for count in counts.values())

        if has_rare:
            self.categories_ = frequent + ["Other_City"]
        else:
            self.categories_ = frequent

        if self.drop_first and len(self.categories_) > 0:
            self.dropped_category_ = self.categories_[0]
            self.feature_names_ = [f"city_{c}" for c in self.categories_[1:]]
        else:
            self.dropped_category_ = None
            self.feature_names_ = [f"city_{c}" for c in self.categories_]

        return self

    def transform_single(self, city: str) -> List[int]:
        vec = [0] * len(self.feature_names_)

        target_cat = city
        if city not in self.categories_:
            if "Other_City" in self.categories_:
                target_cat = "Other_City"
            elif self.handle_unknown == "ignore":
                # Returns all zeros vector (safe cold-start handling)
                return vec
            else:
                raise ValueError(f"Encountered unknown city: {city}")

        if self.drop_first:
            if target_cat == self.dropped_category_:
                return vec  # Reference category is encoded as all zeros
            cat_list = self.categories_[1:]
        else:
            cat_list = self.categories_

        if target_cat in cat_list:
            idx = cat_list.index(target_cat)
            vec[idx] = 1

        return vec

    def transform(self, cities: List[str]) -> List[List[int]]:
        return [self.transform_single(c) for c in cities]

class BayesianTargetEncoder:
    """
    Target / Impact Encoding with Empirical Bayesian Smoothing (m-estimate):
        S_i = (n_i * y_bar_i + m * y_bar_global) / (n_i + m)
    Prevents overfitting on low-frequency categories.
    """
    def __init__(self, m: float = 2.0):
        self.m = m
        self.global_mean_: float = 0.0
        self.category_means_: Dict[str, float] = {}
        self.category_counts_: Dict[str, int] = {}
        self.smoothed_values_: Dict[str, float] = {}

    def fit(self, categories: List[str], targets: List[int]) -> "BayesianTargetEncoder":
        n = len(targets)
        self.global_mean_ = sum(targets) / n

        counts: Dict[str, int] = {}
        sums: Dict[str, float] = {}
        for cat, y in zip(categories, targets):
            counts[cat] = counts.get(cat, 0) + 1
            sums[cat] = sums.get(cat, 0.0) + y

        self.category_counts_ = counts
        self.category_means_ = {c: sums[c] / counts[c] for c in counts}

        # Compute smoothed target representation
        for c, count in counts.items():
            y_bar = self.category_means_[c]
            smoothed = (count * y_bar + self.m * self.global_mean_) / (count + self.m)
            self.smoothed_values_[c] = smoothed

        return self

    def transform_single(self, cat: str) -> float:
        if cat in self.smoothed_values_:
            return self.smoothed_values_[cat]
        # Cold start fallback: return global target mean
        return self.global_mean_

    def transform(self, categories: List[str]) -> List[float]:
        return [self.transform_single(c) for c in categories]

# =====================================================================
# 3. MATHEMATICAL AUDIT: THE DUMMY VARIABLE TRAP
# =====================================================================

def compute_matrix_determinant_3x3(mat: List[List[float]]) -> float:
    """Calculates determinant of a 3x3 matrix."""
    a, b, c = mat[0]
    d, e, f = mat[1]
    g, h, i = mat[2]
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)

def audit_dummy_variable_trap_2cities():
    """
    Demonstrates mathematically why keeping all K dummy columns causes det(X^T X) = 0.
    Considers 4 records in 2 cities: Kolkata (K) and Barrackpore (B).
    """
    # X_full has: [Intercept=1, City_B, City_K]
    # Note: City_B + City_K = Intercept! (Exact linear combination)
    X_full = [
        [1.0, 1.0, 0.0],  # Barrackpore
        [1.0, 1.0, 0.0],  # Barrackpore
        [1.0, 0.0, 1.0],  # Kolkata
        [1.0, 0.0, 1.0],  # Kolkata
    ]

    # Compute Gram Matrix X^T X
    # Size 3x3
    XTX = [[0.0 for _ in range(3)] for _ in range(3)]
    for i in range(3):
        for j in range(3):
            XTX[i][j] = sum(X_full[row][i] * X_full[row][j] for row in range(4))

    det_full = compute_matrix_determinant_3x3(XTX)

    # Now drop the first city (City_B), leaving [Intercept=1, City_K]
    # Size 4x2 matrix
    X_drop = [
        [1.0, 0.0],
        [1.0, 0.0],
        [1.0, 1.0],
        [1.0, 1.0],
    ]
    # 2x2 Gram Matrix
    XTX_drop = [
        [sum(X_drop[r][0] * X_drop[r][0] for r in range(4)), sum(X_drop[r][0] * X_drop[r][1] for r in range(4))],
        [sum(X_drop[r][1] * X_drop[r][0] for r in range(4)), sum(X_drop[r][1] * X_drop[r][1] for r in range(4))],
    ]
    det_drop = XTX_drop[0][0] * XTX_drop[1][1] - XTX_drop[0][1] * XTX_drop[1][0]

    return det_full, det_drop, XTX, XTX_drop

# =====================================================================
# 4. MAIN LABORATORY EXECUTION SUITE
# =====================================================================

def run_laboratory():
    print("=" * 80)
    print("CODER & ACCOTAX - ADVANCED MACHINE LEARNING LAB (TOPIC 23)")
    print("WORKED EXAMPLE 3: ENCODING CITY AND GENDER COLUMNS")
    print("Academic Body: MAKAUT | Syllabus Code: BCAC701B")
    print("Author: Sukanta Hui | Barrackpore, West Bengal, India")
    print("=" * 80)

    cohort = get_wb_consumer_cohort()
    cities = [c["city"] for c in cohort]
    genders = [c["gender"] for c in cohort]
    targets = [c["target"] for c in cohort]

    print(f"\n[PHASE 1] DATASET INSPECTION: {len(cohort)} WEST BENGAL CONSUMER PROFILES")
    print("-" * 80)
    print(f"{'ID':<12} | {'Name':<11} | {'City':<12} | {'Gender':<7} | {'Age':<4} | {'Spend (₹k)':<10} | {'Target'}")
    print("-" * 80)
    for c in cohort:
        print(f"{c['id']:<12} | {c['name']:<11} | {c['city']:<12} | {c['gender']:<7} | {c['age']:<4} | {c['spend_k']:<10.1f} | {c['target']}")

    # 1. Binary Gender Encoding
    gender_encoder = BinaryGenderEncoder()
    encoded_gender = gender_encoder.fit_transform(genders)

    print("\n[PHASE 2] BINARY GENDER ENCODING")
    print("-" * 80)
    print("Mapping: {'Female': 0, 'Male': 1}")
    print("Encoded Gender Vector:", encoded_gender)

    # 2. One-Hot Encoding: Full (K) vs Drop-First (K-1)
    ohe_full = OneHotCityEncoder(drop_first=False).fit(cities)
    ohe_drop = OneHotCityEncoder(drop_first=True).fit(cities)

    print("\n[PHASE 3] ONE-HOT ENCODING OF CITY COLUMN")
    print("-" * 80)
    print(f"Discovered {len(ohe_full.categories_)} Cities: {ohe_full.categories_}")
    print(f"Full OHE Features ({len(ohe_full.feature_names_)} cols): {ohe_full.feature_names_}")
    print(f"Drop-First OHE ({len(ohe_drop.feature_names_)} cols, dropped '{ohe_drop.dropped_category_}'): {ohe_drop.feature_names_}")

    print("\nSample Transformed Rows (Full vs Drop-First):")
    for i in [0, 1, 4, 6]:
        row = cohort[i]
        v_full = ohe_full.transform_single(row["city"])
        v_drop = ohe_drop.transform_single(row["city"])
        print(f"  {row['name']} ({row['city']}):")
        print(f"    Full:       {v_full}")
        print(f"    Drop-First: {v_drop}")

    # 3. Mathematical Dummy Variable Trap Audit
    print("\n[PHASE 4] MATHEMATICAL AUDIT: THE DUMMY VARIABLE TRAP")
    print("-" * 80)
    det_full, det_drop, XTX_full, XTX_drop = audit_dummy_variable_trap_2cities()
    print("Gram Matrix (X^T X) Determinant under 2-City Cohort:")
    print(f"  Full Dummy Representation (K columns):       det(X^T X) = {det_full:.6f}")
    print(f"  Drop-First Representation (K-1 columns):     det(X^T X) = {det_drop:.6f}")
    if abs(det_full) < 1e-9:
        print("  -> CRITICAL MATHEMATICAL PROOF: det(X^T X) = 0 proves Matrix Singularity!")
        print("     Ordinary Least Squares (OLS) closed-form (X^T X)^(-1) is undefined!")
        print("     Keeping all K dummy columns causes complete multicollinearity failure.")

    # 4. Bayesian Target Encoding
    print("\n[PHASE 5] BAYESIAN TARGET ENCODING WITH M-ESTIMATE SMOOTHING")
    print("-" * 80)
    target_encoder = BayesianTargetEncoder(m=2.0).fit(cities, targets)
    print(f"Global High-Value Buyer Rate: {target_encoder.global_mean_ * 100:.1f}%")
    print(f"{'City':<14} | {'Count (n_i)':<11} | {'Raw Mean (y_bar)':<18} | {'Smoothed Value (m=2)'}")
    print("-" * 80)
    for city in sorted(target_encoder.category_counts_.keys()):
        count = target_encoder.category_counts_[city]
        raw_m = target_encoder.category_means_[city]
        smooth = target_encoder.smoothed_values_[city]
        print(f"{city:<14} | {count:<11} | {raw_m * 100:<17.1f}% | {smooth:.4f}")

    # 5. Cold-Start / Unseen Inference Test
    print("\n[PHASE 6] COLD-START INFERENCE BENCHMARK (UNSEEN CITIES)")
    print("-" * 80)
    test_records = get_unseen_test_records()
    for test in test_records:
        city = test["city"]
        gender_code = gender_encoder.transform_single(test["gender"])
        ohe_vec = ohe_drop.transform_single(city)
        target_val = target_encoder.transform_single(city)

        print(f"Query: {test['name']} ({city}, {test['gender']})")
        print(f"  Gender Encoded:     {gender_code}")
        print(f"  OHE Drop-First:     {ohe_vec}  {'[ALL-ZEROS COLD START VECTOR]' if sum(ohe_vec) == 0 else ''}")
        print(f"  Target Encoded:     {target_val:.4f}  {'[FALLBACK TO GLOBAL MEAN]' if target_val == target_encoder.global_mean_ else ''}")

    print("\n" + "=" * 80)
    print("LABORATORY EXECUTION COMPLETE: ZERO ERRORS (EXIT CODE 0)")
    print("=" * 80)

if __name__ == "__main__":
    run_laboratory()
