"""
Legacy VPN Vulnerability Scanner: PPTP MS-CHAPv2 / RC4 Exploit Demonstrator
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_003 (Topic 7)
"""

import hashlib
from dataclasses import dataclass
from typing import Dict, List, Tuple

@dataclass
class VPNServiceAudit:
    service_name: str
    port: int
    protocol_type: str # "TCP", "UDP", "GRE"
    auth_method: str
    encryption: str

class LegacyVPNScanner:
    def __init__(self):
        # Known Vulnerability Database
        self.vulnerability_db = {
            "PPTP": {
                "cve": "CVE-2012-2122 / MS-CHAPv2 Weakness",
                "risk_level": "CRITICAL / FORBIDDEN",
                "flaws": [
                    "MS-CHAPv2 56-bit DES reduction allows 100% password recovery in < 23 hours",
                    "RC4 MPPE encryption lacks HMAC integrity tag (Vulnerable to bit-flipping)",
                    "GRE Protocol 47 frequently blocked by modern cloud firewalls"
                ],
                "remediation": "Decommission immediately; migrate to WireGuard or IKEv2 IPsec"
            },
            "L2TP_STANDALONE": {
                "cve": "CWE-319 (Cleartext Transmission of Sensitive Information)",
                "risk_level": "HIGH / INSECURE",
                "flaws": [
                    "Zero native encryption (All traffic, passwords, and data in 100% cleartext)",
                    "Vulnerable to passive eavesdropping and packet injection"
                ],
                "remediation": "Enforce L2TP/IPsec Transport Mode with AES-256-GCM or migrate to WireGuard"
            }
        }

    def audit_service(self, service: VPNServiceAudit) -> Dict[str, any]:
        """Audits a VPN service endpoint for legacy cryptographic weaknesses."""
        if service.service_name.upper() == "PPTP":
            vuln = self.vulnerability_db["PPTP"]
            # Mathematical DES cracking calculation
            des_key_space = 2 ** 56 # 72 Quadrillion keys
            crack_time_hours_fpga = 22.5 # Using Moxie Marlinspike CloudCracker FPGA cluster

            return {
                "service": service.service_name,
                "port": f"TCP/{service.port} + GRE (Proto 47)",
                "status": "❌ CRITICAL RISK: DEPRECATED & BROKEN",
                "auth_method": service.auth_method,
                "encryption": service.encryption,
                "des_key_space": f"{des_key_space:,} combinations (2^56)",
                "fpga_crack_time": f"~{crack_time_hours_fpga} Hours (100% Guaranteed Password Recovery)",
                "flaws": vuln["flaws"],
                "remediation": vuln["remediation"]
            }
        elif service.service_name.upper() == "L2TP" and "IPSEC" not in service.encryption.upper():
            vuln = self.vulnerability_db["L2TP_STANDALONE"]
            return {
                "service": service.service_name,
                "port": f"UDP/{service.port}",
                "status": "❌ INSECURE: CLEARTEXT TRANSMISSION",
                "auth_method": service.auth_method,
                "encryption": "NONE (Cleartext PPP Frames)",
                "flaws": vuln["flaws"],
                "remediation": vuln["remediation"]
            }
        else:
            return {
                "service": service.service_name,
                "status": "✔ ACCEPTABLE / MODERN",
                "auth_method": service.auth_method,
                "encryption": service.encryption,
                "remediation": "Maintain active CERT-In 180-day logging and regular rekeying"
            }

# Execution Test Harness
if __name__ == "__main__":
    scanner = LegacyVPNScanner()
    print("=== Legacy VPN Vulnerability Scanner ===")

    # Test 1: Audit Legacy Municipal PPTP Server
    pptp_srv = VPNServiceAudit(
        service_name="PPTP",
        port=1723,
        protocol_type="TCP",
        auth_method="MS-CHAPv2",
        encryption="MPPE-128 (RC4)"
    )
    res1 = scanner.audit_service(pptp_srv)
    print(f"\n[Test 1 - PPTP Audit]: {res1['status']}")
    print(f"    DES Key Space   : {res1.get('des_key_space')}")
    print(f"    Crack Time (FPGA): {res1.get('fpga_crack_time')}")
    print(f"    Remediation     : {res1.get('remediation')}")

    # Test 2: Audit Standalone L2TP Server (No IPsec)
    l2tp_srv = VPNServiceAudit(
        service_name="L2TP",
        port=1701,
        protocol_type="UDP",
        auth_method="PAP",
        encryption="NONE"
    )
    res2 = scanner.audit_service(l2tp_srv)
    print(f"\n[Test 2 - Standalone L2TP Audit]: {res2['status']}")
    print(f"    Encryption      : {res2.get('encryption')}")
    print(f"    Remediation     : {res2.get('remediation')}")
