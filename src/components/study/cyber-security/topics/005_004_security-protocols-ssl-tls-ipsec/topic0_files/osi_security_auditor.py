#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: OSI LAYER SECURITY PROTOCOLS & ENCAPSULATION AUDITOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_004 (SSL, TLS & IPsec)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script audits network security protocols across the 7-layer OSI stack,
evaluates defense-in-depth packet encapsulation, and calculates cumulative
header overhead and encryption latency.
"""

import sys
import json
from dataclasses import dataclass, field
from typing import List, Dict, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES FOR OSI SECURITY PROTOCOLS
# =============================================================================

@dataclass
class OSISecurityProtocol:
    name: str
    osi_layer: str            # "Layer 7 - Application", "Layer 4 - Transport", "Layer 3 - Network", "Layer 2 - Data Link"
    primary_function: str
    encryption_algorithm: str
    integrity_mechanism: str
    scope: str                # "End-to-End User Data", "Process-to-Process", "Host-to-Host", "Hop-by-Hop"
    header_overhead_bytes: int
    transparency_to_apps: bool

# =============================================================================
# OSI SECURITY AUDIT & SIMULATION ENGINE
# =============================================================================

class OSISecurityEngine:
    def __init__(self):
        self.protocols = [
            OSISecurityProtocol("HTTPS (TLS 1.3)", "Layer 7 - Application", "Web Application & API Encryption", "AES-256-GCM / ChaCha20", "Poly1305 / SHA-256", "End-to-End User Data", 29, False),
            OSISecurityProtocol("SSH v2", "Layer 7 - Application", "Secure Remote Administration & Terminal", "AES-256-CTR / ChaCha20", "HMAC-SHA-512", "Process-to-Process", 36, False),
            OSISecurityProtocol("DNSSEC", "Layer 7 - Application", "Domain Name System Integrity & Authenticity", "None (Signing Only)", "RSA / ECDSA Signatures", "Query-Response Integrity", 64, False),
            OSISecurityProtocol("TLS 1.3 Record Layer", "Layer 4 - Transport", "Encrypted Socket Transport for TCP", "AES-256-GCM", "AEAD Built-in Tag", "Process-to-Process Socket", 21, False),
            OSISecurityProtocol("IPsec ESP (Tunnel Mode)", "Layer 3 - Network", "Transparent Host-to-Host & Site-to-Site VPN", "AES-256-GCM", "ICV HMAC-SHA-256", "Host-to-Host / Gateway", 60, True),
            OSISecurityProtocol("IPsec AH (Authentication)", "Layer 3 - Network", "Packet Authentication & Anti-Replay", "None (Integrity Only)", "HMAC-SHA-256 (Includes IP Header)", "Host-to-Host", 24, True),
            OSISecurityProtocol("MACsec (IEEE 802.1AE)", "Layer 2 - Data Link", "Hardware-Rate Link Layer Switch Encryption", "AES-128/256-GCM (SecTAG)", "128-bit ICV", "Hop-by-Hop Switch Link", 32, True),
            OSISecurityProtocol("802.1X (EAP-TLS)", "Layer 2 - Data Link", "Port-Based Network Access Control", "TLS Envelope for EAP", "EAP-TLS Challenge", "Port Admission", 18, True)
        ]

    def audit_defense_in_depth(self, active_layers: List[str]) -> Dict[str, any]:
        """
        Evaluates protection against multiple attack vectors based on active security layers.
        """
        threats = {
            "wifi_packet_sniffing": "Layer 2 (MACsec/WPA3)" in active_layers or "Layer 3 (IPsec)" in active_layers or "Layer 4/7 (TLS/HTTPS)" in active_layers,
            "isp_man_in_the_middle": "Layer 3 (IPsec)" in active_layers or "Layer 4/7 (TLS/HTTPS)" in active_layers,
            "dns_spoofing_cache_poison": "DNSSEC" in active_layers or "DoH (TLS)" in active_layers,
            "lateral_subnet_port_scan": "Layer 3 (IPsec/ZTNA)" in active_layers,
            "application_tampering": "Layer 7 (HTTPS/SAML)" in active_layers
        }

        total_overhead_bytes = sum(
            p.header_overhead_bytes for p in self.protocols if any(l in p.osi_layer for l in active_layers)
        )

        effective_mtu = 1500 - total_overhead_bytes

        return {
            "active_layers": active_layers,
            "threat_mitigation_status": threats,
            "total_stack_overhead_bytes": total_overhead_bytes,
            "effective_usable_mtu": effective_mtu,
            "bandwidth_efficiency_percent": round((effective_mtu / 1500) * 100, 1)
        }

# =============================================================================
# SIMULATION WORKBENCH: BARRACKPORE MULTI-TIER DEFENSE AUDIT
# =============================================================================

def run_osi_security_audit():
    print("=" * 80)
    print("  OSI LAYER SECURITY PROTOCOLS ACROSS THE NETWORK STACK")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    engine = OSISecurityEngine()

    print("\n[+] SECTION 1: OSI SECURITY PROTOCOL CATALOG & HEADER TAX")
    print("-" * 75)
    for p in engine.protocols:
        transparency = "Transparent to Apps" if p.transparency_to_apps else "App-Specific"
        print(f"  • {p.name:<25} [{p.osi_layer:<20}] Overhead: {p.header_overhead_bytes}B")
        print(f"    Scope: {p.scope:<25} | Crypto: {p.encryption_algorithm} + {p.integrity_mechanism}")
        print(f"    Function: {p.primary_function} ({transparency})\n")

    # 2. Defense-in-Depth Scenario Audit
    print("=" * 80)
    print("  SECTION 2: DEFENSE-IN-DEPTH MULTI-LAYER STACK AUDIT")
    print("=" * 80)
    active_stack = ["Layer 7 - Application", "Layer 4 - Transport", "Layer 3 - Network", "Layer 2 - Data Link"]
    audit = engine.audit_defense_in_depth(active_stack)

    print(f"  Active Security Layers       : {', '.join(active_stack)}")
    print(f"  Cumulative Header Overhead   : {audit['total_stack_overhead_bytes']} Bytes per Frame")
    print(f"  Effective Usable Payload MTU : {audit['effective_usable_mtu']} Bytes (1500B Baseline)")
    print(f"  Stack Bandwidth Efficiency   : {audit['bandwidth_efficiency_percent']}%")

    print("\n  [+] Threat Mitigation Vector Verification:")
    for threat, mitigated in audit['threat_mitigation_status'].items():
        status_icon = "✔ MITIGATED" if mitigated else "❌ VULNERABLE"
        print(f"    • {threat:<30}: {status_icon}")
    print("=" * 80)

if __name__ == "__main__":
    run_osi_security_audit()
