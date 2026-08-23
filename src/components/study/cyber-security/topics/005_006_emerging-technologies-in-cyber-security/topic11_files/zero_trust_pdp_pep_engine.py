#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: ZERO TRUST ARCHITECTURE (NIST SP 800-207) PDP/PEP ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_006 (Emerging Technologies)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides comprehensive simulations of:
1. NIST SP 800-207 Policy Decision Point (PDP: Policy Engine + Administrator).
2. Policy Enforcement Point (PEP) Dynamic Access Gate & Mutual TLS Tunneling.
3. Continuous Contextual Trust Scoring (Device Health + UEBA + Geovelocity).
4. Micro-Segmentation & Software-Defined Perimeter (SDP) Least Privilege ACLs.
"""

import sys
import time
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class AccessSubject:
    user_id: str
    role: str
    mfa_verified: bool
    is_fido2_passkey: bool
    device_edr_compliant: bool
    device_os_patched: bool
    ip_location: str
    ueba_risk_score: int # 0 to 100

@dataclass
class TargetResource:
    resource_id: str
    sensitivity: str # "PUBLIC", "INTERNAL", "RESTRICTED", "CROWN_JEWEL"
    min_trust_score_required: int

class ZeroTrustPolicyDecisionPoint:
    """
    NIST SP 800-207 Policy Decision Point (PDP).
    Combines Policy Engine (PE) mathematical scoring and Policy Administrator (PA) command dispatch.
    """
    def __init__(self):
        pass

    def evaluate_access_request(self, subject: AccessSubject, resource: TargetResource) -> Dict:
        # Step 1: Calculate Dynamic Contextual Trust Score (0 to 100)
        trust_score = 100

        # Identity Checks
        if not subject.mfa_verified:
            trust_score -= 50
        elif not subject.is_fido2_passkey:
            trust_score -= 15 # Deduct if legacy SMS/TOTP instead of phishing-resistant FIDO2

        # Device Posture Checks
        if not subject.device_edr_compliant:
            trust_score -= 35
        if not subject.device_os_patched:
            trust_score -= 20

        # Behavioral & Contextual Telemetry
        if subject.ueba_risk_score > 60:
            trust_score -= 40
        elif subject.ueba_risk_score > 30:
            trust_score -= 15

        trust_score = max(trust_score, 0)

        # Step 2: Compare Trust Score against Resource Sensitivity Requirement
        is_granted = trust_score >= resource.min_trust_score_required

        # Step 3: Policy Administrator Action
        if is_granted:
            verdict = "ACCESS GRANTED ✔ (Dynamic Micro-Tunnel Provisioned)"
            pep_action = "PROVISION_EPHEMERAL_MUTUAL_TLS_TUNNEL"
            status_color = "EMERALD"
        elif trust_score >= (resource.min_trust_score_required - 20):
            verdict = "STEP-UP CHALLENGE REQUIRED ⚠️ (FIDO2 Hardware Key Verification)"
            pep_action = "TRIGGER_STEP_UP_PASSKEY_PROMPT"
            status_color = "AMBER"
        else:
            verdict = "ACCESS DENIED & ISOLATED 🚨 (Zero Trust Policy Violation)"
            pep_action = "BLOCK_REQUEST_AND_LOG_SOC_INCIDENT"
            status_color = "ROSE"

        return {
            "subject": subject.user_id,
            "role": subject.role,
            "target_resource": resource.resource_id,
            "resource_sensitivity": resource.sensitivity,
            "calculated_trust_score": f"{trust_score}/100",
            "min_score_required": f"{resource.min_trust_score_required}/100",
            "decision": verdict,
            "pep_instruction": pep_action,
            "telemetry_breakdown": {
                "mfa_quality": "PHISHING_RESISTANT_FIDO2" if subject.is_fido2_passkey else "LEGACY_OTP",
                "device_health": "COMPLIANT" if (subject.device_edr_compliant and subject.device_os_patched) else "NON_COMPLIANT ⚠️",
                "behavioral_risk": f"UEBA Score {subject.ueba_risk_score}/100"
            }
        }

def main():
    print("=" * 80)
    print("ZERO TRUST ARCHITECTURE (NIST SP 800-207) PDP/PEP LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    pdp = ZeroTrustPolicyDecisionPoint()

    # Define Resources
    res_treasury_core = TargetResource("DB-BARRACKPORE-TREASURY-01", "CROWN_JEWEL", min_trust_score_required=85)
    res_wiki = TargetResource("PORTAL-INTERNAL-WIKI", "INTERNAL", min_trust_score_required=40)

    # Scenario 1: Compliant SecOps Officer
    print("\n[SCENARIO 1]: COMPLIANT SECOPS OFFICER REQUESTING CROWN JEWEL ACCESS")
    officer_susmita = AccessSubject(
        user_id="susmita@treasury.gov.in",
        role="TREASURY_OFFICER",
        mfa_verified=True,
        is_fido2_passkey=True,
        device_edr_compliant=True,
        device_os_patched=True,
        ip_location="Barrackpore, IN",
        ueba_risk_score=10
    )
    res1 = pdp.evaluate_access_request(officer_susmita, res_treasury_core)
    print(f"User: {res1['subject']} -> Trust Score: {res1['calculated_trust_score']} (Min: {res1['min_score_required']})")
    print(f"Decision : {res1['decision']}")
    print(f"PEP Action: {res1['pep_instruction']}")

    # Scenario 2: Compromised / Unpatched Device Attempt
    print("\n" + "=" * 80)
    print("[SCENARIO 2]: UNPATCHED LAPTOP WITH HIGH BEHAVIORAL RISK SCORE")
    compromised_subject = AccessSubject(
        user_id="contractor_x@vendor.com",
        role="VENDOR_AUDITOR",
        mfa_verified=True,
        is_fido2_passkey=False,
        device_edr_compliant=False, # EDR disabled!
        device_os_patched=False,
        ip_location="External VPN",
        ueba_risk_score=75 # High anomaly
    )
    res2 = pdp.evaluate_access_request(compromised_subject, res_treasury_core)
    print(f"User: {res2['subject']} -> Trust Score: {res2['calculated_trust_score']} (Min: {res2['min_score_required']})")
    print(f"Decision : {res2['decision']}")
    print(f"PEP Action: {res2['pep_instruction']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
