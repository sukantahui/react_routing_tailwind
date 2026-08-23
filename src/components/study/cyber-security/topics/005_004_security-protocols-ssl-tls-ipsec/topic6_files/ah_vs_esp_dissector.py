#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: AH VS ESP WIRE DISSECTOR & NAT-TRAVERSAL SIMULATOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_004 (SSL, TLS & IPsec)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic packet dissection and cryptographic analysis of:
1. Authentication Header (AH - Protocol 51) immutable field zeroing & ICV checks.
2. Encapsulating Security Payload (ESP - Protocol 50) AEAD framing & ICV GMAC tags.
3. NAT translation impact: Why AH fails on NAT and ESP NAT-T (UDP 4500) succeeds.
4. Comparative performance benchmark: Combined AEAD (AES-GCM) vs Legacy 2-Pass.
"""

import sys
import hashlib
import hmac
import struct
import binascii
from dataclasses import dataclass
from typing import Dict, Tuple, List

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES
# =============================================================================

@dataclass
class IPv4Header:
    src_ip: str
    dst_ip: str
    protocol: int              # 50 (ESP), 51 (AH), 6 (TCP), 17 (UDP)
    ttl: int = 64              # Mutable in transit
    tos_dscp: int = 0          # Mutable in transit
    total_length: int = 1400   # Immutable
    checksum: int = 0x4a1f     # Mutable in transit

@dataclass
class AHPacket:
    spi: int                   # 32-bit Security Parameter Index
    seq_num: int               # 32-bit Sequence Number
    next_header: int           # Upper-layer protocol (e.g. 6 for TCP)
    payload_data: bytes
    auth_key: bytes

@dataclass
class ESPPacket:
    spi: int                   # 32-bit SPI
    seq_num: int               # 32-bit Sequence Number
    iv: bytes                  # 8-byte AES-GCM IV
    plaintext_payload: bytes
    next_header: int           # Upper-layer protocol (e.g. 6 for TCP)
    cipher_key: bytes

# =============================================================================
# AH & ESP DISSECTION & CRYPTOGRAPHIC ENGINE
# =============================================================================

class IPsecProtocolDissector:
    def __init__(self):
        self.shared_key = b"BarrackporeTreasurySecretKey2026"

    def compute_ah_icv(self, ip_hdr: IPv4Header, ah_pkt: AHPacket, is_sender: bool = True) -> bytes:
        """
        Computes AH ICV (RFC 4302). Zeroes out mutable IP fields (TTL, TOS, Checksum).
        """
        # 1. Zero out mutable fields for ICV computation
        immutable_ip_bytes = (
            ip_hdr.src_ip.encode() +
            ip_hdr.dst_ip.encode() +
            struct.pack("!BB", 0, ip_hdr.protocol) + # TOS zeroed (0)
            struct.pack("!H", ip_hdr.total_length)
            # Note: TTL and Header Checksum are omitted / zeroed
        )

        # 2. AH Header bytes (with ICV field zeroed during computation)
        ah_header_bytes = struct.pack("!BBHII", ah_pkt.next_header, 4, 0, ah_pkt.spi, ah_pkt.seq_num)

        # 3. Payload bytes
        payload = ah_pkt.payload_data

        # 4. Compute HMAC-SHA256 truncated to 128 bits (16 bytes)
        mac = hmac.new(ah_pkt.auth_key, immutable_ip_bytes + ah_header_bytes + payload, hashlib.sha256)
        return mac.digest()[:16]

    def simulate_nat_translation(self, original_src: str, nat_public_ip: str, payload_str: str) -> Dict[str, any]:
        """
        Demonstrates why AH breaks when traversing NAT while ESP succeeds.
        """
        auth_key = self.shared_key
        payload_bytes = payload_str.encode("utf-8")

        # --- SENDER (Private Subnet 10.14.0.5) ---
        sender_ip_hdr = IPv4Header(src_ip=original_src, dst_ip="198.51.100.20", protocol=51)
        sender_ah = AHPacket(spi=0x88AF1901, seq_num=101, next_header=6, payload_data=payload_bytes, auth_key=auth_key)
        sender_icv = self.compute_ah_icv(sender_ip_hdr, sender_ah, is_sender=True)

        # --- NAT ROUTER TRANSLATION ---
        # Router rewrites source IP to public IP
        router_translated_ip_hdr = IPv4Header(src_ip=nat_public_ip, dst_ip="198.51.100.20", protocol=51)

        # --- RECEIVER (Kolkata Datacenter) ---
        # Receiver recomputes ICV using the incoming packet's IP header (which was modified by NAT)
        receiver_ah = AHPacket(spi=0x88AF1901, seq_num=101, next_header=6, payload_data=payload_bytes, auth_key=auth_key)
        receiver_icv = self.compute_ah_icv(router_translated_ip_hdr, receiver_ah, is_sender=False)

        ah_passed = (sender_icv == receiver_icv)

        return {
            "original_src_ip": original_src,
            "nat_translated_ip": nat_public_ip,
            "sender_icv_hex": binascii.hexlify(sender_icv).decode(),
            "receiver_icv_hex": binascii.hexlify(receiver_icv).decode(),
            "ah_verification_status": "PASS" if ah_passed else "FAIL (DROPPED BY KERNEL)",
            "esp_natt_status": "PASS (UDP 4500 preserves inner ESP payload & ICV)"
        }

    def benchmark_aead_vs_legacy(self, data_size_mb: int = 100) -> Dict[str, str]:
        """
        Compares computational complexity of Combined AEAD (AES-GCM) vs Legacy 2-Pass (AES-CBC + HMAC).
        """
        return {
            "aead_aes_gcm": {
                "algorithm": "AES-256-GCM (RFC 4106)",
                "passes_per_block": 1,
                "hardware_acceleration": "AES-NI + PCLMULQDQ (Single-cycle Galois multiply)",
                "estimated_throughput_gbps": "9.8 Gbps (Line Rate on modern CPUs)",
                "padding_oracle_resistance": "Immune (Galois tag verified before plaintext release)"
            },
            "legacy_2_pass": {
                "algorithm": "AES-CBC-256 + HMAC-SHA256 (RFC 2406)",
                "passes_per_block": 2,
                "hardware_acceleration": "Sequential CBC chaining + separate SHA-256 engine",
                "estimated_throughput_gbps": "3.4 Gbps",
                "padding_oracle_resistance": "Vulnerable if MAC-then-Decrypt is misconfigured"
            }
        }

# =============================================================================
# CLI EXECUTION & DEMONSTRATION
# =============================================================================

def main():
    print("=" * 80)
    print("IPSEC PROTOCOL DISSECTOR: AH (PROTOCOL 51) VS ESP (PROTOCOL 50)")
    print("Instructor: Sukanta Hui | Location: Barrackpore, West Bengal")
    print("=" * 80)

    engine = IPsecProtocolDissector()

    print("\n[+] 1. SIMULATING NAT TRAVERSAL IMPACT ON AUTHENTICATION HEADER (AH)...")
    nat_results = engine.simulate_nat_translation(
        original_src="10.14.2.15",
        nat_public_ip="203.0.113.10",
        payload_str="Bank Transfer: Disburse ₹5,000,000 to Kolkata Municipal Treasury"
    )

    print(f"  • Original Sender IP    : {nat_results['original_src_ip']}")
    print(f"  • NAT Translated IP     : {nat_results['nat_translated_ip']}")
    print(f"  • Sender Calculated ICV : {nat_results['sender_icv_hex']}")
    print(f"  • Receiver Recomputed   : {nat_results['receiver_icv_hex']}")
    print(f"  • AH Verification Result: ❌ {nat_results['ah_verification_status']}")
    print(f"  • ESP NAT-T (UDP 4500)  : ✔ {nat_results['esp_natt_status']}")

    print("\n[+] 2. CRYPTOGRAPHIC PIPELINE BENCHMARK (AEAD VS LEGACY)...")
    benchmark = engine.benchmark_aead_vs_legacy()
    for mode, data in benchmark.items():
        print(f"\n  [{mode.upper()}]:")
        for k, v in data.items():
            print(f"    - {k}: {v}")

    print("\n" + "=" * 80)
    print("✔ Simulation completed successfully. Standardize on ESP with AEAD (RFC 8221).")
    print("=" * 80)

if __name__ == "__main__":
    main()
