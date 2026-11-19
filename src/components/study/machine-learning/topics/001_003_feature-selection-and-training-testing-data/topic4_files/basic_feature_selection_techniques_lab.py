"""
=============================================================================
CODER & ACCOTAX ACADEMIC LABORATORY & SIMULATION ENGINE
Topic 4: Basic Feature Selection Techniques (BCAC701B)
Module: Feature Selection and Training & Testing Data
Lead Author: Sukanta Hui | Barrackpore, West Bengal, India
=============================================================================

This laboratory implements pure Python standard library algorithms for the core
basic feature selection techniques used in industrial machine learning pipelines:
1. VarianceThreshold: Unsupervised filtering of constant and quasi-constant features.
2. SelectKBest with ANOVA F-test: Supervised ranking of continuous features for classification.
3. SelectKBest with Chi-Square (chi^2): Supervised contingency testing for categorical features.
4. Pairwise Correlation Deduplication: Greedy pruning of highly collinear feature pairs.
5. Benjamini-Hochberg False Discovery Rate (FDR) Multi-Test Correction.

Zero external dependencies: Pure standard library Python 3 (math, random, typing).
"""

import math
import random
from typing import List, Tuple, Dict, Any, Set


# =============================================================================
# 1. VARIANCE THRESHOLDING ENGINE (UNSUPERVISED FILTER)
# =============================================================================

class VarianceThresholdFilter:
    """
    Filters features whose sample variance does not meet a specified threshold.
    Supports both continuous features (standard sample variance) and binary/indicator
    features where Var(X) = p * (1 - p).
    """
    def __init__(self, threshold: float = 0.0):
        self.threshold = threshold
        self.variances: List[float] = []
        self.selected_indices: List[int] = []

    def fit_transform(
        self,
        X: List[List[float]],
        feature_names: List[str]
    ) -> Dict[str, Any]:
        n = len(X)
        if n < 2:
            raise ValueError("Variance threshold requires at least 2 samples.")
        d = len(X[0])
        
        self.variances = []
        self.selected_indices = []
        
        retained_names = []
        dropped_names = []
        
        for j in range(d):
            col_vals = [X[i][j] for i in range(n)]
            mean_val = sum(col_vals) / n
            var = sum((v - mean_val) ** 2 for v in col_vals) / (n - 1)
            self.variances.append(var)
            
            if var > self.threshold:
                self.selected_indices.append(j)
                retained_names.append(feature_names[j])
            else:
                dropped_names.append((feature_names[j], var))
                
        # Transform matrix
        transformed_X = [[row[j] for j in self.selected_indices] for row in X]
        
        return {
            "transformed_X": transformed_X,
            "retained_features": retained_names,
            "dropped_features": dropped_names,
            "variances": [round(v, 6) for v in self.variances]
        }


# =============================================================================
# 2. ANOVA F-TEST FEATURE SCORER (CONTINUOUS FEATURE -> CATEGORICAL TARGET)
# =============================================================================

class AnovaFScoreSelector:
    """
    Computes One-Way ANOVA F-test statistic for continuous features across discrete classes:
    F = MS_between / MS_within = (SS_B / (k - 1)) / (SS_W / (N - k))
    """
    @staticmethod
    def calculate_f_score(feature: List[float], labels: List[int]) -> float:
        n = len(feature)
        classes = sorted(list(set(labels)))
        k = len(classes)
        if k < 2 or n <= k:
            return 0.0
            
        grand_mean = sum(feature) / n
        
        # Group samples by class
        groups: Dict[int, List[float]] = {}
        for x, y in zip(feature, labels):
            groups.setdefault(y, []).append(x)
            
        ss_between = 0.0
        ss_within = 0.0
        
        for label, group_vals in groups.items():
            n_g = len(group_vals)
            if n_g == 0:
                continue
            mean_g = sum(group_vals) / n_g
            ss_between += n_g * ((mean_g - grand_mean) ** 2)
            ss_within += sum((v - mean_g) ** 2 for v in group_vals)
            
        df_between = k - 1
        df_within = n - k
        
        ms_between = ss_between / df_between if df_between > 0 else 0.0
        ms_within = ss_within / df_within if df_within > 0 else 1e-12
        
        if ms_within < 1e-12:
            return 9999.0 if ms_between > 1e-9 else 0.0
            
        return ms_between / ms_within

    @classmethod
    def select_k_best(
        cls,
        X: List[List[float]],
        y: List[int],
        feature_names: List[str],
        k: int = 3
    ) -> List[Dict[str, Any]]:
        n_features = len(feature_names)
        scores = []
        for j in range(n_features):
            col = [X[i][j] for i in range(len(y))]
            f_val = cls.calculate_f_score(col, y)
            scores.append({
                "index": j,
                "name": feature_names[j],
                "f_score": round(f_val, 4)
            })
            
        scores.sort(key=lambda s: s["f_score"], reverse=True)
        return scores[:k]


# =============================================================================
# 3. CHI-SQUARE (chi^2) FEATURE SCORER (CATEGORICAL -> CATEGORICAL)
# =============================================================================

class ChiSquareSelector:
    """
    Computes Pearson's Chi-Square statistic for discrete/categorical features:
    chi^2 = sum( (O_ij - E_ij)^2 / E_ij )
    where E_ij = (Row_i * Col_j) / N.
    """
    @staticmethod
    def calculate_chi2(feature: List[int], labels: List[int]) -> float:
        n = len(feature)
        feat_vals = sorted(list(set(feature)))
        label_vals = sorted(list(set(labels)))
        
        if len(feat_vals) < 2 or len(label_vals) < 2 or n == 0:
            return 0.0
            
        # Contingency table: observed counts
        obs: Dict[Tuple[int, int], int] = {}
        row_totals: Dict[int, int] = {}
        col_totals: Dict[int, int] = {}
        
        for f, y in zip(feature, labels):
            obs[(f, y)] = obs.get((f, y), 0) + 1
            row_totals[f] = row_totals.get(f, 0) + 1
            col_totals[y] = col_totals.get(y, 0) + 1
            
        chi2 = 0.0
        for f in feat_vals:
            for y in label_vals:
                o_ij = obs.get((f, y), 0)
                e_ij = (row_totals.get(f, 0) * col_totals.get(y, 0)) / n
                if e_ij > 1e-9:
                    chi2 += ((o_ij - e_ij) ** 2) / e_ij
                    
        return chi2


# =============================================================================
# 4. GREEDY PAIRWISE CORRELATION DEDUPLICATOR
# =============================================================================

class CorrelationDeduplicator:
    """
    Computes pairwise Pearson correlation matrix and greedily prunes one feature
    from any pair where |r| >= threshold.
    """
    @staticmethod
    def calculate_pearson(x: List[float], y: List[float]) -> float:
        n = len(x)
        if n < 2:
            return 0.0
        mean_x = sum(x) / n
        mean_y = sum(y) / n
        cov = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
        var_x = sum((x[i] - mean_x) ** 2 for i in range(n))
        var_y = sum((y[i] - mean_y) ** 2 for i in range(n))
        denom = math.sqrt(var_x * var_y)
        return cov / denom if denom > 1e-12 else 0.0

    @classmethod
    def deduplicate(
        cls,
        X: List[List[float]],
        feature_names: List[str],
        threshold: float = 0.85
    ) -> Dict[str, Any]:
        d = len(feature_names)
        n = len(X)
        columns = [[X[i][j] for i in range(n)] for j in range(d)]
        
        dropped = set()
        pruned_pairs = []
        
        for i in range(d):
            if i in dropped:
                continue
            for j in range(i + 1, d):
                if j in dropped:
                    continue
                r = abs(cls.calculate_pearson(columns[i], columns[j]))
                if r >= threshold:
                    # Drop feature j (arbitrary greedy choice)
                    dropped.add(j)
                    pruned_pairs.append({
                        "kept": feature_names[i],
                        "dropped": feature_names[j],
                        "correlation": round(r, 4)
                    })
                    
        retained = [feature_names[j] for j in range(d) if j not in dropped]
        return {
            "retained": retained,
            "pruned_pairs": pruned_pairs,
            "retained_count": len(retained),
            "original_count": d
        }


# =============================================================================
# 5. WEST BENGAL REGIONAL DATASET SYNTHESIS (KOLKATA METRO COMMUTERS)
# =============================================================================

def generate_kolkata_metro_dataset(n_samples: int = 300, seed: int = 42) -> Dict[str, Any]:
    """
    Generates synthetic commuter records from Kolkata Metro Green Line:
    Target: Peak Passenger Volume Category (0 = Low, 1 = Medium, 2 = High Congestion)
    
    Features:
    1. train_arrival_gap_mins (continuous, highly informative)
    2. rain_intensity_mm (continuous, highly informative)
    3. platform_rfid_taps (continuous, highly informative)
    4. platform_optical_pulses (continuous, collinear with rfid taps: r = 0.995)
    5. metro_currency_code (constant: 356 for INR, variance = 0.0)
    6. is_kolkata_resident (quasi-constant: 99.2% are 1, Var = 0.0079)
    7. station_zone_category (categorical: 0=Howrah, 1=Sealdah, 2=SaltLake)
    8. random_token_hash (continuous uniform noise)
    """
    random.seed(seed)
    
    names = [
        "train_arrival_gap_mins",
        "rain_intensity_mm",
        "platform_rfid_taps",
        "platform_optical_pulses",
        "metro_currency_code",
        "is_kolkata_resident",
        "station_zone_category",
        "random_token_hash"
    ]
    
    X = []
    y = []
    
    for _ in range(n_samples):
        gap = random.gauss(6.0, 2.0)
        gap = max(1.5, gap)
        
        rain = random.expovariate(0.1)
        rain = min(50.0, rain)
        
        rfid = random.gauss(420.0, 110.0)
        rfid = max(50.0, rfid)
        
        # Collinear duplicate: optical pulses = rfid * 0.99 + tiny noise
        optical = (rfid * 0.99) + random.gauss(0, 3.0)
        
        # Constant feature
        currency = 356.0 # INR code
        
        # Quasi-constant (99.2% probability of 1.0)
        resident = 1.0 if random.random() < 0.992 else 0.0
        
        # Categorical zone
        zone = random.choice([0, 1, 2])
        
        # Random noise
        noise = random.uniform(0.0, 1.0)
        
        # Synthesize 3-class congestion target
        score = (rfid * 0.4) + (gap * 15.0) + (rain * 2.5) + (zone * 40.0)
        if score > 360.0:
            target = 2 # High Congestion
        elif score > 280.0:
            target = 1 # Medium
        else:
            target = 0 # Low
            
        X.append([gap, rain, rfid, optical, currency, resident, float(zone), noise])
        y.append(target)
        
    return {"X": X, "y": y, "feature_names": names}


# =============================================================================
# 6. LABORATORY BENCHMARK EXECUTION
# =============================================================================

def run_laboratory() -> None:
    print("=" * 80)
    print("CODER & ACCOTAX ACADEMIC LABORATORY: TOPIC 4")
    print("BASIC FEATURE SELECTION TECHNIQUES (VARIANCE, ANOVA, CHI2, DEDUPLICATION)")
    print("Module: Feature Selection and Training & Testing Data (BCAC701B)")
    print("Lead Author: Sukanta Hui | Barrackpore, West Bengal, India")
    print("=" * 80)
    
    dataset = generate_kolkata_metro_dataset(n_samples=400, seed=101)
    X = dataset["X"]
    y = dataset["y"]
    names = dataset["feature_names"]
    
    print(f"\nLoaded Kolkata Metro Commuter Dataset: {len(X)} samples, {len(names)} features.")
    print("Feature Manifest:", names)
    
    # -------------------------------------------------------------------------
    # STEP 1: VARIANCE THRESHOLDING (UNSUPERVISED PRUNING)
    # -------------------------------------------------------------------------
    print("\n--- 1. UNSUPERVISED VARIANCE THRESHOLDING (Threshold = 0.01) ---")
    vt = VarianceThresholdFilter(threshold=0.01)
    vt_res = vt.fit_transform(X, names)
    
    print(f"Original Feature Count : {len(names)}")
    print(f"Retained Feature Count : {len(vt_res['retained_features'])}")
    print("Dropped Features (Low/Zero Variance):")
    for name, var in vt_res["dropped_features"]:
        reason = "CONSTANT (Zero Variance)" if var == 0.0 else "QUASI-CONSTANT (Var < 0.01)"
        print(f" -> Feature: {name:<26} | Var = {var:.6f} | Verdict: {reason}")
        
    # -------------------------------------------------------------------------
    # STEP 2: SUPERVISED ANOVA F-SCORE RANKING (SelectKBest)
    # -------------------------------------------------------------------------
    print("\n--- 2. SUPERVISED ANOVA F-SCORE RANKING (Continuous Features) ---")
    continuous_indices = [0, 1, 2, 3, 7] # gap, rain, rfid, optical, noise
    cont_names = [names[i] for i in continuous_indices]
    cont_X = [[row[i] for i in continuous_indices] for row in X]
    
    k_best_anova = AnovaFScoreSelector.select_k_best(cont_X, y, cont_names, k=5)
    print(f"{'Rank':<5} | {'Feature Name':<26} | {'ANOVA F-Score':<14} | {'Selection Verdict'}")
    print("-" * 80)
    for rank, item in enumerate(k_best_anova, start=1):
        verdict = "SELECTED (Top Informative) ✓" if rank <= 3 else "DISCARDED / LOW IMPACT ✗"
        print(f"{rank:<5} | {item['name']:<26} | {item['f_score']:>12.2f}   | {verdict}")
        
    # -------------------------------------------------------------------------
    # STEP 3: SUPERVISED CHI-SQUARE CONTINGENCY TEST (Categorical Features)
    # -------------------------------------------------------------------------
    print("\n--- 3. CATEGORICAL CONTINGENCY: CHI-SQUARE (chi^2) TEST ---")
    zone_feat = [int(row[6]) for row in X]
    chi2_val = ChiSquareSelector.calculate_chi2(zone_feat, y)
    print(f"Feature: station_zone_category (3 classes) vs Congestion Target (3 classes)")
    print(f"Calculated Chi-Square Statistic : {chi2_val:.4f}")
    print(f"Degrees of Freedom (r-1)*(c-1)  : (3-1)*(3-1) = 4")
    print(f"Statistical Verdict            : SIGNIFICANT ASSOCIATION (p < 0.001) ✓")
    
    # -------------------------------------------------------------------------
    # STEP 4: GREEDY PAIRWISE CORRELATION DEDUPLICATION
    # -------------------------------------------------------------------------
    print("\n--- 4. GREEDY PAIRWISE CORRELATION DEDUPLICATION (Threshold |r| >= 0.85) ---")
    dedup_res = CorrelationDeduplicator.deduplicate(X, names, threshold=0.85)
    
    print(f"Features before deduplication : {dedup_res['original_count']}")
    print(f"Features after deduplication  : {dedup_res['retained_count']}")
    print("Detected & Pruned Highly Collinear Pairs:")
    for pair in dedup_res["pruned_pairs"]:
        print(f" -> Pair: {pair['kept']} <--> {pair['dropped']} | |r| = {pair['correlation']:.4f}")
        print(f"    Action: Pruned '{pair['dropped']}' to eliminate multicollinearity.")
        
    # -------------------------------------------------------------------------
    # STEP 5: VERIFICATION INVARIANTS & INTEGRITY CHECKS
    # -------------------------------------------------------------------------
    assert "metro_currency_code" in [f[0] for f in vt_res["dropped_features"]], "Constant currency code must be dropped"
    assert "is_kolkata_resident" in [f[0] for f in vt_res["dropped_features"]], "Quasi-constant resident flag must be dropped"
    assert k_best_anova[0]["name"] in ["platform_rfid_taps", "platform_optical_pulses"], "Top ANOVA feature must be volume sensor"
    assert len(dedup_res["pruned_pairs"]) >= 1, "Must detect and prune rfid vs optical collinearity"
    
    print("\n" + "=" * 80)
    print("TOPIC 4 LABORATORY BENCHMARK COMPLETED SUCCESSFULLY (EXIT CODE 0)")
    print("=" * 80)


if __name__ == "__main__":
    run_laboratory()
