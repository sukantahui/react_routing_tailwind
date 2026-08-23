"""
Perimeter Defense & Defense-in-Depth Pipeline Simulator
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 0)
"""

import time
from dataclasses import dataclass
from typing import List, Dict, Optional

@dataclass
class Packet:
    src_ip: str
    dst_ip: str
    src_port: int
    dst_port: int
    protocol: str
    payload: str
    tcp_flags: str = "SYN"
    is_authenticated: bool = False

class PerimeterDefensePipeline:
    def __init__(self):
        # 1. Edge Router: Bogon IP Blacklist (RFC 1918 on WAN / Reserved)
        self.bogon_prefixes = ["0.", "127.", "169.254.", "224.", "240."]
        
        # 2. Stateful Firewall Connection Table (SPI)
        self.conntrack_table: Dict[str, str] = {}
        self.allowed_ports = {80: "HTTP", 443: "HTTPS", 53: "DNS", 22: "SSH_BASTION"}
        
        # 3. Layer 7 WAF Malicious Signatures
        self.waf_signatures = ["UNION SELECT", "<script>", "../", "etc/passwd", "OR 1=1"]
        
        # 4. Host EDR Sandbox Rules
        self.edr_blocked_payloads = ["mimikatz", "powershell -enc", "vssadmin delete shadows", "rundll32"]

    def inspect_packet(self, pkt: Packet) -> Dict[str, any]:
        """Passes an incoming network packet through the 6 concentric defense layers."""
        log = {
            "packet": f"{pkt.src_ip}:{pkt.src_port} -> {pkt.dst_ip}:{pkt.dst_port} ({pkt.protocol})",
            "status": "ALLOWED",
            "dropped_at_layer": None,
            "reason": "Passed all perimeter, host, and application security checks"
        }

        # LAYER 1: Edge Router Anti-Spoofing & Bogon Filtering
        for bogon in self.bogon_prefixes:
            if pkt.src_ip.startswith(bogon):
                log["status"] = "DROPPED"
                log["dropped_at_layer"] = "Layer 1: Edge Router (uRPF / Bogon Filter)"
                log["reason"] = f"Source IP {pkt.src_ip} is an invalid or spoofed bogon address."
                return log

        # LAYER 2: Stateful Inspection Firewall (SPI & Port Security)
        if pkt.dst_port not in self.allowed_ports:
            log["status"] = "DROPPED"
            log["dropped_at_layer"] = "Layer 2: Stateful Firewall (Port ACL)"
            log["reason"] = f"Destination port {pkt.dst_port} is closed by default-deny rule."
            return log

        flow_key = f"{pkt.src_ip}:{pkt.src_port}->{pkt.dst_ip}:{pkt.dst_port}"
        if pkt.tcp_flags == "SYN":
            self.conntrack_table[flow_key] = "ESTABLISHED"
        elif flow_key not in self.conntrack_table and pkt.tcp_flags != "ACK":
            log["status"] = "DROPPED"
            log["dropped_at_layer"] = "Layer 2: Stateful Firewall (State Table)"
            log["reason"] = "Out-of-state packet dropped without valid 3-way handshake."
            return log

        # LAYER 3: Web Application Firewall (WAF) Layer 7 Inspection
        if pkt.dst_port in [80, 443]:
            for sig in self.waf_signatures:
                if sig.lower() in pkt.payload.lower():
                    log["status"] = "DROPPED"
                    log["dropped_at_layer"] = "Layer 3: Web Application Firewall (WAF)"
                    log["reason"] = f"Detected malicious Layer 7 attack payload matching signature: '{sig}'"
                    return log

        # LAYER 4: Host Endpoint Detection & Response (EDR)
        for edr_pattern in self.edr_blocked_payloads:
            if edr_pattern.lower() in pkt.payload.lower():
                log["status"] = "DROPPED"
                log["dropped_at_layer"] = "Layer 4: Host EDR (Behavioral Block)"
                log["reason"] = f"EDR agent intercepted malicious execution command: '{edr_pattern}'"
                return log

        # LAYER 5: Zero Trust Access Verification
        if pkt.dst_port == 22 and not pkt.is_authenticated:
            log["status"] = "DROPPED"
            log["dropped_at_layer"] = "Layer 5: Zero Trust IAM Gatekeeper"
            log["reason"] = "SSH access rejected: Missing valid FIDO2 MFA token and mutual TLS certificate."
            return log

        return log

# Test Execution Harness
if __name__ == "__main__":
    pipeline = PerimeterDefensePipeline()
    test_packets = [
        Packet("127.0.0.99", "192.168.1.10", 49152, 443, "TCP", "Normal user login", "SYN"),
        Packet("203.0.113.5", "192.168.1.10", 50123, 4444, "TCP", "Meterpreter bind shell probe", "SYN"),
        Packet("198.51.100.12", "192.168.1.10", 55210, 443, "TCP", "GET /api/user?id=10' UNION SELECT * FROM users--", "SYN"),
        Packet("198.51.100.45", "192.168.1.10", 58190, 443, "TCP", "POST /upload payload=powershell -enc JABzAHIA...", "SYN"),
        Packet("198.51.100.77", "192.168.1.20", 61000, 22, "TCP", "SSH login attempt without MFA", "SYN", is_authenticated=False),
        Packet("198.51.100.88", "192.168.1.10", 62000, 443, "TCP", "GET /index.html HTTP/1.1", "SYN", is_authenticated=True)
    ]

    print("=== Defense-in-Depth Perimeter Simulation Results ===")
    for p in test_packets:
        res = pipeline.inspect_packet(p)
        print(f"[{res['status']}] {res['packet']} | Layer: {res['dropped_at_layer']} | {res['reason']}")
