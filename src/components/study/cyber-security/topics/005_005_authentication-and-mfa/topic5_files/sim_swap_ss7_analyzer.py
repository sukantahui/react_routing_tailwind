#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: SIM SWAP & SS7 SMS INTERCEPTION FORENSIC ANALYZER
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulation of:
1. SS7 (Signaling System No. 7) MAP_SEND_ROUTING_INFO_FOR_SM attack vector.
2. SIM Swap attack timeline & IMSI/IMEI binding detection.
3. Carrier-Grade Anti-Fraud SIM Swap Timestamp API check before banking SMS OTP.
4. Channel security comparison: SMS vs Email vs App TOTP vs FIDO2 WebAuthn.
"""

import sys
import time
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class SubscriberProfile:
    msisdn: str              # Phone number (e.g. "+91 98300 12345")
    imsi: str                # International Mobile Subscriber Identity (SIM card)
    imei: str                # International Mobile Equipment Identity (Phone handset)
    sim_last_changed_hours: float
    current_hlr_vlr_address: str

class SimSwapSs7Forensics:
    def __init__(self):
        # Database of subscriber records in Barrackpore telecom hub
        self.subscribers = {
            "+919830012345": SubscriberProfile(
                msisdn="+919830012345",
                imsi="404450123456789",
                imei="860123045678901",
                sim_last_changed_hours=1.2, # Recently swapped 1.2 hours ago!
                current_hlr_vlr_address="103.220.14.88 (Barrackpore Node)"
            ),
            "+919830099999": SubscriberProfile(
                msisdn="+919830099999",
                imsi="404450999999999",
                imei="860999099999999",
                sim_last_changed_hours=840.0, # Normal SIM (35 days old)
                current_hlr_vlr_address="103.220.14.90 (Kolkata Core)"
            )
        }

    def simulate_ss7_sms_interception(self, target_msisdn: str) -> Dict:
        """
        Simulates SS7 MAP signaling vulnerability:
        Adversary sends SRI_SM (Send Routing Info for Short Message) to HLR,
        then spoofs UpdateLocation to redirect incoming SMS to rogue MSC/VLR.
        """
        if target_msisdn not in self.subscribers:
            return {"status": "ERROR", "message": "Target phone number not found in HLR."}

        sub = self.subscribers[target_msisdn]

        return {
            "target": sub.msisdn,
            "target_imsi": sub.imsi,
            "ss7_vector": "MAP_SEND_ROUTING_INFO_FOR_SM (SRI_SM)",
            "attack_steps": [
                "1. Attacker leases access to international SS7 / SIGTRAN global title hub.",
                f"2. Attacker sends SRI_SM query for MSISDN {sub.msisdn} to legitimate HLR.",
                f"3. Legitimate HLR leaks target IMSI ({sub.imsi}) and serving MSC address.",
                "4. Attacker sends spoofed MAP_UPDATE_LOCATION redirecting target's roaming profile to rogue MSC.",
                "5. Bank sends SMS OTP -> Cellular network routes SMS directly to attacker's rogue tower!"
            ],
            "forensic_status": "SMS OTP INTERCEPTED IN CLEARTEXT 🚨",
            "root_vulnerability": "SS7 protocol lacks mutual cryptographic authentication between global telecommunication carrier nodes."
        }

    def evaluate_banking_sms_transfer(self, target_msisdn: str, amount_inr: float) -> Dict:
        """
        Checks Carrier-Grade SIM-Swap-Check API before sending SMS OTP for banking transactions.
        """
        if target_msisdn not in self.subscribers:
            return {"status": "REJECTED", "reason": "Unregistered subscriber."}

        sub = self.subscribers[target_msisdn]
        is_recent_swap = sub.sim_last_changed_hours < 48.0 # High risk if swapped within 48 hours

        if is_recent_swap:
            return {
                "transaction_amount": f"₹{amount_inr:,.2f}",
                "sim_age_hours": f"{sub.sim_last_changed_hours} hours",
                "fraud_verdict": "SMS OTP BLOCKED & ACCOUNT FROZEN 🚨",
                "reason": f"Carrier API Alert: SIM card changed {sub.sim_last_changed_hours}h ago (< 48h safety window). Potential SIM-Swap fraud in progress.",
                "remediation": "Transfer blocked. User must visit branch or verify via FIDO2 hardware token."
            }
        else:
            return {
                "transaction_amount": f"₹{amount_inr:,.2f}",
                "sim_age_hours": f"{sub.sim_last_changed_hours} hours",
                "fraud_verdict": "SIM INTEGRITY VERIFIED ✔",
                "reason": "SIM IMSI is stable (> 48 hours old). Standard OTP delivery approved.",
                "remediation": "SMS OTP dispatched over cellular SMS-C gateway."
            }

def main():
    print("=" * 80)
    print("SIM SWAP & SS7 SMS INTERCEPTION FORENSIC LAB")
    print("Institution: Coder & AccoTax | Location: Barrackpore, West Bengal")
    print("=" * 80)

    analyzer = SimSwapSs7Forensics()

    # Test 1: SS7 Interception
    print("\n[TEST 1]: SS7 CELLULAR SIGNALING INTERCEPTION DRILL")
    ss7_res = analyzer.simulate_ss7_sms_interception("+919830012345")
    print(f"Target Number : {ss7_res['target']}")
    print(f"Target IMSI   : {ss7_res['target_imsi']}")
    print(f"Attack Status : {ss7_res['forensic_status']}")
    print("\nSignaling Trace:")
    for step in ss7_res['attack_steps']:
        print(f"  {step}")

    # Test 2: Banking SIM Swap Fraud Detection API
    print("\n" + "=" * 80)
    print("[TEST 2]: CARRIER SIM SWAP API INTEGRATION (BARRACKPORE MUNICIPAL TREASURY)")
    print("Scenario A: Suspect Account (Swapped 1.2h ago)")
    res_a = analyzer.evaluate_banking_sms_transfer("+919830012345", 850000.0)
    print(f"  Verdict : {res_a['fraud_verdict']}")
    print(f"  Reason  : {res_a['reason']}")

    print("\nScenario B: Legitimate Account (Stable SIM)")
    res_b = analyzer.evaluate_banking_sms_transfer("+919830099999", 850000.0)
    print(f"  Verdict : {res_b['fraud_verdict']}")
    print(f"  Reason  : {res_b['reason']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
