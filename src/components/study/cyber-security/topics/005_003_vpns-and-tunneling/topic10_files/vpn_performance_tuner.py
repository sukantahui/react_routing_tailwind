#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: VPN IMPLEMENTATION CHALLENGES & PERFORMANCE TUNER
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_003 (VPNs & Tunneling)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script calculates packet encapsulation overhead, models PMTU black holes,
evaluates TCP-over-TCP meltdown throughput collapse, and audits PKI X.509
certificate lifecycles for enterprise VPN deployments.
"""

import sys
import json
import math
from dataclasses import dataclass
from typing import List, Dict, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES FOR PROTOCOL OVERHEAD & MTU / MSS AUDITING
# =============================================================================

@dataclass
class ProtocolOverheadSpec:
    name: str
    outer_ip_bytes: int        # IPv4 (20B) or IPv6 (40B)
    carrier_l4_bytes: int      # UDP (8B) or TCP (20B)
    tunnel_header_bytes: int   # ESP (8B) or WireGuard (32B) or OpenVPN (14B)
    iv_bytes: int              # Initialization Vector (8B / 16B)
    icv_mac_bytes: int         # Integrity Tag (16B Poly1305 / SHA-256)
    pad_alignment_bytes: int   # AES Block (16B) or Stream (0B)

    @property
    def total_fixed_overhead(self) -> int:
        return (
            self.outer_ip_bytes +
            self.carrier_l4_bytes +
            self.tunnel_header_bytes +
            self.iv_bytes +
            self.icv_mac_bytes
        )

# =============================================================================
# CALCULATION ENGINES: MTU, MSS CLAMPING, AND TCP MELTDOWN
# =============================================================================

class VPNPerformanceEngine:
    def __init__(self, physical_mtu: int = 1500):
        self.physical_mtu = physical_mtu

    def calculate_effective_mss(self, proto: ProtocolOverheadSpec, is_ipv6: bool = False) -> Dict[str, any]:
        """
        Calculates optimal Maximum Segment Size (MSS) to prevent fragmentation and PMTU black holes.
        Standard IPv4 TCP Header = 20B, IPv6 TCP Header = 40B.
        """
        inner_ip_bytes = 40 if is_ipv6 else 20
        inner_tcp_bytes = 20
        total_encap_overhead = proto.total_fixed_overhead

        tunnel_mtu = self.physical_mtu - total_encap_overhead
        recommended_mss = tunnel_mtu - inner_ip_bytes - inner_tcp_bytes

        # Check for MTU overflow
        standard_packet_size = 1500 + total_encap_overhead
        will_fragment = standard_packet_size > self.physical_mtu

        return {
            "protocol_name": proto.name,
            "physical_mtu": self.physical_mtu,
            "encapsulation_overhead_bytes": total_encap_overhead,
            "effective_tunnel_mtu": tunnel_mtu,
            "recommended_clamped_mss": recommended_mss,
            "will_fragment_without_clamping": will_fragment,
            "iptables_rule": f"iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss {recommended_mss}"
        }

    def model_tcp_meltdown_throughput(self, packet_loss_percent: float, latency_ms: float, bandwidth_mbps: float) -> Dict[str, float]:
        """
        Models Mathis Formula throughput degradation comparing UDP-based tunnels (WireGuard/DTLS)
        vs TCP-based tunnels (OpenVPN over TCP) under packet loss.
        """
        loss_rate = max(0.0001, packet_loss_percent / 100.0)
        rtt_sec = latency_ms / 1000.0

        # Standard Mathis Formula for TCP: Throughput <= (MSS / RTT) * (1 / sqrt(p))
        mathis_raw_bps = (1460 * 8 / rtt_sec) * (1 / math.sqrt(loss_rate))
        mathis_mbps = round(min(bandwidth_mbps, mathis_raw_bps / 1000000), 2)

        # TCP-over-TCP suffers quadratic retransmission backoff
        tcp_in_tcp_mbps = round(mathis_mbps * (1 / (1 + (packet_loss_percent * 1.8))), 2)

        # UDP tunnels maintain raw throughput without inner stack fighting
        udp_tunnel_mbps = round(mathis_mbps * 0.95, 2)

        return {
            "loss_percent": packet_loss_percent,
            "rtt_ms": latency_ms,
            "udp_tunnel_throughput_mbps": udp_tunnel_mbps,
            "tcp_in_tcp_meltdown_mbps": tcp_in_tcp_mbps,
            "meltdown_penalty_percent": round(((udp_tunnel_mbps - tcp_in_tcp_mbps) / max(0.01, udp_tunnel_mbps)) * 100, 1)
        }

    def audit_key_management_tco(self, fleet_size: int, psk_admin_hours_mo: float = 12.0) -> Dict[str, any]:
        """
        Calculates administrative overhead and financial impact of PSK vs PKI/X.509 in INR (₹).
        """
        hourly_soc_rate_inr = 850.0  # Hourly engineer rate in West Bengal
        monthly_psk_admin_cost_inr = psk_admin_hours_mo * hourly_soc_rate_inr
        annual_psk_cost_lakhs = (monthly_psk_admin_cost_inr * 12) / 100000

        # Automated PKI with SCEP/EST costs
        annual_automated_pki_lakhs = (fleet_size * 45 * 12) / 100000

        return {
            "fleet_size": fleet_size,
            "annual_psk_manual_tco_lakhs": round(annual_psk_cost_lakhs, 2),
            "annual_automated_pki_lakhs": round(annual_automated_pki_lakhs, 2),
            "psk_risk_verdict": "CRITICAL RISK: Hardcoded static PSK shared across endpoints violates PCI-DSS 4.0",
            "pki_verdict": "SECURE: Automated short-lived certificates with OCSP revocation"
        }

# =============================================================================
# SIMULATION WORKBENCH: BARRACKPORE & KOLKATA CASE STUDIES
# =============================================================================

def run_performance_audit():
    print("=" * 80)
    print("  VPN IMPLEMENTATION CHALLENGES: MTU, MSS CLAMPING & MELTDOWN AUDITOR")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    # 1. Protocol Overhead Database
    protocols = [
        ProtocolOverheadSpec("WireGuard (ChaCha20-Poly1305)", 20, 8, 32, 0, 16, 0),
        ProtocolOverheadSpec("IPsec ESP (AES-256-GCM)", 20, 8, 8, 8, 16, 4),
        ProtocolOverheadSpec("OpenVPN over TLS/UDP", 20, 8, 14, 16, 16, 0),
        ProtocolOverheadSpec("L2TP/IPsec (Double Encap)", 20, 8, 36, 16, 16, 16)
    ]

    engine = VPNPerformanceEngine(physical_mtu=1500)

    print("\n[+] SECTION 1: ENCAPSULATION OVERHEAD & RECOMMENDED MSS CLAMPING")
    print("-" * 75)
    for proto in protocols:
        audit = engine.calculate_effective_mss(proto)
        print(f"  Protocol: {audit['protocol_name']:<35}")
        print(f"    • Total Header Overhead : {audit['encapsulation_overhead_bytes']} Bytes")
        print(f"    • Effective Tunnel MTU  : {audit['effective_tunnel_mtu']} Bytes")
        print(f"    • Recommended Clamped MSS: {audit['recommended_clamped_mss']} Bytes")
        print(f"    • Linux iptables Command: {audit['iptables_rule']}\n")

    # 2. TCP-over-TCP Meltdown Modeling under 4% packet loss on 100 Mbps link
    print("=" * 80)
    print("  SECTION 2: TCP-OVER-TCP MELTDOWN VS UDP TUNNELING (4% PACKET LOSS)")
    print("=" * 80)
    meltdown = engine.model_tcp_meltdown_throughput(packet_loss_percent=4.0, latency_ms=45.0, bandwidth_mbps=100.0)
    print(f"  Physical WAN Bandwidth       : 100.0 Mbps | RTT Latency: 45 ms")
    print(f"  Packet Loss Rate             : {meltdown['loss_percent']}%")
    print(f"  UDP Tunnel Throughput (wg0)  : {meltdown['udp_tunnel_throughput_mbps']} Mbps (Resilient)")
    print(f"  TCP-in-TCP Meltdown (SSL-VPN): {meltdown['tcp_in_tcp_meltdown_mbps']} Mbps (Collapsed!)")
    print(f"  Throughput Penalty           : {meltdown['meltdown_penalty_percent']}% Bandwidth Lost to Retransmissions")

    # 3. Key Management TCO Audit
    print("\n" + "=" * 80)
    print("  SECTION 3: KEY MANAGEMENT & CERTIFICATE LIFECYCLE AUDIT (INR ₹)")
    print("=" * 80)
    key_audit = engine.audit_key_management_tco(fleet_size=600, psk_admin_hours_mo=16.0)
    print(f"  Enterprise Fleet Size        : {key_audit['fleet_size']} Remote Laptops")
    print(f"  Manual PSK Administrative TCO: ₹{key_audit['annual_psk_manual_tco_lakhs']} Lakhs / year")
    print(f"  Automated SCEP/EST PKI TCO   : ₹{key_audit['annual_automated_pki_lakhs']} Lakhs / year")
    print(f"  Compliance Verdict           : {key_audit['psk_risk_verdict']}")
    print("=" * 80)

if __name__ == "__main__":
    run_performance_audit()
