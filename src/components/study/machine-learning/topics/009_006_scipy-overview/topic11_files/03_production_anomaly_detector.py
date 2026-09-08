"""
Topic 11: Production Real-Time Anomaly Scoring Function
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

class LiveZScoreAnomalyDetector:
    def __init__(self, threshold=3.0):
        self.threshold = threshold
        self.mean_ = None
        self.std_ = None

    def fit(self, baseline_data):
        self.mean_ = np.mean(baseline_data)
        self.std_ = np.std(baseline_data)
        print(f"Detector Calibrated: Baseline Mean={self.mean_:.2f}, Std={self.std_:.2f}")

    def predict(self, new_value):
        if self.std_ == 0:
            return False, 0.0
        z = (new_value - self.mean_) / self.std_
        is_anomaly = abs(z) > self.threshold
        return is_anomaly, z

# Calibration on regular server traffic
detector = LiveZScoreAnomalyDetector(threshold=2.5)
baseline_latency_ms = [45, 48, 52, 47, 50, 49, 53, 46, 51, 48]
detector.fit(baseline_latency_ms)

# Real-time incoming network requests
test_pings = [49, 55, 140, 48, 220]
for ping in test_pings:
    flag, score = detector.predict(ping)
    status = "🚨 ALERT (Anomaly)" if flag else "✅ Normal"
    print(f"Ping: {ping:>3}ms | Z-score: {score:>+5.2f} | Status: {status}")
