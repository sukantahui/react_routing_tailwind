#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: EVOLVING THREAT HORIZON & NEXT-GEN DEFENSE SIMULATOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_006 (Emerging Technologies)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides comprehensive modeling of:
1. Attack Surface Expansion (Cloud, IoT, OT, AI Autonomous Agents).
2. Time-to-Exploit (TTE) Compression & Autonomous Vulnerability Weaponization.
3. MITRE ATT&CK Automated Attack Chain vs Next-Gen Defense Posture.
4. Next-Generation Defense Synthesis (Zero Trust, SOAR, AI-XDR, Quantum Resilience).
"""

import sys
import time
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class ThreatHorizonMetric:
    era: str
    year: int
    avg_dwell_time_days: float
    time_to_exploit_hours: float
    primary_vector: str
    defense_paradigm: str

class ThreatHorizonSimulator:
    def __init__(self):
        self.evolution_timeline = [
            ThreatHorizonMetric("Perimeter Era", 2010, 210.0, 720.0, "Manual Scripting, Unpatched DMZ Servers", "Static Firewalls & Signature AV"),
            ThreatHorizonMetric("Cloud & Mobile Era", 2018, 56.0, 48.0, "Credential Stuffing, Phishing, Ransomware-as-a-Service", "SIEM, EDR & SMS-based MFA"),
            ThreatHorizonMetric("AI & Autonomous Era", 2026, 4.2, 0.25, "GenAI Deepfakes, Automated Zero-Day Exploits, Supply Chain", "Zero Trust (NIST SP 800-207), AI-SOAR, FIDO2, PQC")
        ]

    def simulate_attack_chain_speed(self, attacker_type: str) -> Dict:
        """
        Calculates time required to progress through full Cyber Kill Chain:
        Recon -> Weaponize -> Deliver -> Exploit -> Lateral Movement -> Exfiltration.
        """
        profiles = {
            "legacy_human_actor": {
                "recon_min": 240,
                "weaponize_min": 180,
                "exploit_min": 60,
                "lateral_min": 360,
                "exfil_min": 120,
                "total_hours": 16.0,
                "defense_response_window": "ADEQUATE FOR HUMAN SOC (Response within 4-8 hours)"
            },
            "ai_autonomous_swarm": {
                "recon_min": 0.5,
                "weaponize_min": 0.2,
                "exploit_min": 0.1,
                "lateral_min": 1.2,
                "exfil_min": 0.5,
                "total_hours": 0.042, # 2.5 minutes!
                "defense_response_window": "IMPOSSIBLE FOR HUMAN SOC (Mandates Automated AI-SOAR Playbooks) 🚨"
            }
        }
        return profiles.get(attacker_type, profiles["legacy_human_actor"])

    def evaluate_next_gen_readiness(self, has_zero_trust: bool, has_ai_soar: bool, has_pqc: bool, has_fido2: bool) -> Dict:
        """
        Evaluates organizational readiness against next-generation cyber threat vectors.
        """
        score = 0
        if has_zero_trust: score += 30
        if has_ai_soar: score += 25
        if has_fido2: score += 25
        if has_pqc: score += 20

        if score >= 80:
            tier = "NEXT-GEN QUANTUM & AI RESILIENT ✔"
            status = "Perimeter is impervious to automated AI swarms and harvest-now-decrypt-later quantum attacks."
        elif score >= 50:
            tier = "TRANSITIONAL DEFENSE POSTURE ⚠️"
            status = "Moderate resilience against automated attacks, but vulnerable to sub-minute AI weaponization and quantum decryption."
        else:
            tier = "LEGACY VULNERABLE PERIMETER 🚨"
            status = "Critical exposure to automated AI phishing, credential stuffing, and perimeter bypass."

        return {
            "score": f"{score}/100",
            "tier": tier,
            "status": status
        }

def main():
    print("=" * 80)
    print("EVOLVING THREAT HORIZON & NEXT-GEN CYBER DEFENSE SIMULATOR")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    sim = ThreatHorizonSimulator()

    print("\n[TEST 1]: DECADE-LONG THREAT HORIZON TIMELINE EVOLUTION")
    print("-" * 80)
    print(f"{'Era':<22}{'Year':<8}{'Dwell Time':<14}{'Time-to-Exploit':<18}{'Primary Defense'}")
    print("-" * 80)
    for m in sim.evolution_timeline:
        print(f"{m.era:<22}{m.year:<8}{m.avg_dwell_time_days} days{'':<6}{m.time_to_exploit_hours} hours{'':<10}{m.defense_paradigm[:28]}")

    print("\n" + "=" * 80)
    print("[TEST 2]: CYBER KILL CHAIN VELOCITY COMPARISON")
    human = sim.simulate_attack_chain_speed("legacy_human_actor")
    ai_swarm = sim.simulate_attack_chain_speed("ai_autonomous_swarm")

    print(f"1. Manual Human Adversary : Total Attack Time = {human['total_hours']} Hours")
    print(f"   SOC Viability          : {human['defense_response_window']}")
    print(f"2. AI-Autonomous Swarm    : Total Attack Time = {ai_swarm['total_hours'] * 60:.1f} Minutes")
    print(f"   SOC Viability          : {ai_swarm['defense_response_window']}")

    print("\n" + "=" * 80)
    print("[TEST 3]: NEXT-GENERATION RESILIENCE READINESS")
    eval_res = sim.evaluate_next_gen_readiness(has_zero_trust=True, has_ai_soar=True, has_pqc=True, has_fido2=True)
    print(f"Overall Defense Score : {eval_res['score']}")
    print(f"Readiness Tier        : {eval_res['tier']}")
    print(f"Forensic Assessment   : {eval_res['status']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
