#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: BIOMETRIC ACCURACY METRICS (FAR, FRR, EER & DET) CALCULATOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides mathematical simulations of:
1. False Acceptance Rate (FAR / Type II Error) calculation.
2. False Rejection Rate (FRR / Type I Error) calculation.
3. Equal Error Rate (EER / Crossover Error Rate CER) intersection point.
4. Detection Error Tradeoff (DET) and ROC curve analysis.
5. Operational threshold optimization for high-security (defense) vs convenience.
"""

import sys
import math
from dataclasses import dataclass
from typing import List, Tuple, Dict

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class ThresholdPoint:
    threshold: float
    far: float      # False Acceptance Rate (%)
    frr: float      # False Rejection Rate (%)
    tpr: float      # True Positive Rate (%) = 100 - FRR

class BiometricAccuracyEngine:
    def __init__(self):
        pass

    def simulate_distributions(self, num_points: int = 21) -> List[ThresholdPoint]:
        """
        Generates simulated FAR and FRR curves over threshold range [0.0, 1.0].
        FAR decreases exponentially as threshold increases.
        FRR increases as threshold increases.
        """
        curve = []
        for i in range(num_points):
            t = i / (num_points - 1) # Threshold 0.0 to 1.0
            # Sigmoid / Gaussian cumulative distribution approximation
            far = 100.0 / (1.0 + math.exp(12.0 * (t - 0.45)))
            frr = 100.0 / (1.0 + math.exp(-12.0 * (t - 0.55)))
            tpr = 100.0 - frr
            curve.append(ThresholdPoint(threshold=round(t, 2), far=round(far, 4), frr=round(frr, 4), tpr=round(tpr, 4)))
        return curve

    def calculate_eer(self, curve: List[ThresholdPoint]) -> Tuple[float, float]:
        """
        Finds the Equal Error Rate (EER) where FAR == FRR.
        """
        min_diff = float("inf")
        eer_threshold = 0.5
        eer_value = 0.0

        for pt in curve:
            diff = abs(pt.far - pt.frr)
            if diff < min_diff:
                min_diff = diff
                eer_threshold = pt.threshold
                eer_value = (pt.far + pt.frr) / 2.0

        return eer_threshold, eer_value

    def evaluate_operational_profile(self, target_profile: str) -> Dict:
        """
        Returns recommended threshold and trade-off analysis based on security profile.
        """
        profiles = {
            "defense_treasury": {
                "name": "High Security / Defense / Treasury (Barrackpore Treasury)",
                "target_threshold": 0.85,
                "far": "0.001% (Zero Imposter Tolerance)",
                "frr": "6.5% (Users may occasionally need to retry scan)",
                "priority": "Prevent Type II Error (Imposter Acceptance) at all costs."
            },
            "commercial_consumer": {
                "name": "Balanced Commercial (Salt Lake FinTech App)",
                "target_threshold": 0.50,
                "far": "0.1% (Standard EER Balance)",
                "frr": "0.1% (Low User Friction)",
                "priority": "Equal balance between security and user convenience."
            },
            "high_throughput": {
                "name": "High Throughput Public Transit (Metro / Theme Park Gate)",
                "target_threshold": 0.25,
                "far": "3.5% (High Imposter Risk)",
                "frr": "0.001% (Instant Gate Opening, Zero Line Queuing)",
                "priority": "Prevent Type I Error (False Rejection) to maintain queue flow."
            }
        }
        return profiles.get(target_profile, profiles["commercial_consumer"])

def main():
    print("=" * 80)
    print("BIOMETRIC ACCURACY METRICS & EQUAL ERROR RATE (EER) LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    engine = BiometricAccuracyEngine()
    curve = engine.simulate_distributions()

    print("\n[TEST 1]: THRESHOLD (θ) VS FAR / FRR ACCURACY MATRIX")
    print("-" * 80)
    print(f"{'Threshold (θ)':<15}{'FAR (%) [Type II]':<20}{'FRR (%) [Type I]':<20}{'True Positive Rate (TPR %)'}")
    print("-" * 80)
    for pt in curve[::2]: # Sample every 2nd point
        print(f"{pt.threshold:<15}{pt.far:<20}{pt.frr:<20}{pt.tpr}")

    eer_t, eer_val = engine.calculate_eer(curve)
    print("\n" + "=" * 80)
    print(f"[TEST 2]: EQUAL ERROR RATE (EER) CROSSOVER POINT")
    print(f"EER Decision Threshold (θ*) : {eer_t:.2f}")
    print(f"Equal Error Rate (EER / CER): {eer_val:.4f}%")
    print("=" * 80)

    print("\n[TEST 3]: OPERATIONAL DEPLOYMENT TRADE-OFFS")
    for key in ["defense_treasury", "commercial_consumer", "high_throughput"]:
        prof = engine.evaluate_operational_profile(key)
        print(f"\nProfile: {prof['name']}")
        print(f"  Threshold : {prof['target_threshold']}")
        print(f"  FAR       : {prof['far']}")
        print(f"  FRR       : {prof['frr']}")
        print(f"  Strategy  : {prof['priority']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
