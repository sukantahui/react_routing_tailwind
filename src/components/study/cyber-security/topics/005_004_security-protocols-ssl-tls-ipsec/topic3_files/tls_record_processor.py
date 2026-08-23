#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: TLS 1.3 RECORD PROTOCOL & AEAD ENCRYPTION PROCESSOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_004 (SSL, TLS & IPsec)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script demonstrates the TLS 1.3 Record Layer architecture:
1. Deriving per-record 96-bit Nonces via XOR with 64-bit sequence counters.
2. Encapsulating Real Inner Content Types and variable zero-padding.
3. Simulating AES-GCM / ChaCha20-Poly1305 AEAD authenticated encryption.
"""

import sys
import hashlib
import hmac
import binascii
import os
from dataclasses import dataclass
from typing import Dict, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# TLS 1.3 RECORD LAYER STRUCT & NONCE ENGINE
# =============================================================================

@dataclass
class TLSRecordHeader:
    opaque_type: int = 0x17     # 23 (Always Application Data for TLS 1.3 outer header)
    legacy_version: int = 0x0303 # 0x0303 (TLS 1.2 for middlebox compatibility)
    length: int = 0

class TLSRecordProcessor:
    def __init__(self, write_key: bytes, write_iv: bytes):
        self.write_key = write_key      # 256-bit AES-GCM Key (32 Bytes)
        self.write_iv = write_iv        # 96-bit Base IV (12 Bytes)
        self.sequence_number = 0        # 64-bit implicit counter

    def derive_record_nonce(self) -> bytes:
        """
        Derives per-record 96-bit Nonce: IV XOR pad_to_96(sequence_number)
        (RFC 8446 Section 5.3)
        """
        seq_bytes = self.sequence_number.to_bytes(12, 'big')
        # XOR byte by byte
        nonce = bytes(a ^ b for a, b in zip(self.write_iv, seq_bytes))
        return nonce

    def encrypt_record(self, plaintext: bytes, real_content_type: int = 0x17, padding_bytes: int = 0) -> Dict[str, any]:
        """
        Encrypts plaintext with inner content type and zero padding using simulated AEAD.
        """
        nonce = self.derive_record_nonce()

        # Inner Plaintext = [Application Data] + [Real Content Type (1B)] + [0x00 * Padding]
        inner_plaintext = plaintext + bytes([real_content_type]) + (b"\x00" * padding_bytes)

        # Simulated AEAD Encrypt: AES-GCM creates Ciphertext + 16-byte Auth Tag
        # Simulated using HMAC-SHA256 for educational lab demonstration
        keystream = hashlib.sha256(self.write_key + nonce).digest()
        repeated_keystream = (keystream * ((len(inner_plaintext) // len(keystream)) + 1))[:len(inner_plaintext)]
        ciphertext = bytes(a ^ b for a, b in zip(inner_plaintext, repeated_keystream))

        # 128-bit AEAD Tag (16 Bytes)
        auth_tag = hmac.new(self.write_key, nonce + ciphertext, hashlib.sha256).digest()[:16]

        total_encrypted_record = ciphertext + auth_tag
        record_length = len(total_encrypted_record)

        # Outer Header (5 Bytes): [0x17] [0x0303] [Length (2B)]
        outer_header = bytes([0x17, 0x03, 0x03]) + record_length.to_bytes(2, 'big')

        result = {
            "sequence_number": self.sequence_number,
            "derived_nonce_hex": binascii.hexlify(nonce).decode(),
            "real_content_type": real_content_type,
            "padding_bytes": padding_bytes,
            "plaintext_length": len(plaintext),
            "inner_plaintext_length": len(inner_plaintext),
            "ciphertext_length": len(ciphertext),
            "auth_tag_hex": binascii.hexlify(auth_tag).decode(),
            "outer_header_hex": binascii.hexlify(outer_header).decode(),
            "total_wire_record_length": len(outer_header) + record_length
        }

        self.sequence_number += 1
        return result

# =============================================================================
# SIMULATION WORKBENCH EXECUTION
# =============================================================================

def run_tls_record_simulation():
    print("=" * 80)
    print("  TLS 1.3 RECORD PROTOCOL & AEAD ENCRYPTION PROCESSOR")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    # 1. Initialize with 256-bit Key and 96-bit IV
    sample_key = os.urandom(32)
    sample_iv = os.urandom(12)
    processor = TLSRecordProcessor(sample_key, sample_iv)

    print(f"\n[+] INITIALIZED TLS 1.3 TRAFFIC SECRETS:")
    print(f"  • Base AES-256 Key : {binascii.hexlify(sample_key).decode()[:32]}...")
    print(f"  • Base 96-bit IV   : {binascii.hexlify(sample_iv).decode()}")

    # Record 1: Encrypted Application Data (HTTP GET /api/v1/pension)
    payload_1 = b"GET /api/v1/pension_records HTTP/2.0\r\nHost: treasury.barrackpore.gov.in\r\n\r\n"
    rec1 = processor.encrypt_record(payload_1, real_content_type=23, padding_bytes=32)

    print(f"\n[+] RECORD 1: ENCRYPTED APPLICATION DATA (Seq #{rec1['sequence_number']})")
    print(f"  • Derived Nonce (IV XOR Seq): {rec1['derived_nonce_hex']}")
    print(f"  • Real Inner Content Type   : {rec1['real_content_type']} (ApplicationData)")
    print(f"  • Padding Zero Bytes        : {rec1['padding_bytes']} Bytes (Traffic Analysis Masking)")
    print(f"  • Outer Wire Header         : {rec1['outer_header_hex']} (Opaque 0x17 Type)")
    print(f"  • 128-bit AEAD Auth Tag     : {rec1['auth_tag_hex']}")
    print(f"  • Total Wire Frame Size     : {rec1['total_wire_record_length']} Bytes")

    # Record 2: Encrypted Alert Message (Close Notify)
    payload_2 = b"\x01\x00" # Close Notify Alert
    rec2 = processor.encrypt_record(payload_2, real_content_type=21, padding_bytes=64)

    print(f"\n[+] RECORD 2: ENCRYPTED ALERT MESSAGE (Seq #{rec2['sequence_number']})")
    print(f"  • Derived Nonce (IV XOR Seq): {rec2['derived_nonce_hex']}")
    print(f"  • Real Inner Content Type   : {rec2['real_content_type']} (Alert - HIDDEN INSIDE CIPHERTEXT!)")
    print(f"  • Outer Wire Header         : {rec2['outer_header_hex']} (MASKED AS GENERIC 0x17!)")
    print(f"  • Total Wire Frame Size     : {rec2['total_wire_record_length']} Bytes")
    print("=" * 80)

if __name__ == "__main__":
    run_tls_record_simulation()
