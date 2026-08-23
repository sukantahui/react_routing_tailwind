#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: PASSKEY ARCHITECTURE & HYBRID CROSS-DEVICE (caBLE) ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulation of:
1. Multi-Device Passkeys (Synced Passkeys) vs Single-Device (Device-Bound) Passkeys.
2. End-to-End Encrypted Cloud Keychain sync derivation.
3. FIDO Cross-Device Authentication (caBLE - Client to Authenticator over BLE).
4. Ephemeral QR Code Session Key Derivation & Proximity Verification.
"""

import sys
import os
import time
import json
import base64
import hashlib
import hmac
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class PasskeyCredential:
    credential_id: str
    user_handle: str
    rp_id: str
    passkey_type: str      # "SYNCED" or "DEVICE_BOUND"
    public_key_hex: str
    is_backup_eligible: bool
    is_backed_up: bool

class PasskeySyncEngine:
    def __init__(self, rp_id: str = "portal.barrackpore.gov.in"):
        self.rp_id = rp_id
        self.cloud_keychains = {} # user_handle -> list of synced passkeys
        self.server_records = {}   # credential_id -> public_key

    def create_synced_passkey(self, user_handle: str, account_name: str) -> PasskeyCredential:
        """
        Generates a Multi-Device Synced Passkey (backed up across Apple/Google/Microsoft Cloud).
        """
        cred_id = os.urandom(16).hex()
        pub_key = hashlib.sha256(f"PUB_{user_handle}_{cred_id}".encode()).hexdigest()

        passkey = PasskeyCredential(
            credential_id=cred_id,
            user_handle=user_handle,
            rp_id=self.rp_id,
            passkey_type="SYNCED (Multi-Device Passkey)",
            public_key_hex=pub_key,
            is_backup_eligible=True,
            is_backed_up=True
        )

        if user_handle not in self.cloud_keychains:
            self.cloud_keychains[user_handle] = []
        self.cloud_keychains[user_handle].append(passkey)
        self.server_records[cred_id] = pub_key

        return passkey

    def create_device_bound_passkey(self, user_handle: str) -> PasskeyCredential:
        """
        Generates a Hardware Device-Bound Passkey (YubiKey / Non-Exportable FIPS token).
        """
        cred_id = os.urandom(16).hex()
        pub_key = hashlib.sha256(f"DEVICE_BOUND_{user_handle}_{cred_id}".encode()).hexdigest()

        passkey = PasskeyCredential(
            credential_id=cred_id,
            user_handle=user_handle,
            rp_id=self.rp_id,
            passkey_type="DEVICE_BOUND (Hardware Bound)",
            public_key_hex=pub_key,
            is_backup_eligible=False, # Non-exportable
            is_backed_up=False
        )

        self.server_records[cred_id] = pub_key
        return passkey

    def simulate_cable_qr_handshake(self, pc_browser_origin: str, ble_proximity_detected: bool) -> Dict:
        """
        Simulates FIDO Cross-Device Authentication (caBLE / Hybrid Transport):
        Desktop PC displays QR code -> Smartphone scans QR code over local BLE radio.
        """
        qr_session_seed = os.urandom(32)
        tunnel_key = hashlib.sha256(qr_session_seed).hexdigest()

        if not ble_proximity_detected:
            return {
                "status": "PROXIMITY_CHECK_FAILED (Relay Attack Blocked 🚨)",
                "reason": "Bluetooth Low Energy (BLE) beacon was not detected between PC and phone. Remote phishing relay attack blocked.",
                "session_established": False
            }

        return {
            "status": "HYBRID_SESSION_ESTABLISHED ✔",
            "tunnel_encryption": f"AES-256-GCM Session Tunnel Key: {tunnel_key[:20]}...",
            "ble_status": "BLE Local Proximity Verified (< 10 meters distance)",
            "origin_bound": pc_browser_origin,
            "session_established": True
        }

def main():
    print("=" * 80)
    print("PASSKEY ARCHITECTURE & CROSS-DEVICE (caBLE) LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    engine = PasskeySyncEngine(rp_id="portal.barrackpore.gov.in")

    # Test 1: Synced Passkey vs Device Bound Passkey
    print("\n[TEST 1]: PASSKEY CREATION & BACKUP FLAGS (BE & BS)")
    synced = engine.create_synced_passkey("susmita_uid_101", "susmita@bank.in")
    device_bound = engine.create_device_bound_passkey("susmita_uid_101")

    print(f"1. Synced Passkey       : {synced.passkey_type}")
    print(f"   Backup Eligible (BE) : {synced.is_backup_eligible} | Backed Up (BS): {synced.is_backed_up}")
    print(f"2. Device-Bound Passkey : {device_bound.passkey_type}")
    print(f"   Backup Eligible (BE) : {device_bound.is_backup_eligible} | Backed Up (BS): {device_bound.is_backed_up}")

    # Test 2: Cross-Device Authentication (caBLE) Handshake
    print("\n" + "=" * 80)
    print("[TEST 2]: CROSS-DEVICE HYBRID AUTHENTICATION (caBLE / QR CODE)")
    # Scenario A: Remote attacker tries to relay QR code overseas
    cable_remote = engine.simulate_cable_qr_handshake("https://portal.barrackpore.gov.in", ble_proximity_detected=False)
    print(f"Remote Relay Attempt: {cable_remote['status']} - {cable_remote['reason']}")

    # Scenario B: Legitimate user in the same room
    cable_local = engine.simulate_cable_qr_handshake("https://portal.barrackpore.gov.in", ble_proximity_detected=True)
    print(f"Local Proximity Scan: {cable_local['status']} - {cable_local['ble_status']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
