"""
Stateful Packet Inspection (SPI) & Conntrack Table Simulator
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 4)
"""

import time
import hashlib
from dataclasses import dataclass
from typing import Dict, Optional, Tuple

@dataclass
class ConntrackEntry:
    orig_src: str
    orig_sport: int
    orig_dst: str
    orig_dport: int
    proto: str
    tcp_state: str       # "SYN_SENT", "SYN_RECV", "ESTABLISHED", "FIN_WAIT", "TIME_WAIT"
    ct_state: str        # "NEW", "ESTABLISHED", "RELATED", "INVALID"
    timeout_sec: int
    seq_num: int
    ack_num: int
    is_related: bool = False

class StatefulInspectionEngine:
    def __init__(self, max_conntrack_entries: int = 100000):
        self.state_table: Dict[str, ConntrackEntry] = {}
        self.max_entries = max_conntrack_entries
        self.syn_cookie_secret = "SukantaHuiBarrackpore#2026"
        self.syn_cookie_active = False

    def _generate_tuple_key(self, src: str, sport: int, dst: str, dport: int, proto: str) -> str:
        return f"{proto}:{src}:{sport}->{dst}:{dport}"

    def _generate_syn_cookie(self, src_ip: str, src_port: int, dst_ip: str, dst_port: int) -> int:
        """Computes RFC 4987 Cryptographic SYN Cookie Sequence Number."""
        raw = f"{src_ip}:{src_port}:{dst_ip}:{dst_port}:{self.syn_cookie_secret}:{int(time.time() // 60)}"
        digest = hashlib.sha256(raw.encode()).hexdigest()
        return int(digest[:8], 16)  # 32-bit ISN cookie

    def process_packet(self, src_ip: str, src_port: int, dst_ip: str, dst_port: int, 
                       proto: str, flags: Dict[str, bool], seq: int, ack: int) -> Dict[str, any]:
        """Evaluates incoming packet against Stateful conntrack table."""
        orig_key = self._generate_tuple_key(src_ip, src_port, dst_ip, dst_port, proto)
        reply_key = self._generate_tuple_key(dst_ip, dst_port, src_ip, src_port, proto)

        # Case 1: Outbound/Inbound SYN Packet (Initiating NEW Session)
        if flags.get("SYN", False) and not flags.get("ACK", False):
            # Check conntrack capacity
            if len(self.state_table) >= self.max_entries:
                self.syn_cookie_active = True
                cookie = self._generate_syn_cookie(src_ip, src_port, dst_ip, dst_port)
                return {
                    "action": "SYN_COOKIE_CHALLENGE",
                    "status": "CHALLENGE_ISSUED",
                    "cookie_seq": cookie,
                    "reason": "Conntrack Table Full -> Generating RFC 4987 SYN Cookie (Zero RAM allocated)"
                }

            # Create state entry (Original Direction)
            entry = ConntrackEntry(
                orig_src=src_ip, orig_sport=src_port, orig_dst=dst_ip, orig_dport=dst_port,
                proto=proto, tcp_state="SYN_SENT", ct_state="NEW", timeout_sec=60, seq_num=seq, ack_num=0
            )
            self.state_table[orig_key] = entry
            return {
                "action": "PERMIT",
                "status": "NEW",
                "tcp_state": "SYN_SENT",
                "reason": "Legitimate TCP SYN -> Session registered in conntrack table"
            }

        # Case 2: Inbound Reply Packet (Matching existing session in reverse)
        if reply_key in self.state_table:
            entry = self.state_table[reply_key]
            
            if flags.get("SYN", False) and flags.get("ACK", False) and entry.tcp_state == "SYN_SENT":
                entry.tcp_state = "SYN_RECV"
                entry.ack_num = seq + 1
                return {"action": "PERMIT", "status": "ESTABLISHED", "tcp_state": "SYN_RECV", "reason": "SYN+ACK matched existing outbound session"}

            if flags.get("ACK", False) and not flags.get("SYN", False):
                entry.tcp_state = "ESTABLISHED"
                entry.ct_state = "ESTABLISHED"
                entry.timeout_sec = 432000  # 5 days for established TCP
                return {"action": "PERMIT", "status": "ESTABLISHED", "tcp_state": "ESTABLISHED", "reason": "Bi-directional 3-way handshake verified"}

            if flags.get("FIN", False) or flags.get("RST", False):
                entry.tcp_state = "FIN_WAIT"
                return {"action": "PERMIT", "status": "TEARDOWN", "tcp_state": "FIN_WAIT", "reason": "Clean connection termination"}

        # Case 3: Out-of-State / Unsolicited ACK Probe (No prior session exists!)
        if flags.get("ACK", False) and orig_key not in self.state_table and reply_key not in self.state_table:
            return {
                "action": "DROP",
                "status": "INVALID",
                "tcp_state": "NONE",
                "reason": "🛡️ OUT-OF-STATE PACKET: Unsolicited ACK dropped (No matching conntrack record!)"
            }

        return {"action": "DROP", "status": "INVALID", "tcp_state": "NONE", "reason": "Unrecognized packet state"}

# Execution Test Harness
if __name__ == "__main__":
    engine = StatefulInspectionEngine(max_conntrack_entries=1000)
    print("=== Stateful Packet Inspection (SPI) Conntrack Simulation ===")

    # Step 1: Outbound SYN from internal client
    p1 = engine.process_packet("10.10.1.50", 51200, "203.0.113.88", 443, "TCP", {"SYN": True, "ACK": False}, 1000, 0)
    print(f"[1. Outbound SYN] {p1['action']} -> Status: {p1['status']} ({p1['reason']})")

    # Step 2: Inbound SYN+ACK from public server
    p2 = engine.process_packet("203.0.113.88", 443, "10.10.1.50", 51200, "TCP", {"SYN": True, "ACK": True}, 5000, 1001)
    print(f"[2. Inbound SYN+ACK] {p2['action']} -> Status: {p2['status']} ({p2['reason']})")

    # Step 3: Outbound ACK finishing handshake
    p3 = engine.process_packet("10.10.1.50", 51200, "203.0.113.88", 443, "TCP", {"ACK": True}, 1001, 5001)
    print(f"[3. Final ACK] {p3['action']} -> Status: {p3['status']} ({p3['reason']})")

    # Step 4: Attacker sends unsolicited ACK probe (Port scan)
    p4 = engine.process_packet("198.51.100.99", 60000, "10.10.1.50", 22, "TCP", {"ACK": True}, 9999, 0)
    print(f"[4. Unsolicited ACK Scan] {p4['action']} -> Status: {p4['status']} ({p4['reason']})")
