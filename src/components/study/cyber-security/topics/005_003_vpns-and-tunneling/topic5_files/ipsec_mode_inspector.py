"""
IPsec Mode Inspector & Encapsulation Engine (Tunnel Mode vs Transport Mode)
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_003 (Topic 5)
"""

import hmac
import hashlib
from dataclasses import dataclass
from typing import Dict, Tuple

@dataclass
class OriginalPacket:
    src_ip: str         # "10.10.1.5"
    dst_ip: str         # "10.20.1.50"
    proto: str          # "TCP"
    payload: str        # "CONFIDENTIAL_PAYLOAD_DATA"

class IPsecModeEngine:
    def __init__(self, key: bytes = b"BarrackporeIPsecKey2026"):
        self.key = key
        self.spi = 0x100A

    def encapsulate_tunnel_mode(
        self,
        pkt: OriginalPacket,
        gateway_src: str = "203.0.113.88",
        gateway_dst: str = "198.51.100.1"
    ) -> Dict[str, any]:
        """Encapsulates in IPsec ESP Tunnel Mode (New Public IP + Encrypted Inner IP Packet)."""
        inner_raw = f"SRC={pkt.src_ip}|DST={pkt.dst_ip}|PROTO={pkt.proto}|DATA={pkt.payload}"
        ciphertext = bytes([b ^ k for b, k in zip(inner_raw.encode('utf-8'), self.key * 4)])
        auth_tag = hmac.new(self.key, ciphertext, hashlib.sha256).hexdigest()[:16]

        overhead_bytes = 20 + 8 + 8 + 16 + 16 # Outer IP(20) + UDP(8) + ESP(8) + IV(16) + ICV(16)
        total_bytes = len(inner_raw) + overhead_bytes

        return {
            "mode": "TUNNEL_MODE",
            "outer_header": f"Public IPv4 ({gateway_src} -> {gateway_dst})",
            "esp_header": f"SPI: 0x{self.spi:X} | Seq: #1 | UDP Port 4500",
            "encrypted_scope": f"Inner IP Header ({pkt.src_ip} -> {pkt.dst_ip}) + TCP + Data Payload",
            "ciphertext_hex": ciphertext.hex(),
            "auth_tag": auth_tag,
            "overhead_bytes": overhead_bytes,
            "total_packet_bytes": total_bytes,
            "nat_compatible": True,
            "use_case": "Site-to-Site & Remote Access Gateway-to-Gateway VPN"
        }

    def encapsulate_transport_mode(self, pkt: OriginalPacket) -> Dict[str, any]:
        """Encapsulates in IPsec ESP Transport Mode (Original IP Preserved + Encrypted Payload Only)."""
        payload_raw = f"PROTO={pkt.proto}|DATA={pkt.payload}"
        ciphertext = bytes([b ^ k for b, k in zip(payload_raw.encode('utf-8'), self.key * 4)])
        auth_tag = hmac.new(self.key, ciphertext, hashlib.sha256).hexdigest()[:16]

        overhead_bytes = 8 + 8 + 16 + 16 # UDP(8) + ESP(8) + IV(16) + ICV(16) [Saves 20B Outer IP]
        total_bytes = len(payload_raw) + 20 + overhead_bytes

        return {
            "mode": "TRANSPORT_MODE",
            "outer_header": f"Original IPv4 Header Preserved ({pkt.src_ip} -> {pkt.dst_ip})",
            "esp_header": f"SPI: 0x{self.spi:X} | Seq: #1",
            "encrypted_scope": f"TCP Header + Data Payload ONLY (IP Addresses visible in cleartext!)",
            "ciphertext_hex": ciphertext.hex(),
            "auth_tag": auth_tag,
            "overhead_bytes": overhead_bytes,
            "total_packet_bytes": total_bytes,
            "nat_compatible": True,
            "use_case": "Host-to-Host Datacenter Encryption / L2TP & GRE Transport"
        }

# Execution Test Harness
if __name__ == "__main__":
    ipsec = IPsecModeEngine()
    print("=== IPsec Mode Inspector (Tunnel Mode vs Transport Mode) ===")

    raw_pkt = OriginalPacket(
        src_ip="10.10.1.5",
        dst_ip="10.20.1.50",
        proto="TCP",
        payload="TAX_TRANSACTION_₹50,000"
    )

    # Test 1: Tunnel Mode
    tunnel_res = ipsec.encapsulate_tunnel_mode(raw_pkt)
    print(f"\n[1. IPsec ESP Tunnel Mode]:")
    print(f"    Outer Header    : {tunnel_res['outer_header']}")
    print(f"    Encrypted Scope : {tunnel_res['encrypted_scope']}")
    print(f"    Total Overhead  : {tunnel_res['overhead_bytes']} Bytes")
    print(f"    Use Case        : {tunnel_res['use_case']}")

    # Test 2: Transport Mode
    transport_res = ipsec.encapsulate_transport_mode(raw_pkt)
    print(f"\n[2. IPsec ESP Transport Mode]:")
    print(f"    Outer Header    : {transport_res['outer_header']}")
    print(f"    Encrypted Scope : {transport_res['encrypted_scope']}")
    print(f"    Total Overhead  : {transport_res['overhead_bytes']} Bytes (Saves 20 Bytes!)")
    print(f"    Use Case        : {transport_res['use_case']}")
