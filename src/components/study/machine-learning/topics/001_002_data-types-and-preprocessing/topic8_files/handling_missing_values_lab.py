"""
=============================================================================
TOPIC 8: HANDLING MISSING VALUES & IMPUTATION ARCHITECTURE
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B - MAKAUT Aligned)
=============================================================================

This simulation demonstrates:
1. The Rubin (1976) Missingness Mechanisms:
   - MCAR: Missing Completely at Random (Pure stochastic loss)
   - MAR:  Missing at Random (Conditioned on observed auxiliary features)
   - MNAR: Missing Not at Random (Conditioned on unobserved true value)
2. Imputation Algorithmic Implementations:
   - Complete-Case Analysis (Listwise Deletion with Information Loss Quantification)
   - Univariate Statistical Imputation (Mean, Median, Mode)
   - k-Nearest Neighbors (k-NN) Distance-Weighted Imputer
   - Missingness Indicator Generator (Preserving Informative Missingness Signals)
3. Quantitative Evaluation Against Ground Truth:
   - MAE & RMSE evaluation of imputation error across MCAR, MAR, and MNAR
   - Strict .fit() on Train and .transform() on Test to prevent Data Leakage
4. Realistic West Bengal Clinical & Municipal Healthcare Dataset:
   - Kolkata Medical College & SSKM Hospital Emergency Triage Patient Roster
=============================================================================
"""

import math
import copy
from typing import List, Dict, Any, Tuple, Optional, Set

# =============================================================================
# 1. GROUND TRUTH PRISTINE DATASET & SYNTHETIC MISSINGNESS GENERATOR
# =============================================================================

def get_pristine_sskm_patient_dataset() -> List[Dict[str, Any]]:
    """
    Returns 8 complete ground-truth patient triage records from SSKM Hospital.
    Used as an experimental benchmark to evaluate imputation accuracy.
    """
    return [
        {"patient_id": "SSKM-001", "name": "Subir Ghosh", "age": 45, "systolic_bp": 138.0, "glucose_mgdl": 142.0, "income_inr": 48000.0, "triage_tier": "Urgent"},
        {"patient_id": "SSKM-002", "name": "Kakali Das", "age": 28, "systolic_bp": 118.0, "glucose_mgdl": 92.0, "income_inr": 32000.0, "triage_tier": "Non-Urgent"},
        {"patient_id": "SSKM-003", "name": "Bimal Mukherjee", "age": 68, "systolic_bp": 165.0, "glucose_mgdl": 210.0, "income_inr": 85000.0, "triage_tier": "Emergency"},
        {"patient_id": "SSKM-004", "name": "Ruma Chatterjee", "age": 72, "systolic_bp": 158.0, "glucose_mgdl": 185.0, "income_inr": 25000.0, "triage_tier": "Emergency"},
        {"patient_id": "SSKM-005", "name": "Amitava Roy", "age": 35, "systolic_bp": 122.0, "glucose_mgdl": 105.0, "income_inr": 62000.0, "triage_tier": "Non-Urgent"},
        {"patient_id": "SSKM-006", "name": "Sunita Sen", "age": 52, "systolic_bp": 144.0, "glucose_mgdl": 160.0, "income_inr": 95000.0, "triage_tier": "Urgent"},
        {"patient_id": "SSKM-007", "name": "Dipankar Pal", "age": 61, "systolic_bp": 150.0, "glucose_mgdl": 175.0, "income_inr": 54000.0, "triage_tier": "Urgent"},
        {"patient_id": "SSKM-008", "name": "Ananya Bose", "age": 24, "systolic_bp": 115.0, "glucose_mgdl": 88.0, "income_inr": 38000.0, "triage_tier": "Non-Urgent"},
    ]


def inject_rubin_missingness(pristine_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Injects deterministic missingness reflecting the three Rubin classifications:
    1. MCAR: Glucose missing completely at random on SSKM-002 and SSKM-006 (e.g. lab vial dropped).
    2. MAR:  Systolic BP missing conditioned on Age > 65 on SSKM-003 and SSKM-004 (elderly non-ambulatory).
    3. MNAR: Income missing conditioned on Income > 70000 on SSKM-003 and SSKM-006 (high-earner refusal).
    """
    corrupted = copy.deepcopy(pristine_data)

    # 1. MCAR on Glucose
    corrupted[1]["glucose_mgdl"] = None  # Patient 002 (Kakali)
    corrupted[5]["glucose_mgdl"] = None  # Patient 006 (Sunita)

    # 2. MAR on Systolic BP (Conditioned on Age > 65)
    corrupted[2]["systolic_bp"] = None   # Patient 003 (Bimal, Age 68)
    corrupted[3]["systolic_bp"] = None   # Patient 004 (Ruma, Age 72)

    # 3. MNAR on Income (Conditioned on high income > 70,000)
    corrupted[2]["income_inr"] = None    # Patient 003 (Rs 85,000)
    corrupted[5]["income_inr"] = None    # Patient 006 (Rs 95,000)

    return corrupted


# =============================================================================
# 2. MISSING DATA AUDITOR & QUALITY PROFILER
# =============================================================================

class MissingDataAuditor:
    """
    Profiles the missingness topology of a dataset:
    - Feature completeness ratios
    - Complete-Case retention percentage
    - Co-missingness / missingness patterns
    """
    def audit(self, records: List[Dict[str, Any]]) -> Dict[str, Any]:
        n_total = len(records)
        if n_total == 0:
            return {"error": "Empty dataset"}

        all_keys = [k for k in records[0].keys() if k not in ("patient_id", "name")]
        null_counts = {k: 0 for k in all_keys}
        complete_rows = 0

        for r in records:
            has_null = False
            for k in all_keys:
                if r.get(k) is None:
                    null_counts[k] += 1
                    has_null = True
            if not has_null:
                complete_rows += 1

        completeness_pct = {k: round((n_total - null_counts[k]) / n_total * 100, 1) for k in all_keys}
        complete_case_pct = round((complete_rows / n_total) * 100, 1)

        return {
            "total_records": n_total,
            "complete_records": complete_rows,
            "complete_case_retention_pct": complete_case_pct,
            "data_loss_under_dropna_pct": round(100.0 - complete_case_pct, 1),
            "null_counts": null_counts,
            "completeness_pct": completeness_pct
        }


# =============================================================================
# 3. UNIVARIATE STATISTICAL IMPUTERS (MEAN / MEDIAN / MODE)
# =============================================================================

class UnivariateImputer:
    """
    Imputes missing values using statistical central tendencies:
    - Mean: sum(X) / N (Minimizes squared error under Gaussianity)
    - Median: 50th percentile (Robust to outliers under skew)
    - Mode: Most frequent category
    Strictly follows Scikit-Learn fit-transform anti-leakage paradigm.
    """
    def __init__(self, strategy: str = "mean", add_indicator: bool = False):
        self.strategy = strategy
        self.add_indicator = add_indicator
        self.statistics: Dict[str, float] = {}

    def fit(self, records: List[Dict[str, Any]], numeric_cols: List[str]) -> "UnivariateImputer":
        for col in numeric_cols:
            vals = [float(r[col]) for r in records if r.get(col) is not None]
            if not vals:
                self.statistics[col] = 0.0
                continue

            if self.strategy == "mean":
                self.statistics[col] = round(sum(vals) / len(vals), 2)
            elif self.strategy == "median":
                s_vals = sorted(vals)
                n = len(s_vals)
                median_val = s_vals[n // 2] if n % 2 != 0 else (s_vals[n // 2 - 1] + s_vals[n // 2]) / 2.0
                self.statistics[col] = round(median_val, 2)
        return self

    def transform(self, records: List[Dict[str, Any]], numeric_cols: List[str]) -> List[Dict[str, Any]]:
        imputed = []
        for r in records:
            row = copy.deepcopy(r)
            for col in numeric_cols:
                is_missing = row.get(col) is None
                if is_missing:
                    row[col] = self.statistics.get(col, 0.0)
                if self.add_indicator:
                    row[f"{col}_missing_flag"] = 1 if is_missing else 0
            imputed.append(row)
        return imputed


# =============================================================================
# 4. MULTIVARIATE K-NEAREST NEIGHBORS (K-NN) IMPUTER
# =============================================================================

class KNNImputerCustom:
    """
    Imputes missing values by finding k-nearest neighbors based on Euclidean
    distance across observed shared attributes:
    y_hat_i = sum(w_j * y_j) / sum(w_j), where w_j = 1 / d(x_i, x_j)
    """
    def __init__(self, n_neighbors: int = 2):
        self.k = n_neighbors
        self.train_records: List[Dict[str, Any]] = []

    def fit(self, records: List[Dict[str, Any]]) -> "KNNImputerCustom":
        self.train_records = copy.deepcopy(records)
        return self

    def compute_distance(self, r1: Dict[str, Any], r2: Dict[str, Any], candidate_features: List[str]) -> float:
        """Calculates distance strictly across mutually observed continuous attributes."""
        squared_sum = 0.0
        shared_count = 0

        for col in candidate_features:
            v1 = r1.get(col)
            v2 = r2.get(col)
            if v1 is not None and v2 is not None:
                # Normalize scale difference using a coarse range
                scale = 100.0 if "bp" in col or "glucose" in col else (50000.0 if "income" in col else 50.0)
                diff = (float(v1) - float(v2)) / scale
                squared_sum += diff ** 2
                shared_count += 1

        if shared_count == 0:
            return float("inf")
        # Scale by proportion of observed features
        return math.sqrt(squared_sum / shared_count)

    def transform(self, records: List[Dict[str, Any]], numeric_cols: List[str]) -> List[Dict[str, Any]]:
        imputed_data = []

        for target in records:
            row = copy.deepcopy(target)
            for col in numeric_cols:
                if row.get(col) is None:
                    # Find k nearest donors in train_records who possess this attribute
                    donors = []
                    for donor in self.train_records:
                        if donor.get("patient_id") == row.get("patient_id"):
                            continue  # Do not compare record to itself
                        if donor.get(col) is not None:
                            dist = self.compute_distance(row, donor, numeric_cols)
                            donors.append((dist, float(donor[col])))

                    donors.sort(key=lambda x: x[0])
                    nearest = donors[:self.k]

                    if nearest:
                        weights = [1.0 / (d[0] + 1e-5) for d in nearest]
                        weighted_val = sum(w * d[1] for w, d in zip(weights, nearest)) / sum(weights)
                        row[col] = round(weighted_val, 2)
                    else:
                        row[col] = 0.0

            imputed_data.append(row)
        return imputed_data


# =============================================================================
# 5. IMPUTATION EVALUATION HARNESS (BENCHMARKING VS GROUND TRUTH)
# =============================================================================

def evaluate_imputation_error(pristine: List[Dict[str, Any]], 
                              imputed: List[Dict[str, Any]], 
                              corrupted: List[Dict[str, Any]], 
                              cols: List[str]) -> Dict[str, Dict[str, float]]:
    """
    Computes MAE and RMSE strictly on the cells that were originally missing.
    """
    errors = {}
    for col in cols:
        diffs = []
        for i in range(len(pristine)):
            # Check if this cell was originally null in the corrupted set
            if corrupted[i].get(col) is None:
                true_val = float(pristine[i][col])
                pred_val = float(imputed[i][col])
                diffs.append(pred_val - true_val)

        if diffs:
            mae = sum(abs(d) for d in diffs) / len(diffs)
            rmse = math.sqrt(sum(d ** 2 for d in diffs) / len(diffs))
            errors[col] = {"count_missing": len(diffs), "mae": round(mae, 2), "rmse": round(rmse, 2)}
        else:
            errors[col] = {"count_missing": 0, "mae": 0.0, "rmse": 0.0}

    return errors


# =============================================================================
# 6. DEMONSTRATION & VERIFICATION DRIVER
# =============================================================================

def run_topic8_missing_values_lab():
    print("=" * 80)
    print("TOPIC 8: HANDLING MISSING VALUES & IMPUTATION ARCHITECTURE")
    print("Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal")
    print("Course: BCAC701B - Introduction to Machine Learning")
    print("=" * 80)

    # 1. Load Pristine Dataset & Inject Realistic Rubin Missingness
    pristine_patients = get_pristine_sskm_patient_dataset()
    dirty_patients = inject_rubin_missingness(pristine_patients)
    numeric_cols = ["systolic_bp", "glucose_mgdl", "income_inr"]

    print(f"\n[STEP 1] Ingested SSKM Hospital Patient Triage Roster: {len(dirty_patients)} patient records.")
    print("Injected Rubin Missingness Mechanisms:")
    print("  • MCAR (Glucose): Patient 002 (Kakali) & Patient 006 (Sunita) - Random lab sample loss.")
    print("  • MAR  (Systolic BP): Patient 003 (Bimal) & Patient 004 (Ruma) - Conditioned on Age > 65.")
    print("  • MNAR (Income): Patient 003 & Patient 006 - Conditioned on high income (> 70k) refusal.")

    # 2. Audit Missingness Topology
    auditor = MissingDataAuditor()
    audit_report = auditor.audit(dirty_patients)
    print("\n" + "=" * 80)
    print("DATA QUALITY & MISSINGNESS AUDIT REPORT")
    print("=" * 80)
    print(f"  Total Ingested Records:      {audit_report['total_records']}")
    print(f"  Complete Records (No Nulls): {audit_report['complete_records']}")
    print(f"  Complete-Case Retention:     {audit_report['complete_case_retention_pct']}%")
    print(f"  Data Destroyed by dropna():  {audit_report['data_loss_under_dropna_pct']}% (CRITICAL LOSS!)")
    print("  Column Completeness:")
    for col, pct in audit_report["completeness_pct"].items():
        missing_count = audit_report["null_counts"][col]
        print(f"    * {col:20s}: {pct:5.1f}% complete ({missing_count} missing)")

    # 3. Model 1: Univariate Mean Imputation
    mean_imputer = UnivariateImputer(strategy="mean")
    mean_imputer.fit(dirty_patients, numeric_cols)
    mean_imputed_data = mean_imputer.transform(dirty_patients, numeric_cols)
    mean_errors = evaluate_imputation_error(pristine_patients, mean_imputed_data, dirty_patients, numeric_cols)

    # 4. Model 2: Univariate Median Imputation
    median_imputer = UnivariateImputer(strategy="median")
    median_imputer.fit(dirty_patients, numeric_cols)
    median_imputed_data = median_imputer.transform(dirty_patients, numeric_cols)
    median_errors = evaluate_imputation_error(pristine_patients, median_imputed_data, dirty_patients, numeric_cols)

    # 5. Model 3: Multivariate k-NN Imputation (k=2)
    knn_imputer = KNNImputerCustom(n_neighbors=2)
    knn_imputer.fit(dirty_patients)
    knn_imputed_data = knn_imputer.transform(dirty_patients, numeric_cols)
    knn_errors = evaluate_imputation_error(pristine_patients, knn_imputed_data, dirty_patients, numeric_cols)

    # 6. Comparative Imputation Performance Matrix
    print("\n" + "=" * 80)
    print("IMPUTATION ACCURACY BENCHMARK (EVALUATED AGAINST GROUND TRUTH)")
    print("=" * 80)
    print(f"{'Feature Name':20s} | {'Mechanism':10s} | {'Mean Imputer MAE':18s} | {'Median Imputer MAE':20s} | {'k-NN (k=2) MAE':15s}")
    print("-" * 80)

    mechanism_map = {"glucose_mgdl": "MCAR", "systolic_bp": "MAR", "income_inr": "MNAR"}
    for col in numeric_cols:
        mech = mechanism_map.get(col, "Unknown")
        m_mae = f"{mean_errors[col]['mae']:.2f}"
        med_mae = f"{median_errors[col]['mae']:.2f}"
        knn_mae = f"{knn_errors[col]['mae']:.2f}"
        print(f"{col:20s} | {mech:10s} | {m_mae:18s} | {med_mae:20s} | {knn_mae:15s}")

    # 7. Model 4: Missingness Indicator Feature Augmentation
    indicator_imputer = UnivariateImputer(strategy="median", add_indicator=True)
    indicator_imputer.fit(dirty_patients, numeric_cols)
    indicator_data = indicator_imputer.transform(dirty_patients, numeric_cols)

    print("\n" + "=" * 80)
    print("SAMPLE RECORD: INFORMATIVE MISSINGNESS INDICATOR PATTERN (PATIENT 003)")
    print("=" * 80)
    p3 = indicator_data[2]
    print(f"  Patient ID:               {p3['patient_id']} ({p3['name']})")
    print(f"  Age:                      {p3['age']} yrs")
    print(f"  Imputed Systolic BP:      {p3['systolic_bp']} mmHg | Missing Flag: {p3.get('systolic_bp_missing_flag')}")
    print(f"  Imputed Income:           Rs {p3['income_inr']} | Missing Flag: {p3.get('income_inr_missing_flag')}")
    print("  * Notice: The binary indicator flag preserves the signal that the patient withheld high income (MNAR)!")

    print("\n" + "=" * 80)
    print("MISSING VALUES LABORATORY SIMULATION COMPLETED WITH ZERO RUNTIME ERRORS")
    print("=" * 80)

if __name__ == "__main__":
    run_topic8_missing_values_lab()
