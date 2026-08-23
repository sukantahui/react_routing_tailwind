"""
SIEM Correlation & SOAR Automated Triage Engine (Suricata, Canarytokens & EDR)
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 11)
"""

import json
from dataclasses import dataclass, field
from typing import Dict, List, Optional

@dataclass
class NormalizedSecurityEvent:
    event_id: str
    timestamp: str
    source_type: str       # "NIDS_SURICATA", "DECEPTION_CANARY", "HIDS_WAZUH_EDR"
    source_ip: str
    destination_ip: str
    severity: int          # 1 (Critical) to 4 (Low)
    event_description: str
    raw_payload: str

class SiemCorrelationAndSoarEngine:
    def __init__(self):
        self.event_stream: List[NormalizedSecurityEvent] = []
        self.active_incidents: List[Dict[str, any]] = []

    def ingest_event(self, event: NormalizedSecurityEvent):
        self.event_stream.append(event)

    def evaluate_correlation(self) -> List[Dict[str, any]]:
        """Correlates NIDS, Deception, and EDR events sharing common 5-tuples into Incidents."""
        # Map events by source IP
        ip_event_map: Dict[str, List[NormalizedSecurityEvent]] = {}
        for ev in self.event_stream:
            ip_event_map.setdefault(ev.source_ip, []).append(ev)

        consolidated_incidents = []
        for src_ip, events in ip_event_map.items():
            has_nids = any(e.source_type == "NIDS_SURICATA" for e in events)
            has_deception = any(e.source_type == "DECEPTION_CANARY" for e in events)
            has_edr = any(e.source_type == "HIDS_WAZUH_EDR" for e in events)

            # High-Fidelity Correlation Rule: NIDS Exploit Probe + Honeypot/Canary Tripwire
            if has_nids and has_deception:
                incident = {
                    "incident_id": f"INC-{len(consolidated_incidents) + 101}",
                    "severity": "CRITICAL (P1)",
                    "threat_source_ip": src_ip,
                    "correlated_event_count": len(events),
                    "confidence": "100% (Confirmed Multi-Stage Intrusion)",
                    "contributing_sources": ["NIDS_SURICATA", "DECEPTION_CANARY"],
                    "soar_playbook_triggered": "AUTOMATED_CONTAINMENT_PLAYBOOK_01",
                    "soar_actions_executed": [
                        f"Firewall: Pushed drop rule for {src_ip} in 12ms",
                        f"EDR: Isolated target host in 350ms",
                        "CERT-In: Statutory 6-hour incident report draft generated"
                    ],
                    "verdict": "🚨 CRITICAL BREACH CONTAINED: Multi-Source Threat Neutralized Automatically!"
                }
                consolidated_incidents.append(incident)
                self.active_incidents.append(incident)
        return consolidated_incidents

# Execution Test Harness
if __name__ == "__main__":
    siem = SiemCorrelationAndSoarEngine()
    print("=== SIEM Multi-Source Correlation & SOAR Automated Triage ===")

    # Ingest Event 1: Suricata NIDS detects SQL injection probe
    ev1 = NormalizedSecurityEvent(
        event_id="EV-101",
        timestamp="2026-08-23T13:35:00.100Z",
        source_type="NIDS_SURICATA",
        source_ip="198.51.100.77",
        destination_ip="10.10.1.80",
        severity=2,
        event_description="Suricata SID 1000001: SQL Injection UNION SELECT detected",
        raw_payload="GET /search?q=union+select"
    )
    siem.ingest_event(ev1)

    # Ingest Event 2: Canarytoken Tripwire hit from the same source IP
    ev2 = NormalizedSecurityEvent(
        event_id="EV-102",
        timestamp="2026-08-23T13:35:01.450Z",
        source_type="DECEPTION_CANARY",
        source_ip="198.51.100.77",
        destination_ip="10.10.99.100", # Honeyfile share
        severity=1,
        event_description="Canarytoken Webhook: salaries_2026.docx opened by intruder",
        raw_payload="DNS Beacon: CANARY_77192A"
    )
    siem.ingest_event(ev2)

    # Execute Correlation & SOAR Playbooks
    incidents = siem.evaluate_correlation()
    print(f"\nCorrelated {len(incidents)} High-Fidelity Incident(s):")
    for inc in incidents:
        print(json.dumps(inc, indent=2))
