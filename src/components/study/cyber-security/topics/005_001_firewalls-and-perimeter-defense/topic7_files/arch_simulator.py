"""
Firewall Architecture & Zone Traversal Simulator (Dual-Homed, Screened Host, Screened Subnet)
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 7)
"""

from dataclasses import dataclass
from typing import Dict, List, Optional

@dataclass
class PacketFlow:
    src_zone: str  # "WAN", "LAN", "DMZ", "BASTION"
    src_ip: str
    dst_zone: str  # "WAN", "LAN", "DMZ", "BASTION"
    dst_ip: str
    dst_port: int
    payload_type: str  # "NORMAL_WEB", "LATERAL_SCAN", "DIRECT_SSH"

class FirewallArchitectureEngine:
    def __init__(self):
        self.supported_architectures = ["DUAL_HOMED_HOST", "SCREENED_HOST", "SCREENED_SUBNET_DMZ"]

    def evaluate_dual_homed(self, pkt: PacketFlow, is_kernel_compromised: bool = False) -> Dict[str, any]:
        """Dual-Homed Host: IP forwarding disabled at kernel level."""
        if is_kernel_compromised:
            # Attacker compromised root on Dual-Homed host and enabled IP forwarding!
            return {
                "architecture": "DUAL_HOMED_HOST",
                "verdict": "VULNERABLE_FORWARDED",
                "status": "COMPROMISED",
                "reason": "🚨 Single Point of Failure breached: Root attacker enabled `ip_forward=1`, routing directly into internal LAN!"
            }

        if pkt.src_zone == "WAN" and pkt.dst_zone == "LAN":
            return {
                "architecture": "DUAL_HOMED_HOST",
                "verdict": "BLOCKED_AT_KERNEL",
                "status": "DROPPED",
                "reason": "Direct Layer 3 packet routing blocked (`net.ipv4.ip_forward = 0`). Must traverse application proxy."
            }

        if pkt.src_zone == "WAN" and pkt.dst_zone == "BASTION" and pkt.dst_port in [80, 443, 1080]:
            return {
                "architecture": "DUAL_HOMED_HOST",
                "verdict": "PROXIED_LOCALLY",
                "status": "PERMITTED",
                "reason": "Terminated on local application proxy daemon on Dual-Homed host."
            }

        return {"architecture": "DUAL_HOMED_HOST", "verdict": "DEFAULT_DROP", "status": "DROPPED", "reason": "No proxy rule"}

    def evaluate_screened_host(self, pkt: PacketFlow, is_bastion_compromised: bool = False) -> Dict[str, any]:
        """Screened Host: Router ACL forces traffic to Bastion Host located ON the LAN."""
        if is_bastion_compromised and pkt.src_zone == "BASTION" and pkt.dst_zone == "LAN":
            return {
                "architecture": "SCREENED_HOST",
                "verdict": "LATERAL_PIVOT_EXPLOITED",
                "status": "COMPROMISED",
                "reason": "🚨 Bastion is physically located on LAN subnet! Compromised bastion scans adjacent workstations freely via ARP/SMB!"
            }

        if pkt.src_zone == "WAN" and pkt.dst_zone == "BASTION":
            return {
                "architecture": "SCREENED_HOST",
                "verdict": "ROUTER_PERMITTED",
                "status": "PERMITTED",
                "reason": "Edge screening router ACL matches permit rule to Bastion IP."
            }

        if pkt.src_zone == "WAN" and pkt.dst_zone == "LAN":
            return {
                "architecture": "SCREENED_HOST",
                "verdict": "ROUTER_DROPPED",
                "status": "DROPPED",
                "reason": "Edge screening router blocks direct WAN-to-LAN connections."
            }

        return {"architecture": "SCREENED_HOST", "verdict": "DEFAULT_DROP", "status": "DROPPED", "reason": "Default Deny"}

    def evaluate_screened_subnet(self, pkt: PacketFlow, is_dmz_web_compromised: bool = False) -> Dict[str, any]:
        """Screened Subnet (DMZ): Isolated buffer subnet with one-way access control."""
        # Scenario: Compromised DMZ server attempts to initiate lateral scan to internal DB/LAN
        if is_dmz_web_compromised and pkt.src_zone == "DMZ" and pkt.dst_zone == "LAN":
            if pkt.dst_port == 5432 and pkt.payload_type == "NORMAL_WEB":
                return {
                    "architecture": "SCREENED_SUBNET_DMZ",
                    "verdict": "PINHOLE_PERMITTED",
                    "status": "PERMITTED",
                    "reason": "Explicit database pinhole permits DMZ Web to query PostgreSQL DB on port 5432."
                }
            else:
                return {
                    "architecture": "SCREENED_SUBNET_DMZ",
                    "verdict": "INTERNAL_FW_BLOCKED",
                    "status": "DROPPED",
                    "reason": "🛡️ Internal Screening Firewall drops unsolicited DMZ-to-LAN connection, containing blast radius in DMZ!"
                }

        if pkt.src_zone == "WAN" and pkt.dst_zone == "DMZ" and pkt.dst_port in [80, 443]:
            return {
                "architecture": "SCREENED_SUBNET_DMZ",
                "verdict": "EXTERNAL_FW_PERMITTED",
                "status": "PERMITTED",
                "reason": "External screening firewall permits public HTTPS into DMZ buffer."
            }

        if pkt.src_zone == "WAN" and pkt.dst_zone == "LAN":
            return {
                "architecture": "SCREENED_SUBNET_DMZ",
                "verdict": "EXTERNAL_FW_DROPPED",
                "status": "DROPPED",
                "reason": "Direct WAN-to-LAN packet routing is physically and logically forbidden."
            }

        return {"architecture": "SCREENED_SUBNET_DMZ", "verdict": "DEFAULT_DROP", "status": "DROPPED", "reason": "Default Deny"}

# Execution Test Harness
if __name__ == "__main__":
    engine = FirewallArchitectureEngine()
    print("=== Firewall Architecture & Blast Radius Simulator ===")

    # Test Case 1: Attacker compromises Bastion on Screened Host
    flow1 = PacketFlow("BASTION", "10.10.1.10", "LAN", "10.10.1.50", 445, "LATERAL_SCAN")
    res1 = engine.evaluate_screened_host(flow1, is_bastion_compromised=True)
    print(f"[Screened Host Threat] {res1['status']} -> {res1['reason']}")

    # Test Case 2: Attacker compromises Web Server in Screened Subnet (DMZ)
    flow2 = PacketFlow("DMZ", "172.16.1.10", "LAN", "10.10.4.50", 445, "LATERAL_SCAN")
    res2 = engine.evaluate_screened_subnet(flow2, is_dmz_web_compromised=True)
    print(f"[Screened Subnet Defense] {res2['status']} -> {res2['reason']}")
