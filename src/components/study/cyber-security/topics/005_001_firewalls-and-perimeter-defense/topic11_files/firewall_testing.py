"""
Firewall Penetration Testing, Synthetic Packet Verification & CERT-In Log Auditor
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 11)
"""

import time
from dataclasses import dataclass
from typing import Dict, List, Optional

@dataclass
class SyntheticProbePacket:
    probe_id: str
    description: str
    src_ip: str
    dst_ip: str
    dst_port: int
    tcp_flags: str  # "SYN", "ACK", "FIN_PSH_URG" (XMAS), "NULL"
    is_fragmented: bool

@dataclass
class SyslogEvent:
    timestamp_utc: str
    facility: str
    severity: str
    device_hostname: str
    src_ip: str
    src_port: int
    dst_ip: str
    dst_port: int
    protocol: str
    rule_name: str
    action: str  # "ALLOW", "DROP", "REJECT"

class FirewallTestingFramework:
    def __init__(self):
        # Whitelisted ports in simulated firewall
        self.whitelisted_ports = {80: "HTTP_PORT", 443: "HTTPS_PORT", 53: "DNS_PORT"}

    def test_firewall_probe(self, probe: SyntheticProbePacket) -> Dict[str, any]:
        """Simulates firewall stateful evaluation against penetration testing probes."""
        # Check 1: Malformed TCP Flags (XMAS / NULL scans)
        if probe.tcp_flags in ["FIN_PSH_URG", "NULL"]:
            return {
                "probe": probe.description,
                "action": "DROP",
                "verdict": "🛡️ PASSED: Malformed TCP Flag scan dropped at ingress interface.",
                "state_table_impact": "Zero state allocated",
                "compliance_status": "COMPLIANT"
            }

        # Check 2: Unsolicited ACK (Nmap -sA scan)
        if probe.tcp_flags == "ACK":
            return {
                "probe": probe.description,
                "action": "DROP / RST",
                "verdict": "🛡️ PASSED: Unsolicited ACK without prior SYN dropped by stateful engine.",
                "state_table_impact": "Zero state allocated",
                "compliance_status": "COMPLIANT"
            }

        # Check 3: Fragmented Packet Evasion
        if probe.is_fragmented:
            return {
                "probe": probe.description,
                "action": "REASSEMBLED_THEN_EVALUATED",
                "verdict": "🛡️ PASSED: IP fragments buffered and reassembled in memory before inspection.",
                "state_table_impact": "Fragment buffer tracked",
                "compliance_status": "COMPLIANT"
            }

        # Check 4: Standard TCP SYN Probe
        if probe.tcp_flags == "SYN":
            if probe.dst_port in self.whitelisted_ports:
                return {
                    "probe": probe.description,
                    "action": "SYN_ACK_PERMITTED",
                    "verdict": "✔ PASSED: Whitelisted business port permitted.",
                    "state_table_impact": "SYN_SENT / SYN_RECV state allocated",
                    "compliance_status": "COMPLIANT"
                }
            else:
                return {
                    "probe": probe.description,
                    "action": "DROP / FILTERED",
                    "verdict": "🛡️ PASSED: Non-whitelisted port strictly filtered (Default-Deny).",
                    "state_table_impact": "Zero state allocated",
                    "compliance_status": "COMPLIANT"
                }

        return {"probe": probe.description, "action": "DROP", "verdict": "Default Drop", "compliance_status": "COMPLIANT"}

    def audit_certin_log_compliance(self, log_entry: SyslogEvent) -> Dict[str, any]:
        """Audits structured syslog events against CERT-In and NIST SP 800-41 guidelines."""
        findings = []

        # Check 1: ISO 8601 UTC Timestamp format
        if not log_entry.timestamp_utc.endswith("Z"):
            findings.append("⚠️ WARNING: Timestamp is not formatted in explicit ISO 8601 UTC ('Z').")

        # Check 2: Essential 5-tuple completeness
        if not all([log_entry.src_ip, log_entry.dst_ip, log_entry.dst_port, log_entry.protocol]):
            findings.append("❌ CRITICAL: Incomplete 5-tuple in syslog payload.")

        # Check 3: Rule Attribution
        if not log_entry.rule_name:
            findings.append("❌ CRITICAL: Missing matching Rule Name / Policy ID.")

        is_compliant = len(findings) == 0
        return {
            "log_event": f"{log_entry.src_ip}:{log_entry.src_port} -> {log_entry.dst_ip}:{log_entry.dst_port} ({log_entry.action})",
            "is_certin_compliant": is_compliant,
            "retention_requirement": "180 Days in Immutable WORM / SIEM Storage",
            "ntp_sync_standard": "NPL India NTP Reference Clock",
            "findings": findings if findings else ["✔ Fully compliant with CERT-In 2022 Cybersecurity Directives!"]
        }

# Execution Test Harness
if __name__ == "__main__":
    tester = FirewallTestingFramework()
    print("=== Firewall Verification & CERT-In Log Auditor ===")

    # Run Synthetic Penetration Testing Probes
    test_probes = [
        SyntheticProbePacket("P1", "Nmap TCP SYN Scan on Port 443 (Whitelisted)", "198.51.100.25", "172.16.1.10", 443, "SYN", False),
        SyntheticProbePacket("P2", "Nmap TCP SYN Scan on Port 22 (Closed WAN)", "198.51.100.25", "172.16.1.10", 22, "SYN", False),
        SyntheticProbePacket("P3", "Nmap ACK Bypass Probe on Port 8080", "198.51.100.25", "172.16.1.10", 8080, "ACK", False),
        SyntheticProbePacket("P4", "Hping3 Malformed XMAS Scan (FIN-PSH-URG)", "198.51.100.25", "172.16.1.10", 80, "FIN_PSH_URG", False),
        SyntheticProbePacket("P5", "Scapy Fragmented IP Packet (Fragment Evasion)", "198.51.100.25", "172.16.1.10", 443, "SYN", True)
    ]

    for p in test_probes:
        res = tester.test_firewall_probe(p)
        print(f"[{res['action']}] {res['probe']} -> {res['verdict']}")

    print("\n------------------------------------------------------------\n")

    # Run CERT-In Syslog Compliance Audit
    sample_log = SyslogEvent(
        timestamp_utc="2026-08-23T11:30:15.892Z",
        facility="local0",
        severity="info",
        device_hostname="barrackpore-perimeter-fw01",
        src_ip="198.51.100.25",
        src_port=54120,
        dst_ip="172.16.1.10",
        dst_port=443,
        protocol="TCP",
        rule_name="ALLOW_DMZ_HTTPS",
        action="ALLOW"
    )
    log_report = tester.audit_certin_log_compliance(sample_log)
    print(f"CERT-In Log Compliance: {'COMPLIANT' if log_report['is_certin_compliant'] else 'NON-COMPLIANT'}")
    print(f"Retention Mandate: {log_report['retention_requirement']}")
    for f in log_report['findings']:
        print(f"  -> {f}")
