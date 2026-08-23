#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: THREE FACTORS OF AUTHENTICATION & ADAPTIVE RISK ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulation of:
1. Authentication Factor Classification (Knowledge, Possession, Inherence, Location, Velocity).
2. True MFA vs Multi-Step Single-Factor validation logic.
3. Impossible Traveler geographic velocity anomaly detection engine.
4. Adaptive Risk-Based Authentication Engine calculating dynamic step-up requirements.
"""

import sys
import math
import time
from dataclasses import dataclass
from typing import Dict, List, Set, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES
# =============================================================================

@dataclass
class AuthCredential:
    name: str
    factor_type: str           # "KNOWLEDGE", "POSSESSION", "INHERENCE", "LOCATION"

@dataclass
class GeoLocationLogin:
    username: str
    city: str
    latitude: float
    longitude: float
    timestamp_utc: float       # Epoch seconds

# =============================================================================
# MULTI-FACTOR & VELOCITY EVALUATION ENGINE
# =============================================================================

class AuthenticationFactorEngine:
    def __init__(self):
        self.credential_db = {
            "password": AuthCredential("Static Password", "KNOWLEDGE"),
            "pin": AuthCredential("ATM PIN", "KNOWLEDGE"),
            "security_question": AuthCredential("Mother's Maiden Name", "KNOWLEDGE"),
            "yubikey": AuthCredential("FIDO2 Hardware Key", "POSSESSION"),
            "totp_app": AuthCredential("Google Authenticator OTP", "POSSESSION"),
            "sms_otp": AuthCredential("SMS OTP Code", "POSSESSION"),
            "fingerprint": AuthCredential("Optical Fingerprint Scan", "INHERENCE"),
            "facial_recognition": AuthCredential("3D Infrared Facial Scan", "INHERENCE"),
            "gps_location": AuthCredential("GPS Corporate Geofence", "LOCATION")
        }

    def evaluate_mfa_combination(self, credential_keys: List[str]) -> Dict[str, any]:
        """
        Validates whether a combination of credentials constitutes True Multi-Factor Authentication.
        """
        distinct_factors: Set[str] = set()
        resolved_credentials = []

        for k in credential_keys:
            cred = self.credential_db.get(k)
            if cred:
                distinct_factors.add(cred.factor_type)
                resolved_credentials.append(f"{cred.name} ({cred.factor_type})")

        factor_count = len(distinct_factors)
        if factor_count >= 3:
            verdict = "TRUE 3FA (High-Assurance Triple Factor Authentication) 🌟"
            grade = "A+"
        elif factor_count == 2:
            verdict = "TRUE 2FA (Dual-Factor Authentication Verified) ✔"
            grade = "A"
        else:
            verdict = "FLAWED: Multi-Step Single-Factor (1FA) Only! Credentials share the same category ❌"
            grade = "F"

        return {
            "credentials_provided": resolved_credentials,
            "distinct_factor_categories": list(distinct_factors),
            "factor_count": factor_count,
            "verdict": verdict,
            "security_grade": grade
        }

    def calculate_travel_velocity(self, login1: GeoLocationLogin, login2: GeoLocationLogin) -> Dict[str, any]:
        """
        Calculates Great-Circle distance (Haversine formula) and velocity between two logins.
        Detects 'Impossible Traveler' fraud anomalies (v > 900 km/h).
        """
        # Haversine Formula
        R = 6371.0 # Earth radius in km
        lat1, lon1 = math.radians(login1.latitude), math.radians(login1.longitude)
        lat2, lon2 = math.radians(login2.latitude), math.radians(login2.longitude)

        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance_km = R * c

        time_diff_hours = abs(login2.timestamp_utc - login1.timestamp_utc) / 3600.0
        velocity_kmh = (distance_km / time_diff_hours) if time_diff_hours > 0 else 999999.0

        is_impossible = velocity_kmh > 900.0 # Commercial airplane cruising speed limit

        return {
            "login_1": f"{login1.city} ({time.strftime('%H:%M:%S', time.gmtime(login1.timestamp_utc))})",
            "login_2": f"{login2.city} ({time.strftime('%H:%M:%S', time.gmtime(login2.timestamp_utc))})",
            "distance_km": round(distance_km, 2),
            "time_elapsed_minutes": round(time_diff_hours * 60, 2),
            "calculated_velocity_kmh": round(velocity_kmh, 2),
            "is_impossible_traveler": is_impossible,
            "action": "ACCOUNT LOCKED 🚨: Geographically impossible velocity detected. Credential stuffing suspected." if is_impossible else "LOGIN PERMITTED ✔: Physical travel velocity plausible."
        }

# =============================================================================
# CLI EXECUTION & DEMONSTRATION
# =============================================================================

def main():
    print("=" * 80)
    print("AUTHENTICATION FACTORS & IMPOSSIBLE TRAVELER ENGINE (NIST SP 800-63B)")
    print("Instructor: Sukanta Hui | Location: Barrackpore, West Bengal")
    print("=" * 80)

    engine = AuthenticationFactorEngine()

    print("\n[+] 1. EVALUATING AUTHENTICATION COMBINATIONS (MFA VS MULTI-STEP)...")
    
    # Case A: Password + PIN (Flawed 1FA)
    res_flawed = engine.evaluate_mfa_combination(["password", "pin"])
    print(f"\n  [Combination A: Password + PIN]:")
    print(f"    • Credentials : {res_flawed['credentials_provided']}")
    print(f"    • Factors     : {res_flawed['distinct_factor_categories']}")
    print(f"    • Result      : {res_flawed['verdict']}")

    # Case B: Password + YubiKey + Fingerprint (True 3FA)
    res_3fa = engine.evaluate_mfa_combination(["password", "yubikey", "fingerprint"])
    print(f"\n  [Combination B: Password + YubiKey + Fingerprint]:")
    print(f"    • Credentials : {res_3fa['credentials_provided']}")
    print(f"    • Factors     : {res_3fa['distinct_factor_categories']}")
    print(f"    • Result      : {res_3fa['verdict']}")

    print("\n[+] 2. DETECTING IMPOSSIBLE TRAVELER ANOMALY (BARRACKPORE TO LONDON)...")
    t0 = time.time()
    login_barrackpore = GeoLocationLogin("susmita", "Barrackpore (West Bengal)", 22.7667, 88.3667, t0)
    login_london = GeoLocationLogin("susmita", "London (UK)", 51.5074, -0.1278, t0 + 1200) # 20 mins later!

    travel_res = engine.calculate_travel_velocity(login_barrackpore, login_london)
    print(f"  • Login 1           : {travel_res['login_1']}")
    print(f"  • Login 2           : {travel_res['login_2']}")
    print(f"  • Great-Circle Dist : {travel_res['distance_km']} km")
    print(f"  • Time Elapsed      : {travel_res['time_elapsed_minutes']} minutes")
    print(f"  • Velocity Required : {travel_res['calculated_velocity_kmh']} km/h")
    print(f"  • Security Verdict  : {travel_res['action']}")

    print("\n" + "=" * 80)
    print("✔ Authentication Factor evaluation completed successfully.")
    print("=" * 80)

if __name__ == "__main__":
    main()
