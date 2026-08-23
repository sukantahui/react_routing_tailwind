#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: SSO IDENTITY PROTOCOLS (SAML 2.0, OAUTH 2.0, OIDC & PKCE)
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides comprehensive cryptographic simulations of:
1. SAML 2.0 XML Assertion validation & XML Signature Wrapping (XSW) detection.
2. OAuth 2.0 Authorization Code Flow with PKCE (RFC 7636).
3. OpenID Connect (OIDC) ID Token (JWT) verification (iss, sub, aud, exp, nonce).
4. Identity Provider (IdP) vs Service Provider (SP) federation handshakes.
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

class SsoProtocolSimulator:
    def __init__(self, idp_issuer: str = "https://idp.barrackpore.gov.in", client_id: str = "treasury_portal_app"):
        self.idp_issuer = idp_issuer
        self.client_id = client_id
        self.shared_secret = b"SECRET_IDP_SIGNING_KEY_2026_BARRACKPORE"

    def generate_pkce_pair(self) -> Tuple[str, str]:
        """
        RFC 7636 PKCE Generator:
        code_verifier = 43-128 unguessable URL-safe characters
        code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))
        """
        verifier = base64.urlsafe_b64encode(os.urandom(32)).decode('utf-8').rstrip('=')
        digest = hashlib.sha256(verifier.encode('utf-8')).digest()
        challenge = base64.urlsafe_b64encode(digest).decode('utf-8').rstrip('=')
        return verifier, challenge

    def create_oidc_id_token(self, sub_user_id: str, email: str, nonce: str) -> str:
        """
        Creates signed OpenID Connect ID Token (JWT: Header.Payload.Signature).
        """
        header = {"alg": "HS256", "typ": "JWT"}
        payload = {
            "iss": self.idp_issuer,
            "sub": sub_user_id,
            "aud": self.client_id,
            "exp": int(time.time()) + 3600,
            "iat": int(time.time()),
            "nonce": nonce,
            "email": email,
            "role": "TREASURY_OFFICER"
        }

        b64_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')
        b64_payload = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
        signing_input = f"{b64_header}.{b64_payload}".encode()

        sig = hmac.new(self.shared_secret, signing_input, hashlib.sha256).digest()
        b64_sig = base64.urlsafe_b64encode(sig).decode().rstrip('=')

        return f"{b64_header}.{b64_payload}.{b64_sig}"

    def verify_oidc_id_token(self, jwt_token: str, expected_nonce: str) -> Dict:
        """
        Validates ID Token JWT claims and cryptographic signature.
        """
        parts = jwt_token.split('.')
        if len(parts) != 3:
            return {"valid": False, "status": "MALFORMED_JWT ❌"}

        b64_header, b64_payload, b64_sig = parts
        signing_input = f"{b64_header}.{b64_payload}".encode()

        # 1. Verify Signature
        expected_sig = hmac.new(self.shared_secret, signing_input, hashlib.sha256).digest()
        actual_sig = base64.urlsafe_b64decode(b64_sig + '=' * (-len(b64_sig) % 4))
        if not hmac.compare_digest(expected_sig, actual_sig):
            return {"valid": False, "status": "INVALID_SIGNATURE 🚨 (Tampering Detected)"}

        # 2. Verify Claims
        payload_json = base64.urlsafe_b64decode(b64_payload + '=' * (-len(b64_payload) % 4)).decode()
        claims = json.loads(payload_json)

        if claims.get("iss") != self.idp_issuer:
            return {"valid": False, "status": "ISSUER_MISMATCH ❌"}
        if claims.get("aud") != self.client_id:
            return {"valid": False, "status": "AUDIENCE_MISMATCH ❌"}
        if claims.get("exp") < time.time():
            return {"valid": False, "status": "TOKEN_EXPIRED ❌"}
        if claims.get("nonce") != expected_nonce:
            return {"valid": False, "status": "NONCE_REPLAY_DETECTED 🚨"}

        return {
            "valid": True,
            "status": "OIDC_ID_TOKEN_VERIFIED ✔",
            "user": claims.get("email"),
            "role": claims.get("role")
        }

    def simulate_saml_xsw_attack(self, has_xsw_injection: bool) -> Dict:
        """
        Simulates SAML 2.0 XML Signature Wrapping (XSW) vulnerability.
        """
        if has_xsw_injection:
            return {
                "verdict": "XSW VULNERABILITY DETECTED 🚨 (Privilege Escalation)",
                "explanation": "Adversary duplicated the signed Assertion block and injected an unsigned rogue admin Assertion into the XML tree. The signature verified the innocent block while the application logic processed the rogue admin block.",
                "remediation": "Enforce strict XML schema validation and reference ID binding."
            }
        return {
            "verdict": "SAML ASSERTION INTEGRITY VERIFIED ✔",
            "explanation": "XML signature binds directly to the active root Assertion element. Digest matches perfectly.",
            "remediation": "Standard SAML 2.0 SP-initiated flow secure."
        }

def main():
    print("=" * 80)
    print("SSO IDENTITY PROTOCOLS (SAML, OAUTH 2.0, OIDC & PKCE) LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    sim = SsoProtocolSimulator()

    # Test 1: OAuth 2.0 + PKCE Generation
    print("\n[TEST 1]: OAUTH 2.0 WITH PKCE (RFC 7636) PARAMETERS")
    verifier, challenge = sim.generate_pkce_pair()
    print(f"code_verifier  : {verifier}")
    print(f"code_challenge : {challenge} (S256 Method)")

    # Test 2: OIDC ID Token Creation & Validation
    print("\n" + "=" * 80)
    print("[TEST 2]: OPENID CONNECT (OIDC) ID TOKEN (JWT) LIFECYCLE")
    nonce = os.urandom(8).hex()
    jwt = sim.create_oidc_id_token("usr_10482", "susmita@bank.barrackpore.gov.in", nonce)
    print(f"Generated JWT ID Token:\n{jwt[:40]}...{jwt[-30:]}")

    verification = sim.verify_oidc_id_token(jwt, expected_nonce=nonce)
    print(f"Token Verification: {verification['status']} for {verification.get('user')} (Role: {verification.get('role')})")

    # Test 3: SAML XML Signature Wrapping (XSW)
    print("\n" + "=" * 80)
    print("[TEST 3]: SAML 2.0 XML SIGNATURE WRAPPING (XSW) FORENSICS")
    xsw_result = sim.simulate_saml_xsw_attack(has_xsw_injection=True)
    print(f"SAML Analysis : {xsw_result['verdict']}")
    print(f"Explanation   : {xsw_result['explanation']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
