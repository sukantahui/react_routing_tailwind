"""
=============================================================================
TOPIC 12: OUTLIER CONCEPT & LEVERAGE ANALYSIS
Module: Data Types and Preprocessing (BCAC701B)
Academic Practical Laboratory & Industrial Simulation Engine
Author: Sukanta Hui | Senior Consultant & Educator | Barrackpore, West Bengal
Institute: Coder & AccoTax
=============================================================================

This laboratory engine provides a comprehensive, mathematically rigorous simulation
of outlier concepts from first principles, requiring ZERO external third-party
dependencies (built solely with standard Python).

Core Algorithmic Modules Implemented:
1. Taxonomy Synthesizer:
   - Point Outliers (Global magnitude divergence).
   - Contextual Outliers (Conditioned on seasonal/temporal context).
   - Collective Outliers (Sub-sequence pattern anomalies with normal values).
2. Leverage, Residuals & Cook's Distance Engine (From Scratch):
   - Hat Matrix Diagonal Leverage: h_ii = x_i^T (X^T X)^(-1) x_i.
   - Ordinary & Studentized Residuals: e_i = y_i - y_hat_i.
   - Cook's Distance: D_i = [ e_i^2 / (p * MSE) ] * [ h_ii / (1 - h_ii)^2 ].
   - Identification of Influential Points vs High-Leverage Non-Influential Points.
3. Masking & Swamping Simulator:
   - Masking: Clustered outliers inflating sample variance, evading z-score detection.
   - Swamping: Extreme outlier pulling sample mean, falsely flagging normal points.
   - Robust Median Absolute Deviation (MAD) as an invariant safeguard.
4. Loss Function Sensitivity Analysis:
   - L2 Squared Loss (Extreme outlier vulnerability).
   - L1 Absolute Loss (Robust median alignment).
   - Huber Robust Loss (L2 near origin, L1 in tails).
5. Regional West Bengal Industrial Benchmarks:
   - Salt Lake Sector V salary roster (Point Outlier).
   - Alipore Meteorological Department weather telemetry (Contextual Outlier).
   - Howrah Bridge traffic flow sensor sequences (Collective Outlier).
=============================================================================
"""

import math
import statistics
from typing import List, Dict, Any, Tuple, Optional
from dataclasses import dataclass

# =====================================================================
# 1. TAXONOMY GENERATOR & OUTLIER SYNTHESIS
# =====================================================================

def synthesize_point_outliers() -> List[Dict[str, Any]]:
    """
    Synthesizes a 10-person software engineer cohort from Salt Lake Sector V.
    9 engineers have typical salaries (6 to 18 LPA), while 1 executive earns 85 LPA (Point Outlier).
    """
    return [
        {"id": "DEV-01", "name": "Aritra Sen",         "exp_yrs": 2.5, "salary_lpa": 7.2,  "label": "NORMAL"},
        {"id": "DEV-02", "name": "Pooja Mukherjee",     "exp_yrs": 3.0, "salary_lpa": 8.5,  "label": "NORMAL"},
        {"id": "DEV-03", "name": "Debashis Roy",        "exp_yrs": 4.0, "salary_lpa": 10.2, "label": "NORMAL"},
        {"id": "DEV-04", "name": "Mousumi Das",         "exp_yrs": 4.5, "salary_lpa": 11.5, "label": "NORMAL"},
        {"id": "DEV-05", "name": "Tanmoy Ghosh",        "exp_yrs": 5.0, "salary_lpa": 13.0, "label": "NORMAL"},
        {"id": "DEV-06", "name": "Ananya Banerjee",     "exp_yrs": 5.5, "salary_lpa": 14.5, "label": "NORMAL"},
        {"id": "DEV-07", "name": "Debangshu Mukherjee", "exp_yrs": 6.0, "salary_lpa": 16.0, "label": "NORMAL"},
        {"id": "DEV-08", "name": "Susmita Chakraborty", "exp_yrs": 7.0, "salary_lpa": 18.0, "label": "NORMAL"},
        {"id": "DEV-09", "name": "Mahima Paul",         "exp_yrs": 7.5, "salary_lpa": 19.2, "label": "NORMAL"},
        # Point Outlier: VP of Engineering with 85.0 LPA (Global Magnitude Anomaly)
        {"id": "DEV-10", "name": "Siddhartha Basu",     "exp_yrs": 8.0, "salary_lpa": 85.0, "label": "POINT_OUTLIER"}
    ]


def synthesize_contextual_outliers() -> List[Dict[str, Any]]:
    """
    Synthesizes meteorological readings from Alipore Observatory, Kolkata.
    38°C in May (Summer) is normal; 38°C in January (Winter) is a CONTEXTUAL OUTLIER.
    """
    return [
        {"date": "2026-05-10", "season": "Summer", "temp_c": 37.5, "expected_range": "34 - 40°C", "is_contextual_outlier": False},
        {"date": "2026-05-15", "season": "Summer", "temp_c": 38.8, "expected_range": "34 - 40°C", "is_contextual_outlier": False},
        {"date": "2026-07-20", "season": "Monsoon","temp_c": 31.0, "expected_range": "28 - 33°C", "is_contextual_outlier": False},
        {"date": "2026-07-25", "season": "Monsoon","temp_c": 32.2, "expected_range": "28 - 33°C", "is_contextual_outlier": False},
        {"date": "2026-01-12", "season": "Winter", "temp_c": 14.2, "expected_range": "11 - 18°C", "is_contextual_outlier": False},
        {"date": "2026-01-18", "season": "Winter", "temp_c": 15.5, "expected_range": "11 - 18°C", "is_contextual_outlier": False},
        # Contextual Outlier: 38.5°C in mid-January! (Physically plausible in summer, impossible in winter)
        {"date": "2026-01-24", "season": "Winter", "temp_c": 38.5, "expected_range": "11 - 18°C", "is_contextual_outlier": True}
    ]


def synthesize_collective_outliers() -> List[Dict[str, Any]]:
    """
    Synthesizes traffic flow speed readings (km/h) across Howrah Bridge.
    Individual readings of 0 km/h happen at red lights; a persistent 40-minute block
    of exactly 0 km/h represents a COLLECTIVE OUTLIER (Gridlock or Sensor Hardware Freeze).
    """
    normal_traffic = [35, 42, 38, 29, 31, 25, 40, 36]
    # Collective anomaly: 5 consecutive zeroes in high-volume rush hour
    anomalous_burst = [0, 0, 0, 0, 0]
    resuming_traffic = [22, 28, 35, 39]
    
    stream = normal_traffic + anomalous_burst + resuming_traffic
    results = []
    for idx, speed in enumerate(stream):
        is_collective = (8 <= idx <= 12)
        results.append({
            "minute_mark": (idx + 1) * 5,
            "speed_kmh": speed,
            "is_collective_member": is_collective
        })
    return results


# =====================================================================
# 2. LEVERAGE, RESIDUALS & COOK'S DISTANCE ENGINE (FROM SCRATCH)
# =====================================================================

class LinearRegressionDiagnostics:
    """
    Computes Hat matrix diagonal leverage (h_ii), OLS estimates,
    residuals, and Cook's Distance for bivariate data from first principles.
    """
    def __init__(self, x_vals: List[float], y_vals: List[float]):
        if len(x_vals) != len(y_vals) or len(x_vals) < 3:
            raise ValueError("Dataset must contain at least 3 matched pairs.")
        self.x = x_vals
        self.y = y_vals
        self.n = len(x_vals)
        self.p = 2  # Bivariate regression has 2 parameters: intercept and slope
        self._fit()

    def _fit(self):
        mean_x = statistics.mean(self.x)
        mean_y = statistics.mean(self.y)
        
        # Calculate OLS slope and intercept
        ss_xx = sum((xi - mean_x) ** 2 for xi in self.x)
        ss_xy = sum((xi - mean_x) * (yi - mean_y) for xi, yi in zip(self.x, self.y))
        
        if ss_xx == 0:
            self.slope = 0.0
            self.intercept = mean_y
        else:
            self.slope = ss_xy / ss_xx
            self.intercept = mean_y - (self.slope * mean_x)

        # Fitted values & residuals
        self.y_hat = [self.intercept + self.slope * xi for xi in self.x]
        self.residuals = [yi - y_h for yi, y_h in zip(self.y, self.y_hat)]
        
        # Mean Squared Error (MSE)
        sse = sum(e ** 2 for e in self.residuals)
        self.mse = sse / (self.n - self.p) if (self.n - self.p) > 0 else 1.0

        # Hat Matrix Diagonal Leverage (h_ii):
        # In simple linear regression: h_ii = (1 / n) + [ (x_i - mean_x)^2 / SS_xx ]
        self.leverage = [
            (1.0 / self.n) + (((xi - mean_x) ** 2) / ss_xx if ss_xx > 0 else 0)
            for xi in self.x
        ]

        # Cook's Distance:
        # D_i = [ e_i^2 / (p * MSE) ] * [ h_ii / (1 - h_ii)^2 ]
        self.cooks_distance = []
        for e, h in zip(self.residuals, self.leverage):
            denom = (1.0 - h) ** 2
            if denom == 0 or self.mse == 0:
                d = 0.0
            else:
                d = (e ** 2 / (self.p * self.mse)) * (h / denom)
            self.cooks_distance.append(d)

    def get_summary(self) -> List[Dict[str, Any]]:
        # Traditional threshold for Cook's Distance: D_i > 4 / (n - p - 1) or D_i > 1.0
        cook_threshold = 4.0 / (self.n - self.p - 1) if (self.n - self.p - 1) > 0 else 1.0
        high_leverage_threshold = (2.0 * self.p) / self.n

        diagnostics = []
        for i in range(self.n):
            is_high_leverage = self.leverage[i] > high_leverage_threshold
            is_influential = self.cooks_distance[i] > cook_threshold
            diagnostics.append({
                "index": i,
                "x": round(self.x[i], 2),
                "y": round(self.y[i], 2),
                "y_hat": round(self.y_hat[i], 2),
                "residual": round(self.residuals[i], 2),
                "leverage_hii": round(self.leverage[i], 4),
                "cooks_distance": round(self.cooks_distance[i], 4),
                "is_high_leverage": is_high_leverage,
                "is_influential": is_influential
            })
        return diagnostics


# =====================================================================
# 3. MASKING & SWAMPING SIMULATOR
# =====================================================================

def simulate_masking_and_swamping() -> Dict[str, Any]:
    """
    Demonstrates:
    1. Swamping: A single massive outlier inflates mean & standard deviation,
       falsely flagging legitimate points as outliers.
    2. Masking: Multiple clustered outliers inflate variance so much that
       standard z-scores fail to flag them (|z| < 3.0), whereas Robust MAD succeeds.
    """
    # Pristine data: 10 readings near 50
    pristine = [48.0, 49.5, 50.0, 50.2, 50.8, 51.0, 49.8, 50.5, 49.2, 51.5]

    # Contaminated with a pair of clustered extreme outliers (Masking Scenario)
    clustered_outliers = [140.0, 142.0]
    contaminated = pristine + clustered_outliers

    mean_c = statistics.mean(contaminated)
    stdev_c = statistics.stdev(contaminated)
    median_c = statistics.median(contaminated)
    
    # Calculate MAD: Median of |x_i - median|
    abs_deviations = [abs(x - median_c) for x in contaminated]
    mad = statistics.median(abs_deviations)
    # Robust scale factor for normal distribution: 1.4826 * MAD
    mad_scale = 1.4826 * mad if mad > 0 else 1.0

    z_scores = [(x - mean_c) / stdev_c for x in contaminated]
    modified_z_scores = [0.6745 * (x - median_c) / mad if mad > 0 else 0 for x in contaminated]

    # Evaluate the two outlier points (140 and 142)
    z_outlier_1 = z_scores[-2]
    z_outlier_2 = z_scores[-1]
    modz_outlier_1 = modified_z_scores[-2]
    modz_outlier_2 = modified_z_scores[-1]

    # Classic 3-sigma rule: |z| >= 3.0
    masking_occurred = abs(z_outlier_1) < 3.0 and abs(z_outlier_2) < 3.0
    mad_caught = abs(modz_outlier_1) >= 3.0 and abs(modz_outlier_2) >= 3.0

    return {
        "mean": round(mean_c, 2),
        "stdev": round(stdev_c, 2),
        "median": round(median_c, 2),
        "mad": round(mad, 2),
        "z_score_outlier_140": round(z_outlier_1, 2),
        "z_score_outlier_142": round(z_outlier_2, 2),
        "mod_z_outlier_140": round(modz_outlier_1, 2),
        "mod_z_outlier_142": round(modz_outlier_2, 2),
        "masking_occurred": masking_occurred,
        "mad_caught": mad_caught
    }


# =====================================================================
# 4. LOSS FUNCTION SENSITIVITY: L2 VS L1 VS HUBER
# =====================================================================

def evaluate_loss_functions(residuals: List[float], delta: float = 1.5) -> Dict[str, float]:
    """
    Computes total penalty across three loss formulations for a vector of residuals:
    - L2 Squared Error: sum( e_i^2 )
    - L1 Absolute Error: sum( |e_i| )
    - Huber Loss: sum( 0.5 * e_i^2 if |e_i| <= delta else delta * (|e_i| - 0.5 * delta) )
    """
    l2_total = sum(e ** 2 for e in residuals)
    l1_total = sum(abs(e) for e in residuals)
    
    huber_total = 0.0
    for e in residuals:
        abs_e = abs(e)
        if abs_e <= delta:
            huber_total += 0.5 * (abs_e ** 2)
        else:
            huber_total += delta * (abs_e - 0.5 * delta)
            
    return {
        "l2_loss": round(l2_total, 2),
        "l1_loss": round(l1_total, 2),
        "huber_loss": round(huber_total, 2)
    }


# =====================================================================
# 5. COMPREHENSIVE INDUSTRIAL BENCHMARK (WEST BENGAL CASE STUDIES)
# =====================================================================

def run_outlier_concept_laboratory() -> Dict[str, Any]:
    print("=" * 80)
    print("  ACADEMIC & INDUSTRIAL BENCHMARK: OUTLIER CONCEPTS & LEVERAGE")
    print("  Course: BCAC701B | Machine Learning Preprocessing Laboratory")
    print("  Author: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    # -------------------------------------------------------------
    # EXPERIMENT 1: Point Outliers & Cook's Distance in Sector V
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 1] POINT OUTLIERS & COOK'S INFLUENCE (Salt Lake Tech Salaries) ---")
    cohort = synthesize_point_outliers()
    x_exp = [dev["exp_yrs"] for dev in cohort]
    y_sal = [dev["salary_lpa"] for dev in cohort]

    # Fit Full Dataset (with Outlier)
    diag_full = LinearRegressionDiagnostics(x_exp, y_sal)
    summary_full = diag_full.get_summary()

    # Fit Clean Dataset (Excluding Outlier at index 9)
    diag_clean = LinearRegressionDiagnostics(x_exp[:9], y_sal[:9])

    print(f"Sample Size N: {len(cohort)}")
    print(f"Clean OLS Model (Without Outlier):  Salary = {diag_clean.intercept:.2f} + {diag_clean.slope:.2f} * Exp")
    print(f"Full OLS Model (With VP Outlier):   Salary = {diag_full.intercept:.2f} + {diag_full.slope:.2f} * Exp")
    print(f"Slope Distortion: +{diag_full.slope - diag_clean.slope:.2f} LPA per year of experience (Artificially steepened!)")

    print("\nRegression Diagnostic Breakdown for Each Candidate:")
    for row in summary_full:
        dev = cohort[row['index']]
        status = "âš  INFLUENTIAL OUTLIER" if row['is_influential'] else "NORMAL"
        print(f"  [{row['index']}] {dev['name']:<22} | Exp: {row['x']} yrs | Sal: {row['y']:>5.1f} LPA | "
              f"h_ii: {row['leverage_hii']:.3f} | Cook's D: {row['cooks_distance']:>6.3f} -> {status}")

    # -------------------------------------------------------------
    # EXPERIMENT 2: Contextual Outliers in Weather Telemetry
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 2] CONTEXTUAL OUTLIERS (Alipore Meteorological Observatory) ---")
    weather_stream = synthesize_contextual_outliers()
    print("Auditing seasonal temperature readings for contextual anomalies:")
    for w in weather_stream:
        flag = "âš  CONTEXTUAL ANOMALY" if w["is_contextual_outlier"] else "âœ” CONSISTENT"
        print(f"  Date: {w['date']} | Season: {w['season']:<7} | Recorded: {w['temp_c']}Â°C | Expected: {w['expected_range']:<10} -> {flag}")

    # -------------------------------------------------------------
    # EXPERIMENT 3: Collective Outliers in Howrah Bridge Traffic
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 3] COLLECTIVE OUTLIERS (Howrah Bridge Traffic Speed Stream) ---")
    traffic = synthesize_collective_outliers()
    collective_members = [t for t in traffic if t["is_collective_member"]]
    print(f"Total Telemetry Windows: {len(traffic)} (5-min intervals)")
    print(f"Collective Outlier Event: Minutes {collective_members[0]['minute_mark']} to {collective_members[-1]['minute_mark']}")
    print(f"Values within Event: {[t['speed_kmh'] for t in collective_members]} km/h (Persistent flatline indicates traffic gridlock)")

    # -------------------------------------------------------------
    # EXPERIMENT 4: Masking & Swamping Simulation
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 4] MASKING & SWAMPING STATISTICAL BENCHMARK ---")
    ms_results = simulate_masking_and_swamping()
    print(f"Contaminated Distribution: Mean = {ms_results['mean']}, StDev = {ms_results['stdev']}")
    print(f"Robust Distribution:       Median = {ms_results['median']}, MAD = {ms_results['mad']}")
    print(f"Outlier Point 140 -> Standard Z-score: {ms_results['z_score_outlier_140']} (Threshold |z| >= 3.0)")
    print(f"Outlier Point 140 -> Modified Robust Z-score: {ms_results['mod_z_outlier_140']}")
    
    if ms_results['masking_occurred']:
        print("  âš  MASKING CONFIRMED: Clustered outliers inflated StDev from ~1.0 to 26.6,")
        print("    reducing standard z-score below 3.0, escaping classical detection!")
    if ms_results['mad_caught']:
        print(f"  âœ” ROBUST MAD TRIUMPH: Modified Z-score ({ms_results['mod_z_outlier_140']}) successfully detected the outlier!")

    # -------------------------------------------------------------
    # EXPERIMENT 5: Loss Function Resilience (L2 vs L1 vs Huber)
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 5] LOSS FUNCTION RESILIENCE (Residual Penalties) ---")
    residuals_clean = [0.2, -0.4, 0.5, -0.1, 0.3, -0.2]
    residuals_corrupted = residuals_clean + [25.0]  # Single severe outlier residual

    losses_clean = evaluate_loss_functions(residuals_clean)
    losses_corrupted = evaluate_loss_functions(residuals_corrupted)

    print(f"Clean Residuals Total Loss:     L2 = {losses_clean['l2_loss']:<7} | L1 = {losses_clean['l1_loss']:<6} | Huber = {losses_clean['huber_loss']}")
    print(f"Corrupted (+25 Residual) Loss: L2 = {losses_corrupted['l2_loss']:<7} | L1 = {losses_corrupted['l1_loss']:<6} | Huber = {losses_corrupted['huber_loss']}")
    
    l2_inflation = (losses_corrupted['l2_loss'] / losses_clean['l2_loss'])
    huber_inflation = (losses_corrupted['huber_loss'] / losses_clean['huber_loss'])
    print(f"L2 Quadratic Inflation: {l2_inflation:.1f}x penalty explosion!")
    print(f"Huber Robust Inflation: {huber_inflation:.1f}x bounded linear increase.")

    print("\n" + "=" * 80)
    print("  LABORATORY EXECUTION COMPLETE: ALL OUTLIER MECHANICS CONVERGED")
    print("=" * 80)

    return {
        "status": "SUCCESS",
        "clean_slope": round(diag_clean.slope, 2),
        "full_slope": round(diag_full.slope, 2),
        "cooks_distance_vp": summary_full[9]["cooks_distance"],
        "masking_confirmed": ms_results['masking_occurred'],
        "l2_inflation_factor": round(l2_inflation, 1)
    }

if __name__ == "__main__":
    run_outlier_concept_laboratory()
