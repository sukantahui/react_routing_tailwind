"""
CBSE Class 12 CS - Topic 11 Simulation: Firewall Rule Engine & Access Control List (ACL)
Demonstrates packet filtering decisions based on source IP, destination port, and protocol.
"""

class FirewallRuleEngine:
    def __init__(self):
        # Access Control List: (Action, Protocol, Port, Source_Net)
        self.rules = [
            ("ALLOW", "TCP", 80, "ANY"),       # Allow HTTP
            ("ALLOW", "TCP", 443, "ANY"),      # Allow HTTPS
            ("ALLOW", "TCP", 22, "192.168.1.0/24"), # Allow SSH only from admin LAN
            ("DENY",  "TCP", 23, "ANY"),       # Block Telnet universally
            ("DENY",  "TCP", 21, "ANY")        # Block FTP universally
        ]
        self.default_action = "DENY (Implicit Default)"

    def evaluate_packet(self, proto, port, src_ip):
        print(f"\n[FIREWALL PACKET INSPECTION]: Proto={proto} | Port={port} | Source={src_ip}")
        for action, rule_proto, rule_port, rule_src in self.rules:
            if proto == rule_proto and port == rule_port:
                if rule_src == "ANY" or src_ip.startswith(rule_src.split('/')[0][:9]):
                    print(f"  -> Matched Rule: {action} {proto}:{port} from {rule_src}")
                    return action
        print(f"  -> No matching permit rule found. Applying {self.default_action}")
        return "DENY"

if __name__ == "__main__":
    fw = FirewallRuleEngine()
    test_packets = [
        ("TCP", 443, "203.0.113.15"),   # Legitimate HTTPS traffic
        ("TCP", 23,  "198.51.100.4"),   # Insecure Telnet traffic
        ("TCP", 22,  "192.168.1.50"),   # Authorized Admin SSH traffic
        ("TCP", 22,  "203.0.113.88"),   # External unauthorized SSH attempt
        ("TCP", 6667, "192.168.1.20")   # Random IRC chat port
    ]
    for p in test_packets:
        decision = fw.evaluate_packet(p[0], p[1], p[2])
        print(f"  VERDICT: *** {decision} ***")
