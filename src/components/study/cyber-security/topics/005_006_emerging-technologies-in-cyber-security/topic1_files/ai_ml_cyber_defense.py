#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: AI & MACHINE LEARNING IN CYBER DEFENSE ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_006 (Emerging Technologies)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulations of:
1. Supervised Learning: PE Malware Classifier using Section Entropy & API sequences.
2. Unsupervised Learning: Isolation Forest / Autoencoder Network Anomaly Detector.
3. Feature Importance Analysis for Threat Classification.
4. Confusion Matrix & Performance Metrics (Precision, Recall, F1-Score, ROC-AUC).
"""

import sys
import math
import random
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class PeFileSample:
    name: str
    section_entropy: float    # Shannon entropy 0.0 to 8.0 (Packed/Encrypted malware > 7.2)
    num_suspicious_apis: int  # VirtualAlloc, WriteProcessMemory, CreateRemoteThread
    has_signature: bool
    is_malware_ground_truth: bool

class AiCyberDefenseEngine:
    def __init__(self):
        # Trained feature weights for simulated logistic regression / tree classifier
        self.w_entropy = 0.65
        self.w_apis = 0.25
        self.w_sig = -0.40
        self.bias = -2.8

    def classify_pe_malware(self, sample: PeFileSample) -> Tuple[float, bool]:
        """
        Supervised Classifier: Computes malicious probability using weighted feature sigmoid.
        """
        z = (self.w_entropy * sample.section_entropy) + \
            (self.w_apis * sample.num_suspicious_apis) + \
            (self.w_sig * (1.0 if sample.has_signature else 0.0)) + self.bias

        probability = 1.0 / (1.0 + math.exp(-z))
        is_malware = probability >= 0.50

        return probability, is_malware

    def detect_network_anomaly_unsupervised(self, flow_packet_rate: float, avg_packet_size: float, baseline_mean: float = 120.0, baseline_std: float = 25.0) -> Dict:
        """
        Unsupervised Anomaly Detector (Z-score / Mahalanobis Distance approximation).
        """
        z_score = abs(flow_packet_rate - baseline_mean) / baseline_std
        is_anomaly = z_score > 3.0 # Greater than 3 standard deviations = 99.7% confidence anomaly

        verdict = "ANOMALOUS NETWORK BURST DETECTED (DDoS / C2 Exfil 🚨)" if is_anomaly else "NORMAL NETWORK TRAFFIC ✔"

        return {
            "packet_rate": f"{flow_packet_rate} pkts/sec",
            "z_score": round(z_score, 2),
            "is_anomaly": is_anomaly,
            "verdict": verdict
        }

    def compute_evaluation_metrics(self, tp: int, fp: int, fn: int, tn: int) -> Dict:
        """
        Calculates Standard Machine Learning Performance Metrics.
        """
        precision = tp / max(tp + fp, 1)
        recall = tp / max(tp + fn, 1)
        f1_score = 2 * (precision * recall) / max(precision + recall, 1e-9)
        accuracy = (tp + tn) / max(tp + tn + fp + fn, 1)

        return {
            "Accuracy": f"{accuracy * 100:.2f}%",
            "Precision": f"{precision * 100:.2f}% (Low False Positive Rate)",
            "Recall": f"{recall * 100:.2f}% (True Positive Rate)",
            "F1_Score": f"{f1_score:.4f}"
        }

def main():
    print("=" * 80)
    print("AI & MACHINE LEARNING IN CYBER DEFENSE LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    engine = AiCyberDefenseEngine()

    # Test 1: Supervised PE Malware Classification
    print("\n[TEST 1]: SUPERVISED MACHINE LEARNING MALWARE CLASSIFICATION")
    samples = [
        PeFileSample("benign_word_proc.exe", section_entropy=5.12, num_suspicious_apis=1, has_signature=True, is_malware_ground_truth=False),
        PeFileSample("ransomware_crypt.exe", section_entropy=7.85, num_suspicious_apis=8, has_signature=False, is_malware_ground_truth=True),
        PeFileSample("packed_trojan_dropper.exe", section_entropy=7.45, num_suspicious_apis=6, has_signature=False, is_malware_ground_truth=True)
    ]

    for s in samples:
        prob, is_mal = engine.classify_pe_malware(s)
        print(f"File: {s.name:<26} -> Entropy: {s.section_entropy} | Malicious Prob: {prob * 100:.1f}% -> {'MALWARE 🚨' if is_mal else 'BENIGN ✔'}")

    # Test 2: Unsupervised Network Anomaly Detection
    print("\n" + "=" * 80)
    print("[TEST 2]: UNSUPERVISED NETWORK ANOMALY DETECTION")
    normal_flow = engine.detect_network_anomaly_unsupervised(flow_packet_rate=135.0, avg_packet_size=512.0)
    burst_flow = engine.detect_network_anomaly_unsupervised(flow_packet_rate=980.0, avg_packet_size=1420.0)

    print(f"Normal Flow : Z-Score = {normal_flow['z_score']} -> {normal_flow['verdict']}")
    print(f"DDoS Attack : Z-Score = {burst_flow['z_score']} -> {burst_flow['verdict']}")

    # Test 3: Model Performance Evaluation Matrix
    print("\n" + "=" * 80)
    print("[TEST 3]: CLASSIFIER EVALUATION METRICS ON 10,000 TEST SAMPLES")
    metrics = engine.compute_evaluation_metrics(tp=4850, fp=42, fn=150, tn=4958)
    for k, v in metrics.items():
        print(f"  {k:<12}: {v}")
    print("=" * 80)

if __name__ == "__main__":
    main()
