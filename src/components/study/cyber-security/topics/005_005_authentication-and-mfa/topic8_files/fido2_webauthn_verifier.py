#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: FIDO2, WEBAUTHN & CTAP2 HARDWARE CRYPTOGRAPHIC VERIFIER
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides from-scratch simulation of:
1. W3C WebAuthn Registration (navigator.credentials.create) & Public Key Attestation.
2. W3C WebAuthn Authentication (navigator.credentials.get) & Cryptographic Assertion.
3. CTAP2 Flags: User Presence (UP - physical touch) & User Verification (UV - PIN/Biometric).
4. Origin-Binding Verification defeating Adversary-in-the-Middle (Evilginx) proxies.
"""

import sys
import os
import time
import json
import base64
import hashlib
import hmac
from dataclasses import dataclass
from typing import Dict, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class AuthenticatorData:
    rp_id_hash: bytes
    flags: int            # Bit 0: UP, Bit 2: UV, Bit 6: AT, Bit 7: ED
    sign_count: int

class Fido2WebAuthnVerifier:
    def __init__(self, relying_party_id: str = "bank.barrackpore.gov.in"):
        self.rp_id = relying_party_id
        self.enrolled_credentials = {} # credential_id -> {public_key, user_id, sign_count}

    def generate_registration_challenge(self, user_id: str, username: str) -> Dict:
        """
        Step 1: Relying Party (Server) generates WebAuthn Creation Options.
        """
        challenge = os.urandom(32)
        return {
            "challenge_b64": base64.urlsafe_b64encode(challenge).decode('utf-8'),
            "rp": {"name": "Barrackpore Municipal Treasury", "id": self.rp_id},
            "user": {
                "id": base64.urlsafe_b64encode(user_id.encode('utf-8')).decode('utf-8'),
                "name": username,
                "displayName": f"Officer {username}"
            },
            "pubKeyCredParams": [{"type": "public-key", "alg": -7}], # ES256 (ECDSA P-256)
            "authenticatorSelection": {
                "authenticatorAttachment": "cross-platform", # Hardware YubiKey
                "userVerification": "required"              # Mandatory PIN or Biometric
            }
        }

    def register_credential(self, user_id: str, origin: str, challenge_b64: str) -> Dict:
        """
        Simulates client hardware key generating ECDSA keypair and signing attestation.
        """
        # Verify origin
        expected_origin = f"https://{self.rp_id}"
        if origin != expected_origin:
            return {"status": "FAILED", "reason": f"Origin Mismatch! Expected {expected_origin}, got {origin}"}

        credential_id = os.urandom(16).hex()
        # Simulated ECDSA P-256 Public Key bytes
        simulated_pub_key = hashlib.sha256(f"PUBKEY_{user_id}_{credential_id}".encode()).hexdigest()

        self.enrolled_credentials[credential_id] = {
            "user_id": user_id,
            "public_key": simulated_pub_key,
            "sign_count": 0
        }

        return {
            "status": "REGISTERED_SUCCESS ✔",
            "credential_id": credential_id,
            "public_key": simulated_pub_key,
            "attestation_type": "FIDO2_Direct_Attestation (YubiKey 5 NFC)"
        }

    def verify_authentication_assertion(self, credential_id: str, client_origin: str, user_touched: bool, pin_verified: bool) -> Dict:
        """
        Verifies WebAuthn assertion signature, flags (UP, UV), and origin binding.
        """
        if credential_id not in self.enrolled_credentials:
            return {"verified": False, "status": "UNKNOWN_CREDENTIAL_ID ❌"}

        expected_origin = f"https://{self.rp_id}"

        # 1. Cryptographic Origin Check (Stops Phishing Proxies)
        if client_origin != expected_origin:
            return {
                "verified": False,
                "status": "PHISHING_ATTACK_DETECTED (Origin Mismatch 🚨)",
                "reason": f"Signature bound to origin '{client_origin}', but legitimate RP is '{expected_origin}'."
            }

        # 2. User Presence Flag Check (Bit 0)
        if not user_touched:
            return {
                "verified": False,
                "status": "USER_PRESENCE_FAILED ❌",
                "reason": "Hardware key contact touch was not detected."
            }

        # 3. User Verification Flag Check (Bit 2)
        if not pin_verified:
            return {
                "verified": False,
                "status": "USER_VERIFICATION_FAILED ❌",
                "reason": "PIN or Biometric unlock on hardware key was not satisfied."
            }

        cred = self.enrolled_credentials[credential_id]
        cred["sign_count"] += 1

        return {
            "verified": True,
            "status": "AUTHENTICATION_SUCCESS ✔ (NIST AAL3)",
            "sign_count": cred["sign_count"],
            "security_tier": "Phishing-Resistant Origin-Bound Hardware Assertion"
        }

def main():
    print("=" * 80)
    print("FIDO2, WEBAUTHN & CTAP2 CRYPTOGRAPHIC LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    verifier = Fido2WebAuthnVerifier(relying_party_id="bank.barrackpore.gov.in")

    # Step 1: Registration
    print("\n[STEP 1]: WEBAUTHN CREDENTIAL REGISTRATION")
    reg_opts = verifier.generate_registration_challenge("user_101", "susmita")
    print(f"Relying Party ID : {reg_opts['rp']['id']}")
    print(f"Challenge        : {reg_opts['challenge_b64'][:24]}...")

    reg_result = verifier.register_credential("user_101", "https://bank.barrackpore.gov.in", reg_opts['challenge_b64'])
    cred_id = reg_result['credential_id']
    print(f"Registration     : {reg_result['status']} (Cred ID: {cred_id})")

    # Step 2: Legitimate Login
    print("\n" + "=" * 80)
    print("[STEP 2]: LEGITIMATE WEBAUTHN AUTHENTICATION")
    auth_legit = verifier.verify_authentication_assertion(cred_id, "https://bank.barrackpore.gov.in", user_touched=True, pin_verified=True)
    print(f"Result           : {auth_legit['status']}")
    print(f"Signature Count  : {auth_legit['sign_count']}")

    # Step 3: Evilginx AitM Phishing Attack Simulation
    print("\n" + "=" * 80)
    print("[STEP 3]: EVILGINX AITM PHISHING PROXY ATTACK TEST")
    auth_phish = verifier.verify_authentication_assertion(cred_id, "https://fake-bank-barrackpore.net", user_touched=True, pin_verified=True)
    print(f"Attack Result    : {auth_phish['status']}")
    print(f"Defensive Reason : {auth_phish['reason']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
