"""
Dual Signature-Based and Statistical Anomaly-Based Intrusion Detection Engine
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 3)
"""

import math
import re
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

@dataclass
class NetworkSession:
    session_id: str
    src_ip: str
    dst_ip: str
    request_rate_cps: float  # Connections Per Second
    payload_bytes: bytes

class HybridSignatureAnomalyEngine:
    def __init__(self):
        # 1. Signature Database (Compiled regex patterns simulating Aho-Corasick DFA)
        self.signatures = [
            ("SID-101", "LOG4SHELL_JNDI", re.compile(rb"sample_log4j_jndi_probe", re.IGNORECASE)),
            ("SID-102", "SHELLSHOCK_BASH", re.compile(rb"\(\)\s*\{\s*:\s*;\s*\}\s*;", re.IGNORECASE)),
            ("SID-103", "SQL_UNION_INJECTION", re.compile(rb"union\s+select\s+.*\bfrom\b", re.IGNORECASE))
        ]

        # 2. Statistical Baseline Parameters for Normal Traffic
        self.baseline_rate_mean = 15.0       # Normal mean: 15 CPS
        self.baseline_rate_std = 3.5         # Normal std dev: 3.5
        self.baseline_entropy_mean = 3.8     # Normal plaintext entropy: ~3.8
        self.baseline_entropy_std = 0.6      # Normal entropy std dev: 0.6

    def calculate_shannon_entropy(self, data: bytes) -> float:
        """Calculates Shannon Entropy (0.0 to 8.0) of byte payload."""
        if not data:
            return 0.0
        entropy = 0.0
        length = len(data)
        freq: Dict[int, int] = {}
        for b in data:
            freq[b] = freq.get(b, 0) + 1
        for count in freq.values():
            p = count / length
            entropy -= p * math.log2(p)
        return entropy

    def inspect_session(self, session: NetworkSession) -> Dict[str, any]:
        results = {
            "session_id": session.session_id,
            "signature_alert": None,
            "anomaly_alert": None,
            "final_verdict": "CLEAN"
        }

        # Step 1: Signature-Based Matching
        for sid, name, pattern in self.signatures:
            if pattern.search(session.payload_bytes):
                results["signature_alert"] = {
                    "sid": sid,
                    "name": name,
                    "confidence": "100% (Exact CVE Signature Match)"
                }
                results["final_verdict"] = "🚨 THREAT DETECTED (Signature Engine)"
                return results

        # Step 2: Statistical Anomaly Detection (Rate Z-Score & Entropy Z-Score)
        rate_z_score = (session.request_rate_cps - self.baseline_rate_mean) / self.baseline_rate_std
        payload_entropy = self.calculate_shannon_entropy(session.payload_bytes)
        entropy_z_score = (payload_entropy - self.baseline_entropy_mean) / self.baseline_entropy_std

        if rate_z_score > 3.0 or entropy_z_score > 3.0:
            anomaly_reasons = []
            if rate_z_score > 3.0:
                anomaly_reasons.append(f"Connection Rate Anomaly (Rate={session.request_rate_cps} CPS, Z={rate_z_score:.2f})")
            if entropy_z_score > 3.0:
                anomaly_reasons.append(f"High-Entropy Encrypted Payload (Entropy={payload_entropy:.2f}, Z={entropy_z_score:.2f})")

            results["anomaly_alert"] = {
                "rate_z": round(rate_z_score, 2),
                "entropy_z": round(entropy_z_score, 2),
                "reasons": anomaly_reasons
            }
            results["final_verdict"] = "⚠️ ANOMALY DETECTED (Heuristic Engine: Zero-Day / Exfiltration Risk)"
        
        return results

# Execution Test Harness
if __name__ == "__main__":
    engine = HybridSignatureAnomalyEngine()
    print("=== Hybrid Signature vs Statistical Anomaly Detection Engine ===")

    # Test 1: Known Signature Attack (Log4Shell)
    s1 = NetworkSession("SESS-01", "198.51.100.25", "172.16.1.10", 12.0, b"User-Agent: sample_log4j_jndi_probe\r\n")
    res1 = engine.inspect_session(s1)
    print(f"\n[Test 1] Verdict: {res1['final_verdict']}")
    print(f"         ↳ Signature Match: {res1['signature_alert']}")

    # Test 2: Unknown Zero-Day High-Entropy Data Exfiltration (No matching signature!)
    random_encrypted_bytes = bytes([((i * 37 + 13) % 256) for i in range(200)])  # High entropy payload
    s2 = NetworkSession("SESS-02", "198.51.100.99", "172.16.1.10", 85.0, random_encrypted_bytes)
    res2 = engine.inspect_session(s2)
    print(f"\n[Test 2] Verdict: {res2['final_verdict']}")
    print(f"         ↳ Anomaly Metric: {res2['anomaly_alert']}")
