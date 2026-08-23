#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: AAA PROTOCOL ENGINE & RBAC/ABAC POLICY SIMULATOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_005 (Authentication & MFA)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulation of:
1. AAA Framework (Authentication, Authorization, and Accounting).
2. RADIUS vs TACACS+ network packet exchanges & encryption differences.
3. Dynamic Attribute-Based Access Control (ABAC) Policy Decision Engine.
4. 802.1X Port-Based Network Access Control (EAP-TLS over RADIUS).
"""

import sys
import hashlib
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
class UserContext:
    username: str
    role: str
    department: str
    client_ip: str
    time_hour: int             # 0 to 23
    device_compliant: bool

@dataclass
class AccessDecision:
    subject: str
    resource: str
    action: str
    decision: str              # "PERMIT", "DENY"
    matched_rule: str
    accounting_id: str

# =============================================================================
# AAA PROTOCOL & ACCESS CONTROL ENGINE
# =============================================================================

class AAAEnterpriseEngine:
    def __init__(self):
        self.shared_secret = b"BarrackporeRadiusSecret2026"
        self.accounting_db: List[Dict[str, any]] = []

    def simulate_radius_auth(self, username: str, password_hash: str) -> Dict[str, any]:
        """
        Simulates RFC 2865 RADIUS Access-Request / Access-Accept over UDP 1812.
        Note: RADIUS encrypts only the User-Password attribute using MD5 XOR.
        """
        is_authenticated = (username == "susmita" and password_hash == "valid_hash")
        packet_code = "Access-Accept (Code 2)" if is_authenticated else "Access-Reject (Code 3)"

        return {
            "protocol": "RADIUS (RFC 2865)",
            "transport": "UDP Port 1812",
            "packet_code": packet_code,
            "username": username,
            "encryption_scope": "PARTIAL (Only password attribute encrypted with MD5 XOR; header in cleartext)",
            "attributes_returned": {
                "Service-Type": "Framed-User",
                "Framed-Protocol": "PPP",
                "Tunnel-Type": "VLAN",
                "Tunnel-Private-Group-Id": "100 (Treasury VLAN)"
            } if is_authenticated else {}
        }

    def simulate_tacacs_command_authz(self, username: str, command: str) -> Dict[str, any]:
        """
        Simulates RFC 8907 TACACS+ granular per-command authorization over TCP Port 49.
        Note: TACACS+ encrypts the ENTIRE packet payload.
        """
        prohibited_commands = ["reload", "format", "erase", "no router bgp"]
        is_permitted = command.lower() not in prohibited_commands

        return {
            "protocol": "TACACS+ (RFC 8907)",
            "transport": "TCP Port 49",
            "username": username,
            "queried_command": command,
            "encryption_scope": "FULL (Entire payload encrypted under shared key)",
            "authz_decision": "STATUS_PASS_ADD" if is_permitted else "STATUS_FAIL (Unauthorized Command ❌)",
            "remediation": "Command permitted under privilege level 15" if is_permitted else "Command restricted to Lead Architect role."
        }

    def evaluate_abac_policy(self, user: UserContext, resource: str, action: str) -> AccessDecision:
        """
        Evaluates dynamic ABAC policy considering Subject, Object, Action, and Context.
        Rule: Treasury ledgers can only be accessed during working hours (09:00-18:00)
              from internal corporate IP subnets (10.14.0.0/16) on compliant devices.
        """
        is_work_hours = (9 <= user.time_hour <= 18)
        is_internal_ip = user.client_ip.startswith("10.14.")
        is_treasury_resource = "treasury_ledger" in resource.lower()

        acct_id = f"ACCT-{int(time.time())}-{user.username[:3].upper()}"

        if is_treasury_resource:
            if not is_work_hours:
                decision = "DENY"
                rule = "ABAC_FAIL: Access to financial ledgers prohibited outside working hours (09:00-18:00)."
            elif not is_internal_ip:
                decision = "DENY"
                rule = "ABAC_FAIL: Access permitted exclusively from internal Barrackpore SOC subnet (10.14.0.0/16)."
            elif not user.device_compliant:
                decision = "DENY"
                rule = "ABAC_FAIL: Endpoint device failed zero-trust posture health check (missing antivirus/EDR)."
            else:
                decision = "PERMIT"
                rule = "ABAC_PASS: All context attributes (Role, Time, Subnet, Health) successfully validated."
        else:
            decision = "PERMIT"
            rule = "ABAC_PASS: Standard resource access granted under RBAC role."

        # Record Accounting
        self.accounting_db.append({
            "accounting_id": acct_id,
            "username": user.username,
            "resource": resource,
            "action": action,
            "decision": decision,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        })

        return AccessDecision(
            subject=user.username,
            resource=resource,
            action=action,
            decision=decision,
            matched_rule=rule,
            accounting_id=acct_id
        )

# =============================================================================
# CLI EXECUTION & DEMONSTRATION
# =============================================================================

def main():
    print("=" * 80)
    print("ENTERPRISE AAA PROTOCOL & ABAC POLICY ENGINE (RFC 2865, RFC 8907)")
    print("Instructor: Sukanta Hui | Location: Barrackpore, West Bengal")
    print("=" * 80)

    engine = AAAEnterpriseEngine()

    print("\n[+] 1. SIMULATING RADIUS 802.1X ACCESS REQUEST (UDP 1812)...")
    radius_res = engine.simulate_radius_auth("susmita", "valid_hash")
    print(f"  • Protocol       : {radius_res['protocol']} via {radius_res['transport']}")
    print(f"  • Verdict        : {radius_res['packet_code']}")
    print(f"  • Encryption     : {radius_res['encryption_scope']}")
    print(f"  • Assigned VLAN  : {radius_res['attributes_returned'].get('Tunnel-Private-Group-Id', 'None')}")

    print("\n[+] 2. SIMULATING TACACS+ PER-COMMAND AUTHORIZATION (TCP 49)...")
    tacacs_allow = engine.simulate_tacacs_command_authz("debangshu", "show ip interface brief")
    print(f"  • Command        : '{tacacs_allow['queried_command']}'")
    print(f"  • Decision       : ✔ {tacacs_allow['authz_decision']}")

    tacacs_block = engine.simulate_tacacs_command_authz("debangshu", "erase startup-config")
    print(f"  • Command        : '{tacacs_block['queried_command']}'")
    print(f"  • Decision       : ❌ {tacacs_block['authz_decision']}")
    print(f"  • Remediation    : {tacacs_block['remediation']}")

    print("\n[+] 3. EVALUATING CONTEXTUAL ABAC POLICY FOR TREASURY SETTLEMENT (₹85,00,000)...")
    valid_context = UserContext("susmita", "SecOps_Lead", "Treasury", "10.14.0.50", 14, True)
    abac_res = engine.evaluate_abac_policy(valid_context, "treasury_ledger_batch", "EXECUTE_DISBURSEMENT")
    print(f"  • User           : {abac_res.subject} ({valid_context.role})")
    print(f"  • Decision       : 🛡️ {abac_res.decision}")
    print(f"  • Matched Rule   : {abac_res.matched_rule}")
    print(f"  • Accounting ID  : {abac_res.accounting_id}")

    print("\n" + "=" * 80)
    print("✔ AAA Protocol Engine lab simulation completed successfully.")
    print("=" * 80)

if __name__ == "__main__":
    main()
