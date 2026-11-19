"""
=============================================================================
TOPIC 19: ONE-HOT ENCODING (OHE)
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Industrial Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
=============================================================================

This laboratory engine demonstrates from first principles (Pure Python, Zero External Dependencies):
1. Orthogonal standard basis vector construction e_k in R^K and metric equidistance ||e_i - e_j|| = sqrt(2).
2. The Dummy Variable Trap: Algebraic proof of Gram matrix singularity det(X^T X) = 0 with an intercept.
3. Drop-First Reference Category Encoding: Restoring matrix invertibility and computing differential contrasts.
4. Compressed Sparse Row (CSR) Sparse Representation: Byte-level memory audit vs dense float arrays.
5. Infrequent Category Grouping / Threshold Pooling (min_frequency cutoff) to control feature explosion.
6. Handling Unseen Categories in Production Inference via handle_unknown='ignore' all-zero fallback.
7. Empirical simulation of OLS Linear Regression coefficients before and after dummy trap resolution.
=============================================================================
"""

import math
import sys
from typing import List, Dict, Any, Tuple, Optional, Set

# =====================================================================
# DATASET GENERATION: KOLKATA METRO & SECTOR V CONTRACT DATASET
# =====================================================================

def get_kolkata_procurement_data() -> List[Dict[str, Any]]:
    """
    Returns realistic engineering procurement records for infrastructure projects in West Bengal:
    - vendor_id: Vendor tracking ID
    - category: Engineering domain (Civil, Electrical, Signalling, Trackwork, Rolling-Stock, Rare-Ventilation)
    - district: Vendor HQ district (North 24 Parganas, Kolkata, Howrah, Hooghly)
    - project_budget_cr: Contract value in Crores (target)
    - quality_score: Audit quality score (0 to 100)
    """
    return [
        {"id": "V-01", "name": "L&T Infrastructure", "dept": "Civil", "district": "Kolkata", "budget_cr": 45.2, "score": 92},
        {"id": "V-02", "name": "Siemens Mobility", "dept": "Electrical", "district": "Salt Lake", "budget_cr": 28.5, "score": 88},
        {"id": "V-03", "name": "Alstom Signalling", "dept": "Signalling", "district": "Kolkata", "budget_cr": 34.0, "score": 95},
        {"id": "V-04", "name": "Titagarh Wagons", "dept": "Rolling-Stock", "district": "Barrackpore", "budget_cr": 62.0, "score": 91},
        {"id": "V-05", "name": "Texmaco Rail", "dept": "Trackwork", "district": "Kolkata", "budget_cr": 19.5, "score": 84},
        {"id": "V-06", "name": "Simplex Infrastructures", "dept": "Civil", "district": "Kolkata", "budget_cr": 41.0, "score": 82},
        {"id": "V-07", "name": "Schneider Electric", "dept": "Electrical", "district": "Salt Lake", "budget_cr": 26.0, "score": 89},
        {"id": "V-08", "name": "Howrah Track Tools", "dept": "Trackwork", "district": "Howrah", "budget_cr": 16.8, "score": 79},
        {"id": "V-09", "name": "Barrackpore Heavy Eng", "dept": "Rolling-Stock", "district": "Barrackpore", "budget_cr": 58.5, "score": 87},
        {"id": "V-10", "name": "Ansaldo STS", "dept": "Signalling", "district": "Salt Lake", "budget_cr": 31.2, "score": 93},
        {"id": "V-11", "name": "Bengal HVAC Systems", "dept": "Rare-Ventilation", "district": "Hooghly", "budget_cr": 8.5, "score": 75}, # Rare category
    ]

# =====================================================================
# 1. PURE PYTHON ONE-HOT ENCODER WITH INFREQUENT GROUPING & CSR
# =====================================================================

class OneHotEncoderEngine:
    """
    Production-grade One-Hot Encoder implemented from scratch:
    - Supports drop_first=True/False
    - Supports handle_unknown='ignore' | 'error'
    - Supports min_frequency threshold pooling into 'infrequent_sklearn' ('Other')
    - Can output dense 2D list or Compressed Sparse Row (CSR) representation
    """
    def __init__(
        self,
        drop_first: bool = False,
        handle_unknown: str = "ignore",
        min_frequency: Optional[int] = None
    ):
        self.drop_first = drop_first
        self.handle_unknown = handle_unknown
        self.min_frequency = min_frequency

        self.categories_: List[str] = []
        self.dropped_category_: Optional[str] = None
        self.infrequent_categories_: Set[str] = set()
        self.has_infrequent_: bool = False
        self.cat_to_idx_: Dict[str, int] = {}

    def fit(self, values: List[str]):
        # Count frequencies
        counts: Dict[str, int] = {}
        for val in values:
            counts[val] = counts.get(val, 0) + 1

        # Determine infrequent categories if threshold set
        frequent_cats = []
        self.infrequent_categories_ = set()
        if self.min_frequency is not None and self.min_frequency > 1:
            for cat, cnt in counts.items():
                if cnt < self.min_frequency:
                    self.infrequent_categories_.add(cat)
                else:
                    frequent_cats.append(cat)
            frequent_cats.sort()
            if self.infrequent_categories_:
                self.has_infrequent_ = True
                frequent_cats.append("infrequent_other")
        else:
            frequent_cats = sorted(list(counts.keys()))

        if self.drop_first and len(frequent_cats) > 1:
            self.dropped_category_ = frequent_cats[0]
            self.categories_ = frequent_cats[1:]
        else:
            self.dropped_category_ = None
            self.categories_ = frequent_cats

        self.cat_to_idx_ = {cat: idx for idx, cat in enumerate(self.categories_)}
        return self

    def transform_dense(self, values: List[str]) -> List[List[float]]:
        dim = len(self.categories_)
        output_matrix = []

        for val in values:
            vec = [0.0] * dim
            target_cat = val
            if val in self.infrequent_categories_:
                target_cat = "infrequent_other"

            if target_cat in self.cat_to_idx_:
                vec[self.cat_to_idx_[target_cat]] = 1.0
            elif self.drop_first and target_cat == self.dropped_category_:
                # Reference category: all-zero vector
                pass
            else:
                if self.handle_unknown == "error":
                    raise ValueError(f"Encountered unknown category: '{val}' during transform.")
                # "ignore": leave as all zeros
            output_matrix.append(vec)

        return output_matrix

    def transform_csr(self, values: List[str]) -> Dict[str, Any]:
        """
        Transforms input into Compressed Sparse Row (CSR) arrays:
        - data: non-zero floating values (all 1.0)
        - indices: column indices for each non-zero element
        - indptr: index pointers marking the start of each row
        """
        data: List[float] = []
        indices: List[int] = []
        indptr: List[int] = [0]

        for val in values:
            target_cat = val
            if val in self.infrequent_categories_:
                target_cat = "infrequent_other"

            if target_cat in self.cat_to_idx_:
                col_idx = self.cat_to_idx_[target_cat]
                data.append(1.0)
                indices.append(col_idx)
            indptr.append(len(data))

        return {
            "data": data,
            "indices": indices,
            "indptr": indptr,
            "shape": (len(values), len(self.categories_)),
            "nnz": len(data)
        }

# =====================================================================
# 2. LINEAR ALGEBRA & DUMMY VARIABLE TRAP DETECTOR
# =====================================================================

def compute_gram_matrix(X: List[List[float]]) -> List[List[float]]:
    """Computes X^T @ X."""
    N = len(X)
    d = len(X[0])
    # Initialize d x d matrix
    XTX = [[0.0] * d for _ in range(d)]
    for i in range(d):
        for j in range(d):
            val = 0.0
            for r in range(N):
                val += X[r][i] * X[r][j]
            XTX[i][j] = val
    return XTX

def compute_matrix_determinant(A: List[List[float]]) -> float:
    """
    Computes determinant of square matrix A via Gaussian elimination with partial pivoting.
    """
    n = len(A)
    # Deep copy
    M = [row[:] for row in A]
    det = 1.0

    for i in range(n):
        # Find pivot
        pivot_row = i
        max_val = abs(M[i][i])
        for r in range(i + 1, n):
            if abs(M[r][i]) > max_val:
                max_val = abs(M[r][i])
                pivot_row = r

        if max_val < 1e-12:
            return 0.0

        if pivot_row != i:
            M[i], M[pivot_row] = M[pivot_row], M[i]
            det *= -1.0

        det *= M[i][i]
        pivot = M[i][i]

        for r in range(i + 1, n):
            factor = M[r][i] / pivot
            for c in range(i, n):
                M[r][c] -= factor * M[i][c]

    return det

def solve_ols_system(X: List[List[float]], y: List[float]) -> Optional[List[float]]:
    """
    Solves OLS normal equation: (X^T X) beta = X^T y using Gaussian elimination.
    Returns None if (X^T X) is singular (det = 0).
    """
    XTX = compute_gram_matrix(X)
    d = len(XTX)
    
    # Compute X^T y
    XTy = [0.0] * d
    for i in range(d):
        for r in range(len(X)):
            XTy[i] += X[r][i] * y[r]

    # Augmented matrix [XTX | XTy]
    Aug = [XTX[r] + [XTy[r]] for r in range(d)]

    # Forward elimination
    for i in range(d):
        pivot_row = i
        max_val = abs(Aug[i][i])
        for r in range(i + 1, d):
            if abs(Aug[r][i]) > max_val:
                max_val = abs(Aug[r][i])
                pivot_row = r

        if max_val < 1e-9:
            # Singular matrix!
            return None

        if pivot_row != i:
            Aug[i], Aug[pivot_row] = Aug[pivot_row], Aug[i]

        pivot = Aug[i][i]
        for c in range(i, d + 1):
            Aug[i][c] /= pivot

        for r in range(d):
            if r != i:
                factor = Aug[r][i]
                for c in range(i, d + 1):
                    Aug[r][c] -= factor * Aug[i][c]

    # Extract solution
    beta = [Aug[i][d] for i in range(d)]
    return beta

# =====================================================================
# LABORATORY BENCHMARK SUITE
# =====================================================================

def run_laboratory():
    print("=" * 80)
    print("CODER & ACCOTAX - PURE PYTHON MACHINE LEARNING LAB (TOPIC 19)")
    print("ONE-HOT ENCODING (OHE): ALGEBRAIC RIGOR, DUMMY TRAP & SPARSE SCALING")
    print("Course: BCAC701B | Guide: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    dataset = get_kolkata_procurement_data()
    departments = [d["dept"] for d in dataset]
    budgets = [d["budget_cr"] for d in dataset]

    print(f"\n[1] INSPECTING RAW KOLKATA INFRASTRUCTURE PROCUREMENT DATA ({len(dataset)} records):")
    print("-" * 75)
    print(f"{'ID':<6} {'Vendor Name':<26} {'Department':<18} {'Budget (₹ Cr)':<14} {'Score'}")
    print("-" * 75)
    for row in dataset[:6]:
        print(f"{row['id']:<6} {row['name']:<26} {row['dept']:<18} ₹{row['budget_cr']:<12.1f} {row['score']}")
    print("...")

    # --- EXPERIMENT 1: ORTHOGONAL GEOMETRY & EQUIDISTANCE ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 1] ORTHOGONAL BASIS GEOMETRY & EQUIDISTANCE PROOF")
    print("=" * 80)
    ohe_engine = OneHotEncoderEngine(drop_first=False)
    ohe_engine.fit(departments)
    dense_ohe = ohe_engine.transform_dense(departments)

    print(f"Discovered K = {len(ohe_engine.categories_)} categories: {ohe_engine.categories_}\n")
    print("First 3 Encoded Row Vectors:")
    for i in range(3):
        print(f"  {dataset[i]['name']:<24} ({dataset[i]['dept']:<16}) -> {dense_ohe[i]}")

    # Compute inner product and distance between Sample 0 (Civil) and Sample 1 (Electrical)
    v0 = dense_ohe[0]
    v1 = dense_ohe[1]
    dot_prod = sum(a * b for a, b in zip(v0, v1))
    euclid_dist = math.sqrt(sum((a - b) ** 2 for a, b in zip(v0, v1)))

    print("\nGeometric Audit:")
    print(f"  Inner Product <v_Civil, v_Electrical> = {dot_prod:.4f} (Strictly Orthogonal!)")
    print(f"  Euclidean Distance ||v_Civil - v_Electrical||_2 = {euclid_dist:.4f} (Exactly sqrt(2) = {math.sqrt(2):.4f})")
    print("  CONFIRMATION: Every distinct category is mutually orthogonal and equidistant.")

    # --- EXPERIMENT 2: THE DUMMY VARIABLE TRAP (SINGULAR GRAM MATRIX) ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 2] THE DUMMY VARIABLE TRAP: PROOF OF SINGULARITY det(X^T X) = 0")
    print("=" * 80)
    print("Constructing Design Matrix X_full with Intercept Column [1] + ALL K One-Hot Columns...")
    
    X_trap = []
    for row in dense_ohe:
        X_trap.append([1.0] + row)  # [intercept, cat1, cat2, ..., catK]

    XTX_trap = compute_gram_matrix(X_trap)
    det_trap = compute_matrix_determinant(XTX_trap)
    print(f"Design Matrix Shape: {len(X_trap)} rows x {len(X_trap[0])} columns")
    print(f"Gram Matrix (X^T X) Size: {len(XTX_trap)} x {len(XTX_trap)}")
    print(f"Computed Determinant det(X^T X): {det_trap:.6e}")

    ols_trap_solution = solve_ols_system(X_trap, budgets)
    print(f"Attempting Ordinary Least Squares beta = (X^T X)^(-1) X^T y...")
    if ols_trap_solution is None:
        print("  CRITICAL SYSTEM FAILURE: (X^T X) IS SINGULAR (RANK-DEFICIENT)!")
        print("  The intercept column is an exact linear combination of the K dummy columns:")
        print("      sum_{k=1}^K x_{ik} = 1.0 = x_{i, intercept}")
        print("  OLS CANNOT COMPUTE A UNIQUE INVERSE.")

    # --- EXPERIMENT 3: DROP-FIRST RESOLUTION & BASELINE INTERPRETATION ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 3] DROP-FIRST RESOLUTION & INTERPRETABLE CONTRAST COEFFICIENTS")
    print("=" * 80)
    ohe_drop = OneHotEncoderEngine(drop_first=True)
    ohe_drop.fit(departments)
    dense_drop = ohe_drop.transform_dense(departments)

    print(f"Dropped Reference Category: '{ohe_drop.dropped_category_}'")
    print(f"Active K-1 Columns ({len(ohe_drop.categories_)}): {ohe_drop.categories_}\n")

    X_safe = []
    for row in dense_drop:
        X_safe.append([1.0] + row)

    XTX_safe = compute_gram_matrix(X_safe)
    det_safe = compute_matrix_determinant(XTX_safe)
    print(f"Safe Gram Matrix Determinant det(X_safe^T X_safe): {det_safe:.4f} (Strictly Non-Zero!)")

    beta_safe = solve_ols_system(X_safe, budgets)
    print("\nFitted OLS Regression Coefficients:")
    print(f"  Intercept beta_0 (Baseline Mean for '{ohe_drop.dropped_category_}'): ₹{beta_safe[0]:.2f} Cr")
    for idx, cat in enumerate(ohe_drop.categories_):
        diff = beta_safe[idx + 1]
        expected_cat = beta_safe[0] + diff
        print(f"  Category '{cat:<16}' beta_{idx+1}: {diff:>+8.2f} Cr  (Expected Budget: ₹{expected_cat:.2f} Cr)")

    # --- EXPERIMENT 4: SPARSE CSR MATRIX VS DENSE MEMORY SCALING ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 4] COMPRESSED SPARSE ROW (CSR) MEMORY SCALING SIMULATION")
    print("=" * 80)
    csr_data = ohe_engine.transform_csr(departments)
    print("CSR Representation Structure:")
    print(f"  shape: {csr_data['shape']}")
    print(f"  nnz (Non-Zero Elements): {csr_data['nnz']}")
    print(f"  data[:6]   : {csr_data['data'][:6]}")
    print(f"  indices[:6]: {csr_data['indices'][:6]}")
    print(f"  indptr     : {csr_data['indptr']}")

    # Big-O RAM audit for 500,000 procurement transactions across K=2,500 postal codes:
    N_sim = 500_000
    K_sim = 2_500
    dense_bytes = N_sim * K_sim * 8  # float64
    dense_mb = dense_bytes / (1024 * 1024)
    # CSR: data (N*8) + indices (N*4) + indptr ((N+1)*4)
    csr_bytes = (N_sim * 8) + (N_sim * 4) + ((N_sim + 1) * 4)
    csr_mb = csr_bytes / (1024 * 1024)
    savings_pct = (1.0 - (csr_bytes / dense_bytes)) * 100

    print(f"\nSimulated RAM Consumption for N={N_sim:,} orders & K={K_sim:,} Pincodes:")
    print(f"  Dense Numpy Array (float64): {dense_mb:>10.2f} MB ({dense_mb/1024:.2f} GB)")
    print(f"  Scipy CSR Matrix (int32/f64): {csr_mb:>10.2f} MB")
    print(f"  RAM Reduction: {savings_pct:.2f}% Memory Saved!")

    # --- EXPERIMENT 5: INFREQUENT CATEGORY POOLING (MIN_FREQUENCY) ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 5] INFREQUENT CATEGORY POOLING (min_frequency = 2)")
    print("=" * 80)
    ohe_pooled = OneHotEncoderEngine(drop_first=False, min_frequency=2)
    ohe_pooled.fit(departments)
    print(f"Infrequent Categories Pooled into 'infrequent_other': {ohe_pooled.infrequent_categories_}")
    print(f"Final Retained Categories ({len(ohe_pooled.categories_)}): {ohe_pooled.categories_}")
    
    rare_sample = ["Rare-Ventilation"]
    encoded_rare = ohe_pooled.transform_dense(rare_sample)
    print(f"Transformation of rare sample 'Rare-Ventilation':")
    print(f"  Vector: {encoded_rare[0]}")
    print(f"  Active Column: '{ohe_pooled.categories_[encoded_rare[0].index(1.0)]}'")

    # --- EXPERIMENT 6: UNSEEN PRODUCTION CATEGORY HANDLING ---
    print("\n" + "=" * 80)
    print("[EXPERIMENT 6] UNSEEN CATEGORY HANDLING (handle_unknown='ignore')")
    print("=" * 80)
    unseen_samples = ["Civil", "Nuclear-Shielding", "Electrical", "Quantum-Computing"]
    print(f"Incoming production API payload: {unseen_samples}")
    encoded_unseen = ohe_engine.transform_dense(unseen_samples)
    for name, vec in zip(unseen_samples, encoded_unseen):
        status = "Recognized" if 1.0 in vec else "Unseen -> All-Zero Baseline Fallback"
        print(f"  {name:<20} -> {vec}  ({status})")

    print("\n" + "=" * 80)
    print("ALL 6 PRACTICAL EXPERIMENTS COMPLETED SUCCESSFULLY WITH EXIT CODE 0.")
    print("=" * 80)

if __name__ == "__main__":
    run_laboratory()
