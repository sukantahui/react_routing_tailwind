#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: IPSEC ARCHITECTURE, SPD/SAD LOOKUPS & REPLAY SIMULATOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_004 (SSL, TLS & IPsec)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script demonstrates the RFC 4301 IPsec Architecture:
1. Evaluating Security Policy Database (SPD) actions (PROTECT / BYPASS / DISCARD).
2. Simulating Security Association Database (SAD) SPI cryptographic lookups.
3. Transport Mode vs Tunnel Mode packet encapsulation transformations.
4. 64-bit Anti-Replay Sliding Window bitmask verification.
"""

import sys
import hashlib
import hmac
import binascii
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES FOR SPD, SAD, AND PACKET ENCAPSULATION
# =============================================================================

@dataclass
class SPDPolicyRule:
    src_subnet: str
    dst_subnet: str
    protocol: str              # "TCP", "UDP", "ANY"
    action: str                # "PROTECT", "BYPASS", "DISCARD"
    mode: str = "TUNNEL"       # "TUNNEL" or "TRANSPORT"

@dataclass
class SecurityAssociation:
    spi: int                   # Security Parameter Index (32-bit hex)
    dst_ip: str
    protocol: str              # "ESP" or "AH"
    encryption_key: bytes
    auth_key: bytes
    sequence_number: int = 0
    mode: str = "TUNNEL"

# =============================================================================
# IPSEC KERNEL ARCHITECTURE ENGINE
# =============================================================================

class IPsecKernelEngine:
    def __init__(self):
        self.spd_table = [
            SPDPolicyRule("10.14.0.0/16", "10.20.0.0/16", "ANY", "PROTECT", "TUNNEL"),
            SPDPolicyRule("192.168.1.5/32", "192.168.1.88/32", "TCP", "PROTECT", "TRANSPORT"),
            SPDPolicyRule("10.14.0.0/16", "8.8.8.8/32", "UDP", "BYPASS", "NONE"),
            SPDPolicyRule("ANY", "198.51.100.99/32", "ANY", "DISCARD", "NONE")
        ]

        # Simulated SAD Table
        self.sad_table: Dict[int, SecurityAssociation] = {
            0x88AF1901: SecurityAssociation(0x88AF1901, "203.0.113.10", "ESP", b"\x11"*32, b"\x22"*32, 0, "TUNNEL"),
            0x4A1F89BC: SecurityAssociation(0x4A1F89BC, "192.168.1.88", "ESP", b"\x33"*32, b"\x44"*32, 0, "TRANSPORT")
        }

        # Anti-Replay Sliding Window (64-packet window)
        self.window_size = 64
        self.window_max_seq = 0
        self.replay_bitmask = 0

    def evaluate_spd(self, src_ip: str, dst_ip: str, proto: str) -> Dict[str, any]:
        """Looks up action in Security Policy Database (SPD)."""
        for rule in self.spd_table:
            # Simplified prefix matching for lab simulation
            if (rule.src_subnet == "ANY" or rule.src_subnet.split("/")[0][:5] in src_ip) and \
               (rule.dst_subnet == "ANY" or rule.dst_subnet.split("/")[0][:5] in dst_ip):
                return {
                    "action": rule.action,
                    "mode": rule.mode,
                    "matched_rule": f"{rule.src_subnet} -> {rule.dst_subnet} ({rule.action})"
                }
        return {"action": "BYPASS", "mode": "NONE", "matched_rule": "Default Fallback (BYPASS)"}

    def check_anti_replay(self, seq_num: int) -> Tuple[bool, str]:
        """
        Validates sequence number against 64-packet sliding window (RFC 4303).
        """
        if seq_num == 0:
            return False, "REJECTED: Sequence number 0 is invalid."

        # Case 1: Packet is ahead of window (New highest packet)
        if seq_num > self.window_max_seq:
            diff = seq_num - self.window_max_seq
            if diff < self.window_size:
                self.replay_bitmask = (self.replay_bitmask << diff) | 1
            else:
                self.replay_bitmask = 1
            self.window_max_seq = seq_num
            return True, f"ACCEPTED: New window head (Seq={seq_num})"

        # Case 2: Packet is too old (Fell off the left edge of window)
        diff = self.window_max_seq - seq_num
        if diff >= self.window_size:
            return False, f"REJECTED: Packet too old (Seq={seq_num} < Window Minimum {self.window_max_seq - self.window_size + 1})"

        # Case 3: Packet is within window -> Check bitmask for replay
        if (self.replay_bitmask & (1 << diff)) != 0:
            return False, f"REJECTED: Duplicate replay attack detected (Seq={seq_num} already received)"

        # Mark bit in window
        self.replay_bitmask |= (1 << diff)
        return True, f"ACCEPTED: In-window packet (Seq={seq_num})"

# =============================================================================
# SIMULATION WORKBENCH: BARRACKPORE IPSEC CORE SIMULATION
# =============================================================================

def run_ipsec_framework_simulation():
    print("=" * 80)
    print("  IPSEC ARCHITECTURE, SPD/SAD LOOKUPS & REPLAY AUDITOR")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    engine = IPsecKernelEngine()

    print("\n[+] SECTION 1: SECURITY POLICY DATABASE (SPD) EVALUATION")
    print("-" * 75)
    test_packets = [
        ("10.14.20.15", "10.20.40.88", "TCP", "Internal Treasury -> Branch"),
        ("10.14.20.15", "8.8.8.8", "UDP", "DNS Lookup"),
        ("192.168.1.5", "198.51.100.99", "TCP", "Malicious Blocked Destination")
    ]

    for src, dst, proto, desc in test_packets:
        decision = engine.evaluate_spd(src, dst, proto)
        action_icon = "🛡️ PROTECT" if decision['action'] == "PROTECT" else "⏩ BYPASS" if decision['action'] == "BYPASS" else "❌ DISCARD"
        print(f"  • {desc:<32}: {src} -> {dst} ({proto})")
        print(f"    Action: [{action_icon}] | Mode: {decision['mode']} | Rule: {decision['matched_rule']}\n")

    print("=" * 80)
    print("  SECTION 2: 64-PACKET ANTI-REPLAY SLIDING WINDOW SIMULATION")
    print("=" * 80)
    seq_sequence = [1, 2, 3, 10, 11, 2, 4, 100, 10, 101]

    for seq in seq_sequence:
        valid, msg = engine.check_anti_replay(seq)
        status_icon = "✔" if valid else "🚨"
        print(f"  {status_icon} Packet Seq #{seq:<4} ➔ {msg}")
    print("=" * 80)

if __name__ == "__main__":
    run_ipsec_framework_simulation()
