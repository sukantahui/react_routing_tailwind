#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: AI ANOMALY DETECTION, PREDICTIVE CTI (EPSS) & SOAR ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_006 (Emerging Technologies)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides comprehensive simulations of:
1. Multi-Dimensional UEBA Anomaly Scoring (Geovelocity, Off-Hours, Data Volume).
2. Exploit Prediction Scoring System (EPSS) Probability Calculation.
3. Automated SOAR Playbook Execution Engine (Sub-Second Threat Containment).
4. Mean Time to Detect (MTTD) & Mean Time to Respond (MTTR) Optimization.
"""

import sys
import time
import json
import math
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class UebaEvent:
    user: str
    action: str
    data_volume_mb: float
    login_hour: int
    ip_country: str
    is_impossible_travel: bool

class SoarPredictiveEngine:
    def __init__(self):
        self.containment_log = []

    def calculate_ueba_risk_score(self, event: UebaEvent) -> Tuple[int, str]:
        """
        Calculates composite UEBA risk score (0-100) based on contextual deviations.
        """
        risk = 10 # Base baseline score

        if event.is_impossible_travel:
            risk += 45 # Severe geovelocity violation
        if event.login_hour < 6 or event.login_hour > 22:
            risk += 20 # Off-hours anomaly
        if event.data_volume_mb > 500.0:
            risk += 25 # Large data exfiltration indicator

        risk = min(risk, 100)

        if risk >= 75:
            verdict = "CRITICAL INSIDER / ACCOUNT COMPROMISE THREAT 🚨"
        elif risk >= 40:
            verdict = "MODERATE RISK ANOMALY ⚠️ (Step-Up Challenge)"
        else:
            verdict = "LOW RISK NORMAL BEHAVIOR ✔"

        return risk, verdict

    def calculate_epss_score(self, cvss_score: float, poc_available: bool, dark_web_mentions: int) -> float:
        """
        Predictive Threat Intelligence: Simulates Exploit Prediction Scoring System (EPSS) probability.
        """
        z = (0.35 * cvss_score) + (1.8 * (1.0 if poc_available else 0.0)) + (0.05 * dark_web_mentions) - 4.5
        epss_prob = 1.0 / (1.0 + Math_exp if 'Math_exp' in globals() else math.exp(-z))
        return round(epss_prob * 100.0, 2)

    def execute_soar_playbook(self, incident_id: str, target_host: str, target_user: str, target_ip: str) -> Dict:
        """
        Executes automated multi-step containment playbook in sub-second execution.
        """
        start_time = time.time()
        actions = []

        # Step 1: EDR Host Isolation
        actions.append({"step": "EDR_ISOLATE_HOST", "target": target_host, "status": "ISOLATED ✔", "time_ms": 140})

        # Step 2: IdP Token Revocation
        actions.append({"step": "IDP_REVOKE_OAUTH_SESSIONS", "target": target_user, "status": "REVOKED ✔", "time_ms": 85})

        # Step 3: Perimeter Firewall ACL Block
        actions.append({"step": "FIREWALL_BLOCK_C2_IP", "target": target_ip, "status": "BLOCKED ✔", "time_ms": 60})

        # Step 4: SIEM Incident Ticket Creation
        actions.append({"step": "SIEM_FILE_INCIDENT_TICKET", "incident_id": incident_id, "status": "FILED ✔", "time_ms": 110})

        total_elapsed_ms = sum(a["time_ms"] for a in actions)

        result = {
            "incident_id": incident_id,
            "playbook_name": "RANSOMWARE_AUTOMATED_CONTAINMENT_V2",
            "total_execution_time": f"{total_elapsed_ms} Milliseconds (0.{total_elapsed_ms}s)",
            "actions_executed": actions,
            "soc_outcome": "THREAT CONTAINED BEFORE ENCRYPTION SPREAD ✔ (NIST SP 800-61)"
        }

        self.containment_log.append(result)
        return result

def main():
    print("=" * 80)
    print("AI ANOMALY DETECTION, PREDICTIVE CTI (EPSS) & SOAR LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    engine = SoarPredictiveEngine()

    # Test 1: UEBA Anomaly Scoring
    print("\n[TEST 1]: MULTI-DIMENSIONAL UEBA BEHAVIORAL RISK SCORING")
    event_normal = UebaEvent("susmita", "DOWNLOAD_REPORT", 12.5, 14, "IN", False)
    event_attack = UebaEvent("susmita", "BULK_EXFILTRATION", 42000.0, 2, "RU", True)

    score_norm, v_norm = engine.calculate_ueba_risk_score(event_normal)
    score_att, v_att = engine.calculate_ueba_risk_score(event_attack)

    print(f"Normal Event : Risk Score = {score_norm}/100 -> {v_norm}")
    print(f"Attack Event : Risk Score = {score_att}/100 -> {v_att}")

    # Test 2: Predictive CTI (EPSS) Probability
    print("\n" + "=" * 80)
    print("[TEST 2]: PREDICTIVE EXPLOIT PROBABILITY (EPSS vs CVSS)")
    epss_low = engine.calculate_epss_score(cvss_score=9.8, poc_available=False, dark_web_mentions=0)
    epss_high = engine.calculate_epss_score(cvss_score=7.5, poc_available=True, dark_web_mentions=45)

    print(f"CVE-A (CVSS 9.8 Critical, No PoC, No Chatter)  : EPSS Probability = {epss_low}% (Low in-the-wild risk)")
    print(f"CVE-B (CVSS 7.5 Medium, Public PoC, 45 DarkWeb): EPSS Probability = {epss_high}% (CRITICAL REMEDIATION 🚨)")

    # Test 3: Sub-Second SOAR Playbook Execution
    print("\n" + "=" * 80)
    print("[TEST 3]: AUTOMATED SOAR PLAYBOOK EXECUTION TRACE")
    soar_res = engine.execute_soar_playbook("INC-88912", "WKSTN-FINANCE-04", "susmita@bank.in", "198.51.100.77")
    print(f"Playbook: {soar_res['playbook_name']}")
    print(f"Execution Speed : {soar_res['total_execution_time']}")
    for act in soar_res["actions_executed"]:
        print(f"  -> [{act['step']}] on {act['target'] if 'target' in act else act['incident_id']} in {act['time_ms']}ms : {act['status']}")
    print(f"Result  : {soar_res['soc_outcome']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
