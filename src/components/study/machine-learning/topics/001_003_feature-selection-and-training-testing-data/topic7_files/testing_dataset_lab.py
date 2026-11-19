"""
=============================================================================
TOPIC 7: TESTING DATASET LABORATORY SIMULATOR
Module: Feature Selection and Training & Testing Data
Course: Introduction to Machine Learning (BCAC701B) - MAKAUT & Premier Engineering Syllabi
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
=============================================================================

PURE PYTHON IMPLEMENTATION - ZERO EXTERNAL DEPENDENCIES (NO NUMPY / SCIKIT-LEARN)
This production laboratory engine simulates:
1. Unbiased Generalization Risk Estimation & Wald 95% Confidence Intervals.
2. The Test Set Peeking Paradox: Demonstrating how testing M candidate models on a 
   fixed test set inflates apparent maximum accuracy (Multiple Testing Fallacy).
3. Two-Model Statistical Significance Z-Test: Calculating whether an observed test 
   accuracy delta between Model A and Model B is statistically significant.
4. Out-of-Distribution (OOD) Operational Stress-Testing: Measuring test metric 
   degradation under controlled covariate shift (P_test(X) != P_train(X)).
5. Regional Industrial Case Benchmarks across West Bengal (CESC, CCU Airport, Bandhan Bank).
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any


class StatisticalHypothesisEngine:
    """Pure Python statistical test and confidence interval computations."""

    @staticmethod
    def normal_cdf(z: float) -> float:
        """Approximates standard normal cumulative distribution function (Abramowitz & Stegun)."""
        return 0.5 * (1.0 + math.erf(z / math.sqrt(2.0)))

    @staticmethod
    def wald_confidence_interval(p_hat: float, n: int, confidence: float = 0.95) -> Tuple[float, float, float]:
        """
        Computes the Wald confidence interval for binomial test accuracy:
        CI = p_hat +/- z * sqrt(p_hat * (1 - p_hat) / n)
        """
        # Critical z-values: 90% -> 1.645, 95% -> 1.960, 99% -> 2.576
        z_map = {0.90: 1.645, 0.95: 1.960, 0.99: 2.576}
        z = z_map.get(confidence, 1.960)

        std_err = math.sqrt(max(1e-9, p_hat * (1.0 - p_hat) / n))
        margin_of_error = z * std_err
        lower = max(0.0, p_hat - margin_of_error)
        upper = min(1.0, p_hat + margin_of_error)
        return lower, upper, margin_of_error

    @staticmethod
    def two_proportion_z_test(p1: float, n1: int, p2: float, n2: int) -> Tuple[float, float, bool]:
        """
        Two-sample z-test for comparing test accuracies of two competing models:
        H0: p1 == p2 vs H1: p1 != p2
        """
        x1 = round(p1 * n1)
        x2 = round(p2 * n2)
        p_pooled = (x1 + x2) / (n1 + n2)
        se_pooled = math.sqrt(max(1e-9, p_pooled * (1.0 - p_pooled) * (1.0 / n1 + 1.0 / n2)))
        z_stat = (p1 - p2) / se_pooled
        # Two-tailed p-value
        p_value = 2.0 * (1.0 - StatisticalHypothesisEngine.normal_cdf(abs(z_stat)))
        is_significant = p_value < 0.05
        return z_stat, p_value, is_significant


class TestSetSimulator:
    """Simulates test set behavior, peeking hazards, and covariate shifts."""

    @staticmethod
    def simulate_test_peeking_fallacy(n_test: int = 100, n_candidate_models: int = 50, seed: int = 42) -> Dict[str, Any]:
        """
        Simulates M completely random models (each having TRUE accuracy = 50.0%).
        Demonstrates how evaluating all M models on the SAME fixed test set causes 
        the maximum observed test accuracy to falsely appear superior due to selection bias.
        """
        rng = random.Random(seed)
        # Ground truth test labels: 50% ones, 50% zeros
        true_labels = [rng.choice([0, 1]) for _ in range(n_test)]

        model_accuracies = []
        for _ in range(n_candidate_models):
            # Model makes random 50/50 guesses
            preds = [rng.choice([0, 1]) for _ in range(n_test)]
            correct = sum(1 for p, y in zip(preds, true_labels) if p == y)
            acc = correct / n_test
            model_accuracies.append(acc)

        max_observed_acc = max(model_accuracies)
        min_observed_acc = min(model_accuracies)
        avg_acc = sum(model_accuracies) / len(model_accuracies)

        # Theoretical expected maximum for M normal random variables
        # Approx: mu + sigma * sqrt(2 * ln(M))
        sigma_null = math.sqrt(0.25 / n_test)
        theoretical_max_approx = 0.50 + sigma_null * math.sqrt(2.0 * math.log(max(2, n_candidate_models)))

        return {
            "n_test": n_test,
            "n_models_evaluated": n_candidate_models,
            "true_null_accuracy": 0.50,
            "average_test_accuracy": round(avg_acc, 4),
            "max_apparent_test_accuracy": round(max_observed_acc, 4),
            "min_apparent_test_accuracy": round(min_observed_acc, 4),
            "theoretical_max_approx": round(theoretical_max_approx, 4),
            "spurious_optimism_delta": round(max_observed_acc - 0.50, 4)
        }

    @staticmethod
    def simulate_covariate_shift(n_samples: int = 500, shift_magnitude: float = 1.8, seed: int = 123) -> Dict[str, Any]:
        """
        Simulates model evaluated on clean in-distribution data vs out-of-distribution (OOD)
        shifted data where tail non-linearities and label boundary shifts degrade performance.
        """
        rng = random.Random(seed)
        # Model's linear decision weights: w1*x1 + w2*x2 + b
        w1, w2 = 1.5, -1.2
        b = 0.1

        # Clean In-Distribution Test Set (P_test == P_train)
        in_dist_correct = 0
        for _ in range(n_samples):
            x1 = rng.gauss(0.0, 1.0)
            x2 = rng.gauss(0.0, 1.0)
            # In-distribution true signal has mild noise
            latent = w1 * x1 + w2 * x2 + b + rng.gauss(0.0, 0.4)
            true_y = 1 if latent >= 0.0 else 0
            pred_y = 1 if (w1 * x1 + w2 * x2 + b) >= 0.0 else 0
            if pred_y == true_y:
                in_dist_correct += 1
        in_dist_acc = in_dist_correct / n_samples

        # Shifted OOD Test Set: Mean shift + higher-order non-linear warp in tails
        ood_correct = 0
        for _ in range(n_samples):
            x1 = rng.gauss(shift_magnitude, 1.4)
            x2 = rng.gauss(-shift_magnitude * 0.8, 1.4)
            # Severe tail non-linearity that linear model never observed during training
            latent_ood = w1 * x1 + w2 * x2 + b - 0.45 * (x1 ** 2) + rng.gauss(0.0, 0.6)
            true_y = 1 if latent_ood >= 0.0 else 0
            pred_y = 1 if (w1 * x1 + w2 * x2 + b) >= 0.0 else 0
            if pred_y == true_y:
                ood_correct += 1
        ood_acc = ood_correct / n_samples

        return {
            "shift_magnitude": shift_magnitude,
            "in_distribution_test_acc": round(in_dist_acc, 4),
            "ood_test_acc": round(ood_acc, 4),
            "performance_drop_pct": round((in_dist_acc - ood_acc) * 100, 2)
        }


def run_test_sample_size_precision_sweep() -> List[Dict[str, Any]]:
    """
    Computes Wald 95% Confidence Intervals across varying test set sizes N_test
    for a fixed observed test accuracy of 88.0%.
    """
    p_hat = 0.88
    sample_sizes = [30, 50, 100, 250, 500, 1000, 2500]
    results = []

    for n in sample_sizes:
        low, high, me = StatisticalHypothesisEngine.wald_confidence_interval(p_hat, n, confidence=0.95)
        results.append({
            "n_test": n,
            "observed_acc_pct": round(p_hat * 100, 1),
            "margin_of_error_pct": round(me * 100, 2),
            "ci_95_lower_pct": round(low * 100, 2),
            "ci_95_upper_pct": round(high * 100, 2),
            "interval_width_pct": round((high - low) * 100, 2)
        })

    return results


def run_model_comparison_significance_lab() -> List[Dict[str, Any]]:
    """
    Evaluates whether Model A (88.0%) is statistically significantly superior 
    to Model B (85.0%) across different test set sample sizes.
    """
    pA = 0.88
    pB = 0.85
    test_sizes = [50, 150, 300, 600, 1200, 2500]
    results = []

    for n in test_sizes:
        z, p_val, sig = StatisticalHypothesisEngine.two_proportion_z_test(pA, n, pB, n)
        results.append({
            "n_test": n,
            "model_A_acc": f"{pA*100:.1f}%",
            "model_B_acc": f"{pB*100:.1f}%",
            "delta": f"{(pA - pB)*100:.1f}%",
            "z_statistic": round(z, 3),
            "p_value": round(p_val, 4),
            "statistically_significant": "YES (p < 0.05) ✔" if sig else "NO (Indistinguishable) ❌"
        })

    return results


def run_west_bengal_industrial_benchmarks():
    """Prints four authentic West Bengal testing dataset case studies."""
    print("\n" + "=" * 80)
    print("WEST BENGAL INDUSTRIAL TESTING DATASET CASE STUDIES")
    print("=" * 80)

    cases = [
        {
            "enterprise": "Calcutta Electric Supply Corporation (CESC Ltd.)",
            "system": "Smart Meter Automated Anomaly & Power Theft Sentry",
            "holdout_vault": "50,000 smart meters across Central & North Kolkata",
            "governance_rule": "Strict Blind Test Vault: The test dataset is managed by an independent audit committee. Data scientists submit compiled inference containers; test labels are never shared."
        },
        {
            "enterprise": "Netaji Subhash Chandra Bose International Airport (CCU)",
            "system": "Dual-Energy X-Ray Carry-On Baggage Contraband Detection",
            "holdout_vault": "12,000 passenger baggage scans with synthetic threat insertions",
            "governance_rule": "One-Shot Evaluation Protocol: Vendor algorithms are evaluated exactly once on the holdout benchmark. Repeated re-testing is prohibited to prevent inverse-engineering of the test scans."
        },
        {
            "enterprise": "Bandhan Bank Micro-Banking Division (Headquarters: Salt Lake)",
            "system": "Out-of-Time (OOT) Credit Risk Assessment for MSME Loans",
            "holdout_vault": "25,000 loan disbursement cycles from Q4 (October - December)",
            "governance_rule": "Temporal Out-of-Time Holdout: Models trained on Q1-Q3 data are tested strictly on subsequent Q4 economic cycles to verify macroeconomic shift resilience."
        },
        {
            "enterprise": "Swiggy / Zomato Kolkata Regional Hub",
            "system": "Durga Puja Night Delivery Time (SLA) Prediction Engine",
            "holdout_vault": "45,000 delivery dispatches during Saptami through Dashami nights",
            "governance_rule": "Extreme Operational Stress Test: Dedicated holdout partition during maximum pandal pedestrian road closures to measure catastrophic boundary latency."
        }
    ]

    for i, c in enumerate(cases, 1):
        print(f"\n[Case {i}] {c['enterprise']}")
        print(f"  • Production System:  {c['system']}")
        print(f"  • Test Holdout Vault: {c['holdout_vault']}")
        print(f"  • Governance Rule:    {c['governance_rule']}")


def main():
    print("=" * 80)
    print("CODER & ACCOTAX - ADVANCED MACHINE LEARNING LAB (TOPIC 7)")
    print("TESTING DATASET: UNBIASED GENERALIZATION, PEEKING HAZARDS & POWER")
    print("Course: BCAC701B | Instructor: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    # 1. Sample Size & Wald Confidence Interval Sweep
    print("\n[PART 1] WALD 95% CONFIDENCE INTERVALS VS TEST SET SAMPLE SIZE (N_test)")
    print("-" * 80)
    print(f"{'N_Test':<8} | {'Obs Acc':<10} | {'Margin of Error':<16} | {'95% CI Range':<22} | {'Width':<10}")
    print("-" * 80)
    sweep = run_test_sample_size_precision_sweep()
    for row in sweep:
        ci_str = f"[{row['ci_95_lower_pct']}%, {row['ci_95_upper_pct']}%]"
        print(f"{row['n_test']:<8} | {row['observed_acc_pct']}%{'':<4} | ±{row['margin_of_error_pct']}%{'':<9} | {ci_str:<22} | {row['interval_width_pct']}%")

    # 2. Model Comparison Statistical Significance
    print("\n[PART 2] TWO-MODEL SIGNIFICANCE Z-TEST: MODEL A (88%) VS MODEL B (85%)")
    print("-" * 80)
    print(f"{'N_Test':<8} | {'Model A':<10} | {'Model B':<10} | {'Delta':<8} | {'z-stat':<8} | {'p-value':<10} | {'Significant?'}")
    print("-" * 80)
    sig_results = run_model_comparison_significance_lab()
    for row in sig_results:
        print(f"{row['n_test']:<8} | {row['model_A_acc']:<10} | {row['model_B_acc']:<10} | {row['delta']:<8} | {row['z_statistic']:<8} | {row['p_value']:<10} | {row['statistically_significant']}")

    # 3. Test Set Peeking Paradox Simulation
    print("\n[PART 3] THE TEST SET PEEKING PARADOX (EVALUATING M DUMMY MODELS ON FIXED TEST SET)")
    print("-" * 80)
    peeking = TestSetSimulator.simulate_test_peeking_fallacy(n_test=100, n_candidate_models=50)
    print(f"Fixed Test Set Size (N_test):              {peeking['n_test']}")
    print(f"Number of Random Candidate Models (M):    {peeking['n_models_evaluated']}")
    print(f"True Underlying Model Accuracy (Null H0): {peeking['true_null_accuracy']*100:.1f}%")
    print(f"Average Observed Test Accuracy:           {peeking['average_test_accuracy']*100:.2f}%")
    print(f"MAXIMUM Observed Test Accuracy:           {peeking['max_apparent_test_accuracy']*100:.2f}% (Spurious Best Performer)")
    print(f"Spurious Optimism Delta:                  +{peeking['spurious_optimism_delta']*100:.2f}% (Inflation from Peeking)")

    # 4. Out-of-Distribution Shift Stress-Test
    print("\n[PART 4] OUT-OF-DISTRIBUTION (OOD) OPERATIONAL STRESS-TEST")
    print("-" * 80)
    ood = TestSetSimulator.simulate_covariate_shift(n_samples=500, shift_magnitude=1.8)
    print(f"In-Distribution Test Accuracy:            {ood['in_distribution_test_acc']*100:.2f}%")
    print(f"Out-of-Distribution Shifted Test Acc:     {ood['ood_test_acc']*100:.2f}%")
    print(f"Performance Collapse Delta:               -{ood['performance_drop_pct']}% under severe covariate shift")

    # 5. Regional Industrial Case Studies
    run_west_bengal_industrial_benchmarks()

    print("\n" + "=" * 80)
    print("LABORATORY SIMULATION COMPLETED SUCCESSFULLY (EXIT CODE 0)")
    print("=" * 80)


if __name__ == "__main__":
    main()
