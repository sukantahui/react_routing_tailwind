"""
Firewall Core Engine & Zone Placement Simulator
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 1)
"""

from dataclasses import dataclass
from typing import List, Dict, Optional, Tuple

@dataclass
class Packet:
    src_ip: str
    src_port: int
    dst_ip: str
    dst_port: int
    protocol: str
    direction: str  # "INGRESS" or "EGRESS" or "EAST_WEST"
    tcp_flags: str = "SYN"

@dataclass
class FirewallRule:
    rule_id: int
    action: str  # "ACCEPT", "DROP", "REJECT"
    zone: str    # "EDGE", "DMZ", "INTER_VLAN", "HOST"
    src_net: str
    dst_net: str
    dst_port: Optional[int]
    protocol: str
    description: str

class MultiZoneFirewallEngine:
    def __init__(self):
        # NAT Translation Table (Private IP:Port -> Public WAN IP:Port)
        self.nat_table: Dict[str, str] = {}
        self.public_wan_ip = "203.0.113.10"
        self.next_pat_port = 50000

        # Ordered Rule Base (Evaluated Top-to-Bottom)
        self.rule_base: List[FirewallRule] = [
            # Zone 1: EDGE GATEWAY RULES
            FirewallRule(10, "DROP", "EDGE", "127.0.0.0/8", "ANY", None, "ANY", "Drop Bogon/Loopback spoofing on WAN"),
            FirewallRule(20, "ACCEPT", "EDGE", "ANY", "172.16.1.10", 443, "TCP", "Allow public HTTPS into DMZ Web Server"),
            FirewallRule(30, "ACCEPT", "EDGE", "ANY", "172.16.1.20", 53, "UDP", "Allow public DNS queries into DMZ DNS"),
            
            # Zone 2: DMZ BOUNDARY RULES
            FirewallRule(40, "ACCEPT", "DMZ", "172.16.1.10", "10.10.4.50", 5432, "TCP", "Allow DMZ Web to query Internal PostgreSQL DB"),
            FirewallRule(50, "DROP", "DMZ", "172.16.1.0/24", "10.0.0.0/8", None, "ANY", "Isolate DMZ from reaching internal LAN"),

            # Zone 3: INTER-VLAN CORE RULES (East-West Micro-segmentation)
            FirewallRule(60, "ACCEPT", "INTER_VLAN", "10.10.1.0/24", "10.10.2.0/24", 443, "TCP", "Allow HR VLAN to access Internal ERP on 443"),
            FirewallRule(70, "DROP", "INTER_VLAN", "10.10.1.0/24", "10.10.4.0/24", None, "ANY", "Block HR workstations from direct DB access"),
            FirewallRule(80, "DROP", "INTER_VLAN", "ANY", "ANY", 445, "TCP", "Block SMB port 445 lateral movement across all VLANs"),

            # Zone 4: HOST-BASED OS FIREWALL (iptables/Windows Defender)
            FirewallRule(90, "ACCEPT", "HOST", "10.10.0.0/16", "LOCAL", 22, "TCP", "Allow admin SSH only from internal subnet"),
            
            # DEFAULT CATCH-ALL (Implicit Deny)
            FirewallRule(999, "DROP", "GLOBAL", "ANY", "ANY", None, "ANY", "Default-Deny Implicit Catch-All")
        ]

    def perform_snat(self, pkt: Packet) -> Tuple[Packet, str]:
        """Translates internal private IP to public WAN IP (PAT/SNAT)."""
        priv_key = f"{pkt.src_ip}:{pkt.src_port}"
        if priv_key not in self.nat_table:
            self.nat_table[priv_key] = f"{self.public_wan_ip}:{self.next_pat_port}"
            self.next_pat_port += 1
        translated = self.nat_table[priv_key]
        wan_ip, wan_port = translated.split(":")
        pkt.src_ip = wan_ip
        pkt.src_port = int(wan_port)
        return pkt, translated

    def evaluate_packet(self, pkt: Packet, placement_zone: str) -> Dict[str, any]:
        """Evaluates a packet against the rule base for a specific placement zone."""
        for rule in self.rule_base:
            if rule.zone != placement_zone and rule.zone != "GLOBAL":
                continue

            # Check destination port match
            if rule.dst_port is not None and rule.dst_port != pkt.dst_port:
                continue

            # Check protocol match
            if rule.protocol != "ANY" and rule.protocol != pkt.protocol:
                continue

            return {
                "packet": f"{pkt.src_ip}:{pkt.src_port} -> {pkt.dst_ip}:{pkt.dst_port} ({pkt.protocol})",
                "zone": placement_zone,
                "action": rule.action,
                "matched_rule_id": rule.rule_id,
                "description": rule.description
            }

        return {
            "packet": f"{pkt.src_ip}:{pkt.src_port} -> {pkt.dst_ip}:{pkt.dst_port}",
            "zone": placement_zone,
            "action": "DROP",
            "matched_rule_id": 999,
            "description": "Default-Deny Implicit Action"
        }

# Execution Test Harness
if __name__ == "__main__":
    fw = MultiZoneFirewallEngine()
    print("=== Multi-Zone Enterprise Firewall Rule Engine ===")
    
    test_cases = [
        (Packet("198.51.100.25", 51200, "172.16.1.10", 443, "TCP", "INGRESS"), "EDGE"),
        (Packet("127.0.0.1", 40000, "172.16.1.10", 443, "TCP", "INGRESS"), "EDGE"),
        (Packet("172.16.1.10", 48100, "10.10.4.50", 5432, "TCP", "EAST_WEST"), "DMZ"),
        (Packet("172.16.1.10", 48200, "10.10.1.25", 445, "TCP", "EAST_WEST"), "DMZ"),
        (Packet("10.10.1.50", 59000, "10.10.4.50", 5432, "TCP", "EAST_WEST"), "INTER_VLAN"),
        (Packet("10.10.1.50", 59100, "10.10.2.10", 445, "TCP", "EAST_WEST"), "INTER_VLAN")
    ]

    for p, zone in test_cases:
        res = fw.evaluate_packet(p, zone)
        print(f"[{res['action']}] Zone: {res['zone']} | Rule #{res['matched_rule_id']} ({res['description']}) | {res['packet']}")
