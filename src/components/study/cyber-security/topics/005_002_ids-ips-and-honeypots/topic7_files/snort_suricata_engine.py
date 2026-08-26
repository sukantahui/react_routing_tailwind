"""
Snort & Suricata Rule Parser and Pattern Matching Engine
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 7)
"""

import re
import json
from dataclasses import dataclass, field
from typing import Dict, List, Optional

@dataclass
class SnortRule:
    action: str
    protocol: str
    src_ip: str
    src_port: str
    dst_ip: str
    dst_port: str
    msg: str
    sid: int
    rev: int
    content_matches: List[str] = field(default_factory=list)
    nocase: bool = False
    http_uri_only: bool = False

@dataclass
class PacketContext:
    src_ip: str
    src_port: int
    dst_ip: str
    dst_port: int
    protocol: str
    http_uri: str
    payload: str

class SnortSuricataEngine:
    def __init__(self):
        self.rules: List[SnortRule] = []

    def load_rule(self, rule_str: str) -> Optional[SnortRule]:
        """Parses standard Snort / Suricata text rule syntax."""
        pattern = r'^(alert|drop|pass|reject)\s+(tcp|udp|icmp|ip)\s+(\S+)\s+(\S+)\s+->\s+(\S+)\s+(\S+)\s+\((.*)\)$'
        match = re.match(pattern, rule_str.strip())
        if not match:
            return None

        action, proto, src_ip, src_p, dst_ip, dst_p, options_str = match.groups()
        options = {}
        for opt in options_str.split(';'):
            opt = opt.strip()
            if not opt:
                continue
            if ':' in opt:
                k, v = opt.split(':', 1)
                options[k.strip()] = v.strip().strip('"')
            else:
                options[opt] = True

        rule = SnortRule(
            action=action,
            protocol=proto,
            src_ip=src_ip,
            src_port=src_p,
            dst_ip=dst_ip,
            dst_port=dst_p,
            msg=options.get('msg', 'Custom IDS Alert'),
            sid=int(options.get('sid', 1000001)),
            rev=int(options.get('rev', 1)),
            content_matches=[options['content']] if 'content' in options else [],
            nocase='nocase' in options,
            http_uri_only='http_uri' in options
        )
        self.rules.append(rule)
        return rule

    def evaluate_packet(self, packet: PacketContext) -> List[Dict[str, any]]:
        """Matches packet payload against loaded rule base and generates EVE JSON alerts."""
        alerts = []
        for rule in self.rules:
            # Protocol match
            if rule.protocol != 'ip' and rule.protocol.lower() != packet.protocol.lower():
                continue

            target_text = packet.http_uri if rule.http_uri_only else packet.payload
            matched = True

            for needle in rule.content_matches:
                if rule.nocase:
                    if needle.lower() not in target_text.lower():
                        matched = False
                        break
                else:
                    if needle not in target_text:
                        matched = False
                        break

            if matched:
                eve_alert = {
                    "timestamp": "2026-08-23T13:00:00.100Z",
                    "event_type": "alert",
                    "src_ip": packet.src_ip,
                    "src_port": packet.src_port,
                    "dest_ip": packet.dst_ip,
                    "dest_port": packet.dst_port,
                    "proto": packet.protocol.upper(),
                    "alert": {
                        "action": rule.action,
                        "gid": 1,
                        "signature_id": rule.sid,
                        "rev": rule.rev,
                        "signature": rule.msg,
                        "category": "Web Application Attack",
                        "severity": 1
                    }
                }
                alerts.append(eve_alert)
        return alerts

# Execution Test Harness
if __name__ == "__main__":
    engine = SnortSuricataEngine()
    print("=== Snort & Suricata Rule Evaluation Engine ===")

    # Load sample Snort rules
    r1 = engine.load_rule('alert tcp $EXTERNAL_NET any -> $HTTP_SERVERS 80 (msg:"EXPLOIT SQL Injection UNION SELECT"; content:"UNION SELECT"; nocase; http_uri; sid:1000001; rev:1;)')
    r2 = engine.load_rule('drop tcp $EXTERNAL_NET any -> $HTTP_SERVERS 443 (msg:"EXPLOIT Log4Shell JNDI Lookup"; content:"sample_log4j_jndi_probe"; nocase; sid:1000002; rev:2;)')

    print(f"Loaded {len(engine.rules)} Snort/Suricata Rules successfully.\n")

    # Ingest test packet with SQL injection payload
    packet = PacketContext(
        src_ip="198.51.100.45",
        src_port=54210,
        dst_ip="10.10.1.80",
        dst_port=80,
        protocol="tcp",
        http_uri="/search?q=1%20union%20select%20null,pass%20from%20users",
        payload="GET /search?q=1%20union%20select%20null,pass%20from%20users HTTP/1.1\r\nHost: portal.barrackpore.gov\r\n\r\n"
    )

    results = engine.evaluate_packet(packet)
    print(f"Generated {len(results)} EVE JSON Alert(s):")
    for alert in results:
        print(json.dumps(alert, indent=2))
