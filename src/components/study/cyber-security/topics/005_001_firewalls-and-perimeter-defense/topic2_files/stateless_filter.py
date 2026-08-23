"""
Stateless 5-Tuple Packet Filter & ACK-Bypass Simulator
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 2)
"""

from dataclasses import dataclass
from typing import List, Dict, Optional

@dataclass
class Packet5Tuple:
    src_ip: str
    dst_ip: str
    protocol: str  # "TCP", "UDP", "ICMP"
    src_port: int
    dst_port: int
    tcp_flags: Dict[str, bool]  # e.g. {"SYN": True, "ACK": False, "RST": False, "FIN": False}
    payload: str = ""

@dataclass
class StatelessRule:
    rule_num: int
    action: str  # "PERMIT", "DENY"
    protocol: str
    src_net: str
    dst_net: str
    dst_port: Optional[int]
    require_established: bool = False  # Matches if ACK or RST flag is True (Cisco 'established')
    description: str = ""

class StatelessPacketFilter:
    def __init__(self):
        # Classic Stateless Access Control List (ACL)
        self.rules: List[StatelessRule] = [
            StatelessRule(10, "PERMIT", "TCP", "ANY", "172.16.1.10", 443, False, "Permit public HTTPS into DMZ Web"),
            StatelessRule(20, "PERMIT", "TCP", "ANY", "172.16.1.10", 80, False, "Permit public HTTP into DMZ Web"),
            StatelessRule(30, "PERMIT", "TCP", "ANY", "10.10.1.0/24", None, True, "Permit inbound replies to LAN via 'established' (ACK/RST)"),
            StatelessRule(40, "PERMIT", "UDP", "ANY", "172.16.1.20", 53, False, "Permit public DNS queries into DMZ DNS"),
            StatelessRule(999, "DENY", "ANY", "ANY", "ANY", None, False, "Default Implicit Deny All")
        ]

    def match_packet(self, pkt: Packet5Tuple) -> Dict[str, any]:
        """Evaluates packet against static 5-tuple rules sequentially (First Match Wins)."""
        is_established = pkt.tcp_flags.get("ACK", False) or pkt.tcp_flags.get("RST", False)

        for rule in self.rules:
            # Check protocol
            if rule.protocol != "ANY" and rule.protocol != pkt.protocol:
                continue

            # Check destination port
            if rule.dst_port is not None and rule.dst_port != pkt.dst_port:
                continue

            # Check established keyword (ACK or RST flag check)
            if rule.require_established and not is_established:
                continue

            # Check for ACK Spoofing Vulnerability
            is_ack_bypass = False
            if rule.require_established and is_established and pkt.tcp_flags.get("SYN", False) is False:
                # This packet passed solely because ACK=1, even if NO prior session existed!
                is_ack_bypass = True

            return {
                "packet": f"{pkt.src_ip}:{pkt.src_port} -> {pkt.dst_ip}:{pkt.dst_port} ({pkt.protocol})",
                "action": rule.action,
                "matched_rule_id": rule.rule_num,
                "description": rule.description,
                "is_ack_bypass_vulnerability": is_ack_bypass,
                "flags": [k for k, v in pkt.tcp_flags.items() if v]
            }

        return {
            "packet": f"{pkt.src_ip}:{pkt.src_port} -> {pkt.dst_ip}:{pkt.dst_port}",
            "action": "DENY",
            "matched_rule_id": 999,
            "description": "Default Deny Catch-All",
            "is_ack_bypass_vulnerability": False,
            "flags": []
        }

# Execution Test Harness
if __name__ == "__main__":
    filter_engine = StatelessPacketFilter()
    print("=== Stateless 5-Tuple Packet Filter Evaluation ===")

    test_packets = [
        Packet5Tuple("198.51.100.10", "172.16.1.10", "TCP", 51200, 443, {"SYN": True, "ACK": False, "RST": False}),
        Packet5Tuple("198.51.100.20", "10.10.1.50", "TCP", 60100, 22, {"SYN": True, "ACK": False, "RST": False}),
        Packet5Tuple("198.51.100.30", "10.10.1.50", "TCP", 60200, 22, {"SYN": False, "ACK": True, "RST": False}),  # Crafted ACK Spoof!
        Packet5Tuple("198.51.100.40", "172.16.1.20", "UDP", 53000, 53, {}),
        Packet5Tuple("198.51.100.50", "172.16.1.10", "TCP", 54000, 23, {"SYN": True, "ACK": False, "RST": False})
    ]

    for p in test_packets:
        res = filter_engine.match_packet(p)
        status_flag = "⚠️ VULNERABLE ACK BYPASS" if res['is_ack_bypass_vulnerability'] else res['action']
        print(f"[{status_flag}] Rule #{res['matched_rule_id']} | Flags: {res['flags']} | {res['packet']} -> {res['description']}")
