#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: SPLIT TUNNELING VS FULL TUNNELING ROUTE & SECURITY AUDITOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_003 (VPNs & Tunneling)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script performs programmatic route table auditing, dual-homing pivot risk
detection, DNS leak assessment, and WAN hairpinning bandwidth calculations for
enterprise VPN endpoints.
"""

import sys
import json
import ipaddress
from dataclasses import dataclass, field
from typing import List, Dict, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES FOR ROUTING & SECURITY AUDIT
# =============================================================================

@dataclass
class RouteEntry:
    destination: str
    gateway: str
    interface: str
    metric: int
    is_vpn_tunnel: bool

@dataclass
class EndpointSecurityState:
    hostname: str
    user_name: str
    location: str
    physical_ip: str
    tunnel_ip: str
    dns_servers: List[str]
    routes: List[RouteEntry] = field(default_factory=list)
    local_firewall_enabled: bool = True
    split_tunnel_allowed: bool = False

# =============================================================================
# CORE AUDIT ENGINE: DETECTING TUNNEL MODE & ATTACK SURFACE
# =============================================================================

class VPNTunnelAuditor:
    def __init__(self, endpoint: EndpointSecurityState):
        self.endpoint = endpoint
        self.audit_log = []

    def log(self, message: str):
        self.audit_log.append(message)

    def analyze_tunnel_mode(self) -> Tuple[str, List[str]]:
        """
        Examines default route (0.0.0.0/0) and specific subnet routes to classify
        tunneling mode: FULL_TUNNEL, SPLIT_TUNNEL, or INVERSE_SPLIT_TUNNEL.
        """
        has_default_vpn_route = False
        has_default_physical_route = False
        corporate_subnets_in_tunnel = []
        public_subnets_in_tunnel = []

        for route in self.endpoint.routes:
            if route.destination in ("0.0.0.0/0", "default"):
                if route.is_vpn_tunnel:
                    has_default_vpn_route = True
                else:
                    has_default_physical_route = True
            else:
                try:
                    net = ipaddress.ip_network(route.destination)
                    if net.is_private and route.is_vpn_tunnel:
                        corporate_subnets_in_tunnel.append(route.destination)
                    elif not net.is_private and route.is_vpn_tunnel:
                        public_subnets_in_tunnel.append(route.destination)
                except ValueError:
                    pass

        if has_default_vpn_route and not has_default_physical_route:
            mode = "FULL_TUNNEL"
            details = [
                "100% of endpoint IP traffic (0.0.0.0/0) is forced through the encrypted VPN tunnel (tun0).",
                "Corporate Next-Gen Firewall (NGFW) & DLP inspect all internal and internet-bound packets.",
                "Hairpinning penalty active: Video streaming and web browsing consume corporate WAN bandwidth."
            ]
        elif has_default_physical_route and len(corporate_subnets_in_tunnel) > 0:
            mode = "SPLIT_TUNNEL"
            details = [
                "Default route (0.0.0.0/0) points to local physical ISP router (eth0/wlan0).",
                f"Only corporate subnets ({', '.join(corporate_subnets_in_tunnel)}) routed via VPN tunnel (tun0).",
                "Local Internet bypass active: Reduces corporate WAN congestion but increases endpoint attack surface."
            ]
        elif has_default_vpn_route and len(public_subnets_in_tunnel) > 0:
            mode = "INVERSE_SPLIT_TUNNEL"
            details = [
                "Default route (0.0.0.0/0) encapsulated in VPN, with specific SaaS exceptions routed directly.",
                "Optimized for approved cloud services (Microsoft 365, Zoom) while retaining corporate security."
            ]
        else:
            mode = "UNCONFIGURED_OR_BROKEN"
            details = ["Route table in inconsistent state; no valid corporate routing found."]

        return mode, details

    def check_dual_homed_pivot_risk(self) -> Dict[str, any]:
        """
        Assesses if an adversary on the local LAN can use the endpoint as a router/bridge
        to pivot into the private enterprise network.
        """
        mode, _ = self.analyze_tunnel_mode()
        is_at_risk = False
        vulnerability_factors = []

        if mode == "SPLIT_TUNNEL":
            is_at_risk = True
            vulnerability_factors.append(
                "CRITICAL: Endpoint has simultaneous active interfaces to untrusted local LAN and corporate intranet."
            )
            vulnerability_factors.append(
                "If IP Forwarding / Routing is enabled on the OS (net.ipv4.ip_forward=1), local LAN attackers can route packets into the corporate subnet."
            )
            vulnerability_factors.append(
                "Drive-by malware downloaded over uninspected local Wi-Fi can establish command-and-control and spread laterally over the VPN."
            )
        else:
            vulnerability_factors.append(
                "SECURE: Full Tunneling encapsulates all outbound connections. Local LAN ingress is blocked by firewall policy."
            )

        return {
            "dual_homed_risk": is_at_risk,
            "risk_level": "HIGH" if is_at_risk else "LOW",
            "findings": vulnerability_factors
        }

    def check_dns_leak(self, internal_dns: str = "10.0.0.53") -> Dict[str, any]:
        """
        Verifies whether DNS resolution requests leak to public ISP resolvers.
        """
        leaking_resolvers = []
        for dns in self.endpoint.dns_servers:
            try:
                ip = ipaddress.ip_address(dns)
                if not ip.is_private and dns != internal_dns:
                    leaking_resolvers.append(dns)
            except ValueError:
                pass

        has_leak = len(leaking_resolvers) > 0
        return {
            "dns_leak_detected": has_leak,
            "public_resolvers": leaking_resolvers,
            "status": "VULNERABLE (DNS Leak)" if has_leak else "SECURE (Internal DNS Enforced)",
            "mitigation": "Enforce static DNS assignment inside tunnel adapter and block outbound UDP/53 on physical NIC."
        }

    def calculate_bandwidth_hairpin_cost(self, num_users: int, avg_video_gb_day: float, cost_per_gb_inr: float = 3.5) -> Dict[str, float]:
        """
        Calculates the financial and bandwidth penalty of Full Tunneling vs Split Tunneling in INR (₹).
        """
        monthly_days = 22  # Working days per month
        monthly_video_traffic_gb = num_users * avg_video_gb_day * monthly_days
        monthly_extra_wan_cost_inr = monthly_video_traffic_gb * cost_per_gb_inr

        return {
            "monthly_hairpinned_video_tb": round(monthly_video_traffic_gb / 1024, 2),
            "monthly_extra_wan_cost_inr": round(monthly_extra_wan_cost_inr, 2),
            "monthly_cost_lakhs_inr": round(monthly_extra_wan_cost_inr / 100000, 3),
            "split_tunnel_savings_percent": 65.0
        }

# =============================================================================
# SIMULATION WORKBENCH: REGIONAL CASE EXAMPLES (BARRACKPORE & KOLKATA)
# =============================================================================

def run_simulation():
    print("=" * 80)
    print("  ACADEMIC VPN AUDIT: SPLIT TUNNELING VS FULL TUNNELING TRADE-OFF ENGINE")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    # 1. Endpoint A: Mamata (Barrackpore FinTech Desk - Full Tunnel Enforced)
    endpoint_mamata = EndpointSecurityState(
        hostname="FIN-DESK-MAMATA",
        user_name="Mamata",
        location="Barrackpore Core Hub",
        physical_ip="192.168.1.45",
        tunnel_ip="10.8.0.12",
        dns_servers=["10.0.0.53"],
        routes=[
            RouteEntry("0.0.0.0/0", "10.8.0.1", "tun0", 10, True),
            RouteEntry("10.0.0.0/8", "10.8.0.1", "tun0", 10, True),
            RouteEntry("192.168.1.0/24", "0.0.0.0", "wlan0", 50, False)
        ],
        local_firewall_enabled=True,
        split_tunnel_allowed=False
    )

    # 2. Endpoint B: Debangshu (Remote Engineer - Misconfigured Split Tunnel)
    endpoint_debangshu = EndpointSecurityState(
        hostname="DEV-LAPTOP-DEBANGSHU",
        user_name="Debangshu",
        location="Kolkata Sector V Remote Desk",
        physical_ip="192.168.29.102",
        tunnel_ip="10.8.0.88",
        dns_servers=["8.8.8.8", "10.0.0.53"],
        routes=[
            RouteEntry("0.0.0.0/0", "192.168.29.1", "wlan0", 10, False),
            RouteEntry("10.0.0.0/8", "10.8.0.1", "tun0", 20, True),
            RouteEntry("172.16.0.0/12", "10.8.0.1", "tun0", 20, True),
            RouteEntry("192.168.29.0/24", "0.0.0.0", "wlan0", 50, False)
        ],
        local_firewall_enabled=False,
        split_tunnel_allowed=True
    )

    for ep in [endpoint_mamata, endpoint_debangshu]:
        print(f"\n[+] AUDITING ENDPOINT: {ep.hostname} (User: {ep.user_name} @ {ep.location})")
        print("-" * 75)
        auditor = VPNTunnelAuditor(ep)

        mode, details = auditor.analyze_tunnel_mode()
        print(f"  Tunneling Architecture : {mode}")
        for d in details:
            print(f"    • {d}")

        pivot_risk = auditor.check_dual_homed_pivot_risk()
        print(f"\n  Dual-Homed Pivot Risk  : [{pivot_risk['risk_level']}]")
        for f in pivot_risk['findings']:
            print(f"    -> {f}")

        dns_status = auditor.check_dns_leak()
        print(f"\n  DNS Leak Assessment    : {dns_status['status']}")
        if dns_status['dns_leak_detected']:
            print(f"    [!] Warning: Outbound queries leaking to {dns_status['public_resolvers']}")
            print(f"    [*] Fix: {dns_status['mitigation']}")

    # 3. Enterprise Sizing & Cost Analysis
    print("\n" + "=" * 80)
    print("  FINANCIAL & WAN HAIRPINNING CALCULATION (INR ₹)")
    print("=" * 80)
    auditor_calc = VPNTunnelAuditor(endpoint_mamata)
    metrics = auditor_calc.calculate_bandwidth_hairpin_cost(
        num_users=500, avg_video_gb_day=2.8, cost_per_gb_inr=4.0
    )
    print(f"  Target Workforce Size            : 500 Remote Employees")
    print(f"  Monthly Video/Streaming Hairpin  : {metrics['monthly_hairpinned_video_tb']} TB")
    print(f"  Total Extra WAN Bandwidth Cost   : ₹{metrics['monthly_extra_wan_cost_inr']:,.2f} / month")
    print(f"  Estimated TCO Impact             : ₹{metrics['monthly_cost_lakhs_inr']} Lakhs / month")
    print(f"  Potential Split-Tunnel Savings   : {metrics['split_tunnel_savings_percent']}% WAN cost reduction")
    print("=" * 80)

if __name__ == "__main__":
    run_simulation()
