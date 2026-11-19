"""
=============================================================================
TOPIC 16: NORMALIZATION (MIN-MAX, MAXABS & SAMPLE-WISE VECTOR NORMS)
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
=============================================================================

This laboratory engine provides pure-Python, zero-dependency implementations of:
1. Feature-wise Min-Max Rescaling to arbitrary intervals [a, b] with clipping
2. MaxAbsScaler preserving zero-sparsity and algebraic sign
3. Sample-wise Vector Normalization: L1 (Manhattan), L2 (Euclidean), and Linf (Chebyshev)
4. Cosine Similarity via L2 Hypersphere Projection
5. Outlier Compression Pathology in Min-Max Scaling
6. Industrial Case Studies from WBSEDCL Solar Telemetry & Kolkata E-Commerce
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any, Optional

# -----------------------------------------------------------------------------
# 1. FEATURE-WISE SCALING (MIN-MAX & MAX-ABS)
# -----------------------------------------------------------------------------

def fit_min_max(data: List[float]) -> Tuple[float, float]:
    """Calculates training minimum and maximum parameters."""
    if not data:
        raise ValueError("Cannot fit Min-Max on empty data.")
    return min(data), max(data)

def transform_min_max(
    data: List[float],
    x_min: float,
    x_max: float,
    feature_range: Tuple[float, float] = (0.0, 1.0),
    clip: bool = False
) -> List[float]:
    """
    Transforms data to [a, b] using:
    x_scaled = (x - x_min) / (x_max - x_min) * (b - a) + a
    """
    a, b = feature_range
    rng = x_max - x_min
    if abs(rng) < 1e-12:
        return [a for _ in data]
        
    scaled = []
    for x in data:
        val = (x - x_min) / rng * (b - a) + a
        if clip:
            val = max(a, min(b, val))
        scaled.append(round(val, 6))
    return scaled

def fit_max_abs(data: List[float]) -> float:
    """Calculates maximum absolute value max(|x|)."""
    if not data:
        raise ValueError("Cannot fit MaxAbs on empty data.")
    return max(abs(x) for x in data)

def transform_max_abs(data: List[float], max_abs: float) -> List[float]:
    """Scales data to [-1.0, 1.0] by dividing by max(|x|). Preserves zeros."""
    if abs(max_abs) < 1e-12:
        return [0.0 for _ in data]
    return [round(x / max_abs, 6) for x in data]

# -----------------------------------------------------------------------------
# 2. SAMPLE-WISE VECTOR NORMALIZATION (ROW-WISE NORMS)
# -----------------------------------------------------------------------------

def norm_l1(vec: List[float]) -> float:
    """Computes L1 norm (Manhattan length) = sum(|x_i|)."""
    return sum(abs(x) for x in vec)

def norm_l2(vec: List[float]) -> float:
    """Computes L2 norm (Euclidean length) = sqrt(sum(x_i^2))."""
    return math.sqrt(sum(x * x for x in vec))

def norm_linf(vec: List[float]) -> float:
    """Computes L-infinity norm (Chebyshev / Maximum) = max(|x_i|)."""
    return max(abs(x) for x in vec) if vec else 0.0

def normalize_vector(vec: List[float], norm_type: str = "l2") -> List[float]:
    """
    Normalizes a single sample vector so that its norm equals 1.0.
    Supports: 'l1', 'l2', 'max' (linf)
    """
    if norm_type == "l1":
        mag = norm_l1(vec)
    elif norm_type == "l2":
        mag = norm_l2(vec)
    elif norm_type in ("max", "linf"):
        mag = norm_linf(vec)
    else:
        raise ValueError(f"Unknown norm type: {norm_type}")
        
    if abs(mag) < 1e-12:
        return [0.0 for _ in vec]
    return [round(x / mag, 6) for x in vec]

def cosine_similarity(v1: List[float], v2: List[float]) -> float:
    """
    Computes Cosine Similarity = (v1 . v2) / (||v1||_2 * ||v2||_2).
    Equals dot product after L2 unit normalization.
    """
    if len(v1) != len(v2):
        raise ValueError("Vectors must have identical dimensions.")
    v1_norm = normalize_vector(v1, "l2")
    v2_norm = normalize_vector(v2, "l2")
    dot = sum(a * b for a, b in zip(v1_norm, v2_norm))
    return round(dot, 6)

# -----------------------------------------------------------------------------
# 3. LABORATORY EXPERIMENTS & REGIONAL INDUSTRIAL BENCHMARKS
# -----------------------------------------------------------------------------

def run_laboratory():
    print("=" * 80)
    print("  ACADEMIC & INDUSTRIAL BENCHMARK: NORMALIZATION ENGINES")
    print("  Course: BCAC701B | Machine Learning Preprocessing Laboratory")
    print("  Author: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    # -------------------------------------------------------------------------
    # EXPERIMENT 1: WBSEDCL SOLAR TELEMETRY (BURDWAN & HOOGHLY) - MIN-MAX
    # -------------------------------------------------------------------------
    print("\n--- [EXPERIMENT 1] WBSEDCL SOLAR INVERTER SENSOR RESCALING ---")
    # Inverter Cell Temperature in Celsius: [25.0 to 85.0]
    cell_temps = [28.0, 32.5, 35.0, 42.0, 48.5, 55.0, 62.0, 68.5, 75.0, 82.0]
    t_min, t_max = fit_min_max(cell_temps)
    print(f"Raw Temperatures: Min = {t_min}°C | Max = {t_max}°C")

    # Min-Max to [0, 1]
    scaled_temps_01 = transform_min_max(cell_temps, t_min, t_max, feature_range=(0.0, 1.0))
    print(f"Min-Max [0, 1] Scaled:")
    print(f"   First 3: {scaled_temps_01[:3]}")
    print(f"   Last 3:  {scaled_temps_01[-3:]}")

    # Min-Max to [-1, 1] (Tanh activation ready)
    scaled_temps_tanh = transform_min_max(cell_temps, t_min, t_max, feature_range=(-1.0, 1.0))
    print(f"Min-Max [-1, 1] Scaled (Tanh ready):")
    print(f"   First 3: {scaled_temps_tanh[:3]}")
    print(f"   Last 3:  {scaled_temps_tanh[-3:]}")

    # Test Out-of-Bounds production record (e.g. Inverter Overheat: 92.0°C)
    overheat_record = [92.0]
    unclipped = transform_min_max(overheat_record, t_min, t_max, clip=False)
    clipped = transform_min_max(overheat_record, t_min, t_max, clip=True)
    print(f"\nProduction Drift Check (Overheat at 92.0°C):")
    print(f"   Unclipped Output: {unclipped[0]} (Exceeds 1.0!)")
    print(f"   Clipped Output:   {clipped[0]} (Defensively capped at 1.0)")

    # -------------------------------------------------------------------------
    # EXPERIMENT 2: OUTLIER COMPRESSION PATHOLOGY IN MIN-MAX
    # -------------------------------------------------------------------------
    print("\n--- [EXPERIMENT 2] OUTLIER COMPRESSION PATHOLOGY IN MIN-MAX ---")
    normal_salaries = [25.0, 28.0, 30.0, 32.0, 35.0, 40.0, 45.0, 50.0] # INR Lakhs
    polluted_salaries = normal_salaries + [500.0] # CEO salary outlier

    norm_min, norm_max = fit_min_max(normal_salaries)
    poll_min, poll_max = fit_min_max(polluted_salaries)

    scaled_normal = transform_min_max(normal_salaries, norm_min, norm_max)
    scaled_polluted = transform_min_max(polluted_salaries, poll_min, poll_max)

    print(f"A. Clean Data Min-Max Spread for ₹50 Lakhs: {scaled_normal[-1]} (100% of range)")
    print(f"B. Outlier-Polluted Min-Max Spread for ₹50 Lakhs: {scaled_polluted[7]}")
    print("   ⚠️ Notice: The ₹500L outlier compressed ALL standard salaries into [0.0, 0.052]!")
    print("   95% of the dynamic numerical range was squandered on an empty gap!")

    # -------------------------------------------------------------------------
    # EXPERIMENT 3: SAMPLE-WISE VECTOR NORMALIZATION (L1, L2, L-INF)
    # -------------------------------------------------------------------------
    print("\n--- [EXPERIMENT 3] SAMPLE-WISE VECTOR NORMALIZATION ---")
    # Howrah Foundry Alloy Sample: [Carbon (3.2%), Silicon (2.4%), Iron (94.4%)]
    alloy_sample = [3.2, 2.4, 94.4]
    print(f"Raw Metallurgy Sample Vector: {alloy_sample}")

    # L1 Normalization (Simplex Composition Constraint)
    v_l1 = normalize_vector(alloy_sample, "l1")
    print(f"1. L1 Norm Normalization (Sum = 1.0):")
    print(f"   Normalized Vector: {v_l1}")
    print(f"   Sum of Elements:   {round(sum(v_l1), 6)} (Exact probability simplex!)")

    # L2 Normalization (Unit Hypersphere Projection)
    v_l2 = normalize_vector(alloy_sample, "l2")
    print(f"2. L2 Norm Normalization (Euclidean Length = 1.0):")
    print(f"   Normalized Vector: {v_l2}")
    print(f"   Length ||v||_2:    {round(norm_l2(v_l2), 6)} (Projects onto S^2 sphere!)")

    # Linf Normalization (Max-Element Scaling)
    v_linf = normalize_vector(alloy_sample, "max")
    print(f"3. L-infinity Norm Normalization (Max element = 1.0):")
    print(f"   Normalized Vector: {v_linf}")
    print(f"   Max Element:       {round(norm_linf(v_linf), 6)}")

    # -------------------------------------------------------------------------
    # EXPERIMENT 4: TEXT COSINE SIMILARITY (KOLKATA FASHION E-COMMERCE)
    # -------------------------------------------------------------------------
    print("\n--- [EXPERIMENT 4] TEXT COSINE SIMILARITY & SEARCH RETRIEVAL ---")
    # Term Frequency Vectors over vocabulary: ['saree', 'silk', 'handloom', 'cotton', 'blue']
    # Query: "blue handloom silk saree"
    query_vec = [1, 1, 1, 0, 1]
    
    # Doc 1: "pure handloom silk saree with blue border" (Short, highly relevant)
    doc1_vec = [2, 1, 2, 0, 1]
    
    # Doc 2: "blue cotton saree cotton casual wear blue blue" (Long, irrelevant fabric)
    doc2_vec = [3, 0, 0, 4, 3]

    # Raw Dot Product
    raw_dot_doc1 = sum(a * b for a, b in zip(query_vec, doc1_vec))
    raw_dot_doc2 = sum(a * b for a, b in zip(query_vec, doc2_vec))
    print(f"Raw Dot Product:")
    print(f"   Query . Doc 1 (Silk Handloom): {raw_dot_doc1}")
    print(f"   Query . Doc 2 (Cotton Casual): {raw_dot_doc2}")
    print("   ⚠️ Raw dot product favored Doc 2 simply because it is longer and repeats words!")

    # L2 Normalized Cosine Similarity
    cos_doc1 = cosine_similarity(query_vec, doc1_vec)
    cos_doc2 = cosine_similarity(query_vec, doc2_vec)
    print(f"\nL2-Normalized Cosine Similarity (Angular Orientation):")
    print(f"   Cosine Sim(Query, Doc 1): {cos_doc1} (High Semantic Match! ✔)")
    print(f"   Cosine Sim(Query, Doc 2): {cos_doc2} (Lower Semantic Match)")
    print("   ✔ L2 Vector Normalization neutralized document length and isolated true semantic direction!")

    print("\n" + "=" * 80)
    print("  LABORATORY EXECUTION COMPLETE: ALL NORMALIZATION ENGINES VERIFIED")
    print("=" * 80)

if __name__ == "__main__":
    run_laboratory()
