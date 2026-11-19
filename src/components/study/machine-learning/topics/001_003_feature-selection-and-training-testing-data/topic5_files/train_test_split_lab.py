"""
=============================================================================
CODER & ACCOTAX ACADEMIC LABORATORY & SIMULATION ENGINE
Topic 5: Train-Test Split (Generalization Error & Splitting Topologies)
Module: Feature Selection and Training & Testing Data (BCAC701B)
Lead Author: Sukanta Hui | Barrackpore, West Bengal, India
=============================================================================

This laboratory implements pure Python standard library algorithms for the core
train-test split paradigms used in academic research and production machine learning:
1. Random Shuffle Split: Classic I.I.D. train-test partitioning.
2. Stratified Train-Test Split: Strict preservation of target class proportions.
3. Temporal / Time-Series Forward Split: Strictly chronological, preventing lookahead leakage.
4. Group-Aware Split: Prevents patient/user identity leakage across repeated recordings.
5. Statistical Confidence Interval & Standard Error Engine: Quantifying test estimate uncertainty.

Zero external dependencies: Pure standard library Python 3 (math, random, typing).
"""

import math
import random
from typing import List, Tuple, Dict, Any, Set


# =============================================================================
# 1. CORE SPLITTING TOPOLOGY ALGORITHMS
# =============================================================================

def random_train_test_split(
    X: List[List[float]],
    y: List[int],
    test_size: float = 0.20,
    seed: int = 42
) -> Tuple[List[List[float]], List[List[float]], List[int], List[int]]:
    """
    Standard random shuffle split:
    Shuffles index permutations using seed, partitioning into train and test.
    """
    n = len(y)
    random.seed(seed)
    indices = list(range(n))
    random.shuffle(indices)
    
    n_test = int(round(n * test_size))
    test_idx = set(indices[:n_test])
    
    X_train, X_test = [], []
    y_train, y_test = [], []
    
    for i in range(n):
        if i in test_idx:
            X_test.append(X[i])
            y_test.append(y[i])
        else:
            X_train.append(X[i])
            y_train.append(y[i])
            
    return X_train, X_test, y_train, y_test


def stratified_train_test_split(
    X: List[List[float]],
    y: List[int],
    test_size: float = 0.20,
    seed: int = 42
) -> Tuple[List[List[float]], List[List[float]], List[int], List[int]]:
    """
    Stratified split:
    Partitions samples within each distinct target class, ensuring train and test
    sets mirror the population class distribution P(Y = c).
    """
    random.seed(seed)
    class_indices: Dict[int, List[int]] = {}
    for idx, label in enumerate(y):
        class_indices.setdefault(label, []).append(idx)
        
    test_idx = set()
    for label, idx_list in class_indices.items():
        shuffled = list(idx_list)
        random.shuffle(shuffled)
        k_test = int(round(len(shuffled) * test_size))
        # Ensure at least 1 sample in test if class has >= 2 samples
        if k_test == 0 and len(shuffled) >= 2:
            k_test = 1
        for i in range(k_test):
            test_idx.add(shuffled[i])
            
    X_train, X_test = [], []
    y_train, y_test = [], []
    
    for i in range(len(y)):
        if i in test_idx:
            X_test.append(X[i])
            y_test.append(y[i])
        else:
            X_train.append(X[i])
            y_train.append(y[i])
            
    return X_train, X_test, y_train, y_test


def temporal_train_test_split(
    X: List[List[float]],
    y: List[int],
    test_size: float = 0.20
) -> Tuple[List[List[float]], List[List[float]], List[int], List[int]]:
    """
    Chronological forward split:
    Maintains strict time order. Train contains all past records; test contains
    strictly future records. Zero shuffling to prevent lookahead leakage.
    """
    n = len(y)
    split_idx = int(round(n * (1.0 - test_size)))
    
    X_train = X[:split_idx]
    y_train = y[:split_idx]
    X_test = X[split_idx:]
    y_test = y[split_idx:]
    
    return X_train, X_test, y_train, y_test


def group_aware_train_test_split(
    X: List[List[float]],
    y: List[int],
    groups: List[str],
    test_size: float = 0.20,
    seed: int = 42
) -> Tuple[List[List[float]], List[List[float]], List[int], List[int], List[str], List[str]]:
    """
    Group-aware split (e.g. by patient ID or customer ID):
    Ensures that all observations from a specific entity group reside ENTIRELY
    within either the training set or the testing set, preventing identity leakage.
    """
    random.seed(seed)
    unique_groups = sorted(list(set(groups)))
    random.shuffle(unique_groups)
    
    n_test_groups = int(round(len(unique_groups) * test_size))
    test_group_set = set(unique_groups[:n_test_groups])
    
    X_train, X_test = [], []
    y_train, y_test = [], []
    g_train, g_test = [], []
    
    for i in range(len(y)):
        if groups[i] in test_group_set:
            X_test.append(X[i])
            y_test.append(y[i])
            g_test.append(groups[i])
        else:
            X_train.append(X[i])
            y_train.append(y[i])
            g_train.append(groups[i])
            
    return X_train, X_test, y_train, y_test, g_train, g_test


# =============================================================================
# 2. STATISTICAL EVALUATION UNCERTAINTY & CONFIDENCE INTERVALS
# =============================================================================

def calculate_test_confidence_interval(
    accuracy: float,
    n_test: int,
    confidence_level: float = 0.95
) -> Dict[str, float]:
    """
    Computes Standard Error (SE) and Wald Confidence Interval for test accuracy:
    SE = sqrt( p * (1 - p) / N_test )
    Margin of Error = z * SE
    """
    if n_test <= 0:
        return {"accuracy": 0.0, "se": 0.0, "margin": 0.0, "ci_lower": 0.0, "ci_upper": 0.0}
        
    p = max(0.0, min(1.0, accuracy))
    se = math.sqrt(p * (1.0 - p) / n_test)
    
    # Standard normal critical z value (approx 1.96 for 95%)
    z = 1.96 if abs(confidence_level - 0.95) < 0.01 else 2.576
    margin = z * se
    
    return {
      "accuracy": round(p * 100, 2),
      "se": round(se * 100, 2),
      "margin": round(margin * 100, 2),
      "ci_lower": round(max(0.0, p - margin) * 100, 2),
      "ci_upper": round(min(1.0, p + margin) * 100, 2)
    }


# =============================================================================
# 3. WEST BENGAL SYNTHETIC DATASETS
# =============================================================================

def generate_jadavpur_clinical_dataset(seed: int = 101) -> Dict[str, Any]:
    """
    Simulates patient cardiology diagnostics at Jadavpur Medical Hub:
    - 20 distinct patients (Mamata, Mahima, Susmita, Debangshu, etc.)
    - 15 ECG beats per patient = 300 total records.
    - Highly imbalanced target: Arrhythmia (1 = Detected, 0 = Normal).
    """
    random.seed(seed)
    patients = [f"Patient_{i+1:02d}" for i in range(20)]
    
    X = []
    y = []
    groups = []
    
    # 3 patients have true arrhythmia condition
    arrhythmia_patients = set(patients[:3])
    
    for p in patients:
        has_arrhythmia = p in arrhythmia_patients
        patient_base_hr = random.gauss(85.0 if has_arrhythmia else 72.0, 4.0)
        patient_pr_interval = random.gauss(210.0 if has_arrhythmia else 160.0, 10.0)
        
        for _ in range(15):
            hr = patient_base_hr + random.gauss(0, 2.0)
            pr = patient_pr_interval + random.gauss(0, 5.0)
            target = 1 if (has_arrhythmia and random.random() < 0.90) else 0
            
            X.append([hr, pr])
            y.append(target)
            groups.append(p)
            
    return {"X": X, "y": y, "groups": groups}


# =============================================================================
# 4. LABORATORY BENCHMARK EXECUTION
# =============================================================================

def run_laboratory() -> None:
    print("=" * 80)
    print("CODER & ACCOTAX ACADEMIC LABORATORY: TOPIC 5")
    print("TRAIN-TEST SPLIT (GENERALIZATION, STRATIFICATION & GROUP LEAKAGE)")
    print("Module: Feature Selection and Training & Testing Data (BCAC701B)")
    print("Lead Author: Sukanta Hui | Barrackpore, West Bengal, India")
    print("=" * 80)
    
    data = generate_jadavpur_clinical_dataset(seed=42)
    X = data["X"]
    y = data["y"]
    groups = data["groups"]
    n_samples = len(y)
    
    pos_count = sum(y)
    pos_rate = pos_count / n_samples
    print(f"\nLoaded Clinical Dataset: {n_samples} total ECG segments across {len(set(groups))} patients.")
    print(f"Overall Arrhythmia Positive Cases : {pos_count} / {n_samples} ({pos_rate * 100:.2f}% base rate)")

    # -------------------------------------------------------------------------
    # 1. RANDOM VS STRATIFIED SPLIT: THE CLASS COLLAPSE DEMONSTRATION
    # -------------------------------------------------------------------------
    print("\n--- 1. RANDOM VS STRATIFIED SPLIT: CLASS PROPORTION AUDIT (test_size = 0.20) ---")
    
    # Random Split
    _, _, y_train_rand, y_test_rand = random_train_test_split(X, y, test_size=0.20, seed=777)
    rand_tr_rate = (sum(y_train_rand) / len(y_train_rand)) * 100
    rand_te_rate = (sum(y_test_rand) / len(y_test_rand)) * 100
    
    # Stratified Split
    _, _, y_train_strat, y_test_strat = stratified_train_test_split(X, y, test_size=0.20, seed=777)
    strat_tr_rate = (sum(y_train_strat) / len(y_train_strat)) * 100
    strat_te_rate = (sum(y_test_strat) / len(y_test_strat)) * 100
    
    print(f"{'Split Method':<22} | {'Train Size':<12} | {'Train % Positive':<18} | {'Test Size':<11} | {'Test % Positive':<18}")
    print("-" * 80)
    print(f"{'True Population':<22} | {'--':<12} | {pos_rate * 100:>16.2f}% | {'--':<11} | {pos_rate * 100:>16.2f}%")
    print(f"{'Random Shuffle Split':<22} | {len(y_train_rand):<12} | {rand_tr_rate:>16.2f}% | {len(y_test_rand):<11} | {rand_te_rate:>16.2f}% (Class Shift!)")
    print(f"{'Stratified Split':<22} | {len(y_train_strat):<12} | {strat_tr_rate:>16.2f}% | {len(y_test_strat):<11} | {strat_te_rate:>16.2f}% (EXACT PRESERVATION)")

    # -------------------------------------------------------------------------
    # 2. GROUP-AWARE SPLIT: IDENTITY LEAKAGE PREVENTION
    # -------------------------------------------------------------------------
    print("\n--- 2. GROUP LEAKAGE AUDIT: PATIENT IDENTITY CONTAMINATION ---")
    
    # In Random Split: How many patients appear in BOTH train and test?
    # Re-extract groups for random split
    random.seed(777)
    rand_indices = list(range(n_samples))
    random.shuffle(rand_indices)
    test_cnt = int(round(n_samples * 0.20))
    rand_test_ids = set(rand_indices[:test_cnt])
    
    groups_train_rand = set(groups[i] for i in range(n_samples) if i not in rand_test_ids)
    groups_test_rand = set(groups[i] for i in range(n_samples) if i in rand_test_ids)
    leaked_patients = groups_train_rand.intersection(groups_test_rand)
    
    # In Group-Aware Split
    _, _, _, _, g_tr, g_te = group_aware_train_test_split(X, y, groups, test_size=0.20, seed=777)
    group_split_leak = set(g_tr).intersection(set(g_te))
    
    print(f"Random Split      -> Patients in Train: {len(groups_train_rand)}, in Test: {len(groups_test_rand)}")
    print(f"                     CONTAMINATED PATIENTS (Identity Leakage): {len(leaked_patients)} / 20 patients! ❌")
    print(f"Group-Aware Split -> Patients in Train: {len(set(g_tr))}, in Test: {len(set(g_te))}")
    print(f"                     CONTAMINATED PATIENTS: {len(group_split_leak)} (ZERO LEAKAGE) ✓")
    print(">> LESSON: In clinical & biometric tasks, random split leaks patient anatomy, causing false 99% accuracy.")

    # -------------------------------------------------------------------------
    # 3. STATISTICAL UNCERTAINTY ACROSS TEST SAMPLE SIZES
    # -------------------------------------------------------------------------
    print("\n--- 3. TEST SET SAMPLE SIZE (N_test) VS 95% CONFIDENCE INTERVAL ---")
    print(f"Assuming observed test accuracy of 85.0%:")
    print(f"{'Test Size (N_test)':<20} | {'Standard Error':<16} | {'Margin of Error (±)':<22} | {'95% Confidence Interval'}")
    print("-" * 80)
    
    sizes = [30, 60, 150, 500, 2000]
    for n_t in sizes:
        ci = calculate_test_confidence_interval(0.85, n_t)
        print(f"{n_t:<20} | {ci['se']:>14.2f}% | ±{ci['margin']:>19.2f}% | [{ci['ci_lower']}%, {ci['ci_upper']}%]")
        
    print("\n>> KEY TAKEAWAY: When N_test is tiny (e.g. 30), a reported 85% accuracy has a ±12.8% error margin!")
    print(">> The model could truly be anywhere from 72% (poor) to 97% (stellar). Test size matters.")

    # -------------------------------------------------------------------------
    # 4. VERIFICATION INVARIANTS & INTEGRITY CHECKS
    # -------------------------------------------------------------------------
    assert abs(strat_te_rate - (pos_rate * 100)) < 1.5, "Stratified test rate must mirror population rate"
    assert len(group_split_leak) == 0, "Group-aware split must have zero identity overlap"
    assert len(leaked_patients) > 0, "Random split on repeated records must demonstrate identity leakage"
    assert calculate_test_confidence_interval(0.85, 2000)["margin"] < calculate_test_confidence_interval(0.85, 30)["margin"]

    print("\n" + "=" * 80)
    print("TOPIC 5 LABORATORY BENCHMARK COMPLETED SUCCESSFULLY (EXIT CODE 0)")
    print("=" * 80)


if __name__ == "__main__":
    run_laboratory()
