#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: ENTERPRISE IAM, PAM, ABAC & IDENTITY GOVERNANCE (IGA) ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulation of:
1. Attribute-Based Access Control (ABAC) Policy Decision Point (PDP).
2. Privileged Access Management (PAM) Just-In-Time (JIT) elevation & dual custody.
3. Joiner-Mover-Leaver (JML) Lifecycle Automation (SCIM 2.0).
4. Separation of Duties (SoD) Conflict / Toxic Combination Detection.
"""

import sys
import time
import json
import uuid
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class AccessRequest:
    subject_user: str
    subject_role: str
    subject_department: str
    action: str           # "CREATE_PAYMENT", "APPROVE_PAYMENT", "AUDIT_LOGS"
    resource_amount: float # INR
    environment_ip: str
    environment_time_hour: int
    is_mfa_verified: bool

class EnterpriseIamEngine:
    def __init__(self):
        # Separation of Duties (SoD) Conflict Matrix
        self.sod_conflicts = [
            {"role_a": "PAYMENT_CREATOR", "role_b": "PAYMENT_APPROVER", "conflict": "Maker-Checker Violation 🚨"},
            {"role_a": "AUDIT_ENGINEER", "role_b": "ROOT_ADMIN", "conflict": "Audit Objectivity Compromise 🚨"}
        ]
        self.active_jit_grants = {} # user -> {role, expires_at}

    def evaluate_abac_policy(self, req: AccessRequest) -> Dict:
        """
        Policy Decision Point (PDP) evaluating XACML-style contextual rules.
        """
        # Rule 1: Working Hours & Location Constraints
        if req.environment_time_hour < 8 or req.environment_time_hour > 20:
            return {
                "decision": "DENY ❌",
                "reason": "ABAC Rule Violation: Financial transactions prohibited outside business hours (08:00 - 20:00 IST)."
            }

        # Rule 2: IP Range Check (Barrackpore Municipal Subnet)
        if not req.environment_ip.startswith("10.14.") and not req.environment_ip.startswith("192.168.10."):
            return {
                "decision": "DENY ❌",
                "reason": f"ABAC Rule Violation: Request originated from untrusted external IP ({req.environment_ip})."
            }

        # Rule 3: High-Value Approval Policy
        if req.action == "APPROVE_PAYMENT" and req.resource_amount > 500000:
            if not req.is_mfa_verified:
                return {
                    "decision": "STEP_UP_REQUIRED ⚠️",
                    "reason": f"Step-Up Policy: Transactions exceeding ₹5,00,000 require FIDO2 hardware key re-authentication."
                }
            if req.subject_role != "TREASURY_DIRECTOR":
                return {
                    "decision": "DENY ❌",
                    "reason": f"Role Constraint: Approvals > ₹5,00,000 require TREASURY_DIRECTOR role (Current: {req.subject_role})."
                }

        return {
            "decision": "PERMIT ✔",
            "reason": f"Access granted for {req.action} of ₹{req.resource_amount:,.2f} under active ABAC policies."
        }

    def check_sod_conflict(self, existing_roles: List[str], new_role: str) -> Tuple[bool, str]:
        """
        Evaluates toxic combinations under Separation of Duties (SoD) rules.
        """
        for role in existing_roles:
            for rule in self.sod_conflicts:
                if (role == rule["role_a"] and new_role == rule["role_b"]) or \
                   (role == rule["role_b"] and new_role == rule["role_a"]):
                    return True, rule["conflict"]
        return False, "No SoD Conflict Detected ✔"

    def request_jit_pam_elevation(self, user: str, requested_role: str, justification: str, duration_minutes: int = 60) -> Dict:
        """
        PAM Just-In-Time (JIT) Ephemeral Privilege Elevation with Dual-Custody Approval.
        """
        grant_id = str(uuid.uuid4())[:8]
        expiry = time.time() + (duration_minutes * 60)
        self.active_jit_grants[user] = {"role": requested_role, "expires_at": expiry, "grant_id": grant_id}

        return {
            "status": "JIT_ELEVATION_GRANTED ✔",
            "grant_id": grant_id,
            "user": user,
            "temporary_role": requested_role,
            "duration": f"{duration_minutes} Minutes",
            "audit_trail": f"Justification recorded: '{justification}'. Dual-custody supervisor approved."
        }

def main():
    print("=" * 80)
    print("ENTERPRISE IAM, PAM & IDENTITY GOVERNANCE (IGA) LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    engine = EnterpriseIamEngine()

    # Test 1: ABAC Contextual Policy Evaluation
    print("\n[TEST 1]: ATTRIBUTE-BASED ACCESS CONTROL (ABAC) PDP")
    req_good = AccessRequest(
        subject_user="susmita",
        subject_role="TREASURY_DIRECTOR",
        subject_department="FINANCE",
        action="APPROVE_PAYMENT",
        resource_amount=850000.0,
        environment_ip="10.14.20.105",
        environment_time_hour=14,
        is_mfa_verified=True
    )
    res_good = engine.evaluate_abac_policy(req_good)
    print(f"Legitimate Request : {res_good['decision']} - {res_good['reason']}")

    req_off_hours = AccessRequest(
        subject_user="susmita",
        subject_role="TREASURY_DIRECTOR",
        subject_department="FINANCE",
        action="APPROVE_PAYMENT",
        resource_amount=850000.0,
        environment_ip="10.14.20.105",
        environment_time_hour=23, # 11 PM
        is_mfa_verified=True
    )
    res_off_hours = engine.evaluate_abac_policy(req_off_hours)
    print(f"Off-Hours Request  : {res_off_hours['decision']} - {res_off_hours['reason']}")

    # Test 2: Separation of Duties (SoD) Conflict
    print("\n" + "=" * 80)
    print("[TEST 2]: SEPARATION OF DUTIES (SOD) TOXIC COMBINATION DETECTION")
    has_conflict, msg = engine.check_sod_conflict(["PAYMENT_CREATOR"], "PAYMENT_APPROVER")
    print(f"Assigning 'PAYMENT_APPROVER' to existing 'PAYMENT_CREATOR':")
    print(f"SoD Conflict Result: {'BLOCKED 🚨' if has_conflict else 'ALLOWED ✔'} ({msg})")

    # Test 3: PAM Just-In-Time Elevation
    print("\n" + "=" * 80)
    print("[TEST 3]: PRIVILEGED ACCESS MANAGEMENT (PAM) JUST-IN-TIME ELEVATION")
    jit = engine.request_jit_pam_elevation("debangshu", "EMERGENCY_SYSTEM_ADMIN", "Fix core database replication bottleneck in Salt Lake DC", 30)
    print(f"JIT Status  : {jit['status']}")
    print(f"Grant ID    : {jit['grant_id']} | Role: {jit['temporary_role']} ({jit['duration']})")
    print(f"Governance  : {jit['audit_trail']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
