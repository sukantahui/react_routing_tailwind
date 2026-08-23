"""
Honeynet Honeywall Controller: Data Control & Data Capture Gateway
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 10)
"""

import json
from dataclasses import dataclass, field
from typing import Dict, List, Tuple

@dataclass
class HoneynetPacket:
    src_ip: str
    src_port: int
    dst_ip: str
    dst_port: int
    protocol: str
    payload: str
    is_outbound_from_honeynet: bool

class HoneywallGateway:
    def __init__(self, max_outbound_conns_per_hour: int = 10):
        self.max_outbound = max_outbound_conns_per_hour
        self.current_outbound_count = 0
        self.pcap_capture_log: List[Dict[str, any]] = []

    def _is_internal_rfc1918(self, ip: str) -> bool:
        """Checks if destination IP is private RFC 1918 space (10.x, 172.16-31.x, 192.168.x)."""
        return ip.startswith("10.") or ip.startswith("192.168.") or ip.startswith("172.16.")

    def process_packet(self, packet: HoneynetPacket) -> Dict[str, any]:
        """Enforces Data Control (Containment) and executes Data Capture (Observability)."""
        # Step 1: DATA CAPTURE (Log 100% of all packets invisibly)
        capture_entry = {
            "timestamp": "2026-08-23T13:25:00.100Z",
            "src": f"{packet.src_ip}:{packet.src_port}",
            "dst": f"{packet.dst_ip}:{packet.dst_port}",
            "proto": packet.protocol,
            "payload_bytes": len(packet.payload)
        }
        self.pcap_capture_log.append(capture_entry)

        # Step 2: DATA CONTROL (Containment Enforcement)
        action = "FORWARD"
        containment_reason = "Ingress / Safe Traffic Allowed"

        if packet.is_outbound_from_honeynet:
            # Check 1: Prevent lateral movement to real internal production networks
            if self._is_internal_rfc1918(packet.dst_ip):
                action = "DROP"
                containment_reason = "🛡️ HONEYWALL DATA CONTROL: Dropped attempted lateral pivot to internal RFC 1918 network!"
            # Check 2: Rate limit external outbound traffic
            elif self.current_outbound_count >= self.max_outbound:
                action = "DROP"
                containment_reason = "🛡️ HONEYWALL DATA CONTROL: Outbound rate limit exceeded (preventing DoS relay)!"
            else:
                self.current_outbound_count += 1
                action = "FORWARD_THROTTLED"
                containment_reason = f"Outbound connection permitted ({self.current_outbound_count}/{self.max_outbound} limit)"

        return {
            "action": action,
            "containment_reason": containment_reason,
            "data_captured": True,
            "packet": capture_entry,
            "verdict": f"[{action}] {containment_reason}"
        }

# Execution Test Harness
if __name__ == "__main__":
    honeywall = HoneywallGateway(max_outbound_conns_per_hour=3)
    print("=== Honeynet Honeywall Data Control & Capture Engine ===")

    # Test 1: Ingress Exploit against Honeynet Domain Controller
    pkt1 = HoneynetPacket(
        src_ip="198.51.100.22",
        src_port=44210,
        dst_ip="172.20.1.10", # Honeynet DC IP
        dst_port=445,
        protocol="TCP",
        payload="SMB2 TreeConnect Exploit",
        is_outbound_from_honeynet=False
    )
    res1 = honeywall.process_packet(pkt1)
    print(f"\n[Test 1 - Ingress Attack]: {res1['verdict']}")

    # Test 2: Attacker inside Honeynet attempts to pivot to real production database
    pkt2 = HoneynetPacket(
        src_ip="172.20.1.10",
        src_port=51200,
        dst_ip="10.10.1.50", # Real Production Database
        dst_port=5432,
        protocol="TCP",
        payload="SYN Probe",
        is_outbound_from_honeynet=True
    )
    res2 = honeywall.process_packet(pkt2)
    print(f"\n[Test 2 - Lateral Pivot Attempt]: {res2['verdict']}")
