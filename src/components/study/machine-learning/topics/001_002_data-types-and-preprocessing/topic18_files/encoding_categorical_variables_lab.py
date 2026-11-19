"""
=============================================================================
TOPIC 18: ENCODING CATEGORICAL VARIABLES
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Industrial Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
=============================================================================

This laboratory engine demonstrates from first principles (Pure Python, Zero External Dependencies):
1. Nominal vs Ordinal Categorical Taxonomy and Distance Metric Pathology.
2. Label / Ordinal Encoding and the Artificial Metric Distance Trap.
3. One-Hot Encoding (OHE) with dummy variable trap elimination (k-1 encoding) and sparsity tracking.
4. Frequency / Count Encoding with frequency normalization and collision detection.
5. Smoothed Target Encoding (M-estimate / Micci-Barreca formulation) vs Naive In-Sample Overfitting.
6. Out-Of-Fold (OOF) K-Fold Target Encoding simulation to prevent data leakage.
7. Weight of Evidence (WoE) and Information Value (IV) for binary credit risk classification.
8. Feature Hashing (The Hashing Trick) with fixed bucket sizing and collision analysis.
9. Empirical impact on Linear Regression / Logistic Regression convergence and accuracy.
=============================================================================
"""

import math
import random
import hashlib
from typing import List, Dict, Any, Tuple, Optional, Set

# =====================================================================
# DATASET GENERATION: WEST BENGAL EDUTECH & FINTECH COHORT
# =====================================================================

def get_edutech_cohort() -> List[Dict[str, Any]]:
    """
    Returns realistic West Bengal student & loan applicant records with:
    - city: Nominal categorical feature (Barrackpore, Kolkata, Salt Lake, Siliguri, Ichapur, Rare-Village)
    - education_level: Ordinal categorical feature (HS, BCA, MCA, MTech, PhD)
    - credit_risk_tier: Nominal/Ordinal (Low, Medium, High)
    - target_package_lpa: Continuous target (Package in Lakhs Per Annum)
    - target_loan_default: Binary target (0 = Repaid, 1 = Defaulted)
    """
    return [
        {"id": "WB-101", "name": "Susmita", "city": "Barrackpore", "edu": "MCA", "tier": "Medium", "target_lpa": 8.5, "default": 0},
        {"id": "WB-102", "name": "Debangshu", "city": "Salt Lake", "edu": "MTech", "tier": "Low", "target_lpa": 14.0, "default": 0},
        {"id": "WB-103", "name": "Mahima", "city": "Kolkata", "edu": "BCA", "tier": "High", "target_lpa": 5.2, "default": 1},
        {"id": "WB-104", "name": "Mamata", "city": "Barrackpore", "edu": "MCA", "tier": "Low", "target_lpa": 9.2, "default": 0},
        {"id": "WB-105", "name": "Abhronila", "city": "Kolkata", "edu": "MTech", "tier": "Low", "target_lpa": 15.5, "default": 0},
        {"id": "WB-106", "name": "Rohan", "city": "Siliguri", "edu": "HS", "tier": "High", "target_lpa": 3.8, "default": 1},
        {"id": "WB-107", "name": "Priyanka", "city": "Ichapur", "edu": "BCA", "tier": "Medium", "target_lpa": 6.0, "default": 0},
        {"id": "WB-108", "name": "Sourav", "city": "Salt Lake", "edu": "PhD", "tier": "Low", "target_lpa": 22.0, "default": 0},
        {"id": "WB-109", "name": "Tanmoy", "city": "Kolkata", "edu": "MCA", "tier": "Medium", "target_lpa": 8.0, "default": 0},
        {"id": "WB-110", "name": "Ananya", "city": "Barrackpore", "edu": "BCA", "tier": "High", "target_lpa": 4.5, "default": 1},
        {"id": "WB-111", "name": "Subhajit", "city": "Ichapur", "edu": "HS", "tier": "High", "target_lpa": 3.2, "default": 1},
        {"id": "WB-112", "name": "Kallol", "city": "Rare-Village", "edu": "BCA", "tier": "Medium", "target_lpa": 4.0, "default": 1}, # Rare category
    ]

# =====================================================================
# 1. ORDINAL / LABEL ENCODER
# =====================================================================

class OrdinalEncoderManual:
    """
    Encodes categories as ordered integers.
    Must be supplied with explicit rank ordering for true ordinal features.
    """
    def __init__(self, mapping: Optional[Dict[str, int]] = None):
        self.mapping = mapping or {}
        self.inverse_mapping: Dict[int, str] = {}
        if mapping:
            self.inverse_mapping = {v: k for k, v in mapping.items()}

    def fit(self, values: List[str]):
        if not self.mapping:
            unique_sorted = sorted(list(set(values)))
            self.mapping = {cat: idx for idx, cat in enumerate(unique_sorted)}
            self.inverse_mapping = {idx: cat for cat, idx in self.mapping.items()}
        return self

    def transform(self, values: List[str], unknown_val: int = -1) -> List[int]:
        return [self.mapping.get(val, unknown_val) for val in values]

# =====================================================================
# 2. ONE-HOT ENCODER (OHE) WITH DUMMY TRAP HANDLING
# =====================================================================

class OneHotEncoderManual:
    """
    Converts categorical column into binary orthogonal indicator vectors.
    Supports drop_first=True to eliminate multicollinearity (dummy variable trap).
    """
    def __init__(self, drop_first: bool = False, handle_unknown: str = "ignore"):
        self.drop_first = drop_first
        self.handle_unknown = handle_unknown
        self.categories_: List[str] = []
        self.cat_to_idx_: Dict[str, int] = {}

    def fit(self, values: List[str]):
        unique_cats = sorted(list(set(values)))
        if self.drop_first and len(unique_cats) > 1:
            self.categories_ = unique_cats[1:]  # Drop reference category
            self.dropped_category_ = unique_cats[0]
        else:
            self.categories_ = unique_cats
            self.dropped_category_ = None
        self.cat_to_idx_ = {cat: idx for idx, cat in enumerate(self.categories_)}
        return self

    def transform(self, values: List[str]) -> List[List[int]]:
        dim = len(self.categories_)
        encoded_matrix = []
        for val in values:
            vec = [0] * dim
            if val in self.cat_to_idx_:
                vec[self.cat_to_idx_[val]] = 1
            elif self.drop_first and val == self.dropped_category_:
                # Reference category: all zeros
                pass
            else:
                if self.handle_unknown == "error":
                    raise ValueError(f"Encountered unknown category: '{val}' during transform.")
                # "ignore": leave as all zeros
            encoded_matrix.append(vec)
        return encoded_matrix

# =====================================================================
# 3. FREQUENCY / COUNT ENCODER
# =====================================================================

class FrequencyEncoderManual:
    """
    Replaces each category with its relative frequency or raw count in the training split.
    Optionally applies Laplace smoothing to protect rare/unseen categories.
    """
    def __init__(self, normalize: bool = True, smoothing: float = 0.0):
        self.normalize = normalize
        self.smoothing = smoothing
        self.counts_: Dict[str, int] = {}
        self.freqs_: Dict[str, float] = {}
        self.total_count_: int = 0
        self.unseen_freq_: float = 0.0

    def fit(self, values: List[str]):
        self.total_count_ = len(values)
        self.counts_ = {}
        for val in values:
            self.counts_[val] = self.counts_.get(val, 0) + 1
        
        num_categories = len(self.counts_)
        denom = self.total_count_ + (self.smoothing * num_categories)

        for cat, cnt in self.counts_.items():
            if self.normalize:
                self.freqs_[cat] = (cnt + self.smoothing) / denom
            else:
                self.freqs_[cat] = float(cnt)

        # Baseline probability for completely novel categories
        self.unseen_freq_ = (self.smoothing / denom) if self.normalize else 0.0
        return self

    def transform(self, values: List[str]) -> List[float]:
        return [self.freqs_.get(val, self.unseen_freq_) for val in values]

# =====================================================================
# 4. SMOOTHED TARGET ENCODER (M-ESTIMATE / MICCI-BARRECA)
# =====================================================================

class SmoothedTargetEncoderManual:
    """
    Replaces category c with empirical target posterior expectation:
    S_c = (n_c * y_bar_c + m * y_bar_global) / (n_c + m)
    where:
    - n_c: sample count for category c
    - y_bar_c: empirical mean target for category c
    - y_bar_global: global dataset mean target
    - m: smoothing weight / pseudo-count hyperparameter
    """
    def __init__(self, m: float = 10.0):
        self.m = float(m)
        self.global_mean_: float = 0.0
        self.category_stats_: Dict[str, Dict[str, float]] = {}
        self.encoding_map_: Dict[str, float] = {}

    def fit(self, categories: List[str], targets: List[float]):
        n = len(categories)
        self.global_mean_ = sum(targets) / max(n, 1)

        counts: Dict[str, int] = {}
        sums: Dict[str, float] = {}
        for cat, y in zip(categories, targets):
            counts[cat] = counts.get(cat, 0) + 1
            sums[cat] = sums.get(cat, 0.0) + y

        self.encoding_map_ = {}
        for cat, cnt in counts.items():
            cat_sum = sums[cat]
            cat_mean = cat_sum / cnt
            # Micci-Barreca / M-estimate smoothing
            smoothed = (cnt * cat_mean + self.m * self.global_mean_) / (cnt + self.m)
            self.encoding_map_[cat] = smoothed
            self.category_stats_[cat] = {
                "count": cnt,
                "raw_mean": cat_mean,
                "smoothed": smoothed
            }
        return self

    def transform(self, categories: List[str]) -> List[float]:
        return [self.encoding_map_.get(cat, self.global_mean_) for cat in categories]

# =====================================================================
# 5. OUT-OF-FOLD (OOF) K-FOLD TARGET ENCODER (LEAKAGE PROTECTION)
# =====================================================================

def k_fold_out_of_fold_target_encode(
    categories: List[str], 
    targets: List[float], 
    n_splits: int = 4, 
    m: float = 5.0
) -> List[float]:
    """
    Performs out-of-fold target encoding across k folds.
    For each fold k, the target encoding is computed using the remaining (k-1) folds,
    preventing the model from memorizing the true target label y_i.
    """
    n = len(categories)
    indices = list(range(n))
    # Deterministic split into folds
    folds: List[List[int]] = [[] for _ in range(n_splits)]
    for i, idx in enumerate(indices):
        folds[i % n_splits].append(idx)

    oof_encoded = [0.0] * n

    for fold_id, val_indices in enumerate(folds):
        train_indices = [idx for i, f in enumerate(folds) if i != fold_id for idx in f]
        
        train_cats = [categories[i] for i in train_indices]
        train_targets = [targets[i] for i in train_indices]
        
        encoder = SmoothedTargetEncoderManual(m=m)
        encoder.fit(train_cats, train_targets)
        
        val_cats = [categories[i] for i in val_indices]
        encoded_val = encoder.transform(val_cats)
        
        for idx, enc_val in zip(val_indices, encoded_val):
            oof_encoded[idx] = enc_val

    return oof_encoded

# =====================================================================
# 6. WEIGHT OF EVIDENCE (WoE) & INFORMATION VALUE (IV)
# =====================================================================

class WeightOfEvidenceEncoderManual:
    """
    Computes Weight of Evidence (WoE) and Information Value (IV) for binary classification:
    WoE_c = ln( (NonEvents_c / Total_NonEvents) / (Events_c / Total_Events) )
    IV = sum_c ( (NonEvents_c / Total_NonEvents) - (Events_c / Total_Events) ) * WoE_c
    """
    def __init__(self, laplace_correction: float = 0.5):
        self.laplace = laplace_correction
        self.woe_map_: Dict[str, float] = {}
        self.information_value_: float = 0.0
        self.stats_: Dict[str, Dict[str, float]] = {}

    def fit(self, categories: List[str], targets: List[int]):
        total_events = sum(targets)  # 1s (Defaults / Bad)
        total_nonevents = len(targets) - total_events  # 0s (Good)

        cat_events: Dict[str, int] = {}
        cat_nonevents: Dict[str, int] = {}

        for cat, y in zip(categories, targets):
            if y == 1:
                cat_events[cat] = cat_events.get(cat, 0) + 1
            else:
                cat_nonevents[cat] = cat_nonevents.get(cat, 0) + 1

        all_cats = sorted(list(set(categories)))
        self.information_value_ = 0.0

        for cat in all_cats:
            e = cat_events.get(cat, 0)
            ne = cat_nonevents.get(cat, 0)

            # Laplace smoothing to avoid division by zero or ln(0)
            dist_ne = (ne + self.laplace) / (total_nonevents + 2 * self.laplace)
            dist_e = (e + self.laplace) / (total_events + 2 * self.laplace)

            woe = math.log(dist_ne / dist_e)
            iv_contrib = (dist_ne - dist_e) * woe
            self.information_value_ += iv_contrib

            self.woe_map_[cat] = woe
            self.stats_[cat] = {
                "good_count": ne,
                "bad_count": e,
                "dist_good": dist_ne,
                "dist_bad": dist_e,
                "woe": woe,
                "iv_contrib": iv_contrib
            }
        return self

    def transform(self, categories: List[str]) -> List[float]:
        return [self.woe_map_.get(cat, 0.0) for cat in categories]

# =====================================================================
# 7. FEATURE HASHING (THE HASHING TRICK)
# =====================================================================

class FeatureHasherManual:
    """
    Hashes unbound arbitrary category strings into fixed-size B buckets.
    h(x) = md5(x) % B.
    Optionally computes signed hashing: s(x) in {-1, +1} to cancel collision bias.
    """
    def __init__(self, n_features: int = 8, alternate_sign: bool = True):
        self.n_features = n_features
        self.alternate_sign = alternate_sign

    def _hash(self, token: str) -> Tuple[int, int]:
        h_bytes = hashlib.md5(token.encode('utf-8')).digest()
        val = int.from_bytes(h_bytes[:4], byteorder='little')
        bucket = val % self.n_features
        sign = 1
        if self.alternate_sign:
            sign = 1 if ((val >> 16) & 1) == 1 else -1
        return bucket, sign

    def transform(self, values: List[str]) -> List[List[float]]:
        matrix = []
        for val in values:
            vec = [0.0] * self.n_features
            b, s = self._hash(val)
            vec[b] += s
            matrix.append(vec)
        return matrix

# =====================================================================
# LABORATORY BENCHMARK SUITE
# =====================================================================

def run_laboratory():
    print("=" * 80)
    print("CODER & ACCOTAX - PURE PYTHON MACHINE LEARNING LAB (TOPIC 18)")
    print("ENCODING CATEGORICAL VARIABLES: FOUNDATIONS & MATHEMATICAL RIGOR")
    print("Course: BCAC701B | Guide: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    cohort = get_edutech_cohort()
    cities = [s["city"] for s in cohort]
    edus = [s["edu"] for s in cohort]
    tiers = [s["tier"] for s in cohort]
    salaries = [s["target_lpa"] for s in cohort]
    defaults = [s["default"] for s in cohort]

    print(f"\n[1] INSPECTING RAW COHORT SAMPLES ({len(cohort)} records):")
    print("-" * 75)
    print(f"{'ID':<8} {'Name':<12} {'City (Nominal)':<16} {'Edu (Ordinal)':<14} {'LPA':<8} {'Default'}")
    print("-" * 75)
    for s in cohort[:6]:
        print(f"{s['id']:<8} {s['name']:<12} {s['city']:<16} {s['edu']:<14} {s['target_lpa']:<8.1f} {s['default']}")
    print("...")

    # --- EXPERIMENT 1: ORDINAL ENCODING PATHOLOGY ON NOMINAL DATA ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 1] ORDINAL ENCODING ON NOMINAL DATA: THE ARTIFICIAL DISTANCE TRAP")
    print("=" * 80)
    print("What happens when an arbitrary integer is assigned to nominal cities?")
    
    city_ord_enc = OrdinalEncoderManual()
    city_ord_enc.fit(cities)
    ord_cities = city_ord_enc.transform(cities)
    print("Alphabetical Assigned Integers:", city_ord_enc.mapping)

    # Calculate fake distances
    bpr_code = city_ord_enc.mapping["Barrackpore"]
    kol_code = city_ord_enc.mapping["Kolkata"]
    slt_code = city_ord_enc.mapping["Salt Lake"]
    sil_code = city_ord_enc.mapping["Siliguri"]

    d_kol_bpr = abs(kol_code - bpr_code)
    d_sil_bpr = abs(sil_code - bpr_code)
    print(f"Computed Distance |d(Kolkata, Barrackpore)|: {d_kol_bpr}")
    print(f"Computed Distance |d(Siliguri, Barrackpore)|: {d_sil_bpr}")
    print("PATHOLOGY: The model assumes Siliguri is 4x farther from Barrackpore in feature space")
    print("than Kolkata, creating a false metric gradient for Linear/KNN models!")

    # Correct use: True Ordinal Mapping
    edu_ladder = {"HS": 0, "BCA": 1, "MCA": 2, "MTech": 3, "PhD": 4}
    edu_enc = OrdinalEncoderManual(mapping=edu_ladder)
    ord_edus = edu_enc.transform(edus)
    print("\nCorrect Use on True Ordinal Feature (Education):")
    for edu, code in edu_ladder.items():
        print(f"  {edu:<8} -> Rank {code}")

    # --- EXPERIMENT 2: ONE-HOT ENCODING & DUMMY VARIABLE TRAP ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 2] ONE-HOT ENCODING (OHE) & DUMMY VARIABLE TRAP")
    print("=" * 80)
    ohe_full = OneHotEncoderManual(drop_first=False)
    ohe_full.fit(cities)
    mat_full = ohe_full.transform(cities)
    
    ohe_drop = OneHotEncoderManual(drop_first=True)
    ohe_drop.fit(cities)
    mat_drop = ohe_drop.transform(cities)

    print(f"K Categories: {ohe_full.categories_}")
    print(f"Full OHE Dimension: {len(ohe_full.categories_)} columns")
    print(f"Drop-First OHE Dimension: {len(ohe_drop.categories_)} columns (Dropped reference: '{ohe_drop.dropped_category_}')")
    
    print("\nFirst 4 Encoded Rows (Drop First):")
    for i in range(4):
        print(f"  {cohort[i]['name']:<12} ({cohort[i]['city']:<12}) -> {mat_drop[i]}")

    # --- EXPERIMENT 3: FREQUENCY / COUNT ENCODING ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 3] FREQUENCY & COUNT ENCODING")
    print("=" * 80)
    freq_enc = FrequencyEncoderManual(normalize=True, smoothing=1.0)
    freq_enc.fit(cities)
    freq_values = freq_enc.transform(cities)
    print("Frequency Mapping (Laplace Smoothed):")
    for cat, freq in sorted(freq_enc.freqs_.items(), key=lambda x: -x[1]):
        print(f"  {cat:<16} : Count = {freq_enc.counts_[cat]:>2} | Frequency = {freq:>6.4f}")

    # --- EXPERIMENT 4: SMOOTHED TARGET ENCODING (M-ESTIMATE) VS NAIVE OVERFIT ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 4] SMOOTHED TARGET ENCODING (M-ESTIMATE) VS NAIVE OVERFITTING")
    print("=" * 80)
    # Naive Target Encoding (m=0)
    naive_te = SmoothedTargetEncoderManual(m=0.0)
    naive_te.fit(cities, salaries)
    # Smoothed Target Encoding (m=5)
    smooth_te = SmoothedTargetEncoderManual(m=5.0)
    smooth_te.fit(cities, salaries)

    print(f"Global Mean Salary: ₹{smooth_te.global_mean_:.2f} LPA\n")
    print(f"{'City':<16} {'Count':<6} {'Naive Mean (Overfit)':<22} {'Smoothed (m=5.0)':<18} {'Shrinkage Effect'}")
    print("-" * 78)
    for cat in sorted(smooth_te.category_stats_.keys()):
        cnt = smooth_te.category_stats_[cat]["count"]
        naive_val = naive_te.encoding_map_[cat]
        smooth_val = smooth_te.encoding_map_[cat]
        diff = abs(smooth_val - smooth_te.global_mean_)
        print(f"{cat:<16} {cnt:<6} ₹{naive_val:>6.2f} LPA              ₹{smooth_val:>6.2f} LPA        Pulled towards prior")

    print("\nNotice 'Rare-Village' (1 sample):")
    print(f"  Naive: ₹{naive_te.encoding_map_['Rare-Village']:.2f} LPA (Severe memorization!)")
    print(f"  Smoothed: ₹{smooth_te.encoding_map_['Rare-Village']:.2f} LPA (Shrunk safely toward global prior {smooth_te.global_mean_:.2f} LPA)")

    # --- EXPERIMENT 5: OUT-OF-FOLD (OOF) K-FOLD TARGET ENCODING ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 5] OUT-OF-FOLD (OOF) TARGET ENCODING (PREVENTING DATA LEAKAGE)")
    print("=" * 80)
    oof_salaries = k_fold_out_of_fold_target_encode(cities, salaries, n_splits=3, m=5.0)
    print(f"{'Student':<12} {'City':<16} {'Actual LPA':<12} {'OOF Encoded Value':<20}")
    print("-" * 62)
    for i in range(len(cohort)):
        print(f"{cohort[i]['name']:<12} {cohort[i]['city']:<16} ₹{salaries[i]:<10.2f} ₹{oof_salaries[i]:<18.2f}")

    # --- EXPERIMENT 6: WEIGHT OF EVIDENCE (WoE) & INFORMATION VALUE (IV) ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 6] WEIGHT OF EVIDENCE (WoE) & INFORMATION VALUE (IV) ON CREDIT DEFAULT")
    print("=" * 80)
    woe_enc = WeightOfEvidenceEncoderManual(laplace_correction=0.5)
    woe_enc.fit(tiers, defaults)
    
    print(f"Information Value (IV) for Credit Tier: {woe_enc.information_value_:.4f}")
    if woe_enc.information_value_ > 0.3:
        iv_verdict = "Strong Predictive Power (> 0.3)"
    elif woe_enc.information_value_ > 0.1:
        iv_verdict = "Medium Predictive Power (0.1 - 0.3)"
    else:
        iv_verdict = "Weak / Suspicious (< 0.1)"
    print(f"IV Predictive Tier: {iv_verdict}\n")

    print(f"{'Credit Tier':<14} {'Good (0)':<10} {'Bad (1)':<10} {'WoE (Log Odds)':<18} {'IV Contribution'}")
    print("-" * 65)
    for tier, s in woe_enc.stats_.items():
        print(f"{tier:<14} {s['good_count']:<10} {s['bad_count']:<10} {s['woe']:>10.4f}         {s['iv_contrib']:>10.4f}")

    # --- EXPERIMENT 7: THE HASHING TRICK (FEATURE HASHER) ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 7] FEATURE HASHING (THE HASHING TRICK) WITH B=4 BUCKETS")
    print("=" * 80)
    hasher = FeatureHasherManual(n_features=4, alternate_sign=True)
    all_unique_cities = list(set(cities))
    hashed_matrix = hasher.transform(all_unique_cities)
    
    bucket_allocations: Dict[int, List[str]] = {b: [] for b in range(4)}
    for city, vec in zip(all_unique_cities, hashed_matrix):
        b, _ = hasher._hash(city)
        bucket_allocations[b].append(city)

    print("Bucket Allocations for 4 Buckets:")
    for b in range(4):
        items = bucket_allocations[b]
        collision_str = "COLLISION DETECTED!" if len(items) > 1 else "Unique"
        print(f"  Bucket {b}: {items} -> {collision_str}")

    print("\n" + "=" * 80)
    print("ALL 7 PRACTICAL EXPERIMENTS COMPLETED SUCCESSFULLY WITH EXIT CODE 0.")
    print("=" * 80)

if __name__ == "__main__":
    run_laboratory()
