"""
Firewall Rule-Base Static Analyzer & Anomaly Detection Engine
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 9)
"""

from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

@dataclass
class Rule:
    rule_id: int
    name: str
    action: str  # "PERMIT", "DENY"
    src_ip: str
    dst_ip: str
    dst_port: Optional[int]
    protocol: str
    hit_count_180_days: int

class FirewallRuleBaseAnalyzer:
    def __init__(self):
        pass

    def analyze_rule_base(self, rules: List[Rule]) -> Dict[str, any]:
        """Detects Shadowing, Redundancy, Overly Broad rules, and Orphaned rules."""
        anomalies = []
        shadowed_rules = []
        redundant_rules = []
        orphaned_rules = []
        overly_broad_rules = []

        # Check 1: Final Catch-All Default-Deny check
        if not rules or rules[-1].action != "DENY" or rules[-1].dst_ip != "ANY" or rules[-1].src_ip != "ANY":
            anomalies.append("❌ CRITICAL: Rule base lacks a final 'Implicit Deny All' (DENY ANY -> ANY) rule at the bottom!")

        for i, r1 in enumerate(rules):
            # Check 2: Overly Broad ANY -> ANY with PERMIT
            if r1.action == "PERMIT" and r1.src_ip == "ANY" and r1.dst_ip == "ANY" and r1.dst_port is None:
                overly_broad_rules.append(r1.rule_id)
                anomalies.append(f"❌ CRITICAL: Rule #{r1.rule_id} '{r1.name}' is an overly broad PERMIT ANY ANY rule (Default-Allow flaw)!")

            # Check 3: Orphaned / Zero-Hit rules
            if r1.hit_count_180_days == 0 and r1.rule_id != rules[-1].rule_id:
                orphaned_rules.append(r1.rule_id)

            # Compare against preceding rules for Shadowing and Redundancy
            for j in range(i):
                r_prev = rules[j]

                # Check if r_prev completely encloses r1
                src_enclosed = (r_prev.src_ip == "ANY" or r_prev.src_ip == r1.src_ip)
                dst_enclosed = (r_prev.dst_ip == "ANY" or r_prev.dst_ip == r1.dst_ip)
                port_enclosed = (r_prev.dst_port is None or r_prev.dst_port == r1.dst_port)
                proto_enclosed = (r_prev.protocol == "ANY" or r_prev.protocol == r1.protocol)

                if src_enclosed and dst_enclosed and port_enclosed and proto_enclosed:
                    if r_prev.action != r1.action:
                        shadowed_rules.append((r1.rule_id, r_prev.rule_id))
                        anomalies.append(f"🚨 SHADOWING: Rule #{r1.rule_id} ({r1.name}: {r1.action}) is SHADOWED by Rule #{r_prev.rule_id} ({r_prev.name}: {r_prev.action})! Rule #{r1.rule_id} will NEVER execute!")
                    elif r_prev.action == r1.action:
                        redundant_rules.append((r1.rule_id, r_prev.rule_id))
                        anomalies.append(f"⚠️ REDUNDANCY: Rule #{r1.rule_id} ({r1.name}) is REDUNDANT with Rule #{r_prev.rule_id} ({r_prev.name}). Matches same traffic with same action.")

        return {
            "total_rules_analyzed": len(rules),
            "shadowed_count": len(shadowed_rules),
            "redundant_count": len(redundant_rules),
            "orphaned_count": len(orphaned_rules),
            "anomalies_detected": anomalies,
            "rule_base_hygiene_score": max(0, 100 - len(shadowed_rules) * 20 - len(redundant_rules) * 10 - len(orphaned_rules) * 5)
        }

# Execution Test Harness
if __name__ == "__main__":
    analyzer = FirewallRuleBaseAnalyzer()
    print("=== Firewall Rule-Base Static Anomaly Analyzer ===")

    test_rules = [
        Rule(10, "Allow-Subnet-All", "PERMIT", "10.10.1.0/24", "ANY", None, "ANY", 450000),
        Rule(20, "Block-Compromised-Host", "DENY", "10.10.1.50", "ANY", None, "ANY", 0),  # SHADOWED by Rule 10!
        Rule(30, "Allow-DMZ-HTTPS", "PERMIT", "ANY", "172.16.1.10", 443, "TCP", 890000),
        Rule(40, "Allow-DMZ-HTTPS-Duplicate", "PERMIT", "ANY", "172.16.1.10", 443, "TCP", 0), # REDUNDANT with Rule 30!
        Rule(50, "Allow-Old-Staging-Server", "PERMIT", "ANY", "10.10.4.80", 8080, "TCP", 0), # ORPHANED!
        Rule(999, "Default-Deny-All", "DENY", "ANY", "ANY", None, "ANY", 12000)
    ]

    report = analyzer.analyze_rule_base(test_rules)
    print(f"Rule-Base Hygiene Score: {report['rule_base_hygiene_score']}/100")
    print(f"Total Anomalies Found: {len(report['anomalies_detected'])}")
    for a in report['anomalies_detected']:
        print(f"  -> {a}")
