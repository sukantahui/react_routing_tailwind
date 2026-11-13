"""
=============================================================================
TOPIC 3: CATEGORICAL DATA EXPLORATION, ENCODING TAXONOMY & HAZARD AUDIT
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Interactive Simulation Engine
Author: Sukanta Hui | Senior Academic Mentor | Coder & AccoTax
Location: Barrackpore, West Bengal, India
Course Code: BCAC701B / MCA / B.Tech Computer Science
=============================================================================

This laboratory engine demonstrates:
1. Categorical Taxonomy: Distinguishing Nominal, Ordinal, and Binary features in enterprise tabular datasets.
2. Mathematical Central Tendency: Computing Mode and Frequency Distributions (Why Mean is mathematically undefined).
3. The Arbitrary Integer Encoding Trap: Proving mathematically why encoding Nominal cities as [1, 2, 3] creates artificial distances and distorts linear models.
4. One-Hot Encoding Orthogonality: Building the orthogonal indicator matrix where all nominal classes are equidistant (distance = sqrt(2)).
5. High Cardinality Pruning: Detecting rare long-tail categories (<3% frequency) and collapsing them into an 'Other' bucket to prevent matrix explosion.
6. Real-World Case Study: West Bengal Retail Consumer Profile Dataset (Kolkata, Barrackpore, Howrah, Ichapur).
=============================================================================
"""

import math
from collections import Counter
from typing import List, Dict, Any, Tuple

# =============================================================================
# 1. SYNTHETIC ENTERPRISE DATASET GENERATION (WEST BENGAL CONSUMER COHORT)
# =============================================================================

def generate_consumer_cohort() -> List[Dict[str, Any]]:
    """
    Generates 20 representative customer records from West Bengal retail analytics.
    Features:
      - customer_id: Unique identifier
      - city (Nominal): Kolkata, Barrackpore, Howrah, Naihati, Titagarh
      - education_tier (Ordinal): Secondary < Higher_Secondary < Bachelors < Masters
      - membership_tier (Ordinal): Bronze < Silver < Gold < Platinum
      - is_churned (Binary): 0 = Retained, 1 = Churned
      - monthly_spend_inr (Numerical): For correlation reference
    """
    return [
        {"id": "WB-001", "city": "Kolkata", "education": "Bachelors", "tier": "Gold", "churn": 0, "spend": 4500},
        {"id": "WB-002", "city": "Barrackpore", "education": "Masters", "tier": "Platinum", "churn": 0, "spend": 8200},
        {"id": "WB-003", "city": "Kolkata", "education": "Higher_Secondary", "tier": "Silver", "churn": 1, "spend": 1200},
        {"id": "WB-004", "city": "Howrah", "education": "Bachelors", "tier": "Gold", "churn": 0, "spend": 5100},
        {"id": "WB-005", "city": "Barrackpore", "education": "Bachelors", "tier": "Bronze", "churn": 1, "spend": 950},
        {"id": "WB-006", "city": "Kolkata", "education": "Masters", "tier": "Platinum", "churn": 0, "spend": 9400},
        {"id": "WB-007", "city": "Naihati", "education": "Secondary", "tier": "Bronze", "churn": 1, "spend": 600},
        {"id": "WB-008", "city": "Howrah", "education": "Higher_Secondary", "tier": "Silver", "churn": 0, "spend": 2800},
        {"id": "WB-009", "city": "Kolkata", "education": "Bachelors", "tier": "Silver", "churn": 0, "spend": 3200},
        {"id": "WB-010", "city": "Titagarh", "education": "Secondary", "tier": "Bronze", "churn": 1, "spend": 750},
        {"id": "WB-011", "city": "Barrackpore", "education": "Masters", "tier": "Gold", "churn": 0, "spend": 6100},
        {"id": "WB-012", "city": "Kolkata", "education": "Bachelors", "tier": "Platinum", "churn": 0, "spend": 7800},
        {"id": "WB-013", "city": "Howrah", "education": "Bachelors", "tier": "Silver", "churn": 0, "spend": 3100},
        {"id": "WB-014", "city": "Kolkata", "education": "Higher_Secondary", "tier": "Bronze", "churn": 1, "spend": 1100},
        {"id": "WB-015", "city": "Barrackpore", "education": "Bachelors", "tier": "Silver", "churn": 0, "spend": 3400},
        {"id": "WB-016", "city": "Kolkata", "education": "Masters", "tier": "Gold", "churn": 0, "spend": 6900},
        {"id": "WB-017", "city": "Howrah", "education": "Bachelors", "tier": "Gold", "churn": 0, "spend": 5400},
        {"id": "WB-018", "city": "Barrackpore", "education": "Higher_Secondary", "tier": "Bronze", "churn": 1, "spend": 850},
        {"id": "WB-019", "city": "Kolkata", "education": "Bachelors", "tier": "Platinum", "churn": 0, "spend": 8900},
        {"id": "WB-020", "city": "Naihati", "education": "Bachelors", "tier": "Silver", "churn": 0, "spend": 2900}
    ]


# =============================================================================
# 2. CATEGORICAL SUMMARY STATISTICS & FREQUENCY AUDIT
# =============================================================================

def compute_categorical_statistics(cohort: List[Dict[str, Any]], column: str) -> Dict[str, Any]:
    """
    Computes mathematically sound categorical statistics:
    - Cardinality (unique category count)
    - Mode (most frequent category)
    - Frequency Table and Percentage Share
    """
    values = [row[column] for row in cohort]
    total = len(values)
    counter = Counter(values)
    
    sorted_freq = sorted(counter.items(), key=lambda x: x[1], reverse=True)
    mode_category, mode_count = sorted_freq[0]
    
    freq_table = []
    for cat, count in sorted_freq:
        pct = (count / total) * 100
        freq_table.append({
            "category": cat,
            "count": count,
            "percentage": round(pct, 2)
        })
        
    return {
        "column": column,
        "cardinality": len(counter),
        "total_records": total,
        "mode": mode_category,
        "mode_frequency": mode_count,
        "mode_percentage": round((mode_count / total) * 100, 2),
        "distribution": freq_table
    }


# =============================================================================
# 3. MATHEMATICAL PROOF: THE ARBITRARY INTEGER ENCODING TRAP
# =============================================================================

def demonstrate_integer_encoding_distortion():
    """
    Demonstrates mathematically why assigning arbitrary integer codes to Nominal data
    violates geometric symmetry and injects false linear relationships.
    """
    nominal_cities = ["Kolkata", "Barrackpore", "Howrah"]
    
    # Arbitrary Integer Assignment
    arbitrary_map = {"Kolkata": 1, "Barrackpore": 2, "Howrah": 3}
    
    # Pairwise 1D Euclidean distances under integer encoding:
    d_kol_bar = abs(arbitrary_map["Kolkata"] - arbitrary_map["Barrackpore"])
    d_kol_how = abs(arbitrary_map["Kolkata"] - arbitrary_map["Howrah"])
    d_bar_how = abs(arbitrary_map["Barrackpore"] - arbitrary_map["Howrah"])
    
    # In reality: In True Nominal Space, every distinct pair must be equidistant!
    # Under One-Hot Encoding:
    # Kolkata     = [1, 0, 0]
    # Barrackpore = [0, 1, 0]
    # Howrah      = [0, 0, 1]
    
    def ohe_dist(v1: List[int], v2: List[int]) -> float:
        return math.sqrt(sum((a - b)**2 for a, b in zip(v1, v2)))
    
    v_kol = [1, 0, 0]
    v_bar = [0, 1, 0]
    v_how = [0, 0, 1]
    
    d_ohe_kol_bar = ohe_dist(v_kol, v_bar)
    d_ohe_kol_how = ohe_dist(v_kol, v_how)
    d_ohe_bar_how = ohe_dist(v_bar, v_how)
    
    return {
        "integer_distances": {
            "d(Kolkata, Barrackpore)": d_kol_bar,
            "d(Kolkata, Howrah)": d_kol_how,
            "d(Barrackpore, Howrah)": d_bar_how
        },
        "one_hot_distances": {
            "d(Kolkata, Barrackpore)": round(d_ohe_kol_bar, 4),
            "d(Kolkata, Howrah)": round(d_ohe_kol_how, 4),
            "d(Barrackpore, Howrah)": round(d_ohe_bar_how, 4)
        }
    }


# =============================================================================
# 4. ONE-HOT ENCODING & THE DUMMY VARIABLE TRAP
# =============================================================================

def build_one_hot_matrix(cohort: List[Dict[str, Any]], column: str, drop_first: bool = False) -> Tuple[List[str], List[List[int]]]:
    """
    Constructs a One-Hot Encoded feature matrix from scratch.
    Demonstrates the Dummy Variable Trap (dropping 1 column for linear models).
    """
    values = [row[column] for row in cohort]
    unique_categories = sorted(list(set(values)))
    
    if drop_first:
        # Drop the first category to avoid perfect multicollinearity (singular matrix)
        feature_names = [f"{column}_{cat}" for cat in unique_categories[1:]]
        reference_cat = unique_categories[0]
    else:
        feature_names = [f"{column}_{cat}" for cat in unique_categories]
        reference_cat = None
        
    matrix = []
    for val in values:
        if drop_first:
            row_encoded = [1 if val == cat else 0 for cat in unique_categories[1:]]
        else:
            row_encoded = [1 if val == cat else 0 for cat in unique_categories]
        matrix.append(row_encoded)
        
    return feature_names, matrix


# =============================================================================
# 5. HIGH-CARDINALITY RARE CATEGORY PRUNING
# =============================================================================

def prune_rare_categories(cohort: List[Dict[str, Any]], column: str, min_frequency_pct: float = 10.0) -> List[Dict[str, Any]]:
    """
    Mitigates High Cardinality by collapsing rare categories (< min_frequency_pct)
    into a consolidated 'Other' bucket.
    """
    values = [row[column] for row in cohort]
    total = len(values)
    counter = Counter(values)
    
    pruned_cohort = []
    for row in cohort:
        val = row[column]
        pct = (counter[val] / total) * 100
        new_row = dict(row)
        if pct < min_frequency_pct:
            new_row[f"{column}_pruned"] = "Other_WB"
        else:
            new_row[f"{column}_pruned"] = val
        pruned_cohort.append(new_row)
        
    return pruned_cohort


# =============================================================================
# 6. MASTER EXPERIMENT RUNNER & CONSOLE OUTPUT
# =============================================================================

def run_laboratory_experiment():
    print("=" * 85)
    print("CODER & ACCOTAX - MACHINE LEARNING ADVANCED RESEARCH LABORATORY")
    print("TOPIC 3: CATEGORICAL DATA (NOMINAL, ORDINAL, BINARY & ENCODING MECHANICS)")
    print("Mentor: Sukanta Hui | Barrackpore, West Bengal, India | Course: BCAC701B")
    print("=" * 85)

    # 1. Dataset Overview
    cohort = generate_consumer_cohort()
    print(f"\n[PHASE 1: DATASET INGESTION & TAXONOMY AUDIT]")
    print(f"Total Observations: {len(cohort)} customer transactions from Greater Kolkata Region.")
    print("-" * 85)
    print(f"{'Field Name':<20} | {'Statistical Taxonomy':<22} | {'Permissible Math Operations'}")
    print("-" * 85)
    print(f"{'city':<20} | {'Nominal (Unordered)':<22} | {'Equality (==, !=), Mode, Frequency'}")
    print(f"{'education':<20} | {'Ordinal (Ranked)':<22} | {'Rank Comparison (<, >), Median'}")
    print(f"{'tier':<20} | {'Ordinal (Ranked)':<22} | {'Rank Comparison (<, >), Median'}")
    print(f"{'churn':<20} | {'Binary (Dichotomous)':<22} | {'Boolean logic, Probability'}")
    print(f"{'spend':<20} | {'Continuous Numerical':<22} | {'Arithmetic (+, -, *, /), Mean, Std'}")
    print("-" * 85)

    # 2. Categorical Central Tendency (Mode vs Mean)
    city_stats = compute_categorical_statistics(cohort, "city")
    print(f"\n[PHASE 2: CENTRAL TENDENCY & FREQUENCY DISTRIBUTION — 'city']")
    print(f"Cardinality (|C|): {city_stats['cardinality']} unique cities")
    print(f"Empirical Mode:    '{city_stats['mode']}' ({city_stats['mode_frequency']} occurrences = {city_stats['mode_percentage']}%)")
    print(f"Mathematical Note: Mean and Median are STRICTLY UNDEFINED on nominal city names.")
    print("-" * 85)
    print(f"{'Category':<16} | {'Count':<8} | {'Relative Percentage':<20} | {'Histogram Bar'}")
    print("-" * 85)
    for item in city_stats["distribution"]:
        bar = "█" * int(item["percentage"] // 4)
        print(f"{item['category']:<16} | {item['count']:<8} | {item['percentage']:>6.2f}%              | {bar}")

    # 3. Integer Distortion Proof
    distort_results = demonstrate_integer_encoding_distortion()
    print(f"\n" + "=" * 85)
    print("[PHASE 3: MATHEMATICAL PROOF — THE ARBITRARY INTEGER TRAP]")
    print("What happens if you assign Kolkata=1, Barrackpore=2, Howrah=3 to a linear model?")
    print("-" * 85)
    print(f"{'Pairwise City Comparison':<32} | {'Arbitrary Integer Distance':<28} | {'True One-Hot Distance'}")
    print("-" * 85)
    print(f"{'d(Kolkata, Barrackpore)':<32} | {distort_results['integer_distances']['d(Kolkata, Barrackpore)']:<28} | {distort_results['one_hot_distances']['d(Kolkata, Barrackpore)']} (sqrt(2))")
    print(f"{'d(Kolkata, Howrah)':<32} | {distort_results['integer_distances']['d(Kolkata, Howrah)']:<28} | {distort_results['one_hot_distances']['d(Kolkata, Howrah)']} (sqrt(2))")
    print(f"{'d(Barrackpore, Howrah)':<32} | {distort_results['integer_distances']['d(Barrackpore, Howrah)']:<28} | {distort_results['one_hot_distances']['d(Barrackpore, Howrah)']} (sqrt(2))")
    print("-" * 85)
    print("Teacher Sukanta Hui's Insight:")
    print(" -> Integer encoding falsely makes Howrah twice as distant from Kolkata (d=2) as Barrackpore (d=1)!")
    print(" -> One-Hot Encoding preserves perfect geometric symmetry: all cities are exactly 1.4142 units apart.")

    # 4. One-Hot Matrix Inspection (With Dummy Variable Trap Mitigation)
    features_full, matrix_full = build_one_hot_matrix(cohort, "city", drop_first=False)
    features_drop, matrix_drop = build_one_hot_matrix(cohort, "city", drop_first=True)
    print(f"\n[PHASE 4: ONE-HOT MATRIX & THE DUMMY VARIABLE TRAP]")
    print(f"Full One-Hot Encoding:  {len(features_full)} columns -> {features_full}")
    print(f"Drop-First (OLS Clean): {len(features_drop)} columns -> {features_drop} (Reference: 'Barrackpore')")
    print("\nFirst 4 Encoded Observations (Drop-First Format):")
    for i in range(4):
        print(f" Customer {cohort[i]['id']} ({cohort[i]['city']:<11}) -> {matrix_drop[i]}")

    # 5. High Cardinality Pruning Demonstration
    pruned_cohort = prune_rare_categories(cohort, "city", min_frequency_pct=10.0)
    pruned_stats = compute_categorical_statistics(pruned_cohort, "city_pruned")
    print(f"\n[PHASE 5: RARE CATEGORY PRUNING (<10% Threshold)]")
    print(f"Original Cardinality: {city_stats['cardinality']} unique cities")
    print(f"Pruned Cardinality:   {pruned_stats['cardinality']} unique categories (Naihati & Titagarh merged into 'Other_WB')")
    print("Pruned Distribution:")
    for item in pruned_stats["distribution"]:
        print(f" -> {item['category']:<16}: {item['count']:>2} records ({item['percentage']:>5.1f}%)")

    print("\n" + "=" * 85)
    print("SUKANTA HUI'S GOLDEN RULES FOR CATEGORICAL DATA:")
    print(" 1. NOMINAL DATA: Never use LabelEncoder for features in linear models or KNN. Use OneHotEncoder.")
    print(" 2. ORDINAL DATA: Explicitly map ranks preserving domain logic (e.g. {'Low':0, 'Med':1, 'High':2}).")
    print(" 3. HIGH CARDINALITY: Collapse rare categories (<1-2%) into 'Other' before encoding.")
    print(" 4. PRODUCTION DEPLOYMENT: Always configure handle_unknown='ignore' to prevent pipeline crashes.")
    print("=" * 85)


# =============================================================================
# 7. PRODUCTION SCIKIT-LEARN REFERENCE TEMPLATE
# =============================================================================
"""
# Ready-to-copy Scikit-Learn Template:
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder

# A. Nominal Features (e.g., City, Department)
ohe = OneHotEncoder(drop='first', handle_unknown='ignore', sparse_output=False)
X_nominal = ohe.fit_transform(df[['city']])

# B. Ordinal Features (e.g., Education Tier)
education_order = [['Secondary', 'Higher_Secondary', 'Bachelors', 'Masters']]
ord_enc = OrdinalEncoder(categories=education_order)
X_ordinal = ord_enc.fit_transform(df[['education']])
"""

if __name__ == "__main__":
    run_laboratory_experiment()
