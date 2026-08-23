"""
VPN Tunneling & Encapsulation Simulator (AES-GCM Authenticated Encryption)
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_003 (Topic 0)
"""

import hmac
import hashlib
import os
from dataclasses import dataclass
from typing import Dict, Tuple

@dataclass
class PrivateIPPacket:
    src_ip: str         # e.g. "10.10.1.5" (Private Client IP)
    dst_ip: str         # e.g. "10.20.1.50" (Private Server IP)
    protocol: str       # "TCP", "UDP"
    payload: str        # e.g. "CONFIDENTIAL_CITIZEN_RECORD_991"

@dataclass
class EncapsulatedVPNPacket:
    public_src_ip: str  # e.g. "203.0.113.15" (Client Public ISP IP)
    public_dst_ip: str  # e.g. "198.51.100.1" (Corporate VPN Gateway IP)
    tunnel_protocol: str # "IPsec-ESP", "WireGuard-UDP", "OpenVPN-TLS"
    esp_spi: int        # Security Parameters Index
    seq_number: int     # Anti-Replay Sequence Number
    encrypted_payload_hex: str
    auth_tag_hex: str

class VPNTunnelEngine:
    def __init__(self, shared_secret_key: bytes):
        self.key = shared_secret_key
        self.seq = 1

    def encapsulate_and_encrypt(
        self,
        inner_pkt: PrivateIPPacket,
        client_public_ip: str,
        gateway_public_ip: str
    ) -> EncapsulatedVPNPacket:
        """Simulates inner packet serialization, encryption, and public header encapsulation."""
        # 1. Serialize inner private packet
        serialized_inner = f"SRC={inner_pkt.src_ip}|DST={inner_pkt.dst_ip}|PROTO={inner_pkt.protocol}|DATA={inner_pkt.payload}"
        
        # 2. Simulate AES-GCM encryption (XOR with key stream for demonstration)
        key_stream = (self.key * (len(serialized_inner) // len(self.key) + 1))[:len(serialized_inner)]
        encrypted_bytes = bytes([b ^ k for b, k in zip(serialized_inner.encode('utf-8'), key_stream)])
        
        # 3. Compute HMAC-SHA256 Authentication Tag (Integrity & Non-Repudiation)
        auth_tag = hmac.new(self.key, encrypted_bytes, hashlib.sha256).hexdigest()[:16]

        encap_pkt = EncapsulatedVPNPacket(
            public_src_ip=client_public_ip,
            public_dst_ip=gateway_public_ip,
            tunnel_protocol="IPsec-ESP (Encapsulating Security Payload)",
            esp_spi=0x100A,
            seq_number=self.seq,
            encrypted_payload_hex=encrypted_bytes.hex(),
            auth_tag_hex=auth_tag
        )
        self.seq += 1
        return encap_pkt

    def decapsulate_and_decrypt(self, encap_pkt: EncapsulatedVPNPacket) -> Tuple[bool, str, Dict[str, str]]:
        """Simulates VPN gateway verification, de-capsulation, and inner packet extraction."""
        encrypted_bytes = bytes.fromhex(encap_pkt.encrypted_payload_hex)
        
        # Verify HMAC Authentication Tag
        expected_tag = hmac.new(self.key, encrypted_bytes, hashlib.sha256).hexdigest()[:16]
        if not hmac.compare_digest(expected_tag, encap_pkt.auth_tag_hex):
            return False, "❌ INTEGRITY ERROR: Auth Tag mismatch! Packet tampered with.", {}

        # Decrypt payload
        key_stream = (self.key * (len(encrypted_bytes) // len(self.key) + 1))[:len(encrypted_bytes)]
        decrypted_str = bytes([b ^ k for b, k in zip(encrypted_bytes, key_stream)]).decode('utf-8')

        # Parse extracted private headers
        fields = dict(item.split('=') for item in decrypted_str.split('|'))
        return True, "✔ INTEGRITY & CONFIDENTIALITY VERIFIED: Original packet recovered!", fields

# Execution Test Harness
if __name__ == "__main__":
    secret_key = b"BarrackporeSecretEncryptionKey2026"
    vpn = VPNTunnelEngine(secret_key)

    print("=== VPN Tunneling & Encapsulation Engine ===")

    # 1. Private Enterprise Packet Created by Client
    raw_packet = PrivateIPPacket(
        src_ip="10.10.1.5",
        dst_ip="10.20.1.50",
        protocol="TCP",
        payload="TAX_RECORD_BARRACKPORE_ACC_881"
    )
    print(f"\n[1. Client Private Packet]: {raw_packet}")

    # 2. Encapsulated and Encrypted across Public Internet
    tunnel_packet = vpn.encapsulate_and_encrypt(
        raw_packet,
        client_public_ip="203.0.113.88",
        gateway_public_ip="198.51.100.1"
    )
    print(f"\n[2. Encapsulated Public Packet traversing Internet]:")
    print(f"    Public Headers : {tunnel_packet.public_src_ip} -> {tunnel_packet.public_dst_ip}")
    print(f"    Ciphertext Hex : {tunnel_packet.encrypted_payload_hex[:40]}... (Total {len(tunnel_packet.encrypted_payload_hex)} hex chars)")
    print(f"    Auth Tag (HMAC): {tunnel_packet.auth_tag_hex}")

    # 3. Gateway Decapsulation
    valid, status, inner_fields = vpn.decapsulate_and_decrypt(tunnel_packet)
    print(f"\n[3. Gateway Decapsulation Result]: {status}")
    print(f"    Recovered Private Packet: {inner_fields}")
