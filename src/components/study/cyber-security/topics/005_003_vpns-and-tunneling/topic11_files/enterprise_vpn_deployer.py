#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: ENTERPRISE VPN DEPLOYMENT & CAPACITY SIZING ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_003 (VPNs & Tunneling)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script performs end-to-end enterprise gateway capacity planning, multi-tier
AAA authentication pipeline validation, device posture health scoring, and
High Availability (HA) failover modeling for enterprise remote workforces.
"""

import sys
import json
import math
from dataclasses import dataclass, field
from typing import List, Dict, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES FOR ENTERPRISE DEPLOYMENT & SIZING
# =============================================================================

@dataclass
class EndpointProfile:
    user_id: str
    user_name: str
    persona: str               # "EXECUTIVE", "STANDARD_EMPLOYEE", "CONTRACTOR", "SOC_ADMIN"
    location: str
    tunnel_policy: str         # "FULL_TUNNEL", "INVERSE_SPLIT", "ZTNA_BROWSER_ISOLATION"
    mfa_method: str            # "FIDO2_PASSKEY", "TOTP_APP", "SMS_OTP"
    disk_encrypted: bool
    edr_active: bool
    os_patched: bool
    is_corporate_managed: bool

@dataclass
class GatewayClusterSpec:
    cluster_name: str
    location: str
    active_nodes: int
    passive_nodes: int
    throughput_per_node_gbps: float
    max_tunnels_per_node: int
    aes_ni_enabled: bool = True

# =============================================================================
# ENTERPRISE CAPACITY PLANNING & AAA PIPELINE SIMULATOR
# =============================================================================

class EnterpriseDeploymentEngine:
    def __init__(self, cluster: GatewayClusterSpec):
        self.cluster = cluster

    def evaluate_endpoint_connection(self, ep: EndpointProfile) -> Dict[str, any]:
        """
        Executes end-to-end AAA authentication and posture evaluation pipeline.
        """
        # Step 1: MFA Phishing Resistance Check
        is_mfa_compliant = ep.mfa_method in ("FIDO2_PASSKEY", "TOTP_APP")

        # Step 2: Posture Health Scoring (0 to 100)
        posture_score = 0
        if ep.disk_encrypted:
            posture_score += 35
        if ep.edr_active:
            posture_score += 35
        if ep.os_patched:
            posture_score += 20
        if ep.is_corporate_managed:
            posture_score += 10

        is_posture_passed = posture_score >= 80

        # Step 3: Access Decision
        if not is_mfa_compliant:
            decision = "DENIED_INSECURE_MFA"
            assigned_vlan = "QUARANTINE_VLAN_999"
            tunnel_action = "DROPPED (SMS OTP not permitted for sensitive access)"
        elif not is_posture_passed:
            decision = "QUARANTINED_POSTURE_FAILURE"
            assigned_vlan = "REMEDIATION_VLAN_900"
            tunnel_action = "RESTRICTED (Redirect to Windows Update / Antivirus portal)"
        else:
            decision = "ACCESS_GRANTED_LEAST_PRIVILEGE"
            assigned_vlan = "CORP_PROD_VLAN_100" if ep.persona != "CONTRACTOR" else "DMZ_CONTRACTOR_VLAN_200"
            tunnel_action = f"ESTABLISHED ({ep.tunnel_policy})"

        return {
            "user_name": ep.user_name,
            "persona": ep.persona,
            "mfa_method": ep.mfa_method,
            "posture_score": posture_score,
            "decision": decision,
            "assigned_vlan": assigned_vlan,
            "tunnel_action": tunnel_action
        }

    def calculate_gateway_sizing_tco(self, total_users: int, concurrency_percent: float = 40.0, avg_user_mbps: float = 3.5) -> Dict[str, any]:
        """
        Calculates required hardware cluster capacity, WAN leased line bandwidth, and annual TCO in INR (₹).
        """
        concurrent_users = math.ceil(total_users * (concurrency_percent / 100.0))
        total_bandwidth_required_mbps = concurrent_users * avg_user_mbps
        total_bandwidth_required_gbps = round(total_bandwidth_required_mbps / 1000.0, 2)

        total_cluster_capacity_gbps = self.cluster.active_nodes * self.cluster.throughput_per_node_gbps
        utilization_percent = round((total_bandwidth_required_gbps / total_cluster_capacity_gbps) * 100, 1)

        # Financial Sizing (INR ₹ Lakhs)
        hardware_cost_lakhs = (self.cluster.active_nodes + self.cluster.passive_nodes) * 6.5
        wan_bandwidth_cost_lakhs_yr = total_bandwidth_required_gbps * 18.0 # ₹18L per Gbps/yr leased line
        total_annual_tco_lakhs = round(hardware_cost_lakhs / 3 + wan_bandwidth_cost_lakhs_yr + 4.5, 2)

        return {
            "total_users": total_users,
            "concurrent_users": concurrent_users,
            "peak_bandwidth_gbps": total_bandwidth_required_gbps,
            "cluster_capacity_gbps": total_cluster_capacity_gbps,
            "cluster_utilization_percent": min(100.0, utilization_percent),
            "is_cluster_oversubscribed": total_bandwidth_required_gbps > total_cluster_capacity_gbps,
            "total_annual_tco_lakhs": total_annual_tco_lakhs
        }

# =============================================================================
# SIMULATION WORKBENCH: BARRACKPORE MUNICIPAL & FINTECH CORE
# =============================================================================

def run_enterprise_deployment_simulation():
    print("=" * 80)
    print("  ENTERPRISE VPN DEPLOYMENT & SECURE REMOTE WORKER ENGINE")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    # 1. Gateway Cluster Specification in Barrackpore Core Hub
    cluster = GatewayClusterSpec(
        cluster_name="BARRACKPORE-CORE-CLUSTER",
        location="Barrackpore Central Datacenter",
        active_nodes=2,
        passive_nodes=1,
        throughput_per_node_gbps=4.0, # 8.0 Gbps total active capacity
        max_tunnels_per_node=3000,
        aes_ni_enabled=True
    )

    deployer = EnterpriseDeploymentEngine(cluster)

    # 2. Remote Worker Persona Profiles
    personas = [
        EndpointProfile("USR-01", "Susmita", "EXECUTIVE", "Barrackpore Core", "FULL_TUNNEL", "FIDO2_PASSKEY", True, True, True, True),
        EndpointProfile("USR-02", "Debangshu", "CONTRACTOR", "Jadavpur Remote", "ZTNA_BROWSER_ISOLATION", "FIDO2_PASSKEY", True, True, True, False),
        EndpointProfile("USR-03", "Mamata", "SOC_ADMIN", "Kolkata Hub", "FULL_TUNNEL", "FIDO2_PASSKEY", True, True, True, True),
        EndpointProfile("USR-04", "Mahima", "STANDARD_EMPLOYEE", "Ichapur Office", "INVERSE_SPLIT", "SMS_OTP", True, False, False, True) # Insecure MFA + Outdated!
    ]

    print("\n[+] SECTION 1: ENDPOINT AAA PIPELINE & POSTURE ASSESSMENT")
    print("-" * 75)
    for p in personas:
        result = deployer.evaluate_endpoint_connection(p)
        status_icon = "✔" if "GRANTED" in result['decision'] else "⚠️" if "QUARANTINED" in result['decision'] else "❌"
        print(f"  {status_icon} User: {result['user_name']:<12} [{result['persona']:<18}]")
        print(f"     • Health Score : {result['posture_score']}/100 | MFA: {result['mfa_method']}")
        print(f"     • Policy Action: [{result['decision']}]")
        print(f"     • Assigned VLAN: {result['assigned_vlan']} -> {result['tunnel_action']}\n")

    # 3. Gateway Capacity & Sizing Audit
    print("=" * 80)
    print("  SECTION 2: ENTERPRISE CAPACITY PLANNING & TCO SIZING (INR ₹)")
    print("=" * 80)
    sizing = deployer.calculate_gateway_sizing_tco(total_users=1500, concurrency_percent=45.0, avg_user_mbps=3.2)
    print(f"  Total Enterprise Headcount   : {sizing['total_users']} Employees & Contractors")
    print(f"  Peak Concurrent Tunnels      : {sizing['concurrent_users']} Active VPN Sessions (45% Concurrency)")
    print(f"  Peak Bandwidth Demand        : {sizing['peak_bandwidth_gbps']} Gbps")
    print(f"  Cluster Available Capacity   : {sizing['cluster_capacity_gbps']} Gbps (Active-Active)")
    print(f"  Cluster Utilization Rate     : {sizing['cluster_utilization_percent']}% (Healthy Headroom)")
    print(f"  Annual Infrastructure TCO    : ₹{sizing['total_annual_tco_lakhs']} Lakhs / year (Hardware + WAN Pipes)")
    print("=" * 80)

if __name__ == "__main__":
    run_enterprise_deployment_simulation()
