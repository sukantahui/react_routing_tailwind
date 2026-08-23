#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: TLS 1.3 HANDSHAKE & HKDF KEY DERIVATION SIMULATOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_004 (SSL, TLS & IPsec)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script executes a step-by-step mathematical simulation of the TLS 1.3
1-RTT Handshake Protocol, performs ECDHE key exchange on Curve25519,
and derives session keys using the HKDF (RFC 5869) key schedule.
"""

import sys
import hashlib
import hmac
import binascii
from dataclasses import dataclass
from typing import Dict, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# HKDF (HMAC-BASED KEY DERIVATION FUNCTION - RFC 5869 / RFC 8446)
# =============================================================================

def hkdf_extract(salt: bytes, ikm: bytes, hash_mod=hashlib.sha256) -> bytes:
    """HKDF-Extract(salt, IKM) -> PRK"""
    if not salt:
        salt = bytes([0] * hash_mod().digest_size)
    return hmac.new(salt, ikm, hash_mod).digest()

def hkdf_expand(prk: bytes, info: bytes, length: int, hash_mod=hashlib.sha256) -> bytes:
    """HKDF-Expand(PRK, info, L) -> OKM"""
    hash_len = hash_mod().digest_size
    n = (length + hash_len - 1) // hash_len
    okm = b""
    t = b""
    for i in range(1, n + 1):
        t = hmac.new(prk, t + info + bytes([i]), hash_mod).digest()
        okm += t
    return okm[:length]

def hkdf_expand_label(secret: bytes, label: str, context: bytes, length: int) -> bytes:
    """TLS 1.3 HKDF-Expand-Label (RFC 8446 Section 7.1)"""
    tls13_label = b"tls13 " + label.encode('ascii')
    hkdf_label = (
        length.to_bytes(2, 'big') +
        len(tls13_label).to_bytes(1, 'big') + tls13_label +
        len(context).to_bytes(1, 'big') + context
    )
    return hkdf_expand(secret, hkdf_label, length)

# =============================================================================
# TLS 1.3 HANDSHAKE STATE MACHINE SIMULATOR
# =============================================================================

class TLS13HandshakeEngine:
    def __init__(self, client_name: str = "Susmita-Client", server_name: str = "Barrackpore-FinTech-Core"):
        self.client_name = client_name
        self.server_name = server_name
        self.transcript_hasher = hashlib.sha256()

    def simulate_handshake(self) -> Dict[str, any]:
        # 1. Ephemeral Key Generation (Simulated X25519 Scalars)
        client_private_scalar = 0x5a1f88bc
        server_private_scalar = 0x9b3d44ae
        # Simulated shared Diffie-Hellman secret
        shared_dh_secret = hashlib.sha256(str(client_private_scalar * server_private_scalar).encode()).digest()

        # Step 1: ClientHello
        client_random = b"\x11" * 32
        client_hello_bytes = b"ClientHello(X25519_KeyShare, TLS_AES_256_GCM_SHA384)"
        self.transcript_hasher.update(client_hello_bytes)

        # Step 2: ServerHello
        server_random = b"\x22" * 32
        server_hello_bytes = b"ServerHello(X25519_KeyShare_Accepted, TLS_AES_256_GCM_SHA384)"
        self.transcript_hasher.update(server_hello_bytes)

        # Step 3: HKDF Key Schedule Calculation
        # Early Secret
        early_secret = hkdf_extract(b"", b"\x00" * 32)
        derived_secret = hkdf_expand_label(early_secret, "derived", hashlib.sha256(b"").digest(), 32)

        # Handshake Secret (derived from ECDHE shared secret)
        handshake_secret = hkdf_extract(derived_secret, shared_dh_secret)
        client_handshake_secret = hkdf_expand_label(handshake_secret, "c hs traffic", self.transcript_hasher.digest(), 32)
        server_handshake_secret = hkdf_expand_label(handshake_secret, "s hs traffic", self.transcript_hasher.digest(), 32)

        # Derive Handshake Encryption Key (AES-256) and IV
        client_hs_key = hkdf_expand_label(client_handshake_secret, "key", b"", 32)
        client_hs_iv = hkdf_expand_label(client_handshake_secret, "iv", b"", 12)
        server_hs_key = hkdf_expand_label(server_handshake_secret, "key", b"", 32)
        server_hs_iv = hkdf_expand_label(server_handshake_secret, "iv", b"", 12)

        # Step 4: Encrypted Handshake Messages (Server Cert & Verify)
        encrypted_cert_bytes = b"EncryptedExtensions + Certificate(X.509) + CertificateVerify(ECDSA_P256)"
        self.transcript_hasher.update(encrypted_cert_bytes)

        # Step 5: Server Finished
        server_finished_key = hkdf_expand_label(server_handshake_secret, "finished", b"", 32)
        server_verify_data = hmac.new(server_finished_key, self.transcript_hasher.digest(), hashlib.sha256).digest()
        self.transcript_hasher.update(b"ServerFinished(" + server_verify_data[:8] + b")")

        # Step 6: Master Secret & Application Traffic Secrets
        master_derived = hkdf_expand_label(handshake_secret, "derived", hashlib.sha256(b"").digest(), 32)
        master_secret = hkdf_extract(master_derived, b"\x00" * 32)
        client_app_secret = hkdf_expand_label(master_secret, "c ap traffic", self.transcript_hasher.digest(), 32)
        server_app_secret = hkdf_expand_label(master_secret, "s ap traffic", self.transcript_hasher.digest(), 32)

        client_app_key = hkdf_expand_label(client_app_secret, "key", b"", 32)
        client_app_iv = hkdf_expand_label(client_app_secret, "iv", b"", 12)

        return {
            "client_name": self.client_name,
            "server_name": self.server_name,
            "shared_dh_secret_hex": binascii.hexlify(shared_dh_secret).decode()[:24] + "...",
            "client_hs_key_hex": binascii.hexlify(client_hs_key).decode()[:24] + "...",
            "client_hs_iv_hex": binascii.hexlify(client_hs_iv).decode()[:16] + "...",
            "server_verify_data_hex": binascii.hexlify(server_verify_data).decode()[:24] + "...",
            "client_app_key_hex": binascii.hexlify(client_app_key).decode()[:24] + "...",
            "client_app_iv_hex": binascii.hexlify(client_app_iv).decode()[:16] + "...",
            "transcript_hash_hex": binascii.hexlify(self.transcript_hasher.digest()).decode()[:24] + "...",
            "handshake_status": "1-RTT HANDSHAKE ESTABLISHED (PFS ENFORCED)"
        }

# =============================================================================
# SIMULATION WORKBENCH EXECUTION
# =============================================================================

def run_tls_handshake_simulation():
    print("=" * 80)
    print("  TLS 1.3 1-RTT HANDSHAKE & HKDF KEY DERIVATION ENGINE")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    engine = TLS13HandshakeEngine(client_name="Susmita-Workstation", server_name="Barrackpore-Treasury-Core")
    result = engine.simulate_handshake()

    print("\n[+] STEP 1: ECDHE KEY EXCHANGE (Curve25519)")
    print(f"  • Client / Server Peers   : {result['client_name']} ➔ {result['server_name']}")
    print(f"  • ECDHE Shared Secret (S) : {result['shared_dh_secret_hex']}")

    print("\n[+] STEP 2: HKDF HANDSHAKE KEY SCHEDULE")
    print(f"  • Client Handshake Key    : {result['client_hs_key_hex']} (AES-256-GCM)")
    print(f"  • Client Handshake IV     : {result['client_hs_iv_hex']} (96-bit Nonce)")
    print(f"  • Server Verify Data      : {result['server_verify_data_hex']} (HMAC Finished)")

    print("\n[+] STEP 3: APPLICATION TRAFFIC SECRETS (1-RTT COMPLETE)")
    print(f"  • Client Application Key  : {result['client_app_key_hex']} (For HTTP/2 Payloads)")
    print(f"  • Client Application IV   : {result['client_app_iv_hex']}")
    print(f"  • Handshake Transcript    : SHA256({result['transcript_hash_hex']})")
    print(f"  • Overall Handshake Status: {result['handshake_status']}")
    print("=" * 80)

if __name__ == "__main__":
    run_tls_handshake_simulation()
