"""
Public Network Threat Simulator: Cleartext Sniffing vs Encrypted VPN Tunneling
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_003 (Topic 1)
"""

from dataclasses import dataclass
from typing import Dict, List

@dataclass
class NetworkTransmission:
    application: str       # "HTTP_LOGIN", "FTP_TRANSFER", "INTERNAL_EHR"
    sender_ip: str
    target_host: str
    is_vpn_protected: bool
    raw_sensitive_data: str

class PublicNetworkSnifferSimulator:
    def __init__(self):
        self.captured_logs: List[Dict[str, any]] = []

    def intercept_traffic(self, tx: NetworkTransmission) -> Dict[str, any]:
        """Simulates an adversary running Wireshark/Ettercap on an untrusted public Wi-Fi network."""
        if not tx.is_vpn_protected:
            # Cleartext exposure
            stolen_credentials = tx.raw_sensitive_data
            packet_view = f"[CLEARTEXT PACKET EXPOSED] {tx.application} | Payload: {stolen_credentials}"
            threat_severity = "CRITICAL (Data Stolen by Eavesdropper)"
            mitm_vulnerable = True
        else:
            # Protected by AES-256-GCM VPN Tunnel
            encrypted_hex = "7F4A99B812C450E72B33880F1A29D4E67789AABBCCDDEEFF0011223344556677"
            stolen_credentials = "[UNREADABLE ENCRYPTED CIPHERTEXT]"
            packet_view = f"[ENCRYPTED ESP TUNNEL] Public Header: {tx.sender_ip} -> VPN_GATEWAY | Encrypted Payload: {encrypted_hex[:32]}..."
            threat_severity = "SAFE (Zero Plaintext Exposure)"
            mitm_vulnerable = False

        capture_record = {
            "application": tx.application,
            "is_vpn_active": tx.is_vpn_protected,
            "adversary_packet_view": packet_view,
            "stolen_data": stolen_credentials,
            "mitm_vulnerability": mitm_vulnerable,
            "security_verdict": threat_severity
        }
        self.captured_logs.append(capture_record)
        return capture_record

# Execution Test Harness
if __name__ == "__main__":
    sniffer = PublicNetworkSnifferSimulator()
    print("=== Public Wi-Fi Sniffing vs VPN Protection Simulator ===")

    # Test 1: Remote Worker connects to Civic Tax Portal without VPN
    tx1 = NetworkTransmission(
        application="CIVIC_PORTAL_AUTH",
        sender_ip="192.168.1.105",
        target_host="tax.barrackpore.gov.in",
        is_vpn_protected=False,
        raw_sensitive_data="USER=debangshu_admin; PASS=BarrackporeSecret2026!; AADHAAR=9918-2831-4412"
    )
    res1 = sniffer.intercept_traffic(tx1)
    print(f"\n[Test 1 - UNPROTECTED PUBLIC WI-FI]:")
    print(f"    Adversary View : {res1['adversary_packet_view']}")
    print(f"    Stolen Data    : {res1['stolen_data']}")
    print(f"    Verdict        : {res1['security_verdict']}")

    # Test 2: Remote Worker connects via Encrypted WireGuard / IPsec VPN
    tx2 = NetworkTransmission(
        application="CIVIC_PORTAL_AUTH",
        sender_ip="192.168.1.105",
        target_host="tax.barrackpore.gov.in",
        is_vpn_protected=True,
        raw_sensitive_data="USER=debangshu_admin; PASS=BarrackporeSecret2026!; AADHAAR=9918-2831-4412"
    )
    res2 = sniffer.intercept_traffic(tx2)
    print(f"\n[Test 2 - ENCRYPTED VPN TUNNEL]:")
    print(f"    Adversary View : {res2['adversary_packet_view']}")
    print(f"    Stolen Data    : {res2['stolen_data']}")
    print(f"    Verdict        : {res2['security_verdict']}")
