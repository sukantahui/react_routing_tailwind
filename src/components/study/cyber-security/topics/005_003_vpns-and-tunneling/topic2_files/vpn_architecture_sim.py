"""
VPN Architecture Simulator: Remote Access (Client-to-Gateway) vs Site-to-Site (Router-to-Router)
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_003 (Topic 2)
"""

from dataclasses import dataclass
from typing import Dict, List, Optional

@dataclass
class NetworkEndpoint:
    name: str
    physical_ip: str
    is_branch_router: bool
    assigned_virtual_ip: Optional[str] = None
    mfa_authenticated: bool = False

class VPNArchitectureEngine:
    def __init__(self):
        # Remote Access Virtual IP Pool
        self.virtual_ip_pool = [f"10.200.1.{i}" for i in range(10, 50)]
        self.leased_ips: Dict[str, str] = {} # user_name -> virtual_ip

        # Site-to-Site Routing Table (VTI routes)
        self.site_to_site_routes = {
            "10.10.0.0/16": "Tunnel1 (Barrackpore Branch)",
            "10.12.0.0/16": "Tunnel2 (Ichapur Substation)",
            "10.20.0.0/16": "Local HQ LAN (Salt Lake Core DC)"
        }

    def process_remote_access_session(self, user: str, client_ip: str, mfa_valid: bool) -> Dict[str, any]:
        """Simulates Remote Access VPN tunnel negotiation, MFA verification, and dynamic IP lease."""
        if not mfa_valid:
            return {
                "architecture": "REMOTE_ACCESS_VPN",
                "status": "DENIED",
                "reason": "❌ MFA Authentication Failed (SAML/RADIUS challenge rejected)",
                "assigned_ip": None,
                "routing_mode": "None"
            }

        # Lease Virtual IP
        virtual_ip = self.virtual_ip_pool.pop(0)
        self.leased_ips[user] = virtual_ip

        return {
            "architecture": "REMOTE_ACCESS_VPN (Client-to-Gateway)",
            "status": "ESTABLISHED",
            "authenticated_user": user,
            "physical_client_ip": client_ip,
            "assigned_virtual_ip": virtual_ip,
            "protocol": "WireGuard / SSL-TLS (TUN Interface)",
            "routing_mode": f"Host Route Injected: 10.20.0.0/16 via {virtual_ip}",
            "transparency": "Visible to user (Client App Active)"
        }

    def route_site_to_site_packet(self, src_subnet: str, dst_subnet: str, payload: str) -> Dict[str, any]:
        """Simulates Site-to-Site IPsec hardware router forwarding across permanent VTIs."""
        outbound_tunnel = self.site_to_site_routes.get(dst_subnet, "Default Internet Gateway")

        return {
            "architecture": "SITE-TO-SITE_VPN (Router-to-Router)",
            "status": "FORWARDED_VIA_IPSEC_VTI",
            "ingress_subnet": src_subnet,
            "egress_subnet": dst_subnet,
            "selected_vti": outbound_tunnel,
            "protocol": "IPsec ESP Tunnel Mode (IKEv2)",
            "routing_mode": "Route-Based BGP / OSPF Dynamic Steering",
            "transparency": "100% Transparent (Zero Client Software Required)"
        }

# Execution Test Harness
if __name__ == "__main__":
    vpn_sim = VPNArchitectureEngine()
    print("=== VPN Architecture Comparison Simulator ===")

    # Test 1: Roaming Municipal Worker logs in with MFA
    print("\n--- 1. Remote Access VPN (Client-to-Gateway) ---")
    ra_res = vpn_sim.process_remote_access_session(
        user="debangshu_inspector",
        client_ip="203.0.113.88",
        mfa_valid=True
    )
    print(f"Status       : {ra_res['status']}")
    print(f"Assigned IP  : {ra_res['assigned_virtual_ip']}")
    print(f"Routing Mode : {ra_res['routing_mode']}")

    # Test 2: Branch Office Router sends packet to HQ Datacenter
    print("\n--- 2. Site-to-Site VPN (Router-to-Router) ---")
    s2s_res = vpn_sim.route_site_to_site_packet(
        src_subnet="10.10.0.0/16",
        dst_subnet="10.20.0.0/16",
        payload="SCADA_GRID_TELEMETRY_PACKET"
    )
    print(f"Status       : {s2s_res['status']}")
    print(f"Selected VTI : {s2s_res['selected_vti']}")
    print(f"Transparency : {s2s_res['transparency']}")
