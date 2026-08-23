"""
IDS Performance Evaluator & Bayesian Confusion Matrix Sizing Engine
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 6)
"""

from dataclasses import dataclass
from typing import Dict, List, Tuple

@dataclass
class ConfusionMatrixData:
    true_positives: int
    false_positives: int
    true_negatives: int
    false_negatives: int

class IdsMetricsEvaluator:
    def __init__(self):
        pass

    def calculate_metrics(self, cm: ConfusionMatrixData) -> Dict[str, float]:
        """Calculates standard classification performance metrics."""
        tp, fp, tn, fn = cm.true_positives, cm.false_positives, cm.true_negatives, cm.false_negatives

        precision = (tp / (tp + fp)) if (tp + fp) > 0 else 0.0
        recall = (tp / (tp + fn)) if (tp + fn) > 0 else 0.0
        specificity = (tn / (tn + fp)) if (tn + fp) > 0 else 0.0
        accuracy = ((tp + tn) / (tp + tn + fp + fn)) if (tp + tn + fp + fn) > 0 else 0.0
        f1_score = (2 * precision * recall / (precision + recall)) if (precision + recall) > 0 else 0.0
        false_alarm_rate = (fp / (fp + tn)) if (fp + tn) > 0 else 0.0

        return {
            "precision_percent": round(precision * 100.0, 2),
            "recall_percent": round(recall * 100.0, 2),
            "specificity_percent": round(specificity * 100.0, 2),
            "accuracy_percent": round(accuracy * 100.0, 2),
            "f1_score": round(f1_score, 4),
            "false_alarm_rate_percent": round(false_alarm_rate * 100.0, 4)
        }

    def calculate_bayesian_base_rate(self, total_packets: int, attack_prevalence: float, tpr: float, fpr: float) -> Dict[str, any]:
        """Demonstrates the Base Rate Fallacy in IDS alert generation."""
        actual_attacks = int(total_packets * attack_prevalence)
        actual_clean = total_packets - actual_attacks

        tp = int(actual_attacks * tpr)
        fn = actual_attacks - tp
        fp = int(actual_clean * fpr)
        tn = actual_clean - fp

        total_alerts = tp + fp
        # Probability that an alert is a real attack P(Attack | Alert)
        prob_real_attack = (tp / total_alerts * 100.0) if total_alerts > 0 else 0.0

        return {
            "total_packets": total_packets,
            "actual_attacks": actual_attacks,
            "actual_clean_packets": actual_clean,
            "true_positives_caught": tp,
            "false_negatives_missed": fn,
            "false_positives_generated": fp,
            "total_alerts_received": total_alerts,
            "probability_alert_is_genuine_attack_percent": round(prob_real_attack, 2)
        }

# Execution Test Harness
if __name__ == "__main__":
    evaluator = IdsMetricsEvaluator()
    print("=== IDS Classification Metrics & Bayesian Base Rate Analysis ===")

    # Scenario 1: Untuned vs Tuned Rule Base
    untuned_cm = ConfusionMatrixData(tp=95, fp=905, tn=99000, fn=5)
    metrics_untuned = evaluator.calculate_metrics(untuned_cm)
    print("\n--- 1. Untuned Rule Base Performance ---")
    print(f"Precision : {metrics_untuned['precision_percent']}% (905 False Alarms per 95 Real Attacks!)")
    print(f"Recall    : {metrics_untuned['recall_percent']}%")
    print(f"F1-Score  : {metrics_untuned['f1_score']}")

    # Scenario 2: Bayesian Base Rate Fallacy Demonstration
    # 1,000,000 Packets, Attack Rate = 0.01% (100 attacks), Sensor: 99% TPR, 1% FPR
    bayes_res = evaluator.calculate_bayesian_base_rate(
        total_packets=1000000,
        attack_prevalence=0.0001,
        tpr=0.99,
        fpr=0.01
    )
    print("\n--- 2. Bayesian Base Rate Fallacy on 1M Packets ---")
    print(f"Actual Attacks in Traffic: {bayes_res['actual_attacks']}")
    print(f"True Positive Alerts     : {bayes_res['true_positives_caught']}")
    print(f"False Positive Alarms    : {bayes_res['false_positives_generated']}")
    print(f"Total Alerts Flooding SOC: {bayes_res['total_alerts_received']}")
    print(f"Probability Alert is Real: {bayes_res['probability_alert_is_genuine_attack_percent']}% (99.02% False Alarm Rate!)")
