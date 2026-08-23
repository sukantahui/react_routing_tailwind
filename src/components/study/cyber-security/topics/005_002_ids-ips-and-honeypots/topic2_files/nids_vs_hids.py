"""
Dual NIDS (Network Packet Sniffer) and HIDS (File Integrity & Log Monitor) Framework
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 2)
"""

import hashlib
import time
from dataclasses import dataclass
from typing import Dict, List, Optional

@dataclass
class NetworkPacket:
    src_ip: str
    dst_ip: str
    port: int
    is_encrypted: bool
    payload: bytes

@dataclass
class HostFileRecord:
    filepath: str
    sha256_hash: str
    permissions: str
    last_modified: float

class HybridIntrusionEngine:
    def __init__(self):
        # HIDS: File Integrity Baseline Database (Simulated Critical Binaries)
        self.fim_baseline: Dict[str, HostFileRecord] = {
            "/bin/login": HostFileRecord("/bin/login", "a3f5b892c901e4567890abcdef1234567890abcdef1234567890abcdef123456", "rwxr-xr-x", 1700000000.0),
            "/etc/shadow": HostFileRecord("/etc/shadow", "9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba", "rw-------", 1700000000.0)
        }

    # 1. NIDS Inspection Function
    def nids_inspect_packet(self, pkt: NetworkPacket) -> Dict[str, any]:
        """NIDS Layer: Inspects packet headers and payload bytes on the wire."""
        if pkt.is_encrypted:
            return {
                "engine": "NIDS",
                "verdict": "UNINSPECTABLE_CIPHERTEXT (TLS 1.3 Blind Spot)",
                "status": "PASS_UNINSPECTED",
                "details": f"Encrypted session on port {pkt.port} from {pkt.src_ip} -> {pkt.dst_ip}"
            }
        
        # Plaintext signature check
        if b"UNION SELECT" in pkt.payload.upper():
            return {
                "engine": "NIDS",
                "verdict": "🚨 NIDS ALERT: SQL Injection Signature Matched on Wire",
                "status": "THREAT_DETECTED",
                "details": f"Plaintext SQL injection detected from {pkt.src_ip}"
            }
        return {"engine": "NIDS", "verdict": "CLEAN_WIRE_TRAFFIC", "status": "PASS", "details": "No network signatures matched"}

    # 2. HIDS File Integrity Monitoring (FIM) Function
    def hids_check_fim(self, filepath: str, current_content: bytes) -> Dict[str, any]:
        """HIDS Layer: Validates file cryptographic SHA-256 integrity against stored baseline."""
        current_hash = hashlib.sha256(current_content).hexdigest()
        
        if filepath not in self.fim_baseline:
            return {"engine": "HIDS_FIM", "verdict": "NEW_UNTRACKED_FILE", "status": "AUDIT"}
        
        baseline_record = self.fim_baseline[filepath]
        if current_hash != baseline_record.sha256_hash:
            return {
                "engine": "HIDS_FIM",
                "verdict": "🚨 CRITICAL HIDS ALERT: File Integrity Violation (Rootkit Modification!)",
                "status": "TAMPER_DETECTED",
                "details": f"Hash mismatch on {filepath}! Baseline: {baseline_record.sha256_hash[:12]}... Current: {current_hash[:12]}..."
            }
        return {"engine": "HIDS_FIM", "verdict": "✔ FIM INTEGRITY VERIFIED", "status": "CLEAN", "details": f"{filepath} hash matches baseline."}

    # 3. HIDS Log & System Call Monitor
    def hids_inspect_log_event(self, log_line: str) -> Dict[str, any]:
        """HIDS Layer: Parses local authentication and audit logs."""
        if "FAILED LOGIN" in log_line and "root" in log_line:
            return {
                "engine": "HIDS_LOG",
                "verdict": "⚠️ HIDS ALERT: Brute-Force Root Login Attempt",
                "status": "LOCAL_AUTH_ANOMALY",
                "details": log_line
            }
        return {"engine": "HIDS_LOG", "verdict": "CLEAN_LOG_EVENT", "status": "PASS", "details": log_line}

# Execution Test Harness
if __name__ == "__main__":
    engine = HybridIntrusionEngine()
    print("=== Hybrid NIDS (Network) vs HIDS (Host) Inspection Simulator ===")

    # Test 1: Encrypted TLS packet on network wire
    encrypted_pkt = NetworkPacket("198.51.100.25", "172.16.1.10", 443, True, b"\x17\x03\x03\x00\x2a\x8f\x4c...")
    nids_res = engine.nids_inspect_packet(encrypted_pkt)
    print(f"\n1. NIDS Wire Check: {nids_res['verdict']}")
    print(f"   ↳ Details: {nids_res['details']}")

    # Test 2: Local Rootkit modifying /bin/login
    trojan_binary_bytes = b"\x7fELF\x02\x01\x01\x00...TROJAN_BACKDOOR_PAYLOAD..."
    fim_res = engine.hids_check_fim("/bin/login", trojan_binary_bytes)
    print(f"\n2. HIDS FIM Check : {fim_res['verdict']}")
    print(f"   ↳ Details: {fim_res['details']}")
