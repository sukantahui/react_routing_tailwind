#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: MULTI-FACTOR AUTHENTICATION (MFA/2FA) ORCHESTRATION ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulation of:
1. NIST SP 800-63B Authenticator Assurance Levels (AAL1, AAL2, AAL3).
2. Multi-Factor Credential Categorization and True-MFA verification.
3. MFA Prompt Bombing (MFA Fatigue) attack detection & number matching defense.
4. Risk-Based Adaptive Step-Up MFA engine evaluated in Indian Rupee (₹) contexts.
"""

import sys
import time
import math
import random
from dataclasses import dataclass
from typing import Dict, List, Set, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES
# =============================================================================

@dataclass
class AuthFactor:
    name: str
    category: str      # "KNOWLEDGE", "POSSESSION", "INHERENCE", "LOCATION"
    assurance_score: int

@dataclass
class MfaAssessment:
    factors_used: List[str]
    distinct_categories: Set[str]
    is_true_mfa: bool
    assurance_level: str   # "AAL1", "AAL2", "AAL3"
    description: str

# =============================================================================
# MFA ORCHESTRATION & FATIGUE DETECTION ENGINE
# =============================================================================

class MfaOrchestrationEngine:
    def __init__(self):
        self.factors_db = {
            "password": AuthFactor("Password", "KNOWLEDGE", 20),
            "pin": AuthFactor("ATM PIN", "KNOWLEDGE", 20),
            "sms_otp": AuthFactor("SMS OTP", "POSSESSION", 40),
            "totp_app": AuthFactor("Software TOTP (Google Auth)", "POSSESSION", 70),
            "fido2_key": AuthFactor("Hardware FIDO2 Security Key", "POSSESSION", 95),
            "fingerprint": AuthFactor("Biometric Fingerprint", "INHERENCE", 80),
            "face_id": AuthFactor("3D Face Recognition", "INHERENCE", 80),
            "geofence": AuthFactor("Corporate Subnet Location", "LOCATION", 30)
        }

    def evaluate_mfa(self, selected_keys: List[str]) -> MfaAssessment:
        """
        Evaluates factor combination against NIST SP 800-63B AAL guidelines.
        """
        selected_factors = [self.factors_db[k] for k in selected_keys if k in self.factors_db]
        categories = {f.category for f in selected_factors}
        is_true_mfa = len(categories) >= 2

        # Determine NIST AAL Level
        has_fido = "fido2_key" in selected_keys
        has_knowledge = any(f.category == "KNOWLEDGE" for f in selected_factors)
        has_possession = any(f.category == "POSSESSION" for f in selected_factors)
        has_inherence = any(f.category == "INHERENCE" for f in selected_factors)

        if has_fido and (has_knowledge or has_inherence) and is_true_mfa:
            aal = "AAL3 (High Assurance - Phishing Resistant)"
            desc = "Complies with NIST AAL3: Hardware-bound cryptographic authenticator with biometric/PIN unlock."
        elif is_true_mfa and (has_possession or has_inherence):
            aal = "AAL2 (Moderate Assurance - Standard Enterprise)"
            desc = "Complies with NIST AAL2: Multi-factor using software OTP or biometric."
        else:
            aal = "AAL1 (Low Assurance - Single Factor Multi-Step)"
            desc = "FAILS True MFA: All credentials belong to the same factor category (e.g. Password + PIN)."

        return MfaAssessment(
            factors_used=[f.name for f in selected_factors],
            distinct_categories=categories,
            is_true_mfa=is_true_mfa,
            assurance_level=aal,
            description=desc
        )

    def simulate_mfa_fatigue_attack(self, push_count_per_min: int, has_number_matching: bool) -> Dict:
        """
        Simulates MFA Prompt Bombing (Fatigue attack) and Number Matching defense.
        """
        if has_number_matching:
            return {
                "attack_result": "ATTACK NEUTRALIZED 🛡️",
                "defense": "Number Matching Enforced: User must enter a 2-digit number shown on the login screen into their phone. Blind approval is impossible.",
                "compromise_probability": "0.0%"
            }
        else:
            if push_count_per_min >= 15:
                return {
                    "attack_result": "HIGH RISK OF COMPROMISE 🚨",
                    "defense": "Legacy Simple Push (Approve/Deny): User bombarded with 15+ notification prompts at 02:00 AM until fatigue-clicking 'Approve'.",
                    "compromise_probability": "78.5%"
                }
            else:
                return {
                    "attack_result": "SUSPICIOUS ACTIVITY LOGGED ⚠️",
                    "defense": "Low-frequency push notifications. SOC alert generated for repeated prompts.",
                    "compromise_probability": "15.0%"
                }

    def evaluate_adaptive_step_up(self, amount_inr: float, is_new_device: bool, is_out_of_hours: bool) -> Dict:
        """
        Evaluates contextual risk score and triggers Step-Up authentication for high-value banking transactions.
        """
        risk_score = 0
        reasons = []

        if amount_inr > 500_000:
            risk_score += 40
            reasons.append(f"High Transaction Value (₹{amount_inr:,.2f} > ₹5,00,000 threshold)")
        elif amount_inr > 100_000:
            risk_score += 20
            reasons.append(f"Medium Transaction Value (₹{amount_inr:,.2f})")

        if is_new_device:
            risk_score += 30
            reasons.append("Unrecognized Device Hardware Fingerprint")

        if is_out_of_hours:
            risk_score += 20
            reasons.append("Off-Hours Access (Between 23:00 - 05:00)")

        if risk_score >= 60:
            action = "MANDATORY STEP-UP: Hardware FIDO2 Security Key + Biometric Verification Required"
            policy = "HIGH RISK (AAL3 Required)"
        elif risk_score >= 30:
            action = "STANDARD STEP-UP: Time-Based OTP (TOTP) Challenge Required"
            policy = "MODERATE RISK (AAL2 Required)"
        else:
            action = "SEAMLESS PASS: Standard Single Sign-On session permitted"
            policy = "LOW RISK (AAL1 Permitted)"

        return {
            "amount_inr": f"₹{amount_inr:,.2f}",
            "risk_score": risk_score,
            "policy": policy,
            "action": action,
            "reasons": reasons
        }

# =============================================================================
# CLI DEMONSTRATION & TEST HARNESS
# =============================================================================

def main():
    engine = MfaOrchestrationEngine()
    print("=" * 80)
    print("MFA ORCHESTRATION & RISK-BASED STEP-UP SIMULATOR")
    print("Institution: Coder & AccoTax | Location: Barrackpore, West Bengal")
    print("=" * 80)

    # Test 1: Flawed 1FA vs True 2FA vs AAL3
    combos = [
        ("Password + PIN (Flawed)", ["password", "pin"]),
        ("Password + TOTP App (Standard 2FA)", ["password", "totp_app"]),
        ("Password + FIDO2 Key (AAL3 High Assurance)", ["password", "fido2_key"])
    ]

    for label, keys in combos:
        res = engine.evaluate_mfa(keys)
        print(f"\n[Scenario]: {label}")
        print(f"  Factors Used        : {', '.join(res.factors_used)}")
        print(f"  Distinct Categories : {', '.join(res.distinct_categories)}")
        print(f"  True MFA Verified   : {'YES ✔' if res.is_true_mfa else 'NO ❌'}")
        print(f"  Assurance Rating    : {res.assurance_level}")
        print(f"  Forensic Summary    : {res.description}")

    # Test 2: MFA Prompt Bombing vs Number Matching
    print("\n" + "-" * 80)
    print("TEST 2: MFA FATIGUE (PROMPT BOMBING) SIMULATION")
    print("-" * 80)
    fatigue_legacy = engine.simulate_mfa_fatigue_attack(push_count_per_min=20, has_number_matching=False)
    fatigue_modern = engine.simulate_mfa_fatigue_attack(push_count_per_min=20, has_number_matching=True)
    print(f"Legacy Push (20 prompts/min): {fatigue_legacy['attack_result']} - Prob: {fatigue_legacy['compromise_probability']}")
    print(f"Modern Push with Number Match: {fatigue_modern['attack_result']} - Prob: {fatigue_modern['compromise_probability']}")

    # Test 3: Adaptive Step-Up for Municipal Treasury
    print("\n" + "-" * 80)
    print("TEST 3: ADAPTIVE STEP-UP MFA (BARRACKPORE MUNICIPAL TREASURY)")
    print("-" * 80)
    tx = engine.evaluate_adaptive_step_up(amount_inr=8500000.0, is_new_device=True, is_out_of_hours=True)
    print(f"Disbursement Amount : {tx['amount_inr']}")
    print(f"Risk Score          : {tx['risk_score']}/100")
    print(f"Policy Decision     : {tx['policy']}")
    print(f"Enforced Action     : {tx['action']}")
    print(f"Risk Triggers       : {'; '.join(tx['reasons'])}")
    print("=" * 80)

if __name__ == "__main__":
    main()
