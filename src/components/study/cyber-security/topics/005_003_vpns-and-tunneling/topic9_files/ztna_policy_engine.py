#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: ZERO TRUST NETWORK ACCESS (ZTNA) VS TRADITIONAL VPN ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_003 (VPNs & Tunneling)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script demonstrates programmatic Zero Trust context evaluation, dynamic
least-privilege application micro-segmentation, and lateral movement blast radius
quantification comparing Traditional VPNs vs Cloud ZTNA brokers.
"""

import sys
import json
import time
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES FOR IDENTITY, POSTURE, AND APPLICATION POLICIES
# =============================================================================

@dataclass
class EnterpriseApplication:
    app_id: str
    name: str
    internal_fqdn: str
    ip_address: str
    port: int
    classification: str  # "PUBLIC", "INTERNAL_GENERAL", "CONFIDENTIAL_FINANCE", "CRITICAL_CORE"
    required_roles: List[str]
    is_dark_to_internet: bool = True

@dataclass
class DeviceHealthPosture:
    is_disk_encrypted: bool
    is_edr_running: bool
    os_patch_age_days: int
    is_jailbroken_or_rooted: bool
    current_country: str

@dataclass
class UserSessionContext:
    user_id: str
    user_name: str
    role: str  # "FINANCE_OFFICER", "DEVELOPER_CONTRACTOR", "SOC_ADMIN"
    location: str
    assigned_ip: str
    posture: DeviceHealthPosture
    auth_mfa_verified: bool = True

# =============================================================================
# ACCESS CONTROL ENGINES: VPN (LAYER 3) VS ZTNA (LAYER 7 SDP)
# =============================================================================

class TraditionalVPNConcentrator:
    """
    Simulates a traditional Layer 3/4 castle-and-moat VPN gateway.
    Once authenticated, assigns an IP on the internal subnet and grants broad routing access.
    """
    def __init__(self, subnet: str = "10.14.0.0/16"):
        self.subnet = subnet
        self.public_inbound_port = 443
        self.is_visible_on_shodan = True

    def connect(self, user: UserSessionContext) -> Dict[str, any]:
        # Traditional VPN checks credentials and assigns an intranet IP
        assigned_intranet_ip = f"10.14.0.{hash(user.user_id) % 250 + 2}"
        return {
            "gateway_type": "TRADITIONAL_L3_VPN",
            "status": "CONNECTED",
            "assigned_intranet_ip": assigned_intranet_ip,
            "routable_network": self.subnet,
            "lateral_scan_permission": "UNRESTRICTED (Network Layer 3 Access Granted)",
            "public_attack_surface": f"Public IP with open port {self.public_inbound_port} (Discoverable on Shodan)"
        }

    def simulate_lateral_scan(self, user: UserSessionContext, all_apps: List[EnterpriseApplication]) -> List[Dict[str, any]]:
        """
        In traditional VPN, an attacker who compromises this endpoint can scan and
        reach ANY server on the entire 10.14.0.0/16 subnet!
        """
        reachable_apps = []
        for app in all_apps:
            reachable_apps.append({
                "app_name": app.name,
                "ip_port": f"{app.ip_address}:{app.port}",
                "status": "EXPOSED_TO_LATERAL_PROBE",
                "risk": "High - Server reachable across subnet"
            })
        return reachable_apps


class ZeroTrustAccessBroker:
    """
    Simulates a NIST SP 800-207 Zero Trust SDP Broker (Control Plane + Connector).
    Applications are 100% dark (no inbound ports); access granted only per app.
    """
    def __init__(self):
        self.inbound_ports_open = 0
        self.is_visible_on_shodan = False

    def evaluate_posture(self, posture: DeviceHealthPosture) -> Tuple[bool, List[str]]:
        reasons = []
        if not posture.is_disk_encrypted:
            reasons.append("Disk encryption (BitLocker/FileVault) is disabled.")
        if not posture.is_edr_running:
            reasons.append("EDR endpoint security agent is offline or disabled.")
        if posture.os_patch_age_days > 30:
            reasons.append(f"OS patches are {posture.os_patch_age_days} days old (Max allowed: 30 days).")
        if posture.is_jailbroken_or_rooted:
            reasons.append("Device integrity compromised (Rooted/Jailbroken detected).")

        passed = len(reasons) == 0
        return passed, reasons

    def evaluate_app_access(self, user: UserSessionContext, app: EnterpriseApplication) -> Dict[str, any]:
        posture_ok, posture_flaws = self.evaluate_posture(user.posture)
        if not posture_ok:
            return {
                "app_name": app.name,
                "access_granted": False,
                "decision": "DENIED_DEVICE_POSTURE_FAILURE",
                "reasons": posture_flaws,
                "tunnel_mode": "DARK (Zero Network Visibility)"
            }

        # Role-based least privilege check
        if user.role not in app.required_roles and "ALL" not in app.required_roles:
            return {
                "app_name": app.name,
                "access_granted": False,
                "decision": "DENIED_UNAUTHORIZED_ROLE",
                "reasons": [f"Role '{user.role}' not permitted for classification '{app.classification}'."],
                "tunnel_mode": "DARK (Application hidden from user)"
            }

        # Ephemeral Layer 7 micro-tunnel created via outbound-only connector
        return {
            "app_name": app.name,
            "access_granted": True,
            "decision": "PERMITTED_LEAST_PRIVILEGE",
            "protocol": f"Ephemeral L7 Proxy -> {app.internal_fqdn}",
            "tunnel_mode": "MICRO_SEGMENTED (Zero Lateral Subnet Access)",
            "app_dark_status": "Outbound connector only (0 listening inbound ports)"
        }

# =============================================================================
# SIMULATION WORKBENCH: BARRACKPORE & KOLKATA CASE STUDIES
# =============================================================================

def run_ztna_simulation():
    print("=" * 80)
    print("  ZERO TRUST NETWORK ACCESS (ZTNA) VS TRADITIONAL VPN AUDIT ENGINE")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    # 1. Catalog of Enterprise Applications in Barrackpore Core Hub
    enterprise_apps = [
        EnterpriseApplication("APP-01", "Developer Git Repositories", "git.internal.corp", "10.14.10.5", 22, "INTERNAL_GENERAL", ["DEVELOPER_CONTRACTOR", "SOC_ADMIN"]),
        EnterpriseApplication("APP-02", "Jira & Confluence Portal", "wiki.internal.corp", "10.14.10.8", 443, "INTERNAL_GENERAL", ["DEVELOPER_CONTRACTOR", "FINANCE_OFFICER", "SOC_ADMIN"]),
        EnterpriseApplication("APP-03", "Barrackpore Municipal Tax Core", "tax-core.internal.corp", "10.14.20.15", 8443, "CONFIDENTIAL_FINANCE", ["FINANCE_OFFICER", "SOC_ADMIN"]),
        EnterpriseApplication("APP-04", "SCADA Power Grid Controls", "scada.internal.corp", "10.14.99.1", 502, "CRITICAL_CORE", ["SOC_ADMIN"])
    ]

    # 2. Test User Context: Debangshu (Contract Developer working from Jadavpur)
    user_debangshu = UserSessionContext(
        user_id="USR-DEB-703",
        user_name="Debangshu",
        role="DEVELOPER_CONTRACTOR",
        location="Jadavpur Remote Desk",
        assigned_ip="192.168.29.105",
        posture=DeviceHealthPosture(
            is_disk_encrypted=True,
            is_edr_running=True,
            os_patch_age_days=12,
            is_jailbroken_or_rooted=False,
            current_country="India"
        )
    )

    # 3. Test User Context: Susmita with Failing Device Posture
    user_susmita_failing = UserSessionContext(
        user_id="USR-SUS-404",
        user_name="Susmita",
        role="FINANCE_OFFICER",
        location="Barrackpore Home Office",
        assigned_ip="192.168.1.55",
        posture=DeviceHealthPosture(
            is_disk_encrypted=False,  # BitLocker off!
            is_edr_running=False,    # EDR disabled!
            os_patch_age_days=45,    # Outdated patches!
            is_jailbroken_or_rooted=False,
            current_country="India"
        )
    )

    # --- SIMULATION 1: TRADITIONAL VPN EVALUATION ---
    print(f"\n[+] SCENARIO 1: DEPLOYING TRADITIONAL VPN FOR {user_debangshu.user_name} ({user_debangshu.role})")
    print("-" * 75)
    vpn = TraditionalVPNConcentrator("10.14.0.0/16")
    vpn_conn = vpn.connect(user_debangshu)
    print(f"  Gateway Type       : {vpn_conn['gateway_type']}")
    print(f"  Assigned IP        : {vpn_conn['assigned_intranet_ip']} on subnet {vpn_conn['routable_network']}")
    print(f"  Attack Surface     : {vpn_conn['public_attack_surface']}")

    print("\n  [!] Adversary Lateral Movement Blast Radius on Compromised VPN Laptop:")
    exposed_apps = vpn.simulate_lateral_scan(user_debangshu, enterprise_apps)
    for app in exposed_apps:
        print(f"    • {app['app_name']:<30} [{app['ip_port']:<18}] -> {app['status']}")
    print("  🚨 CATASTROPHIC RISK: Contract developer can probe SCADA Grid and Municipal Tax databases!")

    # --- SIMULATION 2: ZERO TRUST NETWORK ACCESS (ZTNA) EVALUATION ---
    print(f"\n[+] SCENARIO 2: DEPLOYING CLOUD ZTNA SDP BROKER FOR {user_debangshu.user_name} ({user_debangshu.role})")
    print("-" * 75)
    ztna = ZeroTrustAccessBroker()
    print(f"  Public Listening Ports  : {ztna.inbound_ports_open} (100% Invisible to Shodan Scanners)")

    for app in enterprise_apps:
        decision = ztna.evaluate_app_access(user_debangshu, app)
        status_icon = "✔" if decision['access_granted'] else "❌"
        print(f"  {status_icon} App: {app.name:<30} -> [{decision['decision']}]")
        if decision['access_granted']:
            print(f"     └─ Mode: {decision['protocol']} ({decision['tunnel_mode']})")
        else:
            print(f"     └─ Reasons: {', '.join(decision['reasons'])}")

    # --- SIMULATION 3: SUSMITA FAILING POSTURE TEST ---
    print(f"\n[+] SCENARIO 3: CONTINUOUS POSTURE EVALUATION FOR {user_susmita_failing.user_name} ({user_susmita_failing.role})")
    print("-" * 75)
    tax_app = enterprise_apps[2]  # Municipal Tax Core
    susmita_decision = ztna.evaluate_app_access(user_susmita_failing, tax_app)
    print(f"  Target Application      : {tax_app.name}")
    print(f"  Access Decision         : [{susmita_decision['decision']}]")
    for r in susmita_decision['reasons']:
        print(f"    ⚠️ Posture Violation : {r}")
    print("  🛡️ ZERO TRUST DEFENSE: Unhealthy endpoint quarantined automatically before tunnel creation!")

    # 4. Financial TCO Comparison (INR ₹)
    print("\n" + "=" * 80)
    print("  FINANCIAL TCO & INFRASTRUCTURE SIZING (INR ₹)")
    print("=" * 80)
    users = 1000
    vpn_hardware_gateway_lakhs = 18.5
    vpn_wan_leased_line_lakhs_yr = 24.0
    vpn_total_yr_lakhs = vpn_hardware_gateway_lakhs + vpn_wan_leased_line_lakhs_yr

    ztna_user_per_mo_inr = 350
    ztna_total_yr_inr = users * ztna_user_per_mo_inr * 12
    ztna_total_yr_lakhs = ztna_total_yr_inr / 100000

    print(f"  Workforce Size                 : {users} Enterprise Employees")
    print(f"  Legacy Hardware VPN Annual TCO : ₹{vpn_total_yr_lakhs:.2f} Lakhs / year (Appliances + WAN Backhaul)")
    print(f"  Cloud ZTNA SaaS Annual TCO     : ₹{ztna_total_yr_lakhs:.2f} Lakhs / year (Zero Hardware Upgrades)")
    print(f"  Net Annual Savings with ZTNA   : ₹{(vpn_total_yr_lakhs - ztna_total_yr_lakhs):.2f} Lakhs / year")
    print("=" * 80)

if __name__ == "__main__":
    run_ztna_simulation()
