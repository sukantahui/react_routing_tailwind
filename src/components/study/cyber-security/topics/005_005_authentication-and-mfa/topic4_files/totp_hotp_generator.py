#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: TOTP (RFC 6238) & HOTP (RFC 4226) CRYPTOGRAPHIC GENERATOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides from-scratch RFC-compliant cryptographic implementations of:
1. HOTP: HMAC-based One-Time Password Algorithm (RFC 4226).
2. TOTP: Time-based One-Time Password Algorithm (RFC 6238).
3. Dynamic Truncation (DT) extraction using bitwise operations.
4. Server-Side Verification with +/- 1 Step Clock Drift Tolerance Window.
5. Replay Attack Prevention and Counter Desynchronization Handling.
"""

import sys
import time
import hmac
import hashlib
import struct
import base64
from typing import Tuple, List, Dict

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

class OtpCryptoEngine:
    def __init__(self, digits: int = 6, time_step: int = 30):
        self.digits = digits
        self.time_step = time_step
        self.used_counters = set()  # Replay attack prevention store

    def generate_hotp(self, secret_bytes: bytes, counter: int) -> Tuple[str, int, str]:
        """
        RFC 4226 HOTP Generation:
        1. Pack counter into 8-byte big-endian integer.
        2. Compute HMAC-SHA1 digest (20 bytes).
        3. Dynamic Truncation (DT): Extract 4 bytes using low-order 4 bits of last byte as offset.
        4. Truncate to desired digits: (binary_code & 0x7FFFFFFF) % 10^digits.
        """
        # Step 1: Pack 64-bit integer
        counter_bytes = struct.pack(">Q", counter)

        # Step 2: Compute HMAC-SHA1
        hmac_digest = hmac.new(secret_bytes, counter_bytes, hashlib.sha1).digest()

        # Step 3: Dynamic Truncation (Offset from last byte low 4 bits)
        offset = hmac_digest[-1] & 0x0F
        four_bytes = hmac_digest[offset:offset + 4]

        # Step 4: Unpack 31-bit unsigned big-endian integer (mask MSB to eliminate sign bit)
        binary_code = struct.unpack(">I", four_bytes)[0] & 0x7FFFFFFF

        # Step 5: Compute modulo 10^digits and format with leading zeros
        otp_val = binary_code % (10 ** self.digits)
        otp_str = str(otp_val).zfill(self.digits)

        return otp_str, offset, hmac_digest.hex()

    def generate_totp(self, secret_bytes: bytes, current_time: float = None) -> Tuple[str, int, int]:
        """
        RFC 6238 TOTP Generation:
        Calculates time counter: C = floor(current_time / time_step)
        """
        if current_time is None:
            current_time = time.time()

        time_counter = int(current_time) // self.time_step
        seconds_remaining = self.time_step - (int(current_time) % self.time_step)
        otp_str, _, _ = self.generate_hotp(secret_bytes, time_counter)

        return otp_str, time_counter, seconds_remaining

    def verify_totp(self, secret_bytes: bytes, user_code: str, tolerance_steps: int = 1) -> Dict:
        """
        Verifies TOTP code against current time counter with +/- tolerance_steps for clock drift.
        Prevents replay attacks by checking if counter was already used.
        """
        now = time.time()
        current_counter = int(now) // self.time_step

        for step_offset in range(-tolerance_steps, tolerance_steps + 1):
            eval_counter = current_counter + step_offset
            expected_otp, _, _ = self.generate_hotp(secret_bytes, eval_counter)

            if user_code == expected_otp:
                # Check for replay attack
                if eval_counter in self.used_counters:
                    return {
                        "verified": False,
                        "status": "REJECTED (Replay Attack Detected 🚨)",
                        "reason": f"Code {user_code} for counter {eval_counter} was already used in this window."
                    }

                # Mark counter as consumed
                self.used_counters.add(eval_counter)
                return {
                    "verified": True,
                    "status": "VERIFIED SUCCESS ✔",
                    "drift_seconds": step_offset * self.time_step,
                    "counter": eval_counter,
                    "reason": f"Matched time window step {eval_counter} (Drift: {step_offset * self.time_step}s)."
                }

        return {
            "verified": False,
            "status": "INVALID CODE ❌",
            "reason": "Provided 6-digit code does not match expected TOTP in tolerance window."
        }

# =============================================================================
# CLI DEMONSTRATION HARNESS
# =============================================================================

def main():
    print("=" * 80)
    print("TOTP (RFC 6238) & HOTP (RFC 4226) CRYPTOGRAPHIC LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    # Base32 Secret Key (Standard Google Authenticator format)
    base32_secret = "JBSWY3DPEHPK3PXP" # RFC 4226 test vector string '12345678901234567890'
    secret_bytes = base64.b32decode(base32_secret)

    engine = OtpCryptoEngine(digits=6, time_step=30)

    # Test 1: HOTP Sequence (Counter 0 to 4)
    print("\n[TEST 1]: RFC 4226 HOTP SEQUENCE GENERATION")
    print(f"Secret Key (Base32): {base32_secret}")
    print("-" * 80)
    print(f"{'Counter (C)':<15}{'Offset':<10}{'HOTP Code':<15}{'HMAC-SHA1 Digest Snippet'}")
    print("-" * 80)
    for c in range(5):
        code, offset, digest = engine.generate_hotp(secret_bytes, c)
        print(f"{c:<15}{offset:<10}{code:<15}{digest[:24]}...")

    # Test 2: Live TOTP Generation
    print("\n" + "=" * 80)
    print("[TEST 2]: RFC 6238 TOTP REAL-TIME GENERATION")
    totp_code, time_counter, remaining = engine.generate_totp(secret_bytes)
    print(f"Current Epoch Time  : {int(time.time())} seconds")
    print(f"Calculated Counter  : {time_counter} (Epoch / 30)")
    print(f"Active TOTP Code    : [ {totp_code} ]")
    print(f"Time Step Remaining : {remaining} seconds before refresh")

    # Test 3: Verification & Replay Protection
    print("\n" + "=" * 80)
    print("[TEST 3]: SERVER-SIDE VERIFICATION & REPLAY DEFENSE")
    res1 = engine.verify_totp(secret_bytes, totp_code)
    print(f"Submission 1 ({totp_code}): {res1['status']} - {res1['reason']}")

    # Replaying identical code in same time window
    res2 = engine.verify_totp(secret_bytes, totp_code)
    print(f"Submission 2 (Replay)  : {res2['status']} - {res2['reason']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
