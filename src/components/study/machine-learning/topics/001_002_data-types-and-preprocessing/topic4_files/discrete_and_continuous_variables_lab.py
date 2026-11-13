"""
=============================================================================
TOPIC 4: DISCRETE AND CONTINUOUS VARIABLES (TAXONOMY, DISTRIBUTIONS & BINNING)
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Interactive Simulation Engine
Author: Sukanta Hui | Senior Academic Mentor | Coder & AccoTax
Location: Barrackpore, West Bengal, India
Course Code: BCAC701B / MCA / B.Tech Computer Science
=============================================================================

This laboratory engine demonstrates:
1. Numerical Taxonomy: Mathematical properties separating Discrete Counts from Continuous Measurements.
2. Probability Mass Function (PMF) vs Probability Density Function (PDF):
   - Discrete Poisson PMF: Evaluating exact integer probabilities P(X = k).
   - Continuous Gaussian PDF: Evaluating continuous densities f(x) and interval integrals P(a <= X <= b).
3. The Linear Model Failure on Count Targets:
   - Why Ordinary Least Squares (OLS) predicts impossible negative counts.
   - Why Poisson Generalized Linear Models (lambda = exp(w^T x)) are required.
4. Continuous Discretization & Binning Engine:
   - Equal-Width Binning vs Equal-Frequency (Quantile) Binning on continuous clinical measurements.
5. Real-World Case Study: Barrackpore Medicare Emergency Patient Ingestion Cohort.
=============================================================================
"""

import math
import random
from typing import List, Dict, Any, Tuple

# =============================================================================
# 1. SYNTHETIC CLINICAL COHORT GENERATOR (BARRACKPORE MEDICARE)
# =============================================================================

def generate_clinical_cohort(n: int = 50, seed: int = 42) -> List[Dict[str, Any]]:
    """
    Generates realistic patient records containing both Discrete and Continuous numerical features.
    Discrete Variables:
      - num_prior_admissions (Discrete Count, integer in [0, 6])
      - num_chronic_medications (Discrete Count, integer in [0, 8])
    Continuous Variables:
      - body_temp_celsius (Continuous, e.g. 36.5 to 40.2 C)
      - serum_creatinine_mg_dl (Continuous, e.g. 0.6 to 4.2 mg/dL)
      - stay_duration_hours (Continuous, e.g. 12.0 to 140.0 hours)
    """
    random.seed(seed)
    cohort = []
    
    for i in range(n):
        # Discrete variables (Countable integers)
        priors = int(random.expovariate(0.8))  # Poisson-like integer distribution
        priors = min(priors, 6)
        meds = random.randint(0, 7)
        
        # Continuous variables (Smooth real numbers with decimals)
        temp = round(random.gauss(37.4, 0.9), 2)
        temp = max(36.0, min(41.0, temp))
        
        creatinine = round(random.expovariate(0.9) + 0.6, 2)
        creatinine = min(creatinine, 4.5)
        
        # Continuous outcome: Length of stay in hours
        stay = round(18.0 + (priors * 14.5) + (creatinine * 12.0) + random.gauss(0.0, 5.0), 1)
        stay = max(6.0, stay)
        
        cohort.append({
            "patient_id": f"PAT-BK-{i+1:03d}",
            "num_prior_admissions": priors,
            "num_chronic_medications": meds,
            "body_temp_celsius": temp,
            "serum_creatinine_mg_dl": creatinine,
            "stay_duration_hours": stay
        })
        
    return cohort


# =============================================================================
# 2. PROBABILITY MASS FUNCTION (POISSON PMF) VS DENSITY FUNCTION (GAUSSIAN PDF)
# =============================================================================

class DistributionEvaluator:
    """
    Computes exact PMF values for discrete variables and PDF densities for continuous variables.
    """
    @staticmethod
    def poisson_pmf(k: int, lambd: float) -> float:
        """
        Calculates P(X = k) for discrete count data: (lambda^k * exp(-lambda)) / k!
        """
        if k < 0:
            return 0.0
        return (math.pow(lambd, k) * math.exp(-lambd)) / math.factorial(k)

    @staticmethod
    def gaussian_pdf(x: float, mean: float, std: float) -> float:
        """
        Calculates continuous likelihood density f(x) = (1 / (sigma * sqrt(2*pi))) * exp(-0.5 * ((x-mu)/sigma)^2)
        """
        if std <= 0:
            return 0.0
        coeff = 1.0 / (std * math.sqrt(2 * math.pi))
        exponent = -0.5 * math.pow((x - mean) / std, 2)
        return coeff * math.exp(exponent)

    @staticmethod
    def gaussian_interval_probability(a: float, b: float, mean: float, std: float, steps: int = 100) -> float:
        """
        Approximates the continuous integral P(a <= X <= b) = ∫_a^b f(x) dx via trapezoidal integration.
        """
        if a >= b or std <= 0:
            return 0.0
        h = (b - a) / steps
        total = 0.5 * (DistributionEvaluator.gaussian_pdf(a, mean, std) + DistributionEvaluator.gaussian_pdf(b, mean, std))
        for i in range(1, steps):
            total += DistributionEvaluator.gaussian_pdf(a + i * h, mean, std)
        return total * h


# =============================================================================
# 3. LINEAR REGRESSION VS POISSON GLM ON COUNT TARGETS
# =============================================================================

class CountModelingComparison:
    """
    Demonstrates the structural failure of OLS Linear Regression on count data
    and how Poisson exponential link functions guarantee non-negative predictions.
    """
    def __init__(self):
        # Hypothetical learned weights for predicting admissions from age and biomarker
        self.ols_w = [-0.15, -0.25]
        self.ols_b = -0.40  # Negative intercept causes negative count predictions!
        
        self.poisson_w = [0.12, 0.18]
        self.poisson_b = -0.50

    def predict_ols(self, x1: float, x2: float) -> float:
        """Standard Linear Regression: can predict impossible negative counts!"""
        return (self.ols_w[0] * x1) + (self.ols_w[1] * x2) + self.ols_b

    def predict_poisson(self, x1: float, x2: float) -> float:
        """Poisson GLM: lambda = exp(w^T x + b) >= 0 (Always non-negative)"""
        log_lambda = (self.poisson_w[0] * x1) + (self.poisson_w[1] * x2) + self.poisson_b
        return math.exp(max(min(log_lambda, 20.0), -20.0))


# =============================================================================
# 4. CONTINUOUS DISCRETIZATION & BINNING ENGINE
# =============================================================================

class ContinuousDiscretizer:
    """
    Implements Equal-Width and Equal-Frequency (Quantile) binning from scratch.
    """
    @staticmethod
    def equal_width_binning(data: List[float], n_bins: int = 4) -> Dict[str, Any]:
        min_v = min(data)
        max_v = max(data)
        width = (max_v - min_v) / n_bins
        
        bin_edges = [round(min_v + i * width, 2) for i in range(n_bins + 1)]
        counts = [0] * n_bins
        
        for val in data:
            idx = int((val - min_v) / width)
            idx = min(idx, n_bins - 1)  # Cap max boundary
            counts[idx] += 1
            
        intervals = []
        for i in range(n_bins):
            intervals.append({
                "bin_id": i + 1,
                "range": f"[{bin_edges[i]:.1f} - {bin_edges[i+1]:.1f})",
                "count": counts[i],
                "percentage": round((counts[i] / len(data)) * 100, 1)
            })
            
        return {"method": "Equal-Width Binning", "intervals": intervals}

    @staticmethod
    def equal_frequency_binning(data: List[float], n_bins: int = 4) -> Dict[str, Any]:
        sorted_data = sorted(data)
        n = len(data)
        step = n / n_bins
        
        intervals = []
        for i in range(n_bins):
            start_idx = int(i * step)
            end_idx = int((i + 1) * step) if i < n_bins - 1 else n - 1
            
            low = sorted_data[start_idx]
            high = sorted_data[end_idx]
            bin_slice = sorted_data[start_idx:end_idx + (1 if i == n_bins - 1 else 0)]
            
            intervals.append({
                "bin_id": i + 1,
                "range": f"[{low:.1f} - {high:.1f}]",
                "count": len(bin_slice),
                "percentage": round((len(bin_slice) / n) * 100, 1)
            })
            
        return {"method": "Equal-Frequency (Quantile) Binning", "intervals": intervals}


# =============================================================================
# 5. MASTER EXPERIMENT RUNNER & CONSOLE OUTPUT
# =============================================================================

def run_laboratory_experiment():
    print("=" * 85)
    print("CODER & ACCOTAX - MACHINE LEARNING ADVANCED RESEARCH LABORATORY")
    print("TOPIC 4: DISCRETE AND CONTINUOUS VARIABLES (TAXONOMY, DISTRIBUTIONS & BINNING)")
    print("Mentor: Sukanta Hui | Barrackpore, West Bengal, India | Course: BCAC701B")
    print("=" * 85)

    # 1. Ingest Cohort
    cohort = generate_clinical_cohort(n=50, seed=42)
    print(f"\n[PHASE 1: CLINICAL COHORT TAXONOMY AUDIT (BARRACKPORE MEDICARE)]")
    print(f"Total Sampled Patients: {len(cohort)} emergency clinical records.")
    print("-" * 85)
    print(f"{'Feature Name':<26} | {'Variable Type':<16} | {'Scale / Domain':<20} | {'Math Nature'}")
    print("-" * 85)
    print(f"{'num_prior_admissions':<26} | {'Discrete Count':<16} | {'Integers {0, 1, 2, ...}':<20} | {'Countable, Gaps'}")
    print(f"{'num_chronic_medications':<26} | {'Discrete Count':<16} | {'Integers {0, 1, 2, ...}':<20} | {'Countable, Gaps'}")
    print(f"{'body_temp_celsius':<26} | {'Continuous':<16} | {'Reals [36.0, 41.0] C':<20} | {'Unbroken Continuum'}")
    print(f"{'serum_creatinine_mg_dl':<26} | {'Continuous':<16} | {'Reals [0.6, 4.5] mg/dL':<20} | {'Unbroken Continuum'}")
    print(f"{'stay_duration_hours':<26} | {'Continuous Target':<16} | {'Reals [6.0, 140.0] hrs':<20} | {'Unbroken Continuum'}")
    print("-" * 85)

    # 2. Discrete PMF vs Continuous PDF
    print(f"\n[PHASE 2: PROBABILITY MASS FUNCTION (POISSON) VS PROBABILITY DENSITY (GAUSSIAN)]")
    
    # Discrete PMF: Prior admissions (lambda = 1.4 admissions/year)
    lambd = 1.4
    print(f"A. Discrete Poisson PMF (Expected Rate λ = {lambd} admissions/yr):")
    print(f"   Formula: P(X = k) = (λ^k * e^-λ) / k! (Exact Point Probabilities)")
    for k in range(5):
        prob = DistributionEvaluator.poisson_pmf(k, lambd)
        bar = "█" * int(prob * 40)
        print(f"   -> P(X = {k} admissions): {prob*100:>5.2f}% | {bar}")

    # Continuous PDF: Body Temperature (mu = 37.4, sigma = 0.9)
    mu, sigma = 37.4, 0.9
    print(f"\nB. Continuous Gaussian PDF (Mean μ = {mu}°C, Std σ = {sigma}°C):")
    print(f"   Notice: P(Temp == 38.000000°C) is mathematically ZERO (P(X = x) = 0).")
    p_fever = DistributionEvaluator.gaussian_interval_probability(38.0, 40.5, mu, sigma)
    print(f"   -> Probability of Fever (P(38.0°C <= Temp <= 40.5°C)): {p_fever*100:.2f}% (Area under curve)")

    # 3. The Linear Regression Failure on Count Data
    print(f"\n" + "=" * 85)
    print("[PHASE 3: WHY OLS FAILS ON DISCRETE COUNT TARGETS]")
    model_tester = CountModelingComparison()
    test_cases = [
        {"desc": "Young Low-Risk Patient", "x1": 0.1, "x2": 0.2},
        {"desc": "Average Patient", "x1": 0.8, "x2": 1.1},
        {"desc": "High-Risk Chronic Patient", "x1": 2.5, "x2": 3.0}
    ]
    print(f"{'Patient Profile':<28} | {'OLS Predicted Visits':<22} | {'Poisson Predicted Visits':<26} | {'Validity Check'}")
    print("-" * 85)
    for c in test_cases:
        pred_ols = model_tester.predict_ols(c["x1"], c["x2"])
        pred_poi = model_tester.predict_poisson(c["x1"], c["x2"])
        valid_str = "INVALID ❌ (Negative Count!)" if pred_ols < 0 else "Valid ✔"
        print(f"{c['desc']:<28} | {pred_ols:>6.2f} visits           | {pred_poi:>6.2f} visits             | {valid_str}")

    print("\nTeacher Sukanta Hui's Insight:")
    print(" -> OLS Linear Regression predicted -0.46 visits for low-risk patients (impossible in reality!).")
    print(" -> Poisson Regression naturally constrains predicted counts to lambda = exp(w^T x) > 0.")

    # 4. Continuous Discretization / Binning Comparison
    stays = [p["stay_duration_hours"] for p in cohort]
    bin_width = ContinuousDiscretizer.equal_width_binning(stays, n_bins=4)
    bin_freq = ContinuousDiscretizer.equal_frequency_binning(stays, n_bins=4)

    print(f"\n" + "=" * 85)
    print("[PHASE 4: DISCRETIZING CONTINUOUS STAY DURATION (HOURS)]")
    print("Comparing Equal-Width vs Equal-Frequency (Quantile) 4-Bin Discretization:")
    print("-" * 85)
    print(f"{'Bin #':<6} | {'Equal-Width Interval':<24} | {'Count (%)':<14} | {'Equal-Frequency Interval':<26} | {'Count (%)'}")
    print("-" * 85)
    for i in range(4):
        w_int = bin_width["intervals"][i]
        f_int = bin_freq["intervals"][i]
        print(f"Bin {i+1:<2} | {w_int['range']:<24} | {w_int['count']} ({w_int['percentage']}%)    | {f_int['range']:<26} | {f_int['count']} ({f_int['percentage']}%)")
    print("-" * 85)

    print("\n" + "=" * 85)
    print("SUKANTA HUI'S GOLDEN RULES:")
    print(" 1. DISCRETE COUNTS: Represent whole numbers with gaps. Never use OLS linear regression; use Poisson GLM.")
    print(" 2. CONTINUOUS MEASUREMENTS: Have infinite intermediate decimals. Probability exists only over intervals.")
    print(" 3. DISCRETIZATION: Binning continuous data into ordinal tiers eliminates outlier sensitivity but sacrifices variance.")
    print("=" * 85)


# =============================================================================
# 6. PRODUCTION SCIKIT-LEARN & STATSMODELS REFERENCE TEMPLATE
# =============================================================================
"""
# Ready-to-copy Production Template:
from sklearn.preprocessing import KBinsDiscretizer
import statsmodels.api as sm

# A. Discretize Continuous Feature into 5 Equal-Frequency Bins
kbins = KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='quantile')
X_binned = kbins.fit_transform(df[['continuous_income']])

# B. Poisson Regression for Count Target (e.g. number of claims)
poisson_model = sm.GLM(y_counts, X, family=sm.families.Poisson()).fit()
print(poisson_model.summary())
"""

if __name__ == "__main__":
    run_laboratory_experiment()
