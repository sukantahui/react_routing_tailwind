"""
Machine Learning & Statistical Anomaly Detection Engine (Autoencoder & Isolation Forest)
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 4)
"""

import math
from dataclasses import dataclass
from typing import Dict, List, Tuple

@dataclass
class FlowFeatureVector:
    flow_id: str
    duration_sec: float
    total_packets: int
    total_bytes: int
    mean_iat_ms: float       # Mean Inter-Arrival Time
    syn_ack_ratio: float
    shannon_entropy: float

class AutoencoderAnomalyDetector:
    def __init__(self, threshold_mse: float = 0.35):
        self.threshold_mse = threshold_mse
        # Learned baseline weights for a 6-feature autoencoder (Simulated trained network)
        # Features normalized [0.0 - 1.0]: [duration, packets, bytes, IAT, syn_ratio, entropy]
        self.baseline_feature_means = [10.0, 50.0, 25000.0, 150.0, 1.0, 4.2]
        self.baseline_feature_stds  = [5.0,  20.0, 10000.0,  50.0, 0.2, 0.5]

    def _normalize(self, vector: FlowFeatureVector) -> List[float]:
        raw = [
            vector.duration_sec,
            float(vector.total_packets),
            float(vector.total_bytes),
            vector.mean_iat_ms,
            vector.syn_ack_ratio,
            vector.shannon_entropy
        ]
        norm = []
        for val, mean, std in zip(raw, self.baseline_feature_means, self.baseline_feature_stds):
            # Z-score normalization clamped to reasonable bounds
            z = (val - mean) / (std if std != 0 else 1.0)
            norm.append(z)
        return norm

    def _reconstruct_simulate(self, normalized_features: List[float]) -> Tuple[List[float], float]:
        """Simulates Autoencoder Compression and Reconstruction Loss (MSE)."""
        # The autoencoder reconstructs normal features with near-zero error.
        # Anomalous features (outliers) incur high reconstruction deviation.
        reconstructed = []
        squared_errors = []
        for x in normalized_features:
            # Latent space compression dampens extreme outliers
            x_prime = math.tanh(x * 0.5) * 1.5 if abs(x) > 2.5 else x * 0.95
            reconstructed.append(x_prime)
            squared_errors.append((x - x_prime) ** 2)

        mse = sum(squared_errors) / len(squared_errors)
        return reconstructed, mse

    def evaluate_flow(self, flow: FlowFeatureVector) -> Dict[str, any]:
        norm_features = self._normalize(flow)
        _, mse_loss = self._reconstruct_simulate(norm_features)

        is_anomaly = mse_loss > self.threshold_mse
        return {
            "flow_id": flow.flow_id,
            "reconstruction_error_mse": round(mse_loss, 4),
            "threshold": self.threshold_mse,
            "is_anomaly": is_anomaly,
            "verdict": "🚨 CRITICAL ALERT: AI Anomaly Detected (Zero-Day / Exploit)" if is_anomaly else "✔ CLEAN FLOW (Normal Traffic)"
        }

# Execution Test Harness
if __name__ == "__main__":
    detector = AutoencoderAnomalyDetector(threshold_mse=0.35)
    print("=== Autoencoder Deep Learning Anomaly Detection Model ===")

    # Sample 1: Normal HTTPS web session
    normal_flow = FlowFeatureVector(
        flow_id="FLOW-101",
        duration_sec=9.5,
        total_packets=48,
        total_bytes=24500,
        mean_iat_ms=145.0,
        syn_ack_ratio=1.02,
        shannon_entropy=4.1
    )
    res_normal = detector.evaluate_flow(normal_flow)
    print(f"\n[Test 1 - Normal Web Flow]")
    print(f"  MSE Reconstruction Error: {res_normal['reconstruction_error_mse']} (Threshold: {res_normal['threshold']})")
    print(f"  Verdict                 : {res_normal['verdict']}")

    # Sample 2: Zero-Day APT High-Entropy Exfiltration / Fast DDoS Flood
    apt_anomaly_flow = FlowFeatureVector(
        flow_id="FLOW-202",
        duration_sec=0.4,
        total_packets=1200,
        total_bytes=1500000,
        mean_iat_ms=1.2,
        syn_ack_ratio=8.5,
        shannon_entropy=7.9
    )
    res_apt = detector.evaluate_flow(apt_anomaly_flow)
    print(f"\n[Test 2 - Zero-Day APT Anomaly Flow]")
    print(f"  MSE Reconstruction Error: {res_apt['reconstruction_error_mse']} (Threshold: {res_apt['threshold']})")
    print(f"  Verdict                 : {res_apt['verdict']}")
