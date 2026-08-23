"""
Tunnel Encapsulation & MTU / MSS Clamping Engine (TCP-over-TCP Meltdown Sim)
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_003 (Topic 4)
"""

from dataclasses import dataclass
from typing import Dict, Tuple

@dataclass
class PacketCalculation:
    passenger_size: int
    tunnel_protocol: str # "WireGuard", "IPsec-ESP", "GRE-IPsec", "OpenVPN-TCP"
    carrier_mtu: int = 1500

class TunnelEncapsulationEngine:
    def __init__(self):
        # Protocol Overhead Profiles (in Bytes)
        self.overhead_table = {
            "WireGuard": 32,      # 16B header + 16B Poly1305 tag
            "IPsec-ESP": 68,      # 20B Outer IP + 8B UDP + 8B ESP + 16B IV + 16B ICV
            "GRE-IPsec": 92,      # Outer IP + UDP + ESP + GRE (24B) + Auth Tag
            "OpenVPN-UDP": 68,    # Outer IP + UDP + OpenVPN header + HMAC
            "OpenVPN-TCP": 88     # Outer IP + TCP (20B) + OpenVPN header + HMAC (Meltdown Hazard!)
        }

    def compute_encapsulation(self, calc: PacketCalculation) -> Dict[str, any]:
        """Calculates total encapsulated wire size, checks MTU violation, and computes optimal MSS clamp."""
        overhead = self.overhead_table.get(calc.tunnel_protocol, 60)
        total_wire_size = calc.passenger_size + overhead
        is_fragmented = total_wire_size > calc.carrier_mtu

        # Optimal TCP MSS = MTU (1500) - Standard IP/TCP Headers (40B) - VPN Overhead
        optimal_mss_clamp = calc.carrier_mtu - 40 - overhead

        # Check for TCP-over-TCP Meltdown Risk
        is_meltdown_risk = calc.tunnel_protocol == "OpenVPN-TCP"

        if is_fragmented:
            status = "❌ FRAGMENTATION HAZARD: Total packet size exceeds Ethernet MTU 1500B!"
            mitigation = f"Enable TCP MSS Clamping to {optimal_mss_clamp} Bytes on Router VTI Interface"
        else:
            status = "✔ OPTIMAL SIZE: Packet fits within 1500B MTU without fragmentation."
            mitigation = "None required (Within standard MTU)"

        return {
            "tunnel_protocol": calc.tunnel_protocol,
            "passenger_size_bytes": calc.passenger_size,
            "vpn_overhead_bytes": overhead,
            "total_wire_size_bytes": total_wire_size,
            "carrier_mtu_limit": calc.carrier_mtu,
            "is_fragmented": is_fragmented,
            "optimal_mss_clamp_bytes": optimal_mss_clamp,
            "tcp_meltdown_risk": is_meltdown_risk,
            "status": status,
            "recommended_action": mitigation
        }

# Execution Test Harness
if __name__ == "__main__":
    engine = TunnelEncapsulationEngine()
    print("=== Tunnel Encapsulation & MTU / MSS Clamping Engine ===")

    # Test 1: Full-size 1500-byte IP packet in IPsec ESP
    calc1 = PacketCalculation(passenger_size=1500, tunnel_protocol="IPsec-ESP")
    res1 = engine.compute_encapsulation(calc1)
    print(f"\n[Test 1 - IPsec ESP with 1500B Packet]:")
    print(f"    Overhead   : {res1['vpn_overhead_bytes']} Bytes")
    print(f"    Total Size : {res1['total_wire_size_bytes']} Bytes (MTU Limit: 1500B)")
    print(f"    Status     : {res1['status']}")
    print(f"    Optimal MSS: {res1['optimal_mss_clamp_bytes']} Bytes")

    # Test 2: WireGuard Lightweight Tunneling
    calc2 = PacketCalculation(passenger_size=1420, tunnel_protocol="WireGuard")
    res2 = engine.compute_encapsulation(calc2)
    print(f"\n[Test 2 - WireGuard with 1420B Clamped Packet]:")
    print(f"    Overhead   : {res2['vpn_overhead_bytes']} Bytes")
    print(f"    Total Size : {res2['total_wire_size_bytes']} Bytes (MTU Limit: 1500B)")
    print(f"    Status     : {res2['status']}")

    # Test 3: OpenVPN TCP Meltdown Hazard
    calc3 = PacketCalculation(passenger_size=1460, tunnel_protocol="OpenVPN-TCP")
    res3 = engine.compute_encapsulation(calc3)
    print(f"\n[Test 3 - OpenVPN TCP Carrier]:")
    print(f"    Meltdown Risk: {res3['tcp_meltdown_risk']} (Dual Retransmission Loop Alert!)")
