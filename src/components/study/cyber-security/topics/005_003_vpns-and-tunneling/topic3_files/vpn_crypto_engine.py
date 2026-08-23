"""
VPN Cryptographic Suite Engine: Confidentiality, Integrity, Auth & Anti-Replay
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_003 (Topic 3)
"""

import hmac
import hashlib
import secrets
from dataclasses import dataclass
from typing import Dict, List, Tuple

@dataclass
class VPNCryptoPacket:
    seq_num: int
    payload_hex: str
    auth_tag_hex: str

class VPNCryptoSuiteEngine:
    def __init__(self, psk: str = "BarrackporeSecureKey2026"):
        # Ephemeral Session Key Generation (Perfect Forward Secrecy simulation)
        self.session_key = hashlib.sha256((psk + secrets.token_hex(16)).encode('utf-8')).digest()
        
        # Anti-Replay Sliding Window (Window size: 64 packets)
        self.window_size = 64
        self.max_seq_received = 0
        self.processed_seqs = set()

    def encrypt_and_sign(self, seq: int, plaintext: str) -> VPNCryptoPacket:
        """Simulates AEAD (AES-256-GCM) authenticated encryption."""
        # 1. Simulate symmetric encryption with session key
        raw_bytes = plaintext.encode('utf-8')
        key_stream = (self.session_key * (len(raw_bytes) // len(self.session_key) + 1))[:len(raw_bytes)]
        ciphertext = bytes([b ^ k for b, k in zip(raw_bytes, key_stream)])

        # 2. Compute HMAC-SHA256 Auth Tag over (SeqNum + Ciphertext)
        tag_data = seq.to_bytes(4, 'big') + ciphertext
        auth_tag = hmac.new(self.session_key, tag_data, hashlib.sha256).hexdigest()[:16]

        return VPNCryptoPacket(
            seq_num=seq,
            payload_hex=ciphertext.hex(),
            auth_tag_hex=auth_tag
        )

    def decrypt_and_verify(self, pkt: VPNCryptoPacket) -> Tuple[bool, str, str]:
        """Validates Anti-Replay sequence window, checks HMAC integrity, and decrypts payload."""
        # Step 1: Anti-Replay Protection Check
        if pkt.seq_num in self.processed_seqs:
            return False, "❌ REPLAY ATTACK DETECTED: Packet sequence number already processed!", ""
        if pkt.seq_num < (self.max_seq_received - self.window_size):
            return False, "❌ REPLAY ATTACK DETECTED: Packet sequence too old (outside sliding window)!", ""

        # Step 2: Integrity & Authentication Verification
        ciphertext = bytes.fromhex(pkt.payload_hex)
        tag_data = pkt.seq_num.to_bytes(4, 'big') + ciphertext
        expected_tag = hmac.new(self.session_key, tag_data, hashlib.sha256).hexdigest()[:16]

        if not hmac.compare_digest(expected_tag, pkt.auth_tag_hex):
            return False, "❌ INTEGRITY ERROR: Cryptographic authentication tag mismatch (tampered payload)!", ""

        # Step 3: Decrypt Payload
        key_stream = (self.session_key * (len(ciphertext) // len(self.session_key) + 1))[:len(ciphertext)]
        plaintext = bytes([b ^ k for b, k in zip(ciphertext, key_stream)]).decode('utf-8')

        # Update Anti-Replay Window
        self.processed_seqs.add(pkt.seq_num)
        if pkt.seq_num > self.max_seq_received:
            self.max_seq_received = pkt.seq_num

        return True, "✔ CRYPTOGRAPHIC VERIFICATION PASSED: Confidentiality & Integrity Confirmed!", plaintext

# Execution Test Harness
if __name__ == "__main__":
    vpn_crypto = VPNCryptoSuiteEngine()
    print("=== VPN Cryptographic Suite Engine ===")

    # Test 1: Valid Packet Encrypted & Decrypted
    pkt1 = vpn_crypto.encrypt_and_sign(seq=1, plaintext="SCADA_VALVE_OPEN_CMD_BARRACKPORE")
    valid1, msg1, data1 = vpn_crypto.decrypt_and_verify(pkt1)
    print(f"\n[Test 1 - Valid Transmission]: {msg1}")
    print(f"    Recovered Plaintext: {data1}")

    # Test 2: Attacker replays Packet #1
    valid2, msg2, data2 = vpn_crypto.decrypt_and_verify(pkt1)
    print(f"\n[Test 2 - Replay Attack Attempt]: {msg2}")

    # Test 3: Attacker tampers with ciphertext bit
    pkt3 = vpn_crypto.encrypt_and_sign(seq=2, plaintext="CONFIDENTIAL_PAYROLL_DATA")
    tampered_pkt = VPNCryptoPacket(
        seq_num=2,
        payload_hex=pkt3.payload_hex[:-2] + "FF", # Flipped last byte
        auth_tag_hex=pkt3.auth_tag_hex
    )
    valid3, msg3, data3 = vpn_crypto.decrypt_and_verify(tampered_pkt)
    print(f"\n[Test 3 - In-Transit Tampering]: {msg3}")
