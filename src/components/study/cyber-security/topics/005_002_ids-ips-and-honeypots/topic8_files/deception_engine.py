"""
Cyber Deception & Honeypot Telemetry Engine (Honeyports & Canarytokens)
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 8)
"""

import json
from dataclasses import dataclass
from typing import Dict, List, Optional

@dataclass
class DeceptionInteraction:
    source_ip: str
    source_port: int
    decoy_type: str        # "HONEYPORT_SSH", "CANARY_TOKEN_DOCX", "AD_HONEY_CREDENTIAL"
    decoy_identifier: str  # e.g., "port-2222", "salaries_2026.docx", "svc_treasury_adm"
    observed_action: str   # e.g., "TCP_CONNECT", "WEBHOOK_BEACON", "KERBEROS_AS_REQ"
    payload_sample: str

class DeceptionTelemetryEngine:
    def __init__(self, organization_name: str = "Barrackpore Financial Clearing"):
        self.org_name = organization_name
        self.deception_log: List[Dict[str, any]] = []

    def log_interaction(self, event: DeceptionInteraction) -> Dict[str, any]:
        """Processes interaction with a decoy asset and generates 100% True-Positive alert."""
        alert_record = {
            "timestamp": "2026-08-23T13:10:00.250Z",
            "event_type": "DECEPTION_TRIPWIRE_TRIGGERED",
            "organization": self.org_name,
            "confidence": "100% (Zero False Positive Axiom)",
            "threat_source": {
                "ip": event.source_ip,
                "port": event.source_port
            },
            "decoy_asset": {
                "type": event.decoy_type,
                "identifier": event.decoy_identifier
            },
            "forensics": {
                "action": event.observed_action,
                "payload": event.payload_sample
            },
            "verdict": "🚨 CRITICAL BREACH TRIPWIRE: Unauthorized Adversary / Insider Detected on Decoy Asset!"
        }
        self.deception_log.append(alert_record)
        return alert_record

# Execution Test Harness
if __name__ == "__main__":
    engine = DeceptionTelemetryEngine()
    print("=== Cyber Deception & Honeypot Tripwire Engine ===")

    # Test 1: Port Scanner hits decoy SSH Honeyport 2222
    event1 = DeceptionInteraction(
        source_ip="198.51.100.88",
        source_port=49812,
        decoy_type="HONEYPORT_SSH",
        decoy_identifier="decoy-srv-01:2222",
        observed_action="TCP_SYN_PORT_SCAN",
        payload_sample="SSH-2.0-OpenSSH_8.2p1 Ubuntu probe"
    )
    alert1 = engine.log_interaction(event1)
    print("\n[Event 1: Honeyport Decoy Triggered]")
    print(json.dumps(alert1, indent=2))

    # Test 2: Insider opens Canarytoken Word Document
    event2 = DeceptionInteraction(
        source_ip="10.10.4.15",
        source_port=58210,
        decoy_type="CANARY_TOKEN_DOCX",
        decoy_identifier="salary_pan_master_2026.docx",
        observed_action="DNS_CANARY_BEACON",
        payload_sample="HTTP GET /canary/beacon?token=CANARY_77192A"
    )
    alert2 = engine.log_interaction(event2)
    print("\n[Event 2: Canarytoken Honeyfile Triggered]")
    print(json.dumps(alert2, indent=2))
